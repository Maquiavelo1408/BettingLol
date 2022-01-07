import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Team } from '../models/team.model'

const baseUrl = 'http://localhost:8080/api/';

@Injectable({
    providedIn: 'root'
})
export class CollectionService {
    /**
     *
     */
    constructor(private http: HttpClient) {

    }
    createTeam(data: any):Observable<any>{
        return this.http.post(baseUrl+'collection/team', data);
    }
    updateTeam(id: any, data:any): Observable<any>{
        return this.http.put(`${baseUrl}collection/team/${id}`, data);
    }
    deleteTeam(id: any): Observable<any>{
        return this.http.delete(`${baseUrl}collection/team/${id}`);
    }
    getTeams(): Observable<any>{
        return this.http.get(`${baseUrl}collection/team`);
    }
    createPlayer(data: any):Observable<any>{
        return this.http.post(baseUrl+'player', data);
    }
    createCompetition(data: any): Observable<any>{
        return this.http.post(baseUrl+'collection/competition', data);
    }
    getCompetitions(): Observable<any>{
        return this.http.get(`${baseUrl}collection/competition`);
    }
    getCompetitionsByRegion(region: any): Observable<any>{
        return this.http.get(`${baseUrl}collection/competition?region=${region}`);
    }

    createMatch(data: any): Observable<any>{
        return this.http.post(baseUrl+'match', data);
    }

}