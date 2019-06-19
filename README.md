The goal of this project is to build a WordPress plugin that publishes an article viewer with key bindings to navigate to the previous / next article:

* the plugin should be compatible with WordPress 4.9+, read posts from the standard REST API and use a JavaScript solution(Angular)

## Tasks:

- [x] the plugin settings should allow selecting one category of articles
- [x] the plugin will make those articles available in a single page application at the address "/viewer", displaying the article published last (featured image, title and article body)
- [x] articles should be retrieved through AJAX calls to the WordPress REST API https://developer.wordpress.org/rest-api/
- [x] the user should be able to navigate to the previous or next article using his keyboard ("j" and "k" keys)

## Other Tasks:
- [x] support for multiple categories
- [ ] add support for swiping on touch-enabled devices
- [ ] use a nice transition when changing article

## Documentation
The plugin is inside the /wordpress/wp-content/plugins/article-viewer. Inside this folder there is the folder view that contains the production files that will be used by the WP plugin to display the Angular App. The include/ folder contains the file
[apiManagement.php](https://github.com/salv83/articles-viewer/blob/master/wordpress/wp-content/plugins/article-viewer/include/apiManagement.php) with the commented code of the plugin. 
The plugin will create 3 custom endpoints
- **/wp-json/articleviewer/articles/**     - return all the published articles
- **/wp-json/articleviewer/categories/**   - return a JSON object with the id and name of each category
- **/wp-json/articleviewer/category/{id}** - return a all the articles belonging to a specified category
It will use the endpoint provided by the wordpress REST API
- **/wp-json/wp/v2/posts?categories={id}** - return a all the articles belonging to multiple categories
It will create also the endpoint 
- **/viewer/** where the angular app will be available


The source code of the angular frontend is available inside the folder [angular-src](https://github.com/salv83/articles-viewer/tree/master/angular-src)
