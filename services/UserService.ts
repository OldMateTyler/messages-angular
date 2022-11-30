import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NEVER, observable, Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'models/UserModel';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class UserService{
    tok = localStorage.getItem('token');
    baseurl = 'http://127.0.0.1:8000/api/v1/';
    constructor(private router: Router, private http: HttpClient) {}
    resetHttpOptions(){
      this.httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': "Bearer " + localStorage.getItem('token')
        }),
      };
    }
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
      }),
    };
    UpdateMessageRead(data:any): Observable<any>{
      return this.http.post(this.baseurl + 'update-message-read/' + data, JSON.stringify(data), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    UpdateProfile(data:any): Observable<any>{
      this.resetHttpOptions();
      return this.http.post(this.baseurl + 'update-profile', JSON.stringify(data), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    CreateThread(data: any): Observable<any>{
      this.resetHttpOptions();
      return this.http.post(this.baseurl + 'threads', JSON.stringify(data), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetOtherUsers(): Observable<any>{
      this.resetHttpOptions();
      return this.http.get(this.baseurl + 'all-users', this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    DeleteThread(data:any): Observable<any>{
      this.resetHttpOptions();
      return this.http.delete(this.baseurl + 'threads/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    DeleteMessage(data: any): Observable<any>{
      this.resetHttpOptions();
      return this.http.delete(this.baseurl + 'messages/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    SendMessage(data:any): Observable<any>{
      this.resetHttpOptions();
      return this.http.post(this.baseurl + 'messages', JSON.stringify(data), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    CheckRelationship(data:any): Observable<any>{
      this.resetHttpOptions();
      return this.http.get(this.baseurl + 'check-threads/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetUserProfile(data: any): Observable<any>{
      this.resetHttpOptions();
      return this.http.get(this.baseurl + 'users/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    EditThreads(data:any): Observable<any>{
      this.resetHttpOptions();
      return this.http.post(this.baseurl + 'update-threads', JSON.stringify(data), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetCurrentThread(data: any): Observable<any>{
      this.resetHttpOptions();
      return this.http.get(this.baseurl + 'threads/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetUsersMessages(data: any): Observable<any>{
      this.resetHttpOptions();
      return this.http.get(this.baseurl + data + '/messages', this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetCurrentUser(): Observable<any>{
      this.resetHttpOptions();
      return this.http.get(this.baseurl + 'current-user', this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    SignInUser(data: any): Observable<any>{
      this.resetHttpOptions();
        return this.http.post(
            this.baseurl + 'signin',
            JSON.stringify(data),
            this.httpOptions
        ).pipe(retry(1), catchError(this.errorHandl));
    }
    GetThreads(): Observable<any> {
      this.resetHttpOptions();
        return this.http
        .get(this.baseurl + "user/threads", this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    SignUpUser(data:any): Observable<any>{
      this.resetHttpOptions();
        return this.http.post(
            this.baseurl + 'signup',
            JSON.stringify(data),
            this.httpOptions
        ).pipe(retry(1), catchError(this.errorHandl));
    }
    errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        
        if(error.status == 404 && this.tok != null){
          window.location.href = 'http://localhost:4200/messages';
        }
        if(error.status == 401){
          window.location.href = 'http://localhost:4200/signin';
        }
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        return throwError(() => {
          return errorMessage;
        });
      }
}