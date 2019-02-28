import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormArray, FormGroup, Validators } from '@angular/forms';

import { ClientService } from '../client.service';

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {

  formGroup: FormGroup;

  display: boolean = false;

  constructor(private formBuilder: FormBuilder, private clientService: ClientService) { }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      customerName: '',
      streetaddress: '',
      city: '',
      district: '',
      state: '',
      country: '',
      pincode: '',
      empname: '',
      designation: ''
    });
  }

//   downloadFile(propertyId: string, fileId: string) {
//     const url = `${this.config.baseUrl}/properties/${propertyId}/files/${fileId}`;
//     const options = new RequestOptions({responseType: ResponseContentType.Blob });

//     // Process the file downloaded
//     this.http.get(url, options).subscribe(res => {
//         const fileName = getFileNameFromResponseContentDisposition(res);
//         saveFile(res.blob(), fileName);
//     });
// }

  generatepdf() {
    let url = "pdf"; 
    var data: any = this.formGroup.value;
console.log("DATA:"+JSON.stringify(data));

    // this.clientService.post(url, data).subscribe(
    //   response => {
    //   }
    // );

    this.clientService.downloadFile(url, data);
    
  }

  cancel() {
    this.formGroup.reset();
  }

}
