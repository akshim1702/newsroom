import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { ToastrService } from 'ngx-toastr';
import { NewsRoomComponent } from '../Pages/news-room/news-room.component';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css'],
})
export class EditorComponent implements OnInit {
  htmlContent: any;
  editorContent: any;
  editorDisplayData: any;
  @Input() editorData: any;
  saveData: any;
  recurrenceValue: any;
  editorSaveData: any = [];
  editorStory: any;
  checkBool: boolean = false;
  CompleteBtn: boolean = false;
  acceptBtn: boolean = false;
  rejectedBtn: boolean = false;
  permissionValue: any = JSON.parse(sessionStorage.getItem('value')!);
  permissionRole: any = JSON.parse(atob(localStorage.getItem('roleId')!));
  acceptShow: boolean = false;
  submitShow: boolean = false;
  reassignBtn: boolean = false;
  saveChanges: boolean = false;
  recurrenceData: any;
  acceptVal: any;
  showRecurrence: boolean = false;
  @Output() accepteName: EventEmitter<any> = new EventEmitter();

  constructor(
    private toastr: ToastrService,
    private api: ApiService,
    private getData: NewsRoomComponent
  ) { }

  ngOnInit(): void {
    // console.log(this.editorData, "red")
    console.log(this.editorData.recurrenceCheck, "mu");
    this.editorDisplayData = JSON.parse(
      localStorage.getItem('showList') || '[]'
    );

    this.recurrenceData = this.editorData.recurrence
    if (
      this.editorDisplayData.length === undefined ||
      this.editorDisplayData.length === null ||
      this.editorDisplayData.length === 0
    ) {
      this.editorStory = this.editorData.story_Editor;
    } else {
      for (let i = 0; i < this.editorDisplayData.length; i++) {
        if (this.editorDisplayData[i].id === this.editorData.id) {

          this.editorStory = this.editorDisplayData[i].story;
        }
      }
    }
    this.getData.getRightSideData();
    this.showRecurrenceCheck();
    this.showDone();
    this.editorEditable();
    // this.showReassign();
    this.showCompleted();
    this.showReject();
  }
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '250px',
    minHeight: '0',
    maxHeight: 'auto',
    width: 'auto',
    minWidth: '0',
    translate: 'yes',
    enableToolbar: true,
    showToolbar: true,
    placeholder: 'Enter text here...',
    defaultParagraphSeparator: '',
    defaultFontName: '',
    defaultFontSize: '',
    sanitize: false,
    fonts: [
      { class: 'arial', name: 'Arial' },
      { class: 'times-new-roman', name: 'Times New Roman' },
      { class: 'calibri', name: 'Calibri' },
      { class: 'comic-sans-ms', name: 'Comic Sans MS' },
    ],
  };

  editor() {
    this.editorContent = this.editorStory;
    this.editorContent = this.editorContent.replace(/'/g, "@~`sinq%")
    const replaceStory = this.editorContent.replace(/"/g, '@~`dq%')

    const storyData = {
      id: this.editorData.id,
      rundownId: this.editorData.rundownId,
      status: 'Accepted',
      slugName: this.editorData.slugName,
      slugType: this.editorData.slugType,
      reporter: this.editorData.reporter,
      assignTo: this.editorData.assignTo,
      acceptedBy: sessionStorage.getItem('userName'),
      roleid: this.permissionRole,
      createDate: this.editorData.createDate,
      gfx_attachment: this.editorData.gfx_attachment,
      video_attachment: this.editorData.video_attachment,
      remarks: this.editorData.remarks,
      story_Editor: replaceStory,
      recurrence: this.recurrenceValue,
      rundownDraft: this.editorData.RundownDraft
    };
    this.accepteName.emit(sessionStorage.getItem('userName'))
    this.api.editStory(storyData).subscribe((data) => {
      if (data == 'Record updated successfully') {
        this.acceptShow = false;
        this.submitShow = true;
        this.saveChanges = true;
        this.toastr.success('Record updated successfully!');
        this.getData.getRightSideData();
      }
      else {
        this.toastr.success("Record hasn't been updated successfully!");
      }
    });
  }

  Done() {
    this.editorContent = this.editorStory;
    this.editorContent = this.editorContent.replace(/'/g, "@~`sinq%")
    const replaceStory = this.editorContent.replace(/"/g, '@~`dq%')
    const storyData = {
      id: this.editorData.id,
      rundownId: this.editorData.rundownId,
      status: 'Done',
      slugName: this.editorData.slugName,
      slugType: this.editorData.slugType,
      reporter: this.editorData.reporter,
      assignTo: this.editorData.assignTo,
      acceptedBy: sessionStorage.getItem('userName'),
      createDate: this.editorData.createDate,
      gfx_attachment: this.editorData.gfx_attachment,
      video_attachment: this.editorData.video_attachment,
      remarks: this.editorData.remarks,
      story_Editor: replaceStory,
      roleid: this.permissionRole + 1,
      recurrence: this.recurrenceValue
    };
    this.api.editStory(storyData).subscribe((data) => {
      if (data == 'Record updated successfully') {
        this.toastr.success('Record updated successfully!');
        this.getData.getRightSideData();
      }
      else {
        this.toastr.success("Record hasn't been updated successfully!");
      }
    });
    document.getElementById('save')?.click();
    // console.log(this.editorContent + 'content');
    this.editorData = {};
  }

  save() {
    this.saveData = this.editorStory;
    this.saveData = this.saveData.replace(/'/g, "@~`sinq%")
    const replaceStory = this.saveData.replace(/"/g, '@~`dq%')
    const editorData = {
      id: this.editorData.id,
      story: replaceStory,
    };
    const newStory = editorData;
    if (
      this.editorDisplayData.length === undefined ||
      this.editorDisplayData.length === null ||
      this.editorDisplayData.length === 0
    ) {
      this.editorSaveData.push(editorData);
    } else if (this.editorDisplayData.length != 0) {
      if (editorData.id != null) {
        this.editorDisplayData = this.editorDisplayData.filter(function (e: {
          id: number;
        }) {
          return e.id != editorData.id;
        });
        this.editorSaveData.push(editorData);
      } else {
        this.editorSaveData.push(newStory);
      }
    } else {
      this.editorSaveData.push(newStory);
    }

    this.editorSaveData = this.editorSaveData.concat(
      this.editorDisplayData || []
    );
    localStorage.setItem('showList', JSON.stringify(this.editorSaveData));
    console.log(replaceStory, "cons")
    const storyData = {
      id: this.editorData.id,
      rundownId: this.editorData.rundownId,
      status: 'Working',
      slugName: this.editorData.slugName,
      slugType: this.editorData.slugType,
      reporter: this.editorData.reporter,
      assignTo: this.editorData.assignTo,
      acceptedBy: sessionStorage.getItem('userName'),
      createDate: this.editorData.createDate,
      gfx_attachment: this.editorData.gfx_attachment,
      video_attachment: this.editorData.video_attachment,
      remarks: this.editorData.remarks,
      story_Editor: replaceStory,
      recurrence: this.recurrenceValue
    };
    this.api.editStory(storyData).subscribe((data) => {
      console.log(data, "working");
      if (data == 'Record updated successfully')
        this.toastr.success('Record updated successfully!');
      this.getData.getRightSideData();
    });
  }
  rejected() {
    const storyData = {
      id: this.editorData.id,
      rundownId: this.editorData.rundownId,
      status: 'Rejected',
      slugName: this.editorData.slugName,
      slugType: this.editorData.slugType,
      reporter: this.editorData.reporter,
      assignTo: this.editorData.assignTo,
      acceptedBy: this.editorData.acceptedBy,
      createDate: this.editorData.createDate,
      gfx_attachment: this.editorData.gfx_attachment,
      video_attachment: this.editorData.video_attachment,
      remarks: this.editorData.remarks,
      story_Editor: '',
      recurrence: this.recurrenceValue
    };
    this.api.editStory(storyData).subscribe((data) => {
      if (data == 'Record updated successfully')
        //  console.log(data);
        this.toastr.success('Record updated successfully!');
      this.getData.getRightSideData();
    });
  }

  showReject() {
    if (this.editorData.status == 'Rejected') {
      this.submitShow = false;
      this.saveChanges = false;
      this.acceptShow = false;
      this.editorConfig.editable = false;
      this.reassignBtn = true;
      this.CompleteBtn = false;
    }
    // console.log(this.permissionValue);
    // let newArrValue=[];
    // if((this.permissionValue.length != null)||(this.permissionValue.length != undefined)){
    //  newArrValue = this.permissionValue.filter(
    //   (value: any) => value.assignto == this.editorData.acceptedBy
    // );
    // console.log(newArrValue,"newArray")
    // }
    // if(newArrValue[0].assignto==this.editorData.acceptedBy){
    //   this.rejectedBtn=false;
    // }
    // else
    // this.rejectedBtn=true;
    //   if (newArrValue.length != 0) {
    //   if (
    //     (this.assignName[this.permissionRole - 1].value == this.editorData.acceptedBy)||((this.editorData.status=='Working') && ( this.assignName[this.permissionRole - 1].value!=this.editorData.acceptedBy))) {
    //     this.rejectedBtn = false;
    //   } else if (newArrValue[0].id < this.permissionRole) {
    //     this.rejectedBtn = true;
    //   } else {
    //     this.rejectedBtn = false;
    //   }
    // }
  }

  // showDone() {
  //   const newArrValue = this.permissionValue.filter(
  //     (value: any) => value.value == this.editorData.assignTo
  //   );
  //   const newData = this.permissionValue.filter(
  //     (value: any) => value.value == this.editorData.acceptedBy
  //   );
  //   if ((this.editorData.acceptedBy == null || this.editorData.acceptedBy == undefined || this.editorData.acceptedBy == "") && this.permissionValue[this.permissionRole - 1].id == newArrValue[0].id) {
  //     this.acceptShow = true;
  //     this.saveChanges = false;

  //   }
  //   else if ((this.editorData.status == "Accepted" || this.editorData.status == "Working") && (this.permissionValue[this.permissionRole - 1].id == newData[0].id)) {
  //     this.submitShow = true;
  //     this.saveChanges = true;
  //     this.rejectedBtn=false;
  //   }
  //   else if (this.editorData.status == "Reassigned") {
  //     this.acceptShow = true;
  //   }
  //   else {
  //     this.submitShow = false;
  //     this.acceptShow = false;
  //     this.saveChanges = false
  //   }
  // }
  showDone() {
    // console.log(this.permissionValue[0].assignto)
    // console.log(this.permissionRole, 'role');
    // console.log(this.editorData.roleid, 'role');

    if (
      this.editorData.roleid == this.permissionRole &&
      (this.editorData.acceptedBy == null ||
        this.editorData.acceptedBy == undefined ||
        this.editorData.acceptedBy == '' ||
        this.editorData.acceptedBy == ' ')
    ) {
      this.acceptShow = true;
    } else if (
      (this.editorData.status == 'Accepted' ||
        this.editorData.status == 'Working') &&
      sessionStorage.getItem('userName') == this.editorData.acceptedBy
    ) {
      this.acceptShow = false;
      this.submitShow = true;
      this.saveChanges = true;
    } else if (
      (this.editorData.status == 'Accepted' ||
        this.editorData.status == 'Working') &&
      sessionStorage.getItem('userName') != this.editorData.acceptedBy
    ) {
      this.acceptShow = false;
      this.submitShow = false;
      this.saveChanges = false;
    }
  }

  showCompleted() {
    if (this.permissionRole > 3 && this.editorData.status != 'Completed') {
      this.CompleteBtn = true;
      this.reassignBtn = true;
    } else if (this.editorData.status == 'Completed') {
      this.reassignBtn = true;
    } else {
      this.CompleteBtn = false;
    }
  }

  completed() {
    let compStory = this.editorStory;
    compStory = compStory.replace(/'/g, "@~`sinq%")
    const replaceStory = compStory.replace(/"/g, '@~`dq%')
    const storyData = {
      id: this.editorData.id,
      rundownId: this.editorData.rundownId,
      status: 'Completed',
      slugName: this.editorData.slugName,
      slugType: this.editorData.slugType,
      reporter: this.editorData.reporter,
      assignTo: this.editorData.assignTo,
      acceptedBy: sessionStorage.getItem('userName'),
      createDate: this.editorData.createDate,
      gfx_attachment: this.editorData.gfx_attachment,
      video_attachment: this.editorData.video_attachment,
      remarks: this.editorData.remarks,
      story_Editor: replaceStory,
      roleid: this.permissionRole,
      recurrence: this.recurrenceValue,
    };
    console.log(storyData, "story")
    this.api.editStory(storyData).subscribe((data) => {
      if (data == 'Record updated successfully')
        this.toastr.success('Record updated successfully!');
      this.getData.getRightSideData();
    });
    document.getElementById('save')?.click();
    this.editorData = {};
  }
  reassign() {
    let story = this.editorStory;
    story = story.replace(/'/g, "@~`sinq%")
    const replaceStory = story.replace(/"/g, '@~`dq%')
    const newArrValue = this.permissionValue.filter(
      (value: any) => value.assignto == this.editorData.assignTo
    );
    // console.log(newArrValue);
    const storyData = {
      id: this.editorData.id,
      rundownId: this.editorData.rundownId,
      status: 'Reassigned',
      slugName: this.editorData.slugName,
      slugType: this.editorData.slugType,
      reporter: this.editorData.reporter,
      assignTo: this.editorData.assignTo,
      acceptedBy: ' ',
      createDate: this.editorData.createDate,
      gfx_attachment: this.editorData.gfx_attachment,
      video_attachment: this.editorData.video_attachment,
      remarks: this.editorData.remarks,
      story_Editor: replaceStory,
      roleid: newArrValue[0].roleid,
      recurrence: this.recurrenceValue
    };
    this.api.editStory(storyData).subscribe((data) => {
      if (data == 'Record updated successfully')
        // console.log(data);
        this.toastr.success('Record updated successfully!');
      this.getData.getRightSideData();
    });
    document.getElementById('save')?.click();
    // console.log(this.editorContent + 'content');
    this.editorData = {};
  }

  showReassign() {
    if (this.permissionRole > 3) {
      this.reassignBtn = true;
    } else {
      this.reassignBtn = false;
    }
  }
  editorEditable() {
    if (
      this.editorData.status == 'Done' &&
      this.editorData.roleid <= this.permissionRole
    ) {
      this.editorConfig.editable = true;
      this.submitShow = true;
      this.saveChanges = true;
      this.rejectedBtn = true;
      if (this.permissionRole > 3) {
        this.CompleteBtn = true;
        this.reassignBtn = true;
      } else {
        this.CompleteBtn = true;
        this.reassignBtn = true;
      }
    } else if (
      this.editorData.status == 'Done' &&
      this.editorData.roleid > this.permissionRole
    ) {
      this.editorConfig.editable = false;
      this.submitShow = false;
      this.saveChanges = false;
    }

    // else if ((this.editorData.status != "Done" && this.editorData.roleid !=this.permissionRole)) {
    //   this.editorConfig.editable = false;
    //   this.submitShow = false;
    //   this.saveChanges = false;    }
    // else if ((this.editorData.status == "Completed")) {
    //   this.editorConfig.editable = false;
    // }
    // else if((this.editorData.status != "Done" && this.editorData.roleid <= this.permissionRole)) {
    //   this.editorConfig.editable = false;
    // }
    else {
      this.editorConfig.editable = true;
    }
  }
  selectedRecurrence(item: any) {
    this.recurrenceValue = item.target.value;
    // console.log(this.recurrenceValue, "recurrence")
  }

  showRecurrenceCheck() {
    if (this.editorData.recurrenceCheck == 'NO') {
      this.showRecurrence = false
    }
    else {
      this.showRecurrence = true;
    }
  }
}
