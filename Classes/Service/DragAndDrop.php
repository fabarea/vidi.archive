<?php

interface Tx_Vidi_Service_DragAndDrop {

	public function dropGridRecordOnTree($gridTable, $gridRecord, $treeTable, $treeRecord, $copy = false);
}