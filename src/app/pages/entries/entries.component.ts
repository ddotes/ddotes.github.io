import {Component} from '@angular/core';
import {EntriesService} from "./entries.service";
import {Entry} from "../../models/entry";
import {Collection} from "../../models/collection";
import {CollectionsService} from "../collections/collections.service";
import {MatDialog} from "@angular/material/dialog";
import {EntryComponent} from "./entry/entry.component";

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.css']
})
export class EntriesComponent {

  entries: Entry[] = [];
  hiddenOptions: string[] = ['Private', 'Public'];
  collections: Collection[] = [];
  addingEntry: boolean = false;


  constructor(private entriesService: EntriesService, private  collectionsService: CollectionsService, private matDialog: MatDialog) {
  }

  ngOnInit() {
    this.getEntries();
    // this.addTestEntry();
    this.getCollections();
  }

  addTestEntry(){
    let testEntry: Entry = new Entry();
    testEntry.id = 10;
    testEntry.collectionId = 2;
    testEntry.title = "Local test entry"
    testEntry.createdDate = new Date();
    testEntry.editedDate = new Date();
    testEntry.text = "This is a testing entry";
    this.entries.push(testEntry);
    console.log(testEntry);
  }

  getEntries() {
    this.entriesService.getEntries().subscribe(result => {
      this.entries = result;
      for (let entry of this.entries) {
        if (entry.collection == null) {
          entry.collection = new Collection();
          entry.collection.title = "No Collection";
        }
      }
      this.entries.sort((a, b) => {
        if (a.editedDate && b.editedDate) {
          return new Date(b.editedDate).getTime() - new Date(a.editedDate).getTime();
        }
        return 0;
      });
    });
  }

  getCollections() {
    this.collectionsService.getCollections().subscribe(result => {
      this.collections = result;

      let emptyCollection = new Collection();
      emptyCollection.title = "No Collection";
      this.collections.push(emptyCollection);
    });

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

  customCollectionCompare(o1: Collection, o2: Collection) {
    if(o2 == null) {
      return o1.id == 0;
    }
    return o1.id === o2.id;
  }

  deleteEntry(entry: Entry) {
    this.entriesService.deleteEntry(entry).subscribe( result => {
      console.log(result);
      this.getEntries();
    });

  }

  viewEntry(entry: Entry) {
    let collections = this.collections;
    let dialogRef = this.matDialog.open(EntryComponent, {data: {entry, collections}, backdropClass: "backdropBackground"});
    dialogRef.afterClosed().subscribe(() => {
      this.entriesService.updateEntry(entry).subscribe();
      this.addingEntry = false;
    })
  }

  addEntry() {
    if (this.addingEntry){
      return;
    }
    this.addingEntry = true;
    let collections = this.collections;
    let emptyEntry: Entry = new Entry();
    emptyEntry.collectionId = 0;
    emptyEntry.text = "Hi!";
    this.entriesService.addEntry(emptyEntry).subscribe(newEntry => {
      emptyEntry = newEntry;
      emptyEntry.collection = new Collection();
      this.entriesService.getEntries().subscribe(result => {
        this.entries = result;
        for (let entry of this.entries) {
          if (entry.collection == null) {
            entry.collection = new Collection();
            entry.collection.title = "No Collection";
          }
          if (entry.id == emptyEntry.id){
            let dialogRef = this.matDialog.open(EntryComponent, {data: {entry, collections}, backdropClass: "backdropBackground"});
            dialogRef.afterClosed().subscribe(() => {
              this.entriesService.updateEntry(entry).subscribe();
              this.addingEntry = false;
            })
          }
        }
        this.entries.sort((a, b) => {
          if (a.editedDate && b.editedDate) {
            return new Date(b.editedDate).getTime() - new Date(a.editedDate).getTime();
          }
          return 0;
        });
      });

    });
    console.log(this.addingEntry)


  }

  ignoreClick(e: Event){
    e.stopPropagation();
  }

}
