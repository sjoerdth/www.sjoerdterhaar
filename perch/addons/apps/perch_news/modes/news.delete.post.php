<?php

    # Side panel
    echo $HTML->side_panel_start();
    echo $HTML->heading3('Delete News');
    echo $HTML->para('Delete a news here.');
    echo $HTML->side_panel_end();


    # Main panel
    echo $HTML->main_panel_start();

    include('_subnav.php');

    echo $Form->form_start();

    if ($message) {
        echo $message;
    }else{
        echo $HTML->warning_message('Are you sure you wish to delete the news %s?', $details['newsTitle']);
        echo $Form->form_start();
        echo $Form->hidden('newsID', $details['newsID']);
		echo $Form->submit_field('btnSubmit', 'Delete', $API->app_path());


        echo $Form->form_end();
    }

    echo $HTML->main_panel_end();
