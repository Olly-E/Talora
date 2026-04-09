export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  email: string;
  token?: string;
}

export interface AuthUser {
  email: string;
  authenticated: boolean;
}

export interface LogoutResponse {
  success: boolean;
}

export interface AuthVerifyResponse {
  authenticated: boolean;
  email?: string;
}
