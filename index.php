<?php include('perch/runtime.php'); ?>

<?php perch_layout('global/doc_head'); ?>

<body>

<?php perch_pages_navigation(); ?>


<div class="m-wrapper m-wrapper--soft-sides">

    <?php perch_pages_breadcrumbs(); ?>

    <?php perch_content('article'); ?>

    <div class="m-wrapper m-wrapper--constrain ">

        <div class="o-grid o-grid--modern o-grid--push-down">

            <div class="o-grid__cell o-grid__cell--ui o-grid__cell--ui-pink col-1of1">

                <div class="text-constrain">
                    <header>
                        <h2>Web development</h2>
                        <span class="subheading h3">Blog on front-end development</span>
                    </header>

                    <?php
                    perch_blog_custom(array(
                        'sort'      => 'postDateTime',
                        'sortOrder' => 'desc',
                        'template'  => 'blog/post_in_list_homepage.html',
                        'count'     => 5

                    ))
                    ?>

                    <a class="o-button o-button--flat-pink" href="/blog"><svg class="m-svg-icon-inline" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path></svg>Full Web Development Blog</a>

                </div>


            </div>

        </div>
    </div>

</div>

<?php perch_layout('global/footer'); ?>

</body>
</html>
