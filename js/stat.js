'use strict';

// объявляем переменные и константы

// размеры холста
var CANVAS_WIDTH = 700;
var CANVAS_HEIGHT = 300;

// размеры окна
var windowWidth;
var WINDOW_HEIGHT = 270;
var WINDOW_SHADOW_WIDTH = 10;
var WINDOW_PADDING = 40;
var HEADING_OFFSET = 10;

// размеры плашек
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 100;
var BAR_GAP = 50;

// цвета
var WINDOW_BACKGROUND_COLOR = '#ffffff';
var WINDOW_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var DEFAULT_TEXT_COLOR = '#000000';
var PLAYER_BAR_COLOR = 'rgba(255, 0, 0, 1)';

// шрифты
var DEFAULT_FONT = 'PT Mono';
var DEFAULT_FONT_SIZE = '16px';
var DEFAULT_LINE_HEIGHT = 20;


var calculateWindowWidth = function (amountOfBars) {
  var width = WINDOW_PADDING * 2 + BAR_WIDTH * amountOfBars + BAR_GAP * (amountOfBars - 1);

  return width;
};

var calculateWindowStartCoords = function (width, height) {
  var startCoords = {};

  startCoords.x = (CANVAS_WIDTH - width) / 2;
  startCoords.y = (CANVAS_HEIGHT - height) / 2;

  return startCoords;
};

var renderRect = function (ctx, x, y, width, height, color) {
  color = color || DEFAULT_TEXT_COLOR;

  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

var renderLabel = function (ctx, text, x, y, color) {
  color = color || DEFAULT_TEXT_COLOR;

  ctx.fillStyle = color;
  ctx.font = DEFAULT_FONT + DEFAULT_FONT_SIZE;
  ctx.textBaseline = 'hanging';
  ctx.fillText(text, x, y);
};

var calculateBestResult = function (results) {
  var bestResult = results[0];

  for (var i = 1; i < results.length; i++) {
    if (results[i] > bestResult) {
      bestResult = results[i];
    }
  }

  return bestResult;
};

var getRandomOpacity = function (min, max) {
  return Math.random() * (max - min) + min;
};

window.renderStatistics = function (ctx, names, times) {
  // узнаем количество игроков
  var amountOfPlayers = names.length;

  // определяем ширину окна исходя из количества игроков
  windowWidth = calculateWindowWidth(amountOfPlayers);

  // определяем начальные координаты окна
  var startCoords = calculateWindowStartCoords(windowWidth, WINDOW_HEIGHT);

  // рисуем тень
  renderRect(ctx, startCoords.x + WINDOW_SHADOW_WIDTH, startCoords.y + WINDOW_SHADOW_WIDTH, windowWidth, WINDOW_HEIGHT, WINDOW_SHADOW_COLOR);

  // рисуем окно
  renderRect(ctx, startCoords.x, startCoords.y, windowWidth, WINDOW_HEIGHT, WINDOW_BACKGROUND_COLOR);

  // рисуем заголовок
  renderLabel(ctx, 'Ура вы победили!', startCoords.x + WINDOW_PADDING - HEADING_OFFSET, startCoords.y + WINDOW_PADDING - HEADING_OFFSET, DEFAULT_TEXT_COLOR);
  renderLabel(ctx, 'Список результатов:', startCoords.x + WINDOW_PADDING - HEADING_OFFSET, startCoords.y + WINDOW_PADDING + DEFAULT_LINE_HEIGHT - HEADING_OFFSET, DEFAULT_TEXT_COLOR);

  // вычисляем лучший результат
  var bestResult = calculateBestResult(times);

  // рисуем результаты
  for (var i = 0; i < amountOfPlayers; i++) {
    // посчитаем координату Х один раз, потому что она общая для всех расчетов
    var coordX = startCoords.x + WINDOW_PADDING + (BAR_GAP + BAR_WIDTH) * i;

    // определяем высоту плашки относительно лучшего результата
    var barHeight = (times[i] * BAR_MAX_HEIGHT) / bestResult;

    // определяем цвет плашки в зависимости от игрока
    var barColor = names[i] === 'Вы' ? PLAYER_BAR_COLOR : 'rgba(0, 0, 255, ' + getRandomOpacity(0.2, 1) + ')';

    // рисуем результат
    renderLabel(ctx, Math.round(times[i]), coordX, startCoords.y + WINDOW_HEIGHT - WINDOW_PADDING - DEFAULT_LINE_HEIGHT - barHeight - DEFAULT_LINE_HEIGHT, DEFAULT_TEXT_COLOR);

    // рисуем плашку
    renderRect(ctx, coordX, startCoords.y + WINDOW_HEIGHT - WINDOW_PADDING - DEFAULT_LINE_HEIGHT - barHeight, BAR_WIDTH, barHeight, barColor);

    // рисуем имя
    renderLabel(ctx, names[i], coordX, startCoords.y + WINDOW_HEIGHT - WINDOW_PADDING, DEFAULT_TEXT_COLOR);
  }
};
