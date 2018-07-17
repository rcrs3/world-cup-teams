import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'; 
import 'rxjs/add/operator/catch';

import { Team } from './team';

@Injectable()

export class TeamService {

  private apiUrl = 'http://localhost:3000';

  constructor(private http: Http) { }

  getTeams() {
    return this.http.get(`${this.apiUrl}/teams`)
                    .map((res) => res.json())
                    .catch(this.handleError);
  }

  getTeam(id: Number) {
    return this.http.get(`${this.apiUrl}/detail/${id}`)
                    .map((res) => res.json())
                    .catch(this.handleError);
  }

  private handleError(error: Response) { 
    console.error(error); 
    return Observable.throw(error.json().error()); 
 } 


}
