"use server";

import { adminDb } from "@/lib/firebase/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function broadcastLatestBlog() {
  try {
    // 1. Get the latest published blog
    const blogSnapshot = await adminDb
      .collection("blogs")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .limit(1)
      .get();

    if (blogSnapshot.empty) {
      return { success: false, error: "Tidak ada artikel yang dipublikasikan." };
    }

    const latestBlog = blogSnapshot.docs[0].data();
    const blogId = blogSnapshot.docs[0].id;

    // Optional: Check if already broadcasted (if you want to prevent double sending)
    // if (latestBlog.broadcasted) {
    //   return { success: false, error: "Artikel ini sudah pernah di-broadcast." };
    // }

    // 2. Get all subscribers
    const subSnapshot = await adminDb.collection("subscribers").get();
    if (subSnapshot.empty) {
      return { success: false, error: "Belum ada subscriber." };
    }

    const emails = subSnapshot.docs.map(doc => doc.data().email).filter(Boolean);

    if (emails.length === 0) {
      return { success: false, error: "Tidak ada email subscriber yang valid." };
    }

    // 3. Prepare email content
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portotree.com";
    const articleUrl = `${siteUrl}/blog/${latestBlog.slug}`;

    // Buat excerpt / cuplikan dari konten (hapus tag HTML dan ambil ~300 karakter)
    const rawText = latestBlog.content ? latestBlog.content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() : '';
    const previewExcerpt = rawText.length > 300 ? rawText.substring(0, 300) + '...' : rawText;

    const subject = `Artikel Baru: ${latestBlog.title}`;
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
      </head>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f4f4f5; margin: 0; padding: 20px;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
          
          <!-- HEADER LOGO -->
          <div style="padding: 24px; text-align: center; border-bottom: 1px solid #f4f4f5;">
            <img src="${siteUrl}/logo-landscape.png" alt="PortoTree" style="height: 40px; width: auto;" />
          </div>

          <!-- COVER IMAGE -->
          ${latestBlog.coverImage ? '<img src="' + latestBlog.coverImage + '" alt="Cover" style="width: 100%; height: auto; display: block;" />' : ''}

          <!-- CONTENT -->
          <div style="padding: 32px 24px;">
            <div style="margin-bottom: 16px;">
              <span style="display: inline-block; padding: 4px 12px; background-color: #ecfdf5; color: #059669; border-radius: 9999px; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.5px;">
                ${latestBlog.category || 'Karier'}
              </span>
            </div>
            
            <h1 style="margin: 0 0 16px 0; color: #18181b; font-size: 24px; line-height: 1.3;">
              ${latestBlog.title}
            </h1>

            <div style="color: #52525b; font-size: 16px; line-height: 1.6; margin-bottom: 32px;">
              <p style="margin: 0;">${previewExcerpt}</p>
            </div>

            <div style="text-align: center;">
              <a href="${articleUrl}" style="display: inline-block; background-color: #059669; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 16px;">
                Baca di Web
              </a>
            </div>
          </div>

          <!-- FOOTER -->
          <div style="background-color: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #f1f5f9;">
            <p style="margin: 0; color: #64748b; font-size: 13px; line-height: 1.5;">
              Kamu menerima email ini karena telah berlangganan newsletter di blog PortoTree.
            </p>
            <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;">
              &copy; ${new Date().getFullYear()} PortoTree. All rights reserved.
            </p>
          </div>

        </div>
      </body>
      </html>
    `;

    // 4. Send emails via Resend (Using batch sending if more than 50, but for now we loop or send in one go)
    // Resend free tier limits to 100/day. We can use the batch API or send individually.
    // For simplicity and to avoid hitting "to" array limits, we can send to multiple recipients using Bcc, 
    // or map to individual promises. Sending to a list of Bcc is easier if it's less than 50.
    
    // According to Resend docs, to send multiple emails, we can pass an array to "to" (up to 50), 
    // or use the batch API. Let's use individual promises for better tracking.
    
    const BATCH_SIZE = 50;
    for (let i = 0; i < emails.length; i += BATCH_SIZE) {
      const batchEmails = emails.slice(i, i + BATCH_SIZE);
      const { data, error } = await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL || "PortoTree <onboarding@resend.dev>",
        to: batchEmails,
        subject: subject,
        html: htmlContent,
      });

      if (error) {
        console.error("Resend API Error:", error);
        throw new Error(error.message);
      }
    }

    // Mark blog as broadcasted (Optional, but good practice)
    await adminDb.collection("blogs").doc(blogId).update({
      broadcasted: true,
      broadcastedAt: new Date().toISOString()
    });

    return { success: true, count: emails.length };
  } catch (error: any) {
    console.error("[broadcastLatestBlog] Error:", error);
    return { success: false, error: "Gagal mengirim email: " + (error.message || "Unknown error") };
  }
}
