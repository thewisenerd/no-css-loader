var config = {
  width: {
    from: '40px',
    to: '0px',
  },
  height: {
    from: '40px',
    to: '0px',
  },
  "margin-left": {
    from: '-20px',
    to: '0px'
  },
  "margin-top": {
    from: '-20px',
    to: '0px'
  },
  opacity: {
    from: 1,
    to: 0
  },
};
var frames = 20;
var indent = '  ';


var handlers = [
  ["px", function(s) { return s.slice(s, -2) }]
];
var arr = {};
for (var key_idx in config) {

  var key = config[key_idx];

  var from = key.from;
  var to   = key.to;

  var iter;
  var iter_len = handlers.length;

  var p = {};

  if (typeof(from) !== typeof(to)) continue;

  if (!(typeof(from) == "number" || typeof(from) == "string"))  continue;
  if (!(typeof(to) == "number" || typeof(to) == "string")) continue;

  if (typeof(from) == "number") {
    p.from = from;
    p.to = to;
    p.units = '';
  } else {
    for (iter = 0; iter < iter_len; iter++) {
      var h = handlers[iter];

      if (from.endsWith(h[0])) {
        p.from = parseFloat(h[1](from));
        p.to = parseFloat(h[1](to));
        p.units = h[0];
      }
    }
  }

  arr[key_idx] = p;
}

String.prototype.repeat = function(n) {
  return new Array(1 + (n || 0)).join(this);
}

var genframes = function(config, frames, indent) {
  if (indent == undefined) {
    indent = '';
  }

  var inside_indent = '  ';

  var keyframes = '';
  for (var i = 0; i < frames + 1; i++) {

    var px = (frames - i)/frames;
    var py = i/frames;

    keyframes += indent + inside_indent + parseInt(Math.floor(py * 100)) + '% {' + "\n";

    for (var property in config) {
      var s = config[property];
      keyframes += indent + inside_indent + '  ' + property + ': ' + ((s.from - s.to) * px) + s.units + ';' + "\n";
    }

    keyframes += indent + inside_indent + '}' + "\n";

  } // frames

  var seed = Math.floor(Math.random() * Math.pow(10, 5));

  console.log (indent + '.my-css-class {');
  console.log (indent + '  -webkit-animation: cssAnimation' + seed + ' 0.4s ease-in 5.2s forwards;');
  console.log (indent + '     -moz-animation: cssAnimation' + seed + ' 0.4s ease-in 5.2s forwards;');
  console.log (indent + '       -o-animation: cssAnimation' + seed + ' 0.4s ease-in 5.2s forwards;');
  console.log (indent + '          animation: cssAnimation' + seed + ' 0.4s ease-in 5.2s forwards;');
  console.log (indent + '');
  console.log (indent + '  -webkit-animation-fill-mode: forwards;');
  console.log (indent + '  animation-fill-mode: forwards;');
  console.log (indent + '}');

  console.log( indent + '@keyframes cssAnimation' +  seed + ' {' );
  console.log(keyframes);
  console.log( indent + '}' );

  console.log( indent + '@-webkit-keyframes cssAnimation' +  seed + ' {' );
  console.log(keyframes);
  console.log( indent + '}' );

} // genframes



/* call!! */
genframes(arr, frames);
