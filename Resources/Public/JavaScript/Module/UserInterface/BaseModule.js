Ext.ns("TYPO3.Vidi.Module.UserInterface");

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


/**
 * @class TYPO3.Vidi.Module.UserInterface.DocHeader
 *
 * The outermost user interface component.
 *
 * @namespace TYPO3.Vidi.Module.UserInterface
 * @extends Ext.Viewport
 */
TYPO3.Vidi.Module.UserInterface.BaseModule = Ext.extend(Ext.Viewport, {

	initComponent: function() {

		var config = {
			renderTo: 'typo3-mod-php',
			layout:'border',
			cls: 'typo3-fullDoc',
			items: [
				this._docHeader,
				TYPO3.TYPO3.Core.Registry.get('vidi/mainModule')
			]
		};

		Ext.apply(this, config);
		this.callParent();
	},

	/**
	 * default items
	 * @private
	 */
	_docHeader: {
		region: 'north',
		xtype: 'TYPO3.Vidi.Module.UserInterface.DocHeader'
	}
});

