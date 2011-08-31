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
class Tx_Vidi_Controller_ContentController extends Tx_Extbase_MVC_Controller_ActionController {

	/**
	 * contentRepository
	 *
	 * @var Tx_Vidi_Domain_Repository_ContentRepository
	 */
	protected $contentRepository;

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
	 * action list
	 *
	 * @return string The rendered list action
	 */
	public function listAction() {
		$configuration = $this->configurationManager->getConfiguration(Tx_Extbase_Configuration_ConfigurationManagerInterface::CONFIGURATION_TYPE_FRAMEWORK);
		if(empty($configuration['persistence']['storagePid'])){
			$this->flashMessageContainer->add('No storagePid! You have to include the static template of this extension and set the constant plugin.tx_' . t3lib_div::lcfirst($this->extensionName) . '.persistence.storagePid in the constant editor');
		}
		# @todo: not necessary to fetch content here as it is done by ExtDirect later on. Find a more appropriate action for that
		#$contents = $this->contentRepository->findAll();
		#$this->view->assign('contents', $contents);
	}
	
	/**
	 * Initializes the View to be a Tx_MvcExtjs_ExtDirect_View that renders json without Template Files.
	 * 
	 * @return void
	 */
	public function initializeView() {
		if ($this->request->getFormat() === 'extdirect') {
			$this->view = $this->objectManager->create('Tx_MvcExtjs_MVC_View_ExtDirectView');
			$this->view->setControllerContext($this->controllerContext);
		}
	}

}
?>