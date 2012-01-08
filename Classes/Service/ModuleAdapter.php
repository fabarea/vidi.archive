<?php

/**
 * service class, used in other extensions to reconfigure foreign Vidi Modules
 */
class Tx_Vidi_Service_ModuleAdapter {


	/**
	 * stores the key of the Extension which registers the module
	 *
	 * @var string
	 */
	protected $extensionKey;

	/**
	 * @var string
	 */
	protected $mainModule = 'user';


	/**
	 * @var string
	 */
	protected $moduleKey;


	/**
	 * Constructor of the Module-Adapter
	 *
	 * @param $extensionKey
	 * @param string $moduleKey
	 * @param string $mainModule
	 * @param string $moduleCode
	 */
	public function __construct($extensionKey, $moduleKey = 'm1', $mainModule = 'web', $moduleCode = '') {
		$this->extensionKey = $extensionKey;
		$this->moduleKey = $moduleKey;
		$this->mainModule = $mainModule;
		if ($moduleCode === '') {
			$moduleCode = $this->mainModule . '_Vidi' . ucfirst($this->extensionKey) .  ucfirst($this->moduleKey);
		}
		$this->moduleCode = $moduleCode;
	}

	public function addColumnsToShow($table, array $columnsToShow) {
		if (is_array($GLOBALS['TBE_MODULES_EXT']['vidi'][$this->moduleCode]['columnRestriction'][$table])) {
			foreach ($columnsToShow AS $column) {
				if (!in_array($column, $GLOBALS['TBE_MODULES_EXT']['vidi'][$this->moduleCode]['columnRestriction'][$table])) {
					$GLOBALS['TBE_MODULES_EXT']['vidi'][$this->moduleCode]['columnRestriction'][$table][] = $column;
				}
			}
		} else {
			$GLOBALS['TBE_MODULES_EXT']['vidi'][$this->moduleCode]['columnRestriction'][$table] = $columnsToShow;
		}
	}

	public function removeColumnsToShow($table, array $columnsToShow) {
		if (is_array($GLOBALS['TBE_MODULES_EXT']['vidi'][$this->moduleCode]['columnRestriction'][$table])) {
			foreach ($GLOBALS['TBE_MODULES_EXT']['vidi'][$this->moduleCode]['columnRestriction'][$table] AS $key => $column) {
				if (in_array($column, $columnsToShow)) {
					unset($GLOBALS['TBE_MODULES_EXT']['vidi'][$this->moduleCode]['columnRestriction'][$table][$key]);
				}
			}
		}
	}

	public function addJavaScriptFiles(array $files) {
		
	}
}