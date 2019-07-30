module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var cmlruntime = cml.cml;

    cml.addComponent({
        class: "Accessor",
        instance: function (p, self, el) {
            var obj = {
                set: function () {
                    p.set.apply(this, arguments);
                    cmlruntime.refresh();
                },
                get: function () {
                    return p.get.apply(this, arguments);
                }
            };
            return obj;
        },
        create: function (p, self) {
            return null;
        }
    });

    // deprecated    
    cml.addComponent({
        class: "Getter",
        instance: function (p, self, el) {
            return p.__func__;
        },
        create: function (p, self) {
            p.__func__ = function () {
                var rtn;
                rtn = p.get.apply(self, arguments);
                if (typeof(rtn) === "undefined" || rtn === null) {
                    rtn = cml.extract(p, "default");
                }
                return rtn;
            }
            return null;
        }
    });
    cml.addComponent({
        class: "Setter",
        instance: function (p, self, el) {
            return p.__func__;
        },
        create: function (p, self) {
            p.__func__ = function () {
                p.set.apply(self, arguments);
                cmlruntime.refresh();
            };
            return null;
        }
    });
    cml.addComponent({
        class: "Data",
        instance: function (p, self, el) {
            return p.init || function () { return {}; };
        },
        create: function (p, self) {
            return null;
        }
    });
};
