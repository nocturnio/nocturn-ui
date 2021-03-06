
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var textfield = cml.getComponent("TextField");

    cml.addComponent({
        class: "EmailField",
        refresh: textfield.refresh,
        instance: textfield.instance,
        load: textfield.load,
        defaultProperty: textfield.defaultProperty,
        create: function (p, m) {
            p.__type__ = "email";
            return textfield.create(p, m);
        }
    });

};
