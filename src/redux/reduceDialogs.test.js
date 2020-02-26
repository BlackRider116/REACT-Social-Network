import reduceDialogs, { addNewMessage } from "./reduceDialogs";


const state = {
  messages: [
    { id: 1, message: "Hello" },
    { id: 2, message: "How are you" },
    { id: 3, message: "Good. u?" },
    { id: 4, message: "ok" },
    { id: 5, message: "fuck" },
    { id: 6, message: "Yo" },
    { id: 7, message: "BlaBla" }
  ],
};

test.skip(`test`, () => {
   let action = addNewMessage('helooooo')
   let newState = reduceDialogs(state,action)
   expect(newState.messages.length).toBe(8)
});

test.skip(`message`, () => {
  let action = addNewMessage('helooooo')
  let newState = reduceDialogs(state,action)
  expect(newState.messages[7].message).toBe('helooooo')
});

