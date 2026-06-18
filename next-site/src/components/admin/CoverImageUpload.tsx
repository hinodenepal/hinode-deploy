"use client";

import React, { useState } from "react";
import { UploadCloud, Loader2 } from "lucide-react";

interface CoverImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function CoverImageUpload({ value, onChange }: CoverImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to upload image");
      }

      const data = await response.json();
      if (data.success && data.url) {
        onChange(data.url);
      } else {
        throw new Error(data.error || "Upload failed");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#D1CCC5] border-dashed rounded-sm cursor-pointer bg-[#FAF9F6] hover:bg-[#F4F1EC] transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            {uploading ? (
              <Loader2 className="w-8 h-8 mb-3 text-[#A39E99] animate-spin" />
            ) : (
              <UploadCloud className="w-8 h-8 mb-3 text-[#A39E99]" />
            )}
            <p className="mb-2 text-sm text-[#5A5A5A]">
              <span className="font-semibold">{uploading ? "Uploading..." : "Click to upload"}</span> or drag and drop
            </p>
            <p className="text-xs text-[#A39E99]">SVG, PNG, JPG or GIF (MAX. 5MB)</p>
          </div>
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
        </label>
      </div>

      {error && <p className="text-xs text-red-500">{error}</p>}

      {value && (
        <div>
          <span className="block text-xs uppercase tracking-widest text-[#5A5A5A] mb-2">Image Preview</span>
          <div className="aspect-[16/7] rounded-sm overflow-hidden border border-[#E8E5DF]">
            <img src={value} alt="Preview" className="w-full h-full object-cover" />
          </div>
        </div>
      )}
    </div>
  );
}
