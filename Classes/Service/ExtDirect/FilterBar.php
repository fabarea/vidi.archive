<?php
/**
 * Created by JetBrains PhpStorm.
 * User: SteffenR
 * Date: 05.10.11
 * Time: 16:23
 * To change this template use File | Settings | File Templates.
 */
 
class Tx_Vidi_Service_ExtDirect_FilterBar {


	public function getElements($params) {
		$elements = array();
		foreach($GLOBALS['TYPO3_CONF_VARS']['EXTCONF']['vidi']['FilterBar']['availableFilterElements'] AS $id => $element) {
			if ($id == 'field' && !$element['unique']) {
				$uniques = array();
				foreach ($GLOBALS['TBE_MODULES_EXT']['vidi'][$params->moduleCode]['trees'] AS $tree) {
					foreach ($tree['relationConfiguration'] AS $table => $config) {
						if ($config['unique']) {
							$uniques['table'] = $config['foreignField'];
						}
					}
				}
			} else {
				$uniques = true;
			}
			$elements[] = array(
				'id'	=> $id,
				'unique'=> $uniques,
				'xtype' => $element['widgetName'],
				'title' => $GLOBALS['LANG']->sL($element['title'])
			);
		}

		return $elements;
	}
}
