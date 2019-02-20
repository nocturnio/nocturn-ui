module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const navbar = cml.getModule("NavBar");

    var sideNavCurrent = {
        delete: function () {}
    };

    cml.addModule({
        class: "SideNav",
        refresh: _.merge({}, navbar.refresh, {
            titleUrl: function (p, self, el, value) {
                self.__titleEl__.href = value;
            },
            title: function (p, self, el, value) {
                elem.clear(self.__titleEl__);
                elem.appendText(self.__titleEl__, value);
            },
            activeItemKey: function (p, self, el, value) {
                loadActiveItem(self, value);
            }
        }),
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
            self.__activeItemKey__ = "__sidenavitem-" + cml.extract(p, "activeItemKey") + "__";

            var options = {
                click: p.click
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };

            ex("title");
            ex("titleUrl");
            ex("expandable");

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
            loadActiveItem(self, self.__activeItemKey__);
            return el;
        }
    });

    var loadActiveItem = function (self, newItemKey) {
        elem.byClassName(elem.byId("side-nav"), self.__activeItemKey__).forEach(function (c) {
            elem.removeClass(c, "active");
        });
        elem.byClassName(elem.byId("side-nav"), newItemKey).forEach(function (c) {
            elem.appendClass(c, "active");
        });
        self.__activeItemKey__ = "__sidenavitem-" + newItemKey + "__";
    }
};
