'use strict';

// -------------
// КОНСТАНТЫ
// -------------

// Количество требуемых случайных персонажей
var SIMILAR_WIZARDS_AMOUNT = 4;

// Имена
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

// Фамилии
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

// Цвета плаща
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

// Цвета глаз
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// -------------


// -------------
// ФУНКЦИИ
// -------------

// Выбираем случайный элемент из массива
var getRandomArrayElement = function (array) {
  var id = Math.floor(Math.random() * array.length);
  var element = array[id];

  // Удаляем уже использованный элемент из массива, чтобы все перснажи были уникальными
  // Нужно отключить если количество требуемых персонажей больше чем случайных значений(5)
  array.splice(id, 1);

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

// Показываем блок "Настройки"
var showSetup = function () {
  document.querySelector('.setup').classList.remove('hidden');
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
// -------------


// -------------
// Задачи
// -------------

// Показываем блок "Настройки"
showSetup();

// Генерируем массив случайных персонажей
var similarWizards = generateRandomWizardsArray(SIMILAR_WIZARDS_AMOUNT);

// Генерируем DOM-элемент списка персонажей
renderSimilarWizards(similarWizards);

// Показываем DOM-элемен списка персонажей
showSimilarWizards();
