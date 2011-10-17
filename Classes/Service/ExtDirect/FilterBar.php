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
			if ($id == 'field' && $element['unique'] == false) {
				$uniques = array();
				foreach ($GLOBALS['TBE_MODULES_EXT']['vidi'][$params->moduleCode]['trees'] AS $tree) {
					foreach ($tree['relationConfiguration'] AS $table => $config) {
						if ($config['unique']) {
							$uniques[$table] = $config['foreignField'];
						}
					}
				}
			} else {
				$uniques = $element['unique'];
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

	public function getRecordTypeAhead($parameters) {
		$relatedTable = $parameters->relationTable;
		$typeAhead = $parameters->query;

		$data = array();

		if (array_key_exists($relatedTable, $GLOBALS['TCA'])) {
			$searchFields = t3lib_div::trimExplode(',', $GLOBALS['TCA'][$relatedTable]['ctrl']['searchFields'], TRUE);
			$array = array();
			$like = '\'%' . $GLOBALS['TYPO3_DB']->quoteStr($GLOBALS['TYPO3_DB']->escapeStrForLike($typeAhead, $relatedTable), $relatedTable) . '%\'';

			foreach ($searchFields AS $field) {
				$array[] = $field . ' LIKE ' . $like;
			}
			$searchQuery = ' (' . implode(' OR ', $array) . ') ';

			if ($parameters->matching) {
				$matchings = array();

				foreach($parameters->matching AS $field => $value) {
					if (isset($GLOBALS['TCA'][$relatedTable]['columns'][$field])) {
						$matchings[] = $field .' = \'' . $GLOBALS['TYPO3_DB']->quoteStr($value, $relatedTable) . '\'';
					}
				}
				if (count($matchings) > 0) {
					$searchQuery .= ' AND ' . implode(' AND ', $matchings);
				}
			}

			$data = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
				'uid,' . $GLOBALS['TCA'][$relatedTable]['ctrl']['label'] . ' AS title',
				$GLOBALS['TYPO3_DB']->quoteStr($relatedTable, $relatedTable),
				'0=1 OR ' . $searchQuery . t3lib_BEfunc::deleteClause($relatedTable)
			);
		}

		return $data;
	}
}
