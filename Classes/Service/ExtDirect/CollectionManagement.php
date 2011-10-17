<?php

class Tx_Vidi_Service_ExtDirect_CollectionManagement extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {

	/**
	 * @var string
	 */
	protected $table;

	protected function initialize($moduleCode, $table) {
		parent::initialize($moduleCode);

		if ($table === null) {
			$this->table = $this->moduleConfiguration['allowedDataTypes'][0];
		} else {
			$this->table = $table;
		}
	}
		/**
	 * @var t3lib_collection_RecordCollectionRepository
	 */
	protected $collectionRepository;

	public function __construct() {
		/** @var t3lib_collection_RecordCollectionRepository $collectionRepository */
		$this->collectionRepository = t3lib_div::makeInstance('t3lib_collection_RecordCollectionRepository');
	}

	public function read($params) {
		$this->initialize($params->moduleCode, $params->table);
		$table = $params->currentTable;

		$collectionObjects = $this->collectionRepository->findByTypeAndRecord('static', $table);

		$filters = array();
		/** @var t3lib_collection_StaticRecordCollection $collection */
		foreach ($collectionObjects AS $collection) {
			$filters[] = $collection->toArray();

		}

		return array(
			'data' => $filters,
			'total'=> count($filters),
			'debug'=> mysql_error()
		);
	}

	public function create($newFilter) {
		/** @var t3lib_collection_StaticRecordCollection $filter */
		$filter = t3lib_div::makeInstance('t3lib_collection_StaticRecordCollection');

		$dataArray = array(
			'uid'			=> 0,
			'table_name'	=> $newFilter->tableName,
			'description'	=> $newFilter->description,
			'title'			=> $newFilter->title
		);

		$filter->fromArray($dataArray);
		var_dump($newFilter->items);
		foreach ($newFilter->items AS $uid) {
			$filter->add(array('uid' => $uid));
		}
		$filter->persist();
	}

	public function update($filterToUpdate) {
		/** @var t3lib_collection_StaticRecordCollection $filter */
		$filter = t3lib_div::makeInstance('t3lib_collection_StaticRecordCollection');
		$filter->fromArray(array(
			'uid'			=> $filterToUpdate->uid,
			'table_name'	=> $filterToUpdate->tableName ,
			'description'	=> $filterToUpdate->description,
			'title'			=> $filterToUpdate->title,
		));

		$filter->persist();
	}

	public function destroy($filter) {
		$this->collectionRepository->deleteByUid($filter->uid);
	}
}
