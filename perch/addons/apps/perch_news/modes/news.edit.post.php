<?php

    # Side panel
    echo $HTML->side_panel_start();

    echo $HTML->para('Give the news a new name.');

    echo $HTML->side_panel_end();


    # Main panel
    echo $HTML->main_panel_start();

    include('_subnav.php');


    # Title panel
    if (is_object($News)) {
        echo $HTML->heading1('Editing ‘%s’ News', $details['newsTitle']);
    }else{
        echo $HTML->heading1('Creating a New News');
    }

    if ($message) echo $message;


    $template_help_html = $Template->find_help();
    if ($template_help_html) {
        echo $HTML->heading2('Help');
        echo '<div id="template-help">' . $template_help_html . '</div>';
    }


    echo $HTML->heading2('News details');


    echo $Form->form_start();

        echo $Form->text_field('newsTitle', 'Title', (isset($details['newsTitle']) ? $details['newsTitle'] : ''));

        $opts = array();
        if (PerchUtil::count($category_sets)) {
            foreach($category_sets as $Set) {
                $opts[] = array('value'=>$Set->setSlug(), 'label'=>$Set->setTitle());
            }
        }
        echo $Form->select_field('setSlug', 'Category set', $opts, (isset($details['setSlug']) ? $details['setSlug'] : ''));


        $opts = array();
        $Util = new PerchNews_Util($API);
        $templates = $Util->find_templates();

        if (PerchUtil::count($templates)) {
            foreach($templates as $template) {
                $opts[] = array('value'=>$template, 'label'=>PerchUtil::filename($template, true));
            }
        }
        echo $Form->select_field('postTemplate', 'Default master template', $opts, (isset($details['postTemplate']) ? $details['postTemplate'] : 'post.html'));


        echo $Form->fields_from_template($Template, $details, $Newss->static_fields);


        echo $Form->submit_field('btnSubmit', 'Save', $API->app_path().'/newss/');


    echo $Form->form_end();

    echo $HTML->main_panel_end();
