<?php 

	function uniRegisterSearch(){
		register_rest_route('university/v1', 'search', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => 'uniSearchResults'
		));
	}

	function uniSearchResults(){
		return 'Route';
	}

	add_action( 'rest_api_init', 'uniRegisterSearch');
?>