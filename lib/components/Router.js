
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const page = window.page;

    cml.addComponent({
        class: "Router",
        instance: function (p, self, el) {
            return {};
        },
        defaultProperty: "url",
        create: function (p, self) {
            var path = cml.extract(p, "url") || cml.extract(p, "path") || "";
            var basePath = cml.extract(p, "basePath") || "";
            var url = basePath + path;
            page(url, function (context) {
                var scrollTop = cml.extract(p, "scrollTop");
                if (scrollTop) {
                    window.scrollTo(0, 0);
                }
                p.route(context);
            });
            return null;
        }
    });
};
