module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;
    const button = cml.getTest("Button");

    cml.addTest({
        class: "Link",
        refresh: {
            url: function (p, m, el, instance, value) {
                var c = checker("Link.refresh.url");
                c.xcheck("el.a.href should match url");
                return c.result;
            },
            download: function (p, m, el, instance, value) {
                var c = checker("Link.refresh.download");
                return c.result;
            },
            label: button.refresh.label,
            width: button.refresh.width,
            loading: button.refresh.loading,
            disabled: button.refresh.disabled,
            color: button.refresh.color,
            colorText: button.refresh.colorText,
            colorShade: button.refresh.colorShade,
            colorTextShade: button.refresh.colorTextShade
        },
        load: button.load,
        instance: button.instance,
        create: function (p, m, el) {
            var c = checker("Link.create");
            c.check("el should be of type element", () => {
                return el instanceof Element;
            });
            c.check("el.tagName should be div when block or span by default", () => {
                return el.tagName === (cml.extract(p, "block") ? "DIV" : "SPAN");
            });
            c.check("should be a button container", () => {
                return elem.haveClass(el, "btn-container");
            });
            c.check("buttonA should be an anchor", () => {
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
            c.check("style should be btn-flat by default", () => {
                if (is.undefined(cml.extract(p, "flat"))) {
                    return elem.haveClass(p.__contentEl__, "btn-flat");
                } else {
                    if (cml.extract(p, "flat")) {
                        return elem.haveClass(p.__contentEl__, "btn-flat");
                    } else {
                        return elem.haveClass(p.__contentEl__, "btn");
                    }
                }
            });
            c.check("el.a should have btn-flat class when flat or btn class by default", () => {
                return cml.extract(p, "flat") ? "btn-flat": "btn";
            });
            c.check("el.a.download should match download", () => {
                var download = cml.extract(p, "download");
                return download ? p.__contentEl__.download === download : true;
            });
            c.check("el.a.target should be _blank if newTab is true", () => {
                var newTab = cml.extract(p, "newTab");
                var target = p.__contentEl__.target;
                return newTab ? target === "_blank" : true;
            });
            c.check("el.a content should match label", () => {
                var icon = cml.extract(p, "icon");
                var label = cml.extract(p, "label");
                var content = p.__contentEl__.childNodes[icon ? 1 : 0].textContent;
                return content === label;
            });
            c.xcheck("el.a.href should match url");
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
};
