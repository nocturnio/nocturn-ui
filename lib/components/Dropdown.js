
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const button = cml.getComponent("Button");

    cml.addComponent({
        class: "Dropdown",
        refresh: _.merge({
            items: function (p, m, el, instance, value) {
                var listEl = elem.byId(p.__id__);
                elem.clear(listEl);
                cml.createMapItems(p, m, listEl, p.__childType__);
            }
        }, button.refresh),
        instance: button.instance,
        load: function (p, m, el, instance) {
             button.load(p, m, el, instance);
             var ex = function (name) {
                 return cml.extract(p, name);
             };
             mat.dropdownLoad({
                 constrainWidth: ex("constrainWidth"),
                 inDuration: ex("inDuration"),
                 outDuration: ex("outDuration"),
                 hover: ex("hover"),
                 gutter: ex("gutter"),
                 belowOrigin: ex("belowOrigin"),
                 alignment: ex("alignment"),
                 stopPropagation: ex("stopPropagation")
             }, p.__contentEl__);
        },
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            p.__id__ = mat.uuid();
            p.__childType__ = "DropdownItem";
            var options = {
                id: p.__id__,
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("width");
            ex("disabled");
            ex("label");
            ex("icon");
            ex("flat");
            ex("block");
            var listEl = elem.m("ul", {
                class: "dropdown-content",
                id: options.id
            });
            cml.createMapItems(p, m, listEl, p.__childType__);
            elem.append(elem.byId("main"), listEl);
            var el = mat.dropdown(options);
            p.__contentEl__ = mat.dropdownButton(el);
            return el;
        }
    });

    cml.addComponent({
        class: "DropdownItem",
        instance: function (p, m, el) {
            return el;
        },
        create: function (p, m) {
            var options = {
                select: p.select
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("icon");
            ex("label");
            ex("url");
            var el = mat.dropdownItem(options);
            return el;
        }
    });
};
