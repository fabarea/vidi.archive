<?php

class Tx_Vidi_Service_ExtDirect_ContextMenu extends t3lib_contextmenu_extdirect_ContextMenu {

	/**
	 * @var Tx_Vidi_Service_ContextMenu_DataProvider
	 */
	protected $dataProvider;

	public function getActionsForNodeArray($moduleCode, $recordType, $nodeData) {
		if ($this->dataProvider === NULL) {
			/**
			 * @var Tx_Vidi_Service_ContextMenu_DataProvider $dataProvider
			 */
			$dataProvider = t3lib_div::makeInstance('Tx_Vidi_Service_ContextMenu_DataProvider');
			$this->dataProvider = $dataProvider;
		}

		$nodeData = $this->objectToArray($nodeData);
		$this->dataProvider->setModuleCode($moduleCode);
		$this->dataProvider->setContextRecordType($recordType);

		$actions = $this->dataProvider->getActionsForRecord($nodeData);

		return $actions->toArray();
	}

	protected function objectToArray($d) {
		if (is_object($d)) {
			// Gets the properties of the given object
			// with get_object_vars function
			$d = get_object_vars($d);
		}

		if (is_array($d)) {
			/*
			* Return array converted to object
			* Using __FUNCTION__ (Magic constant)
			* for recursive call
			*/
			return array_map(__FUNCTION__, $d);
		}
		else {
			// Return array
			return $d;
		}
	}
}
