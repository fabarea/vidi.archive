<?php
 
interface Tx_Vidi_Service_FilterBar_FilterElementInterface {

	/**
	 * generates
	 * 
	 * @param stdClass $elementObject representation des filter
	 * @return string SQL
	 */
	public function generateSQLRepresentation(stdClass $elementObject);

	/**
	 * checks wether the handed row matches the filter
	 *
	 * @param stdClass $elementObject
	 * @param array $row
	 * @return boolean
	 */
	public function doesArrayMatchFilter(stdClass $elementObject, array $row);

}