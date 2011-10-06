<?php

class Tx_Vidi_Service_ExtDirect_TreeData extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {


	public function getTreeData($parameters){
		$this->initialize($parameters->moduleCode);
		$treeId = $parameters->tree;

		/** @var t3lib_tree_Renderer_ExtJsJson $renderer */
		$renderer = t3lib_div::makeInstance('t3lib_tree_Renderer_ExtJsJson');

		/** @var t3lib_tree_Tca_DatabaseTreeDataProvider $dataProvider */
		$dataProvider = t3lib_div::makeInstance('t3lib_tree_Tca_DatabaseTreeDataProvider');

		$dataProvider->setLookupField('pid');
		$dataProvider->setRootUid(0);
		$dataProvider->setNonSelectableLevelList('*');
		$dataProvider->setLookupMode(t3lib_tree_Tca_DatabaseTreeDataProvider::MODE_PARENT);

		$dataProvider->setTableName($this->moduleConfiguration['trees'][$treeId]['table']);
		$dataProvider->setLabelField('title');
		$dataProvider->setExpandAll(false);
		$dataProvider->initializeTreeData();


		$requestedNode = $dataProvider->renderNode($parameters->node, 1);
		if ($requestedNode != null && ($nodeData = $requestedNode->getChildNodes()) != null) {
			return $renderer->renderNodeCollection($nodeData);
		}
		return array();
	}


}
