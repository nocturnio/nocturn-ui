module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const field = cml.getComponent("TextField");

    cml.addComponent({
        class: "Checkbox",
        refresh: {
            checked: function (p, m, el, instance, value) {
                p.__inputEl__.checked = value;
            },
            disabled: field.refresh.disabled
        },
        instance: function (p, m, el) {
            return p.__inputEl__;
        },
        create: function (p, m) {
            var options = {
                select: p.select
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("label");
            ex("fillIn");
            ex("block");
            ex("checked");
            var el = mat.checkbox(options);
            p.__inputEl__ = mat.checkboxInput(el);
            return el;
        }
    });
};
