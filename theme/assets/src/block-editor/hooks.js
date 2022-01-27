/**
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
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
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

import classnames from 'classnames';

/**
 * Trigger a class change when component is rendered.
 *
 * @param {*} BlockEdit Original component.
 *
 * @return {WPComponent} Original component.
 */
const withAttributeChange = createHigherOrderComponent( BlockEdit => {
	return props => {
		const {
			attributes: { className },
			name,
		} = props;

		useEffect( () => {
			if ( 'core/site-title' === name && ! className ) {
				props.setAttributes( {
					className:
						'site-title mdc-typography mdc-typography--headline6',
				} );
			}
		}, [] );

		return <BlockEdit { ...props } />;
	};
}, 'withAttributeChange' );

addFilter(
	'editor.BlockEdit',
	'material/title-class-name/block-edit',
	withAttributeChange
);
