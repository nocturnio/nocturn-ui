const cml = window.cml;
const page = window.page;
const mat = require("./lib/mat.js");

cml.addEvents({
    "init": (function() {
        mat.modalInit();
        page();
    }),
    "error": (function(str) {
        return mat.toast({
            msg: str,
            color: "red"
        });
    }),
    "say": (function(str) {
        return mat.toast({
            msg: str
        });
    })
});

const dependencies = {
    mat: mat,
    elem: require("./lib/elem.js"),
    is: require("./lib/is.js"),
    http: require("./lib/http.js")
};

require("./library.js").register(cml, dependencies);
require("./tests.js").register(cml, dependencies);
