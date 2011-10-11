<?php

class Tx_Vidi_Service_ExtDirect_CollectionManagement extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {

	/**
	 * @var string
	 */
	protected $table;

	public function findAll($parameters) {
		$this->initialize($parameters->moduleCode, $parameters->table);

		$data = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows('uid', 'sys_collection', 'table_name = \'' . $this->table . "' " . t3lib_BEfunc::deleteClause('sys_collection'));
		foreach ($data AS $record) {
			$collections[] = t3lib_collection_DefaultRecordCollection::load($record['uid'])->toArray();

		}

		/*
		$collections[0]->add(array('uid' => 4));
		$collections[0]->add(array('uid' => 1));
		$collections[0]->persist();
		*/

		return array(
			'data' => $collections,
			'total' => count($collections)
		);
	}

	protected function initialize($moduleCode, $table) {
		parent::initialize($moduleCode);

		if ($table === null) {
			$this->table = $this->moduleConfiguration['allowedDataTypes'][0];
		} else {
			$this->table = $table;
		}
	}
}
