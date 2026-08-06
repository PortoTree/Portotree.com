"use client";

import React, { useState, useRef } from "react";
import { Button } from "./button";
import { UploadCloud, Loader2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  className?: string;
  customTrigger?: React.ReactNode;
}

export function ImageUpload({ onUploadSuccess, className = "", customTrigger }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate format (JPG, PNG)
    const validTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!validTypes.includes(file.type)) {
      toast.error("Format file tidak valid. Harap unggah format JPG atau PNG.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate size (Max 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      toast.error("Ukuran file terlalu besar. Maksimal 5MB.");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "");

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        onUploadSuccess(data.secure_url);
      } else {
        toast.error("Gagal mengunggah. Pastikan preset dan cloud name sudah benar.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input
        type="file"
        accept="image/jpeg, image/png"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />
      {customTrigger ? (
        <div onClick={() => !isUploading && fileInputRef.current?.click()} className={isUploading ? "opacity-50 cursor-wait pointer-events-none" : "cursor-pointer"}>
          {customTrigger}
        </div>
      ) : (
        <Button 
          type="button" 
          variant="outline" 
          size="sm"
          disabled={isUploading}
          onClick={() => fileInputRef.current?.click()}
          className="w-full flex items-center justify-center gap-2 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
        >
          {isUploading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <UploadCloud className="w-4 h-4" />
          )}
          {isUploading ? "Mengunggah..." : "Upload Gambar"}
        </Button>
      )}
    </div>
  );
}
