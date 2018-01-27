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

// размеры плашек
var BAR_WIDTH = 40;
var BAR_MAX_HEIGHT = 100;
var BAR_GAP = 50;

// цвета
var WINDOW_BACKGROUND_COLOR = '#ffffff';
var WINDOW_SHADOW_COLOR = 'rgba(0, 0, 0, 0.7)';
var DEFAULT_TEXT_COLOR = '#000000';
// var DEFAULT_BAR_COLOR = '#00ffff';
// var PLAYER_BAR_COLOR = '#ff0000';

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

window.renderStatistics = function (ctx, names, times) {
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
  renderLabel(ctx, 'Ура вы победили!', startCoords.x + WINDOW_PADDING, startCoords.y + WINDOW_PADDING, DEFAULT_TEXT_COLOR);
  renderLabel(ctx, 'Список результатов:', startCoords.x + WINDOW_PADDING, startCoords.y + WINDOW_PADDING + DEFAULT_LINE_HEIGHT, DEFAULT_TEXT_COLOR);

  // рисуем результаты
  // for (var i = 0; i < amountOfPlayers; i++) {
  //   renderLabel(ctx, names[i] + Math.round(times[i]), startCoords.x + WINDOW_PADDING, startCoords.y + WINDOW_PADDING + 60 + i * DEFAULT_LINE_HEIGHT, DEFAULT_TEXT_COLOR);
  // }

  renderLabel(ctx, names[0], startCoords.x + WINDOW_PADDING, startCoords.y + WINDOW_HEIGHT - WINDOW_PADDING, '#bada55');
  renderRect(ctx, startCoords.x + WINDOW_PADDING, startCoords.y + WINDOW_HEIGHT - WINDOW_PADDING - DEFAULT_LINE_HEIGHT - BAR_MAX_HEIGHT, BAR_WIDTH, BAR_MAX_HEIGHT, '#bada55');
};
