import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from "@angular/router";
import { PhotosService } from "../service/user.service";
import { Photos } from "../model/photos.model";

@Component({
  selector: 'app-list-photos',
  templateUrl: './list-photos.component.html',
  styleUrls: ['./list-photos.component.scss']
})
export class ListPhotosComponent implements OnInit {

  photos: Photos[];
  addedPhotos: Photos[] = [];
  public paginationList: Photos[] = [];
  displayedColumns: string[] = ['thumbnailUrl', 'id', 'url', 'title'];
  dataSource: any;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router, private userService: PhotosService) { }

  ngOnInit() {
    // getting photos data
    this.userService.getData()
      .subscribe(data => {
        this.photos = data;
        this.photos.forEach(data => {
          data.isAdded = false
        })
      });
  }

  comparePhoto(photo) {
    // Adding photo to compare stack
    this.photos.map(p =>{
      if(p.id === photo.id){
        p.isAdded = true;
      }
    })
    this.addedPhotos.push(photo);
    this.userService.addedPhotos.next(this.addedPhotos);
    this.dataSource = new MatTableDataSource<IPhotos>(this.addedPhotos);
    this.dataSource.paginator = this.paginator;
  }

  removePhoto(photo) {
    // Adding remove to compare stack
    this.photos.map(p =>{
      if(p.id === photo.id){
        p.isAdded = false;
      }
    })
    this.addedPhotos = this.addedPhotos.filter(ph =>{
      return ph.id !== photo.id
    })
    this.userService.addedPhotos.next(this.addedPhotos);
    this.dataSource = new MatTableDataSource<IPhotos>(this.addedPhotos);
    this.dataSource.paginator = this.paginator;
  }

}

export interface IPhotos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
