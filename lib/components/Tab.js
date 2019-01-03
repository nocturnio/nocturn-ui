(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const button = cml.getComponent("Button");

    cml.addComponent({
        class: "Divider",
        instance: function (p, m, el) {
            return el;
        },
        create: function (p, m) {
            return mat.divider({
                marginTop: cml.extract(p, "marginTop"),
                marginBottom: cml.extract(p, "marginBottom")
            });
        }
    });

    cml.addComponent({
        class: "Tab",
        container: "tabs",
        refresh: {
            label: function (p, m, el, instance, value) {
                elem.clear(p.__contentEl__);
                elem.appendText(p.__contentEl__, value);
            }
        },
        instance: function (p, m, el) {
            return {
                select: function () {
                    el.click();
                }
            }
        },
        load: function (p, m, el, instance) {
            if (cml.extract(p, "active")) {
                mat.tabShow({
                    key: cml.extract(p, "key"),
                    parentEl: m.__el__,
                    currentTab: m.__currentTab__,
                    getCurrentTab: function () { return m.__currentTab__; },
                    setCurrentTab: function (t) { m.__currentTab__ = t; }
                }, el);
            }
        },
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var key = cml.extract(p, "key");
            var options = {
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__,
                select: p.select,
                key: key,
                label: cml.extract(p, "label"),
                click: function (e) {
                    mat.tabShow({
                        key: key,
                        parentEl: m.__el__,
                        getCurrentTab: function () { return m.__currentTab__; },
                        setCurrentTab: function (t) { m.__currentTab__ = t; }
                    }, el);
                    if (p.select) {
                        p.select(e);
                    }
                }
            };
            var el = mat.tab(options);
            p.__contentEl__ = mat.tabA(el);
            if (!m.__postTabs__) {
                m.__postTabs__ = {};
            }
            m.__postTabs__[options.key] = true;
            return el;
        }
    });
})();
