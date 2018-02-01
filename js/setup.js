'use strict';

// Находим окно с настройками и показываем его
document.querySelector('.setup').classList.remove('hidden');

// Массив исходных данных
// Имена
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

// Фамилии
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

// Цвета плаща
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

// Цвета глаз
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

// Генерируем случайно целое число между min и max значениями
var getRandomRoundNumber = function (min, max) {
  return Math.round(Math.random() * (max - min) + min);
};

// Объявляем массив похожих персонажей
var similarWizards = [];

//  и запонляем его случайным образом
for (var i = 0; i < 4; i++) {
  similarWizards[i] = {
    name: WIZARD_NAMES[getRandomRoundNumber(0, WIZARD_NAMES.length) - 1] + ' ' + WIZARD_SURNAMES[getRandomRoundNumber(0, WIZARD_SURNAMES.length - 1)],
    coatColor: WIZARD_COAT_COLORS[getRandomRoundNumber(0, WIZARD_COAT_COLORS.length - 1)],
    eyesColor: WIZARD_EYES_COLORS[getRandomRoundNumber(0, WIZARD_EYES_COLORS.length - 1)]
  };
}
