const elem = require("./elem.js");
const is = require("./is.js");
const http = require("./http.js");

var idCount = 0;

var uuid = function () {
    idCount++;
    return idCount;
};

var numberToPercentStr = function (num) {
    return (0 === num) ? "0%" : ((num * 100) + "%");
};
var rowSize = function(r) {
    return elem.children(r).reduce(function (accum, el) {
        return accum + colSize(el);
    }, 0);
};
var colSize = function(el) {
    var pattern = new RegExp("l(\\d+)");
    var found = el.className.match(pattern);
    if (found == null) {
        return 0;
    } else {
        return Number(found[1]) + colSizeOffset(el);
    }
};
var colSizeOffset = function(el) {
    var pattern = new RegExp("offset\\-l(\\d+)");
    var class_name = (el["className"]);
    var found = el.className.match(pattern);
    if (found == null) {
        return 0;
    } else {
        return Number(found[1]);
    }
};
var colorClass = function(color, colorText, shade, textShade) {
    return (color ? color + " ": "") +
        (colorText ? colorText + "-text " : "") +
        (shade ? shade + " " : "") +
        (textShade ? "text-" + textShade + " " : "");
};
var colorClassOptions = function (options) {
    return colorClass(options.color, options.colorText, options.colorShade, options.colorTextShade);
};
var colors = [
    "red",
    "pink",
    "purple",
    "deep-purple",
    "indigo",
    "blue",
    "light-blue",
    "cyan",
    "teal",
    "green",
    "light-green",
    "lime",
    "yellow",
    "amber",
    "orange",
    "deep-orange",
    "brown",
    "grey",
    "blue-grey",
    "black",
    "white"
];
var shades = [
    "lighten-5",
    "lighten-4",
    "lighten-3",
    "lighten-2",
    "lighten-1",
    "darken-1",
    "darken-2",
    "darken-3",
    "darken-4",
    "accent-1",
    "accent-2",
    "accent-3",
    "accent-4"
];
var codeMd = function (type, value) {
    return "``` " + type + "\n" + value + "\n ```";
};
var haveColor = function (el) {
    return colors.find(function (c) {
        return elem.haveClass(el, c);
    });
};
var haveColorText = function (el) {
    return colors.find(function (c) {
        return elem.haveClass(el, c + "-text");
    });
};
var haveColorShade = function (el) {
    return shades.find(function (c) {
        return elem.haveClass(el, c);
    });
};
var haveColorTextShade = function (el) {
    return shades.find(function (c) {
        return elem.haveClass(el, "text-" + c);
    });
};
var replaceClass = function (el, obj, name, c2, preText, postText, haveMore) {
    preText = preText || "";
    postText = postText || "";
    var c1 = obj[name];
    if (c1) {
        elem.removeClass(el, preText + c1 + postText);
    }
    if (c2) {
        elem.appendClass(el, preText + c2 + postText);
    }
    if (!haveMore) {
        obj[name] = c2;
    }
};
var buttonA = function (el) {
    return elem.byTagName(el, "a")[0];
};
var tabA = function (el) {
    return elem.children(el)[0];
};
var navTabA = function (el) {
    return elem.byTagName(el, "a")[0];
};
var footerItemA = function (el) {
    return elem.byTagName(el, "a")[0];
};
var sideNavItemA = function (el) {
    return elem.byTagName(el, "a")[0];
};
var checkboxInput = function (el) {
    return elem.byTagName(el, "input")[0];
};
var toggleInput = function (el) {
    return elem.byTagName(el, "input")[0];
};
var toggleLabel = function (el) {
    return elem.byClassName(el, "toggle-label")[0];
};
var fieldInput = function (el) {
    return elem.byTagName(el, "input")[0];
};
var fieldLabel = function (el) {
    return elem.byTagName(el, "label")[0];
};
var textAreaInput = function (el) {
    return elem.byTagName(el, "textarea")[0];
};
var textAreaLabel = function (el) {
    return elem.byTagName(el, "label")[0];
};
var fileInputField = function (el) {
    return elem.byClassName(el, "file-path")[0];
};
var fileInputLabel = function (el) {
    return elem.byTagName(elem.byClassName(el, "file-input-button")[0], "span")[0];
};
var fileInputButton = function (el) {
    return elem.byTagName(elem.byClassName(el, "file-input-button")[0], "input")[0];
};
var dropdownButton = function (el) {
    return elem.byTagName(el, "a")[0];
};
var selectElement = function (el) {
    return elem.byTagName(el, "select")[0];
};
var tableBody = function (el) {
    return elem.byTagName(el, "tbody")[0];
};
var tableHead = function (el) {
    return elem.byTagName(el, "thead")[0];
};
var tocList = function (el) {
    return elem.byClassName(el, "table-of-contents")[0];
};
var cardBody = function (el) {
    return elem.byClassName(el, "card")[0];
};
var cardTitle = function (el) {
    return elem.byClassName(el, "card-title")[0];
};
var modalBody = function (el) {
    return elem.byClassName(el, "modal-content")[0];
};
var modalTitle = function (el) {
    return elem.byClassName(el, "modal-title")[0];
};
var footerTitle = function (el) {
    return elem.byClassName(el, "footer-title")[0];
};
var bannerBody = function (el) {
    return elem.byClassName(el, "banner")[0];
};
var bannerTitle = function (el) {
    return elem.byClassName(el, "banner-title")[0];
};
var navBody = function (el) {
    return elem.byTagName(el, "nav")[0];
};
var navTitle = function (el) {
    return elem.byClassName(document, "brand-logo")[0];
};
var sideNavTitle = function (el) {
    return elem.byClassName(el, "side-nav-title")[0];
};
var progressBar = function (options) {
    var barEl = elem.m("div");
    var el = elem.m("div", { class: "progress" }, barEl);
    if (options.percent) {
        elem.appendClass(barEl, "determinate");
        barEl.style.width = elem.numberToPercentStr(options.percent);
    } else {
        elem.appendClass(barEl, "indeterminate");
    }
    if (options.color) {
        elem.appendClass(barEl, options.color);
        elem.appendClass(el, colorClass(options.color, false, "lighten-4"));
    }
    return el;
};
var preloader = function (options) {
    var op = options;
    var el = elem.byId("preloader");
    if (!el) return;
    if (op.on) {
        elem.removeClass(el, "display-none");
    } else {
        elem.appendClass(el, "display-none");
    }
};
var image = function (options) {
    var attr = {};
    if (options.url) {
        attr.src = options.url;
    }
    var el = elem.m("img", attr);
    var style = el.style;
    if (options.width) {
        style.width = options.width;
    }
    if (options.height) {
        style.height = options.height;
    }
    if (options.minWidth) {
        style.minWidth = options.minWidth;
    }
    if (options.minHeight) {
        style.minHeight = options.minHeight;
    }
    if (options.maxWidth) {
        style.maxWidth = options.maxWidth;
    }
    if (options.maxHeight) {
        style.maxHeight = options.maxHeight;
    }
    if (options.block) {
        style.display = "block";
    }
    return el;
};
var carousel = function (options) {
    var op = options;
    var el = elem.m("div", {
        class: "carousel"
    });
    if (op.fullWidth) {
        elem.appendClass(el, "carousel-slider");
    }
    if (op.height) {
        el.style.height = height;
    }
    return el;
};
var carouselItem = function (options) {
    var op = options;
    var imgEl = elem.m("img");
    var aEl = elem.m("a", {
        class: "carousel-item"
    }, imgEl);
    if (op.url) {
        aEl.href = op.url;
    }
    imgEl.addEventListener("load", function () {
        op.count();
    });
    imgEl.src = op.img;

    return aEl;
};
var divider = function (options) {
    var el = elem.m("div", { class: "divider" });
    var style = el.style;
    if (options.marginTop) {
        style.marginTop = options.marginTop;
    }
    if (options.marginBottom) {
        style.marginBottom = options.marginBottom;
    }
    return el;
};
var text = function (options) {
    var cc = colorClassOptions(options);
    var el = elem.m("p");
    elem.appendClass(el, cc);
    if (options.flowText) {
        elem.appendClass(el, "flow-text");
    }
    if (options.fontSize) {
        el.style.fontSize = options.fontSize;
    }
    if (options.value) {
        elem.appendText(el, options.value);
    }
    return el;
};
var buttonElement = function (options) {
    var props = {
        class: options.disabled ? "disabled" : ""
    };
    if (options.url) {
        props.href = options.url;
    }
    if (options.download) {
        props.download = options.download;
    }
    if (options.newTab) {
        props.target = "_blank";
    }
    var buttonEl = elem.m("a", props);
    if (options.icon) {
        elem.append(buttonEl, elem.m("i", {
            class: "material-icons left"
        }, options.icon));
    }
    var style = buttonEl.style;
    if (options.width) {
        style.width = options.width;
    }
    if (options.height) {
        style.height = options.height;
        style.lineHeight = options.height;
    }
    if (options.label) {
        elem.appendText(buttonEl, options.label);
    }
    if (options.active) {
        elem.appendClass(buttonEl, options.colorActive);
    }
    if (options.click) {
        buttonEl.onclick = function (e) {
            if (!elem.haveClass(buttonEl, "disabled")) {
                options.click();
            }
        };
    }
    return buttonEl;
}
var button = function (options) {
    var buttonEl = buttonElement(options);

    elem.appendClass(buttonEl, "waves-effect");
    if (options.flat) {
        elem.appendClass(buttonEl, "btn-flat");
    } else {
        elem.appendClass(buttonEl, "waves-light");
        elem.appendClass(buttonEl, "btn");
    }
    elem.appendClass(buttonEl, colorClassOptions(options));
    if (options.block) {
        return elem.m("div", {
            class: "btn-container"
        }, buttonEl);
    } else {
        return elem.m("span", {
            class: "btn-container"
        }, buttonEl);
    }
};
var action = function (options) {
    var op = options;
    op.flat = is.undefined(op.flat) ? true : op.flat;
    var el = buttonElement(options);
    elem.appendClass(el, "waves-effect");
    if (options.flat) {
        elem.appendClass(el, "btn-flat");
    } else {
        elem.appendClass(el, "waves-light");
        elem.appendClass(el, "btn");
    }
    elem.appendClass(el, colorClassOptions(options));
    if (op.label) {
        el.style.marginRight = "initial";
    } else {
        el.style.marginRight = "0px";
    }
    return el;
};
var toast = function (options) {
    var op = options;
    op.color = op.color || "";
    op.delay = op.delay || 5000;
    var toastEl = elem.m("div", {}, op.msg);
    toastEl.onclick = function (e) {
        elem.parent(toastEl).M_Toast.remove();
        if (op.click) {
            op.click(e);
        }
    };
    Materialize.toast(toastEl, op.delay, ("chat-toast markdown " + op.color).trim());
};
var tab = function (options) {
    var op = options;
    var cc = colorClassOptions(op);
    var el = elem.m("span", {
        class: "card-tab clickable " + cc,
    }, elem.m("a", {
        class: "btn-flat"
    }, op.label));
    el.onclick = op.click;
    return el;
};
var navTab = function (options) {
    var op = options;
    var cc = colorClassOptions(op);

    var buttonEl = elem.m("a", {
        class: "btn-flat nav-tab " + cc
    });

    if (op.disabled) {
        elem.appendClass(buttonEl, "disabled");
    }
    if (op.url) {
        buttonEl.href = op.url;
    }
    if (op.icon) {
        elem.append(buttonEl, elem.m("i", {
            class: "material-icons left"
        }, op.icon));
    }
    if (op.width) {
        buttonEl.style.width = op.width;
    }
    if (op.active) {
        elem.appendClass(buttonEl, "nav-tab-active");
    }
    elem.appendText(buttonEl, op.label);

    return elem.m("span", {}, buttonEl);
};
var dropdown = function (options) {
    var op = options;
    op.height = op.height || (is.undefined(op.label) ? "50px" : false);
    var buttonEl = button(options);
    elem.appendClass(buttonA(buttonEl), "dropdown-button");
    buttonA(buttonEl).setAttribute("data-activates", op.id);
    return buttonEl;
};
var navDropdown = function (options) {
    var op = options;
    var el = elem.m("ul", {
        id: op.id,
        class: "dropdown-content"
    });
    elem.append(elem.byId("main"), el);
    return el;
};
var navDropdownButton = function (options) {
    var buttonEl = buttonElement(options);
    elem.appendClass(buttonEl, "dropdown-button");
    buttonEl.setAttribute("data-activates", options.id);
    return buttonEl;
};
var sideNavSection = function (options) {
    var op = options;
    var sections = op.getSections();
    if (sections) {
        sections[op.key] = op.label;
    } else {
        var s = {};
        s[op.key] = op.label;
        op.setSections(s);
    }
    return null;
};


