<?php
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2011 Thomas Maroschik <tmaroschik@dfau.de>
 *
 *  All rights reserved
 *
 *  This script is part of the TYPO3 project. The TYPO3 project is
 *  free software; you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation; either version 2 of the License, or
 *  (at your option) any later version.
 *
 *  The GNU General Public License can be found at
 *  http://www.gnu.org/copyleft/gpl.html.
 *  A copy is found in the textfile GPL.txt and important notices to the license
 *  from the author is found in LICENSE.txt distributed with these scripts.
 *
 *
 *  This script is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  This copyright notice MUST APPEAR in all copies of the script!
 ***************************************************************/

if (!defined ("TYPO3_MODE"))    die ('Access denied.');

// Hook only available for ExtJS 4 compatibility
// @todo: remove this hook when TYPO3 v4 will be compatible with ExtJS 4
if ($GLOBALS['_GET']['M'] == 'user_TaxonomyTxTaxonomyM1') {
	$GLOBALS['TYPO3_CONF_VARS'][TYPO3_MODE]['XCLASS']['t3lib/class.t3lib_pagerenderer.php'] = t3lib_extMgm::extPath($_EXTKEY) . 'Classes/Xclass/class.ux_t3lib_pagerenderer.php';
}

// Register ExtDirect Endpoint 
t3lib_extMgm::registerExtDirectComponent(
    'TYPO3.Vidi.Service.ExtDirect.Controller.ContentController',
    'EXT:vidi/Classes/Service/ExtDirect/Controller/ContentController.php:Tx_Vidi_Service_ExtDirect_Controller_ContentController'
);

// @todo: registration should be Object Oriented via t3lib_extMgm, for instance
// Register JavaScript Dynamic File Loading through RequireJS
// Note: key "Vidi" is the name of the extension in a camel case syntax
$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['RequireJS']['Vidi'] = Array(
	
	// Files to be loaded
	// Note: files must be prefixed by their Camel Upper Case Extension Key
	//       the path will be resolved by RequireJS
	'Files' => Array (
		'Vidi/Core/Application', 
		'Vidi/Module/UserInterfaceModule',
		'Vidi/Module/ContentBrowserModule',
		'Vidi/Module/ConceptModule',
		'Vidi/Utils',
	),

	// Default Path relative to the extension
	'Path' => 'Resources/Public/JavaScript/',
	
	// Code to launch the Application
	'JavaScriptCode' => Array(
		'Application.run();'
	)
);

?>