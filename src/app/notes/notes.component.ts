import {Component, OnInit} from '@angular/core';
import {Note, TagsService, NotesService} from "../core";


@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.sass']
})
export class NotesComponent implements OnInit {

  constructor(private notesService: NotesService, private tagsService: TagsService) {
    this.notesService.notes.subscribe(notes$ => {
      this.notes = notes$
      this.notesService.isMake$.next(false)
    })

    this.tagsService.searchInput.subscribe(value => {
      this.searchInput = value
    })

    this.notesService.isEdit.subscribe(value => {
      this.ifEdit = value
    })

    this.notesService.isMake$.subscribe(bool => {
      this.ifMake = bool
    })
  }

  ngOnInit(): void {
    this.notesService.getNotes()
  }

  notes: Note[] = []
  searchInput: string = ''
  ifEdit: boolean = false
  ifEditId: string = ''

  ifMake: boolean = false

  makeNote(): void {
    // this.ifMake = true
    this.notesService.isMake$.next(true)
  }

  detectClick(id: string, index: number): void {
    this.notesService.noteToDelete$.next(id)

    this.notesService.noteIdToEdit$.next(Number(id))
    this.notesService.noteIndexToEdit$.next(index)
  }
}
