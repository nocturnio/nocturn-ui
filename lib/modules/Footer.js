module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const card = cml.getModule("Card");

    cml.addModule({
        class: "Footer",
        refresh: card.refresh,
        delete: function (p, self, el) {
            mat.modalClose(self.__contentEl__);
            elem.clear(self.__contentEl__);
        },
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
            ex("copyright");
            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;
            var el = mat.footer(options);
            self.__contentEl__ = el;
            self.__titleEl__ = mat.footerTitle(el);
            return el;
        }
    });
};
