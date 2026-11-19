<?php
/**
 * Single blog post template: banner, article body, back link.
 */

get_header();
?>

<main id="primary" class="site-main">
	<?php
	while ( have_posts() ) :
		the_post();
		$hvac_cats = get_the_category();
		?>
		<section class="page-hero post-hero">
			<div class="container">
				<?php if ( $hvac_cats ) : ?>
					<span class="eyebrow on-dark"><?php echo esc_html( $hvac_cats[0]->name ); ?></span>
				<?php endif; ?>
				<h1><?php the_title(); ?></h1>
				<div class="breadcrumb">
					<a href="<?php echo esc_url( home_url( '/' ) ); ?>"><?php esc_html_e( 'Home', 'hvac-pro' ); ?></a><span>/</span>
					<a href="<?php echo esc_url( home_url( '/#blog' ) ); ?>"><?php esc_html_e( 'Insights', 'hvac-pro' ); ?></a><span>/</span>
					<?php echo esc_html( get_the_date() ); ?>
				</div>
			</div>
		</section>

		<section class="pad bg-white">
			<div class="container">
				<article <?php post_class( 'post-article' ); ?>>
					<?php if ( has_post_thumbnail() ) : ?>
						<div class="post-media">
							<?php the_post_thumbnail( 'large' ); ?>
						</div>
					<?php endif; ?>
					<div class="entry-content legal-content post-content">
						<?php the_content(); ?>
					</div>
					<div class="post-footer">
						<a href="<?php echo esc_url( home_url( '/contact-us/' ) ); ?>" class="btn btn-primary"><?php esc_html_e( 'Get a Free Quote', 'hvac-pro' ); ?></a>
						<a href="<?php echo esc_url( home_url( '/#blog' ) ); ?>" class="btn btn-navy"><?php esc_html_e( 'More Insights', 'hvac-pro' ); ?></a>
					</div>
				</article>
			</div>
		</section>
		<?php
	endwhile;
	?>
</main>

<?php
get_footer();
