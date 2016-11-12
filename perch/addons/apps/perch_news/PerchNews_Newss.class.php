<?php

class PerchNews_Newss extends PerchAPI_Factory
{
	protected $table               = 'newss';
    protected $pk                  = 'newsID';
    protected $singular_classname  = 'PerchNews_News';

	#protected $index_table         = 'news_index';
    protected $namespace           = 'news';

    protected $event_prefix        = 'news.news';

    protected $default_sort_column = 'newsTitle';


    public $static_fields   = array('newsTitle', 'newsSlug', 'setSlug', 'postTemplate');


    public function find($id)
    {
    	if (PERCH_RUNWAY) return parent::find((int)$id);
    	return parent::find(1);
    }

    public function get_custom($opts)
    {
        $opts['template'] = 'news/'.$opts['template'];
        return $this->get_filtered_listing($opts);
    }
}