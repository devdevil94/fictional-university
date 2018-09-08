<?php 
	function uni_files(){
		wp_enqueue_style('uni_main_styles', get_stylesheet_uri());

	}

	add_action('wp_enqueue_scripts', 'uni_files'); //run the function(s) above
?>