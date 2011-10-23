<?php

class Tx_Vidi_Service_ExtDirect_DragAndDrop {

	public function DropGridRecordOnTree($moduleCode, $gridTable, $gridRecord, $treeIndex, $treeRecord, $copy = false) {
		$class = $GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['ddInterface'];

		/**
		 * @var Tx_Vidi_Service_DragAndDrop $ddInterface
		 */
		$ddInterface = t3lib_div::makeInstance($class);
		if ($ddInterface !== null && $ddInterface instanceof Tx_Vidi_Service_DragAndDrop) {
			$treeTable =  $GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['trees'][$treeIndex]['table'];
			$ddInterface->dropGridRecordOnTree($gridTable, $gridRecord, $treeTable, $treeRecord, $copy);
		}
	}

}