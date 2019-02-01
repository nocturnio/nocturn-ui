
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const navlink = cml.getComponent("NavLink", "NavBar");

    cml.addComponent({
        class: "NavTab",
        context: "NavBar",
        container: "tabs",
        refresh: {
            label: navlink.refresh.label,
            url: navlink.refresh.url,
            disabled: navlink.refresh.disabled,
            active: function (p, m, el, instance, value) {
                if (value) {
                    elem.appendClass(p.__contentEl__, "nav-tab-active")
                } else {
                    elem.removeClass(p.__contentEl__, "nav-tab-active");
                }
            }
        },
        instance: function (p, m, el) {
            return p.__contentEl__;
        },
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var options = {
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__
            };
            var ex = function (n) { options[n] = cml.extract(p, n); };
            ex("label");
            ex("disabled");
            ex("icon");
            ex("width");
            ex("url");
            ex("active");
            var el = mat.navTab(options);
            p.__contentEl__ = mat.navTabA(el);
            return el;
        }
    });
};
