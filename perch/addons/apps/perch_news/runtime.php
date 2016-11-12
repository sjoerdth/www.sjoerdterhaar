<?php
    spl_autoload_register(function($class_name){
        if (strpos($class_name, 'PerchNews')===0) {
            include(__DIR__.'/'.$class_name.'.class.php');
            return true;
        }
        return false;
    });

    PerchSystem::register_search_handler('PerchNews_SearchHandler');

    if (PERCH_RUNWAY) {
        $news_init = function(){
            $API  = new PerchAPI(1.0, 'perch_news');
            $API->on('page.loaded', 'perch_news_check_preview');
        };
        $news_init();
    }else{
        perch_news_check_preview();
    }

    function perch_news_form_handler($SubmittedForm)
    {
        if ($SubmittedForm->formID=='comment' && $SubmittedForm->validate()) {
            $API  = new PerchAPI(1.0, 'perch_news');
            $Comments = new PerchNews_Comments($API);
            $Comments->receive_new_comment($SubmittedForm);
        }
        $Perch = Perch::fetch();
        PerchUtil::debug($Perch->get_form_errors($SubmittedForm->formID));
    }

    function perch_news_recent_posts($count=10, $return_or_opts=false, $return=false)
    {
        if (is_array($return_or_opts)) {
            $opts = $return_or_opts;
        }else{
            $return = $return_or_opts;
            $opts = array();
        }

        $default_opts = array(
                'count'      => $count,
                'template'   => 'post_in_list.html',
                'sort'       => 'postDateTime',
                'sort-order' => 'DESC',
                'paginate'   => true,
            );

        $opts = PerchUtil::extend($default_opts, $opts);

        $r = perch_news($opts, $return);
    	if ($return) return $r;
    	echo $r;
    }

    function perch_news_post($id_or_slug, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $opts = array(
            'template'=>false,
            );

        if (is_numeric($id_or_slug)) {
            $opts['_id'] = intval($id_or_slug);
        }else{
            $opts['filter'] = 'postSlug';
            $opts['match']  = 'eq';
            $opts['value']  = $id_or_slug;
        }

        $r = perch_news($opts, $return);
        if ($return) return $r;
        echo $r;
    }


    /**
     * Get the comments for a specific post
     * @param  string  $id_or_slug   ID or slug for the post
     * @param  array $opts=false   Options
     * @param  boolean $return=false Return or output
     */
    function perch_news_post_comments($id_or_slug, $opts=false, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $API  = new PerchAPI(1.0, 'perch_news');

        $defaults = array();
        $defaults['template']        = 'comment.html';
        $defaults['count']           = false;
        $defaults['sort']            = 'commentDateTime';
        $defaults['sort-order']      = 'ASC';
        $defaults['paginate']        = false;
        $defaults['pagination-var']  = 'comments';

        if (is_array($opts)) {
            $opts = array_merge($defaults, $opts);
        }else{
            $opts = $defaults;
        }

        $postID = false;

        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);
        }else{
            $NewsPosts = new PerchNews_Posts($API);
            $Post = $NewsPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }

        $Comments = new PerchNews_Comments($API);

        $r = $Comments->get_custom($postID, $opts);

        if ($return) return $r;

        echo $r;
    }

    function perch_news_post_comment_form($id_or_slug, $opts=false, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $API  = new PerchAPI(1.0, 'perch_news');

        $defaults = array();
        $defaults['template']        = 'comment_form.html';

        if (is_array($opts)) {
            $opts = array_merge($defaults, $opts);
        }else{
            $opts = $defaults;
        }

        $postID = false;

        $NewsPosts = new PerchNews_Posts($API);

        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);
        }else{
            $Post = $NewsPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }

        $Post = $NewsPosts->find($postID);

        $Template = $API->get('Template');
        $Template->set('news/'.$opts['template'], 'news');
        $html = $Template->render($Post);
        $html = $Template->apply_runtime_post_processing($html);

        if ($return) return $html;
        echo $html;
    }

    /**
     *
     * Get the content of a specific field
     * @param mixed $id_or_slug the id or slug of the post
     * @param string $field the name of the field you want to return
     * @param bool $return
     */
    function perch_news_post_field($id_or_slug, $field, $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        $r = false;

        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);
            $Post = $NewsPosts->find($postID);
        }else{
            $Post = $NewsPosts->find_by_slug($id_or_slug);
        }

        $encode = true;
        if ($field=='postDescHTML') $encode = false;

        if (is_object($Post)) {
            $r = $Post->get_field($field);
        }

        if ($return) return $r;

        echo $r;
    }

    /**
     *
     * Gets the categories used for a post to display
     * @param string $id_or_slug id or slug of the current post
     * @param string $template template to render the categories
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_news_post_categories($id_or_slug, $opts='post_category_link.html', $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'post_category_link.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) {
            $return = true;
        }

        $opts['template'] = '~perch_news/templates/news/'.str_replace('news/', '', $opts['template']);

        $cache = false;
        $template = $opts['template'];

        if ($opts['cache']) {
            $cache_key = 'perch_news_post_categories'.md5($id_or_slug.serialize($opts));
            $cache = PerchNews_Cache::get_static($cache_key, 10);

            if ($opts['skip-template'] || $opts['split-items']) {
                $cache = unserialize($cache);
            }
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        $postID = false;

        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);
            $Post = $NewsPosts->find($postID);
        }else{
            $Post = $NewsPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }

        if (is_object($Post)) {
            $cats   = $Post->get_categories();

            if ($opts['skip-template']) {

                $out = array();

                if (PerchUtil::count($cats)) {
                    foreach($cats as $Cat) {
                        $out[] = $Cat->to_array();
                    }
                }

                if ($opts['cache']) {
                    PerchNews_Cache::save_static($cache_key, serialize($out));
                }

                return $out;

            }

            $Template = $API->get('Template');
            $Template->set($template, 'category');

            $r = $Template->render_group($cats, true);

            if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo $r;
        }

        return false;
    }

    /**
     *
     * Gets the tags used for a post to display
     * @param string $id_or_slug id or slug of the current post
     * @param string $template template to render the tags
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_news_post_tags($id_or_slug, $opts='post_tag_link.html', $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'post_tag_link.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) {
            $return = true;
        }

        $cache = false;
        $template = $opts['template'];

        if ($opts['cache']) {
            $cache_key = 'perch_news_post_tags'.md5($id_or_slug.serialize($opts));
            $cache = PerchNews_Cache::get_static($cache_key, 10);

            if ($opts['skip-template'] || $opts['split-items']) {
                $cache = unserialize($cache);
            }
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        $postID = false;

        if (is_numeric($id_or_slug)) {
            $postID = intval($id_or_slug);
        }else{
            $Post = $NewsPosts->find_by_slug($id_or_slug);
            if (is_object($Post)) {
                $postID = $Post->id();
            }
        }

        if ($postID!==false) {
            $Tags = new PerchNews_Tags();
            $tags   = $Tags->get_for_post($postID);

            if ($opts['skip-template']) {

                $out = array();
                foreach($tags as $Tag) {
                    $out[] = $Tag->to_array();
                }

                if ($opts['cache']) {
                    PerchNews_Cache::save_static($cache_key, serialize($out));
                }
                return $out;
            }

            $Template = $API->get('Template');
            $Template->set('news/'.$template, 'news');

            $r = $Template->render_group($tags, true);

            if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo $r;
        }

        return false;
    }

    function perch_news_custom($opts=false, $return=false)
    {
        return perch_news($opts, $return);
    }

    function perch_news($opts=false, $return=false)
    {
        $default_opts = array(
            'skip-template'        => false,
            'split-items'          => false,
            'filter'               => false,
            'paginate'             => true,
            'template'             => false,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        $API  = new PerchAPI(1.0, 'perch_news');

        $NewsPosts = new PerchNews_Posts($API);

        // tidy
        if (isset($opts['category']) && !is_array($opts['category'])) $opts['category'] = rtrim($opts['category'], '/');
        if (isset($opts['tag']) && !is_array($opts['tag'])) $opts['tag'] = rtrim($opts['tag'], '/');
        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var'];

        $r = $NewsPosts->get_custom($opts);

    	if ($return) return $r;

    	echo $r;
    }

    /**
     *
     * Builds an archive listing of categories. Echoes out the resulting mark-up and content
     * @param string $template
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_news_categories($opts='category_link.html', $return=false)
    {
        $default_opts = array(
            'template'             => 'category_link.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
            'count-type'           => 'news.post',
            'include-empty'        => false,
            'filter'               => false,
            'section'              => false,
            'set'                  => 'news',
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        $opts['template'] = '~perch_news/templates/news/'.str_replace('news/', '', $opts['template']);

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var'];

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_news_categories'.md5(serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        if (isset($opts['news']) && $opts['news']!='') {
            $Newss = new PerchNews_Newss($API);
            $News = $Newss->get_one_by('newsSlug', $opts['news']);
            $opts['set'] = $News->setSlug();
        }

        $Categories = new PerchCategories_Categories();
        $r      = $Categories->get_custom($opts, $API);

        if ($r!='' && $opts['cache']) PerchNews_Cache::save_static($cache_key, $r);

        if ($return) return $r;
        echo $r;

        return false;
    }

    /**
     * Gets the title of a category from its slug
     *
     * @param string $categorySlug
     * @param string $return
     * @return void
     * @author Drew McLellan
     */
    function perch_news_category($categorySlug, $news=false, $return=false)
    {
        $set = 'news';
        $categorySlug = rtrim($categorySlug, '/');
        $categoryPath = 'news/'.$categorySlug.'/';

        if (strpos($categorySlug, '/')) {
            $categoryPath = $categorySlug;
        }else{
            if (is_bool($news)) {
                $return = $news;
                $set = 'news';
            }else{
                $API   = new PerchAPI(1.0, 'perch_news');
                $Newss = new PerchNews_Newss($API);
                $News  = $Newss->get_one_by('newsSlug', $news);
                if ($News) {
                    $set   = $News->setSlug();
                }
            }

            $categoryPath = $set.'/'.$categorySlug.'/';
        }


        $cache_key = 'perch_news_category'.md5($categorySlug);
        $cache = PerchNews_Cache::get_static($cache_key, 10);

        if ($cache) {
            if ($return) return $cache;
            echo PerchUtil::html($cache);  return '';
        }

        $Categories = new PerchCategories_Categories();
        $Category = $Categories->get_one_by('catPath', $categoryPath);

        if (is_object($Category)){
            $r = $Category->catTitle();

            if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo PerchUtil::html($r);
        }

        return false;
    }

    /**
     *
     * Builds an archive listing of tags. Echoes out the resulting mark-up and content
     * @param string $template
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_news_tags($opts='tag_link.html', $return=false)
    {
        $default_opts = array(
            'template'             => 'tag_link.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
            'section'              => false,
            'news'                 => 'news',
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var'];

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_news_tags'.md5(serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        $Tags = new PerchNews_Tags();
        $tags = $Tags->all_in_use($opts);

        $Template = $API->get('Template');
        $Template->set('news/'.$opts['template'], 'news');

        $r = $Template->render_group($tags, true);

        if ($opts['cache']) {
            if ($r!='') PerchNews_Cache::save_static($cache_key, $r);
        }

        if ($return) return $r;
        echo $r;

        return false;
    }

    /**
     * Get a tag title from its slug
     * @param  [type]  $tagSlug [description]
     * @param  boolean $return  [description]
     * @return [type]           [description]
     */
    function perch_news_tag($tagSlug, $return=false)
    {
        $tagSlug = rtrim($tagSlug, '/');

        $cache_key = 'perch_news_tag'.md5($tagSlug);
        $cache = PerchNews_Cache::get_static($cache_key, 10);

        if ($cache) {
            if ($return) return $cache;
            echo PerchUtil::html($cache);  return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $Tags = new PerchNews_Tags($API);

        $Tag = $Tags->find_by_slug($tagSlug);

        if (is_object($Tag)){
            $r = $Tag->tagTitle();

            if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo PerchUtil::html($r);
        }

        return false;
    }

    /**
     *
     * Builds an archive listing looping through years. Echoes out the resulting mark-up and content
     * @param string $template
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_news_date_archive_years($opts='year_link.html', $return=false)
    {
        $default_opts = array(
            'template'             => 'year_link.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
            'section'              => false,
            'news'                 => false,
        );

        if (!is_array($opts)) {
            $opts = array('template'=>$opts);
        }

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) {
            $return = true;
        }

        $cache = false;
        $template = $opts['template'];

        if ($opts['cache']) {
            $cache_key = 'perch_news_date_archive_years'.md5(serialize($opts));
            $cache = PerchNews_Cache::get_static($cache_key, 10);

            if ($opts['skip-template'] || $opts['split-items']) $cache = unserialize($cache);
        }


        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

    	$API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        $newsID = null;
        if ($opts['news']) {
            $Newss = new PerchNews_Newss($API);
            $News = $Newss->get_one_by('newsSlug', $opts['news']);
            if ($News) {
                $newsID = (int)$News->id();
            }
        }

        $sectionID = null;
        if ($opts['section']) {
            $Sections = new PerchNews_Sections($API);
            $Section = $Sections->find_by_given($opts['section']);
            if (is_object($Section)) {
                $sectionID = (int)$Section->id();
            }
        }

        $years = $NewsPosts->get_years($sectionID, $newsID);


        if ($opts['skip-template'] || $opts['split-items']) {
            if ($opts['cache']) PerchNews_Cache::save_static($cache_key, serialize($years));
            return $years;
        }

        $Template = $API->get('Template');
        $Template->set('news/'.$template, 'news');

        $r = $Template->render_group($years, true);

        if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

        if ($return) return $r;
        echo $r;

        return false;
    }

    /**
     *
     * Builds an archive listing looping through years then months in years. Echoes out the resulting mark-up and content
     * @param string $template_year - the template for the year loop
     * @param string $template_months - template for months loop
     * @param bool $return if set to true returns the output rather than echoing it
     */
    function perch_news_date_archive_months($template_year='months_year_link.html', $template_months='months_month_link.html', $return=false)
    {
        $cache_key = 'perch_news_date_archive_months'.md5($template_year.$template_months);
        $cache = PerchNews_Cache::get_static($cache_key, 10);

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

    	$API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        $Template = $API->get('Template');

        $years = $NewsPosts->get_years();
        /* loop through the years */
        $Template->set('news/'.$template_months, 'news');
        for($i=0; $i<sizeOf($years);$i++) {
        	$months = $NewsPosts->get_months_for_year($years[$i]['year']);
        	/* render the months into the months template*/
        	$m = $Template->render_group($months, true);
        	/* add this rendered mark-up to the $years array */
        	$years[$i]['months'] = $m;
        }

        $Template->set('news/'.$template_year, 'news');
		/* render the $years array into the years template*/
        $r = $Template->render_group($years, true);

        if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

        if ($return) return $r;
        echo $r;

        return false;
    }

    function perch_news_check_preview()
    {
        if (!defined('PERCH_PREVIEW_ARG')) define('PERCH_PREVIEW_ARG', 'preview');

        if (perch_get(PERCH_PREVIEW_ARG)) {

            $Users          = new PerchUsers;
            $CurrentUser    = $Users->get_current_user();

            if (is_object($CurrentUser) && $CurrentUser->logged_in()) {

                PerchUtil::debug('Entering preview mode');
                PerchNews_Posts::$preview_mode = true;

            }
        }
    }

    function perch_news_authors($opts=array(), $return=false)
    {
        $default_opts = array(
            'template'             => 'author_list.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var'];

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_news_authors'.md5(serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }


        $API  = new PerchAPI(1.0, 'perch_news');
        $Authors = new PerchNews_Authors($API);
        $r      = $Authors->get_custom($opts);

        if ($r!='' && $opts['cache']) PerchNews_Cache::save_static($cache_key, $r);

        if ($return) return $r;
        echo $r;

        return false;
    }

    function perch_news_author($id_or_slug, $opts=array(), $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'author.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_news_author'.md5($id_or_slug.serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $Authors = new PerchNews_Authors;

        if (is_numeric($id_or_slug)) {
            $Author = $Authors->find($id_or_slug);
        }else{
            $Author = $Authors->find_by_slug($id_or_slug);
        }

        if (is_object($Author)) {

            if ($opts['skip-template']) {
                return $Author->to_array();
            }

            $Template = $API->get('Template');
            $Template->set('news/'.$opts['template'], 'news');

            $r = $Template->render($Author);

            if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo $r;
        }


        return false;
    }

    function perch_news_author_for_post($id_or_slug, $opts=array(), $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'author.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_news_author_for_post'.md5($id_or_slug.serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $NewsPosts = new PerchNews_Posts($API);

        if (is_numeric($id_or_slug)) {
            $Post = $NewsPosts->find($id_or_slug);
        }else{
            $Post = $NewsPosts->find_by_slug($id_or_slug);
        }

        if (is_object($Post)) {
            $Authors = new PerchNews_Authors;
            $Author = $Authors->find($Post->authorID());

            if (is_object($Author)) {

                if ($opts['skip-template']) {
                    return $Author->to_array();
                }

                $Template = $API->get('Template');
                $Template->set('news/'.$opts['template'], 'news');

                $r = $Template->render($Author);

                if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

                if ($return) return $r;
                echo $r;
            }
        }

        return false;
    }

    function perch_news_delete_old_spam($days)
    {
        $API  = new PerchAPI(1.0, 'perch_news');
        $Comments = new PerchNews_Comments($API);
        return $Comments->delete_old_spam($days);
    }

    function perch_news_sections($opts=array(), $return=false)
    {
        $default_opts = array(
            'template'             => 'section_list.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
            'news'                 => 'news',
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var'];

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_news_sections'.md5(serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }


        $API  = new PerchAPI(1.0, 'perch_news');
        $Sections = new PerchNews_Sections($API);
        $r      = $Sections->get_custom($opts);

        if ($r!='' && $opts['cache']) PerchNews_Cache::save_static($cache_key, $r);

        if ($return) return $r;
        echo $r;

        return false;
    }

    function perch_news_section($id_or_slug, $opts=array(), $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'             => 'section.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_news_section'.md5($id_or_slug.serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }

        $API  = new PerchAPI(1.0, 'perch_news');
        $Sections = new PerchNews_Sections;

        if (is_numeric($id_or_slug)) {
            $Section = $Sections->find($id_or_slug);
        }else{
            $Section = $Sections->find_by_slug($id_or_slug);
        }

        if (is_object($Section)) {

            if ($opts['skip-template']) {
                return $Section->to_array();
            }

            $Template = $API->get('Template');
            $Template->set('news/'.$opts['template'], 'news');

            $r = $Template->render($Section);

            if ($r!='') PerchNews_Cache::save_static($cache_key, $r);

            if ($return) return $r;
            echo $r;
        }


        return false;
    }

    function perch_news_post_meta($id_or_slug, $opts=array(), $return=false)
    {
        $id_or_slug = rtrim($id_or_slug, '/');

        $default_opts = array(
            'template'=>'news/meta_head.html',
            'include-meta' => true,
            );

        if (is_numeric($id_or_slug)) {
            $default_opts['_id'] = intval($id_or_slug);
        }else{
            $default_opts['filter'] = 'postSlug';
            $default_opts['match']  = 'eq';
            $default_opts['value']  = $id_or_slug;
        }

        $opts = array_merge($default_opts, $opts);

        $r = perch_news($opts, $return);
        if ($return) return $r;
        echo $r;
    }

    function perch_newss($opts=array(), $return=false)
    {
        if (!PERCH_RUNWAY) return false;

        $default_opts = array(
            'template'             => 'news.html',
            'skip-template'        => false,
            'split-items'          => false,
            'cache'                => true,
            'include-empty'        => false,
            'filter'               => false,
        );

        if (is_array($opts)) {
            $opts = array_merge($default_opts, $opts);
        }else{
            $opts = $default_opts;
        }

        if ($opts['skip-template'] || $opts['split-items']) $return = true;

        if (isset($opts['pagination_var'])) $opts['pagination-var'] = $opts['pagination_var'];

        $cache = false;

        if ($opts['cache']) {
            $cache_key  = 'perch_newss'.md5(serialize($opts));
            $cache      = PerchNews_Cache::get_static($cache_key, 10);
        }

        if ($cache) {
            if ($return) return $cache;
            echo $cache; return '';
        }


        $API  = new PerchAPI(1.0, 'perch_news');
        $Newss = new PerchNews_Newss($API);
        $r      = $Newss->get_custom($opts);

        if ($r!='' && $opts['cache']) PerchNews_Cache::save_static($cache_key, $r);

        if ($return) return $r;
        echo $r;

        return false;
    }