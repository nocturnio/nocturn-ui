(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Batch",
        refresh: {
            value: function (p, m, el, instance, value) {
                var modules = p.__modules__ || [];
                modules.forEach(function (m) {
                    m.delete();
                });
                p.__modules__ = p.modules(value);
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
})();
