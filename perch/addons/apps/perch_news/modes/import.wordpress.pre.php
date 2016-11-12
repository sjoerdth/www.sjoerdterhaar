<?php
    
    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_news.import')) {
        PerchUtil::redirect($API->app_path());
    }

    $NewsUtil = new PerchNews_Util($API);

    if (!isset($_GET['file'])) exit;

    $file = urldecode($_GET['file']);
    $format = 'textile';

    if (isset($_GET['format'])) {
    	$format = $_GET['format'];
    }
   	
    if (isset($_GET['section'])) {
        $sectionID = (int)$_GET['section'];
    }else{
        $sectionID = 1;
    }
    



?>