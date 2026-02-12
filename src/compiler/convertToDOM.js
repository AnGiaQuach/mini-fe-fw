export function convertToVirtualDOM(DOMTemplate) {
  function processVirtualDOMNode(Node) {
    if (!Array.isArray(Node.children)) {
      return Node;
    }

    Node.children = Node.children.map((child) => {
      if (typeof child === "string") {
        let virtualDOM = processVirtualDOMNode(DOMTemplate[`${child}`]());
        return virtualDOM;
      } else {
        return child;
      }
    });

    return Node;
  }

  return processVirtualDOMNode(DOMTemplate.Root());
}
