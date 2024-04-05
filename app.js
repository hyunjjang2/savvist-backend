const express = require('express')
const path = require('path');
const morgan = require('morgan');
const nunjucks = require('nunjucks');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const dotenv = require('dotenv');

const {sequelize} = require('./src/models');
const authRouter = require('./src/routes/auth');
const productRouter = require('./src/routes/products');
const passport = require('passport');
const passportConfig = require('./passport');
const cors = require('cors');

dotenv.config();

console.log(process.env.NODE_ENV);
const app = express();
app.use(cors({origin: "http://localhost:3000", credentials:true}));
passportConfig();

const port = 5000

app.set('view engine' , 'html');
nunjucks.configure('views', {
  express: app,
  watch: true,
});

sequelize.sync({force: false})
  .then(()=> {
    console.log('데이터베이스 연결 성공');
  })
  .catch((err)=>{
    console.log(err);
  });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  cookie: {
    httpOnly: true,
    secure: false,
    maxAge: 3600000,
  },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/products',express.static(path.join(__dirname, 'products')));
app.use('/products',productRouter);

app.use((req, res, next)=> {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

app.use((err,req,res,next)=>{
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
  res.status(err.status || 500);
  res.send(err.message);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
