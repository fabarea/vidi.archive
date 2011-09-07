
/*                                                                        *
 * This script is part of the TYPO3 project.                              *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * This script is distributed in the hope that it will be useful, but     *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHAN-    *
 * TABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General      *
 * Public License for more details.                                       *
 *                                                                        *
 * You should have received a copy of the GNU General Public License      *
 * along with the script.                                                 *
 * If not, see http://www.gnu.org/licenses/gpl.html                       *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */

define([], function(Application) {

	Ext.ns('TYPO3.Vidi.Components.FilterBar.Item.SelectBox');

	Ext.define('TYPO3.Vidi.Components.FilterBar.Item.SelectBox', {
		extend: 'Ext.form.field.ComboBox',
		alias: 'widget.select',

		queryMode: 'local',
		displayField: 'display',
		editable: false,

		forceSelection: true,
		valueField: 'id',
		validateValue: function(value) {
			if (value == "") {
				this.markInvalid("Please Select");
				return false;
			}
			return true;
		}
	});
});