# saltlines.ruler.js

## what is this?

saltlines.ruler.js is a small JavaScript utility that creates an easier way to interface between CSS units of measurement and JavaScript. this is intended to make it easier to access things like viewport units and physical/print units in the context of JavaScript, aimed at web designers.

## how to use:


### initialize
in the head of your html file, write this:
```html
<script src="path/to/saltlines.ruler.js" charset="utf-8"></script>
```
or
```html
<script src="path/to/saltlines.ruler.min.js" charset="utf-8"></script>
```
### make sure it's working
go into your console, and type `r` or `ruler`. if this returns an object, you're good to go.

### access the units

to access units, for example, one vh as well as her sister unit vw, CSS units representing 1/100 of the current window's height and width (respectively), you'd do something like this:

```javascript
let my_vh_var = r.one_vh;
let my_vw_var = r.one_vw;
```

to get a list of all included units, please type this into your console:

```javascript
+s.unitList
```

it logs a list of all units available.

### other usage
if you need to manually update a set of values, or get just one set of values, or anything like that, then you can call an individual method within `saltlines` (s) similar to a constructor.

just use
```javascript
let my_units_object = new s.methodDefinition
// (this returns an object.)
```

where `methodDefinition ==` any of:

+ `physicalUnits` (for things like inches, points, and picas)

+ `windowSizes` (things like the size of both the window as well as the whole screen)

+ `rootFontSize` (returns the current document's root font size in pixels)

+ `viewPortUnits` (AKA the original reason I wrote this utility. gives easy access to viewport units like `vh`, `vmax`, `vmin`, etc.)

If you call any of these methods like
```javascript
let my_physical_units = new s.physicalUnits
```
then the `ruler` object will be updated permanently. also worth noting that if you resize the window, the units that are dependent on window size will be recalculated.

---

<dl>
  <dt>contributing</dt>
  <dd>
  if you want to contribute more units conversions, more functions to do useful calculations, or any cool additions that you think might fit this project, please don't hesitate to hit that pull request button!
  </dd>
  <dt>be warned!</dt>
  <dd>
  this utility may not work in Internet Explorer or if you can't use ES6! I also have not tested its behavior in Safari!
  </dd>
</dl>
