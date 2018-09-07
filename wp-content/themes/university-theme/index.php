
<?php 
	get_header();

	while (have_posts()) {
		the_post();?>
		<h3><a href="<?php the_permalink() ?>"><?php the_title(); ?></a></h3>
		<?php the_content(); ?>
		<hr>
	<?php
	}

	get_footer();
?>

