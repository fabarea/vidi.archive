<?php
/**
 * Created by JetBrains PhpStorm.
 * User: SteffenR
 * Date: 05.10.11
 * Time: 16:23
 * To change this template use File | Settings | File Templates.
 */
 
class Tx_Vidi_Service_ExtDirect_FilterBar {


	public function getElements() {
		$elements = array();
		foreach($GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['vidi']['FilterBar']['availableFilterElements'] AS $id => $element) {
			$elements[] = array(
				'id'	=> $id,
				'unique'=> $element['unique'],
				'xtype' => $element['widgetName'],
				'title' => $GLOBALS['LANG']->sL($element['title'])
			);
		}

		return $elements;
	}
}
