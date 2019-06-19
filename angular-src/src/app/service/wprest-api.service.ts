import { Article } from './../model/article';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
const url ="http://articleviewer.loc";

@Injectable({
  providedIn: 'root'
})
export class WPRestAPIService {

  endpoint: string;
  constructor(private http: HttpClient) { }

  getAllArticles(): Observable <string> {
    this.endpoint = url + '/wp-json/articleviewer/articles/'; 
    return this.http.get<string>(this.endpoint);
  }

  getCategoriesInfo(): Observable <string> {
    this.endpoint = url + '/wp-json/articleviewer/categories/'; 
    return this.http.get<string>(this.endpoint);
  }

  getArticlesByCategory(id: string): Observable <string> { 
    this.endpoint = url + '/wp-json/articleviewer/category/'+id; 
    return this.http.get<string>(this.endpoint);
  }

  getArticlesByMultipleCategories(id: string): Observable <string> { 
    this.endpoint = url + '/wp-json/wp/v2/posts?categories='+id; 
    return this.http.get<string>(this.endpoint);
  }



}
