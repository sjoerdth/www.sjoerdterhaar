<?php
    # include the API
    include('../../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'perch_news');
    $Lang = $API->get('Lang');

    # Set the page title
    $Perch->page_title = $Lang->get('Update News');


    # Do anything you want to do before output is started
    include('../modes/update.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('../modes/update.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
