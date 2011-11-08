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
	 * the handler for accessing the data
	 *
	 * @var Tx_Vidi_Service_GridData_AbstractProcessingService
	 */
	protected $dataRepository = null;

	/**
	 * @param object $parameters
	 * @return array
	 */
	public function getRecords($parameters) {
		$this->initialize($parameters->moduleCode, $parameters->table);
		
		$data = $this->dataRepository->getRecords($parameters);
		return $data;
	}

	public function getTableFields($parameters) {
		$this->initialize($parameters->moduleCode, $parameters->table);

		$columns = $this->dataRepository->getTableFields($parameters);
		return array(
			'data' => $columns,
			'total' => count($columns)
		);
	}


	public function getRelatedRecords($parameters) {
		$this->initialize($parameters->moduleCode, $parameters->table);

		$data = $this->dataRepository->getRelatedRecords($parameters);
		return array(
			'data' => $data,
			'total' => count($data),
		);
	}

	public function buildColumnConfiguration($moduleCode, $table = null, $restrictToColumns = array()) {
		$this->initialize($moduleCode, $table);
		$columnConfiguration = $this->dataRepository->buildColumnConfiguration();

		$newColums = array();
		if (count($restrictToColumns) > 0) {
			for ($i = 0; $i < count($columnConfiguration); $i++) {
				if (in_array($columnConfiguration[$i]['dataIndex'], $restrictToColumns)) {
					$newColums[] = $columnConfiguration[$i];
				}
			}
		} else {
			$newColums = $columnConfiguration;
		}

		return $newColums;
	}
	
	public function buildFieldConfiguration($moduleCode, $table = null) {
		$this->initialize($moduleCode, $table);
		return $this->dataRepository->buildFieldConfiguration();
	}


	protected function initialize($moduleCode, $table) {
		parent::initialize($moduleCode);
		
		if ($table === null) {
			$this->table = $this->moduleConfiguration['allowedDataTypes'][0];
		} else {
			$this->table = $table;
		}

		if (isset($GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['gridDataService'][$this->table])) {
			$handler = t3lib_div::makeInstance($GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['gridDataService'][$this->table], $this->table);
			if (!$handler instanceof Tx_Vidi_Service_GridData_AbstractProcessingService) {
				throw new UnexpectedValueException('$handler must extend Tx_Vidi_Service_GridData_AbstractProcessingService in module '. $moduleCode, 1320655160);
			}
			$this->dataRepository = $handler;
		} elseif ($this->table == '_FILE') {
			$this->dataRepository = t3lib_div::makeInstance('Tx_Vidi_Service_GridData_FileDataProcessingService', '_FILE');
		} else {
			$this->dataRepository = t3lib_div::makeInstance('Tx_Vidi_Service_GridData_TcaDataProcessingService', $this->table);
		}

		if (substr($this->table, 0, 1) !== '_') {
			t3lib_div::loadTCA($this->table);
		}
	}

}

?>
