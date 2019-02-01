module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;

    cml.addTest({
        class: "Links",
        refresh: {
            items: function (p, m, el, instance, value) {
              var c = checker("Links.refresh.items");
              return c.result;
            }
        },
        instance: function (p, m, el, instance) {
            var c = checker("Links.instance");
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("Links.create");
            c.check("el should be a dom element", () => {
                return el instanceof Element;
            });
            c.check("el should be a div with collection class", () => {
                return el.tagName === "DIV" && elem.haveClass(el, "collection");
            });
            return c.result;
        }
    });

    cml.addTest({
        class: "LinkItem",
        instance: function (p, m, el, instance) {
            var c = checker("LinkItem.instance");
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("LinkItem.create");
            c.check("el should be a dom element", () => {
                return el instanceof Element;
            });
            c.check("el should be an anchor with collection-item class", () => {
                return el.tagName === "A" && elem.haveClass(el, "collection-item");
            });
            return c.result;
        }
    })
};
