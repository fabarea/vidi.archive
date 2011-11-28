Ext.ns("TYPO3.Vidi.Module.ContentBrowser");

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
 * @class TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid
 *
 * The outermost user interface component.
 *
 * @namespace TYPO3.Vidi.Module.ContentBrowser
 * @extends Ext.Panel
 */
Ext.define('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid', {

	/**
	 * The Component being extended
	 *
	 * @cfg {String}
	 */
	extend: 'Ext.grid.Panel',

	/**
	 * The Alias of the Component - "xtype"
	 *
	 * @cfg {String}
	 */
	alias: 'widget.TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid',

	/**
	 * The store
	 *
	 * @type {Object}
	 */
	store: null,

	border: 0,
	
	/**
	 * The selection type
	 *
	 * @cfg {String}
	 */
	selType: 'checkboxmodel',
	selModel: {
		allowDeselect: true,
		checkOnly: true,
		mode: 'SIMPLE'
	},

	win: null,
	loadMask: true,
	disableSelection: false,
	invalidateScrollerOnRefresh: false,
	enableDragDrop   : true,
	stripeRows       : true,
	
	dockedItems: [
		{
			store: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore',   // same store GridPanel is using
			dock: 'bottom'
	}],
	viewConfig: {
		plugins: {
			ddGroup: 'GridData',
			ptype: 'gridviewdragdrop',
			enableDrop: false
		}
	},
	/**
	 * Initializer
	 */
	initComponent: function() {
		this.dockedItems[0].xtype = TYPO3.TYPO3.Core.Registry.get('vidi/mainModule/gridToolbar');
		console.log('start ContentBrowserGridVIew');
				// Initialize the store
		this._initStore();

		// Default configuration
		var config = {
			store: this.store,
			columns: TYPO3.TYPO3.Core.Registry.get('vidi/columnConfiguration')[TYPO3.TYPO3.Core.Registry.get('vidi/currentTable')]
		};

		Ext.apply(this, config);
		this.callParent();
	},


	/**
	 * When object is rendered
	 *
	 * @access public
	 * @method onRender
	 * @return void
	 */
	onRender: function() {
		this.callParent(arguments);
	},


	/**
	 * Initialize the store
	 *
	 * @access private
	 * @method _initStore
	 * @return void
	 */
	_initStore: function() {
		this.store = Ext.create('Ext.data.Store', {
			storeId: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore',
			buffered: true,
			pageSize: 20,
			idProperty: 'uid',
			autoLoad: false,
			proxy: {
				type: 'direct',
				api: {
					read: eval(TYPO3.TYPO3.Core.Registry.get('vidi/DataProviderRegistry/GridData'))
				},
				extraParams: {
					'moduleCode': TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode'),
					'query': ''
				},
				reader: {
					type: 'json',
					root: 'data',
					totalProperty: 'total'
				},
				simpleSortMode: false
			},
			remoteFilter: true,
			remoteSort: true,
			fields: TYPO3.TYPO3.Core.Registry.get('vidi/fieldConfiguration')[TYPO3.TYPO3.Core.Registry.get('vidi/currentTable')]
		});
	}
});
