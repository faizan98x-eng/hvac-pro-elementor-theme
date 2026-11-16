<?php
/**
 * HVAC Pro theme setup, Customizer options, and asset loading.
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'HVAC_PRO_VERSION', '1.0.0' );

/**
 * Theme setup.
 */
function hvac_pro_setup() {
	add_theme_support( 'title-tag' );
	add_theme_support( 'post-thumbnails' );
	add_theme_support( 'custom-logo', array(
		'height'      => 90,
		'width'       => 260,
		'flex-height' => true,
		'flex-width'  => true,
	) );
	add_theme_support( 'html5', array( 'search-form', 'comment-form', 'comment-list', 'gallery', 'caption', 'style', 'script', 'navigation-widgets' ) );
	add_theme_support( 'align-wide' );
	add_theme_support( 'responsive-embeds' );
	add_theme_support( 'automatic-feed-links' );

	register_nav_menus( array(
		'primary'        => __( 'Primary Navigation', 'hvac-pro' ),
		'footer-links'   => __( 'Footer — Quick Links', 'hvac-pro' ),
		'footer-services' => __( 'Footer — Services', 'hvac-pro' ),
		'footer-legal'   => __( 'Footer — Legal', 'hvac-pro' ),
	) );
}
add_action( 'after_setup_theme', 'hvac_pro_setup' );

/**
 * Elementor full-width compatibility: this theme has no sidebar and no
 * content-width constraint, so Elementor sections already render edge to
 * edge on every page template without any extra "Elementor Canvas" markup.
 */
function hvac_pro_content_width() {
	$GLOBALS['content_width'] = 1240;
}
add_action( 'after_setup_theme', 'hvac_pro_content_width', 0 );

/**
 * Styles & scripts.
 */
function hvac_pro_assets() {
	wp_enqueue_style( 'hvac-pro-fonts', 'https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap', array(), null );
	wp_enqueue_style( 'hvac-pro-theme', get_template_directory_uri() . '/assets/css/theme.css', array(), HVAC_PRO_VERSION );
	wp_enqueue_script( 'hvac-pro-theme', get_template_directory_uri() . '/assets/js/theme.js', array(), HVAC_PRO_VERSION, true );
}
add_action( 'wp_enqueue_scripts', 'hvac_pro_assets' );

/**
 * Brand colours as CSS custom properties, driven by the Customizer so the
 * whole design system can be re-skinned without touching code.
 */
function hvac_pro_brand_css_vars() {
	$navy  = get_theme_mod( 'hvac_color_navy', '#12122A' );
	$blue  = get_theme_mod( 'hvac_color_blue', '#25ABE0' );
	$ice   = get_theme_mod( 'hvac_color_ice', '#EAF7FC' );
	$grey  = get_theme_mod( 'hvac_color_grey', '#AAB7C4' );
	printf(
		'<style id="hvac-pro-brand-vars">:root{--navy:%1$s;--blue:%2$s;--ice:%3$s;--grey:%4$s;}</style>',
		esc_html( $navy ),
		esc_html( $blue ),
		esc_html( $ice ),
		esc_html( $grey )
	);
}
add_action( 'wp_head', 'hvac_pro_brand_css_vars' );

/**
 * Customizer: brand colours, contact details and social links. All content
 * for individual pages belongs in Elementor — this panel only covers the
 * sitewide header/footer chrome.
 */
