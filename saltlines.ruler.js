// JavaScript function library meant to provide JavaScript quicker and easier access to
// CSS units like VH, VMIN, CH, PC, etc.
// this may not work in Internet Explorer or Safari due to some ES6 techniques I used.
// initially created by jpegzilla, on March 18th, 2019.

// create variables for all units we'll define
let vh, vw, vmin, vmax, ch, pc, em, rem, inch, cm, ppi, diag;

// create an empty object to put unit values in
let ruler = r = {};

// create a function to do the pythagorean theorem for me
const pythagorean = (a, b) => {
  return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

// method definitions for generating units
// call methods individually with 'new s.functionName'.
// when calling these methods in this way (like a constructor),
// the ruler object will be destructively(?) updated.
const saltlines = s = {
  viewPortUnits: function() {
    vh = window.innerHeight;
    vw = window.innerWidth;
    if (vh > vw) {
      vmin = vw;
      vmax = vh
    } else {
      vmin = vh;
      vmax = vw
    }
    let one_vmin = vmin / 100;
    let one_vmax = vmax / 100;
    let one_vh = vh / 100;
    let one_vw = vw / 100;

    ruler.one_vmin = one_vmin;
    ruler.one_vmax = one_vmax;
    ruler.vmin = vmin;
    ruler.vmax = vmax;
    ruler.one_vh = one_vh;
    ruler.one_vw = one_vw;
    ruler.vh = vh;
    ruler.vw = vw;

    return { one_vmin, vmin, one_vh, one_vw, one_vmax, vmax, vh, vw };
  },

  rootFontSize: function() {
    var fs = window.getComputedStyle(document.documentElement).getPropertyValue('font-size');
    fs = parseFloat(fs);
    fs = fs + "px"

    ruler.rootFontSize = fs;

    return { rootFontSize: fs };
  },

  windowSizes: function() {
    var fullWidth = screen.width;
    var fullHeight = screen.height;
    var windowWidth = window.innerWidth;
    var windowHeight = window.innerHeight;
    var windowDiag = pythagorean(windowWidth, windowHeight);

    ruler.fullWidth = fullWidth;
    ruler.fullHeight = fullHeight;
    ruler.windowWidth = windowWidth;
    ruler.windowHeight = windowHeight;
    ruler.windowDiag = windowDiag;

    return { fullWidth, fullHeight, windowWidth, windowHeight, windowDiag }
  },

  physicalUnits: function() {
    vh = window.innerHeight;
    vw = window.innerWidth;
    var newDiv = document.createElement('div');
    newDiv.style.cssText = "position: absolute;top: -1in;left: -1in;height: 1in;width: 1in;visibility: hidden;";
    newDiv.setAttribute('id', 'inch');

    document.body.appendChild(newDiv);

    var fullWidth = screen.width;
    var fullHeight = screen.height;
    var ppix = document.getElementById('inch').offsetWidth;
    var ppiy = document.getElementById('inch').offsetHeight;
    var inchHeight = fullHeight / ppiy;
    inchHeight = inchHeight.toFixed(2);
    inchHeight = Number(inchHeight);
    var inchWidth = fullWidth / ppix;
    inchWidth = inchWidth.toFixed(2);
    inchWidth = Number(inchWidth);
    var pt = ppix / 72;
    var pc = pt * 12;

    ruler.inchHeight = inchHeight;
    ruler.inchWidth = inchWidth;
    ruler.ppi = ppix;
    ruler.pt = pt;
    ruler.pc = pc;

    return { inchHeight, inchWidth, ppix, pt, pc };
  },

  unitList: function() {
    // if you're gonna console log a bunch of things,
    // at least make it look SORT OF good. that's what I always say.
    // sort of.
    console.groupCollapsed('%clist of all units (click to expand):', 'padding: 0 2em; background: inherit; color: inherit; font-size: 18px; font-family: Arial');
    var arr = Object.keys(ruler);
    for (var i = 0; i < arr.length; i++) {
      console.log(`%c ${arr[i]}`, 'margin-left: 24px; background: inherit; color: inherit; font-size: 12px; font-family: Courier')
    }
    console.groupEnd();
  }
}

function getAllUnits() {
  Object.values(s).map(value => {
    if(typeof value === 'function' && value.name !== 'unitList') {
      value.call();
    }
  })
}

// this function allows calling functions just by prepending a + sign.
Function.prototype.valueOf = function() {
  this.call(this);
  return 0;
};

window.onload = function() {
  getAllUnits();
}

window.addEventListener('resize', (e) => {
  // things to do when the window changes size, like updating computed values
  // for viewport units, etc.
  getAllUnits();
});
