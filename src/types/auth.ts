export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface TwitterProfile {
  followersCount: number;
  verified: boolean;
}

export interface UserProfile {
  username: string;
  name: string;
  email: string;
  gender?: string;
  bio?: string;
  walletAddress?: string;
  level: number;
  experience: number;
  nextLevelExp: number;
  points: number;
  tweetFrequency: {
    dailyLimit: number;
    currentCount: number;
    lastTweetTime?: number;
  };
  stats: {
    totalTweets: number;
    successfulTweets: number;
    failedTweets: number;
  };
}

export interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export interface ProfileUpdateRequest {
  userId: string;
  profile: Partial<UserProfile>;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  data?: {
    profile: UserProfile;
  };
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: {
    profile: UserProfile;
    twitterProfile: TwitterProfile;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
}
