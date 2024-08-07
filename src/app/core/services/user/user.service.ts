import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/iuser';
import { IUserCreateRequest } from 'src/app/shared/interfaces/iuser-request';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  constructor(private http: HttpClient) {}

  getUsers(): Observable<IUser[]> {
    return this.http.get<IUser[]>(`${environment.apiUrl}/users`);
  }

  getUserById(id: number): Observable<IUser> {
    return this.http.get<IUser>(`${environment.apiUrl}/users/${id}`);
  }

  createUser(user: IUserCreateRequest): Observable<IUser> {
    return this.http.post<IUser>(`${environment.apiUrl}/users`, user);
  }

  updateUser(id: number, user: IUserCreateRequest): Observable<IUser> {
    return this.http.put<IUser>(`${environment.apiUrl}/users/${id}`, user);
  }

  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${environment.apiUrl}/users/${id}`);
  }
}
