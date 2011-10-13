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
class Tx_Vidi_Service_ExtDirect_FilterManagement extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {

	/**
	 * @var t3lib_collection_RecordCollectionRepository
	 */
	protected $collectionRepository;

	public function __construct() {
		/** @var t3lib_collection_RecordCollectionRepository $collectionRepository */
		$this->collectionRepository = t3lib_div::makeInstance('t3lib_collection_RecordCollectionRepository');
	}

	public function read($params) {
		$this->initialize($params->moduleCode);
		$table = $params->currentTable;

		$collectionObjects = $this->collectionRepository->findByTypeAndRecord('filter', $table);

		$filters = array();
		/** @var t3lib_collection_FilteredRecordCollection $collection */
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
		/** @var t3lib_collection_FilteredRecordCollection $filter */
		$filter = t3lib_div::makeInstance('t3lib_collection_FilteredRecordCollection');

		$dataArray = array(
			'uid'			=> 0,
			'table_name'	=> $newFilter->tableName,
			'description'	=> $newFilter->description,
			'name'			=> $newFilter->name,
			'criteria'		=> $newFilter->criteria,
		);

		$filter->fromArray($dataArray);
		$filter->persist();
	}

	public function update($filterToUpdate) {
		/** @var t3lib_collection_FilteredRecordCollection $filter */
		$filter = t3lib_div::makeInstance('t3lib_collection_FilteredRecordCollection');
		$filter->fromArray(array(
			'uid'			=> $filterToUpdate->uid,
			'table_name'	=> $filterToUpdate->tableName ,
			'description'	=> $filterToUpdate->description,
			'name'			=> $filterToUpdate->name,
			'criteria'		=> $filterToUpdate->criteria,
		));

		$filter->persist();
	}

	public function destroy($filter) {
		$this->collectionRepository->deleteByUid($filter->uid);
	}
}

?>