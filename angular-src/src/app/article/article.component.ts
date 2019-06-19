import { Article } from './../model/article';
import { Component, OnInit, Input, Directive, Output, EventEmitter } from '@angular/core';
import { WPRestAPIService } from '../service/wprest-api.service';
import * as $ from 'jquery';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  mytest: string;
  articles: Article[];
  article: Article;

  constructor(private wpservice: WPRestAPIService){}

  getAllArticles(){
    this.wpservice.getAllArticles()
      .subscribe(data => {
        this.articles = JSON.parse(data);
      }
      );
  }

  prevClicked(event){
    var classList = $(event.target).attr('class');
    var selector= '.' + classList.replace(/ /g,".");
    var prev = "#" + $(selector).data( "target" );
    var currentId = "#" + $(selector).data( "current" );
    jQuery(currentId).css("display","none");
    jQuery(currentId).removeClass("currentSlide");
    jQuery(prev).css("display","block");
    jQuery(prev).addClass("currentSlide");
  }

  nextClicked(event){
    var classList = $(event.target).attr('class');
    var selector= '.' + classList.replace(/ /g,".");
    var next = "#" + $(selector).data( "target" );
    var currentId = "#" + $(selector).data( "current" );
    jQuery(currentId).css("display","none");
    jQuery(currentId).removeClass("currentSlide");
    jQuery(next).css("display","block");
    jQuery(next).addClass("currentSlide");
  }

  showArticleByCategory(categories: string){
    var categoriesID = JSON.stringify(categories);
    var numCat = categoriesID.split(",");
    var categoriesNumber = numCat.length;
    var multipleArticles = [];

    if(categoriesNumber>1){
      for(var i=0; i<categoriesNumber; i++){
          numCat[i] = numCat[i].replace(/\D/g,'');      
      }
      var cleanedIDs = numCat.join(",");
      this.wpservice.getArticlesByMultipleCategories(cleanedIDs).subscribe(data => {
          for(var i=0; i<data.length; i++){
            let title = data[i]['title']['rendered'];
            let featured_image = data[i]['fimg_url'];
            let article_body = data[i]['content']['rendered'];
            let article= new Article();
            article.title = title; 
            article.featured_image = featured_image;  
            article.article_body = article_body;
            multipleArticles.push(article);
          }
          this.articles = multipleArticles;
        }
      );
    }else{
      categoriesID = categoriesID.replace(/\D/g,'');
      this.wpservice.getArticlesByCategory(categoriesID)
      .subscribe(data => {
        this.articles = JSON.parse(data);
      }
      );
    }

  }




  ngOnInit() {
    this.getAllArticles();
    $(document).ready(() => {
      document.addEventListener("keydown", function(event) {  
        if(event.which==75){
          var target = '#' +  $('.currentSlide .next i').data('target');
          var current = '#' +  $('.currentSlide .next i').data('current');
          jQuery(current).css("display","none");
          jQuery(current).removeClass("currentSlide");
          jQuery(target).css("display","block");
          jQuery(target).addClass("currentSlide");
        }
        if(event.which==74){
          var target = '#' + $('.currentSlide .previous i').data('target');
          var current = '#' +  $('.currentSlide .previous i').data('current');
          jQuery(current).css("display","none");
          jQuery(current).removeClass("currentSlide");
          jQuery(target).css("display","block");
          jQuery(target).addClass("currentSlide");
        }
      })
    });


  }

}
