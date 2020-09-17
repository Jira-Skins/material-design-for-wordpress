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
import { BasicList, TwoLineList } from './components/list-styles';

export const LIST_STYLES = [
	{
		label: __( 'Basic List Item', 'material-theme-builder' ),
		value: 'basic',
		src: BasicList,
	},
	{
		label: __( 'List Item With Secondary Text', 'material-theme-builder' ),
		value: 'two-line',
		src: TwoLineList,
	},
];

export const ICON_POSITIONS = [
	{
		label: __( 'None', 'material-theme-builder' ),
		value: 'none',
	},
	{
		label: __( 'Leading', 'material-theme-builder' ),
		value: 'leading',
	},
	{
		label: __( 'Trailing', 'material-theme-builder' ),
		value: 'trailing',
	},
];

export const ICON_SIZES = [
	{
		label: __( 'Small', 'material-theme-builder' ),
		value: 'small',
	},
	{
		label: __( 'Large', 'material-theme-builder' ),
		value: 'large',
	},
];
