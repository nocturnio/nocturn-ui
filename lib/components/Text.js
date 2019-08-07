
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var button = cml.getComponent("Button");

    cml.addComponent({
        class: "Text",
        refresh: {
            value: function (p, m, el, instance, value) {
                elem.clear(el);
                elem.appendText(el, value);
            },
            color: button.refresh.color,
            colorText: button.refresh.colorText,
            colorShade: button.refresh.colorShade,
            colorTextShade: button.refresh.colorTextShade
        },
        instance: function (p, m, el) {
            return el;
        },
        defaultProperty: "value",
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var el = mat.text({
                value: cml.extract(p, "value"),
                flowText: cml.extract(p, "flowText"),
                fontSize: cml.extract(p, "fontSize"),
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__
            });
            p.__contentEl__ = el;
            return el;
        }
    });
};
