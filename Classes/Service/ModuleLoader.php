<?php

/**
 * service class, used in other extensions to register a vidi based backend module
 */
class Tx_Vidi_Service_ModuleLoader {

	const TREE_PAGES = 1;
	const TREE_FILES = 2;

	protected $_preconfiguredTrees = array(
		0 => array(
			'pages',
			'TYPO3.Components.Tree.StandardTree',
			'TYPO3.Components.Vidi.TCAtreeProvider',
			array()
		),
		1=> array(
			'__FILES',
			'TYPO3.Components.FAL.Tree',
			'TYPO3.Components.FAL.FileTreeProvider',
			array()
		),
	);

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
	protected $position = '';

	/**
	 * @var moduleIcon
	 */
	protected $icon = 'EXT:vidi/ext_icon.gif';

	/**
	 * @var string
	 */
	protected $moduleLanguageFile = 'LLL:EXT:vidi/Resources/Private/Language/locallang_tx_vidi_m1.xml';

	/**
	 * Tree-Configurations
	 *
	 * @var array
	 */
	protected $trees = array();

	/**
	 * @var string
	 */
	protected $moduleKey;

	/**
	 * The names of the datatypes to list
	 *
	 * @var string[]
	 */
	protected $allowedDataTypes = array();
	
	/**
	 * @param string $extensionKey
	 * @param string $moduleKey
	 */
	public function __construct($extensionKey, $moduleKey = 'm1') {
		$this->extensionKey = $extensionKey;
		$this->moduleKey = $moduleKey;
	}

	/**
	 * adds a tree component to the vidi module
	 *
	 * @param string $table
	 * @param string $xtype
	 * @param string $dataProvider
	 * @param array $tcaTreeConfig
	 * @param int $order
	 * @param boolean $default
	 * @return void
	 */
	public function addTree($table, $xtype, $dataProvider, array $tcaTreeConfig, $order = -1, $default = false) {
		$this->trees[$table] = array(
			'xtype'			=> $xtype,
			'dataProvider'	=> $dataProvider,
			'tcaTreeConfig'	=> $tcaTreeConfig,
			'sorting'		=> $order != -1 ? $order : 0,
			'default'		=> $default
		);
	}

	public function addStandardTree($tree) {
		if (isset($this->_preconfiguredTrees[$tree])) {
			$config = &$this->_preconfiguredTrees[$tree];
			$this->addTree($config[0], $config[1], $config[2], $config[3]);
		}
	}
	
	public function removeTree($table) {
		if(isset($this->trees[$table])) {
			unset($this->trees[$table]);
		}
	}

	public function setAllowedDataTypes(array $tables) {
		$this->allowedDataTypes = $tables;
	}



	public function register() {
		$moduleCode = $this->mainModule . '_Vidi' . ucfirst($this->extensionKey) .  ucfirst($this->moduleKey);
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode] = array();
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['allowedDataTypes'] = $this->allowedDataTypes;
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['trees'] = $this->trees;

		Tx_Extbase_Utility_Extension::registerModule(
			'vidi',
			$this->mainModule,
			$this->extensionKey . '_' . $this->moduleKey,
			$this->position,
			array(
				'Vidi' => 'module, popup',
			),
			array(
				'access' => 'user,group',
				'icon'   => $this->icon,
				'labels' => $this->moduleLanguageFile,
			)
		);
	}

	/**
	 * @param string $extensionKey
	 */
	public function setExtensionKey($extensionKey) {
		$this->extensionKey = $extensionKey;
	}

	/**
	 * @return string
	 */
	public function getExtensionKey() {
		return $this->extensionKey;
	}

	/**
	 * @param \moduleIcon $icon
	 */
	public function setIcon($icon) {
		$this->icon = $icon;
	}

	/**
	 * @return \moduleIcon
	 */
	public function getIcon() {
		return $this->icon;
	}

	/**
	 * @param string $mainModule
	 */
	public function setMainModule($mainModule) {
		$this->mainModule = $mainModule;
	}

	/**
	 * @return string
	 */
	public function getMainModule() {
		return $this->mainModule;
	}

	/**
	 * @param string $moduleLanguageFile
	 */
	public function setModuleLanguageFile($moduleLanguageFile) {
		$this->moduleLanguageFile = $moduleLanguageFile;
	}

	/**
	 * @return string
	 */
	public function getModuleLanguageFile() {
		return $this->moduleLanguageFile;
	}

	/**
	 * @param string $position
	 */
	public function setPosition($position) {
		$this->position = $position;
	}

	/**
	 * @return string
	 */
	public function getPosition() {
		return $this->position;
	}
}
