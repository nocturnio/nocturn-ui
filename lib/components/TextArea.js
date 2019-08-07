
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "TextArea",
        refresh: {
            value: function (p, m, el, instance, value) {
                var textAreaEl = mat.textAreaInput(el);
                elem.clear(textAreaEl);
                elem.appendText(textAreaEl, value);
                mat.updateTextFields();
            },
            disabled: function (p, m, el, instance, value) {
                mat.textAreaInput(el).disabled = value;
            },
            label: function (p, m, el, instance, value) {
                var labelEl = mat.textAreaLabel(el);
                elem.clear(labelEl);
                elem.appendText(labelEl, value);
            }
        },
        instance: function (p, m, el) {
            return mat.textAreaInput(el);
        },
        load: function (p, m, el, instance) {
            mat.updateTextFields();
        },
        defaultProperty: "value",
        create: function (p, m) {
            var ex = cml.extract;
            return mat.textArea({
                label: ex(p, "label"),
                value: ex(p, "value"),
                icon: ex(p, "icon"),
                disabled: ex(p, "disabled"),
                width: ex(p, "width"),
                colorText: ex(p, "colorText"),
                colorTextShade: ex(p, "colorTextShade"),
                keyup: p.keyup,
                keydown: p.keydown,
                keypress: p.keypress
            });
        }
    });
};
