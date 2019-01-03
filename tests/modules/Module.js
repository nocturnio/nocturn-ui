(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;

    cml.addTestModule({
        class: "Module",
        create: function (p, self, dom, el) {
            var c = checker("Module.create");
            c.check("el should be null", () => {
                return el === null;
            });
            return c.result;
        }
    });

})();
