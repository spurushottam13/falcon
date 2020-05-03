const DOM = (function () {
    return {
        getXpath: function(ele){
            if (!ele) return null
            if (ele.tagName === 'BODY') {
                return '/html/body'
            } else {
                const sameTagSiblings = Array.from(ele.parentNode.childNodes)
                    .filter(e => e.nodeName === ele.nodeName)
                const idx = sameTagSiblings.indexOf(ele)
                return this.getXpath(ele.parentNode) +
                    '/' +
                    ele.tagName.toLowerCase() +
                    (sameTagSiblings.length > 1 ? `[${idx + 1}]` : '')
            }
        },
        getElementByXpath: (xpath) => document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue,
        returnEL: function(ele){
            const haveChild = (ele) => !!ele.childNodes.length
            const getAttributes = (ele) => ele.getAttributeNames ? ele.getAttributeNames().map(i => ({ [i]: ele.getAttribute(i) })) : []
            return {
                type: ele.nodeName,
                props: getAttributes(ele),
                children: haveChild(ele) ? Array.from(ele.childNodes).map(i => this.returnEL(i)) : ele.nodeType === Node.TEXT_NODE ? ele.nodeValue : ele.innerHTML
            }
        },
        returnElement: function({ type, props, children }){
            if (type === '#text') return document.createTextNode(children)
            if (type === '#comment') return document.createComment(children)
            const element = document.createElement(type)
            if (!Array.isArray(props)) throw "[Praktice.AI] (Fiber) props type is not Array"
            props.forEach(item => {
                element.setAttribute(Object.keys(item)[0], item[Object.keys(item)[0]])
            })
            if (Array.isArray(children)) element.append(...children.map(i => this.returnElement(i)))
            else element.append(children)
            return element
        }
    }
})()

export default DOM