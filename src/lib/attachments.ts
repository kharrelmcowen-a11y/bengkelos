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

export const ATTACHMENT_BUCKET = "ticket-attachments";

// Long enough to open a photo from the ticket page, short enough that a copied
// link is not a lasting handout.
export const ATTACHMENT_URL_TTL_SECONDS = 60 * 60;

/**
 * The bucket is private, so rows store the storage key. Rows written while the
 * bucket was public hold a full URL instead — take the key out of those.
 */
export function attachmentStoragePath(stored: string): string {
  const marker = `/${ATTACHMENT_BUCKET}/`;
  const index = stored.indexOf(marker);
  return index === -1 ? stored : stored.slice(index + marker.length);
}
