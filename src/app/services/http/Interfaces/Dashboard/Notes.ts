export module NotesMapper {
  export interface NotesModel {
    message: string;
    data: Data;
  }

  export interface Data {
    current_page: number;
    data: Daum[];
    first_page_url: string;
    from: number;
    next_page_url: any;
    path: string;
    per_page: number;
    prev_page_url: string;
    to: number;
  }

  export interface Daum {
    title: string;
    slug: string;
    body: string;
    is_published: number;
    created_at: string;
    updated_at: string;
    tags: Tag[];
    user: User;
  }

  export interface Tag {
    tag: string;
    created_at: string;
    updated_at: string;
    pivot: Pivot;
  }

  export interface Pivot {
    note_id: number;
    tag_id: number;
  }

  export interface User {
    id: number;
    full_name: string;
    email: string;
    email_verified_at: string;
    created_at: string;
    updated_at: string;
  }
}
