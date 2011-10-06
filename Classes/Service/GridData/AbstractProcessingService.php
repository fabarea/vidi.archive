<?php
/**
 * Created by JetBrains PhpStorm.
 * User: SteffenR
 * Date: 05.10.11
 * Time: 10:41
 * To change this template use File | Settings | File Templates.
 */
 
abstract class Tx_Vidi_Service_GridData_AbstractProcessingService {

	/**
	 * 
	 * @var string $table
	 */
	protected $table;


	public function __construct($table) {
		$this->table = $table;
	}

	abstract public function getRecords($parameters);


	abstract public function getTableFields($parameters);


	abstract public function getRelatedRecords($parameters);

	abstract public function buildColumnConfiguration();

	abstract public function buildFieldConfiguration();

	protected function detectExtJSType($configuration) {
		switch($configuration['type']) {
			case 'text':
				$type = 'string';
				break;
			case 'input':
				if(strpos($configuration['eval'], 'date') !== false) {
					$type = 'date';
				} elseif(strpos($configuration['eval'], 'int') !== false || strpos($configuration['eval'], 'num') !== false || strpos($configuration['eval'], 'year') !== false) {
					$type = 'int';
				} elseif (strpos($configuration['eval'], 'double') !== false) {
					$type = 'float';
				} else {
					$type = 'string';
				}
				break;
			case 'check':
				if (count($configuration['items']) == 1) {
					$type = 'boolean';
				} else {
					$type = 'int';
				}
				break;
			case 'select':
				if ($configuration['foreign_table']) {
					$type = 'relation';
				} else {
					$type = 'auto';
				}
				break;
			case 'group':
				if ($configuration['internal_type'] == 'db') {
					$type = 'relation';
				} elseif($configuration['internal_type'] == 'file' || $configuration['internal_type'] == 'file_reference') {
					$type = 'file';
				} else {
					$type = 'auto';
				}
				break;
			default:
					$type = 'auto';
		}
		return $type;
	}

	protected function filterColumnsViaAccess($columns) {
		foreach($columns AS $index => $name) {
			if (!$this->hasAccessToColumn($name)) {
				unset($columns[$index]);
			}
		}
		return array_values($columns);
	}

	protected function hasAccessToColumn($column) {
		return ((!$GLOBALS['TCA'][$this->table]['columns'][$column]['exclude'] || $GLOBALS['BE_USER']->check('non_exclude_fields', $this->table . ':' . $column))
			&& $GLOBALS['TCA'][$this->table]['columns'][$column]['config']['type'] != 'passthrough') || $GLOBALS['BE_USER']->isAdmin();
	}

	protected function generateWhereClauseFromQuery($query) {
		$whereClause = '';
		if ($query !== null && $query != '') {
			$filterBarService = t3lib_div::makeInstance('Tx_Vidi_Service_FilterBar', $this->table);
			$whereClause .= $filterBarService->generateWhereClause($query);
		}
		return $whereClause;
	}
}
