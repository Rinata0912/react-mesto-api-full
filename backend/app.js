const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { celebrate, Joi } = require('celebrate');
const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const allowedCors = [
  'http://www.mesto-community.students.nomoreparties.xyz',
  'http://mesto-community.students.nomoreparties.xyz',
  'https://www.mesto-community.students.nomoreparties.xyz',
  'https://mesto-community.students.nomoreparties.xyz',
  'http://localhost:4000',
  'http://localhost:3000',
];

const corsOptions = {
  origin: (origin, callback) => {
    callback(null, allowedCors);
  },
};

const {
  login,
  createUser,
  getUser,
  updateAvatar,
} = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
});

app.use(cors(corsOptions));

app.use(requestLogger);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signin', login);
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).default('Жак-Ив Кусто'),
    about: Joi.string().min(2).max(30).default('Исследователь'),
    avatar: Joi.string().default('https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png'),
    email: Joi.string().required(),
    password: Joi.string().required().min(8),
  }).unknown(true),
}), createUser);

app.use(auth);

app.get('/users/me', getUser);
app.patch('/users/me/avatar', updateAvatar);

app.use('/', router);

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).send({ message: err.message });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`http://localhost:${PORT}`);
});
