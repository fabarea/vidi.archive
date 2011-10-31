
Ext.define('TYPO3.Vidi.Components.Grid.Columns.FileActionColumn', {
	extend: 'Ext.grid.column.Action',
	alias: ['widget.fileActionColumn'],
	iconConfig : [
		{
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-open',
			tooltip: 'Edit',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				TYPO3.Vidi.Actions.File.editTextFile(rec)
			},
			active: function(record) {
				if (record.get('type').substring(0, 5) == 'text/') {
					return true;
				} else {
					return false;
				}
			}
		},
		{
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-delete',
			tooltip: 'Delete',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				TYPO3.Vidi.Actions.File.deleteFile(rec);
			},
			active: function(record) {
				return true;
			}
		},
		{
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-edit t3-icon-edit-rename',
			tooltip: 'Rename',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				TYPO3.Vidi.Actions.File.renameFile(rec);
			},
			active: function(record) {
				return true;
			}

		},
		{
			iconCls: 't3-icon t3-icon-actions t3-icon-actions-document t3-icon-document-info',
			tooltip: 'Info',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				TYPO3.Vidi.Actions.File.showFileInfo(rec);
			},
			active: function(record) {
				return true;
			}
		},
		{
			iconCls: 't3-icon t3-icon-mimetypes t3-icon-mimetypes-x t3-icon-x-sys_action',
			tooltip: '(re)index',
			handler: function(grid, rowIndex, colIndex) {
				var rec = grid.getStore().getAt(rowIndex);
				TYPO3.Vidi.Actions.File.showFileInfo(rec);
			},
			active: function(record) {
				return true;
			}
		}
	],

	constructor: function(cfg) {
		cfg.items = this.iconConfig;
		cfg.width = cfg.items.length * 20;
		this.callParent([cfg]);
		var me = this;
		this.renderer = function(v, meta, record, rowIndex, colIndex, store, view) {
			v = v || '';
			meta.tdCls += ' ' + Ext.baseCSSPrefix + 'action-col-cell';

			for (var i = 0; i < me.items.length; i++) {
				var item = me.items[i];

				item.disabled = !item.active(record);

				item.disable = Ext.Function.bind(me.disableAction, me, [i]);
				item.enable = Ext.Function.bind(me.enableAction, me, [i]);

				v += '<span alt="' + item.altText + '" src="' + Ext.BLANK_IMAGE_URL + '"'
				+' class="' + Ext.baseCSSPrefix + 'action-col-icon ' + Ext.baseCSSPrefix + 'action-col-' + String(i) + ' ' + (item.disabled ? Ext.baseCSSPrefix + 'item-disabled  t3-icon  t3-icon-empty' : item.iconCls) + '"'
				+ ((item.tooltip) ? ' data-qtip="' + item.tooltip + '"' : '') + '>&nbsp;</span>';
			}
			return v;
		};
	}
});