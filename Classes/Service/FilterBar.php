<?php
 
class Tx_Vidi_Service_FilterBar {
	/**
	 * @var string
	 */
	protected $table;

	/**
	 * @var
	 */
	protected $query;

	public function __construct($table) {
		$this->table = $table;

	}

	public function generateWhereClause($query) {
		$this->query = json_decode($query);

		$this->groupQueryByOperatorBinding();
		$array = array();
		foreach($this->query AS $object) {
			$array[] = $this->buildClauseSingle($object);
		}
		return implode(' AND ', $array);
	}

	public function groupQueryByOperatorBinding() {
			// remove and operators as they are implicit
		foreach($this->query AS $index => $filterLabel) {
			if ($filterLabel == '&&') {
				unset($this->query[$index]);
			}
		}
			// remove double || operators
		for($i = 0; $i < count($this->query) - 1; $i++) {
			if ($this->query[$i] == '||' && $this->query[$i + 1] == '||') {
				unset($this->query[$i]);
			}
		}
			// reindex after removal
		$this->query = array_values($this->query);
		
			// remove operators at beginning and ending
		if ($this->query[0] == '||') {
			unset($this->query[0]);
		}
		if ($this->query[count($this->query) - 1] == '||') {
			unset($this->query[count($this->query) - 1]);
		}

			// group the or operators;
		while (in_array('||', $this->query)) {
			for($i = 0; $i < count($this->query) - 1; $i++) {
				if ($this->query[$i] == '||') {
					$this->query[$i] = new stdClass();
					$this->query[$i]->type = 'or';
					$this->query[$i]->left = $this->query[$i - 1];
					$this->query[$i]->right = $this->query[$i + 1];
					unset($this->query[$i - 1]);
					unset($this->query[$i + 1]);
				}
			}
			$this->query = array_values($this->query);
		}
	}

	protected function buildClause() {

	}

	protected function buildClauseSingle(stdClass $filterParam) {
		$result ='';
		switch($filterParam->type) {
			case 'or':
				$result = $this->buildClauseSingle_or($filterParam);
				break;
			case 'fulltext':
				$result = $this->buildClauseSingle_fulltext($filterParam);
				break;
			case 'field':
				$result = $this->buildClauseSingle_field($filterParam);
				break;
		}
		return $result;
	}

	protected function buildClauseSingle_or(stdClass $filterParam) {
		return ' (' . $this->buildClauseSingle($filterParam->left) . ' OR ' . $this->buildClauseSingle($filterParam->right) . ') ';
	}


	protected function buildClauseSingle_fulltext(stdClass $filterParam) {
		$searchFields = t3lib_div::trimExplode(',', $GLOBALS['TCA'][$this->table]['ctrl']['searchFields'], TRUE);
		$array = array();
		$like = '\'%' . $GLOBALS['TYPO3_DB']->quoteStr($GLOBALS['TYPO3_DB']->escapeStrForLike($filterParam->string, $this->table), $this->table) . '%\'';

		foreach ($searchFields AS $field) {
			$array[] = $field . ' LIKE ' . $like;
		}
		return ' (' . implode(' OR ', $array) . ') ';
	}

	protected function buildClauseSingle_field(stdClass $filterParam) {
		$field = $GLOBALS['TYPO3_DB']->quoteStr(trim($filterParam->field), $this->table);
		$operator = $filterParam->operator;
		$search = $filterParam->search;

		switch ($operator) {
			case 'l':
			case '!l':
				$search = '\'%' . $GLOBALS['TYPO3_DB']->quoteStr($GLOBALS['TYPO3_DB']->escapeStrForLike($search, $this->table), $this->table) . '%\'';
				$operator = ($operator == '!l' ? ' NOT LIKE ' : ' LIKE ');
				break;
			case '=':
			case '!=':
				$search = $GLOBALS['TYPO3_DB']->quoteStr($search, $this->table);
				$operator = ($operator == '!=' ? ' != ' : ' = ');
				break;
		}
		return $field .$operator . $search;
	}

}
