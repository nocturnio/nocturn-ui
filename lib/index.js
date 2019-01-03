(function () {
    const cml = window.cmlruntime;
    const page = window.page;
    const mat = modules.mat;

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
})();
