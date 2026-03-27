"use client";

import { Loader2, Paperclip, CheckCircle2, AlertTriangle } from "lucide-react";
import React, { useRef, useState } from "react";
import clsx from "clsx";
import { useFileUpload } from "@/app/hooks/useFileUpload";

interface FileUploadInputProps {
  onUploadSuccess: (url: string) => void;
  label?: string;
  className?: string;
}

export const FileUploadInput: React.FC<FileUploadInputProps> = ({
  onUploadSuccess,
  label,
  className,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    mutate: uploadFile,
    isPending,
    isError,
    isSuccess,
  } = useFileUpload({
    onSuccess: onUploadSuccess,
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);

      uploadFile(file, {
        onSuccess: (url: string) => {
          onUploadSuccess(url);
        },
        onError: () => {
          setTimeout(() => setFileName(null), 2000);
        },
      });
    }
  };

  const handleClick = () => {
    if (isPending) return;
    fileInputRef.current?.click();
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-1">{label}</label>
      )}

      <div
        onClick={handleClick}
        className={clsx(
          "h-[38px] mt-[5px] rounded-[5px] border bg-white border-[#444444]/20 flex items-center px-3 text-sm transition-colors",
          isPending
            ? "cursor-not-allowed bg-gray-100"
            : "cursor-pointer hover:bg-gray-50",
          isError && "border-red-500 bg-red-50 text-red-600",
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          disabled={isPending}
        />

        {isPending && (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            <span className="truncate">Uploading: {fileName}</span>
          </>
        )}

        {isSuccess && !isPending && (
          <>
            <CheckCircle2 className="text-green-500 mr-2 h-4 w-4" />
            <span className="truncate text-gray-700">{fileName}</span>
          </>
        )}

        {isError && !isPending && (
          <>
            <AlertTriangle className="mr-2 h-4 w-4" />
            <span>Upload failed. Click to retry.</span>
          </>
        )}

        {!isPending && !isSuccess && !isError && (
          <>
            <Paperclip className="mr-2 h-4 w-4 text-gray-400" />
            <span className="text-gray-500">Click to attach a file</span>
          </>
        )}
      </div>
    </div>
  );
};
