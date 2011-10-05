<?php

class Tx_Vidi_RecordPicker_VidiRecordPicker {

	/**
	 * @param string $mode
	 * @param string $allowed
	 * @return bool
	 */
	public function canHandle($mode, $allowed) {
		return TRUE;
		return $mode === 'db' && $allowed === 'sys_file';
	}

	// TODO register media and file somehow

	/**
	 * @param string $type One of "group" or "inline"
	 * @param string $mode Browser mode, e.g. "db"
	 * @param string $allowed Allowed records, e.g. "sys_file"
	 * @param string $objectId
	 * @param bool $iconOnly
	 * @return string
	 */
	public function renderLink($type, $mode, $allowed, $objectId, $iconOnly = TRUE) {
		$this->includeJavaScript();
		$createNewRelationText = $GLOBALS['LANG']->sL('LLL:EXT:lang/locallang_core.php:cm.createNewRelation', 1);

		$aOnClick = 'TYPO3.Vidi.RecordPicker.show("' . $type . '", "' . $mode . '", "' . $allowed . '", "' . $objectId . '"); return false;';
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