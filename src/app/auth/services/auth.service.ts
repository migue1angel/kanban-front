import { HttpClient } from "@angular/common/http";
import { inject, Inject, Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { LoginModel } from "../models/login.model";
import { Interface } from "readline";

@Injectable({
  providedIn: 'root'    
})
export class AuthService {

    private readonly httpClient = inject(HttpClient);
    private readonly router = inject(Router);
    
    constructor() {}

    url = 'http://localhost:3000/auth/';

    saveUrlRedirect(url: string) {
        sessionStorage.setItem('urlRedirect', url);
    }

    

     login(loginModel: LoginModel){
        this.httpClient.post(this.url, loginModel).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['/home']);
            },
            (error) => {
                console.log(error);
            }
        )
    }

    register(registerModel: LoginModel){
        this.httpClient.post(this.url + 'register', registerModel).subscribe(
            (response) => {
                console.log(response);
                this.router.navigate(['/home']);
            },
            (error) => {
                console.log(error);
            }
        )
    }



}