;(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const navbar = cml.getModule("NavBar");

    var sideNavCurrent = {
        delete: function () {}
    };

    cml.addModule({
        class: "SideNav",
        refresh: _.merge({
            titleUrl: function (p, self, el, value) {
                self.__titleEl__.href = value;
            }
        }, navbar.refresh),
        delete: function (p, self, el, value) {
            stopShiftBody(p, self, el, value);
            elem.clear(elem.byId("side-nav"));
        },
        hide: function (p, self, el, value) {
            mat.sideNavUnshiftBody();
        },
        show: function (p, self, el, value) {
            mat.sideNavShiftBody();
        },
        create: function (p, self, dom) {
            // navbar is a singleton. So we need to delete the previous one,
            // before creating a new one.
            sideNavCurrent.delete();
            sideNavCurrent = self;

            // store color and class values in self.
            // So that we can use it for refreshing
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
            ex("titleUrl");

            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;
            options.sections = self.__sideNavSections__;
            var el = mat.sidenav(options);
            self.__contentEl__ = el;
            self.__titleEl__ = mat.sideNavTitle(el);
            self.close = function () {
                mat.sideNavClose();
            };
            self.closeOnSmallScreen = function () {
                mat.sideNavCloseOnSmallScreen();
            };
            return el;
        }
    });
})();
