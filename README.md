# The X Toolkit: <i>WebGL&trade; for Scientific Visualization</i>

* <b>XTK is <i>easy</i>, <i>lightweight</i> and <i>fast</i> !</b>
 * Native reading of a <i><b>variety of scientific file formats</b></i><br>
 * <i><b>Volume rendering, thresholding and cross-sectional slicing</b></i> of 3d image data<br>
 * <i><b>Label maps, color tables and surface overlays</b></i> are supported, as well as <i><a href="http://evanw.github.com/csg.js/" target="_blank">Constructive Solid Geometry</a></i><br>
 * CDash + Google Closure driven build and test system



## Example Usage ##

```javascript
// create a new 3d renderer
var r = new X.renderer3D();
r.init();
    
// create a mesh from a .vtk file
var skull = new X.mesh();
skull.file = 'skull.vtk';
    
// add the object
r.add(skull);
    
// .. and render it
r.render();
```

## Development ##
To compile the code, type
```shell
cd utils/
./build.py
```
xtk.js will be generated. 

## License ##
Copyright (c) 2012 The X Toolkit Developers  \<dev@goXTK.com>

The X Toolkit (XTK) is licensed under the MIT License:
  <a href="http://www.opensource.org/licenses/mit-license.php" target="_blank">http://www.opensource.org/licenses/mit-license.php</a>

 
