/**
 * External dependencies
 */
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { cloneDeep } from 'lodash';

/**
 * Internal dependencies
 */
import TextareaInputSave from '../../../../../../../assets/src/block-editor/blocks/contact-form/inner-blocks/common/components/textarea-input-save';

/**
 * Render the component.
 *
 * @param {Object} props - Component props.
 * @return {Function} A functional component.
 */
const setup = props => {
	return render( <TextareaInputSave { ...props } /> );
};

const baseProps = {
	attributes: {
		id: 'test-id',
		label: 'Name',
		inputValue: 'test name',
		outlined: true,
		fullWidth: false,
		displayLabel: 'Name',
		isRequired: true,
		inputRole: 'name',
	},
	className: 'test-class',
};

describe( 'TextareaInputSave', () => {
	afterEach( () => {
		jest.clearAllMocks();
	} );

	it( 'matches snapshot', () => {
		const wrapper = setup( baseProps );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the display label attribute is empty', () => {
		const props = cloneDeep( baseProps );

		props.attributes.displayLabel = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the `is required` attribute is false', () => {
		const props = cloneDeep( baseProps );

		props.attributes.isRequired = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the full width attribute is true', () => {
		const props = cloneDeep( baseProps );

		props.attributes.fullWidth = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false and the `is required` attribute is false', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		props.attributes.isRequired = false;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false and the display label attribute is empty', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		props.attributes.displayLabel = '';
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );

	it( 'matches snapshot when the outlined attribute is false and the full width attribute is true', () => {
		const props = cloneDeep( baseProps );

		props.attributes.outlined = false;
		props.attributes.fullWidth = true;
		const wrapper = setup( props );
		expect( wrapper ).toMatchSnapshot();
	} );
} );
