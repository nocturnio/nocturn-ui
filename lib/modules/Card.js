(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const refresh = modules.refresh;
    const is = modules.is;

    cml.addModule({
        class: "Card",
        refresh: {
            title: function (p, self, el, value) {
                var titleEl = self.__titleEl__;
                if (titleEl && !is.undefined(value)) {
                    elem.clear(titleEl);
                    elem.appendText(titleEl, value);
                }
            },
            class: function (p, self, el, value) {
                var key = "__className__";
                var contentEl = self.__contentEl__;
                mat.replaceClass(contentEl, self, key, value);
            },
            color: function (p, self, el, value) {
                var key = "__color__";
                var contentEl = self.__contentEl__;
                mat.replaceClass(contentEl, self, key, value);
            },
            colorText: function (p, self, el, value) {
                var key = "__colorText__";
                var contentEl = self.__contentEl__;
                mat.replaceClass(contentEl, self, key, value, "", "-text");
            },
            colorShade: function (p, self, el, value) {
                var key = "__colorShade__";
                var contentEl = self.__contentEl__;
                mat.replaceClass(contentEl, self, key, value);
            },
            colorTextShade: function (p, self, el, value) {
                var key = "__colorTextShade__";
                var contentEl = self.__contentEl__;
                mat.replaceClass(contentEl, self, key, value, "text-");
            }
        },
        delete: function (p, self, el) {
            if ((mat.rowSize(elem.parent(el)) - mat.colSize(el)) === 0) {
                elem.delete(elem.parent(el));
            }
        },
        create: function (p, self, dom) {

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
            ex("flat");
            ex("title");
            ex("size");
            ex("offset");
            ex("pinned");
            ex("mobilePinned");
            ex("img");
            ex("imgTitle");
            ex("imgTitleColor");
            ex("centerAlign");
            ex("height");
            ex("minHeight");
            ex("maxHeight");
            ex("paddingTop");
            ex("paddingBottom");
            ex("left");
            ex("right");
            ex("top");
            ex("bottom");
            ex("animation");
            ex("overflow");
            ex("zIndex");
            ex("sizeMediumScreen");
            ex("sizeSmallScreen");
            ex("offsetMediumScreen");
            ex("offsetSmallScreen");
            ex("container");
            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;

            options.collapsibles = self.__collapsibles__;
            options.postTabs = self.__postTabs__;

            var el = mat.card(options);
            self.__contentEl__ = mat.cardBody(el);
            self.__titleEl__ = mat.cardTitle(el);
            return el;
        }
    });
})();
