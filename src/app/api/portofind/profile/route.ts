import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId');

    if (!userId) {
      return NextResponse.json({ error: 'userId diperlukan' }, { status: 400 });
    }

    // Baca portfolio via Admin SDK (bypass Firestore rules)
    const portfolioSnap = await adminDb.collection('portfolios').doc(userId).get();
    
    let fullName = null;
    let photoUrl = null;
    let username = null;
    let phone = null;

    if (portfolioSnap.exists) {
      const personal = portfolioSnap.data()?.data?.personal || {};
      fullName = personal.fullName || personal.name || null;
      photoUrl = personal.photoUrl || null;
      phone = personal.phone || null;
      // Cek apakah ada field username di root doc
      username = portfolioSnap.data()?.username || null;
      console.log('[portofind/profile] Portfolio ditemukan:', { fullName, photoUrl, username, phone });
    } else {
      console.log('[portofind/profile] Portfolio tidak ditemukan untuk userId:', userId);
      // Coba cari di CV
      const cvSnap = await adminDb.collection('cvs').doc(userId).get();
      if (cvSnap.exists) {
        const personal = cvSnap.data()?.data?.personal || {};
        fullName = personal.fullName || personal.name || null;
        photoUrl = personal.photoUrl || null;
        phone = personal.phone || null;
        username = cvSnap.data()?.username || null;
      }
    }

    // Kalau username belum dapet, cari di koleksi usernames
    if (!username) {
      const usernamesSnap = await adminDb
        .collection('usernames')
        .where('uid', '==', userId)
        .limit(1)
        .get();
      if (!usernamesSnap.empty) {
        username = usernamesSnap.docs[0].id;
        console.log('[portofind/profile] Username ditemukan dari koleksi usernames:', username);
      }
    }

    return NextResponse.json({ fullName, photoUrl, username, phone });
  } catch (err: any) {
    console.error('[portofind/profile] Error:', err);
    return NextResponse.json({ error: 'Gagal ambil profil' }, { status: 500 });
  }
}
