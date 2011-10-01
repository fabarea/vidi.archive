<?php
if (!defined ('TYPO3_MODE')) {
	die ('Access denied.');
}

$TCA['tx_vidi_filter'] = array(
	'ctrl' => $TCA['tx_vidi_filter']['ctrl'],
	'interface' => array(
		'showRecordFieldList' => 'name, table, public',
	),
	'types' => array(
		'1' => array('showitem' => 'name, description, criteria, table_name, public'),
	),
	'palettes' => array(
	),
	'columns' => array(
		'name' => array(
			'label' => 'LLL:EXT:vidi/Resources/Private/Language/locallang_db.xml:tx_vidi_filter.name',
			'config' => array(
				'type' => 'input',
				'size' => 30,
				'eval' => 'trim,required'
			),
		),
		'description' => array(
			'label' => 'LLL:EXT:vidi/Resources/Private/Language/locallang_db.xml:tx_vidi_filter.description',
			'config' => array(
				'type' => 'input',
				'size' => 30,
				'eval' => 'trim'
			),
		),
		'criteria' => array(
			'label' => 'LLL:EXT:vidi/Resources/Private/Language/locallang_db.xml:tx_vidi_filter.criteria',
			'config' => array(
				'type' => 'none',
				'cols' => 40,
				'rows' => 15,
			),
		),
		'table_name' => array(
			'label' => 'LLL:EXT:vidi/Resources/Private/Language/locallang_db.xml:tx_vidi_filter.table',
			'config' => array(
				'type' => 'none',
				'cols' => 40,
				'rows' => 1,
			),
		),
		'public' => array(
			'label' => 'LLL:EXT:vidi/Resources/Private/Language/locallang_db.xml:tx_vidi_filter.public',
			'config' => array(
				'type' => 'check',
				'items' => array(
					array('LLL:EXT:vidi/Resources/Private/Language/locallang_db.xml:tx_vidi_filter.public.1', '')
				),
				'default' => 0
			),
		)
	),
);
?>