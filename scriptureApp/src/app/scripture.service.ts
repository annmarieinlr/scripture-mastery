import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scripture } from './scripture';

@Injectable({
  providedIn: 'root'
})
export class ScriptureService {
  private url = 'http://localhost:5200';
  scriptures$ = signal<Scripture[]>([]);
  scripture$ = signal<Scripture>({} as Scripture);
  
  constructor(private httpClient: HttpClient) { }

  private refreshScriptures() {
    this.httpClient.get<Scripture>(`${this.url}/scriptures`)
      .subscribe(scriptures => {
        this.scripture$.set(scriptures);
      });
  }

  getScriptures() {
    this.refreshScriptures();
    return this.scriptures$();
  }

  getScripture(id: string) {
    this.httpClient.get<Scripture>(`${this.url}/scriptures/${id}`).subscribe(scripture => {
      this.scripture$.set(scripture);
      return this.scripture$();
    });
  }

  createScripture(scripture: Scripture) {
    return this.httpClient.post(`${this.url}/scriptures`, scripture, { responseType: 'text' });
  }

  updateScripture(id: string, scripture: Scripture) {
    return this.httpClient.put(`${this.url}/scriptures/${id}`, scripture, { responseType: 'text' });
  }

  deleteScripture(id: string) {
    return this.httpClient.delete(`${this.url}/scriptures/${id}`, { responseType: 'text' });
  }
}