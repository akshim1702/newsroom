import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, timer } from "rxjs";
import { map, share } from "rxjs/operators";
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  theme: boolean = false;
  showNavbar: boolean = true;
  defaultTheme: any = localStorage.getItem('theme');
  selectedChannel: any;
  userName: any = sessionStorage.getItem('userName')
  currentDate: any;
  logger: boolean = false;
  time = new Date();
  rxTime = new Date();
  intervalId!: any;
  subscription!: Subscription;
  currentTime: any;
  @Output() fixedTime: EventEmitter<any> = new EventEmitter();
  constructor(private route: Router) { }
  @Output() draftShow = new EventEmitter<boolean>();
  @Output() rundownShow = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.selectedChannel = localStorage.getItem('displayChannel');
    this.themeUpdate();
    this.utcTime();
    this.filterTime();
    console.log(this.fixedTime, "ft")
    if (this.defaultTheme == 'White') {
      this.themeWhite();
    }
    else {
      this.themeBlack();
    }
  }
  ngDoCheck(): void {
    if (this.route.url == '/login') {
      this.showNavbar = false
    }
    else {
      this.showNavbar = true
    }
  }
  themeUpdate() {
    if (this.defaultTheme == '' || this.defaultTheme == null || this.defaultTheme == undefined) {
      this.defaultTheme = 'Black';
      localStorage.setItem('theme', 'Black');
    }
    else {
      this.defaultTheme = localStorage.getItem('theme');
    }
  }
  change(event: any) {
    localStorage.setItem('theme', event.target.value);
    if (event.target.value === 'White') {
      this.themeWhite();
    } else if (event.target.value === 'Black') {
      this.themeBlack();
    }
  }

  logOut() {
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('userToken');
    localStorage.removeItem('displayChannel');

    this.route.navigate(['/login'])

  }
  themeWhite() {
    document.documentElement.style.setProperty('--themeColor', '#eaeaea');
    document.documentElement.style.setProperty('--color1', 'black');
    document.documentElement.style.setProperty('--button-color2', 'black');
    document.documentElement.style.setProperty('--button-color3', 'white');
    document.documentElement.style.setProperty('--tableHeaderBackgroundColor', ' #0283bf');
    document.documentElement.style.setProperty('--tableHeaderColor', ' white');
    document.documentElement.style.setProperty('--table-row-hover-color', '#e2e2e2');
    document.documentElement.style.setProperty('--tr-border', '#d0d0d0');
    document.documentElement.style.setProperty('--tr-container', ' #fff');
    document.documentElement.style.setProperty('--button-color', ' #bdc0c0');
    document.documentElement.style.setProperty('--input-color', ' #bdc0c0');
    document.documentElement.style.setProperty('--leftsideGrid', ' #fff');
    document.documentElement.style.setProperty('--leftsideGridColor', ' #000');
    document.documentElement.style.setProperty('--leftsideSearch', ' #fff');
    document.documentElement.style.setProperty('--leftsideSearchColor', ' grey');
    document.documentElement.style.setProperty('--leftsidePopup', ' linear-gradient(to top, #dbdbdb 0%, #f8f8f8)');
    document.documentElement.style.setProperty('--headerNavbar', '#0283bf');
    document.documentElement.style.setProperty('--editorColor', '#fff');
    document.documentElement.style.setProperty('--paginationColor', '#7a7171');
    document.documentElement.style.setProperty('--headerPrompter', '#0283bf');
    document.documentElement.style.setProperty('--header', '#fff');
    document.documentElement.style.setProperty('--tableHead', '#1e6c90');

  }
  themeBlack() {
    document.documentElement.style.setProperty('--themeColor', ' #141414');
    document.documentElement.style.setProperty('--color1', ' white');
    document.documentElement.style.setProperty('--button-color2', ' white');
    document.documentElement.style.setProperty('--button-color3', ' black');
    document.documentElement.style.setProperty('--tableHeaderBackgroundColor', ' #191a1a');
    document.documentElement.style.setProperty('--tableHeaderColor', ' white');
    document.documentElement.style.setProperty('--table-row-hover-color', '#36393a');
    document.documentElement.style.setProperty('--tr-border', '#141414');
    document.documentElement.style.setProperty('--tr-container', ' #141414');
    document.documentElement.style.setProperty('--button-color', '#bdc0c0');
    document.documentElement.style.setProperty('--input-color', 'black');
    document.documentElement.style.setProperty('--leftsideGrid', ' #36393a');
    document.documentElement.style.setProperty('--leftsideGridColor', ' white');
    document.documentElement.style.setProperty('--leftsideSearch', ' #36393a');
    document.documentElement.style.setProperty('--leftsideSearchColor', ' white');
    document.documentElement.style.setProperty('--leftsidePopup', 'linear-gradient(to top, #3a3d3e 0%, #414546)');
    document.documentElement.style.setProperty('--headerNavbar', '#191a1a');
    document.documentElement.style.setProperty('--editorColor', '#36393a');
    document.documentElement.style.setProperty('--paginationColor', '#cacacad9');
    document.documentElement.style.setProperty('--headerPrompter', '#36393a');
    document.documentElement.style.setProperty('--header', '#e40b18');
    document.documentElement.style.setProperty('--tableHead', '#3b3f40');


  }
  loggerName() {
    if (this.logger != true) {
      this.logger = true
    }
    else {
      this.logger = false
    }
  }

  openSetting() {
    this.route.navigate(['/settings']);
  }

  newsRoom() {
    this.route.navigate(['/dashboard']);
  }
  runDown() {
    this.route.navigate(['/rundown']);
  }
  telePrompter() {
    this.route.navigate(['/teleprompter'])
  }



  ngOnDestroy(): void {
    clearInterval(this.intervalId);
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  filterTime() {
    this.intervalId = setInterval(() => {
      this.time = new Date();
    }, 1000);

    // Using RxJS Timer
    this.subscription = timer(0, 1000)
      .pipe(
        map(() => new Date()),
        share()
      )
      .subscribe(time => {
        let hour = this.rxTime.getHours();
        let minuts = this.rxTime.getMinutes();
        let seconds = this.rxTime.getSeconds();
        //let a = time.toLocaleString('en-US', { hour: 'numeric', hour12: true });
        let NewTime = hour + ":" + minuts + ":" + seconds
        this.rxTime = time;
      });
  }

  utcTime() {
    const utcTimestamp = new Date().getTime();
    console.log(utcTimestamp, "utcTimestamp");
    const copy = new Date();
    copy.setTime(utcTimestamp);

    console.log(utcTimestamp === copy.getTime(), "mk");
    let x = copy.toUTCString();
    console.log(x, "gh")
  }

  //   runDraft1() {
  //   (document.getElementById('draftDate') as HTMLInputElement).valueAsDate = new Date();
  //   this.captureTime();
  //   this.fixedTime.emit(this.currentTime);

  // }
  captureTime() {
    var d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    this.currentTime = hours + ':' + minutes + ':' + seconds;
    return this.currentTime;
  }


  rundownBtn() {
    this.rundownShow.emit(true);
    this.draftShow.emit(false);
    this.route.navigate(['/news-room']);
  }

  runDraft() {
    this.rundownShow.emit(false);
    this.draftShow.emit(true);
    this.route.navigate(['/news-room']);
  }


  dashboard() {
    this.route.navigate(['/dashboard']);
  }
}
