<script type="text/javascript" src="PERCH_LOGINPATH/addons/plugins/editors/tinymce/jquery.tinymce.min.js"></script>
<script type="text/javascript" charset="utf-8"> 
$(function() {

	var set_up_tinymce = function(){

		$('textarea.tinymce:not([data-init])').wrap('<div class="editor-wrap"></div>').tinymce({
			// Location of TinyMCE script
			script_url : 'PERCH_LOGINPATH/addons/plugins/editors/tinymce/tinymce.min.js',	
			plugins: [
			         "advlist autolink link image lists charmap print preview hr anchor pagebreak spellchecker",
			         "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
			         "save table contextmenu directionality emoticons template paste textcolor"
			   ],
			convert_urls: false, 
			relative_urls: false
		}).attr('data-init', true);

	};

	set_up_tinymce();

	$(window).on('Perch_Init_Editors', function(){
		set_up_tinymce();
	});


});
</script>
