<?php
    # include the API
    include(__DIR__.'/../../../../../core/inc/api.php');

    if (!PERCH_RUNWAY) {
        exit;
    }

    $API  = new PerchAPI(1.0, 'perch_news');
    $Lang = $API->get('Lang');

    # Set the page title
    $Perch->page_title = $Lang->get('Manage Newss');

    $Perch->add_css($API->app_path().'/assets/css/news.css');

    # Do anything you want to do before output is started
    include(__DIR__.'/../../modes/news.edit.pre.php');

    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    # Display your page
    include(__DIR__.'/../../modes/news.edit.post.php');


    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
