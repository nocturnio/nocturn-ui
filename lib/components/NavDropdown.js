
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var dropdown = cml.getComponent("Dropdown");
    var navlink = cml.getComponent("NavLink", "NavBar");

    cml.addComponent({
        class: "NavDropdown",
        container: "items",
        context: "NavBar",
        refresh: _.merge({
            items: dropdown.refresh.items,
            label: dropdown.refresh.label,
            disabled: dropdown.refresh.disabled

        }, navlink.refresh),
        load: function (p, m, el, instance) {
            dropdown.load(p, m, el, instance);
            navlink.refresh.active(p, m, el, instance, cml.extract(p, "active"));
        },
        defaultProperty: dropdown.defaultProperty,
        create: function (p, m) {
            p.__id__ = mat.uuid();
            p.__childType__ = "DropdownItem";
            var dropdownOptions = {
                id: p.__id__
            };
            var ex = function (n) { dropdownOptions[n] = cml.extract(p, n); };
            var dropdownEl = mat.navDropdown(dropdownOptions);
            cml.createMapItems(p, m, dropdownEl, p.__childType__);

            p.__color__ = cml.extract(p, "color");
            p.__colorText__ = cml.extract(p, "colorText");
            p.__colorShade__ = cml.extract(p, "colorShade");
            p.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var flat = cml.extract(p, "flat");
            var buttonOptions = {
                id: p.__id__,
                color: p.__color__,
                colorText: p.__colorText__,
                colorShade: p.__colorShade__,
                colorTextShade: p.__colorTextShade__,
                label: cml.extract(p, "label"),
                icon: cml.extract(p, "icon"),
                disabled: cml.extract(p, "disabled"),
                width: cml.extract(p, "width"),
                height: cml.extract(p, "height"),
                flat: is.undefined(flat) ? false : flat,
                block: cml.extract(p, "block"),
                click: p.click
            };
            if (!buttonOptions.height && !buttonOptions.label) {
                buttonOptions.height = "64px";
            }
            var el = mat.navDropdownButton(buttonOptions);
            p.__contentEl__ = el;
            return el;
        }
    });
};
