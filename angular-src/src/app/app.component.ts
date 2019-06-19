import { ArticleComponent } from './article/article.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Article Viewer';

  /* This is the decorator used by the app-root component to call the method of the  showArticleByCategory() of the ArticleComponent 
  when the Category Selector Component generate the event selectedCategoryChanged
  */
  @ViewChild(ArticleComponent) article: ArticleComponent;

  changeCategory(event: string) {
    this.article.showArticleByCategory(event);
  }

}




