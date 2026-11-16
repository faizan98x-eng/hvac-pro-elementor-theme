<?php
/**
 * Single blog post template.
 */

get_header();
?>

<main id="primary" class="site-main pad">
	<div class="container" style="max-width:780px;">
		<?php
		while ( have_posts() ) :
			the_post();
			?>
			<article <?php post_class(); ?>>
				<p class="eyebrow"><?php echo esc_html( get_the_date() ); ?></p>
				<h1 style="margin-bottom:24px;"><?php the_title(); ?></h1>
				<?php if ( has_post_thumbnail() ) : ?>
					<div style="margin-bottom:32px;border-radius:var(--radius-lg);overflow:hidden;">
						<?php the_post_thumbnail( 'large' ); ?>
					</div>
				<?php endif; ?>
				<div class="entry-content" style="line-height:1.8;color:var(--graphite);">
					<?php the_content(); ?>
				</div>
			</article>
			<?php
		endwhile;
		?>
	</div>
</main>

<?php
get_footer();
