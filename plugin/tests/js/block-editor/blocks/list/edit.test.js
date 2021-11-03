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
/* eslint-disable @typescript-eslint/no-empty-function */

/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

/**
 * Internal dependencies
 */
import Edit from '../../../../../assets/src/block-editor/blocks/list/edit';

/**
 * Shallow render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <Edit { ...props } /> );
};

const baseProps = {
	attributes: {
		style: 'basic',
		iconPosition: 'leading',
		iconSize: 'small',
		items: [
			{
				primaryText: 'List Item #1',
				secondaryText: 'List Item #1 secondary text',
				icon: 'spa',
				url: 'http://example.com',
				target: '_blank',
			},
			{
				primaryText: 'List Item #2',
				secondaryText: 'List Item #2 secondary text',
				icon: 'book',
				url: 'http://example.com/item-2',
				target: '',
			},
		],
	},
};

describe( 'Edit', () => {
	beforeAll( () => {
		window.getSelection = () => {
			return {
				addRange: () => {},
				removeAllRanges: () => {},
			};
		};
		document.createRange = () => ( {
			collapse: () => {},
			setStart: () => {},
			setEnd: () => {},
			commonAncestorContainer: {
				nodeName: 'BODY',
				ownerDocument: document,
			},
		} );
	} );

	it( 'matches snapshot with basic style', () => {
		const wrapper = setup( { ...baseProps } );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with two-line style', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, style: 'two-line' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with trailing icon position', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, iconPosition: 'trailing' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with no icon position', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, iconPosition: 'none' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot with large icon size', () => {
		const wrapper = setup( {
			...baseProps,
			attributes: { ...baseProps.attributes, iconSize: 'large' },
		} );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
