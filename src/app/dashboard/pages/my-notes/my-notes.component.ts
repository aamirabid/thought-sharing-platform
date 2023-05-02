import { Component, OnInit } from '@angular/core';
import { NotesMapper } from 'src/app/services/http/Interfaces/Dashboard/Notes';
import { MyNotesService } from 'src/app/services/http/MyNotesService/my-notes.service';

@Component({
  selector: 'app-my-notes',
  templateUrl: './my-notes.component.html',
  styleUrls: ['./my-notes.component.css'],
})
export class MyNotesComponent implements OnInit {
  declare notes:NotesMapper.Data;
  declare tags: any[];
  constructor(private myNotesService: MyNotesService) {}
  ngOnInit(): void {
    this.getNotes();
  }
  getNotes(page: number = 1, loadMore: boolean = false): void {
    let payload: any = { page: page };
    this.myNotesService.list(payload).subscribe((res) => {
      if (loadMore) {
        const data: NotesMapper.Daum[] = this.notes.data;
        this.notes = res.data;
        this.notes.data = [...data, ...this.notes.data];
      }
      this.notes = res.data;
    });
  }

  deleteNote(slug:string): void {
    if(confirm('are you sure you want to delete this note?')){
      this.myNotesService.delete(slug).subscribe((res) => {
        if(res.data){
          this.getNotes();
        }
      });
    }
  }

  loadMore(): void {
    if (this.notes.next_page_url) {
      this.getNotes(++this.notes.current_page, true);
    }
  }
}
