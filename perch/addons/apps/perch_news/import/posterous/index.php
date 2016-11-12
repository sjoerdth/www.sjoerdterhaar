<?php
    # include the API
    include('../../../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'perch_news');
    $Lang = $API->get('Lang');

    # include your class files
    include('../../PerchNews_Posts.class.php');
    include('../../PerchNews_Post.class.php');
	include('../../PerchNews_Sections.class.php');
    include('../../PerchNews_Section.class.php');
    include('../../PerchNews_Tags.class.php');
    include('../../PerchNews_Tag.class.php');
    include('../../PerchNews_Comments.class.php');
    include('../../PerchNews_Comment.class.php');
    include('../../PerchNews_Authors.class.php');
    include('../../PerchNews_Author.class.php');
    include('../../PerchNews_Cache.class.php');
    include('../../PerchNews_Util.class.php');
    
    # Set the page title
    $Perch->page_title = $Lang->get('Posterous Import');


    $Perch->add_css($API->app_path().'/assets/css/news.css');

    # Do anything you want to do before output is started
    include('../../modes/import.posterous.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('../../modes/import.posterous.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
?>