"use strict";

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
define(['Vidi/Core/Application', 'Vidi/Core/Registry', 'Vidi/Module/UserInterface/Layout'], function(Application, Registry) {

	console.log("Registering Module Layout");
	
	// Register Layout Module
	Application.registerModule({
		configure: function() {
			
			console.log("Configuring User Interface module");
			Registry.set('docheader/top', ['button1', '->', 'button2']);
			Registry.set('docheader/bottom', ['button3', 'button4']);
			
			Registry.set('layout', 'TYPO3.Vidi.Module.ContentBrowser.ContentBrowserView', {title: 'asdf'});

			//Registry.set('layout', 'bar');
			//Registry.set('layout', 'baz');

			// append vs set
			Registry.append("menu/main", 'edit', {title: 'Edit'});


			
			
			Registry.set('form/editor', {
				// By type
				'string': {
					xtype: 'textfield'
				},
				'superStringEditor': {
					xtype: 'textarea',
					transform: function(a) { }
				}
			});

		}
	});
	
	// Register Event
	Application.on(
		'TYPO3.Vidi.Application.afterBootstrap',
		function(e) {
			TYPO3.Vidi.Module.UserInterface.doc = new TYPO3.Vidi.Module.UserInterface.Layout();
		},
		this
	);


});
