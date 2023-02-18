import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { LDAP_USERS } from '../model/ldap-mock-data';
import { UserLdap } from '../model/user-ldap';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../environments/environments";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: UserLdap[] = LDAP_USERS;
  private usersUrl = '';
  private httpOptions = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient) {
    this.usersUrl = environment.usersApiUrl;
  }

  getUsers(): Observable<UserLdap[]> {
    return this.http.get<UserLdap[]>(this.usersUrl);
  }

  getUser(id: number): Observable<UserLdap> {
    return this.http.get<UserLdap>(this.usersUrl + '/' + id);
  }

  addUser(user: UserLdap): Observable<UserLdap> {
    return this.http.post<UserLdap>(this.usersUrl, user, {
      headers: this.httpOptions
    });
  }

  updateUser(user: UserLdap): Observable<UserLdap> {
    return this.http.put<UserLdap>(this.usersUrl + '/' + user.id,
      user, {headers: this.httpOptions});
  }
  
  deleteUser(id: number): Observable<UserLdap> {
    return this.http.delete<UserLdap>(this.usersUrl + '/' + id, {
      headers: this.httpOptions
    });
  }
}
