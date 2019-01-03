(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const refresh = modules.refresh;
    const is = modules.is;
    const util = modules.util;
    const checker = modules.checker;

    cml.addTest({
        class: "Divider",
        instance: function (p, m, el, instance) {
            var c = checker("Divider.instance");
            c.check("instance should equal el", () => {
                return instance == el;
            });
            return c.result;
        },
        create: function (p, m, el) {
            var marginTop = cml.extract(p, "marginTop");
            var marginBottom = cml.extract(p, "marginBottom");
            var c = checker("Divider.create");
            c.check("el should be of type element", () => {
                return el instanceof Element;
            });
            c.check("el.tagName should be of type DIV", () => {
                return el.tagName === "DIV";
            });
            c.check("marginTop should match", () => {
                return marginTop ? el.style.marginTop === marginTop : true;
            });
            c.check("marginBottom should match", () => {
                return marginBottom ? el.style.marginBottom === marginBottom : true;
            });
            c.check("el should have class divider", () => {
                return elem.haveClass(el, "divider");
            });
            return c.result;
        }
    });
})();
