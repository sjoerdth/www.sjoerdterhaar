<?php

class PerchNews_Author extends PerchAPI_Base
{
    protected $table        = 'news_authors';
    protected $pk           = 'authorID';
    protected $index_table  = 'news_index';
    protected $namespace    = 'news';
    protected $event_prefix = 'news.author';

}