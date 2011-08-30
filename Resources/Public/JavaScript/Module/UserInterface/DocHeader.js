"use strict";

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
define(['Vidi/Core/Application', 'Vidi/Core/Registry', 'Vidi/Module/UserInterface/Layout'], function(Application, Registry, Layout) {

	/**
	 * @class TYPO3.Vidi.Module.UserInterface.DocHeader
	 * 
	 * The outermost user interface component.
	 * 
	 * @namespace TYPO3.Vidi.Module.UserInterface
	 * @extends Ext.Panel
	 */
	Ext.define('TYPO3.Vidi.Module.UserInterface.DocHeader', {
		extend: 'Ext.Panel',
		alias: 'widget.TYPO3.Vidi.Module.UserInterface.DocHeader',

		initComponent: function() {


			var config = {
				xtype: 'panel',
				id: 'typo3-docheader',
				border: false,
				height: 54,
				dockedItems: [{
						xtype: 'toolbar',
						// @todo: put that into class
						style: {
							backgroundColor: '#585858',
						},
						dock: 'top',
						items: this._getItems('top')
					} , {

						// @todo: put that into class
						style: {
							backgroundColor: '#DADADA',
						},
						xtype: 'toolbar',
						dock: 'bottom',
						items: this._getItems('bottom')

					}]
			}
			
		
			Ext.apply(this, config);
			TYPO3.Vidi.Module.UserInterface.DocHeader.superclass.initComponent.call(this);
		},
		
		/**
		 * @private
		 * @return {Array} an array items, fetched from the registry.
		 */
		_getItems: function(position) {
			var items, config;
			
			items = [];
			config = Registry.get('docheader/' + position);
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
			var configuration;
			
			configuration = {
//				text: 'Action menu',
//				menu: [action] // Add the action directly to a menu
			};
			
			configuration = Ext.create('Ext.Action', {
				text: item,
				iconCls: 'icon-add',
				handler: function(){
					//Ext.example.msg('Click', 'You clicked on "Action 1".');
					console.log(item)
				}
			});
			
			return configuration;
		}

	});
	
});

