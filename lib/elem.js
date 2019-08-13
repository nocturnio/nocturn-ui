const is = require("./is");

var remap = function (name) {
    var lookup = {
        "class": "className",
        "for": "htmlFor"
    };
    return lookup[name] || name;
};
var numberToPercentStr = function (num) {
    return (0 === num) ? "0%" : (parseFloat((num * 100).toFixed(3)) + "%");
};
var append = function (el, child) {
    el.appendChild(child);
};
var prepend = function (el, child) {
    el.insertBefore(child, el.childNodes[0]);
};
var appendClass = function(el, className, preText, postText) {
    preText = preText || "";
    postText = postText || "";
    if (className) {
        var names = className.split(" ");
        names.forEach(function(n) {
            if (n) {
                el.classList.add(preText + n + postText);
            }
        });
    }
};
var appendText = function (el, text) {
    var node = document.createTextNode(text);
    append(el, node);
};
var removeClass = function (el, className) {
    if (className) {
        var names = className.split(" ");
        names.forEach(function (n) {
            if (n) {
                el.classList.remove(n);
            }
        });
    }
};
var replaceClass = function (el, obj, name, c2, preText, postText, haveMore) {
    var c1 = obj[name];
    if (c1) {
        elem.removeClass(el, preText + c1 + postText);
    }
    if (c2) {
        elem.removeClass(el, preText + c2 + postText);
    }
    if (!haveMore) {
        obj[name] = c2;
    }
};
var haveClass = function (el, className) {
    if (className) {
        return el.classList.contains(className);
    } else {
        return true;
    }
};
var haveClasses = function (el) {
    var classes = Array.prototype.slice.call(arguments, 1);
    var found = true;
    for (var i = 0; i < classes.length; i++) {
        var className = classes[i];
        if (className && !haveClass(el, className)) {
            found = false;
            break;
        }
    }
    return found;
};
var clear = function (el) {
    el.innerHTML = "";
};
var del = function (el) {
    el.parentNode.removeChild(el);
};
var attach = function (el, c) {
    if (is.string(c)) {
        appendText(el, c);
    } else if (is.element(c)) {
        append(el, c);
    } else if (is.number(c)) {
        appendText(el, c);
    } else if (is.array(c)) {
        c.forEach(function (sub) {
            attach(el, sub);
        });
    } else {
        throw "Failed to attach el: " + c;
    }
};
var make = function () {
    // make
    var name = arguments[0].toUpperCase();
    var params = arguments[1] || {};
    var children = Array.prototype.slice.call(arguments, 2);
    var el = document.createElement(name);
    for (var k in params) {
        el[remap(k)] = params[k];
    }
    children.forEach(function (c) { attach(el, c); });
    return el;
};
var byTagName = function (el, tagName) {
    return toArray(el.getElementsByTagName(tagName.toUpperCase()));
};
var byId = function (id) {
    return document.getElementById(id);
};
var byClassName = function (el, className) {
    return toArray(el.getElementsByClassName(className));
};
var byName = function (name) {
    return toArray(document.getElementsByName(name));
};
var firstChild = function (el) {
    return el.childNodes[0];
};
var children = function (el) {
    return toArray(el.childNodes);
};
var parent = function (el) {
    return el.parentNode;
}
var toArray = function (obj) {
    var rtn = [];
    for (var i = 0; i < obj.length; i++) {
        rtn.push(obj[i]);
    }
    return rtn;
};
var equal = function (el1, el2) {
    return el1.isEqualNode(el2);
};

module.exports = {
    append: append,
    prepend: prepend,
    appendClass: appendClass,
    appendText: appendText,
    removeClass: removeClass,
    haveClass: haveClass,
    haveClasses: haveClasses,
    clear: clear,
    delete: del,
    numberToPercentStr: numberToPercentStr,
    byTagName: byTagName,
    byId: byId,
    byName: byName,
    byClassName: byClassName,
    firstChild: firstChild,
    children: children,
    parent: parent,
    equal: equal,
    m: make
};
