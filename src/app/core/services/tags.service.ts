import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TagsService {

  constructor() { }

  searchInput$ = new BehaviorSubject<string>('')
  searchInput = this.searchInput$.asObservable()
}
