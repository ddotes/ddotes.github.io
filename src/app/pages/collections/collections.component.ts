import {Component} from '@angular/core';
import {CollectionsService} from "./collections.service";
import {Collection} from "../../models/collection";
import {HiddenStatus} from "../../enums/hiddenStatus";

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.css']
})
export class CollectionsComponent {

  collections: Collection[] = [];
  editingCollection: Collection = new Collection();
  edit: number = -1;

  constructor(private collectionsService: CollectionsService) {
  }

  ngOnInit() {
    this.getCollections();
  }

  getCollections() {
    this.collectionsService.getCollections().subscribe(result => {
      this.collections = result;
      this.collections.reverse();
    });
  }

  enterEditMode(colNum: number, col: Collection) {
    this.edit = colNum;
    this.editingCollection = new Collection(col);
  }

  saveEdits() {
    this.collectionsService.updateCollection(this.editingCollection).subscribe();
    this.collections[this.edit] = this.editingCollection;
    this.edit = -1;
    this.editingCollection = new Collection();
  }

  cancelEdits() {
    this.edit = -1;
    this.editingCollection = new Collection();
  }

  switchHiddenStatus() {
    console.log("PRE")
    console.log(this.editingCollection.hiddenStatus);

    if(this.editingCollection.hiddenStatus == HiddenStatus.Private || this.editingCollection.hiddenStatus?.toString() == HiddenStatus[HiddenStatus.Private]) {
      this.editingCollection.hiddenStatus = HiddenStatus.Public;
    } else if(this.editingCollection.hiddenStatus == HiddenStatus.Public || this.editingCollection.hiddenStatus?.toString() == HiddenStatus[HiddenStatus.Public]) {
      this.editingCollection.hiddenStatus = HiddenStatus.Private;
    } else {
      console.log("THIS IS BAD")
      console.log(HiddenStatus[HiddenStatus.Public])
    }

    console.log("POST")
    console.log(this.editingCollection.hiddenStatus);
  }

  addCollection(){
    let coll: Collection = new Collection();
    coll.title = "Untitled Collection";
    this.collectionsService.addCollection(coll).subscribe(newColl => {
      this.collections.unshift(newColl);
      this.edit = 0;
      this.editingCollection = new Collection(this.collections[0]);
    })
  }

  deleteCollection(coll: Collection) {
    this.cancelEdits();
    this.collectionsService.deleteCollection(coll).subscribe(() => {
      this.getCollections();
    })
  }

}
