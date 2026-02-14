function convertFromVariablesToObject(variablesArray) {
  const obj = {};
  for (const e of variablesArray) {
    obj[`${e.name}`] = e.value;
  }
  return obj;
}

// class ReactiveFactory1 {
//   constructor(factoryFunc, stateThisFactoryDependsOn) {
//     this.factoryFunc = factoryFunc;
//     this.state = convertFromVariablesToObject(variablesStateDependOn);
//     this.variablesStateDependOn = variablesStateDependOn;
//     this.registeredFuncs = {};
//   }

//   listener(externalStates) {
//     this.variablesStateDependOn = this.variablesStateDependOn.map((e) => {
//       for (const elm of externalStates) {
//         if (e.name === elm.name) {
//           return { name: e.name, value: elm.value };
//         }
//       }
//       return e;
//     });
//     this.state = convertFromVariablesToObject(this.variablesStateDependOn);

//     //emit to all things registered previously
//     const newModule = this.factoryFunc(this.state);

//     for (const key in this.registeredFuncs) {
//       if (Array.isArray(this.registeredFuncs[key])) {
//         for (const f of this.registeredFuncs[key]) {
//           f(newModule[key]);
//         }
//       }
//     }

//     return newModule;
//   }

//   registFunc(func, funcName) {
//     this.registeredFuncs[`${funcName}`].push(func);
//   }

//   getFunc() {
//     return this.factoryFunc(this.state);
//   }
// }

// const exampleReactiveString = new ReactiveFactory(
//   function ({ userName, age, address }) {
//     const module = (function (userName, age, address) {
//       function hello() {
//         return `Hello, I'm ${userName}`;
//       }

//       function helloWithAgeAndAddress() {
//         return `Hello, I'm ${userName} from ${address} and I'm ${age} ${age <= 1 ? `year` : "years"} old!`;
//       }

//       return { helloWithAgeAndAddress, hello };
//     })(userName, age, address);

//     return module;
//   },
//   [
//     { name: "userName", value: "cat" },
//     { name: "age", value: 1 },
//     { name: "address", value: "01 cat" },
//   ],
// );
// exampleReactiveString.listener([{ name: "userName", value: "alex" }]);
// console.log(exampleReactiveString.getFunc()["helloWithAgeAndAddress"]());

// class State {
//   constructor(
//     stateName,
//     processState,
//     variablesStateDependOn,
//     functionsStateDependOn,
//   ) {
//     this.registeredFuncs = [];
//     this.stateName = stateName;
//     this.state = processState(variablesStateDependOn);
//     this.processState = processState;
//     this.variablesStateDependOn = variablesStateDependOn;
//   }

//   registFunc(func) {
//     this.registeredFuncs.push(func);
//   }

//   mutate(newState) {
//     this.state = newState;
//     this.registeredFuncs.forEach((func) => {
//       func({ name: this.stateName, value: newState });
//     });
//   }

//   listener(receivedStateObject) {
//     this.variablesStateDependOn = this.variablesStateDependOn.map((e) => {
//       if (e.name === receivedStateObject.name) {
//         return { name: e.name, value: receivedStateObject.value };
//       } else {
//         return e;
//       }
//     });
//   }
// }

// class DependentState {
//   constructor(
//     stateName,
//     processState,
//     variablesStateDependOn,
//     functionsStateDependOn,
//   ) {
//     this.processState = processState;
//     this.stateName = stateName;
//     this.state = processState(variablesStateDependOn);
//     this.processState = processState;
//     this.variablesStateDependOn = variablesStateDependOn;

//     this.registeredFuncs = [];
//   }

//   emit(newStateObject) {
//     this.registeredFuncs.forEach((f) => {
//       f(newStateObject);
//     });
//   }

//   listener(receivedStateObject) {
//     this.variablesStateDependOn = this.variablesStateDependOn.map((e) => {
//       if (e.name === receivedStateObject.name) {
//         return { name: e.name, value: receivedStateObject.value };
//       } else {
//         return e;
//       }
//     });

//     this.state = this.processState(this.variablesStateDependOn);
//     this.emit({ name: this.stateName, value: this.state });
//   }
// }

// console.log(
//   exampleReactiveString.getFunc([{ name: "userName", value: "Alexanderia" }])(),
// );

// function exampleModuleFactory(userName, age, address) {
//   const exampleModule = ((userName, age, address) => {
//     function helloWithName() {
//       return `Hello ${userName}`;
//     }

//     function helloWithNameAndAge() {
//       return `${helloWithName(userName)}, I'm ${age} years old`;
//     }

