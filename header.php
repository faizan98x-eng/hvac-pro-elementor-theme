<?php
/**
 * Site header: top bar + sticky main navigation + mobile drawer.
 * Contact details, socials and the logo are all set from
 * Appearance → Customize, so none of it is hard-coded here.
 */

$hvac_phone   = get_theme_mod( 'hvac_phone' );
$hvac_email   = get_theme_mod( 'hvac_email' );
$hvac_address = get_theme_mod( 'hvac_address' );
$hvac_quote   = get_theme_mod( 'hvac_quote_url', '#' );
?><!doctype html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>">
<meta name="viewport" content="width=device-width, initial-scale=1">
<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<?php if ( $hvac_phone || $hvac_email || $hvac_address ) : ?>
<div class="topbar">
	<div class="container">
		<div class="topbar-left">
			<?php if ( $hvac_phone ) : ?>
				<a href="tel:<?php echo esc_attr( preg_replace( '/[^+0-9]/', '', $hvac_phone ) ); ?>">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 2-2Z"/></svg>
					<?php echo esc_html( $hvac_phone ); ?>
				</a>
			<?php endif; ?>
			<?php if ( $hvac_email ) : ?>
				<a href="mailto:<?php echo esc_attr( $hvac_email ); ?>">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>
					<?php echo esc_html( $hvac_email ); ?>
				</a>
			<?php endif; ?>
			<?php if ( $hvac_address ) : ?>
				<span>
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg>
					<?php echo esc_html( $hvac_address ); ?>
				</span>
			<?php endif; ?>
		</div>
		<div class="topbar-social">
			<?php hvac_pro_social_links(); ?>
		</div>
	</div>
</div>
<?php endif; ?>

<header class="site-header">
	<div class="container header-inner">
		<a href="<?php echo esc_url( home_url( '/' ) ); ?>" class="brand">
			<?php
			if ( has_custom_logo() ) {
				the_custom_logo();
			} else {
				bloginfo( 'name' );
			}
			?>
		</a>

		<nav class="main-nav" aria-label="<?php esc_attr_e( 'Primary', 'hvac-pro' ); ?>">
			<?php
			wp_nav_menu( array(
				'theme_location' => 'primary',
				'container'      => false,
				'items_wrap'     => '<ul>%3$s</ul>',
				'fallback_cb'    => false,
			) );
			?>
		</nav>

		<div class="header-actions">
			<a href="<?php echo esc_url( $hvac_quote ); ?>" class="btn btn-primary btn-navy-desktop"><?php esc_html_e( 'Get a Free Quote', 'hvac-pro' ); ?></a>
			<button class="burger" aria-label="<?php esc_attr_e( 'Open menu', 'hvac-pro' ); ?>"><span></span><span></span><span></span></button>
		</div>
	</div>
</header>

<div class="nav-overlay"></div>
<div class="mobile-nav">
	<div class="mobile-nav-head">
		<?php if ( has_custom_logo() ) { the_custom_logo(); } else { bloginfo( 'name' ); } ?>
		<button class="mobile-nav-close" aria-label="<?php esc_attr_e( 'Close menu', 'hvac-pro' ); ?>">&times;</button>
	</div>
	<?php
	wp_nav_menu( array(
		'theme_location' => 'primary',
		'container'      => false,
		'items_wrap'     => '<ul>%3$s</ul>',
		'fallback_cb'    => false,
	) );
	?>
	<a href="<?php echo esc_url( $hvac_quote ); ?>" class="btn btn-primary"><?php esc_html_e( 'Get a Free Quote', 'hvac-pro' ); ?></a>
</div>
