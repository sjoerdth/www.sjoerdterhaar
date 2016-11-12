<?php
	if (!PERCH_RUNWAY) exit;

    $Newss = new PerchNews_Newss($API);

    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_news.newss.manage')) {
        PerchUtil::redirect($API->app_path());
    }

    $newss = $Newss->all();
