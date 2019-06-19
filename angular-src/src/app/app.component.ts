import { ArticleComponent } from './article/article.component';
import { Component, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Article Viewer';

  @ViewChild(ArticleComponent) article: ArticleComponent;

  changeCategory(event: string) {
    this.article.showArticleByCategory(event);
  }

}




