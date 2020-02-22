import reduceProfile from "./reduceProfile";
import reduceDialogs from "./reduceDialogs";

let store = {
  _state: {
    messagesPage: {
      usersDialog: [
        {
          name: "Nail",
          id: 1,
          src:
            "https://www.nastol.com.ua/download.php?img=201112/1280x1024/nastol.com.ua-12179.jpg"
        },
        {
          name: "Dasha",
          id: 2,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1706591/9d637326-f188-44f3-8117-76c62487dcd6/s1200"
        },
        {
          name: "Sasha",
          id: 3,
          src:
            "http://www.topoboi.com/pic/201312/1440x900/topoboi.com-32873.jpg"
        },
        {
          name: "Petr",
          id: 4,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1942078/de777b22-35ba-4f83-925a-a95bb7ded7a1/s1200"
        },
        {
          name: "Dinar",
          id: 5,
          src: "https://www.sunhome.ru/i/wallpapers/114/koshka-v3.orig.jpg"
        },
        {
          name: "Gena",
          id: 6,
          src:
            "https://yt3.ggpht.com/a/AGF-l7-FVKXYlawwwX3FPFRUmbScWaQRXNFYMTe83Q=s900-c-k-c0xffffffff-no-rj-mo"
        },
        {
          name: "Masha",
          id: 7,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1365646/0d7c5f19-73d0-410d-a8ed-ec7529d8a167/s1200"
        },
        {
          name: "Sasha",
          id: 8,
          src:
            "https://avatars.mds.yandex.net/get-pdb/195449/6eec6f67-e740-457e-9eb7-34bcde2f7082/s1200"
        }
      ],
      messages: [
        { id: 1, message: "Hello" },
        { id: 2, message: "How are you" },
        { id: 3, message: "Good. u?" },
        { id: 4, message: "ok" },
        { id: 5, message: "fuck" },
        { id: 6, message: "Yo" },
        { id: 7, message: "BlaBla" }
      ],
      inputMessage: "bla bla bla"
    },
    profilePage: {
      posts: [
        {
          id: 4,
          text: "helo, how are you?",
          likes: 10,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
        },
        {
          id: 3,
          text: "hdfghghdfhdfh",
          likes: 15,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
        },
        {
          id: 2,
          text: "551++596",
          likes: 7,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
        },
        {
          id: 1,
          text: "helo",
          likes: 9,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1378807/02efeda4-5dd6-4f01-aa37-65eba04f077b/s1200"
        }
      ],
      inputPost: "New Post !!!"
    },
    friendsPage: {
      friends: [
        {
          name: "Nail",
          id: 1,
          src:
            "https://www.nastol.com.ua/download.php?img=201112/1280x1024/nastol.com.ua-12179.jpg"
        },
        {
          name: "Dasha",
          id: 2,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1706591/9d637326-f188-44f3-8117-76c62487dcd6/s1200"
        },
        {
          name: "Sasha",
          id: 3,
          src:
            "http://www.topoboi.com/pic/201312/1440x900/topoboi.com-32873.jpg"
        },
        {
          name: "Petr",
          id: 4,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1942078/de777b22-35ba-4f83-925a-a95bb7ded7a1/s1200"
        },
        {
          name: "Dinar",
          id: 5,
          src: "https://www.sunhome.ru/i/wallpapers/114/koshka-v3.orig.jpg"
        },
        {
          name: "Gena",
          id: 6,
          src:
            "https://yt3.ggpht.com/a/AGF-l7-FVKXYlawwwX3FPFRUmbScWaQRXNFYMTe83Q=s900-c-k-c0xffffffff-no-rj-mo"
        },
        {
          name: "Masha",
          id: 7,
          src:
            "https://avatars.mds.yandex.net/get-pdb/1365646/0d7c5f19-73d0-410d-a8ed-ec7529d8a167/s1200"
        },
        {
          name: "Sasha",
          id: 8,
          src:
            "https://avatars.mds.yandex.net/get-pdb/195449/6eec6f67-e740-457e-9eb7-34bcde2f7082/s1200"
        }
      ]
    }
  },
  _render() {
    console.log("State changed");
  },
  subscribe(observer) {
    this._render = observer;
  },
  getState() {
    return this._state;
  },

  dispatch(action) {
    this._state.messagesPage = reduceDialogs(this._state.messagesPage, action);
    this._state.profilePage = reduceProfile(this._state.profilePage, action);

    this._render(this._state);
  }
};

// export default store;
