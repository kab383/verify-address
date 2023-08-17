import { Component } from '@angular/core';
import { UspsApiService } from 'src/app/services/usps-api.service';

@Component({
  selector: 'app-verify-address',
  templateUrl: './verify-address.component.html',
  styleUrls: ['./verify-address.component.css']
})
export class VerifyAddressComponent {
  address1 = '';
  address2 = '';
  city = '';
  state = '';
  zip5 = '';
  verifiedAddress: any = {};

  constructor(private uspsApiService: UspsApiService) {}

  verifyAddress() {
    // console.log(this.verifiedAddress);
    this.uspsApiService.verifyAddress(this.address1, this.address2, this.city, this.state, this.zip5).subscribe(response => {
      // console.log("API Response:", response);

      // Parse the XML response into a DOM object
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(response, 'text/xml');

      // Access the desired data using querySelector for each property
      const addressObj = xmlDoc.querySelector('AddressValidateResponse');
      if (addressObj) {
        this.verifiedAddress = {
          Address1: addressObj.querySelector('Address1')?.textContent || '',
          Address2: addressObj.querySelector('Address2')?.textContent || '',
          City: addressObj.querySelector('City')?.textContent || '',
          State: addressObj.querySelector('State')?.textContent || '',
          Zip5: addressObj.querySelector('Zip5')?.textContent || ''
        };
      }
    });
  }

  clearAddress() {
    this.address1 = '';
    this.address2 = '';
    this.city = '';
    this.state = '';
    this.zip5 = '';
    this.verifiedAddress = {};
  }
}
