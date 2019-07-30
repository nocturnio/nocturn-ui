module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Model",
        instance: function (p, self, el) {
            return {
                init: p.init
            };
        },
        create: function (p, self) {
            return null;
        }
    });
};
