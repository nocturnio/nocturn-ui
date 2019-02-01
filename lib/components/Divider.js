module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Divider",
        instance: function (p, m, el) {
            return el;
        },
        create: function (p, m) {
            return mat.divider({
                marginTop: cml.extract(p, "marginTop"),
                marginBottom: cml.extract(p, "marginBottom")
            });
        }
    });
};
