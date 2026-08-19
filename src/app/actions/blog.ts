"use server";

import { adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";
import { MASTER_CATEGORIES } from "@/lib/blogCategories";


export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  category?: string; // New Category Field
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

// READ ALL PUBLISHED (For Public Site)
export async function getPublishedBlogs(): Promise<{ success: boolean; data?: BlogPost[]; error?: string }> {
  try {
    const snapshot = await adminDb
      .collection("blogs")
      .where("status", "==", "published")
      .orderBy("createdAt", "desc")
      .limit(10)
      .get();
    
    const blogs: BlogPost[] = snapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
      createdAt: doc.data().createdAt?.toDate()?.toISOString() || null,
      updatedAt: doc.data().updatedAt?.toDate()?.toISOString() || null,
    })) as BlogPost[];

    return { success: true, data: blogs };
  } catch (error: any) {
    console.error("[getPublishedBlogs] Error:", error);
    return { success: false, error: "Gagal mengambil daftar blog." };
  }
}

// READ SINGLE BY SLUG (For Public Site)
export async function getBlogBySlug(slug: string): Promise<{ success: boolean; data?: BlogPost; error?: string }> {
  try {
    const snapshot = await adminDb
      .collection("blogs")
      .where("slug", "==", slug)
      .where("status", "==", "published")
      .limit(1)
      .get();

    if (snapshot.empty) {
      return { success: false, error: "Artikel tidak ditemukan atau belum dipublikasikan." };
    }

    const doc = snapshot.docs[0];
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
    console.error("[getBlogBySlug] Error:", error);
    return { success: false, error: "Gagal mengambil artikel." };
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

// GET unique categories that have at least 1 published post
export async function getPublishedCategories(): Promise<{
  success: boolean;
  data?: { slug: string; label: string; description: string }[];
  error?: string;
}> {
  try {
    const snapshot = await adminDb
      .collection("blogs")
      .where("status", "==", "published")
      .get();

    const dbLabels = new Set<string>();
    snapshot.docs.forEach((doc) => {
      const cat = doc.data().category as string | undefined;
      if (cat) dbLabels.add(cat.trim());
    });

    const categories: { slug: string; label: string; description: string }[] = [];
    
    // 1. Add standard categories that exist in DB (preserves master order)
    MASTER_CATEGORIES.forEach((mc) => {
      if (Array.from(dbLabels).some(label => label.toLowerCase() === mc.label.toLowerCase())) {
        categories.push(mc);
      }
    });

    // 2. Add custom categories that are not in MASTER_CATEGORIES
    const { labelToSlug } = await import("@/lib/blogCategories");
    
    Array.from(dbLabels).forEach((label) => {
      const isMaster = MASTER_CATEGORIES.some(mc => mc.label.toLowerCase() === label.toLowerCase());
      if (!isMaster) {
        categories.push({
          slug: labelToSlug(label),
          label: label,
          description: "Artikel pilihan terkait " + label
        });
      }
    });

    console.log("[getPublishedCategories] categories found:", categories.map(c => c.slug));
    return { success: true, data: categories };
  } catch (error: any) {
    console.error("[getPublishedCategories] Error:", error);
    return { success: false, error: "Gagal mengambil kategori." };
  }
}

