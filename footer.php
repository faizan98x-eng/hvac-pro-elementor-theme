<?php
/**
 * Site footer: about column, two menu columns, contact column, bottom bar.
 */

$hvac_phone   = get_theme_mod( 'hvac_phone' );
$hvac_email   = get_theme_mod( 'hvac_email' );
$hvac_address = get_theme_mod( 'hvac_address' );
?>
	<footer class="site-footer">
		<div class="container footer-top">
			<div class="footer-about">
				<?php if ( has_custom_logo() ) { the_custom_logo(); } else { echo '<strong style="color:#fff;font-size:20px;">' . esc_html( get_bloginfo( 'name' ) ) . '</strong>'; } ?>
				<p><?php echo esc_html( get_theme_mod( 'hvac_footer_about' ) ); ?></p>
				<div class="footer-social"><?php hvac_pro_social_links(); ?></div>
			</div>

			<div class="footer-col">
				<h4><?php esc_html_e( 'Quick Links', 'hvac-pro' ); ?></h4>
				<?php
				wp_nav_menu( array(
					'theme_location' => 'footer-links',
					'container'      => false,
					'items_wrap'     => '<ul class="footer-links">%3$s</ul>',
					'fallback_cb'    => false,
				) );
				?>
			</div>

			<div class="footer-col">
				<h4><?php esc_html_e( 'Services', 'hvac-pro' ); ?></h4>
				<?php
				wp_nav_menu( array(
					'theme_location' => 'footer-services',
					'container'      => false,
					'items_wrap'     => '<ul class="footer-links">%3$s</ul>',
					'fallback_cb'    => false,
				) );
				?>
			</div>

			<div class="footer-col">
				<h4><?php esc_html_e( 'Contact Info', 'hvac-pro' ); ?></h4>
				<ul class="footer-contact">
					<?php if ( $hvac_address ) : ?>
					<li><a href="<?php echo esc_url( hvac_pro_maps_url( $hvac_address ) ); ?>" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/></svg><span><?php echo esc_html( $hvac_address ); ?></span></a></li>
					<?php endif; ?>
					<?php if ( $hvac_phone ) : ?>
					<li><a href="<?php echo esc_url( hvac_pro_whatsapp_url( $hvac_phone ) ); ?>" target="_blank" rel="noopener noreferrer"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M4 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L14 13l5 2v4a2 2 0 0 1-2 2C9.5 21 3 14.5 3 6a2 2 0 0 1 2-2Z"/></svg><span><?php echo esc_html( $hvac_phone ); ?></span></a></li>
					<?php endif; ?>
					<?php if ( $hvac_email ) : ?>
					<li><a href="mailto:<?php echo esc_attr( $hvac_email ); ?>"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg><span><?php echo esc_html( $hvac_email ); ?></span></a></li>
					<?php endif; ?>
				</ul>
			</div>
		</div>

		<div class="container footer-bottom">
			<span>&copy; <?php echo esc_html( gmdate( 'Y' ) ); ?> <?php bloginfo( 'name' ); ?>. <?php echo esc_html( get_theme_mod( 'hvac_footer_copyright' ) ); ?></span>
			<div class="footer-bottom-links">
				<?php
				wp_nav_menu( array(
					'theme_location' => 'footer-legal',
					'container'      => false,
					'items_wrap'     => '%3$s',
					'fallback_cb'    => false,
				) );
				?>
			</div>
		</div>
	</footer>

<?php wp_footer(); ?>
</body>
</html>
