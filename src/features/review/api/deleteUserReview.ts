import { createClient } from "@/shared/utils/supabase/server";

export async function deleteUserReview(reviewId: string) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId);
    
  if (error) {
    throw new Error('Failed to delete user review');
  }
  
  return { success: true };
}
