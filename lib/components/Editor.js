(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Editor",
        refresh: {
            value: function (p, m, el, instance, value) {
                instance.setValue(value);
            },
            theme: function (p, m, el, instance, value) {
                instance.setTheme(value);
            },
            mode: function (p, m, el, instance, value) {
                instance.setMode(value);
            },
            disabled: function (p, m, el, instance, value) {
                instance.setDisable(value);
            }
        },
        instance: function (p, m, el) {
            return {
                getValue: function () {
                    cml.extract(p, "value");
                }
            };
        },
        show: function (p, m, el, instance) {
            if (instance.ace) {
                instance.ace.resize();
            }
        },
        load: function (p, m, el, instance) {
            var options = {
                keyup: p.keyup,
                instance: instance
            };
            var ex = function (name) { options[name] = cml.extract(p, name); };
            ex("value");
            ex("theme");
            ex("mode");
            ex("disabled");
            ex("minLines");
            ex("maxLines");
            ex("handler");
            mat.editorLoad(options, el);
        },
        create: function (p, m) {
            m.__dontAnimate__ = true;
            m.__editor__ = {};
            return mat.editor({

            });
        }
    });
})();
