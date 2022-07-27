import { APP_ID, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }
  getLeftSideData(data: any) {
    let url = "http://3.7.43.117:5560/api/getrundownlist?recurrencetype=" + data;
    return this.http.get(url);
  }
  deleteLeftSideData(rundownId: any) {
    const deleteSelected = 'http://3.7.43.117:5560/api/deleterundownlist?rundownId=' + rundownId;
    console.log(deleteSelected);
    return this.http.delete(deleteSelected)
  }

  updateLeftSideData(leftSideData: any) {
    const url = 'http://3.7.43.117:5560/api/updaterundownlist';
    return this.http.put(url, leftSideData)
  }

  postLeftSideData(postSideData: any) {
    const url = 'http://3.7.43.117:5560/api/insertrundownlist';
    return this.http.put(url, postSideData)
  }

  postGridData(putGridData: any) {
    const url = 'http://3.7.43.117:5560/api/insertrundownlistdetails';
    return this.http.put(url, putGridData)
  }
  getGridData(gridDataId: any) {
    const url = 'http://3.7.43.117:5560/api/getrundownlistdetails?rundownId=' + gridDataId
    return this.http.get(url);
  }
  deleteRightSideData(rundownId: any, id: any) {
    const deleteSelectedRightGridData = 'http://3.7.43.117:5560/api/deleterundownlistdetails?id=' + rundownId + '&rundownId=' + id;
    console.log(deleteSelectedRightGridData);
    return this.http.delete(deleteSelectedRightGridData)
  }

  updateGridSideData(gridData: any) {
    const url = 'http://3.7.43.117:5560/api/updaterundownlistdetails';
    return this.http.put(url, gridData)
  }

  duplicateLeftSideData(duplicateData: any) {
    const url = 'http://3.7.43.117:5560/api/insertduplicaterundownlist';
    return this.http.put(url, duplicateData);
  }

  insertRightSideData(insertData: any) {
    const url = 'http://3.7.43.117:5560/api/rowinsertrundownlistdetails';
    return this.http.put(url, insertData);
  }

  editStory(storyData: any) {
    const url = 'http://3.7.43.117:5560/api/updaterundownlistdetails';
    return this.http.put(url, storyData);
  }

  dragDropData(dragData: any) {
    const url = ' http://3.7.43.117:5560/api/dragdrop';
    return this.http.put(url, dragData);
  }

  cutGridData(cutData: any) {
    const url = ' http://3.7.43.117:5560/api/CutPaste';
    return this.http.put(url, cutData);
  }
  copyGridData(copyData: any) {
    const url = 'http://3.7.43.117:5560/api/copypasterundownlistdetails';
    return this.http.put(url, copyData);
  }

  permissionDetails(permissionId: any) {
    const url = 'http://3.7.43.117:5560/api/permissiondetails?userId=' + permissionId;
    return this.http.get(url)
  }

  getAssignTo(userId: any) {
    const url = 'http://3.7.43.117:5560/api/assignto?userId=' + userId;
    return this.http.get(url);
  }

  getalltemplates(data: any) {
    let apiurl = 'https://dev-api5112.janya.video/v1/playout/getalltemplates';
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-auth-token': atob(sessionStorage.getItem("authToken")!),
      // 'x-auth-token': '8c1342b1-bf4d-4234-8a6d-002d750370a4',
      'x-channel-id': data
    });
    return this.http.post(apiurl, data, { headers });
  }
  getassets(data: any, authToken: any) {
    let apiurl = 'https://dev-api5112.janya.video/v1/playout/getassets';
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-auth-token': atob(sessionStorage.getItem("authToken")!),
      // 'x-auth-token': '8c1342b1-bf4d-4234-8a6d-002d750370a4',
      'x-channel-id': (localStorage.getItem('channelId')!)
    });
    return this.http.post(apiurl, data, { headers });
  }


  getsavedtemplateproperties(cid: any, data: any) {
    let apiurl = 'https://dev-api5112.janya.video/v1/playout/getsavedtemplateproperties';
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-auth-token': atob(sessionStorage.getItem("authToken")!),
      // 'x-auth-token': '8c1342b1-bf4d-4234-8a6d-002d750370a4',
      'x-channel-id': (localStorage.getItem('channelId')!)
    });
    // const temp = 'templateid: ' + 510;
    return this.http.post(apiurl, data, { headers });

  }
  getsplistpropsall(data: any) {
    let apiurl = 'https://dev-api5112.janya.video/v1/playout/getsplistpropsall';
    let headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-auth-token': atob(sessionStorage.getItem("authToken")!),
      // 'x-auth-token': '8c1342b1-bf4d-4234-8a6d-002d750370a4',
      'x-channel-id': (localStorage.getItem('channelId')!)
    });
    // const temp = 'templateid: ' + 510;
    return this.http.post(apiurl, data, { headers });
  }
  putInsertGraphics(data: any) {
    let apiurl = ' http://3.7.43.117:5560/api/insert_secondary_playlist_rundown';
    return this.http.put(apiurl, data);
  }
  getInsertGraphics(data: any) {
    let apiurl = ' http://3.7.43.117:5560/api/Get_secondary_playlist_rundown?clipid=' + data;
    return this.http.get(apiurl);
  }

  getRecurrence() {
    let url = 'http://3.7.43.117:5560/api/getrecurrencedata';
    return this.http.get(url);
  }

  insertRecurrence(data: any) {
    let url = 'http://3.7.43.117:5560/api/InsertRecurrenceData';
    return this.http.put(url, data);
  }
  insertVideoAssets(data: any) {
    let url = 'http://3.7.43.117:5560/api/InsertAssetLibraryData'
    return this.http.put(url, data);
  }
  getVideoAssets(cid: any) {
    let url = 'http://3.7.43.117:5560/api/GetAssetLibraryData?cid=' + cid
    return this.http.get(url);
  }

  GetTeleprompter() {
    let url = 'http://3.7.43.117:5560/api/GetTeleprompter'
    return this.http.get(url)
  }

  getTeleprompterRundown(data: any) {
    let url = ' http://3.7.43.117:5560/api/GetSoryTeleprompter?rundownid=' + data
    return this.http.get(url)
  }

  getUser() {
    let url = 'http://3.7.43.117:5560/api/getusersdata'
    return this.http.get(url);
  }

  insertMapping(data: any) {
    let url = 'http://3.7.43.117:5560/api/insertmappingdata'
    return this.http.put(url, data);
  }



  getPcr() {
    let apiurl = 'https://dev-api5113.janya.video/pcr/v1/get?cid=' + (localStorage.getItem('channelId'));
    return this.http.get(apiurl);
  }


  putVideoGFX(aid: any, data: any) {
    let apiurl = 'http://3.7.43.117:5560/api/insert_Video_secondary_playlist_rundown?aid=' + aid;
    return this.http.put(apiurl, data);
  }
  getVideoGFX(aid: any) {
    let apiurl = 'http://3.7.43.117:5560/api/Get_Video_secondary_playlist_rundown?aid=' + aid;
    return this.http.get(apiurl);
  }

  deleteGraphics(graphicsIndex:any){
    let url = 'http://3.7.43.117:5560/api/deletegraphicsdata?GraphicsIndex='+graphicsIndex;
    return this.http.delete(url);
  }

  deleteVideoData(aid:any){
    let url = 'http://3.7.43.117:5560/api/deletevideodata?aid='+ aid;
    return this.http.delete(url);
  }
}
