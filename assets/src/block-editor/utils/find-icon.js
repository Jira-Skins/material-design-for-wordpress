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
 * External dependencies
 */
import { icons as rawIcons } from '!!json-loader!material-design-icons/iconfont/MaterialIcons-Regular.ijmap';

/**
 * Search and find a material icon by name.
 *
 * @param {string} iconName The icon to search for.
 */
export default iconName => {
	const icons = Object.keys( rawIcons );

	const foundIcon = icons.find(
		icon => rawIcons[ icon ].name.toLowerCase() === iconName.toLowerCase()
	);

	return foundIcon ? { name: iconName, hex: parseInt( foundIcon, 16 ) } : null;
};
