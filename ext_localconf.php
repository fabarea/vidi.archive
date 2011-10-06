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
if (strpos($GLOBALS['_GET']['M'],'_Vidi') !== false) {
	$GLOBALS['TYPO3_CONF_VARS'][TYPO3_MODE]['XCLASS']['t3lib/class.t3lib_pagerenderer.php'] = t3lib_extMgm::extPath($_EXTKEY) . 'Classes/Xclass/class.ux_t3lib_pagerenderer.php';
}

$extDirectPath = 'EXT:vidi/Classes/Service/ExtDirect/';

	// Register ExtDirect Endpoint for the Grid
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.GridData',$extDirectPath . 'GridData.php:Tx_Vidi_Service_ExtDirect_GridData');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.TreeData', $extDirectPath . 'TreeData.php:Tx_Vidi_Service_ExtDirect_TreeData');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.Filter', $extDirectPath . 'Filter.php:Tx_Vidi_Service_ExtDirect_Filter');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.FilterBar', $extDirectPath . 'Filter.php:Tx_Vidi_Service_ExtDirect_FilterBar');


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
		'Vidi/Utils',
	),

	// Default Path relative to the extension
	'Path' => 'Resources/Public/JavaScript/',
	
	// Code to launch the Application
	'JavaScriptCode' => Array(
		'Application.initialize();',
		'Application.processModuleAdaption(Ext.emptyFn);',
		'Application.run();'
	)
);

$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['vidi'] = array();
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['vidi']['FilterBar'] = array(
	'availableFilterElements' => array(
		'field' => array(
			'widgetName'	=> 'filterBar-Item-Field',
			'title'			=> 'property based filter',
			'processorClass'=> '-',
			'unique'		=> false,
		),
		'operator' => array(
			'widgetName'	=> 'filterBar-Item-Operator',
			'title'			=> 'binary boolean operator',
			'processorClass'=> '-',
			'unique'		=> false,
		),
		'fulltext' => array(
			'widgetName'	=> 'filterBar-Item-Fulltext',
			'title'			=> 'fulltext search',
			'processorClass'=> '-',
			'unique'		=> true,
		),
		'collection' => array(
			'widgetName'	=> 'filterBar-Item-Collection',
			'title'			=> 'search within collections',
			'processorClass'=> '-',
			'unique'		=> false,
		)
	)
);

?>