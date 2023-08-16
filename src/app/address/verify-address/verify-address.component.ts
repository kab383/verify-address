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
      const addressNode = xmlDoc.querySelector('AddressValidateResponse');
      if (addressNode) {
        this.verifiedAddress = {
          Address1: addressNode.querySelector('Address1')?.textContent || '',
          Address2: addressNode.querySelector('Address2')?.textContent || '',
          City: addressNode.querySelector('City')?.textContent || '',
          State: addressNode.querySelector('State')?.textContent || '',
          Zip5: addressNode.querySelector('Zip5')?.textContent || ''
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
