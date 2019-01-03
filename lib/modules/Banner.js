(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const refresh = modules.refresh;
    const is = modules.is;
    const card = cml.getModule("Card");

    cml.addModule({
        class: "Banner",
        refresh: card.refresh,
        create: function (p, self, dom) {
            self.__className__ = cml.extract(p, "class");
            self.__color__ = cml.extract(p, "color");
            self.__colorText__ = cml.extract(p, "colorText");
            self.__colorShade__ = cml.extract(p, "colorShade");
            self.__colorTextShade__ = cml.extract(p, "colorTextShade");
            var options = {};
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("title");
            ex("centerAlign");
            ex("height");
            ex("minHeight");
            ex("maxHeight");
            ex("paddingTop");
            ex("paddingBottom");
            ex("fixed");
            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;
            var el = mat.banner(options);
            self.__contentEl__ = el;
            self.__titleEl__ = mat.bannerTitle(el);
            return el;
        }
    });
})();
