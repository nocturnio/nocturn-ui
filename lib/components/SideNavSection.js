
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
            }
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
