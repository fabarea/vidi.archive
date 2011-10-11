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
 * @extends Ext.Panel
 */
Ext.define('TYPO3.Vidi.Module.UserInterface.DocHeader', {
	extend: 'Ext.panel.Panel',
	alias: 'widget.TYPO3.Vidi.Module.UserInterface.DocHeader',

	initComponent: function() {


		var config = {
			xtype: 'panel',
			id: 'typo3-docheader',
			border: false,
			height: 54,
			dockedItems: [{
					xtype: 'toolbar',
					style: {
						backgroundColor: '#585858'
					},
					dock: 'top',
					frame: false,
					items: this._getItems('top')
				} , {

					style: {
						backgroundColor: '#DADADA'
					},
					xtype: 'toolbar',
					dock: 'bottom',
					frame: false,
					items: this._getItems('bottom')

				}]
		}


		Ext.apply(this, config);
		this.callParent(arguments);
	},

	/**
	 * @private
	 * @return {Array} an array items, fetched from the registry.
	 */
	_getItems: function(position) {
		var items, config;

		items = [];
		config = TYPO3.TYPO3.Core.Registry.get('vidi/docheader/' + position);
		Ext.each(config, function(item) {
			if (item == '->') {
				items.push('->');
			}
			else {
				items.push(this._getComponent(item));
			}
		}, this);

		return items;
	},


	/**
	 * @private
	 * @return {Object}
	 */
	_getComponent: function(item) {
		var config = item;

		config = Ext.merge(config, {
			scale: 'small',
			frame: false,
			border: 0,
			renderTpl:
					'<em id="{id}-btnWrap" class="{splitCls}">' +
						'<tpl if="href">' +
							'<a id="{id}-btnEl" href="{href}" target="{target}"<tpl if="tabIndex"> tabIndex="{tabIndex}"</tpl> role="link">' +
								'<span id="{id}-btnInnerEl" class="{baseCls}-inner">&#160</span>' +
									'<span id="{id}-btnIconEl" class="{baseCls}-icon">&#160;</span>' +
							'</a>' +
						'</tpl>' +
						'<tpl if="!href">' +
							'<button id="{id}-btnEl" type="{type}" hidefocus="true"' +
								// the autocomplete="off" is required to prevent Firefox from remembering
								// the button's disabled state between page reloads.
								'<tpl if="tabIndex"> tabIndex="{tabIndex}"</tpl> role="button" autocomplete="off">' +
								'<span id="{id}-btnIconEl" class="{baseCls}-icon {iconCls}">&#160;</span>' +
								'<span id="{id}-btnInnerEl" class="{baseCls}-inner" style="{innerSpanStyle}">&#160</span>' +
							'</button>' +
						'</tpl>' +
					'</em>'
		});
		return Ext.create('Ext.button.Button', config);
	}

});

