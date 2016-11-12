<?php

class PerchNews_News extends PerchAPI_Base
{
    protected $table        = 'newss';
    protected $pk           = 'newsID';

    protected $index_table  = 'news_index';
    protected $event_prefix = 'news.news';

    public function newsPostCount()
    {
    	$sql = 'SELECT COUNT(*) FROM '.PERCH_DB_PREFIX.'news_posts WHERE newsID='.$this->db->pdb((int)$this->id());
    	return $this->db->get_value($sql);
    }
}