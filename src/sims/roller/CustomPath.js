// Copyright 2016 Erik Neumann.  All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the 'License');
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an 'AS IS' BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

goog.provide('myphysicslab.sims.roller.CustomPath');

goog.require('myphysicslab.lab.util.UtilityCore');
goog.require('myphysicslab.sims.roller.AbstractPath');

goog.scope(function() {

var UtilityCore = myphysicslab.lab.util.UtilityCore;
var AbstractPath = myphysicslab.sims.roller.AbstractPath;

/** A path defined by custom equations. The equations are JavaScript string
expressions where the parameter is `t`. There is an equation for both the `x` and `y`
value.

NOTE: This class creates a global variable named `t`.

* @param {number=} start starting `t` value
* @param {number=} finish ending `t` value
* @param {string=} name
* @param {string=} localName
* @constructor
* @final
* @struct
* @extends {myphysicslab.sims.roller.AbstractPath}
*/
myphysicslab.sims.roller.CustomPath = function(start, finish, name, localName) {
  if (!goog.isNumber(start))
    start = -3;
  if (!goog.isNumber(finish))
    finish = 3;
  name = name || CustomPath.en.NAME;
  localName = localName || CustomPath.i18n.NAME;
  AbstractPath.call(this, name, localName, start, finish, /*closedLoop=*/false);
  /**
  * @type {string}
  * @private
  */
  this.equationX_ = 't';
  /**
  * @type {string}
  * @private
  */
  this.equationY_ = '3 + t*t*(-7 + 1.2*t*t)/6';
};
var CustomPath = myphysicslab.sims.roller.CustomPath;
goog.inherits(CustomPath, AbstractPath);

if (!UtilityCore.ADVANCED) {
  /** @inheritDoc */
  CustomPath.prototype.toString = function() {
    return CustomPath.superClass_.toString.call(this).slice(0, -1)
      +', equationX_: "'+this.equationX_+'"'
      +', equationY_: "'+this.equationY_+'"'
      +'}';
  };
};

/** @inheritDoc */
CustomPath.prototype.getClassName = function() {
  return 'CustomPath';
};

/** Returns the parameteric X equation defining the path.
* @return {string} the parameteric X equation defining the path
*/
CustomPath.prototype.getXEquation = function() {
  return this.equationX_;
};

/** Returns the parameteric Y equation defining the path.
* @return {string} the parameteric Y equation defining the path
*/
CustomPath.prototype.getYEquation = function() {
  return this.equationY_;
};

/** Sets the parameteric X equation defining the path. A JavaScript expression where
the parameter is `t`.
* @param {string} value the parameteric X equation defining the path
*/
CustomPath.prototype.setXEquation = function(value) {
  this.equationX_ = value;
};

/** Sets the parameteric Y equation defining the path. A JavaScript expression where
the parameter is `t`.
* @param {string} value the parameteric Y equation defining the path
*/
CustomPath.prototype.setYEquation = function(value) {
  this.equationY_ = value;
};

/** @inheritDoc */
CustomPath.prototype.x_func = function(t) {
  window['t'] = t;
  var r = eval('"use strict"; '+this.equationX_);
  if (goog.isNumber(r) && isFinite(r)) {
    return r;
  } else {
    throw new Error('not a finite number "'+this.equationX_+'" when t='+t);
  }
};

/** @inheritDoc */
CustomPath.prototype.y_func = function(t) {
  window['t'] = t;
  var r = eval('"use strict"; '+this.equationY_);
  if (goog.isNumber(r) && isFinite(r)) {
    return r;
  } else {
    throw new Error('not a finite number "'+this.equationY_+'" when t='+t);
  }
};

/** Set of internationalized strings.
@typedef {{
  NAME: string
  }}
*/
CustomPath.i18n_strings;

/**
@type {CustomPath.i18n_strings}
*/
CustomPath.en = {
  NAME: 'Custom'
};

/**
@private
@type {CustomPath.i18n_strings}
*/
CustomPath.de_strings = {
  NAME: 'Spezial'
};

/** Set of internationalized strings.
@type {CustomPath.i18n_strings}
*/
CustomPath.i18n = goog.LOCALE === 'de' ? CustomPath.de_strings :
    CustomPath.en;

}); // goog.scope