//     function helloWithNameAndAgeAndAddress() {
//       return `${helloWithNameAndAge()} from ${address}`;
//     }

//     return {
//       helloWithName,
//       helloWithNameAndAge,
//       helloWithNameAndAgeAndAddress,
//     };
//   })(userName, age, address);

//   return exampleModule;
// }

// const testModule = new ReactiveFactory(
//   ["userName", "age", "address"],
//   exampleModuleFactory,
//   { userName: "cat", age: 0, address: "01 CutePaw" },
// );

// let res = testModule
//   .getFunc({ name: "userName", value: "Alex" })
//   .helloWithNameAndAgeAndAddress();
// console.log(res);

function replaceNecessaryProp(targetObject, addOnObject) {
  for (const key in targetObject) {
    if (addOnObject.hasOwnProperty(key)) {
      targetObject[key] = addOnObject[key];
    }
  }
}

// let obj1 = { name: "alex", age: 1, address: "01 ave" };
// let obj3 = { name: "caat" };

// replaceNecessaryProp(obj1, obj3);
// console.dir(obj1, { depth: null });

export class ReactiveFactory {
  constructor(factoryFunc, stateThisFactoryDependsOn) {
    if (typeof factoryFunc !== "function") {
      throw new Error("factoryFunc should be function!");
    }
    this.factoryFunc = factoryFunc;
    this.stateThisFactoryDependsOn = stateThisFactoryDependsOn;
    this.registeredFuncs = {};
  }

  regist(func, targetFuncName) {
    if (!Array.isArray(this.registeredFuncs[targetFuncName])) {
      this.registeredFuncs[targetFuncName] = [];
    }
    this.registeredFuncs[targetFuncName].push(func);
  }

  listener(receivedStateObject) {
    replaceNecessaryProp(this.stateThisFactoryDependsOn, receivedStateObject);

    for (const funcName in this.registeredFuncs) {
      let transferredFunc = this.factoryFunc(this.stateThisFactoryDependsOn)[
        funcName
      ];

      if (Array.isArray(this.registeredFuncs[funcName])) {
        for (const f of this.registeredFuncs[funcName]) {
          f({ [funcName]: transferredFunc });
        }
      }
    }
  }

  getModule() {
    return this.factoryFunc(this.stateThisFactoryDependsOn);
  }
}

export class ReactiveState {
  constructor(stateName, stateFunc, otherStatesThisStateDependOn) {
    this.stateFunc = stateFunc;
    this.otherStatesThisStateDependOn = otherStatesThisStateDependOn;
    this.state = stateFunc(otherStatesThisStateDependOn);
    this.stateName = stateName;
    this.registeredFuncs = [];
  }

  emit() {
    if (Array.isArray(this.registeredFuncs)) {
      const newObject = {};
      newObject[`${this.stateName}`] = this.state;
      for (const f of this.registeredFuncs) {
        f(newObject);
      }
    }
  }

  listener(receivedStateObject) {
    replaceNecessaryProp(
      this.otherStatesThisStateDependOn,
      receivedStateObject,
    );

    this.state = this.stateFunc(this.otherStatesThisStateDependOn);
    this.emit();
  }

  mutate(newValue) {
    this.state = newValue;
    this.emit();
  }

  regist(func) {
    if (!Array.isArray(this.registeredFuncs)) {
      throw new Error("registeredFuncs is not array! Please fix this part!");
    }
    this.registeredFuncs.push(func);
  }
}

export class ReactiveDependentState {
  constructor(stateName, stateFunc, otherStatesThisStateDependOn) {
    this.stateFunc = stateFunc;
    this.otherStatesThisStateDependOn = otherStatesThisStateDependOn;
    this.state = stateFunc(otherStatesThisStateDependOn);
    this.stateName = stateName;
    this.registeredFuncs = [];
  }

  emit() {
    if (Array.isArray(this.registeredFuncs)) {
      const newObject = {};
      newObject[`${this.stateName}`] = this.state;
      for (const f of this.registeredFuncs) {
        f(newObject);
      }
    }
  }

  listener(receivedStateObject) {
    replaceNecessaryProp(
      this.otherStatesThisStateDependOn,
      receivedStateObject,
    );

    this.state = this.stateFunc(this.otherStatesThisStateDependOn);
    this.emit();
  }

  regist(func) {
    if (!Array.isArray(this.registeredFuncs)) {
      throw new Error("registeredFuncs is not array! Please fix this part!");
    }
    this.registeredFuncs.push(func);
  }
}
