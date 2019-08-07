
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "TableOfContents",
        instance: function (p, m, el) {
            return {
                "scrollTo": function (name) {
                    // setTimeout for race condition of scrolling on load
                    setTimeout(function () {
                        mat.tocScrollTo({
                            name: name
                        });
                    }, 200);
                }
            };
        },
        load: function (p, m, el, instance) {
            $(".scrollspy").scrollSpy();
        },
        defaultProperty: "items",
        create: function (p, m) {
            p.__childType__ = "TOCItem";
            var el = mat.toc({
                hideOnMobile: cml.extract(p, "hideOnMobile")
            });
            cml.createMapItems(p, m, mat.tocList(el), p.__childType__);
            return el;
        }
    });

    cml.addComponent({
        class: "TOCItem",
        create: function (p, m) {
            var options = {
                select: p.select
            };
            var el = mat.tocItem({
                select: p.select,
                active: cml.extract(p, "active"),
                key: cml.extract(p, "key"),
                label: cml.extract(p, "label")
            });
            return el;
        }
    });
};
