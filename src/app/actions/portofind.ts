"use server";

import { adminDb } from "@/lib/firebase/server";
import { FieldValue } from "firebase-admin/firestore";

export async function toggleBookmark(userId: string, postId: string) {
  try {
    const docRef = adminDb.collection('portofind_bookmarks').doc(userId);
    const docSnap = await docRef.get();

    if (!docSnap.exists) {
      await docRef.set({
        savedPosts: [postId]
      });
      return { success: true, bookmarked: true };
    }

    const data = docSnap.data();
    const savedPosts = data?.savedPosts || [];

    if (savedPosts.includes(postId)) {
      await docRef.update({
        savedPosts: FieldValue.arrayRemove(postId)
      });
      return { success: true, bookmarked: false };
    } else {
      await docRef.update({
        savedPosts: FieldValue.arrayUnion(postId)
      });
      return { success: true, bookmarked: true };
    }
  } catch (error: any) {
    console.error("Error toggling bookmark:", error);
    return { success: false, error: error.message };
  }
}

export async function getBookmarkedPosts(userId: string) {
  try {
    const docRef = adminDb.collection('portofind_bookmarks').doc(userId);
    const docSnap = await docRef.get();
    
    if (!docSnap.exists) {
      return { success: true, savedPosts: [] };
    }

    return { success: true, savedPosts: docSnap.data()?.savedPosts || [] };
  } catch (error: any) {
    console.error("Error fetching bookmarks:", error);
    return { success: false, error: error.message };
  }
}
