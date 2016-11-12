<?php
    
    $Sections = new PerchNews_Sections($API);

    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_news.sections.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    $Newss = new PerchNews_Newss($API);
    $newss = $Newss->all();

    $News = false;

    if (PERCH_RUNWAY) {
        if (PerchUtil::get('news')) {
            $News = $Newss->get_one_by('newsSlug', PerchUtil::get('news'));
        }
    }
    if (!$News) {
        $News = $Newss->find(1);
    }

    $sections = $Sections->get_by('newsID', (int)$News->id());
