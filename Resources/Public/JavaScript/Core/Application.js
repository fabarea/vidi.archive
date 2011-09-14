"use strict";

Ext.ns("TYPO3.Vidi.Core");

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
define(['Vidi/Core/Registry'], function(Registry) {
	
	/**
	 * @class TYPO3.Vidi.Core.Application
	 *
	 * The main entry point which controls the lifecycle of the application.
	 *
	 * This is the main event handler of the application.
	 *
	 * @namespace TYPO3.Vidi.Core
	 * @extends Ext.util.Observable
	 * @singleton
	 */
	TYPO3.Vidi.Application = Ext.apply(new Ext.util.Observable(), {

		/**
		 * List of all modules which have been registered
		 * @private
		 */
		_modules: [],

		registerModule: function(module) {
			this._modules.push(module);
		},

		initialize: function() {
			Registry.initialize();

			for (var i in this._modules) {
				this._modules[i].configure();
			}
			Registry.compile();

			Ext.QuickTips.init();
			this.fireEvent('TYPO3.Vidi.Application.afterBootstrap');
		},
		processModuleAdaption: function(callback) {
			callback(Registry);
			this.fireEvent('TYPO3.Vidi.Application.afterModuleAdaption');
		},
		run: function() {
			if (console.log) {
				console.log("Running Application");
			}
			this.fireEvent('TYPO3.Vidi.Application.run');
		},


		/**
		 * Hides the loading message of the application
		 *
		 */
		_registerEventBeforeLoading: function() {
			this.on(
				'TYPO3.Vidi.Application.busy',
				function() {
					Ext.get('loading-mask').setStyle({
						visibility: 'visible',
						top: 0,
						left: 0,
						width: '100%',
						height: '100%',
						opacity: 0.4
					});
					Ext.get('loading').setStyle({
						visibility: 'visible',
						opacity: 1
					});
				},
				this
			);
		},
		/**
		 * Hides the loading message of the application
		 *
		 */
		_registerEventAfterLoading: function() {
			this.on(
				'TYPO3.Vidi.Application.afterbusy',
				function() {
					var loading;
					loading = Ext.get('loading');

					//  Hide loading message
					loading.fadeOut({
						duration: 0.2,
						remove: false
					});

					//  Hide loading mask
					Ext.get('loading-mask').shift({
						xy: loading.getXY(),
						width: loading.getWidth(),
						height: loading.getHeight(),
						remove: false,
						duration: 0.35,
						opacity: 0,
						easing: 'easeOut'
					});
				},
				this
			);
		}
	});
	return TYPO3.Vidi.Application;
});


//Ext.onReady(TYPO3.Vidi.Application.bootstrap, TYPO3.Vidi.Application);
