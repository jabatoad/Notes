import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NotesService} from "../../core/services/notes.service";

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.sass']
})
export class NoteFormComponent implements OnInit {

  constructor(private notesService: NotesService) { }

  ngOnInit(): void {

  }

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

  makeNote(): void {
    this.notesService.makeNote({headline: this.form.controls['headlineControl'].value, text: this.form.controls['textControl'].value, tags: this.collectTags(), id: String(Date.now())})
  }

  cancel() {
    this.notesService.isMake$.next(false)
  }
}
