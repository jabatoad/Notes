import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoteFormEditComponent } from './note-form-edit/note-form-edit.component';
import {ReactiveFormsModule} from "@angular/forms";
import {Ng2SearchPipeModule} from "ng2-search-filter";



@NgModule({
  declarations: [
    NoteFormEditComponent
  ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        Ng2SearchPipeModule,
    ],
  exports: [
    NoteFormEditComponent
  ]
})
export class NotesModule { }