var featureDiscoveryTargetEl = null;

var featureDiscovery = function (options) {
    var op = options;
    if (!op.target) featureDiscoveryTargetEl = null;
    if (op.target && !elem.equal(op.target, featureDiscoveryTargetEl)) {
        featureDiscoveryTargetEl = op.target;
        var buttonEl = op.target.tagName === "A" ? op.target : buttonA(op.target);
        var id = buttonEl.id || uuid();
        var targetEl = elem.m("div", {
            class: "tap-target"
        });
        var contentEl = elem.m("div", {
            class: "tap-target-content"
        });
        var bodyEl = elem.byId("body");
        if (elem.byClassName(document, "tap-target")[0]) {
            elem.byClassName(document, "tap-target")
                .forEach(elem.delete);
            elem.byClassName(document, "tap-target-wrapper")
                .forEach(elem.delete);
        }
        buttonEl.id = id;
        targetEl.dataset.activates = id;
        elem.clear(contentEl);
        if (op.title) {
            elem.append(contentEl, elem.m("h5", {}, op.title));
        }
        elem.appendText(contentEl, op.content);
        elem.append(targetEl, contentEl);
        elem.append(bodyEl, targetEl);
        setTimeout(function () {
            featureDiscoveryOpen();
        }, 100);
    }
    return null;
};
var select = function (options) {
    var op = options;
    op.block = is.undefined(op.block) ? true : op.block;
    var el = elem.m("div", {
        class: "input-field"
    });
    var attr = {};
    if (!op.block) {
        elem.appendClass(el, "inline");
    }
    if (op.disabled) {
        attr.disabled = "disabled";
    }
    var selectEl = elem.m("select", attr);
    elem.append(el, selectEl);
    elem.append(el, elem.m("label", {}, op.label || ""));
    if (op.change) {
        selectEl.onchange = function (e) {
            op.change(e);
        };
    }
    var style = el.style;
    if (op.width) {
        style.width = op.width;
    }
    return el;
};
var collapsible = function (options) {
    return elem.m("ul", { class: "collapsible" });
};
var list = function (options) {
    return elem.m("ul", { class: "collection" });
};
var links = function (options) {
    return elem.m("div", { class: "collection" });
};
var table = function (options) {
    var op = options;
    var tableEl = elem.m("table");
    var headEl = elem.m("thead");
    var bodyEl = elem.m("tbody");
    if (op.bordered) {
        elem.appendClass(tableEl, "bordered");
    }
    if (op.highlight) {
        elem.appendClass(tableEl, "highlight");
    }
    if (op.responsive) {
        elem.appendClass(tableEl, "responsive-table");
    }
    if (op.centered) {
        elem.appendClass(tableEl, "centered");
    }
    if (op.striped) {
        elem.appendClass(tableEl, "striped");
    }
    if (op.header) {
        makeTableHeader(op, headEl);
    }
    elem.append(tableEl, headEl);
    elem.append(tableEl, bodyEl);
    return tableEl;
};
var toc = function (options) {
    var op = options;
    var container = elem.m("div", {
        class: "toc-wrapper"
    });
    if (op.hideOnMobile) {
        elem.append(container, "hide-on-med-and-down");
    }
    var listEl = elem.m("ul", {
        class: "section table-of-contents"
    });
    elem.append(container, listEl);
    return container;
};
var radiogroup = function (options) {
    var op = options;
    var el = elem.m("div")
    if (op.select) {
        el.onclick = function (e) {
            op.select(e);
        }
    }
    return el;
};
var icon = function (options) {
    return elem.m("i", {
        class: "material-icons " + (options.class || "")
    }, icon);
};
var checkbox = function (options) {
    var id = uuid();
    var attr = {
        type: "checkbox",
        id: id
    };
    if (options.fillIn) {
        attr.class = "filled-in";
    }
    if (options.group) {
        attr.name = options.group;
    }
    var container = options.block ? elem.m("div") : elem.m("span");
    var inputEl = elem.m("input", attr);
    elem.append(container, inputEl);
    elem.append(container, elem.m("label", {
        for: id
    }, options.label));
    inputEl.disabled = options.disabled;
    inputEl.checked = options.checked;
    if (options.select) {
        container.onclick = function (e) {
            if (!inputEl.disabled) {
                options.select(e);
            }
        };
    }
    return container;
};
var field = function(options) {
    options.block = is.undefined(options.block) ? true : options.block;
    var id = uuid();
    var cc = colorClassOptions(options);
    var attr = {
        type: options.type,
        value: options.value,
        id: id,
        class: (options.dataSuccess ? "validate " : "") +
            (options.value ? "active " : "") +
            (options.colorText ? "text-field": "") +
            (options.borderless ? "text-field-borderless" : "")
    };
    if (options.disabled) {
        attr.disabled = "disabled";
    }
    if (options.placeholder) {
        attr.placeholder = options.placeholder;
    }
    var labelEl = elem.m("label", {
        class: cc,
        for: id
    }, options.label || "");
    if (options.dataSuccess) {
        labelEl.setAttribute("data-success", options.dataSuccess);
    }
    if (options.dataError) {
        labelEl.setAttribute("data-error", options.dataError);
    }
    var inputEl = elem.m("input", attr);
    if (options.width) {
        inputEl.style.width = options.width;
    }
    var container = elem.m("div", {
        class: "input-field " + (options.block ? "" : "inline")
    });
    if (options.icon) {
        elem.append(container, elem.m("i", {
            class: "material-icons prefix"
        }, options.icon))
    }
    elem.append(container, inputEl);
    elem.append(container, labelEl);

    if (options.keypress) {
        inputEl.onkeypress = function (e) { options.keypress(e); };
    }
    if (options.keyup) {
        inputEl.onkeyup = function (e) { options.keyup(e); };
    }
    if (options.keydown) {
        inputEl.onkeydown = function (e) { options.keydown(e); };
    }

    return container;
};
var textArea = function (options) {
    options.value = is.undefined(options.value) ? "" : options.value;
    var cc = colorClass(false, options.colorText, false, options.colorTextShade);
    var container = elem.m("div", { class: "input-field" });
    if (options.icon) {
        elem.append(container, elem.m("i", {
            class: "material-icons prefix"
        }, options.icon));
    }
    var id = uuid();
    var textAreaEl = elem.m("textarea", {
        class: "materialize-textarea",
        id: id
    }, options.value);
    if (options.disabled) {
        textAreaEl.disabled = options.disabled;
    }
    var labelEl = elem.m("label", {
        for: id,
        class: cc
    }, options.label);
    elem.append(container, textAreaEl);
    elem.append(container, labelEl);
    if (options.keyup) {
        textAreaEl.onkeyup = function (e) {
            options.keyup(e);
        };
    }
    if (options.keydown) {
        textAreaEl.onkeydown = function (e) {
            options.keydown(e);
        };
    }
    if (options.keypress) {
        textAreaEl.onkeypress = function (e) {
            options.keypress(e);
        };
    }
    return container;
};
var editor = function (options) {
    return elem.m("div", {
        class: "ace-editor"
    });
};
const mdRenderer = new Remarkable({
    html: false,
    xhtmlOut: false,
    breaks: false,
    langPrefix: "language-",
    linkify: true,
    linkTarget: "",
    typographer: false,
    quotes: "“”‘’",
    highlight: function (str, lang) {
        var rtn = "";
        if (lang && lang === "text") {
            rtn = str;
        } else if (lang && hljs.getLanguage(lang)) {
            try {
                rtn = hljs.highlight(lang, str).value;
            } catch (e) {
                rtn = "";
            }
        } else {
            try {
                rtn = hljs.highlightAuto(str).value;
            } catch (e) {
                rtn = "";
            }
        }
        return rtn;
    }
});
var markdownHighlight = function (el) {
    el = el || document;
    elem.byTagName(el, "code")
        .forEach(function (c) {
            if (!elem.haveClass(c, "hljs")) {
                elem.appendClass(c, "hljs");
            }
        });
};
var markdown = function (options) {
    var op = options;
    var html = mdRenderer.render(op.value);
    var cc = colorClassOptions(op);
    var el = elem.m("div", {
        class: "markdown " + cc
    });
    el.innerHTML = html;
    if (op.flowText) {
        elem.appendClass(el, "flow-text");
    }
    if (op.fontSize) {
        el.style.fontSize = op.fontSize;
    }
    if (op.section) {
        el.id = op.section;
        elem.appendClass(el, "section");
        elem.appendClass(el, "scrollspy");
    }
    if (op.url) {
        http.get(op.url)
            .then(function (md) {
                markdownRender(el, md || "");
            });
    }
    return el;
};
var code = function (options) {
    var op = options;
    var html = mdRenderer.render(codeMd(op.type, op.value));
    var cc = colorClassOptions(op);
    var el = elem.m("div", {
        class: "markdown " + cc
    });
    el.innerHTML = html;
    if (op.flowText) {
        elem.appendClass(el, "flow-text");
    }
    if (op.fontSize) {
        el.style.fontSize = op.fontSize;
    }
    if (op.section) {
        el.id = op.section;
        elem.appendClass(el, "section");
        elem.appendClass(el, "scrollSpy");
    }
    if (op.url) {
        http.get(op.url)
            .then(function (md) {
                markdownRender(el, codeMd(op.type, md || ""));
            });
    }
    return el;
};
var fileInput = function (options) {
    var op = options;
    op.label = op.label || "";
    op.placeholder = op.placeholder || "";
    var cc = colorClassOptions(op);
    var inputEl = elem.m("input", {
        type: "file"
    });
    var buttonEl = elem.m("div", {
        class: "file-input-button waves-effect waves-light btn " + cc
    }, elem.m("span", {}, op.label), inputEl);

    if (op.disabled) {
        elem.appendClass(buttonEl, "disabled");
    }
    if (op.multiple) {
        inputEl.multiple = true;
    }
    return elem.m("form", {
        action: "#"
    }, elem.m("div", {
        class: "file-field input-field"
    }, buttonEl, elem.m("div", {
        class: "file-path-wrapper"
    }, elem.m("input", {
        class: "file-path validate",
        type: "text",
        placeholder: op.placeholder
    }))));
};
var toggle = function (options) {
    var op = options;
    var attr = {
        type: "checkbox"
    };

    if (op.checked) {
        attr.checked = "checked";
    }
    if (op.disabled) {
        attr.disabled = "disabled";
    }
    var inputEl = elem.m("input", attr);
    var toggleEl = elem.m("label", {
        class: "toggle-label"
    });
    var container = elem.m("div", {
        class: "switch switch-container"
    });
    if (!op.left) {
        elem.appendClass(toggleEl, "right");
    }
    if (op.off) {
        elem.appendText(toggleEl, op.off);
    }
    elem.append(toggleEl, inputEl);
    elem.append(toggleEl, elem.m("span", {
        class: "lever"
    }));
    if (op.on) {
        elem.appendText(toggleEl, op.on);
    }
    if (op.label) {
        elem.append(container, elem.m("div", {
            class: "left"
        }, op.label));
    }
    var style = container.style;
    if (op.width) {
        style.width = op.width;
    }
    if (op.height) {
        style.height = op.height;
        style.lineHeight = op.height;
    }
    elem.append(container, toggleEl);
    if (op.toggle) {
        container.onclick = function () {
            var inputEl = toggleInput(container);
            var checked = inputEl.checked;
            op.toggle(checked);
        };
    }
    return container;
};
var navItem = function (options) {
    return buttonElement(options);
};
var sideNavItem = function (options) {
    var op = options;

    var attr = {
        class: "waves-effect"
    };
    if (op.url) {
        attr.href = op.url;
    }
    var el = elem.m("a", attr, op.label || "");
    if (op.icon) {
        elem.append(el, elem.m("i", {
            class: "material-icons"
        }, op.icon));
    }
    var container = elem.m("li", {
        class: op.active ? "active" : ""
    });

    if (op.secondary) {
        op.secondary.reverse().forEach(function (sec) {
            elem.append(el, listItemSecondary(sec));
        });
    }
    elem.append(container, el);
    if (op.select) {
        container.onclick = function (e) {
            elem.byClassName(elem.parent(container), "active")
                .forEach(function (c) {
                    elem.removeClass(c, "active");
                });
            elem.appendClass(container, "active");
            op.select(e);
        };
    }
    return container;
};
var tocItem = function (options) {
    var op = options;
    var el = elem.m("li", {}, elem.m("a", {
        class: op.active ? "active" : "",
        href: "#" + op.key
    }, op.label));
    if (op.select) {
        el.onclick = function (e) {
            op.select(e);
        };
    }
    return el;
};
var listItem = function (options, child) {
    var el = elem.m("li", {
        "class": "collection-item sortable-draggable " + colorClassOptions(options)
    });
    if (child) {
        elem.append(el, child);
    }
    if (options.secondary) {
        options.secondary.reverse().forEach(function (op) {
            elem.append(el, listItemSecondary(op));
        });
    }
    if (options.label) {
        if (options.icon) {
            elem.append(el, elem.m("span", elem.m("i", { class: "material-icons left" }, options.icon), options.label));
        } else {
            elem.append(el, elem.m("span", {}, options.label));
        }
    }
    if (options.title) {
        elem.append(el, elem.m("span", { class: "title" }, options.title));
    }
    if (options.content) {
        elem.append(el, elem.m("p", {}, options.content));
    }
    return el;
};
var linkItem = function (options) {
    var attr = {
        class: "collection-item sortable-draggable"
    };
    if (options.url) {
        attr.href = options.url;
    }
    if (options.download) {
        attr.download = options.download;
    }
    if (options.newTab) {
        attr.target = "_blank";
    }
    var linkEl = elem.m("a", attr);
    if (options.icon) {
        elem.append(linkEl, elem.m("i", {
            class: "material-icons left"
        }, options.icon));
    }
    if (options.label) {
        elem.appendText(linkEl, options.label);
    }
    return linkEl;
};
var tableRow = function (options) {
    var op = options;
    var rowEl = elem.m("tr");
    op.titles.forEach(function (t) {
        var dataEl = elem.m("td", {}, elem.m("div", {}, t));
        if (op.select) {
            elem.appendClass(dataEl, "clickable");
        }
        elem.append(rowEl, dataEl);
    });
    op.secondary.forEach(function (s) {
        var dataEl = elem.m("td");
        if (s.icon) {
            var iconEl = elem.m("i", {
                class: "material-icons clickable hover-highlight"
            }, s.icon);
            elem.append(dataEl, iconEl);
            if (s.click) {
                iconEl.onclick = function (e) {
                    s.click(e);
                    e.stopPropagation();
                };
            }
            elem.append(rowEl, dataEl);
        }
    });
    if (op.select) {
        rowEl.onclick = function (e) {
            op.select(e);
        };
    }
    return rowEl;
};
var avatarItem = function (options) {
    var op = options;
    var el = elem.m("li", {
        class: "collection-item avatar sortable-draggable"
    });
    if (op.secondary) {
        op.secondary.reverse().forEach(function (op) {
            elem.append(el, listItemSecondary(op));
        });
    }
    if (op.icon) {
        elem.append(el, elem.m("i", {
            class: "material-icons circle"
        }, op.icon));
    }
    if (op.img) {
        elem.append(el, elem.m("img", {
            class: "circle",
            src: op.img
        }));
    }
    if (op.title) {
        elem.append(el, elem.m("span", {
            class: "title"
        }, op.title));
    }
    if (op.content) {
        elem.append(el, elem.m("p", {}, op.content));
    }
    return el;
};
var radioItem = function (options) {
    var op = options;
    var id = uuid();
    var cc = colorClassOptions(options);
    var attr = {
        type: "radio",
        value: op.value || "",
        id: id,
        name: op.group,
        class: "validate " + (op.value ? "active " : "") + cc
    };
    if (op.disabled) {
        attr.disabled = "disabled";
    }
    return elem.m("p", {
        class: "radio-container"
    }, elem.m("input", attr), elem.m("label", {
        class: cc,
        for: id
    }, op.label || ""));
};
var selectOption = function (options) {
    var op = options;
    var attr = {
        value: op.value
    };
    if (op.disabled) {
        attr.disabled = "disabled";
    }
    return elem.m("option", attr, op.label);
};
var listItemSecondary = function (options) {
    var iconEl = elem.m("i", {
        class: "material-icons hover-highlight " + (options.dragAndDropHandle ? "sortable-handle" : "clickable")
    }, options.icon);
    if (options.click) {
        iconEl.onclick = function (e) {
            options.click(e);
            e.stopPropagation();
        };
    }
    return elem.m("span", {
        class: "secondary-content"
    }, iconEl);
};
var dropdownItem = function (options) {
    var op = options;
    var aEl = elem.m("a", {});
    var container = elem.m("li", {});

    if (op.icon) {
        elem.append(aEl, elem.m("i", {
            class: "material-icons"
        }, op.icon));
    }
    if (op.url) {
        aEl.href = op.url;
    }
    elem.appendText(aEl, op.label);
    elem.append(container, aEl);
    if (op.select) {
        aEl.onclick = function (e) {
            op.select(e);
        }
    }
    return container;
};
var collapsibleItem = function (options) {
    var op = options;
    var el = elem.m("li", {
        class: "sortable-draggable"
    });
    var headerEl = elem.m("div", {
        class: "collapsible-header"
    }, op.label);
    var bodyEl = elem.m("div", {
        class: "collapsible-body"
    });
    if (op.active) {
        elem.appendClass(headerEl, "active");
    }
    elem.append(el, headerEl);
    elem.append(el, bodyEl);
    if (op.secondary) {
        op.secondary.reverse().forEach(function (sec) {
            elem.append(headerEl, listItemSecondary(sec));
        });
    }
    $(headerEl).click(function (e) {
        collapsibleStore(op.parent);
        elem.append(bodyEl, elem.byId(op.parent.key));
        if (op.select) {
            op.select(e);
        }
    });
    return el;
};
var footerItem = function (options) {
    var op = options;
    op.url = is.undefined(op.url) ? "#" : op.url;
    return elem.m("li", {}, elem.m("a", {
        href: op.url
    }, op.label));
};
var footer = function (options) {
    var op = options;
    var dom = op.dom;
    var bodyEl = elem.byTagName(document, "body")[0];
    var footerEl = elem.m("footer", { class: "page-footer" });
    var titleEl = elem.m("h5", { class: "footer-title" });
    var leftEl = elem.m("div", { class: "col l6 s12" });
    var rightEl = elem.m("div", { class: "col l4 offset-l2 s12" });

    if (op.className) {
        elem.appendClass(footerEl, op.className);
    }
    if (op.title) {
        elem.appendText(titleEl, op.title);
    }
    if (dom.components.length > 0) {
        var contentEl = elem.m("div");
        dom.components.forEach(function (c) {
            elem.append(contentEl, c);
        });
        elem.append(leftEl, contentEl);
    }
    if (dom.links.length > 0) {
        var linksEl = elem.m("ul");
        dom.links.forEach(function (c) {
            elem.append(linksEl, c);
        });
        elem.append(rightEl, linksEl);
    }
    elem.append(footerEl, elem.m("div", {
        class: "container"
    }, elem.m("div", { class: "row" }, leftEl, rightEl)));

    if (op.copyright) {
        elem.append(footerEl, elem.m("div", {
            class: "footer-copyright"
        }, elem.m("div", {
            class: "container"
        }, op.copyright)));
    }

    elem.append(bodyEl, footerEl);

    return footerEl;
};
var navbar = function (options) {
    var op = options;
    var dom  = options.dom;
    var cc = colorClassOptions(options);

    var container = elem.byId("navbar");
    var navEl = elem.m("nav", {
        class: cc
    });
    var wrapEl = elem.m("div", {
        class: "nav-wrapper"
    });
    var titleEl = elem.m("a", {
        href: op.titleUrl || "/",
        class: "brand-logo logo"
    });
    var sideNavButtonEl = elem.m("a", {
        id: "side-nav-button",
        class: "display-none button-collapse clickable"
    }, elem.m("i", {
        class: "material-icons"
    }, "menu"));
    var navMobileEl = elem.m("ul", {
        id: "nav-mobile",
        class: "right hide-on-med-and-down"
    });
    var navContentEl = elem.m("div", {
        class: "nav-content"
    });

    if (is.undefined(container)) {
        var el = elem.m("div", { id: "navbar" });
        elem.append(elem.byId("header"), el);
        container = el;
    }
    if (op.fixed) {
        elem.appendClass(container, "navbar-fixed");
    } else {
        elem.removeClass(container, "navbar-fixed");
    }
    if (op.titleHide) {
        elem.appendClass(titleEl, op.titleHide);
    }
    if (op.title) {
        elem.appendText(titleEl, op.title);
        elem.append(wrapEl, titleEl);
    }
    if (op.className) {
        elem.appendClass(navEl, op.className);
    }
    if (dom.items && dom.items.length > 0) {
        var itemsEl = elem.m("ul", { class: "right" });
        dom.items.forEach(function (c) {
            elem.append(itemsEl, elem.m("li", {}, c));
        });
        elem.append(wrapEl, itemsEl);
    }
    if (elem.byId("side-nav-button")) {
        elem.delete(elem.byId("side-nav-button"));
    }
    if (op.sideNavHide) {
        elem.appendClass(sideNavButtonEl, op.sideNavHide);
    } else {
        elem.appendClass(sideNavButtonEl, "hide-on-large-only");
    }
    sideNavButtonEl.setAttribute("data-activates", "side-nav-list");
    elem.append(wrapEl, sideNavButtonEl);
    elem.append(wrapEl, navMobileEl);
    elem.append(navEl, wrapEl);
    if (dom.components.length > 0) {
        var componentsEl = elem.m("div");
        dom.components.forEach(function (c) {
            elem.append(componentsEl, c);
        });
        elem.append(navContentEl, componentsEl);
    }
    if (dom.tabs.length > 0) {
        var tabsEl = elem.m("div");
        dom.tabs.forEach(function (c) {
            elem.append(tabsEl, c);
        });
        elem.appendClass(navEl, "nav-extended");
        elem.append(navContentEl, tabsEl);
    }
    elem.append(navEl, navContentEl);
    elem.append(container, navEl);

    $(".button-collapse").sideNav();
    if (elem.byClassName(document, "side-nav")[0]) {
        elem.removeClass(elem.byId("side-nav-button"), "display-none");
    }
    return container;
};
var sidenav = function (options) {
    var op = options;
    var dom = options.dom;
    var cc = colorClassOptions(options);

    var container = elem.byId("side-nav");
    var bodyEl = elem.byId("body");
    var sideNavEl = elem.m("ul", {
        class: "side-nav fixed touch-scroll " + cc,
        id: "side-nav-list"
    });
    if (op.className) {
        elem.appendClass(sideNavEl, op.className);
    }
    if (op.title) {
        elem.append(sideNavEl, elem.m("h5", {
            class: "center-align side-nav-title clickable"
        }, elem.m("a", {
            href: op.titleUrl || "/"
        }, op.title)));
    }
    if (dom.components.length > 0) {
        dom.components.forEach(function (c) {
            elem.append(sideNavEl, elem.m("li", {}, c));
        });
    }
    elem.append(container, sideNavEl);
    if (op.sections) {
        var accordianEl = elem.m("ul", {
            class: "collapsible collapsible-accordian"
        });
        elem.append(sideNavEl, elem.m("li", {
            class: "no-padding"
        }, accordianEl));
        objForEachKey(op.sections, function (k) {
            var label = op.sections[k];
            var collapsedBody = elem.m("div", {
                class: "collapsible-body"
            });
            (dom[k] || []).forEach(function (c) {
                elem.append(collapsedBody, c);
            });
            elem.append(accordianEl, elem.m("li", {
                id: k
            }, elem.m("a", {
                class: "collapsible-header"
            }, label), collapsedBody));
        });
        $(accordianEl).collapsible();
    }
    sideNavShiftBody();
    return sideNavEl;
};
var modal = function (options) {
    var op = options;
    var dom = options.dom;
    var cc = colorClassOptions(options);
    var container = elem.byId(options.fixedFooter ? "modal-fixed-footer" : "modal");
    var componentsEl = elem.m("div", { class: "modal-content " + cc });
    if (op.className) {
        elem.appendClass(componentsEl, op.className);
    }
    dom.components.forEach(function (c) { elem.append(componentsEl, c); });
    makeToolbar(op, container);
    if (op.title) {
        elem.prepend(componentsEl, elem.m("h4", { class: "modal-title" }, op.title));
    }
    if (elem.children(componentsEl).length > 0) {
        elem.append(container, componentsEl);
    }
    makeTabs(op, container);
    makePostTabs(op, container, "modal-content");
    makeActions(op, container, "modal-footer " + cc);
    makeCollapsibles(op);
    return container;
};
var banner = function (options) {
    var op = options;
    var dom = options.dom;

    var componentsEl = elem.m("div", { class: "container" });
    var bannerEl = elem.m("div");

    if (op.dom.components.length > 0) {
        op.dom.components.forEach(function (c) {
            elem.append(componentsEl, c);
        });
    }
    if (op.centerAlign) {
        elem.appendClass(bannerEl, "center-align");
    }
    elem.append(bannerEl, componentsEl);
    if (op.title) {
        elem.prepend(componentsEl, elem.m("h2", {
            class: "banner-title"
        }, op.title));
    }
    var style = componentsEl.style;
    if (op.height) {
        style.height = op.height;
    }
    if (op.minHeight) {
        style.minHeight = op.minHeight;
    }
    if (op.maxHeight) {
        style.maxHeight = op.maxHeight;
    }
    if (op.paddingTop) {
        style.paddingTop = op.paddingTop;
    } else {
        style.paddingTop = "1px";
    }
    if (op.paddingBottom) {
        style.paddingBottom = op.paddingBottom;
    } else {
        style.paddingBottom = "1px";
    }
    var cc = colorClassOptions(op);
    var el = elem.m("div", {
        class: "col s12 banner " + cc
    }, bannerEl);
    if (op.className) {
        elem.appendClass(el, op.className);
    }
    var container = elem.byId("banner");
    elem.append(container, el);
    if (op.fixed) {
        elem.appendClass(container, "banner-fixed")
    } else {
        elem.removeClass(container, "banner-fixed");
    }
    return el;
};
var card = function (options) {
    var op = options;
    var dom = op.dom;

    op.size = op.size || 12;

    var componentsEl = elem.m("div", { class: "card-content" });
    dom.components.forEach(function (c) { elem.append(componentsEl, c); });

    var haveReveal = dom.reveal.length > 0;

    var cc = colorClassOptions(op);
    var cardEl = elem.m("div", { class: "card " + cc });
    if (op.flat) {
        elem.appendClass(cardEl, "card-flat");
    }
    if (op.centerAlign) {
        elem.appendClass(cardEl, "center-align");
    }
    if (op.className) {
        elem.appendClass(cardEl, op.className);
    }
    var el = makeCardWrapper(op);
    if (op.title && haveReveal) {
        elem.prepend(componentsEl, elem.m("span", {
            class: "card-title activator"
        }, op.title, elem.m("i", { class: "material-icons right" }, "more_vert")));
    }
    if (op.title && !haveReveal) {
        elem.prepend(componentsEl, elem.m("span", {
            class: "card-title"
        }, op.title));
    }
    if (!op.title) {
        elem.prepend(componentsEl, elem.m("span", {
            class: "card-title"
        }));
    }
    if (op.img) {
        var imgDiv = elem.m("div", { class: "card-image" });
        if (haveReveal) {
            elem.appendClass(imgDiv, "waves-effect waves-block waves-light");
        }
        elem.append(imgDiv, elem.m("img", {
            src: op.img,
            class: haveReveal ? "activator" : ""
        }));
        if (op.imgTitle) {
            var cc = colorClass(false, op.imgTitleColor);
            elem.append(imgDiv, elem.m("span", {
                class: "card-title " + cc
            }, op.imgTitle));
        }
        elem.append(cardEl, imgDiv);
    }

    makeToolbar(op, cardEl);

    elem.append(cardEl, componentsEl);

    makeTabs(op, cardEl);
    makePostTabs(op, cardEl);
    makeActions(op, cardEl);
    makeReveal(op, cardEl, cc);
    makeCollapsibles(op);

    var style = cardEl.style;
    var wrapperStyle = el.style;
    if (op.height) {
        style.height = op.height;
    }
    if (op.overflow) {
        style.overflow = op.overflow;
    }
    if (op.minHeight) {
        style.minHeight = op.minHeight;
    }
    if (op.maxHeight) {
        style.maxHeight = op.maxHeight;
    }
    if (op.paddingTop) {
        style.paddingTop = op.paddingTop;
    }
    if (op.paddingBottom) {
        style.paddingBottom = op.paddingBottom;
    }
    if (op.left) {
        wrapperStyle.left = op.left;
    }
    if (op.right) {
        wrapperStyle.right = op.right;
    }
    if (op.top) {
        wrapperStyle.top = op.top;
    }
    if (op.bottom) {
        wrapperStyle.bottom = op.bottom;
    }
    if (op.zIndex) {
        wrapperStyle.zIndex = op.zIndex;
    }

    elem.append(el, cardEl);

    var row;
    var container = getContainer(op);
    var rows = elem.children(container);
    if (rows.length === 0) {
        row = makeNewRow(container);
    } else {
        var lastRow = rows[rows.length - 1];
        var totalSize = rowSize(lastRow) + colSize(el);
        row = (totalSize > 12) ? makeNewRow(container) : lastRow;
    }
    elem.append(row, el);

    setTimeout(function () {
        if (op.animation) {
            elem.removeClass(el, "animation");
            elem.removeClass(el, op.animation);
        }
    }, 2000);
    return el;
};
var getContainer = function (options) {
    var containerId = options.container || "__page1__";
    var container = elem.byId(containerId);
    if (!container) {
        if (containerId == "__page1__") {
            container = elem.m("div", {
                id: containerId,
                class: "page animated"
            });
        } else {
            container = elem.m("div", {
                 id: containerId,
                 class: "page animated display-none"
             });
        }
        elem.append(elem.byId("main-content"), container);
    }
    return container;
};
var makeCardWrapper = function (options) {
    var c = elem.m("div");
    elem.appendClass(c, "col");
    if (options.size) {
        elem.appendClass(c, "l" + options.size);
    }
    if (options.sizeMediumScreen) {
        elem.appendClass(c, "m" + options.sizeMediumScreen);
    } else {
        elem.appendClass(c, "m12");
    }
    if (options.sizeSmallScreen) {
        elem.appendClass(c, "s" + options.sizeSmallScreen);
    } else {
        elem.appendClass(c, "s12");
    }
    if (options.offset) {
        elem.appendClass(c, "offset-l" + options.offset);
    }
    if (options.offsetMediumScreen) {
        elem.appendClass(c, "offset-m" + options.offsetMediumScreen);
    } else {
        elem.appendClass(c, "offset-m0");
    }
    if (options.offsetSmallScreen) {
        elem.appendClass(c, "offset-m" + options.offsetSmallScreen);
    } else {
        elem.appendClass(c, "offset-s0");
    }
    if (options.pinned) {
        elem.appendClass(c, "pinned");
    }
    if (options.animation) {
        elem.appendClass(c, "animated");
        elem.appendClass(c, options.animation);
    }
    if (options.className) {
        elem.appendClass(c, options.className + "-container");
    }
    return c;
};
var makeNewRow = function (container) {
    var r = elem.m("div", { class: "row" });
    elem.append(container, r);
    return r;
};
var makeToolbar = function (options, el) {
    var dom = options.dom;
    var toolbarEl = elem.m("div", { class: "display-inline-block width-100pct" });
    var toolbarLeftEl;
    if (dom["left-tool-bar"].length > 0) {
        toolbarLeftEl = elem.m("div", { class: "card-toolbar left"});
        dom["left-tool-bar"].forEach(function (c) { elem.append(toolbarLeftEl, c); });
    }
    var toolbarRightEl;
    if (dom["right-tool-bar"].length > 0) {
        toolbarRightEl = elem.m("div", { class: "card-toolbar right right-align" });
        dom["right-tool-bar"].forEach(function (c) { elem.append(toolbarRightEl, c); });
    }
    if (toolbarLeftEl) {
        elem.append(toolbarEl, toolbarLeftEl);
    }
    if (toolbarRightEl) {
        elem.append(toolbarEl, toolbarRightEl);
    }
    if (toolbarLeftEl || toolbarRightEl) {
        elem.append(el, toolbarEl);
    }
};
var makeActions = function (options, el, className) {
    var dom = options.dom;
    var actionsEl;
    if (dom.actions.length > 0) {
        actionsEl = elem.m("div");
        dom.actions.forEach(function (c) { elem.append(actionsEl, c); });
    }
    if (actionsEl) {
        elem.appendClass(actionsEl, className || "card-action");
        elem.append(el, actionsEl);
    }
};
var makeReveal = function (options, el, cc) {
    var dom = options.dom;
    var revealEl;
    if (dom.reveal.length > 0) {
        revealEl = elem.m("div", {}, elem.m("span", {
            class: "card-title"
        }, options.title || "", elem.m("i", {
            class: "material-icons right"
        }, "close")));
        dom.reveal.forEach(function (c) { elem.append(revealEl, c); });
    }
    if (revealEl) {
        elem.appendClass(revealEl, "card-reveal " + cc);
        elem.append(el, revealEl);
    }
}
var makeTabs = function (options, el) {
    var dom = options.dom;
    var tabsEl;
    if (dom.tabs.length > 0) {
        tabsEl = elem.m("div", { class: "card-tabs" });
        dom.tabs.forEach(function (c) { elem.append(tabsEl, c); });
    }
    if (tabsEl) {
        elem.append(el, tabsEl);
    }
};
var makePostTabs = function (options, el, className) {
    var dom = options.dom;
    var postTabEl;
    if (options.postTabs) {
        postTabEl = elem.m("div", { class: "card-post-tab" });
        objForEachKey(options.postTabs, function (k) {
            var cEl = elem.m("div", {
                class: "post-tab display-none",
                name: k
            });
            var components = dom[k];
            if (components) {
                components.forEach(function (c) {
                    elem.append(cEl, c);
                });
            }
            elem.append(postTabEl, cEl);
        });
    }
    if (postTabEl) {
        elem.appendClass(postTabEl, className || "card-content");
        elem.append(el, postTabEl);
    }
};
var makeCollapsibles = function (options) {
    if (options.collapsibles) {
        var storageEl = elem.byId("collapsibles-bin");
        objForEachKey(options.collapsibles, function (k) {
            var components = options.dom[k];
            var collapsedEl = elem.m("div", { id: k });
            components.forEach(function (c) {
                elem.append(collapsedEl, c);
            });
            elem.append(storageEl, collapsedEl);
        });
    }
};
var makeTableHeader = function (options, el) {
    var rowEl = elem.m("tr");
    if (options.header) {
        options.header.forEach(function (label) {
            elem.append(rowEl, elem.m("th", {}, label));
        });
    }
    elem.append(el, rowEl);
};
var tooltipLoad = function(options, el) {
    if (options.tooltip) {
        elem.appendClass(el, "tooltipped");
        $(el).tooltip({
            delay: 50,
            tooltip: options.tooltip,
            position: options.tooltipPosition
        })
    }
};
var collapsibleItemLoad = function (options, el) {
    elem.byClassName(el, "collapsible-header")[0].click();
    setTimeout(function () {
        updateTextFields();
    }, 50);
};
var loaderLoad = function(options, el) {
    var isActive = is.undefined(options.active) ? true : options.active;
    if (!is.undefined(options.loading)) {
        elem.appendClass(el, "btn-loading");
        if (options.loading && isActive) {
            elem.appendClass(el, "loading");
        }
    }
};
var carouselLoad = function (options, el) {
    var op = options;
    $(el).carousel({
        duration: op.duration,
        dist: op.dist,
        shift: op.shift,
        padding: op.padding,
        fullWidth: op.fullWidth,
        indicators: op.indicators,
        noWrap: op.noWrap
    });
};
var editorLoad = function(options, el) {
    var op = options;
    op.minLines = is.undefined(op.minLines) ? 20 : op.minLines;
    op.maxLines = is.undefined(op.maxLines) ? Infinity : op.maxLines;
    var editor = ace.edit(el);
    if (op.theme) {
        editor.setTheme("ace/theme/" + op.theme);
    }
    if (op.handler) {
        editor.setKeyboardHandler("ace/keyboard/" + op.handler);
    }
    if (op.mode) {
        editor.getSession()
            .setMode("ace/mode/" + op.mode);
    }
    editor.setOptions({
        useSoftTabs: true,
        maxLines: op.maxLines,
        minLines: op.minLines
    });
    if (op.disabled) {
        editor.setReadOnly(true);
    }
    if (!op.blockScrolling) {
        editor["$blockScrolling"] = Infinity;
    }
    if (op.keyup) {
        el.onkeyup = function (e) {
            op.keyup(e);
        };
    }
    var setValue = function (value) {
        var currentPos = editor.selection.getCursor();
        editor.setValue(value);
        editor.clearSelection();
        editor.gotoLine(currentPos.row + 1, currentPos.column);
    };
    setValue(op.value || "");

    var instance = op.instance;
    instance.getValue = function () { return editor.getValue(); };
    instance.setValue = function (val) { setValue(val || ""); };
    instance.setTheme = function (theme) { editor.setTheme("ace/theme/" + theme); };
    instance.setDisable = function (disabled) { editor.setReadOnly(disabled); };
    instance.setMode = function (mode) {
        editor.getSession().setMode("ace/mode/" + mode);
    };
    instance.ace = editor;
};
var updateTextFields = function () {
    Materialize.updateTextFields();
};
var modalOpen = function (el) {
    $(el).modal("open");
};
var modalClose = function (el) {
    $(el).modal("close");
};
var featureDiscoveryOpen = function (options) {
    $(".tap-target").tapTarget("open");
};
var tabShow = function (options, tabEl) {
    var op = options;
    var children = elem.byClassName(op.parentEl, "post-tab");
    var foundEl = false;
    children.forEach(function (c) {
        if (c.name === op.key) {
            foundEl = c;
        }
        elem.appendClass(c, "display-none");
    });
    if (foundEl) {
        var currentTab = op.getCurrentTab();
        if (currentTab) {
            elem.removeClass(currentTab, "card-tab-active");
        }
        op.setCurrentTab(tabEl);
        elem.appendClass(tabEl, "card-tab-active");
        elem.removeClass(foundEl, "display-none");
    } else {
        throw "Tab key not found: " + op.key;
    }
};
var tocScrollTo = function (options) {
    var op = options;
    var offset = $("#" + op.name).offset().top;
    var pos = offset - 100 + "px";
    $("html, body").animate({
        scrollTop: pos
    }, "fast");
};
var sideNavSectionLoad = function (options) {
    var op = options;
    if (op.select) {
        var el = elem.byId(op.key)
        el.onclick = function (e) {
            op.select(e);
        };
    }
    if (op.active) {
        sideNavSectionActivate({
            key: op.key,
            active: op.active
        })
    }
};
var sideNavSectionActivate = function (options) {
    var op = options;
    var el = elem.byId(op.key);
    var headerEl = elem.byClassName(el, "collapsible-header")[0];
    if (op.active) {
        elem.appendClass(headerEl, "active");
    } else {
        elem.removeClass(elem.parent(headerEl), "active");
        elem.removeClass(headerEl, "active");
    }
    $(".collapsible").collapsible();
};
var markdownRender = function (el, md) {
    el.innerHTML = mdRenderer.render(md);
    markdownHighlight(el);
};
var setCarouselIndex = function (el, index) {
    $(el).carousel("set", index);
};
var collapsibleStore = function (options) {
    var el = elem.byId(options.key);
    elem.append(elem.byId("collapsibles-bin"), el);
};
var carouselDestroy = function (el) {
    $(el).carousel("destroy");
};
var modalLoad = function (options, el) {
    $(el).modal(options);
};
var modalInit = function () {
    $(".modal").modal();
};
var sideNavClose = function () {
    $(".button-collapse").sideNav("hide");
};
var sideNavCloseOnSmallScreen = function () {
    if (elem.haveClass(elem.byId("side-nav-button"), "display-none")) {
        sideNavClose();
    }
};
var sideNavShiftBody = function () {
    var bodyEl = elem.byId("body");
    elem.appendClass(bodyEl, "with-sidenav");
    var sideNavButtonEl = elem.byId("side-nav-button");
    if (sideNavButtonEl) {
        elem.removeClass(sideNavButtonEl, "display-none");
    }
};
var sideNavUnshiftBody = function () {
    var bodyEl = elem.byId("body");
    elem.removeClass(bodyEl, "with-sidenav");
    var sideNavButtonEl = elem.byId("side-nav-button");
    if (sideNavButtonEl) {
        elem.appendClass(sideNavButtonEl, "display-none");
    }
};
var listSelectIndex = function (el, index) {
    elem.byClassName(el, "active").forEach(function (activeEl) {
        elem.removeClass(activeEl, "active");
    });
    if (index > -1) {
        var selectedEl = elem.children(el)[index];
        elem.appendClass(selectedEl, "active");
    }
};
var sortableLoad = function(options, el) {
    if (options.dragAndDrop) {
        var handle = elem.byClassName(el, "sortable-handle")[0] ? ".sortable-handle" : undefined;
        var draggable = handle ? ".sortable-draggable" : undefined;
        return Sortable.create(el, {
            animation: 150,
            handle: handle,
            draggable: draggable,
            onUpdate: function(e) {
                var oldIndex = e.oldIndex;
                var newIndex = e.newIndex;
                var sort = options.reorder;
                if (sort) {
                    sort(oldIndex, newIndex);
                }
            }
        });
    } else {
        return undefined;
    }
};
var collapsibleLoad = function (options, el) {
    $(el).collapsible();
};
var autocompleteLoad = function(options, el) {
    if (options.items) {
        var lookup = {};
        var data = {};
        options.items.forEach(function (item) {
            var acMap = options.map;
            var mItem = acMap(item);
            lookup[mItem.value] = item;
            data[mItem.value] = mItem.img;
        });
        elem.appendClass(el, "autocomplete");
        $(el).autocomplete({
            data: data,
            limit: options.limit,
            minLength: options.minLength,
            onAutocomplete: function (value) {
                var item = lookup[value];
                return options.autocomplete(item);
            }
        });
    }
};
var dropdownLoad = function (options, el) {
    var op = options;
    $(el).dropdown({
        constrainWidth: op.constrainWidth,
        inDuration: op.inDuration,
        outDuration: op.outDuration,
        hover: op.hover,
        gutter: op.gutter,
        belowOrigin: op.belowOrigin,
        alignment: op.alignment,
        stopPropagation: op.stopPropagation
    });
};
var selectLoad = function (el) {
    $(el).material_select();
};
var objForEachKey = function (obj, func) {
    for (var k in obj) {
        func(k);
    }
};

