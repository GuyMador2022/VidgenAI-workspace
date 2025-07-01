// VidGenAI Type Definitions

export interface Campaign {
  id: string;
  userId: string;
  title: string;
  status: 'draft' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  updatedAt: Date;
}

export interface VideoGenerationRequest {
  topic: string;
  tone?: 'professional' | 'energetic' | 'friendly' | 'serious';
  duration?: number;
  language?: 'he' | 'en';
}

export interface AIServiceResponse {
  success: boolean;
  data?: any;
  error?: string;
  usage?: {
    tokens?: number;
    cost?: number;
  };
}

export interface User {
  id: string;
  email: string;
  credits: number;
  plan: 'free' | 'basic' | 'pro' | 'enterprise';
  socialTokens?: {
    facebook?: string;
    linkedin?: string;
    instagram?: string;
  };
}

export interface SocialMediaPost {
  platform: 'facebook' | 'instagram' | 'linkedin';
  content: string;
  mediaUrl?: string;
  scheduledAt?: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
}
