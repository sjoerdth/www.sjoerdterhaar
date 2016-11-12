<?php

	$Comments = new PerchNews_Comments($API);
	$pending_comment_count =$Comments->get_count('PENDING');

	echo $HTML->subnav($CurrentUser, array(
		array('page'=>array(
					'perch_news',
					'perch_news/delete',
					'perch_news/edit',
					'perch_news/meta'
			), 'label'=>'Add/Edit'),
		array('page'=>array(
					'perch_news/comments',
					'perch_news/comments/edit'

			), 'label'=>'Comments', 'badge'=>$pending_comment_count, 'priv'=>'perch_news.comments.moderate'),
		array('page'=>array(
					'perch_news/authors',
					'perch_news/authors/edit',
					'perch_news/authors/delete'

			), 'label'=>'Authors', 'priv'=>'perch_news.authors.manage'),
		array('page'=>array(
					'perch_news/sections',
					'perch_news/sections/edit',
					'perch_news/sections/delete'

			), 'label'=>'Sections', 'priv'=>'perch_news.sections.manage'),
		array('page'=>array(
					'perch_news/newss',
					'perch_news/newss/edit',
					'perch_news/newss/delete'

			), 'label'=>'Newss', 'priv'=>'perch_news.newss.manage', 'runway'=>true),
	));
