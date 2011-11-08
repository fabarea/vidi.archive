<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

// Override ExtJS Theme for ExtJS 4 compatibility
// @todo: remove this hook when TYPO3 v4 will be compatible with ExtJS 4
if (strpos($GLOBALS['_GET']['M'], '_Vidi') !== false || $GLOBALS['_GET']['M'] == 'recordPicker')  {
	$GLOBALS['TBE_STYLES']['extJS']['theme'] = t3lib_extMgm::extRelPath($_EXTKEY) . 'Resources/Public/Libraries/ExtJS/resources/css/ext-all-gray.css';
}

if (TYPO3_MODE === 'BE') {

	/** @var Tx_Vidi_Service_ModuleLoader $moduleLoader */
	$moduleLoader = t3lib_div::makeInstance('Tx_Vidi_Service_ModuleLoader', 'vidi');
	$moduleLoader->addStandardTree(Tx_Vidi_Service_ModuleLoader::TREE_FILES);
	$moduleLoader->setAllowedDataTypes(array('_FILE'));
	$moduleLoader->addJavaScriptFiles(array(
			'Module/RecordPicker/ModuleConfiguration.js',
			'Module/RecordPicker/GridToolBar.js'
		),
		'Resources/Public/JavaScript'
	);
	$moduleLoader->register(TRUE, 'recordPicker');
	
	$GLOBALS['TBE_MODULES']['_configuration']['recordPicker'] = array(
		'extensionName' => 'Vidi',
		'name' => 'recordPicker',
		'script' => 'mod.php?M=recordPicker',
	);
	$GLOBALS['TBE_MODULES']['recordPicker'] = 'recordPicker';
	$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['extbase']['extensions']['Vidi']['modules']['recordPicker'] = array();
	$GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['extbase']['extensions']['Vidi']['modules']['recordPicker']['controllers']['Vidi']['actions'][] = 'browse';




	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tceforms.php']['dbFileIcons'][$_EXTKEY] = 'EXT:vidi/Classes/Hook/TceformsHook.php:Tx_Vidi_Hook_TceformsHook';
	$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['t3lib/class.t3lib_tceforms_inline.php']['renderPossibleRecordsSelectorTypeGroupDB'][$_EXTKEY] = 'EXT:vidi/Classes/Hook/TceformsHook.php:Tx_Vidi_Hook_TceformsHook';
}


t3lib_extMgm::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Vidi');

?>