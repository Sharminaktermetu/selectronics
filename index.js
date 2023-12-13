const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const fileUpload = require('express-fileupload');

/* import handler */
// // // // // // 


// 
const courseHandler = require('./routeHandler/courseHandler');

const blogHandler = require('./routeHandler/BlogsHandler');

const userHandler = require('./routeHandler/userHandler');

const http = require('http');

const bookHandler = require('./routeHandler/bookHandler');
const classRoomHandler = require('./routeHandler/classRoomHandler');
const comingSoonHandler = require('./routeHandler/comingSoonHandler');
const communityPostHandler = require('./routeHandler/communityPostHandler');
const categoryHandler = require('./routeHandler/categoryHandler');
const faqHandler = require('./routeHandler/faqHandler');
const reviewHandler = require('./routeHandler/testimonialReviewHandler');

const teacherProfileHandler = require('./routeHandler/teacherProfileHandler');
const PopulerSubjectsHandler = require('./routeHandler/PopulerSubjectsHandler');
const populerSubjectsBngHandler = require('./routeHandler/populerSubjectsBngHandler');
const notificationHandler = require('./routeHandler/notificationHandler');
const assignmentHandler = require('./routeHandler/assignmentHandler');
const quizHandler = require('./routeHandler/quizHandler');
const pricingPlanHandler = require('./routeHandler/PricingPlanHandler');

const feedBackHandler = require('./routeHandler/allFeedBackHandler');
const sendMailHandler = require('./routeHandler/sendMailHandler');

const bannerHandler = require('./routeHandler/bannerHandler');
const bannerTwoHandler = require('./routeHandler/bannerTwoHandler');

// const imageHandler = require("./routeHandler/imageHandler");
const studentClassGuideHandler = require('./routeHandler/studentClassGuideHandler');
const teacherNoteUploadHandler = require('./routeHandler/teacherNoteHandler');

const imageHandler = require('./routeHandler/imageHandler');
const leaderBoardHandler = require('./routeHandler/LeaderBoardHandler');
const shurjoPay = require('./routeHandler/Shurjo-pay');
const sslPay = require('./routeHandler/ssl-pay');

const roomHandler = require('./routeHandler/roomHandler');

const chatHandler = require('./routeHandler/chatHandler');
const messageHandler = require('./routeHandler/messageHandler');
const registrationHandler = require('./routeHandler/RegistrationHandler');
const achievementHandler = require('./routeHandler/achievementHandler');
const comingSoonSubscriberHandler = require('./routeHandler/comingSoonSubscriberHandler');
const addHandler = require('./routeHandler/addHandler');
const bkashHandler = require('./routeHandler/bkashHandler')
const session = require('express-session')
const app = express();
const server = require('http').createServer(app);
const store = new session.MemoryStore()

/* DB connection and middleware and cors */
const connectDB = require('./config/db');

const port = process.env.PORT || 8080;
const cors = require('cors');
const crypto = require('crypto');
const { bkashConfig } = require('./config/bkashConfig');


app.use(express.json());
app.use(fileUpload({ tempFileDir: '/temp' }));
app.use(cors({
  origin: "*",
}));
// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");

//   //  res.header("Access-Control-Allow-Origin", "http://localhost:3000"); or add your react app url.
//   next();
// });
dotenv.config();
app.set('view engine', 'ejs');
app.use(session({

  // It holds the secret key for session
  secret: 'Secret_Key',
  cookie: { maxAge: 30000 },
  saveUninitialized: true,
  resave: false,
  store


}))

// connecting mongodb
connectDB();


app.get('/', async (req, res) => {
  res.send('Qawmi primary server is running');
});

