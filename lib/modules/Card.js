module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    cml.setDefaultMapModule("Card");

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
                var prevClass = self[key];
                mat.replaceClass(contentEl, self, key, value, "", "", true);
                mat.replaceClass(el, self, key, value, "", "-container");
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
            },
            size: function (p, self, el, value) {
                var key = "__size__";
                var sizeClass = "l" + value;
                mat.replaceClass(el, self, key, value, "l");
            },
            offset: function (p, self, el, value) {
                var key = "__offset__";
                var sizeClass = "l" + value;
                mat.replaceClass(el, self, key, value, "offset-l");
            }
        },
        create: function (p, self, dom) {
            if (p.preload) {
                p.preload();
            }

            // store color and class values in self.
            // So that we can use it for refreshing
            self.__className__ = cml.extract(p, "class");
            self.__color__ = cml.extract(p, "color");
            self.__colorText__ = cml.extract(p, "colorText");
            self.__colorShade__ = cml.extract(p, "colorShade");
            self.__colorTextShade__ = cml.extract(p, "colorTextShade");
            self.__size__ = cml.extract(p, "size");
            self.__offset__ = cml.extract(p, "offset");

            var options = {
                click: p.click
            };
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("flat");
            ex("title");
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
            ex("animationDelay");
            ex("animationTimer");
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
            options.size = self.__size__;
            options.offset = self.__offset__;
            options.className = self.__className__;
            options.dom = dom;

            options.collapsibles = self.__collapsibles__;
            options.postTabs = self.__postTabs__;

            var el = mat.card(options);
            self.__contentEl__ = mat.cardBody(el);
            self.__titleEl__ = mat.cardTitle(el);
            self.__isHidden__ = false;
            self.show = function () {
                if (options.animation) {
                    mat.animationState.queueAnimation(el, options.animation, options.animationTimer || 3000, options.animationDelay);
                } else {
                    elem.removeClass(el, "display-none");
                }
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
