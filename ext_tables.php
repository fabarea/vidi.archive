<?php
if (!defined('TYPO3_MODE')) {
	die ('Access denied.');
}

// Override ExtJS Theme for ExtJS 4 compatibility
// @todo: remove this hook when TYPO3 v4 will be compatible with ExtJS 4
if ($GLOBALS['_GET']['M'] == 'user_VidiTxVidiM1') {
	$GLOBALS['TBE_STYLES']['extJS']['theme'] = t3lib_extMgm::extRelPath($_EXTKEY) . 'Resources/Public/Libraries/ExtJS/resources/css/ext-all-gray.css';
}

if (TYPO3_MODE === 'BE') {

	/**
	 * Registers a Backend Module
	 */
	Tx_Extbase_Utility_Extension::registerModule(
		$_EXTKEY,
		'user',	 // Make module a submodule of 'user'
		'tx_vidi_m1',	// Submodule key
		'',						// Position
		array(
			'Content' => 'list',
		),
		array(
			'access' => 'user,group',
			'icon'   => 'EXT:' . $_EXTKEY . '/ext_icon.gif',
			'labels' => 'LLL:EXT:' . $_EXTKEY . '/Resources/Private/Language/locallang_tx_vidi_m1.xml',
		)
	);
}


t3lib_extMgm::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'Vidi');

?>