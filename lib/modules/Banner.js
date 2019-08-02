
module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
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
            var options = {
                click: p.click
            };
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
            self.__isHidden__ = false;

            self.show = function () {
                elem.removeClass(el, "display-none");
                self.__isHidden__ = false;
                self.__show__();
            };

            self.hide = function () {
                elem.appendClass(el, "display-none");
                self.__isHidden__ = true;
                self.__hide__();
            };

            self.isHidden = function () {
                return self.__isHidden__;
            };
            return el;
        }
    });
};
