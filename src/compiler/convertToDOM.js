export function convertToVirtualDOM(DOMTemplate) {
  function processVirtualDOMNode(Node) {
    if (!Array.isArray(Node.children)) {
      return Node;
    }

    Node.children = Node.children.map((child) => {
      if (typeof child.component === "string") {
        let virtualDOM = processVirtualDOMNode(
          DOMTemplate[`${child.component}`](),
        );
        return virtualDOM;
      } else {
        return child;
      }
    });

    return Node;
  }

  return processVirtualDOMNode(DOMTemplate.Root());
}

export function createElm(tag) {
  return document.createElement(tag);
}

export function convertToRealDOM(DOMTree) {
  function processRealDOMNode(Node) {
    let elm = createElm(Node.tag);

    if (Node.textContent) {
      elm.textContent = Node.textContent;
    }

    if (!Node.children) {
      return elm;
    }

    for (const child of Node.children) {
      elm.appendChild(processRealDOMNode(child));
    }

    return elm;
  }

  let realDOM = processRealDOMNode(DOMTree);
  return realDOM;
}
