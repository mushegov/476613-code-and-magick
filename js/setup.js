'use strict';

// -------------
// КОНСТАНТЫ
// -------------

// Количество требуемых случайных персонажей
var SIMILAR_WIZARDS_AMOUNT = 4;

// Коды клавиш
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Имена
var WIZARD_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон'
];

// Фамилии
var WIZARD_SURNAMES = [
  'да Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг'
];

// Цвета плаща
var WIZARD_COAT_COLORS = [
  'rgb(101, 137, 164)',
  'rgb(241, 43, 107)',
  'rgb(146, 100, 161)',
  'rgb(56, 159, 117)',
  'rgb(215, 210, 55)',
  'rgb(0, 0, 0)'
];

// Цвета глаз
var WIZARD_EYES_COLORS = [
  'black',
  'red',
  'blue',
  'yellow',
  'green'
];

// Цвета фаерболов
var WIZARD_FIREBALL_COLORS = [
  '#ee4830',
  '#30a8ee',
  '#5ce6c0',
  '#e848d5',
  '#e6e848'
];

// -------------


// -------------
// ПЕРЕМЕННЫЕ
// -------------

//
var setup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = setup.querySelector('.wizard-coat');
var wizardEyes = setup.querySelector('.wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

// -------------


// -------------
// ФУНКЦИИ
// -------------

// Выбираем случайный элемент из массива
var getRandomArrayElement = function (array) {
  var id = Math.floor(Math.random() * array.length);
  var element = array[id];

  return element;
};

// Генерируем массив случайных магов
var generateRandomWizardsArray = function (amount) {
  // Объявляем массив похожих персонажей
  var array = [];

  // и запонляем его случайными данными
  for (var i = 0; i < amount; i++) {
    var wizard = {
      name: getRandomArrayElement(WIZARD_NAMES) + ' ' + getRandomArrayElement(WIZARD_SURNAMES),
      coatColor: getRandomArrayElement(WIZARD_COAT_COLORS),
      eyesColor: getRandomArrayElement(WIZARD_EYES_COLORS)
    };

    array.push(wizard);
  }

  return array;
};

// Показываем окно "Настройки"
var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

// Скрываем окно "Настройки"
var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

// Проверяем открыто ли окно "Настройки"
var checkIsSetupOpen = function () {
  return setup.classList.contains('hidden') ? false : true;
};

// Генерируем DOM-элемент персонажа
var renderWizard = function (wizard, template) {
  // Создаем элемент из шаблона
  var element = template.cloneNode(true);

  // Записываем данные в элемент
  // Имя
  element.querySelector('.setup-similar-label').textContent = wizard.name;

  // Цвет плаща
  element.querySelector('.wizard-coat').style.fill = wizard.coatColor;

  // Цвет глаз
  element.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return element;
};

// Генерируем DOM-элемент списка персонажей
var renderSimilarWizards = function (array) {
  // Ищем шаблон похожего персонажа
  var template = document.querySelector('#similar-wizard-template').content;

  // Создаем фрагмент для списка похожих персонажей
  var fragment = document.createDocumentFragment();

  // Генерируем элемент для каждого персонажа и добавляем его во фрагмент
  for (var i = 0; i < array.length; i++) {
    var element = renderWizard(array[i], template);
    fragment.appendChild(element);
  }

  // Вставляем готовый фрагмент в DOM
  document.querySelector('.setup-similar-list').appendChild(fragment);
};

// Показываем блок "Похожие персонажи"
var showSimilarWizards = function () {
  document.querySelector('.setup-similar').classList.remove('hidden');
};

// Устанавливаем случайный цвет для плаща
var setRandomCoatColor = function () {
  wizardCoat.style.fill = getRandomArrayElement(WIZARD_COAT_COLORS);
};

// Устанавливаем случайный цвет для глаз
var setRandomEyesColor = function () {
  wizardEyes.style.fill = getRandomArrayElement(WIZARD_EYES_COLORS);
};

// Устанавливаем случайный цвет для глаз
var setRandomFireballColor = function () {
  wizardFireball.style.background = getRandomArrayElement(WIZARD_FIREBALL_COLORS);
};

// -------------


// -------------
// ОБРАБОТЧИКИ
// -------------

//
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE && !evt.target.classList.contains('setup-user-name')) {
    closeSetup();
  }
};

// -------------


// -------------
// СОБЫТИЯ
// -------------

// Открываем окно настроек по клику
setupOpen.addEventListener('click', function () {
  if (!checkIsSetupOpen()) {
    openSetup();
  }
});

// Открываем окно настроек через клавиатуру
setupOpen.addEventListener('keydown', function (evt) {
  if (!checkIsSetupOpen() && evt.keyCode === ENTER_KEYCODE) {
    openSetup();
  }
});

// Закрываем окно настроек по клику
setupClose.addEventListener('click', function () {
  closeSetup();
});

// Закрываем окно настроек через клавиатуру
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeSetup();
  }
});

//
wizardCoat.addEventListener('click', function () {
  setRandomCoatColor();
});

//
wizardEyes.addEventListener('click', function () {
  setRandomEyesColor();
});

//
wizardFireball.addEventListener('click', function () {
  setRandomFireballColor();
});

// -------------


// -------------
// ЗАДАЧИ
// -------------

// Генерируем массив случайных персонажей
var similarWizards = generateRandomWizardsArray(SIMILAR_WIZARDS_AMOUNT);

// Генерируем DOM-элемент списка персонажей
renderSimilarWizards(similarWizards);

// Показываем DOM-элемен списка персонажей
showSimilarWizards();
