import { Injectable } from "@angular/core"
import { Http, Headers, Response } from "@angular/http"
import { User } from './user.model'
import 'rxjs'
import { Observable } from "rxjs"

@Injectable()
export class AuthService {

    constructor(private http: Http) {
    }

    signup(user: User) {
        const body = JSON.stringify(user)
        const headers = new Headers({'Content-Type': 'application/json'})
        return this.http.post('http://localhost:3000/user', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    signin(user: User) {
        const body = JSON.stringify(user)
        const headers = new Headers({'Content-Type': 'application/json'})
        return this.http.post('http://localhost:3000/user/signin', body, {headers: headers})
            .map((response: Response) => response.json())
            .catch((error: Response) => Observable.throw(error.json()))
    }

    logout() {
        console.log(localStorage)
        localStorage.clear()
        console.log(localStorage)
    }

    isLoggedIn() {
        return localStorage.getItem('token') != null;
    }

    getUser(username){
        return this.http.get('http://localhost:3000/user/'+ username)
        .map((response: Response) =>{
            const user = response.json().obj
            return user;
        })
        .catch((error: Response) => Observable.throw(error.json()))
    }
}