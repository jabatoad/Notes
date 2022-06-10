import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagsPipe } from './pipes/tags.pipe';


@NgModule({
  declarations: [
    TagsPipe
  ],
  imports: [
    CommonModule
  ]
})
export class CoreModule {

}
