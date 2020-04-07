/**
 * External dependencies
 */
import Masonry from 'react-masonry-css';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { useEffect, useRef, useState } from '@wordpress/element';
import { IconButton } from '@wordpress/components';

/**
 * Internal dependencies
 */
import CardsCollectionInspectorControls from './components/cards-collection-inspector-controls';
import './editor.css';
import { CARD_ATTRIBUTES_VALUE } from './constants';
import VerticalCardLayout from '../card/components/vertical-card-layout';
import HorizontalCardLayout from '../card/components/horizontal-card-layout';
import { __, sprintf } from '@wordpress/i18n';

/**
 * @param {Object} props - Component props.
 * @param {number} props.cardIndex - Card index.
 * @param {number} props.numberOfCards - Total number of cards.
 * @param {Function} props.onMoveLeft - Move card left handler.
 * @param {Function} props.onMoveRight - Move card right handler.
 * @param {Function} props.onRemove - Remove card  handler.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const FocusedCardActions = ( {
	cardIndex,
	numberOfCards,
	onMoveLeft,
	onMoveRight,
	onRemove,
} ) => {
	return (
		<div className="card-container-actions">
			<IconButton
				className="mtb-card-buttons"
				icon="arrow-left"
				label={ __( 'Move left', 'material-theme-builder' ) }
				onClick={ onMoveLeft }
				disabled={ cardIndex === 0 }
			/>
			<IconButton
				className="mtb-card-buttons"
				icon="arrow-right"
				label={ __( 'Move right', 'material-theme-builder' ) }
				onClick={ onMoveRight }
				disabled={ numberOfCards === cardIndex + 1 }
			/>
			<span className="card-number-title">
				{ sprintf( __( 'Card #%d', 'material-theme-builder' ), cardIndex + 1 ) }{ ' ' }
			</span>
			<IconButton
				className="mtb-card-buttons mtb-card-close-button"
				icon="no"
				label={ __( 'Remove card', 'material-theme-builder' ) }
				onClick={ onRemove }
			/>
		</div>
	);
};

/**
 * Card Collections Edit component.
 *
 * @param {Object} props - Component props.
 *
 * @return {Function} Function returning the HTML markup for the component.
 */
