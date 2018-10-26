<?php 

	function uniRegisterSearch(){
		register_rest_route('university/v1', 'search', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => 'uniSearchResults'
		));
	}

	function uniSearchResults($data){
		$professors = new WP_Query(array(
				'post_type' => 'professor',
				's' => sanitize_text_field($data['term'])
		));

		$profResults = array();

		while ($professors->have_posts()) {
			$professors->the_post();

			array_push($profResults, array(
				'title' => get_the_title(),
				'permalink' => get_the_permalink()
			));
		}

		return $profResults;
	}

	add_action( 'rest_api_init', 'uniRegisterSearch');
?>