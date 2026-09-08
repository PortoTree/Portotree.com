import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: NextRequest) {
  try {
    // Duitku ngirim data dalam format x-www-form-urlencoded
    const bodyText = await req.text();
    const params = new URLSearchParams(bodyText);
    
    // Ambil data penting dari Duitku
    const merchantCode = params.get('merchantCode');
    const amount = params.get('amount');
    const merchantOrderId = params.get('merchantOrderId');
    const signature = params.get('signature');
    
    const resultCode = params.get('resultCode'); // '00' = Success, '01' = Failed
    const reference = params.get('reference');
    const paymentCode = params.get('paymentCode');

    // Cek apakah parameter lengkap
    if (!merchantCode || !amount || !merchantOrderId || !signature) {
      console.error('Duitku Callback: Bad Parameter', { merchantCode, amount, merchantOrderId, signature });
      return NextResponse.json({ message: 'Bad Parameter' }, { status: 400 });
    }

    // Ambil API Key dari .env (Jangan hardcode di produksi)
    const apiKey = process.env.DUITKU_API_KEY || 'API_KEY_DUITKU_LU_DISINI'; 

    // Generate signature untuk divalidasi
    const stringToSign = \`\${merchantCode}\${amount}\${merchantOrderId}\`;
    const calcSignature = crypto.createHmac('sha256', apiKey).update(stringToSign).digest('hex');

    // Validasi apakah signature cocok (Memastikan ini beneran dikirim dari server Duitku)
    if (signature === calcSignature) {
      
      if (resultCode === '00') {
        // TODO: UPDATE DATABASE LU DI SINI
        // Contoh: await db.order.update({ where: { id: merchantOrderId }, data: { status: 'PAID' } })
        console.log(\`✅ [DUITKU] Pembayaran SUKSES! Order ID: \${merchantOrderId}, Ref: \${reference}\`);
      } else {
        // Pembayaran gagal / kedaluwarsa
        console.log(\`❌ [DUITKU] Pembayaran GAGAL/EXPIRED! Order ID: \${merchantOrderId}\`);
      }

      // Wajib dibalas HTTP 200 biar Duitku nggak ngirim ulang (maks 5x)
      return NextResponse.json({ message: 'Success' }, { status: 200 });

    } else {
      console.error('Duitku Callback: Bad Signature', { signature, calcSignature });
      return NextResponse.json({ message: 'Bad Signature' }, { status: 400 });
    }
    
  } catch (error) {
    console.error('Duitku Callback Error:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
