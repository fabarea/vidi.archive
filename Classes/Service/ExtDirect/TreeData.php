<?php

class Tx_Vidi_Service_ExtDirect_TreeData extends Tx_Vidi_Service_ExtDirect_AbstractDataProvider {


	public function getTreeData($parameters){
		$this->initialize($parameters->moduleCode);
		$treeId = $parameters->tree;

		/** @var t3lib_tree_Renderer_ExtJsJson $renderer */
		$renderer = t3lib_div::makeInstance('t3lib_tree_Renderer_ExtJsJson');

		/** @var t3lib_tree_Tca_DatabaseTreeDataProvider $dataProvider */
		$dataProvider = t3lib_div::makeInstance('t3lib_tree_Tca_DatabaseTreeDataProvider');

		$dataProvider->setRootUid(0);
		$dataProvider->setNonSelectableLevelList('*');
		if ($this->moduleConfiguration['trees'][$treeId]['treeConfig']['parentField']) {
			$dataProvider->setLookupMode(t3lib_tree_Tca_DatabaseTreeDataProvider::MODE_PARENT);
			$dataProvider->setLookupField($this->moduleConfiguration['trees'][$treeId]['treeConfig']['parentField']);
		} else if ($this->moduleConfiguration['trees'][$treeId]['treeConfig']['childrenField']) {
			$dataProvider->setLookupMode(t3lib_tree_Tca_DatabaseTreeDataProvider::MODE_CHILDREN);
			$dataProvider->setLookupField($this->moduleConfiguration['trees'][$treeId]['treeConfig']['childrenField']);
		} else {
			$dataProvider->setLookupMode(t3lib_tree_Tca_DatabaseTreeDataProvider::MODE_PARENT);
			$dataProvider->setLookupField('pid');
		}


		$dataProvider->setTableName($this->moduleConfiguration['trees'][$treeId]['table']);
		$dataProvider->setLabelField($GLOBALS['TCA'][$this->moduleConfiguration['trees'][$treeId]['table']]['ctrl']['label']);
		$dataProvider->setExpandAll(false);
		$dataProvider->initializeTreeData();


		$requestedNode = $dataProvider->renderNode($parameters->node, 1);
		if ($requestedNode != null && ($nodeData = $requestedNode->getChildNodes()) != null) {
			return $renderer->renderNodeCollection($nodeData);
		}
		return array();
	}

	public function isLabelEditable($parameters){
		$this->initialize($parameters->moduleCode);
		return $this->moduleConfiguration['trees'][$parameters->tree]['treeConfig']['editable'];
	}

	public function updateLabel($parameters, $nodeId, $newLabel) {
		$this->initialize($parameters->moduleCode);
		if ($this->moduleConfiguration['trees'][$parameters->tree]['treeConfig']['editable']) {
			// @TODO build tceMain-Code for updating the label
		}
	}
}
