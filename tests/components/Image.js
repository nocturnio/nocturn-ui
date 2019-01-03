(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const refresh = modules.refresh;
    const is = modules.is;
    const util = modules.util;
    const checker = modules.checker;

    cml.addTest({
        class: "Image",
        refresh: {
            url: function (p, m, el, instance, value) {
                var c = checker("Image.refresh.url");
                c.xcheck("el.src should match url");
                return c.result;
            }
        },
        instance: function (p, m, el, instance) {
            var c = checker("Image.instance");
            c.check("instance should match el", () => {
                return el == instance;
            });
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("Image.create");
            c.xcheck("el.src should match url");
            c.check("el.style.display should be block if block is true", () => {
                var block = cml.extract(p, "block");
                return block ? el.style.display == "block" : true;
            });
            c.check("el.style.width should match width", () => {
                var width = cml.extract(p, "width");
                return width ? el.style.width == width : true;
            });
            c.check("el.style.height should match height", () => {
                var height = cml.extract(p, "height");
                return height ? el.style.height == height : true;
            });
            c.check("el.style.maxWidth should match maxWidth", () => {
                var maxWidth = cml.extract(p, "maxWidth");
                return maxWidth ? el.style.maxWidth == maxWidth : true;
            });
            c.check("el.style.maxHeight should match maxHeight", () => {
                var maxHeight = cml.extract(p, "maxHeight");
                return maxHeight ? el.style.maxHeight == maxHeight : true;
            });
            c.check("el.style.minWidth should match minWidth", () => {
                var minWidth = cml.extract(p, "minWidth");
                return minWidth ? el.style.minWidth == minWidth : true;
            });
            c.check("el.style.minHeight should match minHeight", () => {
                var minHeight = cml.extract(p, "minHeight");
                return minHeight ? el.style.minHeight == minHeight : true;
            });
            return c.result;
        }
    });
})();
