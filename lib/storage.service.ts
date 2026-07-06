import { createClient } from "./supabase/client";

export async function uploadEvidenceFile(
  disputeId: string,
  file: File,
  userId: string
) {
  // Validate file type
  const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
  if (!allowedTypes.includes(file.type)) {
    throw new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed.");
  }

  // Validate size (10MB = 10 * 1024 * 1024 bytes)
  const maxSize = 10 * 1024 * 1024;
  if (file.size > maxSize) {
    throw new Error("File exceeds the maximum size of 10MB.");
  }

  const supabase = createClient();
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
  const path = `${disputeId}/${timestamp}_${safeName}`;

  const { data, error } = await supabase.storage
    .from("dispute-evidence")
    .upload(path, file, {
      cacheControl: "3600",
      upsert: false,
    });

  if (error) {
    console.error("Storage upload error:", error);
    throw error;
  }

  // Generate signed URL valid for 7 days (604800 seconds)
  const { data: signedData, error: signedError } = await supabase.storage
    .from("dispute-evidence")
    .createSignedUrl(path, 604800);

  if (signedError) {
    console.error("Signed URL error:", signedError);
    throw signedError;
  }

  return {
    path,
    signedUrl: signedData.signedUrl,
  };
}

export function uploadEvidenceFileWithProgress(
  disputeId: string,
  file: File,
  userId: string,
  onProgress: (progress: number) => void
): Promise<{ path: string; signedUrl: string }> {
  return new Promise((resolve, reject) => {
    // Validate file type
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      reject(new Error("Invalid file type. Only JPEG, PNG, and PDF are allowed."));
      return;
    }

    // Validate size (10MB = 10 * 1024 * 1024 bytes)
    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      reject(new Error("File exceeds the maximum size of 10MB."));
      return;
    }

    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9.]/g, "_");
    const path = `${disputeId}/${timestamp}_${safeName}`;

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      reject(new Error("Supabase credentials are not configured properly."));
      return;
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${supabaseUrl}/storage/v1/object/dispute-evidence/${path}`, true);
    xhr.setRequestHeader("Authorization", `Bearer ${supabaseAnonKey}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentComplete = Math.round((event.loaded / event.total) * 100);
        onProgress(percentComplete);
      }
    };

    xhr.onload = async () => {
      if (xhr.status === 200 || xhr.status === 201) {
        try {
          const supabase = createClient();
          const { data: signedData, error: signedError } = await supabase.storage
            .from("dispute-evidence")
            .createSignedUrl(path, 604800);

          if (signedError) {
            reject(signedError);
          } else {
            resolve({ path, signedUrl: signedData.signedUrl });
          }
        } catch (err) {
          reject(err);
        }
      } else {
        try {
          const responseBody = JSON.parse(xhr.responseText);
          reject(new Error(responseBody.message || "Failed to upload file."));
        } catch {
          reject(new Error(`Failed to upload file (Status ${xhr.status}).`));
        }
      }
    };

    xhr.onerror = () => {
      reject(new Error("Network error occurred during file upload."));
    };

    xhr.send(file);
  });
}

export async function deleteEvidenceFile(path: string) {
  const supabase = createClient();
  const { error } = await supabase.storage
    .from("dispute-evidence")
    .remove([path]);

  if (error) {
    console.error("Storage delete error:", error);
    throw error;
  }
}
