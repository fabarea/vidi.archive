"use strict";

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
define(['Vidi/Core/Application'], function(Application) {

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
win:null,
		/**
		 * Initializer
		 */
		initComponent: function() {
			
			// Initialize the store
			this._initStore();
			
			// Default configuration
			var config = {
				store: this.store,
				columns: [
					{header: 'Title',  dataIndex: 'title', flex: 1}
				],
				height: 200,
				width: '100%'
			};

			Ext.apply(this, config);
			TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid.superclass.initComponent.call(this);
			Application.fireEvent('TYPO3.Taxonomy.ConceptTree.afterInit', this);
		},


		/**
		 * When object is rendered
		 *
		 * @access public
		 * @method onRender
		 * @return void
		 */
		onRender: function() {
			this.store.load({
				callback: function() {
					console.log(this.getCount());
				}
			});
			TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid.superclass.onRender.apply(this, arguments);
		},


		_getCommand: function() {

		return {
			xtype: 'actioncolumn',
			header: 'Actions',
			width: 70,
			hideable: false,
	//		hidden: (TYPO3.settings.Workspaces.allView === '1'),
			menuDisabled: true,
			items: [
	//			{
	//				iconCls:'t3-icon t3-icon-actions t3-icon-actions-version t3-icon-version-workspace-preview'
	//				,tooltip: TYPO3.lang["tooltip.viewElementAction"]
	//				,handler: function(grid, rowIndex, colIndex) {
	//					var record = TYPO3.Workspaces.MainStore.getAt(rowIndex);
	//					TYPO3.Workspaces.Actions.viewSingleRecord(record.json.table, record.json.uid);
	//				},
	//				getClass: function(v, meta, rec) {
	//					if(!rec.json.allowedAction_view) {
	//						return 'icon-hidden';
	//					} else {
	//						return '';
	//					}
	//				}
	//			},
				{
					iconCls:'t3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-open',
					tooltip: TYPO3.lang["tooltip.editElementAction"],
					handler: function(grid, rowIndex, colIndex) {


						// Basic request in Ext
						Ext.Ajax.request({
							//var newUrl = 'alt_doc.php?returnUrl=mod.php&M=web_list&id=51&edit[tt_content][210]=edit';
							url: 'alt_doc.php',
							params: {
								'edit[tt_content][210]': 'edit'
							},
							success: function(result, request){
								console.log( "Data Saved: " + result );
								var frmConfirm = new TYPO3.Taxonomy.UserInterface.ConfirmWindow({
									content: result
	//								title: confirmTitle,
	//								records: records,
	//								tables: tables,
	//								confirmText: confirmText,
	//								confirmQuestion: confirmQuestion,
	//								hideRecursive: hideRecursive,
	//								recursiveCheckbox: recursiveCheckbox,
	//								arePagesAffected: arePagesAffected,
	//								command: command
								}).show();
							}
						});
	//					var record = TYPO3.Workspaces.MainStore.getAt(rowIndex);
	//					var newUrl = 'alt_doc.php?returnUrl=' + Ext.urlEncode({}, document.location.href).replace("?","%3F").replace("=", "%3D").replace(":","%3A").replace("/", "%2f") + '&id=' + TYPO3.settings.Workspaces.id + '&edit[' + record.json.table + '][' + record.json.uid + ']=edit';
						//var newUrl = 'alt_doc.php?returnUrl=mod.php&M=web_list&id=51&edit[tt_content][210]=edit';
						//window.location.href = newUrl;
					},
					getClass: function(v, meta, rec) {
						if(!rec.json.allowedAction_edit) {
							return 'icon-hidden';
						} else {
							return '';
						}
					}
				}
	//			{
	//				iconCls:'t3-icon t3-icon-actions t3-icon-actions-system t3-icon-system-pagemodule-open',
	//				tooltip: TYPO3.lang["tooltip.openPage"],
	//				handler: function(grid, rowIndex, colIndex) {
	//					var record = TYPO3.Workspaces.MainStore.getAt(rowIndex);
	//					if (record.json.table == 'pages') {
	//						top.loadEditId(record.json.t3ver_oid);
	//					} else {
	//						top.loadEditId(record.json.livepid);
	//					}
	//				},
	//				getClass: function(v, meta, rec) {
	//					if(!rec.json.allowedAction_editVersionedPage || !top.TYPO3.configuration.pageModule) {
	//						return 'icon-hidden';
	//					} else {
	//						return '';
	//					}
	//				}
	//			},
	//			{
	//				iconCls:'t3-icon t3-icon-actions t3-icon-actions-version t3-icon-version-document-remove',
	//				tooltip: TYPO3.lang["tooltip.discardVersion"],
	//				handler: function(grid, rowIndex, colIndex) {
	//					var record = TYPO3.Workspaces.MainStore.getAt(rowIndex);
	//					var configuration = {
	//						title: TYPO3.lang["window.discard.title"],
	//						msg: TYPO3.lang["window.discard.message"],
	//						fn: function(result) {
	//							if (result == 'yes') {
	//								TYPO3.Workspaces.Actions.deleteSingleRecord(record.json.table, record.json.uid);
	//							}
	//						}
	//					};
	//
	//					top.TYPO3.Dialog.QuestionDialog(configuration);
	//				},
	//				getClass: function(v, meta, rec) {
	//					if(!rec.json.allowedAction_delete) {
	//						return 'icon-hidden';
	//					} else {
	//						return '';
	//					}
	//				}
	//			}
			]};
		},
		
		/**
		 * Initialize the store
		 *
		 * @access private
		 * @method _initStore
		 * @return void
		 */
		_initStore: function() {
			
			this.store = Ext.create('Ext.data.DirectStore', {
				storeId: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore',
				directFn: TYPO3.Vidi.Service.ExtDirect.Controller.ContentController.getRecords,
				idProperty: 'uid',
				root: 'data',
				totalProperty: 'total',
				fields:[
					{name:'uid', type: 'int'},
					{name:'title'}
	//				{name:'lastuploaddate', type: 'date', dateFormat: 'timestamp'},
				],
				paramNames: {
					start : 'start',
					limit : 'limit',
					sort : 'sort',
					dir : 'dir',
					query: 'query'
				},
				baseParams: {
					query: '',
					repository: 1,
					start: 0,
					limit: 50

				},
				remoteSort: true,
				sortInfo:{
					field:'title',
					direction:"ASC"
				}
	//			listeners: {
	//				beforeload: function(store, records){
	//					var control = Ext.getCmp('rsearchField');
	//					if (control.getValue == '') {
	//						return false;
	//					}
	//					store.setBaseParam('rep', Ext.getCmp('repCombo').getValue());
	//					store.setBaseParam('installedOnly', this.showInstalledOnly);
	//					if (!this.showInstalledOnly) {
	//						this.filterMenuButton.removeClass('bold');
	//					} else {
	//						this.filterMenuButton.addClass('bold');
	//					}
	//
	//				},
	//				load: function(store, records){
	//					var hasFilters = false;
	//					TYPO3.EM.RemoteFilters.filters.each(function (filter) {
	//						if (filter.active) {
	//							hasFilters = true;
	//						}
	//					});
	//					if (hasFilters) {
	//						this.doClearFilters.show();
	//					} else {
	//						this.doClearFilters.hide();
	//					}
	//					if (records.length === 0) {
	//
	//					} else {
	//
	//					}
	//				},
	//				scope: this
	//			},
	//			highlightSearch: function(value) {
	//				var control = Ext.getCmp('rsearchField');
	//				if (control) {
	//					var filtertext = control.getRawValue();
	//					if (filtertext) {
	//						var re = new RegExp(Ext.escapeRe(filtertext), 'gi');
	//						var result = re.exec(value) || [];
	//						if (result.length) {
	//							return value.replace(result[0], '<span class="filteringList-highlight">' + result[0] + '</span>');
	//						}
	//					}
	//				}
	//				return value;
	//			}
	//
			}
			);
				
		},

		test: function() {
			var win = this.win || {};
			if(!win){
				win = new Ext.Window({
					applyTo:'hello-win',
					layout:'fit',
					width:500,
					height:300,
					closeAction:'hide',
					plain: true,
					modal: true,

					items: new Ext.TabPanel({
						applyTo: 'hello-tabs',
						autoTabs:true,
						activeTab:0,
						deferredRender:false,
						border:false
					})

	//                buttons: [{
	//                    text:'Submit',
	//                    disabled:true
	//                },{
	//                    text: 'Close',
	//                    handler: function(){
	//                        win.hide();
	//                    }
	//                }]
				});
			}
			win.show(this);

		}
	});
});
