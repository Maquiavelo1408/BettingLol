import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroku_API, Local_API } from '../constants/api';

const API_URL = Local_API+'/api/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'})
  
};

@Injectable({
  providedIn: 'root'
})
export class LolService {

  constructor(private http: HttpClient) {
      this.getChampionJSON().subscribe(data=> {
        console.log(data);
      })
   }
   public getChampionJSON():Observable<any>{
     return this.http.get("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json");
   }

   public getMatches(startDate: string, endDate: string):Observable<any>{
     console.log(startDate);
     console.log(endDate);
     let params = new HttpParams();
     params = params.append('start_date', startDate);
     params = params.append('end_date', endDate);
     console.log(params);
    return this.http.get(API_URL+'matches', { 
      params: params
    });
   }

   public getTeamInfo(idTeam: string): Observable<any>{
     return this.http.get(API_URL+'team/'+ idTeam);
   }

   public getPlayersByTeam(idTeam: string): Observable<any>{
     return this.http.get(API_URL+'team/player/'+idTeam);
   }

   public getMatchById(matchId: string): Observable<any>{
     return this.http.get(API_URL+'match/'+matchId);
   }

   public createBet(body: any, user: any): Observable<any>{
    httpOptions.headers.append('x-access-token', user.accessToken);
    return this.http.post(API_URL+'bet', body,
    httpOptions);
   }

   public getTeamsByRegion(region: any): Observable<any>{
     return this.http.get(API_URL+'team?region='+ region);
   }

   public createSecondBet(body: any, user: any): Observable<any>{
     return this.http.post(API_URL+'secondBet', body);
   }
}
