module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const card = cml.getModule("Card");

    cml.addModule({
        class: "FAB",
        refresh: _.merge({
            disabled: function (p, self, el, value) {
                if (value) {
                    elem.appendClass(self.__contentEl__, "disabled");
                } else {
                    elem.removeClass(self.__contentEl__, "disabled");
                }
            },
            tooltip: function (p, self, el, value) {
                $(self.__contentEl__).tooltip('remove');
                mat.tooltipLoad({
                    tooltip: value,
                    tooltipPosition: cml.extract(p, "tooltipPosition")
                }, self.__contentEl__);
            },
            tooltipPosition: function (p, self, el, value) {
                $(self.__contentEl__).tooltip('remove');
                mat.tooltipLoad({
                    tooltip: cml.extract(p, "tooltip"),
                    tooltipPosition: value
                }, self.__contentEl__);
            },
            icon: function (p, self, el, value) {
                var iconEl = elem.byTagName(self.__contentEl__, "i")[0];
                elem.clear(iconEl);
                elem.appendText(iconEl, value);
            }
        }, card.refresh),
        instance: function (p, self, el) {
            return $(el);
        },
        delete: function (p, self, el, instance) {
            $(p.__contentEl__).tooltip('remove');
        },
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

            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;
            options.icon = cml.extract(p, "icon");
            options.container = cml.extract(p, "container");
            options.clickToggle = cml.extract(p, "clickToggle");
            options.horizontal = cml.extract(p, "horizontal");
            options.toolbar = cml.extract(p, "toolbar");

            var el = mat.fab(options);
            self.__contentEl__ = mat.fabA(el);
            mat.tooltipLoad({
                tooltip: cml.extract(p, "tooltip"),
                tooltipPosition: cml.extract(p, "tooltipPosition")
            }, self.__contentEl__);

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
