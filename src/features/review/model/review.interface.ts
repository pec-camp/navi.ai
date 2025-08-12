export interface ReviewFormData {
  tool_id: string;
  rating: number;
  content: string;
  pros?: string[];
  cons?: string[];
}

export interface ReviewUpdateData {
  rating?: number;
  content?: string;
  pros?: string[];
  cons?: string[];
}

export interface ReviewResponse {
  success: boolean;
  message?: string;
}
