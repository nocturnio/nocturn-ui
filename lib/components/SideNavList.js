
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const list = cml.getComponent("List");

    cml.addComponent({
        class: "SideNavList",
        context: "SideNav",
        refresh: _.merge({
            loading: function (p, m, el, instance, value) {
                elem.byClassName(el, "loading")
                    .forEach(function (c) {
                        elem.removeClass(c, "loading");
                    });
                var activeEl = elem.byClassName(el, "active")[0];
                if (value && activeEl) {
                    var selectedEl = elem.children(activeEl)[0];
                    elem.appendClass(selectedEl, "loading");
                }
            }
        }, list.refresh),
        instance: list.instance,
        load: list.load,
        delete: list.delete,
        defaultProperty: "items",
        create: function (p, m) {
            p.__childType__ = "SideNavItem";
            p.__contextType__ = "SideNav";
            var el = elem.m("ul");
            cml.createMapItems(p, m, el, p.__childType__, p.__contextType__);
            return el;
        }
    });

    cml.addComponent({
        class: "SideNavItem",
        context: "SideNav",
        delete: function (p, m, el, instance) {
            var buttonEl = p.__contentEl__;
            $(buttonEl).tooltip('remove');
        },
        create: function (p, m) {
            var options = {
                select: p.select
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("url");
            ex("label");
            ex("secondary");
            ex("icon");
            ex("key");
            var el = mat.sideNavItem(options);
            p.__contentEl__ = mat.sideNavItemA(el);

            mat.tooltipLoad({
                tooltip: cml.extract(p, "tooltip"),
                tooltipPosition: cml.extract(p, "tooltipPosition"),
                tooltipDelay: cml.extract(p, "tooltipDelay")
            }, p.__contentEl__);
            var isLoading;
            if (p.__parent__ && !is.undefined(p.__parent__.loading)) {
                isLoading = !!cml.extract(p.__parent__, "loading");
            }
            mat.loaderLoad({
                active: elem.haveClass(el, "active"),
                loading: isLoading
            }, p.__contentEl__);
            return el;
        }
    });
};
