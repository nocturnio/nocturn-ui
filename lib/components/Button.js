module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Button",
        refresh: {
            loading: function (p, m, el, instance, value) {
                if (value) {
                    elem.appendClass(p.__contentEl__, "loading");
                } else {
                    elem.removeClass(p.__contentEl__, "loading");
                }
            },
            width: function (p, m, el, instance, value) {
                p.__contentEl__.style.width = value;
            },
            icon: function (p, m, el, instance, value) {
                var icon = value;
                var label = cml.extract(p, "label");
                elem.clear(p.__contentEl__);
                if (icon) {
                    elem.append(p.__contentEl__, elem.m("i", { class: "left material-icons" }, icon));
                }
                elem.appendText(p.__contentEl__, label);
            },
            label: function (p, m, el, instance, value) {
                var icon = cml.extract(p, "icon");
                elem.clear(p.__contentEl__);
                if (icon) {
                    elem.append(p.__contentEl__, elem.m("i", { class: "left material-icons" }, icon));
                }
                elem.appendText(p.__contentEl__, value);
            },
            disabled: function (p, m, el, instance, value) {
                if (value) {
                    elem.appendClass(p.__contentEl__, "disabled");
                } else {
                    elem.removeClass(p.__contentEl__, "disabled");
                }
            },
            color: function (p, m, el, instance, value) {
                mat.replaceClass(p.__contentEl__, p, "__color__", value);
            },
            colorText: function (p, m, el, instance, value) {
                mat.replaceClass(p.__contentEl__, p, "__colorText__", value, "", "-text");
            },
            colorShade: function (p, m, el, instance, value) {
                mat.replaceClass(p.__contentEl__, p, "__colorShade__", value);
            },
            colorTextShade: function (p, m, el, instance, value) {
                mat.replaceClass(p.__contentEl__, p, "__colorTextShade__", value, "text-");
            }
        },
        load: function (p, m, el, instance) {
            var buttonEl = p.__contentEl__;
            mat.tooltipLoad({
                tooltip: cml.extract(p, "tooltip"),
                tooltipPosition: cml.extract(p, "tooltipPosition")
            }, buttonEl);
            mat.loaderLoad({
                loading: cml.extract(p, "loading")
            }, buttonEl);
        },
        instance: function (p, m, el) {
            return p.__contentEl__;
        },
        delete: function (p, m, el, instance) {
            var buttonEl = p.__contentEl__;
            $(buttonEl).tooltip('remove');
        },
        defaultProperty: "label",
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var flat = cml.extract(p, "flat");
            var el = mat.button({
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__,
                label: cml.extract(p, "label"),
                icon: cml.extract(p, "icon"),
                disabled: cml.extract(p, "disabled"),
                width: cml.extract(p, "width"),
                height: cml.extract(p, "height"),
                flat: is.undefined(flat) ? false : flat,
                block: cml.extract(p, "block"),
                click: p.click
            });
            p.__contentEl__ = mat.buttonA(el);
            return el;
        }
    });
};
