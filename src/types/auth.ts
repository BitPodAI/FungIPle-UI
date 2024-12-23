export enum UserRole {
  USER = 'user',
  ADMIN = 'admin',
}

export interface TwitterProfile {
  followersCount: number;
  verified: boolean;
}

export interface UserProfile {
  name: string;
  username: string;
  gender?: string;
  bio: string[];
  level: number;
  experience: number;
  nextLevelExp: number;
  points: number;
  tweetFrequency: {
    dailyLimit: number;
    currentCount: number;
    lastTweetTime: number;
  };
  stats: {
    totalTweets: number;
    successfulTweets: number;
    failedTweets: number;
  };
  style: {
    all: string[];
    chat: string[];
    post: string[];
  };
  topics: string[];
  messageExamples: {
    user: string;
    content: {
      text: string;
    };
  }[];
}

export interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export interface ProfileUpdateRequest {
  agentId: string;
  profile: UserProfile;
}

export interface ProfileUpdateResponse {
  success: boolean;
  message: string;
  data?: {
    profile: UserProfile;
  };
}

export interface ProfileQueryResponse {
  success: boolean;
  profile?: UserProfile;
  error?: string;
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
