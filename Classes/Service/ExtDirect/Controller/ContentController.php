<?php
/***************************************************************
*  Copyright notice
*
*  (c) 2011 Fabien Udriot <fabien.udriot@ecodev.ch>
*  All rights reserved
*
*  This script is part of the TYPO3 project. The TYPO3 project is
*  free software; you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation; either version 2 of the License, or
*  (at your option) any later version.
*
*  The GNU General Public License can be found at
*  http://www.gnu.org/copyleft/gpl.html.
*  A copy is found in the textfile GPL.txt and important notices to the license
*  from the author is found in LICENSE.txt distributed with these scripts.
*
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
 * @version $Id$
 * @copyright Copyright belongs to the respective authors
 * @license http://www.gnu.org/licenses/gpl.html GNU General Public License, version 3 or later
 */
class Tx_Vidi_Service_ExtDirect_Controller_ContentController extends Tx_Extbase_MVC_Controller_ActionController {
	
	/**
	 * @var Tx_Vidi_Domain_Repository_ContentRepository
	 */
	protected $contentRepository;

	/**
	 * Fetches the next tree level
	 *
	 * @param int $nodeId
	 * @param stdClass $nodeData
	 * @return array
	 */
	public function getNextTreeLevel($nodeId, $nodeData) {
		
		/** @var $dataProvider Tx_Taxonomy_ExtDirect_DataProvider */
		$tree = t3lib_div::makeInstance('Tx_Taxonomy_ExtDirect_Tree');
		
		return $tree->getNextTreeLevel($nodeId, $nodeData);
	}
	
	/**
	 * Return the record type for a node
	 *
	 * @param int $nodeId
	 * @param stdClass $nodeData
	 * @return array $content
	 */
	public function getRecordType($nodeId, $nodeData) {
		$values = array(
			'tt_news',
			'tt_content',
		);
		return $values;
	}

	/**
	 * @param string $query
	 * @return array
	 */
	public function getRecords($parameters) {
		$parameter = array (
		  'depth' => 990,
		  'id' => 1,
		  'limit' => $parameters->limit,
		  'start' => $parameters->start,
		  'page' => $parameters->page,
		  'filterTxt' => $parameters->query
		);
		$table = 'cache_extensions';
		$data = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows("title, CONCAT(extkey, '', version) as uid", $table, 'lastversion=1' . ' AND ' . $this->generateWhereClauseFromQuery($table, $parameters->query), '','', '100'); //, '', '', '100');
   		return array(
			   'data' => $data,
			   'total' => count($data)
		   );
	}

	protected function generateWhereClauseFromQuery($table, $query) {
		$query = json_decode($query);
		$where = array('1=1');
		foreach ($query AS $property) {
			if (is_object($property)) {
				switch($property->type) {
					case 'fulltext':
						$where[] = ' title LIKE \'%' . $property->string . '%\'';
						break;
				}
			}
		}
		return implode(' AND ', $where);
	}


	/**
	 * Loads repositories
	 *
	 * @return array
	 */
	public function getRepositories() {
		//$settings = $this->getSettings();
		//$repositories = tx_em_Database::getRepositories();
		$records = array(
			1 => array (
				'uid' => '1',
				'title' => 'tt_news',
			),
			2 => array (
				'uid' => '2',
				'title' => 'tt_content',
			)
		);
		
		$data = array();

		foreach ($records as $uid => $record) {
			$data[] = array(
				'title' => $record['title'],
				'uid' => $record['uid'],
//				'description' => $repository['description'],
//				'wsdl_url' => $repository['wsdl_url'],
//				'mirror_url' => $repository['mirror_url'],
//				'count' => $repository['extCount'],
//				'updated' => $repository['lastUpdated'] ? date('d/m/Y H:i', $repository['lastUpdated']) : 'never',
//				'selected' => $repository['uid'] === $settings['selectedRepository'],
			);
		}

		return array(
			'length' => count($data),
			'data' => $data,
		);
	}
	
