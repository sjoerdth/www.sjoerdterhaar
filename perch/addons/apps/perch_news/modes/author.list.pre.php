<?php
    
    $Authors = new PerchNews_Authors($API);

    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_news.authors.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    $authors = $Authors->all();
    
   

?>