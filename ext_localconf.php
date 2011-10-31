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
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.FilterManagement', $extDirectPath . 'FilterManagement.php:Tx_Vidi_Service_ExtDirect_FilterManagement');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.CollectionManagement', $extDirectPath . 'CollectionManagement.php:Tx_Vidi_Service_ExtDirect_CollectionManagement');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.FilterBar', $extDirectPath . 'FilterBar.php:Tx_Vidi_Service_ExtDirect_FilterBar');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.DragAndDrop', $extDirectPath . 'DragAndDrop.php:Tx_Vidi_Service_ExtDirect_DragAndDrop');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.FileActions', $extDirectPath . 'File/Actions.php:Tx_Vidi_Service_ExtDirect_File_Actions');
t3lib_extMgm::registerExtDirectComponent('TYPO3.Vidi.Service.ExtDirect.ContextMenu', $extDirectPath . 'ContextMenu.php:Tx_Vidi_Service_ExtDirect_ContextMenu');


$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['vidi'] = array();
$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['vidi']['FilterBar'] = array(
	'availableFilterElements' => array(
		'fulltext' => array(
					'widgetName'	=> 'filterBar-Item-Fulltext',
					'title'			=> 'fulltext search',
					'processorClass'=> '-',
					'unique'		=> false,
				),
		'field' => array(
			'widgetName'	=> 'filterBar-Item-Field',
			'title'			=> 'property based filter',
			'processorClass'=> '-',
			'unique'		=> false,
		),
		'collection' => array(
			'widgetName'	=> 'filterBar-Item-Collection',
			'title'			=> 'search within collections',
			'processorClass'=> '-',
			'unique'		=> false,
		),
		'operator' => array(
			'widgetName'	=> 'filterBar-Item-Operator',
			'title'			=> 'binary boolean operator',
			'processorClass'=> '-',
			'unique'		=> false,
		)
	)
);

t3lib_extMgm::addUserTSConfig('
	options.contextMenu.table.__FOLDER.items {
		100 = ITEM
		100 {
			name = rename
			label = LLL:EXT:lang/locallang_core.xml:cm.rename
			spriteIcon = actions-edit-rename
			callbackAction = TYPO3.Vidi.Actions.File.renameFolder
		}

		200 = ITEM
		200 {
			name = new
			label = create sub-folder
			spriteIcon = apps-filetree-folder-add
			callbackAction = TYPO3.Vidi.Actions.File.createFolder
		}

		500 = DIVIDER

		300 = ITEM
		300 {
			name = history
			label = LLL:EXT:lang/locallang_misc.xml:CM_history
			spriteIcon = actions-document-history-open
			callbackAction = openHistoryPopUp
		}
	}
');

?>