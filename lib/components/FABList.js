
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "FABList",
        context: "FAB",
        refresh: {
            items: function (p, m, el, instance, value) {
                elem.clear(el);
                cml.createMapItems(p, m, el, p.__childType__, p.__contextType__, value);
            }
        },
        instance: function (p, m, el) {
            return el;
        },
        create: function (p, m) {
            p.__childType__ = "FABItem";
            p.__contextType__ = "FAB";
            var el = elem.m("ul");
            cml.createMapItems(p, m, el, p.__childType__, p.__contextType__);
            return el;
        }
    });

    cml.addComponent({
        class: "FABItem",
        context: "FAB",
        delete: function (p, m, el, instance) {
            var buttonEl = p.__contentEl__;
            $(buttonEl).tooltip('remove');
        },
        create: function (p, m) {
            var options = {
                click: p.click
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("icon");
            ex("color");
            ex("colorShade");
            ex("colorText");
            ex("colorTextShade");
            var el = mat.fabItem(options);
            p.__contentEl__ = mat.fabItemA(el);

            mat.tooltipLoad({
                tooltip: cml.extract(p, "tooltip"),
                tooltipPosition: cml.extract(p, "tooltipPosition"),
                tooltipDelay: cml.extract(p, "tooltipDelay")
            }, p.__contentEl__);

            return el;
        }
    });
};
