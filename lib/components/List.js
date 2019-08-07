

module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const links = cml.getComponent("Links");

    cml.addComponent({
        class: "List",
        refresh: {
            items: function (p, m, el, instance, value) {
                links.refresh.items(p, m, el, instance, value);
                var selected = cml.extract(p, "selected");
                if (selected) {
                    mat.listSelectIndex(el, selected);
                }
            },
            selected: function (p, m, el, instance, value) {
                mat.listSelectIndex(el, value);
            }
        },
        instance: links.instance,
        load: function (p, m, el, instance) {
            links.load(p, m, el, instance);
            var selected = cml.extract(p, "selected");
            if (selected) {
                mat.listSelectIndex(el, selected);
            }
        },
        delete: links.delete,
        defaultProperty: "items",
        create: function (p, m) {
            p.__childType__ = "ListItem";
            var el = mat.list();
            cml.createMapItems(p, m, el, p.__childType__);
            return el;
        }
    });

    cml.addComponent({
        class: "ListItem",
        defaultProperty: "label",
        create: function (p, self) {
            var el = mat.listItem({
                label: cml.extract(p, "label"),
                title: cml.extract(p, "title"),
                content: cml.extract(p, "content"),
                secondary: cml.extract(p, "secondary"),
                color: cml.extract(p, "color"),
                colorText: cml.extract(p, "colorText"),
                colorShade: cml.extract(p, "colorShade"),
                colorTextShade: cml.extract(p, "colorTextShade"),
                click: p.click
            });
            return el;
        }
    });
};
