"use server";

import { adminDb } from "@/lib/firebase/server";
import { revalidatePath } from "next/cache";

export interface Announcement {
  id: string;
  title: string;
  description: string;
  badgeText: string;
  linkUrl: string;
  themeStyle: "indigo" | "emerald" | "amber" | "rose" | "slate" | "blue";
  iconType: "Sparkles" | "Megaphone" | "Gift" | "AlertCircle" | "Info";
  isActive: boolean;
  createdAt: string;
}

const COLLECTION = "system_announcements";

export async function getActiveAnnouncements(): Promise<{ success: boolean; data?: Announcement[]; error?: string }> {
  try {
    const snapshot = await adminDb
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    const announcements: Announcement[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.isActive) {
        announcements.push({
          id: doc.id,
          title: data.title,
          description: data.description,
          badgeText: data.badgeText,
          linkUrl: data.linkUrl,
          themeStyle: data.themeStyle || "indigo",
          iconType: data.iconType || "Sparkles",
          isActive: data.isActive,
          createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date(data.createdAt || Date.now()).toISOString(),
        });
      }
    });

    return { success: true, data: announcements };
  } catch (error: any) {
    console.error("Error fetching active announcements:", error);
    return { success: false, error: error.message || "Failed to fetch announcements" };
  }
}

export async function getAllAnnouncements(): Promise<{ success: boolean; data?: Announcement[]; error?: string }> {
  try {
    const snapshot = await adminDb
      .collection(COLLECTION)
      .orderBy("createdAt", "desc")
      .get();

    const announcements: Announcement[] = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      announcements.push({
        id: doc.id,
        title: data.title,
        description: data.description,
        badgeText: data.badgeText,
        linkUrl: data.linkUrl,
        themeStyle: data.themeStyle || "indigo",
        iconType: data.iconType || "Sparkles",
        isActive: data.isActive,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date(data.createdAt || Date.now()).toISOString(),
      });
    });

    return { success: true, data: announcements };
  } catch (error: any) {
    console.error("Error fetching all announcements:", error);
    return { success: false, error: error.message || "Failed to fetch announcements" };
  }
}

export async function saveAnnouncement(data: Omit<Announcement, "id" | "createdAt">, id?: string): Promise<{ success: boolean; error?: string }> {
  try {
    if (id) {
      await adminDb.collection(COLLECTION).doc(id).update({
        ...data,
      });
    } else {
      await adminDb.collection(COLLECTION).add({
        ...data,
        createdAt: new Date(),
      });
    }
    
    revalidatePath("/personal/dashboard");
    revalidatePath("/own-subdomain/announcements");
    return { success: true };
  } catch (error: any) {
    console.error("Error saving announcement:", error);
    return { success: false, error: error.message || "Failed to save announcement" };
  }
}

export async function deleteAnnouncement(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    await adminDb.collection(COLLECTION).doc(id).delete();
    revalidatePath("/personal/dashboard");
    revalidatePath("/own-subdomain/announcements");
    return { success: true };
  } catch (error: any) {
    console.error("Error deleting announcement:", error);
    return { success: false, error: error.message || "Failed to delete announcement" };
  }
}

export async function toggleAnnouncementStatus(id: string, currentStatus: boolean): Promise<{ success: boolean; error?: string }> {
  try {
    await adminDb.collection(COLLECTION).doc(id).update({
      isActive: !currentStatus
    });
    revalidatePath("/personal/dashboard");
    revalidatePath("/own-subdomain/announcements");
    return { success: true };
  } catch (error: any) {
    console.error("Error toggling announcement status:", error);
    return { success: false, error: error.message || "Failed to toggle status" };
  }
}
