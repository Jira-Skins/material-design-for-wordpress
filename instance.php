<?php
/**
 * Copyright 2020 Material Design
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
 * 
 * @package MaterialThemeBuilder
 */

/**
 * Instantiates the Material Theme Builder plugin
 *
 * @package MaterialThemeBuilder
 */

namespace MaterialThemeBuilder;

global $material_theme_builder_plugin;

require_once __DIR__ . '/php/class-plugin-base.php';
require_once __DIR__ . '/php/class-plugin.php';

$material_theme_builder_plugin = new Plugin();

/**
 * Material Theme Builder Plugin Instance
 *
 * @return Plugin
 */
function get_plugin_instance() {
	global $material_theme_builder_plugin;
	return $material_theme_builder_plugin;
}
