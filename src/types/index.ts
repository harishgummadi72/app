export type UserRole = 'designer' | 'explorer' | 'admin';

export interface SocialLinks {
  instagram?: string;
  website?: string;
  behance?: string;
  pinterest?: string;
}

export interface UserProfile {
  id: string;
  role: UserRole;
  name: string;
  username: string;
  email: string;
  avatar: string;
  coverImage?: string;
  location: string;
  bio: string;
  specialties?: string[];
  experience?: string;
  socialLinks?: SocialLinks;
  fashionInterests?: string[];
  preferredCategories?: string[];
  stats: {
    followersCount: number;
    followingCount: number;
    creationsCount: number;
    savesCount: number;
    totalViews: number;
    inquiriesReceived: number;
  };
  createdAt: string;
}

export type DesignCategory =
  | 'Bridal'
  | 'Traditional & Ethnic'
  | 'Western Haute Couture'
  | 'Avant-Garde & Experimental'
  | 'Evening Gowns'
  | 'Saree & Lehenga'
  | 'Streetwear Luxe'
  | 'Textile & Embroidery'
  | 'Contemporary Minimal'
  | "Men's Couture";

export type OccasionType =
  | 'Red Carpet & Gala'
  | 'Bridal & Reception'
  | 'Editorial & Runway'
  | 'Cocktail & Evening'
  | 'High Festive'
  | 'Modern Daily';

export interface Design {
  id: string;
  title: string;
  description: string;
  designerId: string;
  designerName: string;
  designerUsername: string;
  designerAvatar: string;
  designerLocation: string;
  coverImage: string;
  images: string[];
  category: DesignCategory;
  style: string;
  fabric: string;
  colors: string[];
  occasion: OccasionType;
  price: number;
  isCustomizable: boolean;
  isAvailableForPurchase: boolean;
  isAvailableForCommission: boolean;
  estimatedProductionTime: string;
  inspiration: string;
  designerNotes: string;
  tags: string[];
  viewsCount: number;
  savesCount: number;
  isFeatured: boolean;
  featuredBadge?: 'Design of the Week' | "Editor's Pick" | 'Rising Talent' | 'Haute Innovation' | 'Community Choice';
  aspectRatio: 'tall' | 'wide' | 'square' | 'portrait';
  createdAt: string;
  status: 'published' | 'draft';
}

export type InquiryType =
  | 'purchase'
  | 'custom_version'
  | 'similar_design'
  | 'collaboration'
  | 'general';

export interface InquiryMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  text: string;
  timestamp: string;
}

export interface Inquiry {
  id: string;
  designId?: string;
  designTitle?: string;
  designImage?: string;
  designerId: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerAvatar: string;
  type: InquiryType;
  message: string;
  budget?: string;
  preferredDate?: string;
  location?: string;
  status: 'pending' | 'in_discussion' | 'accepted' | 'declined' | 'completed';
  createdAt: string;
  replies: InquiryMessage[];
}

export interface Collection {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImage: string;
  designIds: string[];
  isPrivate: boolean;
  createdAt: string;
}

export interface FilterOptions {
  query: string;
  category: string;
  style: string;
  fabric: string;
  occasion: string;
  sortBy: 'trending' | 'newest' | 'popular' | 'most_saved' | 'price_asc' | 'price_desc';
  onlyCustomizable: boolean;
  onlyCommission: boolean;
  onlyPurchase: boolean;
  featuredOnly: boolean;
}
