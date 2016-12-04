<?php include('../perch/runtime.php'); ?>

<?php
$tags = perch_blog_post_tags(perch_get('s'), [], true);
PerchSystem::set_var('tags', $tags);
?>

<?php perch_layout('/global/doc_head'); ?>

<body>

<?php perch_pages_navigation(); ?>

<?php
perch_blog_custom(array(
        'filter' => 'postSlug',
        'match' => 'eq',
        'value' => perch_get('s'),
        'template' => 'blog/masthead.html'
    )
);
?>

<div class="m-wrapper m-wrapper--constrain m-wrapper--soft-sides">
    <?php perch_blog_post(perch_get('s')); ?>

    <article class="m-article o-grid o-grid--modern o-grid--equal-cells o-grid--modern-vertical-small">

        <div class="o-grid__cell o-grid__cell--fixed-small small-col-1of1">
        </div><!-- END:o-grid__cell -->

        <div class="o-grid__cell small-col-1of1">
            <div class="m-article">
                <div class="m-article__body m-article__body--hard-small">
                    <div class="text-constrain">
                        <?php perch_blog_post_comment_form(perch_get('s')); ?>

                        <?php perch_blog_post_comments(perch_get('s')); ?>
                    </div>
                </div>
            </div>
        </div>
    </article>

</div></nav>


<?php perch_layout('global/footer'); ?>

</body>
</html>