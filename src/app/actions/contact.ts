"use server";

import { resend } from "@/lib/resend";

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const subject = formData.get("subject") as string;
  const message = formData.get("message") as string;

  if (!name || !email || !message) {
    return { error: "Semua kolom wajib diisi" };
  }

  // Map subjects to readable labels
  const subjectMap: Record<string, string> = {
    general: "Pertanyaan Umum",
    support: "Bantuan Teknis / Bug",
    business: "Kerjasama / Partnership",
    feedback: "Saran & Kritik",
  };
  const subjectLabel = subjectMap[subject] || subject;

  try {
    const data = await resend.emails.send({
      from: "PortoTree <hello@portotree.com>",
      to: ["csportotree@gmail.com"],
      replyTo: email,
      subject: `[Hubungi Kami] ${subjectLabel} - ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0f172a;">Pesan Baru dari Form Kontak PortoTree</h2>
          <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <p style="margin: 0 0 10px 0;"><strong>Nama Pengirim:</strong> ${name}</p>
            <p style="margin: 0 0 10px 0;"><strong>Email Pengirim:</strong> <a href="mailto:${email}">${email}</a></p>
            <p style="margin: 0 0 0 0;"><strong>Topik Pembahasan:</strong> ${subjectLabel}</p>
          </div>
          <h3 style="color: #0f172a;">Isi Pesan:</h3>
          <div style="background-color: #ffffff; padding: 20px; border: 1px solid #e2e8f0; border-radius: 8px;">
            <p style="white-space: pre-wrap; margin: 0; color: #334155; line-height: 1.6;">${message}</p>
          </div>
        </div>
      `,
    });

    if (data.error) {
      console.error("Resend API Error:", data.error);
      return { error: "Gagal mengirim pesan melalui server email." };
    }

    return { success: true };
  } catch (error) {
    console.error("System Error:", error);
    return { error: "Terjadi kesalahan internal server." };
  }
}
