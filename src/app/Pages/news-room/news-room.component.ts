import { Component, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ToastrService } from 'ngx-toastr';
import { OrderPipe } from 'ngx-order-pipe';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { newArray } from '@angular/compiler/src/util';
import { NgxUiLoaderService } from "ngx-ui-loader";
import { Router } from '@angular/router';
@Component({
  selector: 'app-news-room',
  templateUrl: './news-room.component.html',
  styleUrls: ['./news-room.component.css'],
})
export class NewsRoomComponent implements OnInit {
  leftSideRundown!: FormGroup;
  leftSideRecurrence!: FormGroup;
  leftsideDrop!: FormGroup;
  rightSideGridData!: FormGroup;
  hideCorrection: boolean = false;
  showContent: boolean = true;
  hideContent: boolean = false;
  showNavbar: boolean = false;
  hideTables: boolean = false;
  showEdit: boolean = false;
  showInsertBtn: boolean = false;
  getLeftSideBarId: any;
  checked: any;
  pasteHide: boolean = false;
  editorHide: boolean = false;
  term: any;
  graphicData: any;

  SPlOffset: any;

  titleGraphics: any;
  clipId: any;
  tpData: any = [];

  searchterm: any;
  graphicsSearch: any;
  selectedIndex: any;
  selectedVideoIndex: any = [];
  totalCount: any;
  assignTo: any = [];
  status: any = [];
  gridDataRightSide: any = [];
  storyValue: any;
  sendStoryValue: any;
  insert: any;
  x: any;
  z: any;
  p: any;
  lix: any;
  y: any;
  a: any;
  indexes: any = [];
  indexesUpdate: any = [];
  leftsideData: any = [];
  copyAllSelectedData: any;
  cutAllSelectedData: any;
  gridData: any;
  deleteAllSelectedData: any;
  items: any = [];
  key!: number;
  gridDataAll: any = [];
  slugType: any = [];
  statusData: any = [];
  dataAny: any;
  dataAnySlugName: any;
  dataAnySlugType: any;
  rundownID: any;
  slugName: any;
  slugTypeData: any;
  assignToData: any;
  createDateData: any;
  dataAnyStatus: any = [];
  dataAnyReporter: any;
  dataAnyAssign: any;
  dataAccepted: any;
  editorValue: any;
  leftSideDataBar: any = [];
  dataTitle: any = [];
  updateShow: boolean = false;
  duplicateheading: boolean = false;
  createShow: boolean = true;
  showCreate: boolean = true;
  showCreateBtn: boolean = true;
  showUpdateBtn: boolean = true;
  showGraphicsButton: boolean = true;
  showUpdate: boolean = false;
  duplicateShow: boolean = false;
  currentDate: any;
  currentTime: any;
  page: number = 1;
  targetId: any;
  insertRundownId: any;
  pasteId: any;
  pasteRundowId: any;
  copyItem: any;
  permissionValue: any = [];
  statusValue: any = [];
  graphicsCard: any = [];
  colors: any = [];
  permissionRole: any = JSON.parse(atob(localStorage.getItem('roleId')!));
  assignId: any = JSON.parse(atob(sessionStorage.getItem('assignId')!));
  editingStatus: boolean = true;
  weekShow: boolean = false;
  templateData: any;
  graphicsValue: any = [];
  SPlist: any = [];
  templateid: any;
  tpName: any;
  tpValue: any = [];
  tpList: any = [];
  tpStatus: any = [];
  tpArray: any = [];
  weekName: any = [];
  colorData: any = [];
  assetsName: any = [];
  videoAssets: any = [];
  weekDays: any = [];
  daysName: any = [];
  videoArray: any = [];


  videoAid: any;
  videoAidData: any = [];
  videoApiData: any = [];
  graphicsContent: boolean = true;
  videoContent: boolean = true;
  recurrenceCheck: any;
  showGfx: boolean = true;
  recurrenceShow: boolean = false;
  assignRoleId: any;
  counterGraphics: any = 0;
  recurrenceValue: any;
  recurrenceData: any = [];
  recurrStartDate: any;
  recurrEndDate: any;
  reuccrenceArr: any = [];
  showGraph: boolean = false;
  showVideo: boolean = false;
  show: boolean = false;
  fullScreen: boolean = true;
  showVideoGfx: boolean = false;
  showVideoBtn: boolean = false;
  editorBack: boolean = false;
  editorBackBtn: boolean = false;
  template = ``;
  draftVal: any;
  showDraftVal: any;
  runDownType: any;

  addGfxShow: boolean = false;
  pcrData: any = [];


  groupNameValue: any;
  pcrName: any = [];
  caption: any = [];
  graphicsAmt: any = [];
  graphicsDataTitle: any = [];

  videoAttachGraphics: any = [];
  videoPushGraphics: any = [];

  showGraphEye: boolean = false;

