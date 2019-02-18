module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Collapsible",
        refresh: {
            items: function (p, m, el, instance, value) {
                mat.collapsibleStore({
                    key: cml.extract(p, "key")
                });
                elem.clear(el);
                cml.createMapItems(p, m, el, p.__childType__, p.__contextType__, value);
                mat.collapsibleLoad({

                }, el);
                if (p.__sort__) {
                    p.__sort__.destroy();
                }
                p.__sort__ = mat.sortableLoad({
                    reorder: p.reorder,
                    dragAndDrop: cml.extract(p, "dragAndDrop")
                }, el);
            }
        },
        delete: function (p, m, el, instance) {
            if (p.__sort__) {
                p.__sort__.destroy();
            }
        },
        instance: function (p, m, el) {
            return el;
        },
        load: function (p, m, el, instance) {
            mat.collapsibleLoad({}, el);
            p.__sort__ = mat.sortableLoad({
                reorder: p.reorder,
                dragAndDrop: cml.extract(p, "dragAndDrop")
            }, el);
        },
        create: function (p, m) {
            p.__childType__ = "CollapsibleItem";
            var key = cml.extract(p, "key");
            var el = mat.collapsible();
            cml.createMapItems(p, m, el, p.__childType__);
            if (!m.__collapsibles__) {
                m.__collapsibles__ = {};
            }
            m.__collapsibles__[key] = true;
            return el;
        }
    });

    cml.addComponent({
        class: "CollapsibleItem",
        load: function (p, m, el, instance) {
            var active = cml.extract(p, "active");
            if (active) {
                mat.collapsibleItemLoad({}, el);
            }
        },
        create: function (p, m) {
            return mat.collapsibleItem({
                active: cml.extract(p, "active"),
                label: cml.extract(p, "label"),
                secondary: cml.extract(p, "secondary"),
                parent: p.__parent__,
                select: p.select
            });
        }
    });
};
