module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;

    cml.addTest({
        class: "ProgressBar",
        refresh: {
            percent: function (p, m, el, instance, value) {
                var c = checker("ProgressBar.refresh.percent");
                c.check("percent size should match percent", () => {
                    var barEl = el.childNodes[0];
                    if (elem.haveClass(barEl, "determinate")) {
                        var percentStr = elem.numberToPercentStr(value);
                        return barEl.style.width == percentStr;
                    } else {
                        return true;
                    }
                });
                return c.result;
            }
        },
        instance: function (p, m, el, instance) {
            var c = checker("ProgressBar.instance");
            c.check("instance should match el", () => {
                return el == instance;
            });
            return c.result;
        },
        create: function (p, m, el) {
            var c = checker("ProgressBar.create");

            c.check("el should be a dom element", () => {
                return el instanceof Element;
            });

            c.check("el should have progress class", () => {
                return elem.haveClass(el, "progress");
            });

            c.check("percent size should match percent", () => {
                var barEl = el.childNodes[0];
                var percent = cml.extract(p, "percent");
                if (percent) {
                    return elem.haveClass(barEl, "determinate") &&
                        barEl.style.width == elem.numberToPercentStr(percent);
                } else {
                    return elem.haveClass(barEl, "indeterminate");
                }
            });

            c.check("el should have color class", () => {
                var color = cml.extract(p, "color");
                if (color) {
                    var barEl = el.childNodes[0];
                    return elem.haveClass(el, color) &&
                        elem.haveClass(el, "lighten-4") &&
                        elem.haveClass(barEl, color);
                } else {
                    return true;
                }
            });
            return c.result;
        }
    });
};
