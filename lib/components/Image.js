
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Image",
        refresh: {
            url: function (p, m, el, instance, value) {
                el.src = value;
            }
        },
        instance: function (p, m, el) {
            return el;
        },
        create: function (p, m) {
            return mat.image({
                url: cml.extract(p, "url"),
                block: cml.extract(p, "block"),
                width: cml.extract(p, "width"),
                height: cml.extract(p, "height"),
                maxWidth: cml.extract(p, "maxWidth"),
                maxHeight: cml.extract(p, "maxHeight"),
                minWidth: cml.extract(p, "minWidth"),
                minHeight: cml.extract(p, "minHeight")
            });
        }
    });
};
