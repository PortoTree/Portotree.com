import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/server';
import { Timestamp } from 'firebase-admin/firestore';

export async function GET(req: NextRequest) {
  try {
    const now = Timestamp.now();

    const snapshot = await adminDb
      .collection('portofind_posts')
      .where('expiresAt', '>', now)
      .orderBy('expiresAt', 'desc')
      .limit(50)
      .get();

    const posts = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: (doc.data().createdAt as Timestamp).toDate().toISOString(),
      expiresAt: (doc.data().expiresAt as Timestamp).toDate().toISOString(),
    }));

    console.log('[portofind/posts] Berhasil fetch', posts.length, 'postingan');
    return NextResponse.json({ posts });
  } catch (err: any) {
    console.error('[portofind/posts] Error:', err);
    return NextResponse.json({ error: 'Gagal mengambil postingan' }, { status: 500 });
  }
}
