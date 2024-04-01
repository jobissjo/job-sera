import { Injectable } from '@angular/core';
import { EmployerProfileType } from '../Models/employer.model';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployerService {

  constructor(private authService:AuthService, private http:HttpClient) { }
  private employer: EmployerProfileType = {
    personalInformation: {
      firstName: 'John',
      lastName: 'Doe',
      username: 'johndoe',
      email: 'john@example.com',
      phoneNumber: '1234567890',
      password: 'password123',
      cPassword: 'password123',
      position: 'Manager',
      socialMediaLink: 'https://example.com/johndoe',
      gender: 'male'
    },
    companyInformation: {
      companyName: 'ABC Company',
      industry: 'Software',
      companySize: 'Large',
      businessType: 'Private',
      companyPhoneNumber: '0987654321',
      companyWebsite: 'https://example.com',
      socialMediaLink: 'https://example.com/abccompany',
      desc: 'A software development company',
      address: {
        street: '123 Main St',
        city: 'New York',
        landmark: 'Near Central Park',
        state: 'NY',
        country: 'USA',
        postalCode: '10001'
      }
    },
    additionalInformation: {
      hearAboutUs: 'Friend',
      agreedToTerms: 'Yes'
    }
  }

  getEmployer(){
    return this.employer;
  }

  getEmployerById(id:string){
    let headers = this.getHeader();
    return this.http.get(`${environment.fastApiMainUrl}/employer/${id}`, {headers})
  }

  private getHeader(){
    let token = this.authService.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }

}
