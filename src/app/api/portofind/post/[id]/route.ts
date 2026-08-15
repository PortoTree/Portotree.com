import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/server';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    
    if (!id) {
      return NextResponse.json({ error: 'ID tidak valid' }, { status: 400 });
    }

    const doc = await adminDb.collection('portofind_posts').doc(id).get();
    
    if (!doc.exists) {
      return NextResponse.json({ error: 'Postingan tidak ditemukan' }, { status: 404 });
    }

    const data = doc.data();
    
    // Check if expired
    const now = new Date();
    const expiresAt = data?.expiresAt?.toDate();
    if (expiresAt && expiresAt < now) {
      return NextResponse.json({ error: 'Postingan telah kedaluwarsa' }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      post: {
        id: doc.id,
        ...data,
        createdAt: data?.createdAt?.toDate()?.toISOString(),
        expiresAt: data?.expiresAt?.toDate()?.toISOString(),
        media: data?.mediaUrl ? { type: data.mediaFormat || 'image', url: data.mediaUrl } : null,
      }
    });

  } catch (err: any) {
    console.error('[portofind/post/[id]] Error:', err);
    return NextResponse.json({ error: 'Gagal mengambil postingan' }, { status: 500 });
  }
}
