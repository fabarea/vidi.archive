
Ext.define('TYPO3.Vidi.Components.Layout.AutoFitLayout', {
	extend: 'Ext.layout.container.Container',
	alias: 'layout.autoFitLayout',
	onLayout: function() {
		this.callParent(arguments);

		var me = this,
			size = me.getLayoutTargetSize(),
			owner = me.owner,
			target = me.getTarget(),
			ownerWidth = size.width,
			ownerHeight = size.height,
			overflow = target.getStyle('overflow'),
			components = me.getVisibleItems(owner),
			len = components.length,
			boxes = [],
			box, newTargetSize, component, anchorSpec, calcWidth, calcHeight,
			i, el, cleaner;

		if (ownerWidth < 20 && ownerHeight < 20) {
			return;
		}

		// Anchor layout uses natural HTML flow to arrange the child items.
		// To ensure that all browsers (I'm looking at you IE!) add the bottom margin of the last child to the
		// containing element height, we create a zero-sized element with style clear:both to force a "new line"
		if (!me.clearEl) {
			me.clearEl = target.createChild({
				cls: Ext.baseCSSPrefix + 'clear',
				role: 'presentation'
			});
		}

		// Work around WebKit RightMargin bug. We're going to inline-block all the children only ONCE and remove it when we're done
		if (!Ext.supports.RightMargin) {
			cleaner = Ext.Element.getRightMarginFixCleaner(target);
			target.addCls(Ext.baseCSSPrefix + 'inline-children');
		}

			// Work around WebKit RightMargin bug. We're going to inline-block all the children only ONCE and remove it when we're done
		if (!Ext.supports.RightMargin) {
			target.removeCls(Ext.baseCSSPrefix + 'inline-children');
			cleaner();
		}

		if (components.length == 2) {
			me.setItemSize(components[0], me.getLayoutTargetSize().width - 20, undefined);
			me.setItemSize(components[1], me.getLayoutTargetSize().width, me.getLayoutTargetSize().height - components[0].getHeight() - 20);
		} else {
			me.setItemSize(components[0], me.getLayoutTargetSize().width, me.getLayoutTargetSize().height);
		}

		if (overflow && overflow != 'hidden' && !me.adjustmentPass) {
			newTargetSize = me.getLayoutTargetSize();
			if (newTargetSize.width != size.width || newTargetSize.height != size.height) {
				me.adjustmentPass = true;
				me.onLayout();
			}
		}

		delete me.adjustmentPass;
	},

	configureItem: function(item) {
		var me = this,
			owner = me.owner;
		if (item.alias == 'widget.filterBar') {
			item.layoutManagedWidth = 1;
			item.layoutManagedHeight = 2;

		} else {
			item.layoutManagedWidth = 1;
			item.layoutManagedHeight = 1;
		}
		this.callParent(arguments);
	}

});