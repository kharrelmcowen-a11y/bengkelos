// Shared between the upload form (client) and the upload action (server).
// Lives outside "use server" files because those may only export async functions.

export const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

export const ALLOWED_ATTACHMENT_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "application/pdf",
] as const;

export type AllowedAttachmentMimeType =
  (typeof ALLOWED_ATTACHMENT_MIME_TYPES)[number];

export function isAllowedAttachmentMimeType(
  mime: string,
): mime is AllowedAttachmentMimeType {
  return (ALLOWED_ATTACHMENT_MIME_TYPES as readonly string[]).includes(mime);
}

/**
 * Strips path separators and anything that could escape the ticket folder,
 * so a client-supplied name can never steer the storage key.
 */
export function sanitizeFileName(name: string): string {
  const flat = name.replace(/^.*[\\/]/, "");
  const safe = flat
    .replace(/[^\w.-]+/g, "_")
    // Leading dots/underscores carry no information and produce keys like "..".
    .replace(/^[._]+|_+$/g, "")
    .slice(0, 120);
  return safe || "file";
}
