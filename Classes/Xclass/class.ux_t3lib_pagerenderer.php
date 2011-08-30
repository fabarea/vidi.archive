<?php
/***************************************************************
 *  Copyright notice
 *
 *  (c) 2009-2011 Steffen Kamper (info@sk-typo3.de)
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
 * TYPO3 pageRender class (new in TYPO3 4.3.0)
 * This class render the HTML of a webpage, usable for BE and FE
 *
 * @author	Steffen Kamper <info@sk-typo3.de>
 * @package TYPO3
 * @subpackage t3lib
 * $Id$
 */
class ux_t3lib_PageRenderer extends t3lib_PageRenderer {

	/**
	 * helper function for render the javascript libraries
	 *
	 * @return string	content with javascript libraries
	 */
	protected function renderJsLibraries() {
		$out = '';

		if ($this->addSvg) {
			$out .= '<script src="' . $this->processJsFile($this->backPath . $this->svgPath . 'svg.js') .
					'" data-path="' . $this->backPath . $this->svgPath .
					'"' . ($this->enableSvgDebug ? ' data-debug="true"' : '') . '></script>';
		}

		if ($this->addPrototype) {
			$out .= '<script src="' . $this->processJsFile($this->backPath . $this->prototypePath . 'prototype.js') .
					'" type="text/javascript"></script>' . LF;
			unset($this->jsFiles[$this->backPath . $this->prototypePath . 'prototype.js']);
		}

		if ($this->addScriptaculous) {
			$mods = array();
			foreach ($this->addScriptaculousModules as $key => $value) {
				if ($this->addScriptaculousModules[$key]) {
					$mods[] = $key;
				}
			}
				// resolve dependencies
			if (in_array('dragdrop', $mods) || in_array('controls', $mods)) {
				$mods = array_merge(array('effects'), $mods);
			}

			if (count($mods)) {
				foreach ($mods as $module) {
					$out .= '<script src="' . $this->processJsFile($this->backPath .
																   $this->scriptaculousPath . $module . '.js') . '" type="text/javascript"></script>' . LF;
					unset($this->jsFiles[$this->backPath . $this->scriptaculousPath . $module . '.js']);
				}
			}
			$out .= '<script src="' . $this->processJsFile($this->backPath . $this->scriptaculousPath .
														   'scriptaculous.js') . '" type="text/javascript"></script>' . LF;
			unset($this->jsFiles[$this->backPath . $this->scriptaculousPath . 'scriptaculous.js']);
		}

			// include extCore, but only if ExtJS is not included
		if ($this->addExtCore && !$this->addExtJS) {
			$out .= '<script src="' . $this->processJsFile($this->backPath .
														   $this->extCorePath . 'ext-core' . ($this->enableExtCoreDebug ? '-debug' : '') . '.js') .
					'" type="text/javascript"></script>' . LF;
			unset($this->jsFiles[$this->backPath . $this->extCorePath . 'ext-core' . ($this->enableExtCoreDebug ? '-debug' : '') . '.js']);
		}

			// include extJS
		if ($this->addExtJS) {
				// use the base adapter all the time
			// @changed by Fabien: lines commented as ExtJS 4 does not have any adapter anymore
//			$out .= '<script src="' . $this->processJsFile($this->backPath . $this->extJsPath .
//														   'adapter/' . ($this->enableExtJsDebug ?
//					str_replace('.js', '-debug.js', $this->extJSadapter) : $this->extJSadapter)) .
//					'" type="text/javascript"></script>' . LF;
			$out .= '<script src="' . $this->processJsFile($this->backPath . $this->extJsPath .
														   'ext-all' . ($this->enableExtJsDebug ? '-debug' : '') . '.js') .
					'" type="text/javascript"></script>' . LF;

				// add extJS localization
			$localeMap = $this->csConvObj->isoArray; // load standard ISO mapping and modify for use with ExtJS
			$localeMap[''] = 'en';
			$localeMap['default'] = 'en';
			$localeMap['gr'] = 'el_GR'; // Greek
			$localeMap['no'] = 'no_BO'; // Norwegian Bokmaal
			$localeMap['se'] = 'se_SV'; // Swedish


			$extJsLang = isset($localeMap[$this->lang]) ? $localeMap[$this->lang] : $this->lang;
				// TODO autoconvert file from UTF8 to current BE charset if necessary!!!!
			$extJsLocaleFile = $this->extJsPath . 'locale/ext-lang-' . $extJsLang . '.js';
			// @changed by Fabien: lines commented as $this->extJsPath may contain /../ segment when loading ExtJS 4 from an extension 
			// ... which will make function file_exists() fail
//			if (file_exists(PATH_typo3 . $extJsLocaleFile)) {
				$out .= '<script src="' . $this->processJsFile($this->backPath .
															   $extJsLocaleFile) . '" type="text/javascript" charset="utf-8"></script>' . LF;
//			}


				// remove extjs from JScodeLibArray
			unset(
			$this->jsFiles[$this->backPath . $this->extJsPath . 'ext-all.js'],
			$this->jsFiles[$this->backPath . $this->extJsPath . 'ext-all-debug.js']
			);
		}

		if (count($this->inlineLanguageLabelFiles)) {
			foreach ($this->inlineLanguageLabelFiles as $languageLabelFile) {
				$this->includeLanguageFileForInline(
					$languageLabelFile['fileRef'],
					$languageLabelFile['selectionPrefix'],
					$languageLabelFile['stripFromSelectionName'],
					$languageLabelFile['$errorMode']
				);
			}
		}
		unset($this->inlineLanguageLabelFiles);

			// Convert labels/settings back to UTF-8 since json_encode() only works with UTF-8:
		if ($this->getCharSet() !== 'utf-8') {
			if ($this->inlineLanguageLabels) {
				$this->csConvObj->convArray($this->inlineLanguageLabels, $this->getCharSet(), 'utf-8');
			}
			if ($this->inlineSettings) {
				$this->csConvObj->convArray($this->inlineSettings, $this->getCharSet(), 'utf-8');
			}
		}

		$inlineSettings = $this->inlineLanguageLabels ? 'TYPO3.lang = ' . json_encode($this->inlineLanguageLabels) . ';' : '';
		$inlineSettings .= $this->inlineSettings ? 'TYPO3.settings = ' . json_encode($this->inlineSettings) . ';' : '';

		if ($this->addExtCore || $this->addExtJS) {
				// set clear.gif, move it on top, add handler code
			$code = '';
			if (count($this->extOnReadyCode)) {
				foreach ($this->extOnReadyCode as $block) {
					$code .= $block;
				}
			}

			$out .= $this->inlineJavascriptWrap[0] . '
				Ext.ns("TYPO3");
				Ext.BLANK_IMAGE_URL = "' . htmlspecialchars(t3lib_div::locationHeaderUrl($this->backPath . 'gfx/clear.gif')) . '";' . LF .
					$inlineSettings .
					'Ext.onReady(function() {' .
					($this->enableExtJSQuickTips ? 'Ext.QuickTips.init();' . LF : '') . $code .
					' });' . $this->inlineJavascriptWrap[1];
			unset ($this->extOnReadyCode);

			if ($this->extJStheme) {
				if (isset($GLOBALS['TBE_STYLES']['extJS']['theme'])) {
					$this->addCssFile($this->backPath . $GLOBALS['TBE_STYLES']['extJS']['theme'], 'stylesheet', 'all', '', TRUE, TRUE);
				} else {
					$this->addCssFile($this->backPath . $this->extJsPath . 'resources/css/xtheme-blue.css', 'stylesheet', 'all', '', TRUE, TRUE);
				}
			}
			if ($this->extJScss) {
				if (isset($GLOBALS['TBE_STYLES']['extJS']['all'])) {
					$this->addCssFile($this->backPath . $GLOBALS['TBE_STYLES']['extJS']['all'], 'stylesheet', 'all', '', TRUE, TRUE);
				} else {
					$this->addCssFile($this->backPath . $this->extJsPath . 'resources/css/ext-all-notheme.css', 'stylesheet', 'all', '', TRUE, TRUE);
				}
			}
		} else {
			if ($inlineSettings) {
				$out .= $this->inlineJavascriptWrap[0] . $inlineSettings . $this->inlineJavascriptWrap[1];
			}
		}

		return $out;
	}


}

?>
