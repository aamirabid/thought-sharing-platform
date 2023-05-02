import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatChipEditedEvent, MatChipInputEvent } from '@angular/material/chips';
import { ActivatedRoute, Router } from '@angular/router';
import { MyNotesService } from 'src/app/services/http/MyNotesService/my-notes.service';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { NoteMapper } from 'src/app/services/http/Interfaces/MyNotes/Note';
@Component({
  selector: 'app-add-update-dialoge',
  templateUrl: './add-update-dialoge.component.html',
  styleUrls: ['./add-update-dialoge.component.css'],
})
export class AddUpdateDialogComponent implements OnInit {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  tags: string[] = ['thought'];
  declare createOrUpdateForm: FormGroup;
  declare note: NoteMapper.Data;
  declare id: string | null;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private myNotes: MyNotesService
  ) {}
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.tags=[];
      this.myNotes.note(this.id).subscribe((res) => { 
        if(!res.data){
          this.router.navigate(['/auth/my-notes']);
        }
        this.note = res.data;
        this.note.tags.forEach(tag=>{
          this.tags.push(tag.tag);
        })
        this.createOrUpdateFormInit();
      });
    }
    this.createOrUpdateFormInit();
  }
  //TAGS
  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value) {
      this.tags.push(value);
    }
    event.chipInput!.clear();
  }

  remove(tag: string): void {
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags.splice(index, 1);
    }
  }

  edit(tag: string, event: MatChipEditedEvent) {
    const value = event.value.trim();
    if (!value) {
      this.remove(tag);
      return;
    }
    const index = this.tags.indexOf(tag);
    if (index >= 0) {
      this.tags[index] = value;
    }
  }

  private createOrUpdateFormInit(): void {
    this.createOrUpdateForm = this.formBuilder.group({
      title: [
        this.note?.title || '',
        [Validators.required, Validators.minLength(3)],
      ],
      body: [
        this.note?.body || '',
        [Validators.required, Validators.minLength(5)],
      ],
      is_published: [
        this.note?.is_published || this.tags,
        [Validators.required],
      ],
      tags: this.formBuilder.array([]),
    });
  }
  createOrUpdateNote(id?:string) {
    const tags = <FormArray>this.createOrUpdateForm.get('tags');
    tags.clear();
    tags.push(new FormControl(this.tags));
    if (this.createOrUpdateForm.valid) {
      if (id) {
        this.myNotes.update(id, this.createOrUpdateForm.value).subscribe((response) => {
          if (response) {
            alert('Note Has been update');
            this.router.navigate(['/auth/my-notes']);
          }
        });
      }else{
        this.myNotes.create(this.createOrUpdateForm.value).subscribe((response) => {
          if (response) {
            alert('Note Has been addedd');
            this.router.navigate(['/auth/my-notes']);
          }
        });
      }
    }
    this.createOrUpdateForm.markAllAsTouched();
  }

  
}
