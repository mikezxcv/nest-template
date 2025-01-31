export interface JWTPayload {
  id: number;
  name: string;
  email: string;
  active: boolean;
  profiles: string[];
  permissions: string[];
}
