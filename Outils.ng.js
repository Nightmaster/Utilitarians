'use strict';

var app = angular.module('Utilitarians', []);

app.factory('Utilitarians', ['$log', function ($log)
{
  /*!
  * Utilitarians - Tools for different languages and situations.
  * This file is to be used as an Angular.js dependency
  *
  * @description Tools for JavaScript
  * @version     2.0.0
  * @author      Gaël BLAISE
  * @license     Mozilla Public License, version 2.0
  !*/

  /**
  * Allow to know what is the real type of an object.
  *
  * @param obj {Object} The Object for which one you want to identify the type
  **/
  function realTypeOf(obj)
  {
    try
    {
      return Object.prototype.toString.apply(obj).substring(8, Object.prototype.toString.apply(obj).indexOf(']')); // Transform "[object typeName]" in "typeName"
    }
    catch (e)
    {
      $log.error(e);
      return 'Undefined';
    }
  }

  /**
  * Check if the element in entry is: empty, <code>null</code> or <code>undefined</code>
  *
  * @param value {String || Object} The element to check
  * @param [strict] {Boolean} indicate if the object can be empty. Only available for "pure" object detection. True by default
  * @returns {Boolean} The value indicate if the input element is empty or not.
  **/
  function isDefined(value, strict)
  {
    strict = ('Boolean' === realTypeOf(strict)) ? strict : true;
    if (true === strict)
      try
      {
        if ('Object' === realTypeOf(value))
          if (0 === Object.keys(value).length)
            return false;
      }
      catch (e)
      {
        return false;
      }
    return !('String' === realTypeOf(value) && '' === value || 'Null' === realTypeOf(value) || 'Undefined' === realTypeOf(value));
  }

  /**
  * Check if the element in entry is an integer
  *
  * @param val {Number|| Object} The element to check
  * @returns {Boolean} The value indicate if the input element is an integer or not.
  **/
  function isInt(val)
  {
    return parseFloat(val) === parseInt(val) && !isNaN(parseInt(val));
  }

  /**
  * Check if the element in entry is an integer
  *
  * @param val {Number || Object} The element to check
  * @returns {Boolean} The value indicate if the input element is an integer or not.
  **/
  function isFloat(val)
  {
    return isDefined(parseFloat(val), false) && !isNaN(parseFloat(val));
  }

  /**
  * Check if the parameter <code>obj</code> is well of the type passed as string in <code>typeName</code> argument.
  *
  * @param obj {Object} The object to test
  * @param typeName {String} The string giving the exact name of the type wanted for the object (not case sensitive)
  * @return {Boolean} <code>true</code> if the type are in agreement with the <code>typeName</code> argument, <code>else</code> otherwise. But the function will break if  <code>typeName</code> argument is not a String !
  **/
  function typeVerification(obj, typeName)
  {
    if ('String' === realTypeOf(typeName))
      return typeName.toLowerCase() === realTypeOf(obj).toLowerCase();
    else
      throw new TypeError('typeName must be a String !');
  }

  /**
  * Check if the Local Storage is defined for this browser
  *
  * @returns {Boolean} <code>true</code> if the LS is defined, <code>false</code> else
  **/
  function LSDefined()
  {
    try
    {
      return typeof localStorage !== 'undefined';
    }
    catch (e)
    {}
    // localStorage test can throw error when cookies are blocked on Firefox
    return false;
  }

  // /!\ 'setItemToLS' & 'setItemToSS' are based on a JSON api. JSON3 api is mostly recommended, et available here: http://bestiejs.github.io/json3/lib/json3.min.js
  /**
  * Get Local Storage element(s).
  *
  * @see <a href='http://www.w3.org/TR/webstorage/#the-localstorage-attribute'>W3C doc for Local Storage</a>
  *
  * @param name {String || String[]} a string or an array of string which contains the Local Storage's name(s) to get
  * @returns {String || String[]} a string or an array of string containing the string stored in the Local Storage. If the item <code>name</code> does not exists in the Local Storage, the result will be <code>null</code>.
  **/
  function getItemFromLS(name)
  {
    if('String' !== realTypeOf(name) && 'Array' !== realTypeOf(name))
      throw new TypeError('name argument must be a string or an array of string');
    else if (realTypeOf(name) === 'String')
      return localStorage.getItem(name);
    else
    {
      var LSResult = [];
      for (var i = 0; i < name.length; i++)
      {
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        LSResult[i] = localStorage.getItem(name[i]);
      }
      return LSResult;
    }
  }

  /**
  * Set element(s) to the Local Storage.
  *
  * @see <a href='http://www.w3.org/TR/webstorage/#the-localstorage-attribute'>W3C doc for Local Storage</a>
  *
  * @param name {String || String[]} a string or an array of string which contains the Local Storage's name(s) to set
  * @param val {String} the value to put in its element.
  * @param isJSON {Boolean} set to <code>true</code> if the value has to be stored as JSON, <code>false</code> otherwise
  **/
  function setItemToLS(name, val, isJSON)
  {
    if (realTypeOf(isJSON) !== 'Boolean')
      throw new TypeError('iJSON argument must be a boolean indicating if the val param has to be stored as JSON');
    else if (realTypeOf(name) === 'Array' && realTypeOf(val) === 'Array' && val.length === name.length)
      for (var i = 0; i < name.length; i++)
      {
        if (null === val[i])
          val[i] = '';
        else if (realTypeOf(val[i]) !== 'String')
          val[i] = val[i].toString();
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        if (isJSON === true)
          val[i] = JSON.stringify(val[i]);
        localStorage.setItem(name[i], val[i]);
      }
    else if (realTypeOf(name) === 'Array' && realTypeOf(name[0]) === 'String' && realTypeOf(val) === 'String')
    {
      if (null === val)
        val = '';
      if (isJSON === true)
        val = JSON.stringify(val);
      for (var i = 0; i < name.length; i++)
      {
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        localStorage.setItem(name[i], val);
      }
    }
    else if (realTypeOf(val) === 'String' && realTypeOf(name) === 'String')
    {
      if (null === val)
        val = '';
      localStorage.setItem(name, val);
    }
    else
      throw new Error();
  }

  /**
  * Remove Local Storage element(s).
  *
  * @see <a href='http://www.w3.org/TR/webstorage/#the-localstorage-attribute'>W3C doc for Local Storage</a>
  *
  * @param name {String || String[]} a string or an array of string which contains the Local Storage's name(s) to remove
  **/
  function removeItemFromLS(name)
  {
    if('String' !== realTypeOf(name) && 'Array' !== realTypeOf(name))
      throw new TypeError('name argument must be a string or an array of string');
    else if (realTypeOf(name) === 'Array')
      for (var i = 0; i < name.length; i++)
      {
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        localStorage.removeItem(name[i]);
      }
    else
      localStorage.removeItem(name);
  }

  /**
  * Get Session Storage element(s).
  *
  * @see <a href='http://www.w3.org/TR/webstorage/#the-sessionstorage-attribute'>W3C doc for Session Storage</a>
  *
  * @param name {String|| String[]} a string or an array of string which contains the Session Storage's name(s) to get
  * @returns {String|| String[]} a string or an array of string containing the string stored in the Session Storage. If the item <code>name</code> does not exists in the Local Storage, the result will be <code>null</code>.
  **/
  function getItemFromSS(name)
  {
    if('String' !== realTypeOf(name) && 'Array' !== realTypeOf(name))
      throw new TypeError('name argument must be a string or an array of string');
    else if (realTypeOf(name) === 'Array')
    {
      var LSResult = [];
      for (var i = 0; i < name.length; i++)
      {
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        LSResult[i] = sessionStorage.getItem(name[i]);
      }
      return LSResult;
    }
    else
      return sessionStorage.getItem(name);
  }

  /**
  * Set element(s) to the Session Storage.
  *
  * @see <a href='http://www.w3.org/TR/webstorage/#the-sessionstorage-attribute'>W3C doc for Session Storage</a>
  *
  * @param name {String|| String[]} a string or an array of string which contains the Session Storage's name(s) to set
  * @param val {String} the value to put in its element.
  * @param isJSON {Boolean} set to <code>true</code> if the value has to be stored as JSON, <code>false</code> otherwise
  **/
  function setItemToSS(name, val, isJSON)
  {
    if (realTypeOf(isJSON) !== 'Boolean')
      throw new TypeError('isJson argument must be a boolean indicating if val argument is or not a JSON string');
    if (realTypeOf(name) === 'Array' && realTypeOf(val) === 'Array' && val.length === name.length)
      for (var i = 0; i < name.length; i++)
      {
        if (null === val[i])
          val[i] = '';
        else if (realTypeOf(val[i]) !== 'String')
          val[i] = val[i].toString();
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        if (isJSON === true)
          val[i] = JSON.stringify(val[i]);
        sessionStorage.setItem(name[i], val[i]);
      }
    else if (realTypeOf(name) === 'Array' && realTypeOf(val) === 'String')
    {
      if (null === val)
        val = '';
      if (isJSON === true)
        val = JSON.stringify(val);
      for (var i = 0; i < name.length; i++)
      {
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        sessionStorage.setItem(name[i], val);
      }
    }
    else if (realTypeOf(val) === 'String' && realTypeOf(name) === 'String')
    {
      if (null === val)
        val = '';
      sessionStorage.setItem(name, val);
    }
    else
      throw new Error();
  }

  /**
  * Remove Session Storage element(s).
  *
  * @see <a href='http://www.w3.org/TR/webstorage/#the-sessionstorage-attribute'>W3C doc for Session Storage</a>
  *
  * @param name {String|| String[]}: a string or an array of string which contains the Session Storage's name(s) to remove
  **/
  function removeItemFromSS(name)
  {
    if('String' !== realTypeOf(name) && 'Array' !== realTypeOf(name))
      throw new TypeError('name argument must be a string or an array of string');
    else if (realTypeOf(name) === 'Array')
      for (var i = 0; i < name.length; i++)
      {
        if (realTypeOf(name[i]) !== 'String')
          name[i] = name[i].toString();
        sessionStorage.removeItem(name[i]);
      }
    else
      sessionStorage.removeItem(name);
  }

  /**
  *
  * Translate a day number into its french day name
  *
  * @param dayAsInt {Number}: an int between 1 & 7 which indicate a day of a week
  * @returns {String} the french day name
  **/
  function getFrDayName(dayAsInt)
  {
    if ( !isInt(dayAsInt))
      throw new TypeError('The arguement must be an integer between 0 and 6');
    switch (dayAsInt)
    {
      case 0:
        return 'Dimanche';
      case 1:
        return 'Lundi';
      case 2:
        return 'Mardi';
      case 3:
        return 'Mercredi';
      case 4:
        return 'Jeudi';
      case 5:
        return 'Vendredi';
      case 6:
        return 'Samedi';
      default:
        throw new RangeError('The value must be in the specified range: [0-6]');
    }
  }

  /**
  * Function to parse a date (time) into a String with French Notation, with milliseconds
  *
  * @param [date] {Date} : the date to parse, or null to get the "now" datetime parsed
  * @returns {String} the parsed date
  **/
  function stringifyDateFr(date)
  {
    if (null === date)
    {
      date = new Date();
      return getFrDayName(date.getDay()) + ' ' + (date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()) + '-' + (date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth().toString()) + '-' + date.getFullYear().toString() + ' ' + (date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString()) + ':' + (date.getMilliseconds() < 10 ? '00' + date.getMilliseconds().toString() : date.getMilliseconds() < 100 ? '00' + date.getMilliseconds().toString() : date.getMilliseconds().toString());
    }
    else if (realTypeOf(date) === 'Date')
      return getFrDayName(date.getDay()) + ' ' + (date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString()) + '-' + (date.getMonth() < 10 ? '0' + date.getMonth().toString() : date.getMonth().toString()) + '-' + date.getFullYear().toString() + ' ' + (date.getHours() < 10 ? '0' + date.getHours().toString() : date.getHours().toString()) + ':' + (date.getMinutes() < 10 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()) + ':' + (date.getSeconds() < 10 ? '0' + date.getSeconds().toString() : date.getSeconds().toString()) + ':' + (date.getMilliseconds() < 10 ? '00' + date.getMilliseconds().toString() : date.getMilliseconds() < 100 ? '00' + date.getMilliseconds().toString() : date.getMilliseconds().toString());
    else
      throw new TypeError('The argument must be a Date, or set to null');
  }

  /**
  * A function that return a boolean indicating if the user browser if IE <= 8.
  *
  * @returns {Boolean} <code>true</code> if the browser is IE 9 or older version, or another browser; <code>false</code> otherwise
  **/
  function isIE9Plus()
  {
    var myNav = navigator.userAgent.toLowerCase();
    return -1 === myNav.indexOf('msie') ? true : 8 <= parseInt(myNav.split('msie')[1]);
  }

  /**
  * Function to use for searching if a particular node has or not a parent node named by the given value.
  *
  * @param startingNode {Node} the node for which one you need to know if it has a parent of the searched type.
  * @param parentNodeName {String} the name of the parent element to search.
  * @return {Boolean} a <code>boolean</code> which indicate if yes or no the starting node has a parent named by the value given in <code>parentNodeName</code>
  **/
  function hasSpecifiedNodeParent(startingNode, parentNodeName)
  {
    var node = startingNode;
    if ( !isDefined(parentNodeName))
      return false;
    else if ('String' !== realTypeOf(parentNodeName))
      throw new TypeError('parentNodeName argument must be a non-empty string !');
    else if(node.parentNode.nodeName.toLowerCase() === parentNodeName)
      return true;
    else
      do
        if (parentNodeName.toLowerCase() !== node.nodeName.toLowerCase())
          node = node.parentNode;
      while (null !== node && node.nodeName.toLowerCase() !== parentNodeName);
    return null !== node;
  }

  /**
  * Define a constant for the given object
  *
  * @param object {Object} the object who will have the constant
  * @param constName {String} the name for the constant
  * @param value {Object} the constant to add to the object
  * @param [enumerable] {Boolean} boolean that indicate if the constant is or not enumerable. <code>true</code> by default
  * @param [configurable] {Boolean} boolean that indicate if the constant is or not configurable. <code></code> by default
  **/
  function defineConstantForObject(object, constName, value, enumerable, configurable)
  {
    if ('String' === realTypeOf(constName))
      Object.defineProperty(object, constName,
      {
        value : value,
        writable : false,
        enumerable : ('Boolean' === realTypeOf(enumerable)) ? enumerable : true,
        configurable : ('Boolean' === realTypeOf(configurable)) ? configurable : false
      });
    else
      throw new TypeError('constName must be an String !');
  }

  /**
  * Check if IP V4 value is correct
  *
  * @see for advanced features you should use ipaddr.js (<a href="https://github.com/whitequark/ipaddr.js IPAddr.js">GitHub repo</a>)
  *
  * @param ip {String} the IP to check
  * @return {Boolean} a boolean indicating if the entry is a correct IP value or not
  **/
  function ipV4Validation(ip)
  {
    if ('localhost' !== ip)
    {
      var part;
      if ('String' === utils.realTypeOf(ip))
        part = ip.split('.');
      else
        return false;
      if (4 !== part.length)
        return false;
      for (var i = 0; i < part.length; i++)
        if (0 > parseInt(part[i]) || 255 < parseInt(part[i]) || isNaN(parseInt(part[i])) || false === isDefined(part[i]))
          return false;
      return true;
    }
    else
      return true;
  }

  /**
  * Check if port value is correct in the correct range
  *
  * @param port {String || Number}: the value to check
  * @return {Boolean} a boolean indicating if the value is in the correct port's range or not. If a floating number is passed, <code>false</code> is returned
  **/
  function portValidation(port)
  {
    if (isNaN(parseInt(port)) || parseInt(port) !== parseFloat(port))
      return false;
    else if (0 > parseInt(port) || 65535 <= parseInt(port))
      return false;
    return true;
  }

  /**
  * Versions:
  * - 1.0.0: initial version
  * - 1.1.0: add LocalStorage functions, float and int test functions && IE 9 plus test function
  * - 1.2.0: add constant creator for objects
  * - 1.2.1: correct version declaration, add minified constant and information on this file
  * - 1.2.2: surround exports part with try/catch, replace the incorrect "int" parameter for "getDayFr" function
  * - 1.3.0: add ipValidation and portValidation functions, and made some few corrections
  * - 2.0.0: correct bugs, improve code. Add api as Angular dependency
  **/
  var utils =
  {
    realTypeOf : realTypeOf,
    isDefined : isDefined,
    isInt : isInt,
    isFloat : isFloat,
    typeVerification : typeVerification,
    LSDefined : LSDefined,
    getItemFromLS : getItemFromLS,
    setItemToLS : setItemToLS,
    removeItemFromLS : removeItemFromLS,
    getItemFromSS : getItemFromSS,
    setItemToSS : setItemToSS,
    removeItemFromSS : removeItemFromSS,
    getFrDayName : getFrDayName,
    stringifyDateFr : stringifyDateFr,
    isIE9Plus : isIE9Plus,
    hasSpecifiedNodeParent : hasSpecifiedNodeParent,
    defineConstantForObject : defineConstantForObject,
    ipV4Validation : ipV4Validation,
    portValidation : portValidation
  };
  defineConstantForObject(utils, 'version', '2.0.0', true, false);
  defineConstantForObject(utils, 'minified', false, true, false);

  return utils;
}]);