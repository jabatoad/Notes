import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TagsService} from "../../core";

@Component({
  selector: 'app-tags-search',
  templateUrl: './tags-search.component.html',
  styleUrls: ['./tags-search.component.sass']
})
export class TagsSearchComponent implements OnInit {

  constructor(private tagsService: TagsService) { }

  searchInput: string = ''

  ngOnInit(): void {
  }

  onKeyUp(): void {
    this.tagsService.searchInput$.next(this.searchInput)
  }
}
