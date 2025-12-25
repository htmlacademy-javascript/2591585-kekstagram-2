const SERVER_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';

const Routes = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Methods = {
  GET: 'GET',
  POST: 'POST',
};

const ErrorTexts = {
  [Methods.GET]: 'Не удалось загрузить данные. Попробуйте ещё раз',
  [Methods.POST]: 'Не удалось отправить данные формы',
};

const load = (route, method = Methods.GET, body = null) =>
  fetch(`${SERVER_URL}${route}`, { method, body })
    .then((response) => {
      if (!response.ok) {
        throw new Error(ErrorTexts[method]);
      }
      return response.json();
    });

const getData = () => load(Routes.GET_DATA);
const sendData = (body) => load(Routes.SEND_DATA, Methods.POST, body);

export { getData, sendData };
