import { IVideoList } from './../interfaces/videoList.interfaces';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class VideoListService {
  videos: IVideoList[] = [
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
  constructor() {}
}
