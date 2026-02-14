//it should map a target element to its dependents

export function connectToState(stateNeedsToConnect, ...targetStates) {
  for (const state of targetStates) {
    state.regist(stateNeedsToConnect.listener.bind(stateNeedsToConnect));
  }
}

export function connectToASpecificFunction(
  stateNeedsToConnect,
  targetModule,
  funcName,
) {
  targetModule.regist(
    stateNeedsToConnect.listener.bind(stateNeedsToConnect),
    funcName,
  );
}
