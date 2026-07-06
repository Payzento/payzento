"use client";

import { Upload, X, CheckCircle2, AlertCircle } from "lucide-react";
import React, { useState, DragEvent } from "react";

export interface QueuedFile {
  id: string;
  file: File;
  progress: number;
  status: "idle" | "uploading" | "success" | "error";
  error?: string;
  uploadedUrl?: string;
}

interface FileUploaderProps {
  files: QueuedFile[];
  setFiles: React.Dispatch<React.SetStateAction<QueuedFile[]>>;
}

export default function FileUploader({ files, setFiles }: FileUploaderProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const validateAndAddFiles = (fileList: FileList) => {
    setErrorMsg("");
    const newFiles: QueuedFile[] = [];

    // Max 5 files total
    if (files.length + fileList.length > 5) {
      setErrorMsg("You can only upload up to 5 files per dispute.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    const maxSize = 10 * 1024 * 1024; // 10MB

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      let fileError = "";

      if (!allowedTypes.includes(file.type)) {
        fileError = "Invalid file type. Only JPEG, PNG, and PDF are allowed.";
      } else if (file.size > maxSize) {
        fileError = "File exceeds the maximum size of 10MB.";
      }

      newFiles.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        progress: 0,
        status: fileError ? "error" : "idle",
        error: fileError,
      });
    }

    setFiles((prev) => [...prev, ...newFiles]);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndAddFiles(e.dataTransfer.files);
    }
  };

  const handleBrowse = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndAddFiles(e.target.files);
    }
  };

  const handleRemove = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
          isDragOver
            ? "border-blue-500 bg-blue-500/5"
            : "border-border hover:border-blue-500 bg-background"
        }`}
      >
        <Upload className="w-8 h-8 text-muted-foreground" />
        <p className="text-sm font-semibold text-foreground text-center">
          Drag and drop evidence files here, or{" "}
          <label className="text-blue-500 hover:underline cursor-pointer">
            browse
            <input
              type="file"
              multiple
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleBrowse}
              className="hidden"
            />
          </label>
        </p>
        <p className="text-xs text-muted-foreground">
          Accepted: JPEG, PNG, PDF (Max 10MB each, up to 5 files)
        </p>
      </div>

      {errorMsg && (
        <div className="text-xs text-red-500 flex items-center gap-1.5 font-semibold">
          <AlertCircle className="w-4 h-4" />
          {errorMsg}
        </div>
      )}

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((item) => (
            <div
              key={item.id}
              className="border border-border/80 rounded-xl p-3.5 bg-card flex flex-col gap-2 relative transition-all"
            >
              <div className="flex items-center justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-foreground truncate">
                    {item.file.name}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatSize(item.file.size)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {item.status === "success" && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                  {item.status === "error" && (
                    <AlertCircle className="w-5 h-5 text-red-500" />
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemove(item.id)}
                    className="p-1 hover:bg-muted rounded text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                  >
                    <X className="w-4.5 h-4.5" />
                  </button>
                </div>
              </div>

              {item.status === "uploading" && (
                <div className="w-full bg-muted h-1.5 rounded-full overflow-hidden">
                  <div
                    className="bg-blue-600 h-full rounded-full transition-all duration-300"
                    style={{ width: `${item.progress}%` }}
                  />
                </div>
              )}

              {item.error && (
                <p className="text-xs text-red-500 font-semibold">{item.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
