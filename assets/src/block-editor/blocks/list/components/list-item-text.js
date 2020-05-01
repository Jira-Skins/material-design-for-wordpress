const ListItemText = ( {
	primaryText,
	secondaryText,
	editable = false,
	onEnterPrimary,
	onBlurPrimary,
	onEnterSecondary,
	onBlurSecondary,
} ) => {
	const Label = ( { children, className } ) =>
		editable ? (
			<span
				className={ className }
				role={ editable ? 'textbox' : undefined }
				tabIndex={ editable ? 0 : undefined }
				contentEditable={ editable }
				suppressContentEditableWarning={ editable }
				onKeyPress={ onEnterPrimary }
				onBlur={ onBlurPrimary }
			>
				{ children }
			</span>
		) : (
			<span className={ className }>{ children }</span>
		);

	if ( ! secondaryText ) {
		return (
			<Label className="mdc-list-item__text list-item__text">
				{ primaryText }
			</Label>
		);
	}

	const contentEditable = editable ? { contentEditable: true } : {};

	return (
		<span className="mdc-list-item__text">
			<Label className="mdc-list-item__primary-text list-item__text">
				{ primaryText }
			</Label>

			<span
				className="mdc-list-item__secondary-text list-item__text"
				role={ editable ? 'textbox' : undefined }
				tabIndex={ editable ? 0 : undefined }
				suppressContentEditableWarning={ editable }
				onKeyPress={ onEnterSecondary }
				onBlur={ onBlurSecondary }
				{ ...contentEditable }
			>
				{ secondaryText }
			</span>
		</span>
	);
};

export default ListItemText;
