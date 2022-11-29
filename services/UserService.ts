import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from 'models/UserModel';
@Injectable({
  providedIn: 'root',
})
export class UserService{
    baseurl = 'http://127.0.0.1:8000/api/v1/';
    constructor(private http: HttpClient) {}
    httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + localStorage.getItem('token')
      }),
    };
    CheckRelationship(data:any): Observable<any>{
      return this.http.get(this.baseurl + 'check-threads/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetUserProfile(data: any): Observable<any>{
      return this.http.get(this.baseurl + 'users/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    EditThreads(data:any): Observable<any>{
      return this.http.post(this.baseurl + 'update-threads', JSON.stringify(data), this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetCurrentThread(data: any): Observable<any>{
      return this.http.get(this.baseurl + 'threads/' + data, this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetUsersMessages(data: any): Observable<any>{
      return this.http.get(this.baseurl + data + '/messages', this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    GetCurrentUser(): Observable<any>{
      return this.http.get(this.baseurl + 'current-user', this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    SignInUser(data: any): Observable<any>{
        return this.http.post(
            this.baseurl + 'signin',
            JSON.stringify(data),
            this.httpOptions
        ).pipe(retry(1), catchError(this.errorHandl));
    }
    GetThreads(): Observable<any> {
        return this.http
        .get(this.baseurl + "user/threads", this.httpOptions).pipe(retry(1), catchError(this.errorHandl));
    }
    SignUpUser(data:any): Observable<User>{
        return this.http.post<User>(
            this.baseurl + 'signup',
            JSON.stringify(data),
            this.httpOptions
        ).pipe(retry(1), catchError(this.errorHandl));
    }
    errorHandl(error: { error: { message: string; }; status: any; message: any; }) {
        let errorMessage = '';
        if (error.error instanceof ErrorEvent) {
          // Get client-side error
          errorMessage = error.error.message;
        } else {
          // Get server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        console.log(errorMessage);
        return throwError(() => {
          return errorMessage;
        });
      }
}