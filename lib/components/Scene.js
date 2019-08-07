module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    var _scenes = {};
    var _routers = [];
    var _sceneCounter = 0;
    var _currentScene = null;
    var _prevUrl = "";
    var _currentUrl = "";

    var cmlruntime = cml.cml;
    var ogNew = cmlruntime.new;
    var ogInit = cmlruntime.init;

    cmlruntime.new = function () {
        // overwrite cml.new
        var m = ogNew.apply(this, arguments);
        if (_sceneCounter > 0) {
            // when Scenes are loaded we want to hide modules by default
            if (m.hide) {
                m.hide();
            }
        }
        return m;
    };

    cmlruntime.init = function (op) {
        // overwrite cml.init
        _routers.sort(sortRouters);
        _routers.forEach(function (r) {
            r.init();
        });
        ogInit(op);
    };

    var literalKeywordIndex = function (pieces, startIndex) {
        return pieces.findIndex(function (p, index) {
            if (index > startIndex) {
                return p[0] !== ":" && p !== "*";
            } else {
                return false;
            }
        });
    };
    var isLiteral = function (str) {
        return str[0] !== ":" && str !== "*";
    };
    var sortRouters = function (a, b) {
        var aScore = 0;
        var bScore = 0;
        if (a.path === "*") {
            aScore = -99;
        } else if (b.path === "*") {
            bScore = -99;
        } else if (!a.path) {
            aScore = -98;
        } else if (!b.path) {
            bScore = -98;
        } else {
            var aPieces = a.path.split("/");
            var bPieces = b.path.split("/");
            var max = aPieces.length > bPieces.length ? aPieces.length : bPieces.length;
            var score = max;
            for (var i = 0; i < max; i++) {
                var aP = aPieces[i];
                var bP = bPieces[i];
                if (aP) {
                    if (isLiteral(aP)) {
                        aScore += score;
                    }
                }
                if (bP) {
                    if (isLiteral(bP)) {
                        bScore += score;
                    }
                }
                score--;
            }
        }
        if (aScore > bScore) {
            return -1;
        } else if (aScore < bScore) {
            return 1;
        } else {
            return 0;
        }
    };

    var isSameScene = function (p, context) {
        if (_currentScene) {
            return _prevUrl === _currentUrl;
        } else {
            return false;
        }
    };

    var isEdgeAvailable = function (p, context) {
        var isAvailable = false;

        if (_currentScene) {
            var edges = _currentScene.exit ? _currentScene.exit(context) : false;
            if (p.__id__ === _currentScene.__id__) {
                isAvailable = true;
            } else if (edges) {
                isAvailable = !!edges.find(function (sceneInstance) {
                    return sceneInstance.id === p.__id__;
                });
            } else {
                // whitelist if no edges provided, but give a warning
                isAvailable = true;
                var basePath = cml.extract(_currentScene, "basePath") || "";
                console.log("No Edges provided for " + basePath + cml.extract(_currentScene, "path"));
            }
        } else {
            // first scene always passes
            isAvailable = true;
        }


        isAvailable = true;
        return isAvailable;
    };
    var sceneShow = function (p, modules) {
        var id = p.__id__;
        cmlruntime.modules().forEach(function (m) {
            if (m.hide) {
                m.hide();
            } else {
                m.__el__ && m.__el__.classList.add("display-none");
            }
        });
        modules.forEach(function (m) {
            if (m.show) {
                m.show();
            } else {
                m.__el__ && m.__el__.classList.remove("display-none");
            }
        });
        cmlruntime.refresh();
        _currentScene = p;
    };
    var router = cml.getComponent("Router");

    cml.addComponent({
        class: "Scene",
        instance: function (p, m, el) {
            return {
                id: p.__id__
            };
        },
        defaultProperty: "path",
        create: function (p, m) {
            var validate = p.validate || function (c) { return true; };
            var failure = p.fail || function (c) {};
            var success = p.enter || function (c) {};
            var sceneRoute = function (context) {
                if (isSameScene(p, context)) {
                    console.log("Same Scene");
                    console.log("    from: " + _currentUrl);
                    console.log("    to: " + p.path);
                } else if (isEdgeAvailable(p, context)) {
                    cml.mat.animationState.cancelCurrent();
                    if (validate(context)) {
                        sceneShow(p, success(context));
                    } else {
                        failure(context, {
                            type: "validate",
                            url: cml.extract(p, "basePath") + cml.extract(p, "path")
                        });
                    }
                } else {
                    cml.mat.animationState.cancelCurrent();
                    console.log("Edge is not available: " + cml.extract(p, "basePath") + cml.extract(p, "path"));
                    console.log("    id: " + p.__id__);
                    console.log("    from: " + cmlruntime.prevLocation);
                    console.log("    edges: " + _currentScene.exit(context).map(function (s) { return s.id; }));
                    console.log(_currentScene.exit(context).find(function (s) { return s.id === p.__id__; }));
                }
            };
            _routers.push({
                init: function () {
                    router.create({
                        path: cml.extract(p, "path"),
                        basePath: cml.extract(p, "basePath"),
                        scrollTop: cml.extract(p, "scrollTop"),
                        route: function (context) {
                            _prevUrl = _currentUrl;
                            _currentUrl = context.path;
                            context.prevLocation = _prevUrl;
                            sceneRoute(context);
                        }
                    }, m);
                },
                path: cml.extract(p, "path")
            });
            p.__id__ = p.__name__;
            _scenes[p.__id__] = p;
            _sceneCounter++;
            return null;
        }
    });
};
