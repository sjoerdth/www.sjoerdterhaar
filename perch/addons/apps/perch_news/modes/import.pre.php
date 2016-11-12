<?php
    
    $HTML = $API->get('HTML');

    if (!$CurrentUser->has_priv('perch_news.import')) {
        PerchUtil::redirect($API->app_path());
    }

    $NewsUtil = new PerchNews_Util($API);

    $files = $NewsUtil->find_importable_files();
    
   	$Form = $API->get('Form');

   	
    $Form->require_field('file', 'Required');

    if ($Form->submitted()) {
    	        
        $postvars = array('file','format','type', 'section');
		
    	$data = $Form->receive($postvars);

    	switch($data['type']) {

    		case 'wordpress':
    			PerchUtil::redirect($API->app_path().'/import/wordpress?'.http_build_query($data));
    			break;

            case 'posterous':
                PerchUtil::redirect($API->app_path().'/import/posterous?'.http_build_query($data));
                break;

    	}

    }


?>