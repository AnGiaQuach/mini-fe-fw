//dom

function Root() {
  return {
    tag: "div",
    componentName: "Root",
    children: [
      { component: "ChildComponent", prop: { userName: "Alex" } },
      { tag: "div" },
    ],
  };
}

function ChildComponent() {
  const states = [{ name: "age", value: 17, emitFunc: function () {} }];

  function getFunctionsWithProps(userName, age) {
    const componentFuncs = (function (name) {
      function hello() {
        return "hello";
      }

      function helloWorld() {
        return `${hello()} world from ${name}! I'm ${age}`;
      }

      return { hello, helloWorld };
    })(userName);

    return componentFuncs;
  }

  return {
    tag: "div",
    componentName: "ChildComponent",
    eventList: [
      {
        type: "click",
        func: "hello",
      },
    ],
    children: [
      { tag: "p", textContent: "hello world" },
      { component: "AnotherChildComponent", prop: {} },
    ],
  };
}

function AnotherChildComponent() {
  return {
    tag: "p",
    componentName: "AnotherChildComponent",
    textContent: "from mini-fe-fw",
    children: [{ component: "TestDiv1" }],
  };
}

function TestDiv1() {
  return {
    tag: "div",
    componentName: "TestDiv1",
  };
}

export { Root, ChildComponent, AnotherChildComponent, TestDiv1 };
