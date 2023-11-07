import { Injectable } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Collection} from "../../models/collection";

@Injectable({
  providedIn: 'root'
})
export class CollectionsService {

  id : number = 0;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.id = this.authService.getLocalId();
  }

  getCollections() {
    return this.http.get<Collection[]>("/api/collection/userId/" + this.id.toString());
  }

  updateCollection(collection: Collection) {
    return this.http.put<Collection>("/api/collection/update", collection);
  }

  addCollection(collection: Collection) {
    return this.http.post<Collection>("/api/collection/add/" + this.id.toString(), collection);
  }

  deleteCollection(collection: Collection) {
    return this.http.delete("/api/collection/delete/" + collection.id, { responseType: 'text' });
  }
}
