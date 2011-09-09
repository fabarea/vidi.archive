<?php

/***************************************************************
*  Copyright notice
*
*  (c) 2011 Fabien Udriot <fabien.udriot@typo3.org>
*  
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 3 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
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
 *
 * @package vidi
 * @license http://www.gnu.org/licenses/lgpl.html GNU Lesser General Public License, version 3 or later
 *
 */
// FIXME should this class extend Tx_Extbase_Persistence_Repository? We do all 
// our own queries. So it may not be of much use.
class Tx_Vidi_Domain_Repository_ContentRepository extends Tx_Extbase_Persistence_Repository {

	/**
	 * Finds all user readable records
	 *
	 * @return array All readable records
	 */
	public function findAll() {
			// Traversing all tables
		foreach ($GLOBALS['TCA'] as $table => $cfg) {

				// we do not collect records from tables without permissions on them.
				// How to collect records for "listing" or "modify" these tables. Support the permissions of each type of record (@see t3lib_userAuthGroup::check).
			if (! $GLOBALS['BE_USER']->check('tables_select', $table)) {
				continue;
			}

			$recs = $this->selectAllVersionsFromPages($table, $pageList, $filter);
			$recs = $this->filterPermittedElements($recs, $table);
			if (count($recs)) {
				$output[$table] = $recs;
			}
		}
		return $output;
	}


	/**
	 * Find all versionized elements except moved records.
	 *
	 * @param string $table
	 * @param string $pageList
	 * @param integer $filter
	 * @return array
	 */
	protected function selectAllVersionsFromPages($table, $pageList, $filter) {

		$fields = 'uid, '. $GLOBALS['TCA'][$table]['ctrl']['label'] . ' as title, "' . $table . '" as type';
		//$fields = 'uid, '. $GLOBALS['TCA'][$table]['ctrl']['label'] . ' as title';
		$from = $table; 

		if ($pageList) {
			$pidField = ($table==='pages' ? 'uid' : 'pid');
			$pidConstraint = strstr($pageList, ',') ? ' IN (' . $pageList . ')' : '=' . $pageList;
			$where .= ' AND ' . $pidField . $pidConstraint;
		}

		$where .= t3lib_BEfunc::deleteClause($table);

		/**
		 * Select all records from this table in the database 
		 * Order by UID, mostly to have a sorting in the backend overview module which doesn't "jump around" when swapping.
		 */
		$res = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows($fields, $from, $where, '', 'uid');
		return is_array($res) ? $res : array();
	}


	/**
	 * Remove all records which are not permitted for the user
	 *
	 * @param array $recs
	 * @param string $table
	 * @return array
	 */
	protected function filterPermittedElements($recs, $table) {
		$checkField = ($table == 'pages') ? 'uid' : 'wspid';
		$permittedElements = array();
		if (is_array($recs)) {
			foreach ($recs as $rec) {
				$page = t3lib_beFunc::getRecord('pages', $rec[$checkField], 'uid,pid,perms_userid,perms_user,perms_groupid,perms_group,perms_everybody');
				if ($GLOBALS['BE_USER']->doesUserHaveAccess($page, 1) && $this->isLanguageAccessibleForCurrentUser($table, $rec)) {
					$permittedElements[] = $rec;
				}
			}
		}
		return $permittedElements;
	}

	/**
	* Check current be users language access on given record.
	*
	* @param string $table Name of the table
	* @param array $record Record row to be checked
	* @return boolean
	*/
	protected function isLanguageAccessibleForCurrentUser($table, array $record) {
		$languageUid = 0;

		if (t3lib_BEfunc::isTableLocalizable($table)) {
			$languageUid = $record[$GLOBALS['TCA'][$table]['ctrl']['languageField']];
		}

		return $GLOBALS['BE_USER']->checkLanguageAccess($languageUid);
	}

}
?>
