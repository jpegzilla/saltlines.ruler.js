// create variables for all units we'll define
let vh, vw, vmin, vmax, ch, pc, em, rem, inch, cm, ppi, diag, aspectRatio;
vh = window.innerHeight;
vw = window.innerWidth;

// create an empty object to put unit values in
let ruler = {};

// create a function to do the pythagorean theorem for me
const py = (a, b) => Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));

// create a function to reduce fractions for me
const reduce = f => {
  for (let i = f[0]; i > 0; i--) {
    if (0 == f[0] % i && 0 == f[1] % i) {
      let n = f[0] / i;
      let d = f[1] / i;
      return { n, d };
    }
  }
};

// method definitions for generating units
// call methods individually with 'new saltlines.functionName'.
// when calling these methods in this way (like a constructor),
// the ruler object will be updated.
const saltlines = {
  viewPortUnits: function() {
    if (vh > vw) {
      vmin = ruler.vmin = vw;
      vmax = ruler.vmax = vh;
    } else {
      vmin = ruler.vmin = vh;
      vmax = ruler.vmax = vw;
    }
    let one_vmin = (ruler.one_vmin = vmin / 100);
    let one_vmax = (ruler.one_vmax = vmax / 100);
    let one_vh = (ruler.one_vh = vh / 100);
    let one_vw = (ruler.one_vw = vw / 100);

    ruler.vh = vh;
    ruler.vw = vw;

    return { one_vmin, vmin, one_vh, one_vw, one_vmax, vmax, vh, vw };
  },

  rootFontSize: function() {
    let fs = window
      .getComputedStyle(document.documentElement)
      .getPropertyValue("font-size");
    fs = parseFloat(fs);
    let fspx = fs + "px";

    ruler.rootFontSize = fs;
    ruler.rootFontSizePx = fspx;

    return { rootFontSize: fs, rootFontSizePx: fspx };
  },

  windowSizes: function() {
    let fullWidth = (ruler.fullWidth = screen.width);
    let fullHeight = (ruler.fullHeight = screen.height);
    let windowWidth = (ruler.windowWidth = window.innerWidth);
    let windowHeight = (ruler.windowHeight = window.innerHeight);
    let windowDiag = py(windowWidth, windowHeight);
    windowDiag = windowDiag.toFixed(2);
    ruler.windowDiag = Number(windowDiag);

    aspectRatio = reduce([fullWidth, fullHeight]);
    ruler.aspectRatio = `${aspectRatio.n}:${aspectRatio.d}`;

    return {
      fullWidth,
      fullHeight,
      windowWidth,
      windowHeight,
      windowDiag,
      aspectRatio
    };
  },

  physicalUnits: function() {
    let newDiv = document.createElement("div");
    newDiv.style.cssText =
      "position: absolute;top: -1in;left: -1in;height: 1in;width: 1in;visibility: hidden;";
    newDiv.setAttribute("id", "inch");

    document.body.appendChild(newDiv);

    let fullWidth = screen.width;
    let fullHeight = screen.height;
    let ppix = (ruler.ppi = document.getElementById("inch").offsetWidth);
    let ppiy = document.getElementById("inch").offsetHeight;
    let inchHeight = fullHeight / ppiy;
    inchHeight = inchHeight.toFixed(2);
    inchHeight = ruler.inchHeight = Number(inchHeight);
    let inchWidth = fullWidth / ppix;
    inchWidth = inchWidth.toFixed(2);
    inchWidth = ruler.inchWidth = Number(inchWidth);
    let pt = ppix / 72;
    pt = pt.toFixed(2);
    ruler.pt = Number(pt);
    let pc = (ruler.pc = pt * 12);
    document.body.removeChild(newDiv);
    return { inchHeight, inchWidth, ppix, pt, pc };
  },

  unitList: function() {
    // if you're gonna console log a bunch of things,
    // at least make it look SORT OF good. that's what I always say.
    console.groupCollapsed(
      "%clist of all units (click to expand):",
      "padding: 0 2em; background: inherit; color: inherit; font-size: 18px; font-family: Arial"
    );
    let arr = Object.keys(ruler);
    for (let i = 0; i < arr.length; i++) {
      console.log(
        `%c ${arr[i]}`,
        "margin-left: 24px; background: inherit; color: inherit; font-size: 12px; font-family: Courier"
      );
    }
    console.groupEnd();
  }
};

// executes every function in the saltlines object except the unitList function
function getAllUnits() {
  Object.values(saltlines).map(value => {
    if (typeof value === "function" && value.name !== "unitList") {
      value.call();
    }
  });
}

// +saltlines.unitList
Function.prototype.valueOf = function() {
  this.call(this);
  return 0;
};

// gets every unit as soon as the page loads
window.onload = () => getAllUnits();

// update units on browser size change
window.addEventListener("resize", () => getAllUnits());
