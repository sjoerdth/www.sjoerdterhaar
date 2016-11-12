<?php

	PerchScheduledTasks::register_task('perch_news', 'delete_spam_comments', 1440, 'scheduled_news_delete_spam_comments');

	function scheduled_news_delete_spam_comments($last_run)
	{
		$API  = new PerchAPI(1.0, 'perch_news');
		$Settings = $API->get('Settings');

		$days = $Settings->get('perch_news_max_spam_days')->val();

		if (!$days) return array(
				'result'=>'OK',
				'message'=> 'Spam message deletion not configured.'
			);

		$count = perch_news_delete_old_spam($days);

		if ($count == 1) {
			$comments = 'comment';
		}else{
			$comments = 'comments';
		}

		return array(
				'result'=>'OK',
				'message'=>$count.' old spam '.$comments.' deleted.'
			);
	}
