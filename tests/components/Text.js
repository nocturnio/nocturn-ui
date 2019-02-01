module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;

    cml.addTest({
        class: "Text",
        refresh: {
            value: function (p, m, el, instance, value) {
                var c = checker("Text.refresh.value");
                c.check("el should be of type element", () => {
                    return el instanceof Element;
                });
                c.check("el.innerHTML should match value", () => {
                    return value ? el.innerHTML === value : true;
                });
                return c.result;
            },
            color: function (p, m, el, instance, value) {
                var c = checker("Text.refresh.color");
                c.check("el should have color class", () => {
                    return elem.haveClass(el, value);
                });
                return c.result;
            },
            colorText: function (p, m, el, instance, value) {
                var c = checker("Text.refresh.colorText");
                c.check("el should have color text class", () => {
                    return elem.haveClass(el, value + "-text");
                });
                return c.result;
            },
            colorShade: function (p, m, el, instance, value) {
                var c = checker("Text.refresh.colorShade");
                c.check("el should have color shade class", () => {
                    return elem.haveClass(el, value);
                });
                return c.result;
            },
            colorTextShade: function (p, m, el, instance, value) {
                var c = checker("Text.refresh.colorTextShade");
                c.check("el should have color text shade class", () => {
                    return elem.haveClass(el, "text-" + value);
                });
                return c.result;
            }
        },
        instance: function (p, m, el, instance) {
            var c = checker("Text.instance");
            c.check("instance should equal el", () => {
                return instance == el;
            });
            return c.result;
        },
        create: function (p, m, el) {
            var flowText = cml.extract(p, "flowText");
            var fontSize = cml.extract(p, "fontSize");
            var c = checker("Text.create");
            c.check("el should be of type element", () => {
                return el instanceof Element;
            });
            c.check("el.tagName should be of type P", () => {
                return el.tagName === "P";
            });
            c.check("fontSize should match", () => {
                return fontSize ? el.style.fontSize === fontSize : true;
            });
            c.check("el should have color class", () => {
                var c = cml.extract(p, "color");
                if (c) {
                    return mat.haveColor(el);
                } else {
                    return true;
                }
            });
            c.check("el should have color shade class", () => {
                var c = cml.extract(p, "colorShade");
                if (c) {
                    return mat.haveColorShade(el);
                } else {
                    return true;
                }
            });
            c.check("el should have color text class", () => {
                var c = cml.extract(p, "colorText");
                if (c) {
                    return mat.haveColorText(el);
                } else {
                    return true;
                }
            });
            c.check("el should have color text shade class", () => {
                var c = cml.extract(p, "colorTextShade");
                if (c) {
                    return mat.haveColorShade(el);
                } else {
                    return true;
                }
            });
            c.check("el should have flow-text class if flowText is true", () => {
                return flowText ? elem.haveClass(el, "flow-text") : true;
            });
            c.check("el.innerHTML should match value", () => {
                if (is.function(p.value)) return true;
                var value = cml.extract(p, "value");
                return value ? el.innerHTML === value : true;
            });
            return c.result;
        }
    });
};
