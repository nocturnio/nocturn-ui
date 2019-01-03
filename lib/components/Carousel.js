(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var load = function (p, el) {
        var options = {
            duration: cml.extract(p, "duration"),
            dist: cml.extract(p, "dist"),
            shift: cml.extract(p, "shift"),
            padding: cml.extract(p, "padding"),
            fullWidth: cml.extract(p, "fullWidth"),
            indicators: cml.extract(p, "indicators"),
            noWrap: cml.extract(p, "noWrap")
        };
        mat.carouselLoad(options, el);
    };

    cml.addComponent({
        class: "Carousel",
        refresh: {
            index: function (p, m, el, instance, value) {
                mat.setCarouselIndex(el, value);
            },
            items: function (p, m, el, instance, value) {
                mat.carouselDestroy(el);
                elem.clear(el);
                var count = 0;
                var stop = cml.extract(p, "items").length;
                p.__count__ = function () {
                    count++;
                    if (count >= stop) {
                        load(p, el);
                    }
                }
                cml.createMapItems(p, m, el, "CarouselItem");
                load(p, el);
            }
        },
        delete: function (p, m, el, instance) {
            mat.carouselDestroy(el);
        },
        instance: function (p, m, el, instance) {
            return el;
        },
        load: function (p, m, el, instance) {
            load(p, el);
        },
        create: function (p, m) {
            var options = {};
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("indicators");
            ex("fullWidth");
            ex("height");
            var count = 0;
            var stop = cml.extract(p, "items").length;
            p.__count__ = function () {
                count++;
                if (count >= stop) {
                    load(p, el);
                }
            }
            var el = mat.carousel(options);
            cml.createMapItems(p, m, el, "CarouselItem");
            if (options.indicators) {
                el.setAttribute("data-indicators", true);
            }
            return el;
        }
    });
    cml.addComponent({
        class: "CarouselItem",
        create: function (p, m) {
            return mat.carouselItem({
                img: cml.extract(p, "img"),
                url: cml.extract(p, "url"),
                count: p.__parent__.__count__
            });
        }
    });
})();
