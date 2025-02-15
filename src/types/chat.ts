export interface Chat {
  id: string;
  title: string;
  updatedAt: string;
}

export interface Message {
  text: string;
  user: 'user' | 'agent';
  action: 'NONE' | 'CONTINUE';
  kol?:string
  title?: string;
  updatedAt?: string;
  inReplyTo?: string;
  lectureReward?: string;
  lectureTxHash?: string;
  noRefresh?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: string;
  updatedAt: string;
}
