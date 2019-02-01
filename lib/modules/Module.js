module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addModule({
        class: "Module",
        create: function (data, self, dom) {
            return null;
        }
    });
};
