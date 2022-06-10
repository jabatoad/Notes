import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Note, NotesService} from "../../core";

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.sass']
})
export class NoteComponent implements OnInit {

  constructor(private notesService: NotesService) {
  }

  ngOnInit(): void {
  }

  @Input() headline: string = ''
  @Input() text: string = ''
  @Input() tags: string[] = []

  deleteNote() {
    this.notesService.deleteNote()
  }

  editNote() {
    let id: number = 0
    this.notesService.noteIdToEdit.subscribe(id$ => {
      id = id$
    })
    this.notesService.noteToEdit$.next({headline: this.headline, text: this.text, id: String(id)})
    this.notesService.isEdit$.next(true)


  }
}
