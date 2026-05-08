"use client";

import { Upload } from "lucide-react";
import { ChangeEvent, useState } from "react";

export default function FileUploader() {
  const [file, setFile] = useState<File | null>(null);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }

  return (
    <div className="">
      <button className="w-full flex items-center justify-center gap-2 text-gray-400 border-2 border-dashed border-gray-400 hover:border-blue-400 p-4 rounded-lg cursor-pointer">
        <Upload className="w-5 h-5" />
        <label htmlFor="actual-btn" className="">
          Upload files (images, documents)
        </label>
        <input type="file" onChange={handleFileChange} id="actual-btn" hidden />
        {file && (
          <span className="">
            {file.name} {file.size}
          </span>
        )}
      </button>
    </div>
  );
}
