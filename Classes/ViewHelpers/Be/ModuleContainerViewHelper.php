<?php
/***************************************************************
*  Copyright notice
*
*  (c) 2010 Dennis Ahrens <dennis.ahrens@googlemail.com>
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
*
*  This script is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  This copyright notice MUST APPEAR in all copies of the script!
***************************************************************/

/**
 * View helper which allows you to create ExtBase-based modules in the style of
 * TYPO3 default modules.
 * Note: This feature is experimental!
 *
 * = Examples =
 *
 * <code title="Simple">
 * {namespace ext=Tx_Vidi_ViewHelpers}
 * <ext:be.container>your additional viewhelpers inside</ext:be.container>
 * </code>
 *
 * Output:
 * "your module content" wrapped with propper head & body tags.
 * Default backend CSS styles and JavaScript will be included
 *
 * <code title="All options">
 * {namespace ext=Tx_Vidi_ViewHelpers}
 * <ext:be.moduleContainer pageTitle="foo" enableJumpToUrl="false" enableClickMenu="false" loadPrototype="false" loadScriptaculous="false" scriptaculousModule="someModule,someOtherModule" loadExtJs="true" loadExtJsTheme="false" extJsAdapter="jQuery" concatenate="false" compressJs="false" compressCss="false" enableExtJsDebug="true">your module content</f:be.container>
 * </code>
 *
 * @category    ViewHelpers
 * @package     Vidi
 * @subpackage  ViewHelpers_Be
 * @author      Bastian Waidelich <bastian@typo3.org>
 * @author      Dennis Ahrens <dennis.ahrens@googlemail.com>
 * @license     http://www.gnu.org/copyleft/gpl.html
 * @version     SVN: $Id: ModuleContainerViewHelper.php 47944 2011-05-20 13:35:15Z deaddivinity $
 */

	// @todo: - check how this ViewHelper inspired by mvc_extjs should be integrated on the Core eventually
    //        - anaylse what are the benefit of mvc_extjs
class Tx_Vidi_ViewHelpers_Be_ModuleContainerViewHelper extends Tx_Vidi_ViewHelpers_AbstractViewHelper {

	/**
	 *
	 * @var string The extension Key
	 */
	protected $extensionKey = 'vidi';

	/**
	 * Renders start page with template.php and pageTitle.
	 *
	 * @param string  $pageTitle title tag of the module. Not required by default, as BE modules are shown in a frame
	 * @param boolean $enableJumpToUrl If TRUE, includes "jumpTpUrl" javascript function required by ActionMenu. Defaults to TRUE
	 * @param string  $scriptaculousModule additionales modules for scriptaculous
	 * @param boolean $loadExtJs specifies whether to load ExtJS library. Defaults to TRUE
	 * @param boolean $loadExtCore specifies whether to load ExtJS library. Defaults to TRUE
	 * @param boolean $loadExtJsTheme whether to load ExtJS "grey" theme. Defaults to TRUE
	 * @param boolean $enableExtJsDebug if TRUE, debug version of ExtJS is loaded. Use this for development only.
	 * @param boolean $concatenate specifies if the loaded jsFiles should be concatenated into one file. Defaults to TRUE
	 * @param boolean $compressJs specifies wether to compress the js. Defaults TRUE
	 * @param boolean $compressCss specifies wether to compress the css. Defaults TRUE
	 * @param boolean $enableExtJSQuickTips
	 * @return string
	 * @see template
	 * @see t3lib_PageRenderer
	 */
	public function render($pageTitle = '',
						   $enableJumpToUrl = FALSE,
						   $scriptaculousModule = '',
						   $loadExtJs = TRUE,
						   $loadExtCore = FALSE,
						   $loadExtJsTheme = TRUE,
						   $enableExtJsDebug = FALSE,
						   $concatenate = TRUE,
						   $compressJs = TRUE,
						   $compressCss= TRUE,
						   $enableExtJSQuickTips = TRUE) {

		$doc = $this->getDocInstance();

		if ($enableJumpToUrl === TRUE) {
			$doc->JScode .= '
				<script language="javascript" type="text/javascript">
					script_ended = 0;
					function jumpToUrl(URL)	{
						document.location = URL;
					}
					' . $doc->redirectUrls() . '
				</script>
			';
		}

		if ($loadExtJs === TRUE) {
				// @temp. ExtJS 4 should be part of the Core
				// Define the patch
			$this->extJsPath = t3lib_extMgm::extRelPath($this->extensionKey) . 'Resources/Public/Libraries/';
			$this->pageRenderer->setExtJsPath($this->extJsPath . 'ExtJS/');

			// Load the library
			$this->pageRenderer->loadExtJS(TRUE, $loadExtJsTheme);
			$this->pageRenderer->addExtDirectCode();
			if ($enableExtJsDebug === TRUE) {
				$this->pageRenderer->enableExtJsDebug();
			}
		}
		if ($loadExtCore === TRUE) {
			$this->pageRenderer->loadExtCore();
		}
		if ($enableExtJSQuickTips === TRUE) {
			$this->pageRenderer->enableExtJSQuickTips();
		}

		$this->renderChildren();

		if ($compressJs === TRUE) {
			$this->pageRenderer->enableCompressJavaScript();
		}
		if ($compressCss === TRUE) {
			$this->pageRenderer->enableCompressCss();
		}
		if ($concatenate === TRUE) {
			$this->pageRenderer->enableConcatenateFiles();
		}

		$includeCsh = FALSE;
		$output = $doc->startPage($pageTitle, $includeCsh);
		$output .= $this->pageRenderer->getBodyContent();
		$output .= $doc->endPage();
		return $output;
	}


}
?>