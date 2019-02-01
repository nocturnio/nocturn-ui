
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "TextField",
        refresh: {
            value: function (p, m, el, instance, value) {
                p.__inputEl__.value = value;
                mat.updateTextFields();
            },
            disabled: function (p, m, el, instance, value) {
                p.__inputEl__.disabled = value;
            },
            colorText: function (p, m, el, instance, value) {
                var inputEl = p.__inputEl__;
                var labelEl = p.__labelEl__;
                if (value && elem.haveClass(inputEl, "text-field")) {
                    elem.appendClass(inputEl, "text-field");
                }
                mat.replaceClass(inputEl, p, "__colorText__", value, "", "-text", true);
                mat.replaceClass(labelEl, p, "__colorText__", value, "", "-text");
                if (value) {
                    elem.removeClass(inputEl, "text-field");
                }
            },
            colorTextShade: function (p, m, el, instance, value) {
                var inputEl = p.__inputEl__;
                var labelEl = p.__labelEl__;
                if (value && elem.haveClass(inputEl, "text-field")) {
                    elem.appendClass(inputEl, "text-field");
                }
                mat.replaceClass(inputEl, p, "__colorTextShade__", value, "", "-text", true);
                mat.replaceClass(labelEl, p, "__colorTextShade__", value, "", "-text");
                if (value) {
                    elem.removeClass(inputEl, "text-field");
                }
            },
            autocompleteItems: function (p, m, el, instance, value) {
                mat.autocompleteLoad({
                    map: p.autocompleteMap,
                    items: value,
                    limit: cml.extract(p, "autocompleteLimit"),
                    minLength: cml.extract(p, "autocompleteMinimum"),
                    autocomplete: p.autocomplete
                }, p.__inputEl__);
            },
            label: function (p, m, el, instance, value) {
                var labelEl = p.__labelEl__;
                elem.clear(labelEl);
                elem.appendText(labelEl, value);
            },
            placeholder: function (p, m, el, instance, value) {
                p.__inputEl__.style.placeholder = value;
            }
        },
        instance: function (p, m, el) {
            return p.__inputEl__;
        },
        load: function (p, m, el, instance) {
            mat.updateTextFields();
            mat.autocompleteLoad({
                items: cml.extract(p, "autocompleteItems"),
                map: p.autocompleteMap,
                limit: cml.extract(p, "autocompleteLimit"),
                minLength: cml.extract(p, "autocompleteMinimum"),
                autocomplete: p.autocomplete
            }, p.__inputEl__);
        },
        create: function (p, m) {
            var ex = cml.extract;
            p.__colorText__ = ex(p, "colorText");
            p.__colorTextShade__ = ex(p, "colorTextShade");
            var el = mat.field({
                type: p.__type__ || "text",
                label: ex(p, "label"),
                value: ex(p, "value") || "",
                colorText: p.__colorText__,
                colorTextShade: p.__colorTextShade__,
                disabled: ex(p, "disabled"),
                dataSuccess: ex(p, "dataSuccess"),
                dataError: ex(p, "dataError"),
                width: ex(p, "width"),
                icon: ex(p, "icon"),
                placeholder: ex(p, "placeholder"),
                block: ex(p, "block"),
                borderless: ex(p, "borderless"),
                keyup: p.keyup,
                keydown: p.keydown,
                keypress: p.keypress
            });
            p.__inputEl__ = mat.fieldInput(el);
            p.__labelEl__ = mat.fieldLabel(el);
            return el;
        }
    });
};
