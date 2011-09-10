<?php
 
class Tx_Vidi_Service_FilterBar {

	public static function groupQueryByOperatorBinding($query) {
		$query = unserialize($query);
		t3lib_div::debug($query);
	}
}
