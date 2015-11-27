'use strict';

var range = require('range').range;

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
    placeDot(dot, {
      left: mouse.x - 60 * 45 / 60 * Math.sin(2 * mouse.x / 60) + 60 * 9 / 60 * Math.sin(4 * mouse.x / 60) - 60 * 1 / 60 * Math.sin(6 * mouse.x / 60),
      top: mouse.y - 60 * 45 / 60 * Math.sin(2 * mouse.y / 60) + 60 * 9 / 60 * Math.sin(4 * mouse.y / 60) - 60 * 1 / 60 * Math.sin(6 * mouse.y / 60),
    });
  };
  
  window.requestAnimationFrame(function x() {
    window.requestAnimationFrame(x);
    draw();
  });
  
  var gridSize = 2 * Math.PI * 30;
  
  var rows = 1 + Math.floor(window.innerHeight / gridSize);
  var cols = 1 + Math.floor(window.innerWidth / gridSize);
  
  range(rows).forEach(function(i) {
    range(cols).forEach(function(j) {
      document.body.appendChild(Dot({
        color: 'orange',
        radius: 15,
        top: i * gridSize,
        left: j * gridSize,
        zIndex: -1
      }));
    });
  });
});
