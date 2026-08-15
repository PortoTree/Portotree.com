import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/server';
import { Timestamp } from 'firebase-admin/firestore';

// Cron job: Dijalankan setiap hari jam 00:00 UTC via vercel.json
// Menghapus postingan expired dari Firestore & media dari Cloudinary
export async function GET(req: NextRequest) {
  // Proteksi endpoint dengan secret key dari env
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    console.warn('[cron/cleanup-portofind] Unauthorized request');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const now = Timestamp.now();
    const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

    const expiredSnap = await adminDb
      .collection('portofind_posts')
      .where('expiresAt', '<=', now)
      .limit(100)
      .get();

    if (expiredSnap.empty) {
      console.log('[cron/cleanup-portofind] Tidak ada postingan expired');
      return NextResponse.json({ cleaned: 0 });
    }

    let cleaned = 0;
    const batch = adminDb.batch();

    for (const doc of expiredSnap.docs) {
      const data = doc.data();

      // Hapus media dari Cloudinary jika ada
      if (data.mediaPublicId && cloudName) {
        try {
          await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/destroy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              public_id: data.mediaPublicId,
              api_key: process.env.CLOUDINARY_API_KEY,
            }),
          });
          console.log('[cron/cleanup-portofind] Cloudinary deleted:', data.mediaPublicId);
        } catch (e) {
          console.warn('[cron/cleanup-portofind] Gagal hapus Cloudinary asset:', data.mediaPublicId, e);
        }
      }

      batch.delete(doc.ref);
      cleaned++;
    }

    await batch.commit();
    console.log('[cron/cleanup-portofind] Berhasil hapus', cleaned, 'postingan expired');
    return NextResponse.json({ cleaned });
  } catch (err: any) {
    console.error('[cron/cleanup-portofind] Error:', err);
    return NextResponse.json({ error: 'Gagal menjalankan cleanup' }, { status: 500 });
  }
}
