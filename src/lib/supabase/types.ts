// Database types based on the schema
// These types will be generated automatically using Supabase CLI in production
// For now, we define them manually

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      clinic_settings: {
        Row: {
          id: string;
          clinic_name: string;
          doctor_name: string;
          phone: string;
          whatsapp_number: string | null;
          email: string | null;
          address: string | null;
          city: string | null;
          state: string | null;
          pin_code: string | null;
          google_maps_url: string;
          latitude: number;
          longitude: number;
          meta_title: string | null;
          meta_description: string | null;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          clinic_name: string;
          doctor_name: string;
          phone: string;
          whatsapp_number?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pin_code?: string | null;
          google_maps_url: string;
          latitude: number;
          longitude: number;
          meta_title?: string | null;
          meta_description?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          clinic_name?: string;
          doctor_name?: string;
          phone?: string;
          whatsapp_number?: string | null;
          email?: string | null;
          address?: string | null;
          city?: string | null;
          state?: string | null;
          pin_code?: string | null;
          google_maps_url?: string;
          latitude?: number;
          longitude?: number;
          meta_title?: string | null;
          meta_description?: string | null;
          is_demo?: boolean;
          updated_at?: string;
        };
      };
      doctor_profiles: {
        Row: {
          id: string;
          name: string;
          qualifications: string[];
          registration_number: string | null;
          experience_years: number | null;
          specializations: string[];
          biography: string | null;
          photo_url: string | null;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          qualifications: string[];
          registration_number?: string | null;
          experience_years?: number | null;
          specializations: string[];
          biography?: string | null;
          photo_url?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          qualifications?: string[];
          registration_number?: string | null;
          experience_years?: number | null;
          specializations?: string[];
          biography?: string | null;
          photo_url?: string | null;
          is_demo?: boolean;
          updated_at?: string;
        };
      };
      services: {
        Row: {
          id: string;
          slug: string;
          title: string;
          description: string;
          detailed_description: string | null;
          icon: string | null;
          price_range: string | null;
          duration_minutes: number | null;
          is_published: boolean;
          order_index: number;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          title: string;
          description: string;
          detailed_description?: string | null;
          icon?: string | null;
          price_range?: string | null;
          duration_minutes?: number | null;
          is_published?: boolean;
          order_index?: number;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          title?: string;
          description?: string;
          detailed_description?: string | null;
          icon?: string | null;
          price_range?: string | null;
          duration_minutes?: number | null;
          is_published?: boolean;
          order_index?: number;
          is_demo?: boolean;
          updated_at?: string;
        };
      };
      equipment: {
        Row: {
          id: string;
          name: string;
          description: string;
          photo_url: string | null;
          is_published: boolean;
          order_index: number;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          photo_url?: string | null;
          is_published?: boolean;
          order_index?: number;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          photo_url?: string | null;
          is_published?: boolean;
          order_index?: number;
          is_demo?: boolean;
          updated_at?: string;
        };
      };
      weekly_schedule: {
        Row: {
          id: string;
          day_of_week: number; // 0 = Sunday, 1 = Monday, etc.
          is_closed: boolean;
          morning_start: string | null; // HH:MM format
          morning_end: string | null;
          morning_break_start: string | null;
          morning_break_end: string | null;
          evening_start: string | null;
          evening_end: string | null;
          evening_break_start: string | null;
          evening_break_end: string | null;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          day_of_week: number;
          is_closed?: boolean;
          morning_start?: string | null;
          morning_end?: string | null;
          morning_break_start?: string | null;
          morning_break_end?: string | null;
          evening_start?: string | null;
          evening_end?: string | null;
          evening_break_start?: string | null;
          evening_break_end?: string | null;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          day_of_week?: number;
          is_closed?: boolean;
          morning_start?: string | null;
          morning_end?: string | null;
          morning_break_start?: string | null;
          morning_break_end?: string | null;
          evening_start?: string | null;
          evening_end?: string | null;
          evening_break_start?: string | null;
          evening_break_end?: string | null;
          is_demo?: boolean;
          updated_at?: string;
        };
      };
      holiday_overrides: {
        Row: {
          id: string;
          date: string; // YYYY-MM-DD
          is_closed: boolean;
          special_hours: string | null;
          reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          date: string;
          is_closed?: boolean;
          special_hours?: string | null;
          reason?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          date?: string;
          is_closed?: boolean;
          special_hours?: string | null;
          reason?: string | null;
          updated_at?: string;
        };
      };
      faqs: {
        Row: {
          id: string;
          question: string;
          answer: string;
          order_index: number;
          is_published: boolean;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          order_index?: number;
          is_published?: boolean;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          order_index?: number;
          is_published?: boolean;
          is_demo?: boolean;
          updated_at?: string;
        };
      };
      testimonials: {
        Row: {
          id: string;
          patient_name: string;
          content: string;
          rating: number; // 1-5
          is_published: boolean;
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          patient_name: string;
          content: string;
          rating: number;
          is_published?: boolean;
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          patient_name?: string;
          content?: string;
          rating?: number;
          is_published?: boolean;
          is_demo?: boolean;
          updated_at?: string;
        };
      };
      admin_users: {
        Row: {
          id: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
        };
      };
    };
  };
}
