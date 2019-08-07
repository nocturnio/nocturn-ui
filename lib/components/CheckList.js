module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "CheckList",
        refresh: {
            items: function (p, m, el, instance, value) {
                loadItems(p, m, el, value);
            }
        },
        instance: function (p, m, el) {
            return {
                getCheckedItems: function () {
                    var items = cml.extract(p, "items");
                    var boxes = elem.byName(p.__group__);
                    var rtn = [];
                    if (boxes.length !== items.length) {
                        // items and ui unsynced. reload items.
                        loadItems(p, m, el, items);
                    }
                    return getCheckedItems(p, items);
                }
            };
        },
        load: function (p, m, el, instance) {
            p.__sort__ = mat.sortableLoad({
                reorder: p.reorder,
                dragAndDrop: cml.extract(p, "dragAndDrop")
            }, el);
        },
        delete: function (p, m, el, instance) {
            if (p.__sort__) {
                p.__sort__.destroy();
            }
        },
        defaultProperty: "items",
        create: function (p, m) {
            var el = elem.m("ul", { class: "list-container collection" });
            var items = cml.createMapItems(p, m, el, "CheckListItem");
            var group = mat.uuid();
            p.__group__ = group;
            el.onclick = function (e) {
                if (p.select) {
                    p.select(e);
                }
            };
            return el;
        }
    });

    cml.addComponent({
        class: "CheckListItem",
        instance: function (p, m, el) {
            return el;
        },
        defaultProperty: "checked",
        create: function (p, m) {
            return mat.listItem({
                secondary: cml.extract(p, "secondary"),
            }, mat.checkbox({
                label: cml.extract(p, "label"),
                group: p.__parent__.__group__,
                checked: cml.extract(p, "checked"),
                disabled: cml.extract(p, "disabled"),
                fillIn: cml.extract(p, "fillIn")
            }));
        }
    });

    // utility
    var loadItems = function (p, m, el, items) {
        elem.clear(el);
        p.__checked__ = [];
        cml.createMapItems(p, m, el, "CheckListItem", undefined, items);
        p.__sort__ = mat.sortableLoad({
            reorder: p.reorder,
            dragAndDrop: cml.extract(p, "dragAndDrop")
        }, el);
    };

    var getCheckedItems = function (p, items) {
        var boxes = elem.byName(p.__group__);
        var rtn = [];
        for (var i = 0; i < boxes.length; i++) {
            var b = boxes[i];
            var item = items[i];
            if (b.checked) {
                rtn.push(item);
            }
        }
        return rtn;
    };

};
