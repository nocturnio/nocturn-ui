
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const links = cml.getComponent("Links");

    var select = function (p) {
        var inputEls = elem.byName(p.__group__);
        var items = cml.extract(p, "items");
        var value = cml.extract(p, "value");
        for (var i = 0; i < inputEls.length; i++) {
            inputEls[i].checked = _.isEqual(items[i], value);
        }
    };

    cml.addComponent({
        class: "RadioGroup",
        refresh: {
            items: links.refresh.items,
            value: function (p, m, el, instance, value) {
                select(p);
            }
        },
        instance: function (p, m, el) {
            return {
                getSelected: function() {
                    var items = cml.extract(p, "items");
                    var inputEls = elem.byName(p.__group__);
                    var rtn = null;
                    for (var i = 0; i < inputEls.length; i++) {
                        if (inputEls[i].checked) {
                            rtn = items[i];
                            break;
                        }
                    }
                    return rtn;
                }
            };
        },
        load: function (p, m, el, instance) {
            select(p);
        },
        defaultProperty: "items",
        create: function (p, m) {
            p.__group__ = mat.uuid();
            p.__childType__ = "RadioItem";
            var options = {
                group: p.__group__,
                select: p.select
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            var el = mat.radiogroup(options);
            cml.createMapItems(p, m, el, p.__childType__);
            return el;
        }
    });

    cml.addComponent({
        class: "RadioItem",
        instance: function (p, m, el) {
            return el;
        },
        defaultProperty: "value",
        create: function (p, m) {
            var options = {
                group: p.__parent__.__group__
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("value");
            ex("label");
            ex("colorText");
            ex("colorTextShade");
            ex("disabled");
            var el = mat.radioItem(options);
            return el;
        }
    });
};
