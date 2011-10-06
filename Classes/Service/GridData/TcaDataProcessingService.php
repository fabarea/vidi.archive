<?php
/***************************************************************
*  Copyright notice
*
*  (c) 2011 Fabien Udriot <fabien.udriot@ecodev.ch>
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

/**
 *
 * @version $Id$
 * @copyright Copyright belongs to the respective authors
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class Tx_Vidi_Service_GridData_TcaDataProcessingService extends Tx_Vidi_Service_GridData_AbstractProcessingService {



	/**
	 * the tableName we will act on
	 *
	 * @var string
	 */
	protected $table = '';

	/**
	 * @param object $parameters
	 * @return array
	 */
	public function getRecords($parameters) {

		$data = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
			implode(', ', $this->filterColumnsViaAccess($this->getFields())),
			$this->table,
			$this->generateWhereClauseFromQuery($parameters->query),
			'',
			$this->generateSortingClause((array)$parameters->sort),
			t3lib_utility_Math::convertToPositiveInteger($parameters->start) . ',' . t3lib_utility_Math::convertToPositiveInteger($parameters->limit)

		);
		
		return array(
			'data' => $data,
			'total' => $GLOBALS['TYPO3_DB']->exec_SELECTcountRows('*', $this->table, ''),
		);
	}

	public function getTableFields($parameters) {
		$columns = array();
		foreach ((array)$GLOBALS['TCA'][$this->table]['columns'] AS $column => $configuration) {
			if ($this->hasAccessToColumn($column) && ($type = $this->detectExtJSType($configuration['config'])) != 'relation') {
				$field = array(
					'title' => $GLOBALS['LANG']->sL($configuration['label']),
					'name' => $column,
					'type' => $type
				);
				if ($type == 'relation') {
					$field['relationTable'] = $configuration['config']['foreign_table'];
					$field['relationTitle'] = $GLOBALS['LANG']->sL($GLOBALS['TCA'][$configuration['config']['foreign_table']]['ctrl']['title']);
				}
				$columns[] = $field;
			}
		}

		foreach ($this->moduleConfiguration['trees'] AS $tree) {
			if (isset($tree['relationConfiguration'])) {
				if (isset($tree['relationConfiguration']['*']) && !in_array($tree['relationConfiguration']['*']['foreignField'], $columns)) {
					$columns[] = array(
						'title' => 'Tree (' . $GLOBALS['LANG']->sL($GLOBALS['TCA'][$tree['table']]['ctrl']['title']) . ')',
						'name' => $tree['relationConfiguration']['*']['foreignField'],
						'type' => 'relation',
						'relationTable' => $tree['table'],
						'relationTitle' => $GLOBALS['LANG']->sL($GLOBALS['TCA'][$tree['table']]['ctrl']['title'])
					);
				}

				if (isset($tree['relationConfiguration'][$this->table]) && !in_array($tree['relationConfiguration'][$this->table]['foreignField'], $columns)) {
					$columns[] = array(
						'title' => 'Tree (' . $GLOBALS['LANG']->sL($GLOBALS['TCA'][$tree['table']]['ctrl']['title']) . ')',
						'name' => $tree['relationConfiguration'][$this->table]['foreignField'],
						'type' => 'relation',
						'relationTable' => $tree['table'],
						'relationTitle' => $GLOBALS['LANG']->sL($GLOBALS['TCA'][$tree['table']]['ctrl']['title'])
					);
				}
			}
		}

		return $columns;
	}


	public function getRelatedRecords($parameters) {
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

			$data = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
				'uid,' . $GLOBALS['TCA'][$relatedTable]['ctrl']['label'] . ' AS title',
				$GLOBALS['TYPO3_DB']->quoteStr($relatedTable, $relatedTable),
				'0=1 OR ' . $searchQuery
			);
		}

		return $data;
	}



	protected function getFields() {
		return array_unique(array_merge(array('uid', 'pid'), array_keys((array)$GLOBALS['TCA'][$this->table]['columns'])));
	}


	public function buildColumnConfiguration() {

		$columns = array(
			array('text' => 'uid', 'dataIndex' => 'uid', 'hidden' => true, 'sortable' => true),
			array('text' => 'pid', 'dataIndex' => 'oid', 'hidden' => true, 'sortable' => true)
		);

		foreach ($GLOBALS['TCA'][$this->table]['columns'] AS $name => $configuration) {
			$data = array(
				'text' => $GLOBALS['LANG']->sL($configuration['label']),
				'dataIndex' => $name,
				'hidden' => !t3lib_div::inList($GLOBALS['TCA'][$this->table]['interface']['showRecordFieldList'], $name),
				'sortable'=> true
			);

			$columns[] = $data;
		}

		return $columns;
	}
	
	public function buildFieldConfiguration() {

		$fields = array(
			array('name' => 'uid', 'type' => 'int'),
			array('name' => 'pid', 'type' => 'int')
		);

		foreach ($GLOBALS['TCA'][$this->table]['columns'] AS $name => $configuration) {
			$data = array(
				'name' => $name
			);
			$type = $this->detectExtJSType($configuration['config']);
			if ($type == 'date') {
				$data['dateFormat'] = 'd.m.Y. H:i';
			}
			$data['type'] = $type;
			$fields[] = $data;
		}

		return $fields;
	}

	/**
	 * build sorting clause out of ExtJS sorting params
	 *
	 * @param array $sorting
	 * @return string
	 */
	protected function generateSortingClause(array $sorting) {
		$sortParams = array();
		foreach((array)$sorting AS $param) {
			$sortParams[] = $GLOBALS['TYPO3_DB']->quoteStr($param->property, $this->table) . (trim($param->direction) == 'DESC' ? ' DESC' : ' ASC');
		}
		return implode(', ', $sortParams);
	}


}

?>
