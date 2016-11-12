<?php
    # include the API
    include('../../../../core/inc/api.php');

    if (!PERCH_RUNWAY) {
        exit;
    }

    $API  = new PerchAPI(1.0, 'perch_news');
    $Lang = $API->get('Lang');

    # Set the page title
    $Perch->page_title = $Lang->get('Manage Blogs');

    $Perch->add_css($API->app_path().'/assets/css/news.css');

    # Do anything you want to do before output is started
    include('../modes/news.list.pre.php');

    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    # Display your page
    include('../modes/news.list.post.php');


    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
