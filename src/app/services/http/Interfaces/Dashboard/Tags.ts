export module TagsMapper{
    export interface TagsModel {
        message: string
        data: Data
      }
      
      export interface Data {
        current_page: number
        data: Daum[]
        first_page_url: string
        from: number
        next_page_url: string
        path: string
        per_page: number
        prev_page_url: any
        to: number
      }
      
      export interface Daum {
        tag: string
        created_at: string
        updated_at: string
      }
      
}