module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;

    cml.addTest({
        class: "List",
        refresh: {
            items: function (p, m, el, instance, value) {
              var c = checker("List.refresh.items");
              return c.result;
            }
        },
        instance: function (p, m, el, instance) {
            var c = checker("List.instance");
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("List.create");
            c.check("el should be a dom element", () => {
                return el instanceof Element;
            });
            return c.result;
        }
    });

    cml.addTest({
        class: "ListItem",
        instance: function (p, m, el, instance) {
            var c = checker("ListItem.instance");
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("ListItem.create");
            c.check("el should be a dom element", () => {
                return el instanceof Element;
            });
            return c.result;
        }
    });
};
