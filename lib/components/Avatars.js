module.exports.register = function (cml, modules) {
    const elem = modules.elem;
    const mat = modules.mat;
    const is = modules.is;

    const list = cml.getComponent("List");

    cml.addComponent({
        class: "Avatars",
        refresh: list.refresh,
        instance: list.instance,
        load: list.load,
        delete: list.delete,
        defaultProperty: list.defaultProperty,
        create: function (p, m) {
            p.__childType__ = "AvatarListItem";
            var el = elem.m("ul", { class: "collection"});
            cml.createMapItems(p, m, el, p.__childType__);
            return el;
        }
    });

    cml.addComponent({
        class: "AvatarListItem",
        defaultProperty: "title",
        create: function (p, m) {
            var options = {};
            var ex = function (name) {
                options[name] = cml.extract(p, name);
            };
            ex("title");
            ex("content");
            ex("secondary");
            ex("icon");
            ex("img");
            return mat.avatarItem(options);
        }
    });
};
