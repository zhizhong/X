/*
 * Zhizhong Liu <zhizhong.liu@loni.usc.edu>
 * USC Laboratory of Neuro Imaging
 * http://www.loni.usc.edu
 * 
 * Under MIT License: http://www.opensource.org/licenses/mit-license.php
 */

// provides
goog.provide('X.parserDX');

// requires
goog.require('X.event');
goog.require('X.parser');
goog.require('X.triplets');

/**
 * Create a parser for the .DX format.
 * 
 * @constructor
 * @extends X.parser
 */
X.parserDX = function() {

  //
  // call the standard constructor of X.base
  goog.base(this);
  
  //
  // class attributes
  
  /**
   * @inheritDoc
   * @const
   */
  this._classname = 'parserDX';
  
  this._iscolor = false;
  
};
// inherit from X.parser
goog.inherits(X.parserDX, X.parser);


/**
 * @inheritDoc
 */
X.parserDX.prototype.parse = function(container, object, data, flag) {

  X.TIMER(this._classname + '.parse');
  
  this._data = data;
  
  var _data = this.scan('uchar', data.byteLength);
  
  // the number of triangles
  var _size = 0;
  
  var _points = new X.triplets(data.byteLength);
  var _triangles = new X.triplets(data.byteLength);
  var _colors = new Float32Array(data.byteLength);
  
  // store the beginning of a byte range
  var _rangeStart = 0;
  var i = 0;
  while (i < _data.length) {
    
    if (_data[i] == 10) {
        // line break
        
        var line = String.fromCharCode.apply(null, _data.subarray(
            _rangeStart, i));
        
        if (!line) {
            i++;
            _rangeStart = i;
            continue;
        }
        
        line = line.replace(/^\s+|\s+$/g, '');
        
        var lineFields = line.split(' ');
        if (lineFields[0] == 'object') {
           this.parseObject(_points, _triangles, _colors, _data, _rangeStart, i);
        }
        
        _rangeStart = i + 1;
        
    }
    
    i++;
  }
  
  window.console.log("points=" + _points.count + " triangles=" + _triangles.count);

  var p = object._points = new X.triplets(data.byteLength);
  var n = object._normals = new X.triplets(data.byteLength);
  if (this._iscolor) {
    var c = object._colors = new X.triplets(data.byteLength);
  }
  
  var rgb = new X.triplets(256*3);
  rgb.add(   0,   0,   0 );
         rgb.add(  45,   0,  36 );
         rgb.add(  56,   0,  46 );
         rgb.add(  60,   0,  49 );
         rgb.add(  67,   0,  54 );
         rgb.add(  70,   0,  59 );
         rgb.add(  71,   0,  61 );
         rgb.add(  75,   0,  68 );
         rgb.add(  74,   0,  73 );
         rgb.add(  74,   0,  77 );
         rgb.add(  73,   0,  81 );
         rgb.add(  71,   0,  87 );
         rgb.add(  69,   1,  90 );
         rgb.add(  68,   2,  94 );
         rgb.add(  66,   3,  97 );
         rgb.add(  63,   6, 102 );
         rgb.add(  61,   7, 106 );
         rgb.add(  58,  10, 109 );
         rgb.add(  56,  12, 113 );
         rgb.add(  53,  15, 116 );
         rgb.add(  48,  18, 119 );
         rgb.add(  47,  20, 121 );
         rgb.add(  44,  23, 124 );
         rgb.add(  41,  27, 128 );
         rgb.add(  40,  28, 129 );
         rgb.add(  37,  32, 132 );
         rgb.add(  34,  36, 134 );
         rgb.add(  29,  43, 137 );
         rgb.add(  25,  52, 138 );
         rgb.add(  24,  57, 139 );
         rgb.add(  24,  62, 141 );
         rgb.add(  24,  64, 142 );
         rgb.add(  23,  65, 142 );
         rgb.add(  23,  69, 143 );
         rgb.add(  23,  71, 142 );
         rgb.add(  23,  71, 142 );
         rgb.add(  23,  73, 142 );
         rgb.add(  23,  75, 142 );
         rgb.add(  23,  75, 142 );
         rgb.add(  23,  78, 142 );
         rgb.add(  23,  80, 142 );
         rgb.add(  23,  80, 142 );
         rgb.add(  23,  82, 141 );
         rgb.add(  23,  85, 141 );
         rgb.add(  23,  85, 141 );
         rgb.add(  23,  87, 140 );
         rgb.add(  23,  87, 140 );
         rgb.add(  24,  90, 140 );
         rgb.add(  24,  90, 140 );
         rgb.add(  24,  93, 139 );
         rgb.add(  24,  93, 139 );
         rgb.add(  24,  93, 139 );
         rgb.add(  24,  93, 139 );
         rgb.add(  24,  97, 139 );
         rgb.add(  24,  97, 139 );
         rgb.add(  25, 101, 138 );
         rgb.add(  25, 101, 138 );
         rgb.add(  25, 104, 137 );
         rgb.add(  25, 104, 137 );
         rgb.add(  25, 104, 137 );
         rgb.add(  26, 108, 137 );
         rgb.add(  26, 108, 137 );
         rgb.add(  27, 111, 136 );
         rgb.add(  27, 111, 136 );
         rgb.add(  27, 111, 136 );
         rgb.add(  27, 115, 135 );
         rgb.add(  27, 115, 135 );
         rgb.add(  28, 118, 134 );
         rgb.add(  28, 118, 134 );
         rgb.add(  29, 122, 133 );
         rgb.add(  29, 122, 133 );
         rgb.add(  29, 122, 133 );
         rgb.add(  29, 122, 133 );
         rgb.add(  29, 125, 132 );
         rgb.add(  29, 125, 132 );
         rgb.add(  30, 128, 131 );
         rgb.add(  30, 128, 131 );
         rgb.add(  31, 131, 130 );
         rgb.add(  31, 131, 130 );
         rgb.add(  31, 131, 130 );
         rgb.add(  32, 134, 128 );
         rgb.add(  32, 134, 128 );
         rgb.add(  33, 137, 127 );
         rgb.add(  33, 137, 127 );
         rgb.add(  33, 137, 127 );
         rgb.add(  34, 140, 125 );
         rgb.add(  34, 140, 125 );
         rgb.add(  35, 142, 123 );
         rgb.add(  35, 142, 123 );
         rgb.add(  36, 145, 121 );
         rgb.add(  36, 145, 121 );
         rgb.add(  36, 145, 121 );
         rgb.add(  37, 147, 118 );
         rgb.add(  37, 147, 118 );
         rgb.add(  38, 150, 116 );
         rgb.add(  38, 150, 116 );
         rgb.add(  40, 152, 113 );
         rgb.add(  40, 152, 113 );
         rgb.add(  41, 154, 111 );
         rgb.add(  41, 154, 111 );
         rgb.add(  42, 156, 108 );
         rgb.add(  42, 156, 108 );
         rgb.add(  43, 158, 106 );
         rgb.add(  43, 158, 106 );
         rgb.add(  43, 158, 106 );
         rgb.add(  45, 160, 104 );
         rgb.add(  45, 160, 104 );
         rgb.add(  46, 162, 101 );
         rgb.add(  46, 162, 101 );
         rgb.add(  48, 164,  99 );
         rgb.add(  48, 164,  99 );
         rgb.add(  50, 166,  97 );
         rgb.add(  50, 166,  97 );
         rgb.add(  51, 168,  95 );
         rgb.add(  53, 170,  93 );
         rgb.add(  53, 170,  93 );
         rgb.add(  53, 170,  93 );
         rgb.add(  55, 172,  91 );
         rgb.add(  55, 172,  91 );
         rgb.add(  57, 174,  88 );
         rgb.add(  57, 174,  88 );
         rgb.add(  59, 175,  86 );
         rgb.add(  62, 177,  84 );
         rgb.add(  64, 178,  82 );
         rgb.add(  64, 178,  82 );
         rgb.add(  67, 180,  80 );
         rgb.add(  67, 180,  80 );
         rgb.add(  69, 181,  79 );
         rgb.add(  72, 183,  77 );
         rgb.add(  72, 183,  77 );
         rgb.add(  72, 183,  77 );
         rgb.add(  75, 184,  76 );
         rgb.add(  77, 186,  74 );
         rgb.add(  80, 187,  73 );
         rgb.add(  83, 189,  72 );
         rgb.add(  87, 190,  72 );
         rgb.add(  91, 191,  71 );
         rgb.add(  95, 192,  70 );
         rgb.add(  99, 193,  70 );
         rgb.add( 103, 194,  70 );
         rgb.add( 107, 195,  70 );
         rgb.add( 111, 196,  70 );
         rgb.add( 111, 196,  70 );
         rgb.add( 115, 196,  70 );
         rgb.add( 119, 197,  70 );
         rgb.add( 123, 197,  70 );
         rgb.add( 130, 198,  71 );
         rgb.add( 133, 199,  71 );
         rgb.add( 137, 199,  72 );
         rgb.add( 140, 199,  72 );
         rgb.add( 143, 199,  73 );
         rgb.add( 143, 199,  73 );
         rgb.add( 147, 199,  73 );
         rgb.add( 150, 199,  74 );
         rgb.add( 153, 199,  74 );
         rgb.add( 156, 199,  75 );
         rgb.add( 160, 200,  76 );
         rgb.add( 167, 200,  78 );
         rgb.add( 170, 200,  79 );
         rgb.add( 173, 200,  79 );
         rgb.add( 173, 200,  79 );
         rgb.add( 177, 200,  80 );
         rgb.add( 180, 200,  81 );
         rgb.add( 183, 199,  82 );
         rgb.add( 186, 199,  82 );
         rgb.add( 190, 199,  83 );
         rgb.add( 196, 199,  85 );
         rgb.add( 199, 198,  85 );
         rgb.add( 199, 198,  85 );
         rgb.add( 203, 198,  86 );
         rgb.add( 206, 197,  87 );
         rgb.add( 212, 197,  89 );
         rgb.add( 215, 196,  90 );
         rgb.add( 218, 195,  91 );
         rgb.add( 224, 194,  94 );
         rgb.add( 224, 194,  94 );
         rgb.add( 230, 193,  96 );
         rgb.add( 233, 192,  98 );
         rgb.add( 236, 190, 100 );
         rgb.add( 238, 189, 104 );
         rgb.add( 240, 188, 106 );
         rgb.add( 240, 188, 106 );
         rgb.add( 242, 187, 110 );
         rgb.add( 244, 185, 114 );
         rgb.add( 245, 184, 116 );
         rgb.add( 247, 183, 120 );
         rgb.add( 248, 182, 123 );
         rgb.add( 248, 182, 123 );
         rgb.add( 250, 181, 125 );
         rgb.add( 251, 180, 128 );
         rgb.add( 252, 180, 130 );
         rgb.add( 253, 180, 133 );
         rgb.add( 253, 180, 133 );
         rgb.add( 254, 180, 134 );
         rgb.add( 254, 179, 138 );
         rgb.add( 255, 179, 142 );
         rgb.add( 255, 179, 145 );
         rgb.add( 255, 179, 145 );
         rgb.add( 255, 179, 152 );
         rgb.add( 255, 180, 161 );
         rgb.add( 255, 180, 164 );
         rgb.add( 255, 180, 167 );
         rgb.add( 255, 180, 167 );
         rgb.add( 255, 181, 169 );
         rgb.add( 255, 181, 170 );
         rgb.add( 255, 182, 173 );
         rgb.add( 255, 183, 176 );
         rgb.add( 255, 183, 176 );
         rgb.add( 255, 184, 179 );
         rgb.add( 255, 185, 179 );
         rgb.add( 255, 185, 182 );
         rgb.add( 255, 186, 182 );
         rgb.add( 255, 186, 182 );
         rgb.add( 255, 187, 185 );
         rgb.add( 255, 188, 185 );
         rgb.add( 255, 189, 188 );
         rgb.add( 255, 189, 188 );
         rgb.add( 255, 190, 188 );
         rgb.add( 255, 191, 191 );
         rgb.add( 255, 192, 191 );
         rgb.add( 255, 194, 194 );
         rgb.add( 255, 194, 194 );
         rgb.add( 255, 197, 197 );
         rgb.add( 255, 198, 198 );
         rgb.add( 255, 200, 200 );
         rgb.add( 255, 201, 201 );
         rgb.add( 255, 201, 201 );
         rgb.add( 255, 202, 202 );
         rgb.add( 255, 203, 203 );
         rgb.add( 255, 205, 205 );
         rgb.add( 255, 206, 206 );
         rgb.add( 255, 206, 206 );
         rgb.add( 255, 208, 208 );
         rgb.add( 255, 209, 209 );
         rgb.add( 255, 211, 211 );
         rgb.add( 255, 215, 215 );
         rgb.add( 255, 216, 216 );
         rgb.add( 255, 216, 216 );
         rgb.add( 255, 218, 218 );
         rgb.add( 255, 219, 219 );
         rgb.add( 255, 221, 221 );
         rgb.add( 255, 223, 223 );
         rgb.add( 255, 226, 226 );
         rgb.add( 255, 228, 228 );
         rgb.add( 255, 230, 230 );
         rgb.add( 255, 230, 230 );
         rgb.add( 255, 232, 232 );
         rgb.add( 255, 235, 235 );
         rgb.add( 255, 237, 237 );
         rgb.add( 255, 240, 240 );
         rgb.add( 255, 243, 243 );
         rgb.add( 255, 246, 246 );
         rgb.add( 255, 249, 249 );
         rgb.add( 255, 251, 251 );
         rgb.add( 255, 253, 253 );
         rgb.add( 255, 255, 255 );
  
  for (i = 0; i < _triangles.count; i++) {
    // get point
    var tri = _triangles.get(i);
    var p1 = _points.get(tri[0]);
    var p2 = _points.get(tri[1]);
    var p3 = _points.get(tri[2]);
    p.add(p1[0], p1[1], p1[2]);
    p.add(p2[0], p2[1], p2[2]);
    p.add(p3[0], p3[1], p3[2]);
    
    // find normal
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
    
    if (this._iscolor) {
        // get colors
        var c0 = _colors[tri[0]];
        var c_index = Math.floor(c0*255);
        var c_val = rgb.get(c_index);
        c.add(c_val[0]/255, c_val[1]/255, c_val[2]/255);
        // var cc0 = new Float32Array(3);
        // var tmp_c = c0*16777216;
        // cc0[0] = tmp_c%256/256;
        // tmp_c = tmp_c/256;
        // cc0[1] = tmp_c%256/256;
        // tmp_c = tmp_c/256;
        // cc0[2] = tmp_c%256/256;
        // c.add(cc0[0], cc0[1], cc0[2]);
        
        var c1 = _colors[tri[1]];
        c_index = Math.floor(c1*255);
        c_val = rgb.get(c_index);
        c.add(c_val[0]/255, c_val[1]/255, c_val[2]/255);
        // var cc1 = new Float32Array(3);
        // tmp_c= c1*16777216;
        // cc1[0] = tmp_c%256/256;
        // tmp_c = tmp_c/256;
        // cc1[1] = tmp_c%256/256;
        // tmp_c = tmp_c/256;
        // cc1[2] = tmp_c%256/256;
        // c.add(cc1[0], cc1[1], cc1[2]);
        
        var c2 = _colors[tri[2]];
        c_index = Math.floor(c2*255);
        c_val = rgb.get(c_index);
        c.add(c_val[0]/255, c_val[1]/255, c_val[2]/255);
        // var cc2 = new Float32Array(3);
        // tmp_c= c2*16777216;
        // cc2[0] = tmp_c%256/256;
        // tmp_c = tmp_c/256;
        // cc2[1] = tmp_c%256/256;
        // tmp_c = tmp_c/256;
        // cc2[2] = tmp_c%256/256;
        // c.add(cc2[0], cc2[1], cc2[2]);
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
 * Parses a line of .DX data and modifies the given X.triplets containers.
 * 
 * @param {!X.triplets} p The object's points as a X.triplets container.
 * @param {!X.triplets} t The object's triangles as a X.triplets container.
 * @param {!Uint8Array} data The data to parse.
 * @param {!number} rangeStart The start of current range 
 * @param {!number} index The index of the current line.
 * @protected
 */
X.parserDX.prototype.parseObject = function(p, t, c, data, rangeStart, index) {

  // grab the current line
  var line = String.fromCharCode.apply(null, data.subarray(rangeStart, index))
    .replace(/^\s+|\s+$/g, '');
        
  // read first line
  var lineFields = line.split(' ');
  var size = 0;
  var type = null;
  
  for (var i = 0; i < lineFields.length; i++) {
    var field = lineFields[i];
    if (field == 'type') {
        i++;
        type = lineFields[i];
    } else if (field == 'items') {
        i++;
        size = parseInt(lineFields[i], 10);
    } else if (field == 'shape') {
        i++;
        var value = lineFields[i];
        if (value != '3' && value != '1')  {
            return;
        }
        if (value == '1') {
            this._iscolor = true;
        }
    }
  }
  
  if (size == 0 || type == null) {
    return;
  }
  
  var objectArray = new X.triplets(size * 3);
  
  index ++;
  rangeStart = index;
  // read contents
  var count = 0;
  while (index < data.length) {
    if (data[index] == 10) {
        // line break
        
        line = String.fromCharCode.apply(null, data.subarray(rangeStart, index));
        
        if (!line) {
            index++;
            rangeStart = i;
            continue;
        }
        
        line = line.replace(/^\s+|\s+$/g, '');
        lineFields = line.split(' ');
        
        if (type == 'float') {
            var x = parseFloat(lineFields[0]);
            var y = parseFloat(lineFields[1]);
            var z = parseFloat(lineFields[2]);
            var id = objectArray.add(x, y, z);
        } else if (type == 'int') {
            var x = parseInt(lineFields[0], 10);
            var y = parseInt(lineFields[1], 10);
            var z = parseInt(lineFields[2], 10);
            var id = objectArray.add(x, y, z);
        }
        count++;
        rangeStart = index + 1;
    }
    index++;
    if (count >= size) {
        // finished all contents
        break;
    }
  }
  
  // read footers
  while (index < data.length) {
    if (data[index] == 10) {
        
        line = String.fromCharCode.apply(null, data.subarray(rangeStart, index));
        
        if (!line) {
            index++;
            rangeStart = i;
            return;
        }
        
        line = line.replace(/^\s+|\s+$/g, '');
        if (line.indexOf("\"dep\"") != -1 && line.indexOf("\"positions\"") != -1) {
            // points
           var i = 0;
           if (this._iscolor) {
               for (i = 0; i < objectArray.count; i++) {
                 var arr = objectArray.get(i);
                 c[i] = arr[0];
               }
           } else {
               for (i = 0; i < objectArray.count; i++) {
                 var arr = objectArray.get(i);
                 p.add(arr[0], arr[1], arr[2]);
               }
           }
           index++;
           rangeStart = i;
           return;
        } else if (line.indexOf("\"dep\"") != -1 && line.indexOf("\"connections\"") != -1) {
            // triangles
            for (var i = 0; i < objectArray.count; i++) {
              var arr = objectArray.get(i);
              t.add(arr[0], arr[1], arr[2]);
            }
            index++;
            rangeStart = i;
            return;
        }
        rangeStart = index + 1;
     }
     
     index++;
  }
  
  
};



// export symbols (required for advanced compilation)
goog.exportSymbol('X.parserDX', X.parserDX);
goog.exportSymbol('X.parserDX.prototype.parse', X.parserDX.prototype.parse);
