
Ext.define('TYPO3.Vidi.Components.Overlay', {
	extend: 'Ext.window.Window',
	maximized: true,
	name: 'ie9876543',
	resizable: false,
	minimizable: false,
	closable: false,
	autoShow: true,
	border: 0,
	cls: 'x-window-noborder',
	frame: false,
	bodyBorder: false,
	preventHeader: true,
	layout: 'fit',
	items: [{
		xtype: 'component',
		autoEl: {
			tag: 'iframe',
			frameborder: '0',
			style: 'float:left;' // this is needed to prevent offset of 2.5 pixel, see #15771
		},
		border: 0,
		frame: 0,
		bodyBorder: 0
	}],
	constructor: function(url, name, callback) {
		this.items[0].autoEl.src = url;
		this.items[0].autoEl.name = this.name = name;

		this.callParent();
		
		this.on('close', callback || Ext.emptyFn());
	},
	afterRender : function() {
		this.callParent(arguments);
		this.iframe = this.items.items[0].el.dom.contentWindow;
		this.items.items[0].el.dom[Ext.isIE ? 'onreadystatechange' : 'onload'] = Ext.bind(this.load, this);
		this.mask = new Ext.LoadMask(this.el);
		this.mask.show();
	},
	load: function(e) {
		var component = this.items.items[0];
		this.mask.hide();
		this.src = this.iframe.location.href;
		if (this.src.substr(this.src.length - 9) == 'dummy.php') {
			component.el.dom[Ext.isIE ? 'onreadystatechange' : 'onload'] = Ext.emptyFn();
			this.iframe.location.href = 'about:blank';
			this.iframe = null;
			component.destroy();
			this.items.removeAll();
			this.close();
			this.destroy();
		}
	}
});
