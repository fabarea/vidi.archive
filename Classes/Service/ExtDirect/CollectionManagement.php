<?php

class Tx_Vidi_Service_ExtDirect_CollectionManagement extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {

	/**
	 * @var string
	 */
	protected $table;

	public function findAll($parameters) {
		$this->initialize($parameters->moduleCode, $parameters->table);

		/** @var t3lib_collection_RecordCollectionRepository $collectionRepository */
		$collectionRepository = t3lib_div::makeInstance('t3lib_collection_RecordCollectionRepository');
		$collectionObjects = $collectionRepository->findByTypeAndRecord('static', $this->table);

		$collections = array();
		foreach ($collectionObjects AS $collection) {
			$collections[] = $collection->toArray();
		}
		
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
