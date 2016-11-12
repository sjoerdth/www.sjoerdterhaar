<?php

class PerchNews_Tag  extends PerchAPI_Base
{
    protected $table  = 'news_tags';
    protected $pk     = 'tagID';


    public function delete()
    {
        $this->db->delete(PERCH_DB_PREFIX.'news_posts_to_tags', 'tagID', $this->id());
        parent::delete();
    }
}

