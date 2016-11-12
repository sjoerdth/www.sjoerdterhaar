<?php
    if (!PERCH_RUNWAY) exit;

    $Newss = new PerchNews_Newss($API);

    $HTML = $API->get('HTML');
    $Form = $API->get('Form');

    $Form->set_name('delete');

    if (!$CurrentUser->has_priv('perch_news.newss.manage')) {
        PerchUtil::redirect($API->app_path());
    }

	$message = false;

	if (isset($_GET['id']) && $_GET['id']!='') {
	    $News = $Newss->find($_GET['id']);
	}else{
	    PerchUtil::redirect($API->app_path());
	}


    if ($Form->submitted()) {

    	if (is_object($News)) {
    	    $News->delete();

            // clear the caches
            PerchNews_Cache::expire_all();


    	    if ($Form->submitted_via_ajax) {
    	        echo $API->app_path().'/newss/';
    	        exit;
    	    }else{
    	       PerchUtil::redirect($API->app_path().'/newss/');
    	    }

        }else{
            $message = $HTML->failure_message('Sorry, that news could not be deleted.');
        }
    }



    $details = $News->to_array();


