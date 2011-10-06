<?php

/***************************************************************
*  Copyright notice
*
*  (c) 2011 Fabien Udriot <fabien.udriot@typo3.org>
*  
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 3 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/


/**
 *
 *
 * @package vidi
 * @license http://www.gnu.org/licenses/lgpl.html GNU Lesser General Public License, version 3 or later
 *
 */
class Tx_Vidi_Controller_VidiController extends Tx_Extbase_MVC_Controller_ActionController {

	/**
	 * module Configuration
	 *
	 * @var array
	 */
	protected $configuration;
	
	/**
	 * load the current configuration
	 *
	 * @return void
	 */
	public function initializeAction() {
		if (!isset($GLOBALS['SOBE']->doc)) {
			$GLOBALS['SOBE']->doc = t3lib_div::makeInstance('template');
			$GLOBALS['SOBE']->doc->backPath = $GLOBALS['BACK_PATH'];
		}
		$moduleCode = t3lib_div::_GP('M');
		$this->configuration = $GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode];

		Tx_Vidi_Service_ModuleLoader::checkAndCreateStarterFile($moduleCode);

		$configurationHash = md5(serialize($this->configuration) . $GLOBALS['TBE_MODULES_EXT']['vidi']['__tempMergeResult']);
		$this->objectManager->create('Tx_Vidi_Service_RequireJS')->load('../typo3temp/vidi/' . $moduleCode . '_' . $configurationHash . '.js');
		
		foreach($this->configuration->allowedDataTypes AS $table) {
			if (isset($GLOBALS['TCA'][$table])) {
				t3lib_div::loadTCA($table);
			}
		}
	}

	/**
	 * the action to render as backend-module
	 *
	 * @return string The rendered module action
	 */
	public function moduleAction() {
		$this->view->assign('moduleConfiguration', $this->configuration);
		$configuration = $this->configurationManager->getConfiguration(Tx_Extbase_Configuration_ConfigurationManagerInterface::CONFIGURATION_TYPE_FRAMEWORK);
		if(empty($configuration['persistence']['storagePid'])){
			$this->flashMessageContainer->add('No storagePid! You have to include the static template of this extension and set the constant plugin.tx_' . t3lib_div::lcfirst($this->extensionName) . '.persistence.storagePid in the constant editor');
		}
	}


	/**
	 * Render the RecordPicker (formally known as the ElementBrowser)
	 *
	 * @param string $callbackMethod
	 * @param string $objectId
	 * @return void
	 */
	public function browseAction($callbackMethod = '', $objectId = '') {
		$this->view->assign('callbackMethod', $callbackMethod);
		$this->view->assign('objectId', $objectId);
		$this->view->assign('moduleConfiguration', $this->configuration);
	}
}
?>