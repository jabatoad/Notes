import { Component, OnInit } from '@angular/core';
import {Note, NotesService} from "../../core";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-note-form-edit',
  templateUrl: './note-form-edit.component.html',
  styleUrls: ['./note-form-edit.component.sass']
})
export class NoteFormEditComponent implements OnInit {

  constructor(private notesService: NotesService) {
    this.notesService.noteToEdit.subscribe(note$ => {
      this.note = note$
      this.form.patchValue({headlineControl: note$.headline, textControl: note$.text})
    })
  }

  ngOnInit(): void {
  }

  note: Note = {} as Note

  form: FormGroup = new FormGroup({
    headlineControl: new FormControl('', [Validators.required, Validators.minLength(5)]),
    textControl: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(100)]),
  })

  collectTags(): string[] {
    const words: string[] = this.form.controls['textControl'].value.split(' ')
    const tags$: string[] = words.filter(word => word[0] === '#')
    let tags: string[] = []
    tags$.forEach(tag => tags.push(tag.slice(1, tag.length)))

    return tags
  }

  editNote(): void {
    this.notesService.isEdit$.next(false)
    this.notesService.editNote({headline: this.form.controls['headlineControl'].value, text: this.form.controls['textControl'].value, tags: this.collectTags()})
  }

  cancel() {
    this.notesService.isEdit$.next(false)
  }
}
