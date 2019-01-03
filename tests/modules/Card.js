(function () {
    const cml = window.cmlruntime;
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const checker = modules.checker;

    cml.addTestModule({
        class: "Card",
        refresh: {
            title: function (p, self, el, value) {
                var c = checker(p.__testName__ + ".refresh.title");
                c.check("title should match new value", () => {
                    titleEl = self.__titleEl__;
                    return titleEl.innerHTML === value;
                });
                return c.result;
            },
            class: function (p, self, el, value) {
                var c = checker(p.__testName__ + ".refresh.class");
                c.check("content el should have new custom class value", () => {
                    return elem.haveClass(self.__contentEl__, value);
                });
                return c.result;
            },
            color: function (p, self, el, value) {
                var c = checker(p.__testName__ + ".refresh.color");
                c.check("content el should have color class", () => {
                    return elem.haveClass(self.__contentEl__, value);
                });
                return c.result;
            },
            colorText: function (p, self, el, value) {
                var c = checker(p.__testName__ + ".refresh.colorText");
                c.check("content el should have color text class", () => {
                    if (!value) return true;
                    return elem.haveClass(self.__contentEl__, value + "-text");
                });
                return c.result;
            },
            colorShade: function (p, self, el, value) {
                var c = checker(p.__testName__ + ".refresh.colorShade");
                c.check("content el should have color shade class", () => {
                    if (!value) return true;
                    return elem.haveClass(self.__contentEl__, value);
                });
                return c.result;
            },
            colorTextShade: function (p, self, el, value) {
                var c = checker(p.__testName__ + ".refresh.colorTextShade");
                c.check("content el should have color text shade class", () => {
                    if (!value) return true;
                    return elem.haveClass(self.__contentEl__, "text-" + value);
                });
                return c.result;
            }
        },
        delete: function (p, self, el) {
            var c = checker(p.__testName__ + ".delete");
            c.xcheck("current row should also be deleted after card. if empty.", () => {
                // figure out how to check this
            });
            return c.result;
        },
        create: function (p, self, dom, el) {
            p.__testName__ = "Card";
            var c = checker(p.__testName__ + ".create");
            c.check("el of type Element", () => {
                return el instanceof Element;
            });
            c.xcheck("size should match");
            c.xcheck("title should match");
            c.xcheck("offset should match");
            c.xcheck("pinned should match");
            c.xcheck("imgTitle should match");
            c.xcheck("imgTitleColor should match");
            c.xcheck("centerAlign");
            c.xcheck("height");
            c.xcheck("minHeight");
            c.xcheck("maxHeight");
            c.xcheck("paddingTop");
            c.xcheck("paddingBottom");
            c.xcheck("left");
            c.xcheck("right");
            c.xcheck("top");
            c.xcheck("bottom");
            c.xcheck("animation");
            c.xcheck("overflow");
            c.xcheck("zIndex");
            c.xcheck("sizeMediumScreen");
            c.xcheck("sizeSmallScreen");
            c.xcheck("offsetMediumScreen");
            c.xcheck("offsetSmallScreen");
            c.xcheck("container");
            return c.result;
        }
    });

})();
