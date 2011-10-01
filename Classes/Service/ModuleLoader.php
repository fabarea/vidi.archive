<?php

/**
 * service class, used in other extensions to register a vidi based backend module
 */
class Tx_Vidi_Service_ModuleLoader {

	const TREE_PAGES = 0;
	const TREE_FILES = 1;

	protected $_preconfiguredTrees = array(
		0 => array(
			'table' => 'pages',
			'title' => 'Pagetree',
			'tcaTreeConfig' => array(
				'parentField' => 'pid',
				'rootUid' => 0
			),
			'relationConfiguration' => array(
				'*' => array('foreignField' => 'pid')
			)
		),
		1 => array(
			'__FILES',
			'TYPO3.FAL.Components.Tree',
			'TYPO3.FAL.Components.FileTreeProvider'
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


	protected $additionalJavaScriptFiles = array();

	protected $javaScriptBasePath;
	
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
	 * @param string $title	The headline of the tree
	 * @param string $xtype	The Xtype of the tree-panel
	 * @param string $dataProvider	ExtDirect Provider function for treeStore (readOnly)
	 * @param array $relationConfiguration configures the relation from the tree to the data-tables 
	 * @return void
	 */
	public function addCustomTree($title, $xtype, $dataProvider, array $relationConfiguration) {
		$this->trees[md5($title)] = array(
			'title'			=> $title,
			'xtype'			=> $xtype,
			'dataProvider'	=> $dataProvider,
			'relationConfiguration' => $relationConfiguration,
		);
	}


	public function addTcaBasedTree($table, array $tcaTreeConfig) {
		$this->trees[$table] = array(
			'title'			=> $table,
			'table'			=> $table,
			'tcaTreeConfig'	=> $tcaTreeConfig
		);
	}

	public function addStandardTree($tree) {
		if (isset($this->_preconfiguredTrees[$tree])) {
			$this->trees[count($this->trees) + 1] = $this->_preconfiguredTrees[$tree];
		}
	}

	public function setAllowedDataTypes(array $tables) {
		$this->allowedDataTypes = $tables;
	}



	public function register() {
		$moduleCode = $this->mainModule . '_Vidi' . ucfirst($this->extensionKey) .  ucfirst($this->moduleKey);
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode] = array();
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['extKey'] = $this->extensionKey;
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['allowedDataTypes'] = $this->allowedDataTypes;
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['trees'] = $this->trees;
		$GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode]['additionalJavaScriptFiles'] = $this->additionalJavaScriptFiles;

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

	public function addJavaScriptFiles(array $files, $path = 'Resources/Public/JavaScript/') {
		$this->javaScriptBasePath = $path;
		$this->additionalJavaScriptFiles = $files;
		$GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['RequireJS'][$this->extensionKey] = $path;
	}

	public static function checkAndCreateStarterFile($moduleCode) {
		$jsFiles = array(
				'Vidi/Core/Registry',
				'Vidi/Core/Application',
				'Vidi/Module/UserInterfaceModule',
				'Vidi/Utils',
				'Vidi/Module/ContentBrowser/ContentBrowserGrid',
				'Vidi/Module/ContentBrowser/ContentBrowserView',
				'Vidi/Module/ContentBrowser/TreeRegion',
				'Vidi/Module/UserInterface/BaseModule',
				'Vidi/Module/UserInterface/DocHeader',
				'Vidi/Module/UserInterface/Tree',
				'Vidi/Model/Filter',
				'Vidi/View/Filter/List',
				'Vidi/View/Filter/ListPanel',
				'Vidi/Components/FilterBar',
				'Vidi/Components/Button',
				'Vidi/Components/FilterBar/Item',
				'Vidi/Components/FilterBar/Item/Collection',
				'Vidi/Components/FilterBar/Item/Field',
				'Vidi/Components/FilterBar/Item/Fulltext',
				'Vidi/Components/FilterBar/Item/Operator',
			//	'Vidi/Components/FilterBar/Item/Relation',
				'Vidi/Components/FilterBar/Item/SelectBox',
				'Vidi/Components/FilterBar/Item/Layout/ExtendedCardLayout',
				'Vidi/Components/FilterBar/Item/Layout/InnerLayout',
				'Vidi/Stores/AvailableFields',
			//	'Vidi/Stores/AvailableRelations',
				'Vidi/Stores/FilterBar/CollectionOperators',
				'Vidi/Stores/FilterBar/FieldOperators',
			//	'Vidi/Stores/FilterBar/RelationOperators',
				'Vidi/Stores/FilterBar/Operators',
		);
		$configuration = $GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode];
		$configurationHash = md5(serialize($configuration));

		if (!file_exists(PATH_site . 'typo3temp/vidi/' . $moduleCode . '_' . $configurationHash . '.js') || t3lib_extMgm::getExtensionCacheBehaviour() == 0) {
				// remove files from old configurations
			$starterFiles = t3lib_div::getFilesInDir(PATH_site . 'typo3temp/vidi/', 'js', true);
			foreach ($starterFiles AS $file) {
				if (strpos($file, $moduleCode . '_') !== false) {
					@unlink($file);
				}
			}

				// create new File
			$files = array();
			foreach ($configuration['additionalJavaScriptFiles'] AS $key => $value) {
				$files[] = $configuration['extKey'] . '/' . str_replace('.js', '', $value);
			}

			$starterCode = 'require(["' . implode('","', $jsFiles) . '"], function() {' . LF . "\nTYPO3.Vidi.Application.initialize();\n\n";

			if (count($files)) {
				$files = '["' . implode('","', $files) . '"]';
				$starterCode .= "\n\trequire(" . $files . ", function() {\n\t\tif(console.log) console.log('Module Adaptions loaded');\n\t});\n";
			}

			if (count($configuration['trees'])) {
				/*$treeCode = array();
				foreach($configuration['trees'] AS $tree) {
					$treeCode[] = $tree;
				}*/
				$starterCode .= self::createRegistryCode('vidi/treeConfig', $configuration['trees']);

			}
			$gridDataService = t3lib_div::makeInstance('Tx_Vidi_Service_ExtDirect_GridData');
			$fieldConfigurationData = array();
			$columnConfigurationData = array();
			foreach ($configuration['allowedDataTypes'] AS $table) {
				$fieldConfigurationData[$table] = $gridDataService->buildFieldConfiguration($moduleCode, $table);
				$columnConfigurationData[$table] = $gridDataService->buildColumnConfiguration($moduleCode, $table);
			}
			$starterCode .= self::createRegistryCode('vidi/fieldConfiguration', $fieldConfigurationData);
			$starterCode .= self::createRegistryCode('vidi/columnConfiguration', $columnConfigurationData);

			$starterCode .= self::createRegistryCode('vidi/moduleCode', $moduleCode);
			$starterCode .= self::createRegistryCode('vidi/currentTable', $configuration['allowedDataTypes'][0]);
			
			$starterCode .= "\n\nTYPO3.Vidi.Application.run();\n});";

			t3lib_div::writeFileToTypo3tempDir(PATH_site . 'typo3temp/vidi/' . $moduleCode . '_' . $configurationHash . '.js', $starterCode);
		}
	}

	protected static function createRegistryCode($path, $data) {
		return "	TYPO3.TYPO3.Core.Registry.set('" . $path ."', ". json_encode($data) . ", 99);\n";
	}
}