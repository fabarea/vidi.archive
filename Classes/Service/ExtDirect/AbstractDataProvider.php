<?php

class Tx_Vidi_Service_ExtDirect_AbstractDataProvider {

	/**
	 * the module Configuration will be copied
	 *
	 * @var null|array
	 */
	protected $moduleConfiguration = null;

	protected function loadConfiguration($moduleCode) {
		$this->moduleConfiguration = $GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode];

	}

}
