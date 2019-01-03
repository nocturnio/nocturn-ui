(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var link = cml.getComponent("Link");

    cml.addComponent({
        class: "Action",
        container: "actions",
        refresh: _.merge({}, link.refresh, {
            label: function (p, m, el, instance, value) {
                link.refresh.label(p, m, el, instance, value);
                if (value) {
                    p.__contentEl__.style.marginRight = "initial";
                } else {
                    p.__contentEl__.style.marginRight = "0px";
                }
            }
        }),
        instance: link.instance,
        load: link.load,
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var flat = cml.extract(p, "flat");
            var el = mat.action({
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
            });
            p.__contentEl__ = el;
            return el;
        }
    });
})();
