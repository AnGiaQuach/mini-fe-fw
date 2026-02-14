import {
  ReactiveDependentState,
  ReactiveFactory,
  ReactiveState,
} from "../ReactiveElements.js";
import {
  connectToASpecificFunction,
  connectToState,
} from "../MapReactiveElements.js";

const reactiveAddressNumber = new ReactiveState("addressNumber", () => {}, {});
const reactiveUserName = new ReactiveState("userName", () => {}, {});
const reactiveAge = new ReactiveState("age", () => {}, {});
const reactiveAddress = new ReactiveState(
  "address",
  ({ addressNumber }) => {
    return `${addressNumber} CatPaw`;
  },
  { addressNumber: undefined },
);

function exampleModuleFactory({ userName, age, address }) {
  const exampleModule = ((userName, age, address) => {
    function helloWithName() {
      return `Hello ${userName}`;
    }

    function helloWithNameAndAge() {
      return `${helloWithName(userName)}, I'm ${age} years old`;
    }

    function helloWithNameAndAgeAndAddress() {
      return `${helloWithNameAndAge()} from ${address}`;
    }

    return {
      helloWithName,
      helloWithNameAndAge,
      helloWithNameAndAgeAndAddress,
    };
  })(userName, age, address);

  return exampleModule;
}

const reactiveModule = new ReactiveFactory(exampleModuleFactory, {
  userName: undefined,
  age: undefined,
  address: undefined,
});

connectToState(reactiveAddress, reactiveAddressNumber);
connectToState(reactiveModule, reactiveUserName, reactiveAddress, reactiveAge);

reactiveUserName.mutate("Sonya");

console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

reactiveAge.mutate(17);
console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

reactiveAddress.mutate("5173 Avenue");
console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

reactiveUserName.mutate("Alex");
console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

reactiveAddressNumber.mutate(1);
console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

reactiveAge.mutate(23);

console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

reactiveAddress.mutate("01 Cat Avenue");

console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

reactiveAddressNumber.mutate(12);
console.log(reactiveModule.getModule().helloWithNameAndAgeAndAddress());

function anotherModuleFactory({ helloWithNameAndAgeAndAddress }) {
  const exampleModule = ((helloWithNameAndAgeAndAddress) => {
    function replyWithHelloWithNameAndAgeAndAddress() {
      return `Reply: ${helloWithNameAndAgeAndAddress()}`;
    }

    return { replyWithHelloWithNameAndAgeAndAddress };
  })(helloWithNameAndAgeAndAddress);

  return exampleModule;
}

const reactiveAnotherModuleFactory = new ReactiveFactory(anotherModuleFactory, {
  helloWithNameAndAgeAndAddress: undefined,
});

connectToASpecificFunction(
  reactiveAnotherModuleFactory,
  reactiveModule,
  "helloWithNameAndAgeAndAddress",
);

reactiveUserName.mutate("Steve");
reactiveAddressNumber.mutate("0452187");

console.log(
  reactiveAnotherModuleFactory
    .getModule()
    .replyWithHelloWithNameAndAgeAndAddress(),
);

const reactiveReply = new ReactiveDependentState(
  "reply",
  function ({
    anotherCountry,
    anotherCity,
    replyWithHelloWithNameAndAgeAndAddress,
  }) {
    return `REPLY: I'm from ${anotherCity}, ${anotherCountry} TO: ${replyWithHelloWithNameAndAgeAndAddress()}`;
  },
  {
    anotherCity: undefined,
    anotherCountry: undefined,
    replyWithHelloWithNameAndAgeAndAddress: function () {},
  },
);

const reactiveAnotherCity = new ReactiveState(
  "anotherCity",
  function () {},
  {},
);
const reactiveAnotherCountry = new ReactiveState(
  "anotherCountry",
  function () {},
  {},
);

// reactiveAnotherCity.regist(reactiveReply.listener.bind(reactiveReply));
// reactiveAnotherCountry.regist(reactiveReply.listener.bind(reactiveReply));

connectToState(reactiveReply, reactiveAnotherCity, reactiveAnotherCountry);

// reactiveAnotherModuleFactory.regist(
//   reactiveReply.listener.bind(reactiveReply),
//   "replyWithHelloWithNameAndAgeAndAddress",
// );
connectToASpecificFunction(
  reactiveReply,
  reactiveAnotherModuleFactory,
  "replyWithHelloWithNameAndAgeAndAddress",
);

reactiveAnotherCity.mutate("London");
reactiveAnotherCountry.mutate("The UK");

reactiveUserName.mutate("Robert");
console.log(reactiveReply.state);

reactiveAddressNumber.mutate(1337);
reactiveAge.mutate(7);

console.log(reactiveReply.state);
