import { Component, OnDestroy } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { AudioRecordingService } from '../audio-recording-service.service';

@Component({
  selector: 'app-recorder',
  templateUrl: './recorder.component.html',
  styleUrls: ['./recorder.component.css']
})
export class RecorderComponent implements OnDestroy {

  isRecording = false;
  recordedTime: any;
  blobUrl: any;



  constructor(private audioRecordingService: AudioRecordingService, private sanitizer: DomSanitizer) {
    this.audioRecordingService.recordingFailed().subscribe(() => {
      this.isRecording = false;
    });

    this.audioRecordingService.getRecordedTime().subscribe((time) => {
      this.recordedTime = time;
    });

    this.audioRecordingService.getRecordedBlob().subscribe((data) => {
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(URL.createObjectURL(data.blob));
      alert(this.blobUrl);
      //TODO uploading to server
      //this.uploadRecord(data.blob);
    });
  }

  startRecording() {
    if (!this.isRecording) {
      this.isRecording = true;
      this.audioRecordingService.startRecording();
    }
  }

  abortRecording() {
    if (this.isRecording) {
      this.isRecording = false;
      this.audioRecordingService.abortRecording();
    }
  }

  stopRecording() {
    if (this.isRecording) {
      this.audioRecordingService.stopRecording();
      this.isRecording = false;
    }
  }

  clearRecordedData() {
    this.blobUrl = null;
  }

  ngOnDestroy(): void {
    this.abortRecording();
  }

  private uploadRecord(blob: Blob) {

    let fd = new FormData()
    fd.append('audio', blob)
    //  $http.post('/path/to/server', fd,
    //    {
    //      transformRequest: angular.identity
    //      headers: {'Content-Type' : undefined }
    //    }).success(data) ->
    //    console.log("Posted sound")
    return;
  }

}
