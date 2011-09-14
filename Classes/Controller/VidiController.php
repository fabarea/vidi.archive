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
	 * contentRepository
	 *
	 * @var Tx_Vidi_Domain_Repository_ContentRepository
	 */
	protected $contentRepository;

	/**
	 * module Configuration
	 *
	 * @var array
	 */
	protected $configuration;
	
	/**
	 * injectContentRepository
	 *
	 * @param Tx_Vidi_Domain_Repository_ContentRepository $contentRepository
	 * @return void
	 */
	public function injectContentRepository(Tx_Vidi_Domain_Repository_ContentRepository $contentRepository) {
		$this->contentRepository = $contentRepository;
	}


	/**
	 * load the current configuration
	 *
	 * @return void
	 */
	public function initializeAction() {
		$moduleCode = t3lib_div::_GP('M');
		$this->configuration = $GLOBALS['TBE_MODULES_EXT']['vidi'][$moduleCode];

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
	 * the action to render as popup
	 *
	 * @return string The renderd popup action
	 */
	public function popupAction() {
		return 'not yet implemented';
	}
}
?>