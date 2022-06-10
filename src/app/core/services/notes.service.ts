import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from "@angular/common/http";
import {BehaviorSubject} from "rxjs";
import {Note} from "../entities/Note";
import firebase from "firebase/compat/app";
import initializeApp = firebase.initializeApp;
import { getDatabase, ref, child, get, set, remove, update } from "firebase/database"
import {NoteToEdit} from "../entities/NoteToEdit";

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) {
  }

  notes$ = new BehaviorSubject<Note[]>([])
  notes = this.notes$.asObservable()

  noteToDelete$ = new BehaviorSubject<string>('')
  noteToDelete = this.noteToDelete$.asObservable()

  noteIndexToEdit$ = new BehaviorSubject<number>(0)
  noteIndexToEdit = this.noteIndexToEdit$.asObservable()
  noteIdToEdit$ = new BehaviorSubject<number>(0)
  noteIdToEdit = this.noteIdToEdit$.asObservable()
  noteToEdit$ = new BehaviorSubject<Note>({} as Note)
  noteToEdit = this.noteToEdit$.asObservable()

  isEdit$ = new BehaviorSubject<boolean>(false)
  isEdit = this.isEdit$.asObservable()

  isMake$ = new BehaviorSubject<boolean>(false)
  isMake = this.isMake$.asObservable()

  firebaseConfig = {
    apiKey: "AIzaSyA5Yni-yn0Uqv8zCB-XIuWv-aWv8usGOcs",
    authDomain: "test-4012c.firebaseapp.com",
    databaseURL: "https://test-4012c-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "test-4012c",
    storageBucket: "test-4012c.appspot.com",
    messagingSenderId: "611859815343",
    appId: "1:611859815343:web:21840947b888cc38e2ad5a"
  }
  app = initializeApp(this.firebaseConfig)
  dbRef = ref(getDatabase())
  db = getDatabase()

  getNotes(): void {
    get(child(this.dbRef, 'notes')).then(snapshot => {
      if (snapshot.exists()) {
        this.notes$.next(Object.values(snapshot.val()))
      } else {
        this.notes$.next([])
        console.log("No data available");
      }
    })
  }

  makeNote(note: Note): void {
    set(ref(this.db, `notes/` + note.id), note).then(() => {
        this.getNotes()
      }
    )
  }

  deleteNote(): void {
    this.noteToDelete.subscribe(id => {
      this.isEdit.subscribe(bool => {
        if(!bool && id.length > 0) {
          remove(ref(this.db, `notes/` + id)).then(() => {
            this.getNotes()
          })
        }
      })
    })

  }

  editNote(_note: NoteToEdit): void {
    let id: number = 0
    this.noteIdToEdit.subscribe(id$ => {
      id = id$
    })

    if(String(id).length > 0) {
      update(ref(this.db, 'notes/' + id), _note).then(() => {
        this.getNotes()
      })
    }
  }
}
