(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;

    cml.addTest({
        class: "Button",
        refresh: {
            label: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.label");
                c.check("el.a content should match label", () => {
                    var icon = cml.extract(p, "icon");
                    var content = p.__contentEl__.childNodes[icon ? 1 : 0].textContent;
                    return content === value;
                });
                return c.result;
            },
            width: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.width");
                c.check("el.style.width should match width", () => {
                    return el.style.width === value;
                });
                return c.result;
            },
            loading: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.loading");
                c.check("el.a should have loading class if loading is true. shouldn't if false.", () => {
                    var haveLoading = elem.haveClass(p.__contentEl__, "loading");
                    if (value) {
                        return haveLoading;
                    } else {
                        return !haveLoading;
                    }
                });
                return c.result;
            },
            disabled: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.disabled");
                c.check("el.a should have disabled class if disabled is true. shouldn't if false.", () => {
                    if (value) {
                        return elem.haveClass(p.__contentEl__, "disabled");
                    } else {
                        return !elem.haveClass(p.__contentEl__, "disabled");
                    }
                });
                return c.result;
            },
            color: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.color");
                c.check("el should have color class", () => {
                    return elem.haveClass(p.__contentEl__, value);
                });
                return c.result;
            },
            colorText: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.colorText");
                c.check("el should have color class", () => {
                    return elem.haveClass(p.__contentEl__, value + "-text");
                });
                return c.result;
            },
            colorShade: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.colorShade");
                c.check("el should have color class", () => {
                    return elem.haveClass(p.__contentEl__, value);
                });
                return c.result;
            },
            colorTextShade: function (p, m, el, instance, value) {
                var c = checker(p.__testName__ + ".refresh.colorTextShade");
                c.check("el should have color text shade class", () => {
                    return elem.haveClass(p.__contentEl__, "text-" + value);
                });
                return c.result;
            }
        },
        load: function (p, m, el, instance) {
            var c = checker(p.__testName__ + ".load");
            c.check("el should have btn-loading if loading is true", () => {
                return cml.extract(p, "loading") ? elem.haveClass(p.__contentEl__, "btn-loading") : true;
            });
            c.check("el should have tooltipped if tooltip is provided", () => {
                return cml.extract(p, "tooltip") ? elem.haveClass(p.__contentEl__, "tooltipped") : true;
            });
            return c.result;
        },
        instance: function (p, m, el, instance) {
            var c = checker(p.__testName__ + ".instance");
            c.check("instance should equal el.a", () => {
                return instance == p.__contentEl__;
            });
            return c.result;
        },
        create: function (p, m, el) {
            p.__testName__ = "Button";

            var c = checker(p.__testName__ + ".create");
            c.check("el should be of type element", () => {
                return el instanceof Element;
            });
            c.check("el.tagName should be div when block or span by default", () => {
                return el.tagName === (cml.extract(p, "block") ? "DIV" : "SPAN");
            });
            c.check("should be a button container", () => {
                return elem.haveClass(el, "btn-container");
            });
            c.check("button should be an anchor", () => {
                return p.__contentEl__.tagName === "A";
            });
            c.check("el.a should have color class", () => {
                return elem.haveClass(p.__contentEl__, cml.extract(p, "color"));
            });
            c.check("el.a should have color shade class", () => {
                return elem.haveClass(p.__contentEl__, cml.extract(p, "colorShade"));
            });
            c.check("el.a should have color text class", () => {
                var c = cml.extract(p, "colorText");
                return elem.haveClass(p.__contentEl__, c ? c + "-text": "");
            });
            c.check("el.a should have color text shade class", () => {
                var c = cml.extract(p, "colorTextShade");
                return elem.haveClass(p.__contentEl__, c ? "text-" + c : "");
            });
            c.check("el.a should have btn-flat class when flat or btn class by default", () => {
                return cml.extract(p, "flat") ? "btn-flat": "btn";
            });
            c.check("el.a should have icon if icon is given", () => {
                return checkIcon(p.__contentEl__, cml.extract(p, "icon"))
            });
            c.check("el.a should have disabled class if disabled", () => {
                return cml.extract(p, "disabled") ? elem.haveClass(p.__contentEl__, "disabled") : true;
            });
            c.check("el.style.width should match width", () => {
                var width = cml.extract(p, "width");
                return width ? p.__contentEl__.style.width === width : true;
            });
            c.check("el.a content should match label", () => {
                var icon = cml.extract(p, "icon");
                var label = cml.extract(p, "label");
                if (label) {
                    var content = p.__contentEl__.childNodes[icon ? 1 : 0].textContent;
                    return content === label;
                } else {
                    return true;
                }
            });
            return c.result;
        }
    });
    var checkIcon = function (el, icon) {
        if (icon) {
            var iconEl = elem.byTagName(el, "i")[0];
            return !is.undefined(iconEl) &&
                elem.haveClass(iconEl, "material-icons") &&
                iconEl.innerHTML === icon;
        } else {
            return true;
        }
    };
})();
