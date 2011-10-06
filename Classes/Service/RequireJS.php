<?php

class Tx_Vidi_Service_RequireJS {

	/**
	 * @var string
	 */
	protected $requireJsPath;

	public function __construct() {
		$this->requireJsPath = t3lib_extMgm::extRelPath('vidi') . 'Resources/Public/Libraries/RequireJS/require.js';
	}

	protected function generatePathLibraryString() {
		$extensionPath = array('Compressor: "../typo3temp/compressor/"');
		if (!empty($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['RequireJS'])) {


			foreach ($GLOBALS['TYPO3_CONF_VARS']['SC_OPTIONS']['RequireJS'] as $extensionName => $datastructure) {
				$extensionKey = t3lib_div::camelCaseToLowerCaseUnderscored($extensionName);
				$extensionPath[] = $extensionName . ': "' .t3lib_extMgm::extRelPath($extensionKey) . $datastructure['Path'] . '"';
			}
		}
			// transform value to be readable by JS
		$extensionPath = implode(',', $extensionPath);
		return $extensionPath;
	}

	protected function generateFrameworkConfiguration() {
		return 'var require = {baseUrl:"' . t3lib_div::getIndpEnv('TYPO3_SITE_PATH') . 'typo3/",paths:{' . $this->generatePathLibraryString() . '}};';
	}

	public function load($dataMainScript) {
		/** @var t3lib_pageRenderer $pageRenderer */
		$pageRenderer = $this->getDocInstance()->getPageRenderer();
		$pageRenderer->addJsInlineCode('requireJS', $this->generateFrameworkConfiguration(), TRUE, TRUE);
		$pageRenderer->addHeaderData('<script src="' .$this->requireJsPath. '" data-main="' . $dataMainScript . '"></script>');
	}

	/**
	 * Gets instance of template if exists or create a new one.
	 *
	 * @return template $doc
	 */
	protected function getDocInstance() {
		if (!isset($GLOBALS['SOBE']->doc)) {
			$GLOBALS['SOBE']->doc = t3lib_div::makeInstance('template');
			$GLOBALS['SOBE']->doc->backPath = $GLOBALS['BACK_PATH'];
		}
		return $GLOBALS['SOBE']->doc;
	}
}