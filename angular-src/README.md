The viewer app will use:

- a [model](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/model/article.ts) that is the main Object of our app and will be used to model the article it has 3 properties:
   - title: string;
   - article_body: string;
   - featured_image: string;
   
- a [service](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/service/wprest-api.service.ts) that will do the AJAX calls the wordpress REST API, it has 4 methods
   - getAllArticles() - call the rest API to get the first 5 posts to display in the initial view
   - getCategoriesInfo() - get the list with the availabe categories names and ids
   - getArticlesByCategory(id: string) - get the posts belonging to a specific category 
   - getArticlesByMultipleCategories(id: string) - get the posts belonging to multiple categories

- There a 2 components:
The Article component that is the one displays the posts, it's composed mainly by these two files
  - [Article component](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/article/article.component.ts)
  - [Article view](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/article/article.component.html)

The CategorySelector component that is multiple select that allows to the user to choose one or more categories, it's composed mainly by these two files
  - [CategorySelector component](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/category-selector/category-selector.component.ts)
  - [CategorySelector view](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/category-selector/category-selector.component.html)

- Everything start from the app-root component that display the initial view of our angular app 
- [app-root component](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/app.component.ts)
- [app-root view](https://github.com/salv83/articles-viewer/blob/master/angular-src/src/app/app.component.html)
