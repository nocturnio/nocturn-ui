module.exports.register = function (cml, dependencies) {
    dependencies.checker = require("./tests/checker.js");

    require("./tests/modules/Module.js").register(cml, dependencies);
    require("./tests/modules/Card.js").register(cml, dependencies);

    require("./tests/components/Button.js").register(cml, dependencies);
    require("./tests/components/Link.js").register(cml, dependencies);
    require("./tests/components/Links.js").register(cml, dependencies);
    require("./tests/components/Divider.js").register(cml, dependencies);
    require("./tests/components/Image.js").register(cml, dependencies);
    require("./tests/components/ProgressBar.js").register(cml, dependencies);
    require("./tests/components/Text.js").register(cml, dependencies);
    require("./tests/components/CheckList.js").register(cml, dependencies);
    require("./tests/components/List.js").register(cml, dependencies);
};
