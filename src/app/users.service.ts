import { Injectable } from '@angular/core';
import { HttpClient, HttpHandler, HttpHeaders } from '@angular/common/http';


const httpOption = {
  headers: new HttpHeaders( {
    'Content-Type': 'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UsersService {

private apiUserUrl = "http://localhost:8000/users";

  constructor(
    private  http: HttpClient
  ) {   }

  getUsers() {
    return this.http.get( this.apiUserUrl, httpOption)
  }

  getUser(id:number |string){
    return this.http.get(`${this.apiUserUrl}/find/${id}`, httpOption)
  }
}
