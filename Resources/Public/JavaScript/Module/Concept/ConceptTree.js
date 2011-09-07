"use strict";

Ext.ns("TYPO3.Vidi.Module.Concept");
	
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
define(['Vidi/Core/Application', 'Taxonomy/Module/Concept/ConceptTree'], function(Application) {
	
	/**
	 * @class TYPO3.Vidi.Module.Concept.Tree
	 * 
	 * The tree of Concepts
	 * 
	 * @namespace TYPO3.Vidi.Module.Concept
	 * @extends Ext.tree.TreePanel
	 */
	TYPO3.Vidi.Module.Concept.Tree = Ext.define('TYPO3.Vidi.Module.Concept.Tree', {

		/**
		 * The Component being extended
		 *
		 * @cfg {String}
		 */
		extend: 'TYPO3.Taxonomy.Module.Concept.Tree',
		
		/**
		 * The Alias of the Component - "xtype" 
		 *
		 * @cfg {String}
		 */
		alias: 'widget.TYPO3.Vidi.Module.Concept.Tree',
		
		/**
		 * Initializes the component
		 *
		 * @return {void}
		 */
		initComponent: function() {

			var config = {
				
			};
			this.on(
				'itemclick',
				this.onItemClick,
				this,
				{delay: 400}
			);


			Ext.apply(this, config);
			TYPO3.Vidi.Module.Concept.Tree.superclass.initComponent.call(this);

		},
		
		 /**
		 * Action when leaf is clicked
		 *
		 * single click handler that only triggers after a delay to let the double click event
		 * a possibility to be executed (needed for label edit)
		 * 
		 * @param {Ext.view.View} this
		 * @param {Ext.data.Model} record The record that belongs to the item
		 * @param {HTMLElement} item The item's element
		 * @param {Number} index The item's index
		 * @param {Ext.EventObject} e The raw event object
		 */
		onItemClick: function(view, model, htmlElement, number, event) {
			console.log('Hello Steffen! This should add a Filter Criteria in the Filter Bar');
		}
	});
});
