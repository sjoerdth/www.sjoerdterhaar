<?php
    # include the API
    include('../../../../core/inc/api.php');

    $API  = new PerchAPI(1.0, 'perch_news');
    $Lang = $API->get('Lang');

    # Set the page title
    $Perch->page_title = $Lang->get('Manage Posts');

    $Perch->add_css($API->app_path().'/assets/css/news.css');

    # Do anything you want to do before output is started
    include('../modes/edit.pre.php');

    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    # Display your page
    include('../modes/edit.post.php');


    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
