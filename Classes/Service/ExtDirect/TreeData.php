<?php

class Tx_Vidi_Service_ExtDirect_TreeData {


	public function getTreeData($parameters) {
		/** @var t3lib_tree_Tca_ExtJsArrayRenderer $renderer s*/
		$renderer = t3lib_div::makeInstance('t3lib_tree_Tca_ExtJsArrayRenderer');
				
		/** @var t3lib_tree_Tca_DatabaseTreeDataProvider $dataProvider */
		$dataProvider = t3lib_div::makeInstance('t3lib_tree_Tca_DatabaseTreeDataProvider');

		$dataProvider->setLookupField('pid');
		$dataProvider->setRootUid($parameters->node);
		$dataProvider->setNonSelectableLevelList('0,1');
		$dataProvider->setLookupMode(t3lib_tree_Tca_DatabaseTreeDataProvider::MODE_PARENT);
		$dataProvider->setTableName('pages');
		$dataProvider->setLabelField('title');
		$dataProvider->setExpandAll(false);
		$dataProvider->initializeTreeData();
		return $renderer->renderNodeCollection(
			$dataProvider->getRoot()->getChildNodes(),
			false
		);
	}


}
