<?php

class Tx_Vidi_Service_ExtDirect_File_Actions {

	/**
	 * @var t3lib_file_Factory
	 */
	protected $fileFactory;

	/**
	 * @var t3lib_extFileFunctions
	 */
	protected $fileProcessor;

	public function __construct() {
		$this->fileFactory = t3lib_div::makeInstance('t3lib_file_Factory');

			// Initializing:
		$this->fileProcessor = t3lib_div::makeInstance('t3lib_extFileFunctions');
		$this->fileProcessor->init($GLOBALS['FILEMOUNTS'], $GLOBALS['TYPO3_CONF_VARS']['BE']['fileExtensions']);
		$this->fileProcessor->init_actionPerms($GLOBALS['BE_USER']->getFileoperationPermissions());
		$this->fileProcessor->dontCheckForUnique = t3lib_div::_GP('overwriteExistingFiles') ? 1 : 0; // @todo change this to fit Vidi UI
	}

	/**
	 * Rename the file
	 *
	 * @param string $fileIdentifier
	 * @param string $newFileName
	 * @return void
	 */
	public function renameFile($fileIdentifier, $newFileName) {
		if ($this->checkReferer()) {

			$fileValues = array(
				'rename' => array(
					array(
						'data' => $fileIdentifier,
						'target' => $newFileName,
					)
				)
			);

			$this->fileProcessor->start($fileValues);
			$this->fileProcessor->processData();
		}
	}

	/**
	 * Delete a file
	 *
	 * @param $fileIdentifier
	 * @return void
	 */
	public function deleteFile($fileIdentifier) {
		if ($this->checkReferer()) {

			$fileValues = array(
					array(
					'delete' => array(
						'data' => $fileIdentifier,
					)
				)
			);

			$this->fileProcessor->start($fileValues);
			$this->fileProcessor->processData();
		}
	}

	/**
	 * @param $folderIdentifier
	 * @param $newFileName
	 * @return void
	 */
	public function createEmptyFile($folderIdentifier, $newFileName) {
		$folder = $this->fileFactory->getFolderObjectFromCombinedIdentifier($folderIdentifier);
		$folder->createFile($newFileName);
	}

	/**
	 * @param $folderIdentifier
	 * @param $newName
	 * @return void
	 */
	public function renameFolder($folderIdentifier, $newName) {
		$folder = $this->fileFactory->getFolderObjectFromCombinedIdentifier($folderIdentifier);
		$folder->rename($newName);
	}

	/**
	 * @param $folderIdentifier
	 * @param bool $recursive
	 * @return void
	 */
	public function deleteFolder($folderIdentifier, $recursive = false) {
		$folder = $this->fileFactory->getFolderObjectFromCombinedIdentifier($folderIdentifier);
		$folder->delete(); // @TODO make deleteFolder aware of non empty folders
	}

	/**
	 * @param $parentFolder
	 * @param $newFolderName
	 * @return void
	 */
	public function createFolder($parentFolder, $newFolderName) {
		$folder = $this->fileFactory->getFolderObjectFromCombinedIdentifier($parentFolder);
		$folder->getStorage()->createFolder($folder->getIdentifier() . '/' . $newFolderName, false); // @TODO this is quite ugly and only will work for LocalDriver
	}

	/**
	 * Makes sure the referer is correct.
	 *
	 * @return boolean
	 */
	protected function checkReferer() {
		$result = TRUE;

			// Checking referer / executing:
		$refInfo = parse_url(t3lib_div::getIndpEnv('HTTP_REFERER'));
		$httpHost = t3lib_div::getIndpEnv('TYPO3_HOST_ONLY');

			// @todo: Decide what to do: a check has been removed from original code
			//		  @see class TYPO3_tcefile
			//        $this->vC != $GLOBALS['BE_USER']->veriCode()
		if ($httpHost != $refInfo['host'] && !$GLOBALS['$TYPO3_CONF_VARS']['SYS']['doNotCheckReferer']) {
			$this->fileProcessor->writeLog(0,2,1,'Referer host "%s" and server host "%s" did not match!', array($refInfo['host'], $httpHost));
			throw new t3lib_exception("Referer host \"" . $refInfo['host'] . "\" and server host \"$httpHost\" did not match!", 1321247357);
		}
		return $result;
	}
}
