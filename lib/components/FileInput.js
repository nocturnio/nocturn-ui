
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var textfield = cml.getComponent("TextField");
    var button = cml.getComponent("Button");

    cml.addComponent({
        class: "FileInput",
        refresh: {
            color: button.refresh.color,
            colorShade: button.refresh.colorShade,
            colorText: button.refresh.colorText,
            colorTextShade: button.refresh.colorTextShade,
            disabled: button.refresh.disabled,
            placeholder: textfield.refresh.placeholder,
            label: button.refresh.label
        },
        instance: textfield.instance,
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var options = {
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("label");
            ex("disabled");
            ex("multiple");
            ex("placeholder");
            var el = mat.fileInput(options);
            p.__inputEl__ = mat.fileInputField(el);
            p.__contentEl__ = mat.fileInputButton(el);
            p.__labelEl__ = mat.fileInputLabel(el);
            return el;
        }
    });
};
