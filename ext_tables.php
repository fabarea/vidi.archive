<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

// Override ExtJS Theme for ExtJS 4 compatibility
// @todo: remove this hook when TYPO3 v4 will be compatible with ExtJS 4
if ($GLOBALS['_GET']['M'] == 'user_VidiVidiM1') {
	$GLOBALS['TBE_STYLES']['extJS']['theme'] = t3lib_extMgm::extRelPath($_EXTKEY) . 'Resources/Public/Libraries/ExtJS/resources/css/ext-all-gray.css';
}

if (TYPO3_MODE === 'BE') {
	$moduleLoader = t3lib_div::makeInstance('Tx_Vidi_Service_ModuleLoader', $_EXTKEY);
	$moduleLoader->addStandardTree(Tx_Vidi_Service_ModuleLoader::TREE_PAGES);
	$moduleLoader->setAllowedDataTypes(array('cache_extensions', 'tx_ttnews', 'tt_content', '__FILES'));
	$moduleLoader->register();

/*	$moduleLoader2 = t3lib_div::makeInstance('Tx_Vidi_Service_ModuleLoader', $_EXTKEY, 'm2');
	$moduleLoader2->addStandardTree(Tx_Vidi_Service_ModuleLoader::TREE_PAGES);
	$moduleLoader2->setAllowedDataTypes(array('cache_extensions', 'tx_ttnews', 'tt_content', '__FILES'));
	$moduleLoader2->register();*/
}


t3lib_extMgm::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Vidi');

?>