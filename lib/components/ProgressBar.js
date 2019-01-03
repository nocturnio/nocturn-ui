(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.addComponent({
        class: "ProgressBar",
        refresh: {
            percent: function (p, m, el, instance, value) {
                var barEl = el.childNodes[0];
                barEl.style.width = elem.numberToPercentStr(value);
            }
        },
        instance: function (p, m, el) {
            return el;
        },
        create: function (p, m) {
            return mat.progressBar({
                percent: cml.extract(p, "percent"),
                color: cml.extract(p, "color")
            });
        }
    });
})();
