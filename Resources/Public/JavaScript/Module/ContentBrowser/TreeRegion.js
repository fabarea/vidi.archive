Ext.ns("TYPO3.Vidi.Module.ContentBrowser");

/*                                                                        *
 * This script is part of the TYPO3 project.                              *
 *                                                                        *
 * It is free software; you can redistribute it and/or modify it under    *
 * the terms of the GNU General Public License as published by the Free   *
 * Software Foundation, either version 3 of the License, or (at your      *
 * option) any later version.                                             *
 *                                                                        *
 * This script is distributed in the hope that it will be useful, but     *
 * WITHOUT ANY WARRANTY; without even the implied warranty of MERCHAN-    *
 * TABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General      *
 * Public License for more details.                                       *
 *                                                                        *
 * You should have received a copy of the GNU General Public License      *
 * along with the script.                                                 *
 * If not, see http://www.gnu.org/licenses/gpl.html                       *
 *                                                                        *
 * The TYPO3 project - inspiring people to share!                         *
 *                                                                        */
Ext.define('TYPO3.Vidi.Module.ContentBrowser.TreeRegion', {
	alias: 'widget.TYPO3.Vidi.Module.ContentBrowser.TreeRegion',
	extend: 'Ext.container.Container',
	region: 'west',
	width: 200,
	layout:  {
		type: 'accordion',
		align: 'stretch'
	},
	items: [
		{
			xtype: 'panel',title: 'Taxonomy',
			collapsible: true,
			items: {
				id: 'test34',
				xtype: 'TYPO3.Vidi.Module.Concept.Tree'
			}
		},
		{
			xtype: 'panel',
			collapsible: true,
			title: 'Pages'
		},
		{
			xtype: 'panel',
			collapsible: true,
			title: 'Files'
		}
	],
	initComponent: function() {

		var config = {
			items: this.getTreeComponents()
		};
		Ext.apply(this, config);
		this.callParent();
	},
	getTreeComponents: function() {
		
		var treeConfig = TYPO3.TYPO3.Core.Registry.get('vidi/treeConfig');
		console.log(treeConfig);
		var items = [];
		Ext.each(treeConfig, function(entry) {
			var dataProvider = eval([entry.dataProvider]) != undefined ? entry.DataProvider : Ext.emptyFn;
			var type = Ext.ClassManager.getNameByAlias('widget.' + entry.xtype) != "" ? entry.xtype : 'TYPO3.Vidi.Tree.Standard';
			items.push({
				xtype: 'panel',
				collapsed: entry.collapsed,
				collapsible: true,
				title: entry.title,
				layout: 'fit',
				items: {
					xtype: type,
					id: 'vidi-TreeRegion-tree-' + entry.table
				}
			});
		});
		return items;
	}
});