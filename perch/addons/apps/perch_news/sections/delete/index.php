<?php
    # include the API
    include('../../../../../core/inc/api.php');
    
    $API  = new PerchAPI(1.0, 'perch_news');
    $Lang = $API->get('Lang');

    if (!$CurrentUser->has_priv('perch_news.sections.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    # include your class files
    include('../../PerchNews_Sections.class.php');
    include('../../PerchNews_Section.class.php');
    include('../../PerchNews_Cache.class.php');
    include('../../PerchNews_Comments.class.php');
    include('../../PerchNews_Comment.class.php');

    # Set the page title
    $Perch->page_title = $Lang->get('Delete News Section');


    # Do anything you want to do before output is started
    include('../../modes/section.delete.pre.php');
    
    
    # Top layout
    include(PERCH_CORE . '/inc/top.php');

    
    # Display your page
    include('../../modes/section.delete.post.php');
    
    
    # Bottom layout
    include(PERCH_CORE . '/inc/btm.php');
?>