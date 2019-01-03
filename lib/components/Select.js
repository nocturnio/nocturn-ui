(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var select = function (p, el) {
        var value = cml.extract(p, "value");
        if (value) {
            el.value = value;
        } else {
            var options = elem.children(el);
            var defaultOption = options[0];
            if (defaultOption) {
                el.value = defaultOption.value;
            } else {
                el.value = undefined;
            }
        }
    };

    cml.addComponent({
        class: "Select",
        refresh: {
            items: function (p, m, el, instance, value) {
                elem.clear(p.__selectEl__);
                cml.createMapItems(p, m, p.__selectEl__, p.__childType__);
                mat.selectLoad(p.__selectEl__);
            },
            value: function (p, m, el, instance, value) {
                p.__selectEl__.value = value;
                mat.selectLoad(p.__selectEl__);
            },
            disabled: function (p, m, el, instance, value) {
                p.__selectEl__.disabled = value;
                mat.selectLoad(p.__selectEl__);
            }
        },
        instance: function (p, m, el) {
            return p.__selectEl__;
        },
        load: function (p, m, el) {
            var value = cml.extract(p, "value");
            var selectEl = p.__selectEl__;
            if (!is.undefined(value)) {
                selectEl.value = value;
            }
            mat.selectLoad(selectEl);
        },
        create: function (p, m) {
            p.__childType__ = "SelectOption";
            var options = {
                change: p.change
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("label");
            ex("items");
            ex("width");
            ex("block");
            ex("disabled");
            var el = mat.select(options);
            p.__selectEl__ = mat.selectElement(el);
            cml.createMapItems(p, m, p.__selectEl__, p.__childType__);
            select(p, p.__selectEl__);
            return el;
        }
    });

    cml.addComponent({
        class: "SelectOption",
        create: function (p, m) {
            return mat.selectOption({
                value: cml.extract(p, "value"),
                disabled: cml.extract(p, "disabled"),
                label: cml.extract(p, "label")
            });
        }
    });
})();
