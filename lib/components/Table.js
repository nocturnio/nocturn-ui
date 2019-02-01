
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "Table",
        refresh: {
            items: function (p, m, el, instance, value) {
                elem.clear(p.__bodyEl__);
                cml.createMapItems(p, m, p.__bodyEl__, p.__childType__);
            },
            header: function (p, m, el, instance, value) {
                elem.clear(p.__headEl__);
                mat.makeTableHeader({
                    header: value
                }, p.__headEl__);
            }
        },
        create: function (p, m) {
            var options = {
                select: p.select
            };
            var ex = function (n) { options[n] = cml.extract(p, n); };
            ex("header");
            ex("bordered");
            ex("highlight");
            ex("responsive");
            ex("centered");
            ex("striped");
            var el = mat.table(options);
            p.__childType__ = "TableRow";
            p.__bodyEl__ = mat.tableBody(el);
            p.__headEl__ = mat.tableHead(el);
            cml.createMapItems(p, m, p.__bodyEl__, p.__childType__);
            return el;
        }
    });
    cml.addComponent({
        class: "TableRow",
        create: function (p, m) {
            var options = {
                titles: cml.extract(p, "titles") || [],
                secondary: cml.extract(p, "secondary") || [],
                select: p.__parent__.select
            };
            return mat.tableRow(options);
        }
    });

};
