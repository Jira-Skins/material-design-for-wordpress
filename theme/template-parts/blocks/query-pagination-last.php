<?php
/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

$block              = $args['block'];
$content            = $args['content'];
$attributes         = $args['attributes'];
$page_key           = isset( $block->context['queryId'] ) ? 'query-' . $block->context['queryId'] . '-page' : 'query-page';
$page_number        = empty( $_GET[ $page_key ] ) ? 1 : (int) $_GET[ $page_key ];
$max_page           = isset( $block->context['query']['pages'] ) ? (int) $block->context['query']['pages'] : 0;
$wrapper_attributes = get_block_wrapper_attributes();
$default_label      = __( 'Last', 'material-design-google' );
$label              = isset( $attributes['label'] ) && ! empty( $attributes['label'] ) ? $attributes['label'] : $default_label;
$content            = '';

// Check if the pagination is for Query that inherits the global context.
if ( isset( $block->context['query']['inherit'] ) && $block->context['query']['inherit'] ) {

	$filter_link_attributes = function() use ( $wrapper_attributes ) {
		return $wrapper_attributes;
	};

	add_filter( 'next_posts_link_attributes', $filter_link_attributes );

	// Take into account if we have set a bigger `max page`
	// than what the query has.
	global $wp_query;

	if ( $max_page > $wp_query->max_num_pages ) {
		$max_page = $wp_query->max_num_pages;
	}

	ob_start();
	?>
		<a
			href="<?php echo esc_url( add_query_arg( $page_key, $max_page ) ); ?>"
			<?php
			/**
			 * Esc_attr breaks the markup.
			 * Turns the closing " into &quote;
			 */
			?>
			<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
		>
			<span class="material-icons" aria-hidden="true">
				last_page
			</span>
			<span class="screen-reader-text">
				<?php
					printf(
						/* translators: available page description. */
						esc_html__( '%s page', 'material-design-google' ),
						esc_html( $label )
					);
				?>
			</span>
		</a>
	<?php
	$content = ob_get_clean();

	remove_filter( 'next_posts_link_attributes', $filter_link_attributes );
} elseif ( ! $max_page || $max_page > $page_number ) {
	$custom_query           = new WP_Query( build_query_vars_from_query_block( $block, $page_number ) );
	$custom_query_max_pages = (int) $custom_query->max_num_pages;
	$wrapper_attributes     = str_replace( 'class="', 'class="mdc-ripple-surface ', $wrapper_attributes );

	if ( $custom_query_max_pages && $custom_query_max_pages !== $page_number ) :
		ob_start();
		?>
			<a
				href="<?php echo esc_url( add_query_arg( $page_key, $custom_query_max_pages ) ); ?>"

				<?php
				/**
				 * Esc_attr breaks the markup.
				 * Turns the closing " into &quote;
				 */
				?>
				<?php echo $wrapper_attributes; // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
			>
				<span class="material-icons" aria-hidden="true">
					last_page
				</span>
				<span class="screen-reader-text">
					<?php
						printf(
							/* translators: available page description. */
							esc_html__( '%s page', 'material-design-google' ),
							esc_html( $label )
						);
					?>
				</span>
			</a>
		<?php
		$content = ob_get_clean();
	endif;
	wp_reset_postdata(); // Restore original Post Data.
}

echo wp_kses_post( $content );
