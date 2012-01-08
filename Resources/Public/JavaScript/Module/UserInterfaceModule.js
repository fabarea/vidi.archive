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
 * 
 * Register and configure the Module
 * 
 */

console.log("Registering Module Layout");

// Register Layout Module
TYPO3.Vidi.Application.registerModule({
	configure: function() {

		console.log("Configuring User Interface module");

		TYPO3.TYPO3.Core.Registry.set('vidi/docheader/enabled', true, 1);
		TYPO3.TYPO3.Core.Registry.set('vidi/docheader/top', ['->',
			{
				iconCls: 't3-icon t3-icon-actions t3-icon-actions-system t3-icon-system-refresh',
				handler: function() {
					Ext.StoreManager.lookup('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore').load();
				}
			},
			{
				iconCls: 't3-icon t3-icon-actions t3-icon-actions-system t3-icon-system-shortcut-new',
				handler: function() {
					if (top.ShortcutManager !== undefined) {
						var module = TYPO3.TYPO3.Core.Registry.get('vidi/moduleCode');
						top.ShortcutManager.createShortcut('Ich möchte diese Teppich nicht kaufen?', '', module, 'mod.php%3F' + Ext.urlEncode({M: module}));
					}
				}
			}
		], 1);

		TYPO3.TYPO3.Core.Registry.set('vidi/docheader/bottom', [
			{
				iconCls: 't3-icon t3-icon-actions t3-icon-actions-system t3-icon-system-help-open',
				handler: function() {
					if (top.TYPO3 !== undefined && top.TYPO3.ContextHelp !== undefined) {
					}
				}
			}
		], 1);
		TYPO3.TYPO3.Core.Registry.set('vidi/treeConfig', {}, 1);

		TYPO3.TYPO3.Core.Registry.set('vidi/DataProviderRegistry/GridData', 'TYPO3.Vidi.Service.ExtDirect.GridData.getRecords');

		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule', {
				xtype: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView',
				region: 'center',
				id: 'typo3-inner-docbody'
			});


		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/filterBar/hidden', false);
		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/gridToolbar', 'Vidi-GridToolbar');
		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/collectionManagement/enabled', true);
		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Static', 'TYPO3.Vidi.Service.ExtDirect.CollectionManagement');
		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/collectionManagement/ExtDirectEndPoints/Filter', 'TYPO3.Vidi.Service.ExtDirect.FilterManagement');
		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule/collectionManagement/xtype', 'TYPO3-Vidi-View-Collection-ListPanel');
	}
});

	// Register Event
TYPO3.Vidi.Application.on(
	'TYPO3.Vidi.Application.run',
	function() {
		Ext.ns('TYPO3.Vidi');
		console.log('start');
		TYPO3.Vidi.Module = Ext.create('TYPO3.Vidi.Module.UserInterface.BaseModule');
		Ext.data.StoreManager.each(function(item) {
			if(item.proxy.type = 'direct') {
				item.load();
			}
		});
	}
);
