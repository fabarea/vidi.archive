
Ext.define('TYPO3.Vidi.Components.ContextMenu', {
	extend: 'Ext.menu.Menu',

	/**
	 * Component Id
	 *
	 * @type {String}
	 */
	id: 'typo3-vidi-contextmenu',

	view: null,
	record: null,

	/**
	 * Parent clicks should be ignored
	 *
	 * @type {Boolean}
	 */
	ignoreParentClicks: true,

	/**
	 * Listeners
	 *
	 * The itemclick event triggers the configured single click action
	 */
	listeners: {
		click: {
			fn: function (menu, item) {
				if (item !== undefined) {
					console.log(item);
					var callbackAction = eval(item.callbackAction);
					if (callbackAction != undefined) {
						callbackAction(menu.record);
					}
				}

			}
		}
	},

	/**
	 * Fills the menu with the actions
	 *
	 * @param {Ext.data.Record} record
	 * @param {Ext.view.View} initialView
	 * @param {Object} contextMenuConfiguration
	 * @return {void}
	 */
	fill: function(record, initialView, contextMenuConfiguration) {
		this.record = record;
		this.view = initialView;

		var components = this.preProcessContextMenuConfiguration(contextMenuConfiguration);
		if (components.length) {
			for (var index in components) {
				if (components[index] === '-') {
					this.addSeparator();
				} else if (typeof components[index] === 'object') {
					this.add(Ext.create('Ext.menu.Item', components[index]));
				}
			}
		}
	},

	/**
	 * Parses the context menu actions array recursively and generates the
	 * components for the context menu including separators/dividers and sub menus
	 *
	 * @param {Object} contextMenuConfiguration
	 * @param {int} level
	 * @return {Object}
	 */
	preProcessContextMenuConfiguration: function(contextMenuConfiguration, level) {
		level = level || 0;
		if (level > 5) {
			return [];
		}

		var tmpl = new Ext.XTemplate(
			'<tpl if="plain">',
				'{text}',
			'</tpl>',
			'<tpl if="!plain">',
				'<a id="{id}-itemEl" class="' + Ext.baseCSSPrefix + 'menu-item-link" href="{href}" hidefocus="true" unselectable="on">',
					'<img id="{id}-iconEl" src="' + Ext.BLANK_IMAGE_URL + '" class="' + Ext.baseCSSPrefix + 'menu-item-icon {iconCls}" />',
					'<span id="{id}-textEl" class="' + Ext.baseCSSPrefix + 'menu-item-text" <tpl if="menu">style="margin-right: 17px;"</tpl> >{text}</span>',
					'<tpl if="menu">',
						'<img id="{id}-arrowEl" src="{blank}" class="' + Ext.baseCSSPrefix + 'menu-item-arrow" />',
					'</tpl>',
				'</a>',
			'</tpl>'
		);
		Ext.menu.Item.override('renderTpl', tmpl);

		var components = [];

		var modulesInsideGroup = false;
		var subMenus = 0;
		for (var singleAction in contextMenuConfiguration) {
			if (contextMenuConfiguration[singleAction]['type'] === 'submenu') {
				var subMenuComponents = this.preProcessContextMenuConfiguration(
					contextMenuConfiguration[singleAction]['childActions'],
					level + 1
				);

				if (subMenuComponents.length) {
					var subMenu = Ext.create('TYPO3.Vidi.Components.ContextMenu', {
						id: this.id + '-sub' + ++subMenus,
						items: subMenuComponents,
						record: this.record,
						view: this.view
					});

					components.push({
						text: contextMenuConfiguration[singleAction]['label'],
						cls: 'contextMenu-subMenu',
						menu: subMenu,
						icon: contextMenuConfiguration[singleAction]['icon'],
						iconCls: contextMenuConfiguration[singleAction]['class']
					});
				}
			} else if (contextMenuConfiguration[singleAction]['type'] === 'divider') {
				if (modulesInsideGroup) {
					components.push('-');
					modulesInsideGroup = false;
				}
			} else {
				modulesInsideGroup = true;

				if (typeof contextMenuConfiguration[singleAction] === 'object') {
					var component = {
						'text': contextMenuConfiguration[singleAction]['label'],
						'callbackAction': contextMenuConfiguration[singleAction]['callbackAction'],
						'customAttributes': contextMenuConfiguration[singleAction]['customAttributes']
					};

					if (contextMenuConfiguration[singleAction]['class'] != undefined && contextMenuConfiguration[singleAction]['class'] != '') {
						component.iconCls = contextMenuConfiguration[singleAction]['class'];
					} else {
						component.icon = contextMenuConfiguration[singleAction]['icon'];
					}
					components.push(component);
					
				}
			}
		}

			// remove divider if it's the last item of the context menu
		if (components[components.length - 1] === '-') {
			components[components.length - 1] = '';
		}

		return components;
	}
});