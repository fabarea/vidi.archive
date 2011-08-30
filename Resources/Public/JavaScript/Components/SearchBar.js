"use strict";

Ext.ns("TYPO3.Vidi.Components");
	
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
define(['Vidi/Core/Application'], function(Application) {

	/**
	 * @class TYPO3.Vidi.Components.SearchBar
	 * 
	 * A versatile Search bar
	 * 
	 * @namespace TYPO3.Vidi.Components
	 * @extends Ext.form.field.Text
	 */
	Ext.define('TYPO3.Vidi.Components.SearchBar', {
		
		/**
		 * The Component being extended
		 *
		 * @cfg {String}
		 */
		extend: 'Ext.form.field.TextArea',
		
		/**
		 * The Alias of the Component - "xtype" 
		 *
		 * @cfg {String}
		 */
		alias: 'widget.TYPO3.Vidi.Components.SearchBar',

		/**
		 * Initializer
		 */
		initComponent: function() {
			
			// Default configuration
			var config = {
				
				name: 'name',
				grow: true,
				anchor: '100%',
				emptyText: 'Click here to start searching...'
			};
	
			Ext.apply(this, config);
			TYPO3.Vidi.Components.SearchBar.superclass.initComponent.call(this);
		},
		
		onRender:function(ct, position) {
			TYPO3.Vidi.Components.SearchBar.superclass.onRender.call(this, ct, position);

//			this.el.removeClass('x-form-text');
			this.el.className = 'maininput';
			this.el.setWidth(20);

			this.holder = this.el.wrap({
				'tag': 'ul',
				'class':'holder x-form-text'
			});

			this.holder.on('click', function(e){
				e.stopEvent();
				if(this.maininput != this.current) this.focus(this.maininput);
			}, this);

			this.maininput = this.el.wrap({
				'tag': 'li', 'class':'bit-input'
			});

//			Ext.apply(this.maininput, {
//				'focus': function(){
//					this.focus();
//				}.createDelegate(this)
//			})
//
//			this.store.on('datachanged', function(store){
//				this.store.each(function(rec){
//					if(this.checkValue(rec.data[this.valueField])){
//						this.removedRecords[rec.data[this.valueField]] = rec;
//						this.store.remove(rec);
//					}
//				}, this);
//			}, this);
//
//			this.on('expand', function(store){
//				this.store.each(function(rec){
//					if(this.checkValue(rec.data[this.valueField])){
//						this.removedRecords[rec.data[this.valueField]] = rec;
//						this.store.remove(rec);
//					}
//				}, this);
//			}, this);
//
//			this.removedRecords = {};
		}
		
		
	});
});

