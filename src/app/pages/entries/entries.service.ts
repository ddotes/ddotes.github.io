import { Injectable } from '@angular/core';
import {AuthService} from "../../auth/services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Entry} from "../../models/entry";

@Injectable({
  providedIn: 'root'
})
export class EntriesService {

  id: number = 0;

  constructor(private authService: AuthService, private http: HttpClient) {
    this.id = this.authService.getLocalId();
  }

  getEntries() {
    return this.http.get<Entry[]>("https://крымскаяягода.рус:443/api/entry/userId/" + this.id.toString());
  }

  updateEntry(entry: Entry) {
    return this.http.put<Entry>("https://крымскаяягода.рус:443/api/entry/update", entry);
  }

  addEntry(entry: Entry) {
    return this.http.post<Entry>("https://крымскаяягода.рус:443/api/entry/add/" + this.authService.getLocalId(), entry);
  }

  deleteEntry(entry: Entry) {
    return this.http.delete("https://крымскаяягода.рус:443/api/entry/delete/" + entry.id.toString(), { responseType: 'text' })
  }
}
