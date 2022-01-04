import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoToolbarComponent } from './video-toolbar/video-toolbar.component';

const routes: Routes = [{ path: '', component: VideoToolbarComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
