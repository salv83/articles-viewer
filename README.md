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
