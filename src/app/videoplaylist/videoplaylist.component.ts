import { IVideoList } from './../interfaces/videoList.interfaces';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { VideoListService } from '../services/video-list.service';

@Component({
  selector: 'app-videoplaylist',
  templateUrl: './videoplaylist.component.html',
  styleUrls: ['./videoplaylist.component.scss'],
})
export class VideoplaylistComponent implements OnInit {
  videoItems: IVideoList[] = [
    {
      id: 1,
      name: 'First Video',
      src: 'http://static.videogular.com/assets/videos/big_buck_bunny_720p_h264.mov',
      type: 'video/mp4',
    },
    {
      id: 2,
      name: 'Second Video',
      src: 'http://static.videogular.com/assets/videos/videogular.mp4',
      type: 'video/mp4',
    },
  ];

  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];

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
    // this.videoItems = thiss._videoList.videos;
  }

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
  }

  nextVideo() {
    this.activeIndex++;

    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }

    this.currentVideo = this.videoItems[this.activeIndex];
  }

  initVdo() {
    this.data.play();
  }

  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }
}
