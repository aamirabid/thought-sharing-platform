import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable, map } from 'rxjs';
import { NoteMapper } from '../Interfaces/MyNotes/Note';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class MyNotesService {
  constructor(private http: HttpService,private router: Router) {}
  create(payload?: any): Observable<any> {
   return this.http
      .postWithAuth(`auth/notes/`, payload)
      .pipe(map((response) => response as any));
    
  }
  update(id: string, payload?: any): Observable<any> {
    return this.http
      .patch(`auth/notes/${id}`, payload)
      .pipe(map((response) => response as any));
  }
  note(id: string, payload?: any): Observable<NoteMapper.NoteModel> {
    return this.http
      .get(`auth/notes/${id}`, payload)
      .pipe(map((response) => response as NoteMapper.NoteModel));
  }
  delete(id: string, payload?: any): Observable<any> {
    return this.http
      .delete(`auth/notes/${id}`, payload)
      .pipe(map((response) => response as any));
  }
  list(payload?: any): Observable<any> {
    return this.http
      .get(`auth/notes/`, payload)
      .pipe(map((response) => response as any));
  }
}
