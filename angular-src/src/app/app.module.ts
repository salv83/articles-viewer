import { WPRestAPIService } from './service/wprest-api.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ArticleComponent } from './article/article.component';
import { CategorySelectorComponent } from './category-selector/category-selector.component';
import { FormsModule } from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    ArticleComponent,
    CategorySelectorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot()
  ],
  providers: [WPRestAPIService,
    {provide: APP_BASE_HREF, useValue: '/viewer'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
