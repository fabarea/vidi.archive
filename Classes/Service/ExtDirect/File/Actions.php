<?php

class Tx_Vidi_Service_ExtDirect_File_Actions {

	/**
	 * @var t3lib_file_Factory
	 */
	protected $fileFactory;

	public function __construct() {
		$this->fileFactory = t3lib_div::makeInstance('t3lib_file_Factory');
	}

	/**
	 * @param string $fileIdentifier
	 * @param string $newFileName
	 * @return void
	 */
	public function renameFile($fileIdentifier, $newFileName) {
		$file = $this->fileFactory->getFileObjectFromCombinedIdentifier($fileIdentifier);
		$file->rename($newFileName);
	}

	/**
	 * @param $fileIdentifier
	 * @return void
	 */
	public function deleteFile($fileIdentifier) {
		$file = $this->fileFactory->getFileObjectFromCombinedIdentifier($fileIdentifier);
		$file->delete();
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

}
