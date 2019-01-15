import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Photos } from "../model/photos.model";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class PhotosService {
  constructor(private http: HttpClient) { }
  baseUrl: string = 'https://jsonplaceholder.typicode.com/photos';
  public addedPhotos = new BehaviorSubject<any>([]);

  getData() {
    return this.http.get<Photos[]>(this.baseUrl);
  }

}
