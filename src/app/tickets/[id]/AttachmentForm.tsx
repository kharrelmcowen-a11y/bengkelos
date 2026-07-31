"use client";

import { useState, useRef } from "react";
import { useAction } from "next-safe-action/hooks";
import { uploadAttachment, deleteAttachment } from "../actions";
import { firstActionError } from "@/lib/action-error";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, X, Image as ImageIcon, FileText, Trash2 } from "lucide-react";
import {
  ALLOWED_ATTACHMENT_MIME_TYPES,
  MAX_ATTACHMENT_BYTES,
  isAllowedAttachmentMimeType,
} from "@/lib/attachments";

type Attachment = {
  id: string;
  file_name: string;
  file_type: string;
  file_url: string;
  mime_type: string;
  created_at: string;
};

export function AttachmentForm({
  ticketId,
  existingAttachments,
}: {
  ticketId: string;
  existingAttachments: Attachment[];
}) {
  const { execute: upload, isExecuting: isUploading, result: uploadResult } = useAction(uploadAttachment);
  const { execute: deleteAttachmentAction, isExecuting: isDeleting } = useAction(deleteAttachment);
  
  const [localError, setLocalError] = useState<string | null>(null);
  const uploadError = localError ?? firstActionError(uploadResult);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileType, setFileType] = useState<"before" | "after" | "document" | "other">("other");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Mirrors the checks in uploadAttachment — this pair only saves a round trip,
  // the server rejects the same cases regardless.
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > MAX_ATTACHMENT_BYTES) {
      setLocalError("File terlalu besar. Maksimal 10MB.");
      return;
    }
    if (!isAllowedAttachmentMimeType(file.type)) {
      setLocalError("Tipe file tidak didukung. Hanya gambar dan PDF.");
      return;
    }

    setLocalError(null);
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    if (!isAllowedAttachmentMimeType(selectedFile.type)) return;

    const fileData = await fileToBase64(selectedFile);
    upload({
      ticketId,
      fileName: selectedFile.name,
      fileType,
      fileSize: selectedFile.size,
      mimeType: selectedFile.type,
      fileData,
    });

    setSelectedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
        const base64 = result.split(",")[1];
        resolve(base64);
      };
      reader.onerror = reject;
    });
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith("image/")) return <ImageIcon className="size-4" />;
    return <FileText className="size-4" />;
  };

  return (
    <div className="mt-6 space-y-4">
      <h2 className="text-sm font-medium text-muted-foreground">
        Lampiran Foto/Dokumen
      </h2>

      {/* Upload Form */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <Input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            accept={ALLOWED_ATTACHMENT_MIME_TYPES.join(",")}
            disabled={isUploading}
            className="flex-1"
          />
          <select
            value={fileType}
            onChange={(e) => setFileType(e.target.value as "before" | "after" | "document" | "other")}
            className="h-10 rounded-lg border border-input bg-transparent px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
            disabled={isUploading}
          >
            <option value="before">Sebelum</option>
            <option value="after">Sesudah</option>
            <option value="document">Dokumen</option>
            <option value="other">Lainnya</option>
          </select>
        </div>

        {selectedFile && (
          <div className="flex items-center justify-between rounded-lg border p-3">
            <div className="flex items-center gap-2">
              {getFileIcon(selectedFile.type)}
              <span className="text-sm">{selectedFile.name}</span>
              <span className="text-xs text-muted-foreground">
                ({(selectedFile.size / 1024).toFixed(1)} KB)
              </span>
            </div>
            <div className="flex gap-2">
              <Button
                type="button"
                size="sm"
                onClick={handleUpload}
                disabled={isUploading}
              >
                <Upload className="size-4" />
                {isUploading ? "Mengupload..." : "Upload"}
              </Button>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => setSelectedFile(null)}
              >
                <X className="size-4" />
              </Button>
            </div>
          </div>
        )}

        {uploadError && (
          <Alert variant="destructive">
            <AlertDescription>{uploadError}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Existing Attachments */}
      {existingAttachments.length > 0 && (
        <div className="space-y-2">
          {existingAttachments.map((attachment) => (
            <div
              key={attachment.id}
              className="flex items-center justify-between rounded-lg border p-3"
            >
              <div className="flex items-center gap-2">
                {getFileIcon(attachment.mime_type || "application/octet-stream")}
                <div>
                  <span className="text-sm">{attachment.file_name}</span>
                  <p className="text-xs text-muted-foreground capitalize">
                    {attachment.file_type}
                  </p>
                </div>
              </div>
              <Button
                type="button"
                size="sm"
                variant="ghost"
                onClick={() => deleteAttachmentAction({ attachmentId: attachment.id })}
                disabled={isDeleting}
              >
                <Trash2 className="size-4" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}