<?php
/**
 * 404 template.
 */

get_header();
?>

<main id="primary" class="site-main pad" style="text-align:center;">
	<div class="container">
		<p class="eyebrow" style="justify-content:center;">404</p>
		<h1 style="margin-bottom:16px;"><?php esc_html_e( 'Page Not Found', 'hvac-pro' ); ?></h1>
		<p style="color:var(--grey);margin-bottom:28px;"><?php esc_html_e( 'The page you were looking for could not be found.', 'hvac-pro' ); ?></p>
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="btn btn-primary"><?php esc_html_e( 'Back to Home', 'hvac-pro' ); ?></a>
	</div>
</main>

<?php
get_footer();
