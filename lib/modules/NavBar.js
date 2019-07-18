module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const card = cml.getModule("Card");

    cml.addModule({
        class: "NavBar",
        refresh: _.merge({
            titleUrl: function (p, self, el, value) {
                if (self.__titleEl__) {
                    self.__titleEl__.href = value;
                }
            }
        }, card.refresh),
        create: function (p, self, dom) {
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
            ex("extended");
            ex("animation");

            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;
            var navEl = mat.navbar(options);
            var el = elem.parent(navEl);
            self.__contentEl__ = mat.navBody(el);
            self.__titleEl__ = mat.navTitle(el);
            self.show = function () {
                if (options.animation) {
                    mat.animateEl(navEl, options.animation);
                }
                elem.removeClass(navEl, "display-none");

                elem.prepend(navEl, elem.byId("side-nav-button"));

                if (options.fixed) {
                    elem.appendClass(el, "navbar-fixed");
                } else {
                    elem.removeClass(el, "navbar-fixed");
                }
                // reorient navBar
                // set side-nav-button id
                //
            };
            self.hide = function () {
                elem.appendClass(navEl, "display-none");
            };
            self.isHidden = function () {
                return elem.haveClass(navEl, "display-none");
            };
            return el;
        }
    });
};
