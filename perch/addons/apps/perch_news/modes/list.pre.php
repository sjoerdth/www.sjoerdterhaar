<?php

    $HTML = $API->get('HTML');

    // Try to update
    $Settings = $API->get('Settings');

    if ($Settings->get('perch_news_update')->val()!='5.0.1') {
        PerchUtil::redirect($API->app_path().'/update/');
    }

    $Posts = new PerchNews_Posts($API);
    $Newss = new PerchNews_Newss($API);
    $newss = $Newss->all();

    if (!PerchUtil::count($newss)) {
         $Posts->attempt_install();
         $newss = $Newss->all();
    }

    $Paging = $API->get('Paging');
    $Paging->set_per_page(15);

    $News = false;

    if (PERCH_RUNWAY) {
        if (PerchUtil::get('news')) {
            $News = $Newss->get_one_by('newsSlug', PerchUtil::get('news'));
        }
    }
    if (!$News) {
        $News = $Newss->find(1);
    }


    $Categories = new PerchCategories_Categories();
    $categories = $Categories->get_for_set($News->setSlug());

    $Sections = new PerchNews_Sections($API);
    $sections = $Sections->get_by('newsID', (int)$News->id());



	$Lang = $API->get('Lang');

    $posts = array();

    $filter = 'all';

    if (isset($_GET['category']) && $_GET['category'] != '') {
        $filter = 'category';
        $category = $_GET['category'];
    }

    if (isset($_GET['section']) && $_GET['section'] != '') {
        $filter = 'section';
        $section = $_GET['section'];
    }


    if (isset($_GET['status']) && $_GET['status'] != '') {
        $filter = 'status';
        $status = $_GET['status'];
    }


    switch ($filter) {

        case 'category':
            $posts = $Posts->get_by_category_slug_for_admin_listing($category, $Paging);
            break;

        case 'section':
            $posts = $Posts->get_by_section_slug_for_admin_listing($section, $Paging);
            break;

        case 'status':
            $posts = $Posts->get_by_status($status, false, $News->newsSlug(), $Paging);
            break;

        default:
            $posts = $Posts->get_by('newsID', (int)$News->id(), 'postDateTime DESC', $Paging);

            // Install
            if ($posts == false) {
                $Posts->attempt_install();
            }

            break;
    }
