import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  http = inject(HttpClient)
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/'

  token : string | null = null
  refresh: string | null = null

  get isAuth(){
    return !!this.token
  }
  login(payload:{username:string, password:string}){
    const fd = new FormData()
    fd.append('username', payload.username)
    fd.append('password', payload.password)

    return this.http.post<TokenResponse>(
      `${this.baseApiUrl}token`, 
      fd,
    ).pipe(
        tap(val=>{
          this.token = val.access_token
          this.refresh = val.refresh_token

        })
    )
  }
  constructor() { }
}
