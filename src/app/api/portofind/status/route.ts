import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/server';
import { Timestamp } from 'firebase-admin/firestore';

// GET: Cek status cooldown & postingan aktif milik user
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId diperlukan' }, { status: 400 });
    }

    const now = Timestamp.now();

    // Cek postingan aktif milik user
    const activePostSnap = await adminDb
      .collection('portofind_posts')
      .where('userId', '==', userId)
      .limit(10)
      .get();

    let activePost = null;
    if (!activePostSnap.empty) {
      // Manual filter untuk menghindari butuh composite index di Firestore
      const validDocs = activePostSnap.docs.filter(doc => {
        const exp = doc.data().expiresAt as Timestamp;
        return exp && exp.toMillis() > now.toMillis();
      });
      
      if (validDocs.length > 0) {
        const doc = validDocs[0];
      activePost = {
        id: doc.id,
        ...doc.data(),
        createdAt: (doc.data().createdAt as Timestamp).toDate().toISOString(),
        expiresAt: (doc.data().expiresAt as Timestamp).toDate().toISOString(),
      };
      }
    }

    // Cek cooldown (berlaku meski postingan sudah dihapus)
    const cooldownDoc = await adminDb.collection('portofind_cooldowns').doc(userId).get();
    let cooldownUntil = null;
    let isOnCooldown = false;

    if (cooldownDoc.exists) {
      const cooldownData = cooldownDoc.data();
      const cooldownTimestamp = cooldownData?.cooldownUntil as Timestamp;
      if (cooldownTimestamp && cooldownTimestamp.toMillis() > now.toMillis()) {
        isOnCooldown = true;
        cooldownUntil = cooldownTimestamp.toDate().toISOString();
      }
    }

    console.log('[portofind/status] userId:', userId, '| activePost:', !!activePost, '| isOnCooldown:', isOnCooldown);
    return NextResponse.json({ activePost, isOnCooldown, cooldownUntil });
  } catch (err: any) {
    console.error('[portofind/status] Error:', err);
    return NextResponse.json({ error: 'Gagal mengambil status' }, { status: 500 });
  }
}

// DELETE: Hapus postingan aktif milik user (cooldown tetap berjalan)
export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { postId, userId, mediaPublicId } = body;

    if (!postId || !userId) {
      return NextResponse.json({ error: 'postId dan userId diperlukan' }, { status: 400 });
    }

    // Validasi kepemilikan post
    const postDoc = await adminDb.collection('portofind_posts').doc(postId).get();
    if (!postDoc.exists || postDoc.data()?.userId !== userId) {
      return NextResponse.json({ error: 'Postingan tidak ditemukan atau bukan milik Anda' }, { status: 403 });
    }

    // Hapus gambar dari Cloudinary via server-side (jika ada)
    if (mediaPublicId) {
      try {
        const cloudinaryRes = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              public_id: mediaPublicId,
              api_key: process.env.CLOUDINARY_API_KEY,
              // Note: Untuk production gunakan signed request dengan api_secret
            }),
          }
        );
        console.log('[portofind/status] Cloudinary delete status:', cloudinaryRes.status);
      } catch (cloudErr) {
        console.warn('[portofind/status] Gagal hapus dari Cloudinary:', cloudErr);
        // Tidak stop proses, tetap hapus dari Firestore
      }
    }

    // Hapus dokumen dari Firestore (COOLDOWN TETAP DI portofind_cooldowns)
    await adminDb.collection('portofind_posts').doc(postId).delete();

    console.log('[portofind/status] Postingan berhasil dihapus:', postId);
    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('[portofind/status] Error DELETE:', err);
    return NextResponse.json({ error: 'Gagal menghapus postingan' }, { status: 500 });
  }
}
