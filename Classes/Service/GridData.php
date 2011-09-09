<?php
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2010-2011 Vidi Team (http://forge.typo3.org/projects/show/typo3v4-vidi)
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
 * @author Vidi Team (http://forge.typo3.org/projects/show/typo3v4-vidi)
 * @package Vidi
 * @subpackage Service
 */
class Tx_Vidi_Service_GridData {
	protected $dataArray = array();
	protected $sort = '';
	protected $sortDir = '';
	protected $vidiCache = NULL;

	/**
	 * Generates grid list array from given versions.
	 *
	 * @param array $versions All records uids etc. First key is table name, second key incremental integer. Records are associative arrays with uid, t3ver_oid and t3ver_swapmode fields. The pid of the online record is found as "livepid" the pid of the offline record is found in "wspid"
	 * @param object $parameter
	 * @return array
	 * @throws InvalidArgumentException
	 */
	public function generateGridList($versions, $parameter) {

			// Read the given parameters from grid. If the parameter is not set use default values.
		$filterTxt = isset($parameter->filterTxt) ? $parameter->filterTxt : '';
		$start = isset($parameter->start) ? intval($parameter->start) : 0;
		$limit = isset($parameter->limit) ? intval($parameter->limit) : 10;
		$this->sort = isset($parameter->sort) ? $parameter->sort : 't3ver_oid';
		$this->sortDir = isset($parameter->dir) ? $parameter->dir : 'ASC';

		$data = array();
		$data['data'] = array();

		$this->generateDataArray($versions, $filterTxt);

		$data['total'] = count($this->dataArray);
		$data['data'] = $this->getDataArray($start, $limit);

		return $data;
	}

	/**
	 * Generates grid list array from given versions.
	 *
	 * @param array $versions
	 * @param string $filterTxt
	 * @return void
	 */
	protected function generateDataArray(array $versions, $filterTxt) {

		foreach ($versions as $table => $records) {
			$versionArray = array('type' => $table);
			$isRecordTypeAllowedToModify = $GLOBALS['BE_USER']->check('tables_modify', $table);

			foreach ($records as $record) {

				$origRecord = t3lib_BEFunc::getRecord($table, $record['t3ver_oid']);
				$versionRecord = t3lib_BEFunc::getRecord($table, $record['uid']);

				$versionArray['uid'] = $record['uid'];
				$versionArray['title'] = htmlspecialchars(t3lib_befunc::getRecordTitle($table, $versionRecord));

				$this->dataArray[] = $versionArray;
			}
		}
		//$this->sortDataArray();
	}

	/**
	 * Gets the data array by considering the page to be shown in the grid view.
	 *
	 * @param integer $start
	 * @param integer $limit
	 * @return array
	 */
	protected function getDataArray($start, $limit) {
		$dataArrayPart = array();
		$end = $start + $limit < count($this->dataArray) ? $start + $limit : count($this->dataArray);

		for ($i = $start; $i < $end; $i++) {
			$dataArrayPart[] = $this->dataArray[$i];
		}

		return $dataArrayPart;
	}


	/**
	 * Performs sorting on the data array accordant to the
	 * selected column in the grid view to be used for sorting.
	 *
	 * @return void
	 */
	protected function sortDataArray() {
		if (is_array($this->dataArray)) {
			switch ($this->sort) {
				case 'uid';
				case 'change';
				case 'workspace_Tstamp';
				case 't3ver_oid';
				case 'liveid';
				case 'livepid':
					usort($this->dataArray, array($this, 'intSort'));
					break;
				case 'label_Workspace';
				case 'label_Live';
				case 'label_Stage';
				case 'workspace_Title';
				case 'path_Live':
						// case 'path_Workspace': This is the first sorting attribute
					usort($this->dataArray, array($this, 'stringSort'));
					break;
			}
		} else {
			t3lib_div::sysLog('Try to sort "' . $this->sort . '" in "tx_Vidi_Service_GridData::sortDataArray" but $this->dataArray is empty! This might be the Bug #26422 which could not reproduced yet.', 3);
		}
	}

	/**
	 * Implements individual sorting for columns based on integer comparison.
	 *
	 * @param array $a
	 * @param array $b
	 * @return integer
	 */
	protected function intSort(array $a, array $b) {
			// Als erstes nach dem Pfad sortieren
		$path_cmp = strcasecmp($a['path_Workspace'], $b['path_Workspace']);

		if ($path_cmp < 0) {
			return $path_cmp;
		} elseif ($path_cmp == 0) {
			if ($a[$this->sort] == $b[$this->sort]) {
				return 0;
			}
			if ($this->sortDir == 'ASC') {
				return ($a[$this->sort] < $b[$this->sort]) ? -1 : 1;
			} elseif ($this->sortDir == 'DESC') {
				return ($a[$this->sort] > $b[$this->sort]) ? -1 : 1;
			}
		} elseif ($path_cmp > 0) {
			return $path_cmp;
		}
		return 0; //ToDo: Throw Exception
	}

	/**
	 * Implements individual sorting for columns based on string comparison.
	 *
	 * @param  $a
	 * @param  $b
	 * @return int
	 */
	protected function stringSort($a, $b) {
		$path_cmp = strcasecmp($a['path_Workspace'], $b['path_Workspace']);

		if ($path_cmp < 0) {
			return $path_cmp;
		} elseif ($path_cmp == 0) {
			if ($a[$this->sort] == $b[$this->sort]) {
				return 0;
			}
			if ($this->sortDir == 'ASC') {
				return (strcasecmp($a[$this->sort], $b[$this->sort]));
			} elseif ($this->sortDir == 'DESC') {
				return (strcasecmp($a[$this->sort], $b[$this->sort]) * (-1));
			}
		} elseif ($path_cmp > 0) {
			return $path_cmp;
		}
		return 0; //ToDo: Throw Exception
	}


}


if (defined('TYPO3_MODE') && isset($GLOBALS['TYPO3_CONF_VARS'][TYPO3_MODE]['XCLASS']['ext/vidi/Classes/Service/GridData.php'])) {
	include_once($GLOBALS['TYPO3_CONF_VARS'][TYPO3_MODE]['XCLASS']['ext/vidi/Classes/Service/GridData.php']);
}
?>
