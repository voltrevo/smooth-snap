'use strict';

var InfoOverlay = require('info-overlay');
var range = require('range').range;
var readmeHtml = require('./README.md');
var Ribbon = require('./ribbon.html');

require('./style.css');

var placeDot = function(dot, opt) {
  dot.style.transform = 'translate(' + (opt.left || 0) + 'px, ' + (opt.top || 0) + 'px)';
};

var Dot = function(opt) {
  var dot = document.createElement('div');
  dot.style.backgroundColor = opt.color || 'blue';
  dot.style.left = '0px';
  dot.style.top = '0px';
  dot.style.position = 'absolute';

  var radius = opt.radius || 10;

  dot.style.borderRadius = '50%';
  dot.style.width = 2 * radius + 'px';
  dot.style.height = 2 * radius + 'px';

  dot.style.marginLeft = - radius + 'px';
  dot.style.marginTop = - radius + 'px';

  placeDot(dot, opt);

  if (opt.zIndex !== undefined) {
    dot.style.zIndex = opt.zIndex;
  }

  return dot;
};

window.addEventListener('load', function() {
  var dot = Dot({ color: 'blue' });
  document.body.appendChild(dot);

  var mouse = {left: 0, top: 0};

  document.addEventListener('mousemove', function(evt) {
    mouse.x = evt.pageX;
    mouse.y = evt.pageY;
  });

  var draw = function() {
    var x = 2 * (mouse.x - 30 * Math.PI) / 60;
    var y = 2 * (mouse.y - 30 * Math.PI) / 60;

    placeDot(dot, {
      left: mouse.x - 60 * 45 / 60 * Math.sin(x) + 60 * 9 / 60 * Math.sin(2 * x) - 60 * 1 / 60 * Math.sin(3 * x),
      top: mouse.y - 60 * 45 / 60 * Math.sin(y) + 60 * 9 / 60 * Math.sin(2 * y) - 60 * 1 / 60 * Math.sin(3 * y),
    });
  };

  window.requestAnimationFrame(function x() {
    window.requestAnimationFrame(x);
    draw();
  });

  var gridSize = 2 * Math.PI * 30;

  var rows = 1 + Math.floor(window.innerHeight / gridSize - 0.5);
  var cols = 1 + Math.floor(window.innerWidth / gridSize - 0.5);

  range(rows).forEach(function(i) {
    range(cols).forEach(function(j) {
      document.body.appendChild(Dot({
        color: 'orange',
        radius: 15,
        top: (i + 0.5) * gridSize,
        left: (j + 0.5) * gridSize,
        zIndex: -1
      }));
    });
  });

  var infoOverlay = InfoOverlay();
  infoOverlay.overlay.innerHTML = Ribbon().outerHTML + '\n' + readmeHtml;

  document.body.appendChild(infoOverlay.icon);
});
