<?php
    if (!PERCH_RUNWAY) exit;

    $Newss = new PerchNews_Newss($API);
    $CategorySets = new PerchCategories_Sets($API);

    $category_sets = $CategorySets->all();

    $HTML = $API->get('HTML');
    $Form = $API->get('Form');

    $message = false;

    if (!$CurrentUser->has_priv('perch_news.newss.manage')) {
        PerchUtil::redirect($API->app_path());
    }


    if (isset($_GET['id']) && $_GET['id']!='') {
        $newsID = (int) $_GET['id'];
        $News = $Newss->find($newsID);
        $details = $News->to_array();
    }else{
        $newsID = false;
        $News = false;
        $details = array();
    }


    $Template   = $API->get('Template');
    $Template->set('news/news.html', 'news');
    $Form->handle_empty_block_generation($Template);
    $tags = $Template->find_all_tags_and_repeaters();



    $Form->require_field('newsTitle', 'Required');
    $Form->set_required_fields_from_template($Template, $details);

    if ($Form->submitted()) {
		$postvars = array('newsTitle', 'setSlug', 'postTemplate');

    	$data = $Form->receive($postvars);

        $prev = false;

        if (isset($details['newsDynamicFields'])) {
            $prev = PerchUtil::json_safe_decode($details['newsDynamicFields'], true);
        }

        $dynamic_fields = $Form->receive_from_template_fields($Template, $prev, $Newss, $News);
        $data['newsDynamicFields'] = PerchUtil::json_safe_encode($dynamic_fields);

        if (!is_object($News)) {
            $data['newsSlug'] = PerchUtil::urlify($data['newsTitle']);
            $News = $Newss->create($data);
            PerchUtil::redirect($API->app_path() .'/newss/edit/?id='.$News->id().'&created=1');
        }


        $News->update($data);

        if (is_object($News)) {
            $message = $HTML->success_message('Your news has been successfully edited. Return to %snews listing%s', '<a href="'.$API->app_path() .'/newss">', '</a>');
        }else{
            $message = $HTML->failure_message('Sorry, that news could not be edited.');
        }

        // clear the caches
        PerchNews_Cache::expire_all();

        $details = $News->to_array();
    }

    if (isset($_GET['created']) && !$message) {
        $message = $HTML->success_message('Your news has been successfully created. Return to %snews listing%s', '<a href="'.$API->app_path() .'/newss">', '</a>');
    }