	/**
	 * Inserts a new node as the first child node of the destination node and returns the created node.
	 *
	 * @param stdClass $parentNodeData
	 * @param int $pageType
	 * @return array
	 */
	public function insertNodeToFirstChildOfDestination($parentNodeData, $pageType) {
		
		/* ********************************** */
		// Save a new concept
		#$GLOBALS['TSFE'] = t3lib_div::makeInstance('tslib_fe', $GLOBALS['TYPO3_CONF_VARS'], 0, 0);
		#$GLOBALS['TSFE']->sys_page = t3lib_div::makeInstance('t3lib_pageSelect');
		// get instance of object manager
		$objectManger = t3lib_div::makeInstance('Tx_Extbase_Object_ObjectManager');

		// Init repository
		$conceptRepository = $objectManger->get('Tx_Taxonomy_Domain_Repository_ConceptRepository');

		// Init Model
		$concept = $objectManger->get('Tx_Taxonomy_Domain_Model_Concept');
		#$concept->

		// Add concept to the repository
		$conceptRepository->add($concept);

		// save changes back to tables. needed only when you are expecting something to be saved back to db table. No need for read only access
		$objectManger->get('Tx_Extbase_Persistence_Manager')->persistAll(); 

		
		
		
		/* ********************************** */
		// make sure identity has been set
		$identityMap = t3lib_div::makeInstance('Tx_Identity_Map');
		
			// Update UUID values
		$identityMap->rebuild();
		$identityMap->commit();
		

		
		/* ********************************** */
		/* Add relation with the parent object */
		if ((int) $parentNodeData->id > 0) {
//			define('EF_PATH_ROOT', PATH_site);
//			define('EF_PATH_FRAMEWORK', t3lib_extmgm::extPath('taxonomy') . 'Resources/PHP/Libraries/Erfurt/');
//			define('EF_PATH_CONFIGURATION', t3lib_extmgm::extPath('taxonomy') . 'Configuration/');
//			define('EF_PATH_DATA', PATH_site  . 'typo3temp/taxonomy/');
//			define('EF_PATH_PACKAGES', t3lib_extmgm::extPath('taxonomy') . 'Resources/PHP/');
//			$bootstrap = new \Erfurt\Core\Bootstrap('Development');
//			$bootstrap->run();
//			$objectManager = $bootstrap->getObjectManager();
//			
//			$parentNode = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows('*', 'tx_taxonomy_domain_model_concept', 'uid = ' . (int) $parentNodeData->id);
//			
//			$currentNode = $GLOBALS['TYPO3_DB']->exec_SELECTgetRows('*', 'tx_taxonomy_domain_model_concept', 'uid = ' . (int) $concept->getUid());
//			
//			$store = $objectManager->get('Erfurt\Store\Store');
//			$graph = $store->getGraph('http://www.w3.org/2004/02/skos/core#');
//			$graph->addStatement('urn:uuid:' . $currentNode[0]['uuid'], 'skos:narrower', array('value' => 'urn:uuid:' . $parentNode[0]['uuid'], 'type' => 'iri'));
//			
//			$bootstrap->shutdown();
		}


		$response = Array (
			'serializeClassName' => 't3lib_tree_pagetree_Node',
			'id' => 'mp-0-76',
			'type' => 'pages',
			'editableText' => 'Default Title',
			'text' => 'Default Title',
			'cls' => '',
			'prefix' => '',
			'suffix' => '',
			'qtip' => 'id=76<br />',
			'expanded' => '1',
			'expandable' => '',
			'draggable' => '1',
			'isTarget' => '1',
			#'spriteIconCode' => '<span class="t3-icon t3-icon-tcarecords t3-icon-tcarecords-tx_taxonomy_domain_model_concept t3-icon-tx_taxonomy_domain_model_concept-default"><span class="t3-icon t3-icon-status t3-icon-status-overlay t3-icon-overlay-hidden t3-icon-overlay">&nbsp;</span></span>',
			'spriteIconCode' => '<span class="t3-icon t3-icon-tcarecords t3-icon-tcarecords-tx_taxonomy_domain_model_concept t3-icon-tx_taxonomy_domain_model_concept-default">&nbsp;</span>',
			't3TextSourceField' => 'title',
			't3InCopyMode' => '',
			't3InCutMode' => '',
			't3ContextInfo' => Array(),
			'editable' => '1',
			'allowChildren' => '1',
			'nodeData' => Array
				(
					'serializeClassName' => 't3lib_tree_pagetree_Node',
					'id' => '76',
					'type' => 'pages',
					'editableText' => 'Default Title',
					'text' => 'Default Title',
					'cls' => '',
					'prefix' => '',
					'suffix' => '',
					'qtip' => 'id=76<br />',
					'expanded' => '1',
					'expandable' => '',
					'draggable' => '1',
					'isTarget' => '1',
					'spriteIconCode' => '<span class="t3-icon t3-icon-tcarecords t3-icon-tcarecords-tx_taxonomy_domain_model_concept t3-icon-tx_taxonomy_domain_model_concept-default">&nbsp;</span>',
					't3TextSourceField' => 'title',
					't3InCopyMode' => '',
					't3InCutMode' => '',
					't3ContextInfo' => Array(),
					'editable' => '1',
					'allowChildren' => '1',
					'readableRootline' => '',
					'mountPoint' => '0',
					'workspaceId' => '76',
					'isMountPoint' => '',
				),
			'realId' => '76',
			'readableRootline' => '',
);
		return $response;
				
		/** @var $parentNode t3lib_tree_pagetree_Node */
		$parentNode = t3lib_div::makeInstance('t3lib_tree_pagetree_Node', (array) $parentNodeData);

		try {
			$newPageId = t3lib_tree_pagetree_Commands::createNode($parentNode, $parentNode->getId(), $pageType);
			$returnValue = t3lib_tree_pagetree_Commands::getNode($newPageId)->toArray();
		} catch (Exception $exception) {
			$returnValue = array(
				 'success' => FALSE,
				 'message' => $exception->getMessage(),
			 );
		}

		return $returnValue;
	}
	

	/**
	 * Updates the given field with a new text value, may be used to inline update
	 * the title field in the new page tree
	 *
	 * @param stdClass $nodeData
	 * @param string $updatedLabel
	 * @return array
	 */
	public function updateLabel($nodeData, $updatedLabel) {
		if ($updatedLabel === '') {
			return array();
		}

		/** @var $node t3lib_tree_pagetree_Node */
		$node = t3lib_div::makeInstance('t3lib_tree_pagetree_Node', (array) $nodeData);

		try {
			t3lib_tree_pagetree_Commands::updateNodeLabel($node, $updatedLabel);

			$shortendedText = t3lib_div::fixed_lgd_cs($updatedLabel, intval($GLOBALS['BE_USER']->uc['titleLen']));
			$returnValue = array(
				'editableText' => $updatedLabel,
				'updatedText' => htmlspecialchars($shortendedText),
			);
		} catch (Exception $exception) {
			$returnValue = array(
				 'success' => FALSE,
				 'message' => $exception->getMessage(),
			 );
		}

		return $returnValue;
	}
	
	/**
	 * Render remote extension list
	 *
	 * @param object $parameters
	 * @return string $content
	 */
	public function getRemoteExtensionList($parameters) {
		return array();
	}

}

?>
