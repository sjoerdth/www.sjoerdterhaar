<?php
	if ($CurrentUser->logged_in() && $CurrentUser->has_priv('perch_news')) {
	    $this->register_app('perch_news', 'News', 1, 'A simple news', '5.0');
	    $this->require_version('perch_news', '2.8.15');
	    $this->add_setting('perch_news_site_name', 'Site name', 'text', '');
	    $this->add_setting('perch_news_post_url', 'News post page path', 'text', '/news/post.php?s={postSlug}');
	    $this->add_setting('perch_news_slug_format', 'Slug format', 'text', '%Y-%m-%d-{postTitle}');
	    $this->add_setting('perch_news_akismet_key', 'Akismet API key', 'text', '');
	    $this->add_setting('perch_news_comment_notify', 'Notify author of new comments', 'checkbox', '0');
	    $this->add_setting('perch_news_max_spam_days', 'Delete spam comments', 'select', '0', array(
	    		array('label'=>'Never', 'value'=>'0'),
	    		array('label'=>'After 1 day', 'value'=>'1'),
	    		array('label'=>'After 7 days', 'value'=>'7'),
	    		array('label'=>'After 14 days', 'value'=>'14'),
	    		array('label'=>'After 30 days', 'value'=>'30'),
	    		array('label'=>'After 60 days', 'value'=>'60'),
	    		array('label'=>'After 90 days', 'value'=>'90'),
	    	));
	    $this->add_create_page('perch_news', 'edit');


	    PerchSystem::register_admin_search_handler('PerchNews_SearchHandler');

	    spl_autoload_register(function($class_name){
	    	if (strpos($class_name, 'PerchNews')===0) {
	    		include(PERCH_PATH.'/addons/apps/perch_news/'.$class_name.'.class.php');
	    		return true;
	    	}
	    	return false;
	    });
	}
