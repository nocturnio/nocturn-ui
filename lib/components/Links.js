
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Links",
        refresh: {
            items: function (p, m, el, instance, value) {
                elem.clear(el);
                cml.createMapItems(p, m, el, p.__childType__, p.__contextType__, value);
                p.__sort__ = mat.sortableLoad({
                    reorder: p.reorder,
                    dragAndDrop: cml.extract(p, "dragAndDrop")
                }, el);
            }
        },
        instance: function (p, m, el) {
            return el;
        },
        load: function (p, m, el, instance) {
            p.__sort__ = mat.sortableLoad({
                reorder: p.reorder,
                dragAndDrop: cml.extract(p, "dragAndDrop")
            }, el);
        },
        delete: function (p, m, el, instance) {
            if (p.__sort__) {
                p.__sort__.destroy()
            }
        },
        defaultProperty: "items",
        create: function (p, m) {
            p.__childType__ = "LinkItem";
            var el = mat.links();
            cml.createMapItems(p, m, el, p.__childType__);
            return el;
        }
    });
    cml.addComponent({
        class: "LinkItem",
        instance: function (p, m, el) {
            return el;
        },
        defaultProperty: "url",
        create: function (p, m) {
            return mat.linkItem({
                label: cml.extract(p, "label"),
                disabled: cml.extract(p, "disabled"),
                icon: cml.extract(p, "icon"),
                url: cml.extract(p, "url"),
                download: cml.extract(p, "download"),
                newTab: cml.extract(p, "newTab"),
                click: p.click
            });
        }
    });
};
