export module NoteMapper{
    export interface NoteModel {
        message: string
        data: Data
      }
      
      export interface Data {
        title: string
        slug: string
        body: string
        is_published: number
        created_at: string
        updated_at: string
        tags: Tag[]
      }
      
      export interface Tag {
        tag: string
        created_at: string
        updated_at: string
        pivot: Pivot
      }
      
      export interface Pivot {
        note_id: number
        tag_id: number
      }
      
}