module.exports = {
    uuid: uuid,
    colorClass: colorClass,
    codeMd: codeMd,
    haveColor: haveColor,
    haveColorText: haveColorText,
    haveColorShade: haveColorShade,
    haveColorTextShade: haveColorTextShade,
    rowSize: rowSize,
    colSize: colSize,
    colSizeOffset: colSizeOffset,
    replaceClass: replaceClass,
    cardBody: cardBody,
    cardTitle: cardTitle,
    modalBody: modalBody,
    modalTitle: modalTitle,
    footerTitle: footerTitle,
    bannerTitle: bannerTitle,
    sideNavTitle: sideNavTitle,
    bannerBody: bannerBody,
    navBody: navBody,
    navTitle: navTitle,
    buttonA: buttonA,
    tabA: tabA,
    navTabA: navTabA,
    footerItemA: footerItemA,
    sideNavItemA: sideNavItemA,
    fieldInput: fieldInput,
    fieldLabel: fieldLabel,
    textAreaInput: textAreaInput,
    textAreaLabel: textAreaLabel,
    fileInputField: fileInputField,
    fileInputLabel: fileInputLabel,
    fileInputButton: fileInputButton,
    toggleInput: toggleInput,
    toggleLabel: toggleLabel,
    dropdownButton: dropdownButton,
    selectElement: selectElement,
    tableBody: tableBody,
    tableHead: tableHead,
    tocList: tocList,
    footerItem: footerItem,
    dropdownItem: dropdownItem,
    collapsibleItem: collapsibleItem,
    card: card,
    footer: footer,
    navbar: navbar,
    sidenav: sidenav,
    modal: modal,
    banner: banner,
    checkboxInput: checkboxInput,
    progressBar: progressBar,
    preloader: preloader,
    image: image,
    carousel: carousel,
    carouselItem: carouselItem,
    divider: divider,
    text: text,
    textArea: textArea,
    editor: editor,
    markdown: markdown,
    code: code,
    field: field,
    fileInput: fileInput,
    toggle: toggle,
    button: button,
    action: action,
    toast: toast,
    tab: tab,
    navTab: navTab,
    dropdown: dropdown,
    navDropdown: navDropdown,
    navDropdownButton: navDropdownButton,
    sideNavSection: sideNavSection,
    featureDiscovery: featureDiscovery,
    select: select,
    collapsible: collapsible,
    list: list,
    links: links,
    table: table,
    toc: toc,
    radiogroup: radiogroup,
    icon: icon,
    checkbox: checkbox,
    navItem: navItem,
    sideNavItem: sideNavItem,
    linkItem, linkItem,
    listItem: listItem,
    tocItem: tocItem,
    tableRow: tableRow,
    avatarItem: avatarItem,
    radioItem: radioItem,
    selectOption: selectOption,
    listItemSecondary: listItemSecondary,
    makeTableHeader: makeTableHeader,
    tooltipLoad: tooltipLoad,
    loaderLoad: loaderLoad,
    sortableLoad: sortableLoad,
    collapsibleLoad: collapsibleLoad,
    collapsibleItemLoad: collapsibleItemLoad,
    modalLoad: modalLoad,
    modalInit: modalInit,
    selectLoad: selectLoad,
    autocompleteLoad: autocompleteLoad,
    dropdownLoad: dropdownLoad,
    carouselLoad: carouselLoad,
    editorLoad: editorLoad,
    collapsibleStore: collapsibleStore,
    carouselDestroy: carouselDestroy,
    updateTextFields: updateTextFields,
    modalOpen: modalOpen,
    modalClose: modalClose,
    featureDiscoveryOpen: featureDiscoveryOpen,
    tabShow: tabShow,
    tocScrollTo: tocScrollTo,
    sideNavSectionLoad: sideNavSectionLoad,
    sideNavSectionActivate: sideNavSectionActivate,
    markdownRender: markdownRender,
    markdownHighlight: markdownHighlight,
    setCarouselIndex: setCarouselIndex,
    sideNavClose: sideNavClose,
    sideNavCloseOnSmallScreen: sideNavCloseOnSmallScreen,
    listSelectIndex: listSelectIndex
};
