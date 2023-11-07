import {Component, ElementRef, Inject, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Entry} from "../../../models/entry";
import {EntriesService} from "../entries.service";
import {Collection} from "../../../models/collection";

@Component({
  selector: 'app-entry',
  templateUrl: './entry.component.html',
  styleUrls: ['./entry.component.css']
})
export class EntryComponent {
  @ViewChild('titleInput') titleInput: ElementRef | null;
  @ViewChild('textInput') textInput: ElementRef | null;
  entry: Entry = new Entry();
  editMode: boolean = false;
  editTitle: boolean = false;
  title: string = "";
  collections: Collection[] = [];
  hiddenOptions: string[] = ['Private', 'Public'];


  constructor(@Inject(MAT_DIALOG_DATA) data: {entry: Entry, collections: Collection[]}, private entriesService: EntriesService) {
    this.textInput = null;
    this.titleInput = null;
    if (data.entry != null) {
      this.entry = data.entry;
      this.title = data.entry.title ? data.entry.title : "Error";
      this.editMode = false;
    }
    if (data.collections != null) {
      this.collections = data.collections;
    }
  }

  customCollectionCompare(o1: Collection, o2: Collection) {
    if(o2 == null) {
      return o1.id == 0;
    }
    return o1.id === o2.id;
  }

  updateHiddenStatus(entry: Entry) {
    this.entriesService.updateEntry(entry).subscribe();
  }

  updateCollection(entry: Entry, collection: Collection) {
    entry.collection = collection;

    if(entry.collection){
      entry.collectionId = entry.collection?.id;
    } else {
      entry.collectionId = 0;
    }

    this.entriesService.updateEntry(entry).subscribe();
  }

  editText() {
    this.editMode = true;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.textInput?.nativeElement.focus();
    },0);
  }

  saveText() {
    this.entriesService.updateEntry(this.entry).subscribe();
    this.editMode = false;
  }

  editTitleBtn() {
    this.editTitle=true;
    setTimeout(()=>{ // this will make the execution after the above boolean has changed
      this.titleInput?.nativeElement.focus();
    },0);
  }

  saveTitle() {
    console.log(this.title)
    this.entry.title = this.title;
    this.entriesService.updateEntry(this.entry).subscribe();
    this.editTitle = false;
  }

  ignoreClick(e: Event){
    e.stopPropagation();
  }

}
