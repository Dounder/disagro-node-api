import { UserSummary } from '../../users';

export interface AuthResponse {
  user: UserSummary;
  token: string;
}

export interface TokenPayload {
  id: number;
}
