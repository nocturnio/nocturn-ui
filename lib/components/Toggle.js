
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const field = cml.getComponent("TextField");

    cml.addComponent({
        class: "Toggle",
        refresh: {
            value: function (p, m, el, instance, value) {
                p.__value__ = value;
                p.__inputEl__.checked = value;
            },
            label: field.refresh.label,
            disabled: field.refresh.disabled
        },
        instance: function (p, m, el) {
            return p.__inputEl__;
        },
        create: function (p, m) {
            var options = {
                toggle: function (checked) {
                    // on toggle event
                    if (p.__value__ != checked) {
                        p.__value__ = checked;
                        p.toggle(checked);
                    }
                }
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("on");
            ex("off");
            ex("disabled");
            ex("value");
            ex("block");
            ex("width");
            ex("height");
            ex("left");
            ex("label");
            options.block = is.undefined(options.block) ? true : false;
            var el = mat.toggle(options);
            p.__value__ = options.value || false;
            p.__inputEl__ = mat.toggleInput(el);
            p.__labelEl__ = mat.toggleLabel(el);
            return el;
        }
    });
};
