export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      daily_stats: {
        Row: {
          average_score: number | null
          best_score: number | null
          created_at: string | null
          id: string
          session_date: string
          total_participants: number | null
          updated_at: string | null
          winner_email: string | null
          winner_name: string | null
          workout_type: string
        }
        Insert: {
          average_score?: number | null
          best_score?: number | null
          created_at?: string | null
          id?: string
          session_date: string
          total_participants?: number | null
          updated_at?: string | null
          winner_email?: string | null
          winner_name?: string | null
          workout_type: string
        }
        Update: {
          average_score?: number | null
          best_score?: number | null
          created_at?: string | null
          id?: string
          session_date?: string
          total_participants?: number | null
          updated_at?: string | null
          winner_email?: string | null
          winner_name?: string | null
          workout_type?: string
        }
        Relationships: []
      }
      email_logs: {
        Row: {
          email_type: string
          id: string
          performance_rating: string | null
          recipient_email: string
          recipient_name: string
          sent_at: string | null
          session_id: string | null
          subject: string
        }
        Insert: {
          email_type: string
          id?: string
          performance_rating?: string | null
          recipient_email: string
          recipient_name: string
          sent_at?: string | null
          session_id?: string | null
          subject: string
        }
        Update: {
          email_type?: string
          id?: string
          performance_rating?: string | null
          recipient_email?: string
          recipient_name?: string
          sent_at?: string | null
          session_id?: string | null
          subject?: string
        }
        Relationships: [
          {
            foreignKeyName: "email_logs_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "workout_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      workout_sessions: {
        Row: {
          actual_score: number
          age: number
          created_at: string | null
          email: string
          experience: string
          extra: number | null
          gender: string
          height: string | null
          id: string
          ideal_score: number
          name: string
          performance_rating: string
          phone_number: string | null
          plank_duration: number | null
          rep_count: number | null
          session_date: string
          updated_at: string | null
          weight: string | null
          workout_type: string
        }
        Insert: {
          actual_score: number
          age: number
          created_at?: string | null
          email: string
          experience: string
          extra?: number | null
          gender: string
          height?: string | null
          id?: string
          ideal_score: number
          name: string
          performance_rating: string
          phone_number?: string | null
          plank_duration?: number | null
          rep_count?: number | null
          session_date?: string
          updated_at?: string | null
          weight?: string | null
          workout_type: string
        }
        Update: {
          actual_score?: number
          age?: number
          created_at?: string | null
          email?: string
          experience?: string
          extra?: number | null
          gender?: string
          height?: string | null
          id?: string
          ideal_score?: number
          name?: string
          performance_rating?: string
          phone_number?: string | null
          plank_duration?: number | null
          rep_count?: number | null
          session_date?: string
          updated_at?: string | null
          weight?: string | null
          workout_type?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      select_daily_winner: {
        Args: { workout_type_param: string; target_date?: string }
        Returns: {
          winner_name: string
          winner_email: string
          best_score: number
          total_participants: number
        }[]
      }
      update_daily_stats: {
        Args: { p_workout_type: string; p_session_date?: string }
        Returns: undefined
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

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
