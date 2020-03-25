const ADD_MESSAGE = "/profile/ADD-MESSAGE";

const initialState = {
  messages: [],
  users: [],
  listAllDialogs: null,
  totalCountMessages: null
};

const reduceDialogs = (state = initialState, action) => {
  switch (action.type) {
    case ADD_MESSAGE:
      const messageId = state.messages[state.messages.length - 1].id;
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            id: messageId + 1,
            message: action.message.newMessage
          }
        ],
      };

    default:
      return state;
  }
};

export const addNewMessage = (message) => ({ type: ADD_MESSAGE, message });

export default reduceDialogs;
