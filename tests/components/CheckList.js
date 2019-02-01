module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const refresh = modules.refresh;
    const is = modules.is;
    const util = modules.util;
    const checker = modules.checker;

    cml.addTest({
        class: "CheckList",
        refresh: {
            items: function (p, m, el, instance, value) {
              var c = checker("CheckList.refresh.items");
              return c.result;
            }
        },
        instance: function (p, m, el, instance) {
            var c = checker("CheckList.instance");
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("CheckList.create");
            c.check("el should be a dom element", () => {
                return el instanceof Element;
            });
            c.check("el should be a div with collection class", () => {
                return el.tagName === "UL" && elem.haveClass(el, "collection");
            });
            return c.result;
        }
    });

    cml.addTest({
        class: "CheckListItem",
        instance: function (p, m, el, instance) {
            var c = checker("CheckListItem.instance");
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("CheckListItem.create");
            c.check("el should be a dom element", () => {
                return el instanceof Element;
            });
            c.check("el should be a LI with collection-item class", () => {
                return el.tagName === "LI" && elem.haveClass(el, "collection-item");
            });
            c.check("group should match", () => {
                return elem.firstChild(el).name === p.__parent__.group;
            });
            c.check("checked should match, should be false by default", () => {
                var checked = cml.extract(p, "checked");
                if (is.undefined(checked)) {
                    return mat.checkboxInput(el).checked === false;
                } else {
                    return mat.checkboxInput(el).checked === checked;
                }
            });
            c.check("disabled should match, should be false by default", () => {
                var disabled = cml.extract(p, "disabled");
                if (is.undefined(disabled)) {
                    return mat.checkboxInput(el).disabled === false;
                } else {
                    return mat.checkboxInput(el).disabled === disabled;
                }
            });
            return c.result;
        }
    })
};
