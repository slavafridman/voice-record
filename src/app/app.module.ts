import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AudioRecordingService } from './audio-recording-service.service';
import { RecorderComponent } from './recorder/recorder.component';

@NgModule({
  declarations: [
    AppComponent,
    RecorderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AudioRecordingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
