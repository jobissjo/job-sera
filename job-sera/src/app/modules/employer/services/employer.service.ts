import { Injectable } from '@angular/core';
import { EmployerProfileType } from '../Models/employer.model';
import { AuthService } from '../../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CreateEmployerProfile, EmployerProfile, ResponseEmployerProfile } from 'src/app/shared/Models/employer.types';
import { CreateUserModel } from 'src/app/shared/Models/auth.types';

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

  private splitForCreateAccEMployer(profile: CreateEmployerProfile){
    const {personalInformation, companyInformation, additionalInformation} = profile;
    // delete personalInformation.cPassword
    const {cPassword, password,...modifiedPersonalInfo} = personalInformation;
    let createUserModel:CreateUserModel = {
      username: modifiedPersonalInfo.username,
      email:modifiedPersonalInfo.email,
      role:"employer",
      active:true,
      password: password
    }

    this.authService.signUpInFA(createUserModel).subscribe({
      next:res =>{
        console.log(res);
        this.authService.signInFA(modifiedPersonalInfo.email, password)
        setTimeout(()=> {
          const newEmployerInfo:EmployerProfile = {employer_id:res.id, 
            personalInformation:modifiedPersonalInfo, 
            companyInformation, additionalInformation
          }
          this.createEmployerAcc(newEmployerInfo)
        },2000)
      },
      error:err =>{
        console.warn(err);
        
      }
    })
    
  }

  private  createEmployerAcc(profile:EmployerProfile){
    let headers = this.getHeader();
    console.log("headers", headers);
    console.log("profile", profile);
    
    
    return this.http.post(`${environment.fastApiMainUrl}/employer/`, profile, {headers:headers}).subscribe(res =>{
      console.log(res);
      
    })
  }

  createEmployer(profile:CreateEmployerProfile){
    
    return this.splitForCreateAccEMployer(profile)
  }

  getEmployerById(id:string){
    let headers = this.getHeader();
    return this.http.get<ResponseEmployerProfile>(`${environment.fastApiMainUrl}/employer/${id}`, {headers})
  }

  private getHeader(){
    let token = this.authService.getTokenInLs()
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return headers
  }

}
