/*
 * Zhizhong Liu <zhizhong.liu@loni.ucla.edu>
 * USC Laboratory of Neuro Imaging
 * http://www.loni.usc.edu
 * 
 * Under MIT License: http://www.opensource.org/licenses/mit-license.php
 */

// provides
goog.provide('X.parserDFS');

// requires
goog.require('X.event');
goog.require('X.parser');
goog.require('X.triplets');

/**
 * Create a parser for the .DFS format.
 * 
 * @constructor
 * @extends X.parser
 */
X.parserDFS = function() {

  //
  // call the standard constructor of X.base
  goog.base(this);
  
  //
  // class attributes
  
  /**
   * @inheritDoc
   * @const
   */
  this._classname = 'parserDFS';
  
  this._iscolor = false;
  
};
// inherit from X.parser
goog.inherits(X.parserDFS, X.parser);


/**
 * @inheritDoc
 */
X.parserDFS.prototype.parse = function(container, object, data, flag) {

  X.TIMER(this._classname + '.parse');
  
  this._data = data;
  
  var _version = this.scan('uchar', 12);
  if (_version[4] == 76) {
      window.console.log("L");
      this._littleEndian = true;
  } else {
      window.console.log("B");
      this._littleEndian = false;
  }
  
  var _headers = this.scan('uint', 12);
  var sizeof_hdr = _headers[0];
  var sizeof_tri = _headers[3];
  var sizeof_pts = _headers[4];
  var offset_normals = _headers[7];
  
  var _points = new X.triplets(sizeof_pts*3);
  var _triangles = new X.triplets(sizeof_tri*3);
  var _normals = new X.triplets(sizeof_pts*3);
  
  this.jumpTo(sizeof_hdr);
  
  for (var i = 0; i < sizeof_tri; i++) {
      var tri = this.scan('uint', 3);
      _triangles.add(tri[0], tri[1], tri[2]);
  }
  
  for (var i = 0; i < sizeof_pts; i++) {
      var ver = this.scan('float', 3);
      _points.add(ver[0], ver[1], ver[2]);
  }
  
  if (offset_normals > 0) {
      // has normals
      this.jumpTo(offset_normals);
      for (var i = 0; i < sizeof_pts; i++) {
          var ver = this.scan('float', 3);
          _normals.add(ver[0], ver[1], ver[2]);
      }
  }
  
  window.console.log("points=" + _points.count + " triangles=" + _triangles.count);

  var p = object._points = new X.triplets(data.byteLength);
  var n = object._normals = new X.triplets(data.byteLength);
  
  for (i = 0; i < _triangles.count; i++) {
    // get point
    var tri = _triangles.get(i);
    var p1 = _points.get(tri[0]);
    var p2 = _points.get(tri[1]);
    var p3 = _points.get(tri[2]);
    p.add(p1[0], p1[1], p1[2]);
    p.add(p2[0], p2[1], p2[2]);
    p.add(p3[0], p3[1], p3[2]);
    
    if (offset_normals > 0) {
        // use normal from file
        var n1 = _normals.get(tri[0]);
        var n2 = _normals.get(tri[1]);
        var n3 = _normals.get(tri[2]);
        n.add(n1[0], n1[1], n1[2]);
        n.add(n2[0], n2[1], n2[2]);
        n.add(n3[0], n3[1], n3[2]);
    } else {
        // calculate normal
        var ux = p2[0] - p1[0];
        var uy = p2[1] - p1[1];
        var uz = p2[2] - p1[2];
        var vx = p3[0] - p1[0];
        var vy = p3[1] - p1[1];
        var vz = p3[2] - p1[2];
        var cx = uy*vz - uz*vy;
        var cy = uz*vx - ux*vz;
        var cz = ux*vy - uy*vx;
        var dist = Math.sqrt(Math.pow(cx, 2) + Math.pow(cy, 2) + Math.pow(cz, 2));
        var nx = cx/dist;
        var ny = cy/dist;
        var nz = cz/dist;
        n.add(nx, ny, nz);
        n.add(nx, ny, nz);
        n.add(nx, ny, nz);
    }
    
  }
  
  X.TIMERSTOP(this._classname + '.parse');
  
  // the object should be set up here, so let's fire a modified event
  var modifiedEvent = new X.event.ModifiedEvent();
  modifiedEvent._object = object;
  modifiedEvent._container = container;
  this.dispatchEvent(modifiedEvent);
  
};

/**
 * Parses a line of .DFS data and modifies the given X.triplets containers.
 * 
 * @param {!X.triplets} p The object's points as a X.triplets container.
 * @param {!X.triplets} t The object's triangles as a X.triplets container.
 * @param {!Uint8Array} data The data to parse.
 * @param {!number} rangeStart The start of current range 
 * @param {!number} index The index of the current line.
 * @protected
 */
X.parserDFS.prototype.parseObject = function(p, t, c, data, rangeStart, index) {

  
};

// export symbols (required for advanced compilation)
goog.exportSymbol('X.parserDFS', X.parserDFS);
goog.exportSymbol('X.parserDFS.prototype.parse', X.parserDFS.prototype.parse);
