"use strict";
var _definerule = require("../utils/define-rule");
var _path = /*#__PURE__*/ _interop_require_wildcard(require("path"));
function _getRequireWildcardCache(nodeInterop) {
    if (typeof WeakMap !== "function") return null;
    var cacheBabelInterop = new WeakMap();
    var cacheNodeInterop = new WeakMap();
    return (_getRequireWildcardCache = function(nodeInterop) {
        return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
    })(nodeInterop);
}
function _interop_require_wildcard(obj, nodeInterop) {
    if (!nodeInterop && obj && obj.__esModule) {
        return obj;
    }
    if (obj === null || typeof obj !== "object" && typeof obj !== "function") {
        return {
            default: obj
        };
    }
    var cache = _getRequireWildcardCache(nodeInterop);
    if (cache && cache.has(obj)) {
        return cache.get(obj);
    }
    var newObj = {
        __proto__: null
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj){
        if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) {
                Object.defineProperty(newObj, key, desc);
            } else {
                newObj[key] = obj[key];
            }
        }
    }
    newObj.default = obj;
    if (cache) {
        cache.set(obj, newObj);
    }
    return newObj;
}
var url = 'https://nextjs.org/docs/messages/no-head-import-in-document';
module.exports = (0, _definerule.defineRule)({
    meta: {
        docs: {
            description: 'Prevent usage of `next/head` in `pages/_document.js`.',
            recommended: true,
            url: url
        },
        type: 'problem',
        schema: []
    },
    create: function create(context) {
        return {
            ImportDeclaration: function ImportDeclaration(node) {
                if (node.source.value !== 'next/head') {
                    return;
                }
                var document = context.filename.split('pages', 2)[1];
                if (!document) {
                    return;
                }
                var _path_parse = _path.parse(document), name = _path_parse.name, dir = _path_parse.dir;
                if (name.startsWith('_document') || dir === '/_document' && name === 'index') {
                    context.report({
                        node: node,
                        message: "`next/head` should not be imported in `pages".concat(document, "`. Use `<Head />` from `next/document` instead. See: ").concat(url)
                    });
                }
            }
        };
    }
});
