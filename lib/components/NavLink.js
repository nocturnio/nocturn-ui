(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var link = cml.getComponent("Link");

    cml.addComponent({
        class: "NavLink",
        container: "items",
        context: "NavBar",
        refresh: _.merge({
            active: function (p, m, el, instance, value) {
                var itemEl = elem.parent(el);
                if (value) {
                    elem.appendClass(itemEl, "active");
                } else {
                    elem.removeClass(itemEl, "active");
                }
            }
        }, link.refresh),
        instance: link.instance,
        load: function (p, m, el, instance) {
            link.load(p, m, el, instance);
            var itemEl = elem.parent(el);
            if (cml.extract(p, "active")) {
                elem.appendClass(itemEl, "active");
            } else {
                elem.removeClass(itemEl, "active");
            }
        },
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var flat = cml.extract(p, "flat");
            var options = {
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__,
                label: cml.extract(p, "label"),
                icon: cml.extract(p, "icon"),
                disabled: cml.extract(p, "disabled"),
                width: cml.extract(p, "width"),
                height: cml.extract(p, "height"),
                url: cml.extract(p, "url"),
                flat: is.undefined(flat) ? true : flat,
                newTab: cml.extract(p, "newTab"),
                download: cml.extract(p, "download"),
                block: cml.extract(p, "block"),
                click: p.click
            };
            if (!options.height && !options.label) {
                options.height = "64px";
            }
            var el = mat.navItem(options);
            p.__contentEl__ = el;
            return el;
        }
    });
})();
