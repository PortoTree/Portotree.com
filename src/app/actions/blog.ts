"use server";

import { adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string; // HTML content from Rich Text Editor
  coverImage: string | null;
  status: 'draft' | 'published';
  createdAt: any;
  updatedAt: any;
};

// CREATE
export async function createBlog(data: Partial<BlogPost>): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const blogRef = adminDb.collection("blogs").doc(); // Auto ID
    
    // Check if slug is unique
    if (data.slug) {
      const slugCheck = await adminDb.collection("blogs").where("slug", "==", data.slug).get();
      if (!slugCheck.empty) {
        return { success: false, error: "Slug sudah digunakan, silakan pilih yang lain." };
      }
    }

    const newBlog = {
      ...data,
      id: blogRef.id,
      createdAt: FieldValue.serverTimestamp(),
      updatedAt: FieldValue.serverTimestamp(),
    };

    await blogRef.set(newBlog);
    return { success: true, id: blogRef.id };
  } catch (error: any) {
    console.error("[createBlog] Error:", error);
    return { success: false, error: error.message || "Gagal membuat blog." };
  }
}

// READ ALL (For Admin Dashboard)
export async function getAdminBlogs(): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> {
  try {
    const snapshot = await adminDb.collection("blogs").orderBy("createdAt", "desc").get();
    
    const blogs: BlogPost[] = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate()?.toISOString() || null,
    })) as BlogPost[];

    return { success: true, data: blogs };
  } catch (error: any) {
    console.error("[getAdminBlogs] Error:", error);
    return { success: false, error: "Gagal mengambil daftar blog." };
  }
}

// READ SINGLE
export async function getBlogById(id: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
  try {
    const doc = await adminDb.collection("blogs").doc(id).get();
    if (!doc.exists) {
      return { success: false, error: "Blog tidak ditemukan." };
    }

    const data = doc.data() as BlogPost;
    return { 
      success: true, 
      data: {
        ...data,
        id: doc.id,
        createdAt: data.createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: data.updatedAt?.toDate?.()?.toISOString() || null,
      } 
    };
  } catch (error: any) {
    console.error("[getBlogById] Error:", error);
    return { success: false, error: "Gagal mengambil blog." };
  }
}

// UPDATE
export async function updateBlog(id: string, data: Partial<BlogPost>): Promise<{ success: boolean; error?: string }> {
  try {
    const blogRef = adminDb.collection("blogs").doc(id);
    
    // If slug is updated, check uniqueness
    if (data.slug) {
      const slugCheck = await adminDb.collection("blogs").where("slug", "==", data.slug).get();
      const duplicate = slugCheck.docs.find(doc => doc.id !== id);
      if (duplicate) {
        return { success: false, error: "Slug sudah digunakan, silakan pilih yang lain." };
      }
    }

    await blogRef.update({
      ...data,
      updatedAt: FieldValue.serverTimestamp(),
    });
    
    return { success: true };
  } catch (error: any) {
    console.error("[updateBlog] Error:", error);
    return { success: false, error: error.message || "Gagal memperbarui blog." };
  }
}

// DELETE
export async function deleteBlog(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await adminDb.collection("blogs").doc(id).delete();
    return { success: true };
  } catch (error: any) {
    console.error("[deleteBlog] Error:", error);
    return { success: false, error: "Gagal menghapus blog." };
  }
}
