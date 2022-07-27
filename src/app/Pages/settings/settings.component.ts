import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  insertSetting!:FormGroup;
  userData:any=[];
  showEdit:boolean=false;
  showTable:boolean=true;
  constructor(private toastr: ToastrService,
    private api: ApiService,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
   this.userDetails();
   this.insertSetting = this.formBuilder.group({
    roleId : [''],
    userId : ['']
   })
  }

  userDetails(){
    this.userData =[];
    this.api.getUser().subscribe((res:any)=>{
      console.log(res,"res");
      for (let i = 0; i < res.length; i++) {
        this.userData.push(res[i])
        
      }
      console.log(this.userData,"res");

    })
  }

  clkEdit(item:any){
    console.log(item,"item")
    this.showEdit = true;
    this.showTable = false;
    this.insertSetting.controls['roleId'].setValue(item.roleId);
    this.insertSetting.controls['userId'].setValue(item.userId
    );
  }

  cancel(){
    this.showTable = true;
    this.showEdit = false;
  }

  submitClk(){
    const settingVal = {
      userId: this.insertSetting.value.userId,
      roleId:this.insertSetting.value.roleId
    }
    console.log(settingVal,"set")
    this.api.insertMapping(settingVal).subscribe((res:any)=>{
      if (res == " Data is inserted successfully ") {
        this.toastr.success(" Data is inserted successfully! ");
      } else {
        this.toastr.warning('data has not been inserted!');
      }
      document.getElementById('closeBtn')?.click();
    },
    (err) => {
    })
  }
}
