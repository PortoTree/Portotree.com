import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendVerificationEmail(email: string, code: string) {
  try {
    const data = await resend.emails.send({
      from: "PortoTree <hello@portotree.com>",
      to: [email],
      subject: "Kode Verifikasi Anda",
      html: `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verifikasi Email Anda</title>
</head>
<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#f8fafc" style="padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" max-width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#ffffff" style="max-width: 500px; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 25px rgba(0, 0, 0, 0.05); border: 1px solid #e2e8f0;">
          <tr>
            <td align="center" style="padding: 40px 30px 20px 30px; border-bottom: 1px solid #f1f5f9;">
              <img src="${process.env.NEXT_PUBLIC_SITE_URL || 'https://portotree.com'}/logo-landscape.png" alt="PortoTree" width="160" style="display: block; margin-bottom: 20px;">
              <h1 style="margin: 0; font-size: 24px; font-weight: 700; color: #0f172a; line-height: 1.3;">Verifikasi Email Anda</h1>
            </td>
          </tr>
          <tr>
            <td style="padding: 30px; text-align: center;">
              <p style="margin: 0 0 20px 0; font-size: 16px; color: #475569; line-height: 1.6;">
                Halo! Selamat datang di PortoTree. 
              </p>
              <p style="margin: 0 0 30px 0; font-size: 16px; color: #475569; line-height: 1.6;">
                Masukkan 6-digit kode berikut ke halaman pendaftaran Anda untuk memverifikasi alamat email ini:
              </p>
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="center">
                    <div style="display: inline-block; padding: 16px 32px; background-color: #f1f5f9; color: #0f172a; font-weight: 700; font-size: 28px; letter-spacing: 4px; border-radius: 12px; border: 1px dashed #cbd5e1;">
                      ${code}
                    </div>
                  </td>
                </tr>
              </table>
              <p style="margin: 30px 0 0 0; font-size: 14px; color: #64748b; line-height: 1.6;">
                Kode ini hanya berlaku selama 15 menit.
              </p>
            </td>
          </tr>
          <tr>
            <td style="padding: 24px 30px; background-color: #f8fafc; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; font-size: 13px; color: #94a3b8;">
                Jika Anda tidak membuat akun ini, Anda bisa mengabaikan email ini.
              </p>
            </td>
          </tr>
        </table>
        <p style="margin: 20px 0 0 0; font-size: 13px; color: #94a3b8; text-align: center;">
          &copy; ${new Date().getFullYear()} PortoTree. All rights reserved.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>
      `,
    });
    return { success: true, data };
  } catch (error) {
    return { success: false, error };
  }
}
