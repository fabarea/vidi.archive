<?php
/***************************************************************
*  Copyright notice
*
*  (c) 2010 Dennis Ahrens <dennis.ahrens@fh-hannover.de>
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
 * View helper which allows you to include a CSS File.
 * Note: This feature is experimental!
 * Note: You MUST wrap this Helper with <vidi:Be.moduleContainer>-Tags or <vidi:Fe.pluginContainer>-Tags
 *
 * = Examples =
 *
 * <vidi:be.moduleContainer pageTitle="foo" enableJumpToUrl="false" enableClickMenu="false" loadPrototype="true" loadScriptaculous="false" loadExtJs="true" loadExtJsTheme="false" extJsAdapter="prototype" enableExtJsDebug="true" addCssFile="{f:uri.resource(path:'styles/backend.css')}" addJsFile="{f:uri.resource('scripts/main.js')}">
 * 	<vidi:includeCssFile name="foo.js" extKey="blog_example" pathInsideExt="Resources/Public/JavaScript" />
 * </vidi:be.moduleContainer>
 *
 * @category    ViewHelpers
 * @package     TYPO3
 * @subpackage  tx_vidi
 * @author      Dennis Ahrens <dennis.ahrens@fh-hannover.de>
 * @license     http://www.gnu.org/copyleft/gpl.html
 * @version     SVN: $Id: IncludeCssFileViewHelper.php 30241 2010-02-20 14:26:19Z xperseguers $
 */
class Tx_Vidi_ViewHelpers_IncludeCssFileViewHelper extends Tx_Vidi_ViewHelpers_AbstractViewHelper {

	/**
	 * Calls addCssFile on the Instance of t3lib_pagerenderer.
	 * 
	 * @param string $name the file to include
	 * @param string $extKey the extension, where the file is located
	 * @param string $pathInsideExt the path to the file relative to the ext-folder
	 * @return string the link 
	 */
	public function render($name = NULL, $extKey = 'vidi', $pathInsideExt = 'Resources/Public/Media/StyleSheets/') {
		if ($extKey === NULL) {
			$extKey = $this->controllerContext->getRequest()->getControllerExtensionKey();
		}

		if (TYPO3_MODE === 'FE') {
			$extPath = t3lib_extMgm::extPath($extKey);
			$extRelPath = substr($extPath, strlen(PATH_site));
		} else {
			$extRelPath = t3lib_extMgm::extRelPath($extKey);
		}

		$this->pageRenderer->addCssFile($extRelPath . $pathInsideExt . $name);
	}

}

?>