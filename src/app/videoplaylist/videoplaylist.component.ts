import { IVideoList } from './../interfaces/videoList.interfaces';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subject } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { VideoListService } from '../services/video-list.service';

@Component({
  selector: 'app-videoplaylist',
  templateUrl: './videoplaylist.component.html',
  styleUrls: ['./videoplaylist.component.scss'],
})
export class VideoplaylistComponent implements OnInit, AfterViewInit {
  videoItems$!: Observable<IVideoList[]>;

  activeIndex = 0;
  currentVideo = this._videoList.videos[this.activeIndex];

  seenVideoNumbers: number = 1;
  //داده از نوع مدیا پلیر
  data!: any;

  //toolbar
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  //
  constructor(
    private breakpointObserver: BreakpointObserver, //toolbar
    private _videoList: VideoListService
  ) {}

  ngOnInit(): void {
    //give video list
    // this.videoItems = this._videoList.videos;

    this.videoItems$ = new Observable<IVideoList[]>((data) => {
      data.next(this._videoList.videos);
    });
    // const $videoItems = new Observable<IVideoList[]>((data) =>
    // );

    // $videoItems.subscribe((d) => console.log(d));
  }

  ngAfterViewInit(): void {}

  videoPlayerInit(data: any) {
    this.data = data;

    //show video
    this.data
      .getDefaultMedia()
      .subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));

    //show next video
    this.data
      .getDefaultMedia()
      .subscriptions.ended.subscribe(this.nextVideo.bind(this));

    // this.data.getDefaultMedia().subscriptions.timeUpdate.subscribe((data) => {
    //   let currentTime = data.srcElement.currentTime;
    // });
  }

  nextVideo() {
    this.activeIndex++;

    if (this.activeIndex === this._videoList.videos.length) {
      this.activeIndex = 0;
    }

    this.currentVideo = this._videoList.videos[this.activeIndex];
  }

  initVdo() {
    this.data.play();

    //save which one of videos seen now index
    // if (this.data) {
    //   this._videoList.videos[this.activeIndex].completed = true;
    // }
  }

  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }

  //video duration
  onMetadata(e: Event, media: any) {
    // console.log('metadata: ', media);
    // if (media.id == this.activeIndex + 1) {
    //   let du = Math.floor((10 / 100) * Math.floor(media.duration)) * 1000;
    //   console.log(du);
    //   setInterval(() => {
    //     console.log(du);
    //   }, du);
    // }
  }
}
function next(next: any, arg1: (data: IVideoList[]) => void) {
  throw new Error('Function not implemented.');
}
