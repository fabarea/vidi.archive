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
class Tx_Vidi_Service_ExtDirect_GridData extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {

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
		$this->loadConfiguration($parameters->moduleCode, $parameters->table);

		$data = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
			implode(', ', $this->getFields()),
			$this->table,
			$this->generateWhereClauseFromQuery($parameters->query),
			'',
			$this->generateSortingClause((array)$parameters->sort),
			t3lib_utility_Math::convertToPositiveInteger($parameters->start) . ',' . t3lib_utility_Math::convertToPositiveInteger($parameters->limit)

		);
		
		return array(
			'data' => $data,
			'total' => $GLOBALS['TYPO3_DB']->exec_SELECTcountRows('*', $this->table, ''),
			'debug' => print_r($this->generateWhereClauseFromQuery($parameters->query), true)
		);
	}



	protected function getFields() {
		return array_unique(array_merge(array('uid', 'pid'), array_keys((array)$GLOBALS['TCA'][$this->table]['columns'])));
	}


	public function buildColumnConfiguration($moduleCode, $table = null) {
		$this->loadConfiguration($moduleCode, $table);

		$columns = array(
			array('text' => 'uid', 'dataIndex' => 'uid', 'hidden' => true, 'sortable' => true),
			array('text' => 'pid', 'dataIndex' => 'oid', 'hidden' => true, 'sortable' => true)
		);

		foreach ($GLOBALS['TCA'][$this->table]['columns'] AS $name => $configuration) {
			$data = array(
				'text' => $name,
				'dataIndex' => $name,
				'hidden' => !t3lib_div::inList($GLOBALS['TCA'][$this->table]['interface']['showRecordFieldList'], $name),
				'sortable'=> true
			);

			$columns[] = $data;
		}

		return $columns;
	}
	
	public function buildFieldConfiguration($moduleCode, $table = null) {
		$this->loadConfiguration($moduleCode, $table);

		$fields = array(
			array('name' => 'uid', 'type' => 'int'),
			array('name' => 'pid', 'type' => 'int')
		);

		foreach ($GLOBALS['TCA'][$this->table]['columns'] AS $name => $configuration) {
			$data = array(
				'name' => $name
			);
			$type = 'auto';
			switch($configuration['config']['type']) {
				case 'text':
					$type = 'string';
					break;
				case 'input':
					if(strpos($configuration['config']['eval'], 'date') !== false) {
						$type = 'date';
						$data['dateFormat'] = 'd.m.Y. H:i';
					} elseif(strpos($configuration['config']['eval'], 'int') !== false || strpos($configuration['config']['eval'], 'num') !== false || strpos($configuration['config']['eval'], 'year') !== false) {
						$type = 'int';
					} elseif (strpos($configuration['config']['eval'], 'double') !== false) {
						$type = 'float';
					}
					break;
				case 'check':
					if (count($configuration['config']['items']) == 1) {
						$type = 'boolean';
					} else {
						$type = 'int';
					}
					break;
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

	protected function generateWhereClauseFromQuery($query) {
		$whereClause = '';
		if ($query !== null && $query != '') {
			$filterBarService = t3lib_div::makeInstance('Tx_Vidi_Service_FilterBar', $this->table);
			$whereClause .= $filterBarService->generateWhereClause($query);
		}
		return $whereClause;
	}

	protected function loadConfiguration($moduleCode, $table) {
		parent::loadConfiguration($moduleCode);
		if ($table === null) {
			$this->table = $this->moduleConfiguration['allowedDataTypes'][0];
		} else {
			$this->table = $table;
		}
		t3lib_div::loadTCA($this->table);
	}

}

?>
