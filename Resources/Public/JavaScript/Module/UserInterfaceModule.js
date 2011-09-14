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
define(['Vidi/Core/Application', 'Vidi/Core/Registry', 'Vidi/Module/UserInterface/Layout', 'Vidi/Module/ContentBrowser/ContentBrowserView', 'Vidi/Module/Concept/ConceptTree'], function(Application, Registry) {

	console.log("Registering Module Layout");
	
	// Register Layout Module
	Application.registerModule({
		configure: function() {
			
			console.log("Configuring User Interface module");
			Registry.set('docheader/top', ['btn1', '->', 'btn2']);
			Registry.set('docheader/bottom', ['->', 'btn']);
			
			Registry.set('layout', ['TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView', {title: 'asdf'}]);

		}
	});
	
		// Register Event
	Application.on(
		'TYPO3.Vidi.Application.afterBootstrap',
		function(e) {
			Ext.ns('TYPO3.Vidi');
			console.log(TYPO3.Vidi.Module.UserInterface.Layout);
			TYPO3.Vidi.Module = Ext.create('TYPO3.Vidi.Module.UserInterface.Layout');
			console.log('Application startet');
		},
		this
	);


});
