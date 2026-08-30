import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/server';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      userId,
      author,
      title,
      description,
      location,
      desiredPosition,
      expectedSalary,
      skills,
      showCv,
      showPortfolio,
      mediaUrl,
      mediaPublicId,
      mediaFormat,
    } = body;

    if (!userId || !title || !description || (!showCv && !showPortfolio)) {
      return NextResponse.json({ error: 'Field wajib tidak lengkap' }, { status: 400 });
    }

    const now = new Date();
    const expiresAt = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

    const attachments = [];
    if (showCv) attachments.push({ type: 'cv', label: 'CV / Resume', url: `/p/resume` });
    if (showPortfolio) attachments.push({ type: 'portfolio', label: 'Portofolio', url: `/p/${author.username}` });

    const docRef = await adminDb.collection('portofind_posts').add({
      userId,
      type: 'talent_showcase',
      author,
      title,
      description,
      location: location || null,
      desiredPosition: desiredPosition || null,
      expectedSalary: expectedSalary || null,
      skills: skills || [],
      mediaUrl: mediaUrl || null,
      mediaPublicId: mediaPublicId || null,
      mediaFormat: mediaFormat || 'image',
      attachments,
      likesCount: 0,
      sharesCount: 0,
      createdAt: FieldValue.serverTimestamp(),
      expiresAt: Timestamp.fromDate(expiresAt),
      status: 'active',
    });

    // Simpan cooldown di koleksi users
    await adminDb.collection('portofind_cooldowns').doc(userId).set({
      cooldownUntil: Timestamp.fromDate(expiresAt),
      lastPostId: docRef.id,
      createdAt: Timestamp.fromDate(now),
    });

    console.log('[portofind/post] Postingan berhasil dibuat:', docRef.id);
    return NextResponse.json({ success: true, postId: docRef.id, expiresAt: expiresAt.toISOString() });
  } catch (err: any) {
    console.error('[portofind/post] Error:', err);
    return NextResponse.json({ error: 'Gagal membuat postingan' }, { status: 500 });
  }
}
