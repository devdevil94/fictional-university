<?php 

	function uniRegisterSearch(){
		register_rest_route('university/v1', 'search', array(
			'methods' => WP_REST_Server::READABLE,
			'callback' => 'uniSearchResults'
		));
	}

	function uniSearchResults($data){
		$mainQuery = new WP_Query(array(
				'post_type' => array('professor', 'post', 'page', 'program', 'campus', 'event'),
				's' => sanitize_text_field($data['term'])
		));

		$results = array(
			'generalInfo' => array(),
			'professors' => array(),
			'programs' => array(),
			'events' => array(),
			'campuses' => array()
		);
		
		while ($mainQuery->have_posts()) {
			$mainQuery->the_post();		

			if(get_post_type() == 'post' OR get_post_type() == 'page'){
				array_push($results['generalInfo'], array(
					'title' => get_the_title(),
					'permalink' => get_the_permalink(),
					'type' => get_post_type(),
					'authorName' => get_the_author()
				));
			}

			if(get_post_type() == 'professor'){
				array_push($results['professors'], array(
					'title' => get_the_title(),
					'permalink' => get_the_permalink(),
					'img' => get_the_post_thumbnail_url(0,'profLandscape')
				));
			}

			if(get_post_type() == 'program'){
				array_push($results['programs'], array(
					'title' => get_the_title(),
					'permalink' => get_the_permalink()
				));
			}

			if(get_post_type() == 'event'){
				$eventDate = new DateTime(get_field('event_date'));
				$desc = null;
				if(has_excerpt())
		          $desc = get_the_excerpt();
		        else
		          $desc = wp_trim_words( get_the_content(), 10);

				array_push($results['events'], array(
					'title' => get_the_title(),
					'permalink' => get_the_permalink(),
					'month' => $eventDate->format('M'),
					'day' => $eventDate->format('d'),
					'desc' => $desc
				));
			}

			if(get_post_type() == 'campus'){
				array_push($results['campuses'], array(
					'title' => get_the_title(),
					'permalink' => get_the_permalink()
				));
			}
		}

		return $results;
	}

	add_action( 'rest_api_init', 'uniRegisterSearch');
?>