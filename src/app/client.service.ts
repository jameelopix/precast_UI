import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { RequestOptions, ResponseContentType } from '@angular/http';

import { saveAs } from 'file-saver/FileSaver';
import { Response } from '@angular/http';

import { environment } from '../environments/environment';
// import { getFileNameFromResponseContentDisposition, saveFile } from 'app/core/helpers/file-download-helper';

/**
 * Saves a file by opening file-save-as dialog in the browser
 * using file-save library.
 * @param blobContent file content as a Blob
 * @param fileName name file should be saved as
 */
export const saveFile = (blobContent: Blob, fileName: string) => {
  const blob = new Blob([blobContent], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
};

/**
* Derives file name from the http response
* by looking inside content-disposition
* @param res http Response
*/
export const getFileNameFromResponseContentDisposition = (res: Response) => {
  const contentDisposition = res.headers.get('content-disposition') || '';
  const matches = /filename=([^;]+)/ig.exec(contentDisposition);
  const fileName = (matches[1] || 'untitled').trim();
  return fileName;
};

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.baseurl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  httpFileOptions = new RequestOptions({ responseType: ResponseContentType.Blob });

  constructor(private http: HttpClient) { }

  post(url, request, callback) {
    this.http.post(this.baseUrl + url, request, this.httpOptions).subscribe((response: any) => {
      callback(response);
    });
    return this.http.post(this.baseUrl + url, request, this.httpOptions);
  }

  downloadFile(url, request) {
    // Process the file downloaded
    this.http.post(this.baseUrl + url, this.httpFileOptions).subscribe((res: Response) => {
      const fileName = getFileNameFromResponseContentDisposition(res);
      saveFile(res.blob(), fileName);
    });
  }
}
