<?php

	if (!isset($smartbar_selection)) {
		$smartbar_selection = 'details';
	}

    if (is_object($Post)) {

        echo $HTML->smartbar(
                $HTML->smartbar_breadcrumb(($smartbar_selection=='details'),
                        array(
                            'link'=> $API->app_path('perch_news').'/?news='.$News->newsSlug(),
                            'label' => $News->newsTitle(),
                        ),
                        array(
                            'link'=> $API->app_path('perch_news').'/edit/?id='.$Post->id(),
                            'label' => $Post->postTitle(),
                        )
                    ),
                $HTML->smartbar_link(($smartbar_selection=='meta'),
                        array(
                            'link'=> $API->app_path('perch_news').'/meta/?id='.$Post->id(),
                            'label' => PerchLang::get('Meta and Social'),
                        )
                    ),
                $HTML->smartbar_link(false,
                        array(
                            'link'=> ($draft ? $Post->previewURL() : $Post->postURL()),
                            'label' => PerchLang::get($draft ? 'Preview Draft' : 'View Post'),
                            'class' => 'icon page draft-preview'
                        ),
                        true
                    )
            );

    }

