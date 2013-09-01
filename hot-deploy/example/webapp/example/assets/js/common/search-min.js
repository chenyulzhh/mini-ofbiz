define("common/search", ["bui/common", "bui/grid", "bui/form", "bui/data", "bui/overlay"], function (e) {
    var g = e("bui/common"), b = e("bui/grid"), f = e("bui/data"), a = e("bui/overlay"), d = e("bui/form");

    function c(h) {
        c.superclass.constructor.call(this, h);
        this._init()
    }

    c.ATTRS = {autoSearch: {value: true}, gridId: {value: "grid"}, formId: {value: "searchForm"}, btnId: {value: "btnSearch"}, formCfg: {value: {}}, gridCfg: {}, form: {}, grid: {}, store: {}};
    g.extend(c, g.Base);
    g.augment(c, {_init: function () {
        var h = this;
        h._initForm();
        h._initStoreEvent();
        h._initGrid();
        h._initEvent();
        h._initData()
    }, _initEvent: function () {
        this._initDomEvent();
        this._initFormEvent();
        this._initGridEvent()
    }, _initDomEvent: function () {
        var h = this, k = h.get("btnId"), i = h.get("store"), j = h.get("form");
        $("#" + k).on("click", function (l) {
            l.preventDefault();
            j.valid();
            if (j.isValid()) {
                h.load(true)
            }
        })
    }, _initForm: function () {
        var h = this, j = h.get("form");
        if (!j) {
            var i = g.merge(h.get("formCfg"), {srcNode: "#" + h.get("formId")});
            j = new d.HForm(i);
            j.render();
            h.set("form", j)
        }
    }, _initFormEvent: function () {
    }, _initGrid: function () {
        var h = this, k = h.get("grid");
        if (!k) {
            var i = h.get("gridCfg"), j = h.get("store");
            i.store = j;
            i.render = "#" + h.get("gridId"), k = new b.Grid(i);
            k.render();
            h.set("grid", k)
        }
    }, _initGridEvent: function () {
    }, _initData: function () {
        var h = this, i = h.get("autoSearch");
        if (i) {
            h.load(true)
        }
    }, _initStoreEvent: function () {
        var h = this, i = h.get("store");
        i.on("exception", function (j) {
            g.Message.Alert(j.error)
        })
    }, load: function (k) {
        var h = this, j = h.get("form"), i = h.get("store"), l = j.serializeToObject();
        if (k) {
            l.start = 0;
            l.pageIndex = 0
        }
        i.load(l)
    }});
    c.createStore = function (i, h) {
        h = g.merge({autoLoad: false, url: i, pageSize: 30}, h);
        return new f.Store(h)
    };
    c.createGridCfg = function (i, h) {
        h = g.merge({columns: i, loadMask: true, bbar: {pagingBar: true}}, h);
        return h
    };
    c.createLink = function (h) {
        var i = '<span class="page-action grid-command" data-id="{id}" data-href="{href}" title="{title}">{text}</span>';
        return g.substitute(i, h)
    };
    return c
});
