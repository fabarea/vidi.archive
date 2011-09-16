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
define(['Vidi/Core/Application', 'Vidi/Module/UserInterface/BaseModule', 'Vidi/Module/ContentBrowser/ContentBrowserView', 'Vidi/Module/Concept/ConceptTree'], function(Application) {

	console.log("Registering Module Layout");
	
	// Register Layout Module
	Application.registerModule({
		configure: function() {
			
			console.log("Configuring User Interface module");

			TYPO3.TYPO3.Core.Registry.set('vidi/docheader/top', ['btn1', '->', 'btn2'], 1);
			TYPO3.TYPO3.Core.Registry.set('vidi/docheader/bottom', ['->', 'btn'], 1);
			TYPO3.TYPO3.Core.Registry.set('vidi/treeConfig', [{
				xtype: 'TYPO3.Vidi.Module.Concept.Tree',
				title: 'Taxonomy',
				collapsed: false
			}], 1);

			/*TYPO3.TYPO3.Core.Registry.set('vidi/CompononentRegistry', {
				'treeRegion': 'TYPO3.Vidi.Module.ContentBrowser.TreeRegion',
				'mainGrid': 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserGrid'
			});*/
			TYPO3.TYPO3.Core.Registry.set('vidi/DataProviderRegistry/GridData', 'TYPO3.Vidi.Service.ExtDirect.GridData.getRecords');

			TYPO3.TYPO3.Core.Registry.set('vidi/mainModule', {
					xtype: 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView',
					region: 'center',
					id: 'typo3-inner-docbody'
				});

		}
	});
	
		// Register Event
	Application.on(
		'TYPO3.Vidi.Application.run',
		function(e) {
			Ext.ns('TYPO3.Vidi');
			TYPO3.Vidi.Module = Ext.create('TYPO3.Vidi.Module.UserInterface.BaseModule');

		},
		this
	);


});
