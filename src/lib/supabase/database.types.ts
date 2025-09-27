export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          image_url: string | null;
          parent_id: string | null;
          sort_order: number | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["categories"]["Row"]> & {
          id?: string;
          name: string;
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["categories"]["Row"]>;
      };
      brands: {
        Row: {
          id: string;
          name: string;
          slug: string;
          logo_url: string | null;
          description: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["brands"]["Row"]> & {
          id?: string;
          name: string;
          slug: string;
        };
        Update: Partial<Database["public"]["Tables"]["brands"]["Row"]>;
      };
      products: {
        Row: {
          id: string;
          name: string;
          slug: string;
          description: string | null;
          short_description: string | null;
          sku: string;
          brand_id: string | null;
          category_id: string | null;
          price: number;
          sale_price: number | null;
          stock_quantity: number;
          weight: number | null;
          dimensions: Json | null;
          images: Json[] | null;
          specifications: Json | null;
          features: string[] | null;
          power_source: "battery" | "corded" | "manual" | "pneumatic" | null;
          voltage: number | null;
          warranty_months: number | null;
          is_featured: boolean;
          is_active: boolean;
          seo_title: string | null;
          seo_description: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["products"]["Row"]> & {
          id?: string;
          name: string;
          slug: string;
          sku: string;
          price: number;
        };
        Update: Partial<Database["public"]["Tables"]["products"]["Row"]>;
      };
      user_profiles: {
        Row: {
          id: string;
          first_name: string | null;
          last_name: string | null;
          company: string | null;
          phone: string | null;
          avatar_url: string | null;
          is_contractor: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["user_profiles"]["Row"]
        > & {
          id: string;
        };
        Update: Partial<Database["public"]["Tables"]["user_profiles"]["Row"]>;
      };
      cart_items: {
        Row: {
          id: string;
          user_id: string;
          product_id: string;
          quantity: number;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["cart_items"]["Row"]> & {
          id?: string;
          user_id: string;
          product_id: string;
          quantity?: number;
        };
        Update: Partial<Database["public"]["Tables"]["cart_items"]["Row"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      power_source: "battery" | "corded" | "manual" | "pneumatic";
    };
  };
};
