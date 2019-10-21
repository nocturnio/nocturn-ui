module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var batchComponent = cml.getComponent("Batch");

    cml.addModule({
        class: "Grid",
        refresh: {
            items: (data, self, el, value) => {
                var items = value;
                data.__cursor__ = 0;
                data.__items__ = items;
                batchComponent.refresh.value(data.__batch__, self, null, null, items);
                if (data.__isHidden__) {
                    self.hide();
                } else {
                    self.show();
                }
            }
        },
        create: (data, self, dom) => {
            var getItems = data.items;
            var map = data.map || function (item) { return item; };

            var makeModules = function () {
                var itemAmount = cml.extract(data, "infiniteScroll");
                if (itemAmount) {
                    if (data.__cursor__ < Math.ceil(data.__items__.length / itemAmount)) {
                        var prevIndex = data.__cursor__ * itemAmount;
                        data.__cursor__++;
                        var currentIndex = data.__cursor__ * itemAmount;
                        var partition = data.__items__.slice(prevIndex, currentIndex);
                        var partitionModules = partition.map(map);
                        data.__batch__.__modules__ = data.__batch__.__modules__.concat(partitionModules);
                        if (!data.__isHidden__) {
                            partitionModules.forEach(function (m) {
                                m.__el__.classList.add(self.__name__);
                                m.show();
                            });
                        }
                    }
                } else {
                    data.__batch__.__modules__ = data.__items__.map(map);
                }
            };

            data.__batch__ = {
                value: function () {
                    return getItems();
                },
                modules: function (items) {
                    data.__items__ = items;
                    data.__batch__.__modules__ = [];
                    makeModules();
                    return data.__batch__.__modules__;
                }
            };

            batchComponent.create(data.__batch__, self);

            data.__cursor__ = 0;
            data.__items__ = getItems();
            data.__isHidden__ = true;

            self.__getElements__ = function () {
                return data.__batch__.__modules__.map(function (m) {
                    return m.__el__;
                });
            };

            self.show = function () {
                data.__batch__.__modules__.forEach(function (m) {
                    m.__el__.classList.add(self.__name__);
                    m.show();
                });
                data.__isHidden__ = false;
                self.__show__();
            };
            self.hide = function () {
                data.__batch__.__modules__.forEach(function (m) {
                    m.hide();
                });
                data.__isHidden__ = true;
                self.__hide__();
            };
            self.isHidden = function () {
                return data.__isHidden__;
            };
            makeModules();
            if (cml.extract(data, "infiniteScroll")) {
                var $window = $(window);
                var $document = $(document);
                $window.on('scroll', _.debounce(function (){
                    var scrollY = Math.ceil($window.scrollTop());
                    var scrollPadding = cml.extract(data, "scrollPadding") || 0;
                    var scrollMax = $document.height() - $window.height();
                    var isZeroes = (scrollY === 0) && (scrollMax === 0);
                    if (!isZeroes && (scrollY + scrollPadding) >= scrollMax) {
                        if (!data.__isHidden__) {
                            makeModules();
                        }
                    }
                }, 500, { maxWait: 1000 })).scroll();
            }
            return null;
        }
    });
};
