"use client";

import React, { useState, useRef } from "react";
import { Button } from "./button";
import { UploadCloud, Loader2 } from "lucide-react";

interface ImageUploadProps {
  onUploadSuccess: (url: string) => void;
  className?: string;
}

export function ImageUpload({ onUploadSuccess, className = "" }: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

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
        alert("Gagal mengunggah. Pastikan preset dan cloud name sudah benar.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Terjadi kesalahan saat mengunggah gambar.");
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleUpload}
        className="hidden"
      />
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
    </div>
  );
}
