
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "SideNavSection",
        context: "SideNav",
        refresh: {
            active: function (p, m, el, instance, value) {
                mat.sideNavSectionActivate({
                    key: cml.extract(p, "key"),
                    active: value
                });
            },
            icon: function (p, m, el, instance, value) {
                var sectionEl = elem.byId(cml.extract(p, "key"));
                var headerEl = elem.byClassName(sectionEl, "side-nav-section")[0];
                var iconEl = elem.byTagName(headerEl, "i")[0];
                if (iconEl) {
                    elem.clear(iconEl);
                    elem.appendText(iconEl, value);
                }
            },
            label: function (p, m, el, instance, value) {
                var icon = cml.extract(p, "icon");
                var secondary = cml.extract(p, "secondary");
                var sectionEl = elem.byId(cml.extract(p, "key"));
                var headerEl = elem.byClassName(sectionEl, "side-nav-section")[0];
                elem.clear(headerEl);
                elem.appendText(headerEl, value);
                if (icon) {
                    elem.append(headerEl, elem.m("i", {
                        class: "material-icons"
                    }, icon));
                }
                if (secondary) {
                    secondary.reverse().forEach(function (sec) {
                        elem.append(headerEl, mat.listItemSecondary(sec));
                    });
                }
            },
            secondary: function (p, m, el, instance, value) {
                var sectionEl = elem.byId(cml.extract(p, "key"));
                var headerEl = elem.byClassName(sectionEl, "side-nav-section")[0];
                elem.byClassName(headerEl, "secondary-content").forEach(function (secEl) {
                    elem.delete(secEl);
                });
                value.reverse().forEach(function (sec) {
                    elem.append(headerEl, mat.listItemSecondary(sec));
                });
            }
        },
        instance: function (p, m, el) {
            return {
                isActive: function () {
                    return elem.haveClass(elem.byId(cml.extract(p, "key")), "active");
                },
                expand: function () {
                    var isActive = this.isActive();
                    if (!isActive) {
                        var sectionEl = elem.byId(cml.extract(p, "key"));
                        var headerEl = elem.byClassName(sectionEl, "side-nav-section")[0];
                        headerEl.click();
                    }
                },
                collapse: function () {
                    var isActive = this.isActive();
                    if (isActive) {
                        var sectionEl = elem.byId(cml.extract(p, "key"));
                        var headerEl = elem.byClassName(sectionEl, "side-nav-section")[0];
                        headerEl.click();
                    }
                }
            };
        },
        load: function (p, m, el, instance) {
            mat.sideNavSectionLoad({
                select: p.select,
                key: cml.extract(p, "key"),
                active: cml.extract(p, "active")
            });
        },
        create: function (p, m) {
            var options = {
                label: cml.extract(p, "label"),
                icon: cml.extract(p, "icon"),
                secondary: cml.extract(p, "secondary"),
                key: cml.extract(p, "key"),
                getSections: function () {
                    return m.__sideNavSections__;
                },
                setSections: function (s) {
                    m.__sideNavSections__ = s;
                }
            };
            return mat.sideNavSection(options);
        }
    });

};
