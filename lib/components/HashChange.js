
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var hashChanges = {};

    cml.addComponent({
        class: "HashChange",
        create: function (p, m) {
            var key = cml.extract(p, "key")
            hashChanges[key] = function () {
                op.change();
                if (cml.extract(p, "scrollTop")) {
                    window.scrollTo(0, 0);
                }
            };
            return null;
        }
    });

    window.addEventListener("hashchange", function () {
        var change = hashChanges(location.hash);
        if (change) {
            change();
        }
    }, false);

};
