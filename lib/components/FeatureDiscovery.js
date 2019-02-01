
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "FeatureDiscovery",
        refresh: {
            target: function (p, m, el, instance, value) {
                mat.featureDiscovery({
                    target: value,
                    title: cml.extract(p, "title"),
                    content: cml.extract(p, "content")
                });
            }
        },
        load: function (p, m, el, instance) {
            mat.featureDiscoveryOpen();
        },
        create: function (p, m) {
            return mat.featureDiscovery({
                target: cml.extract(p, "target"),
                title: cml.extract(p, "title"),
                content: cml.extract(p, "content")
            });
        }
    });

};
