export interface CommonMessageDTO {
  id: number;
  content: string;
  createdAt?: string;
}

export interface ListCommonMessagesResponse {
  messages: CommonMessageDTO[];
}

export type ActiveCommonMessageResponse = CommonMessageDTO | null;

export interface CreateCommonMessageRequest {
  content: string;
}

export interface CreateCommonMessageResponse {
  message: string;
  commonMessage: CommonMessageDTO;
}

export interface UpdateCommonMessageRequest {
  content?: string;
  // Future fields: isActive?: boolean; startsAt?: string; endsAt?: string;
}

export interface UpdateCommonMessageResponse {
  message: string;
  commonMessage: CommonMessageDTO;
}

export interface DeleteCommonMessageResponse {
  message: string;
}
