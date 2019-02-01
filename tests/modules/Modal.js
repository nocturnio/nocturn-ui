module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;
    const card = cml.getTestModule("Modal");

    cml.addTestModule({
        class: "Modal",
        refresh: card.refresh,
        delete: function (p, self, el) {
            var c = checker(p.__testName__ + ".delete");
            return c.result;
        },
        create: function (p, self, dom, el) {
            p.__testName__ = "Modal";
            var c = checker(p.__testName__ + ".create");
            c.check("el of type Element", () => {
                return el instanceof Element;
            });
            return c.result;
        }
    });

};
