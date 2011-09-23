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

		TYPO3.TYPO3.Core.Registry.set('vidi/docheader/top', ['btn1', '->', 'btn2'], 1);
		TYPO3.TYPO3.Core.Registry.set('vidi/docheader/bottom', ['->', 'btn'], 1);
		TYPO3.TYPO3.Core.Registry.set('vidi/treeConfig', {}, 1);

		TYPO3.TYPO3.Core.Registry.set('vidi/DataProviderRegistry/GridData', 'TYPO3.Vidi.Service.ExtDirect.GridData.getRecords');

		TYPO3.TYPO3.Core.Registry.set('vidi/mainModule', {
				xtype: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView',
				region: 'center',
				id: 'typo3-inner-docbody'
			});
	}
});

	// Register Event
TYPO3.Vidi.Application.on(
	'TYPO3.Vidi.Application.run',
	function() {
		Ext.ns('TYPO3.Vidi');
		TYPO3.Vidi.Module = Ext.create('TYPO3.Vidi.Module.UserInterface.BaseModule');
		Ext.data.StoreManager.each(function(item) {
			if(item.proxy.type = 'direct') {
				item.load();
			}
		});
	}
);
