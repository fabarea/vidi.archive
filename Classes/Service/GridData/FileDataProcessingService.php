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
class Tx_Vidi_Service_GridData_FileDataProcessingService extends Tx_Vidi_Service_GridData_AbstractProcessingService {

	/**
	 * @var string $table
	 */
	protected $table = '_FILE';

	/**
	 * @var Tx_Vidi_Service_GridData_TcaDataProcessingService
	 */
	protected $tcaProcessor = NULL;

	public function __construct($table) {
		parent::__construct('sys_file');
		$this->tcaProcessor = t3lib_div::makeInstance('Tx_Vidi_Service_GridData_TcaDataProcessingService', 'sys_file');
	}



	public function getRecords($parameters) {
		$mountRepository = t3lib_div::makeInstance('t3lib_file_Repository_StorageRepository');
		$factory = t3lib_div::makeInstance('t3lib_file_Factory');
		$filterBarService = t3lib_div::makeInstance('t3lib_collection_FilteredRecords_Service', '_FILE');
		$filterBarService->initializeQuery($parameters->query);

		$path = '/';
		$mount = null;
		$restrictions = $filterBarService->getVirtualFieldFilters();
		if (count($restrictions) == 0) {
			$mount = $mountRepository->findAll();
			$mount = $mount[0];
		} else {
			$restriction = $restrictions[0]->search;
			$restriction = t3lib_div::trimExplode(':', $restriction, TRUE);

			$mount = $mountRepository->findByUid($restriction[0]);
			$path = $restriction[1];

		}
		$currentCollection = $factory->createFolderObject($mount, $path, '');
  		$files = $currentCollection->getFiles('', ($parameters->page - 1) * $parameters->limit, $parameters->limit);
		$data = array();
		t3lib_div::loadTCA('sys_file');
		foreach ($files AS $file) {
			$fileData = $file->toArray();
			$temp = $fileData;
			$fileData['icon'] = t3lib_iconWorks::getSpriteIconForFile(strtolower($fileData['extension']));
			foreach ($fileData AS $key => $value) {
				if (is_array($GLOBALS['TCA']['sys_file']['columns'][$key])) {
					$processedValue = t3lib_BEfunc::getProcessedValue('sys_file', $key, $value);
					$fileData[$key] = $processedValue;
				}
			}
			$fileData['__raw'] = $temp;
			$data[] = $fileData;
		}

		return array(
			'data' => $data,
			'total' => $currentCollection->getFileCount()
		);
	}

	public function getTableFields($parameters) {
		$data = array(
			array(
				'title' => 'id',
				'name' => 'id',
				'type' => 'string'
			),
			array(
				'title' => 'Bezeichnung',
				'name' => 'name',
				'type' => 'string'
			),
			array(
				'title' => 'Erweiterung',
				'name' => 'extension',
				'type' => 'string'
			),
			array(
				'title' => 'Dateigroesse',
				'name' => 'size',
				'type' => 'number'
			),
			array(
				'title' => 'Folder',
				'name' => '_collection',
				'type' => 'string'
			)
		);
		return $data;
	}

	public function buildColumnConfiguration() {
		$columns = $this->tcaProcessor->buildColumnConfiguration();
		$columns['size']['xtype'] = 'byteColumn';
		$columns = array_merge($columns, array(
			'actions' =>array('text' => '', 'xtype' => 'fileActionColumn'),
			'extension' => array('text' => 'Extension', 'dataIndex' => 'extension'),
			'thumb' => array('text' => 'Thumbnail', 'dataIndex' => 'id', 'xtype' => 'thumbnailColumn')
		));

		return $columns;
	}

	public function buildFieldConfiguration() {
		$fields = $this->tcaProcessor->buildFieldConfiguration();
		$fields = array_merge($fields, array(
			'id' => array('name' => 'id', 'type' => 'string'),
			'extension' => array('name' => 'extension', 'type' => 'string'),
			'permissions' => array('name' => 'permissions', 'type' => 'auto'),
			'indexed' => array('name' => 'indexed', 'type' => 'boolean'),
			'url' => array('name' => 'url', 'type' => 'string'),
			'checksum' => array('name' => 'checksum', 'type' => 'string'),
			'mtime' => array('name'=> 'mtime', 'type' => 'int')
		));
		return $fields;
	}

}

?>