  graphicsNo: any = [];
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private api: ApiService,
    private ngxService: NgxUiLoaderService,
    private route: Router
  ) { }

  ngOnInit(): void {
    // this.graphicsDisplay();
    // this.getVideoAssets();
    // console.log(this.acceptedName.accepteName,"fg")
    this.getPcr();
    this.getAssets();
    this.leftSideRundown = this.formBuilder.group({
      runDownId: [''],
      runDownName: ['', Validators.required],
      rundownDate: this.captureDate(),
      rundownCreationTime: this.captureTime(),
      rundownCreatedBy: [''],
      rundownRemarks: [''],
      rundownStatus: [''],
      rundownTime: [''],
      recurrence: ['NO'],
      pkg: ['group']
    });
    this.leftSideRecurrence = this.formBuilder.group({
      runDownId: [''],
      runDownName: ['', Validators.required],
      rundownDate: this.captureDate(),
      rundownCreationTime: this.captureTime(),
      rundownCreatedBy: [''],
      rundownRemarks: [''],
      rundownStatus: [''],
      rundownTime: [''],
      recurrenceStart: [''],
      recurrenceEnd: [''],
      calendar: ['selectRecurrence'],
      recurrence: ['YES'],
      recurenceType: ['true'],

    });
    this.leftsideDrop = this.formBuilder.group({
      runDownId: [''],
      rundownDraft: ['YES'],
      runDownName: ['', Validators.required],
      rundownDate: this.captureDate(),
      rundownCreationTime: this.captureTime(),
      rundownCreatedBy: [''],
      rundownRemarks: [''],
      rundownStatus: [''],
      rundownTime: [''],
      recurrence: ['NO'],
      pkg: ['']
    });
    console.log(this.leftsideDrop, "drop")
    this.rightSideGridData = this.formBuilder.group({
      id: [''],
      rundownId: [''],
      status: [''],
      slugName: ['', Validators.required],
      slugType: ['', Validators.required],
      reporter: [''],
      assignTo: ['', Validators.required],
      acceptedBy: [''],
      createDate: this.captureDate(),
      gfx_attachment: [''],
      video_attachment: [''],
      remarks: [''],
      roleid: [''],
    });
    this.showContent = true;
    this.captureTime();
    this.getLeftSideData();
    this.leftsideData = [
      {
        rundownID: 1,
        rundownname: 'Fox is pretty',
        starton: '00:00:00:00',
        Duration: ' 0 days, 00:36:58',
      },
      {
        rundownID: 2,
        rundownname: 'This is a title',
        starton: '00:00:00:00',
        Duration: ' 0 days, 00:36:58',
      },
      {
        rundownID: 3,
        rundownname: 'Box is on',
        starton: '00:00:00:00',
        Duration: ' 0 days, 00:36:58',
      },
    ];
    // this.gridDataAll = [
    //   {
    //     key: 1,
    //     data: [
    //       {
    //         rundownID: 1,
    //         Status: 'pending',
    //         SlugName: 'Check',
    //         SlugType: 'My Story',
    //         Reporter: 'Alisa',
    //         AssignTo: 'Check data',
    //         AcceptedBy: 'Salinity',
    //         createDate: '12-08-2022',
    //         isSelected: false,
    //       },
    //       {
    //         rundownID: 2,
    //         Status: 'pending',
    //         SlugName: 'Reck',
    //         SlugType: 'jack Story',
    //         Reporter: 'jacky',
    //         AssignTo: 'texty',
    //         AcceptedBy: 'saline',
    //         createDate: '12-08-2025',
    //         isSelected: false,
    //       },
    //     ],
    //   },
    //   {
    //     key: 2,
    //     data: [
    //       {
    //         rundownID: 1,
    //         Status: 'pending',
    //         SlugName: 'abcd',
    //         SlugType: 'Any Story',
    //         Reporter: 'Name',
    //         AssignTo: 'text',
    //         AcceptedBy: 'saline',
    //         createDate: '12-08-2022',
    //         isSelected: false,
    //       },
    //       {
    //         rundownID: 2,
    //         Status: 'pending',
    //         SlugName: 'abcd',
    //         SlugType: 'Any Story',
    //         Reporter: 'Name',
    //         AssignTo: 'text',
    //         AcceptedBy: 'saline',
    //         createDate: '12-08-2022',
    //         isSelected: false,
    //       },
    //     ],
    //   },
    //   {
    //     key: 3,
    //     data: [
    //       {
    //         rundownID: 1,
    //         Status: 'pending',
    //         SlugName: 'abcd',
    //         SlugType: 'Any Story',
    //         Reporter: 'Name',
    //         AssignTo: 'text',
    //         AcceptedBy: 'saline',
    //         createDate: '12-08-2022',
    //         isSelected: false,
    //       },
    //     ],
    //   },
    // ];

    // this.slugType = [
    //   {
    //     value: 'Story',
    //   },
    //   {
    //     value: 'PKG',
    //   },
    //   {
    //     value: 'Voice Over',
    //   },
    //   {
    //     value: 'Story+GFX',
    //   },
    //   {
    //     value: 'Opening',
    //   },
    //   {
    //     value: 'Montage',
    //   },
    //   {
    //     value: 'Closing Montage',
    //   },
    //   {
    //     value: 'Highlights',
    //   },
    // ];
    this.statusValue = [
      {
        id: 1,
        value: 'Pending',
      },
      {
        id: 2,
        value: 'Accepted',
      },
      {
        id: 3,
        value: 'Working',
      },
      {
        id: 4,
        value: 'On-Hold',
      },
      {
        id: 5,
        value: 'Done',
      },
      {
        id: 6,
        value: 'Rejected',
      },
      {
        id: 7,
        value: 'Reassigned',
      },
      {
        id: 7,
        value: 'Completed',
      },
      //       Pending Yellow
      // Accepted
      // Working
      // On-Hold Blue
      // Done
      // Rejected Red
      // Reassigned
      // Completed
    ];
    this.colors = [
      { value: 'Pending', color: 'Yellow' },
      { value: 'Accepted', color: 'Grey' },
      { value: 'Working', color: 'Blue' },
      { value: 'On-Hold', color: 'Blue' },
      { value: 'Done', color: 'Green' },
      { value: 'Rejected', color: 'Red' },
      { value: 'Reassigned', color: ' #fc6f03' },
      { value: 'Completed', color: 'green' },
    ];
    this.permissionValue = [
      {
        id: 1,
        value: 'Mukesh Yadav',
      },
      {
        id: 2,
        value: 'Akshya',
      },
      {
        id: 3,
        value: 'Sudheer Kumar',
      },
      {
        id: 4,
        value: 'Mohit',
      },
      {
        id: 5,
        value: 'Gunjan',
      },
    ];
    this.captureDate();
    this.permission();
    this.statusDecide();
    this.weekName = [
      { value: 'Monday' },
      { value: 'Tuesday' },
      { value: 'Wednesday' },
      { value: 'Thursday' },
      { value: 'Friday' },
      { value: 'Saturday' },
      { value: 'Sunday' },
    ];
    this.daysName = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  }
  getTheColor(value: any) {
    return this.colors.filter((item: any) => item.value === value)[0].color; // could be better written, but you get the idea
  }
  permission() {
    this.api.getAssignTo(this.assignId).subscribe((data) => {
      if (
        data !=
        'StartIndex cannot be less than zero.\nParameter name: startIndex'
      ) {
        this.assignTo = data;
        sessionStorage.setItem('value', JSON.stringify(data));
      }
    });
  }
  statusDecide() {
    for (let i = 0; i < this.statusValue.length; i++) {
      this.status.push(this.statusValue[i]);
    }
    // console.log(this.status, 'status');
  }

  getLeftSideData() {
    this.leftSideDataBar = [];
    if (this.runDownType != undefined) {
      this.api.getLeftSideData(this.runDownType).subscribe((data) => {
        if (data == 'Data is not found') {
        } else {
          this.leftSideDataBar = data;
        }
      })
    }
    else {
      this.api.getLeftSideData("").subscribe((data) => {
        if (data == 'Data is not found') {
        } else {
          this.leftSideDataBar = data;
        }
      })
    }
  }


  selectRundownType(item: any) {
    this.runDownType = item.target.value;
    this.getLeftSideData();
  }

  getRightSideData() {
    this.api.getGridData(this.getLeftSideBarId).subscribe((data) => {
      if (data == 'Data is not found') {
        this.showContent = true;
        this.showEdit = false;
        this.hideContent = true;
        this.showNavbar = true;
        this.hideTables = false;
      } else {
        // console.log(this.gridDataRightSide, "duplicate")
        this.gridDataRightSide = data;
        this.showNavbar = true;
        this.hideTables = true;
        this.showContent = false;
      }
    });
  }

  showTable(item: any, i: any) {

    this.showDraftVal = item.rundownDraft;
    this.recurrenceCheck = item.recurrence;
    this.groupNameValue = item.package;
    console.log(this.recurrenceCheck, "ds")

    this.slugType = []

    this.caption = this.pcrData.filter((val: any) => val.groupName == this.groupNameValue)
    for (let i = 0; i < this.caption.length; i++) {
      this.slugType.push({ value: this.caption[i].caption })
    }
    console.log(this.slugType, "caption");
    this.rightSideGridData.controls['rundownId'].setValue(item.rundownId);
    this.api.getGridData(item.rundownId).subscribe((data) => {
      if (data == 'Data is not found') {
        this.showContent = true;
        this.showEdit = false;
        this.selectedIndex = i;
        this.hideContent = true;
        this.showNavbar = true;
        this.hideTables = false;
      } else {
        this.gridDataRightSide = data;

        this.showNavbar = true;
        this.hideTables = true;
        this.showContent = false;
      }
      this.x = item.rundownName;

      this.totalCount = 0;
      this.indexes = [];
    });

    this.getLeftSideBarId = item.rundownId;

    this.showContent = false;
    this.showEdit = false;
    this.selectedIndex = i;
    this.hideContent = true;
  }

  dropData(event: CdkDragDrop<any[]>) {
    console.log(event, "event")
    if (confirm('Are You Sure You want to drag!')) {

      console.log(event, "sv")
      const previousIndex = event.container.data[event.previousIndex];
      const currentIndex = event.container.data[event.currentIndex];
      // let currentIndexId;
      // if (event.currentIndex != 0) {
      //   currentIndexId = event.container.data[event.currentIndex - 1];
      // }
      // else {
      //   currentIndexId = event.container.data[event.currentIndex];
      // }
      // console.log(currentIndexId, "hjh")
      const dragdata = [
        {
          targetID: currentIndex.seqid,
          seqid: previousIndex.seqid,
        },
      ];
      console.log(dragdata, "drag")
      this.api.dragDropData(dragdata).subscribe(
        (data: any) => {
          if (data == 'drag drop successfully') {
            this.toastr.success('drag drop successfully!');
          } else {
            this.toastr.warning('drag drop has not done successfully!');
          }
          document.getElementById('rightSideCLose')?.click();
          this.getRightSideData();
        },
        (err) => {
          this.toastr.warning('Internal server error!');
        }
      );
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.toastr.warning('Drag Cancelled');
    }
  }

  key1 = '';
  reverse: boolean = false;
  sort(key: string) {
    //   this.key1 = key;
    //   this.reverse = !this.reverse;
    //   console.log(this.gridDataRightSide)
  }
  sortSlugName() {
    // const fSort = (a: any, b: any) => {
    //   const Dx = a.slugName.trim().localeCompare(b.slugName.trim()); // 2nd
    //   return Dx;
    // };
    // const data = this.gridDataRightSide.sort(fSort);
    // this.gridDataRightSide = data;
    // const len = this.gridDataRightSide.length;
    // for(let i=0;i<len;i++){
    //   for(let j=i+1;j<len;j++){
    //     if(this.gridDataRightSide[i].slugName>this.gridDataRightSide[j].slugName){
    //       const temp = this.gridDataRightSide[i];
    //       this.gridDataRightSide[i]=this.gridDataRightSide[j];
    //       this.gridDataRightSide[j] =temp;
    //     }
    //   }
    // }
    // console.log(this.gridDataRightSide)
  }
  sortDate() {
    // const fSort = (a: any, b: any) => {
    //   const Dx = a.createDate.trim().localeCompare(b.createDate.trim()); // 2nd
    //   return Dx;
    // };
    // const data = this.gridDataRightSide.sort(fSort);
    // this.gridDataRightSide = data;
    // const len = this.gridDataRightSide.length;
    // for(let i=0;i<len;i++){
    //   for(let j=i+1;j<len;j++){
    //     if(this.gridDataRightSide[i].createDate>this.gridDataRightSide[j].createDate){
    //       const temp = this.gridDataRightSide[i];
    //       this.gridDataRightSide[i]=this.gridDataRightSide[j];
    //       this.gridDataRightSide[j] =temp;
    //     }
    //   }
    // }
    // console.log(this.gridDataRightSide)
  }

  delete(item: any, event: any) {
    // console.log(item.id, "id", this.getLeftSideBarId, "rundown id")
    this.api.deleteRightSideData(item.id, this.getLeftSideBarId).subscribe(
      (data) => {
        if (data == 'Record deleted successfully') {
          this.toastr.success('data deleted successfully!');
          this.getRightSideData();
        } else {
          this.toastr.warning('data does not deleted successfully!');
        }
      },
      (err) => {
        this.toastr.warning('Internal server error!');
      }
    );
    event.preventDefault();
  }

  changedAll(event: any) {
    if (this.gridData.every((val: any) => val.checked == true)) {
      this.gridData.forEach((val: any) => {
        val.checked = false;
      });
    } else
      this.gridData.forEach((val: any) => {
        val.checked = true;
      });
  }

  changed(item: any, event: any) {
    const a = item;
    if (event.target.checked) {
      this.indexes.push(a);
    } else {
      let index_1 = this.indexes.indexOf(a);
      this.indexes.splice(index_1, 1);
    }
    this.totalCount = this.indexes.length;
    if (this.totalCount > 0) {
      this.showEdit = true;
    } else {
      this.showEdit = false;
    }

    return this.indexes;
  }

  copy(items: any, i: any, event: any) {
    this.copyItem = items;
    this.pasteHide = true;
    this.toastr.success('Copy  successfully!');
    event.preventDefault();
    return this.copyItem;
  }

  cut(items: any, i: any, event: any) {
    let index = this.gridDataRightSide.indexOf(items);
    // console.log(index);
    this.gridDataRightSide.splice(index, 1);
    this.lix = items;
    this.toastr.success('Cut  successfully!');
    // console.log(this.lix);
    this.pasteHide = true;
    event.preventDefault();
    return this.lix;
  }

  copyMultipleItem() {
    this.pasteHide = true;
    this.copyAllSelectedData = this.indexes;
    this.toastr.success('Copy  successfully!');
    return this.copyAllSelectedData;
  }

  cutMultipleItem() {
    this.pasteHide = true;
    this.cutAllSelectedData = this.indexes;
    this.indexesUpdate = this.gridDataRightSide.filter(
      (item: { id: number }) =>
        !this.cutAllSelectedData.some(
          (itemToBeRemoved: { id: number }) => itemToBeRemoved.id === item.id
        )
    );
    this.toastr.success('Cut  successfully!');
    this.gridDataRightSide = this.indexesUpdate;
  }

  deleteMultipleItem() {
    alert('Coming Soon');
    // this.deleteAllSelectedData = this.indexes;
    // alert('are you sure you wnat to delete?');
    // this.indexesUpdate = this.gridData.filter(
    //   (item: { rundownID: number }) =>
    //     !this.deleteAllSelectedData.some(
    //       (itemToBeRemoved: { rundownID: number }) =>
    //         itemToBeRemoved.rundownID === item.rundownID
    //     )
    // );
    // this.gridData = this.indexesUpdate;
    // this.totalCount = 0;
    // this.showEdit = false;
    // this.indexes = [];
    // this.toastr.warning('Deleted!', 'Fields Deleted Successfully ');
  }

  pasteItem(item: any, event: any) {
    this.pasteId = item.id;
    this.pasteRundowId = item.rundownId;
    console.log(this.pasteId, 'p');
    // console.log(this.copyItem);
    if (this.lix == null && this.copyItem == null) {
      // Cut multiple items
      if (
        this.copyAllSelectedData == null ||
        this.copyAllSelectedData.length == 0
      ) {
        for (let index = 0; index < this.indexes.length; index++) {
          this.gridDataRightSide.splice(
            item.id,
            0,
            this.cutAllSelectedData[index]
          );
        }
        // this.indexes[0].targetID = item.id;
        console.log(this.indexes, "index")
        const newPasteArr = []
        for (let i = 1; i <= this.indexes.length; i++) {
          newPasteArr.push({
            targetID: item.seqid + i,
            seqid: this.indexes[i - 1].seqid,
          })
        }
        if (confirm('Are You Sure You want to Paste!')) {
          // console.log(this.indexes, "index")
          this.api.cutGridData(newPasteArr).subscribe(
            (data) => {
              // console.log(data);
              if (data == 'Cut Paste  successfully') {
                this.toastr.success('Row Cut Pasted successfully!');
              } else {
                this.toastr.warning(
                  'Row Cut pasted has not done successfully!'
                );
              }
              document.getElementById('rightSideCLose')?.click();
              this.getRightSideData();
              this.totalCount = 0;
              this.lix = null;
            },
            (err) => {
              this.toastr.warning('Internal server error!');
            }
          );
          this.cutAllSelectedData = [];
          this.indexes = [];
          this.totalCount = 0;
          this.showEdit = false;
          this.pasteHide = true;
        } else {
          this.toastr.warning('Copy Cancelled');
          this.getRightSideData();
        }
      }
      // Copy for multiple items
      else {
        for (let index = 0; index < this.indexes.length; index++) {
          this.gridDataRightSide.splice(
            item.id,
            0,
            this.copyAllSelectedData[index]
          );
        }
        this.indexes[0].targetID = item.id;
        if (confirm('Are You Sure You want to Paste!')) {
          this.api.copyGridData(this.indexes).subscribe(
            (data) => {
              // console.log(data);

              if (data == 'Copy Pasted successfully') {
                this.toastr.success('Copy Pasted successfully!');
              } else {
                this.toastr.warning('copy pasted has not done successfully!');
              }
              document.getElementById('rightSideCLose')?.click();
              this.getRightSideData();
              this.totalCount = 0;
              this.lix = null;
            },
            (err) => {
              this.toastr.warning('Internal server error!');
            }
          );
          this.copyAllSelectedData = [];
          this.indexes = [];
          this.totalCount = 0;
          this.showEdit = false;
        } else {
          this.toastr.warning('Copy Cancelled');
          this.getRightSideData();
        }
      }
      // console.log(this.indexes);
    } else if (this.lix != null) {
      // console.log(this.lix, 'hey');
      if (confirm('Are You Sure You want to Paste!')) {
        this.gridDataRightSide.splice(item.id, 0, this.lix);
        const pasteData = [
          {
            targetID: item.seqid + 1,
            seqid: this.lix.seqid,
          },
        ];
        // console.log(pasteData);
        this.api.cutGridData(pasteData).subscribe(
          (data: any) => {
            // console.log(data);
            if (data == 'Cut Paste  successfully') {
              this.toastr.success('Row Cut pasted successfully!');
            } else {
              this.toastr.warning('Row cut has not been inserted!');
            }
            document.getElementById('rightSideCLose')?.click();
            this.getRightSideData();
            this.lix = null;
          },
          (err) => {
            this.toastr.warning('Internal server error!');
          }
        );
      } else {
        this.toastr.warning('Cut Cancelled');
        this.getRightSideData();
        this.lix = null;
      }
    } else if (this.copyItem != null) {
      // console.log('hello');
      if (confirm('Are You Sure You want to Copy!')) {
        this.gridDataRightSide.splice(item.id, 0, this.copyItem);
        const copyDataValue = [
          {
            targetID: item.id,
            id: this.copyItem.id,
            rundownId: this.pasteRundowId,
            status: this.copyItem.status,
            slugName: this.copyItem.slugName,
            slugType: this.copyItem.slugType,
            reporter: this.copyItem.reporter,
            assignTo: this.copyItem.assignTo,
            acceptedBy: this.copyItem.acceptedBy,
            createDate: this.copyItem.createDate,
            gfx_attachment: this.copyItem.gfx_attachment,
            video_attachment: this.copyItem.video_attachment,
            remarks: this.copyItem.remarks,
            story_Editor: this.copyItem.story_Editor,
            RundownDraft: this.showDraftVal
          },
        ];
        // console.log(copyDataValue);
        this.api.copyGridData(copyDataValue).subscribe(
          (data: any) => {
            // console.log(data);
            if (data == 'Copy Pasted successfully') {
              this.toastr.success('Copy Pasted successfully!');
            } else {
              this.toastr.warning('Copy Pasted has not done successfully!');
            }
            document.getElementById('rightSideCLose')?.click();
            this.getRightSideData();
            this.copyItem = null;
          },
          (err) => {
            this.toastr.warning('Internal server error!');
          }
        );
      } else {
        this.toastr.warning('Copy Cancelled');
        this.getRightSideData();
        this.copyItem = null;
      }
    }
    event.preventDefault();
  }
  buttonClicked() {
    this.showCreateBtn = true;
    this.showUpdateBtn = false;
    // console.log(this.assignTo, 'assign');
    const id = this.assignTo.filter(
      (value: any) => value.assignto == this.rightSideGridData.value.assignTo
    );
    const postRightSideBar = {
      rundownId: this.rightSideGridData.value.rundownId,
      status: 'Pending',
      slugName: this.rightSideGridData.value.slugName,
      slugType: this.rightSideGridData.value.slugType,
      reporter: sessionStorage.getItem('userName'),
      assignTo: this.rightSideGridData.value.assignTo,
      acceptedBy: '',
      roleid: id[0].roleid,
      createDate: this.captureGridDate(),
      gfx_attachment: '',
      video_attachment: '',
      remarks: 'true',
      recurrence: 'NO',
      RundownDraft: this.showDraftVal
    };
    // console.log(postRightSideBar);
    this.api.postGridData(postRightSideBar).subscribe(
      (data) => {
        if (data == 'Record inserted successfully') {
          this.toastr.success('Record inserted successfully!');
          document.getElementById('rightSideCLose')?.click();
          this.getRightSideData();
        } else {
          this.toastr.warning('Record not inserted successfully');
        }
      },
      (err) => { }
    );
  }
  insertData() {
    this.insert = {
      Status: 'pending',
      rundownID: this.rundownID,
      SlugName: this.slugName,
      SlugType: this.slugTypeData,
      Reporter: 'newReporter',
      AssignTo: this.assignToData,
      AcceptedBy: '',
      createDate: this.createDateData,
    };
    this.rundownID = null;
    this.slugName = null;
    this.slugTypeData = null;
    this.assignToData = null;
    this.createDateData = null;
    this.gridData.splice(this.z, 0, this.insert);
    document.getElementById('closeButtonInsert')?.click();
  }
  deleteLeftSide(item: any, event: any) {
    if (confirm('Are You Sure You want to Delete!')) {
      this.api.deleteLeftSideData(item.rundownId).subscribe(
        (data) => {
          if (
            data == 'Record not deleted' ||
            data ==
            'StartIndex cannot be less than zero.\nParameter name: startIndex' ||
            data == 'Record deleted successfully'
          ) {
            this.toastr.success('data deleted successfully!');
            this.leftSideDataBar = [];
            this.getLeftSideData();
            this.gridDataRightSide = [];
            this.hideTables = false
            this.showNavbar = false
          } else {
            this.toastr.warning('data does not deleted successfully!');
          }
        },
        (err) => {
          this.toastr.warning('Internal server error!');
        }
      );
    } else this.toastr.warning('Delete Cancelled!');
  }

  clickEllipsis(item: any, i: any, event: any) {
    this.z = i;
    this.hideCorrection = true;
    event.preventDefault();
    return this.z;
  }

  openEditor(i: any, items: any) {

    this.graphicsAmt = [];
    this.graphicsDataTitle = []
    console.log(this.caption, "hello caption")
    const showEditorVal = this.caption.filter((val: any) => val.caption == items.slugType)
    console.log(showEditorVal, "showHide");
    if (showEditorVal[0].isSecondary == 0) {
      this.showVideo = false;
    }
    else if (showEditorVal[0].isSecondary == 1) {
      this.showVideo = true;
    }
    this.showGraph = true;

    this.editorHide = true;
    this.dataAnyStatus = 'Working';
    this.dataAnySlugName = items.slugName;
    this.dataAnySlugType = items.slugType;
    this.dataAnyReporter = items.reporter;
    this.dataAnyAssign = items.assignTo;
    this.dataAccepted = items.acceptedBy;
    this.clipId = items.id;
    let storyStr = items.story_Editor
    storyStr = storyStr.replace(/@~`sinq%/g, "'")
    const replaceStory = storyStr.replace(/@~`dq%/g, '"')
    console.log(replaceStory, "replace")
    this.assignRoleId = items.roleid;
    console.log(this.clipId, 'clipid');
    this.getGraphics();
    this.videoAttach();
    this.editorValue = [
      {
        id: items.id,
        rundownId: items.rundownId,
        status: items.status,
        slugName: items.slugName,
        slugType: items.slugType,
        reporter: items.reporter,
        assignTo: items.assignTo,
        acceptedBy: items.acceptedBy,
        createDate: items.createDate,
        gfx_attachment: items.gfx_attachment,
        video_attachment: items.video_attachment,
        remarks: items.remarks,
        story_Editor: replaceStory,
        roleid: items.roleid,
        recurrence: items.recurrence,
        RundownDraft: this.showDraftVal,
        recurrenceCheck: this.recurrenceCheck
      },
    ];
  }
  editorEditable() {
    if (this.editorValue.status == 'Done') {
      this.editingStatus = false;
    } else {
      this.editingStatus = true;
    }
    return this.editingStatus;
  }
  sendDataToEditor() {
    // this.sendStoryValue = this.storyValue;
  }
  captureDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.currentDate = dd + '-' + mm + '-' + yyyy;
    return this.currentDate;
  }
  captureGridDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    this.currentDate = yyyy + '-' + mm + '-' + dd;
    return this.currentDate;
  }

  captureTime() {
    var d = new Date();
    const hours = d.getHours();
    const minutes = d.getMinutes();
    const seconds = d.getSeconds();
    this.currentTime = hours + ':' + minutes + ':' + seconds;
    return this.currentTime;
  }

  updateLeftSideData(item: any) {
    this.updateShow = true;
    this.createShow = false;
    this.showCreate = false;
    this.showUpdate = true;
    this.duplicateShow = false;
    this.duplicateheading = false;
    this.leftSideRundown.controls['runDownId'].setValue(item.rundownId);
    this.leftSideRundown.controls['runDownName'].setValue(item.rundownName);
    this.leftSideRundown.controls['rundownDate'].setValue(item.date);
    this.leftSideRundown.controls['rundownCreationTime'].setValue(
      item.creationTime
    );
    this.leftSideRundown.controls['rundownCreatedBy'].setValue(item.createdBy);
    this.leftSideRundown.controls['rundownRemarks'].setValue(
      item.rundownRemarks
    );
    this.leftSideRundown.controls['rundownStatus'].setValue(item.rundownStatus);
    this.leftSideRundown.controls['rundownTime'].setValue(item.time);
  }
  updateLeftSideDetails() {
    const updatedLeftSideBar = {
      rundownId: this.leftSideRundown.value.runDownId,
      rundownName: this.leftSideRundown.value.runDownName,
      date: this.captureGridDate(),
      creationTime: this.captureTime(),
      createdBy: this.leftSideRundown.value.rundownCreatedBy,
      rundownRemarks: this.leftSideRundown.value.rundownRemarks,
      rundownStatus: this.leftSideRundown.value.rundownStatus,
      time: this.leftSideRundown.value.rundownTime,
      RundownDraft: this.showDraftVal
    };
    this.api.updateLeftSideData(updatedLeftSideBar).subscribe(
      (data) => {
        if (data == 'Record updated successfully') {
          this.toastr.success('data Updated successfully!');
        } else {
          this.toastr.warning('data has not been updated!');
        }
        document.getElementById('closeButtonModel')?.click();
        this.getLeftSideData();
        this.leftSideRundown.reset();
      },
      (err) => {
        this.toastr.warning('Internal server error!');
      }
    );
  }

  newRundown() {
    console.log(this.captureDate(), 'date');

    this.showUpdate = false;
    this.showCreate = true;
    this.updateShow = false;
    this.createShow = true;
    this.duplicateShow = false;
    this.duplicateheading = false;
    this.recurrenceShow = false
    this.leftSideRundown.reset();
    // this.leftSideRundown.controls['rundownDate'].setValue(this.captureDate());
    this.leftSideRundown.controls['rundownCreationTime'].setValue(
      this.captureTime()
    );
    this.leftSideRundown.controls['recurrence'].setValue('NO');
    this.leftSideRundown.controls['pkg'].setValue('select');
    (document.getElementById('selectedDate') as HTMLInputElement).valueAsDate = new Date();

  }

  postLeftSideDetails() {

    // console.log(postLeftSideBar,"post")
    if (this.leftSideRundown.value.recurrence == 'NO') {
      this.ngxService.start();
      const postLeftSideBar = {
        rundownName: this.leftSideRundown.value.runDownName,
        date: this.captureGridDate(),
        creationTime: this.captureTime(),
        createdBy: sessionStorage.getItem('userName'),
        rundownRemarks: this.leftSideRundown.value.rundownRemarks,
        rundownStatus: 'Rundown',
        time: this.captureTime(),
        recurrence: this.leftSideRundown.value.recurrence,
        package: this.leftSideRundown.value.pkg
      };
      this.api.postLeftSideData(postLeftSideBar).subscribe(
        (data) => {
          this.ngxService.stop()
          if (data == 'Record Inserted successfully') {
            this.toastr.success('data Inserted successfully!');
          } else {
            this.toastr.warning('data has not been updated!');
          }
          document.getElementById('closeButtonModel')?.click();
          this.getLeftSideData();
        },
        (err) => {
          this.ngxService.stop()
          this.toastr.warning('Internal server error!');
        }
      );
    }
    else if (this.leftSideRundown.value.recurrence == 'YES') {
      this.ngxService.start();
      const postLeftSideBar = [{
        rundownid: this.reuccrenceArr[0].rundownId,
        rundownName: this.leftSideRundown.value.runDownName,
        date: this.captureGridDate(),
        creationTime: this.captureTime(),
        createdBy: sessionStorage.getItem('userName'),
        rundownRemarks: this.leftSideRundown.value.rundownRemarks,
        rundownStatus: 'Rundown',
        time: this.captureTime(),
        recurrence: 'NO',
        recurenceEndDate: this.reuccrenceArr[0].recurenceEndDate,
        recurenceStartdate: this.reuccrenceArr[0].recurenceStartdate,
        recurenceType: true,
        package: this.leftSideRundown.value.pkg
      }];
      console.log(postLeftSideBar, "popp")
      this.api.insertRecurrence(postLeftSideBar).subscribe((res: any) => {
        this.ngxService.stop()
        console.log(res, "insertres")
        if (res == 'Record Inserted Successfully') {
          this.toastr.success('data Inserted successfully!');
        } else {
          this.toastr.warning('data has not been updated!');
        }
        document.getElementById('closeButtonModel')?.click();
        this.getLeftSideData();
      },
        (err) => {
          this.ngxService.stop()
          this.toastr.warning('Internal server error!');

        })
    }

  }
  updateRightSideData(item: any) {
    this.showInsertBtn = false;
    this.updateShow = true;
    this.createShow = false;
    this.showCreateBtn = false;
    this.showUpdateBtn = true;
    this.rightSideGridData.controls['id'].setValue(item.id);
    this.rightSideGridData.controls['rundownId'].setValue(item.rundownId);
    this.rightSideGridData.controls['status'].setValue(item.status);
    this.rightSideGridData.controls['slugName'].setValue(item.slugName);
    this.rightSideGridData.controls['slugType'].setValue(item.slugType);
    this.rightSideGridData.controls['reporter'].setValue(item.reporter);
    this.rightSideGridData.controls['assignTo'].setValue(item.assignTo);
    this.rightSideGridData.controls['acceptedBy'].setValue(item.acceptedBy);
    this.rightSideGridData.controls['roleid'].setValue(item.roleid);
    this.rightSideGridData.controls['createDate'].setValue(item.createDate);
    this.rightSideGridData.controls['gfx_attachment'].setValue(
      item.gfx_attachment
    );
    this.rightSideGridData.controls['video_attachment'].setValue(
      item.video_attachment
    );
    this.rightSideGridData.controls['remarks'].setValue(item.remarks);
  }
  updateRightSideDetails() {
    const updateRightSideDetails = {
      id: this.rightSideGridData.value.id,
      rundownId: this.rightSideGridData.value.rundownId,
      status: this.rightSideGridData.value.status,
      slugName: this.rightSideGridData.value.slugName,
      slugType: this.rightSideGridData.value.slugType,
      reporter: this.rightSideGridData.value.reporter,
      assignTo: this.rightSideGridData.value.assignTo,
      acceptedBy: this.rightSideGridData.value.acceptedBy,
      roleid: this.rightSideGridData.value.roleid,
      createDate: this.captureGridDate(),
      gfx_attachment: this.rightSideGridData.value.gfx_attachment,
      video_attachment: this.rightSideGridData.value.video_attachment,
      remarks: this.rightSideGridData.value.remarks,
    };
    this.api.updateGridSideData(updateRightSideDetails).subscribe(
      (data) => {
        // console.log(data);
        this.toastr.success('Record updated successfully!');
        document.getElementById('rightSideCLose')?.click();
        this.getRightSideData();
      },
      (err) => {
        this.toastr.warning('Internal server error!');
      }
    );
  }

  addBtn() {
    this.showInsertBtn = false;
    this.showCreateBtn = true;
    this.showUpdateBtn = false;
    // console.log(this.recurrenceCheck, "check");
    this.rightSideGridData.reset();
    this.rightSideGridData.controls['createDate'].setValue(
      this.captureGridDate()
    );
    this.rightSideGridData.controls['assignTo'].setValue('none');
    this.rightSideGridData.controls['slugType'].setValue('none');

    this.rightSideGridData.controls['rundownId'].setValue(
      this.getLeftSideBarId
    );
  }
  duplicateData(item: any) {
    this.showCreate = false;
    this.showUpdate = false;
    this.updateShow = false;
    this.createShow = false;
    this.duplicateShow = true;
    this.duplicateheading = true;
    this.leftSideRundown.controls['runDownId'].setValue(item.rundownId);
    this.leftSideRundown.controls['runDownName'].setValue(
      item.rundownName + '_copy'
    );
    this.leftSideRundown.controls['rundownDate'].setValue(item.date);
    this.leftSideRundown.controls['rundownCreationTime'].setValue(
      item.creationTime
    );
    this.leftSideRundown.controls['rundownCreatedBy'].setValue(item.createdBy);
    this.leftSideRundown.controls['rundownRemarks'].setValue(
      item.rundownRemarks
    );
    this.leftSideRundown.controls['rundownStatus'].setValue(item.rundownStatus);
    this.leftSideRundown.controls['rundownTime'].setValue(item.time);
  }

  duplicateInsert() {
    const duplicateLeftSideBar = {
      rundownId: this.leftSideRundown.value.runDownId,
      rundownName: this.leftSideRundown.value.runDownName,
      date: this.captureGridDate(),
      creationTime: this.captureTime(),
      createdBy: this.leftSideRundown.value.rundownCreatedBy,
      rundownRemarks: this.leftSideRundown.value.rundownRemarks,
      rundownStatus: this.leftSideRundown.value.rundownStatus,
      time: this.leftSideRundown.value.rundownTime,
      RundownDraft: this.showDraftVal,
      recurrence: 'NO',
      recurenceStartdate: " ",
      recurenceEndDate: " ",
      recurenceType: true
    };
    // console.log(this.leftSideRundown.value.runDownId, "id")
    this.api.duplicateLeftSideData(duplicateLeftSideBar).subscribe(
      (data: any) => {
        // console.log(data, "any");
        if (data == 'Duplicate Record Inserted successfully') {
          this.toastr.success('Duplicate data Inserted successfully!');
        } else {
          this.toastr.warning('Duplicate data has not been updated!');
        }
        document.getElementById('closeButtonModel')?.click();
        this.getLeftSideData();
      },
      (err) => {
        this.toastr.warning('Internal server error!');
      }
    );
  }
  insertValue(item: any) {
    this.showCreateBtn = false;
    this.showUpdateBtn = false;
    this.showInsertBtn = true;
    this.targetId = item.id;
    this.insertRundownId = item.rundownId;
    this.rightSideGridData.reset();
    this.rightSideGridData.controls['createDate'].setValue(
      this.captureGridDate()
    );
  }
  insertRightSideDetails() {
    this.showInsertBtn = true;
    this.showUpdateBtn = false;
    this.showCreateBtn = false;
    const id = this.assignTo.filter(
      (value: any) => value.assignto == this.rightSideGridData.value.assignTo
    );
    const insertRightGridData = {
      targetID: this.targetId,
      rundownId: this.insertRundownId,
      status: 'Pending',
      slugName: this.rightSideGridData.value.slugName,
      slugType: this.rightSideGridData.value.slugType,
      reporter: sessionStorage.getItem('userName'),
      assignTo: this.rightSideGridData.value.assignTo,
      acceptedBy: '',
      roleid: id[0].roleid,
      createDate: this.captureGridDate(),
      gfx_attachment: 'ghh',
      video_attachment: 'hjhjh',
      remarks: 'true',
      story_Editor: '',
      RundownDraft: this.showDraftVal
    };
    this.api.insertRightSideData(insertRightGridData).subscribe(
      (data: any) => {
        if (data == 'Row Inserted successfully') {
          this.toastr.success('Row Inserted successfully!');
        } else {
          this.toastr.warning('Row data has not been inserted!');
        }
        document.getElementById('rightSideCLose')?.click();
        this.getRightSideData();
      },
      (err) => {
        this.toastr.warning('Internal server error!');
      }
    );
  }
  video() {
    alert('Comming soon');
  }
  // graphics() {
  //   alert("Comming soon");
  // }
  graphicsDisplay() {
    this.ngxService.start()
    const channelId = {
      cid: parseInt(localStorage.getItem('channelId')!),
    };
    this.api.getalltemplates(channelId).subscribe((data) => {
      this.ngxService.stop()
      this.graphicData = data;
      this.graphicsCard = this.graphicData.SavedTemplateList;
      // console.log(this.graphicsCard)
    });
  }
  SpListTitle() {
    // const ppid = encodeURIComponent(112675);
    // const val = 'ppiid=' + ppid;
    // this.api.getsplistpropsall(val).subscribe((res: any) => {
    //   this.dataTitle = res.SPlist;
    //   console.log(this.dataTitle)
    //   for (let i = 0; i < this.dataTitle.length; i++) {
    //     this.SPlist.push(this.dataTitle[i].templatetitle);
    //   }
    //   console.log(this.SPlist, "hii");
    // })
  }
  clickGraphics(event: any, item: any) {
    const value = item;
    let cid = parseInt(localStorage.getItem('channelId')!);

    console.log(value, "hello value");
    this.graphicsValue.push(value);
    this.graphicsContent = false;
    console.log(this.graphicsValue, "graphicsValue")
    const data = {
      templateid: item.templateid,
      cid: cid,
    };
    this.templateid = item.templateid;
    let temp = encodeURIComponent(item.templateid);
    const zex = 'templateid=' + temp;

    this.api.getsavedtemplateproperties(cid, zex).subscribe((res: any) => {
      if (res) {
        this.counterGraphics = this.counterGraphics + 1;
        this.graphicsValue.at(-1).graphicsIndex = this.counterGraphics
      }
      this.tpList = res.TPList;
      this.tpName = res.templateTitle;
      const position = res.templatePosition;
      for (let i = 0; i < this.tpList.length; i++) {
        this.tpArray.push({
          graphicsIndex: this.counterGraphics,
          tpName: this.tpList[i].TPName,
          tpType: this.tpList[i].TPType,
          tpValue: this.tpList[i].TPValue,
          X: position.X,
          Y: position.Y,
          TemplateId: res.templateID,
          ClipID: this.clipId,
          TemplateName: res.templateTitle,
          SPlOffset: '0',
          SPlDuration: '0',
          Properties:
            this.tpList[i].TPName +
            '|' +
            this.tpList[i].TPType +
            '|' +
            this.tpList[i].TPValue +
            ',' +
            'X' +
            '|' +
            'double' +
            '|' +
            position.X +
            ',' +
            'Y' +
            '|' +
            'double' +
            '|' +
            position.Y +
            ',' +
            'W' +
            '|' +
            'double' +
            '|' +
            '1920' +
            ',' +
            'H' +
            '|' +
            'double' +
            '|' +
            '1080',
        });

        this.tpData = [];
        console.log(this.tpArray, 'caaaaa');
      }
      // console.log(this.tpArray.length, 'tp array length');
      for (let i = 0; i < this.tpArray.length; i++) {
        this.tpData.push({
          GraphicsIndex: this.tpArray[i].graphicsIndex,
          ClipID: this.tpArray[i].ClipID,
          TemplateID: this.tpArray[i].TemplateId,
          TemplateName: this.tpArray[i].TemplateName,
          SPlOffset: this.tpArray[i].SPlOffset,
          SPlDuration: this.tpArray[i].SPlDuration,
          Properties: this.tpArray[i].Properties,
        });
      }
      // console.log(this.tpData, 'tpData');
    });
  }

  getAssets() {
    let cid = parseInt(localStorage.getItem('channelId')!);
    let status = 'A';
    let pgno = 0;
    let pgsize = 0;
    let category = 'S';
    let data =
      'cid=' +
      cid +
      '&status=' +
      status +
      '&pgno=' +
      pgno +
      '&pgsize=' +
      pgsize +
      '&category=' +
      category;
    this.api.getassets(data, atob(sessionStorage.getItem('authToken')!)).subscribe((res: any) => {
      const response = res.assets;
      if (response != undefined) {
        for (let i = 0; i < response.length; i++) {
          this.assetsName.push(response[i].name);
        }
      }
    });

  }

  getVideoAssets() {
    this.ngxService.start()
    let cid = parseInt(localStorage.getItem('channelId')!);
    let status = 'A';
    let pgno = 0;
    let pgsize = 0;
    let category = 'P';
    let data =
      'cid=' +
      cid +
      '&status=' +
      status +
      '&pgno=' +
      pgno +
      '&pgsize=' +
      pgsize +
      '&category=' +
      category;

    this.api
      .getassets(data, atob(sessionStorage.getItem('authToken')!))
      .subscribe((res: any) => {
        // if (res.summary.description != 'You are unauthorized to do this action') {
        const response = res.assets;
        // console.log(res, "hello")
        this.videoAssets = response;
        // console.log(res, 'video attachment');
        // console.log(this.videoAssets, 'videoAsset');

        this.ngxService.stop()
      });
  }
  addGfx() {

    this.graphicsDisplay();
    // this.tpArray=[]
    // console.log(this.tpArray)
    // this.graphicsDisplay();
  }

  monday(item: any) {
    // console.log(item);
  }

  getGraphics() {
    this.ngxService.start()
    this.tpArray = [];
    this.tpData = [];
    this.graphicsValue = [];
    this.showVideoGfx = false;
    this.showVideoBtn = false;
    this.showGraphicsButton = true;
    this.addGfxShow = true;
    this.editorBack = true;
    this.editorBackBtn = false;
    if (this.permissionRole >= this.assignRoleId) {
      this.showGfx = true;
      this.showVideoBtn = false;
      this.showGraphicsButton = true;

    }
    this.api.getInsertGraphics(this.clipId).subscribe((res: any) => {
      // console.log(res, "data get successsfully")

      if (res == 'Data is not found') {
        this.showGfx = true;
        this.showGraphicsButton = true;
        this.showVideoGfx = false;
        this.showVideoBtn = false;

        this.ngxService.stop()
      } else {
        this.graphicsContent = false;
        const updatedRes = ([] = res);
        console.log(updatedRes.graphicsIndex, "graphicsIndex")
        console.log(updatedRes, "updatedRes")

        const newArr: {
          graphicsIndex: any;
          graphicsName: any;
          graphicsTemplateId: any;
          x: any;
          y: any;
          w: any;
          h: any;
        }[] = [];

        for (let i = 0; i < updatedRes.length; i++) {
          const propertiesStr = updatedRes[i].properties;
          const propertiesArr = propertiesStr.split(',');
          const propertiesArrValue = propertiesArr[0].split('|');
          const propertiesArrValueX = propertiesArr[1].split('|');
          const propertiesArrValueY = propertiesArr[2].split('|');
          const propertiesArrValueW = propertiesArr[3].split('|');
          const propertiesArrValueH = propertiesArr[4].split('|');
          newArr.push({
            graphicsIndex: updatedRes[i].graphicsIndex,
            graphicsName: updatedRes[i].templateName,
            graphicsTemplateId: updatedRes[i].templateID,
            x: propertiesArrValueX[2],
            y: propertiesArrValueY[2],
            w: propertiesArrValueW[2],
            h: propertiesArrValueH[2],
          });
        }

        const result = newArr.filter(
          (thing, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.graphicsIndex === thing.graphicsIndex &&
                t.graphicsName === thing.graphicsName
            )
        );
        for (let i = 0; i < result.length; i++) {
          this.graphicsValue.push({
            title: result[i].graphicsName,
            templateid: result[i].graphicsTemplateId,
            x: result[i].x,
            y: result[i].y,
            w: result[i].w,
            h: result[i].h,
            graphicsIndex: result[i].graphicsIndex
          });
        }
        console.log(this.graphicsValue, "indexgraph")
        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].graphicsIndex <= this.counterGraphics) {
            continue;
          } else if (newArr[i].graphicsIndex >= this.counterGraphics) {
            this.counterGraphics = newArr[i].graphicsIndex;
          }
        }
        // console.log(this.counterGraphics, "counterGraphics")
        for (let i = 0; i < updatedRes.length; i++) {
          const propertiesStr = updatedRes[i].properties;
          const propertiesArr = propertiesStr.split(',');
          const propertiesArrValue = propertiesArr[0].split('|');
          const propertiesArrValueX = propertiesArr[1].split('|');
          const propertiesArrValueY = propertiesArr[2].split('|');
          let totalSploffset = updatedRes[i].sPlOffset;
          let totalsplduration = updatedRes[i].sPlOffset;

          let splOffsethours = Math.floor(totalSploffset / 3600);
          totalSploffset %= 3600;
          let splOffsetminutes = Math.floor(totalSploffset / 60);
          let splOffsetseconds = totalSploffset % 60;

          let splDurationhours = Math.floor(totalSploffset / 3600);
          totalSploffset %= 3600;
          let splDurationminutes = Math.floor(totalSploffset / 60);
          let splDurationseconds = totalSploffset % 60;

          const spLOffsetH = String(splOffsethours).padStart(2, '0');
          const splOffsetM = String(splOffsetminutes).padStart(2, '0');
          const splOffsetS = String(splOffsetseconds).padStart(2, '0');

          const splDurationH = String(splDurationhours).padStart(2, '0');
          const splDurationM = String(splDurationminutes).padStart(2, '0');
          const splDurationS = String(splDurationseconds).padStart(2, '0');

          const splOffset = 0;
          const SPlDuration = 0;
          this.tpArray.push({
            graphicsIndex: updatedRes[i].graphicsIndex,
            tpName: propertiesArrValue[0],
            tpType: propertiesArrValue[1],
            tpValue: propertiesArrValue[2],
            X: propertiesArrValueX[2],
            Y: propertiesArrValueY[2],
            TemplateId: updatedRes[i].templateID,
            ClipID: updatedRes[i].clipID,
            TemplateName: updatedRes[i].templateName,
            SPlOffset: splOffset,
            SPlDuration: SPlDuration,
            Properties: updatedRes[i].properties,
          });
        }
        for (let i = 0; i < this.tpArray.length; i++) {
          this.tpData.push({
            GraphicsIndex: this.tpArray[i].graphicsIndex,

            ClipID: this.tpArray[i].ClipID,

            TemplateID: this.tpArray[i].TemplateId,

            TemplateName: this.tpArray[i].TemplateName,

            SPlOffset: this.tpArray[i].SPlOffset,

            SPlDuration: this.tpArray[i].SPlDuration,

            Properties: this.tpArray[i].Properties,
          });
        }
        this.graphicsAmt = this.tpArray;
        this.graphicsDataTitle = this.graphicsValue;
        console.log(this.graphicsAmt, "graphics")
        this.ngxService.stop()
      }
    });

  }

  setGraphics() {
    // console.log(this.tpData);
    // console.log("lenf")
    this.ngxService.start()
    this.api.putInsertGraphics(this.tpData).subscribe((res: any) => {
      // this.tpArray = [];
      // this.tpData = [];
      // this.graphicsValue=[];
      this.ngxService.stop()
      if (res == 'Record Inserted Successfully') {
        this.toastr.success('Graphics added  successfully!');
        this.getGraphics();
      } else {
        this.toastr.warning('Graphics not be inserted!');
      }
    });

    // this.getGraphics();
  }

  getDataText(event: any, item: any, itemIndex: any) {
    const propertiesStr = this.tpData[itemIndex].Properties;
    const propertiesArr = propertiesStr.split(',');
    const propertiesArrValueX = propertiesArr[1].split('|');

    const propertiesArrValueY = propertiesArr[2].split('|');
    const propertiesArrValueW = propertiesArr[3].split('|');
    const propertiesArrValueH = propertiesArr[4].split('|');
    if (item.tpName != 'Font Color') {
      this.tpData[itemIndex].Properties =
        this.tpArray[itemIndex].tpName +
        '|' +
        this.tpArray[itemIndex].tpType +
        '|' +
        event.target.value +
        ',' +
        'X' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueX[2] +
        ',' +
        'Y' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueY[2] +
        ',' +
        'W' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueW[2] +
        ',' +
        'H' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueH[2];
    }
    // console.log(this.tpData, 'new array tp data');
  }
  graphicsColor(item: any, event: any, index: any) {
    const data = {
      color: item.target.value,
      index: index,
    };
    const colorObj = this.colorData.filter((x: any) => x.index == index);
    if (colorObj.length == 0) {
      this.colorData.push(data);
    } else {
      const colorIndexData = this.colorData.findIndex(
        (p: any) => p.index == index
      );
      this.colorData[colorIndexData].color = item.target.value;
    }
    const arr = this.colorData.filter((i: any) => i.index === index);
    this.getDataColor(arr[0].color, event, index);
  }
  getDataColor(event: any, item: any, itemIndex: any) {
    const propertiesStr = this.tpData[itemIndex].Properties;
    const propertiesArr = propertiesStr.split(',');
    const propertiesArrValueX = propertiesArr[1].split('|');
    const propertiesArrValueY = propertiesArr[2].split('|');
    const propertiesArrValueW = propertiesArr[3].split('|');
    const propertiesArrValueH = propertiesArr[4].split('|');
    if (item.tpName == 'Font Color') {
      this.tpData[itemIndex].Properties =
        this.tpArray[itemIndex].tpName +
        '|' +
        this.tpArray[itemIndex].tpType +
        '|' +
        event +
        ',' +
        'X' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueX[2] +
        ',' +
        'Y' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueY[2] +
        ',' +
        'W' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueW[2] +
        ',' +
        'H' +
        '|' +
        'double' +
        '|' +
        propertiesArrValueH[2];

      this.tpArray[itemIndex].tpValue = event;
    }
  }
  getDataInt(event: any, item: any, itemIndex: any) {
    const propertiesStr = this.tpData[itemIndex].Properties;
    const propertiesArr = propertiesStr.split(',');
    const propertiesArrValueX = propertiesArr[1].split('|');
    const propertiesArrValueY = propertiesArr[2].split('|');
    const propertiesArrValueW = propertiesArr[3].split('|');
    const propertiesArrValueH = propertiesArr[4].split('|');
    this.tpData[itemIndex].Properties =
      this.tpArray[itemIndex].tpName +
      '|' +
      this.tpArray[itemIndex].tpType +
      '|' +
      event.target.value +
      ',' +
      'X' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueX[2] +
      ',' +
      'Y' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueY[2] +
      ',' +
      'W' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueW[2] +
      ',' +
      'H' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueH[2];
    // console.log(this.tpData, 'new array tp data');
  }
  getDataOption(event: any, item: any, itemIndex: any) {
    const propertiesStr = this.tpData[itemIndex].Properties;
    const propertiesArr = propertiesStr.split(',');
    const propertiesArrValueX = propertiesArr[1].split('|');
    const propertiesArrValueY = propertiesArr[2].split('|');
    const propertiesArrValueW = propertiesArr[3].split('|');
    const propertiesArrValueH = propertiesArr[4].split('|');
    this.tpData[itemIndex].Properties =
      this.tpArray[itemIndex].tpName +
      '|' +
      this.tpArray[itemIndex].tpType +
      '|' +
      event.target.value +
      ',' +
      'X' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueX[2] +
      ',' +
      'Y' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueY[2] +
      ',' +
      'W' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueW[2] +
      ',' +
      'H' +
      '|' +
      'double' +
      '|' +
      propertiesArrValueH[2];
    // console.log(this.tpData, 'new array tp data');
  }
  getOffset(event: any, graphicsTitle: any) {
    if (event.data) {
      if (event.target.value.length <= 7) {
        const two_chars_no_colons_regex = /([^:]{2}(?!:))/g;
        event.target.value = event.target.value.replace(
          two_chars_no_colons_regex,
          "$1:"
        );

        for (let i = 0; i < this.tpData.length; i++) {
          if (this.tpData[i].TemplateName == graphicsTitle.title) {
            this.tpData[i].SPlOffset = event.target.value;
          }
        }
      }

    }
  }
  flexibleTime(event: any) {
    if (event.data) {
      if (event.target.value.length <= 7) {
        const two_chars_no_colons_regex = /([^:]{2}(?!:))/g;
        event.target.value = event.target.value.replace(
          two_chars_no_colons_regex,
          "$1:"
        );
      }
    }
  }
  getSPlDuration(event: any, graphicsTitle: any) {

    if (event.data) {
      if (event.target.value.length <= 7) {
        const two_chars_no_colons_regex = /([^:]{2}(?!:))/g;
        event.target.value = event.target.value.replace(
          two_chars_no_colons_regex,
          "$1:"
        );
        for (let i = 0; i < this.tpData.length; i++) {
          if (this.tpData[i].TemplateName == graphicsTitle.title) {
            this.tpData[i].SPlDuration = event.target.value;
          }
        }
      }
    }
  }

  getXvalue(event: any, graphicsTitle: any) {
    for (let i = 0; i < this.tpData.length; i++) {
      const propertiesStr = this.tpData[i].Properties;
      const propertiesArr = propertiesStr.split(',');
      const propertiesArrValue = propertiesArr[0].split('|');
      const propertiesArrValueY = propertiesArr[2].split('|');
      const propertiesArrValueW = propertiesArr[3].split('|');
      const propertiesArrValueH = propertiesArr[4].split('|');
      if (this.tpData[i].TemplateName == graphicsTitle.title) {
        this.tpData[i].Properties =
          this.tpArray[i].tpName +
          '|' +
          this.tpArray[i].tpType +
          '|' +
          propertiesArrValue[2] +
          ',' +
          'X' +
          '|' +
          'double' +
          '|' +
          event.target.value +
          ',' +
          'Y' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueY[2] +
          ',' +
          'W' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueW[2] +
          ',' +
          'H' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueH[2];
      }
    }
  }
  getYvalue(event: any, graphicsTitle: any) {
    for (let i = 0; i < this.tpData.length; i++) {
      const propertiesStr = this.tpData[i].Properties;
      const propertiesArr = propertiesStr.split(',');
      const propertiesArrValue = propertiesArr[0].split('|');
      const propertiesArrValueX = propertiesArr[1].split('|');
      const propertiesArrValueW = propertiesArr[3].split('|');
      const propertiesArrValueH = propertiesArr[4].split('|');
      if (this.tpData[i].TemplateName == graphicsTitle.title) {
        this.tpData[i].Properties =
          this.tpArray[i].tpName +
          '|' +
          this.tpArray[i].tpType +
          '|' +
          propertiesArrValue[2] +
          ',' +
          'X' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueX[2] +
          ',' +
          'Y' +
          '|' +
          'double' +
          '|' +
          event.target.value +
          ',' +
          'W' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueW[2] +
          ',' +
          'H' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueH[2];
      }
    }
    // console.log(this.tpData, 'new array tp data');
  }
  getWvalue(event: any, graphicsTitle: any) {
    for (let i = 0; i < this.tpData.length; i++) {
      const propertiesStr = this.tpData[i].Properties;
      const propertiesArr = propertiesStr.split(',');
      const propertiesArrValue = propertiesArr[0].split('|');
      const propertiesArrValueX = propertiesArr[1].split('|');
      const propertiesArrValueY = propertiesArr[2].split('|');
      const propertiesArrValueH = propertiesArr[4].split('|');
      if (this.tpData[i].TemplateName == graphicsTitle.title) {
        this.tpData[i].Properties =
          this.tpArray[i].tpName +
          '|' +
          this.tpArray[i].tpType +
          '|' +
          propertiesArrValue[2] +
          ',' +
          'X' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueX[2] +
          ',' +
          'Y' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueY[2] +
          ',' +
          'W' +
          '|' +
          'double' +
          '|' +
          event.target.value +
          ',' +
          'H' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueH[2];
      }
    }
    // console.log(this.tpData, 'new array tp data');
  }
  getHvalue(event: any, graphicsTitle: any) {
    for (let i = 0; i < this.tpData.length; i++) {
      const propertiesStr = this.tpData[i].Properties;
      const propertiesArr = propertiesStr.split(',');
      const propertiesArrValue = propertiesArr[0].split('|');
      const propertiesArrValueX = propertiesArr[1].split('|');
      const propertiesArrValueY = propertiesArr[2].split('|');
      const propertiesArrValueW = propertiesArr[3].split('|');
      if (this.tpData[i].TemplateName == graphicsTitle.title) {
        this.tpData[i].Properties =
          this.tpArray[i].tpName +
          '|' +
          this.tpArray[i].tpType +
          '|' +
          propertiesArrValue[2] +
          ',' +
          'X' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueX[2] +
          ',' +
          'Y' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueY[2] +
          ',' +
          'W' +
          '|' +
          'double' +
          '|' +
          propertiesArrValueW[2] +
          ',' +
          'H' +
          '|' +
          'double' +
          '|' +
          event.target.value;
      }
    }
    // console.log(this.tpData, 'new array tp data');
  }

  days(item: any) {
    if (
      this.weekName.length == 0 ||
      this.weekDays.indexOf(this.weekName[item].value) == -1
    ) {
      this.weekDays.push(this.weekName[item].value);
    }
    // console.log(item, 'item');
    // console.log(this.weekDays, 'item');
  }
  week(event: any) {
    if (event.target.value == 'week') {
      this.weekShow = true;
    } else this.weekShow = false;
  }
  recurrenceLeftSideData(item: any) {
    this.leftSideRecurrence.controls['runDownId'].setValue(item.rundownId);
    this.leftSideRecurrence.controls['runDownName'].setValue(
      item.rundownName
    );
    this.leftSideRecurrence.controls['rundownDate'].setValue(item.date);
    this.leftSideRecurrence.controls['rundownCreationTime'].setValue(
      item.creationTime
    );
    this.leftSideRecurrence.controls['rundownCreatedBy'].setValue(
      item.createdBy
    );
    this.leftSideRecurrence.controls['rundownRemarks'].setValue(
      item.rundownRemarks
    );
    this.leftSideRecurrence.controls['rundownStatus'].setValue(
      item.rundownStatus
    );
    this.leftSideRecurrence.controls['rundownTime'].setValue(item.time);
    this.leftSideRecurrence.controls['recurrenceStart'].setValue(item.recurenceStartdate);
    this.leftSideRecurrence.controls['recurrenceEnd'].setValue(item.recurenceEndDate);

  }

  saveRecurrence() {
    // console.log(this.leftSideRecurrence.value.recurrence, 'value');
    if (
      this.leftSideRecurrence.value.recurrence == 'YES' ||
      this.leftSideRecurrence.value.recurenceType == 'true'
    ) {
      const recurrenceData = {
        rundownId: this.leftSideRecurrence.value.runDownId,
        rundownName: this.leftSideRecurrence.value.runDownName,
        date: this.captureGridDate(),
        creationTime: this.captureTime(),
        createdBy: sessionStorage.getItem('userName'),
        rundownRemarks: this.leftSideRecurrence.value.rundownRemarks,
        rundownStatus: 'Recurrence',
        time: this.captureTime(),
        recurenceStartdate: this.leftSideRecurrence.value.recurrenceStart,
        recurenceEndDate: this.leftSideRecurrence.value.recurrenceEnd,
        recurenceType: this.leftSideRecurrence.value.recurenceType,
        recurrence: this.leftSideRecurrence.value.recurrence,
      };

      this.api.updateLeftSideData(recurrenceData).subscribe(
        (data) => {
          if (data == 'Record updated successfully') {
            this.toastr.success('data Updated successfully!');
          } else {
            this.toastr.warning('data has not been updated!');
          }
          document.getElementById('closeRecurrence')?.click();
          this.getLeftSideData();
          this.leftSideRundown.reset();
        },
        (err) => {
          this.toastr.warning('Internal server error!');
        }
      );
    }
  }

  closeSelectedGraphics() {
    this.tpData = [];
    // console.log(this.tpData);
    this.tpArray = [];
    // console.log(this.tpArray);
    this.graphicsValue = [];
    this.videoArray = [];
    this.videoApiData = []
    this.graphicsContent = true;
  }

  selectedRecurrence(item: any) {
    this.recurrenceValue = item.target.value;
    // console.log(this.recurrenceValue, "recurrence")
  }



  getRecurrenced(item: any) {
    let data = item.target.value;
    if (data == 'YES') {
      (document.getElementById('inputRundown') as HTMLInputElement).value = '';
      (document.getElementById('inputRundown') as HTMLInputElement).disabled = true;
      this.api.getRecurrence().subscribe((res: any) => {
        this.recurrenceData = res
        // console.log(this.recurrenceData, "rec");
        this.recurrenceShow = true;
      });
    }
    else if (data == 'NO') {
      this.recurrStartDate = 0;
      this.recurrEndDate = 0;
      (document.getElementById('inputRundown') as HTMLInputElement).value = '';
      (document.getElementById('rundownRemarks') as HTMLInputElement).value = '';
      (document.getElementById('selectedDate') as HTMLInputElement).valueAsDate = new Date();
      (document.getElementById('inputRundown') as HTMLInputElement).disabled = false;
      this.recurrenceShow = false;
      this.recurrenceData = [];
    }
    else if (document.getElementById('closeButtonModel')) {
      this.recurrStartDate = 0;
      this.recurrEndDate = 0;
      (document.getElementById('inputRundown') as HTMLInputElement).value = '';
      (document.getElementById('rundownRemarks') as HTMLInputElement).value = '';
      (document.getElementById('selectedDate') as HTMLInputElement).valueAsDate = new Date();
      (document.getElementById('inputRundown') as HTMLInputElement).disabled = false;
      this.recurrenceShow = false;
      this.recurrenceData = [];
    }
  }
  closeNewrun() {
    this.recurrStartDate = 0;
    this.recurrEndDate = 0;
    (document.getElementById('inputRundown') as HTMLInputElement).value = '';
    (document.getElementById('rundownRemarks') as HTMLInputElement).value = '';
    (document.getElementById('selectedDate') as HTMLInputElement).valueAsDate = new Date();
    (document.getElementById('inputRundown') as HTMLInputElement).disabled = false;
    this.recurrenceShow = false;
    this.recurrenceData = [];
  }
  clickVideo(event: any, videoAsset: any, index: any) {
    const newArr = this.videoArray.filter(
      (value: any) => value.aid == videoAsset.aid
    );

    const newIndex = this.selectedVideoIndex.filter(
      (value: any) => value.index == videoAsset.aid
    );
    if (newIndex.length == 0) {
      this.selectedVideoIndex.push({
        index: videoAsset.aid
      })
    }
    else {
      // console.log(newIndex, "in")
      this.selectedVideoIndex.splice(this.selectedVideoIndex.findIndex((item: any) => item.index === newIndex[0].index), 1)
    }
    if (newArr.length == 0) {
      this.videoArray.push(videoAsset);
    }
    else {
      this.videoArray.splice(this.videoArray.findIndex((item: any) => item.aid === newArr[0].aid), 1)
    }
    // console.log(this.videoArray, "videoArray")
    console.log(this.selectedVideoIndex, "selectedIndex")

    // this.getClass(videoAsset, index)
    if (this.videoApiData.length == 0) {
      for (let i = 0; i < this.videoArray.length; i++) {
        this.videoApiData.push({
          CID: this.clipId,
          TemplateID: this.videoArray[i].aid,
          AType: this.videoArray[i].type,
          AWidth: '0',
          APath: this.videoArray[i].path,
          AHeight: '0',
          ADuration: this.videoArray[i].asset_duration,
          AFps: this.videoArray[i].fps,
          AFilesize: this.videoArray[i].filesize,
          ABitrate: this.videoArray[i].bitrate,
          ATimecodeIn: this.videoArray[i].timecodein,
          ACode: this.videoArray[i].misc.code,
          AName: this.videoArray[i].name,
          ACreated: this.videoArray[i].createdon,
          AUploaded: this.videoArray[i].uploadedon,
          AS3Path: this.videoArray[i].s3path,
          AStatus: 'true',
          APreviewPath: '0',
          AMediaInfo: this.videoArray[i].mediainfo,
          ACategory: this.videoArray[i].misc.category,
          ADisplayName: this.videoArray[i].displayname,
          messageid: '0',
          AMode: this.videoArray[i].mode,
          priority: this.videoArray[i].priority,
          video_id: this.videoArray[i].videoId,
          priorityUpdatedTime: this.videoArray[i].priorityUpdatedTime,
          ASubCategory: this.videoArray[i].misc.subCategory,
          remarks: this.videoArray[i].misc.remarks,
          AFPath: this.videoArray[i].misc.aFpath,
        })
      }

    }
    else {
      this.videoApiData = []
      for (let i = 0; i < this.videoArray.length; i++) {
        this.videoApiData.push({
          CID: this.clipId,
          TemplateID: this.videoArray[i].aid,
          AType: this.videoArray[i].type,
          AWidth: '0',
          APath: this.videoArray[i].path,
          AHeight: '0',
          ADuration: this.videoArray[i].asset_duration,// som
          AFps: this.videoArray[i].fps,
          AFilesize: this.videoArray[i].filesize,
          ABitrate: this.videoArray[i].bitrate,
          ATimecodeIn: this.videoArray[i].timecodein, //tc in
          ACode: this.videoArray[i].misc.code,
          AName: this.videoArray[i].name,
          ACreated: this.videoArray[i].createdon,
          AUploaded: this.videoArray[i].uploadedon,
          AS3Path: this.videoArray[i].s3path,
          AStatus: 'true',
          APreviewPath: '0',
          AMediaInfo: this.videoArray[i].mediainfo,
          ACategory: this.videoArray[i].misc.category,
          ADisplayName: this.videoArray[i].displayname,
          messageid: '0',
          AMode: this.videoArray[i].mode,
          priority: this.videoArray[i].priority,
          video_id: this.videoArray[i].videoId,
          priorityUpdatedTime: this.videoArray[i].priorityUpdatedTime,
          ASubCategory: this.videoArray[i].misc.subCategory,
          remarks: this.videoArray[i].misc.remarks,
          AFPath: this.videoArray[i].misc.aFpath,
        })
      }
    }
    if (this.videoArray.length != 0) {
      console.log('hhjd')
      this.videoContent = false
    }
    else {
      console.log('helloo')
      this.videoContent = false;
    }
    // console.log(this.videoApiData, "videoApiData")
  }



  getClass(item: any, index: any) {
    const newValue = this.selectedVideoIndex.filter((value: any) => value.index === item.aid)
    if (newValue.length == 0 || newValue.length == undefined) {
      return false
    }
    return true
  }
  selectedClean() {
    // this.selectedVideoIndex = [];
  }


  putVideoAssets() {
    this.ngxService.start()
    this.api.insertVideoAssets(this.videoApiData).subscribe((res: any) => {
      this.ngxService.stop()
      if (res == "Data Inserted successfully") {
        this.toastr.success(res);
        this.videoAttach();
      }
      else {
        this.toastr.warning(res);
      }
    })
  }

  selectRecurrence(item: any) {
    console.log(item.target.value)
    this.reuccrenceArr = this.recurrenceData.filter((val: any) => val.rundownId == item.target.value)
    console.log(this.reuccrenceArr, 'asds')
    this.leftSideRundown.controls['runDownName'].setValue(
      this.reuccrenceArr[0].rundownName);
    this.leftSideRundown.controls['rundownRemarks'].setValue(
      this.reuccrenceArr[0].rundownRemarks
    );
    this.leftSideRundown.controls['rundownCreationTime'].setValue(
      this.reuccrenceArr[0].creationTime
    );

    this.recurrStartDate = this.reuccrenceArr[0].recurenceStartdate;
    this.recurrEndDate = this.reuccrenceArr[0].recurenceEndDate;

    this.leftSideRundown.controls['rundownDate'].setValue(this.reuccrenceArr[0].recurenceStartdate);
  }
  // startTimeVideo(event: any, videoArray: any, i: any) {
  //   if (event.data) {
  //     if (event.target.value.length <= 10) {
  //       const two_chars_no_colons_regex = /([^:]{2}(?!:))/g;
  //       event.target.value = event.target.value.replace(
  //         two_chars_no_colons_regex,
  //         "$1:"
  //       );
  //     }
  //     this.videoApiData[i].AWidth = event.target.value
  //   }
  //   console.log(this.videoApiData, "new video api");
  // }


  videoAttach() {
    this.ngxService.start()
    this.videoArray = [];
    this.videoApiData = [];
    this.selectedVideoIndex = [];
    this.videoAttachGraphics = [];
    this.api.getVideoAssets(this.clipId).subscribe((res: any) => {
      // console.log(res, "videoArray")
      this.videoAidData = res;
      if (res != 'asset library data not found') {
        for (let i = 0; i < res.length; i++) {



          this.videoArray.push({
            aid: res[i].templateID,
            asset_duration: res[i].aDuration,
            bitrate: res[i].aBitrate,
            createdon: res[i].aCreated,
            displayname: res[i].aDisplayName,
            filesize: res[i].aFilesize,
            fps: res[i].aFps,
            mediainfo: res[i].aMediaInfo,
            misc: {
              aFpath: res[i].afPath,
              category: res[i].aCategory,
              code: res[i].aCode,
              episode: '',
              remarks: res[i].remarks,
              season: '',
              subCategory: res[i].aSubCategory,
              sub_category: '',
              tags: ''
            },
            mode: res[i].aMode,
            name: res[i].aName,
            path: res[i].aPath,
            previewurl: res[i].aPreviewPath,
            priority: res[i].priority,
            priorityUpdatedTime: res[i].priorityUpdatedTime,
            qc: '',
            qc_count: '',
            s3path: res[i].aS3Path,
            timecodein: res[i].aTimecodeIn,
            type: res[i].aType,
            uploadedon: res[i].aUploaded,
            videoId: res[i].video_id
          })
        }
        console.log(this.videoArray, "videoArray")


        for (let i = 0; i < this.videoArray.length; i++) {
          this.videoApiData.push({
            CID: this.clipId,
            TemplateID: this.videoArray[i].aid,
            AType: this.videoArray[i].type,
            AWidth: '0',
            APath: this.videoArray[i].path,
            AHeight: '0',
            ADuration: this.videoArray[i].asset_duration,// som
            AFps: this.videoArray[i].fps,
            AFilesize: this.videoArray[i].filesize,
            ABitrate: this.videoArray[i].bitrate,
            ATimecodeIn: this.videoArray[i].timecodein, //tc in
            ACode: this.videoArray[i].misc.code,
            AName: this.videoArray[i].name,
            ACreated: this.videoArray[i].createdon,
            AUploaded: this.videoArray[i].uploadedon,
            AS3Path: this.videoArray[i].s3path,
            AStatus: 'true',
            APreviewPath: '0',
            AMediaInfo: this.videoArray[i].mediainfo,
            ACategory: this.videoArray[i].misc.category,
            ADisplayName: this.videoArray[i].displayname,
            messageid: '0',
            AMode: this.videoArray[i].mode,
            priority: this.videoArray[i].priority,
            video_id: this.videoArray[i].videoId,
            priorityUpdatedTime: this.videoArray[i].priorityUpdatedTime,
            ASubCategory: this.videoArray[i].misc.subCategory,
            remarks: this.videoArray[i].misc.remarks,
            AFPath: this.videoArray[i].misc.aFpath,
          })
        }
        for (let i = 0; i < res.length; i++) {
          this.selectedVideoIndex.push({
            index: res[i].templateID
          })
        }

      }
      if (this.videoArray.length != 0) {
        this.videoContent = false
      }
      else {
        this.videoContent = true;
      }

      for (let i = 0; i < this.videoAidData.length; i++) {
        this.videoAttachGraphics.push(this.videoAidData[i].aid);
      }
      this.videoGraphicsMapping();
      console.log(this.videoAttachGraphics, "videoAttachGraphics")
      this.ngxService.stop()

    })


  }
  removeFromVideoArray(item: any, i: any) {
    const newArr = this.videoArray.filter(
      (value: any) => value.aid == item.aid
    );
    this.videoArray.splice(this.videoArray.findIndex((item: any) => item.aid === newArr[0].aid), 1);
    this.videoApiData.splice(this.videoApiData.findIndex((item: any) => item.aid === newArr[0].aid), 1);

    console.log(this.videoArray.length)
    if (this.videoArray.length != 0) {
      console.log("hbhjh")
      this.videoContent = false
    }
    else {
      console.log("hello")
      this.videoContent = true;
    }
  }
  leftsideDraft() {
    // this.ngxService.start();
    // this.draftVal = this.leftsideDrop.value.rundownDraft;
    console.log(this.draftVal, "val")
    const postLeftSideDraft = {
      rundownName: this.leftsideDrop.value.runDownName,
      date: this.captureGridDate(),
      time: this.captureTime(),
      rundownStatus: 'Rundown Draft',
      rundownRemarks: this.leftSideRundown.value.rundownRemarks,
      createdBy: sessionStorage.getItem('userName'),
      creationTime: this.captureTime(),
      recurrence: 'NO',
      recurenceStartdate: this.captureGridDate(),
      recurenceEndDate: this.captureGridDate(),
      recurenceType: true,
      RundownDraft: this.leftsideDrop.value.rundownDraft
    };
    this.api.postLeftSideData(postLeftSideDraft).subscribe((res: any) => {
      this.ngxService.stop()
      console.log(res, "insertres")
      if (res == 'Record Inserted successfully') {
        this.toastr.success('data Inserted successfully!');
      } else {
        this.toastr.warning('data has not been updated!');
      }
      document.getElementById('closeDraftModel')?.click();
      this.getLeftSideData();
    },
      (err) => {
        this.ngxService.stop()
        this.toastr.warning('Internal server error!');

      })
  }

  runDraft() {
    this.leftsideDrop.controls['rundownCreationTime'].setValue(
      this.captureTime()
    );
    this.leftsideDrop.controls['pkg'].setValue('select');

    (document.getElementById('draftDate') as HTMLInputElement).valueAsDate = new Date();

  }

  editor(val: any) {
    this.dataAccepted = val;
    console.warn(val);
    console.log(val, "as")
  }
  telePrompter() {
    this.route.navigate(['/teleprompter'])
  }



  getPcr() {
    this.api.getPcr().subscribe((res: any) => {
      console.log(res, "getPcr")
      for (let i = 0; i < res.data.length; i++) {
        this.pcrData.push({
          groupName: res.data[i].groupName,
          isSecondary: res.data[i].isSecondary,
          caption: res.data[i].caption
        })
      }
      console.log(this.pcrData, "pcrdata")
      this.displayPcrName()
    },
      (err) => {
        this.toastr.warning('Internal server error!');

      })
  }
  displayPcrName() {
    this.pcrName = this.pcrData.map((item: any) => item.groupName)
      .filter((value: any, index: any, self: any) => self.indexOf(value) === index)
    console.log(this.pcrName, "pcrName")
  }

  addVideoArray(item: any, i: any) {
    this.showVideoGfx = true;
    this.showGraphicsButton = false;
    this.showVideoBtn = true;
    this.addGfxShow = true;
    this.videoAid = this.videoAidData[i].aid
    this.editorBack = false;
    this.editorBackBtn = true;
    this.graphicsContent = true;
    this.api.getVideoGFX(this.videoAid).subscribe((res: any) => {
      console.log(res, "hehel");
      this.ngxService.start()
      this.tpArray = [];
      this.tpData = [];
      this.graphicsValue = [];

      if (res == 'Data is not found') {
        this.showGfx = true;
        this.showVideoGfx = false;
        this.ngxService.stop()
      } else {
        this.graphicsContent = false;
        const updatedRes = ([] = res);

        const newArr: {
          graphicsIndex: any;
          graphicsName: any;
          graphicsTemplateId: any;
          x: any;
          y: any;
          w: any;
          h: any;
        }[] = [];

        for (let i = 0; i < updatedRes.length; i++) {
          const propertiesStr = updatedRes[i].properties;
          const propertiesArr = propertiesStr.split(',');
          const propertiesArrValue = propertiesArr[0].split('|');
          const propertiesArrValueX = propertiesArr[1].split('|');
          const propertiesArrValueY = propertiesArr[2].split('|');
          const propertiesArrValueW = propertiesArr[3].split('|');
          const propertiesArrValueH = propertiesArr[4].split('|');
          newArr.push({
            graphicsIndex: updatedRes[i].graphicsIndex,
            graphicsName: updatedRes[i].templateName,
            graphicsTemplateId: updatedRes[i].templateID,
            x: propertiesArrValueX[2],
            y: propertiesArrValueY[2],
            w: propertiesArrValueW[2],
            h: propertiesArrValueH[2],
          });
        }

        const result = newArr.filter(
          (thing, index, self) =>
            index ===
            self.findIndex(
              (t) =>
                t.graphicsIndex === thing.graphicsIndex &&
                t.graphicsName === thing.graphicsName
            )
        );
        for (let i = 0; i < result.length; i++) {
          this.graphicsValue.push({
            title: result[i].graphicsName,
            templateid: result[i].graphicsTemplateId,
            x: result[i].x,
            y: result[i].y,
            w: result[i].w,
            h: result[i].h,
            graphicsIndex: result[i].graphicsIndex
          });
        }

        for (let i = 0; i < newArr.length; i++) {
          if (newArr[i].graphicsIndex <= this.counterGraphics) {
            continue;
          } else if (newArr[i].graphicsIndex >= this.counterGraphics) {
            this.counterGraphics = newArr[i].graphicsIndex;
          }
        }
        // console.log(this.counterGraphics, "counterGraphics")
        for (let i = 0; i < updatedRes.length; i++) {
          const propertiesStr = updatedRes[i].properties;
          const propertiesArr = propertiesStr.split(',');
          const propertiesArrValue = propertiesArr[0].split('|');
          const propertiesArrValueX = propertiesArr[1].split('|');
          const propertiesArrValueY = propertiesArr[2].split('|');
          let totalSploffset = updatedRes[i].sPlOffset;
          let totalsplduration = updatedRes[i].sPlOffset;

          let splOffsethours = Math.floor(totalSploffset / 3600);
          totalSploffset %= 3600;
          let splOffsetminutes = Math.floor(totalSploffset / 60);
          let splOffsetseconds = totalSploffset % 60;

          let splDurationhours = Math.floor(totalSploffset / 3600);
          totalSploffset %= 3600;
          let splDurationminutes = Math.floor(totalSploffset / 60);
          let splDurationseconds = totalSploffset % 60;

          const spLOffsetH = String(splOffsethours).padStart(2, '0');
          const splOffsetM = String(splOffsetminutes).padStart(2, '0');
          const splOffsetS = String(splOffsetseconds).padStart(2, '0');

          const splDurationH = String(splDurationhours).padStart(2, '0');
          const splDurationM = String(splDurationminutes).padStart(2, '0');
          const splDurationS = String(splDurationseconds).padStart(2, '0');

          const splOffset = 0;
          const SPlDuration = 0;
          this.tpArray.push({
            graphicsIndex: updatedRes[i].graphicsIndex,
            tpName: propertiesArrValue[0],
            tpType: propertiesArrValue[1],
            tpValue: propertiesArrValue[2],
            X: propertiesArrValueX[2],
            Y: propertiesArrValueY[2],
            TemplateId: updatedRes[i].templateID,
            ClipID: updatedRes[i].clipID,
            TemplateName: updatedRes[i].templateName,
            SPlOffset: splOffset,
            SPlDuration: SPlDuration,
            Properties: updatedRes[i].properties,
          });
        }
        for (let i = 0; i < this.tpArray.length; i++) {
          this.tpData.push({
            GraphicsIndex: this.tpArray[i].graphicsIndex,

            ClipID: this.tpArray[i].ClipID,

            TemplateID: this.tpArray[i].TemplateId,

            TemplateName: this.tpArray[i].TemplateName,

            SPlOffset: this.tpArray[i].SPlOffset,

            SPlDuration: this.tpArray[i].SPlDuration,

            Properties: this.tpArray[i].Properties,
          });
        }
        this.ngxService.stop()
      }
    },
      (err) => {
        this.toastr.warning('Internal server error!');
      })

  }

  videoGraphicsMapping() {
    for (let i = 0; i < this.videoAttachGraphics.length; i++) {
      this.api.getVideoGFX(this.videoAttachGraphics[i]).subscribe((res: any) => {
        console.log(res, "videoAttachGraphicsAid");
        if (res == 'Data is not found') {
          this.videoAttachGraphics.push(1);
        }
        else {
          this.videoAttachGraphics.push(0);
        }
      })
    }
  }
  setVideoGraphics() {
    this.ngxService.start()
    this.api.putVideoGFX(this.videoAid, this.tpData).subscribe((res: any) => {
      if (res == "Video GFX Record Inserted Successfully") {
        this.ngxService.stop()
        this.toastr.success("Video GFX Record Inserted Successfully!");
      } else {
        this.toastr.warning('Video GFX Record not done successfully!');
      }
      // document.getElementById('rightSideCLose')?.click();
      this.getRightSideData();
    },
      (err) => {
        this.ngxService.stop()
        this.toastr.warning('Internal server error!');

      })
  }

  getVideoGraphisc() {

  }
  removeGfx(item: any) {
    const newArr = this.tpArray.filter(
      (value: any) => value.graphicsIndex == item.graphicsIndex
    );
    const newArrTpData = this.tpData.filter(
      (value: any) => value.GraphicsIndex == item.graphicsIndex
    );
    console.log(newArr, "newArr")
    const newArrGraphicsValue = this.graphicsValue.filter(
      (value: any) => value.graphicsIndex == item.graphicsIndex
    );

    this.tpArray = this.tpArray.filter(
      (item: any) =>
        !newArr.some(
          (itemToBeRemoved: any) => itemToBeRemoved.graphicsIndex === item.graphicsIndex
        )
    );
    this.tpData = this.tpData.filter(
      (item: any) =>
        !newArrTpData.some(
          (itemToBeRemoved: any) => itemToBeRemoved.GraphicsIndex === item.GraphicsIndex
        )
    );
    this.graphicsValue = this.graphicsValue.filter(
      (item: any) =>
        !newArrGraphicsValue.some(
          (itemToBeRemoved: any) => itemToBeRemoved.graphicsIndex === item.graphicsIndex
        )
    );

    console.log(this.graphicsValue, "graphics value length")
    console.log(this.tpData, "tpData value length")
    console.log(this.tpArray, "tparray length")
    // console.log(this.tpArray, "hello")
  }
  backToEditor() {
    this.tpArray = [];
    this.graphicsValue = [];
    this.tpData = [];
    if (this.graphicsAmt.length == 0) {
      this.graphicsContent = true;
    }
    else {
      this.graphicsContent = false;
    }
  }


  viewVideoGfx(item: any, i: any) {
    this.addVideoArray(item, i);
    this.showVideoBtn = false;
    this.showGraphicsButton = false;
    this.addGfxShow = false;
  }
}
