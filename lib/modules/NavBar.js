module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const card = cml.getModule("Card");

    var navbarCurrent = {
        delete: function () {}
    };

    cml.addModule({
        class: "NavBar",
        refresh: _.merge({
            titleUrl: function (p, self, el, value) {
                self.__titleEl__.href = value;
            }
        }, card.refresh),
        create: function (p, self, dom) {
            // navbar is a singleton. So we need to delete the previous one,
            // before creating a new one.
            navbarCurrent.delete();
            navbarCurrent = self;

            // store color and class values in self.
            // So that we can use it for refreshing
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
            ex("titleHide");
            ex("titleUrl");
            ex("sideNavButtonHide");
            ex("fixed");

            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;
            var el = mat.navbar(options);
            self.__contentEl__ = mat.navBody(el);
            self.__titleEl__ = mat.navTitle(el);
            return el;
        }
    });
};
