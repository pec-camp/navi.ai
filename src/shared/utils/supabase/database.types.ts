export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      ai_tool_categories: {
        Row: {
          ai_tool_id: number
          category_id: number
        }
        Insert: {
          ai_tool_id: number
          category_id: number
        }
        Update: {
          ai_tool_id?: number
          category_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ai_tool_categories_ai_tool_id_fkey"
            columns: ["ai_tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_tool_categories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tool_sub_categories: {
        Row: {
          created_at: string
          sub_category_id: number
          tool_id: number
        }
        Insert: {
          created_at?: string
          sub_category_id: number
          tool_id: number
        }
        Update: {
          created_at?: string
          sub_category_id?: number
          tool_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "ai_tool_sub_categories_sub_category_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "ai_tool_sub_categories_tool_id_fkey"
            columns: ["tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_tools: {
        Row: {
          affiliate_link: string | null
          ai_content: Json | null
          attribute_handles: string[] | null
          attributes: Json | null
          description: string | null
          extension: string | null
          id: number
          image_url: string | null
          is_free: boolean | null
          month_visited_count: number | null
          name: string
          original_created_at: string | null
          original_updated_at: string | null
          slug: string
          source_id: number
          tags: string[] | null
          website: string | null
          website_logo: string | null
          website_name: string | null
          what_is: string | null
          what_is_summary: string | null
        }
        Insert: {
          affiliate_link?: string | null
          ai_content?: Json | null
          attribute_handles?: string[] | null
          attributes?: Json | null
          description?: string | null
          extension?: string | null
          id?: number
          image_url?: string | null
          is_free?: boolean | null
          month_visited_count?: number | null
          name: string
          original_created_at?: string | null
          original_updated_at?: string | null
          slug: string
          source_id: number
          tags?: string[] | null
          website?: string | null
          website_logo?: string | null
          website_name?: string | null
          what_is?: string | null
          what_is_summary?: string | null
        }
        Update: {
          affiliate_link?: string | null
          ai_content?: Json | null
          attribute_handles?: string[] | null
          attributes?: Json | null
          description?: string | null
          extension?: string | null
          id?: number
          image_url?: string | null
          is_free?: boolean | null
          month_visited_count?: number | null
          name?: string
          original_created_at?: string | null
          original_updated_at?: string | null
          slug?: string
          source_id?: number
          tags?: string[] | null
          website?: string | null
          website_logo?: string | null
          website_name?: string | null
          what_is?: string | null
          what_is_summary?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: number
          name: string
          slug: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
        }
        Relationships: []
      }
      comparison_list: {
        Row: {
          added_at: string | null
          ai_tool_id: number
          user_id: string
        }
        Insert: {
          added_at?: string | null
          ai_tool_id: number
          user_id: string
        }
        Update: {
          added_at?: string | null
          ai_tool_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "comparison_list_ai_tool_id_fkey"
            columns: ["ai_tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comparison_list_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      new_ai_tools_jsonb: {
        Row: {
          created_at: string | null
          id: number
          tool_data: Json
        }
        Insert: {
          created_at?: string | null
          id: number
          tool_data: Json
        }
        Update: {
          created_at?: string | null
          id?: number
          tool_data?: Json
        }
        Relationships: []
      }
      recommended_tools: {
        Row: {
          ai_tool_id: number
          recommended_at: string | null
          user_id: string
        }
        Insert: {
          ai_tool_id: number
          recommended_at?: string | null
          user_id: string
        }
        Update: {
          ai_tool_id?: number
          recommended_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommended_tools_ai_tool_id_fkey"
            columns: ["ai_tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommended_tools_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          ai_tool_id: number
          created_at: string
          id: number
          rating: number
          recommend: boolean
          review_text: string
          used_with_tool_id: number | null
          user_id: string
        }
        Insert: {
          ai_tool_id: number
          created_at?: string
          id?: never
          rating: number
          recommend: boolean
          review_text: string
          used_with_tool_id?: number | null
          user_id: string
        }
        Update: {
          ai_tool_id?: number
          created_at?: string
          id?: never
          rating?: number
          recommend?: boolean
          review_text?: string
          used_with_tool_id?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_ai_tool_id_fkey"
            columns: ["ai_tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_used_with_tool_id_fkey"
            columns: ["used_with_tool_id"]
            isOneToOne: false
            referencedRelation: "ai_tools"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      sub_categories: {
        Row: {
          category_id: number
          id: number
          name: string
          slug: string
        }
        Insert: {
          category_id: number
          id?: number
          name: string
          slug: string
        }
        Update: {
          category_id?: number
          id?: number
          name?: string
          slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "tags_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      user_events: {
        Row: {
          created_at: string | null
          event_type: string
          id: number
          metadata: Json | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          event_type: string
          id?: never
          metadata?: Json | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          event_type?: string
          id?: never
          metadata?: Json | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "user_events_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_subscriptions: {
        Row: {
          sub_category_id: number
          user_id: string
        }
        Insert: {
          sub_category_id: number
          user_id: string
        }
        Update: {
          sub_category_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_subscriptions_tag_id_fkey"
            columns: ["sub_category_id"]
            isOneToOne: false
            referencedRelation: "sub_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_subscriptions_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          current_tools: string | null
          email: string
          id: string
          profession: string | null
        }
        Insert: {
          created_at?: string | null
          current_tools?: string | null
          email: string
          id: string
          profession?: string | null
        }
        Update: {
          created_at?: string | null
          current_tools?: string | null
          email?: string
          id?: string
          profession?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_similar_tools_v1: {
        Args: { limit_count?: number; target_slug: string }
        Returns: {
          affiliate_link: string
          attribute_handles: string[]
          attributes: Json
          avg_rating: number
          description: string
          extension: string
          id: number
          image_url: string
          is_free: boolean
          month_visited_count: number
          name: string
          original_created_at: string
          original_updated_at: string
          review_count: number
          similarity_score: number
          slug: string
          source_id: number
          tags: string[]
          website: string
          website_logo: string
          website_name: string
          what_is: string
          what_is_summary: string
        }[]
      }
      get_user_subscribed_tools: {
        Args: {
          input_limit?: number
          input_offset?: number
          input_user_id?: string
        }
        Returns: Json
      }
      get_user_subscribed_tools_v2: {
        Args: {
          input_limit?: number
          input_offset?: number
          input_user_id: string
        }
        Returns: {
          affiliate_link: string
          attribute_handles: string[]
          attributes: Json
          avg_rating: number
          description: string
          extension: string
          id: number
          image_url: string
          is_free: boolean
          month_visited_count: number
          name: string
          original_created_at: string
          original_updated_at: string
          review_count: number
          slug: string
          source_id: number
          sub_category_id: number
          sub_category_name: string
          tags: string[]
          total_count: number
          website: string
          website_logo: string
          website_name: string
          what_is: string
          what_is_summary: string
        }[]
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
