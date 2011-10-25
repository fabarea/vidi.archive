<?php
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2010-2011 TYPO3 Tree Team <http://forge.typo3.org/projects/typo3v4-extjstrees>
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
 * Abstract Context Menu Data Provider
 *
 * @author Stefan Galinski <stefan.galinski@gmail.com>
 * @author Steffen Ritter <typo3@steffen-ritter.net>
 * @package TYPO3
 * @subpackage t3lib
 */
class Tx_Vidi_Service_ContextMenu_DataProvider {

	/**
	 * Context Record Type (e.g. pages, tt_content)
	 *
	 * @var string
	 */
	protected $contextRecordType = '';

	/**
	 * Module Code (e.g. table.pages, table.tt_content)
	 *
	 * @var string
	 */
	protected $moduleCode = '';


	/**
	 * Returns the actions of the node
	 *
	 * @param array|object $record
	 * @return t3lib_contextmenu_ActionCollection
	 */
	public function getActionsForRecord($record) {
		$configuration = $this->getConfiguration();
		$contextMenuActions = t3lib_div::makeInstance('t3lib_contextmenu_ActionCollection');
		if (is_array($configuration)) {
			$contextMenuActions = $this->getNextContextMenuLevel($configuration, $record);
		}

		return $contextMenuActions;
	}
	
	/**
	 * Returns the configuration of the specified context menu type
	 *
	 * @return array
	 */
	protected function getConfiguration() {
		$contextMenuRecordActions = $GLOBALS['BE_USER']->getTSConfig(
			'options.contextMenu.table.' . $this->contextRecordType . '.items'
		);

		$contextMenuModuleRecordActions = $GLOBALS['BE_USER']->getTSConfig(
			'options.contextMenu.module.' . $this->moduleCode . '.' . $this->contextRecordType . '.items'
		);

		$contextMenuModuleActions = $GLOBALS['BE_USER']->getTSConfig(
			'options.contextMenu.module.' . $this->moduleCode . '.items'
		);

		$contextMenuActions = array_merge(
			(array)$contextMenuRecordActions['properties'],
			(array)$contextMenuModuleRecordActions['properties'],
			(array)$contextMenuModuleActions['properties']
		);
		return $contextMenuActions;
	}

	/**
	 * Evaluates a given display condition and returns TRUE if the condition matches
	 *
	 * Examples:
	 * getContextInfo|inCutMode:1 || isInCopyMode:1
	 * isLeafNode:1
	 * isLeafNode:1 && isInCutMode:1
	 *
	 * @param array|object $record
	 * @param string $displayCondition
	 * @return boolean
	 */
	protected function evaluateDisplayCondition($record, $displayCondition) {
		if ($displayCondition === '') {
			return TRUE;
		}

			// parse condition string
		$conditions = array();
		preg_match_all('/(.+?)(>=|<=|!=|=|>|<)(.+?)(\|\||&&|$)/is', $displayCondition, $conditions);

		$lastResult = FALSE;
		$chainType = '';
		$amountOfConditions = count($conditions[0]);
		for ($i = 0; $i < $amountOfConditions; ++$i) {

			$method = trim($conditions[1][$i]);
			list($method, $index) = explode('|', $method);
			
			if (is_array($record)) {
				$returnValue = $record[$method];
			} else if (is_object($record) && method_exists($record, $method)) {
					// fetch compare value
				$returnValue = call_user_func(array($record, $method));
			} else {
				continue;
			}

			if (is_array($returnValue)) {
				$returnValue = $returnValue[$index];
			}

				// compare fetched and expected values
			$operator = trim($conditions[2][$i]);
			$expected = trim($conditions[3][$i]);
			if ($operator === '=') {
				$returnValue = ($returnValue == $expected);
			} elseif ($operator === '>') {
				$returnValue = ($returnValue > $expected);
			} elseif ($operator === '<') {
				$returnValue = ($returnValue < $expected);
			} elseif ($operator === '>=') {
				$returnValue = ($returnValue >= $expected);
			} elseif ($operator === '<=') {
				$returnValue = ($returnValue <= $expected);
			} elseif ($operator === '!=') {
				$returnValue = ($returnValue != $expected);
			} else {
				$returnValue = FALSE;
				$lastResult = FALSE;
			}

				// chain last result and the current if requested
			if ($chainType === '||') {
				$lastResult = ($lastResult || $returnValue);
			} elseif ($chainType === '&&') {
				$lastResult = ($lastResult && $returnValue);
			} else {
				$lastResult = $returnValue;
			}

				// save chain type for the next condition
			$chainType = trim($conditions[4][$i]);
		}

		return $lastResult;
	}

	/**
	 * Returns the next context menu level
	 *
	 * @param array $actions
	 * @param array|object $record
	 * @param int $level
	 * @return t3lib_contextmenu_ActionCollection
	 */
	protected function getNextContextMenuLevel(array $actions, $record, $level = 0) {
		/** @var $actionCollection t3lib_contextmenu_ActionCollection */
		$actionCollection = t3lib_div::makeInstance('t3lib_contextmenu_ActionCollection');

		if ($level > 5) {
			return $actionCollection;
		}

		$type = '';
		foreach ($actions as $index => $actionConfiguration) {
			if (substr($index, -1) !== '.') {
				$type = $actionConfiguration;
				if ($type !== 'DIVIDER') {
					continue;
				}
			}

			if (!in_array($type, array('DIVIDER', 'SUBMENU', 'ITEM'))) {
				continue;
			}

			/** @var $action t3lib_contextmenu_Action */
			$action = t3lib_div::makeInstance('t3lib_contextmenu_Action');
			$action->setId($index);

			if ($type === 'DIVIDER') {
				$action->setType('divider');
			} else {
				if (in_array($actionConfiguration['name'], $this->disableItems)
					|| (isset($actionConfiguration['displayCondition'])
						&& trim($actionConfiguration['displayCondition']) !== ''
						&& !$this->evaluateDisplayCondition($record, $actionConfiguration['displayCondition'])
					)
				) {
					unset($action);
					continue;
				}

				$label = $GLOBALS['LANG']->sL($actionConfiguration['label'], TRUE);
				if ($type === 'SUBMENU') {
					$action->setType('submenu');
					$action->setChildActions(
						$this->getNextContextMenuLevel($actionConfiguration, $record, $level + 1)
					);
				} else {
					$action->setType('action');
					$action->setCallbackAction($actionConfiguration['callbackAction']);

					if (is_array($actionConfiguration['customAttributes.'])) {
						$action->setCustomAttributes($actionConfiguration['customAttributes.']);
					}
				}

				$action->setLabel($label);
				if (isset($actionConfiguration['icon']) && trim($actionConfiguration['icon']) !== '') {
					$action->setIcon($actionConfiguration['icon']);
				} elseif (isset($actionConfiguration['spriteIcon'])) {
					$action->setClass(
						t3lib_iconWorks::getSpriteIconClasses($actionConfiguration['spriteIcon'])
					);
				}
			}

			$actionCollection->offsetSet($level . intval($index), $action);
			$actionCollection->ksort();
		}

		return $actionCollection;
	}

	/**
	 * @param string $contextRecordType
	 */
	public function setContextRecordType($contextRecordType) {
		$this->contextRecordType = $contextRecordType;
	}

	/**
	 * @return string
	 */
	public function getContextRecordType() {
		return $this->contextRecordType;
	}

	/**
	 * @param string $moduleCode
	 */
	public function setModuleCode($moduleCode) {
		$this->moduleCode = $moduleCode;
	}

	/**
	 * @return string
	 */
	public function getModuleCode() {
		return $this->moduleCode;
	}
}

?>