<?php

class Tx_Vidi_Service_RecordPicker_VidiRecordPicker {

	/**
	 * @param string $mode
	 * @param string $allowed
	 * @return bool
	 */
	public function canHandle($mode, $allowed) {
		return $mode === 'db' && (strpos($allowed,'sys_file') !== FALSE || strpos($allowed, 'sys_file_collection') !== FALSE);
	}

	// TODO register media and file somehow

	/**
	 * @param string $type One of "group" or "inline"
	 * @param string $mode Browser mode, e.g. "db"
	 * @param string $allowed Allowed records, e.g. "sys_file"
	 * @param string $objectId
	 * @param bool $iconOnly
	 * @param string $createNewRelationText
	 * @return string
	 */
	public function renderLink($type, $mode, $allowed, $objectId, $filter=NULL, $iconOnly = TRUE, $createNewRelationText = NULL) {
		$this->includeJavaScript();
		$createNewRelationText = $createNewRelationText !== NULL ? $createNewRelationText : $GLOBALS['LANG']->sL('LLL:EXT:lang/locallang_core.php:cm.createNewRelation', 1);

		$filterParams = json_encode($filter);

		$aOnClick = 'top.TYPO3.Vidi.RecordPicker.show("' . $type . '", "' . $mode . '", "' . $allowed . '", "' . $objectId . '", "'.urlencode($filterParams).'"); return false;';
		return '<a href="#" onclick="' . htmlspecialchars($aOnClick) . '">' .
				t3lib_iconWorks::getSpriteIcon('actions-insert-record', array('title' => $createNewRelationText)) .
				($iconOnly ? '' : $createNewRelationText) .
				'</a>';
	}

	/**
	 * @return void
	 */
	protected function includeJavaScript() {
		$GLOBALS['SOBE']->doc->loadJavascriptLib(t3lib_extmgm::extRelPath('vidi') . 'Resources/Public/JavaScript/RecordPicker.js');
	}
}

?>