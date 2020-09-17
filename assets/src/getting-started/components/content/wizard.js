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

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import Button from '../../../wizard/components/navigation/button';
import getConfig from '../../get-config';

export const Wizard = props => {
	return (
		<>
			<h2 className="material-gsm__content-title mdc-typography--headline6">
				{ __(
					'Quick Start',
					'material-theme-builder'
				) }
			</h2>
			<p>
				{ __(
					'Install the Material Theme and quick start examples.',
					'material-theme-builder'
				) }
			</p>
			<div className="material-gsm__content-actions">
				<Button
					style="mdc-button--raised"
					text={ __( 'Re-run quick start', 'material-theme-builder' ) }
					trailingIcon="navigate_next"
					onClick={ props.handleClick }
					link={ getConfig( 'wizardUrl' ) }
				/>
			</div>
		</>
	);
};
