module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;
    const card = cml.getModule("Card");

    var modalCurrent = {
        delete: function () {}
    };

    cml.addModule({
        class: "Modal",
        refresh: card.refresh,
        delete: function (p, self, el) {
            mat.modalClose(self.__contentEl__);
            elem.clear(self.__contentEl__);
        },
        create: function (p, self, dom) {

            // modal is a singleton. So we need to delete the previous one,
            // before creating a new one.
            modalCurrent.delete();
            modalCurrent = self;

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
            ex("fixedFooter");
            ex("title");
            options.color = self.__color__;
            options.colorText = self.__colorText__;
            options.colorShade = self.__colorShade__;
            options.colorTextShade = self.__colorTextShade__;
            options.className = self.__className__;
            options.dom = dom;
            options.ready = p.ready;
            options.complete = p.complete;
            options.moduleName = p.__name__;

            options.collapsibles = self.__collapsibles__;
            options.postTabs = self.__postTabs__;

            var el = mat.modal(options);
            self.__contentEl__ = el;
            self.__titleEl__ = mat.modalTitle(el);
            mat.modalLoad({
                dismissable: options.dismissable,
                opacity: options.opacity,
                inDuration: options.inDuration,
                outDuration: options.outDuration,
                startingTop: options.startingTop,
                endingTop: options.endingTop,
                ready: options.ready,
                complete: options.complete
            }, el);

            self.show = function () {
            };
            self.hide = function () {
            };
            mat.modalOpen(el);
            return mat.modalBody(el);
        }
    });
};