const Edit = props => {
	const { attributes, setAttributes, className } = props;
	const { style, columns } = attributes;

	let columnSpan = 12;

	if ( style === 'grid' ) {
		/*
		 * This works well for the design if we have a maximum of 4 columns. It would not work
		 * so well for 5 and 7 columns for example. Something to keep in mind if the max number of columns
		 * increase above 4.
		 */
		columnSpan = Math.floor( 12 / columns );
	}

	const { cardsProps, numberOfCards } = attributes;

	const items = [];

	/**
	 * @param {string} attributeName - Attribute name.
	 * @param {string} attributeValue - Attribute value.
	 * @param {number} cardIndex - Card index
	 */
	const setter = ( attributeName, attributeValue, cardIndex ) => {
		const newCardsProps = [ ...cardsProps ];

		if (
			typeof newCardsProps[ cardIndex ] !== 'undefined' &&
			newCardsProps[ cardIndex ][ attributeName ] !== 'undefined'
		) {
			newCardsProps[ cardIndex ][ attributeName ] = attributeValue;
		}

		setAttributes( {
			cardsProps: newCardsProps,
		} );
	};

	const [ cardsFocus, setCardsFocus ] = useState( [] );

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardFocus = cardIndex => {
		const newCardFocus = cardsFocus.map( () => {
			return false;
		} );
		newCardFocus[ cardIndex ] = true;
		setCardsFocus( newCardFocus );
	};

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardMoveLeft = cardIndex => {
		const newCardsProps = [ ...cardsProps ];
		if ( cardIndex > 0 ) {
			const card = newCardsProps[ cardIndex ];
			newCardsProps[ cardIndex ] = newCardsProps[ cardIndex - 1 ];
			newCardsProps[ cardIndex - 1 ] = card;
			setAttributes( {
				cardsProps: newCardsProps,
			} );
			setCardsFocus( [] );
		}
	};

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardMoveRight = cardIndex => {
		const newCardsProps = [ ...cardsProps ];
		if ( cardIndex < newCardsProps.length - 1 ) {
			const card = newCardsProps[ cardIndex ];
			newCardsProps[ cardIndex ] = newCardsProps[ cardIndex + 1 ];
			newCardsProps[ cardIndex + 1 ] = card;
			setAttributes( {
				cardsProps: newCardsProps,
			} );
			setCardsFocus( [] );
		}
	};

	/**
	 * @param {number} cardIndex - Card index.
	 */
	const onCardRemove = cardIndex => {
		const newCardsProps = [ ...cardsProps ];
		newCardsProps.splice( cardIndex, 1 );
		setAttributes( {
			cardsProps: newCardsProps,
			numberOfCards: numberOfCards - 1,
		} );
		setCardsFocus( [] );
	};

	for ( let cardIndex = 0; cardIndex < numberOfCards; cardIndex++ ) {
		let baseProps = { ...CARD_ATTRIBUTES_VALUE };
		let cardsPropsHasIncreased = false;
		if ( numberOfCards <= cardsProps.length ) {
			baseProps = { ...cardsProps[ cardIndex ] };
		} else {
			cardsProps.push( { ...CARD_ATTRIBUTES_VALUE } );
			cardsPropsHasIncreased = true;
		}

		if ( cardsPropsHasIncreased ) {
			const newCardsProps = [ ...cardsProps ];

			setAttributes( {
				cardsProps: newCardsProps,
			} );
		}

		const cardProps = {
			cardIndex,
			setAttributes,
			setter,
			isEditMode: true,
			...baseProps,
		};

		if ( style === 'grid' || style === 'list' ) {
			items.push(
				<div
					key={ cardIndex }
					data-card-index={ cardIndex }
					className={ classnames(
						'card-container',
						{
							'card-container-focused':
								cardsFocus[ cardIndex ] !== undefined
									? cardsFocus[ cardIndex ]
									: false,
						},
						`mdc-layout-grid__cell--span-${ columnSpan }`
					) }
					onFocus={ () => onCardFocus( cardIndex ) }
				>
					{ style === 'grid' && <VerticalCardLayout { ...cardProps } /> }
					{ style === 'list' && <HorizontalCardLayout { ...cardProps } /> }
					{ cardsFocus[ cardIndex ] !== undefined &&
						cardsFocus[ cardIndex ] && (
							<FocusedCardActions
								cardIndex={ cardIndex }
								numberOfCards={ numberOfCards }
								onMoveLeft={ () => onCardMoveLeft( cardIndex ) }
								onMoveRight={ () => onCardMoveRight( cardIndex ) }
								onRemove={ () => onCardRemove( cardIndex ) }
							/>
						) }
				</div>
			);
		} else {
			items.push(
				<div
					key={ cardIndex }
					data-card-index={ cardIndex }
					className={ classnames( 'card-container', {
						'card-container-focused':
							cardsFocus[ cardIndex ] !== undefined
								? cardsFocus[ cardIndex ]
								: false,
					} ) }
					onFocus={ () => onCardFocus( cardIndex ) }
				>
					<VerticalCardLayout { ...cardProps } />
					{ cardsFocus[ cardIndex ] !== undefined &&
						cardsFocus[ cardIndex ] && (
							<FocusedCardActions
								cardIndex={ cardIndex }
								numberOfCards={ numberOfCards }
								onMoveLeft={ () => onCardMoveLeft( cardIndex ) }
								onMoveRight={ () => onCardMoveRight( cardIndex ) }
								onRemove={ () => onCardRemove( cardIndex ) }
							/>
						) }
				</div>
			);
		}
	}

	const inspectorControlsProps = {
		...props,
	};

	const isInitialMount = useRef( true );

	/**
	 * Handle the click outside a card to remove the focus highlight on all cards.
	 *
	 * @param {Object} event - Click event.
	 */
	const handleClickOutsideCard = event => {
		const cardContainer = event.target.closest( '.card-container' );
		if ( ! cardContainer ) {
			setCardsFocus( [] );
		}
	};

	useEffect( () => {
		document.addEventListener( 'click', handleClickOutsideCard, true );
		return () => {
			document.removeEventListener( 'click', handleClickOutsideCard, true );
		};
	} );

	useEffect(
		() => {
			if ( isInitialMount.current ) {
				isInitialMount.current = false;
			} else {
				const newCardsProps = [ ...cardsProps ];
				for ( let index = 0; index < newCardsProps.length; index++ ) {
					newCardsProps[ index ].contentLayout = attributes.contentLayout;
					newCardsProps[ index ].cornerRadius = attributes.cornerRadius;
					newCardsProps[ index ].outlined = attributes.outlined;
					newCardsProps[ index ].displayTitle = attributes.displayTitle;
					newCardsProps[ index ].displaySecondaryText =
						attributes.displaySecondaryText;
					newCardsProps[ index ].displayImage = attributes.displayImage;
					newCardsProps[ index ].displaySupportingText =
						attributes.displaySupportingText;
					newCardsProps[ index ].displayActions = attributes.displayActions;
					newCardsProps[ index ].displaySecondaryActionButton =
						attributes.displaySecondaryActionButton;
				}
				setAttributes( {
					cardsProps: newCardsProps,
				} );
			}
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[
			attributes.contentLayout,
			attributes.cornerRadius,
			attributes.outlined,
			attributes.displayTitle,
			attributes.displaySecondaryText,
			attributes.displayImage,
			attributes.displaySupportingText,
			attributes.displayActions,
			attributes.displaySecondaryActionButton,
		]
	);

	inspectorControlsProps.attributes.setter = setter;

	return (
		<>
			<CardsCollectionInspectorControls { ...inspectorControlsProps } />
			<div className={ className }>
				{ ( style === 'grid' || style === 'list' ) && (
					<div className={ `mdc-layout-grid layout-${ style }` }>
						<div className="mdc-layout-grid__inner">{ items }</div>
					</div>
				) }

				{ style === 'masonry' && (
					<Masonry
						breakpointCols={ columns }
						className={ `masonry-grid layout-${ style }` }
						columnClassName="masonry-grid_column"
					>
						{ items }
					</Masonry>
				) }
			</div>
		</>
	);
};

export default Edit;
