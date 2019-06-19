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

  /* This is the method called by ngOnInit to the display in the initial view the first 5 posts */
  getAllArticles(){
    this.wpservice.getAllArticles()
      .subscribe(data => {
        this.articles = JSON.parse(data);
      }
      );
  }

  /* prevClicked and nextClicked are two callbacks that are invoked when the user click on the two arrows beside the title of 
  the post and this arrows allows to the user to navigate between the posts, they use the same behaviour of the j and k keys
  described for the ngOnInit method*/

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


   /* showArticleByCategory is the method we use to display the article for specific o multiple categories, we the user click
   on one category the component Category Selector generates and event, change, that will call the handler selectedCategoryChanged
   that will emit a custom event to the app-root component (this event will store the categories the user has selected). 
   The app-root will use the decorator @VievChild that allow to it to communicate with another component, in this case the article
   component, then the app-root  will call the method showArticleByCategory of the article component passing to it the date from the 
   event generated in the Category Component. This object we pass to the method should be transformed to a sting to be passed 
   to the service for the AJAX call. 
   [["2"],["4"]] this is the type of object we receive from the event
   */

  showArticleByCategory(categories: string){
    var categoriesID = JSON.stringify(categories); /* we transform the event object to string */
    var numCat = categoriesID.split(",");          /* we split the string using the comma as separator */
    var categoriesNumber = numCat.length;          /* from the lenght of the splitted array we got the number of selected categories*/
    var multipleArticles = [];                     /* here we store the posts recived form the service */


    /* if the user select more categories, we clan the elements of the splitted array from the characters [""] and then we join
    these elements to get a string on ids commma separated, with pass this parameter to the WPRestAPIService that will call the
    method for multiple categories, it return us the json from the server that we store in the data variable, this will be an
    array of objects containing all the metadata of a post. At this point the only thing we have to do is to loop on this array,
    and create  for each element of the array an object of type Article with the relevant information and it that will be pushed
    inside the array multipleArticles, at the the end of the loop we get our array of article to display, we have only to assign
    it to this.articles and the view will be updated with the posts requested by the user.*/
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
      /* if the user select one category we have only to clean the string from the characters [""] and then call
      WPRestAPIService that will do the AJAX call to the API for one category of posts, from the call we have
      directly the result in a json format that in this case can be directly assigner to this.articles to be showed in 
      the view */
      categoriesID = categoriesID.replace(/\D/g,'');
      this.wpservice.getArticlesByCategory(categoriesID)
      .subscribe(data => {
        this.articles = JSON.parse(data);
      }
      );
    }

  }

/* ngOnInit is the first method called after the constructor, it will get from the service the json object
with the posts and it will add a document.addEventListener to control if the user press some keys, if the user
press the key j that corresponds to the ASCII code 74 it means that the user wants to go to the previous article,
than the jquery method will hide the current post and it will display the previous one. Same thing happens for the
key k, that corresponds to the ASCII code 75 and in this case the user wants to go to the next article.*/


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
