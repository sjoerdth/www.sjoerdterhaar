<?php

    # Side panel
    echo $HTML->side_panel_start();

    echo $HTML->para('This page lists the newss you can place posts into.');

    echo $HTML->side_panel_end();


    # Main panel
    echo $HTML->main_panel_start();

	include ('_subnav.php');


    echo '<a class="add button" href="'.$HTML->encode($API->app_path().'/newss/edit/').'">'.$Lang->get('Add News').'</a>';


	# Title panel
    echo $HTML->heading1('Listing Newss');



    if (PerchUtil::count($newss)) {
?>
    <table class="d">
        <thead>
            <tr>
                <th class="first"><?php echo $Lang->get('News'); ?></th>
                <th><?php echo $Lang->get('Slug'); ?></th>
                <th><?php echo $Lang->get('Posts'); ?></th>
                <th class="action last"></th>
            </tr>
        </thead>
        <tbody>
<?php
    foreach($newss as $News) {
?>
            <tr>
                <td class="primary"><a href="<?php echo $HTML->encode($API->app_path()); ?>/newss/edit/?id=<?php echo $HTML->encode(urlencode($News->id())); ?>"><?php echo $HTML->encode($News->newsTitle())?></a></td>
                <td><?php echo $HTML->encode($News->newsSlug())?></td>
                <td><?php echo $HTML->encode($News->newsPostCount())?></td>
                <td><a href="<?php echo $HTML->encode($API->app_path()); ?>/newss/delete/?id=<?php echo $HTML->encode(urlencode($News->id())); ?>" class="delete inline-delete" data-msg="<?php echo $Lang->get('Delete this news?'); ?>"><?php echo $Lang->get('Delete'); ?></a></td>
            </tr>
<?php
    }
?>
        </tbody>
    </table>



<?php
    } // if pages


    echo $HTML->main_panel_end();
