import { __ } from '@wordpress/i18n';
import Button from '../../../wizard/components/navigation/button';

const Content = () => {
	return (
		<div className="material-gsm__content mdc-layout-grid__cell mdc-layout-grid__cell--span-9">
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				Onboarding Wizard
			</h2>
			<p className="material-gsm__content-description">
				Curabitur mauris erat congue posuere lacus torquent et convallis,
				parturient rutrum cras senectus augue penatibus malesuada rhoncus,
				ultricies finibus pretium arcu sagittis aliquet nisi.
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Run Wizard', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					link="#"
				/>
			</div>
		</div>
	);
};

export default Content;
