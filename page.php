<?php
/**
 * Default page template — a blank canvas for Elementor (or the block
 * editor) to fully control. No section markup is hard-coded here on
 * purpose: every page's actual content lives in the page itself, not
 * in theme files, so it stays editable and never needs a code change.
 */

get_header();
?>

<main id="primary" class="site-main">
	<?php
	while ( have_posts() ) :
		the_post();
		the_content();
	endwhile;
	?>
</main>

<?php
get_footer();
