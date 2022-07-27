import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  responsedata: any;
  summary: any;
  description: any;
  password: any;
  username: any;
  user: any;
  pass: any;
  data: any;
  selectChannel: any;
  displayData: any = [];
  channels: any = {};
  displayChannel: any = [];
  securePass: any;
  showLogin: boolean = true;
  showSelection: boolean = false;
  displayChannl: any = [];
  testData: any = [];
  channelData: any;
  proceedHide: boolean = false;
  organizationData: any = [];
  filterdata: any;
  permissionid: any;
  roleId: any = [];
  permissionData: any;
  channelId:any;
  getChannelId:any=[];
  public Login!: FormGroup;

  constructor(
    private service: AuthService,
    private route: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private api: ApiService
  ) {
    localStorage.clear();
  }

  ngOnInit(): void {

    this.Login = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  ProceedLogin() {
    if (this.Login.valid) {
      this.service.ProceedLogin(this.EncodeData()).subscribe((result) => {
        if (result != null) {
          // console.log(result);
          this.responsedata = result;
          // console.log(this.responsedata)
          this.summary = this.responsedata.summary.description;
          if (this.summary === 'OK') {
            this.testData = this.responsedata.data;
            sessionStorage.setItem("authToken",btoa(this.testData.sessionToken))
            this.permissionid = this.responsedata.data.id;
            this.api.permissionDetails(this.permissionid).subscribe((data) => {
              // console.log(data);
              this.roleId = data;
              for (let i = 0; i < this.roleId.length; i++) {
                this.permissionData = this.roleId[i].roleId;
              }
              console.log(this.permissionid, "permisson")
              sessionStorage.setItem("assignId", btoa(JSON.stringify(this.permissionid)))
              // console.log("h",this.permissionData);
              localStorage.setItem('roleId', btoa(JSON.stringify(this.permissionData)));
              // console.log("d",this.roleId.roleId);
            })
            sessionStorage.setItem('userName', this.responsedata.data.firstname)
            this.toastr.success('Login Successfull!', 'Welcome to news-room');
            this.data = this.responsedata.data.organisations;
            for (let i = 0; i < this.data.length; i++) {
              this.displayData = this.data[i].organisationName;
            }
            sessionStorage.setItem('userID', btoa(this.EncodeData()));
            this.showSelection = true;
            this.showLogin = false;
          }
          else {
            this.toastr.warning('Credential error!', "Email or Password didn't not matched");
          }
        }
        this.EncodeData();
      },
        err => {
          this.toastr.warning('Login error!', 'Try login again');
        });
    }
    else {
      this.toastr.warning('Login error!', 'Try login again');
    }
  }
  EncodeData() {
    this.user = encodeURIComponent(this.username);

    this.pass = encodeURIComponent(this.password);

    return 'username=' + this.user + '&password=' + this.pass;
  }

  onSelect(organiseId: any) {
    this.channels=[];
    this.displayChannl =[];
    var organizationID = organiseId.target.value;
    // console.log(this.data[organizationID],"ha")
    const newarrChannel = this.data.filter((val:any)=>val.id == organizationID)
    console.log(newarrChannel,"df")
    this.channels = newarrChannel[0].channels;
    console.log(this.channels,"orglen")
    if (organizationID) {
      for (let i = 0; i < this.channels.length; i++) {
        this.displayChannel = this.channels[i].channelName;
        this.displayChannl.push(this.displayChannel);
      }
    }
  }

  onChange(event: any) {
    this.selectChannel = event.target.value;
    this.proceedHide = true;
    const channelDataId = this.channels.filter((value:any)=>
      value.channelName == this.selectChannel
    )
    localStorage.setItem("channelId",channelDataId[0].id )
    localStorage.setItem("displayChannel", this.selectChannel)

  }

  proceed() {
    this.route.navigate(['/news-room']);
  }
}
