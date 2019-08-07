
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const http = modules.http;

    var text = cml.getComponent("Text");

    cml.addComponent({
        class: "Markdown",
        refresh: {
            value: function (p, m, el, instance, value) {
                mat.markdownRender(el, value);
            },
            url: function (p, m, el, instance, value) {
                http.get(value)
                    .then(function (md) {
                        mat.markdownRender(el, md || "");
                    })
                    .catch(function (md) {
                        mat.markdownRender(el, "Error: resource could not be retreived");
                    });
            },
            color: text.refresh.color,
            colorText: text.refresh.colorText,
            colorShade: text.refresh.colorShade,
            colorTextShade: text.refresh.colorTextShade
        },
        load: function (p, m, self, el, instance) {
            mat.markdownHighlight(el);
        },
        defaultProperty: text.defaultProperty,
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var options = {
                value: cml.extract(p, "value") || "",
                url: cml.extract(p, "url"),
                fontSize: cml.extract(p, "fontSize"),
                section: cml.extract(p, "section"),
                flowText: cml.extract(p, "flowText"),
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__
            };
            var el = mat.markdown(options);
            p.__contentEl__ = el;
            return el;
        }
    });

    cml.addComponent({
        class: "Code",
        refresh: {
            value: function (p, m, el, instance, value) {
                var type = cml.extract(p, "type");
                var md = "";
                if (value) {
                    md = mat.codeMd(type, value);
                }
                mat.markdownRender(el, md);
            },
            url: function (p, m, el, instance, value) {
                http.get(value)
                    .then(function (md) {
                        var type = cml.extract(p, "type");
                        mat.markdownRender(el, mat.codeMd(type, md));
                    })
                    .catch(function () {
                        mat.markdownRender(el, "Error: resource could not be retreived");
                    });
            }
        },
        load: function (p, m, el, instance) {
            mat.markdownHighlight(el);
        },
        create: function (p, m) {
            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var options = {
                type: cml.extract(p, "type"),
                value: cml.extract(p, "value") || "",
                url: cml.extract(p, "url"),
                fontSize: cml.extract(p, "fontSize"),
                section: cml.extract(p, "section"),
                flowText: cml.extract(p, "flowText"),
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__
            };
            var el = mat.code(options);
            p.__contentEl__ = el;
            return el;
        }
    });
};
