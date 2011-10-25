
Ext.namespace('TYPO3.Vidi.Actions');

TYPO3.Vidi.Actions.File = {

	renameFile: function(record) {
		var currentName = record.get('name');
		Ext.Msg.prompt(
			'FileName',
			'Please enter the new file name',
			function(btn, newFilename){
				if (btn == 'ok'){
					TYPO3.Vidi.Service.ExtDirect.FileActions.renameFile(
						record.get('id'),
						newFilename,
						function() {
							Ext.StoreManager.get('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore').load();
						}
					);
				}
			},
			this,
			false,
			currentName
		);

	},

	deleteFile: function(record) {
		Ext.Msg.confirm(
			'Datei löschen',
			'wollen Sie die Datei "' + record.get('name') + '" wirklich unwiderruflich löschen?',
			function(btn) {
				if (btn == 'yes'){
					TYPO3.Vidi.Service.ExtDirect.FileActions.deleteFile(
						record.get('id'),
						function() {
							Ext.StoreManager.get('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore').load();
						}
					);
				}
			}
		);
	},
	editTextFile: function(record) {
		Ext.create(
			'TYPO3.Vidi.Components.Overlay',
			'file_edit.php?' + Ext.Object.toQueryString({target: record.get('id')}, true),
			'editContentRecord',
			function() {}
		);
	},
	showFileInfo: function(record) {
		if (top.launchView !== undefined) {
			top.launchView(record.get('id'), '');
		}
	},
	createEmptyFile: function() {
		var currentFolder = this._getCurrentFolder();
		Ext.Msg.prompt(
			'FileName',
			'Please enter the new file name',
			function(btn, newFilename){
				if (btn == 'ok'){
					TYPO3.Vidi.Service.ExtDirect.FileActions.createEmptyFile(
						currentFolder,
						newFilename,
						function() {
							Ext.StoreManager.get('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore').load();
						}
					);
				}
			}
		);
	},

	renameFolder: function(record) {
		var currentName = record.get('text');
		Ext.Msg.prompt(
			'FolerName',
			'Please enter the new folder name',
			function(btn, newFilename){
				if (btn == 'ok'){
					TYPO3.Vidi.Service.ExtDirect.FileActions.renameFolder(
						record.get('id'),
						newFilename,
						function() {
							//Ext.StoreManager.get('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore').load();
						}
					);
				}
			},
			this,
			false,
			currentName
		);
	},

	deleteFolder: function(folder) {
		Ext.Msg.confirm(
			'Ordner löschen',
			'wollen Sie den Ordner "' + record.get('name') + '" wirklich unwiderruflich löschen? Alle darin enthaltene Ordner und Dateien werden ohne weitere Rückfrage ebenso gelöscht.',
			function(btn) {
				if (btn == 'yes'){
					TYPO3.Vidi.Service.ExtDirect.FileActions.deleteFile(
						record.get('id'),
						function() {
							Ext.StoreManager.get('TYPO3.Vidi.Module.ContentBrowser.ContentBrowserStore').load();
						}
					);
				}
			}
		);
	},

	createFolder: function(parentFolder, newFolderName) {
		
	}
};