function hvac_pro_customize_register( $wp_customize ) {

	// Panel.
	$wp_customize->add_panel( 'hvac_pro_panel', array(
		'title'    => __( 'HVAC Pro Theme Options', 'hvac-pro' ),
		'priority' => 30,
	) );

	// Section: Brand colours.
	$wp_customize->add_section( 'hvac_colors', array(
		'title' => __( 'Brand Colours', 'hvac-pro' ),
		'panel' => 'hvac_pro_panel',
	) );
	$color_fields = array(
		'hvac_color_navy' => array( 'label' => __( 'Navy (header, footer, dark sections)', 'hvac-pro' ), 'default' => '#12122A' ),
		'hvac_color_blue' => array( 'label' => __( 'Accent Blue (buttons, links, highlights)', 'hvac-pro' ), 'default' => '#25ABE0' ),
		'hvac_color_ice'  => array( 'label' => __( 'Ice Tint (light section backgrounds)', 'hvac-pro' ), 'default' => '#EAF7FC' ),
		'hvac_color_grey' => array( 'label' => __( 'Cool Grey (secondary text)', 'hvac-pro' ), 'default' => '#AAB7C4' ),
	);
	foreach ( $color_fields as $id => $field ) {
		$wp_customize->add_setting( $id, array(
			'default'           => $field['default'],
			'sanitize_callback' => 'sanitize_hex_color',
		) );
		$wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, $id, array(
			'label'   => $field['label'],
			'section' => 'hvac_colors',
		) ) );
	}

	// Section: Contact details.
	$wp_customize->add_section( 'hvac_contact', array(
		'title' => __( 'Contact Details', 'hvac-pro' ),
		'panel' => 'hvac_pro_panel',
	) );
	$contact_fields = array(
		'hvac_phone'       => array( 'label' => __( 'Phone number', 'hvac-pro' ), 'sanitize' => 'sanitize_text_field' ),
		'hvac_email'       => array( 'label' => __( 'Email address', 'hvac-pro' ), 'sanitize' => 'sanitize_email' ),
		'hvac_address'     => array( 'label' => __( 'Address', 'hvac-pro' ), 'sanitize' => 'sanitize_text_field' ),
		'hvac_hours'       => array( 'label' => __( 'Working hours', 'hvac-pro' ), 'sanitize' => 'sanitize_text_field' ),
		'hvac_quote_url'   => array( 'label' => __( '"Get a Free Quote" button link', 'hvac-pro' ), 'sanitize' => 'esc_url_raw' ),
	);
	foreach ( $contact_fields as $id => $field ) {
		$wp_customize->add_setting( $id, array(
			'default'           => '',
			'sanitize_callback' => $field['sanitize'],
		) );
		$wp_customize->add_control( $id, array(
			'label'   => $field['label'],
			'section' => 'hvac_contact',
			'type'    => 'text',
		) );
	}

	// Section: Social links.
	$wp_customize->add_section( 'hvac_social', array(
		'title' => __( 'Social Links', 'hvac-pro' ),
		'panel' => 'hvac_pro_panel',
	) );
	foreach ( array( 'facebook', 'instagram', 'linkedin', 'x' ) as $network ) {
		$id = 'hvac_social_' . $network;
		$wp_customize->add_setting( $id, array(
			'default'           => '',
			'sanitize_callback' => 'esc_url_raw',
		) );
		$wp_customize->add_control( $id, array(
			'label'   => ucfirst( $network ) . ' URL',
			'section' => 'hvac_social',
			'type'    => 'url',
		) );
	}

	// Section: Footer.
	$wp_customize->add_section( 'hvac_footer', array(
		'title' => __( 'Footer', 'hvac-pro' ),
		'panel' => 'hvac_pro_panel',
	) );
	$wp_customize->add_setting( 'hvac_footer_about', array(
		'default'           => __( 'Write a short description of your business here from Appearance → Customize → HVAC Pro Theme Options → Footer.', 'hvac-pro' ),
		'sanitize_callback' => 'sanitize_textarea_field',
	) );
	$wp_customize->add_control( 'hvac_footer_about', array(
		'label'   => __( 'Footer about text', 'hvac-pro' ),
		'section' => 'hvac_footer',
		'type'    => 'textarea',
	) );
	$wp_customize->add_setting( 'hvac_footer_copyright', array(
		'default'           => __( 'All rights reserved.', 'hvac-pro' ),
		'sanitize_callback' => 'sanitize_text_field',
	) );
	$wp_customize->add_control( 'hvac_footer_copyright', array(
		'label'   => __( 'Copyright line (after the site name & year)', 'hvac-pro' ),
		'section' => 'hvac_footer',
		'type'    => 'text',
	) );
}
add_action( 'customize_register', 'hvac_pro_customize_register' );

/**
 * Small helper so templates can print a social icon link only when a URL
 * has actually been set in the Customizer.
 */
function hvac_pro_social_links() {
	$networks = array(
		'facebook'  => 'hvac_social_facebook',
		'instagram' => 'hvac_social_instagram',
		'linkedin'  => 'hvac_social_linkedin',
		'x'         => 'hvac_social_x',
	);
	foreach ( $networks as $network => $mod ) {
		$url = get_theme_mod( $mod );
		if ( empty( $url ) ) {
			continue;
		}
		printf( '<a href="%1$s" aria-label="%2$s" target="_blank" rel="noopener noreferrer">%3$s</a>', esc_url( $url ), esc_attr( ucfirst( $network ) ), hvac_pro_social_icon( $network ) );
	}
}

function hvac_pro_social_icon( $network ) {
	$icons = array(
		'facebook'  => '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 8h2V4h-2a4 4 0 0 0-4 4v2H9v4h2v6h4v-6h2.5l.5-4H15V8Z"/></svg>',
		'instagram' => '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg>',
		'linkedin'  => '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="3"/><line x1="7.5" y1="10" x2="7.5" y2="17"/><path d="M11.5 17v-4a2.2 2.2 0 0 1 4.4 0v4"/><line x1="11.5" y1="10" x2="11.5" y2="17"/></svg>',
		'x'         => '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l16 16M20 4 4 20"/></svg>',
	);
	return isset( $icons[ $network ] ) ? $icons[ $network ] : '';
}
