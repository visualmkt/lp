<?php
// Visual MKT — Desativa comentários globalmente
add_action('init', function() {
    remove_post_type_support('post', 'comments');
    remove_post_type_support('page', 'comments');
});
add_filter('comments_open',  '__return_false', 20, 2);
add_filter('pings_open',     '__return_false', 20, 2);
add_filter('comments_array', '__return_empty_array', 10, 2);
