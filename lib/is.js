(function () {
    modules.is = {
        undefined: function (obj) { return typeof (obj) === "undefined"; },
        function: function (obj) { return typeof (obj) === "function"; },
        string: function (obj) { return typeof (obj) === "string"; },
        number: function (obj) { return typeof (obj) === "number"; },
        element: function (obj) { return obj instanceof Element; }
    };
})();
