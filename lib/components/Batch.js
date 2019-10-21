module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Batch",
        defaultProperty: "value",
        refresh: {
            value: function (p, m, el, instance, value) {
                var modules = p.__modules__ || [];
                p.__modules__ = p.modules(value);
                if (modules.length > 0) {
                    var positionEl = modules[0].__el__;
                    var container = positionEl.parentNode;
                    p.__modules__.forEach(function (m) {
                        container.insertBefore(m.__el__, positionEl);
                    });
                }
                modules.forEach(function (m) {
                    m.delete();
                });
            }
        },
        instance: function (p, m, el) {
            return {
                getModules: function () {
                    return p.__modules__;
                }
            };
        },
        load: function (p, m, el, instance) {
            var isManual = cml.extract(p, "manualStart");
            if (!isManual) {
                p.__modules__ = p.modules(cml.extract(p, "value"));
            }
        },
        create: function (p, m) {
            p.__modules__ = [];
            return null;
        }
    });
};
