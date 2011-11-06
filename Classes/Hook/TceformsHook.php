<?php

class Tx_Vidi_Hook_TceformsHook implements t3lib_TCEforms_dbFileIconsHook {

	public function dbFileIcons_postProcess(array &$params, &$selector, &$thumbnails, array &$icons, &$rightbox, &$fName, array &$uidList, array $additionalParams, t3lib_TCEforms $parentObject) {
		$link = $this->getVidiRecordPickerLink('group', $additionalParams['mode'], $additionalParams['allowed'], $fName);
		if ($link) {
				// remove the old style element browser
			foreach($icons['R'] as $key => $icon) {
				if (strpos($icon, 'setFormValueOpenBrowser(')) {
					unset($icons['R'][$key]);
				}
			}
			$icons['R'][] = $link;
		}
	}

	/**
	 * @param $item
	 * @param $additionalParams
	 * @param t3lib_TCEforms_inline $parentObject
	 * @return void
	 */
	public function renderPossibleRecordsSelectorTypeGroupDB_postProcess(&$item, $additionalParams, t3lib_TCEforms_inline $parentObject) {
		$link = $this->getVidiRecordPickerLink('inline', 'db', $additionalParams['allowed'], $additionalParams['objectPrefix'], FALSE);
		if ($link) $item = $link;
	}

	/**
	 * @param bool $iconOnly
	 * @param string $mode
	 * @param string $allowed
	 * @return
	 */
	protected function getVidiRecordPickerLink($type, $mode, $allowed, $objectId, $iconOnly = TRUE) {
		$createNewRelationText = $GLOBALS['LANG']->sL('LLL:EXT:vidi/Resources/Private/Language/locallang.xml:recordpicker.createNewRelation', 1);
		$recordPicker = t3lib_div::makeInstance('Tx_Vidi_Service_RecordPicker_VidiRecordPicker');
		if ($recordPicker->canHandle($mode, $allowed)) {
			return $recordPicker->renderLink($type, $mode, $allowed, $objectId, $iconOnly, $createNewRelationText);
		}
	}
}

?>