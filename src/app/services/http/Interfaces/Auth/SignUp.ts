export module SignUpMapper {
  export interface SignUpModel {
    message: string;
    data: Data;
  }

  export interface Data {
    accessToken: string;
    user: User;
  }

  export interface User {
    id: number;
    full_name: string;
    email: string;
    email_verified_at: any;
    created_at: string;
    updated_at: string;
  }
}
