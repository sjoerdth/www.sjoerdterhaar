<?php
    # include the API
    include('../../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'perch_news');
    $Lang = $API->get('Lang');

    if (!$CurrentUser->has_priv('perch_news.sections.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    # Set the page title
    $Perch->page_title = $Lang->get('Manage News Sections');


    # Do anything you want to do before output is started
    include('../modes/section.list.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('../modes/section.list.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
?>