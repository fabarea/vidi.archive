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
class Tx_Vidi_Service_ExtDirect_Filter extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {

	public function read($params) {
		$this->loadConfiguration($params->moduleCode);
		$table = $params->currentTable;

		$filters = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows(
			'uid,name,table_name,description,criteria,public',
			'tx_vidi_filter',
			'table_name = \''. $table . '\''
		);

		return array(
			'data' => $filters,
			'total'=> count($filters),
			'debug'=> mysql_error()
		);
	}

	public function create($params) {

	}

	public function update($params) {

	}

	public function destroy($params) {

	}
}

?>