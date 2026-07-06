import { createClient } from "./supabase/client";

export async function sendMessage(
  disputeId: string,
  senderId: string,
  senderRole: "buyer" | "seller" | "arbitrator",
  content: string
) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("dispute_messages")
    .insert({
      dispute_id: disputeId,
      sender_id: senderId,
      sender_role: senderRole,
      content,
    })
    .select()
    .single();

  if (error) {
    console.error("Error sending chat message:", error);
    throw error;
  }
  return data;
}

export function subscribeToMessages(disputeId: string, callback: (payload: any) => void) {
  const supabase = createClient();
  const channel = supabase
    .channel(`dispute-${disputeId}`)
    .on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "dispute_messages",
        filter: `dispute_id=eq.${disputeId}`,
      },
      callback
    )
    .subscribe();

  return channel;
}
