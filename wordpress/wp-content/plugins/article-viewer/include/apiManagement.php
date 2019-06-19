<?php
/*
 * The plugin will create some custom endpoints that will be used by the Angular app to 
 * get the published post. We will have 4 endpoints_
 * 	/wp-json/articleviewer/articles/     - return all the published articles
 *	/wp-json/articleviewer/categories/   - return a JSON object with the id and name of each category
 *	/wp-json/articleviewer/category/{id} - return a all the articles belonging to a specified category
 *	/wp-json/wp/v2/posts?categories={id} - return a all the articles belonging to multiple categories
 */


/* 
 * getArticlesCatogoriesInfo generate a json object containing the id and the name for all categories
 * that we have created inside the posts section
 */
function getArticlesCatogoriesInfo( $data ) {
    $categories = get_categories();
    $post_categories = [];
    foreach($categories as $category) {
        $x = (object) [
            'id' => $category->term_id,
            'name' => $category->name
        ];
        array_push($post_categories, $x);
    }
    $json = json_encode($post_categories);
    return $json;
}

/*
 * This action register the endpoint /wp-json/articleviewer/categories/ and the link it to the callback
 * getArticlesCatogoriesInfo that will return the json object with the categories
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'articleviewer/', '/categories/', array(
        'methods' => 'GET',
        'callback' => 'getArticlesCatogoriesInfo',
    ) );
} );


/*
 *  getArticlesByCategory receive as parameter the data from the HTTP call, inside this object we will find
 *  the id for the category, and wi will use it to retrieve all the post for that category, for each post
 *  we store the needed information (title, content and featured image), then we generate an array of objects
 *  that will be encoded then in JSON format.
 */
function getArticlesByCategory( $data ) {
    $args = array(
        'posts_per_page' => -1,
        'category' => $data['id']
    );
    $latest_posts = get_posts( $args );
    $articles = [];
    foreach($latest_posts as $latest_post) {
        $x = (object) [
            'title' => $latest_post->post_title,
            'article_body' => $latest_post->post_content,
            'featured_image' => get_the_post_thumbnail_url($latest_post->ID,'full')
        ];
        array_push($articles, $x);
        
        
    }
    $json = json_encode($articles);
    return $json;
}
    
/*
 * This action register the endpoint /wp-json/articleviewer/category/{id} and link it to the callback
 * getArticlesByCategory that will return the json object with the posts.
 */
add_action( 'rest_api_init', function () {
    register_rest_route( 'articleviewer/', '/category/(?P<id>\d+)', array(
        'methods' => 'GET',
        'callback' => 'getArticlesByCategory',
    ) );
} );


/*
 *  getAllArticles return an object arry with all published posts, it will generate a json object with 5 posts,
 *  because as default the get_posts return 5 posts It will used to fill initially the view of the viewer
 */
function getAllArticles() {
    $latest_posts = get_posts();
    $articles = [];
    foreach($latest_posts as $latest_post) {
        $x = (object) [
            'title' => $latest_post->post_title,
            'article_body' => $latest_post->post_content,
            'featured_image' => get_the_post_thumbnail_url($latest_post->ID,'full')
        ];
        array_push($articles, $x);
    }
    $json = json_encode($articles);
    return $json;
}

/*
 * This action register the endpoint /wp-json/articleviewer/articles/  and link it to the callback
 * getAllArticles that will return the json object with the posts.
 */

add_action( 'rest_api_init', function () {
    register_rest_route( 'articleviewer/', '/articles/', array(
        'methods' => 'GET',
        'callback' => 'getAllArticles',
    ) );
} );


/*
 * Since get_posts doesn't allow to choose more than one category we will use the endpoint (/wp-json/wp/v2/posts?categories={id}) 
 * provided from wordpress to get the posts for more than one category, in this case {id} is a string of id comma separated,
 * by default the api provide the feature media id not the link to the featured image, then we have to register the link
 * to the featured image inside the json object returned by the wordpress API, first we register a field with name fimg_url
 * and then with the callback get_rest_featured_image we pass the link to the featured image
 */
add_action('rest_api_init', 'register_rest_images' );
function register_rest_images(){
    register_rest_field( array('post'),
        'fimg_url',
        array(
            'get_callback'    => 'get_rest_featured_image',
            'update_callback' => null,
            'schema'          => null,
        )
        );
}

function get_rest_featured_image( $object, $field_name, $request ) {
    if( $object['featured_media'] ){
        $img = wp_get_attachment_image_src( $object['featured_media'], 'app-thumb' );
        return $img[0];
    }
    return false;
}
    
    
/*
 * Include the neccessary content to make an Angular app work
 *
 */
function include_angular_app( $dist_path )
{
    echo '<!doctype html>';
    echo '<html lang="en">';
    echo '';
    echo '<head>';
    echo '<meta charset="utf-8">';
    echo '<title>Viewer</title>';
    echo '<base href="/wp-content/plugins/article-viewer/viewer">';
    echo '';
    echo '<meta name="viewport" content="width=device-width, initial-scale=1">';
    echo '<link rel="icon" type="image/x-icon" href="/wp-content/plugins/article-viewer/viewer/favicon.ico">';
    echo '<link rel="stylesheet" href="/wp-content/plugins/article-viewer/viewer/styles.css">';
    echo '</head>';
    echo '';
    echo '<body>';
    echo '<app-root></app-root>';
    echo '<script type="text/javascript" src="/wp-content/plugins/article-viewer/viewer/runtime.js"></script>';
    echo '<script type="text/javascript" src="/wp-content/plugins/article-viewer/viewer/es2015-polyfills.js" nomodule></script>';
    echo '<script type="text/javascript" src="/wp-content/plugins/article-viewer/viewer/polyfills.js"></script>';
    echo '<script type="text/javascript" src="/wp-content/plugins/article-viewer/viewer/scripts.js"></script>';
    echo '<script type="text/javascript" src="/wp-content/plugins/article-viewer/viewer/main.js"></script>';
    echo '</body>';
    echo '';
    echo '</html>';
    echo '';
}
    
add_action('parse_request', 'viewer_url_handler');

/*
 * viewer_url_handler create an endpoint /viewer/ that will display the angular app
 */
function viewer_url_handler() {
    if(($_SERVER["REQUEST_URI"] == '/viewer/')||($_SERVER["REQUEST_URI"] == '/viewer')) {
        include_angular_app( "/wp-content/plugins/article-viewer/viewer/" );
        exit();
    }
}