<?php
/**
 * Class Material_Color_Palette_Control.
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder\Customizer;

/**
 * Material color palette control.
 */
class Material_Color_Palette_Control extends \WP_Customize_Color_Control {

	/**
	 * The type of customize control being rendered.
	 *
	 * @var string
	 */
	public $type = 'material_color';

	/**
	 * Related setting id of text color, applicable only if this is a background color.
	 *
	 * @var string
	 */
	public $related_text_setting = '';

	/**
	 * Related setting id of background color, applicable only if this is a text color.
	 *
	 * @var string
	 */
	public $related_setting = '';

	/**
	 * Var name in CSS.
	 *
	 * @var string
	 */
	public $css_var = '';

	/**
	 * Color accessibility label.
	 *
	 * @var string
	 */
	public $a11y_label = '';

	/**
	 * Render a JS template for the Material color palette tabs.
	 *
	 * @return void
	 */
	public static function tabs_template() {
		?>
		<script type="text/html" id="tmpl-customize-control-material_color-tabs">
			<# var id = data.id.replace(/\]$/, '').replace(/\[|\]/g, '-') #>
			<div class="mtb-tabs">
				<a class="mtb-tab-link" href="#mtb-palette-{{id}}"><?php esc_html_e( 'Palette', 'material-theme-builder' ); ?></a>
				<a class="mtb-tab-link" href="#mtb-custom-{{id}}"><?php esc_html_e( 'Custom', 'material-theme-builder' ); ?></a>
			</div>
			<div class="mtb-tab-content tab-palette" id="mtb-palette-{{id}}"></div>
			<div class="mtb-tab-content tab-custom" id="mtb-custom-{{id}}"></div>
			<div class="mtb-accessibility"></div>
		</script>
		<script type="text/html" id="tmpl-customize-control-material_color-accessibility">
			<div class="material-color-accessibility">
				<label><?php esc_html_e( 'Current Scheme', 'material-theme-builder' ); ?></label>
				<div class="material-color-accessibility-inner">
					<# _.each( data.colors, function( color ) { #>
						<div class="material-color-accessibility-row">
							<div class="material-color-accessibility-color">
								<span style="background-color: {{ color.hex }}"></span> <strong>{{ color.type }}</strong>
							</div>

							<# _.each( color.variations, function( variation ) { #>
								<# if ( null === variation.result ) { #>
									{{ variation.size }} <?php esc_html_e( 'text', 'material-theme-builder' ); ?>:
									{{ variation.textColor }}
									<?php esc_html_e( ' text not legible', 'material-theme-builder' ); ?>
									<span style="background-color: {{ variation.colorHex }}; color: {{ variation.textColorHex }}"><?php esc_html_e( 'Aa', 'material-theme-builder' ); ?></span>
									<span class="dashicons dashicons-warning"></span><br/>
								<# } #>
							<# } ); #>
						</div>
					<# } ); #>
				</div>
			</div>
		</script>
		<?php
	}

	/**
	 * Add our custom args for JSON output as params.
	 */
	public function to_json() {
		parent::to_json();
		$this->json['relatedTextSetting'] = ! empty( $this->related_text_setting ) ? $this->related_text_setting : false;
		$this->json['relatedSetting']     = ! empty( $this->related_setting ) ? $this->related_setting : false;
		$this->json['cssVar']             = ! empty( $this->css_var ) ? $this->css_var : false;
		$this->json['a11yLabel']          = ! empty( $this->a11y_label ) ? $this->a11y_label : '';
	}
}
