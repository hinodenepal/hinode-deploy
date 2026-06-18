"use client";

import React, { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

interface RichTextEditorProps {
  value: string;
  onChange: (content: string) => void;
  placeholder?: string;
  height?: number;
}

export default function RichTextEditor({ value, onChange, placeholder, height = 400 }: RichTextEditorProps) {
  const editorRef = useRef<any>(null);

  const handleImageUpload = async (blobInfo: any, progress: (p: number) => void) => {
    return new Promise<string>(async (resolve, reject) => {
      try {
        const formData = new FormData();
        formData.append("file", blobInfo.blob(), blobInfo.filename());

        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          reject(errorData.error || "HTTP Error: " + response.status);
          return;
        }

        const data = await response.json();
        if (data.success && data.url) {
          resolve(data.url);
        } else {
          reject(data.error || "Upload failed");
        }
      } catch (err: any) {
        reject("Upload failed: " + err.message);
      }
    });
  };

  return (
    <div className="border border-[#D1CCC5] rounded-sm overflow-hidden bg-white">
      <Editor
        tinymceScriptSrc="/tinymce/tinymce.min.js"
        licenseKey="gpl"
        onInit={(evt, editor) => (editorRef.current = editor)}
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          height,
          menubar: true,
          plugins: [
            "advlist", "autolink", "lists", "link", "image", "charmap", "preview",
            "anchor", "searchreplace", "visualblocks", "code", "fullscreen",
            "insertdatetime", "media", "table", "code", "help", "wordcount"
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "image media table | removeformat | help",
          content_style: "body { font-family:Inter,Helvetica,Arial,sans-serif; font-size:14px; color: #2C2C2C; }",
          placeholder: placeholder,
          images_upload_handler: handleImageUpload,
          image_caption: true,
          automatic_uploads: true,
          file_picker_types: "image",
          skin: "oxide",
          content_css: "default",
          promotion: false,
        }}
      />
    </div>
  );
}
