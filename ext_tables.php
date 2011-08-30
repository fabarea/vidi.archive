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
			'Asset' => 'list',
		),
		array(
			'access' => 'user,group',
			'icon'   => 'EXT:' . $_EXTKEY . '/ext_icon.gif',
			'labels' => 'LLL:EXT:' . $_EXTKEY . '/Resources/Private/Language/locallang_tx_vidi_m1.xml',
		)
	);
}


t3lib_extMgm::addStaticFile($_EXTKEY, 'Configuration/TypoScript', 'ExtJS BE Module Sample');

t3lib_extMgm::addLLrefForTCAdescr('tx_vidi_domain_model_asset', 'EXT:vidi/Resources/Private/Language/locallang_csh_tx_vidi_domain_model_asset.xml');
t3lib_extMgm::allowTableOnStandardPages('tx_vidi_domain_model_asset');
$TCA['tx_vidi_domain_model_asset'] = array(
	'ctrl' => array(
		'title'	=> 'LLL:EXT:vidi/Resources/Private/Language/locallang_db.xml:tx_vidi_domain_model_asset',
		'label' => 'title',
		'tstamp' => 'tstamp',
		'crdate' => 'crdate',
		'cruser_id' => 'cruser_id',
		'dividers2tabs' => TRUE,
		'versioningWS' => 2,
		'versioning_followPages' => TRUE,
		'origUid' => 't3_origuid',
		'languageField' => 'sys_language_uid',
		'transOrigPointerField' => 'l10n_parent',
		'transOrigDiffSourceField' => 'l10n_diffsource',
		'delete' => 'deleted',
		'enablecolumns' => array(
			'disabled' => 'hidden',
			'starttime' => 'starttime',
			'endtime' => 'endtime',
		),
		'dynamicConfigFile' => t3lib_extMgm::extPath($_EXTKEY) . 'Configuration/TCA/Asset.php',
		'iconfile' => t3lib_extMgm::extRelPath($_EXTKEY) . 'Resources/Public/Icons/tx_vidi_domain_model_asset.gif'
	),
);

?>