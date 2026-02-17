// file structure backend/
│
├── config/
│   └── db.js              // MongoDB connection
│
├── models/
│   ├── User.js            // user schema
│   ├── Chat.js            // 1-1 chat schema
│   └── Message.js         // messages
│
├── routes/
│   ├── authRoutes.js      // login, signup
│   ├── userRoutes.js      // search users
│   ├── chatRoutes.js      // create/get chats
│   └── messageRoutes.js  // send/get messages
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   ├── chatController.js
│   └── messageController.js
│
├── server.js              // main entry
└── package.json
