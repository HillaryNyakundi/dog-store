export interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  role: string;
  is_active: boolean;
  created_at: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
  is_published: boolean;
  created_at: string;
  category_id: number;
}

export interface CartItem {
  id: number;
  product_id: number;
  quantity: number;
  subtotal: number;
  product: Product;
}

export interface Cart {
  id: number;
  user_id: number;
  created_at: string;
  total_amount: number;
  cart_items: CartItem[];
}

export interface UserWithCarts extends User {
  password: string;
  carts: Cart[];
}

export interface SignupResponse {
  message: string;
  data: UserWithCarts;
}

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface SignupCredentials {
  username: string;
  email: string;
  full_name: string;
  password: string;
}

export interface TokenResponse {
  access_token: string;
  token_type: string;
  refresh_token?: string;
}