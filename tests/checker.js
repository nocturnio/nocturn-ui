const cml = window.cml;

module.exports = function (context) {
    return {
        check: function (desc, func) {
            if (this.result) {
                if (func && !func()) {
                    this.result = false;
                    var msg = `Failed Test: In context [${context}]. ${desc}.`;
                    cml.cml.error(msg + " see log.");
                    console.log(msg);
                }
            }
        },
        xcheck: function (desc, func) {

        },
        result: true
    };
};
