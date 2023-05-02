import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from 'src/app/services/http/DashboardService/dashboard.service';
import { NotesMapper } from 'src/app/services/http/Interfaces/Dashboard/Notes';
import { TagsMapper } from 'src/app/services/http/Interfaces/Dashboard/Tags';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit {
  filterTags = new FormControl('');
  declare filterBy: string;
  declare searchTxt: string;
  declare notes: NotesMapper.Data;
  declare tags: TagsMapper.Data;
  constructor(private dashboardService: DashboardService) {}
  ngOnInit(): void {
    this.filterTags.valueChanges.subscribe((res:any)=>{
      this.filterBy=res;
      this.getNotes();
    })
    this.getNotes();
    this.getTags();
  }

  refresh():void{
    this.filterBy='';
    this.searchTxt='';
    this.getNotes();
    this.getTags();
  }

  search(event:any){
    if(event.target.value){
      this.searchTxt=event.target.value;
      this.getNotes(1)
    }else{
      this.searchTxt='';
      this.getNotes();
    }
  }
  getNotes(page: number = 1, loadMore: boolean = false): void {
    let payload: any = { page: page };
    if (this.searchTxt) {
      payload = { ...payload, searchTxt: this.searchTxt };
    }
    if (this.filterBy) {
      payload = { ...payload, filterBy: this.filterBy };
    }
    this.dashboardService.notes(payload).subscribe((res) => {
      if (loadMore) {
        const data: NotesMapper.Daum[] = this.notes.data;
        this.notes = res.data;
        this.notes.data = [...data, ...this.notes.data];
      }
      this.notes = res.data;
    });
  }

  loadMore(isTag:boolean=false): void {
    if(!isTag){
      if (this.notes.next_page_url) {
        this.getNotes(++this.notes.current_page, true);
      }
    }
    if(isTag){
      if (this.tags.next_page_url) {
        this.getTags(++this.notes.current_page, true);
      }
    }
    
  }
  getTags(page: number = 1,loadMore:boolean=false): void {
    let payload: any = { page: page };
    this.dashboardService.tags(payload).subscribe((res) => {
      if (loadMore) {
        const data: TagsMapper.Daum[] = this.tags.data;
        this.tags = res.data;
        this.tags.data = [...data, ...this.tags.data];
      }
      this.tags = res.data;
    });
  }
}
