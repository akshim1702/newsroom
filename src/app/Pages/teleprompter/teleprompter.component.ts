import { DOCUMENT } from '@angular/common';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AnyAaaaRecord } from 'dns';
import { ApiService } from 'src/app/services/api.service';
import * as $ from "jquery";
import {
  SmoothScrollService,
  ISmoothScrollOption
} from "@boatzako/ngx-smooth-scroll";

@Component({
  selector: 'app-teleprompter',
  templateUrl: './teleprompter.component.html',
  styleUrls: ['./teleprompter.component.css']
})
export class TeleprompterComponent implements OnInit {
  fontSize = 100;
  startDuration: any;
  dateName: any = [];
  rundownTelename: any = [];
  storyTelePrompterData: any = [];
  storyShow: boolean = true;
  timerShow: boolean = true;
  stopBtn: boolean = false;
  tickSeconds: any = 0;
  tickMinutes: any = 0;
  tickHours: any = 0;
  playHide: boolean = true;
  speedDuration: any;
  dateTeleprompter: any = []
  topBtn: boolean = false;
  speedIcon: boolean = false;
  prompter: any;

  fullScreenflag: boolean = false;
  @ViewChild('basicTimer', { static: true }) basicTimer: any = ElementRef;
  @ViewChild("boxa") boxa: any = ElementRef;
  @ViewChild("boxb") boxb: any = ElementRef;
  constructor(@Inject(DOCUMENT) private document: any,private route: Router, private api: ApiService, private smooth: SmoothScrollService) { }

  ngOnInit(): void {

    const elm = document.querySelectorAll<HTMLElement>('.para')!;
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.margin = '10px';
    }
    this.api.GetTeleprompter().subscribe((res: any) => {
      const val = res
      for (let i = 0; i < val.length; i++) {
        this.dateName.push({
          rundownid: val[i].rundownid,
          rundownName: val[i].rundownname,
          dateRundown: val[i].date,
        });
      }
      this.dateDisplayTeleprompter();
    })
    this.smooth.smoothScrollToAnchor();


  }

  dateDisplayTeleprompter() {
    this.dateTeleprompter = this.dateName.map((item: any) => item.dateRundown)
      .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
    console.log(this.dateTeleprompter, "newVal")
  }
  homeBtn() {
    this.route.navigate(['/news-room'])
  }


  change(e: any) {
    console.log(e.target.value)
    this.startDuration = e.target.value;
    console.log(this.startDuration, "start")
  }
  changeFont(e: any) {
    const elm = document.querySelectorAll<HTMLElement>('.para')!;
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.fontSize = `${e.target.value}px`;
    }

  }
  changeMargin(e: any) {
    const elm = document.querySelectorAll<HTMLElement>('.para')!;
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.margin = `${e.target.value}px`;
    }
  }
  getColor(e: any) {
    const elm = document.querySelectorAll<HTMLElement>('.para')!;
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.color = `${e.target.value}`;
    }
  }
  getBackgroundColor(e: any) {
    const elm = document.querySelectorAll<HTMLElement>('.para')!;
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.backgroundColor = `${e.target.value}`;
    }
  }

  getDate(item: any) {
    this.rundownTelename = this.dateName.filter((val: any) => val.dateRundown == item.target.value)
  }
  getRundown(e: any) {
    this.storyTelePrompterData = []
    this.api.getTeleprompterRundown(e.target.value).subscribe((res: any) => {
      console.log(res, "resa");
      if (res != 'Story Data is not Found') {
        this.storyShow = false
        for (let i = 0; i < res.length; i++) {
          let storyData = res[i].story_editor.replace(/@~`dq%/g, '"')
          storyData = storyData.replace(/@~`sinq%/g, "'")
          this.storyTelePrompterData.push({
            id: res[i].id,
            slugname: res[i].slugname,
            story_editor: storyData
          })
        }
        console.log(this.storyTelePrompterData, "s")
      }
      else {
        this.storyShow = true;
      }

    })
  }

  changeSpeed(e: any) {
    this.speedDuration = e.target.value
    console.log(e.target.value, "hha")
    this.scrollTOElement(this.speedDuration);
  }
  scrollTOElement(speedParam: any) {
    this.timerShow = false;
    this.stopBtn = true;
    this.playHide = false;
    this.topBtn = true;
    let opt: ISmoothScrollOption = { duration: speedParam, easing: "linear" };
    this.smooth.smoothScroll(2000, opt, this.boxa.nativeElement);
    console.log(opt, "opt")
    this.timerShow = false;
    this.stopBtn = true;
    this.playHide = false
    if (this.tickMinutes != 0 || this.tickHours != 0 || this.tickSeconds != 0) {
      this.basicTimer.resume()
    }
    else {
      this.basicTimer.start()
    }
  }
  scrollstopElement = () => {
    this.stopBtn = false;
    this.playHide = true;
    this.topBtn = false;
    var timer = this.basicTimer.get()
    console.log(timer)
    this.basicTimer.stop()
    this.tickHours = timer.hours
    this.tickMinutes = timer.minutes
    this.tickSeconds = timer.seconds
    console.log(this.tickMinutes, "sdf", this.tickSeconds, "hh", this.tickHours, "asd")
    // console.log(this.basicTimer, "heello")
    // $('html,body').stop();
    let opt: ISmoothScrollOption = { duration: 50000000000, easing: "linear" };
    this.smooth.smoothScroll(2000, opt, this.boxa.nativeElement);
  };
  getRefresh() {
    this.basicTimer.reset();
    const elm = document.querySelectorAll<HTMLElement>('.para')!;
    for (let i = 0; i < elm.length; i++) {
      elm[i].style.margin = '10px';
      elm[i].style.fontSize = '10px';
    }
    this.goToTopBox();
  }
  goToTopBox() {
    this.stopBtn = false;
    this.playHide = true;
    this.topBtn = false;
    let opt: ISmoothScrollOption = { duration: 1000, easing: "linear" };
    this.smooth.smoothScrollToTop(opt, this.boxa.nativeElement);
  }


  
fullScreen() {
  if (this.fullScreenflag == false) {
      let elem = document.getElementById("mySidenav") as HTMLElement;//documentElement;
      let methodToBeInvoked = elem.requestFullscreen 
      if (methodToBeInvoked) methodToBeInvoked.call(elem);
      this.fullScreenflag = true;
  }
  else {
      this.closeFullscreen();
      this.fullScreenflag = false;
  }
}
closeFullscreen() {
  if (this.document.exitFullscreen) {
      this.document.exitFullscreen();
  } else if (this.document.mozCancelFullScreen) {
      /* Firefox */
      this.document.mozCancelFullScreen();
  } else if (this.document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      this.document.webkitExitFullscreen();
  } else if (this.document.msExitFullscreen) {
      /* IE/Edge */
      this.document.msExitFullscreen();
  }
}
}
