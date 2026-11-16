<?php
/**
 * Fallback template — also serves as the blog listing.
 */

get_header();
?>

<main id="primary" class="site-main pad">
	<div class="container">
		<?php if ( have_posts() ) : ?>
			<div class="blog-grid">
				<?php
				while ( have_posts() ) :
					the_post();
					?>
					<article <?php post_class( 'blog-card' ); ?>>
						<?php if ( has_post_thumbnail() ) : ?>
							<a class="blog-media" href="<?php the_permalink(); ?>"><?php the_post_thumbnail( 'medium_large' ); ?></a>
						<?php endif; ?>
						<div class="blog-body">
							<h3><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h3>
							<p><?php echo esc_html( wp_trim_words( get_the_excerpt(), 20 ) ); ?></p>
							<a class="blog-link" href="<?php the_permalink(); ?>">
								<?php esc_html_e( 'Read Article', 'hvac-pro' ); ?>
								<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
							</a>
						</div>
					</article>
					<?php
				endwhile;
				?>
			</div>
			<?php the_posts_pagination(); ?>
		<?php else : ?>
			<p><?php esc_html_e( 'Nothing found.', 'hvac-pro' ); ?></p>
		<?php endif; ?>
	</div>
</main>

<?php
get_footer();