app.use('/course', courseHandler);
app.use('/book', bookHandler);
app.use('/classRoom', classRoomHandler);
app.use('/comingSoon', comingSoonHandler);
app.use('/communityPost', communityPostHandler);
app.use('/category', categoryHandler);
app.use('/faq', faqHandler);
app.use('/user', userHandler);
app.use('/api/v1/reviews', reviewHandler);
app.use('/blogs', blogHandler);
app.use('/api/v1/teacherProfiles', teacherProfileHandler);
app.use('/populersubjects', PopulerSubjectsHandler);
app.use('/populersubjectsBng', populerSubjectsBngHandler);
app.use('/notification', notificationHandler);
app.use('/assignment', assignmentHandler);
app.use('/quiz', quizHandler);

app.use('/banner', bannerHandler);
app.use('/bannertwo', bannerTwoHandler);



app.use('/feedback', feedBackHandler);
app.use('/mail', sendMailHandler);

app.use('/course', courseHandler);
app.use('/book', bookHandler);
app.use('/classRoom', classRoomHandler);
app.use('/comingSoon', comingSoonHandler);
app.use('/communityPost', communityPostHandler);
app.use('/category', categoryHandler);
app.use('/faq', faqHandler);
app.use('/user', userHandler);
app.use('/api/v1/reviews', reviewHandler);

app.use('/blogs', blogHandler);
app.use('/api/v1/teacherProfiles', teacherProfileHandler);
app.use('/populersubjects', PopulerSubjectsHandler);
app.use('/populersubjectsBng', populerSubjectsBngHandler);
app.use('/notification', notificationHandler);
app.use('/assignment', assignmentHandler);
app.use('/quiz', quizHandler);
app.use('/banner', bannerHandler);
app.use('/bannertwo', bannerTwoHandler);

// app.use('/pricing', pricingAddHandler);
app.use('/feedback', feedBackHandler);
app.use('/mail', sendMailHandler);

app.use('/api/v1/blogs', blogHandler);
app.use('/api/v1/teacherProfiles', teacherProfileHandler);
app.use('/populersubjects', PopulerSubjectsHandler);
app.use('/notification', notificationHandler);
app.use('/assignment', assignmentHandler);
app.use('/quiz', quizHandler);
app.use('/pricingplan', pricingPlanHandler);
app.use('/feedback', feedBackHandler);
app.use('/mail', sendMailHandler);
app.use('/leaderBoard', leaderBoardHandler);
// 
app.use('/sslpay', sslPay)
// 
app.use('/surjopay', shurjoPay);
app.use('/rooms', roomHandler);
app.use('/chat', chatHandler);
app.use('/message', messageHandler);
app.use('/registration', registrationHandler);
app.use('/achievement', achievementHandler);
app.use('/subscriber', comingSoonSubscriberHandler);
app.use('/add', addHandler);
app.use('/bkash', bkashHandler)
app.use("/img", imageHandler);
app.use(require("./routeHandler/imageHandler"));
app.use(studentClassGuideHandler);
app.use(teacherNoteUploadHandler);
app.use(imageHandler);
// ************************************************************************





app.get("/bkash-search", async (req, res) => {
  try {
    const { trxID } = req.query
    const result = await searchTransaction(bkashConfig, trxID)
    res.send(result)
  } catch (e) {
    console.log(e)
  }
})

// ************************************************************************
const io = require('socket.io')(server, {
  pingTimeout: 60000,
  cors: {
    origin: ['https://qawmiuniversity.com', 'http://localhost:3000'],
  },
});

// const server = http.createServer(app);
// const io = socketio(server);

io.on('connection', (socket) => {
  ;
  socket.on('setup', (userData) => {
    socket.join(userData._id);

    socket.emit('connected');
  });

  socket.on('join chat', (room) => {
    socket.join(room);
  });

  socket.on('typing', (room) => socket.in(room).emit('typing'));
  socket.on('stop typing', (room) => socket.in(room).emit('stop typing'));

  socket.on('new message', (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return;

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit('message recieved', newMessageRecieved);
    });
  });

  socket.off('setup', () => {
    socket.leave(userData._id);
  });
});

const errorHandler = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};
app.use(errorHandler);

server.listen(port, () => {
  console.log("server connected")
});
