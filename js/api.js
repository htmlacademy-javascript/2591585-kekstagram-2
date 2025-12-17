const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const methods = {
  GET: 'GET',
  POST: 'POST',
};

const errorTexts = {
  [methods.GET]: 'Не удалось загрузить данные. Попробуйте ещё раз',
  [methods.POST]: 'Не удалось отправить данные формы',
};

const load = (route, method = methods.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(errorTexts[method]);
      }
      return response.json();
    });

const getData = () => load(routes.GET_DATA);
const sendData = (body) => load(routes.SEND_DATA, methods.POST, body);

export { getData, sendData };
