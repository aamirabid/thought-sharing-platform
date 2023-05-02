import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';
import { Observable, map } from 'rxjs';
import { NotesMapper } from '../Interfaces/Dashboard/Notes';
import { TagsMapper } from '../Interfaces/Dashboard/Tags';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private http: HttpService) {}

  tags(payload?: any): Observable<TagsMapper.TagsModel> {
    return this.http
      .get(`auth/dashboard/tags`, payload)
      .pipe(map((response) => response as TagsMapper.TagsModel));
  }
  notes(payload?: any): Observable<NotesMapper.NotesModel> {
    return this.http
      .get(`auth/dashboard/notes`, payload)
      .pipe(map((response) => response as NotesMapper.NotesModel));
  }
}
