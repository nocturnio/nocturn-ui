
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const link = cml.getComponent("Link");

    cml.addComponent({
        class: "FooterItem",
        container: "links",
        refresh: {
            url: link.refresh.url,
            label: link.refresh.label
        },
        instance: function (p, m, el) {
            return p.__contentEl__;
        },
        create: function (p, m) {
            var options = {};
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("label");
            ex("url");
            var el = mat.footerItem(options);
            p.__contentEl__ = mat.footerItemA(el);
            return el;
        }
    });
};
