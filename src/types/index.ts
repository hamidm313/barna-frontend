export interface User {
  id: number;
  uuid: string;
  display_name: string;
  email: string;
  phone?: string;
  role: 'admin' | 'user';
  avatar?: string;
  is_active: boolean;
  created_at: string;
}

export interface EthnicGroup {
  id: number;
  uuid: string;
  display_name: string;
  slug: string;
  description?: string;
  image?: string;
  display_order: number;
  is_active: boolean;
}

export interface Tag {
  id: number;
  uuid: string;
  display_name: string;
  slug: string;
  usage_count?: number;
}

export type ClothingCategory = 'traditional' | 'modern' | 'fusion' | 'barna_design' | 'wardrobe';
export type ClothingGender = 'female' | 'male' | 'unisex' | 'child';
export type ClothingStatus = 'available' | 'rented' | 'sold' | 'reserved' | 'maintenance';
export type ClothingCondition = 'excellent' | 'good' | 'fair';

export interface Clothing {
  id: number;
  uuid: string;
  display_name: string;
  slug: string;
  description?: string;
  ethnic_group_id?: number;
  ethnic_group_display_name?: string;
  ethnic_group_slug?: string;
  category: ClothingCategory;
  gender: ClothingGender;
  size?: string;
  color?: string;
  material?: string;
  era?: string;
  condition_status: ClothingCondition;
  status: ClothingStatus;
  sale_price?: number;
  rental_price_per_day?: number;
  deposit_amount?: number;
  is_for_sale: boolean;
  is_for_rent: boolean;
  is_featured: boolean;
  images: string[];
  before_image?: string;
  after_image?: string;
  view_count: number;
  tags?: Tag[];
  created_at: string;
}

export interface ClothingListResponse {
  data: Clothing[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export type ReservationStatus = 'pending' | 'confirmed' | 'active' | 'returned' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'deposit_paid' | 'paid' | 'refunded';

export interface Reservation {
  id: number;
  user_id?: number;
  clothing_id: number;
  clothing_display_name?: string;
  clothing_images?: string[];
  user_display_name?: string;
  user_email?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  start_date: string;
  end_date: string;
  status: ReservationStatus;
  deposit_amount: number;
  rental_fee?: number;
  cleaning_fee: number;
  shipping_fee: number;
  total_refund?: number;
  payment_status: PaymentStatus;
  tracking_number?: string;
  shipping_address?: string;
  notes?: string;
  rules_accepted: boolean;
  created_at: string;
}

export interface Order {
  id: number;
  order_number: string;
  user_id?: number;
  clothing_id?: number;
  clothing_display_name?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'returned';
  amount: number;
  payment_status: PaymentStatus;
  shipping_address?: string;
  tracking_number?: string;
  notes?: string;
  created_at: string;
}

export interface Comment {
  id: number;
  user_id?: number;
  user_display_name?: string;
  guest_name?: string;
  guest_email?: string;
  clothing_id?: number;
  content: string;
  status: 'pending' | 'approved' | 'rejected';
  parent_id?: number;
  created_at: string;
}

export interface MediaItem {
  id: number;
  filename: string;
  original_name: string;
  type: 'image' | 'video' | 'document';
  mime_type?: string;
  size?: number;
  url: string;
  cdn_provider?: string;
  alt_text?: string;
  tags?: string[];
  created_at: string;
}

export interface Page {
  id: number;
  uuid: string;
  slug: string;
  display_name: string;
  content?: string;
  meta_title?: string;
  meta_description?: string;
  is_published: boolean;
  updated_at: string;
}

export interface ThemeSettings {
  color_primary: string;
  color_primary_dark: string;
  color_primary_light: string;
  color_accent: string;
  color_accent_dark: string;
  color_gray: string;
  color_dark: string;
  color_background: string;
  font_fa: string;
  font_en: string;
  [key: string]: string;
}

export interface CommunityPost {
  id: number;
  user_id?: number;
  user_display_name?: string;
  display_name?: string;
  content?: string;
  images?: string[];
  ethnic_group_id?: number;
  ethnic_group_display_name?: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export interface Request {
  id: number;
  user_id?: number;
  user_display_name?: string;
  guest_name?: string;
  guest_email?: string;
  guest_phone?: string;
  type: 'custom_design' | 'collaboration' | 'information' | 'other';
  clothing_id?: number;
  subject?: string;
  message: string;
  status: 'pending' | 'in_review' | 'responded' | 'closed';
  admin_response?: string;
  created_at: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

export interface ApiError {
  error: string;
  message?: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface ClothingFilters extends PaginationParams {
  ethnic_group?: string;
  category?: ClothingCategory;
  status?: ClothingStatus;
  gender?: ClothingGender;
  is_featured?: boolean;
  search?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
}
