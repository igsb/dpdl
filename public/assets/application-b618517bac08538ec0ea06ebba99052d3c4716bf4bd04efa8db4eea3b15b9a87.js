/*!
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-05-20T17:17Z
 */


(function( global, factory ) {

	if ( typeof module === "object" && typeof module.exports === "object" ) {
		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
}(typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Support: Firefox 18+
// Can't be in strict mode, several libs including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
//"use strict";
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



var
	version = "1.12.4",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android<4.1, IE<9
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	};

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num != null ?

			// Return just the one element from the set
			( num < 0 ? this[ num + this.length ] : this[ num ] ) :

			// Return all the elements in a clean array
			slice.call( this );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: deletedIds.sort,
	splice: deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = jQuery.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type( obj ) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type( obj ) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {

		// parseFloat NaNs numeric-cast false positives (null|true|false|"")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		// adding 1 corrects loss of precision from parseFloat (#15100)
		var realStringObj = obj && obj.toString();
		return !jQuery.isArray( obj ) && ( realStringObj - parseFloat( realStringObj ) + 1 ) >= 0;
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type( obj ) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {

			// Not own constructor property must be Object
			if ( obj.constructor &&
				!hasOwn.call( obj, "constructor" ) &&
				!hasOwn.call( obj.constructor.prototype, "isPrototypeOf" ) ) {
				return false;
			}
		} catch ( e ) {

			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( !support.ownFirst ) {
			for ( key in obj ) {
				return hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || hasOwn.call( obj, key );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return obj + "";
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ toString.call( obj ) ] || "object" :
			typeof obj;
	},

	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {

			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data ); // jscs:ignore requireDotNotation
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android<4.1, IE<9
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( indexOf ) {
				return indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {

				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		while ( j < len ) {
			first[ i++ ] = second[ j++ ];
		}

		// Support: IE<9
		// Workaround casting of .length to NaN on otherwise arraylike objects (e.g., NodeLists)
		if ( len !== len ) {
			while ( second[ j ] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	now: function() {
		return +( new Date() );
	},

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

// JSHint would error on this code due to the Symbol not being defined in ES5.
// Defining this global in .jshintrc would create a danger of using the global
// unguarded in another place, it seems safer to just disable JSHint for these
// three lines.
/* jshint ignore: start */
if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = deletedIds[ Symbol.iterator ];
}
/* jshint ignore: end */

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: iOS 8.2 (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = jQuery.type( obj );

	if ( type === "function" || jQuery.isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2015-10-17
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// General-purpose constants
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,
	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, nidselect, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rescape, "\\$&" );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					nidselect = ridentifier.test( nid ) ? "#" + nid : "[id='" + nid + "']";
					while ( i-- ) {
						groups[i] = nidselect + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, parent,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( (parent = document.defaultView) && parent.top !== parent ) {
		// Support: IE 11
		if ( parent.addEventListener ) {
			parent.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( parent.attachEvent ) {
			parent.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( document.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var m = context.getElementById( id );
				return m ? [ m ] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild( div ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( div.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !div.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibing-combinator selector` fails
			if ( !div.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( div ) {
			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( div.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( (oldCache = uniqueCache[ dir ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ dir ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag = ( /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/ );



var risSimple = /^.[^:#\[\.,]*$/;

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		} );

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );

	}

	if ( typeof qualifier === "string" ) {
		if ( risSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) > -1 ) !== not;
	} );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	return elems.length === 1 && elem.nodeType === 1 ?
		jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
		jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
			return elem.nodeType === 1;
		} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// init accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt( 0 ) === "<" &&
				selector.charAt( selector.length - 1 ) === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {

						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[ 2 ] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[ 0 ] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return typeof root.ready !== "undefined" ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter( function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

				// Always skip document fragments
				if ( cur.nodeType < 11 && ( pos ?
					pos.index( cur ) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector( cur, selectors ) ) ) {

					matched.push( cur );
					break;
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[ 0 ], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem, this );
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.uniqueSort( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
} );
var rnotwhite = ( /\S+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( jQuery.isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && jQuery.type( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = true;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks( "once memory" ), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks( "memory" ) ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];

							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this === promise ? newDefer.promise() : this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add( function() {

					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 ||
				( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred.
			// If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( values === progressValues ) {
						deferred.notifyWith( contexts, values );

					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.progress( updateFunc( i, progressContexts, progressValues ) )
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
} );


// The deferred used on DOM ready
var readyList;

jQuery.fn.ready = function( fn ) {

	// Add the callback
	jQuery.ready.promise().done( fn );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.triggerHandler ) {
			jQuery( document ).triggerHandler( "ready" );
			jQuery( document ).off( "ready" );
		}
	}
} );

/**
 * Clean-up method for dom ready events
 */
function detach() {
	if ( document.addEventListener ) {
		document.removeEventListener( "DOMContentLoaded", completed );
		window.removeEventListener( "load", completed );

	} else {
		document.detachEvent( "onreadystatechange", completed );
		window.detachEvent( "onload", completed );
	}
}

/**
 * The ready event handler and self cleanup method
 */
function completed() {

	// readyState === "complete" is good enough for us to call the dom ready in oldIE
	if ( document.addEventListener ||
		window.event.type === "load" ||
		document.readyState === "complete" ) {

		detach();
		jQuery.ready();
	}
}

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called
		// after the browser event has already occurred.
		// Support: IE6-10
		// Older IE sometimes signals "interactive" too soon
		if ( document.readyState === "complete" ||
			( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

			// Handle it asynchronously to allow scripts the opportunity to delay ready
			window.setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {

			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed );

		// If IE event model is used
		} else {

			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch ( e ) {}

			if ( top && top.doScroll ) {
				( function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {

							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll( "left" );
						} catch ( e ) {
							return window.setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				} )();
			}
		}
	}
	return readyList.promise( obj );
};

// Kick off the DOM ready check even if the user does not
jQuery.ready.promise();




// Support: IE<9
// Iteration over object's inherited properties before its own
var i;
for ( i in jQuery( support ) ) {
	break;
}
support.ownFirst = i === "0";

// Note: most support tests are defined in their respective modules.
// false until the test is run
support.inlineBlockNeedsLayout = false;

// Execute ASAP in case we need to set body.style.zoom
jQuery( function() {

	// Minified: var a,b,c,d
	var val, div, body, container;

	body = document.getElementsByTagName( "body" )[ 0 ];
	if ( !body || !body.style ) {

		// Return for frameset docs that don't have a body
		return;
	}

	// Setup
	div = document.createElement( "div" );
	container = document.createElement( "div" );
	container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
	body.appendChild( container ).appendChild( div );

	if ( typeof div.style.zoom !== "undefined" ) {

		// Support: IE<8
		// Check if natively block-level elements act like inline-block
		// elements when setting their display to 'inline' and giving
		// them layout
		div.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1";

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if ( val ) {

			// Prevent IE 6 from affecting layout for positioned elements #11048
			// Prevent IE from shrinking the body in IE 7 mode #12869
			// Support: IE<8
			body.style.zoom = 1;
		}
	}

	body.removeChild( container );
} );


( function() {
	var div = document.createElement( "div" );

	// Support: IE<9
	support.deleteExpando = true;
	try {
		delete div.test;
	} catch ( e ) {
		support.deleteExpando = false;
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();
var acceptData = function( elem ) {
	var noData = jQuery.noData[ ( elem.nodeName + " " ).toLowerCase() ],
		nodeType = +elem.nodeType || 1;

	// Do not set data on non-element DOM nodes because it will not be cleared (#8335).
	return nodeType !== 1 && nodeType !== 9 ?
		false :

		// Nodes accept data unless otherwise specified; rejection can be conditional
		!noData || noData !== true && elem.getAttribute( "classid" ) === noData;
};




var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /([A-Z])/g;

function dataAttr( elem, key, data ) {

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :

					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
					data;
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[ name ] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}

function internalData( elem, name, data, pvt /* Internal Use Only */ ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( ( !id || !cache[ id ] || ( !pvt && !cache[ id ].data ) ) &&
		data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {

		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {

		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split( " " );
					}
				}
			} else {

				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[ i ] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject( thisCache ) : !jQuery.isEmptyObject( thisCache ) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, undefined
	} else {
		cache[ id ] = undefined;
	}
}

jQuery.extend( {
	cache: {},

	// The following elements (space-suffixed to avoid Object.prototype collisions)
	// throw uncatchable exceptions if you attempt to set expando properties
	noData: {
		"applet ": true,
		"embed ": true,

		// ...but Flash objects (which have this classid) *can* handle expandos
		"object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[ jQuery.expando ] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE11+
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = jQuery.camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				jQuery.data( this, key );
			} );
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each( function() {
				jQuery.data( this, key, value );
			} ) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : undefined;
	},

	removeData: function( key ) {
		return this.each( function() {
			jQuery.removeData( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray( data ) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object,
	// or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );


( function() {
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function() {
		if ( shrinkWrapBlocksVal != null ) {
			return shrinkWrapBlocksVal;
		}

		// Will be changed later if needed.
		shrinkWrapBlocksVal = false;

		// Minified: var b,c,d
		var div, body, container;

		body = document.getElementsByTagName( "body" )[ 0 ];
		if ( !body || !body.style ) {

			// Test fired too early or in an unsupported environment, exit.
			return;
		}

		// Setup
		div = document.createElement( "div" );
		container = document.createElement( "div" );
		container.style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px";
		body.appendChild( container ).appendChild( div );

		// Support: IE6
		// Check if elements with layout shrink-wrap their children
		if ( typeof div.style.zoom !== "undefined" ) {

			// Reset CSS: box-sizing; display; margin; border
			div.style.cssText =

				// Support: Firefox<29, Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;" +
				"padding:1px;width:1px;zoom:1";
			div.appendChild( document.createElement( "div" ) ).style.width = "5px";
			shrinkWrapBlocksVal = div.offsetWidth !== 3;
		}

		body.removeChild( container );

		return shrinkWrapBlocksVal;
	};

} )();
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHidden = function( elem, el ) {

		// isHidden might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;
		return jQuery.css( elem, "display" ) === "none" ||
			!jQuery.contains( elem.ownerDocument, elem );
	};



function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted,
		scale = 1,
		maxIterations = 20,
		currentValue = tween ?
			function() { return tween.cur(); } :
			function() { return jQuery.css( elem, prop, "" ); },
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		do {

			// If previous iteration zeroed out, double until we get *something*.
			// Use string for doubling so we don't accidentally see scale as unchanged below
			scale = scale || ".5";

			// Adjust and apply
			initialInUnit = initialInUnit / scale;
			jQuery.style( elem, prop, initialInUnit + unit );

		// Update scale, tolerating zero or NaN from tween.cur()
		// Break the loop if scale is unchanged or perfect, or if we've just had enough.
		} while (
			scale !== ( scale = currentValue() / initial ) && scale !== 1 && --maxIterations
		);
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		length = elems.length,
		bulk = key == null;

	// Sets many values
	if ( jQuery.type( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !jQuery.isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < length; i++ ) {
				fn(
					elems[ i ],
					key,
					raw ? value : value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	return chainable ?
		elems :

		// Gets
		bulk ?
			fn.call( elems ) :
			length ? fn( elems[ 0 ], key ) : emptyGet;
};
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([\w:-]+)/ );

var rscriptType = ( /^$|\/(?:java|ecma)script/i );

var rleadingWhitespace = ( /^\s+/ );

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|" +
		"details|dialog|figcaption|figure|footer|header|hgroup|main|" +
		"mark|meter|nav|output|picture|progress|section|summary|template|time|video";



function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}


( function() {
	var div = document.createElement( "div" ),
		fragment = document.createDocumentFragment(),
		input = document.createElement( "input" );

	// Setup
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName( "tbody" ).length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName( "link" ).length;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone =
		document.createElement( "nav" ).cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	input.type = "checkbox";
	input.checked = true;
	fragment.appendChild( input );
	support.appendChecked = input.checked;

	// Make sure textarea (and checkbox) defaultValue is properly cloned
	// Support: IE6-IE11+
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;

	// #11217 - WebKit loses check when the name is after the checked attribute
	fragment.appendChild( div );

	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input = document.createElement( "input" );
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Safari 5.1, iOS 5.1, Android 4.x, Android 2.3
	// old WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Cloned elements keep attachEvent handlers, we use addEventListener on IE9+
	support.noCloneEvent = !!div.addEventListener;

	// Support: IE<9
	// Since attributes and properties are the same in IE,
	// cleanData must set properties to undefined rather than use removeAttribute
	div[ jQuery.expando ] = 1;
	support.attributes = !div.getAttribute( jQuery.expando );
} )();


// We have to close these tags to support XHTML (#13200)
var wrapMap = {
	option: [ 1, "<select multiple='multiple'>", "</select>" ],
	legend: [ 1, "<fieldset>", "</fieldset>" ],
	area: [ 1, "<map>", "</map>" ],

	// Support: IE8
	param: [ 1, "<object>", "</object>" ],
	thead: [ 1, "<table>", "</table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
	// unless wrapped in a div with non-breaking characters in front of it.
	_default: support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>" ]
};

// Support: IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== "undefined" ?
			context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== "undefined" ?
				context.querySelectorAll( tag || "*" ) :
				undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context;
			( elem = elems[ i ] ) != null;
			i++
		) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; ( elem = elems[ i ] ) != null; i++ ) {
		jQuery._data(
			elem,
			"globalEval",
			!refElements || jQuery._data( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/,
	rtbody = /<tbody/i;

function fixDefaultChecked( elem ) {
	if ( rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment( elems, context, scripts, selection, ignored ) {
	var j, elem, contains,
		tmp, tag, tbody, wrap,
		l = elems.length,

		// Ensure a safe fragment
		safe = createSafeFragment( context ),

		nodes = [],
		i = 0;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( jQuery.type( elem ) === "object" ) {
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || safe.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;

				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Manually add leading whitespace removed by IE
				if ( !support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
					nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[ 0 ] ) );
				}

				// Remove IE's autoinserted <tbody> from table fragments
				if ( !support.tbody ) {

					// String was a <table>, *may* have spurious <tbody>
					elem = tag === "table" && !rtbody.test( elem ) ?
						tmp.firstChild :

						// String was a bare <thead> or <tfoot>
						wrap[ 1 ] === "<table>" && !rtbody.test( elem ) ?
							tmp :
							0;

					j = elem && elem.childNodes.length;
					while ( j-- ) {
						if ( jQuery.nodeName( ( tbody = elem.childNodes[ j ] ), "tbody" ) &&
							!tbody.childNodes.length ) {

							elem.removeChild( tbody );
						}
					}
				}

				jQuery.merge( nodes, tmp.childNodes );

				// Fix #12392 for WebKit and IE > 9
				tmp.textContent = "";

				// Fix #12392 for oldIE
				while ( tmp.firstChild ) {
					tmp.removeChild( tmp.firstChild );
				}

				// Remember the top-level container for proper cleanup
				tmp = safe.lastChild;
			}
		}
	}

	// Fix #11356: Clear elements from fragment
	if ( tmp ) {
		safe.removeChild( tmp );
	}

	// Reset defaultChecked for any radios and checkboxes
	// about to be appended to the DOM in IE 6/7 (#8060)
	if ( !support.appendChecked ) {
		jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
	}

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}

			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( safe.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	tmp = null;

	return safe;
}


( function() {
	var i, eventName,
		div = document.createElement( "div" );

	// Support: IE<9 (lack submit/change bubble), Firefox (lack focus(in | out) events)
	for ( i in { submit: true, change: true, focusin: true } ) {
		eventName = "on" + i;

		if ( !( support[ i ] = eventName in window ) ) {

			// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
			div.setAttribute( eventName, "t" );
			support[ i ] = div.attributes[ eventName ].expando === false;
		}
	}

	// Null elements to avoid leaks in IE.
	div = null;
} )();


var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE9
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" &&
					( !e || jQuery.event.triggered !== e.type ) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};

			// Add elem as a property of the handle fn to prevent a memory leak
			// with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnotwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] &&
				jQuery._data( cur, "handle" );

			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if (
				( !special._default ||
				 special._default.apply( eventPath.pop(), data ) === false
				) && acceptData( elem )
			) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {

						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, j, ret, matched, handleObj,
			handlerQueue = [],
			args = slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, matches, sel, handleObj,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Support (at least): Chrome, IE9
		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		//
		// Support: Firefox<=42+
		// Avoid non-left-click in FF but don't block IE radio events (#3861, gh-2343)
		if ( delegateCount && cur.nodeType &&
			( event.type !== "click" || isNaN( event.button ) || event.button < 1 ) ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && ( cur.disabled !== true || event.type !== "click" ) ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push( { elem: cur, handlers: matches } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: this, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Safari 6-8+
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: ( "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase " +
		"metaKey relatedTarget shiftKey target timeStamp view which" ).split( " " ),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split( " " ),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: ( "button buttons clientX clientY fromElement offsetX offsetY " +
			"pageX pageY screenX screenY toElement" ).split( " " ),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) -
					( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY +
					( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) -
					( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ?
					original.toElement :
					fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {

						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	// Piggyback on a donor event to simulate a different one
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true

				// Previously, `originalEvent: {}` was set here, so stopPropagation call
				// would not be triggered on donor event, since in our own
				// jQuery.event.stopPropagation function we had a check for existence of
				// originalEvent.stopPropagation method, so, consequently it would be a noop.
				//
				// Guard for simulated events was moved to jQuery.event.stopPropagation function
				// since `originalEvent` should point to the original event for the
				// constancy with other events and for more focused logic
			}
		);

		jQuery.event.trigger( e, null, elem );

		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {

		// This "if" is needed for plain objects
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event,
			// to properly expose it to GC
			if ( typeof elem[ name ] === "undefined" ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: IE < 9, Android < 4.0
				src.returnValue === false ?
			returnTrue :
			returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( !e || this.isSimulated ) {
			return;
		}

		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && e.stopImmediatePropagation ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://code.google.com/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

// IE submit delegation
if ( !support.submit ) {

	jQuery.event.special.submit = {
		setup: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {

				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ?

						// Support: IE <=8
						// We use jQuery.prop instead of elem.form
						// to allow fixing the IE8 delegated submit issue (gh-2332)
						// by 3rd party polyfills/workarounds.
						jQuery.prop( elem, "form" ) :
						undefined;

				if ( form && !jQuery._data( form, "submit" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submitBubble = true;
					} );
					jQuery._data( form, "submit", true );
				}
			} );

			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {

			// If form was submitted by the user, bubble the event up the tree
			if ( event._submitBubble ) {
				delete event._submitBubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event );
				}
			}
		},

		teardown: function() {

			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !support.change ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {

				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._justChanged = true;
						}
					} );
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._justChanged && !event.isTrigger ) {
							this._justChanged = false;
						}

						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event );
					} );
				}
				return false;
			}

			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "change" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event );
						}
					} );
					jQuery._data( elem, "change", true );
				}
			} );
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger ||
				( elem.type !== "radio" && elem.type !== "checkbox" ) ) {

				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Support: Firefox
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome, Safari
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://code.google.com/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				jQuery._data( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = jQuery._data( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					jQuery._removeData( doc, fix );
				} else {
					jQuery._data( doc, fix, attaches );
				}
			}
		};
	} );
}

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	},

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


var rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp( "<(?:" + nodeNames + ")[\\s/>]", "i" ),
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,

	// Support: IE 10-11, Edge 10240+
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement( "div" ) );

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName( "tbody" )[ 0 ] ||
			elem.appendChild( elem.ownerDocument.createElement( "tbody" ) ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( jQuery.find.attr( elem, "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[ 1 ];
	} else {
		elem.removeAttribute( "type" );
	}
	return elem;
}

function cloneCopyEvent( src, dest ) {
	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( support.html5Clone && ( src.innerHTML && !jQuery.trim( dest.innerHTML ) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && rcheckableType.test( src.type ) ) {

		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var first, node, hasScripts,
		scripts, doc, fragment,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		isFunction = jQuery.isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( isFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( isFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android<4.1, PhantomJS<2
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!jQuery._data( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							jQuery.globalEval(
								( node.text || node.textContent || node.innerHTML || "" )
									.replace( rcleanScript, "" )
							);
						}
					}
				}
			}

			// Fix #11809: Avoid leaking memory
			fragment = first = null;
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		elems = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = elems[ i ] ) != null; i++ ) {

		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( support.html5Clone || jQuery.isXMLDoc( elem ) ||
			!rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {

			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( ( !support.noCloneEvent || !support.noCloneChecked ) &&
				( elem.nodeType === 1 || elem.nodeType === 11 ) && !jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; ( node = srcElements[ i ] ) != null; ++i ) {

				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[ i ] ) {
					fixCloneNodeIssues( node, destElements[ i ] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; ( node = srcElements[ i ] ) != null; i++ ) {
					cloneCopyEvent( node, destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems, /* internal */ forceAcceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			attributes = support.attributes,
			special = jQuery.event.special;

		for ( ; ( elem = elems[ i ] ) != null; i++ ) {
			if ( forceAcceptData || acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// Support: IE<9
						// IE does not allow us to delete expando properties from nodes
						// IE creates expando attributes along with the property
						// IE does not have a removeAttribute function on Document nodes
						if ( !attributes && typeof elem.removeAttribute !== "undefined" ) {
							elem.removeAttribute( internalKey );

						// Webkit & Blink performance suffers when deleting properties
						// from DOM nodes, so set to undefined instead
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem[ internalKey ] = undefined;
						}

						deletedIds.push( id );
					}
				}
			}
		}
	}
} );

jQuery.fn.extend( {

	// Keep domManip exposed until 3.0 (gh-2225)
	domManip: domManip,

	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append(
					( this[ 0 ] && this[ 0 ].ownerDocument || document ).createTextNode( value )
				);
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {

			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {

						// Remove element nodes and prevent memory leaks
						elem = this[ i ] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );


var iframe,
	elemdisplay = {

		// Support: Firefox
		// We have to pre-define these values for FF (#10227)
		HTML: "block",
		BODY: "block"
	};

/**
 * Retrieve the actual display of a element
 * @param {String} name nodeName of the element
 * @param {Object} doc Document object
 */

// Called only from within defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),

		display = jQuery.css( elem[ 0 ], "display" );

	// We don't have any data stored on the element,
	// so use "detach" method as fast way to get rid of the element
	elem.detach();

	return display;
}

/**
 * Try to determine the default display value of an element
 * @param {String} nodeName
 */
function defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {

			// Use the already-created iframe if possible
			iframe = ( iframe || jQuery( "<iframe frameborder='0' width='0' height='0'/>" ) )
				.appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[ 0 ].contentWindow || iframe[ 0 ].contentDocument ).document;

			// Support: IE
			doc.write();
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}
var rmargin = ( /^margin/ );

var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};


var documentElement = document.documentElement;



( function() {
	var pixelPositionVal, pixelMarginRightVal, boxSizingReliableVal,
		reliableHiddenOffsetsVal, reliableMarginRightVal, reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	div.style.cssText = "float:left;opacity:.5";

	// Support: IE<9
	// Make sure that element opacity exists (as opposed to filter)
	support.opacity = div.style.opacity === "0.5";

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!div.style.cssFloat;

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	container = document.createElement( "div" );
	container.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;" +
		"padding:0;margin-top:1px;position:absolute";
	div.innerHTML = "";
	container.appendChild( div );

	// Support: Firefox<29, Android 2.3
	// Vendor-prefix box-sizing
	support.boxSizing = div.style.boxSizing === "" || div.style.MozBoxSizing === "" ||
		div.style.WebkitBoxSizing === "";

	jQuery.extend( support, {
		reliableHiddenOffsets: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableHiddenOffsetsVal;
		},

		boxSizingReliable: function() {

			// We're checking for pixelPositionVal here instead of boxSizingReliableVal
			// since that compresses better and they're computed together anyway.
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return boxSizingReliableVal;
		},

		pixelMarginRight: function() {

			// Support: Android 4.0-4.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelMarginRightVal;
		},

		pixelPosition: function() {
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return pixelPositionVal;
		},

		reliableMarginRight: function() {

			// Support: Android 2.3
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginRightVal;
		},

		reliableMarginLeft: function() {

			// Support: IE <=8 only, Android 4.0 - 4.3 only, Firefox <=3 - 37
			if ( pixelPositionVal == null ) {
				computeStyleTests();
			}
			return reliableMarginLeftVal;
		}
	} );

	function computeStyleTests() {
		var contents, divStyle,
			documentElement = document.documentElement;

		// Setup
		documentElement.appendChild( container );

		div.style.cssText =

			// Support: Android 2.3
			// Vendor-prefix box-sizing
			"-webkit-box-sizing:border-box;box-sizing:border-box;" +
			"position:relative;display:block;" +
			"margin:auto;border:1px;padding:1px;" +
			"top:1%;width:50%";

		// Support: IE<9
		// Assume reasonable values in the absence of getComputedStyle
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		// Check for getComputedStyle so that this code is not run in IE<9.
		if ( window.getComputedStyle ) {
			divStyle = window.getComputedStyle( div );
			pixelPositionVal = ( divStyle || {} ).top !== "1%";
			reliableMarginLeftVal = ( divStyle || {} ).marginLeft === "2px";
			boxSizingReliableVal = ( divStyle || { width: "4px" } ).width === "4px";

			// Support: Android 4.0 - 4.3 only
			// Some styles come back with percentage values, even though they shouldn't
			div.style.marginRight = "50%";
			pixelMarginRightVal = ( divStyle || { marginRight: "4px" } ).marginRight === "4px";

			// Support: Android 2.3 only
			// Div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container (#3333)
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			contents = div.appendChild( document.createElement( "div" ) );

			// Reset CSS: box-sizing; display; margin; border; padding
			contents.style.cssText = div.style.cssText =

				// Support: Android 2.3
				// Vendor-prefix box-sizing
				"-webkit-box-sizing:content-box;-moz-box-sizing:content-box;" +
				"box-sizing:content-box;display:block;margin:0;border:0;padding:0";
			contents.style.marginRight = contents.style.width = "0";
			div.style.width = "1px";

			reliableMarginRightVal =
				!parseFloat( ( window.getComputedStyle( contents ) || {} ).marginRight );

			div.removeChild( contents );
		}

		// Support: IE6-8
		// First check that getClientRects works as expected
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.style.display = "none";
		reliableHiddenOffsetsVal = div.getClientRects().length === 0;
		if ( reliableHiddenOffsetsVal ) {
			div.style.display = "";
			div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
			div.childNodes[ 0 ].style.borderCollapse = "separate";
			contents = div.getElementsByTagName( "td" );
			contents[ 0 ].style.cssText = "margin:0;border:0;padding:0;display:none";
			reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			if ( reliableHiddenOffsetsVal ) {
				contents[ 0 ].style.display = "";
				contents[ 1 ].style.display = "none";
				reliableHiddenOffsetsVal = contents[ 0 ].offsetHeight === 0;
			}
		}

		// Teardown
		documentElement.removeChild( container );
	}

} )();


var getStyles, curCSS,
	rposition = /^(top|right|bottom|left)$/;

if ( window.getComputedStyle ) {
	getStyles = function( elem ) {

		// Support: IE<=11+, Firefox<=30+ (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

	curCSS = function( elem, name, computed ) {
		var width, minWidth, maxWidth, ret,
			style = elem.style;

		computed = computed || getStyles( elem );

		// getPropertyValue is only needed for .css('filter') in IE9, see #12537
		ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined;

		// Support: Opera 12.1x only
		// Fall back to style even without computed
		// computed is undefined for elems on document fragments
		if ( ( ret === "" || ret === undefined ) && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		if ( computed ) {

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value"
			// instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values,
			// but width seems to be reliably pixels
			// this is against the CSSOM draft spec:
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if ( !support.pixelMarginRight() && rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "";
	};
} else if ( documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, computed ) {
		var left, rs, rsLeft, ret,
			style = elem.style;

		computed = computed || getStyles( elem );
		ret = computed ? computed[ name ] : undefined;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are
		// proportional to the parent element instead
		// and we can't measure the parent instead because it
		// might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		// Support: IE
		// IE returns zIndex value as an integer.
		return ret === undefined ?
			ret :
			ret + "" || "auto";
	};
}




function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

		ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/i,

	// swappable if display is none or starts with table except
	// "table", "table-cell", or "table-caption"
	// see here for display values:
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp( "^(" + pnum + ")(.*)$", "i" ),

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;


// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt( 0 ).toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {

			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] =
					jQuery._data( elem, "olddisplay", defaultDisplay( elem.nodeName ) );
			}
		} else {
			hidden = isHidden( elem );

			if ( display && display !== "none" || !hidden ) {
				jQuery._data(
					elem,
					"olddisplay",
					hidden ? display : jQuery.css( elem, "display" )
				);
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?

		// If we already have the right measurement, avoid augmentation
		4 :

		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {

		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {

			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {

			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = support.boxSizing &&
			jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {

		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test( val ) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox &&
			( support.boxSizingReliable() || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {

		// normalize float css property
		"float": support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set. See: #7116
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight
			// (for every problematic property) identical functions
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				// Support: IE
				// Swallow errors from 'invalid' CSS values (#5509)
				try {
					style[ name ] = value;
				} catch ( e ) {}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] ||
			( jQuery.cssProps[ origName ] = vendorPropName( origName ) || origName );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}
		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&
					elem.offsetWidth === 0 ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, name, extra );
						} ) :
						getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					support.boxSizing &&
						jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
} );

if ( !support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {

			// IE uses filters for opacity
			return ropacity.test( ( computed && elem.currentStyle ?
				elem.currentStyle.filter :
				elem.style.filter ) || "" ) ?
					( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
					computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist -
			// attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule
				// or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf( support.reliableMarginRight,
	function( elem, computed ) {
		if ( computed ) {
			return swap( elem, { "display": "inline-block" },
				curCSS, [ elem, "marginRight" ] );
		}
	}
);

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return (
				parseFloat( curCSS( elem, "marginLeft" ) ) ||

				// Support: IE<=11+
				// Running getBoundingClientRect on a disconnected node in IE throws an error
				// Support: IE8 only
				// getClientRects() errors on disconnected elems
				( jQuery.contains( elem.ownerDocument, elem ) ?
					elem.getBoundingClientRect().left -
						swap( elem, { marginLeft: 0 }, function() {
							return elem.getBoundingClientRect().left;
						} ) :
					0
				)
			) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back Compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = jQuery.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// we're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire, display, checkDisplay,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {

		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		display = jQuery.css( elem, "display" );

		// Test default display if display is currently "none"
		checkDisplay = display === "none" ?
			jQuery._data( elem, "olddisplay" ) || defaultDisplay( elem.nodeName ) : display;

		if ( checkDisplay === "inline" && jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !support.inlineBlockNeedsLayout || defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";
			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !support.shrinkWrapBlocks() ) {
			anim.always( function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			} );
		}
	}

	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// If there is dataShow left over from a stopped hide or show
				// and we are going to proceed with show, we should pretend to be hidden
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );

		// Any non-fx value stops us from restoring the original display value
		} else {
			display = undefined;
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done( function() {
				jQuery( elem ).hide();
			} );
		}
		anim.done( function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		} );
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}

	// If this is a noop like .hide().hide(), restore an overwritten display value
	} else if ( ( display === "none" ? defaultDisplay( elem.nodeName ) : display ) === "inline" ) {
		style.display = display;
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( jQuery.isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					jQuery.proxy( result.stop, result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnotwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ?
			jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	if ( timer() ) {
		jQuery.fx.start();
	} else {
		jQuery.timers.pop();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = window.setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	window.clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var a,
		input = document.createElement( "input" ),
		div = document.createElement( "div" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	// Setup
	div = document.createElement( "div" );
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";
	a = div.getElementsByTagName( "a" )[ 0 ];

	// Support: Windows Web Apps (WWA)
	// `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "checkbox" );
	div.appendChild( input );

	a = div.getElementsByTagName( "a" )[ 0 ];

	// First batch of tests.
	a.style.cssText = "top:1px";

	// Test setAttribute on camelCase class.
	// If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute( "style" ) );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute( "href" ) === "/a";

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement( "form" ).enctype;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE8 only
	// Check if we can trust getAttribute("value")
	input = document.createElement( "input" );
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";
} )();


var rreturn = /\r/g,
	rspaces = /[\x20\t\r\n\f]+/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, isFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if (
					hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?

					// handle most common string cases
					ret.replace( rreturn, "" ) :

					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE10-11+
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim( jQuery.text( elem ) ).replace( rspaces, " " );
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							( support.optDisabled ?
								!option.disabled :
								option.getAttribute( "disabled" ) === null ) &&
							( !option.parentNode.disabled ||
								!jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					if ( jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1 ) {

						// Support: IE6
						// When new option element is added to select box we need to
						// force reflow of newly added node in order to workaround delay
						// of initialization properties
						try {
							option.selected = optionSet = true;

						} catch ( _ ) {

							// Will be executed only in IE6
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}

				return options;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




var nodeHook, boolHook,
	attrHandle = jQuery.expr.attrHandle,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = support.getSetAttribute,
	getSetInput = support.input;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					jQuery.nodeName( elem, "input" ) ) {

					// Setting the type on a radio button after the value resets the value in IE8-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {

					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;

					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {

			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		} else {

			// Support: IE<9
			// Use defaultChecked and defaultSelected for oldIE
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
		attrHandle[ name ] = function( elem, name, isXML ) {
			var ret, handle;
			if ( !isXML ) {

				// Avoid an infinite loop by temporarily removing this function from the getter
				handle = attrHandle[ name ];
				attrHandle[ name ] = ret;
				ret = getter( elem, name, isXML ) != null ?
					name.toLowerCase() :
					null;
				attrHandle[ name ] = handle;
			}
			return ret;
		};
	} else {
		attrHandle[ name ] = function( elem, name, isXML ) {
			if ( !isXML ) {
				return elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
			}
		};
	}
} );

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {

				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {

				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {

			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					( ret = elem.ownerDocument.createAttribute( name ) )
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			if ( name === "value" || value === elem.getAttribute( name ) ) {
				return value;
			}
		}
	};

	// Some attributes are constructed with empty-string values when not defined
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function( elem, name, isXML ) {
			var ret;
			if ( !isXML ) {
				return ( ret = elem.getAttributeNode( name ) ) && ret.value !== "" ?
					ret.value :
					null;
			}
		};

	// Fixing value retrieval on a button requires this module
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			if ( ret && ret.specified ) {
				return ret.value;
			}
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each( [ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	} );
}

if ( !support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {

			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case sensitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}




var rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each( function() {

			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch ( e ) {}
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) ||
						rclickable.test( elem.nodeName ) && elem.href ?
							0 :
							-1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !support.hrefNormalized ) {

	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each( [ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	} );
}

// Support: Safari, IE9+
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		},
		set: function( elem ) {
			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );

// IE6/7 call enctype encoding
if ( !support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}




var rclass = /[\t\r\n\f]/g;

function getClass( elem ) {
	return jQuery.attr( elem, "class" ) || "";
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		if ( typeof value === "string" && value ) {
			classes = value.match( rnotwhite ) || [];

			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 &&
					( " " + curValue + " " ).replace( rclass, " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = jQuery.trim( cur );
					if ( curValue !== finalValue ) {
						jQuery.attr( elem, "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( type === "string" ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = value.match( rnotwhite ) || [];

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// store className if set
					jQuery._data( this, "__className__", className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				jQuery.attr( this, "class",
					className || value === false ?
					"" :
					jQuery._data( this, "__className__" ) || ""
				);
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + getClass( elem ) + " " ).replace( rclass, " " )
					.indexOf( className ) > -1
			) {
				return true;
			}
		}

		return false;
	}
} );




// Return jQuery for attributes-only inclusion


jQuery.each( ( "blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );


var location = window.location;

var nonce = jQuery.now();

var rquery = ( /\?/ );



var rvalidtokens = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;

jQuery.parseJSON = function( data ) {

	// Attempt to parse using the native JSON parser first
	if ( window.JSON && window.JSON.parse ) {

		// Support: Android 2.3
		// Workaround failure to string-cast null input
		return window.JSON.parse( data + "" );
	}

	var requireNonComma,
		depth = null,
		str = jQuery.trim( data + "" );

	// Guard against invalid (and possibly dangerous) input by ensuring that nothing remains
	// after removing valid tokens
	return str && !jQuery.trim( str.replace( rvalidtokens, function( token, comma, open, close ) {

		// Force termination if we see a misplaced comma
		if ( requireNonComma && comma ) {
			depth = 0;
		}

		// Perform no more replacements after returning to outermost depth
		if ( depth === 0 ) {
			return token;
		}

		// Commas must not follow "[", "{", or ","
		requireNonComma = open || comma;

		// Determine new depth
		// array/object open ("[" or "{"): depth += true - false (increment)
		// array/object close ("]" or "}"): depth += false - true (decrement)
		// other cases ("," or primitive): depth += true - true (numeric cast)
		depth += !close - !open;

		// Remove this token
		return "";
	} ) ) ?
		( Function( "return " + str ) )() :
		jQuery.error( "Invalid JSON: " + data );
};


// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml, tmp;
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	try {
		if ( window.DOMParser ) { // Standard
			tmp = new window.DOMParser();
			xml = tmp.parseFromString( data, "text/xml" );
		} else { // IE
			xml = new window.ActiveXObject( "Microsoft.XMLDOM" );
			xml.async = "false";
			xml.loadXML( data );
		}
	} catch ( e ) {
		xml = undefined;
	}
	if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,

	// IE leaves an \r character at EOL
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Document location
	ajaxLocation = location.href,

	// Segment location into parts
	ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType.charAt( 0 ) === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) { // jscs:ignore requireDotNotation
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var

			// Cross-domain detection vars
			parts,

			// Loop variable
			i,

			// URL without anti-cache param
			cacheURL,

			// Response headers as string
			responseHeadersString,

			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,

			// Response headers
			responseHeaders,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// The jqXHR state
			state = 0,

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {

								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" )
			.replace( rhash, "" )
			.replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( rnotwhite ) || [ "" ];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data );

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( state === 2 ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );

				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapAll( html.call( this, i ) );
			} );
		}

		if ( this[ 0 ] ) {

			// The elements to wrap the target around
			var wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( isFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function() {
		return this.parent().each( function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		} ).end();
	}
} );


function getDisplay( elem ) {
	return elem.style && elem.style.display || jQuery.css( elem, "display" );
}

function filterHidden( elem ) {

	// Disconnected elements are considered hidden
	if ( !jQuery.contains( elem.ownerDocument || document, elem ) ) {
		return true;
	}
	while ( elem && elem.nodeType === 1 ) {
		if ( getDisplay( elem ) === "none" || elem.type === "hidden" ) {
			return true;
		}
		elem = elem.parentNode;
	}
	return false;
}

jQuery.expr.filters.hidden = function( elem ) {

	// Support: Opera <= 12.12
	// Opera reports offsetWidths and offsetHeights less than zero on some elements
	return support.reliableHiddenOffsets() ?
		( elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			!elem.getClientRects().length ) :
			filterHidden( elem );
};

jQuery.expr.filters.visible = function( elem ) {
	return !jQuery.expr.filters.hidden( elem );
};




var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {

			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ) {
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					} ) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject !== undefined ?

	// Support: IE6-IE8
	function() {

		// XHR cannot access local files, always use ActiveX for that case
		if ( this.isLocal ) {
			return createActiveXHR();
		}

		// Support: IE 9-11
		// IE seems to error on cross-domain PATCH requests when ActiveX XHR
		// is used. In IE 9+ always use the native XHR.
		// Note: this condition won't catch Edge as it doesn't define
		// document.documentMode but it also doesn't support ActiveX so it won't
		// reach this code.
		if ( document.documentMode > 8 ) {
			return createStandardXHR();
		}

		// Support: IE<9
		// oldIE XHR does not support non-RFC2616 methods (#13240)
		// See http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		// and http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		// Although this check for six methods instead of eight
		// since IE also does not support "trace" and "connect"
		return /^(get|post|head|put|delete|options)$/i.test( this.type ) &&
			createStandardXHR() || createActiveXHR();
	} :

	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

var xhrId = 0,
	xhrCallbacks = {},
	xhrSupported = jQuery.ajaxSettings.xhr();

// Support: IE<10
// Open requests must be manually aborted on unload (#5280)
// See https://support.microsoft.com/kb/2856746 for more info
if ( window.attachEvent ) {
	window.attachEvent( "onunload", function() {
		for ( var key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	} );
}

// Determine support properties
support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport( function( options ) {

		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !options.crossDomain || support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {
					var i,
						xhr = options.xhr(),
						id = ++xhrId;

					// Open the socket
					xhr.open(
						options.type,
						options.url,
						options.async,
						options.username,
						options.password
					);

					// Apply custom fields if provided
					if ( options.xhrFields ) {
						for ( i in options.xhrFields ) {
							xhr[ i ] = options.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( options.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( options.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
						headers[ "X-Requested-With" ] = "XMLHttpRequest";
					}

					// Set headers
					for ( i in headers ) {

						// Support: IE<9
						// IE's ActiveXObject throws a 'Type Mismatch' exception when setting
						// request header to a null-value.
						//
						// To keep consistent with other XHR implementations, cast the value
						// to string and ignore `undefined`.
						if ( headers[ i ] !== undefined ) {
							xhr.setRequestHeader( i, headers[ i ] + "" );
						}
					}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( options.hasContent && options.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, statusText, responses;

						// Was never called and is aborted or complete
						if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

							// Clean up
							delete xhrCallbacks[ id ];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							// Abort manually if needed
							if ( isAbort ) {
								if ( xhr.readyState !== 4 ) {
									xhr.abort();
								}
							} else {
								responses = {};
								status = xhr.status;

								// Support: IE<10
								// Accessing binary-data responseText throws an exception
								// (#11426)
								if ( typeof xhr.responseText === "string" ) {
									responses.text = xhr.responseText;
								}

								// Firefox throws an exception when accessing
								// statusText for faulty cross-domain requests
								try {
									statusText = xhr.statusText;
								} catch ( e ) {

									// We normalize with Webkit giving an empty statusText
									statusText = "";
								}

								// Filter status for non standard behaviors

								// If the request is local and we have data: assume a success
								// (success with no data won't get notified, that's the best we
								// can do given current implementations)
								if ( !status && options.isLocal && !options.crossDomain ) {
									status = responses.text ? 200 : 404;

								// IE - #1450: sometimes returns 1223 when it should be 204
								} else if ( status === 1223 ) {
									status = 204;
								}
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, xhr.getAllResponseHeaders() );
						}
					};

					// Do send the request
					// `xhr.send` may raise an exception, but it will be
					// handled in jQuery.ajax (so no try/catch here)
					if ( !options.async ) {

						// If we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {

						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						window.setTimeout( callback );
					} else {

						// Register the callback, but delay it in case `xhr.send` throws
						// Add to the list of active xhr callbacks
						xhr.onreadystatechange = xhrCallbacks[ id ] = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	} );
}

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject( "Microsoft.XMLHTTP" );
	} catch ( e ) {}
}




// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery( "head" )[ 0 ] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement( "script" );

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// data: string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( !data || typeof data !== "string" ) {
		return null;
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}
	context = context || document;

	var parsed = rsingleTag.exec( data ),
		scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


// Keep a copy of the old load method
var _load = jQuery.fn.load;

/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = jQuery.trim( url.slice( off, url.length ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.filters.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};





/**
 * Gets a window from an element
 */
function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}

jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			jQuery.inArray( "auto", [ curCSSTop, curCSSLeft ] ) > -1;

		// need to be able to calculate position if either top or left
		// is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {
	offset: function( options ) {
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var docElem, win,
			box = { top: 0, left: 0 },
			elem = this[ 0 ],
			doc = elem && elem.ownerDocument;

		if ( !doc ) {
			return;
		}

		docElem = doc.documentElement;

		// Make sure it's not a disconnected DOM node
		if ( !jQuery.contains( docElem, elem ) ) {
			return box;
		}

		// If we don't have gBCR, just use 0,0 rather than error
		// BlackBerry 5, iOS 3 (original iPhone)
		if ( typeof elem.getBoundingClientRect !== "undefined" ) {
			box = elem.getBoundingClientRect();
		}
		win = getWindow( doc );
		return {
			top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
			left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
		};
	},

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// Fixed elements are offset from window (parentOffset = {top:0, left: 0},
		// because it is its only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {

			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? ( prop in win ) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
} );

// Support: Safari<7-8+, Chrome<37-44+
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// getComputedStyle returns percent when specified for top/left/bottom/right
// rather than make the css module depend on the offset module, we just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// if curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
	function( defaultExtra, funcName ) {

		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {

					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only,
					// but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	} );
} );


jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}



var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in
// AMD (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}

return jQuery;
}));
(function() {
  (function() {
    (function() {
      this.Rails = {
        linkClickSelector: 'a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]',
        buttonClickSelector: {
          selector: 'button[data-remote]:not([form]), button[data-confirm]:not([form])',
          exclude: 'form button'
        },
        inputChangeSelector: 'select[data-remote], input[data-remote], textarea[data-remote]',
        formSubmitSelector: 'form',
        formInputClickSelector: 'form input[type=submit], form input[type=image], form button[type=submit], form button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])',
        formDisableSelector: 'input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled',
        formEnableSelector: 'input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled',
        fileInputSelector: 'input[name][type=file]:not([disabled])',
        linkDisableSelector: 'a[data-disable-with], a[data-disable]',
        buttonDisableSelector: 'button[data-remote][data-disable-with], button[data-remote][data-disable]'
      };

    }).call(this);
  }).call(this);

  var Rails = this.Rails;

  (function() {
    (function() {
      var expando, m;

      m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;

      Rails.matches = function(element, selector) {
        if (selector.exclude != null) {
          return m.call(element, selector.selector) && !m.call(element, selector.exclude);
        } else {
          return m.call(element, selector);
        }
      };

      expando = '_ujsData';

      Rails.getData = function(element, key) {
        var ref;
        return (ref = element[expando]) != null ? ref[key] : void 0;
      };

      Rails.setData = function(element, key, value) {
        if (element[expando] == null) {
          element[expando] = {};
        }
        return element[expando][key] = value;
      };

      Rails.$ = function(selector) {
        return Array.prototype.slice.call(document.querySelectorAll(selector));
      };

    }).call(this);
    (function() {
      var $, csrfParam, csrfToken;

      $ = Rails.$;

      csrfToken = Rails.csrfToken = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-token]');
        return meta && meta.content;
      };

      csrfParam = Rails.csrfParam = function() {
        var meta;
        meta = document.querySelector('meta[name=csrf-param]');
        return meta && meta.content;
      };

      Rails.CSRFProtection = function(xhr) {
        var token;
        token = csrfToken();
        if (token != null) {
          return xhr.setRequestHeader('X-CSRF-Token', token);
        }
      };

      Rails.refreshCSRFTokens = function() {
        var param, token;
        token = csrfToken();
        param = csrfParam();
        if ((token != null) && (param != null)) {
          return $('form input[name="' + param + '"]').forEach(function(input) {
            return input.value = token;
          });
        }
      };

    }).call(this);
    (function() {
      var CustomEvent, fire, matches;

      matches = Rails.matches;

      CustomEvent = window.CustomEvent;

      if (typeof CustomEvent !== 'function') {
        CustomEvent = function(event, params) {
          var evt;
          evt = document.createEvent('CustomEvent');
          evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
          return evt;
        };
        CustomEvent.prototype = window.Event.prototype;
      }

      fire = Rails.fire = function(obj, name, data) {
        var event;
        event = new CustomEvent(name, {
          bubbles: true,
          cancelable: true,
          detail: data
        });
        obj.dispatchEvent(event);
        return !event.defaultPrevented;
      };

      Rails.stopEverything = function(e) {
        fire(e.target, 'ujs:everythingStopped');
        e.preventDefault();
        e.stopPropagation();
        return e.stopImmediatePropagation();
      };

      Rails.delegate = function(element, selector, eventType, handler) {
        return element.addEventListener(eventType, function(e) {
          var target;
          target = e.target;
          while (!(!(target instanceof Element) || matches(target, selector))) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            return e.stopPropagation();
          }
        });
      };

    }).call(this);
    (function() {
      var AcceptHeaders, CSRFProtection, createXHR, fire, prepareOptions, processResponse;

      CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;

      AcceptHeaders = {
        '*': '*/*',
        text: 'text/plain',
        html: 'text/html',
        xml: 'application/xml, text/xml',
        json: 'application/json, text/javascript',
        script: 'text/javascript, application/javascript, application/ecmascript, application/x-ecmascript'
      };

      Rails.ajax = function(options) {
        var xhr;
        options = prepareOptions(options);
        xhr = createXHR(options, function() {
          var response;
          response = processResponse(xhr.response, xhr.getResponseHeader('Content-Type'));
          if (Math.floor(xhr.status / 100) === 2) {
            if (typeof options.success === "function") {
              options.success(response, xhr.statusText, xhr);
            }
          } else {
            if (typeof options.error === "function") {
              options.error(response, xhr.statusText, xhr);
            }
          }
          return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
        });
        if (typeof options.beforeSend === "function") {
          options.beforeSend(xhr, options);
        }
        if (xhr.readyState === XMLHttpRequest.OPENED) {
          return xhr.send(options.data);
        } else {
          return fire(document, 'ajaxStop');
        }
      };

      prepareOptions = function(options) {
        options.type = options.type.toUpperCase();
        if (options.type === 'GET' && options.data) {
          if (options.url.indexOf('?') < 0) {
            options.url += '?' + options.data;
          } else {
            options.url += '&' + options.data;
          }
        }
        if (AcceptHeaders[options.dataType] == null) {
          options.dataType = '*';
        }
        options.accept = AcceptHeaders[options.dataType];
        if (options.dataType !== '*') {
          options.accept += ', */*; q=0.01';
        }
        return options;
      };

      createXHR = function(options, done) {
        var xhr;
        xhr = new XMLHttpRequest();
        xhr.open(options.type, options.url, true);
        xhr.setRequestHeader('Accept', options.accept);
        if (typeof options.data === 'string') {
          xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        }
        if (!options.crossDomain) {
          xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }
        CSRFProtection(xhr);
        xhr.withCredentials = !!options.withCredentials;
        xhr.onreadystatechange = function() {
          if (xhr.readyState === XMLHttpRequest.DONE) {
            return done(xhr);
          }
        };
        return xhr;
      };

      processResponse = function(response, type) {
        var parser, script;
        if (typeof response === 'string' && typeof type === 'string') {
          if (type.match(/\bjson\b/)) {
            try {
              response = JSON.parse(response);
            } catch (undefined) {}
          } else if (type.match(/\bjavascript\b/)) {
            script = document.createElement('script');
            script.innerHTML = response;
            document.body.appendChild(script);
          } else if (type.match(/\b(xml|html|svg)\b/)) {
            parser = new DOMParser();
            type = type.replace(/;.+/, '');
            try {
              response = parser.parseFromString(response, type);
            } catch (undefined) {}
          }
        }
        return response;
      };

      Rails.href = function(element) {
        return element.href;
      };

      Rails.isCrossDomain = function(url) {
        var e, error, originAnchor, urlAnchor;
        originAnchor = document.createElement('a');
        originAnchor.href = location.href;
        urlAnchor = document.createElement('a');
        try {
          urlAnchor.href = url;
          return !(((!urlAnchor.protocol || urlAnchor.protocol === ':') && !urlAnchor.host) || (originAnchor.protocol + '//' + originAnchor.host === urlAnchor.protocol + '//' + urlAnchor.host));
        } catch (error) {
          e = error;
          return true;
        }
      };

    }).call(this);
    (function() {
      var matches, toArray;

      matches = Rails.matches;

      toArray = function(e) {
        return Array.prototype.slice.call(e);
      };

      Rails.serializeElement = function(element, additionalParam) {
        var inputs, params;
        inputs = [element];
        if (matches(element, 'form')) {
          inputs = toArray(element.elements);
        }
        params = [];
        inputs.forEach(function(input) {
          if (!input.name) {
            return;
          }
          if (matches(input, 'select')) {
            return toArray(input.options).forEach(function(option) {
              if (option.selected) {
                return params.push({
                  name: input.name,
                  value: option.value
                });
              }
            });
          } else if (input.checked || ['radio', 'checkbox', 'submit'].indexOf(input.type) === -1) {
            return params.push({
              name: input.name,
              value: input.value
            });
          }
        });
        if (additionalParam) {
          params.push(additionalParam);
        }
        return params.map(function(param) {
          if (param.name != null) {
            return (encodeURIComponent(param.name)) + "=" + (encodeURIComponent(param.value));
          } else {
            return param;
          }
        }).join('&');
      };

      Rails.formElements = function(form, selector) {
        if (matches(form, 'form')) {
          return toArray(form.elements).filter(function(el) {
            return matches(el, selector);
          });
        } else {
          return toArray(form.querySelectorAll(selector));
        }
      };

    }).call(this);
    (function() {
      var allowAction, fire, stopEverything;

      fire = Rails.fire, stopEverything = Rails.stopEverything;

      Rails.handleConfirm = function(e) {
        if (!allowAction(this)) {
          return stopEverything(e);
        }
      };

      allowAction = function(element) {
        var answer, callback, message;
        message = element.getAttribute('data-confirm');
        if (!message) {
          return true;
        }
        answer = false;
        if (fire(element, 'confirm')) {
          try {
            answer = confirm(message);
          } catch (undefined) {}
          callback = fire(element, 'confirm:complete', [answer]);
        }
        return answer && callback;
      };

    }).call(this);
    (function() {
      var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, matches, setData, stopEverything;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;

      Rails.enableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return enableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
          return enableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return enableFormElements(element);
        }
      };

      Rails.disableElement = function(e) {
        var element;
        element = e instanceof Event ? e.target : e;
        if (matches(element, Rails.linkDisableSelector)) {
          return disableLinkElement(element);
        } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
          return disableFormElement(element);
        } else if (matches(element, Rails.formSubmitSelector)) {
          return disableFormElements(element);
        }
      };

      disableLinkElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          setData(element, 'ujs:enable-with', element.innerHTML);
          element.innerHTML = replacement;
        }
        element.addEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', true);
      };

      enableLinkElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          element.innerHTML = originalText;
          setData(element, 'ujs:enable-with', null);
        }
        element.removeEventListener('click', stopEverything);
        return setData(element, 'ujs:disabled', null);
      };

      disableFormElements = function(form) {
        return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
      };

      disableFormElement = function(element) {
        var replacement;
        replacement = element.getAttribute('data-disable-with');
        if (replacement != null) {
          if (matches(element, 'button')) {
            setData(element, 'ujs:enable-with', element.innerHTML);
            element.innerHTML = replacement;
          } else {
            setData(element, 'ujs:enable-with', element.value);
            element.value = replacement;
          }
        }
        element.disabled = true;
        return setData(element, 'ujs:disabled', true);
      };

      enableFormElements = function(form) {
        return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
      };

      enableFormElement = function(element) {
        var originalText;
        originalText = getData(element, 'ujs:enable-with');
        if (originalText != null) {
          if (matches(element, 'button')) {
            element.innerHTML = originalText;
          } else {
            element.value = originalText;
          }
          setData(element, 'ujs:enable-with', null);
        }
        element.disabled = false;
        return setData(element, 'ujs:disabled', null);
      };

    }).call(this);
    (function() {
      var stopEverything;

      stopEverything = Rails.stopEverything;

      Rails.handleMethod = function(e) {
        var csrfParam, csrfToken, form, formContent, href, link, method;
        link = this;
        method = link.getAttribute('data-method');
        if (!method) {
          return;
        }
        href = Rails.href(link);
        csrfToken = Rails.csrfToken();
        csrfParam = Rails.csrfParam();
        form = document.createElement('form');
        formContent = "<input name='_method' value='" + method + "' type='hidden' />";
        if ((csrfParam != null) && (csrfToken != null) && !Rails.isCrossDomain(href)) {
          formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
        }
        formContent += '<input type="submit" />';
        form.method = 'post';
        form.action = href;
        form.target = link.target;
        form.innerHTML = formContent;
        form.style.display = 'none';
        document.body.appendChild(form);
        form.querySelector('[type="submit"]').click();
        return stopEverything(e);
      };

    }).call(this);
    (function() {
      var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything,
        slice = [].slice;

      matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;

      isRemote = function(element) {
        var value;
        value = element.getAttribute('data-remote');
        return (value != null) && value !== 'false';
      };

      Rails.handleRemote = function(e) {
        var button, data, dataType, element, method, url, withCredentials;
        element = this;
        if (!isRemote(element)) {
          return true;
        }
        if (!fire(element, 'ajax:before')) {
          fire(element, 'ajax:stopped');
          return false;
        }
        withCredentials = element.getAttribute('data-with-credentials');
        dataType = element.getAttribute('data-type') || 'script';
        if (matches(element, Rails.formSubmitSelector)) {
          button = getData(element, 'ujs:submit-button');
          method = getData(element, 'ujs:submit-button-formmethod') || element.method;
          url = getData(element, 'ujs:submit-button-formaction') || element.getAttribute('action') || location.href;
          if (method.toUpperCase() === 'GET') {
            url = url.replace(/\?.*$/, '');
          }
          if (element.enctype === 'multipart/form-data') {
            data = new FormData(element);
            if (button != null) {
              data.append(button.name, button.value);
            }
          } else {
            data = serializeElement(element, button);
          }
          setData(element, 'ujs:submit-button', null);
          setData(element, 'ujs:submit-button-formmethod', null);
          setData(element, 'ujs:submit-button-formaction', null);
        } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
          method = element.getAttribute('data-method');
          url = element.getAttribute('data-url');
          data = serializeElement(element, element.getAttribute('data-params'));
        } else {
          method = element.getAttribute('data-method');
          url = Rails.href(element);
          data = element.getAttribute('data-params');
        }
        ajax({
          type: method || 'GET',
          url: url,
          data: data,
          dataType: dataType,
          beforeSend: function(xhr, options) {
            if (fire(element, 'ajax:beforeSend', [xhr, options])) {
              return fire(element, 'ajax:send', [xhr]);
            } else {
              fire(element, 'ajax:stopped');
              return xhr.abort();
            }
          },
          success: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:success', args);
          },
          error: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:error', args);
          },
          complete: function() {
            var args;
            args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
            return fire(element, 'ajax:complete', args);
          },
          crossDomain: isCrossDomain(url),
          withCredentials: (withCredentials != null) && withCredentials !== 'false'
        });
        return stopEverything(e);
      };

      Rails.formSubmitButtonClick = function(e) {
        var button, form;
        button = this;
        form = button.form;
        if (!form) {
          return;
        }
        if (button.name) {
          setData(form, 'ujs:submit-button', {
            name: button.name,
            value: button.value
          });
        }
        setData(form, 'ujs:formnovalidate-button', button.formNoValidate);
        setData(form, 'ujs:submit-button-formaction', button.getAttribute('formaction'));
        return setData(form, 'ujs:submit-button-formmethod', button.getAttribute('formmethod'));
      };

      Rails.handleMetaClick = function(e) {
        var data, link, metaClick, method;
        link = this;
        method = (link.getAttribute('data-method') || 'GET').toUpperCase();
        data = link.getAttribute('data-params');
        metaClick = e.metaKey || e.ctrlKey;
        if (metaClick && method === 'GET' && !data) {
          return e.stopImmediatePropagation();
        }
      };

    }).call(this);
    (function() {
      var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleMetaClick, handleMethod, handleRemote, refreshCSRFTokens;

      fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleConfirm = Rails.handleConfirm, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMetaClick = Rails.handleMetaClick, handleMethod = Rails.handleMethod;

      if ((typeof jQuery !== "undefined" && jQuery !== null) && !jQuery.rails) {
        jQuery.rails = Rails;
        jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
          if (!options.crossDomain) {
            return CSRFProtection(xhr);
          }
        });
      }

      Rails.start = function() {
        if (window._rails_loaded) {
          throw new Error('rails-ujs has already been loaded!');
        }
        window.addEventListener('pageshow', function() {
          $(Rails.formEnableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
          return $(Rails.linkDisableSelector).forEach(function(el) {
            if (getData(el, 'ujs:disabled')) {
              return enableElement(el);
            }
          });
        });
        delegate(document, Rails.linkDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.linkDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.buttonDisableSelector, 'ajax:stopped', enableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleConfirm);
        delegate(document, Rails.linkClickSelector, 'click', handleMetaClick);
        delegate(document, Rails.linkClickSelector, 'click', disableElement);
        delegate(document, Rails.linkClickSelector, 'click', handleRemote);
        delegate(document, Rails.linkClickSelector, 'click', handleMethod);
        delegate(document, Rails.buttonClickSelector, 'click', handleConfirm);
        delegate(document, Rails.buttonClickSelector, 'click', disableElement);
        delegate(document, Rails.buttonClickSelector, 'click', handleRemote);
        delegate(document, Rails.inputChangeSelector, 'change', handleConfirm);
        delegate(document, Rails.inputChangeSelector, 'change', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', handleConfirm);
        delegate(document, Rails.formSubmitSelector, 'submit', handleRemote);
        delegate(document, Rails.formSubmitSelector, 'submit', function(e) {
          return setTimeout((function() {
            return disableElement(e);
          }), 13);
        });
        delegate(document, Rails.formSubmitSelector, 'ajax:send', disableElement);
        delegate(document, Rails.formSubmitSelector, 'ajax:complete', enableElement);
        delegate(document, Rails.formInputClickSelector, 'click', handleConfirm);
        delegate(document, Rails.formInputClickSelector, 'click', formSubmitButtonClick);
        document.addEventListener('DOMContentLoaded', refreshCSRFTokens);
        return window._rails_loaded = true;
      };

      if (window.Rails === Rails && fire(document, 'rails:attachBindings')) {
        Rails.start();
      }

    }).call(this);
  }).call(this);

  if (typeof module === "object" && module.exports) {
    module.exports = Rails;
  } else if (typeof define === "function" && define.amd) {
    define(Rails);
  }
}).call(this);
/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);
/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);
/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */


+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);
/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);
/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);
/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);
/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */



+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);












(function() {
  var slice = [].slice;

  this.ActionCable = {
    INTERNAL: {
      "message_types": {
        "welcome": "welcome",
        "ping": "ping",
        "confirmation": "confirm_subscription",
        "rejection": "reject_subscription"
      },
      "default_mount_path": "/cable",
      "protocols": ["actioncable-v1-json", "actioncable-unsupported"]
    },
    WebSocket: window.WebSocket,
    logger: window.console,
    createConsumer: function(url) {
      var ref;
      if (url == null) {
        url = (ref = this.getConfig("url")) != null ? ref : this.INTERNAL.default_mount_path;
      }
      return new ActionCable.Consumer(this.createWebSocketURL(url));
    },
    getConfig: function(name) {
      var element;
      element = document.head.querySelector("meta[name='action-cable-" + name + "']");
      return element != null ? element.getAttribute("content") : void 0;
    },
    createWebSocketURL: function(url) {
      var a;
      if (url && !/^wss?:/i.test(url)) {
        a = document.createElement("a");
        a.href = url;
        a.href = a.href;
        a.protocol = a.protocol.replace("http", "ws");
        return a.href;
      } else {
        return url;
      }
    },
    startDebugging: function() {
      return this.debugging = true;
    },
    stopDebugging: function() {
      return this.debugging = null;
    },
    log: function() {
      var messages, ref;
      messages = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      if (this.debugging) {
        messages.push(Date.now());
        return (ref = this.logger).log.apply(ref, ["[ActionCable]"].concat(slice.call(messages)));
      }
    }
  };

}).call(this);
(function() {
  var bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  ActionCable.ConnectionMonitor = (function() {
    var clamp, now, secondsSince;

    ConnectionMonitor.pollInterval = {
      min: 3,
      max: 30
    };

    ConnectionMonitor.staleThreshold = 6;

    function ConnectionMonitor(connection) {
      this.connection = connection;
      this.visibilityDidChange = bind(this.visibilityDidChange, this);
      this.reconnectAttempts = 0;
    }

    ConnectionMonitor.prototype.start = function() {
      if (!this.isRunning()) {
        this.startedAt = now();
        delete this.stoppedAt;
        this.startPolling();
        document.addEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor started. pollInterval = " + (this.getPollInterval()) + " ms");
      }
    };

    ConnectionMonitor.prototype.stop = function() {
      if (this.isRunning()) {
        this.stoppedAt = now();
        this.stopPolling();
        document.removeEventListener("visibilitychange", this.visibilityDidChange);
        return ActionCable.log("ConnectionMonitor stopped");
      }
    };

    ConnectionMonitor.prototype.isRunning = function() {
      return (this.startedAt != null) && (this.stoppedAt == null);
    };

    ConnectionMonitor.prototype.recordPing = function() {
      return this.pingedAt = now();
    };

    ConnectionMonitor.prototype.recordConnect = function() {
      this.reconnectAttempts = 0;
      this.recordPing();
      delete this.disconnectedAt;
      return ActionCable.log("ConnectionMonitor recorded connect");
    };

    ConnectionMonitor.prototype.recordDisconnect = function() {
      this.disconnectedAt = now();
      return ActionCable.log("ConnectionMonitor recorded disconnect");
    };

    ConnectionMonitor.prototype.startPolling = function() {
      this.stopPolling();
      return this.poll();
    };

    ConnectionMonitor.prototype.stopPolling = function() {
      return clearTimeout(this.pollTimeout);
    };

    ConnectionMonitor.prototype.poll = function() {
      return this.pollTimeout = setTimeout((function(_this) {
        return function() {
          _this.reconnectIfStale();
          return _this.poll();
        };
      })(this), this.getPollInterval());
    };

    ConnectionMonitor.prototype.getPollInterval = function() {
      var interval, max, min, ref;
      ref = this.constructor.pollInterval, min = ref.min, max = ref.max;
      interval = 5 * Math.log(this.reconnectAttempts + 1);
      return Math.round(clamp(interval, min, max) * 1000);
    };

    ConnectionMonitor.prototype.reconnectIfStale = function() {
      if (this.connectionIsStale()) {
        ActionCable.log("ConnectionMonitor detected stale connection. reconnectAttempts = " + this.reconnectAttempts + ", pollInterval = " + (this.getPollInterval()) + " ms, time disconnected = " + (secondsSince(this.disconnectedAt)) + " s, stale threshold = " + this.constructor.staleThreshold + " s");
        this.reconnectAttempts++;
        if (this.disconnectedRecently()) {
          return ActionCable.log("ConnectionMonitor skipping reopening recent disconnect");
        } else {
          ActionCable.log("ConnectionMonitor reopening");
          return this.connection.reopen();
        }
      }
    };

    ConnectionMonitor.prototype.connectionIsStale = function() {
      var ref;
      return secondsSince((ref = this.pingedAt) != null ? ref : this.startedAt) > this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.disconnectedRecently = function() {
      return this.disconnectedAt && secondsSince(this.disconnectedAt) < this.constructor.staleThreshold;
    };

    ConnectionMonitor.prototype.visibilityDidChange = function() {
      if (document.visibilityState === "visible") {
        return setTimeout((function(_this) {
          return function() {
            if (_this.connectionIsStale() || !_this.connection.isOpen()) {
              ActionCable.log("ConnectionMonitor reopening stale connection on visibilitychange. visbilityState = " + document.visibilityState);
              return _this.connection.reopen();
            }
          };
        })(this), 200);
      }
    };

    now = function() {
      return new Date().getTime();
    };

    secondsSince = function(time) {
      return (now() - time) / 1000;
    };

    clamp = function(number, min, max) {
      return Math.max(min, Math.min(max, number));
    };

    return ConnectionMonitor;

  })();

}).call(this);
(function() {
  var i, message_types, protocols, ref, supportedProtocols, unsupportedProtocol,
    slice = [].slice,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  ref = ActionCable.INTERNAL, message_types = ref.message_types, protocols = ref.protocols;

  supportedProtocols = 2 <= protocols.length ? slice.call(protocols, 0, i = protocols.length - 1) : (i = 0, []), unsupportedProtocol = protocols[i++];

  ActionCable.Connection = (function() {
    Connection.reopenDelay = 500;

    function Connection(consumer) {
      this.consumer = consumer;
      this.open = bind(this.open, this);
      this.subscriptions = this.consumer.subscriptions;
      this.monitor = new ActionCable.ConnectionMonitor(this);
      this.disconnected = true;
    }

    Connection.prototype.send = function(data) {
      if (this.isOpen()) {
        this.webSocket.send(JSON.stringify(data));
        return true;
      } else {
        return false;
      }
    };

    Connection.prototype.open = function() {
      if (this.isActive()) {
        ActionCable.log("Attempted to open WebSocket, but existing socket is " + (this.getState()));
        return false;
      } else {
        ActionCable.log("Opening WebSocket, current state is " + (this.getState()) + ", subprotocols: " + protocols);
        if (this.webSocket != null) {
          this.uninstallEventHandlers();
        }
        this.webSocket = new ActionCable.WebSocket(this.consumer.url, protocols);
        this.installEventHandlers();
        this.monitor.start();
        return true;
      }
    };

    Connection.prototype.close = function(arg) {
      var allowReconnect, ref1;
      allowReconnect = (arg != null ? arg : {
        allowReconnect: true
      }).allowReconnect;
      if (!allowReconnect) {
        this.monitor.stop();
      }
      if (this.isActive()) {
        return (ref1 = this.webSocket) != null ? ref1.close() : void 0;
      }
    };

    Connection.prototype.reopen = function() {
      var error;
      ActionCable.log("Reopening WebSocket, current state is " + (this.getState()));
      if (this.isActive()) {
        try {
          return this.close();
        } catch (error1) {
          error = error1;
          return ActionCable.log("Failed to reopen WebSocket", error);
        } finally {
          ActionCable.log("Reopening WebSocket in " + this.constructor.reopenDelay + "ms");
          setTimeout(this.open, this.constructor.reopenDelay);
        }
      } else {
        return this.open();
      }
    };

    Connection.prototype.getProtocol = function() {
      var ref1;
      return (ref1 = this.webSocket) != null ? ref1.protocol : void 0;
    };

    Connection.prototype.isOpen = function() {
      return this.isState("open");
    };

    Connection.prototype.isActive = function() {
      return this.isState("open", "connecting");
    };

    Connection.prototype.isProtocolSupported = function() {
      var ref1;
      return ref1 = this.getProtocol(), indexOf.call(supportedProtocols, ref1) >= 0;
    };

    Connection.prototype.isState = function() {
      var ref1, states;
      states = 1 <= arguments.length ? slice.call(arguments, 0) : [];
      return ref1 = this.getState(), indexOf.call(states, ref1) >= 0;
    };

    Connection.prototype.getState = function() {
      var ref1, state, value;
      for (state in WebSocket) {
        value = WebSocket[state];
        if (value === ((ref1 = this.webSocket) != null ? ref1.readyState : void 0)) {
          return state.toLowerCase();
        }
      }
      return null;
    };

    Connection.prototype.installEventHandlers = function() {
      var eventName, handler;
      for (eventName in this.events) {
        handler = this.events[eventName].bind(this);
        this.webSocket["on" + eventName] = handler;
      }
    };

    Connection.prototype.uninstallEventHandlers = function() {
      var eventName;
      for (eventName in this.events) {
        this.webSocket["on" + eventName] = function() {};
      }
    };

    Connection.prototype.events = {
      message: function(event) {
        var identifier, message, ref1, type;
        if (!this.isProtocolSupported()) {
          return;
        }
        ref1 = JSON.parse(event.data), identifier = ref1.identifier, message = ref1.message, type = ref1.type;
        switch (type) {
          case message_types.welcome:
            this.monitor.recordConnect();
            return this.subscriptions.reload();
          case message_types.ping:
            return this.monitor.recordPing();
          case message_types.confirmation:
            return this.subscriptions.notify(identifier, "connected");
          case message_types.rejection:
            return this.subscriptions.reject(identifier);
          default:
            return this.subscriptions.notify(identifier, "received", message);
        }
      },
      open: function() {
        ActionCable.log("WebSocket onopen event, using '" + (this.getProtocol()) + "' subprotocol");
        this.disconnected = false;
        if (!this.isProtocolSupported()) {
          ActionCable.log("Protocol is unsupported. Stopping monitor and disconnecting.");
          return this.close({
            allowReconnect: false
          });
        }
      },
      close: function(event) {
        ActionCable.log("WebSocket onclose event");
        if (this.disconnected) {
          return;
        }
        this.disconnected = true;
        this.monitor.recordDisconnect();
        return this.subscriptions.notifyAll("disconnected", {
          willAttemptReconnect: this.monitor.isRunning()
        });
      },
      error: function() {
        return ActionCable.log("WebSocket onerror event");
      }
    };

    return Connection;

  })();

}).call(this);
(function() {
  var slice = [].slice;

  ActionCable.Subscriptions = (function() {
    function Subscriptions(consumer) {
      this.consumer = consumer;
      this.subscriptions = [];
    }

    Subscriptions.prototype.create = function(channelName, mixin) {
      var channel, params, subscription;
      channel = channelName;
      params = typeof channel === "object" ? channel : {
        channel: channel
      };
      subscription = new ActionCable.Subscription(this.consumer, params, mixin);
      return this.add(subscription);
    };

    Subscriptions.prototype.add = function(subscription) {
      this.subscriptions.push(subscription);
      this.consumer.ensureActiveConnection();
      this.notify(subscription, "initialized");
      this.sendCommand(subscription, "subscribe");
      return subscription;
    };

    Subscriptions.prototype.remove = function(subscription) {
      this.forget(subscription);
      if (!this.findAll(subscription.identifier).length) {
        this.sendCommand(subscription, "unsubscribe");
      }
      return subscription;
    };

    Subscriptions.prototype.reject = function(identifier) {
      var i, len, ref, results, subscription;
      ref = this.findAll(identifier);
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        this.forget(subscription);
        this.notify(subscription, "rejected");
        results.push(subscription);
      }
      return results;
    };

    Subscriptions.prototype.forget = function(subscription) {
      var s;
      this.subscriptions = (function() {
        var i, len, ref, results;
        ref = this.subscriptions;
        results = [];
        for (i = 0, len = ref.length; i < len; i++) {
          s = ref[i];
          if (s !== subscription) {
            results.push(s);
          }
        }
        return results;
      }).call(this);
      return subscription;
    };

    Subscriptions.prototype.findAll = function(identifier) {
      var i, len, ref, results, s;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        s = ref[i];
        if (s.identifier === identifier) {
          results.push(s);
        }
      }
      return results;
    };

    Subscriptions.prototype.reload = function() {
      var i, len, ref, results, subscription;
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.sendCommand(subscription, "subscribe"));
      }
      return results;
    };

    Subscriptions.prototype.notifyAll = function() {
      var args, callbackName, i, len, ref, results, subscription;
      callbackName = arguments[0], args = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      ref = this.subscriptions;
      results = [];
      for (i = 0, len = ref.length; i < len; i++) {
        subscription = ref[i];
        results.push(this.notify.apply(this, [subscription, callbackName].concat(slice.call(args))));
      }
      return results;
    };

    Subscriptions.prototype.notify = function() {
      var args, callbackName, i, len, results, subscription, subscriptions;
      subscription = arguments[0], callbackName = arguments[1], args = 3 <= arguments.length ? slice.call(arguments, 2) : [];
      if (typeof subscription === "string") {
        subscriptions = this.findAll(subscription);
      } else {
        subscriptions = [subscription];
      }
      results = [];
      for (i = 0, len = subscriptions.length; i < len; i++) {
        subscription = subscriptions[i];
        results.push(typeof subscription[callbackName] === "function" ? subscription[callbackName].apply(subscription, args) : void 0);
      }
      return results;
    };

    Subscriptions.prototype.sendCommand = function(subscription, command) {
      var identifier;
      identifier = subscription.identifier;
      return this.consumer.send({
        command: command,
        identifier: identifier
      });
    };

    return Subscriptions;

  })();

}).call(this);
(function() {
  ActionCable.Subscription = (function() {
    var extend;

    function Subscription(consumer, params, mixin) {
      this.consumer = consumer;
      if (params == null) {
        params = {};
      }
      this.identifier = JSON.stringify(params);
      extend(this, mixin);
    }

    Subscription.prototype.perform = function(action, data) {
      if (data == null) {
        data = {};
      }
      data.action = action;
      return this.send(data);
    };

    Subscription.prototype.send = function(data) {
      return this.consumer.send({
        command: "message",
        identifier: this.identifier,
        data: JSON.stringify(data)
      });
    };

    Subscription.prototype.unsubscribe = function() {
      return this.consumer.subscriptions.remove(this);
    };

    extend = function(object, properties) {
      var key, value;
      if (properties != null) {
        for (key in properties) {
          value = properties[key];
          object[key] = value;
        }
      }
      return object;
    };

    return Subscription;

  })();

}).call(this);
(function() {
  ActionCable.Consumer = (function() {
    function Consumer(url) {
      this.url = url;
      this.subscriptions = new ActionCable.Subscriptions(this);
      this.connection = new ActionCable.Connection(this);
    }

    Consumer.prototype.send = function(data) {
      return this.connection.send(data);
    };

    Consumer.prototype.connect = function() {
      return this.connection.open();
    };

    Consumer.prototype.disconnect = function() {
      return this.connection.close({
        allowReconnect: false
      });
    };

    Consumer.prototype.ensureActiveConnection = function() {
      if (!this.connection.isActive()) {
        return this.connection.open();
      }
    };

    return Consumer;

  })();

}).call(this);
// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.
//




(function() {
  this.App || (this.App = {});

  App.cable = ActionCable.createConsumer();

}).call(this);
(function() {


}).call(this);
/*
 * Dropit v1.1.0
 * http://dev7studios.com/dropit
 *
 * Copyright 2012, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */


;(function($) {

    $.fn.dropit = function(method) {

        var methods = {

            init : function(options) {
                this.dropit.settings = $.extend({}, this.dropit.defaults, options);
                return this.each(function() {
                    var $el = $(this),
                         el = this,
                         settings = $.fn.dropit.settings;

                    // Hide initial submenus
                    $el.addClass('dropit')
                    .find('>'+ settings.triggerParentEl +':has('+ settings.submenuEl +')').addClass('dropit-trigger')
                    .find(settings.submenuEl).addClass('dropit-submenu').hide();

                    // Open on click
                    $el.off(settings.action).on(settings.action, settings.triggerParentEl +':has('+ settings.submenuEl +') > '+ settings.triggerEl +'', function(){
                        // Close click menu's if clicked again
                        if(settings.action == 'click' && $(this).parents(settings.triggerParentEl).hasClass('dropit-open')){
                            settings.beforeHide.call(this);
                            $(this).parents(settings.triggerParentEl).removeClass('dropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                            return false;
                        }

                        // Hide open menus
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);

                        // Open this menu
                        settings.beforeShow.call(this);
                        $(this).parents(settings.triggerParentEl).addClass('dropit-open').find(settings.submenuEl).show();
                        settings.afterShow.call(this);

                        return false;
                    });

                    // Close if outside click
                    $(document).on('click', function(){
                        settings.beforeHide.call(this);
                        $('.dropit-open').removeClass('dropit-open').find('.dropit-submenu').hide();
                        settings.afterHide.call(this);
                    });

                    // If hover
                    if(settings.action == 'mouseenter'){
                        $el.on('mouseleave', '.dropit-open', function(){
                            settings.beforeHide.call(this);
                            $(this).removeClass('dropit-open').find(settings.submenuEl).hide();
                            settings.afterHide.call(this);
                        });
                    }

                    settings.afterLoad.call(this);
                });
            }

        };

        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error( 'Method "' +  method + '" does not exist in dropit plugin!');
        }

    };

    $.fn.dropit.defaults = {
        action: 'click', // The open action for the trigger
        submenuEl: 'ul', // The submenu element
        triggerEl: 'a', // The trigger element
        triggerParentEl: 'li', // The trigger parent element
        afterLoad: function(){}, // Triggers when plugin has loaded
        beforeShow: function(){}, // Triggers before submenu is shown
        afterShow: function(){}, // Triggers after submenu is shown
        beforeHide: function(){}, // Triggers before submenu is hidden
        afterHide: function(){} // Triggers before submenu is hidden
    };

    $.fn.dropit.settings = {};

})(jQuery);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {


}).call(this);
(function() {
  $(function() {
    return $('#add-search').click(function() {
      $('#search_form').append($('#new_search_form').html());
      return false;
    });
  });

}).call(this);
/*!
 * ui-grid - v4.0.7 - 2017-09-27
 * Copyright (c) 2017 ; License: MIT 
 */


!function(){"use strict";angular.module("ui.grid.i18n",[]),angular.module("ui.grid",["ui.grid.i18n"])}(),function(){"use strict";angular.module("ui.grid").constant("uiGridConstants",{LOG_DEBUG_MESSAGES:!0,LOG_WARN_MESSAGES:!0,LOG_ERROR_MESSAGES:!0,CUSTOM_FILTERS:/CUSTOM_FILTERS/g,COL_FIELD:/COL_FIELD/g,MODEL_COL_FIELD:/MODEL_COL_FIELD/g,TOOLTIP:/title=\"TOOLTIP\"/g,DISPLAY_CELL_TEMPLATE:/DISPLAY_CELL_TEMPLATE/g,TEMPLATE_REGEXP:/<.+>/,FUNC_REGEXP:/(\([^)]*\))?$/,DOT_REGEXP:/\./g,APOS_REGEXP:/'/g,BRACKET_REGEXP:/^(.*)((?:\s*\[\s*\d+\s*\]\s*)|(?:\s*\[\s*"(?:[^"\\]|\\.)*"\s*\]\s*)|(?:\s*\[\s*'(?:[^'\\]|\\.)*'\s*\]\s*))(.*)$/,COL_CLASS_PREFIX:"ui-grid-col",ENTITY_BINDING:"$$this",events:{GRID_SCROLL:"uiGridScroll",COLUMN_MENU_SHOWN:"uiGridColMenuShown",ITEM_DRAGGING:"uiGridItemDragStart",COLUMN_HEADER_CLICK:"uiGridColumnHeaderClick"},keymap:{TAB:9,STRG:17,CAPSLOCK:20,CTRL:17,CTRLRIGHT:18,CTRLR:18,SHIFT:16,RETURN:13,ENTER:13,BACKSPACE:8,BCKSP:8,ALT:18,ALTR:17,ALTRIGHT:17,SPACE:32,WIN:91,MAC:91,FN:null,PG_UP:33,PG_DOWN:34,UP:38,DOWN:40,LEFT:37,RIGHT:39,ESC:27,DEL:46,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123},ASC:"asc",DESC:"desc",filter:{STARTS_WITH:2,ENDS_WITH:4,EXACT:8,CONTAINS:16,GREATER_THAN:32,GREATER_THAN_OR_EQUAL:64,LESS_THAN:128,LESS_THAN_OR_EQUAL:256,NOT_EQUAL:512,SELECT:"select",INPUT:"input"},aggregationTypes:{sum:2,count:4,avg:8,min:16,max:32},CURRENCY_SYMBOLS:["¤","؋","Ar","Ƀ","฿","B/.","Br","Bs.","Bs.F.","GH₵","¢","c","Ch.","₡","C$","D","ден","دج",".د.ب","د.ع","JD","د.ك","ل.د","дин","د.ت","د.م.","د.إ","Db","$","₫","Esc","€","ƒ","Ft","FBu","FCFA","CFA","Fr","FRw","G","gr","₲","h","₴","₭","Kč","kr","kn","MK","ZK","Kz","K","L","Le","лв","E","lp","M","KM","MT","₥","Nfk","₦","Nu.","UM","T$","MOP$","₱","Pt.","£","ج.م.","LL","LS","P","Q","q","R","R$","ر.ع.","ر.ق","ر.س","៛","RM","p","Rf.","₹","₨","SRe","Rp","₪","Ksh","Sh.So.","USh","S/","SDR","сом","৳	","WS$","₮","VT","₩","¥","zł"],scrollDirection:{UP:"up",DOWN:"down",LEFT:"left",RIGHT:"right",NONE:"none"},dataChange:{ALL:"all",EDIT:"edit",ROW:"row",COLUMN:"column",OPTIONS:"options"},scrollbars:{NEVER:0,ALWAYS:1}})}(),angular.module("ui.grid").directive("uiGridCell",["$compile","$parse","gridUtil","uiGridConstants",function(a,b,c,d){var e={priority:0,scope:!1,require:"?^uiGrid",compile:function(){return{pre:function(b,e,f,g){function h(){var a=b.col.compiledElementFn;a(b,function(a,b){e.append(a)})}if(g&&b.col.compiledElementFn)h();else if(g&&!b.col.compiledElementFn)b.col.getCompiledElementFn().then(function(a){a(b,function(a,b){e.append(a)})})["catch"](angular.noop);else{var i=b.col.cellTemplate.replace(d.MODEL_COL_FIELD,"row.entity."+c.preEval(b.col.field)).replace(d.COL_FIELD,"grid.getCellValue(row, col)"),j=a(i)(b);e.append(j)}},post:function(a,b,c,e){var f=a.col.getColClass(!1);b.addClass(f);var g,h=function(c){var d=b;g&&(d.removeClass(g),g=null),g=angular.isFunction(a.col.cellClass)?a.col.cellClass(a.grid,a.row,a.col,a.rowRenderIndex,a.colRenderIndex):a.col.cellClass,d.addClass(g)};a.col.cellClass&&h();var i=a.grid.registerDataChangeCallback(h,[d.dataChange.COLUMN,d.dataChange.EDIT]),j=function(c,d){if(c!==d){(g||a.col.cellClass)&&h();var e=a.col.getColClass(!1);e!==f&&(b.removeClass(f),b.addClass(e),f=e)}},k=a.$watch("row",j),l=function(){i(),k()};a.$on("$destroy",l),b.on("$destroy",l)}}}};return e}]),function(){angular.module("ui.grid").service("uiGridColumnMenuService",["i18nService","uiGridConstants","gridUtil",function(a,b,c){var d={initialize:function(a,b){a.grid=b.grid,b.columnMenuScope=a,a.menuShown=!1},setColMenuItemWatch:function(a){var b=a.$watch("col.menuItems",function(b){"undefined"!=typeof b&&b&&angular.isArray(b)?(b.forEach(function(b){"undefined"!=typeof b.context&&b.context||(b.context={}),b.context.col=a.col}),a.menuItems=a.defaultMenuItems.concat(b)):a.menuItems=a.defaultMenuItems});a.$on("$destroy",b)},sortable:function(a){return a.grid.options.enableSorting&&"undefined"!=typeof a.col&&a.col&&a.col.enableSorting?!0:!1},isActiveSort:function(a,b){return"undefined"!=typeof a.col&&"undefined"!=typeof a.col.sort&&"undefined"!=typeof a.col.sort.direction&&a.col.sort.direction===b},suppressRemoveSort:function(a){return a.col&&a.col.suppressRemoveSort?!0:!1},hideable:function(a){return"undefined"!=typeof a.col&&a.col&&a.col.colDef&&a.col.colDef.enableHiding===!1?!1:!0},getDefaultMenuItems:function(c){return[{title:function(){return a.getSafeText("sort.ascending")},icon:"ui-grid-icon-sort-alt-up",action:function(a){a.stopPropagation(),c.sortColumn(a,b.ASC)},shown:function(){return d.sortable(c)},active:function(){return d.isActiveSort(c,b.ASC)}},{title:function(){return a.getSafeText("sort.descending")},icon:"ui-grid-icon-sort-alt-down",action:function(a){a.stopPropagation(),c.sortColumn(a,b.DESC)},shown:function(){return d.sortable(c)},active:function(){return d.isActiveSort(c,b.DESC)}},{title:function(){return a.getSafeText("sort.remove")},icon:"ui-grid-icon-cancel",action:function(a){a.stopPropagation(),c.unsortColumn()},shown:function(){return d.sortable(c)&&"undefined"!=typeof c.col&&"undefined"!=typeof c.col.sort&&"undefined"!=typeof c.col.sort.direction&&null!==c.col.sort.direction&&!d.suppressRemoveSort(c)}},{title:function(){return a.getSafeText("column.hide")},icon:"ui-grid-icon-cancel",shown:function(){return d.hideable(c)},action:function(a){a.stopPropagation(),c.hideColumn()}}]},getColumnElementPosition:function(a,b,d){var e={};return e.left=d[0].offsetLeft,e.top=d[0].offsetTop,e.parentLeft=d[0].offsetParent.offsetLeft,e.offset=0,b.grid.options.offsetLeft&&(e.offset=b.grid.options.offsetLeft),e.height=c.elementHeight(d,!0),e.width=c.elementWidth(d,!0),e},repositionMenu:function(a,b,d,e,f){var g=e[0].querySelectorAll(".ui-grid-menu"),h=c.closestElm(f,".ui-grid-render-container"),i=h.getBoundingClientRect().left-a.grid.element[0].getBoundingClientRect().left,j=h.querySelectorAll(".ui-grid-viewport")[0].scrollLeft,k=b.lastMenuWidth?b.lastMenuWidth:a.lastMenuWidth?a.lastMenuWidth:170,l=b.lastMenuPaddingRight?b.lastMenuPaddingRight:a.lastMenuPaddingRight?a.lastMenuPaddingRight:10;if(0!==g.length){var m=g[0].querySelectorAll(".ui-grid-menu-mid");0===m.length||angular.element(m).hasClass("ng-hide")||(k=c.elementWidth(g,!0),a.lastMenuWidth=k,b.lastMenuWidth=k,l=parseInt(c.getStyles(angular.element(g)[0]).paddingRight,10),a.lastMenuPaddingRight=l,b.lastMenuPaddingRight=l)}var n=d.left+i-j+d.parentLeft+d.width-k+l;n<d.offset&&(n=d.offset),e.css("left",n+"px"),e.css("top",d.top+d.height+"px")}};return d}]).directive("uiGridColumnMenu",["$timeout","gridUtil","uiGridConstants","uiGridColumnMenuService","$document",function(a,b,c,d,e){var f={priority:0,scope:!0,require:"^uiGrid",templateUrl:"ui-grid/uiGridColumnMenu",replace:!0,link:function(f,g,h,i){d.initialize(f,i),f.defaultMenuItems=d.getDefaultMenuItems(f),f.menuItems=f.defaultMenuItems,d.setColMenuItemWatch(f),f.showMenu=function(a,b,c){f.col=a;var e=d.getColumnElementPosition(f,a,b);f.menuShown?(f.colElement=b,f.colElementPosition=e,f.hideThenShow=!0,f.$broadcast("hide-menu",{originalEvent:c})):(f.menuShown=!0,d.repositionMenu(f,a,e,g,b),f.colElement=b,f.colElementPosition=e,f.$broadcast("show-menu",{originalEvent:c}))},f.hideMenu=function(a){f.menuShown=!1,a||f.$broadcast("hide-menu")},f.$on("menu-hidden",function(){f.hideThenShow?(delete f.hideThenShow,d.repositionMenu(f,f.col,f.colElementPosition,g,f.colElement),f.$broadcast("show-menu"),f.menuShown=!0):(f.hideMenu(!0),f.col&&b.focus.bySelector(e,".ui-grid-header-cell."+f.col.getColClass()+" .ui-grid-column-menu-button",f.col.grid,!1))}),f.$on("menu-shown",function(){a(function(){d.repositionMenu(f,f.col,f.colElementPosition,g,f.colElement),b.focus.bySelector(e,".ui-grid-menu-items .ui-grid-menu-item",!0),delete f.colElementPosition,delete f.columnElement},200)}),f.sortColumn=function(a,b){a.stopPropagation(),f.grid.sortColumn(f.col,b,!0).then(function(){f.grid.refresh(),f.hideMenu()})["catch"](angular.noop)},f.unsortColumn=function(){f.col.unsort(),f.grid.refresh(),f.hideMenu()};var j=function(){a(function(){var a,c=function(){return b.focus.byId("grid-menu",f.grid)};f.grid.columns.some(function(b,c){return angular.equals(b,f.col)?(a=c,!0):void 0});var d;if(f.grid.columns.some(function(b,c){if(!b.visible)return!1;if(a>c)d=b;else{if(c>a&&!d)return d=b,!0;if(c>a&&d)return!0}}),d){var g=d.getColClass();b.focus.bySelector(e,".ui-grid-header-cell."+g+" .ui-grid-header-cell-primary-focus",!0).then(angular.noop,function(a){return"canceled"!==a?c():void 0})["catch"](angular.noop)}else c()})};f.hideColumn=function(){f.col.colDef.visible=!1,f.col.visible=!1,f.grid.queueGridRefresh(),f.hideMenu(),f.grid.api.core.notifyDataChange(c.dataChange.COLUMN),f.grid.api.core.raise.columnVisibilityChanged(f.col),j()}},controller:["$scope",function(a){var b=this;a.$watch("menuItems",function(a){b.menuItems=a})}]};return f}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFilter",["$compile","$templateCache","i18nService","gridUtil",function(a,b,c,d){return{compile:function(){return{pre:function(b,c,d,e){b.col.updateFilters=function(d){if(c.children().remove(),d){var e=b.col.filterHeaderTemplate;c.append(a(e)(b))}},b.$on("$destroy",function(){delete b.col.updateFilters})},post:function(a,b,e,f){a.aria=c.getSafeText("headerCell.aria"),a.removeFilter=function(a,c){a.term=null,d.focus.bySelector(b,".ui-grid-filter-input-"+c)}}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooterCell",["$timeout","gridUtil","uiGridConstants","$compile",function(a,b,c,d){var e={priority:0,scope:{col:"=",row:"=",renderIndex:"="},replace:!0,require:"^uiGrid",compile:function(a,b,e){return{pre:function(a,b,c,e){var f=d(a.col.footerCellTemplate)(a);b.append(f)},post:function(a,b,d,e){a.grid=e.grid;var f=a.col.getColClass(!1);b.addClass(f);var g,h=function(c){var d=b;g&&(d.removeClass(g),g=null),g=angular.isFunction(a.col.footerCellClass)?a.col.footerCellClass(a.grid,a.row,a.col,a.rowRenderIndex,a.colRenderIndex):a.col.footerCellClass,d.addClass(g)};a.col.footerCellClass&&h(),a.col.updateAggregationValue();var i=a.grid.registerDataChangeCallback(h,[c.dataChange.COLUMN]);a.grid.api.core.on.rowsRendered(a,a.col.updateAggregationValue),a.grid.api.core.on.rowsRendered(a,h),a.$on("$destroy",i)}}}};return e}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridFooter",["$templateCache","$compile","uiGridConstants","gridUtil","$timeout",function(a,b,c,d,e){return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(a,c){return{pre:function(a,c,e,f){var g=f[0],h=f[1];a.grid=g.grid,a.colContainer=h.colContainer,h.footer=c;var i=a.grid.options.footerTemplate;d.getTemplate(i).then(function(d){var e=angular.element(d),f=b(e)(a);if(c.append(f),h){var g=c[0].getElementsByClassName("ui-grid-footer-viewport")[0];g&&(h.footerViewport=g)}})["catch"](angular.noop)},post:function(a,b,c,e){var f=e[0],g=e[1];f.grid;d.disableAnimations(b),g.footer=b;var h=b[0].getElementsByClassName("ui-grid-footer-viewport")[0];h&&(g.footerViewport=h)}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridGridFooter",["$templateCache","$compile","uiGridConstants","gridUtil","$timeout",function(a,b,c,d,e){return{restrict:"EA",replace:!0,require:"^uiGrid",scope:!0,compile:function(a,c){return{pre:function(a,c,e,f){a.grid=f.grid;var g=a.grid.options.gridFooterTemplate;d.getTemplate(g).then(function(d){var e=angular.element(d),f=b(e)(a);c.append(f)})["catch"](angular.noop)},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridGroupPanel",["$compile","uiGridConstants","gridUtil",function(a,b,c){var d="ui-grid/ui-grid-group-panel";return{restrict:"EA",replace:!0,require:"?^uiGrid",scope:!1,compile:function(b,e){return{pre:function(b,e,f,g){var h=b.grid.options.groupPanelTemplate||d;c.getTemplate(h).then(function(c){var d=angular.element(c),f=a(d)(b);e.append(f)})["catch"](angular.noop)},post:function(a,b,c,d){b.bind("$destroy",function(){})}}}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeaderCell",["$compile","$timeout","$window","$document","gridUtil","uiGridConstants","ScrollEvent","i18nService",function(a,b,c,d,e,f,g,h){var i=500,j=500,k={priority:0,scope:{col:"=",row:"=",renderIndex:"="},require:["^uiGrid","^uiGridRenderContainer"],replace:!0,compile:function(){return{pre:function(b,c,d){var e=a(b.col.headerCellTemplate)(b);c.append(e)},post:function(a,c,e,g){var k=g[0],l=g[1];a.i18n={headerCell:h.getSafeText("headerCell"),sort:h.getSafeText("sort")},a.isSortPriorityVisible=function(){return angular.isNumber(a.col.sort.priority)&&a.grid.columns.some(function(b,c){return angular.isNumber(b.sort.priority)&&b!==a.col})},a.getSortDirectionAriaLabel=function(){var b=a.col,c=b.sort.direction===f.ASC?a.i18n.sort.ascending:b.sort.direction===f.DESC?a.i18n.sort.descending:a.i18n.sort.none,d=c;return a.isSortPriorityVisible()&&(d=d+". "+a.i18n.headerCell.priority+" "+(b.sort.priority+1)),d},a.grid=k.grid,a.renderContainer=k.grid.renderContainers[l.containerId];var m=a.col.getColClass(!1);c.addClass(m),a.menuShown=!1,a.asc=f.ASC,a.desc=f.DESC;var n,o,p=(angular.element(c[0].querySelectorAll(".ui-grid-header-cell-menu")),angular.element(c[0].querySelectorAll(".ui-grid-cell-contents"))),q=[];a.downFn=function(e){e.stopPropagation(),"undefined"!=typeof e.originalEvent&&void 0!==e.originalEvent&&(e=e.originalEvent),e.button&&0!==e.button||(o=e.pageX,a.mousedownStartTime=(new Date).getTime(),a.mousedownTimeout=b(function(){},i),a.mousedownTimeout.then(function(){a.colMenu&&k.columnMenuScope.showMenu(a.col,c,e)})["catch"](angular.noop),k.fireEvent(f.events.COLUMN_HEADER_CLICK,{event:e,columnName:a.col.colDef.name}),a.offAllEvents(),"touchstart"===e.type?(d.on("touchend",a.upFn),d.on("touchmove",a.moveFn)):"mousedown"===e.type&&(d.on("mouseup",a.upFn),d.on("mousemove",a.moveFn)))},a.upFn=function(c){c.stopPropagation(),b.cancel(a.mousedownTimeout),a.offAllEvents(),a.onDownEvents(c.type);var d=(new Date).getTime(),e=d-a.mousedownStartTime;e>i||a.sortable&&a.handleClick(c)},a.moveFn=function(c){var d=c.pageX-o;0!==d&&(b.cancel(a.mousedownTimeout),a.offAllEvents(),a.onDownEvents(c.type))},a.clickFn=function(b){b.stopPropagation(),p.off("click",a.clickFn)},a.offAllEvents=function(){p.off("touchstart",a.downFn),p.off("mousedown",a.downFn),d.off("touchend",a.upFn),d.off("mouseup",a.upFn),d.off("touchmove",a.moveFn),d.off("mousemove",a.moveFn),p.off("click",a.clickFn)},a.onDownEvents=function(c){switch(c){case"touchmove":case"touchend":p.on("click",a.clickFn),p.on("touchstart",a.downFn),b(function(){p.on("mousedown",a.downFn)},j);break;case"mousemove":case"mouseup":p.on("click",a.clickFn),p.on("mousedown",a.downFn),b(function(){p.on("touchstart",a.downFn)},j);break;default:p.on("click",a.clickFn),p.on("touchstart",a.downFn),p.on("mousedown",a.downFn)}};var r=function(d){var e=c;n&&(e.removeClass(n),n=null),n=angular.isFunction(a.col.headerCellClass)?a.col.headerCellClass(a.grid,a.row,a.col,a.rowRenderIndex,a.colRenderIndex):a.col.headerCellClass,e.addClass(n),b(function(){var b=a.grid.renderContainers.right?a.grid.renderContainers.right:a.grid.renderContainers.body;a.isLastCol=a.col===b.visibleColumnCache[b.visibleColumnCache.length-1]}),a.col.enableSorting?a.sortable=!0:a.sortable=!1;var g=a.filterable;k.grid.options.enableFiltering&&a.col.enableFiltering?a.filterable=!0:a.filterable=!1,g!==a.filterable&&("undefined"!=typeof a.col.updateFilters&&a.col.updateFilters(a.filterable),a.filterable?(a.col.filters.forEach(function(b,c){q.push(a.$watch("col.filters["+c+"].term",function(a,b){a!==b&&(k.grid.api.core.raise.filterChanged(),k.grid.api.core.notifyDataChange(f.dataChange.COLUMN),k.grid.queueGridRefresh())}))}),a.$on("$destroy",function(){q.forEach(function(a){a()})})):q.forEach(function(a){a()})),a.col.grid.options&&a.col.grid.options.enableColumnMenus!==!1&&a.col.colDef&&a.col.colDef.enableColumnMenu!==!1?a.colMenu=!0:a.colMenu=!1,a.offAllEvents(),(a.sortable||a.colMenu)&&(a.onDownEvents(),a.$on("$destroy",function(){a.offAllEvents()}))};r();var s=a.grid.registerDataChangeCallback(r,[f.dataChange.COLUMN]);a.$on("$destroy",s),a.handleClick=function(b){var c=!1;b.shiftKey&&(c=!0),k.grid.sortColumn(a.col,c).then(function(){k.columnMenuScope&&k.columnMenuScope.hideMenu(),k.grid.refresh()})["catch"](angular.noop)},a.toggleMenu=function(b){b.stopPropagation(),k.columnMenuScope.menuShown&&k.columnMenuScope.col===a.col?k.columnMenuScope.hideMenu():k.columnMenuScope.showMenu(a.col,c)}}}}};return k}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridHeader",["$templateCache","$compile","uiGridConstants","gridUtil","$timeout","ScrollEvent",function(a,b,c,d,e,f){var g="ui-grid/ui-grid-header",h="ui-grid/ui-grid-no-header";return{restrict:"EA",replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:!0,compile:function(a,c){return{pre:function(a,c,e,i){function j(){m.header=m.colContainer.header=c;var a=c[0].getElementsByClassName("ui-grid-header-canvas");a.length>0?m.headerCanvas=m.colContainer.headerCanvas=a[0]:m.headerCanvas=null}function k(a){if(!l.grid.isScrollingHorizontally){var b=d.normalizeScrollLeft(m.headerViewport,l.grid),c=m.colContainer.scrollHorizontal(b),e=new f(l.grid,null,m.colContainer,f.Sources.ViewPortScroll);e.newScrollLeft=b,c>-1&&(e.x={percentage:c}),l.grid.scrollContainers(null,e)}}var l=i[0],m=i[1];a.grid=l.grid,a.colContainer=m.colContainer,j();var n;n=a.grid.options.showHeader?a.grid.options.headerTemplate?a.grid.options.headerTemplate:g:h,d.getTemplate(n).then(function(d){var e=angular.element(d),f=b(e)(a);if(c.replaceWith(f),c=f,j(),m){var g=c[0].getElementsByClassName("ui-grid-header-viewport")[0];g&&(m.headerViewport=g,angular.element(g).on("scroll",k),a.$on("$destroy",function(){angular.element(g).off("scroll",k)}))}a.grid.queueRefresh()})["catch"](angular.noop)},post:function(a,b,c,e){function f(){var a=h.colContainer.visibleColumnCache,b="",c=0;return a.forEach(function(a){b+=a.getColClassDefinition(),c+=a.drawnWidth}),h.colContainer.canvasWidth=c,b}var g=e[0],h=e[1];g.grid;d.disableAnimations(b),h.header=b;var i=b[0].getElementsByClassName("ui-grid-header-viewport")[0];i&&(h.headerViewport=i),g&&g.grid.registerStyleComputation({priority:15,func:f})}}}}}])}(),function(){angular.module("ui.grid").service("uiGridGridMenuService",["gridUtil","i18nService","uiGridConstants",function(a,b,c){var d={initialize:function(a,b){b.gridMenuScope=a,a.grid=b,a.registeredMenuItems=[],a.$on("$destroy",function(){a.grid&&a.grid.gridMenuScope&&(a.grid.gridMenuScope=null),a.grid&&(a.grid=null),a.registeredMenuItems&&(a.registeredMenuItems=null)}),a.registeredMenuItems=[],b.api.registerMethod("core","addToGridMenu",d.addToGridMenu),b.api.registerMethod("core","removeFromGridMenu",d.removeFromGridMenu)},addToGridMenu:function(b,c){angular.isArray(c)?b.gridMenuScope?(b.gridMenuScope.registeredMenuItems=b.gridMenuScope.registeredMenuItems?b.gridMenuScope.registeredMenuItems:[],b.gridMenuScope.registeredMenuItems=b.gridMenuScope.registeredMenuItems.concat(c)):a.logError("Asked to addToGridMenu, but gridMenuScope not present.  Timing issue?  Please log issue with ui-grid"):a.logError("addToGridMenu: menuItems must be an array, and is not, not adding any items")},removeFromGridMenu:function(b,c){var d=-1;b&&b.gridMenuScope&&b.gridMenuScope.registeredMenuItems.forEach(function(b,e){b.id===c&&(d>-1?a.logError("removeFromGridMenu: found multiple items with the same id, removing only the last"):d=e)}),d>-1&&b.gridMenuScope.registeredMenuItems.splice(d,1)},getMenuItems:function(c){var e=[];c.grid.options.gridMenuCustomItems&&(angular.isArray(c.grid.options.gridMenuCustomItems)?e=e.concat(c.grid.options.gridMenuCustomItems):a.logError("gridOptions.gridMenuCustomItems must be an array, and is not"));var f=[{title:b.getSafeText("gridMenu.clearAllFilters"),action:function(a){c.grid.clearAllFilters()},shown:function(){return c.grid.options.enableFiltering},order:100}];return e=e.concat(f),e=e.concat(c.registeredMenuItems),c.grid.options.gridMenuShowHideColumns!==!1&&(e=e.concat(d.showHideColumns(c))),e.sort(function(a,b){return a.order-b.order}),e},showHideColumns:function(a){var c=[];return a.grid.options.columnDefs&&0!==a.grid.options.columnDefs.length&&0!==a.grid.columns.length?(c.push({title:b.getSafeText("gridMenu.columns"),order:300}),a.grid.options.gridMenuTitleFilter=a.grid.options.gridMenuTitleFilter?a.grid.options.gridMenuTitleFilter:function(a){return a},a.grid.options.columnDefs.forEach(function(b,e){if(b.enableHiding!==!1){var f={icon:"ui-grid-icon-ok",action:function(a){a.stopPropagation(),d.toggleColumnVisibility(this.context.gridCol)},shown:function(){return this.context.gridCol.colDef.visible===!0||void 0===this.context.gridCol.colDef.visible},context:{gridCol:a.grid.getColumn(b.name||b.field)},leaveOpen:!0,order:301+2*e};d.setMenuItemTitle(f,b,a.grid),c.push(f),f={icon:"ui-grid-icon-cancel",action:function(a){a.stopPropagation(),d.toggleColumnVisibility(this.context.gridCol)},shown:function(){return!(this.context.gridCol.colDef.visible===!0||void 0===this.context.gridCol.colDef.visible)},context:{gridCol:a.grid.getColumn(b.name||b.field)},leaveOpen:!0,order:301+2*e+1},d.setMenuItemTitle(f,b,a.grid),c.push(f)}}),c):c},setMenuItemTitle:function(b,c,d){var e=d.options.gridMenuTitleFilter(c.displayName||a.readableColumnName(c.name)||c.field);"string"==typeof e?b.title=e:e.then?(b.title="",e.then(function(a){b.title=a},function(a){b.title=a})["catch"](angular.noop)):(a.logError("Expected gridMenuTitleFilter to return a string or a promise, it has returned neither, bad config"),b.title="badconfig")},toggleColumnVisibility:function(a){a.colDef.visible=!(a.colDef.visible===!0||void 0===a.colDef.visible),a.grid.refresh(),a.grid.api.core.notifyDataChange(c.dataChange.COLUMN),a.grid.api.core.raise.columnVisibilityChanged(a)}};return d}]).directive("uiGridMenuButton",["gridUtil","uiGridConstants","uiGridGridMenuService","i18nService",function(a,b,c,d){return{priority:0,scope:!0,require:["^uiGrid"],templateUrl:"ui-grid/ui-grid-menu-button",replace:!0,link:function(b,e,f,g){var h=g[0];b.i18n={aria:d.getSafeText("gridMenu.aria")},c.initialize(b,h.grid),b.shown=!1,b.toggleMenu=function(){b.shown?(b.$broadcast("hide-menu"),b.shown=!1):(b.menuItems=c.getMenuItems(b),b.$broadcast("show-menu"),b.shown=!0)},b.$on("menu-hidden",function(){b.shown=!1,a.focus.bySelector(e,".ui-grid-icon-container")})}}}])}(),function(){angular.module("ui.grid").directive("uiGridMenu",["$compile","$timeout","$window","$document","gridUtil","uiGridConstants","i18nService",function(a,b,c,d,e,f,g){var h={priority:0,scope:{menuItems:"=",autoHide:"=?"},require:"?^uiGrid",templateUrl:"ui-grid/uiGridMenu",replace:!1,link:function(d,h,i,j){if(d.dynamicStyles="",j&&j.grid&&j.grid.options&&j.grid.options.gridMenuTemplate){var k=j.grid.options.gridMenuTemplate;e.getTemplate(k).then(function(b){var c=angular.element(b),e=a(c)(d);h.replaceWith(e)})["catch"](angular.noop)}var l=function(a){var b=a-j.grid.headerHeight-20;d.dynamicStyles=[".grid"+j.grid.id+" .ui-grid-menu-mid {","max-height: "+b+"px;","}"].join(" ")};j&&(l(j.grid.gridHeight),j.grid.api.core.on.gridDimensionChanged(d,function(a,b,c,d){l(c)})),d.i18n={close:g.getSafeText("columnMenu.close")},d.showMenu=function(a,c){d.shown?d.shownMid||(d.shownMid=!0,d.$emit("menu-shown")):(d.shown=!0,b(function(){d.shownMid=!0,d.$emit("menu-shown")}));var f="click";c&&c.originalEvent&&c.originalEvent.type&&"touchstart"===c.originalEvent.type&&(f=c.originalEvent.type),angular.element(document).off("click touchstart",m),h.off("keyup",n),h.off("keydown",o),b(function(){angular.element(document).on(f,m),h.on("keyup",n),h.on("keydown",o)}),e.focus.bySelector(h,"button[type=button]",!0)},d.hideMenu=function(a){d.shown&&(d.shownMid=!1,b(function(){d.shownMid||(d.shown=!1,d.$emit("menu-hidden"))},200)),angular.element(document).off("click touchstart",m),h.off("keyup",n),h.off("keydown",o)},d.$on("hide-menu",function(a,b){d.hideMenu(a,b)}),d.$on("show-menu",function(a,b){d.showMenu(a,b)});var m=function(){d.shown&&d.$apply(function(){d.hideMenu()})},n=function(a){27===a.keyCode&&d.hideMenu()},o=function(a){var b=function(b){return b.focus(),a.preventDefault(),!1};if(9===a.keyCode){var c,d,e=h[0].querySelectorAll("button:not(.ng-hide)");e.length>0&&(c=e[0],d=e[e.length-1],a.target!==d||a.shiftKey?a.target===c&&a.shiftKey&&b(d):b(c))}};("undefined"==typeof d.autoHide||void 0===d.autoHide)&&(d.autoHide=!0),d.autoHide&&angular.element(c).on("resize",m),d.$on("$destroy",function(){angular.element(c).off("resize",m),angular.element(document).off("click touchstart",m),h.off("keyup",n),h.off("keydown",o)}),j&&d.$on("$destroy",j.grid.api.core.on.scrollBegin(d,m)),d.$on("$destroy",d.$on(f.events.ITEM_DRAGGING,m))}};return h}]).directive("uiGridMenuItem",["gridUtil","$compile","i18nService",function(a,b,c){var d={priority:0,scope:{name:"=",active:"=",action:"=",icon:"=",shown:"=",context:"=",templateUrl:"=",leaveOpen:"=",screenReaderOnly:"="},require:["?^uiGrid"],templateUrl:"ui-grid/uiGridMenuItem",replace:!1,compile:function(){return{pre:function(c,d){c.templateUrl&&a.getTemplate(c.templateUrl).then(function(a){var e=angular.element(a),f=b(e)(c);d.replaceWith(f)})["catch"](angular.noop)},post:function(b,d,e,f){var g=f[0];("undefined"==typeof b.shown||null===b.shown)&&(b.shown=function(){return!0}),b.itemShown=function(){var a={};return b.context&&(a.context=b.context),"undefined"!=typeof g&&g&&(a.grid=g.grid),b.shown.call(a)},b.itemAction=function(c,d){if(c.stopPropagation(),"function"==typeof b.action){var e={};b.context&&(e.context=b.context),"undefined"!=typeof g&&g&&(e.grid=g.grid),b.action.call(e,c,d),b.leaveOpen?a.focus.bySelector(angular.element(c.target.parentElement),"button[type=button]",!0):b.$emit("hide-menu")}},b.label=function(){var a=b.name;return"function"==typeof b.name&&(a=b.name.call()),a},b.i18n=c.get()}}}};return d}])}(),function(){"use strict";var a=angular.module("ui.grid");angular.forEach([{tag:"Src",method:"attr"},{tag:"Text",method:"text"},{tag:"Href",method:"attr"},{tag:"Class",method:"addClass"},{tag:"Html",method:"html"},{tag:"Alt",method:"attr"},{tag:"Style",method:"css"},{tag:"Value",method:"attr"},{tag:"Id",method:"attr"},{tag:"Id",directiveName:"IdGrid",method:"attr",appendGridId:!0},{tag:"Title",method:"attr"},{tag:"Label",method:"attr",aria:!0},{tag:"Labelledby",method:"attr",aria:!0},{tag:"Labelledby",directiveName:"LabelledbyGrid",appendGridId:!0,method:"attr",aria:!0},{tag:"Describedby",method:"attr",aria:!0},{tag:"Describedby",directiveName:"DescribedbyGrid",appendGridId:!0,method:"attr",aria:!0}],function(b){var c="uiGridOneBind",d=(b.aria?c+"Aria":c)+(b.directiveName?b.directiveName:b.tag);a.directive(d,["gridUtil",function(a){return{restrict:"A",require:["?uiGrid","?^uiGrid"],link:function(c,e,f,g){var h=function(b){var e;if(c.grid)e=c.grid;else if(c.col&&c.col.grid)e=c.col.grid;else if(!g.some(function(a){return a&&a.grid?(e=a.grid,!0):void 0}))throw a.logError("["+d+"] A valid grid could not be found to bind id. Are you using this directive within the correct scope? Trying to generate id: [gridID]-"+b),new Error("No valid grid could be found");if(e){var f=new RegExp(e.id.toString());f.test(b)||(b=e.id.toString()+"-"+b)}return b},i=c.$watch(f[d],function(a){if(a){if(b.appendGridId){var c=null;angular.forEach(a.split(" "),function(a){c=(c?c+" ":"")+h(a)}),a=c}switch(b.method){case"attr":b.aria?e[b.method]("aria-"+b.tag.toLowerCase(),a):e[b.method](b.tag.toLowerCase(),a);break;case"addClass":if(angular.isObject(a)&&!angular.isArray(a)){var d=[],f=!1;if(angular.forEach(a,function(a,b){null!==a&&"undefined"!=typeof a&&(f=!0,a&&d.push(b))}),!f)return;a=d}if(!a)return;e.addClass(angular.isArray(a)?a.join(" "):a);break;default:e[b.method](a)}i()}},!0)}}}])})}(),function(){"use strict";var a=angular.module("ui.grid");a.directive("uiGridRenderContainer",["$timeout","$document","uiGridConstants","gridUtil","ScrollEvent",function(a,b,c,d,e){return{replace:!0,transclude:!0,templateUrl:"ui-grid/uiGridRenderContainer",require:["^uiGrid","uiGridRenderContainer"],scope:{containerId:"=",rowContainerName:"=",colContainerName:"=",bindScrollHorizontal:"=",bindScrollVertical:"=",enableVerticalScrollbar:"=",enableHorizontalScrollbar:"="},controller:"uiGridRenderContainer as RenderContainer",compile:function(){return{pre:function(a,b,c,d){var e=d[0],f=d[1],g=a.grid=e.grid;if(!a.rowContainerName)throw"No row render container name specified";if(!a.colContainerName)throw"No column render container name specified";if(!g.renderContainers[a.rowContainerName])throw"Row render container '"+a.rowContainerName+"' is not registered.";if(!g.renderContainers[a.colContainerName])throw"Column render container '"+a.colContainerName+"' is not registered.";var h=a.rowContainer=g.renderContainers[a.rowContainerName],i=a.colContainer=g.renderContainers[a.colContainerName];f.containerId=a.containerId,f.rowContainer=h,f.colContainer=i},post:function(a,b,c,f){function g(){var b="",c=l.canvasWidth,d=l.getViewportWidth(),e=k.getCanvasHeight(),f=k.getViewportHeight();l.needsHScrollbarPlaceholder()&&(f-=j.scrollbarHeight);var g,i;return g=i=l.getHeaderViewportWidth(),b+="\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-canvas { width: "+c+"px; height: "+e+"px; }",b+="\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-header-canvas { width: "+(c+j.scrollbarWidth)+"px; }",b+=o.explicitHeaderCanvasHeight?"\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-header-canvas { height: "+o.explicitHeaderCanvasHeight+"px; }":"\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-header-canvas { height: inherit; }",b+="\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-viewport { width: "+d+"px; height: "+f+"px; }",b+="\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-header-viewport { width: "+g+"px; }",b+="\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-footer-canvas { width: "+(c+j.scrollbarWidth)+"px; }",b+="\n .grid"+h.grid.id+" .ui-grid-render-container-"+a.containerId+" .ui-grid-footer-viewport { width: "+i+"px; }"}var h=f[0],i=f[1],j=h.grid,k=i.rowContainer,l=i.colContainer,m=null,n=null,o=j.renderContainers[a.containerId];b.addClass("ui-grid-render-container-"+a.containerId),d.on.mousewheel(b,function(a){var b=new e(j,k,l,e.Sources.RenderContainerMouseWheel);if(0!==a.deltaY){var c=-1*a.deltaY*a.deltaFactor;m=i.viewport[0].scrollTop,b.verticalScrollLength=k.getVerticalScrollLength();var f=(m+c)/b.verticalScrollLength;f>=1&&m<b.verticalScrollLength&&(i.viewport[0].scrollTop=b.verticalScrollLength),0>f?f=0:f>1&&(f=1),b.y={percentage:f,pixels:c}}if(0!==a.deltaX){var g=a.deltaX*a.deltaFactor;n=d.normalizeScrollLeft(i.viewport,j),b.horizontalScrollLength=l.getCanvasWidth()-l.getViewportWidth();var h=(n+g)/b.horizontalScrollLength;0>h?h=0:h>1&&(h=1),b.x={percentage:h,pixels:g}}0!==a.deltaY&&(b.atTop(m)||b.atBottom(m))||0!==a.deltaX&&(b.atLeft(n)||b.atRight(n))||(a.preventDefault(),a.stopPropagation(),b.fireThrottledScrollingEvent("",b))}),b.bind("$destroy",function(){b.unbind("keydown"),["touchstart","touchmove","touchend","keydown","wheel","mousewheel","DomMouseScroll","MozMousePixelScroll"].forEach(function(a){b.unbind(a)})}),h.grid.registerStyleComputation({priority:6,func:g})}}}}}]),a.controller("uiGridRenderContainer",["$scope","gridUtil",function(a,b){}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridRow",["gridUtil",function(a){return{replace:!0,require:["^uiGrid","^uiGridRenderContainer"],scope:{row:"=uiGridRow",rowRenderIndex:"="},compile:function(){return{pre:function(a,b,c,d){function e(){a.row.getRowTemplateFn.then(function(c){var d=a.$new();c(d,function(a,c){h&&(h.remove(),
i.$destroy()),b.empty().append(a),h=a,i=d})})["catch"](angular.noop)}var f=d[0],g=d[1];f.grid;a.grid=f.grid,a.colContainer=g.colContainer;var h,i;e(),a.$watch("row.getRowTemplateFn",function(a,b){a!==b&&e()})},post:function(a,b,c,d){}}}}}])}(),function(){angular.module("ui.grid").directive("uiGridStyle",["gridUtil","$interpolate",function(a,b){return{link:function(a,c,d,e){var f=b(c.text(),!0);f&&a.$watch(f,function(a){c.text(a)})}}}])}(),function(){"use strict";angular.module("ui.grid").directive("uiGridViewport",["gridUtil","ScrollEvent","uiGridConstants","$log",function(a,b,c,d){return{replace:!0,scope:{},controllerAs:"Viewport",templateUrl:"ui-grid/uiGridViewport",require:["^uiGrid","^uiGridRenderContainer"],link:function(c,d,e,f){function g(e){var f=d[0].scrollTop,g=a.normalizeScrollLeft(d,p),h=n.scrollVertical(f),i=o.scrollHorizontal(g),j=new b(p,n,o,b.Sources.ViewPortScroll);j.newScrollLeft=g,j.newScrollTop=f,i>-1&&(j.x={percentage:i}),h>-1&&(j.y={percentage:h}),p.scrollContainers(c.$parent.containerId,j)}function h(a){m.prevScrollArgs=a;var b=a.getNewScrollTop(n,m.viewport);d[0].scrollTop=b}function i(b){m.prevScrollArgs=b;var c=b.getNewScrollLeft(o,m.viewport);d[0].scrollLeft=a.denormalizeScrollLeft(m.viewport,c,p)}function j(b){var c=b.getNewScrollLeft(o,m.viewport);m.headerViewport&&(m.headerViewport.scrollLeft=a.denormalizeScrollLeft(m.viewport,c,p))}function k(b){var c=b.getNewScrollLeft(o,m.viewport);m.footerViewport&&(m.footerViewport.scrollLeft=a.denormalizeScrollLeft(m.viewport,c,p))}var l=f[0],m=f[1];c.containerCtrl=m;var n=m.rowContainer,o=m.colContainer,p=l.grid;c.grid=l.grid,c.rowContainer=m.rowContainer,c.colContainer=m.colContainer,m.viewport=d,p&&p.options&&p.options.customScroller?p.options.customScroller(d,g):d.on("scroll",g);c.$parent.bindScrollVertical&&p.addVerticalScrollSync(c.$parent.containerId,h),c.$parent.bindScrollHorizontal&&(p.addHorizontalScrollSync(c.$parent.containerId,i),p.addHorizontalScrollSync(c.$parent.containerId+"header",j),p.addHorizontalScrollSync(c.$parent.containerId+"footer",k)),c.$on("$destroy",function(){d.off()})},controller:["$scope",function(a){this.rowStyle=function(b){var c=a.rowContainer,d=a.colContainer,e={};if(0!==c.currentTopRow){var f="translateY("+c.currentTopRow*c.grid.options.rowHeight+"px)";e.transform=f,e["-webkit-transform"]=f,e["-ms-transform"]=f}return 0!==d.currentFirstColumn&&(d.grid.isRTL()?e["margin-right"]=d.columnOffset+"px":e["margin-left"]=d.columnOffset+"px"),e}}]}}])}(),function(){angular.module("ui.grid").directive("uiGridVisible",function(){return function(a,b,c){a.$watch(c.uiGridVisible,function(a){b[a?"removeClass":"addClass"]("ui-grid-invisible")})}})}(),function(){"use strict";function a(a,b,c){return{templateUrl:"ui-grid/ui-grid",scope:{uiGrid:"="},replace:!0,transclude:!0,controller:"uiGridController",compile:function(){return{post:function(d,e,f,g){function h(){e[0].offsetWidth<=0&&o>p?(setTimeout(h,n),p++):d.$applyAsync(j)}function i(){var b,c;angular.element(a).on("resize",l),e.on("$destroy",function(){angular.element(a).off("resize",l),b(),c()}),b=d.$watch(function(){return m.hasLeftContainer()},function(a,b){a!==b&&m.refreshCanvas(!0)}),c=d.$watch(function(){return m.hasRightContainer()},function(a,b){a!==b&&m.refreshCanvas(!0)})}function j(){m.gridWidth=d.gridWidth=b.elementWidth(e),m.canvasWidth=g.grid.gridWidth,m.gridHeight=d.gridHeight=b.elementHeight(e),m.gridHeight<=m.options.rowHeight&&m.options.enableMinHeightCheck&&k(),m.refreshCanvas(!0)}function k(){var a=m.options.minRowsToShow*m.options.rowHeight,f=m.options.showHeader?m.options.headerRowHeight:0,g=m.calcFooterHeight(),h=0;m.options.enableHorizontalScrollbar===c.scrollbars.ALWAYS&&(h=b.getScrollbarWidth());var i=0;if(angular.forEach(m.options.columnDefs,function(a){a.hasOwnProperty("filter")?1>i&&(i=1):a.hasOwnProperty("filters")&&i<a.filters.length&&(i=a.filters.length)}),m.options.enableFiltering&&!i){var j=m.options.columnDefs.length&&m.options.columnDefs.every(function(a){return a.enableFiltering===!1});j||(i=1)}var k=i*f,l=f+a+g+h+k;e.css("height",l+"px"),m.gridHeight=d.gridHeight=b.elementHeight(e)}function l(){m.gridWidth=d.gridWidth=b.elementWidth(e),m.gridHeight=d.gridHeight=b.elementHeight(e),m.refreshCanvas(!0)}var m=g.grid;g.scrollbars=[],m.element=e;var n=100,o=20,p=0;i(),j(),m.renderingComplete(),h()}}}}}angular.module("ui.grid").controller("uiGridController",["$scope","$element","$attrs","gridUtil","$q","uiGridConstants","gridClassFactory","$parse","$compile",function(a,b,c,d,e,f,g,h,i){function j(a){return a?a.length:0}function k(b,c){b&&b!==c&&(m.grid.options.columnDefs=a.uiGrid.columnDefs,m.grid.callDataChangeCallbacks(f.dataChange.COLUMN,{orderByColumnDefs:!0,preCompileCellTemplates:!0}))}function l(b){var d=[];if(b=angular.isString(a.uiGrid.data)?m.grid.appScope[a.uiGrid.data]:a.uiGrid.data,o=b,b){var g=m.grid.columns.length>(m.grid.rowHeaderColumns?m.grid.rowHeaderColumns.length:0);!g&&!c.uiGridColumns&&0===m.grid.options.columnDefs.length&&b.length>0&&m.grid.buildColumnDefsFromData(b),!g&&(m.grid.options.columnDefs.length>0||b.length>0)&&d.push(m.grid.buildColumns().then(function(){m.grid.preCompileCellTemplates()})["catch"](angular.noop)),e.all(d).then(function(){m.grid.modifyRows(o).then(function(){m.grid.redrawInPlace(!0),a.$evalAsync(function(){m.grid.refreshCanvas(!0),m.grid.callDataChangeCallbacks(f.dataChange.ROW)})})["catch"](angular.noop)})["catch"](angular.noop)}}var m=this,n=[];m.grid=g.createGrid(a.uiGrid),m.grid.appScope=m.grid.appScope||a.$parent,b.addClass("grid"+m.grid.id),m.grid.rtl="rtl"===d.getStyles(b[0]).direction,a.grid=m.grid,c.uiGridColumns&&n.push(c.$observe("uiGridColumns",function(a){m.grid.options.columnDefs=angular.isString(a)?angular.fromJson(a):a,m.grid.buildColumns().then(function(){m.grid.preCompileCellTemplates(),m.grid.refreshCanvas(!0)})["catch"](angular.noop)})),m.grid.options.fastWatch?(m.uiGrid=a.uiGrid,angular.isString(a.uiGrid.data)?(n.push(a.$parent.$watch(a.uiGrid.data,l)),n.push(a.$parent.$watch(function(){return m.grid.appScope[a.uiGrid.data]?m.grid.appScope[a.uiGrid.data].length:void 0},l))):(n.push(a.$parent.$watch(function(){return a.uiGrid.data},l)),n.push(a.$parent.$watch(function(){return j(a.uiGrid.data)},function(){l(a.uiGrid.data)}))),n.push(a.$parent.$watch(function(){return a.uiGrid.columnDefs},k)),n.push(a.$parent.$watch(function(){return j(a.uiGrid.columnDefs)},function(){k(a.uiGrid.columnDefs)}))):(angular.isString(a.uiGrid.data)?n.push(a.$parent.$watchCollection(a.uiGrid.data,l)):n.push(a.$parent.$watchCollection(function(){return a.uiGrid.data},l)),n.push(a.$parent.$watchCollection(function(){return a.uiGrid.columnDefs},k)));var o,p=a.$watch(function(){return m.grid.styleComputations},function(){m.grid.refreshCanvas(!0)});a.$on("$destroy",function(){n.forEach(function(a){a()}),p()}),m.fireEvent=function(b,c){c=c||{},angular.isUndefined(c.grid)&&(c.grid=m.grid),a.$broadcast(b,c)},m.innerCompile=function(b){i(b)(a)}}]),angular.module("ui.grid").directive("uiGrid",a),a.$inject=["$window","gridUtil","uiGridConstants"]}(),function(){"use strict";angular.module("ui.grid").directive("uiGridPinnedContainer",["gridUtil",function(a){return{restrict:"EA",replace:!0,template:'<div class="ui-grid-pinned-container"><div ui-grid-render-container container-id="side" row-container-name="\'body\'" col-container-name="side" bind-scroll-vertical="true" class="{{ side }} ui-grid-render-container-{{ side }}"></div></div>',scope:{side:"=uiGridPinnedContainer"},require:"^uiGrid",compile:function(){return{post:function(a,b,c,d){function e(){var a=this,b=0;a.visibleColumnCache.forEach(function(a){b+=a.drawnWidth});var c=a.getViewportAdjustment();return b+=c.width}function f(){if("left"===a.side||"right"===a.side){for(var b=h.renderContainers[a.side].visibleColumnCache,c=0,d=0;d<b.length;d++){var e=b[d];c+=e.drawnWidth||e.width||0}return c}}function g(){var c="";return("left"===a.side||"right"===a.side)&&(i=f(),b.attr("style",null),c+=".grid"+h.id+" .ui-grid-pinned-container-"+a.side+", .grid"+h.id+" .ui-grid-pinned-container-"+a.side+" .ui-grid-render-container-"+a.side+" .ui-grid-viewport { width: "+i+"px; } "),c}var h=d.grid,i=0;b.addClass("ui-grid-pinned-container-"+a.side),("left"===a.side||"right"===a.side)&&(h.renderContainers[a.side].getViewportWidth=e),h.renderContainers.body.registerViewportAdjuster(function(b){return i=f(),b.width-=i,b.side=a.side,b}),h.registerStyleComputation({priority:15,func:g})}}}}}])}(),function(){angular.module("ui.grid").factory("Grid",["$q","$compile","$parse","gridUtil","uiGridConstants","GridOptions","GridColumn","GridRow","GridApi","rowSorter","rowSearcher","GridRenderContainer","$timeout","ScrollEvent",function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){function o(){}var p=function(a){function b(a){g.isScrollingVertically=!1,g.api.core.raise.scrollEnd(a),g.scrollDirection=e.scrollDirection.NONE}function c(a){g.isScrollingHorizontally=!1,g.api.core.raise.scrollEnd(a),g.scrollDirection=e.scrollDirection.NONE}var g=this;if(void 0===a||"undefined"==typeof a.id||!a.id)throw new Error("No ID provided. An ID must be given when creating a grid.");if(!/^[_a-zA-Z0-9-]+$/.test(a.id))throw new Error("Grid id '"+a.id+'" is invalid. It must follow CSS selector syntax rules.');g.id=a.id,delete a.id,g.options=f.initialize(a),g.appScope=g.options.appScopeProvider,g.headerHeight=g.options.headerRowHeight,g.footerHeight=g.calcFooterHeight(),g.columnFooterHeight=g.calcColumnFooterHeight(),g.rtl=!1,g.gridHeight=0,g.gridWidth=0,g.columnBuilders=[],g.rowBuilders=[],g.rowsProcessors=[],g.columnsProcessors=[],g.styleComputations=[],g.viewportAdjusters=[],g.rowHeaderColumns=[],g.dataChangeCallbacks={},g.verticalScrollSyncCallBackFns={},g.horizontalScrollSyncCallBackFns={},g.renderContainers={},g.renderContainers.body=new l("body",g),g.cellValueGetterCache={},g.getRowTemplateFn=null,g.rows=[],g.columns=[],g.isScrollingVertically=!1,g.isScrollingHorizontally=!1,g.scrollDirection=e.scrollDirection.NONE,g.disableScrolling=!1;var h=d.debounce(b,g.options.scrollDebounce),k=d.debounce(b,0),m=d.debounce(c,g.options.scrollDebounce),n=d.debounce(c,0);g.flagScrollingVertically=function(a){g.isScrollingVertically||g.isScrollingHorizontally||g.api.core.raise.scrollBegin(a),g.isScrollingVertically=!0,0!==g.options.scrollDebounce&&a.withDelay?h(a):k(a)},g.flagScrollingHorizontally=function(a){g.isScrollingVertically||g.isScrollingHorizontally||g.api.core.raise.scrollBegin(a),g.isScrollingHorizontally=!0,0!==g.options.scrollDebounce&&a.withDelay?m(a):n(a)},g.scrollbarHeight=0,g.scrollbarWidth=0,g.options.enableHorizontalScrollbar===e.scrollbars.ALWAYS&&(g.scrollbarHeight=d.getScrollbarWidth()),g.options.enableVerticalScrollbar===e.scrollbars.ALWAYS&&(g.scrollbarWidth=d.getScrollbarWidth()),g.api=new i(g),g.api.registerMethod("core","refresh",this.refresh),g.api.registerMethod("core","queueGridRefresh",this.queueGridRefresh),g.api.registerMethod("core","refreshRows",this.refreshRows),g.api.registerMethod("core","queueRefresh",this.queueRefresh),g.api.registerMethod("core","handleWindowResize",this.handleWindowResize),g.api.registerMethod("core","addRowHeaderColumn",this.addRowHeaderColumn),g.api.registerMethod("core","scrollToIfNecessary",function(a,b){return g.scrollToIfNecessary(a,b)}),g.api.registerMethod("core","scrollTo",function(a,b){return g.scrollTo(a,b)}),g.api.registerMethod("core","registerRowsProcessor",this.registerRowsProcessor),g.api.registerMethod("core","registerColumnsProcessor",this.registerColumnsProcessor),g.api.registerMethod("core","sortHandleNulls",j.handleNulls),g.api.registerEvent("core","sortChanged"),g.api.registerEvent("core","columnVisibilityChanged"),g.api.registerMethod("core","notifyDataChange",this.notifyDataChange),g.api.registerMethod("core","clearAllFilters",this.clearAllFilters),g.registerDataChangeCallback(g.columnRefreshCallback,[e.dataChange.COLUMN]),g.registerDataChangeCallback(g.processRowsCallback,[e.dataChange.EDIT]),g.registerDataChangeCallback(g.updateFooterHeightCallback,[e.dataChange.OPTIONS]),g.registerStyleComputation({priority:10,func:g.getFooterStyles})};p.prototype.calcFooterHeight=function(){if(!this.hasFooter())return 0;var a=0;return this.options.showGridFooter&&(a+=this.options.gridFooterHeight),a+=this.calcColumnFooterHeight()},p.prototype.calcColumnFooterHeight=function(){var a=0;return this.options.showColumnFooter&&(a+=this.options.columnFooterHeight),a},p.prototype.getFooterStyles=function(){var a=".grid"+this.id+" .ui-grid-footer-aggregates-row { height: "+this.options.columnFooterHeight+"px; }";return a+=" .grid"+this.id+" .ui-grid-footer-info { height: "+this.options.gridFooterHeight+"px; }"},p.prototype.hasFooter=function(){return this.options.showGridFooter||this.options.showColumnFooter},p.prototype.isRTL=function(){return this.rtl},p.prototype.registerColumnBuilder=function(a){this.columnBuilders.push(a)},p.prototype.buildColumnDefsFromData=function(a){this.options.columnDefs=d.getColumnsFromData(a,this.options.excludeProperties)},p.prototype.registerRowBuilder=function(a){this.rowBuilders.push(a)},p.prototype.registerDataChangeCallback=function(a,b,c){var f=d.nextUid();b||(b=[e.dataChange.ALL]),Array.isArray(b)||d.logError("Expected types to be an array or null in registerDataChangeCallback, value passed was: "+b),this.dataChangeCallbacks[f]={callback:a,types:b,_this:c};var g=this,h=function(){delete g.dataChangeCallbacks[f]};return h},p.prototype.callDataChangeCallbacks=function(a,b){angular.forEach(this.dataChangeCallbacks,function(c,d){(-1!==c.types.indexOf(e.dataChange.ALL)||-1!==c.types.indexOf(a)||a===e.dataChange.ALL)&&(c._this?c.callback.apply(c._this,this,b):c.callback(this,b))},this)},p.prototype.notifyDataChange=function(a){var b=e.dataChange;a===b.ALL||a===b.COLUMN||a===b.EDIT||a===b.ROW||a===b.OPTIONS?this.callDataChangeCallbacks(a):d.logError("Notified of a data change, but the type was not recognised, so no action taken, type was: "+a)},p.prototype.columnRefreshCallback=function(a,b){a.buildColumns(b),a.queueGridRefresh()},p.prototype.processRowsCallback=function(a){a.queueGridRefresh()},p.prototype.updateFooterHeightCallback=function(a){a.footerHeight=a.calcFooterHeight(),a.columnFooterHeight=a.calcColumnFooterHeight()},p.prototype.getColumn=function(a){var b=this.columns.filter(function(b){return b.colDef.name===a});return b.length>0?b[0]:null},p.prototype.getColDef=function(a){var b=this.options.columnDefs.filter(function(b){return b.name===a});return b.length>0?b[0]:null},p.prototype.assignTypes=function(){var a=this;a.options.columnDefs.forEach(function(b,c){if(!b.type){var e=new g(b,c,a),f=a.rows.length>0?a.rows[0]:null;f?b.type=d.guessType(a.getCellValue(f,e)):b.type="string"}})},p.prototype.isRowHeaderColumn=function(a){return-1!==this.rowHeaderColumns.indexOf(a)},p.prototype.addRowHeaderColumn=function(a,b,c){var e=this;void 0===b&&(b=0);var f=new g(a,d.nextUid(),e);f.isRowHeader=!0,e.isRTL()?(e.createRightContainer(),f.renderContainer="right"):(e.createLeftContainer(),f.renderContainer="left"),e.columnBuilders[0](a,f,e.options).then(function(){f.enableFiltering=!1,f.enableSorting=!1,f.enableHiding=!1,f.headerPriority=b,e.rowHeaderColumns.push(f),e.rowHeaderColumns=e.rowHeaderColumns.sort(function(a,b){return a.headerPriority-b.headerPriority}),c||e.buildColumns().then(function(){e.preCompileCellTemplates(),e.queueGridRefresh()})["catch"](angular.noop)})["catch"](angular.noop)},p.prototype.getOnlyDataColumns=function(){var a=this,b=[];return a.columns.forEach(function(c){-1===a.rowHeaderColumns.indexOf(c)&&b.push(c)}),b},p.prototype.buildColumns=function(b){var c={orderByColumnDefs:!1};angular.extend(c,b);var e,f=this,h=[],i=f.rowHeaderColumns.length;for(e=0;e<f.columns.length;e++)f.getColDef(f.columns[e].name)||(f.columns.splice(e,1),e--);for(var j=f.rowHeaderColumns.length-1;j>=0;j--)f.columns.unshift(f.rowHeaderColumns[j]);if(f.options.columnDefs.forEach(function(a,b){f.preprocessColDef(a);var c=f.getColumn(a.name);c?c.updateColumnDef(a,!1):(c=new g(a,d.nextUid(),f),f.columns.splice(b+i,0,c)),f.columnBuilders.forEach(function(b){h.push(b.call(f,a,c,f.options))})}),c.orderByColumnDefs){var k=f.columns.slice(0),l=Math.min(f.options.columnDefs.length,f.columns.length);for(e=0;l>e;e++)f.columns[e+i].name!==f.options.columnDefs[e].name?k[e+i]=f.getColumn(f.options.columnDefs[e].name):k[e+i]=f.columns[e+i];f.columns.length=0,Array.prototype.splice.apply(f.columns,[0,0].concat(k))}return a.all(h).then(function(){f.rows.length>0&&f.assignTypes(),c.preCompileCellTemplates&&f.preCompileCellTemplates()})["catch"](angular.noop)},p.prototype.preCompileCellTemplate=function(a){var c=this,d=a.cellTemplate.replace(e.MODEL_COL_FIELD,c.getQualifiedColField(a));d=d.replace(e.COL_FIELD,"grid.getCellValue(row, col)");var f=b(d);a.compiledElementFn=f,a.compiledElementFnDefer&&a.compiledElementFnDefer.resolve(a.compiledElementFn)},p.prototype.preCompileCellTemplates=function(){var a=this;a.columns.forEach(function(b){b.cellTemplate?a.preCompileCellTemplate(b):b.cellTemplatePromise&&b.cellTemplatePromise.then(function(){a.preCompileCellTemplate(b)})["catch"](angular.noop)})},p.prototype.getQualifiedColField=function(a){var b="row.entity";return a.field===e.ENTITY_BINDING?b:d.preEval(b+"."+a.field)},p.prototype.createLeftContainer=function(){this.hasLeftContainer()||(this.renderContainers.left=new l("left",this,{disableColumnOffset:!0}))},p.prototype.createRightContainer=function(){this.hasRightContainer()||(this.renderContainers.right=new l("right",this,{disableColumnOffset:!0}))},p.prototype.hasLeftContainer=function(){return void 0!==this.renderContainers.left},p.prototype.hasRightContainer=function(){return void 0!==this.renderContainers.right},p.prototype.preprocessColDef=function(a){var b=this;if(!a.field&&!a.name)throw new Error("colDef.name or colDef.field property is required");if(void 0===a.name&&void 0!==a.field){for(var c=a.field,d=2;b.getColumn(c);)c=a.field+d.toString(),d++;a.name=c}},p.prototype.newInN=function(a,b,c,d){for(var e=this,f=[],g=0;g<b.length;g++){for(var h=d?b[g][d]:b[g],i=!1,j=0;j<a.length;j++){var k=c?a[j][c]:a[j];if(e.options.rowEquality(h,k)){i=!0;break}}i||f.push(h)}return f},p.prototype.getRow=function(a,b){var c=this;b="undefined"==typeof b?c.rows:b;var d=b.filter(function(b){return c.options.rowEquality(b.entity,a)});return d.length>0?d[0]:null},p.prototype.modifyRows=function(b){var c=this,d=c.rows.slice(0),e=c.rowHashMap||c.createRowHashMap(),f=!0;c.rowHashMap=c.createRowHashMap(),c.rows.length=0,b.forEach(function(a,b){var g,i;i=c.options.enableRowHashing?e.get(a):c.getRow(a,d),i&&(g=i,g.entity=a),g||(g=c.processRowBuilders(new h(a,b,c))),c.rows.push(g),c.rowHashMap.put(a,g),g.isSelected||(f=!1)}),c.selection&&(c.selection.selectAll=f),c.assignTypes();var g=a.when(c.processRowsProcessors(c.rows)).then(function(a){return c.setVisibleRows(a)})["catch"](angular.noop),i=a.when(c.processColumnsProcessors(c.columns)).then(function(a){return c.setVisibleColumns(a)})["catch"](angular.noop);return a.all([g,i])},p.prototype.addRows=function(a){for(var b=this,c=b.rows.length,d=0;d<a.length;d++){var e=b.processRowBuilders(new h(a[d],d+c,b));if(b.options.enableRowHashing){var f=b.rowHashMap.get(e.entity);f&&(f.row=e)}b.rows.push(e)}},p.prototype.processRowBuilders=function(a){var b=this;return b.rowBuilders.forEach(function(c){c.call(b,a,b.options)}),a},p.prototype.registerStyleComputation=function(a){this.styleComputations.push(a)},p.prototype.registerRowsProcessor=function(a,b){if(!angular.isFunction(a))throw"Attempt to register non-function rows processor: "+a;this.rowsProcessors.push({processor:a,priority:b}),this.rowsProcessors.sort(function(a,b){return a.priority-b.priority})},p.prototype.removeRowsProcessor=function(a){var b=-1;this.rowsProcessors.forEach(function(c,d){c.processor===a&&(b=d)}),-1!==b&&this.rowsProcessors.splice(b,1)},p.prototype.processRowsProcessors=function(b){function c(b,e){var g=d.rowsProcessors[b].processor;return a.when(g.call(d,e,d.columns)).then(function(a){if(!a)throw"Processor at index "+b+" did not return a set of renderable rows";if(!angular.isArray(a))throw"Processor at index "+b+" did not return an array";return b++,b<=d.rowsProcessors.length-1?c(b,a):void f.resolve(a)})["catch"](angular.noop)}var d=this,e=b.slice(0);if(0===d.rowsProcessors.length)return a.when(e);var f=a.defer();return c(0,e),f.promise},p.prototype.setVisibleRows=function(a){var b=this;for(var c in b.renderContainers){var d=b.renderContainers[c];d.canvasHeightShouldUpdate=!0,"undefined"==typeof d.visibleRowCache?d.visibleRowCache=[]:d.visibleRowCache.length=0}for(var e=0;e<a.length;e++){var f=a[e],g="undefined"!=typeof f.renderContainer&&f.renderContainer?f.renderContainer:"body";f.visible&&b.renderContainers[g].visibleRowCache.push(f)}b.api.core.raise.rowsVisibleChanged(this.api),b.api.core.raise.rowsRendered(this.api)},p.prototype.registerColumnsProcessor=function(a,b){if(!angular.isFunction(a))throw"Attempt to register non-function rows processor: "+a;this.columnsProcessors.push({processor:a,priority:b}),this.columnsProcessors.sort(function(a,b){return a.priority-b.priority})},p.prototype.removeColumnsProcessor=function(a){var b=this.columnsProcessors.indexOf(a);"undefined"!=typeof b&&void 0!==b&&this.columnsProcessors.splice(b,1)},p.prototype.processColumnsProcessors=function(b){function c(b,g){var h=d.columnsProcessors[b].processor;return a.when(h.call(d,g,d.rows)).then(function(a){if(!a)throw"Processor at index "+b+" did not return a set of renderable rows";if(!angular.isArray(a))throw"Processor at index "+b+" did not return an array";return b++,b<=d.columnsProcessors.length-1?c(b,e):void f.resolve(e)})["catch"](angular.noop)}var d=this,e=b.slice(0);if(0===d.columnsProcessors.length)return a.when(e);var f=a.defer();return c(0,e),f.promise},p.prototype.setVisibleColumns=function(a){var b=this;for(var c in b.renderContainers){var d=b.renderContainers[c];d.visibleColumnCache.length=0}for(var e=0;e<a.length;e++){var f=a[e];f.visible&&("undefined"!=typeof f.renderContainer&&f.renderContainer?b.renderContainers[f.renderContainer].visibleColumnCache.push(f):b.renderContainers.body.visibleColumnCache.push(f))}},p.prototype.handleWindowResize=function(a){var b=this;return b.gridWidth=d.elementWidth(b.element),b.gridHeight=d.elementHeight(b.element),b.queueRefresh()},p.prototype.queueRefresh=function(){var a=this;return a.refreshCanceller&&m.cancel(a.refreshCanceller),a.refreshCanceller=m(function(){a.refreshCanvas(!0)}),a.refreshCanceller.then(function(){a.refreshCanceller=null})["catch"](angular.noop),a.refreshCanceller},p.prototype.queueGridRefresh=function(){var a=this;return a.gridRefreshCanceller&&m.cancel(a.gridRefreshCanceller),a.gridRefreshCanceller=m(function(){a.refresh(!0)}),a.gridRefreshCanceller.then(function(){a.gridRefreshCanceller=null})["catch"](angular.noop),a.gridRefreshCanceller},p.prototype.updateCanvasHeight=function(){var a=this;for(var b in a.renderContainers)if(a.renderContainers.hasOwnProperty(b)){var c=a.renderContainers[b];c.canvasHeightShouldUpdate=!0}},p.prototype.buildStyles=function(){var a=this;a.customStyles="",a.styleComputations.sort(function(a,b){return null===a.priority?1:null===b.priority?-1:null===a.priority&&null===b.priority?0:a.priority-b.priority}).forEach(function(b){var c=b.func.call(a);angular.isString(c)&&(a.customStyles+="\n"+c)})},p.prototype.minColumnsToRender=function(){var a=this,b=this.getViewportWidth(),c=0,d=0;return a.columns.forEach(function(e,f){if(b>d)d+=e.drawnWidth,c++;else{for(var g=0,h=f;h>=f-c;h--)g+=a.columns[h].drawnWidth;b>g&&c++}}),c},p.prototype.getBodyHeight=function(){var a=this.getViewportHeight();return a},p.prototype.getViewportHeight=function(){var a=this,b=this.gridHeight-this.headerHeight-this.footerHeight,c=a.getViewportAdjustment();return b+=c.height},p.prototype.getViewportWidth=function(){var a=this,b=this.gridWidth,c=a.getViewportAdjustment();return b+=c.width},p.prototype.getHeaderViewportWidth=function(){var a=this.getViewportWidth();return a},p.prototype.addVerticalScrollSync=function(a,b){this.verticalScrollSyncCallBackFns[a]=b},p.prototype.addHorizontalScrollSync=function(a,b){this.horizontalScrollSyncCallBackFns[a]=b},p.prototype.scrollContainers=function(a,b){if(b.y){var c=["body","left","right"];this.flagScrollingVertically(b),"body"===a?c=["left","right"]:"left"===a?c=["body","right"]:"right"===a&&(c=["body","left"]);for(var d=0;d<c.length;d++){var e=c[d];this.verticalScrollSyncCallBackFns[e]&&this.verticalScrollSyncCallBackFns[e](b)}}if(b.x){var f=["body","bodyheader","bodyfooter"];this.flagScrollingHorizontally(b),"body"===a&&(f=["bodyheader","bodyfooter"]);for(var g=0;g<f.length;g++){var h=f[g];this.horizontalScrollSyncCallBackFns[h]&&this.horizontalScrollSyncCallBackFns[h](b)}}},p.prototype.registerViewportAdjuster=function(a){this.viewportAdjusters.push(a)},p.prototype.removeViewportAdjuster=function(a){var b=this.viewportAdjusters.indexOf(a);"undefined"!=typeof b&&void 0!==b&&this.viewportAdjusters.splice(b,1)},p.prototype.getViewportAdjustment=function(){var a=this,b={height:0,width:0};return a.viewportAdjusters.forEach(function(a){b=a.call(this,b)}),b},p.prototype.getVisibleRowCount=function(){return this.renderContainers.body.visibleRowCache.length},p.prototype.getVisibleRows=function(){return this.renderContainers.body.visibleRowCache},p.prototype.getVisibleColumnCount=function(){return this.renderContainers.body.visibleColumnCache.length},p.prototype.searchRows=function(a){return k.search(this,a,this.columns)},p.prototype.sortByColumn=function(a){return j.sort(this,a,this.columns)},p.prototype.getCellValue=function(a,b){return"undefined"!=typeof a.entity["$$"+b.uid]?a.entity["$$"+b.uid].rendered:this.options.flatEntityAccess&&"undefined"!=typeof b.field?a.entity[b.field]:(b.cellValueGetterCache||(b.cellValueGetterCache=c(a.getEntityQualifiedColField(b))),b.cellValueGetterCache(a))},p.prototype.getCellDisplayValue=function(a,b){if(!b.cellDisplayGetterCache){var d=b.cellFilter?" | "+b.cellFilter:"";if("undefined"!=typeof a.entity["$$"+b.uid])b.cellDisplayGetterCache=c(a.entity["$$"+b.uid].rendered+d);else if(this.options.flatEntityAccess&&"undefined"!=typeof b.field){var e=b.field.replace(/(')|(\\)/g,"\\$&");b.cellDisplayGetterCache=c("entity['"+e+"']"+d)}else b.cellDisplayGetterCache=c(a.getEntityQualifiedColField(b)+d)}return b.cellDisplayGetterCache(a)},p.prototype.getNextColumnSortPriority=function(){var a=this,b=0;return a.columns.forEach(function(a){a.sort&&void 0!==a.sort.priority&&a.sort.priority>=b&&(b=a.sort.priority+1)}),b},p.prototype.resetColumnSorting=function(a){var b=this;b.columns.forEach(function(b){b===a||b.suppressRemoveSort||(b.sort={})})},p.prototype.getColumnSorting=function(){var a,b=this,c=[];return a=b.columns.slice(0),a.sort(j.prioritySort).forEach(function(a){a.sort&&"undefined"!=typeof a.sort.direction&&a.sort.direction&&(a.sort.direction===e.ASC||a.sort.direction===e.DESC)&&c.push(a)}),c},p.prototype.sortColumn=function(b,c,d){var e=this,f=null;if("undefined"==typeof b||!b)throw new Error("No column parameter provided");if("boolean"==typeof c?d=c:f=c,d?void 0===b.sort.priority&&(b.sort.priority=e.getNextColumnSortPriority()):(e.resetColumnSorting(b),b.sort.priority=void 0,b.sort.priority=e.getNextColumnSortPriority()),f)b.sort.direction=f;else{var g=b.sortDirectionCycle.indexOf(b.sort.direction?b.sort.direction:null);g=(g+1)%b.sortDirectionCycle.length,b.colDef&&b.suppressRemoveSort&&!b.sortDirectionCycle[g]&&(g=(g+1)%b.sortDirectionCycle.length),b.sortDirectionCycle[g]?b.sort.direction=b.sortDirectionCycle[g]:q(b,e)}return e.api.core.raise.sortChanged(e,e.getColumnSorting()),a.when(b)};var q=function(a,b){b.columns.forEach(function(b){b.sort&&void 0!==b.sort.priority&&b.sort.priority>a.sort.priority&&(b.sort.priority-=1)}),a.sort={}};return p.prototype.renderingComplete=function(){angular.isFunction(this.options.onRegisterApi)&&this.options.onRegisterApi(this.api),this.api.core.raise.renderingComplete(this.api)},p.prototype.createRowHashMap=function(){var a=this,b=new o;return b.grid=a,b},p.prototype.refresh=function(b){var c=this,d=c.processRowsProcessors(c.rows).then(function(a){c.setVisibleRows(a)})["catch"](angular.noop),e=c.processColumnsProcessors(c.columns).then(function(a){c.setVisibleColumns(a)})["catch"](angular.noop);return a.all([d,e]).then(function(){c.refreshCanvas(!0),c.redrawInPlace(b)})["catch"](angular.noop)},p.prototype.refreshRows=function(){var a=this;return a.processRowsProcessors(a.rows).then(function(b){a.setVisibleRows(b),a.redrawInPlace(),a.refreshCanvas(!0)})["catch"](angular.noop)},p.prototype.refreshCanvas=function(b){var c=this,e=a.defer(),f=[];for(var g in c.renderContainers)if(c.renderContainers.hasOwnProperty(g)){var h=c.renderContainers[g];if(null===h.canvasWidth||isNaN(h.canvasWidth))continue;(h.header||h.headerCanvas)&&(h.explicitHeaderHeight=h.explicitHeaderHeight||null,h.explicitHeaderCanvasHeight=h.explicitHeaderCanvasHeight||null,f.push(h))}return b&&c.buildStyles(),m(f.length>0?function(){var a,g,h=!1,i=0,j=0,k=function(a,b){return a!==b&&(h=!0),b};for(a=0;a<f.length;a++)if(g=f[a],null!==g.canvasWidth&&!isNaN(g.canvasWidth)){if(g.header){var l=g.headerHeight=k(g.headerHeight,d.outerElementHeight(g.header)),m=d.getBorderSize(g.header,"top"),n=d.getBorderSize(g.header,"bottom"),o=parseInt(l-m-n,10);o=0>o?0:o,g.innerHeaderHeight=o,!g.explicitHeaderHeight&&o>i&&(i=o)}if(g.headerCanvas){var p=g.headerCanvasHeight=k(g.headerCanvasHeight,parseInt(d.outerElementHeight(g.headerCanvas),10));!g.explicitHeaderCanvasHeight&&p>j&&(j=p)}}for(a=0;a<f.length;a++)g=f[a],i>0&&"undefined"!=typeof g.headerHeight&&null!==g.headerHeight&&(g.explicitHeaderHeight||g.headerHeight<i)&&(g.explicitHeaderHeight=k(g.explicitHeaderHeight,i)),j>0&&"undefined"!=typeof g.headerCanvasHeight&&null!==g.headerCanvasHeight&&(g.explicitHeaderCanvasHeight||g.headerCanvasHeight<j)&&(g.explicitHeaderCanvasHeight=k(g.explicitHeaderCanvasHeight,j));b&&h&&c.buildStyles(),e.resolve()}:function(){e.resolve()}),e.promise},p.prototype.redrawInPlace=function(a){var b=this;for(var c in b.renderContainers){var d=b.renderContainers[c];a?(d.adjustRows(d.prevScrollTop,null),d.adjustColumns(d.prevScrollLeft,null)):(d.adjustRows(null,d.prevScrolltopPercentage),d.adjustColumns(null,d.prevScrollleftPercentage))}},p.prototype.hasLeftContainerColumns=function(){return this.hasLeftContainer()&&this.renderContainers.left.renderedColumns.length>0},p.prototype.hasRightContainerColumns=function(){return this.hasRightContainer()&&this.renderContainers.right.renderedColumns.length>0},p.prototype.scrollToIfNecessary=function(b,c){var d=this,e=new n(d,"uiGrid.scrollToIfNecessary"),f=d.renderContainers.body.visibleRowCache,g=d.renderContainers.body.visibleColumnCache,h=d.renderContainers.body.prevScrollTop+d.headerHeight;h=0>h?0:h;var i=d.renderContainers.body.prevScrollLeft,j=d.renderContainers.body.prevScrollTop+d.gridHeight-d.renderContainers.body.headerHeight-d.footerHeight-d.scrollbarWidth,k=d.renderContainers.body.prevScrollLeft+Math.ceil(d.renderContainers.body.getViewportWidth());if(null!==b){var l=f.indexOf(b),m=d.renderContainers.body.getCanvasHeight()-d.renderContainers.body.getViewportHeight(),o=l*d.options.rowHeight+d.headerHeight;o=0>o?0:o;var p,q;h>o?(p=d.renderContainers.body.prevScrollTop-(h-o),q=p/m,1>=q&&(e.y={percentage:q})):o>j&&(p=o-j+d.renderContainers.body.prevScrollTop,q=p/m,1>=q&&(e.y={percentage:q}))}if(null!==c){for(var r=g.indexOf(c),s=d.renderContainers.body.getCanvasWidth()-d.renderContainers.body.getViewportWidth(),t=0,u=0;r>u;u++){var v=g[u];t+=v.drawnWidth}t=0>t?0:t;var w=t+c.drawnWidth;w=0>w?0:w;var x,y;i>t?(x=d.renderContainers.body.prevScrollLeft-(i-t),y=x/s,y=y>1?1:y,e.x={percentage:y}):w>k&&(x=w-k+d.renderContainers.body.prevScrollLeft,y=x/s,y=y>1?1:y,e.x={percentage:y})}var z=a.defer();if(e.y||e.x){e.withDelay=!1,d.scrollContainers("",e);var A=d.api.core.on.scrollEnd(null,function(){
z.resolve(e),A()})}else z.resolve();return z.promise},p.prototype.scrollTo=function(a,b){var c=null,d=null;return null!==a&&"undefined"!=typeof a&&(c=this.getRow(a)),null!==b&&"undefined"!=typeof b&&(d=this.getColumn(b.name?b.name:b.field)),this.scrollToIfNecessary(c,d)},p.prototype.clearAllFilters=function(a,b,c){return void 0===a&&(a=!0),void 0===b&&(b=!1),void 0===c&&(c=!1),this.columns.forEach(function(a){a.filters.forEach(function(a){a.term=void 0,b&&(a.condition=void 0),c&&(a.flags=void 0)})}),a?this.refreshRows():void 0},o.prototype={put:function(a,b){this[this.grid.options.rowIdentity(a)]=b},get:function(a){return this[this.grid.options.rowIdentity(a)]},remove:function(a){var b=this[a=this.grid.options.rowIdentity(a)];return delete this[a],b}},p}])}(),function(){angular.module("ui.grid").factory("GridApi",["$q","$rootScope","gridUtil","uiGridConstants","GridRow","uiGridGridMenuService",function(a,b,c,d,e,f){function g(a,c,d,e){return b.$on(a,function(a){var b=Array.prototype.slice.call(arguments);b.splice(0,1),c.apply(e?e:d.api,b)})}var h=function(a){this.grid=a,this.listeners=[],this.registerEvent("core","renderingComplete"),this.registerEvent("core","filterChanged"),this.registerMethod("core","setRowInvisible",e.prototype.setRowInvisible),this.registerMethod("core","clearRowInvisible",e.prototype.clearRowInvisible),this.registerMethod("core","getVisibleRows",this.grid.getVisibleRows),this.registerEvent("core","rowsVisibleChanged"),this.registerEvent("core","rowsRendered"),this.registerEvent("core","scrollBegin"),this.registerEvent("core","scrollEnd"),this.registerEvent("core","canvasHeightChanged"),this.registerEvent("core","gridDimensionChanged")};return h.prototype.suppressEvents=function(a,b){var c=this,d=angular.isArray(a)?a:[a],e=c.listeners.filter(function(a){return d.some(function(b){return a.handler===b})});e.forEach(function(a){a.dereg()}),b(),e.forEach(function(a){a.dereg=g(a.eventId,a.handler,c.grid,a._this)})},h.prototype.registerEvent=function(a,d){var e=this;e[a]||(e[a]={});var f=e[a];f.on||(f.on={},f.raise={});var h=e.grid.id+a+d;f.raise[d]=function(){b.$emit.apply(b,[h].concat(Array.prototype.slice.call(arguments)))},f.on[d]=function(b,f,i){if(null!==b&&"undefined"==typeof b.$on)return void c.logError("asked to listen on "+a+".on."+d+" but scope wasn't passed in the input parameters.  It is legitimate to pass null, but you've passed something else, so you probably forgot to provide scope rather than did it deliberately, not registering");var j=g(h,f,e.grid,i),k={handler:f,dereg:j,eventId:h,scope:b,_this:i};e.listeners.push(k);var l=function(){k.dereg();var a=e.listeners.indexOf(k);e.listeners.splice(a,1)};return b&&b.$on("$destroy",function(){l()}),l}},h.prototype.registerEventsFromObject=function(a){var b=this,c=[];angular.forEach(a,function(a,b){var d={name:b,events:[]};angular.forEach(a,function(a,b){d.events.push(b)}),c.push(d)}),c.forEach(function(a){a.events.forEach(function(c){b.registerEvent(a.name,c)})})},h.prototype.registerMethod=function(a,b,d,e){this[a]||(this[a]={});var f=this[a];f[b]=c.createBoundedWrapper(e||this.grid,d)},h.prototype.registerMethodsFromObject=function(a,b){var c=this,d=[];angular.forEach(a,function(a,b){var c={name:b,methods:[]};angular.forEach(a,function(a,b){c.methods.push({name:b,fn:a})}),d.push(c)}),d.forEach(function(a){a.methods.forEach(function(d){c.registerMethod(a.name,d.name,d.fn,b)})})},h}])}(),function(){angular.module("ui.grid").factory("GridColumn",["gridUtil","uiGridConstants","i18nService",function(a,b,c){function d(a,c,d){var e=this;e.grid=d,e.uid=c,e.updateColumnDef(a,!0),e.aggregationValue=void 0,e.updateAggregationValue=function(){if(!e.aggregationType)return void(e.aggregationValue=void 0);var a=0,c=e.grid.getVisibleRows(),d=function(){var a=[];return c.forEach(function(b){var c=e.grid.getCellValue(b,e),d=Number(c);isNaN(d)||a.push(d)}),a};angular.isFunction(e.aggregationType)?e.aggregationValue=e.aggregationType(c,e):e.aggregationType===b.aggregationTypes.count?e.aggregationValue=e.grid.getVisibleRowCount():e.aggregationType===b.aggregationTypes.sum?(d().forEach(function(b){a+=b}),e.aggregationValue=a):e.aggregationType===b.aggregationTypes.avg?(d().forEach(function(b){a+=b}),a/=d().length,e.aggregationValue=a):e.aggregationType===b.aggregationTypes.min?e.aggregationValue=Math.min.apply(null,d()):e.aggregationType===b.aggregationTypes.max?e.aggregationValue=Math.max.apply(null,d()):e.aggregationValue=" "},this.getAggregationValue=function(){return e.aggregationValue}}return d.prototype.hideColumn=function(){this.colDef.visible=!1},d.prototype.setPropertyOrDefault=function(a,b,c){var d=this;"undefined"!=typeof a[b]&&a[b]?d[b]=a[b]:"undefined"!=typeof d[b]?d[b]=d[b]:d[b]=c?c:{}},d.prototype.updateColumnDef=function(c,d){var e=this;if(e.colDef=c,void 0===c.name)throw new Error("colDef.name is required for column at index "+e.grid.options.columnDefs.indexOf(c));if(e.displayName=void 0===c.displayName?a.readableColumnName(c.name):c.displayName,!angular.isNumber(e.width)||!e.hasCustomWidth||c.allowCustomWidthOverride){var f=c.width,g="Cannot parse column width '"+f+"' for column named '"+c.name+"'";if(e.hasCustomWidth=!1,angular.isString(f)||angular.isNumber(f))if(angular.isString(f))if(a.endsWith(f,"%")){var h=f.replace(/%/g,""),i=parseInt(h,10);if(isNaN(i))throw new Error(g);e.width=f}else if(f.match(/^(\d+)$/))e.width=parseInt(f.match(/^(\d+)$/)[1],10);else{if(!f.match(/^\*+$/))throw new Error(g);e.width=f}else e.width=f;else e.width="*"}["minWidth","maxWidth"].forEach(function(a){var b=c[a],d="Cannot parse column "+a+" '"+b+"' for column named '"+c.name+"'";if(angular.isString(b)||angular.isNumber(b))if(angular.isString(b)){if(!b.match(/^(\d+)$/))throw new Error(d);e[a]=parseInt(b.match(/^(\d+)$/)[1],10)}else e[a]=b;else e[a]="minWidth"===a?30:9e3}),e.field=void 0===c.field?c.name:c.field,"string"!=typeof e.field&&a.logError("Field is not a string, this is likely to break the code, Field is: "+e.field),e.name=c.name,e.displayName=void 0===c.displayName?a.readableColumnName(c.name):c.displayName,e.aggregationType=angular.isDefined(c.aggregationType)?c.aggregationType:null,e.footerCellTemplate=angular.isDefined(c.footerCellTemplate)?c.footerCellTemplate:null,"undefined"==typeof c.cellTooltip||c.cellTooltip===!1?e.cellTooltip=!1:c.cellTooltip===!0?e.cellTooltip=function(a,b){return e.grid.getCellValue(a,b)}:"function"==typeof c.cellTooltip?e.cellTooltip=c.cellTooltip:e.cellTooltip=function(a,b){return b.colDef.cellTooltip},"undefined"==typeof c.headerTooltip||c.headerTooltip===!1?e.headerTooltip=!1:c.headerTooltip===!0?e.headerTooltip=function(a){return a.displayName}:"function"==typeof c.headerTooltip?e.headerTooltip=c.headerTooltip:e.headerTooltip=function(a){return a.colDef.headerTooltip},e.footerCellClass=c.footerCellClass,e.cellClass=c.cellClass,e.headerCellClass=c.headerCellClass,e.cellFilter=c.cellFilter?c.cellFilter:"",e.sortCellFiltered=c.sortCellFiltered?!0:!1,e.filterCellFiltered=c.filterCellFiltered?!0:!1,e.headerCellFilter=c.headerCellFilter?c.headerCellFilter:"",e.footerCellFilter=c.footerCellFilter?c.footerCellFilter:"",e.visible=a.isNullOrUndefined(c.visible)||c.visible,e.headerClass=c.headerClass,e.enableSorting="undefined"!=typeof c.enableSorting?c.enableSorting:e.grid.options.enableSorting,e.sortingAlgorithm=c.sortingAlgorithm,e.sortDirectionCycle="undefined"!=typeof c.sortDirectionCycle?c.sortDirectionCycle:[null,b.ASC,b.DESC],"undefined"==typeof e.suppressRemoveSort&&(e.suppressRemoveSort="undefined"!=typeof c.suppressRemoveSort?c.suppressRemoveSort:!1),e.enableFiltering="undefined"!=typeof c.enableFiltering?c.enableFiltering:!0,e.setPropertyOrDefault(c,"menuItems",[]),d&&e.setPropertyOrDefault(c,"sort"),e.setPropertyOrDefault(c,"defaultSort");var j=[];c.filter?j.push(c.filter):c.filters?j=c.filters:j.push({}),d?(e.setPropertyOrDefault(c,"filter"),e.setPropertyOrDefault(c,"extraStyle"),e.setPropertyOrDefault(c,"filters",j)):e.filters.length===j.length&&e.filters.forEach(function(a,b){"undefined"!=typeof j[b].placeholder&&(a.placeholder=j[b].placeholder),"undefined"!=typeof j[b].ariaLabel&&(a.ariaLabel=j[b].ariaLabel),"undefined"!=typeof j[b].flags&&(a.flags=j[b].flags),"undefined"!=typeof j[b].type&&(a.type=j[b].type),"undefined"!=typeof j[b].selectOptions&&(a.selectOptions=j[b].selectOptions)})},d.prototype.unsort=function(){this.sort={},this.grid.api.core.raise.sortChanged(this.grid,this.grid.getColumnSorting())},d.prototype.getColClass=function(a){var c=b.COL_CLASS_PREFIX+this.uid;return a?"."+c:c},d.prototype.isPinnedLeft=function(){return"left"===this.renderContainer},d.prototype.isPinnedRight=function(){return"right"===this.renderContainer},d.prototype.getColClassDefinition=function(){return" .grid"+this.grid.id+" "+this.getColClass(!0)+" { min-width: "+this.drawnWidth+"px; max-width: "+this.drawnWidth+"px; }"},d.prototype.getRenderContainer=function(){var a=this,b=a.renderContainer;return(null===b||""===b||void 0===b)&&(b="body"),a.grid.renderContainers[b]},d.prototype.showColumn=function(){this.colDef.visible=!0},d.prototype.getAggregationText=function(){var a=this;if(a.colDef.aggregationHideLabel)return"";if(a.colDef.aggregationLabel)return a.colDef.aggregationLabel;switch(a.colDef.aggregationType){case b.aggregationTypes.count:return c.getSafeText("aggregation.count");case b.aggregationTypes.sum:return c.getSafeText("aggregation.sum");case b.aggregationTypes.avg:return c.getSafeText("aggregation.avg");case b.aggregationTypes.min:return c.getSafeText("aggregation.min");case b.aggregationTypes.max:return c.getSafeText("aggregation.max");default:return""}},d.prototype.getCellTemplate=function(){var a=this;return a.cellTemplatePromise},d.prototype.getCompiledElementFn=function(){var a=this;return a.compiledElementFnDefer.promise},d}])}(),function(){angular.module("ui.grid").factory("GridOptions",["gridUtil","uiGridConstants",function(a,b){return{initialize:function(c){return c.onRegisterApi=c.onRegisterApi||angular.noop(),c.data=c.data||[],c.columnDefs=c.columnDefs||[],c.excludeProperties=c.excludeProperties||["$$hashKey"],c.enableRowHashing=c.enableRowHashing!==!1,c.rowIdentity=c.rowIdentity||function(b){return a.hashKey(b)},c.getRowIdentity=c.getRowIdentity||function(a){return a.$$hashKey},c.flatEntityAccess=c.flatEntityAccess===!0,c.showHeader="undefined"!=typeof c.showHeader?c.showHeader:!0,c.showHeader?c.headerRowHeight="undefined"!=typeof c.headerRowHeight?c.headerRowHeight:30:c.headerRowHeight=0,"string"==typeof c.rowHeight?c.rowHeight=parseInt(c.rowHeight)||30:c.rowHeight=c.rowHeight||30,c.minRowsToShow="undefined"!=typeof c.minRowsToShow?c.minRowsToShow:10,c.showGridFooter=c.showGridFooter===!0,c.showColumnFooter=c.showColumnFooter===!0,c.columnFooterHeight="undefined"!=typeof c.columnFooterHeight?c.columnFooterHeight:30,c.gridFooterHeight="undefined"!=typeof c.gridFooterHeight?c.gridFooterHeight:30,c.columnWidth="undefined"!=typeof c.columnWidth?c.columnWidth:50,c.maxVisibleColumnCount="undefined"!=typeof c.maxVisibleColumnCount?c.maxVisibleColumnCount:200,c.virtualizationThreshold="undefined"!=typeof c.virtualizationThreshold?c.virtualizationThreshold:20,c.columnVirtualizationThreshold="undefined"!=typeof c.columnVirtualizationThreshold?c.columnVirtualizationThreshold:10,c.excessRows="undefined"!=typeof c.excessRows?c.excessRows:4,c.scrollThreshold="undefined"!=typeof c.scrollThreshold?c.scrollThreshold:4,c.excessColumns="undefined"!=typeof c.excessColumns?c.excessColumns:4,c.horizontalScrollThreshold="undefined"!=typeof c.horizontalScrollThreshold?c.horizontalScrollThreshold:2,c.aggregationCalcThrottle="undefined"!=typeof c.aggregationCalcThrottle?c.aggregationCalcThrottle:500,c.wheelScrollThrottle="undefined"!=typeof c.wheelScrollThrottle?c.wheelScrollThrottle:70,c.scrollDebounce="undefined"!=typeof c.scrollDebounce?c.scrollDebounce:300,c.enableSorting=c.enableSorting!==!1,c.enableFiltering=c.enableFiltering===!0,c.enableColumnMenus=c.enableColumnMenus!==!1,c.enableVerticalScrollbar="undefined"!=typeof c.enableVerticalScrollbar?c.enableVerticalScrollbar:b.scrollbars.ALWAYS,c.enableHorizontalScrollbar="undefined"!=typeof c.enableHorizontalScrollbar?c.enableHorizontalScrollbar:b.scrollbars.ALWAYS,c.enableMinHeightCheck=c.enableMinHeightCheck!==!1,c.minimumColumnSize="undefined"!=typeof c.minimumColumnSize?c.minimumColumnSize:10,c.rowEquality=c.rowEquality||function(a,b){return a===b},c.headerTemplate=c.headerTemplate||null,c.footerTemplate=c.footerTemplate||"ui-grid/ui-grid-footer",c.gridFooterTemplate=c.gridFooterTemplate||"ui-grid/ui-grid-grid-footer",c.rowTemplate=c.rowTemplate||"ui-grid/ui-grid-row",c.gridMenuTemplate=c.gridMenuTemplate||"ui-grid/uiGridMenu",c.appScopeProvider=c.appScopeProvider||null,c}}}])}(),function(){angular.module("ui.grid").factory("GridRenderContainer",["gridUtil","uiGridConstants",function(a,b){function c(a,b,c){var d=this;d.name=a,d.grid=b,d.visibleRowCache=[],d.visibleColumnCache=[],d.renderedRows=[],d.renderedColumns=[],d.prevScrollTop=0,d.prevScrolltopPercentage=0,d.prevRowScrollIndex=0,d.prevScrollLeft=0,d.prevScrollleftPercentage=0,d.prevColumnScrollIndex=0,d.columnStyles="",d.viewportAdjusters=[],d.hasHScrollbar=!1,d.hasVScrollbar=!1,d.canvasHeightShouldUpdate=!0,d.$$canvasHeight=0,c&&angular.isObject(c)&&angular.extend(d,c),b.registerStyleComputation({priority:5,func:function(){return d.updateColumnWidths(),d.columnStyles}})}return c.prototype.reset=function(){this.visibleColumnCache.length=0,this.visibleRowCache.length=0,this.renderedRows.length=0,this.renderedColumns.length=0},c.prototype.containsColumn=function(a){return-1!==this.visibleColumnCache.indexOf(a)},c.prototype.minRowsToRender=function(){for(var a=this,b=0,c=0,d=a.getViewportHeight(),e=a.visibleRowCache.length-1;d>c&&e>=0;e--)c+=a.visibleRowCache[e].height,b++;return b},c.prototype.minColumnsToRender=function(){for(var a=this,b=this.getViewportWidth(),c=0,d=0,e=0;e<a.visibleColumnCache.length;e++){var f=a.visibleColumnCache[e];if(b>d)d+=f.drawnWidth?f.drawnWidth:0,c++;else{for(var g=0,h=e;h>=e-c;h--)g+=a.visibleColumnCache[h].drawnWidth?a.visibleColumnCache[h].drawnWidth:0;b>g&&c++}}return c},c.prototype.getVisibleRowCount=function(){return this.visibleRowCache.length},c.prototype.registerViewportAdjuster=function(a){this.viewportAdjusters.push(a)},c.prototype.removeViewportAdjuster=function(a){var b=this.viewportAdjusters.indexOf(a);b>-1&&this.viewportAdjusters.splice(b,1)},c.prototype.getViewportAdjustment=function(){var a=this,b={height:0,width:0};return a.viewportAdjusters.forEach(function(a){b=a.call(this,b)}),b},c.prototype.getMargin=function(a){var b=this,c=0;return b.viewportAdjusters.forEach(function(b){var d=b.call(this,{height:0,width:0});d.side&&d.side===a&&(c+=-1*d.width)}),c},c.prototype.getViewportHeight=function(){var a=this,b=a.headerHeight?a.headerHeight:a.grid.headerHeight,c=a.grid.gridHeight-b-a.grid.footerHeight,d=a.getViewportAdjustment();return c+=d.height},c.prototype.getViewportWidth=function(){var a=this,b=a.grid.gridWidth,c=a.getViewportAdjustment();return b+=c.width},c.prototype.getHeaderViewportWidth=function(){var a=this.getViewportWidth();return a},c.prototype.getCanvasHeight=function(){var a=this;if(!a.canvasHeightShouldUpdate)return a.$$canvasHeight;var b=a.$$canvasHeight;return a.$$canvasHeight=0,a.visibleRowCache.forEach(function(b){a.$$canvasHeight+=b.height}),a.canvasHeightShouldUpdate=!1,a.grid.api.core.raise.canvasHeightChanged(b,a.$$canvasHeight),a.$$canvasHeight},c.prototype.getVerticalScrollLength=function(){return this.getCanvasHeight()-this.getViewportHeight()+this.grid.scrollbarHeight!==0?this.getCanvasHeight()-this.getViewportHeight()+this.grid.scrollbarHeight:-1},c.prototype.getHorizontalScrollLength=function(){return this.getCanvasWidth()-this.getViewportWidth()+this.grid.scrollbarWidth!==0?this.getCanvasWidth()-this.getViewportWidth()+this.grid.scrollbarWidth:-1},c.prototype.getCanvasWidth=function(){var a=this,b=a.canvasWidth;return b},c.prototype.setRenderedRows=function(a){this.renderedRows.length=a.length;for(var b=0;b<a.length;b++)this.renderedRows[b]=a[b]},c.prototype.setRenderedColumns=function(a){this.renderedColumns.length=a.length;for(var b=0;b<a.length;b++)this.renderedColumns[b]=a[b];this.updateColumnOffset()},c.prototype.updateColumnOffset=function(){for(var a=0,b=0;b<this.currentFirstColumn;b++)a+=this.visibleColumnCache[b].drawnWidth;this.columnOffset=a},c.prototype.scrollVertical=function(a){var c=-1;if(a!==this.prevScrollTop){var d=a-this.prevScrollTop;d>0&&(this.grid.scrollDirection=b.scrollDirection.DOWN),0>d&&(this.grid.scrollDirection=b.scrollDirection.UP);var e=this.getVerticalScrollLength();return c=a/e,c>1&&(c=1),0>c&&(c=0),this.adjustScrollVertical(a,c),c}},c.prototype.scrollHorizontal=function(a){var c=-1;if(a!==this.prevScrollLeft){var d=a-this.prevScrollLeft;d>0&&(this.grid.scrollDirection=b.scrollDirection.RIGHT),0>d&&(this.grid.scrollDirection=b.scrollDirection.LEFT);var e=this.getHorizontalScrollLength();return c=0!==e?a/e:0,this.adjustScrollHorizontal(a,c),c}},c.prototype.adjustScrollVertical=function(a,b,c){(this.prevScrollTop!==a||c)&&(("undefined"==typeof a||void 0===a||null===a)&&(a=(this.getCanvasHeight()-this.getViewportHeight())*b),this.adjustRows(a,b,!1),this.prevScrollTop=a,this.prevScrolltopPercentage=b,this.grid.queueRefresh())},c.prototype.adjustScrollHorizontal=function(a,b,c){(this.prevScrollLeft!==a||c)&&(("undefined"==typeof a||void 0===a||null===a)&&(a=(this.getCanvasWidth()-this.getViewportWidth())*b),this.adjustColumns(a,b),this.prevScrollLeft=a,this.prevScrollleftPercentage=b,this.grid.queueRefresh())},c.prototype.adjustRows=function(a,b,c){var d=this,e=d.minRowsToRender(),f=d.visibleRowCache,g=f.length-e;"undefined"!=typeof b&&null!==b||!a||(b=a/d.getVerticalScrollLength());var h=Math.ceil(Math.min(g,g*b));h>g&&(h=g);var i=[];if(f.length>d.grid.options.virtualizationThreshold){if("undefined"!=typeof a&&null!==a){if(!d.grid.suppressParentScrollDown&&d.prevScrollTop<a&&h<d.prevRowScrollIndex+d.grid.options.scrollThreshold&&g>h)return;if(!d.grid.suppressParentScrollUp&&d.prevScrollTop>a&&h>d.prevRowScrollIndex-d.grid.options.scrollThreshold&&g>h)return}var j={},k={};j=Math.max(0,h-d.grid.options.excessRows),k=Math.min(f.length,h+e+d.grid.options.excessRows),i=[j,k]}else{var l=d.visibleRowCache.length;i=[0,Math.max(l,e+d.grid.options.excessRows)]}d.updateViewableRowRange(i),d.prevRowScrollIndex=h},c.prototype.adjustColumns=function(a,b){var c=this,d=c.minColumnsToRender(),e=c.visibleColumnCache,f=e.length-d;"undefined"!=typeof b&&null!==b||!a||(b=a/c.getHorizontalScrollLength());var g=Math.ceil(Math.min(f,f*b));g>f&&(g=f);var h=[];if(e.length>c.grid.options.columnVirtualizationThreshold&&c.getCanvasWidth()>c.getViewportWidth()){var i=Math.max(0,g-c.grid.options.excessColumns),j=Math.min(e.length,g+d+c.grid.options.excessColumns);h=[i,j]}else{var k=c.visibleColumnCache.length;h=[0,Math.max(k,d+c.grid.options.excessColumns)]}c.updateViewableColumnRange(h),c.prevColumnScrollIndex=g},c.prototype.updateViewableRowRange=function(a){var b=this.visibleRowCache.slice(a[0],a[1]);this.currentTopRow=a[0],this.setRenderedRows(b)},c.prototype.updateViewableColumnRange=function(a){var b=this.visibleColumnCache.slice(a[0],a[1]);this.currentFirstColumn=a[0],this.setRenderedColumns(b)},c.prototype.headerCellWrapperStyle=function(){var a=this;if(0!==a.currentFirstColumn){var b=a.columnOffset;return a.grid.isRTL()?{"margin-right":b+"px"}:{"margin-left":b+"px"}}return null},c.prototype.updateColumnWidths=function(){var b=this,c=[],d=0,e=0,f="",g=b.grid.getViewportWidth()-b.grid.scrollbarWidth,h=[];angular.forEach(b.grid.renderContainers,function(a,b){h=h.concat(a.visibleColumnCache)}),h.forEach(function(b,f){var h=0;b.visible&&(angular.isNumber(b.width)?(h=parseInt(b.width,10),e+=h,b.drawnWidth=h):a.endsWith(b.width,"%")?(h=parseInt(parseInt(b.width.replace(/%/g,""),10)/100*g),h>b.maxWidth&&(h=b.maxWidth),h<b.minWidth&&(h=b.minWidth),e+=h,b.drawnWidth=h):angular.isString(b.width)&&-1!==b.width.indexOf("*")&&(d+=b.width.length,c.push(b)))});var i=g-e;if(c.length>0){var j=i/d;c.forEach(function(a){var b=parseInt(a.width.length*j,10);b>a.maxWidth&&(b=a.maxWidth),b<a.minWidth&&(b=a.minWidth),e+=b,a.drawnWidth=b})}for(var k=function(a){a.drawnWidth<a.maxWidth&&l>0&&(a.drawnWidth++,e++,l--,m=!0)},l=g-e,m=!0;l>0&&m;)m=!1,c.forEach(k);var n=function(a){a.drawnWidth>a.minWidth&&o>0&&(a.drawnWidth--,e--,o--,m=!0)},o=e-g;for(m=!0;o>0&&m;)m=!1,c.forEach(n);var p=0;b.visibleColumnCache.forEach(function(a){a.visible&&(p+=a.drawnWidth)}),h.forEach(function(a){f+=a.getColClassDefinition()}),b.canvasWidth=p,this.columnStyles=f},c.prototype.needsHScrollbarPlaceholder=function(){return this.grid.options.enableHorizontalScrollbar&&!this.hasHScrollbar&&!this.grid.disableScrolling},c.prototype.getViewportStyle=function(){var a=this,c={};return a.hasHScrollbar=!1,a.hasVScrollbar=!1,a.grid.disableScrolling?(c["overflow-x"]="hidden",c["overflow-y"]="hidden",c):("body"===a.name?(a.hasHScrollbar=a.grid.options.enableHorizontalScrollbar!==b.scrollbars.NEVER,a.grid.isRTL()?a.grid.hasLeftContainerColumns()||(a.hasVScrollbar=a.grid.options.enableVerticalScrollbar!==b.scrollbars.NEVER):a.grid.hasRightContainerColumns()||(a.hasVScrollbar=a.grid.options.enableVerticalScrollbar!==b.scrollbars.NEVER)):"left"===a.name?a.hasVScrollbar=a.grid.isRTL()?a.grid.options.enableVerticalScrollbar!==b.scrollbars.NEVER:!1:a.hasVScrollbar=a.grid.isRTL()?!1:a.grid.options.enableVerticalScrollbar!==b.scrollbars.NEVER,c["overflow-x"]=a.hasHScrollbar?"auto":"hidden",c["overflow-y"]=a.hasVScrollbar?"auto":"hidden",c)},c}])}(),function(){angular.module("ui.grid").factory("GridRow",["gridUtil","uiGridConstants",function(a,b){function c(b,c,d){this.grid=d,this.entity=b,this.uid=a.nextUid(),this.visible=!0,this.$$height=d.options.rowHeight}return Object.defineProperty(c.prototype,"height",{get:function(){return this.$$height},set:function(a){a!==this.$$height&&(this.grid.updateCanvasHeight(),this.$$height=a)}}),c.prototype.getQualifiedColField=function(a){return"row."+this.getEntityQualifiedColField(a)},c.prototype.getEntityQualifiedColField=function(c){var d="entity";return c.field===b.ENTITY_BINDING?d:a.preEval(d+"."+c.field)},c.prototype.setRowInvisible=function(a){a&&a.setThisRowInvisible&&a.setThisRowInvisible("user")},c.prototype.clearRowInvisible=function(a){a&&a.clearThisRowInvisible&&a.clearThisRowInvisible("user")},c.prototype.setThisRowInvisible=function(a,b){this.invisibleReason||(this.invisibleReason={}),this.invisibleReason[a]=!0,this.evaluateRowVisibility(b)},c.prototype.clearThisRowInvisible=function(a,b){"undefined"!=typeof this.invisibleReason&&delete this.invisibleReason[a],this.evaluateRowVisibility(b)},c.prototype.evaluateRowVisibility=function(a){var b=!0;"undefined"!=typeof this.invisibleReason&&angular.forEach(this.invisibleReason,function(a,c){a&&(b=!1)}),("undefined"==typeof this.visible||this.visible!==b)&&(this.visible=b,a||(this.grid.queueGridRefresh(),this.grid.api.core.raise.rowsVisibleChanged(this)))},c}])}(),function(){"use strict";angular.module("ui.grid").factory("GridRowColumn",["$parse","$filter",function(a,b){var c=function d(a,b){if(!(this instanceof d))throw"Using GridRowColumn as a function insead of as a constructor. Must be called with `new` keyword";this.row=a,this.col=b};return c.prototype.getIntersectionValueRaw=function(){var b=a(this.row.getEntityQualifiedColField(this.col)),c=this.row;return b(c)},c}])}(),function(){angular.module("ui.grid").factory("ScrollEvent",["gridUtil",function(a){function b(b,c,d,e){var f=this;if(!b)throw new Error("grid argument is required");f.grid=b,f.source=e,f.withDelay=!0,f.sourceRowContainer=c,f.sourceColContainer=d,f.newScrollLeft=null,f.newScrollTop=null,f.x=null,f.y=null,f.verticalScrollLength=-9999999,f.horizontalScrollLength=-999999,f.fireThrottledScrollingEvent=a.throttle(function(a){f.grid.scrollContainers(a,f)},f.grid.options.wheelScrollThrottle,{trailing:!0})}return b.prototype.getNewScrollLeft=function(b,c){var d=this;if(!d.newScrollLeft){var e,f=b.getCanvasWidth()-b.getViewportWidth(),g=a.normalizeScrollLeft(c,d.grid);if("undefined"!=typeof d.x.percentage&&void 0!==d.x.percentage)e=d.x.percentage;else{if("undefined"==typeof d.x.pixels||void 0===d.x.pixels)throw new Error("No percentage or pixel value provided for scroll event X axis");e=d.x.percentage=(g+d.x.pixels)/f}return Math.max(0,e*f)}return d.newScrollLeft},b.prototype.getNewScrollTop=function(a,b){var c=this;if(!c.newScrollTop){var d,e=a.getVerticalScrollLength(),f=b[0].scrollTop;if("undefined"!=typeof c.y.percentage&&void 0!==c.y.percentage)d=c.y.percentage;else{if("undefined"==typeof c.y.pixels||void 0===c.y.pixels)throw new Error("No percentage or pixel value provided for scroll event Y axis");d=c.y.percentage=(f+c.y.pixels)/e}return Math.max(0,d*e)}return c.newScrollTop},b.prototype.atTop=function(a){return this.y&&(0===this.y.percentage||this.verticalScrollLength<0)&&0===a},b.prototype.atBottom=function(a){return this.y&&(1===this.y.percentage||0===this.verticalScrollLength)&&a>0},b.prototype.atLeft=function(a){return this.x&&(0===this.x.percentage||this.horizontalScrollLength<0)&&0===a},b.prototype.atRight=function(a){return this.x&&(1===this.x.percentage||0===this.horizontalScrollLength)&&a>0},b.Sources={ViewPortScroll:"ViewPortScroll",RenderContainerMouseWheel:"RenderContainerMouseWheel",RenderContainerTouchMove:"RenderContainerTouchMove",Other:99},b}])}(),function(){"use strict";angular.module("ui.grid").service("gridClassFactory",["gridUtil","$q","$compile","$templateCache","uiGridConstants","Grid","GridColumn","GridRow",function(a,b,c,d,e,f,g,h){var i={createGrid:function(d){d="undefined"!=typeof d?d:{},d.id=a.newId();var e=new f(d);if(e.options.rowTemplate){var g=b.defer();e.getRowTemplateFn=g.promise,a.getTemplate(e.options.rowTemplate).then(function(a){var b=c(a);g.resolve(b)},function(a){throw new Error("Couldn't fetch/use row template '"+e.options.rowTemplate+"'")})["catch"](angular.noop)}return e.registerColumnBuilder(i.defaultColumnBuilder),e.registerRowBuilder(i.rowTemplateAssigner),e.registerRowsProcessor(function(a){return a.forEach(function(a){a.evaluateRowVisibility(!0)},50),a}),e.registerColumnsProcessor(function(a){return a.forEach(function(a){a.visible=angular.isDefined(a.colDef.visible)?a.colDef.visible:!0}),a},50),e.registerRowsProcessor(e.searchRows,100),e.options.externalSort&&angular.isFunction(e.options.externalSort)?e.registerRowsProcessor(e.options.externalSort,200):e.registerRowsProcessor(e.sortByColumn,200),e},defaultColumnBuilder:function(c,d,f){var g=[],h=function(b,f,h,i,j){c[b]?d[f]=c[b]:d[f]=h,g.push(a.getTemplate(d[f]).then(function(a){angular.isFunction(a)&&(a=a());var c="cellTooltip"===j?"col.cellTooltip(row,col)":"col.headerTooltip(col)";j&&d[j]===!1?a=a.replace(e.TOOLTIP,""):j&&d[j]&&(a=a.replace(e.TOOLTIP,'title="{{'+c+' CUSTOM_FILTERS }}"')),i?d[b]=a.replace(e.CUSTOM_FILTERS,function(){return d[i]?"|"+d[i]:""}):d[b]=a},function(a){throw new Error("Couldn't fetch/use colDef."+b+" '"+c[b]+"'")})["catch"](angular.noop))};return h("cellTemplate","providedCellTemplate","ui-grid/uiGridCell","cellFilter","cellTooltip"),d.cellTemplatePromise=g[0],h("headerCellTemplate","providedHeaderCellTemplate","ui-grid/uiGridHeaderCell","headerCellFilter","headerTooltip"),h("footerCellTemplate","providedFooterCellTemplate","ui-grid/uiGridFooterCell","footerCellFilter"),h("filterHeaderTemplate","providedFilterHeaderTemplate","ui-grid/ui-grid-filter"),d.compiledElementFnDefer=b.defer(),b.all(g)},rowTemplateAssigner:function(d){var e=this;if(d.rowTemplate){var f=b.defer();d.getRowTemplateFn=f.promise,a.getTemplate(d.rowTemplate).then(function(a){var b=c(a);f.resolve(b)},function(a){throw new Error("Couldn't fetch/use row template '"+d.rowTemplate+"'")})}else d.rowTemplate=e.options.rowTemplate,d.getRowTemplateFn=e.getRowTemplateFn;return d.getRowTemplateFn}};return i}])}(),function(){function a(a){return a.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,"\\$&")}var b=angular.module("ui.grid");b.service("rowSearcher",["gridUtil","uiGridConstants",function(b,c){var d=c.filter.CONTAINS,e={};return e.getTerm=function(a){if("undefined"==typeof a.term)return a.term;var b=a.term;return"string"==typeof b&&(b=b.trim()),b},e.stripTerm=function(b){var c=e.getTerm(b);return"string"==typeof c?a(c.replace(/(^\*|\*$)/g,"")):c},e.guessCondition=function(a){if("undefined"==typeof a.term||!a.term)return d;var b=e.getTerm(a);if(/\*/.test(b)){var c="";a.flags&&a.flags.caseSensitive||(c+="i");var f=b.replace(/(\\)?\*/g,function(a,b){return b?a:"[\\s\\S]*?"});return new RegExp("^"+f+"$",c)}return d},e.setupFilters=function(a){for(var d=[],f=a.length,g=0;f>g;g++){var h=a[g];if(h.noTerm||!b.isNullOrUndefined(h.term)){var i={},j="";h.flags&&h.flags.caseSensitive||(j+="i"),b.isNullOrUndefined(h.term)||(h.rawTerm?i.term=h.term:i.term=e.stripTerm(h)),i.noTerm=h.noTerm,h.condition?i.condition=h.condition:i.condition=e.guessCondition(h),i.flags=angular.extend({caseSensitive:!1,date:!1},h.flags),i.condition===c.filter.STARTS_WITH&&(i.startswithRE=new RegExp("^"+i.term,j)),i.condition===c.filter.ENDS_WITH&&(i.endswithRE=new RegExp(i.term+"$",j)),i.condition===c.filter.CONTAINS&&(i.containsRE=new RegExp(i.term,j)),i.condition===c.filter.EXACT&&(i.exactRE=new RegExp("^"+i.term+"$",j)),d.push(i)}}return d},e.runColumnFilter=function(a,b,d,e){var f,g=typeof e.condition,h=e.term;if(f=d.filterCellFiltered?a.getCellDisplayValue(b,d):a.getCellValue(b,d),e.condition instanceof RegExp)return e.condition.test(f);if("function"===g)return e.condition(h,f,b,d);if(e.startswithRE)return e.startswithRE.test(f);if(e.endswithRE)return e.endswithRE.test(f);if(e.containsRE)return e.containsRE.test(f);if(e.exactRE)return e.exactRE.test(f);if(e.condition===c.filter.NOT_EQUAL){var i=new RegExp("^"+h+"$");return!i.exec(f)}if("number"==typeof f&&"string"==typeof h){var j=parseFloat(h.replace(/\\\./,".").replace(/\\\-/,"-"));isNaN(j)||(h=j)}return e.flags.date===!0&&(f=new Date(f),h=new Date(h.replace(/\\/g,""))),e.condition===c.filter.GREATER_THAN?f>h:e.condition===c.filter.GREATER_THAN_OR_EQUAL?f>=h:e.condition===c.filter.LESS_THAN?h>f:e.condition===c.filter.LESS_THAN_OR_EQUAL?h>=f:!0},e.searchColumn=function(a,c,d,f){if(a.options.useExternalFiltering)return!0;for(var g=f.length,h=0;g>h;h++){var i=f[h];if(!b.isNullOrUndefined(i.term)&&""!==i.term||i.noTerm){var j=e.runColumnFilter(a,c,d,i);if(!j)return!1}}return!0},e.search=function(a,c,d){if(c){if(!a.options.enableFiltering)return c;for(var f=[],g=d.length,h=function(a){var c=!1;return a.forEach(function(a){(!b.isNullOrUndefined(a.term)&&""!==a.term||a.noTerm)&&(c=!0)}),c},i=0;g>i;i++){var j=d[i];"undefined"!=typeof j.filters&&h(j.filters)&&f.push({col:j,filters:e.setupFilters(j.filters)})}if(f.length>0){for(var k=function(a,b,c,d){b.visible&&!e.searchColumn(a,b,c,d)&&(b.visible=!1)},l=function(a,b){for(var d=c.length,e=0;d>e;e++)k(a,c[e],b.col,b.filters)},m=f.length,n=0;m>n;n++)l(a,f[n]);a.api.core.raise.rowsVisibleChanged&&a.api.core.raise.rowsVisibleChanged()}return c}},e}])}(),function(){var a=angular.module("ui.grid");a.service("rowSorter",["$parse","uiGridConstants",function(a,b){var c="("+b.CURRENCY_SYMBOLS.map(function(a){return"\\"+a}).join("|")+")?",d=(new RegExp("^[-+]?"+c+"[\\d,.]+"+c+"%?$"),{colSortFnCache:{}});return d.guessSortFn=function(a){switch(a){case"number":return d.sortNumber;case"numberStr":return d.sortNumberStr;case"boolean":return d.sortBool;case"string":return d.sortAlpha;case"date":return d.sortDate;case"object":return d.basicSort;default:throw new Error("No sorting function found for type:"+a)}},d.handleNulls=function(a,b){if(!a&&0!==a&&a!==!1||!b&&0!==b&&b!==!1){if(!a&&0!==a&&a!==!1&&!b&&0!==b&&b!==!1)return 0;if(!a&&0!==a&&a!==!1)return 1;if(!b&&0!==b&&b!==!1)return-1}return null},d.basicSort=function(a,b){var c=d.handleNulls(a,b);return null!==c?c:a===b?0:b>a?-1:1;
},d.sortNumber=function(a,b){var c=d.handleNulls(a,b);return null!==c?c:a-b},d.sortNumberStr=function(a,b){var c=d.handleNulls(a,b);if(null!==c)return c;var e,f,g=!1,h=!1;return e=parseFloat(a.replace(/[^0-9.-]/g,"")),isNaN(e)&&(g=!0),f=parseFloat(b.replace(/[^0-9.-]/g,"")),isNaN(f)&&(h=!0),g&&h?0:g?1:h?-1:e-f},d.sortAlpha=function(a,b){var c=d.handleNulls(a,b);if(null!==c)return c;var e=a.toString().toLowerCase(),f=b.toString().toLowerCase();return e===f?0:e.localeCompare(f)},d.sortDate=function(a,b){var c=d.handleNulls(a,b);if(null!==c)return c;a instanceof Date||(a=new Date(a)),b instanceof Date||(b=new Date(b));var e=a.getTime(),f=b.getTime();return e===f?0:f>e?-1:1},d.sortBool=function(a,b){var c=d.handleNulls(a,b);return null!==c?c:a&&b?0:a||b?a?1:-1:0},d.getSortFn=function(a,b,c){var e;return d.colSortFnCache[b.colDef.name]?e=d.colSortFnCache[b.colDef.name]:void 0!==b.sortingAlgorithm?(e=b.sortingAlgorithm,d.colSortFnCache[b.colDef.name]=b.sortingAlgorithm):b.sortCellFiltered&&b.cellFilter?(e=d.sortAlpha,d.colSortFnCache[b.colDef.name]=e):(e=d.guessSortFn(b.colDef.type),e?d.colSortFnCache[b.colDef.name]=e:e=d.sortAlpha),e},d.prioritySort=function(a,b){return void 0!==a.sort.priority&&void 0!==b.sort.priority?a.sort.priority<b.sort.priority?-1:a.sort.priority===b.sort.priority?0:1:void 0!==a.sort.priority?-1:void 0!==b.sort.priority?1:0},d.sort=function(a,c,e){if(c){if(a.options.useExternalSorting)return c;var f=[],g=[];if(e.forEach(function(a){!a.sort||a.sort.ignoreSort||!a.sort.direction||a.sort.direction!==b.ASC&&a.sort.direction!==b.DESC?a.defaultSort&&a.defaultSort.direction&&(a.defaultSort.direction===b.ASC||a.defaultSort.direction===b.DESC)&&g.push({col:a,sort:a.defaultSort}):f.push({col:a,sort:a.sort})}),f=f.sort(d.prioritySort),g=g.sort(d.prioritySort),f=f.concat(g),0===f.length)return c;var h,i,j=function(a,b){a.entity.$$uiGridIndex=b};c.forEach(j);var k=c.slice(0),l=function(c,e){for(var g,j=0,l=0;0===j&&l<f.length;){h=f[l].col,i=f[l].sort.direction,g=d.getSortFn(a,h,k);var m,n;h.sortCellFiltered?(m=a.getCellDisplayValue(c,h),n=a.getCellDisplayValue(e,h)):(m=a.getCellValue(c,h),n=a.getCellValue(e,h)),j=g(m,n,c,e,i,h),l++}return 0===j?c.entity.$$uiGridIndex-e.entity.$$uiGridIndex:i===b.ASC?j:0-j},m=c.sort(l),n=function(a,b){delete a.entity.$$uiGridIndex};return c.forEach(n),m}},d}])}(),function(){function a(a){var b=a;return"undefined"!=typeof b.length&&b.length&&(b=a[0]),b.ownerDocument.defaultView.getComputedStyle(b,null)}function b(a,b,c,d,e){for(var f=c===(d?"border":"content")?4:"width"===b?1:0,g=0,h=["Top","Right","Bottom","Left"];4>f;f+=2){var i=h[f];if("margin"===c){var j=parseFloat(e[c+i]);isNaN(j)||(g+=j)}if(d){if("content"===c){var k=parseFloat(e["padding"+i]);isNaN(k)||(g-=k)}if("margin"!==c){var l=parseFloat(e["border"+i+"Width"]);isNaN(l)||(g-=l)}}else{var m=parseFloat(e["padding"+i]);if(isNaN(m)||(g+=m),"padding"!==c){var n=parseFloat(e["border"+i+"Width"]);isNaN(n)||(g+=n)}}}return g}function c(c,d,e){var f,h=!0,i=a(c),j="border-box"===i.boxSizing;if(0>=f||null==f){if(f=i[d],(0>f||null==f)&&(f=c.style[d]),g.test(f))return f;h=j&&!0,f=parseFloat(f)||0}var k=f+b(c,d,e||(j?"border":"content"),h,i);return k}function d(b){b=angular.element(b)[0];var c=b.parentElement;return c||(c=document.getElementsByTagName("body")[0]),parseInt(a(c).fontSize)||parseInt(a(b).fontSize)||16}var e,f=angular.module("ui.grid");"function"!=typeof Function.prototype.bind&&(e=function(){var a=Array.prototype.slice;return function(b){var c=this,d=a.call(arguments,1);return d.length?function(){return arguments.length?c.apply(b,d.concat(a.call(arguments))):c.apply(b,d)}:function(){return arguments.length?c.apply(b,arguments):c.call(b)}}});var g=new RegExp("^("+/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source+")(?!px)[a-z%]+$","i"),h=/^(block|none|table(?!-c[ea]).+)/,i={position:"absolute",visibility:"hidden",display:"block"},j=["0","0","0","0"],k="uiGrid-";f.service("gridUtil",["$log","$window","$document","$http","$templateCache","$timeout","$interval","$injector","$q","$interpolate","uiGridConstants",function(f,g,l,m,n,o,p,q,r,s,t){function u(a,b){var c=angular.element(this),d=0,e=0,f=0,g=0;if(b.originalEvent&&(b=b.originalEvent),"detail"in b&&(f=-1*b.detail),"wheelDelta"in b&&(f=b.wheelDelta),"wheelDeltaY"in b&&(f=b.wheelDeltaY),"wheelDeltaX"in b&&(e=-1*b.wheelDeltaX),"axis"in b&&b.axis===b.HORIZONTAL_AXIS&&(e=-1*f,f=0),d=0===f?e:f,"deltaY"in b&&(f=-1*b.deltaY,d=f),"deltaX"in b&&(e=b.deltaX,0===f&&(d=-1*e)),0!==f||0!==e){if(1===b.deltaMode){var h=c.data("mousewheel-line-height");d*=h,f*=h,e*=h}else if(2===b.deltaMode){var i=c.data("mousewheel-page-height");d*=i,f*=i,e*=i}g=Math.max(Math.abs(f),Math.abs(e)),(!z||z>g)&&(z=g,w(b,g)&&(z/=40)),d=Math[d>=1?"floor":"ceil"](d/z),e=Math[e>=1?"floor":"ceil"](e/z),f=Math[f>=1?"floor":"ceil"](f/z);var j={originalEvent:b,deltaX:e,deltaY:f,deltaFactor:z,preventDefault:function(){b.preventDefault()},stopPropagation:function(){b.stopPropagation()}};y&&clearTimeout(y),y=setTimeout(v,200),a.call(c[0],j)}}function v(){z=null}function w(a,b){return"mousewheel"===a.type&&b%120===0}var x={augmentWidthOrHeight:b,getStyles:a,createBoundedWrapper:function(a,b){return function(){return b.apply(a,arguments)}},readableColumnName:function(a){return"undefined"==typeof a||void 0===a||null===a?a:("string"!=typeof a&&(a=String(a)),a.replace(/_+/g," ").replace(/^[A-Z]+$/,function(a){return angular.lowercase(angular.uppercase(a.charAt(0))+a.slice(1))}).replace(/([\w\u00C0-\u017F]+)/g,function(a){return angular.uppercase(a.charAt(0))+a.slice(1)}).replace(/(\w+?(?=[A-Z]))/g,"$1 "))},getColumnsFromData:function(a,b){var c=[];if(!a||"undefined"==typeof a[0]||void 0===a[0])return[];angular.isUndefined(b)&&(b=[]);var d=a[0];return angular.forEach(d,function(a,d){-1===b.indexOf(d)&&c.push({name:d})}),c},newId:function(){var a=(new Date).getTime();return function(){return a+=1}}(),getTemplate:function(a){if(n.get(a))return x.postProcessTemplate(n.get(a));if(angular.isFunction(a.then))return a.then(x.postProcessTemplate)["catch"](angular.noop);try{if(angular.element(a).length>0)return r.when(a).then(x.postProcessTemplate)["catch"](angular.noop)}catch(b){}return x.logDebug("fetching url",a),m({method:"GET",url:a}).then(function(b){var c=b.data.trim();return n.put(a,c),c},function(b){throw new Error("Could not get template "+a+": "+b)}).then(x.postProcessTemplate)["catch"](angular.noop)},postProcessTemplate:function(a){var b=s.startSymbol(),c=s.endSymbol();return("{{"!==b||"}}"!==c)&&(a=a.replace(/\{\{/g,b),a=a.replace(/\}\}/g,c)),r.when(a)},guessType:function(a){var b=typeof a;switch(b){case"number":case"boolean":case"string":return b;default:return angular.isDate(a)?"date":"object"}},elementWidth:function(a){},elementHeight:function(a){},getScrollbarWidth:function(){var a=document.createElement("div");a.style.visibility="hidden",a.style.width="100px",a.style.msOverflowStyle="scrollbar",document.body.appendChild(a);var b=a.offsetWidth;a.style.overflow="scroll";var c=document.createElement("div");c.style.width="100%",a.appendChild(c);var d=c.offsetWidth;return a.parentNode.removeChild(a),b-d},swap:function(a,b,c,d){var e,f,g={};for(f in b)g[f]=a.style[f],a.style[f]=b[f];e=c.apply(a,d||[]);for(f in b)a.style[f]=g[f];return e},fakeElement:function(a,b,c,d){var e,f,g=angular.element(a).clone()[0];for(f in b)g.style[f]=b[f];return angular.element(document.body).append(g),e=c.call(g,g),angular.element(g).remove(),e},normalizeWheelEvent:function(a){var b,c,d,e=a||window.event,f=([].slice.call(arguments,1),0),g=0,h=0,i=0,j=0;return e.originalEvent&&(e=e.originalEvent),e.wheelDelta&&(f=e.wheelDelta),e.detail&&(f=-1*e.detail),h=f,void 0!==e.axis&&e.axis===e.HORIZONTAL_AXIS&&(h=0,g=-1*f),e.deltaY&&(h=-1*e.deltaY,f=h),e.deltaX&&(g=e.deltaX,f=-1*g),void 0!==e.wheelDeltaY&&(h=e.wheelDeltaY),void 0!==e.wheelDeltaX&&(g=e.wheelDeltaX),i=Math.abs(f),(!b||b>i)&&(b=i),j=Math.max(Math.abs(h),Math.abs(g)),(!c||c>j)&&(c=j),d=f>0?"floor":"ceil",f=Math[d](f/b),g=Math[d](g/c),h=Math[d](h/c),{delta:f,deltaX:g,deltaY:h}},isTouchEnabled:function(){var a;return("ontouchstart"in g||g.DocumentTouch&&l instanceof DocumentTouch)&&(a=!0),a},isNullOrUndefined:function(a){return void 0===a||null===a},endsWith:function(a,b){return a&&b&&"string"==typeof a?-1!==a.indexOf(b,a.length-b.length):!1},arrayContainsObjectWithProperty:function(a,b,c){var d=!1;return angular.forEach(a,function(a){a[b]===c&&(d=!0)}),d},numericAndNullSort:function(a,b){return null===a?1:null===b?-1:null===a&&null===b?0:a-b},disableAnimations:function(a){var b;try{b=q.get("$animate"),angular.version.major>1||1===angular.version.major&&angular.version.minor>=4?b.enabled(a,!1):b.enabled(!1,a)}catch(c){}},enableAnimations:function(a){var b;try{return b=q.get("$animate"),angular.version.major>1||1===angular.version.major&&angular.version.minor>=4?b.enabled(a,!0):b.enabled(!0,a),b}catch(c){}},nextUid:function(){for(var a,b=j.length;b;){if(b--,a=j[b].charCodeAt(0),57===a)return j[b]="A",k+j.join("");if(90!==a)return j[b]=String.fromCharCode(a+1),k+j.join("");j[b]="0"}return j.unshift("0"),k+j.join("")},hashKey:function(a){var b,c=typeof a;return"object"===c&&null!==a?"function"==typeof(b=a.$$hashKey)?b=a.$$hashKey():"undefined"!=typeof a.$$hashKey&&a.$$hashKey?b=a.$$hashKey:void 0===b&&(b=a.$$hashKey=x.nextUid()):b=a,c+":"+b},resetUids:function(){j=["0","0","0"]},logError:function(a){t.LOG_ERROR_MESSAGES&&f.error(a)},logWarn:function(a){t.LOG_WARN_MESSAGES&&f.warn(a)},logDebug:function(){t.LOG_DEBUG_MESSAGES&&f.debug.apply(f,arguments)}};x.focus={queue:[],byId:function(a,b){this._purgeQueue();var c=o(function(){var c=(b&&b.id?b.id+"-":"")+a,d=g.document.getElementById(c);d?d.focus():x.logWarn("[focus.byId] Element id "+c+" was not found.")},0,!1);return this.queue.push(c),c},byElement:function(a){if(!angular.isElement(a))return x.logWarn("Trying to focus on an element that isn't an element."),r.reject("not-element");a=angular.element(a),this._purgeQueue();var b=o(function(){a&&a[0].focus()},0,!1);return this.queue.push(b),b},bySelector:function(a,b,c){var d=this;if(!angular.isElement(a))throw new Error("The parent element is not an element.");a=angular.element(a);var e=function(){var c=a[0].querySelector(b);return d.byElement(c)};if(this._purgeQueue(),c){var f=o(e,0,!1);return this.queue.push(f),f}return e()},_purgeQueue:function(){this.queue.forEach(function(a){o.cancel(a)}),this.queue=[]}},["width","height"].forEach(function(b){var d=angular.uppercase(b.charAt(0))+b.substr(1);x["element"+d]=function(d,e){var f=d;if(f&&"undefined"!=typeof f.length&&f.length&&(f=d[0]),f&&null!==f){var g=a(f);return 0===f.offsetWidth&&h.test(g.display)?x.swap(f,i,function(){return c(f,b,e)}):c(f,b,e)}return null},x["outerElement"+d]=function(a,b){return a?x["element"+d].call(this,a,b?"margin":"border"):null}}),x.closestElm=function(a,b){"undefined"!=typeof a.length&&a.length&&(a=a[0]);var c;["matches","webkitMatchesSelector","mozMatchesSelector","msMatchesSelector","oMatchesSelector"].some(function(a){return"function"==typeof document.body[a]?(c=a,!0):!1});for(var d;null!==a;){if(d=a.parentElement,null!==d&&d[c](b))return d;a=d}return null},x.type=function(a){var b=Function.prototype.toString.call(a.constructor);return b.match(/function (.*?)\(/)[1]},x.getBorderSize=function(b,c){"undefined"!=typeof b.length&&b.length&&(b=b[0]);var d=a(b);c=c?"border"+c.charAt(0).toUpperCase()+c.slice(1):"border",c+="Width";var e=parseInt(d[c],10);return isNaN(e)?0:e},x.detectBrowser=function(){var a=g.navigator.userAgent,b={chrome:/chrome/i,safari:/safari/i,firefox:/firefox/i,ie:/internet explorer|trident\//i};for(var c in b)if(b[c].test(a))return c;return"unknown"},x.rtlScrollType=function B(){if(B.type)return B.type;var a=angular.element('<div dir="rtl" style="font-size: 14px; width: 1px; height: 1px; position: absolute; top: -1000px; overflow: scroll">A</div>')[0],b="reverse";return document.body.appendChild(a),a.scrollLeft>0?b="default":(a.scrollLeft=1,0===a.scrollLeft&&(b="negative")),angular.element(a).remove(),B.type=b,b},x.normalizeScrollLeft=function(a,b){"undefined"!=typeof a.length&&a.length&&(a=a[0]);var c=a.scrollLeft;if(b.isRTL())switch(x.rtlScrollType()){case"default":return a.scrollWidth-c-a.clientWidth;case"negative":return Math.abs(c);case"reverse":return c}return c},x.denormalizeScrollLeft=function(a,b,c){if("undefined"!=typeof a.length&&a.length&&(a=a[0]),c.isRTL())switch(x.rtlScrollType()){case"default":var d=a.scrollWidth-a.clientWidth;return d-b;case"negative":return-1*b;case"reverse":return b}return b},x.preEval=function(a){var b=t.BRACKET_REGEXP.exec(a);if(b)return(b[1]?x.preEval(b[1]):b[1])+b[2]+(b[3]?x.preEval(b[3]):b[3]);a=a.replace(t.APOS_REGEXP,"\\'");var c=a.split(t.DOT_REGEXP),d=[c.shift()];return angular.forEach(c,function(a){d.push(a.replace(t.FUNC_REGEXP,"']$1"))}),d.join("['")},x.debounce=function(a,b,c){function d(){g=this,f=arguments;var d=function(){e=null,c||(h=a.apply(g,f))},i=c&&!e;return e&&o.cancel(e),e=o(d,b,!1),i&&(h=a.apply(g,f)),h}var e,f,g,h;return d.cancel=function(){o.cancel(e),e=null},d},x.throttle=function(a,b,c){function d(b){g=+new Date,a.apply(e,f),p(function(){h=null},0,1,!1)}c=c||{};var e,f,g=0,h=null;return function(){if(e=this,f=arguments,null===h){var a=+new Date-g;a>b?d():c.trailing&&(h=p(d,b-a,1,!1))}}},x.on={},x.off={},x._events={},x.addOff=function(a){x.off[a]=function(b,c){var d=x._events[a].indexOf(c);d>0&&x._events[a].removeAt(d)}};var y,z,A="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"];return x.on.mousewheel=function(a,b){if(a&&b){var c=angular.element(a);c.data("mousewheel-line-height",d(c)),c.data("mousewheel-page-height",x.elementHeight(c)),c.data("mousewheel-callbacks")||c.data("mousewheel-callbacks",{});var f=c.data("mousewheel-callbacks");f[b]=(Function.prototype.bind||e).call(u,c[0],b);for(var g=A.length;g;)c.on(A[--g],f[b]);c.on("$destroy",function(){for(var a=A.length;a;)c.off(A[--a],f[b])})}},x.off.mousewheel=function(a,b){var c=angular.element(a),d=c.data("mousewheel-callbacks"),e=d[b];if(e)for(var f=A.length;f;)c.off(A[--f],e);delete d[b],0===Object.keys(d).length&&(c.removeData("mousewheel-line-height"),c.removeData("mousewheel-page-height"),c.removeData("mousewheel-callbacks"))},x}]),f.filter("px",function(){return function(a){return a.match(/^[\d\.]+$/)?a+"px":a}})}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("bg",{headerCell:{aria:{defaultFilterLabel:"Филттър за колоната",removeFilter:"Премахни филтър",columnMenuButtonLabel:"Меню на колоната"},priority:"Приоритет:",filterLabel:"Филтър за колоната: "},aggregate:{label:"обекти"},search:{placeholder:"Търсене...",showingItems:"Показани обекти:",selectedItems:"избрани обекти:",totalItems:"Общо:",size:"Размер на страницата:",first:"Първа страница",next:"Следваща страница",previous:"Предишна страница",last:"Последна страница"},menu:{text:"Избери колони:"},sort:{ascending:"Сортиране по възходящ ред",descending:"Сортиране по низходящ ред",none:"Без сортиране",remove:"Премахни сортирането"},column:{hide:"Скрий колоната"},aggregation:{count:"Общо редове: ",sum:"общо: ",avg:"средно: ",min:"най-малко: ",max:"най-много: "},pinning:{pinLeft:"Прикрепи вляво",pinRight:"Прикрепи вдясно",unpin:"Премахване"},columnMenu:{close:"Затвори"},gridMenu:{aria:{buttonLabel:"Меню на таблицата"},columns:"Колони:",importerTitle:"Импортиране на файл",exporterAllAsCsv:"Експортиране на данните като csv",exporterVisibleAsCsv:"Експортиране на видимите данни като csv",exporterSelectedAsCsv:"Експортиране на избраните данни като csv",exporterAllAsPdf:"Експортиране на данните като pdf",exporterVisibleAsPdf:"Експортиране на видимите данни като pdf",exporterSelectedAsPdf:"Експортиране на избраните данни като pdf",clearAllFilters:"Премахни всички филтри"},importer:{noHeaders:"Имената на колоните не успяха да бъдат извлечени, файлът има ли хедър?",noObjects:"Обектите не успяха да бъдат извлечени, файлът съдържа ли данни, различни от хедър?",invalidCsv:"Файлът не може да бъде обработеб, уверете се, че е валиден CSV файл",invalidJson:"Файлът не може да бъде обработеб, уверете се, че е валиден JSON файл",jsonNotArray:"Импортираният JSON файл трябва да съдържа масив, прекратяване."},pagination:{aria:{pageToFirst:"Към първа страница",pageBack:"Страница назад",pageSelected:"Избрана страница",pageForward:"Страница напред",pageToLast:"Към последна страница"},sizes:"обекта на страница",totalItems:"обекта",through:"до",of:"от"},grouping:{group:"Групиране",ungroup:"Премахване на групирането",aggregate_count:"Сбор: Брой",aggregate_sum:"Сбор: Сума",aggregate_max:"Сбор: Максимум",aggregate_min:"Сбор: Минимум",aggregate_avg:"Сбор: Средно",aggregate_remove:"Сбор: Премахване"},validate:{error:"Грешка:",minLength:"Стойността трябва да съдържа поне THRESHOLD символа.",maxLength:"Стойността не трябва да съдържа повече от THRESHOLD символа.",required:"Необходима е стойност."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){var b={aggregate:{label:"položky"},groupPanel:{description:"Přesuňte záhlaví zde pro vytvoření skupiny dle sloupce."},search:{placeholder:"Hledat...",showingItems:"Zobrazuji položky:",selectedItems:"Vybrané položky:",totalItems:"Celkem položek:",size:"Velikost strany:",first:"První strana",next:"Další strana",previous:"Předchozí strana",last:"Poslední strana"},menu:{text:"Vyberte sloupec:"},sort:{ascending:"Seřadit od A-Z",descending:"Seřadit od Z-A",remove:"Odebrat seřazení"},column:{hide:"Schovat sloupec"},aggregation:{count:"celkem řádků: ",sum:"celkem: ",avg:"avg: ",min:"min.: ",max:"max.: "},pinning:{pinLeft:"Zamknout vlevo",pinRight:"Zamknout vpravo",unpin:"Odemknout"},gridMenu:{columns:"Sloupce:",importerTitle:"Importovat soubor",exporterAllAsCsv:"Exportovat všechna data do csv",exporterVisibleAsCsv:"Exportovat viditelná data do csv",exporterSelectedAsCsv:"Exportovat vybraná data do csv",exporterAllAsPdf:"Exportovat všechna data do pdf",exporterVisibleAsPdf:"Exportovat viditelná data do pdf",exporterSelectedAsPdf:"Exportovat vybraná data do pdf",clearAllFilters:"Odstranit všechny filtry"},importer:{noHeaders:"Názvy sloupců se nepodařilo získat, obsahuje soubor záhlaví?",noObjects:"Data se nepodařilo zpracovat, obsahuje soubor řádky mimo záhlaví?",invalidCsv:"Soubor nelze zpracovat, jedná se o CSV?",invalidJson:"Soubor nelze zpracovat, je to JSON?",jsonNotArray:"Soubor musí obsahovat json. Ukončuji.."},pagination:{sizes:"položek na stránku",totalItems:"položek"},grouping:{group:"Seskupit",ungroup:"Odebrat seskupení",aggregate_count:"Agregace: Count",aggregate_sum:"Agregace: Sum",aggregate_max:"Agregace: Max",aggregate_min:"Agregace: Min",aggregate_avg:"Agregace: Avg",aggregate_remove:"Agregace: Odebrat"}};return a.add("cs",b),a.add("cz",b),a.add("cs-cz",b),a.add("cs-CZ",b),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("da",{aggregate:{label:"artikler"},groupPanel:{description:"Grupér rækker udfra en kolonne ved at trække dens overskift hertil."},search:{placeholder:"Søg...",showingItems:"Viste rækker:",selectedItems:"Valgte rækker:",totalItems:"Rækker totalt:",size:"Side størrelse:",first:"Første side",next:"Næste side",previous:"Forrige side",last:"Sidste side"},menu:{text:"Vælg kolonner:"},sort:{ascending:"Sorter stigende",descending:"Sorter faldende",none:"Sorter ingen",remove:"Fjern sortering"},column:{hide:"Skjul kolonne"},aggregation:{count:"antal rækker: ",sum:"sum: ",avg:"gns: ",min:"min: ",max:"max: "},gridMenu:{columns:"Kolonner:",importerTitle:"Importer fil",exporterAllAsCsv:"Eksporter alle data som csv",exporterVisibleAsCsv:"Eksporter synlige data som csv",exporterSelectedAsCsv:"Eksporter markerede data som csv",exporterAllAsPdf:"Eksporter alle data som pdf",exporterVisibleAsPdf:"Eksporter synlige data som pdf",exporterSelectedAsPdf:"Eksporter markerede data som pdf",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."},pagination:{aria:{pageToFirst:"Gå til første",pageBack:"Gå tilbage",pageSelected:"Valgte side",pageForward:"Gå frem",pageToLast:"Gå til sidste"},sizes:"genstande per side",totalItems:"genstande",through:"gennem",of:"af"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("de",{headerCell:{aria:{defaultFilterLabel:"Filter für Spalte",removeFilter:"Filter löschen",columnMenuButtonLabel:"Spaltenmenü"},priority:"Priorität:",filterLabel:"Filter für Spalte: "},aggregate:{label:"Eintrag"},groupPanel:{description:"Ziehen Sie eine Spaltenüberschrift hierhin, um nach dieser Spalte zu gruppieren."},search:{aria:{selected:"Zeile markiert",notSelected:"Zeile nicht markiert"},placeholder:"Suche...",showingItems:"Zeige Einträge:",selectedItems:"Ausgewählte Einträge:",totalItems:"Einträge gesamt:",size:"Einträge pro Seite:",first:"Erste Seite",next:"Nächste Seite",previous:"Vorherige Seite",last:"Letzte Seite"},menu:{text:"Spalten auswählen:"},sort:{ascending:"aufsteigend sortieren",descending:"absteigend sortieren",none:"keine Sortierung",remove:"Sortierung zurücksetzen"},column:{hide:"Spalte ausblenden"},aggregation:{count:"Zeilen insgesamt: ",sum:"gesamt: ",avg:"Durchschnitt: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Links anheften",pinRight:"Rechts anheften",unpin:"Lösen"},columnMenu:{close:"Schließen"},gridMenu:{aria:{buttonLabel:"Tabellenmenü"},columns:"Spalten:",importerTitle:"Datei importieren",exporterAllAsCsv:"Alle Daten als CSV exportieren",exporterVisibleAsCsv:"sichtbare Daten als CSV exportieren",exporterSelectedAsCsv:"markierte Daten als CSV exportieren",exporterAllAsPdf:"Alle Daten als PDF exportieren",exporterVisibleAsPdf:"sichtbare Daten als PDF exportieren",exporterSelectedAsPdf:"markierte Daten als PDF exportieren",clearAllFilters:"Alle Filter zurücksetzen"},importer:{noHeaders:"Es konnten keine Spaltennamen ermittelt werden. Sind in der Datei Spaltendefinitionen enthalten?",noObjects:"Es konnten keine Zeileninformationen gelesen werden, Sind in der Datei außer den Spaltendefinitionen auch Daten enthalten?",invalidCsv:"Die Datei konnte nicht eingelesen werden, ist es eine gültige CSV-Datei?",invalidJson:"Die Datei konnte nicht eingelesen werden. Enthält sie gültiges JSON?",jsonNotArray:"Die importierte JSON-Datei muß ein Array enthalten. Breche Import ab."},pagination:{aria:{pageToFirst:"Zum Anfang",pageBack:"Seite zurück",pageSelected:"Ausgwählte Seite",pageForward:"Seite vor",pageToLast:"Zum Ende"},sizes:"Einträge pro Seite",totalItems:"Einträgen",through:"bis",of:"von"},grouping:{group:"Gruppieren",ungroup:"Gruppierung aufheben",aggregate_count:"Agg: Anzahl",aggregate_sum:"Agg: Summe",aggregate_max:"Agg: Maximum",aggregate_min:"Agg: Minimum",aggregate_avg:"Agg: Mittelwert",aggregate_remove:"Aggregation entfernen"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("en",{headerCell:{aria:{defaultFilterLabel:"Filter for column",removeFilter:"Remove Filter",columnMenuButtonLabel:"Column Menu"},priority:"Priority:",filterLabel:"Filter for column: "},aggregate:{label:"items"},groupPanel:{description:"Drag a column header here and drop it to group by that column."},search:{aria:{selected:"Row selected",notSelected:"Row not selected"},placeholder:"Search...",showingItems:"Showing Items:",selectedItems:"Selected Items:",totalItems:"Total Items:",size:"Page Size:",first:"First Page",next:"Next Page",previous:"Previous Page",last:"Last Page"},menu:{text:"Choose Columns:"},sort:{ascending:"Sort Ascending",descending:"Sort Descending",none:"Sort None",remove:"Remove Sort"},column:{hide:"Hide Column"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Pin Left",pinRight:"Pin Right",unpin:"Unpin"},columnMenu:{close:"Close"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Columns:",importerTitle:"Import file",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."},pagination:{aria:{pageToFirst:"Page to first",pageBack:"Page back",pageSelected:"Selected page",pageForward:"Page forward",pageToLast:"Page to last"},sizes:"items per page",totalItems:"items",through:"through",of:"of"},grouping:{group:"Group",ungroup:"Ungroup",aggregate_count:"Agg: Count",aggregate_sum:"Agg: Sum",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Avg",aggregate_remove:"Agg: Remove"},validate:{error:"Error:",minLength:"Value should be at least THRESHOLD characters long.",maxLength:"Value should be at most THRESHOLD characters long.",required:"A value is needed."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("es",{aggregate:{label:"Artículos"},groupPanel:{description:"Arrastre un encabezado de columna aquí y suéltelo para agrupar por esa columna."},search:{placeholder:"Buscar...",showingItems:"Artículos Mostrados:",selectedItems:"Artículos Seleccionados:",totalItems:"Artículos Totales:",size:"Tamaño de Página:",first:"Primera Página",next:"Página Siguiente",previous:"Página Anterior",last:"Última Página"},menu:{text:"Elegir columnas:"},sort:{ascending:"Orden Ascendente",descending:"Orden Descendente",remove:"Sin Ordenar"},column:{hide:"Ocultar la columna"},aggregation:{count:"filas totales: ",sum:"total: ",avg:"media: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fijar a la Izquierda",pinRight:"Fijar a la Derecha",unpin:"Quitar Fijación"},gridMenu:{columns:"Columnas:",importerTitle:"Importar archivo",exporterAllAsCsv:"Exportar todo como csv",exporterVisibleAsCsv:"Exportar vista como csv",exporterSelectedAsCsv:"Exportar selección como csv",exporterAllAsPdf:"Exportar todo como pdf",exporterVisibleAsPdf:"Exportar vista como pdf",exporterSelectedAsPdf:"Exportar selección como pdf",clearAllFilters:"Limpiar todos los filtros"},importer:{noHeaders:"No fue posible derivar los nombres de las columnas, ¿tiene encabezados el archivo?",noObjects:"No fue posible obtener registros, ¿contiene datos el archivo, aparte de los encabezados?",invalidCsv:"No fue posible procesar el archivo, ¿es un CSV válido?",invalidJson:"No fue posible procesar el archivo, ¿es un Json válido?",jsonNotArray:"El archivo json importado debe contener un array, abortando."},pagination:{sizes:"registros por página",totalItems:"registros",of:"de"},grouping:{group:"Agrupar",ungroup:"Desagrupar",aggregate_count:"Agr: Cont",aggregate_sum:"Agr: Sum",aggregate_max:"Agr: Máx",aggregate_min:"Agr: Min",aggregate_avg:"Agr: Prom",aggregate_remove:"Agr: Quitar"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("fa",{aggregate:{label:"قلم"},groupPanel:{description:"عنوان یک ستون را بگیر و به گروهی از آن ستون رها کن."},search:{placeholder:"جستجو...",showingItems:"نمایش اقلام:",selectedItems:"قلم‌های انتخاب شده:",totalItems:"مجموع اقلام:",size:"اندازه‌ی صفحه:",first:"اولین صفحه",next:"صفحه‌ی‌بعدی",previous:"صفحه‌ی‌ قبلی",last:"آخرین صفحه"},menu:{text:"ستون‌های انتخابی:"},sort:{ascending:"ترتیب صعودی",descending:"ترتیب نزولی",remove:"حذف مرتب کردن"},column:{hide:"پنهان‌کردن ستون"},aggregation:{count:"تعداد: ",sum:"مجموع: ",avg:"میانگین: ",min:"کمترین: ",max:"بیشترین: "},pinning:{pinLeft:"پین کردن سمت چپ",pinRight:"پین کردن سمت راست",unpin:"حذف پین"},gridMenu:{columns:"ستون‌ها:",importerTitle:"وارد کردن فایل",exporterAllAsCsv:"خروجی تمام داده‌ها در فایل csv",exporterVisibleAsCsv:"خروجی داده‌های قابل مشاهده در فایل csv",exporterSelectedAsCsv:"خروجی داده‌های انتخاب‌شده در فایل csv",exporterAllAsPdf:"خروجی تمام داده‌ها در فایل pdf",exporterVisibleAsPdf:"خروجی داده‌های قابل مشاهده در فایل pdf",exporterSelectedAsPdf:"خروجی داده‌های انتخاب‌شده در فایل pdf",clearAllFilters:"پاک کردن تمام فیلتر"},importer:{noHeaders:"نام ستون قابل استخراج نیست. آیا فایل عنوان دارد؟",noObjects:"اشیا قابل استخراج نیستند. آیا به جز عنوان‌ها در فایل داده وجود دارد؟",invalidCsv:"فایل قابل پردازش نیست. آیا فرمت  csv  معتبر است؟",invalidJson:"فایل قابل پردازش نیست. آیا فرمت json   معتبر است؟",jsonNotArray:"فایل json وارد شده باید حاوی آرایه باشد. عملیات ساقط شد."},pagination:{sizes:"اقلام در هر صفحه",totalItems:"اقلام",of:"از"},grouping:{group:"گروه‌بندی",ungroup:"حذف گروه‌بندی",aggregate_count:"Agg: تعداد",aggregate_sum:"Agg: جمع",aggregate_max:"Agg: بیشینه",aggregate_min:"Agg: کمینه",aggregate_avg:"Agg: میانگین",aggregate_remove:"Agg: حذف"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("fi",{aggregate:{label:"rivit"},groupPanel:{description:"Raahaa ja pudota otsikko tähän ryhmittääksesi sarakkeen mukaan."},search:{placeholder:"Hae...",showingItems:"Näytetään rivejä:",selectedItems:"Valitut rivit:",totalItems:"Rivejä yht.:",size:"Näytä:",first:"Ensimmäinen sivu",next:"Seuraava sivu",previous:"Edellinen sivu",last:"Viimeinen sivu"},menu:{text:"Valitse sarakkeet:"},sort:{ascending:"Järjestä nouseva",descending:"Järjestä laskeva",remove:"Poista järjestys"},column:{hide:"Piilota sarake"},aggregation:{count:"Rivejä yht.: ",sum:"Summa: ",avg:"K.a.: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Lukitse vasemmalle",pinRight:"Lukitse oikealle",unpin:"Poista lukitus"},gridMenu:{columns:"Sarakkeet:",importerTitle:"Tuo tiedosto",exporterAllAsCsv:"Vie tiedot csv-muodossa",exporterVisibleAsCsv:"Vie näkyvä tieto csv-muodossa",exporterSelectedAsCsv:"Vie valittu tieto csv-muodossa",exporterAllAsPdf:"Vie tiedot pdf-muodossa",exporterVisibleAsPdf:"Vie näkyvä tieto pdf-muodossa",exporterSelectedAsPdf:"Vie valittu tieto pdf-muodossa",clearAllFilters:"Puhdista kaikki suodattimet"},importer:{noHeaders:"Sarakkeen nimiä ei voitu päätellä, onko tiedostossa otsikkoriviä?",noObjects:"Tietoja ei voitu lukea, onko tiedostossa muuta kuin otsikkot?",invalidCsv:"Tiedostoa ei voitu käsitellä, oliko se CSV-muodossa?",invalidJson:"Tiedostoa ei voitu käsitellä, oliko se JSON-muodossa?",jsonNotArray:"Tiedosto ei sisältänyt taulukkoa, lopetetaan."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("fr",{headerCell:{aria:{defaultFilterLabel:"Filtre de la colonne",removeFilter:"Supprimer le filtre",columnMenuButtonLabel:"Menu de la colonne"},priority:"Priorité:",filterLabel:"Filtre de la colonne: "},aggregate:{label:"éléments"},groupPanel:{description:"Faites glisser une en-tête de colonne ici pour créer un groupe de colonnes."},search:{placeholder:"Recherche...",showingItems:"Affichage des éléments :",selectedItems:"Éléments sélectionnés :",totalItems:"Nombre total d'éléments:",size:"Taille de page:",first:"Première page",next:"Page Suivante",previous:"Page précédente",
last:"Dernière page"},menu:{text:"Choisir des colonnes :"},sort:{ascending:"Trier par ordre croissant",descending:"Trier par ordre décroissant",none:"Aucun tri",remove:"Enlever le tri"},column:{hide:"Cacher la colonne"},aggregation:{count:"lignes totales: ",sum:"total: ",avg:"moy: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Épingler à gauche",pinRight:"Épingler à droite",unpin:"Détacher"},columnMenu:{close:"Fermer"},gridMenu:{aria:{buttonLabel:"Menu du tableau"},columns:"Colonnes:",importerTitle:"Importer un fichier",exporterAllAsCsv:"Exporter toutes les données en CSV",exporterVisibleAsCsv:"Exporter les données visibles en CSV",exporterSelectedAsCsv:"Exporter les données sélectionnées en CSV",exporterAllAsPdf:"Exporter toutes les données en PDF",exporterVisibleAsPdf:"Exporter les données visibles en PDF",exporterSelectedAsPdf:"Exporter les données sélectionnées en PDF",clearAllFilters:"Nettoyez tous les filtres"},importer:{noHeaders:"Impossible de déterminer le nom des colonnes, le fichier possède-t-il une en-tête ?",noObjects:"Aucun objet trouvé, le fichier possède-t-il des données autres que l'en-tête ?",invalidCsv:"Le fichier n'a pas pu être traité, le CSV est-il valide ?",invalidJson:"Le fichier n'a pas pu être traité, le JSON est-il valide ?",jsonNotArray:"Le fichier JSON importé doit contenir un tableau, abandon."},pagination:{aria:{pageToFirst:"Aller à la première page",pageBack:"Page précédente",pageSelected:"Page sélectionnée",pageForward:"Page suivante",pageToLast:"Aller à la dernière page"},sizes:"éléments par page",totalItems:"éléments",through:"à",of:"sur"},grouping:{group:"Grouper",ungroup:"Dégrouper",aggregate_count:"Agg: Compter",aggregate_sum:"Agg: Somme",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Moy",aggregate_remove:"Agg: Retirer"},validate:{error:"Erreur:",minLength:"La valeur doit être supérieure ou égale à THRESHOLD caractères.",maxLength:"La valeur doit être inférieure ou égale à THRESHOLD caractères.",required:"Une valeur est nécéssaire."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("he",{aggregate:{label:"items"},groupPanel:{description:"גרור עמודה לכאן ושחרר בכדי לקבץ עמודה זו."},search:{placeholder:"חפש...",showingItems:"מציג:",selectedItems:'סה"כ נבחרו:',totalItems:'סה"כ רשומות:',size:"תוצאות בדף:",first:"דף ראשון",next:"דף הבא",previous:"דף קודם",last:"דף אחרון"},menu:{text:"בחר עמודות:"},sort:{ascending:"סדר עולה",descending:"סדר יורד",remove:"בטל"},column:{hide:"טור הסתר"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",importerTitle:"Import file",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf",clearAllFilters:"Clean all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("hy",{aggregate:{label:"տվյալներ"},groupPanel:{description:"Ըստ սյան խմբավորելու համար քաշեք և գցեք վերնագիրն այստեղ։"},search:{placeholder:"Փնտրում...",showingItems:"Ցուցադրված տվյալներ՝",selectedItems:"Ընտրված:",totalItems:"Ընդամենը՝",size:"Տողերի քանակը էջում՝",first:"Առաջին էջ",next:"Հաջորդ էջ",previous:"Նախորդ էջ",last:"Վերջին էջ"},menu:{text:"Ընտրել սյուները:"},sort:{ascending:"Աճման կարգով",descending:"Նվազման կարգով",remove:"Հանել "},column:{hide:"Թաքցնել սյունը"},aggregation:{count:"ընդամենը տող՝ ",sum:"ընդամենը՝ ",avg:"միջին՝ ",min:"մին՝ ",max:"մաքս՝ "},pinning:{pinLeft:"Կպցնել ձախ կողմում",pinRight:"Կպցնել աջ կողմում",unpin:"Արձակել"},gridMenu:{columns:"Սյուներ:",importerTitle:"Ներմուծել ֆայլ",exporterAllAsCsv:"Արտահանել ամբողջը CSV",exporterVisibleAsCsv:"Արտահանել երևացող տվյալները CSV",exporterSelectedAsCsv:"Արտահանել ընտրված տվյալները CSV",exporterAllAsPdf:"Արտահանել PDF",exporterVisibleAsPdf:"Արտահանել երևացող տվյալները PDF",exporterSelectedAsPdf:"Արտահանել ընտրված տվյալները PDF",clearAllFilters:"Մաքրել բոլոր ֆիլտրերը"},importer:{noHeaders:"Հնարավոր չեղավ որոշել սյան վերնագրերը։ Արդյո՞ք ֆայլը ունի վերնագրեր։",noObjects:"Հնարավոր չեղավ կարդալ տվյալները։ Արդյո՞ք ֆայլում կան տվյալներ։",invalidCsv:"Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր CSV է։",invalidJson:"Հնարավոր չեղավ մշակել ֆայլը։ Արդյո՞ք այն վավեր Json է։",jsonNotArray:"Ներմուծված json ֆայլը պետք է պարունակի զանգված, կասեցվում է։"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("is",{headerCell:{aria:{defaultFilterLabel:"Sía fyrir dálk",removeFilter:"Fjarlægja síu",columnMenuButtonLabel:"Dálkavalmynd"},priority:"Forgangsröðun:",filterLabel:"Sía fyrir dálka: "},aggregate:{label:"hlutir"},groupPanel:{description:"Dragðu dálkhaus hingað til að flokka saman eftir þeim dálki."},search:{placeholder:"Leita...",showingItems:"Sýni hluti:",selectedItems:"Valdir hlutir:",totalItems:"Hlutir alls:",size:"Stærð síðu:",first:"Fyrsta síða",next:"Næsta síða",previous:"Fyrri síða",last:"Síðasta síða"},menu:{text:"Veldu dálka:"},sort:{ascending:"Raða hækkandi",descending:"Raða lækkandi",none:"Engin röðun",remove:"Fjarlægja röðun"},column:{hide:"Fela dálk"},aggregation:{count:"fjöldi raða: ",sum:"summa: ",avg:"meðaltal: ",min:"lágmark: ",max:"hámark: "},pinning:{pinLeft:"Festa til vinstri",pinRight:"Festa til hægri",unpin:"Losa"},columnMenu:{close:"Loka"},gridMenu:{aria:{buttonLabel:"Töflu valmynd"},columns:"Dálkar:",importerTitle:"Flytja inn skjal",exporterAllAsCsv:"Flytja út gögn sem csv",exporterVisibleAsCsv:"Flytja út sýnileg gögn sem csv",exporterSelectedAsCsv:"Flytja út valin gögn sem csv",exporterAllAsPdf:"Flytja út öll gögn sem pdf",exporterVisibleAsPdf:"Flytja út sýnileg gögn sem pdf",exporterSelectedAsPdf:"Flytja út valin gögn sem pdf",clearAllFilters:"Hreinsa allar síur"},importer:{noHeaders:"Ekki hægt að vinna dálkanöfn úr skjalinu, er skjalið örugglega með haus?",noObjects:"Ekki hægt að vinna hluti úr skjalinu, voru örugglega gögn í skjalinu önnur en hausinn?",invalidCsv:"Tókst ekki að vinna skjal, er það örggulega gilt CSV?",invalidJson:"Tókst ekki að vinna skjal, er það örugglega gilt Json?",jsonNotArray:"Innflutt json skjal verður að innihalda fylki, hætti við."},pagination:{aria:{pageToFirst:"Fletta að fyrstu",pageBack:"Fletta til baka",pageSelected:"Valin síða",pageForward:"Fletta áfram",pageToLast:"Fletta að síðustu"},sizes:"hlutir á síðu",totalItems:"hlutir",through:"gegnum",of:"af"},grouping:{group:"Flokka",ungroup:"Sundurliða",aggregate_count:"Fjöldi: ",aggregate_sum:"Summa: ",aggregate_max:"Hámark: ",aggregate_min:"Lágmark: ",aggregate_avg:"Meðaltal: ",aggregate_remove:"Fjarlægja: "},validate:{error:"Villa:",minLength:"Gildi ætti að vera a.m.k. THRESHOLD stafa langt.",maxLength:"Gildi ætti að vera í mesta lagi THRESHOLD stafa langt.",required:"Þarf að hafa gildi."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("it",{aggregate:{label:"elementi"},groupPanel:{description:"Trascina un'intestazione all'interno del gruppo della colonna."},search:{placeholder:"Ricerca...",showingItems:"Mostra:",selectedItems:"Selezionati:",totalItems:"Totali:",size:"Tot Pagine:",first:"Prima",next:"Prossima",previous:"Precedente",last:"Ultima"},menu:{text:"Scegli le colonne:"},sort:{ascending:"Asc.",descending:"Desc.",remove:"Annulla ordinamento"},column:{hide:"Nascondi"},aggregation:{count:"righe totali: ",sum:"tot: ",avg:"media: ",min:"minimo: ",max:"massimo: "},pinning:{pinLeft:"Blocca a sx",pinRight:"Blocca a dx",unpin:"Blocca in alto"},gridMenu:{columns:"Colonne:",importerTitle:"Importa",exporterAllAsCsv:"Esporta tutti i dati in CSV",exporterVisibleAsCsv:"Esporta i dati visibili in CSV",exporterSelectedAsCsv:"Esporta i dati selezionati in CSV",exporterAllAsPdf:"Esporta tutti i dati in PDF",exporterVisibleAsPdf:"Esporta i dati visibili in PDF",exporterSelectedAsPdf:"Esporta i dati selezionati in PDF",clearAllFilters:"Pulire tutti i filtri"},importer:{noHeaders:"Impossibile reperire i nomi delle colonne, sicuro che siano indicati all'interno del file?",noObjects:"Impossibile reperire gli oggetti, sicuro che siano indicati all'interno del file?",invalidCsv:"Impossibile elaborare il file, sicuro che sia un CSV?",invalidJson:"Impossibile elaborare il file, sicuro che sia un JSON valido?",jsonNotArray:"Errore! Il file JSON da importare deve contenere un array."},pagination:{aria:{pageToFirst:"Prima",pageBack:"Indietro",pageSelected:"Pagina selezionata",pageForward:"Avanti",pageToLast:"Ultima"},sizes:"elementi per pagina",totalItems:"elementi",through:"a",of:"di"},grouping:{group:"Raggruppa",ungroup:"Separa",aggregate_count:"Agg: N. Elem.",aggregate_sum:"Agg: Somma",aggregate_max:"Agg: Massimo",aggregate_min:"Agg: Minimo",aggregate_avg:"Agg: Media",aggregate_remove:"Agg: Rimuovi"},validate:{error:"Errore:",minLength:"Lunghezza minima pari a THRESHOLD caratteri.",maxLength:"Lunghezza massima pari a THRESHOLD caratteri.",required:"Necessario inserire un valore."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("ja",{headerCell:{aria:{defaultFilterLabel:"列のフィルター",removeFilter:"フィルターの解除",columnMenuButtonLabel:"列のメニュー"},priority:"優先度:",filterLabel:"列フィルター: "},aggregate:{label:"項目"},groupPanel:{description:"ここに列ヘッダをドラッグアンドドロップして、その列でグループ化します。"},search:{placeholder:"検索...",showingItems:"表示中の項目:",selectedItems:"選択した項目:",totalItems:"項目の総数:",size:"ページサイズ:",first:"最初のページ",next:"次のページ",previous:"前のページ",last:"前のページ"},menu:{text:"列の選択:"},sort:{ascending:"昇順に並べ替え",descending:"降順に並べ替え",none:"並べ替え無し",remove:"並べ替えの解除"},column:{hide:"列の非表示"},aggregation:{count:"行数: ",sum:"合計: ",avg:"平均: ",min:"最小: ",max:"最大: "},pinning:{pinLeft:"左に固定",pinRight:"右に固定",unpin:"固定解除"},columnMenu:{close:"閉じる"},gridMenu:{aria:{buttonLabel:"グリッドメニュー"},columns:"列の表示/非表示:",importerTitle:"ファイルのインポート",exporterAllAsCsv:"すべてのデータをCSV形式でエクスポート",exporterVisibleAsCsv:"表示中のデータをCSV形式でエクスポート",exporterSelectedAsCsv:"選択したデータをCSV形式でエクスポート",exporterAllAsPdf:"すべてのデータをPDF形式でエクスポート",exporterVisibleAsPdf:"表示中のデータをPDF形式でエクスポート",exporterSelectedAsPdf:"選択したデータをPDF形式でエクスポート",clearAllFilters:"すべてのフィルタをクリア"},importer:{noHeaders:"列名を取得できません。ファイルにヘッダが含まれていることを確認してください。",noObjects:"オブジェクトを取得できません。ファイルにヘッダ以外のデータが含まれていることを確認してください。",invalidCsv:"ファイルを処理できません。ファイルが有効なCSV形式であることを確認してください。",invalidJson:"ファイルを処理できません。ファイルが有効なJSON形式であることを確認してください。",jsonNotArray:"インポートしたJSONファイルには配列が含まれている必要があります。処理を中止します。"},pagination:{aria:{pageToFirst:"最初のページ",pageBack:"前のページ",pageSelected:"現在のページ",pageForward:"次のページ",pageToLast:"最後のページ"},sizes:"項目/ページ",totalItems:"項目",through:"から",of:"項目/全"},grouping:{group:"グループ化",ungroup:"グループ化の解除",aggregate_count:"集計表示: 行数",aggregate_sum:"集計表示: 合計",aggregate_max:"集計表示: 最大",aggregate_min:"集計表示: 最小",aggregate_avg:"集計表示: 平均",aggregate_remove:"集計表示: 解除"},validate:{error:"Error:",minLength:"THRESHOLD 文字以上で入力してください。",maxLength:"THRESHOLD 文字以下で入力してください。",required:"値が必要です。"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("ko",{aggregate:{label:"아이템"},groupPanel:{description:"컬럼으로 그룹핑하기 위해서는 컬럼 헤더를 끌어 떨어뜨려 주세요."},search:{placeholder:"검색...",showingItems:"항목 보여주기:",selectedItems:"선택 항목:",totalItems:"전체 항목:",size:"페이지 크기:",first:"첫번째 페이지",next:"다음 페이지",previous:"이전 페이지",last:"마지막 페이지"},menu:{text:"컬럼을 선택하세요:"},sort:{ascending:"오름차순 정렬",descending:"내림차순 정렬",remove:"소팅 제거"},column:{hide:"컬럼 제거"},aggregation:{count:"전체 갯수: ",sum:"전체: ",avg:"평균: ",min:"최소: ",max:"최대: "},pinning:{pinLeft:"왼쪽 핀",pinRight:"오른쪽 핀",unpin:"핀 제거"},gridMenu:{columns:"컬럼:",importerTitle:"파일 가져오기",exporterAllAsCsv:"csv로 모든 데이터 내보내기",exporterVisibleAsCsv:"csv로 보이는 데이터 내보내기",exporterSelectedAsCsv:"csv로 선택된 데이터 내보내기",exporterAllAsPdf:"pdf로 모든 데이터 내보내기",exporterVisibleAsPdf:"pdf로 보이는 데이터 내보내기",exporterSelectedAsPdf:"pdf로 선택 데이터 내보내기",clearAllFilters:"모든 필터를 청소"},importer:{noHeaders:"컬럼명이 지정되어 있지 않습니다. 파일에 헤더가 명시되어 있는지 확인해 주세요.",noObjects:"데이터가 지정되어 있지 않습니다. 데이터가 파일에 있는지 확인해 주세요.",invalidCsv:"파일을 처리할 수 없습니다. 올바른 csv인지 확인해 주세요.",invalidJson:"파일을 처리할 수 없습니다. 올바른 json인지 확인해 주세요.",jsonNotArray:"json 파일은 배열을 포함해야 합니다."},pagination:{sizes:"페이지당 항목",totalItems:"전체 항목"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("nl",{aggregate:{label:"items"},groupPanel:{description:"Sleep hier een kolomnaam heen om op te groeperen."},search:{placeholder:"Zoeken...",showingItems:"Getoonde items:",selectedItems:"Geselecteerde items:",totalItems:"Totaal aantal items:",size:"Items per pagina:",first:"Eerste pagina",next:"Volgende pagina",previous:"Vorige pagina",last:"Laatste pagina"},menu:{text:"Kies kolommen:"},sort:{ascending:"Sorteer oplopend",descending:"Sorteer aflopend",remove:"Verwijder sortering"},column:{hide:"Verberg kolom"},aggregation:{count:"Aantal rijen: ",sum:"Som: ",avg:"Gemiddelde: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Zet links vast",pinRight:"Zet rechts vast",unpin:"Maak los"},gridMenu:{columns:"Kolommen:",importerTitle:"Importeer bestand",exporterAllAsCsv:"Exporteer alle data als csv",exporterVisibleAsCsv:"Exporteer zichtbare data als csv",exporterSelectedAsCsv:"Exporteer geselecteerde data als csv",exporterAllAsPdf:"Exporteer alle data als pdf",exporterVisibleAsPdf:"Exporteer zichtbare data als pdf",exporterSelectedAsPdf:"Exporteer geselecteerde data als pdf",clearAllFilters:"Reinig alle filters"},importer:{noHeaders:"Kolomnamen kunnen niet worden afgeleid. Heeft het bestand een header?",noObjects:"Objecten kunnen niet worden afgeleid. Bevat het bestand data naast de headers?",invalidCsv:"Het bestand kan niet verwerkt worden. Is het een valide csv bestand?",invalidJson:"Het bestand kan niet verwerkt worden. Is het valide json?",jsonNotArray:"Het json bestand moet een array bevatten. De actie wordt geannuleerd."},pagination:{sizes:"items per pagina",totalItems:"items",of:"van de"},grouping:{group:"Groepeer",ungroup:"Groepering opheffen",aggregate_count:"Agg: Aantal",aggregate_sum:"Agg: Som",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Gem",aggregate_remove:"Agg: Verwijder"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("no",{headerCell:{aria:{defaultFilterLabel:"Filter for kolonne",removeFilter:"Fjern filter",columnMenuButtonLabel:"Kolonnemeny"},priority:"Prioritet:",filterLabel:"Filter for kolonne: "},aggregate:{label:"elementer"},groupPanel:{description:"Trekk en kolonneoverskrift hit og slipp den for å gruppere etter den kolonnen."},search:{placeholder:"Søk...",showingItems:"Viste elementer:",selectedItems:"Valgte elementer:",totalItems:"Antall elementer:",size:"Sidestørrelse:",first:"Første side",next:"Neste side",previous:"Forrige side",last:"Siste side"},menu:{text:"Velg kolonner:"},sort:{ascending:"Sortere stigende",descending:"Sortere fallende",none:"Ingen sortering",remove:"Fjern sortering"},column:{hide:"Skjul kolonne"},aggregation:{count:"antall rader: ",sum:"total: ",avg:"gjennomsnitt: ",min:"minimum: ",max:"maksimum: "},pinning:{pinLeft:"Fest til venstre",pinRight:"Fest til høyre",unpin:"Løsne"},columnMenu:{close:"Lukk"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Kolonner:",importerTitle:"Importer fil",exporterAllAsCsv:"Eksporter alle data som csv",exporterVisibleAsCsv:"Eksporter synlige data som csv",exporterSelectedAsCsv:"Eksporter utvalgte data som csv",exporterAllAsPdf:"Eksporter alle data som pdf",exporterVisibleAsPdf:"Eksporter synlige data som pdf",exporterSelectedAsPdf:"Eksporter utvalgte data som pdf",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Kolonnenavn kunne ikke avledes. Har filen en overskrift?",noObjects:"Objekter kunne ikke avledes. Er der andre data i filen enn overskriften?",invalidCsv:"Filen kunne ikke behandles. Er den gyldig CSV?",invalidJson:"Filen kunne ikke behandles. Er den gyldig JSON?",jsonNotArray:"Importert JSON-fil må inneholde en liste. Avbryter."},pagination:{aria:{pageToFirst:"Gå til første side",pageBack:"Gå til forrige side",pageSelected:"Valgte side",pageForward:"Gå til neste side",pageToLast:"Gå til siste side"},sizes:"elementer per side",totalItems:"elementer",through:"til",of:"av"},grouping:{group:"Gruppere",ungroup:"Fjerne gruppering",aggregate_count:"Agr: Antall",aggregate_sum:"Agr: Sum",aggregate_max:"Agr: Maksimum",aggregate_min:"Agr: Minimum",aggregate_avg:"Agr: Gjennomsnitt",aggregate_remove:"Agr: Fjern"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("pl",{headerCell:{aria:{defaultFilterLabel:"Filtr dla kolumny",removeFilter:"Usuń filtr",columnMenuButtonLabel:"Menu kolumny"},priority:"Prioritet:",filterLabel:"Filtr dla kolumny: "},aggregate:{label:"pozycji"},groupPanel:{description:"Przeciągnij nagłówek kolumny tutaj, aby pogrupować według niej."},search:{aria:{selected:"Wiersz zaznaczony",notSelected:"Wiersz niezaznaczony"},placeholder:"Szukaj...",showingItems:"Widoczne pozycje:",selectedItems:"Zaznaczone pozycje:",totalItems:"Wszystkich pozycji:",size:"Rozmiar strony:",first:"Pierwsza strona",next:"Następna strona",previous:"Poprzednia strona",last:"Ostatnia strona"},menu:{text:"Wybierz kolumny:"},sort:{ascending:"Sortuj rosnąco",descending:"Sortuj malejąco",none:"Brak sortowania",remove:"Wyłącz sortowanie"},column:{hide:"Ukryj kolumnę"},aggregation:{count:"Razem pozycji: ",sum:"Razem: ",avg:"Średnia: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Przypnij do lewej",pinRight:"Przypnij do prawej",unpin:"Odepnij"},columnMenu:{close:"Zamknij"},gridMenu:{aria:{buttonLabel:"Opcje tabeli"},columns:"Kolumny:",importerTitle:"Importuj plik",exporterAllAsCsv:"Eksportuj wszystkie dane do csv",exporterVisibleAsCsv:"Eksportuj widoczne dane do csv",exporterSelectedAsCsv:"Eksportuj zaznaczone dane do csv",exporterAllAsPdf:"Eksportuj wszystkie dane do pdf",exporterVisibleAsPdf:"Eksportuj widoczne dane do pdf",exporterSelectedAsPdf:"Eksportuj zaznaczone dane do pdf",clearAllFilters:"Wyczyść filtry"},importer:{noHeaders:"Nie udało się wczytać nazw kolumn. Czy plik posiada nagłówek?",noObjects:"Nie udalo się wczytać pozycji. Czy plik zawiera dane??",invalidCsv:"Nie udało się przetworzyć pliku, jest to prawidlowy plik CSV??",invalidJson:"Nie udało się przetworzyć pliku, jest to prawidlowy plik Json?",jsonNotArray:"Importowany plik json musi zawierać tablicę, importowanie przerwane."},pagination:{aria:{pageToFirst:"Pierwsza strona",pageBack:"Poprzednia strona",pageSelected:"Wybrana strona",pageForward:"Następna strona",pageToLast:"Ostatnia strona"},sizes:"pozycji na stronę",totalItems:"pozycji",through:"do",of:"z"},grouping:{group:"Grupuj",ungroup:"Rozgrupuj",aggregate_count:"Zbiorczo: Razem",aggregate_sum:"Zbiorczo: Suma",aggregate_max:"Zbiorczo: Max",aggregate_min:"Zbiorczo: Min",aggregate_avg:"Zbiorczo: Średnia",aggregate_remove:"Zbiorczo: Usuń"},validate:{error:"Błąd:",minLength:"Wartość powinna składać się z co najmniej THRESHOLD znaków.",maxLength:"Wartość powinna składać się z przynajmniej THRESHOLD znaków.",required:"Wartość jest wymagana."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("pt-br",{headerCell:{aria:{defaultFilterLabel:"Filtro por coluna",removeFilter:"Remover filtro",columnMenuButtonLabel:"Menu coluna"},priority:"Prioridade:",filterLabel:"Filtro por coluna: "},aggregate:{label:"itens"},groupPanel:{description:"Arraste e solte uma coluna aqui para agrupar por essa coluna"},search:{placeholder:"Procurar...",showingItems:"Mostrando os Itens:",selectedItems:"Items Selecionados:",totalItems:"Total de Itens:",size:"Tamanho da Página:",first:"Primeira Página",next:"Próxima Página",previous:"Página Anterior",last:"Última Página"},menu:{text:"Selecione as colunas:"},sort:{ascending:"Ordenar Ascendente",descending:"Ordenar Descendente",none:"Nenhuma Ordem",remove:"Remover Ordenação"},column:{hide:"Esconder coluna"},aggregation:{count:"total de linhas: ",sum:"total: ",avg:"med: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fixar Esquerda",pinRight:"Fixar Direita",unpin:"Desprender"},columnMenu:{close:"Fechar"},gridMenu:{aria:{buttonLabel:"Menu Grid"},columns:"Colunas:",importerTitle:"Importar arquivo",exporterAllAsCsv:"Exportar todos os dados como csv",exporterVisibleAsCsv:"Exportar dados visíveis como csv",exporterSelectedAsCsv:"Exportar dados selecionados como csv",exporterAllAsPdf:"Exportar todos os dados como pdf",exporterVisibleAsPdf:"Exportar dados visíveis como pdf",exporterSelectedAsPdf:"Exportar dados selecionados como pdf",clearAllFilters:"Limpar todos os filtros"},importer:{noHeaders:"Nomes de colunas não puderam ser derivados. O arquivo tem um cabeçalho?",noObjects:"Objetos não puderam ser derivados. Havia dados no arquivo, além dos cabeçalhos?",invalidCsv:"Arquivo não pode ser processado. É um CSV válido?",invalidJson:"Arquivo não pode ser processado. É um Json válido?",jsonNotArray:"Arquivo json importado tem que conter um array. Abortando."},pagination:{aria:{pageToFirst:"Primeira página",pageBack:"Página anterior",pageSelected:"Página Selecionada",pageForward:"Proxima",pageToLast:"Anterior"},sizes:"itens por página",totalItems:"itens",through:"através dos",of:"de"},grouping:{group:"Agrupar",ungroup:"Desagrupar",aggregate_count:"Agr: Contar",aggregate_sum:"Agr: Soma",aggregate_max:"Agr: Max",aggregate_min:"Agr: Min",aggregate_avg:"Agr: Med",aggregate_remove:"Agr: Remover"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("pt",{headerCell:{aria:{defaultFilterLabel:"Filtro por coluna",removeFilter:"Remover filtro",columnMenuButtonLabel:"Menu coluna"},priority:"Prioridade:",filterLabel:"Filtro por coluna: "},aggregate:{label:"itens"},groupPanel:{description:"Arraste e solte uma coluna aqui para agrupar por essa coluna"},search:{placeholder:"Procurar...",showingItems:"Mostrando os Itens:",selectedItems:"Itens Selecionados:",totalItems:"Total de Itens:",size:"Tamanho da Página:",first:"Primeira Página",next:"Próxima Página",previous:"Página Anterior",last:"Última Página"},menu:{text:"Selecione as colunas:"},sort:{ascending:"Ordenar Ascendente",descending:"Ordenar Descendente",none:"Nenhuma Ordem",remove:"Remover Ordenação"},column:{hide:"Esconder coluna"},aggregation:{count:"total de linhas: ",sum:"total: ",avg:"med: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Fixar Esquerda",pinRight:"Fixar Direita",unpin:"Desprender"},columnMenu:{close:"Fechar"},gridMenu:{aria:{buttonLabel:"Menu Grid"},columns:"Colunas:",importerTitle:"Importar ficheiro",exporterAllAsCsv:"Exportar todos os dados como csv",exporterVisibleAsCsv:"Exportar dados visíveis como csv",exporterSelectedAsCsv:"Exportar dados selecionados como csv",exporterAllAsPdf:"Exportar todos os dados como pdf",exporterVisibleAsPdf:"Exportar dados visíveis como pdf",exporterSelectedAsPdf:"Exportar dados selecionados como pdf",clearAllFilters:"Limpar todos os filtros"},importer:{noHeaders:"Nomes de colunas não puderam ser derivados. O ficheiro tem um cabeçalho?",noObjects:"Objetos não puderam ser derivados. Havia dados no ficheiro, além dos cabeçalhos?",invalidCsv:"Ficheiro não pode ser processado. É um CSV válido?",invalidJson:"Ficheiro não pode ser processado. É um Json válido?",jsonNotArray:"Ficheiro json importado tem que conter um array. Interrompendo."},pagination:{aria:{pageToFirst:"Primeira página",pageBack:"Página anterior",pageSelected:"Página Selecionada",pageForward:"Próxima",pageToLast:"Anterior"},sizes:"itens por página",totalItems:"itens",through:"a",of:"de"},grouping:{group:"Agrupar",ungroup:"Desagrupar",aggregate_count:"Agr: Contar",aggregate_sum:"Agr: Soma",aggregate_max:"Agr: Max",aggregate_min:"Agr: Min",aggregate_avg:"Agr: Med",aggregate_remove:"Agr: Remover"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("ro",{headerCell:{aria:{defaultFilterLabel:"Filtru pentru coloana",removeFilter:"Sterge filtru",columnMenuButtonLabel:"Column Menu"},priority:"Prioritate:",filterLabel:"Filtru pentru coloana:"},aggregate:{label:"Elemente"},groupPanel:{description:"Trage un cap de coloana aici pentru a grupa elementele dupa coloana respectiva"},search:{placeholder:"Cauta...",showingItems:"Arata elementele:",selectedItems:"Elementele selectate:",totalItems:"Total elemente:",size:"Marime pagina:",first:"Prima pagina",next:"Pagina urmatoare",previous:"Pagina anterioara",last:"Ultima pagina"},menu:{text:"Alege coloane:"},sort:{ascending:"Ordoneaza crescator",descending:"Ordoneaza descrescator",none:"Fara ordonare",remove:"Sterge ordonarea"},column:{hide:"Ascunde coloana"},aggregation:{count:"total linii: ",sum:"total: ",avg:"medie: ",min:"min: ",max:"max: "},pinning:{pinLeft:"Pin la stanga",pinRight:"Pin la dreapta",unpin:"Sterge pinul"},columnMenu:{close:"Inchide"},gridMenu:{aria:{buttonLabel:"Grid Menu"},columns:"Coloane:",importerTitle:"Incarca fisier",exporterAllAsCsv:"Exporta toate datele ca csv",exporterVisibleAsCsv:"Exporta datele vizibile ca csv",exporterSelectedAsCsv:"Exporta datele selectate ca csv",exporterAllAsPdf:"Exporta toate datele ca pdf",exporterVisibleAsPdf:"Exporta datele vizibile ca pdf",exporterSelectedAsPdf:"Exporta datele selectate ca csv pdf",clearAllFilters:"Sterge toate filtrele"},importer:{noHeaders:"Numele coloanelor nu a putut fi incarcat, acest fisier are un header?",noObjects:"Datele nu au putut fi incarcate, exista date in fisier in afara numelor de coloane?",invalidCsv:"Fisierul nu a putut fi procesat, ati incarcat un CSV valid ?",invalidJson:"Fisierul nu a putut fi procesat, ati incarcat un Json valid?",jsonNotArray:"Json-ul incarcat trebuie sa contina un array, inchidere."},pagination:{aria:{pageToFirst:"Prima pagina",pageBack:"O pagina inapoi",pageSelected:"Pagina selectata",pageForward:"O pagina inainte",pageToLast:"Ultima pagina"},sizes:"Elemente per pagina",totalItems:"elemente",through:"prin",of:"of"},grouping:{group:"Grupeaza",ungroup:"Opreste gruparea",aggregate_count:"Agg: Count",aggregate_sum:"Agg: Sum",aggregate_max:"Agg: Max",aggregate_min:"Agg: Min",aggregate_avg:"Agg: Avg",aggregate_remove:"Agg: Remove"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("ru",{headerCell:{aria:{defaultFilterLabel:"Фильтр столбца",removeFilter:"Удалить фильтр",columnMenuButtonLabel:"Меню столбца"},priority:"Приоритет:",filterLabel:"Фильтр столбца: "},aggregate:{label:"элементы"},groupPanel:{description:"Для группировки по столбцу перетащите сюда его название."},search:{placeholder:"Поиск...",showingItems:"Показать элементы:",selectedItems:"Выбранные элементы:",totalItems:"Всего элементов:",size:"Размер страницы:",first:"Первая страница",next:"Следующая страница",previous:"Предыдущая страница",last:"Последняя страница"},menu:{text:"Выбрать столбцы:"},sort:{ascending:"По возрастанию",descending:"По убыванию",none:"Без сортировки",remove:"Убрать сортировку"},column:{hide:"Спрятать столбец"},aggregation:{count:"всего строк: ",sum:"итого: ",avg:"среднее: ",min:"мин: ",max:"макс: "},pinning:{pinLeft:"Закрепить слева",pinRight:"Закрепить справа",unpin:"Открепить"},columnMenu:{close:"Закрыть"},gridMenu:{aria:{buttonLabel:"Меню"},columns:"Столбцы:",importerTitle:"Импортировать файл",exporterAllAsCsv:"Экспортировать всё в CSV",exporterVisibleAsCsv:"Экспортировать видимые данные в CSV",exporterSelectedAsCsv:"Экспортировать выбранные данные в CSV",exporterAllAsPdf:"Экспортировать всё в PDF",exporterVisibleAsPdf:"Экспортировать видимые данные в PDF",exporterSelectedAsPdf:"Экспортировать выбранные данные в PDF",clearAllFilters:"Очистите все фильтры"},importer:{noHeaders:"Не удалось получить названия столбцов, есть ли в файле заголовок?",noObjects:"Не удалось получить данные, есть ли в файле строки кроме заголовка?",invalidCsv:"Не удалось обработать файл, это правильный CSV-файл?",invalidJson:"Не удалось обработать файл, это правильный JSON?",jsonNotArray:"Импортируемый JSON-файл должен содержать массив, операция отменена."},pagination:{aria:{pageToFirst:"Первая страница",pageBack:"Предыдущая страница",pageSelected:"Выбранная страница",pageForward:"Следующая страница",pageToLast:"Последняя страница"},sizes:"строк на страницу",totalItems:"строк",through:"по",of:"из"},grouping:{group:"Группировать",ungroup:"Разгруппировать",aggregate_count:"Группировать: Count",aggregate_sum:"Для группы: Сумма",aggregate_max:"Для группы: Максимум",aggregate_min:"Для группы: Минимум",aggregate_avg:"Для группы: Среднее",aggregate_remove:"Для группы: Пусто"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("sk",{aggregate:{label:"items"},groupPanel:{description:"Pretiahni sem názov stĺpca pre zoskupenie podľa toho stĺpca."},search:{placeholder:"Hľadaj...",showingItems:"Zobrazujem položky:",selectedItems:"Vybraté položky:",totalItems:"Počet položiek:",size:"Počet:",first:"Prvá strana",next:"Ďalšia strana",previous:"Predchádzajúca strana",last:"Posledná strana"},menu:{text:"Vyberte stĺpce:"},sort:{ascending:"Zotriediť vzostupne",descending:"Zotriediť zostupne",remove:"Vymazať triedenie"},aggregation:{count:"total rows: ",sum:"total: ",avg:"avg: ",min:"min: ",max:"max: "},gridMenu:{columns:"Columns:",importerTitle:"Import file",exporterAllAsCsv:"Export all data as csv",exporterVisibleAsCsv:"Export visible data as csv",exporterSelectedAsCsv:"Export selected data as csv",exporterAllAsPdf:"Export all data as pdf",exporterVisibleAsPdf:"Export visible data as pdf",exporterSelectedAsPdf:"Export selected data as pdf",clearAllFilters:"Clear all filters"},importer:{noHeaders:"Column names were unable to be derived, does the file have a header?",noObjects:"Objects were not able to be derived, was there data in the file other than headers?",invalidCsv:"File was unable to be processed, is it valid CSV?",invalidJson:"File was unable to be processed, is it valid Json?",jsonNotArray:"Imported json file must contain an array, aborting."}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("sv",{aggregate:{label:"Artiklar"},groupPanel:{description:"Dra en kolumnrubrik hit och släpp den för att gruppera efter den kolumnen."},search:{placeholder:"Sök...",showingItems:"Visar artiklar:",selectedItems:"Valda artiklar:",totalItems:"Antal artiklar:",size:"Sidstorlek:",first:"Första sidan",next:"Nästa sida",previous:"Föregående sida",last:"Sista sidan"},menu:{text:"Välj kolumner:"},sort:{ascending:"Sortera stigande",descending:"Sortera fallande",remove:"Inaktivera sortering"},column:{hide:"Göm kolumn"},aggregation:{count:"Antal rader: ",sum:"Summa: ",avg:"Genomsnitt: ",min:"Min: ",max:"Max: "},pinning:{pinLeft:"Fäst vänster",pinRight:"Fäst höger",unpin:"Lösgör"},gridMenu:{columns:"Kolumner:",importerTitle:"Importera fil",exporterAllAsCsv:"Exportera all data som CSV",exporterVisibleAsCsv:"Exportera synlig data som CSV",
exporterSelectedAsCsv:"Exportera markerad data som CSV",exporterAllAsPdf:"Exportera all data som PDF",exporterVisibleAsPdf:"Exportera synlig data som PDF",exporterSelectedAsPdf:"Exportera markerad data som PDF",clearAllFilters:"Rengör alla filter"},importer:{noHeaders:"Kolumnnamn kunde inte härledas. Har filen ett sidhuvud?",noObjects:"Objekt kunde inte härledas. Har filen data undantaget sidhuvud?",invalidCsv:"Filen kunde inte behandlas, är den en giltig CSV?",invalidJson:"Filen kunde inte behandlas, är den en giltig JSON?",jsonNotArray:"Importerad JSON-fil måste innehålla ett fält. Import avbruten."},pagination:{sizes:"Artiklar per sida",totalItems:"Artiklar"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("ta",{aggregate:{label:"உருப்படிகள்"},groupPanel:{description:"ஒரு பத்தியை குழுவாக அமைக்க அப்பத்தியின் தலைப்பை இங்கே  இழுத்து வரவும் "},search:{placeholder:"தேடல் ...",showingItems:"உருப்படிகளை காண்பித்தல்:",selectedItems:"தேர்ந்தெடுக்கப்பட்ட  உருப்படிகள்:",totalItems:"மொத்த உருப்படிகள்:",size:"பக்க அளவு: ",first:"முதல் பக்கம்",next:"அடுத்த பக்கம்",previous:"முந்தைய பக்கம் ",last:"இறுதி பக்கம்"},menu:{text:"பத்திகளை தேர்ந்தெடு:"},sort:{ascending:"மேலிருந்து கீழாக",descending:"கீழிருந்து மேலாக",remove:"வரிசையை நீக்கு"},column:{hide:"பத்தியை மறைத்து வை "},aggregation:{count:"மொத்த வரிகள்:",sum:"மொத்தம்: ",avg:"சராசரி: ",min:"குறைந்தபட்ச: ",max:"அதிகபட்ச: "},pinning:{pinLeft:"இடதுபுறமாக தைக்க ",pinRight:"வலதுபுறமாக தைக்க",unpin:"பிரி"},gridMenu:{columns:"பத்திகள்:",importerTitle:"கோப்பு : படித்தல்",exporterAllAsCsv:"எல்லா தரவுகளையும் கோப்பாக்கு: csv",exporterVisibleAsCsv:"இருக்கும் தரவுகளை கோப்பாக்கு: csv",exporterSelectedAsCsv:"தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: csv",exporterAllAsPdf:"எல்லா தரவுகளையும் கோப்பாக்கு: pdf",exporterVisibleAsPdf:"இருக்கும் தரவுகளை கோப்பாக்கு: pdf",exporterSelectedAsPdf:"தேர்ந்தெடுத்த தரவுகளை கோப்பாக்கு: pdf",clearAllFilters:"Clear all filters"},importer:{noHeaders:"பத்தியின் தலைப்புகளை பெற இயலவில்லை, கோப்பிற்கு தலைப்பு உள்ளதா?",noObjects:"இலக்குகளை உருவாக்க முடியவில்லை, கோப்பில் தலைப்புகளை தவிர தரவு ஏதேனும் உள்ளதா? ",invalidCsv:"சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - csv",invalidJson:"சரிவர நடைமுறை படுத்த இயலவில்லை, கோப்பு சரிதானா? - json",jsonNotArray:"படித்த கோப்பில் வரிசைகள் உள்ளது, நடைமுறை ரத்து செய் : json"},pagination:{sizes:"உருப்படிகள் / பக்கம்",totalItems:"உருப்படிகள் "},grouping:{group:"குழு",ungroup:"பிரி",aggregate_count:"மதிப்பீட்டு : எண்ணு",aggregate_sum:"மதிப்பீட்டு : கூட்டல்",aggregate_max:"மதிப்பீட்டு : அதிகபட்சம்",aggregate_min:"மதிப்பீட்டு : குறைந்தபட்சம்",aggregate_avg:"மதிப்பீட்டு : சராசரி",aggregate_remove:"மதிப்பீட்டு : நீக்கு"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("tr",{headerCell:{aria:{defaultFilterLabel:"Sütun için filtre",removeFilter:"Filtreyi Kaldır",columnMenuButtonLabel:"Sütun Menüsü"},priority:"Öncelik:",filterLabel:"Sütun için filtre: "},aggregate:{label:"kayıtlar"},groupPanel:{description:"Sütuna göre gruplamak için sütun başlığını buraya sürükleyin ve bırakın."},search:{placeholder:"Arama...",showingItems:"Gösterilen Kayıt:",selectedItems:"Seçili Kayıt:",totalItems:"Toplam Kayıt:",size:"Sayfa Boyutu:",first:"İlk Sayfa",next:"Sonraki Sayfa",previous:"Önceki Sayfa",last:"Son Sayfa"},menu:{text:"Sütunları Seç:"},sort:{ascending:"Artan Sırada Sırala",descending:"Azalan Sırada Sırala",none:"Sıralama Yapma",remove:"Sıralamayı Kaldır"},column:{hide:"Sütunu Gizle"},aggregation:{count:"toplam satır: ",sum:"toplam: ",avg:"ort: ",min:"min: ",max:"maks: "},pinning:{pinLeft:"Sola Sabitle",pinRight:"Sağa Sabitle",unpin:"Sabitlemeyi Kaldır"},columnMenu:{close:"Kapat"},gridMenu:{aria:{buttonLabel:"Tablo Menü"},columns:"Sütunlar:",importerTitle:"Dosya içeri aktar",exporterAllAsCsv:"Bütün veriyi CSV olarak dışarı aktar",exporterVisibleAsCsv:"Görünen veriyi CSV olarak dışarı aktar",exporterSelectedAsCsv:"Seçili veriyi CSV olarak dışarı aktar",exporterAllAsPdf:"Bütün veriyi PDF olarak dışarı aktar",exporterVisibleAsPdf:"Görünen veriyi PDF olarak dışarı aktar",exporterSelectedAsPdf:"Seçili veriyi PDF olarak dışarı aktar",clearAllFilters:"Bütün filtreleri kaldır"},importer:{noHeaders:"Sütun isimleri üretilemiyor, dosyanın bir başlığı var mı?",noObjects:"Nesneler üretilemiyor, dosyada başlıktan başka bir veri var mı?",invalidCsv:"Dosya işlenemedi, geçerli bir CSV dosyası mı?",invalidJson:"Dosya işlenemedi, geçerli bir Json dosyası mı?",jsonNotArray:"Alınan Json dosyasında bir dizi bulunmalıdır, işlem iptal ediliyor."},pagination:{aria:{pageToFirst:"İlk sayfaya",pageBack:"Geri git",pageSelected:"Seçili sayfa",pageForward:"İleri git",pageToLast:"Sona git"},sizes:"Sayfadaki nesne sayısı",totalItems:"kayıtlar",through:"",of:""},grouping:{group:"Grupla",ungroup:"Gruplama",aggregate_count:"Yekun: Sayı",aggregate_sum:"Yekun: Toplam",aggregate_max:"Yekun: Maks",aggregate_min:"Yekun: Min",aggregate_avg:"Yekun: Ort",aggregate_remove:"Yekun: Sil"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("ua",{headerCell:{aria:{defaultFilterLabel:"Фільтр стовпчика",removeFilter:"Видалити фільтр",columnMenuButtonLabel:"Меню ствпчика"},priority:"Пріоритет:",filterLabel:"Фільтр стовпчика: "},aggregate:{label:"елементи"},groupPanel:{description:"Для групування за стовпчиком перетягніть сюди його назву."},search:{placeholder:"Пошук...",showingItems:"Показати елементи:",selectedItems:"Обрані елементи:",totalItems:"Усього елементів:",size:"Розмір сторінки:",first:"Перша сторінка",next:"Наступна сторінка",previous:"Попередня сторінка",last:"Остання сторінка"},menu:{text:"Обрати ствпчики:"},sort:{ascending:"За зростанням",descending:"За спаданням",none:"Без сортування",remove:"Прибрати сортування"},column:{hide:"Приховати стовпчик"},aggregation:{count:"усього рядків: ",sum:"ітого: ",avg:"середнє: ",min:"мін: ",max:"макс: "},pinning:{pinLeft:"Закріпити ліворуч",pinRight:"Закріпити праворуч",unpin:"Відкріпити"},columnMenu:{close:"Закрити"},gridMenu:{aria:{buttonLabel:"Меню"},columns:"Стовпчики:",importerTitle:"Імпортувати файл",exporterAllAsCsv:"Експортувати все в CSV",exporterVisibleAsCsv:"Експортувати видимі дані в CSV",exporterSelectedAsCsv:"Експортувати обрані дані в CSV",exporterAllAsPdf:"Експортувати все в PDF",exporterVisibleAsPdf:"Експортувати видимі дані в PDF",exporterSelectedAsPdf:"Експортувати обрані дані в PDF",clearAllFilters:"Очистити всі фільтри"},importer:{noHeaders:"Не вдалося отримати назви стовпчиків, чи є в файлі заголовок?",noObjects:"Не вдалося отримати дані, чи є в файлі рядки окрім заголовка?",invalidCsv:"Не вдалося обробити файл, чи це коректний CSV-файл?",invalidJson:"Не вдалося обробити файл, чи це коректний JSON?",jsonNotArray:"JSON-файл що імпортується повинен містити масив, операцію скасовано."},pagination:{aria:{pageToFirst:"Перша сторінка",pageBack:"Попередня сторінка",pageSelected:"Обрана сторінка",pageForward:"Наступна сторінка",pageToLast:"Остання сторінка"},sizes:"рядків на сторінку",totalItems:"рядків",through:"по",of:"з"},grouping:{group:"Групувати",ungroup:"Розгрупувати",aggregate_count:"Групувати: Кількість",aggregate_sum:"Для групи: Сума",aggregate_max:"Для групи: Максимум",aggregate_min:"Для групи: Мінімум",aggregate_avg:"Для групи: Серднє",aggregate_remove:"Для групи: Пусто"}}),a}])}])}(),function(){var a=["uiT","uiTranslate"],b=["t","uiTranslate"],c=angular.module("ui.grid.i18n");c.constant("i18nConstants",{MISSING:"[MISSING]",UPDATE_EVENT:"$uiI18n",LOCALE_DIRECTIVE_ALIAS:"uiI18n",DEFAULT_LANG:"en"}),c.service("i18nService",["$log","i18nConstants","$rootScope",function(a,b,c){var d={_langs:{},current:null,get:function(a){return this._langs[a.toLowerCase()]},add:function(a,b){var c=a.toLowerCase();this._langs[c]||(this._langs[c]={}),angular.extend(this._langs[c],b)},getAllLangs:function(){var a=[];if(!this._langs)return a;for(var b in this._langs)a.push(b);return a},setCurrent:function(a){this.current=a.toLowerCase()},getCurrentLang:function(){return this.current}},e={add:function(a,b){"object"==typeof a?angular.forEach(a,function(a){a&&d.add(a,b)}):d.add(a,b)},getAllLangs:function(){return d.getAllLangs()},get:function(a){var b=a?a:e.getCurrentLang();return d.get(b)},getSafeText:function(a,c){var f=c?c:e.getCurrentLang(),g=d.get(f);if(!g)return b.MISSING;for(var h=a.split("."),i=g,j=0;j<h.length;++j){if(void 0===i[h[j]]||null===i[h[j]])return b.MISSING;i=i[h[j]]}return i},setCurrentLang:function(a){a&&(d.setCurrent(a),c.$broadcast(b.UPDATE_EVENT))},getCurrentLang:function(){var a=d.getCurrentLang();return a||(a=b.DEFAULT_LANG,d.setCurrent(a)),a}};return e}]);var d=function(a,b){return{compile:function(){return{pre:function(c,d,e){var f=b.LOCALE_DIRECTIVE_ALIAS,g=c.$eval(e[f]);g?c.$watch(e[f],function(){a.setCurrentLang(g)}):e.$$observers&&e.$observe(f,function(){a.setCurrentLang(e[f]||b.DEFAULT_LANG)})}}}}};c.directive("uiI18n",["i18nService","i18nConstants",d]);var e=function(b,c,d){return{restrict:"EA",compile:function(){return{pre:function(e,f,g){var h,i=a[0],j=a[1],k=g[i]||g[j]||f.html(),l=d.MISSING+k;if(g.$$observers){var m=g[i]?i:j;h=g.$observe(m,function(a){a&&f.html(b(a)(c.getCurrentLang())||l)})}var n=b(k),o=e.$on(d.UPDATE_EVENT,function(a){h?h(g[i]||g[j]):f.html(n(c.get())||l)});e.$on("$destroy",o),f.html(n(c.get())||l)}}}}};angular.forEach(a,function(a){c.directive(a,["$parse","i18nService","i18nConstants",e])});var f=function(a,b,c){return function(d){var e=a(d);return e(b.get())||c.MISSING+d}};angular.forEach(b,function(a){c.filter(a,["$parse","i18nService","i18nConstants",f])})}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("zh-cn",{headerCell:{aria:{defaultFilterLabel:"列过滤器",removeFilter:"移除过滤器",columnMenuButtonLabel:"列菜单"},priority:"优先级:",filterLabel:"列过滤器: "},aggregate:{label:"行"},groupPanel:{description:"拖曳表头到此处进行分组"},search:{placeholder:"查找",showingItems:"已显示行数：",selectedItems:"已选择行数：",totalItems:"总行数：",size:"每页显示行数：",first:"首页",next:"下一页",previous:"上一页",last:"末页"},menu:{text:"选择列："},sort:{ascending:"升序",descending:"降序",none:"无序",remove:"取消排序"},column:{hide:"隐藏列"},aggregation:{count:"计数：",sum:"求和：",avg:"均值：",min:"最小值：",max:"最大值："},pinning:{pinLeft:"左侧固定",pinRight:"右侧固定",unpin:"取消固定"},columnMenu:{close:"关闭"},gridMenu:{aria:{buttonLabel:"表格菜单"},columns:"列：",importerTitle:"导入文件",exporterAllAsCsv:"导出全部数据到CSV",exporterVisibleAsCsv:"导出可见数据到CSV",exporterSelectedAsCsv:"导出已选数据到CSV",exporterAllAsPdf:"导出全部数据到PDF",exporterVisibleAsPdf:"导出可见数据到PDF",exporterSelectedAsPdf:"导出已选数据到PDF",clearAllFilters:"清除所有过滤器"},importer:{noHeaders:"无法获取列名，确定文件包含表头？",noObjects:"无法获取数据，确定文件包含数据？",invalidCsv:"无法处理文件，确定是合法的CSV文件？",invalidJson:"无法处理文件，确定是合法的JSON文件？",jsonNotArray:"导入的文件不是JSON数组！"},pagination:{aria:{pageToFirst:"第一页",pageBack:"上一页",pageSelected:"当前页",pageForward:"下一页",pageToLast:"最后一页"},sizes:"行每页",totalItems:"行",through:"至",of:"共"},grouping:{group:"分组",ungroup:"取消分组",aggregate_count:"合计: 计数",aggregate_sum:"合计: 求和",aggregate_max:"合计: 最大",aggregate_min:"合计: 最小",aggregate_avg:"合计: 平均",aggregate_remove:"合计: 移除"}}),a}])}])}(),function(){angular.module("ui.grid").config(["$provide",function(a){a.decorator("i18nService",["$delegate",function(a){return a.add("zh-tw",{aggregate:{label:"行"},groupPanel:{description:"拖曳表頭到此處進行分組"},search:{placeholder:"查找",showingItems:"已顯示行數：",selectedItems:"已選擇行數：",totalItems:"總行數：",size:"每頁顯示行數：",first:"首頁",next:"下壹頁",previous:"上壹頁",last:"末頁"},menu:{text:"選擇列："},sort:{ascending:"升序",descending:"降序",remove:"取消排序"},column:{hide:"隱藏列"},aggregation:{count:"計數：",sum:"求和：",avg:"均值：",min:"最小值：",max:"最大值："},pinning:{pinLeft:"左側固定",pinRight:"右側固定",unpin:"取消固定"},gridMenu:{columns:"列：",importerTitle:"導入文件",exporterAllAsCsv:"導出全部數據到CSV",exporterVisibleAsCsv:"導出可見數據到CSV",exporterSelectedAsCsv:"導出已選數據到CSV",exporterAllAsPdf:"導出全部數據到PDF",exporterVisibleAsPdf:"導出可見數據到PDF",exporterSelectedAsPdf:"導出已選數據到PDF",clearAllFilters:"清除所有过滤器"},importer:{noHeaders:"無法獲取列名，確定文件包含表頭？",noObjects:"無法獲取數據，確定文件包含數據？",invalidCsv:"無法處理文件，確定是合法的CSV文件？",invalidJson:"無法處理文件，確定是合法的JSON文件？",jsonNotArray:"導入的文件不是JSON數組！"},pagination:{sizes:"行每頁",totalItems:"行"}}),a}])}])}(),function(){"use strict";var a=angular.module("ui.grid.autoResize",["ui.grid"]);a.directive("uiGridAutoResize",["$timeout","gridUtil",function(a,b){return{require:"uiGrid",scope:!1,link:function(a,c,d,e){function f(){i=b.elementHeight(c),h=b.elementWidth(c)}function g(){clearTimeout(j),j=setTimeout(function(){var d=b.elementHeight(c),j=b.elementWidth(c);d!==i||j!==h?(e.grid.gridHeight=d,e.grid.gridWidth=j,e.grid.api.core.raise.gridDimensionChanged(i,h,d,j),a.$apply(function(){e.grid.refresh().then(function(){f(),g()})})):g()},250)}var h,i;f();var j;g(),a.$on("$destroy",function(){clearTimeout(j)})}}}])}(),function(){"use strict";var a=angular.module("ui.grid.cellNav",["ui.grid"]);a.constant("uiGridCellNavConstants",{FEATURE_NAME:"gridCellNav",CELL_NAV_EVENT:"cellNav",direction:{LEFT:0,RIGHT:1,UP:2,DOWN:3,PG_UP:4,PG_DOWN:5},EVENT_TYPE:{KEYDOWN:0,CLICK:1,CLEAR:2}}),a.factory("uiGridCellNavFactory",["gridUtil","uiGridConstants","uiGridCellNavConstants","GridRowColumn","$q",function(a,b,c,d,e){var f=function(a,b,c,d){this.rows=a.visibleRowCache,this.columns=b.visibleColumnCache,this.leftColumns=c?c.visibleColumnCache:[],this.rightColumns=d?d.visibleColumnCache:[],this.bodyContainer=a};return f.prototype.getFocusableCols=function(){var a=this.leftColumns.concat(this.columns,this.rightColumns);return a.filter(function(a){return a.colDef.allowCellFocus})},f.prototype.getFocusableRows=function(){return this.rows.filter(function(a){return a.allowCellFocus!==!1})},f.prototype.getNextRowCol=function(a,b,d){switch(a){case c.direction.LEFT:return this.getRowColLeft(b,d);case c.direction.RIGHT:return this.getRowColRight(b,d);case c.direction.UP:return this.getRowColUp(b,d);case c.direction.DOWN:return this.getRowColDown(b,d);case c.direction.PG_UP:return this.getRowColPageUp(b,d);case c.direction.PG_DOWN:return this.getRowColPageDown(b,d)}},f.prototype.initializeSelection=function(){var a=this.getFocusableCols(),b=this.getFocusableRows();if(0===a.length||0===b.length)return null;return new d(b[0],a[0])},f.prototype.getRowColLeft=function(a,b){var c=this.getFocusableCols(),e=this.getFocusableRows(),f=c.indexOf(b),g=e.indexOf(a);-1===f&&(f=1);var h=0===f?c.length-1:f-1;return h>=f?0===g?new d(a,c[h]):new d(e[g-1],c[h]):new d(a,c[h])},f.prototype.getRowColRight=function(a,b){var c=this.getFocusableCols(),e=this.getFocusableRows(),f=c.indexOf(b),g=e.indexOf(a);-1===f&&(f=0);var h=f===c.length-1?0:f+1;return f>=h?g===e.length-1?new d(a,c[h]):new d(e[g+1],c[h]):new d(a,c[h])},f.prototype.getRowColDown=function(a,b){var c=this.getFocusableCols(),e=this.getFocusableRows(),f=c.indexOf(b),g=e.indexOf(a);return-1===f&&(f=0),g===e.length-1?new d(a,c[f]):new d(e[g+1],c[f])},f.prototype.getRowColPageDown=function(a,b){var c=this.getFocusableCols(),e=this.getFocusableRows(),f=c.indexOf(b),g=e.indexOf(a);-1===f&&(f=0);var h=this.bodyContainer.minRowsToRender();return g>=e.length-h?new d(e[e.length-1],c[f]):new d(e[g+h],c[f])},f.prototype.getRowColUp=function(a,b){var c=this.getFocusableCols(),e=this.getFocusableRows(),f=c.indexOf(b),g=e.indexOf(a);return-1===f&&(f=0),0===g?new d(a,c[f]):new d(e[g-1],c[f])},f.prototype.getRowColPageUp=function(a,b){var c=this.getFocusableCols(),e=this.getFocusableRows(),f=c.indexOf(b),g=e.indexOf(a);-1===f&&(f=0);var h=this.bodyContainer.minRowsToRender();return 0>g-h?new d(e[0],c[f]):new d(e[g-h],c[f])},f}]),a.service("uiGridCellNavService",["gridUtil","uiGridConstants","uiGridCellNavConstants","$q","uiGridCellNavFactory","GridRowColumn","ScrollEvent",function(a,b,c,d,e,f,g){var h={initializeGrid:function(a){a.registerColumnBuilder(h.cellNavColumnBuilder),a.cellNav={},a.cellNav.lastRowCol=null,a.cellNav.focusedCells=[],h.defaultGridOptions(a.options);var b={events:{cellNav:{navigate:function(a,b){},viewPortKeyDown:function(a,b){},viewPortKeyPress:function(a,b){}}},methods:{cellNav:{scrollToFocus:function(b,c){return h.scrollToFocus(a,b,c)},getFocusedCell:function(){return a.cellNav.lastRowCol},getCurrentSelection:function(){return a.cellNav.focusedCells},rowColSelectIndex:function(b){for(var c=-1,d=0;d<a.cellNav.focusedCells.length;d++)if(a.cellNav.focusedCells[d].col.uid===b.col.uid&&a.cellNav.focusedCells[d].row.uid===b.row.uid){c=d;break}return c}}}};a.api.registerEventsFromObject(b.events),a.api.registerMethodsFromObject(b.methods)},defaultGridOptions:function(a){a.modifierKeysToMultiSelectCells=a.modifierKeysToMultiSelectCells===!0,a.keyDownOverrides=a.keyDownOverrides||[]},decorateRenderContainers:function(a){var b=a.hasRightContainer()?a.renderContainers.right:null,c=a.hasLeftContainer()?a.renderContainers.left:null;null!==c&&(a.renderContainers.left.cellNav=new e(a.renderContainers.body,c,b,a.renderContainers.body)),null!==b&&(a.renderContainers.right.cellNav=new e(a.renderContainers.body,b,a.renderContainers.body,c)),a.renderContainers.body.cellNav=new e(a.renderContainers.body,a.renderContainers.body,c,b)},getDirection:function(a){return a.keyCode===b.keymap.LEFT||a.keyCode===b.keymap.TAB&&a.shiftKey?c.direction.LEFT:a.keyCode===b.keymap.RIGHT||a.keyCode===b.keymap.TAB?c.direction.RIGHT:a.keyCode===b.keymap.UP||a.keyCode===b.keymap.ENTER&&a.shiftKey?c.direction.UP:a.keyCode===b.keymap.PG_UP?c.direction.PG_UP:a.keyCode===b.keymap.DOWN||a.keyCode===b.keymap.ENTER&&!a.ctrlKey&&!a.altKey?c.direction.DOWN:a.keyCode===b.keymap.PG_DOWN?c.direction.PG_DOWN:null},cellNavColumnBuilder:function(a,b,c){var e=[];return a.allowCellFocus=void 0===a.allowCellFocus?!0:a.allowCellFocus,d.all(e)},scrollToFocus:function(a,b,c){var d=null,e=null;return"undefined"!=typeof b&&null!==b&&(d=a.getRow(b)),"undefined"!=typeof c&&null!==c&&(e=a.getColumn(c.name?c.name:c.field)),a.api.core.scrollToIfNecessary(d,e).then(function(){var b={row:d,col:e};null!==d&&null!==e&&a.cellNav.broadcastCellNav(b)})},getLeftWidth:function(a,b){var c=0;if(!b)return c;var d=a.renderContainers.body.visibleColumnCache.indexOf(b);a.renderContainers.body.visibleColumnCache.forEach(function(a,b){d>b&&(c+=a.drawnWidth)});var e=0===d?0:(d+1)/a.renderContainers.body.visibleColumnCache.length;return c+=b.drawnWidth*e}};return h}]),a.directive("uiGridCellnav",["gridUtil","uiGridCellNavService","uiGridCellNavConstants","uiGridConstants","GridRowColumn","$timeout","$compile","i18nService",function(a,b,c,d,e,f,g,h){return{replace:!0,priority:-150,require:"^uiGrid",scope:!1,controller:function(){},compile:function(){return{pre:function(a,f,g,h){var i=a,j=h.grid;b.initializeGrid(j),h.cellNav={},h.cellNav.makeRowCol=function(a){return a instanceof e||(a=new e(a.row,a.col)),a},h.cellNav.getActiveCell=function(){var a=f[0].getElementsByClassName("ui-grid-cell-focus");return a.length>0?a[0]:void 0},h.cellNav.broadcastCellNav=j.cellNav.broadcastCellNav=function(a,b,d){b=!(void 0===b||!b),a=h.cellNav.makeRowCol(a),h.cellNav.broadcastFocus(a,b,d),i.$broadcast(c.CELL_NAV_EVENT,a,b,d)},h.cellNav.clearFocus=j.cellNav.clearFocus=function(){j.cellNav.focusedCells=[],i.$broadcast(c.CELL_NAV_EVENT)},h.cellNav.broadcastFocus=function(a,b,c){b=!(void 0===b||!b),a=h.cellNav.makeRowCol(a);var d=a.row,f=a.col,g=h.grid.api.cellNav.rowColSelectIndex(a);if(null===j.cellNav.lastRowCol||-1===g){var i=new e(d,f);(null===j.cellNav.lastRowCol||j.cellNav.lastRowCol.row!==i.row||j.cellNav.lastRowCol.col!==i.col)&&(j.api.cellNav.raise.navigate(i,j.cellNav.lastRowCol,c),j.cellNav.lastRowCol=i),h.grid.options.modifierKeysToMultiSelectCells&&b?j.cellNav.focusedCells.push(a):j.cellNav.focusedCells=[a]}else j.options.modifierKeysToMultiSelectCells&&b&&g>=0&&j.cellNav.focusedCells.splice(g,1)},h.cellNav.handleKeyDown=function(a){var e=b.getDirection(a);if(null===e)return null;var f="body";a.uiGridTargetRenderContainerId&&(f=a.uiGridTargetRenderContainerId);var g=h.grid.api.cellNav.getFocusedCell();if(g){var i=h.grid.renderContainers[f].cellNav.getNextRowCol(e,g.row,g.col),k=h.grid.renderContainers[f].cellNav.getFocusableCols(),l=h.grid.api.cellNav.rowColSelectIndex(i);return e===c.direction.LEFT&&i.col===k[k.length-1]&&i.row===g.row&&a.keyCode===d.keymap.TAB&&a.shiftKey?(j.cellNav.focusedCells.splice(l,1),h.cellNav.clearFocus(),!0):e!==c.direction.RIGHT||i.col!==k[0]||i.row!==g.row||a.keyCode!==d.keymap.TAB||a.shiftKey?(j.scrollToIfNecessary(i.row,i.col).then(function(){h.cellNav.broadcastCellNav(i,null,a)}),a.stopPropagation(),a.preventDefault(),!1):(j.cellNav.focusedCells.splice(l,1),h.cellNav.clearFocus(),!0)}}},post:function(a,b,d,e){function f(){var d='<div id="'+i.id+'-aria-speakable" class="ui-grid-a11y-ariascreenreader-speakable ui-grid-offscreen" aria-live="assertive" role="alert" aria-atomic="true" aria-hidden="false" aria-relevant="additions" >&nbsp;</div>',e=g(d)(a);b.prepend(e),a.$on(c.CELL_NAV_EVENT,function(a,b,c,d){function f(a){a!==e.text().trim()&&(e[0].style.clip="rect(0px,0px,0px,0px)",e[0].innerHTML="",e[0].style.visibility="hidden",e[0].style.visibility="visible",""!==a&&(e[0].style.clip="auto",e[0].appendChild(document.createTextNode(a+" ")),e[0].style.visibility="hidden",e[0].style.visibility="visible"))}function g(a){return"selectionRowHeaderCol"===a.col.field?a.row.isSelected?h.getSafeText("search.aria.selected"):h.getSafeText("search.aria.notSelected"):i.getCellDisplayValue(a.row,k[l].col)}if(!d||"focus"!==d.type){for(var j=[],k=i.api.cellNav.getCurrentSelection(),l=0;l<k.length;l++)j.push(g(k[l]));var m=j.toString();f(m)}})}var i=e.grid,j=!0;try{angular.module("ngAria")}catch(k){j=!1}j&&f()}}}}}]),a.directive("uiGridRenderContainer",["$timeout","$document","gridUtil","uiGridConstants","uiGridCellNavService","$compile","uiGridCellNavConstants",function(a,b,c,d,e,f,g){return{replace:!0,priority:-99999,require:["^uiGrid","uiGridRenderContainer","?^uiGridCellnav"],scope:!1,compile:function(){return{post:function(b,d,h,i){var j=i[0],k=i[1],l=i[2];if(j.grid.api.cellNav){var m=k.containerId,n=j.grid;if(e.decorateRenderContainers(n),"body"===m){j.grid.options.modifierKeysToMultiSelectCells?d.attr("aria-multiselectable",!0):d.attr("aria-multiselectable",!1);var o=f('<div class="ui-grid-focuser" role="region" aria-live="assertive" aria-atomic="false" tabindex="0" aria-controls="'+n.id+"-aria-speakable "+n.id+'-grid-container" aria-owns="'+n.id+'-grid-container"></div>')(b);d.append(o),o.on("focus",function(a){a.uiGridTargetRenderContainerId=m;var b=j.grid.api.cellNav.getFocusedCell();null===b&&(b=j.grid.renderContainers[m].cellNav.getNextRowCol(g.direction.DOWN,null,null),b.row&&b.col&&j.cellNav.broadcastCellNav(b))}),l.setAriaActivedescendant=function(a){d.attr("aria-activedescendant",a)},l.removeAriaActivedescendant=function(a){d.attr("aria-activedescendant")===a&&d.attr("aria-activedescendant","")},j.focus=function(){c.focus.byElement(o[0])};var p=null;o.on("keydown",function(a){a.uiGridTargetRenderContainerId=m;var b=j.grid.api.cellNav.getFocusedCell(),c=j.grid.options.keyDownOverrides.some(function(b){return Object.keys(b).every(function(c){return b[c]===a[c]})}),d=c?null:j.cellNav.handleKeyDown(a);null===d&&(j.grid.api.cellNav.raise.viewPortKeyDown(a,b),p=b)}),o.on("keypress",function(b){p&&(a(function(){j.grid.api.cellNav.raise.viewPortKeyPress(b,p)},4),p=null)}),b.$on("$destroy",function(){o.off()})}}}}}}}]),a.directive("uiGridViewport",["$timeout","$document","gridUtil","uiGridConstants","uiGridCellNavService","uiGridCellNavConstants","$log","$compile",function(a,b,c,d,e,f,g,h){return{replace:!0,priority:-99999,require:["^uiGrid","^uiGridRenderContainer","?^uiGridCellnav"],scope:!1,compile:function(){return{pre:function(a,b,c,d){},post:function(a,b,c,d){var e=d[0],f=d[1];if(e.grid.api.cellNav){var g=f.containerId;if("body"===g){var h=e.grid;h.api.core.on.scrollBegin(a,function(a){var b=e.grid.api.cellNav.getFocusedCell();null!==b&&f.colContainer.containsColumn(b.col)&&e.cellNav.clearFocus()}),h.api.core.on.scrollEnd(a,function(a){var b=e.grid.api.cellNav.getFocusedCell();null!==b&&f.colContainer.containsColumn(b.col)&&e.cellNav.broadcastCellNav(b)}),h.api.cellNav.on.navigate(a,function(){e.focus()})}}}}}}}]),a.directive("uiGridCell",["$timeout","$document","uiGridCellNavService","gridUtil","uiGridCellNavConstants","uiGridConstants","GridRowColumn",function(a,b,c,d,e,f,g){return{priority:-150,restrict:"A",require:["^uiGrid","?^uiGridCellnav"],scope:!1,link:function(b,c,d,h){function i(a){a.preventDefault()}function j(){var a=o.cellNav.focusedCells.some(function(a,c){return a.row===b.row&&a.col===b.col});a?k():l()}function k(){if(!b.focused){var a=c.find("div");a.addClass("ui-grid-cell-focus"),c.attr("aria-selected",!0),n.setAriaActivedescendant(c.attr("id")),b.focused=!0}}function l(){if(b.focused){var a=c.find("div");a.removeClass("ui-grid-cell-focus"),c.attr("aria-selected",!1),n.removeAriaActivedescendant(c.attr("id")),b.focused=!1}}var m=h[0],n=h[1];if(m.grid.api.cellNav&&b.col.colDef.allowCellFocus){var o=m.grid;b.focused=!1,c.attr("tabindex",-1),c.find("div").on("click",function(a){m.cellNav.broadcastCellNav(new g(b.row,b.col),a.ctrlKey||a.metaKey,a),a.stopPropagation(),b.$apply()}),c.on("mousedown",i),m.grid.api.edit&&(m.grid.api.edit.on.beginCellEdit(b,function(){c.off("mousedown",i)}),m.grid.api.edit.on.afterCellEdit(b,function(){c.on("mousedown",i)}),m.grid.api.edit.on.cancelCellEdit(b,function(){c.on("mousedown",i)})),j(),c.on("focus",function(a){m.cellNav.broadcastCellNav(new g(b.row,b.col),!1,a),a.stopPropagation(),b.$apply()}),b.$on(e.CELL_NAV_EVENT,j);var p=m.grid.registerDataChangeCallback(function(b){l(),a(j)},[f.dataChange.ROW]);b.$on("$destroy",function(){p(),c.find("div").off(),c.off()})}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.edit",["ui.grid"]);a.constant("uiGridEditConstants",{EDITABLE_CELL_TEMPLATE:/EDITABLE_CELL_TEMPLATE/g,EDITABLE_CELL_DIRECTIVE:/editable_cell_directive/g,events:{BEGIN_CELL_EDIT:"uiGridEventBeginCellEdit",END_CELL_EDIT:"uiGridEventEndCellEdit",CANCEL_CELL_EDIT:"uiGridEventCancelCellEdit"}}),a.service("uiGridEditService",["$q","uiGridConstants","gridUtil",function(a,b,c){var d={initializeGrid:function(a){d.defaultGridOptions(a.options),a.registerColumnBuilder(d.editColumnBuilder),a.edit={};var b={events:{edit:{afterCellEdit:function(a,b,c,d){},beginCellEdit:function(a,b,c){},cancelCellEdit:function(a,b){}}},methods:{edit:{}}};a.api.registerEventsFromObject(b.events)},defaultGridOptions:function(a){a.cellEditableCondition=void 0===a.cellEditableCondition?!0:a.cellEditableCondition,a.enableCellEditOnFocus=void 0===a.enableCellEditOnFocus?!1:a.enableCellEditOnFocus},editColumnBuilder:function(b,d,e){var f=[];return b.enableCellEdit=void 0===b.enableCellEdit?void 0===e.enableCellEdit?"object"!==b.type:e.enableCellEdit:b.enableCellEdit,b.cellEditableCondition=void 0===b.cellEditableCondition?e.cellEditableCondition:b.cellEditableCondition,b.enableCellEdit&&(b.editableCellTemplate=b.editableCellTemplate||e.editableCellTemplate||"ui-grid/cellEditor",f.push(c.getTemplate(b.editableCellTemplate).then(function(a){d.editableCellTemplate=a},function(a){throw new Error("Couldn't fetch/use colDef.editableCellTemplate '"+b.editableCellTemplate+"'")}))),b.enableCellEditOnFocus=void 0===b.enableCellEditOnFocus?e.enableCellEditOnFocus:b.enableCellEditOnFocus,a.all(f)},isStartEditKey:function(a){return a.metaKey||a.keyCode===b.keymap.ESC||a.keyCode===b.keymap.SHIFT||a.keyCode===b.keymap.CTRL||a.keyCode===b.keymap.ALT||a.keyCode===b.keymap.WIN||a.keyCode===b.keymap.CAPSLOCK||a.keyCode===b.keymap.LEFT||a.keyCode===b.keymap.TAB&&a.shiftKey||a.keyCode===b.keymap.RIGHT||a.keyCode===b.keymap.TAB||a.keyCode===b.keymap.UP||a.keyCode===b.keymap.ENTER&&a.shiftKey||a.keyCode===b.keymap.DOWN||a.keyCode===b.keymap.ENTER?!1:!0}};return d}]),a.directive("uiGridEdit",["gridUtil","uiGridEditService",function(a,b){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(e.grid)},post:function(a,b,c,d){}}}}}]),a.directive("uiGridViewport",["uiGridEditConstants",function(a){return{replace:!0,priority:-99998,require:["^uiGrid","^uiGridRenderContainer"],scope:!1,compile:function(){return{post:function(b,c,d,e){var f=e[0];if(f.grid.api.edit&&f.grid.api.cellNav){var g=e[1].containerId;"body"===g&&(b.$on(a.events.CANCEL_CELL_EDIT,function(){f.focus()}),b.$on(a.events.END_CELL_EDIT,function(){f.focus()}))}}}}}}]),a.directive("uiGridCell",["$compile","$injector","$timeout","uiGridConstants","uiGridEditConstants","gridUtil","$parse","uiGridEditService","$rootScope","$q",function(a,b,c,d,e,f,g,h,i,j){var k=500;if(b.has("uiGridCellNavService")){b.get("uiGridCellNavService")}return{priority:-100,restrict:"A",scope:!1,require:"?^uiGrid",link:function(b,l,m,n){function o(){l.on("dblclick",u),l.on("touchstart",p),n&&n.grid.api.cellNav&&(G=n.grid.api.cellNav.on.viewPortKeyDown(b,function(a,c){null!==c&&(c.row!==b.row||c.col!==b.col||b.col.colDef.enableCellEditOnFocus||s(a))}),F=n.grid.api.cellNav.on.navigate(b,function(a,d,e){b.col.colDef.enableCellEditOnFocus&&(d&&a.row===d.row&&a.col===d.col||a.row!==b.row||a.col!==b.col||c(function(){u(e)}))})),b.beginEditEventsWired=!0}function p(a){"undefined"!=typeof a.originalEvent&&void 0!==a.originalEvent&&(a=a.originalEvent),l.on("touchend",q),C=c(function(){},k),C.then(function(){setTimeout(u,0),l.off("touchend",q)})}function q(a){c.cancel(C),l.off("touchend",q)}function r(){l.off("dblclick",u),l.off("keydown",s),l.off("touchstart",p),F(),G(),b.beginEditEventsWired=!1}function s(a){h.isStartEditKey(a)&&u(a)}function t(a,c,d){return!c.isSaving&&(angular.isFunction(a.colDef.cellEditableCondition)?a.colDef.cellEditableCondition(b,d):a.colDef.cellEditableCondition)}function u(a){b.grid.api.core.scrollToIfNecessary(b.row,b.col).then(function(){v(a)})}function v(h){if(!E&&t(b.col,b.row,h)){var k=b.row.getQualifiedColField(b.col);b.col.colDef.editModelField&&(k=f.preEval("row.entity."+b.col.colDef.editModelField)),B=g(k),A=B(b),z=b.col.editableCellTemplate,z=z.replace(d.MODEL_COL_FIELD,k),z=z.replace(d.COL_FIELD,"grid.getCellValue(row, col)");var m=b.col.colDef.editDropdownFilter?"|"+b.col.colDef.editDropdownFilter:"";z=z.replace(d.CUSTOM_FILTERS,m);var n="text";switch(b.col.colDef.type){case"boolean":n="checkbox";break;case"number":n="number";break;case"date":n="date"}z=z.replace("INPUT_TYPE",n);var o=b.col.colDef.editDropdownOptionsFunction;if(o)j.when(o(b.row.entity,b.col.colDef)).then(function(a){b.editDropdownOptionsArray=a});else{var p=b.col.colDef.editDropdownRowEntityOptionsArrayPath;p?b.editDropdownOptionsArray=y(b.row.entity,p):b.editDropdownOptionsArray=b.col.colDef.editDropdownOptionsArray}b.editDropdownIdLabel=b.col.colDef.editDropdownIdLabel?b.col.colDef.editDropdownIdLabel:"id",b.editDropdownValueLabel=b.col.colDef.editDropdownValueLabel?b.col.colDef.editDropdownValueLabel:"value";var q=function(){E=!0,r();var c=angular.element(z);l.append(c),D=b.$new(),a(c)(D);var d=angular.element(l.children()[0]);d.addClass("ui-grid-cell-contents-hidden")};i.$$phase?q():b.$apply(q);var s=b.col.grid.api.core.on.scrollBegin(b,function(){b.grid.disableScrolling||(w(),b.grid.api.edit.raise.afterCellEdit(b.row.entity,b.col.colDef,B(b),A),s(),u(),v())}),u=b.$on(e.events.END_CELL_EDIT,function(){w(),b.grid.api.edit.raise.afterCellEdit(b.row.entity,b.col.colDef,B(b),A),u(),s(),v()}),v=b.$on(e.events.CANCEL_CELL_EDIT,function(){x(),v(),s(),u()});b.$broadcast(e.events.BEGIN_CELL_EDIT,h),c(function(){b.grid.api.edit.raise.beginCellEdit(b.row.entity,b.col.colDef,h)})}}function w(){if(b.grid.disableScrolling=!1,E){n&&n.grid.api.cellNav&&n.focus();var a=angular.element(l.children()[0]);D.$destroy();for(var c=l.children(),e=1;e<c.length;e++)angular.element(c[e]).remove();a.removeClass("ui-grid-cell-contents-hidden"),E=!1,o(),b.grid.api.core.notifyDataChange(d.dataChange.EDIT);
}}function x(){b.grid.disableScrolling=!1,E&&(B.assign(b,A),b.$apply(),b.grid.api.edit.raise.cancelCellEdit(b.row.entity,b.col.colDef),w())}function y(a,b){b=b.replace(/\[(\w+)\]/g,".$1"),b=b.replace(/^\./,"");for(var c=b.split(".");c.length;){var d=c.shift();if(!(d in a))return;a=a[d]}return a}var z,A,B,C,D,E=!1;if(b.col.colDef.enableCellEdit){var F=function(){},G=function(){},H=function(){b.col.colDef.enableCellEdit&&b.row.enableCellEdit!==!1?b.beginEditEventsWired||o():b.beginEditEventsWired&&r()};H();var I=b.$watch("row",function(a,b){a!==b&&H()});b.$on("$destroy",function(){I(),l.off()})}}}}]),a.directive("uiGridEditor",["gridUtil","uiGridConstants","uiGridEditConstants","$timeout","uiGridEditService",function(a,b,c,d,e){return{scope:!0,require:["?^uiGrid","?^uiGridRenderContainer","ngModel"],compile:function(){return{pre:function(a,b,c){},post:function(a,f,g,h){var i,j,k;h[0]&&(i=h[0]),h[1]&&(j=h[1]),h[2]&&(k=h[2]),a.$on(c.events.BEGIN_CELL_EDIT,function(b,c){if(d(function(){if(f[0].focus(),!f[0].select||!a.col.colDef.enableCellEditOnFocus&&i&&i.grid.api.cellNav)try{f[0].setSelectionRange(f[0].value.length,f[0].value.length)}catch(b){}else f[0].select()}),i&&i.grid.api.cellNav)var g=i.grid.api.cellNav.on.viewPortKeyPress(a,function(a,b){if(e.isStartEditKey(a)){var c="number"==typeof a.which?a.which:a.keyCode;c>0&&(k.$setViewValue(String.fromCharCode(c),a),k.$render())}g()});f.on("mousedown",function(b){"checkbox"===f[0].type&&(f.off("blur",a.stopEdit),d(function(){f[0].focus(),f.on("blur",a.stopEdit)}))}),f.on("blur",a.stopEdit)}),a.deepEdit=!1,a.stopEdit=function(b){a.inputForm&&!a.inputForm.$valid?(b.stopPropagation(),a.$emit(c.events.CANCEL_CELL_EDIT)):a.$emit(c.events.END_CELL_EDIT),a.deepEdit=!1},f.on("click",function(b){"checkbox"!==f[0].type&&(a.deepEdit=!0,d(function(){a.grid.disableScrolling=!0}))}),f.on("keydown",function(d){switch(d.keyCode){case b.keymap.ESC:d.stopPropagation(),a.$emit(c.events.CANCEL_CELL_EDIT)}if(!a.deepEdit||d.keyCode!==b.keymap.LEFT&&d.keyCode!==b.keymap.RIGHT&&d.keyCode!==b.keymap.UP&&d.keyCode!==b.keymap.DOWN)if(i&&i.grid.api.cellNav)d.uiGridTargetRenderContainerId=j.containerId,null!==i.cellNav.handleKeyDown(d)&&a.stopEdit(d);else switch(d.keyCode){case b.keymap.ENTER:case b.keymap.TAB:d.stopPropagation(),d.preventDefault(),a.stopEdit(d)}else d.stopPropagation();return!0}),a.$on("$destroy",function(){f.off()})}}}}}]),a.directive("uiGridEditor",["$filter",function(a){function b(a){if("undefined"==typeof a||""===a)return null;var b=a.split("-");if(3!==b.length)return null;var c=parseInt(b[0],10),d=parseInt(b[1],10),e=parseInt(b[2],10);return 1>d||1>c||1>e?null:new Date(c,d-1,e)}return{priority:-100,require:"?ngModel",link:function(c,d,e,f){2===angular.version.minor&&e.type&&"date"===e.type&&f&&(f.$formatters.push(function(b){return f.$setValidity(null,!b||!isNaN(b.getTime())),a("date")(b,"yyyy-MM-dd")}),f.$parsers.push(function(a){if(a&&a.length>0){var c=b(a);return f.$setValidity(null,c&&!isNaN(c.getTime())),c}return f.$setValidity(null,!0),null}))}}}]),a.directive("uiGridEditDropdown",["uiGridConstants","uiGridEditConstants","$timeout",function(a,b,c){return{require:["?^uiGrid","?^uiGridRenderContainer"],scope:!0,compile:function(){return{pre:function(a,b,c){},post:function(d,e,f,g){var h=g[0],i=g[1];d.$on(b.events.BEGIN_CELL_EDIT,function(){c(function(){e[0].focus()}),e[0].style.width=e[0].parentElement.offsetWidth-1+"px",e.on("blur",function(a){d.stopEdit(a)})}),d.stopEdit=function(a){d.$emit(b.events.END_CELL_EDIT)},e.on("keydown",function(c){switch(c.keyCode){case a.keymap.ESC:c.stopPropagation(),d.$emit(b.events.CANCEL_CELL_EDIT)}if(h&&h.grid.api.cellNav)c.uiGridTargetRenderContainerId=i.containerId,null!==h.cellNav.handleKeyDown(c)&&d.stopEdit(c);else switch(c.keyCode){case a.keymap.ENTER:case a.keymap.TAB:c.stopPropagation(),c.preventDefault(),d.stopEdit(c)}return!0}),d.$on("$destroy",function(){e.off()})}}}}}]),a.directive("uiGridEditFileChooser",["gridUtil","uiGridConstants","uiGridEditConstants","$timeout",function(a,b,c,d){return{scope:!0,require:["?^uiGrid","?^uiGridRenderContainer"],compile:function(){return{pre:function(a,b,c){},post:function(b,d,e,f){var g,h;f[0]&&(g=f[0]),f[1]&&(h=f[1]);var i=(g.grid,function(d){var e=d.srcElement||d.target;e&&e.files&&e.files.length>0?("function"==typeof b.col.colDef.editFileChooserCallback?b.col.colDef.editFileChooserCallback(b.row,b.col,e.files):a.logError("You need to set colDef.editFileChooserCallback to use the file chooser"),e.form.reset(),b.$emit(c.events.END_CELL_EDIT)):b.$emit(c.events.CANCEL_CELL_EDIT)});d[0].addEventListener("change",i,!1),b.$on(c.events.BEGIN_CELL_EDIT,function(){d[0].focus(),d[0].select(),d.on("blur",function(a){b.$emit(c.events.END_CELL_EDIT)})}),b.$on("$destroy",function(){d.off(),d[0].removeEventListener("change",i,!1)})}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.emptyBaseLayer",["ui.grid"]);a.service("uiGridBaseLayerService",["gridUtil","$compile",function(a,b){var c={initializeGrid:function(a,b){a.baseLayer={emptyRows:[]},a.options.enableEmptyGridBaseLayer!==!1&&(a.options.enableEmptyGridBaseLayer=!b)},setNumberOfEmptyRows:function(a,b){var c=b.options.rowHeight,d=Math.ceil(a/c);if(d>0){b.baseLayer.emptyRows=[];for(var e=0;d>e;e++)b.baseLayer.emptyRows.push({})}}};return c}]),a.directive("uiGridEmptyBaseLayer",["gridUtil","uiGridBaseLayerService","$parse",function(a,b,c){return{require:"^uiGrid",scope:!1,compile:function(a,d){return{pre:function(a,d,e,f){var g=c(e.uiGridEmptyBaseLayer)(a)===!1;b.initializeGrid(f.grid,g)},post:function(a,c,d,e){function f(){var a=h.getViewportHeight();return a!==i?(i=a,!0):!1}function g(a){return".grid"+e.grid.id+" .ui-grid-render-container .ui-grid-empty-base-layer-container.ui-grid-canvas { height: "+a+"px; }"}if(e.grid.options.enableEmptyGridBaseLayer){var h=e.grid.renderContainers.body,i=h.getViewportHeight();e.grid.registerStyleComputation({func:function(){return f()&&b.setNumberOfEmptyRows(i,e.grid),g(i)}})}}}}}}]),a.directive("uiGridViewport",["$compile","gridUtil","$templateCache",function(a,b,c){return{priority:-200,scope:!1,compile:function(a,b){var d=c.get("ui-grid/emptyBaseLayerContainer");return a.prepend(d),{pre:function(a,b,c,d){},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.expandable",["ui.grid"]);a.service("uiGridExpandableService",["gridUtil","$compile",function(a,b){var c={initializeGrid:function(b){b.expandable={},b.expandable.expandedAll=!1,b.options.enableExpandable=b.options.enableExpandable!==!1,b.options.expandableRowHeight=b.options.expandableRowHeight||150,b.options.expandableRowHeaderWidth=b.options.expandableRowHeaderWidth||40,b.options.enableExpandable&&!b.options.expandableRowTemplate&&(a.logError("You have not set the expandableRowTemplate, disabling expandable module"),b.options.enableExpandable=!1);var d={events:{expandable:{rowExpandedBeforeStateChanged:function(a,b){},rowExpandedStateChanged:function(a,b){}}},methods:{expandable:{toggleRowExpansion:function(a){var d=b.getRow(a);null!==d&&c.toggleRowExpansion(b,d)},expandAllRows:function(){c.expandAllRows(b)},collapseAllRows:function(){c.collapseAllRows(b)},toggleAllRows:function(){c.toggleAllRows(b)},expandRow:function(a){var d=b.getRow(a);null===d||d.isExpanded||c.toggleRowExpansion(b,d)},collapseRow:function(a){var d=b.getRow(a);null!==d&&d.isExpanded&&c.toggleRowExpansion(b,d)},getExpandedRows:function(){return c.getExpandedRows(b).map(function(a){return a.entity})}}}};b.api.registerEventsFromObject(d.events),b.api.registerMethodsFromObject(d.methods)},toggleRowExpansion:function(a,b){a.api.expandable.raise.rowExpandedBeforeStateChanged(b),b.isExpanded=!b.isExpanded,angular.isUndefined(b.expandedRowHeight)&&(b.expandedRowHeight=a.options.expandableRowHeight),b.isExpanded?b.height=b.grid.options.rowHeight+b.expandedRowHeight:(b.height=b.grid.options.rowHeight,a.expandable.expandedAll=!1),a.api.expandable.raise.rowExpandedStateChanged(b)},expandAllRows:function(a,b){a.renderContainers.body.visibleRowCache.forEach(function(b){b.isExpanded||c.toggleRowExpansion(a,b)}),a.expandable.expandedAll=!0,a.queueGridRefresh()},collapseAllRows:function(a){a.renderContainers.body.visibleRowCache.forEach(function(b){b.isExpanded&&c.toggleRowExpansion(a,b)}),a.expandable.expandedAll=!1,a.queueGridRefresh()},toggleAllRows:function(a){a.expandable.expandedAll?c.collapseAllRows(a):c.expandAllRows(a)},getExpandedRows:function(a){return a.rows.filter(function(a){return a.isExpanded})}};return c}]),a.directive("uiGridExpandable",["uiGridExpandableService","$templateCache",function(a,b){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(c,d,e,f){if(a.initializeGrid(f.grid),f.grid.options.enableExpandable&&f.grid.options.enableExpandableRowHeader!==!1){var g={name:"expandableButtons",displayName:"",exporterSuppressExport:!0,enableColumnResizing:!1,enableColumnMenu:!1,width:f.grid.options.expandableRowHeaderWidth||40};g.cellTemplate=b.get("ui-grid/expandableRowHeader"),g.headerCellTemplate=b.get("ui-grid/expandableTopRowHeader"),f.grid.addRowHeaderColumn(g,-90)}},post:function(a,b,c,d){}}}}}]),a.directive("uiGrid",["uiGridExpandableService","$templateCache",function(a,b){return{replace:!0,priority:599,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,b,c,d){d.grid.api.core.on.renderingComplete(a,function(){a.row&&a.row.grid&&a.row.grid.options&&a.row.grid.options.enableExpandable&&(d.grid.parentRow=a.row)})},post:function(a,b,c,d){}}}}}]),a.directive("uiGridExpandableRow",["uiGridExpandableService","$timeout","$compile","uiGridConstants","gridUtil","$interval","$log",function(a,b,c,d,e,f,g){return{replace:!1,priority:0,scope:!1,compile:function(){return{pre:function(a,b,d,f){e.getTemplate(a.grid.options.expandableRowTemplate).then(function(d){if(a.grid.options.expandableRowScope){var e=a.grid.options.expandableRowScope;for(var f in e)e.hasOwnProperty(f)&&(a[f]=e[f])}var g=angular.element(d);b.append(g),g=c(g)(a),a.row.expandedRendered=!0})},post:function(a,b,c,d){a.$on("$destroy",function(){a.row.expandedRendered=!1})}}}}}]),a.directive("uiGridRow",["$compile","gridUtil","$templateCache",function(a,b,c){return{priority:-200,scope:!1,compile:function(a,b){return{pre:function(a,b,c,d){a.grid.options.enableExpandable&&(a.expandableRow={},a.expandableRow.shouldRenderExpand=function(){var b="body"===a.colContainer.name&&a.grid.options.enableExpandable!==!1&&a.row.isExpanded&&(!a.grid.isScrollingVertically||a.row.expandedRendered);return b},a.expandableRow.shouldRenderFiller=function(){var b=a.row.isExpanded&&("body"!==a.colContainer.name||a.grid.isScrollingVertically&&!a.row.expandedRendered);return b})},post:function(a,b,c,d){}}}}}]),a.directive("uiGridViewport",["$compile","gridUtil","$templateCache",function(a,b,c){return{priority:-200,scope:!1,compile:function(a,b){var d=angular.element(a.children().children()[0]),e=c.get("ui-grid/expandableScrollFiller"),f=c.get("ui-grid/expandableRow");return d.append(f),d.append(e),{pre:function(a,b,c,d){},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.exporter",["ui.grid"]);a.constant("uiGridExporterConstants",{featureName:"exporter",ALL:"all",VISIBLE:"visible",SELECTED:"selected",CSV_CONTENT:"CSV_CONTENT",BUTTON_LABEL:"BUTTON_LABEL",FILE_NAME:"FILE_NAME"}),a.service("uiGridExporterService",["$q","uiGridExporterConstants","gridUtil","$compile","$interval","i18nService",function(a,b,c,d,e,f){var g={delay:100,initializeGrid:function(a){a.exporter={},this.defaultGridOptions(a.options);var b={events:{exporter:{}},methods:{exporter:{csvExport:function(b,c){g.csvExport(a,b,c)},pdfExport:function(b,c){g.pdfExport(a,b,c)}}}};a.api.registerEventsFromObject(b.events),a.api.registerMethodsFromObject(b.methods),a.api.core.addToGridMenu?g.addToMenu(a):e(function(){a.api.core.addToGridMenu&&g.addToMenu(a)},this.delay,1)},defaultGridOptions:function(a){a.exporterSuppressMenu=a.exporterSuppressMenu===!0,a.exporterMenuLabel=a.exporterMenuLabel?a.exporterMenuLabel:"Export",a.exporterSuppressColumns=a.exporterSuppressColumns?a.exporterSuppressColumns:[],a.exporterCsvColumnSeparator=a.exporterCsvColumnSeparator?a.exporterCsvColumnSeparator:",",a.exporterCsvFilename=a.exporterCsvFilename?a.exporterCsvFilename:"download.csv",a.exporterPdfFilename=a.exporterPdfFilename?a.exporterPdfFilename:"download.pdf",a.exporterOlderExcelCompatibility=a.exporterOlderExcelCompatibility===!0,a.exporterIsExcelCompatible=a.exporterIsExcelCompatible===!0,a.exporterMenuItemOrder=a.exporterMenuItemOrder?a.exporterMenuItemOrder:200,a.exporterPdfDefaultStyle=a.exporterPdfDefaultStyle?a.exporterPdfDefaultStyle:{fontSize:11},a.exporterPdfTableStyle=a.exporterPdfTableStyle?a.exporterPdfTableStyle:{margin:[0,5,0,15]},a.exporterPdfTableHeaderStyle=a.exporterPdfTableHeaderStyle?a.exporterPdfTableHeaderStyle:{bold:!0,fontSize:12,color:"black"},a.exporterPdfHeader=a.exporterPdfHeader?a.exporterPdfHeader:null,a.exporterPdfFooter=a.exporterPdfFooter?a.exporterPdfFooter:null,a.exporterPdfOrientation=a.exporterPdfOrientation?a.exporterPdfOrientation:"landscape",a.exporterPdfPageSize=a.exporterPdfPageSize?a.exporterPdfPageSize:"A4",a.exporterPdfMaxGridWidth=a.exporterPdfMaxGridWidth?a.exporterPdfMaxGridWidth:720,a.exporterMenuAllData=void 0!==a.exporterMenuAllData?a.exporterMenuAllData:!0,a.exporterMenuVisibleData=void 0!==a.exporterMenuVisibleData?a.exporterMenuVisibleData:!0,a.exporterMenuSelectedData=void 0!==a.exporterMenuSelectedData?a.exporterMenuSelectedData:!0,a.exporterMenuCsv=void 0!==a.exporterMenuCsv?a.exporterMenuCsv:!0,a.exporterMenuPdf=void 0!==a.exporterMenuPdf?a.exporterMenuPdf:!0,a.exporterPdfCustomFormatter=a.exporterPdfCustomFormatter&&"function"==typeof a.exporterPdfCustomFormatter?a.exporterPdfCustomFormatter:function(a){return a},a.exporterHeaderFilterUseName=a.exporterHeaderFilterUseName===!0,a.exporterFieldCallback=a.exporterFieldCallback?a.exporterFieldCallback:function(a,b,c,d){return d},a.exporterAllDataFn=a.exporterAllDataFn?a.exporterAllDataFn:null,null==a.exporterAllDataFn&&a.exporterAllDataPromise&&(a.exporterAllDataFn=a.exporterAllDataPromise)},addToMenu:function(a){a.api.core.addToGridMenu(a,[{title:f.getSafeText("gridMenu.exporterAllAsCsv"),action:function(c){a.api.exporter.csvExport(b.ALL,b.ALL)},shown:function(){return a.options.exporterMenuCsv&&a.options.exporterMenuAllData},order:a.options.exporterMenuItemOrder},{title:f.getSafeText("gridMenu.exporterVisibleAsCsv"),action:function(c){a.api.exporter.csvExport(b.VISIBLE,b.VISIBLE)},shown:function(){return a.options.exporterMenuCsv&&a.options.exporterMenuVisibleData},order:a.options.exporterMenuItemOrder+1},{title:f.getSafeText("gridMenu.exporterSelectedAsCsv"),action:function(c){a.api.exporter.csvExport(b.SELECTED,b.VISIBLE)},shown:function(){return a.options.exporterMenuCsv&&a.options.exporterMenuSelectedData&&a.api.selection&&a.api.selection.getSelectedRows().length>0},order:a.options.exporterMenuItemOrder+2},{title:f.getSafeText("gridMenu.exporterAllAsPdf"),action:function(c){a.api.exporter.pdfExport(b.ALL,b.ALL)},shown:function(){return a.options.exporterMenuPdf&&a.options.exporterMenuAllData},order:a.options.exporterMenuItemOrder+3},{title:f.getSafeText("gridMenu.exporterVisibleAsPdf"),action:function(c){a.api.exporter.pdfExport(b.VISIBLE,b.VISIBLE)},shown:function(){return a.options.exporterMenuPdf&&a.options.exporterMenuVisibleData},order:a.options.exporterMenuItemOrder+4},{title:f.getSafeText("gridMenu.exporterSelectedAsPdf"),action:function(c){a.api.exporter.pdfExport(b.SELECTED,b.VISIBLE)},shown:function(){return a.options.exporterMenuPdf&&a.options.exporterMenuSelectedData&&a.api.selection&&a.api.selection.getSelectedRows().length>0},order:a.options.exporterMenuItemOrder+5}])},csvExport:function(a,b,c){var d=this;this.loadAllDataIfNeeded(a,b,c).then(function(){var e=a.options.showHeader?d.getColumnHeaders(a,c):[],f=d.getData(a,b,c),g=d.formatAsCsv(e,f,a.options.exporterCsvColumnSeparator);d.downloadFile(a.options.exporterCsvFilename,g,a.options.exporterCsvColumnSeparator,a.options.exporterOlderExcelCompatibility,a.options.exporterIsExcelCompatible)})},loadAllDataIfNeeded:function(c,d,e){if(d===b.ALL&&c.rows.length!==c.options.totalItems&&c.options.exporterAllDataFn)return c.options.exporterAllDataFn().then(function(){c.modifyRows(c.options.data)});var f=a.defer();return f.resolve(),f.promise},getColumnHeaders:function(a,c){var d,e=[];if(c===b.ALL)d=a.columns;else{var f=a.renderContainers.left?a.renderContainers.left.visibleColumnCache.filter(function(a){return a.visible}):[],g=a.renderContainers.body?a.renderContainers.body.visibleColumnCache.filter(function(a){return a.visible}):[],h=a.renderContainers.right?a.renderContainers.right.visibleColumnCache.filter(function(a){return a.visible}):[];d=f.concat(g,h)}return d.forEach(function(b,c){b.colDef.exporterSuppressExport!==!0&&-1===a.options.exporterSuppressColumns.indexOf(b.name)&&e.push({name:b.field,displayName:a.options.exporterHeaderFilter?a.options.exporterHeaderFilterUseName?a.options.exporterHeaderFilter(b.name):a.options.exporterHeaderFilter(b.displayName):b.displayName,width:b.drawnWidth?b.drawnWidth:b.width,align:"number"===b.colDef.type?"right":"left"})}),e},getData:function(a,d,e,f){var g,h,i=[];switch(d){case b.ALL:g=a.rows;break;case b.VISIBLE:g=a.getVisibleRows();break;case b.SELECTED:a.api.selection?g=a.api.selection.getSelectedGridRows():c.logError("selection feature must be enabled to allow selected rows to be exported")}if(e===b.ALL)h=a.columns;else{var j=a.renderContainers.left?a.renderContainers.left.visibleColumnCache.filter(function(a){return a.visible}):[],k=a.renderContainers.body?a.renderContainers.body.visibleColumnCache.filter(function(a){return a.visible}):[],l=a.renderContainers.right?a.renderContainers.right.visibleColumnCache.filter(function(a){return a.visible}):[];h=j.concat(k,l)}return g.forEach(function(c,d){if(c.exporterEnableExporting!==!1){var g=[];h.forEach(function(d,h){if((d.visible||e===b.ALL)&&d.colDef.exporterSuppressExport!==!0&&-1===a.options.exporterSuppressColumns.indexOf(d.name)){var i=f?a.getCellDisplayValue(c,d):a.getCellValue(c,d),j={value:a.options.exporterFieldCallback(a,c,d,i)};d.colDef.exporterPdfAlign&&(j.alignment=d.colDef.exporterPdfAlign),g.push(j)}}),i.push(g)}}),i},formatAsCsv:function(a,b,c){var d=this,e=a.map(function(a){return{value:a.displayName}}),f=e.length>0?d.formatRowAsCsv(this,c)(e)+"\n":"";return f+=b.map(this.formatRowAsCsv(this,c)).join("\n")},formatRowAsCsv:function(a,b){return function(c){return c.map(a.formatFieldAsCsv).join(b)}},formatFieldAsCsv:function(a){return null==a.value?"":"number"==typeof a.value?a.value:"boolean"==typeof a.value?a.value?"TRUE":"FALSE":"string"==typeof a.value?'"'+a.value.replace(/"/g,'""')+'"':JSON.stringify(a.value)},isIE:function(){var a=navigator.userAgent.search(/(?:Edge|MSIE|Trident\/.*; rv:)/),b=!1;return-1!==a&&(b=!0),b},downloadFile:function(a,b,c,d,e){var f,g=document,h=g.createElement("a"),i="application/octet-stream;charset=utf-8",j=this.isIE();if(e&&(b="sep="+c+"\r\n"+b),navigator.msSaveBlob)return navigator.msSaveOrOpenBlob(new Blob([d?"\ufeff":"",b],{type:i}),a);if(j){var k=g.createElement("iframe");return document.body.appendChild(k),k.contentWindow.document.open("text/html","replace"),k.contentWindow.document.write(b),k.contentWindow.document.close(),k.contentWindow.focus(),k.contentWindow.document.execCommand("SaveAs",!0,a),document.body.removeChild(k),!0}if("download"in h){var l=new Blob([d?"\ufeff":"",b],{type:i});f=URL.createObjectURL(l),h.setAttribute("download",a)}else f="data:"+i+","+encodeURIComponent(b),h.setAttribute("target","_blank");h.href=f,h.setAttribute("style","display:none;"),g.body.appendChild(h),setTimeout(function(){if(h.click)h.click();else if(document.createEvent){var a=document.createEvent("MouseEvents");a.initEvent("click",!0,!0),h.dispatchEvent(a)}g.body.removeChild(h)},this.delay)},pdfExport:function(a,b,c){var d=this;this.loadAllDataIfNeeded(a,b,c).then(function(){var e=d.getColumnHeaders(a,c),f=d.getData(a,b,c),g=d.prepareAsPdf(a,e,f);d.isIE()||-1!==navigator.appVersion.indexOf("Edge")?d.downloadPDF(a.options.exporterPdfFilename,g):pdfMake.createPdf(g).open()})},downloadPDF:function(a,b){var c,d=document;d.createElement("a");c=this.isIE();var e,f=pdfMake.createPdf(b);f.getBuffer(function(b){if(e=new Blob([b]),navigator.msSaveBlob)return navigator.msSaveBlob(e,a);if(c){var f=d.createElement("iframe");return document.body.appendChild(f),f.contentWindow.document.open("text/html","replace"),f.contentWindow.document.write(e),f.contentWindow.document.close(),f.contentWindow.focus(),f.contentWindow.document.execCommand("SaveAs",!0,a),document.body.removeChild(f),!0}})},prepareAsPdf:function(a,b,c){var d=this.calculatePdfHeaderWidths(a,b),e=b.map(function(a){return{text:a.displayName,style:"tableHeader"}}),f=c.map(this.formatRowAsPdf(this)),g=[e].concat(f),h={pageOrientation:a.options.exporterPdfOrientation,pageSize:a.options.exporterPdfPageSize,content:[{style:"tableStyle",table:{headerRows:1,widths:d,body:g}}],styles:{tableStyle:a.options.exporterPdfTableStyle,tableHeader:a.options.exporterPdfTableHeaderStyle},defaultStyle:a.options.exporterPdfDefaultStyle};return a.options.exporterPdfLayout&&(h.layout=a.options.exporterPdfLayout),a.options.exporterPdfHeader&&(h.header=a.options.exporterPdfHeader),a.options.exporterPdfFooter&&(h.footer=a.options.exporterPdfFooter),a.options.exporterPdfCustomFormatter&&(h=a.options.exporterPdfCustomFormatter(h)),h},calculatePdfHeaderWidths:function(a,b){var c=0;b.forEach(function(a){"number"==typeof a.width&&(c+=a.width)});var d=0;b.forEach(function(a){if("*"===a.width&&(d+=100),"string"==typeof a.width&&a.width.match(/(\d)*%/)){var b=parseInt(a.width.match(/(\d)*%/)[0]);a.width=c*b/100,d+=a.width}});var e=c+d;return b.map(function(b){return"*"===b.width?b.width:b.width*a.options.exporterPdfMaxGridWidth/e})},formatRowAsPdf:function(a){return function(b){return b.map(a.formatFieldAsPdfString)}},formatFieldAsPdfString:function(a){var b;return b=null==a.value?"":"number"==typeof a.value?a.value.toString():"boolean"==typeof a.value?a.value?"TRUE":"FALSE":"string"==typeof a.value?a.value.replace(/"/g,'""'):JSON.stringify(a.value).replace(/^"/,"").replace(/"$/,""),a.alignment&&"string"==typeof a.alignment&&(b={text:b,alignment:a.alignment}),b}};return g}]),a.directive("uiGridExporter",["uiGridExporterConstants","uiGridExporterService","gridUtil","$compile",function(a,b,c,d){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(a,c,d,e){b.initializeGrid(e.grid),e.grid.exporter.$scope=a}}}])}(),function(){"use strict";var a=angular.module("ui.grid.grouping",["ui.grid","ui.grid.treeBase"]);a.constant("uiGridGroupingConstants",{featureName:"grouping",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),a.service("uiGridGroupingService",["$q","uiGridGroupingConstants","gridUtil","rowSorter","GridRow","gridClassFactory","i18nService","uiGridConstants","uiGridTreeBaseService",function(a,b,c,d,e,f,g,h,i){var j={initializeGrid:function(a,b){i.initializeGrid(a,b),a.grouping={},a.grouping.groupHeaderCache={},j.defaultGridOptions(a.options),a.registerRowsProcessor(j.groupRows,400),a.registerColumnBuilder(j.groupingColumnBuilder),a.registerColumnsProcessor(j.groupingColumnProcessor,400);var c={events:{grouping:{aggregationChanged:{},groupingChanged:{}}},methods:{grouping:{getGrouping:function(b){var c=j.getGrouping(a);return c.grouping.forEach(function(a){a.colName=a.col.name,delete a.col}),c.aggregations.forEach(function(a){a.colName=a.col.name,delete a.col}),c.aggregations=c.aggregations.filter(function(a){return!a.aggregation.source||"grouping"!==a.aggregation.source}),b&&(c.rowExpandedStates=j.getRowExpandedStates(a.grouping.groupingHeaderCache)),c},setGrouping:function(b){j.setGrouping(a,b)},groupColumn:function(b){var c=a.getColumn(b);j.groupColumn(a,c)},ungroupColumn:function(b){var c=a.getColumn(b);j.ungroupColumn(a,c)},clearGrouping:function(){j.clearGrouping(a)},aggregateColumn:function(b,c,d){var e=a.getColumn(b);j.aggregateColumn(a,e,c,d)}}}};a.api.registerEventsFromObject(c.events),a.api.registerMethodsFromObject(c.methods),a.api.core.on.sortChanged(b,j.tidyPriorities)},defaultGridOptions:function(a){a.enableGrouping=a.enableGrouping!==!1,a.groupingShowCounts=a.groupingShowCounts!==!1,a.groupingNullLabel="undefined"==typeof a.groupingNullLabel?"Null":a.groupingNullLabel,a.enableGroupHeaderSelection=a.enableGroupHeaderSelection===!0},groupingColumnBuilder:function(a,d,e){if(a.enableGrouping!==!1){"undefined"==typeof d.grouping&&"undefined"!=typeof a.grouping?(d.grouping=angular.copy(a.grouping),"undefined"!=typeof d.grouping.groupPriority&&d.grouping.groupPriority>-1&&(d.treeAggregationFn=i.nativeAggregations()[b.aggregation.COUNT].aggregationFn,d.treeAggregationFinalizerFn=j.groupedFinalizerFn)):"undefined"==typeof d.grouping&&(d.grouping={}),"undefined"!=typeof d.grouping&&"undefined"!=typeof d.grouping.groupPriority&&d.grouping.groupPriority>=0&&(d.suppressRemoveSort=!0);var f={name:"ui.grid.grouping.group",title:g.get().grouping.group,icon:"ui-grid-icon-indent-right",shown:function(){return"undefined"==typeof this.context.col.grouping||"undefined"==typeof this.context.col.grouping.groupPriority||this.context.col.grouping.groupPriority<0},action:function(){j.groupColumn(this.context.col.grid,this.context.col)}},h={name:"ui.grid.grouping.ungroup",title:g.get().grouping.ungroup,icon:"ui-grid-icon-indent-left",shown:function(){return"undefined"!=typeof this.context.col.grouping&&"undefined"!=typeof this.context.col.grouping.groupPriority&&this.context.col.grouping.groupPriority>=0},action:function(){j.ungroupColumn(this.context.col.grid,this.context.col)}},k={name:"ui.grid.grouping.aggregateRemove",title:g.get().grouping.aggregate_remove,shown:function(){return"undefined"!=typeof this.context.col.treeAggregationFn},action:function(){j.aggregateColumn(this.context.col.grid,this.context.col,null)}},l=function(a,b){b=b||g.get().grouping["aggregate_"+a]||a;var e={name:"ui.grid.grouping.aggregate"+a,title:b,shown:function(){return"undefined"==typeof this.context.col.treeAggregation||"undefined"==typeof this.context.col.treeAggregation.type||this.context.col.treeAggregation.type!==a},action:function(){j.aggregateColumn(this.context.col.grid,this.context.col,a)}};c.arrayContainsObjectWithProperty(d.menuItems,"name","ui.grid.grouping.aggregate"+a)||d.menuItems.push(e)};d.colDef.groupingShowGroupingMenu!==!1&&(c.arrayContainsObjectWithProperty(d.menuItems,"name","ui.grid.grouping.group")||d.menuItems.push(f),c.arrayContainsObjectWithProperty(d.menuItems,"name","ui.grid.grouping.ungroup")||d.menuItems.push(h)),d.colDef.groupingShowAggregationMenu!==!1&&(angular.forEach(i.nativeAggregations(),function(a,b){l(b)}),angular.forEach(e.treeCustomAggregations,function(a,b){l(b,a.menuTitle)}),c.arrayContainsObjectWithProperty(d.menuItems,"name","ui.grid.grouping.aggregateRemove")||d.menuItems.push(k))}},groupingColumnProcessor:function(a,b){return a=j.moveGroupColumns(this,a,b)},groupedFinalizerFn:function(a){var b=this;"undefined"!=typeof a.groupVal?(a.rendered=a.groupVal,b.grid.options.groupingShowCounts&&"date"!==b.colDef.type&&"object"!==b.colDef.type&&(a.rendered+=" ("+a.value+")")):a.rendered=null},moveGroupColumns:function(a,b,c){return a.options.moveGroupColumns===!1?b:(b.forEach(function(a,b){a.groupingPosition=b}),b.sort(function(a,b){var c,d;return c=a.isRowHeader?a.headerPriority:"undefined"==typeof a.grouping||"undefined"==typeof a.grouping.groupPriority||a.grouping.groupPriority<0?null:a.grouping.groupPriority,d=b.isRowHeader?b.headerPriority:"undefined"==typeof b.grouping||"undefined"==typeof b.grouping.groupPriority||b.grouping.groupPriority<0?null:b.grouping.groupPriority,null!==c&&null===d?-1:null!==d&&null===c?1:null!==c&&null!==d?c-d:a.groupingPosition-b.groupingPosition}),b.forEach(function(a,b){delete a.groupingPosition}),b)},groupColumn:function(a,c){"undefined"==typeof c.grouping&&(c.grouping={});var d=j.getGrouping(a);c.grouping.groupPriority=d.grouping.length,c.previousSort=angular.copy(c.sort),c.sort?("undefined"==typeof c.sort.direction||null===c.sort.direction)&&(c.sort.direction=h.ASC):c.sort={direction:h.ASC},c.treeAggregation={type:b.aggregation.COUNT,source:"grouping"},c.treeAggregationFn=i.nativeAggregations()[b.aggregation.COUNT].aggregationFn,c.treeAggregationFinalizerFn=j.groupedFinalizerFn,a.api.grouping.raise.groupingChanged(c),a.api.core.raise.sortChanged(a,a.getColumnSorting()),a.queueGridRefresh()},ungroupColumn:function(a,b){"undefined"!=typeof b.grouping&&(delete b.grouping.groupPriority,delete b.treeAggregation,delete b.customTreeAggregationFinalizer,b.previousSort&&(b.sort=b.previousSort,delete b.previousSort),j.tidyPriorities(a),a.api.grouping.raise.groupingChanged(b),a.api.core.raise.sortChanged(a,a.getColumnSorting()),a.queueGridRefresh())},aggregateColumn:function(a,b,c){"undefined"!=typeof b.grouping&&"undefined"!=typeof b.grouping.groupPriority&&b.grouping.groupPriority>=0&&j.ungroupColumn(a,b);var d={};"undefined"!=typeof a.options.treeCustomAggregations[c]?d=a.options.treeCustomAggregations[c]:"undefined"!=typeof i.nativeAggregations()[c]&&(d=i.nativeAggregations()[c]),b.treeAggregation={type:c,label:g.get().aggregation[d.label]||d.label},b.treeAggregationFn=d.aggregationFn,b.treeAggregationFinalizerFn=d.finalizerFn,a.api.grouping.raise.aggregationChanged(b),a.queueGridRefresh()},setGrouping:function(a,b){"undefined"!=typeof b&&(j.clearGrouping(a),b.grouping&&b.grouping.length&&b.grouping.length>0&&b.grouping.forEach(function(b){var c=a.getColumn(b.colName);c&&j.groupColumn(a,c)}),b.aggregations&&b.aggregations.length&&b.aggregations.forEach(function(b){var c=a.getColumn(b.colName);c&&j.aggregateColumn(a,c,b.aggregation.type)}),b.rowExpandedStates&&j.applyRowExpandedStates(a.grouping.groupingHeaderCache,b.rowExpandedStates))},clearGrouping:function(a){var b=j.getGrouping(a);b.grouping.length>0&&b.grouping.forEach(function(b){b.col||(b.col=a.getColumn(b.colName)),j.ungroupColumn(a,b.col)}),b.aggregations.length>0&&b.aggregations.forEach(function(b){b.col||(b.col=a.getColumn(b.colName)),j.aggregateColumn(a,b.col,null)})},tidyPriorities:function(a){"undefined"!=typeof a&&"undefined"==typeof a.grid||"undefined"==typeof this.grid||(a=this.grid);var b=[],c=[];a.columns.forEach(function(a,d){"undefined"!=typeof a.grouping&&"undefined"!=typeof a.grouping.groupPriority&&a.grouping.groupPriority>=0?b.push(a):"undefined"!=typeof a.sort&&"undefined"!=typeof a.sort.priority&&a.sort.priority>=0&&c.push(a)}),b.sort(function(a,b){return a.grouping.groupPriority-b.grouping.groupPriority}),b.forEach(function(a,b){a.grouping.groupPriority=b,a.suppressRemoveSort=!0,"undefined"==typeof a.sort&&(a.sort={}),a.sort.priority=b});var d=b.length;c.sort(function(a,b){return a.sort.priority-b.sort.priority}),c.forEach(function(a,b){a.sort.priority=d,a.suppressRemoveSort=a.colDef.suppressRemoveSort,d++})},groupRows:function(a){if(0===a.length)return a;var b=this;b.grouping.oldGroupingHeaderCache=b.grouping.groupingHeaderCache||{},b.grouping.groupingHeaderCache={};for(var c=j.initialiseProcessingState(b),e=function(e,h){var i=b.getCellValue(g,e.col);e.initialised&&0===d.getSortFn(b,e.col,a)(i,e.currentValue)||(j.insertGroupHeader(b,a,f,c,h),f++)},f=0;f<a.length;f++){var g=a[f];g.visible&&c.forEach(e)}return delete b.grouping.oldGroupingHeaderCache,a},initialiseProcessingState:function(a){var b=[],c=j.getGrouping(a);return c.grouping.forEach(function(a,c){b.push({fieldName:a.field,col:a.col,initialised:!1,currentValue:null,currentRow:null})}),b},getGrouping:function(a){var b=[],c=[];return a.columns.forEach(function(a,d){a.grouping&&"undefined"!=typeof a.grouping.groupPriority&&a.grouping.groupPriority>=0&&b.push({
field:a.field,col:a,groupPriority:a.grouping.groupPriority,grouping:a.grouping}),a.treeAggregation&&a.treeAggregation.type&&c.push({field:a.field,col:a,aggregation:a.treeAggregation})}),b.sort(function(a,b){return a.groupPriority-b.groupPriority}),b.forEach(function(a,b){a.grouping.groupPriority=b,a.groupPriority=b,delete a.grouping}),{grouping:b,aggregations:c}},insertGroupHeader:function(a,b,c,d,g){var h=(d[g].fieldName,d[g].col),i=a.getCellValue(b[c],h),k=i;("undefined"==typeof i||null===i)&&(k=a.options.groupingNullLabel);for(var l=function(a){return angular.isObject(a)?JSON.stringify(a):a},m=a.grouping.oldGroupingHeaderCache,n=0;g>n;n++)m&&m[l(d[n].currentValue)]&&(m=m[l(d[n].currentValue)].children);var o;for(m&&m[l(i)]?(o=m[l(i)].row,o.entity={}):(o=new e({},null,a),f.rowTemplateAssigner.call(a,o)),o.entity["$$"+d[g].col.uid]={groupVal:k},o.treeLevel=g,o.groupHeader=!0,o.internalRow=!0,o.enableCellEdit=!1,o.enableSelection=a.options.enableGroupHeaderSelection,d[g].initialised=!0,d[g].currentValue=i,d[g].currentRow=o,j.finaliseProcessingState(d,g+1),b.splice(c,0,o),m=a.grouping.groupingHeaderCache,n=0;g>n;n++)m=m[l(d[n].currentValue)].children;m[l(i)]={row:o,children:{}}},finaliseProcessingState:function(a,b){for(var c=b;c<a.length;c++)a[c].initialised=!1,a[c].currentRow=null,a[c].currentValue=null},getRowExpandedStates:function(a){if("undefined"==typeof a)return{};var b={};return angular.forEach(a,function(a,c){b[c]={state:a.row.treeNode.state},a.children?b[c].children=j.getRowExpandedStates(a.children):b[c].children={}}),b},applyRowExpandedStates:function(a,b){"undefined"!=typeof b&&angular.forEach(b,function(b,c){a[c]&&(a[c].row.treeNode.state=b.state,b.children&&a[c].children&&j.applyRowExpandedStates(a[c].children,b.children))})}};return j}]),a.directive("uiGridGrouping",["uiGridGroupingConstants","uiGridGroupingService","$templateCache",function(a,b,c){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){e.grid.options.enableGrouping!==!1&&b.initializeGrid(e.grid,a)},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.importer",["ui.grid"]);a.constant("uiGridImporterConstants",{featureName:"importer"}),a.service("uiGridImporterService",["$q","uiGridConstants","uiGridImporterConstants","gridUtil","$compile","$interval","i18nService","$window",function(a,b,c,d,e,f,g,h){var i={initializeGrid:function(a,b){b.importer={$scope:a},this.defaultGridOptions(b.options);var c={events:{importer:{}},methods:{importer:{importFile:function(a){i.importThisFile(b,a)}}}};b.api.registerEventsFromObject(c.events),b.api.registerMethodsFromObject(c.methods),b.options.enableImporter&&b.options.importerShowMenu&&(b.api.core.addToGridMenu?i.addToMenu(b):f(function(){b.api.core.addToGridMenu&&i.addToMenu(b)},100,1))},defaultGridOptions:function(a){a.enableImporter||void 0===a.enableImporter?h.hasOwnProperty("File")&&h.hasOwnProperty("FileReader")&&h.hasOwnProperty("FileList")&&h.hasOwnProperty("Blob")?a.enableImporter=!0:(d.logError("The File APIs are not fully supported in this browser, grid importer cannot be used."),a.enableImporter=!1):a.enableImporter=!1,a.importerProcessHeaders=a.importerProcessHeaders||i.processHeaders,a.importerHeaderFilter=a.importerHeaderFilter||function(a){return a},a.importerErrorCallback&&"function"==typeof a.importerErrorCallback||delete a.importerErrorCallback,a.enableImporter!==!0||a.importerDataAddCallback||(d.logError("You have not set an importerDataAddCallback, importer is disabled"),a.enableImporter=!1),a.importerShowMenu=a.importerShowMenu!==!1,a.importerObjectCallback=a.importerObjectCallback||function(a,b){return b}},addToMenu:function(a){a.api.core.addToGridMenu(a,[{title:g.getSafeText("gridMenu.importerTitle"),order:150},{templateUrl:"ui-grid/importerMenuItemContainer",action:function(b){this.grid.api.importer.importAFile(a)},order:151}])},importThisFile:function(a,b){if(!b)return void d.logError("No file object provided to importThisFile, should be impossible, aborting");var c=new FileReader;switch(b.type){case"application/json":c.onload=i.importJsonClosure(a);break;default:c.onload=i.importCsvClosure(a)}c.readAsText(b)},importJsonClosure:function(a){return function(b){var c,d=[],e=i.parseJson(a,b);null!==e&&(e.forEach(function(b,e){c=i.newObject(a),angular.extend(c,b),c=a.options.importerObjectCallback(a,c),d.push(c)}),i.addObjects(a,d))}},parseJson:function(a,b){var c;try{c=JSON.parse(b.target.result)}catch(d){return void i.alertError(a,"importer.invalidJson","File could not be processed, is it valid json? Content was: ",b.target.result)}return Array.isArray(c)?c:(i.alertError(a,"importer.jsonNotarray","Import failed, file is not an array, file was: ",b.target.result),[])},importCsvClosure:function(a){return function(b){var c=i.parseCsv(b);if(!c||c.length<1)return void i.alertError(a,"importer.invalidCsv","File could not be processed, is it valid csv? Content was: ",b.target.result);var d=i.createCsvObjects(a,c);return d&&0!==d.length?void i.addObjects(a,d):void i.alertError(a,"importer.noObjects","Objects were not able to be derived, content was: ",b.target.result)}},parseCsv:function(a){var b=a.target.result;return CSV.parse(b)},createCsvObjects:function(a,b){var c=a.options.importerProcessHeaders(a,b.shift());if(!c||0===c.length)return i.alertError(a,"importer.noHeaders","Column names could not be derived, content was: ",b),[];var d,e=[];return b.forEach(function(b,f){d=i.newObject(a),null!==b&&b.forEach(function(a,b){null!==c[b]&&(d[c[b]]=a)}),d=a.options.importerObjectCallback(a,d),e.push(d)}),e},processHeaders:function(a,b){var c=[];if(a.options.columnDefs&&0!==a.options.columnDefs.length){var d=i.flattenColumnDefs(a,a.options.columnDefs);return b.forEach(function(a,b){d[a]?c.push(d[a]):d[a.toLowerCase()]?c.push(d[a.toLowerCase()]):c.push(null)}),c}return b.forEach(function(a,b){c.push(a.replace(/[^0-9a-zA-Z\-_]/g,"_"))}),c},flattenColumnDefs:function(a,b){var c={};return b.forEach(function(b,d){b.name&&(c[b.name]=b.field||b.name,c[b.name.toLowerCase()]=b.field||b.name),b.field&&(c[b.field]=b.field||b.name,c[b.field.toLowerCase()]=b.field||b.name),b.displayName&&(c[b.displayName]=b.field||b.name,c[b.displayName.toLowerCase()]=b.field||b.name),b.displayName&&a.options.importerHeaderFilter&&(c[a.options.importerHeaderFilter(b.displayName)]=b.field||b.name,c[a.options.importerHeaderFilter(b.displayName).toLowerCase()]=b.field||b.name)}),c},addObjects:function(a,c,d){if(a.api.rowEdit){var e=a.registerDataChangeCallback(function(){a.api.rowEdit.setRowsDirty(c),e()},[b.dataChange.ROW]);a.importer.$scope.$on("$destroy",e)}a.importer.$scope.$apply(a.options.importerDataAddCallback(a,c))},newObject:function(a){return"undefined"!=typeof a.options&&"undefined"!=typeof a.options.importerNewObject?new a.options.importerNewObject:{}},alertError:function(a,b,c,e){a.options.importerErrorCallback?a.options.importerErrorCallback(a,b,c,e):(h.alert(g.getSafeText(b)),d.logError(c+e))}};return i}]),a.directive("uiGridImporter",["uiGridImporterConstants","uiGridImporterService","gridUtil","$compile",function(a,b,c,d){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(a,c,d,e){b.initializeGrid(a,e.grid)}}}]),a.directive("uiGridImporterMenuItem",["uiGridImporterConstants","uiGridImporterService","gridUtil","$compile",function(a,b,c,d){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,templateUrl:"ui-grid/importerMenuItem",link:function(a,d,e,f){var g=function(a){var c=a.srcElement||a.target;if(c&&c.files&&1===c.files.length){var d=c.files[0];b.importThisFile(i,d),c.form.reset()}},h=d[0].querySelectorAll(".ui-grid-importer-file-chooser"),i=f.grid;1!==h.length?c.logError("Found > 1 or < 1 file choosers within the menu item, error, cannot continue"):h[0].addEventListener("change",g,!1)}}}])}(),function(){"use strict";var a=angular.module("ui.grid.infiniteScroll",["ui.grid"]);a.service("uiGridInfiniteScrollService",["gridUtil","$compile","$timeout","uiGridConstants","ScrollEvent","$q",function(a,b,c,d,e,f){var g={initializeGrid:function(a,b){if(g.defaultGridOptions(a.options),a.options.enableInfiniteScroll){a.infiniteScroll={dataLoading:!1},g.setScrollDirections(a,a.options.infiniteScrollUp,a.options.infiniteScrollDown),a.api.core.on.scrollEnd(b,g.handleScroll);var c={events:{infiniteScroll:{needLoadMoreData:function(a,b){},needLoadMoreDataTop:function(a,b){}}},methods:{infiniteScroll:{dataLoaded:function(b,c){g.setScrollDirections(a,b,c);var d=g.adjustScroll(a).then(function(){a.infiniteScroll.dataLoading=!1});return d},resetScroll:function(b,c){g.setScrollDirections(a,b,c),g.adjustInfiniteScrollPosition(a,0)},saveScrollPercentage:function(){a.infiniteScroll.prevScrollTop=a.renderContainers.body.prevScrollTop,a.infiniteScroll.previousVisibleRows=a.getVisibleRowCount()},dataRemovedTop:function(b,c){g.dataRemovedTop(a,b,c)},dataRemovedBottom:function(b,c){g.dataRemovedBottom(a,b,c)},setScrollDirections:function(b,c){g.setScrollDirections(a,b,c)}}}};a.api.registerEventsFromObject(c.events),a.api.registerMethodsFromObject(c.methods)}},defaultGridOptions:function(a){a.enableInfiniteScroll=a.enableInfiniteScroll!==!1,a.infiniteScrollRowsFromEnd=a.infiniteScrollRowsFromEnd||20,a.infiniteScrollUp=a.infiniteScrollUp===!0,a.infiniteScrollDown=a.infiniteScrollDown!==!1},setScrollDirections:function(a,b,c){a.infiniteScroll.scrollUp=b===!0,a.suppressParentScrollUp=b===!0,a.infiniteScroll.scrollDown=c!==!1,a.suppressParentScrollDown=c!==!1},handleScroll:function(a){if(!(a.grid.infiniteScroll&&a.grid.infiniteScroll.dataLoading||"ui.grid.adjustInfiniteScrollPosition"===a.source)&&a.y)if(0===a.y.percentage)a.grid.scrollDirection=d.scrollDirection.UP,g.loadData(a.grid);else if(1===a.y.percentage)a.grid.scrollDirection=d.scrollDirection.DOWN,g.loadData(a.grid);else{var b,c=a.grid.options.infiniteScrollRowsFromEnd/a.grid.renderContainers.body.visibleRowCache.length;a.grid.scrollDirection===d.scrollDirection.UP?(b=a.y.percentage,c>=b&&g.loadData(a.grid)):a.grid.scrollDirection===d.scrollDirection.DOWN&&(b=1-a.y.percentage,c>=b&&g.loadData(a.grid))}},loadData:function(a){a.infiniteScroll.previousVisibleRows=a.renderContainers.body.visibleRowCache.length,a.infiniteScroll.direction=a.scrollDirection,delete a.infiniteScroll.prevScrollTop,a.scrollDirection===d.scrollDirection.UP&&a.infiniteScroll.scrollUp?(a.infiniteScroll.dataLoading=!0,a.api.infiniteScroll.raise.needLoadMoreDataTop()):a.scrollDirection===d.scrollDirection.DOWN&&a.infiniteScroll.scrollDown&&(a.infiniteScroll.dataLoading=!0,a.api.infiniteScroll.raise.needLoadMoreData())},adjustScroll:function(a){var b=f.defer();return c(function(){var e,f,h,i,j;e=a.getViewportHeight()+a.headerHeight-a.renderContainers.body.headerHeight-a.scrollbarHeight,f=a.options.rowHeight,void 0===a.infiniteScroll.direction&&g.adjustInfiniteScrollPosition(a,0),h=a.getVisibleRowCount();var k=f*h;a.infiniteScroll.scrollDown&&e>k&&a.api.infiniteScroll.raise.needLoadMoreData(),a.infiniteScroll.direction===d.scrollDirection.UP&&(i=a.infiniteScroll.prevScrollTop||0,j=i+(h-a.infiniteScroll.previousVisibleRows)*f,g.adjustInfiniteScrollPosition(a,j),c(function(){b.resolve()})),a.infiniteScroll.direction===d.scrollDirection.DOWN&&(j=a.infiniteScroll.prevScrollTop||a.infiniteScroll.previousVisibleRows*f-e,g.adjustInfiniteScrollPosition(a,j),c(function(){b.resolve()}))},0),b.promise},adjustInfiniteScrollPosition:function(a,b){var c=new e(a,null,null,"ui.grid.adjustInfiniteScrollPosition"),d=a.getVisibleRowCount(),f=a.getViewportHeight()+a.headerHeight-a.renderContainers.body.headerHeight-a.scrollbarHeight,g=a.options.rowHeight,h=d*g-f;0===b&&a.infiniteScroll.scrollUp?c.y={percentage:1/h}:c.y={percentage:b/h},a.scrollContainers("",c)},dataRemovedTop:function(a,b,c){var d,e,f,h;g.setScrollDirections(a,b,c),d=a.renderContainers.body.visibleRowCache.length,e=a.infiniteScroll.prevScrollTop,h=a.options.rowHeight,f=e-(a.infiniteScroll.previousVisibleRows-d)*h,g.adjustInfiniteScrollPosition(a,f)},dataRemovedBottom:function(a,b,c){var d;g.setScrollDirections(a,b,c),d=a.infiniteScroll.prevScrollTop,g.adjustInfiniteScrollPosition(a,d)}};return g}]),a.directive("uiGridInfiniteScroll",["uiGridInfiniteScrollService",function(a){return{priority:-200,scope:!1,require:"^uiGrid",compile:function(b,c,d){return{pre:function(b,c,d,e){a.initializeGrid(e.grid,b)},post:function(a,b,c){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.moveColumns",["ui.grid"]);a.service("uiGridMoveColumnService",["$q","$timeout","$log","ScrollEvent","uiGridConstants","gridUtil",function(a,b,c,d,e,f){var g={initializeGrid:function(a){var b=this;this.registerPublicApi(a),this.defaultGridOptions(a.options),a.moveColumns={orderCache:[]},a.registerColumnBuilder(b.movableColumnBuilder),a.registerDataChangeCallback(b.verifyColumnOrder,[e.dataChange.COLUMN])},registerPublicApi:function(a){var b=this,c={events:{colMovable:{columnPositionChanged:function(a,b,c){}}},methods:{colMovable:{moveColumn:function(c,d){var e=a.columns;if(!angular.isNumber(c)||!angular.isNumber(d))return void f.logError("MoveColumn: Please provide valid values for originalPosition and finalPosition");for(var g=0,h=0;h<e.length;h++)(angular.isDefined(e[h].colDef.visible)&&e[h].colDef.visible===!1||e[h].isRowHeader===!0)&&g++;if(c>=e.length-g||d>=e.length-g)return void f.logError("MoveColumn: Invalid values for originalPosition, finalPosition");var i=function(a){for(var b=a,c=0;b>=c;c++)angular.isDefined(e[c])&&(angular.isDefined(e[c].colDef.visible)&&e[c].colDef.visible===!1||e[c].isRowHeader===!0)&&b++;return b};b.redrawColumnAtPosition(a,i(c),i(d))}}}};a.api.registerEventsFromObject(c.events),a.api.registerMethodsFromObject(c.methods)},defaultGridOptions:function(a){a.enableColumnMoving=a.enableColumnMoving!==!1},movableColumnBuilder:function(b,c,d){var e=[];return b.enableColumnMoving=void 0===b.enableColumnMoving?d.enableColumnMoving:b.enableColumnMoving,a.all(e)},updateColumnCache:function(a){a.moveColumns.orderCache=a.getOnlyDataColumns()},verifyColumnOrder:function(a){var b,c=a.rowHeaderColumns.length;angular.forEach(a.moveColumns.orderCache,function(d,e){if(b=a.columns.indexOf(d),-1!==b&&b-c!==e){var f=a.columns.splice(b,1)[0];a.columns.splice(e+c,0,f)}})},redrawColumnAtPosition:function(a,c,d){var f=a.columns;if(c!==d){var h=d>c?c+1:c-1,i=Math.min(h,d);for(i;i<=Math.max(h,d)&&!f[i].visible;i++);if(!(i>Math.max(h,d))){var j=f[c];if(j.colDef.enableColumnMoving){if(c>d)for(var k=c;k>d;k--)f[k]=f[k-1];else if(d>c)for(var l=c;d>l;l++)f[l]=f[l+1];f[d]=j,g.updateColumnCache(a),a.queueGridRefresh(),b(function(){a.api.core.notifyDataChange(e.dataChange.COLUMN),a.api.colMovable.raise.columnPositionChanged(j.colDef,c,d)})}}}}};return g}]),a.directive("uiGridMoveColumns",["uiGridMoveColumnService",function(a){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(b,c,d,e){a.initializeGrid(e.grid)},post:function(a,b,c,d){}}}}}]),a.directive("uiGridHeaderCell",["$q","gridUtil","uiGridMoveColumnService","$document","$log","uiGridConstants","ScrollEvent",function(a,b,c,d,e,f,g){return{priority:-10,require:"^uiGrid",compile:function(){return{post:function(a,b,e,f){if(a.col.colDef.enableColumnMoving){var h,i,j,k,l,m,n=angular.element(b[0].querySelectorAll(".ui-grid-cell-contents")),o=!1,p=!1,q=function(b){h=a.grid.element[0].getBoundingClientRect().left,a.grid.hasLeftContainer()&&(h+=a.grid.renderContainers.left.header[0].getBoundingClientRect().width),i=b.pageX||(b.originalEvent?b.originalEvent.pageX:0),j=0,k=h+a.grid.getViewportWidth(),"mousedown"===b.type?(d.on("mousemove",r),d.on("mouseup",s)):"touchstart"===b.type&&(d.on("touchmove",r),d.on("touchend",s))},r=function(a){var b=a.pageX||(a.originalEvent?a.originalEvent.pageX:0),c=b-i;0!==c&&(document.onselectstart=function(){return!1},p=!0,o?o&&(w(c),i=b):v())},s=function(b){if(document.onselectstart=null,l&&(l.remove(),o=!1),u(),t(),p){for(var d=a.grid.columns,e=0,f=0;f<d.length&&d[f].colDef.name!==a.col.colDef.name;f++)e++;var g;if(0>j){var h,i=0;if(a.grid.isRTL()){for(h=e+1;h<d.length;h++)if((angular.isUndefined(d[h].colDef.visible)||d[h].colDef.visible===!0)&&(i+=d[h].drawnWidth||d[h].width||d[h].colDef.width,i>Math.abs(j))){c.redrawColumnAtPosition(a.grid,e,h-1);break}}else for(h=e-1;h>=0;h--)if((angular.isUndefined(d[h].colDef.visible)||d[h].colDef.visible===!0)&&(i+=d[h].drawnWidth||d[h].width||d[h].colDef.width,i>Math.abs(j))){c.redrawColumnAtPosition(a.grid,e,h+1);break}i<Math.abs(j)&&(g=0,a.grid.isRTL()&&(g=d.length-1),c.redrawColumnAtPosition(a.grid,e,g))}else if(j>0){var k,m=0;if(a.grid.isRTL()){for(k=e-1;k>0;k--)if((angular.isUndefined(d[k].colDef.visible)||d[k].colDef.visible===!0)&&(m+=d[k].drawnWidth||d[k].width||d[k].colDef.width,m>j)){c.redrawColumnAtPosition(a.grid,e,k);break}}else for(k=e+1;k<d.length;k++)if((angular.isUndefined(d[k].colDef.visible)||d[k].colDef.visible===!0)&&(m+=d[k].drawnWidth||d[k].width||d[k].colDef.width,m>j)){c.redrawColumnAtPosition(a.grid,e,k-1);break}j>m&&(g=d.length-1,a.grid.isRTL()&&(g=0),c.redrawColumnAtPosition(a.grid,e,g))}}},t=function(){n.on("touchstart",q),n.on("mousedown",q)},u=function(){n.off("touchstart",q),n.off("mousedown",q),d.off("mousemove",r),d.off("touchmove",r),d.off("mouseup",s),d.off("touchend",s)};t();var v=function(){o=!0,l=b.clone(),b.parent().append(l),l.addClass("movingColumn");var c={};c.left=b[0].offsetLeft+"px";var d=a.grid.element[0].getBoundingClientRect().right,e=b[0].getBoundingClientRect().right;e>d&&(m=a.col.drawnWidth+(d-e),c.width=m+"px"),l.css(c)},w=function(b){for(var c=a.grid.columns,d=0,e=0;e<c.length;e++)(angular.isUndefined(c[e].colDef.visible)||c[e].colDef.visible===!0)&&(d+=c[e].drawnWidth||c[e].width||c[e].colDef.width);var i,n=l[0].getBoundingClientRect().left-1,o=l[0].getBoundingClientRect().right;if(i=n-h+b,i=k>i?i:k,(n>=h||b>0)&&(k>=o||0>b))l.css({visibility:"visible",left:l[0].offsetLeft+(k>i?b:k-n)+"px"});else if(d>Math.ceil(f.grid.gridWidth)){b*=8;var p=new g(a.col.grid,null,null,"uiGridHeaderCell.moveElement");p.x={pixels:b},p.grid.scrollContainers("",p)}for(var q=0,r=0;r<c.length;r++)if(angular.isUndefined(c[r].colDef.visible)||c[r].colDef.visible===!0){if(c[r].colDef.name===a.col.colDef.name)break;q+=c[r].drawnWidth||c[r].width||c[r].colDef.width}void 0===a.newScrollLeft?j+=b:j=a.newScrollLeft+i-q,m<a.col.drawnWidth&&(m+=Math.abs(b),l.css({width:m+"px"}))};a.$on("$destroy",u)}}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.pagination",["ng","ui.grid"]);a.service("uiGridPaginationService",["gridUtil",function(a){var b={initializeGrid:function(a){b.defaultGridOptions(a.options);var c={events:{pagination:{paginationChanged:function(a,b){}}},methods:{pagination:{getPage:function(){return a.options.enablePagination?a.options.paginationCurrentPage:null},getFirstRowIndex:function(){return a.options.useCustomPagination?a.options.paginationPageSizes.reduce(function(b,c,d){return d<a.options.paginationCurrentPage-1?b+c:b},0):(a.options.paginationCurrentPage-1)*a.options.paginationPageSize},getLastRowIndex:function(){return a.options.useCustomPagination?c.methods.pagination.getFirstRowIndex()+a.options.paginationPageSizes[a.options.paginationCurrentPage-1]-1:Math.min(a.options.paginationCurrentPage*a.options.paginationPageSize,a.options.totalItems)-1},getTotalPages:function(){return a.options.enablePagination?a.options.useCustomPagination?a.options.paginationPageSizes.length:0===a.options.totalItems?1:Math.ceil(a.options.totalItems/a.options.paginationPageSize):null},nextPage:function(){a.options.enablePagination&&(a.options.totalItems>0?a.options.paginationCurrentPage=Math.min(a.options.paginationCurrentPage+1,c.methods.pagination.getTotalPages()):a.options.paginationCurrentPage++)},previousPage:function(){a.options.enablePagination&&(a.options.paginationCurrentPage=Math.max(a.options.paginationCurrentPage-1,1))},seek:function(b){if(a.options.enablePagination){if(!angular.isNumber(b)||1>b)throw"Invalid page number: "+b;a.options.paginationCurrentPage=Math.min(b,c.methods.pagination.getTotalPages())}}}}};a.api.registerEventsFromObject(c.events),a.api.registerMethodsFromObject(c.methods);var d=function(b){if(a.options.useExternalPagination||!a.options.enablePagination)return b;var d=parseInt(a.options.paginationPageSize,10),e=parseInt(a.options.paginationCurrentPage,10),f=b.filter(function(a){return a.visible});a.options.totalItems=f.length;var g=c.methods.pagination.getFirstRowIndex(),h=c.methods.pagination.getLastRowIndex();return g>f.length&&(e=a.options.paginationCurrentPage=1,g=(e-1)*d),f.slice(g,h+1)};a.registerRowsProcessor(d,900)},defaultGridOptions:function(b){b.enablePagination=b.enablePagination!==!1,b.enablePaginationControls=b.enablePaginationControls!==!1,b.useExternalPagination=b.useExternalPagination===!0,b.useCustomPagination=b.useCustomPagination===!0,a.isNullOrUndefined(b.totalItems)&&(b.totalItems=0),a.isNullOrUndefined(b.paginationPageSizes)&&(b.paginationPageSizes=[250,500,1e3]),a.isNullOrUndefined(b.paginationPageSize)&&(b.paginationPageSizes.length>0?b.paginationPageSize=b.paginationPageSizes[0]:b.paginationPageSize=0),a.isNullOrUndefined(b.paginationCurrentPage)&&(b.paginationCurrentPage=1),a.isNullOrUndefined(b.paginationTemplate)&&(b.paginationTemplate="ui-grid/pagination")},onPaginationChanged:function(a,b,c){a.api.pagination.raise.paginationChanged(b,c),a.options.useExternalPagination||a.queueGridRefresh()}};return b}]),a.directive("uiGridPagination",["gridUtil","uiGridPaginationService",function(a,b){return{priority:-200,scope:!1,require:"uiGrid",link:{pre:function(c,d,e,f){b.initializeGrid(f.grid),a.getTemplate(f.grid.options.paginationTemplate).then(function(a){var b=angular.element(a);d.append(b),f.innerCompile(b)})}}}}]),a.directive("uiGridPager",["uiGridPaginationService","uiGridConstants","gridUtil","i18nService",function(a,b,c,d){return{priority:-200,scope:!0,require:"^uiGrid",link:function(e,f,g,h){var i=".ui-grid-pager-control-input";e.aria=d.getSafeText("pagination.aria"),e.paginationApi=h.grid.api.pagination,e.sizesLabel=d.getSafeText("pagination.sizes"),e.totalItemsLabel=d.getSafeText("pagination.totalItems"),e.paginationOf=d.getSafeText("pagination.of"),e.paginationThrough=d.getSafeText("pagination.through");var j=h.grid.options;h.grid.renderContainers.body.registerViewportAdjuster(function(a){return a.height=a.height-c.elementHeight(f,"padding"),a});var k=h.grid.registerDataChangeCallback(function(a){a.options.useExternalPagination||(a.options.totalItems=a.rows.length)},[b.dataChange.ROW]);e.$on("$destroy",k);var l=e.$watch("grid.options.paginationCurrentPage + grid.options.paginationPageSize",function(b,c){return b!==c&&void 0!==c?!angular.isNumber(j.paginationCurrentPage)||j.paginationCurrentPage<1?void(j.paginationCurrentPage=1):j.totalItems>0&&j.paginationCurrentPage>e.paginationApi.getTotalPages()?void(j.paginationCurrentPage=e.paginationApi.getTotalPages()):void a.onPaginationChanged(e.grid,j.paginationCurrentPage,j.paginationPageSize):void 0});e.$on("$destroy",function(){l()}),e.cantPageForward=function(){return e.paginationApi.getTotalPages()?e.cantPageToLast():j.data.length<1},e.cantPageToLast=function(){var a=e.paginationApi.getTotalPages();return!a||j.paginationCurrentPage>=a},e.cantPageBackward=function(){return j.paginationCurrentPage<=1};var m=function(a){a&&c.focus.bySelector(f,i)};e.pageFirstPageClick=function(){e.paginationApi.seek(1),m(e.cantPageBackward())},e.pagePreviousPageClick=function(){e.paginationApi.previousPage(),m(e.cantPageBackward())},e.pageNextPageClick=function(){e.paginationApi.nextPage(),m(e.cantPageForward())},e.pageLastPageClick=function(){e.paginationApi.seek(e.paginationApi.getTotalPages()),m(e.cantPageToLast())}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.pinning",["ui.grid"]);a.constant("uiGridPinningConstants",{container:{LEFT:"left",RIGHT:"right",NONE:""}}),a.service("uiGridPinningService",["gridUtil","GridRenderContainer","i18nService","uiGridPinningConstants",function(a,b,c,d){var e={initializeGrid:function(a){e.defaultGridOptions(a.options),a.registerColumnBuilder(e.pinningColumnBuilder);var b={events:{pinning:{columnPinned:function(a,b){}}},methods:{pinning:{pinColumn:function(b,c){e.pinColumn(a,b,c)}}}};a.api.registerEventsFromObject(b.events),a.api.registerMethodsFromObject(b.methods)},defaultGridOptions:function(a){a.enablePinning=a.enablePinning!==!1},pinningColumnBuilder:function(b,f,g){if(b.enablePinning=void 0===b.enablePinning?g.enablePinning:b.enablePinning,b.pinnedLeft?(f.renderContainer="left",f.grid.createLeftContainer()):b.pinnedRight&&(f.renderContainer="right",f.grid.createRightContainer()),b.enablePinning){var h={name:"ui.grid.pinning.pinLeft",title:c.get().pinning.pinLeft,icon:"ui-grid-icon-left-open",shown:function(){return"undefined"==typeof this.context.col.renderContainer||!this.context.col.renderContainer||"left"!==this.context.col.renderContainer},action:function(){e.pinColumn(this.context.col.grid,this.context.col,d.container.LEFT)}},i={name:"ui.grid.pinning.pinRight",title:c.get().pinning.pinRight,icon:"ui-grid-icon-right-open",shown:function(){return"undefined"==typeof this.context.col.renderContainer||!this.context.col.renderContainer||"right"!==this.context.col.renderContainer},action:function(){e.pinColumn(this.context.col.grid,this.context.col,d.container.RIGHT)}},j={name:"ui.grid.pinning.unpin",title:c.get().pinning.unpin,icon:"ui-grid-icon-cancel",shown:function(){return"undefined"!=typeof this.context.col.renderContainer&&null!==this.context.col.renderContainer&&"body"!==this.context.col.renderContainer},action:function(){e.pinColumn(this.context.col.grid,this.context.col,d.container.NONE)}};a.arrayContainsObjectWithProperty(f.menuItems,"name","ui.grid.pinning.pinLeft")||f.menuItems.push(h),a.arrayContainsObjectWithProperty(f.menuItems,"name","ui.grid.pinning.pinRight")||f.menuItems.push(i),a.arrayContainsObjectWithProperty(f.menuItems,"name","ui.grid.pinning.unpin")||f.menuItems.push(j)}},pinColumn:function(a,b,c){c===d.container.NONE?(b.renderContainer=null,b.colDef.pinnedLeft=b.colDef.pinnedRight=!1):(b.renderContainer=c,c===d.container.LEFT?a.createLeftContainer():c===d.container.RIGHT&&a.createRightContainer()),a.refresh().then(function(){a.api.pinning.raise.columnPinned(b.colDef,c)})}};return e}]),a.directive("uiGridPinning",["gridUtil","uiGridPinningService",function(a,b){return{require:"uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(e.grid)},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.resizeColumns",["ui.grid"]);a.service("uiGridResizeColumnsService",["gridUtil","$q","$timeout",function(a,b,c){var d={defaultGridOptions:function(a){a.enableColumnResizing=a.enableColumnResizing!==!1,a.enableColumnResize===!1&&(a.enableColumnResizing=!1)},colResizerColumnBuilder:function(a,c,d){var e=[];return a.enableColumnResizing=void 0===a.enableColumnResizing?d.enableColumnResizing:a.enableColumnResizing,a.enableColumnResize===!1&&(a.enableColumnResizing=!1),b.all(e)},registerPublicApi:function(a){var b={events:{colResizable:{columnSizeChanged:function(a,b){}}}};a.api.registerEventsFromObject(b.events)},fireColumnSizeChanged:function(b,d,e){c(function(){b.api.colResizable?b.api.colResizable.raise.columnSizeChanged(d,e):a.logError("The resizeable api is not registered, this may indicate that you've included the module but not added the 'ui-grid-resize-columns' directive to your grid definition.  Cannot raise any events.")})},findTargetCol:function(a,b,c){var d=a.getRenderContainer();if("left"===b){var e=d.visibleColumnCache.indexOf(a);return d.visibleColumnCache[e-1*c]}return a}};return d}]),a.directive("uiGridResizeColumns",["gridUtil","uiGridResizeColumnsService",function(a,b){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.defaultGridOptions(e.grid.options),e.grid.registerColumnBuilder(b.colResizerColumnBuilder),b.registerPublicApi(e.grid)},post:function(a,b,c,d){}}}}}]),a.directive("uiGridHeaderCell",["gridUtil","$templateCache","$compile","$q","uiGridResizeColumnsService","uiGridConstants","$timeout",function(a,b,c,d,e,f,g){return{priority:-10,require:"^uiGrid",compile:function(){return{post:function(a,d,h,i){var j=i.grid;if(j.options.enableColumnResizing){var k=b.get("ui-grid/columnResizer"),l=1;j.isRTL()&&(a.position="left",l=-1);var m=function(){for(var b=d[0].getElementsByClassName("ui-grid-column-resizer"),f=0;f<b.length;f++)angular.element(b[f]).remove();var g=e.findTargetCol(a.col,"left",l),h=a.col.getRenderContainer();if(g&&0!==h.visibleColumnCache.indexOf(a.col)&&g.colDef.enableColumnResizing!==!1){var i=angular.element(k).clone();i.attr("position","left"),d.prepend(i),c(i)(a)}if(a.col.colDef.enableColumnResizing!==!1){var j=angular.element(k).clone();j.attr("position","right"),d.append(j),c(j)(a)}};m();var n=function(){g(m)},o=j.registerDataChangeCallback(n,[f.dataChange.COLUMN]);a.$on("$destroy",o)}}}}}}]),a.directive("uiGridColumnResizer",["$document","gridUtil","uiGridConstants","uiGridResizeColumnsService",function(a,b,c,d){var e=angular.element('<div class="ui-grid-resize-overlay"></div>'),f={priority:0,scope:{col:"=",position:"@",renderIndex:"="},require:"?^uiGrid",link:function(f,g,h,i){function j(a){i.grid.refreshCanvas(!0).then(function(){i.grid.queueGridRefresh()})}function k(a,b){var c=b;return a.minWidth&&c<a.minWidth?c=a.minWidth:a.maxWidth&&c>a.maxWidth&&(c=a.maxWidth),c}function l(a,b){a.originalEvent&&(a=a.originalEvent),a.preventDefault(),o=(a.targetTouches?a.targetTouches[0]:a).clientX-p,0>o?o=0:o>i.grid.gridWidth&&(o=i.grid.gridWidth);var g=d.findTargetCol(f.col,f.position,q);if(g.colDef.enableColumnResizing!==!1){i.grid.element.hasClass("column-resizing")||i.grid.element.addClass("column-resizing");var h=o-n,j=parseInt(g.drawnWidth+h*q,10);o+=(k(g,j)-j)*q,e.css({left:o+"px"}),i.fireEvent(c.events.ITEM_DRAGGING)}}function m(a,b){a.originalEvent&&(a=a.originalEvent),a.preventDefault(),i.grid.element.removeClass("column-resizing"),e.remove(),o=(a.changedTouches?a.changedTouches[0]:a).clientX-p;var c=o-n;if(0===c)return t(),void s();var g=d.findTargetCol(f.col,f.position,q);if(g.colDef.enableColumnResizing!==!1){var h=parseInt(g.drawnWidth+c*q,10);g.width=k(g,h),g.hasCustomWidth=!0,j(c),d.fireColumnSizeChanged(i.grid,g.colDef,c),t(),s()}}var n=0,o=0,p=0,q=1;i.grid.isRTL()&&(f.position="left",q=-1),"left"===f.position?g.addClass("left"):"right"===f.position&&g.addClass("right");var r=function(b,c){b.originalEvent&&(b=b.originalEvent),b.stopPropagation(),p=i.grid.element[0].getBoundingClientRect().left,n=(b.targetTouches?b.targetTouches[0]:b).clientX-p,i.grid.element.append(e),e.css({left:n}),"touchstart"===b.type?(a.on("touchend",m),a.on("touchmove",l),g.off("mousedown",r)):(a.on("mouseup",m),a.on("mousemove",l),g.off("touchstart",r))},s=function(){g.on("mousedown",r),g.on("touchstart",r)},t=function(){a.off("mouseup",m),a.off("touchend",m),a.off("mousemove",l),a.off("touchmove",l),g.off("mousedown",r),g.off("touchstart",r)};s();var u=function(a,e){a.stopPropagation();var h=d.findTargetCol(f.col,f.position,q);if(h.colDef.enableColumnResizing!==!1){var l=0,m=0,n=b.closestElm(g,".ui-grid-render-container"),o=n.querySelectorAll("."+c.COL_CLASS_PREFIX+h.uid+" .ui-grid-cell-contents");Array.prototype.forEach.call(o,function(a){var c;angular.element(a).parent().hasClass("ui-grid-header-cell")&&(c=angular.element(a).parent()[0].querySelectorAll(".ui-grid-column-menu-button")),b.fakeElement(a,{},function(a){var d=angular.element(a);d.attr("style","float: left");var e=b.elementWidth(d);if(c){var f=b.elementWidth(c);e+=f}e>l&&(l=e,m=l-e)})}),h.width=k(h,l),h.hasCustomWidth=!0,j(m),d.fireColumnSizeChanged(i.grid,h.colDef,m)}};g.on("dblclick",u),g.on("$destroy",function(){g.off("dblclick",u),t()})}};return f}])}(),function(){"use strict";var a=angular.module("ui.grid.rowEdit",["ui.grid","ui.grid.edit","ui.grid.cellNav"]);
a.constant("uiGridRowEditConstants",{}),a.service("uiGridRowEditService",["$interval","$q","uiGridConstants","uiGridRowEditConstants","gridUtil",function(a,b,c,d,e){var f={initializeGrid:function(a,b){b.rowEdit={};var c={events:{rowEdit:{saveRow:function(a){}}},methods:{rowEdit:{setSavePromise:function(a,c){f.setSavePromise(b,a,c)},getDirtyRows:function(){return b.rowEdit.dirtyRows?b.rowEdit.dirtyRows:[]},getErrorRows:function(){return b.rowEdit.errorRows?b.rowEdit.errorRows:[]},flushDirtyRows:function(){return f.flushDirtyRows(b)},setRowsDirty:function(a){f.setRowsDirty(b,a)},setRowsClean:function(a){f.setRowsClean(b,a)}}}};b.api.registerEventsFromObject(c.events),b.api.registerMethodsFromObject(c.methods),b.api.core.on.renderingComplete(a,function(c){b.api.edit.on.afterCellEdit(a,f.endEditCell),b.api.edit.on.beginCellEdit(a,f.beginEditCell),b.api.edit.on.cancelCellEdit(a,f.cancelEditCell),b.api.cellNav&&b.api.cellNav.on.navigate(a,f.navigate)})},defaultGridOptions:function(a){},saveRow:function(a,b){var c=this;return function(){if(b.isSaving=!0,b.rowEditSavePromise)return b.rowEditSavePromise;var d=a.api.rowEdit.raise.saveRow(b.entity);return b.rowEditSavePromise?b.rowEditSavePromise.then(c.processSuccessPromise(a,b),c.processErrorPromise(a,b)):e.logError("A promise was not returned when saveRow event was raised, either nobody is listening to event, or event handler did not return a promise"),d}},setSavePromise:function(a,b,c){var d=a.getRow(b);d.rowEditSavePromise=c},processSuccessPromise:function(a,b){var c=this;return function(){delete b.isSaving,delete b.isDirty,delete b.isError,delete b.rowEditSaveTimer,delete b.rowEditSavePromise,c.removeRow(a.rowEdit.errorRows,b),c.removeRow(a.rowEdit.dirtyRows,b)}},processErrorPromise:function(a,b){return function(){delete b.isSaving,delete b.rowEditSaveTimer,delete b.rowEditSavePromise,b.isError=!0,a.rowEdit.errorRows||(a.rowEdit.errorRows=[]),f.isRowPresent(a.rowEdit.errorRows,b)||a.rowEdit.errorRows.push(b)}},removeRow:function(a,b){"undefined"!=typeof a&&null!==a&&a.forEach(function(c,d){c.uid===b.uid&&a.splice(d,1)})},isRowPresent:function(a,b){var c=!1;return a.forEach(function(a,d){a.uid===b.uid&&(c=!0)}),c},flushDirtyRows:function(a){var c=[];return a.api.rowEdit.getDirtyRows().forEach(function(b){f.cancelTimer(a,b),f.saveRow(a,b)(),c.push(b.rowEditSavePromise)}),b.all(c)},endEditCell:function(a,b,c,d){var g=this.grid,h=g.getRow(a);return h?void((c!==d||h.isDirty)&&(g.rowEdit.dirtyRows||(g.rowEdit.dirtyRows=[]),h.isDirty||(h.isDirty=!0,g.rowEdit.dirtyRows.push(h)),delete h.isError,f.considerSetTimer(g,h))):void e.logError("Unable to find rowEntity in grid data, dirty flag cannot be set")},beginEditCell:function(a,b){var c=this.grid,d=c.getRow(a);return d?void f.cancelTimer(c,d):void e.logError("Unable to find rowEntity in grid data, timer cannot be cancelled")},cancelEditCell:function(a,b){var c=this.grid,d=c.getRow(a);return d?void f.considerSetTimer(c,d):void e.logError("Unable to find rowEntity in grid data, timer cannot be set")},navigate:function(a,b){var c=this.grid;a.row.rowEditSaveTimer&&f.cancelTimer(c,a.row),b&&b.row&&b.row!==a.row&&f.considerSetTimer(c,b.row)},considerSetTimer:function(b,c){if(f.cancelTimer(b,c),c.isDirty&&!c.isSaving&&-1!==b.options.rowEditWaitInterval){var d=b.options.rowEditWaitInterval?b.options.rowEditWaitInterval:2e3;c.rowEditSaveTimer=a(f.saveRow(b,c),d,1)}},cancelTimer:function(b,c){c.rowEditSaveTimer&&!c.isSaving&&(a.cancel(c.rowEditSaveTimer),delete c.rowEditSaveTimer)},setRowsDirty:function(a,b){var c;b.forEach(function(b,d){c=a.getRow(b),c?(a.rowEdit.dirtyRows||(a.rowEdit.dirtyRows=[]),c.isDirty||(c.isDirty=!0,a.rowEdit.dirtyRows.push(c)),delete c.isError,f.considerSetTimer(a,c)):e.logError("requested row not found in rowEdit.setRowsDirty, row was: "+b)})},setRowsClean:function(a,b){var c;b.forEach(function(b,d){c=a.getRow(b),c?(delete c.isDirty,f.removeRow(a.rowEdit.dirtyRows,c),f.cancelTimer(a,c),delete c.isError,f.removeRow(a.rowEdit.errorRows,c)):e.logError("requested row not found in rowEdit.setRowsClean, row was: "+b)})}};return f}]),a.directive("uiGridRowEdit",["gridUtil","uiGridRowEditService","uiGridEditConstants",function(a,b,c){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(a,e.grid)},post:function(a,b,c,d){}}}}}]),a.directive("uiGridViewport",["$compile","uiGridConstants","gridUtil","$parse",function(a,b,c,d){return{priority:-200,scope:!1,compile:function(a,b){var c=angular.element(a.children().children()[0]),d=c.attr("ng-class"),e="";return e=d?d.slice(0,-1)+", 'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}":"{'ui-grid-row-dirty': row.isDirty, 'ui-grid-row-saving': row.isSaving, 'ui-grid-row-error': row.isError}",c.attr("ng-class",e),{pre:function(a,b,c,d){},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.saveState",["ui.grid","ui.grid.selection","ui.grid.cellNav","ui.grid.grouping","ui.grid.pinning","ui.grid.treeView"]);a.constant("uiGridSaveStateConstants",{featureName:"saveState"}),a.service("uiGridSaveStateService",["$q","uiGridSaveStateConstants","gridUtil","$compile","$interval","uiGridConstants",function(a,b,c,d,e,f){var g={initializeGrid:function(a){a.saveState={},this.defaultGridOptions(a.options);var b={events:{saveState:{}},methods:{saveState:{save:function(){return g.save(a)},restore:function(b,c){return g.restore(a,b,c)}}}};a.api.registerEventsFromObject(b.events),a.api.registerMethodsFromObject(b.methods)},defaultGridOptions:function(a){a.saveWidths=a.saveWidths!==!1,a.saveOrder=a.saveOrder!==!1,a.saveScroll=a.saveScroll===!0,a.saveFocus=a.saveScroll!==!0&&a.saveFocus!==!1,a.saveVisible=a.saveVisible!==!1,a.saveSort=a.saveSort!==!1,a.saveFilter=a.saveFilter!==!1,a.saveSelection=a.saveSelection!==!1,a.saveGrouping=a.saveGrouping!==!1,a.saveGroupingExpandedStates=a.saveGroupingExpandedStates===!0,a.savePinning=a.savePinning!==!1,a.saveTreeView=a.saveTreeView!==!1},save:function(a){var b={};return b.columns=g.saveColumns(a),b.scrollFocus=g.saveScrollFocus(a),b.selection=g.saveSelection(a),b.grouping=g.saveGrouping(a),b.treeView=g.saveTreeView(a),b.pagination=g.savePagination(a),b},restore:function(a,b,c){return c.columns&&g.restoreColumns(a,c.columns),c.scrollFocus&&g.restoreScrollFocus(a,b,c.scrollFocus),c.selection&&g.restoreSelection(a,c.selection),c.grouping&&g.restoreGrouping(a,c.grouping),c.treeView&&g.restoreTreeView(a,c.treeView),c.pagination&&g.restorePagination(a,c.pagination),a.refresh()},saveColumns:function(a){var b=[];return a.getOnlyDataColumns().forEach(function(c){var d={};d.name=c.name,a.options.saveVisible&&(d.visible=c.visible),a.options.saveWidths&&(d.width=c.width),a.options.saveSort&&(d.sort=angular.copy(c.sort)),a.options.saveFilter&&(d.filters=[],c.filters.forEach(function(a){var b={};angular.forEach(a,function(a,c){"condition"!==c&&"$$hashKey"!==c&&"placeholder"!==c&&(b[c]=a)}),d.filters.push(b)})),a.api.pinning&&a.options.savePinning&&(d.pinned=c.renderContainer?c.renderContainer:""),b.push(d)}),b},saveScrollFocus:function(a){if(!a.api.cellNav)return{};var b={};if(a.options.saveFocus){b.focus=!0;var c=a.api.cellNav.getFocusedCell();null!==c&&(null!==c.col&&(b.colName=c.col.colDef.name),null!==c.row&&(b.rowVal=g.getRowVal(a,c.row)))}return(a.options.saveScroll||a.options.saveFocus&&!b.colName&&!b.rowVal)&&(b.focus=!1,a.renderContainers.body.prevRowScrollIndex&&(b.rowVal=g.getRowVal(a,a.renderContainers.body.visibleRowCache[a.renderContainers.body.prevRowScrollIndex])),a.renderContainers.body.prevColScrollIndex&&(b.colName=a.renderContainers.body.visibleColumnCache[a.renderContainers.body.prevColScrollIndex].name)),b},saveSelection:function(a){if(!a.api.selection||!a.options.saveSelection)return[];var b=a.api.selection.getSelectedGridRows().map(function(b){return g.getRowVal(a,b)});return b},saveGrouping:function(a){return a.api.grouping&&a.options.saveGrouping?a.api.grouping.getGrouping(a.options.saveGroupingExpandedStates):{}},savePagination:function(a){return a.api.pagination&&a.options.paginationPageSize?{paginationCurrentPage:a.options.paginationCurrentPage,paginationPageSize:a.options.paginationPageSize}:{}},saveTreeView:function(a){return a.api.treeView&&a.options.saveTreeView?a.api.treeView.getTreeView():{}},getRowVal:function(a,b){if(!b)return null;var c={};return a.options.saveRowIdentity?(c.identity=!0,c.row=a.options.saveRowIdentity(b.entity)):(c.identity=!1,c.row=a.renderContainers.body.visibleRowCache.indexOf(b)),c},restoreColumns:function(a,b){var c=!1;b.forEach(function(b,d){var e=a.getColumn(b.name);if(e&&!a.isRowHeaderColumn(e)){!a.options.saveVisible||e.visible===b.visible&&e.colDef.visible===b.visible||(e.visible=b.visible,e.colDef.visible=b.visible,a.api.core.raise.columnVisibilityChanged(e)),a.options.saveWidths&&e.width!==b.width&&(e.width=b.width,e.hasCustomWidth=!0),!a.options.saveSort||angular.equals(e.sort,b.sort)||void 0===e.sort&&angular.isEmpty(b.sort)||(e.sort=angular.copy(b.sort),c=!0),a.options.saveFilter&&!angular.equals(e.filters,b.filters)&&(b.filters.forEach(function(a,b){angular.extend(e.filters[b],a),("undefined"==typeof a.term||null===a.term)&&delete e.filters[b].term}),a.api.core.raise.filterChanged()),a.api.pinning&&a.options.savePinning&&e.renderContainer!==b.pinned&&a.api.pinning.pinColumn(e,b.pinned);var f=a.getOnlyDataColumns().indexOf(e);if(-1!==f&&a.options.saveOrder&&f!==d){var g=a.columns.splice(f+a.rowHeaderColumns.length,1)[0];a.columns.splice(d+a.rowHeaderColumns.length,0,g)}}}),c&&a.api.core.raise.sortChanged(a,a.getColumnSorting())},restoreScrollFocus:function(a,b,c){if(a.api.cellNav){var d,e;if(c.colName){var f=a.options.columnDefs.filter(function(a){return a.name===c.colName});f.length>0&&(d=f[0])}c.rowVal&&c.rowVal.row&&(e=c.rowVal.identity?g.findRowByIdentity(a,c.rowVal):a.renderContainers.body.visibleRowCache[c.rowVal.row]);var h=e&&e.entity?e.entity:null;(d||h)&&(c.focus?a.api.cellNav.scrollToFocus(h,d):a.scrollTo(h,d))}},restoreSelection:function(a,b){a.api.selection&&(a.api.selection.clearSelectedRows(),b.forEach(function(b){if(b.identity){var c=g.findRowByIdentity(a,b);c&&a.api.selection.selectRow(c.entity)}else a.api.selection.selectRowByVisibleIndex(b.row)}))},restoreGrouping:function(a,b){a.api.grouping&&"undefined"!=typeof b&&null!==b&&!angular.equals(b,{})&&a.api.grouping.setGrouping(b)},restoreTreeView:function(a,b){a.api.treeView&&"undefined"!=typeof b&&null!==b&&!angular.equals(b,{})&&a.api.treeView.setTreeView(b)},restorePagination:function(a,b){a.api.pagination&&a.options.paginationPageSize&&(a.options.paginationCurrentPage=b.paginationCurrentPage,a.options.paginationPageSize=b.paginationPageSize)},findRowByIdentity:function(a,b){if(!a.options.saveRowIdentity)return null;var c=a.rows.filter(function(c){return a.options.saveRowIdentity(c.entity)===b.row?!0:!1});return c.length>0?c[0]:null}};return g}]),a.directive("uiGridSaveState",["uiGridSaveStateConstants","uiGridSaveStateService","gridUtil","$compile",function(a,b,c,d){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,link:function(a,c,d,e){b.initializeGrid(e.grid)}}}])}(),function(){"use strict";var a=angular.module("ui.grid.selection",["ui.grid"]);a.constant("uiGridSelectionConstants",{featureName:"selection",selectionRowHeaderColName:"selectionRowHeaderCol"}),angular.module("ui.grid").config(["$provide",function(a){a.decorator("GridRow",["$delegate",function(a){return a.prototype.setSelected=function(a){a!==this.isSelected&&(this.isSelected=a,this.grid.selection.selectedCount+=a?1:-1)},a}])}]),a.service("uiGridSelectionService",["$q","$templateCache","uiGridSelectionConstants","gridUtil",function(a,b,c,d){var e={initializeGrid:function(a){a.selection={},a.selection.lastSelectedRow=null,a.selection.selectAll=!1,a.selection.selectedCount=0,e.defaultGridOptions(a.options);var b={events:{selection:{rowSelectionChanged:function(a,b,c){},rowSelectionChangedBatch:function(a,b,c){}}},methods:{selection:{toggleRowSelection:function(b,c){var d=a.getRow(b);null!==d&&e.toggleRowSelection(a,d,c,a.options.multiSelect,a.options.noUnselect)},selectRow:function(b,c){var d=a.getRow(b);null===d||d.isSelected||e.toggleRowSelection(a,d,c,a.options.multiSelect,a.options.noUnselect)},selectRowByVisibleIndex:function(b,c){var d=a.renderContainers.body.visibleRowCache[b];null===d||"undefined"==typeof d||d.isSelected||e.toggleRowSelection(a,d,c,a.options.multiSelect,a.options.noUnselect)},unSelectRow:function(b,c){var d=a.getRow(b);null!==d&&d.isSelected&&e.toggleRowSelection(a,d,c,a.options.multiSelect,a.options.noUnselect)},selectAllRows:function(b){if(a.options.multiSelect!==!1){var c=[];a.rows.forEach(function(d){d.isSelected||d.enableSelection===!1||(d.setSelected(!0),e.decideRaiseSelectionEvent(a,d,c,b))}),e.decideRaiseSelectionBatchEvent(a,c,b),a.selection.selectAll=!0}},selectAllVisibleRows:function(b){if(a.options.multiSelect!==!1){var c=[];a.rows.forEach(function(d){d.visible?d.isSelected||d.enableSelection===!1||(d.setSelected(!0),e.decideRaiseSelectionEvent(a,d,c,b)):d.isSelected&&(d.setSelected(!1),e.decideRaiseSelectionEvent(a,d,c,b))}),e.decideRaiseSelectionBatchEvent(a,c,b),a.selection.selectAll=!0}},clearSelectedRows:function(b){e.clearSelectedRows(a,b)},getSelectedRows:function(){return e.getSelectedRows(a).map(function(a){return a.entity})},getSelectedGridRows:function(){return e.getSelectedRows(a)},getSelectedCount:function(){return a.selection.selectedCount},setMultiSelect:function(b){a.options.multiSelect=b},setModifierKeysToMultiSelect:function(b){a.options.modifierKeysToMultiSelect=b},getSelectAllState:function(){return a.selection.selectAll}}}};a.api.registerEventsFromObject(b.events),a.api.registerMethodsFromObject(b.methods)},defaultGridOptions:function(a){a.enableRowSelection=a.enableRowSelection!==!1,a.multiSelect=a.multiSelect!==!1,a.noUnselect=a.noUnselect===!0,a.modifierKeysToMultiSelect=a.modifierKeysToMultiSelect===!0,a.enableRowHeaderSelection=a.enableRowHeaderSelection!==!1,"undefined"==typeof a.enableFullRowSelection&&(a.enableFullRowSelection=!a.enableRowHeaderSelection),a.enableSelectAll=a.enableSelectAll!==!1,a.enableSelectionBatchEvent=a.enableSelectionBatchEvent!==!1,a.selectionRowHeaderWidth=angular.isDefined(a.selectionRowHeaderWidth)?a.selectionRowHeaderWidth:30,a.enableFooterTotalSelected=a.enableFooterTotalSelected!==!1,a.isRowSelectable=angular.isDefined(a.isRowSelectable)?a.isRowSelectable:angular.noop},toggleRowSelection:function(a,b,c,d,f){var g=b.isSelected;if(b.enableSelection!==!1||g){var h;d||g?!d&&g&&(h=e.getSelectedRows(a),h.length>1&&(g=!1,e.clearSelectedRows(a,c))):e.clearSelectedRows(a,c),g&&f||(b.setSelected(!g),b.isSelected===!0&&(a.selection.lastSelectedRow=b),h=e.getSelectedRows(a),a.selection.selectAll=a.rows.length===h.length,a.api.selection.raise.rowSelectionChanged(b,c))}},shiftSelect:function(a,b,c,d){if(d){var f=e.getSelectedRows(a),g=f.length>0?a.renderContainers.body.visibleRowCache.indexOf(a.selection.lastSelectedRow):0,h=a.renderContainers.body.visibleRowCache.indexOf(b);if(g>h){var i=g;g=h,h=i}for(var j=[],k=g;h>=k;k++){var l=a.renderContainers.body.visibleRowCache[k];l&&(l.isSelected||l.enableSelection===!1||(l.setSelected(!0),a.selection.lastSelectedRow=l,e.decideRaiseSelectionEvent(a,l,j,c)))}e.decideRaiseSelectionBatchEvent(a,j,c)}},getSelectedRows:function(a){return a.rows.filter(function(a){return a.isSelected})},clearSelectedRows:function(a,b){var c=[];e.getSelectedRows(a).forEach(function(d){d.isSelected&&(d.setSelected(!1),e.decideRaiseSelectionEvent(a,d,c,b))}),e.decideRaiseSelectionBatchEvent(a,c,b),a.selection.selectAll=!1,a.selection.selectedCount=0},decideRaiseSelectionEvent:function(a,b,c,d){a.options.enableSelectionBatchEvent?c.push(b):a.api.selection.raise.rowSelectionChanged(b,d)},decideRaiseSelectionBatchEvent:function(a,b,c){b.length>0&&a.api.selection.raise.rowSelectionChangedBatch(b,c)}};return e}]),a.directive("uiGridSelection",["uiGridSelectionConstants","uiGridSelectionService","$templateCache","uiGridConstants",function(a,b,c,d){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(c,e,f,g){if(b.initializeGrid(g.grid),g.grid.options.enableRowHeaderSelection){var h={name:a.selectionRowHeaderColName,displayName:"",width:g.grid.options.selectionRowHeaderWidth,minWidth:10,cellTemplate:"ui-grid/selectionRowHeader",headerCellTemplate:"ui-grid/selectionHeaderCell",enableColumnResizing:!1,enableColumnMenu:!1,exporterSuppressExport:!0,allowCellFocus:!0};g.grid.addRowHeaderColumn(h,0)}var i=!1,j=function(a){return a.forEach(function(a){a.enableSelection=g.grid.options.isRowSelectable(a)}),a},k=function(){g.grid.options.isRowSelectable!==angular.noop&&i!==!0&&(g.grid.registerRowsProcessor(j,500),i=!0)};k();var l=g.grid.registerDataChangeCallback(k,[d.dataChange.OPTIONS]);c.$on("$destroy",l)},post:function(a,b,c,d){}}}}}]),a.directive("uiGridSelectionRowHeaderButtons",["$templateCache","uiGridSelectionService","gridUtil",function(a,b,c){return{replace:!0,restrict:"E",template:a.get("ui-grid/selectionRowHeaderButtons"),scope:!0,require:"^uiGrid",link:function(a,d,e,f){function g(a,c){if(c.stopPropagation(),c.shiftKey)b.shiftSelect(i,a,c,i.options.multiSelect);else if(c.ctrlKey||c.metaKey)b.toggleRowSelection(i,a,c,i.options.multiSelect,i.options.noUnselect);else if(a.groupHeader)for(var d=0;d<a.treeNode.children.length;d++)b.toggleRowSelection(i,a.treeNode.children[d].row,c,i.options.multiSelect,i.options.noUnselect);else b.toggleRowSelection(i,a,c,i.options.multiSelect&&!i.options.modifierKeysToMultiSelect,i.options.noUnselect)}function h(a){(a.ctrlKey||a.shiftKey)&&(a.target.onselectstart=function(){return!1},window.setTimeout(function(){a.target.onselectstart=null},0))}var i=f.grid;a.selectButtonClick=g,"ie"===c.detectBrowser()&&d.on("mousedown",h),a.$on("$destroy",function(){d.off()})}}}]),a.directive("uiGridSelectionSelectAllButtons",["$templateCache","uiGridSelectionService",function(a,b){return{replace:!0,restrict:"E",template:a.get("ui-grid/selectionSelectAllButtons"),scope:!1,link:function(a,c,d,e){var f=a.col.grid;a.headerButtonClick=function(a,c){f.selection.selectAll?(b.clearSelectedRows(f,c),f.options.noUnselect&&f.api.selection.selectRowByVisibleIndex(0,c),f.selection.selectAll=!1):f.options.multiSelect&&(f.api.selection.selectAllVisibleRows(c),f.selection.selectAll=!0)}}}}]),a.directive("uiGridViewport",["$compile","uiGridConstants","uiGridSelectionConstants","gridUtil","$parse","uiGridSelectionService",function(a,b,c,d,e,f){return{priority:-200,scope:!1,compile:function(a,b){var c=angular.element(a.children().children()[0]),d=c.attr("ng-class"),e="";return e=d?d.slice(0,-1)+",'ui-grid-row-selected': row.isSelected}":"{'ui-grid-row-selected': row.isSelected}",c.attr("ng-class",e),{pre:function(a,b,c,d){},post:function(a,b,c,d){}}}}}]),a.directive("uiGridCell",["$compile","uiGridConstants","uiGridSelectionConstants","gridUtil","$parse","uiGridSelectionService","$timeout",function(a,b,c,d,e,f,g){return{priority:-200,restrict:"A",require:"?^uiGrid",scope:!1,link:function(a,c,d,e){function h(){a.grid.options.enableRowSelection&&a.grid.options.enableFullRowSelection&&(c.addClass("ui-grid-disable-selection"),c.on("touchstart",m),c.on("touchend",n),c.on("click",l),a.registered=!0)}function i(){a.registered&&(c.removeClass("ui-grid-disable-selection"),c.off("touchstart",m),c.off("touchend",n),c.off("click",l),a.registered=!1)}var j=0,k=300;e.grid.api.cellNav&&e.grid.api.cellNav.on.viewPortKeyDown(a,function(b,c){null!==c&&c.row===a.row&&c.col===a.col&&32===b.keyCode&&"selectionRowHeaderCol"===a.col.colDef.name&&(f.toggleRowSelection(a.grid,a.row,b,a.grid.options.multiSelect&&!a.grid.options.modifierKeysToMultiSelect,a.grid.options.noUnselect),a.$apply())});var l=function(b){"ui-grid-icon-minus-squared"!==b.target.className&&"ui-grid-icon-plus-squared"!==b.target.className&&(c.off("touchend",n),b.shiftKey?f.shiftSelect(a.grid,a.row,b,a.grid.options.multiSelect):b.ctrlKey||b.metaKey?f.toggleRowSelection(a.grid,a.row,b,a.grid.options.multiSelect,a.grid.options.noUnselect):f.toggleRowSelection(a.grid,a.row,b,a.grid.options.multiSelect&&!a.grid.options.modifierKeysToMultiSelect,a.grid.options.noUnselect),a.$apply(),g(function(){c.on("touchend",n)},k))},m=function(a){j=(new Date).getTime(),c.off("click",l)},n=function(a){var b=(new Date).getTime(),d=b-j;k>d&&l(a),g(function(){c.on("click",l)},k)};h();var o=a.grid.registerDataChangeCallback(function(){a.grid.options.enableRowSelection&&a.grid.options.enableFullRowSelection&&!a.registered?h():a.grid.options.enableRowSelection&&a.grid.options.enableFullRowSelection||!a.registered||i()},[b.dataChange.OPTIONS]);c.on("$destroy",o)}}}]),a.directive("uiGridGridFooter",["$compile","uiGridConstants","gridUtil",function(a,b,c){return{restrict:"EA",replace:!0,priority:-1e3,require:"^uiGrid",scope:!0,compile:function(b,d){return{pre:function(b,d,e,f){f.grid.options.showGridFooter&&c.getTemplate("ui-grid/gridFooterSelectedItems").then(function(c){var e=angular.element(c),f=a(e)(b);angular.element(d[0].getElementsByClassName("ui-grid-grid-footer")[0]).append(f)})},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.treeBase",["ui.grid"]);a.constant("uiGridTreeBaseConstants",{featureName:"treeBase",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),a.service("uiGridTreeBaseService",["$q","uiGridTreeBaseConstants","gridUtil","GridRow","gridClassFactory","i18nService","uiGridConstants","rowSorter",function(a,b,c,d,e,f,g,h){var i={initializeGrid:function(a,b){a.treeBase={},a.treeBase.numberLevels=0,a.treeBase.expandAll=!1,a.treeBase.tree=[],i.defaultGridOptions(a.options),a.registerRowsProcessor(i.treeRows,410),a.registerColumnBuilder(i.treeBaseColumnBuilder),i.createRowHeader(a);var c={events:{treeBase:{rowExpanded:{},rowCollapsed:{}}},methods:{treeBase:{expandAllRows:function(){i.expandAllRows(a)},collapseAllRows:function(){i.collapseAllRows(a)},toggleRowTreeState:function(b){i.toggleRowTreeState(a,b)},expandRow:function(b){i.expandRow(a,b)},expandRowChildren:function(b){i.expandRowChildren(a,b)},collapseRow:function(b){i.collapseRow(a,b)},collapseRowChildren:function(b){i.collapseRowChildren(a,b)},getTreeExpandedState:function(){return{expandedState:i.getTreeState(a)}},setTreeState:function(b){i.setTreeState(a,b)},getRowChildren:function(a){return a.treeNode.children.map(function(a){return a.row})}}}};a.api.registerEventsFromObject(c.events),a.api.registerMethodsFromObject(c.methods)},defaultGridOptions:function(a){a.treeRowHeaderBaseWidth=a.treeRowHeaderBaseWidth||30,a.treeIndent=a.treeIndent||10,a.showTreeRowHeader=a.showTreeRowHeader!==!1,a.showTreeExpandNoChildren=a.showTreeExpandNoChildren!==!1,a.treeRowHeaderAlwaysVisible=a.treeRowHeaderAlwaysVisible!==!1,a.treeCustomAggregations=a.treeCustomAggregations||{},a.enableExpandAll=a.enableExpandAll!==!1},treeBaseColumnBuilder:function(a,b,c){"undefined"!=typeof a.customTreeAggregationFn&&(b.treeAggregationFn=a.customTreeAggregationFn),"undefined"!=typeof a.treeAggregationType&&(b.treeAggregation={type:a.treeAggregationType},"undefined"!=typeof c.treeCustomAggregations[a.treeAggregationType]?(b.treeAggregationFn=c.treeCustomAggregations[a.treeAggregationType].aggregationFn,b.treeAggregationFinalizerFn=c.treeCustomAggregations[a.treeAggregationType].finalizerFn,b.treeAggregation.label=c.treeCustomAggregations[a.treeAggregationType].label):"undefined"!=typeof i.nativeAggregations()[a.treeAggregationType]&&(b.treeAggregationFn=i.nativeAggregations()[a.treeAggregationType].aggregationFn,b.treeAggregation.label=i.nativeAggregations()[a.treeAggregationType].label)),"undefined"!=typeof a.treeAggregationLabel&&("undefined"==typeof b.treeAggregation&&(b.treeAggregation={}),b.treeAggregation.label=a.treeAggregationLabel),b.treeAggregationUpdateEntity=a.treeAggregationUpdateEntity!==!1,"undefined"==typeof b.customTreeAggregationFinalizerFn&&(b.customTreeAggregationFinalizerFn=a.customTreeAggregationFinalizerFn)},createRowHeader:function(a){var c={name:b.rowHeaderColName,displayName:"",width:a.options.treeRowHeaderBaseWidth,minWidth:10,cellTemplate:"ui-grid/treeBaseRowHeader",headerCellTemplate:"ui-grid/treeBaseHeaderCell",enableColumnResizing:!1,enableColumnMenu:!1,exporterSuppressExport:!0,allowCellFocus:!0};c.visible=a.options.treeRowHeaderAlwaysVisible,a.addRowHeaderColumn(c,-100)},expandAllRows:function(a){a.treeBase.tree.forEach(function(c){i.setAllNodes(a,c,b.EXPANDED)}),a.treeBase.expandAll=!0,a.queueGridRefresh()},collapseAllRows:function(a){a.treeBase.tree.forEach(function(c){i.setAllNodes(a,c,b.COLLAPSED)}),a.treeBase.expandAll=!1,a.queueGridRefresh()},setAllNodes:function(a,c,d){"undefined"!=typeof c.state&&c.state!==d&&(c.state=d,d===b.EXPANDED?a.api.treeBase.raise.rowExpanded(c.row):a.api.treeBase.raise.rowCollapsed(c.row)),c.children&&c.children.forEach(function(b){i.setAllNodes(a,b,d)})},toggleRowTreeState:function(a,c){"undefined"==typeof c.treeLevel||null===c.treeLevel||c.treeLevel<0||(c.treeNode.state===b.EXPANDED?i.collapseRow(a,c):i.expandRow(a,c),a.queueGridRefresh())},expandRow:function(a,c){"undefined"==typeof c.treeLevel||null===c.treeLevel||c.treeLevel<0||c.treeNode.state!==b.EXPANDED&&(c.treeNode.state=b.EXPANDED,a.api.treeBase.raise.rowExpanded(c),a.treeBase.expandAll=i.allExpanded(a.treeBase.tree),a.queueGridRefresh())},expandRowChildren:function(a,c){"undefined"==typeof c.treeLevel||null===c.treeLevel||c.treeLevel<0||(i.setAllNodes(a,c.treeNode,b.EXPANDED),a.treeBase.expandAll=i.allExpanded(a.treeBase.tree),a.queueGridRefresh())},collapseRow:function(a,c){"undefined"==typeof c.treeLevel||null===c.treeLevel||c.treeLevel<0||c.treeNode.state!==b.COLLAPSED&&(c.treeNode.state=b.COLLAPSED,a.treeBase.expandAll=!1,a.api.treeBase.raise.rowCollapsed(c),a.queueGridRefresh())},collapseRowChildren:function(a,c){"undefined"==typeof c.treeLevel||null===c.treeLevel||c.treeLevel<0||(i.setAllNodes(a,c.treeNode,b.COLLAPSED),a.treeBase.expandAll=!1,a.queueGridRefresh())},allExpanded:function(a){var b=!0;return a.forEach(function(a){i.allExpandedInternal(a)||(b=!1)}),b},allExpandedInternal:function(a){if(a.children&&a.children.length>0){if(a.state===b.COLLAPSED)return!1;var c=!0;return a.children.forEach(function(a){i.allExpandedInternal(a)||(c=!1)}),c}return!0},treeRows:function(a){if(0===a.length)return a;var c=this;b.EXPANDED;return c.treeBase.tree=i.createTree(c,a),i.updateRowHeaderWidth(c),i.sortTree(c),i.fixFilter(c),i.renderTree(c.treeBase.tree)},updateRowHeaderWidth:function(a){var c=a.getColumn(b.rowHeaderColName),d=a.options.treeRowHeaderBaseWidth+a.options.treeIndent*Math.max(a.treeBase.numberLevels-1,0);c&&d!==c.width&&(c.width=d,a.queueRefresh());var e=!0;a.options.showTreeRowHeader===!1&&(e=!1),a.options.treeRowHeaderAlwaysVisible===!1&&a.treeBase.numberLevels<=0&&(e=!1),c&&c.visible!==e&&(c.visible=e,c.colDef.visible=e,a.queueGridRefresh())},renderTree:function(a){var c=[];return a.forEach(function(a){a.row.visible&&c.push(a.row),a.state===b.EXPANDED&&a.children&&a.children.length>0&&(c=c.concat(i.renderTree(a.children)))}),c},createTree:function(a,c){var d,e=-1,f=[];a.treeBase.tree=[],a.treeBase.numberLevels=0;var g=i.getAggregations(a),h=function(c){if("undefined"!=typeof c.entity.$$treeLevel&&c.treeLevel!==c.entity.$$treeLevel&&(c.treeLevel=c.entity.$$treeLevel),c.treeLevel<=e){for(;c.treeLevel<=e;){var h=f.pop();i.finaliseAggregations(h),e--}d=f.length>0?i.setCurrentState(f):b.EXPANDED}("undefined"==typeof c.treeLevel||null===c.treeLevel||c.treeLevel<0)&&c.visible&&i.aggregate(a,c,f),i.addOrUseNode(a,c,f,g),"undefined"!=typeof c.treeLevel&&null!==c.treeLevel&&c.treeLevel>=0&&(f.push(c),e++,d=i.setCurrentState(f)),a.treeBase.numberLevels<c.treeLevel+1&&(a.treeBase.numberLevels=c.treeLevel+1)};for(c.forEach(h);f.length>0;){var j=f.pop();i.finaliseAggregations(j)}return a.treeBase.tree},addOrUseNode:function(a,c,d,e){var f=[];e.forEach(function(a){f.push(i.buildAggregationObject(a.col))});var g={state:b.COLLAPSED,row:c,parentRow:null,aggregations:f,children:[]};c.treeNode&&(g.state=c.treeNode.state),d.length>0&&(g.parentRow=d[d.length-1]),c.treeNode=g,0===d.length?a.treeBase.tree.push(g):d[d.length-1].treeNode.children.push(g)},setCurrentState:function(a){var c=b.EXPANDED;return a.forEach(function(a){a.treeNode.state===b.COLLAPSED&&(c=b.COLLAPSED)}),c},sortTree:function(a){a.columns.forEach(function(a){a.sort&&a.sort.ignoreSort&&delete a.sort.ignoreSort}),a.treeBase.tree=i.sortInternal(a,a.treeBase.tree)},sortInternal:function(a,c){var d=c.map(function(a){return a.row});d=h.sort(a,d,a.columns);var e=d.map(function(a){return a.treeNode});return e.forEach(function(c){c.state===b.EXPANDED&&c.children&&c.children.length>0&&(c.children=i.sortInternal(a,c.children))}),e},fixFilter:function(a){var b;a.treeBase.tree.forEach(function(a){a.children&&a.children.length>0&&(b=a.row.visible,i.fixFilterInternal(a.children,b))})},fixFilterInternal:function(a,b){return a.forEach(function(a){a.row.visible&&!b&&(i.setParentsVisible(a),b=!0),a.children&&a.children.length>0&&i.fixFilterInternal(a.children,b&&a.row.visible)&&(b=!0)}),b},setParentsVisible:function(a){for(;a.parentRow;)a.parentRow.visible=!0,a=a.parentRow.treeNode},buildAggregationObject:function(a){var b={col:a};return a.treeAggregation&&a.treeAggregation.type&&(b.type=a.treeAggregation.type),a.treeAggregation&&a.treeAggregation.label&&(b.label=a.treeAggregation.label),b},getAggregations:function(a){var b=[];return a.columns.forEach(function(c){"undefined"!=typeof c.treeAggregationFn&&(b.push(i.buildAggregationObject(c)),a.options.showColumnFooter&&"undefined"==typeof c.colDef.aggregationType&&c.treeAggregation&&(c.treeFooterAggregation=i.buildAggregationObject(c),c.aggregationType=i.treeFooterAggregationType))}),b},aggregate:function(a,b,c){0===c.length&&b.treeNode&&b.treeNode.aggregations&&b.treeNode.aggregations.forEach(function(c){if("undefined"!=typeof c.col.treeFooterAggregation){var d=a.getCellValue(b,c.col),e=Number(d);c.col.treeAggregationFn(c.col.treeFooterAggregation,d,e,b)}}),c.forEach(function(c,d){c.treeNode.aggregations&&c.treeNode.aggregations.forEach(function(c){var e=a.getCellValue(b,c.col),f=Number(e);c.col.treeAggregationFn(c,e,f,b),0===d&&"undefined"!=typeof c.col.treeFooterAggregation&&c.col.treeAggregationFn(c.col.treeFooterAggregation,e,f,b)})})},nativeAggregations:function(){var a={count:{label:f.get().aggregation.count,menuTitle:f.get().grouping.aggregate_count,aggregationFn:function(a,b,c){"undefined"==typeof a.value?a.value=1:a.value++}},sum:{label:f.get().aggregation.sum,menuTitle:f.get().grouping.aggregate_sum,aggregationFn:function(a,b,c){isNaN(c)||("undefined"==typeof a.value?a.value=c:a.value+=c)}},min:{label:f.get().aggregation.min,menuTitle:f.get().grouping.aggregate_min,aggregationFn:function(a,b,c){"undefined"==typeof a.value?a.value=b:"undefined"!=typeof b&&null!==b&&(b<a.value||null===a.value)&&(a.value=b)}},max:{label:f.get().aggregation.max,menuTitle:f.get().grouping.aggregate_max,aggregationFn:function(a,b,c){"undefined"==typeof a.value?a.value=b:"undefined"!=typeof b&&null!==b&&(b>a.value||null===a.value)&&(a.value=b)}},avg:{label:f.get().aggregation.avg,menuTitle:f.get().grouping.aggregate_avg,aggregationFn:function(a,b,c){"undefined"==typeof a.count?a.count=1:a.count++,isNaN(c)||("undefined"==typeof a.value||"undefined"==typeof a.sum?(a.value=c,a.sum=c):(a.sum+=c,a.value=a.sum/a.count))}}};return a},finaliseAggregation:function(a,b){b.col.treeAggregationUpdateEntity&&"undefined"!=typeof a&&"undefined"!=typeof a.entity["$$"+b.col.uid]&&angular.extend(b,a.entity["$$"+b.col.uid]),"function"==typeof b.col.treeAggregationFinalizerFn&&b.col.treeAggregationFinalizerFn(b),"function"==typeof b.col.customTreeAggregationFinalizerFn&&b.col.customTreeAggregationFinalizerFn(b),
"undefined"==typeof b.rendered&&(b.rendered=b.label?b.label+b.value:b.value)},finaliseAggregations:function(a){null!=a&&"undefined"!=typeof a.treeNode.aggregations&&a.treeNode.aggregations.forEach(function(b){if(i.finaliseAggregation(a,b),b.col.treeAggregationUpdateEntity){var c={};angular.forEach(b,function(a,d){b.hasOwnProperty(d)&&"col"!==d&&(c[d]=a)}),a.entity["$$"+b.col.uid]=c}})},treeFooterAggregationType:function(a,b){return i.finaliseAggregation(void 0,b.treeFooterAggregation),"undefined"==typeof b.treeFooterAggregation.value||null===b.treeFooterAggregation.rendered?"":b.treeFooterAggregation.rendered}};return i}]),a.directive("uiGridTreeBaseRowHeaderButtons",["$templateCache","uiGridTreeBaseService",function(a,b){return{replace:!0,restrict:"E",template:a.get("ui-grid/treeBaseRowHeaderButtons"),scope:!0,require:"^uiGrid",link:function(a,c,d,e){var f=e.grid;a.treeButtonClick=function(a,c){b.toggleRowTreeState(f,a,c)}}}}]),a.directive("uiGridTreeBaseExpandAllButtons",["$templateCache","uiGridTreeBaseService",function(a,b){return{replace:!0,restrict:"E",template:a.get("ui-grid/treeBaseExpandAllButtons"),scope:!1,link:function(a,c,d,e){var f=a.col.grid;a.headerButtonClick=function(a,c){f.treeBase.expandAll?b.collapseAllRows(f,c):b.expandAllRows(f,c)}}}}]),a.directive("uiGridViewport",["$compile","uiGridConstants","gridUtil","$parse",function(a,b,c,d){return{priority:-200,scope:!1,compile:function(a,b){var c=angular.element(a.children().children()[0]),d=c.attr("ng-class"),e="";return e=d?d.slice(0,-1)+",'ui-grid-tree-header-row': row.treeLevel > -1}":"{'ui-grid-tree-header-row': row.treeLevel > -1}",c.attr("ng-class",e),{pre:function(a,b,c,d){},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.treeView",["ui.grid","ui.grid.treeBase"]);a.constant("uiGridTreeViewConstants",{featureName:"treeView",rowHeaderColName:"treeBaseRowHeaderCol",EXPANDED:"expanded",COLLAPSED:"collapsed",aggregation:{COUNT:"count",SUM:"sum",MAX:"max",MIN:"min",AVG:"avg"}}),a.service("uiGridTreeViewService",["$q","uiGridTreeViewConstants","uiGridTreeBaseConstants","uiGridTreeBaseService","gridUtil","GridRow","gridClassFactory","i18nService","uiGridConstants",function(a,b,c,d,e,f,g,h,i){var j={initializeGrid:function(a,b){d.initializeGrid(a,b),a.treeView={},a.registerRowsProcessor(j.adjustSorting,60);var c={events:{treeView:{}},methods:{treeView:{}}};a.api.registerEventsFromObject(c.events),a.api.registerMethodsFromObject(c.methods)},defaultGridOptions:function(a){a.enableTreeView=a.enableTreeView!==!1},adjustSorting:function(a){var b=this;return b.columns.forEach(function(a){a.sort&&(a.sort.ignoreSort=!0)}),a}};return j}]),a.directive("uiGridTreeView",["uiGridTreeViewConstants","uiGridTreeViewService","$templateCache",function(a,b,c){return{replace:!0,priority:0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){e.grid.options.enableTreeView!==!1&&b.initializeGrid(e.grid,a)},post:function(a,b,c,d){}}}}}])}(),function(){"use strict";var a=angular.module("ui.grid.validate",["ui.grid"]);a.service("uiGridValidateService",["$sce","$q","$http","i18nService","uiGridConstants",function(a,b,c,d,e){var f={validatorFactories:{},setExternalFactoryFunction:function(a){f.externalFactoryFunction=a},clearExternalFactory:function(){delete f.externalFactoryFunction},getValidatorFromExternalFactory:function(a,b){return f.externalFactoryFunction(a,b).validatorFactory(b)},getMessageFromExternalFactory:function(a,b){return f.externalFactoryFunction(a,b).messageFunction(b)},setValidator:function(a,b,c){f.validatorFactories[a]={validatorFactory:b,messageFunction:c}},getValidator:function(a,b){if(f.externalFactoryFunction){var c=f.getValidatorFromExternalFactory(a,b);if(c)return c}if(!f.validatorFactories[a])throw"Invalid validator name: "+a;return f.validatorFactories[a].validatorFactory(b)},getMessage:function(a,b){if(f.externalFactoryFunction){var c=f.getMessageFromExternalFactory(a,b);if(c)return c}return f.validatorFactories[a].messageFunction(b)},isInvalid:function(a,b){return a["$$invalid"+b.name]},setInvalid:function(a,b){a["$$invalid"+b.name]=!0},setValid:function(a,b){delete a["$$invalid"+b.name]},setError:function(a,b,c){a["$$errors"+b.name]||(a["$$errors"+b.name]={}),a["$$errors"+b.name][c]=!0},clearError:function(a,b,c){a["$$errors"+b.name]&&c in a["$$errors"+b.name]&&delete a["$$errors"+b.name][c]},getErrorMessages:function(a,b){var c=[];return a["$$errors"+b.name]&&0!==Object.keys(a["$$errors"+b.name]).length?(Object.keys(a["$$errors"+b.name]).sort().forEach(function(a){c.push(f.getMessage(a,b.validators[a]))}),c):c},getFormattedErrors:function(b,c){var e="",g=f.getErrorMessages(b,c);return g.length?(g.forEach(function(a){e+=a+"<br/>"}),a.trustAsHtml("<p><b>"+d.getSafeText("validate.error")+"</b></p>"+e)):void 0},getTitleFormattedErrors:function(b,c){var e="\n",g="",h=f.getErrorMessages(b,c);return h.length?(h.forEach(function(a){g+=a+e}),a.trustAsHtml(d.getSafeText("validate.error")+e+g)):void 0},runValidators:function(a,c,d,e,g){if(d!==e){if("undefined"==typeof c.name||!c.name)throw new Error("colDef.name is required to perform validation");f.setValid(a,c);var h=function(a,b,c){return function(h){h||(f.setInvalid(a,b),f.setError(a,b,c),g&&g.api.validate.raise.validationFailed(a,b,d,e))}},i=[];for(var j in c.validators){f.clearError(a,c,j);var k=f.getValidator(j,c.validators[j]),l=b.when(k(e,d,a,c)).then(h(a,c,j));i.push(l)}return b.all(i)}},createDefaultValidators:function(){f.setValidator("minLength",function(a){return function(b,c,d,e){return void 0===c||null===c||""===c?!0:c.length>=a}},function(a){return d.getSafeText("validate.minLength").replace("THRESHOLD",a)}),f.setValidator("maxLength",function(a){return function(b,c,d,e){return void 0===c||null===c||""===c?!0:c.length<=a}},function(a){return d.getSafeText("validate.maxLength").replace("THRESHOLD",a)}),f.setValidator("required",function(a){return function(b,c,d,e){return a?!(void 0===c||null===c||""===c):!0}},function(a){return d.getSafeText("validate.required")})},initializeGrid:function(a,b){b.validate={isInvalid:f.isInvalid,getFormattedErrors:f.getFormattedErrors,getTitleFormattedErrors:f.getTitleFormattedErrors,runValidators:f.runValidators};var c={events:{validate:{validationFailed:function(a,b,c,d){}}},methods:{validate:{isInvalid:function(a,c){return b.validate.isInvalid(a,c)},getErrorMessages:function(a,c){return b.validate.getErrorMessages(a,c)},getFormattedErrors:function(a,c){return b.validate.getFormattedErrors(a,c)},getTitleFormattedErrors:function(a,c){return b.validate.getTitleFormattedErrors(a,c)}}}};b.api.registerEventsFromObject(c.events),b.api.registerMethodsFromObject(c.methods),b.edit&&b.api.edit.on.afterCellEdit(a,function(a,c,d,e){b.validate.runValidators(a,c,d,e,b)}),f.createDefaultValidators()}};return f}]),a.directive("uiGridValidate",["gridUtil","uiGridValidateService",function(a,b){return{priority:0,replace:!0,require:"^uiGrid",scope:!1,compile:function(){return{pre:function(a,c,d,e){b.initializeGrid(a,e.grid)},post:function(a,b,c,d){}}}}}])}(),angular.module("ui.grid").run(["$templateCache",function(a){"use strict";a.put("ui-grid/ui-grid-filter",'<div class="ui-grid-filter-container" ng-style="col.extraStyle" ng-repeat="colFilter in col.filters" ng-class="{\'ui-grid-filter-cancel-button-hidden\' : colFilter.disableCancelFilterButton === true }"><div ng-if="colFilter.type !== \'select\'"><input type="text" class="ui-grid-filter-input ui-grid-filter-input-{{$index}}" ng-model="colFilter.term" ng-attr-placeholder="{{colFilter.placeholder || \'\'}}" aria-label="{{colFilter.ariaLabel || aria.defaultFilterLabel}}"><div role="button" class="ui-grid-filter-button" ng-click="removeFilter(colFilter, $index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \'\'" ng-show="colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== \'\'"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div><div ng-if="colFilter.type === \'select\'"><select class="ui-grid-filter-select ui-grid-filter-input-{{$index}}" ng-model="colFilter.term" ng-show="colFilter.selectOptions.length > 0" ng-attr-placeholder="{{colFilter.placeholder || aria.defaultFilterLabel}}" aria-label="{{colFilter.ariaLabel || \'\'}}" ng-options="option.value as option.label for option in colFilter.selectOptions"><option value=""></option></select><div role="button" class="ui-grid-filter-button-select" ng-click="removeFilter(colFilter, $index)" ng-if="!colFilter.disableCancelFilterButton" ng-disabled="colFilter.term === undefined || colFilter.term === null || colFilter.term === \'\'" ng-show="colFilter.term !== undefined && colFilter.term != null"><i class="ui-grid-icon-cancel" ui-grid-one-bind-aria-label="aria.removeFilter">&nbsp;</i></div></div></div>'),a.put("ui-grid/ui-grid-footer",'<div class="ui-grid-footer-panel ui-grid-footer-aggregates-row"><!-- tfooter --><div class="ui-grid-footer ui-grid-footer-viewport"><div class="ui-grid-footer-canvas"><div class="ui-grid-footer-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-footer-cell-row"><div ui-grid-footer-cell role="gridcell" ng-repeat="col in colContainer.renderedColumns track by col.uid" col="col" render-index="$index" class="ui-grid-footer-cell ui-grid-clearfix"></div></div></div></div></div></div>'),a.put("ui-grid/ui-grid-grid-footer",'<div class="ui-grid-footer-info ui-grid-grid-footer"><span>{{\'search.totalItems\' | t}} {{grid.rows.length}}</span> <span ng-if="grid.renderContainers.body.visibleRowCache.length !== grid.rows.length" class="ngLabel">({{"search.showingItems" | t}} {{grid.renderContainers.body.visibleRowCache.length}})</span></div>'),a.put("ui-grid/ui-grid-group-panel",'<div class="ui-grid-group-panel"><div ui-t="groupPanel.description" class="description" ng-show="groupings.length == 0"></div><ul ng-show="groupings.length > 0" class="ngGroupList"><li class="ngGroupItem" ng-repeat="group in configGroups"><span class="ngGroupElement"><span class="ngGroupName">{{group.displayName}} <span ng-click="removeGroup($index)" class="ngRemoveGroup">x</span></span> <span ng-hide="$last" class="ngGroupArrow"></span></span></li></ul></div>'),a.put("ui-grid/ui-grid-header",'<div role="rowgroup" class="ui-grid-header"><!-- theader --><div class="ui-grid-top-panel"><div class="ui-grid-header-viewport"><div class="ui-grid-header-canvas"><div class="ui-grid-header-cell-wrapper" ng-style="colContainer.headerCellWrapperStyle()"><div role="row" class="ui-grid-header-cell-row"><div class="ui-grid-header-cell ui-grid-clearfix" ng-repeat="col in colContainer.renderedColumns track by col.uid" ui-grid-header-cell col="col" render-index="$index"></div></div></div></div></div></div></div>'),a.put("ui-grid/ui-grid-menu-button",'<div class="ui-grid-menu-button"><div role="button" ui-grid-one-bind-id-grid="\'grid-menu\'" class="ui-grid-icon-container" ng-click="toggleMenu()" aria-haspopup="true"><i class="ui-grid-icon-menu" ui-grid-one-bind-aria-label="i18n.aria.buttonLabel">&nbsp;</i></div><div ui-grid-menu menu-items="menuItems"></div></div>'),a.put("ui-grid/ui-grid-no-header",'<div class="ui-grid-top-panel"></div>'),a.put("ui-grid/ui-grid-row","<div ng-repeat=\"(colRenderIndex, col) in colContainer.renderedColumns track by col.uid\" ui-grid-one-bind-id-grid=\"rowRenderIndex + '-' + col.uid + '-cell'\" class=\"ui-grid-cell\" ng-class=\"{ 'ui-grid-row-header-cell': col.isRowHeader }\" role=\"{{col.isRowHeader ? 'rowheader' : 'gridcell'}}\" ui-grid-cell></div>"),a.put("ui-grid/ui-grid",'<div ui-i18n="en" class="ui-grid"><!-- TODO (c0bra): add "scoped" attr here, eventually? --><style ui-grid-style>.grid{{ grid.id }} {\n      /* Styles for the grid */\n    }\n\n    .grid{{ grid.id }} .ui-grid-row, .grid{{ grid.id }} .ui-grid-cell, .grid{{ grid.id }} .ui-grid-cell .ui-grid-vertical-bar {\n      height: {{ grid.options.rowHeight }}px;\n    }\n\n    .grid{{ grid.id }} .ui-grid-row:last-child .ui-grid-cell {\n      border-bottom-width: {{ ((grid.getTotalRowHeight() < grid.getViewportHeight()) && \'1\') || \'0\' }}px;\n    }\n\n    {{ grid.verticalScrollbarStyles }}\n    {{ grid.horizontalScrollbarStyles }}\n\n    /*\n    .ui-grid[dir=rtl] .ui-grid-viewport {\n      padding-left: {{ grid.verticalScrollbarWidth }}px;\n    }\n    */\n\n    {{ grid.customStyles }}</style><div class="ui-grid-contents-wrapper"><div ui-grid-menu-button ng-if="grid.options.enableGridMenu"></div><div ng-if="grid.hasLeftContainer()" style="width: 0" ui-grid-pinned-container="\'left\'"></div><div ui-grid-render-container container-id="\'body\'" col-container-name="\'body\'" row-container-name="\'body\'" bind-scroll-horizontal="true" bind-scroll-vertical="true" enable-horizontal-scrollbar="grid.options.enableHorizontalScrollbar" enable-vertical-scrollbar="grid.options.enableVerticalScrollbar"></div><div ng-if="grid.hasRightContainer()" style="width: 0" ui-grid-pinned-container="\'right\'"></div><div ui-grid-grid-footer ng-if="grid.options.showGridFooter"></div><div ui-grid-column-menu ng-if="grid.options.enableColumnMenus"></div><div ng-transclude></div></div></div>'),a.put("ui-grid/uiGridCell",'<div class="ui-grid-cell-contents" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>'),a.put("ui-grid/uiGridColumnMenu",'<div class="ui-grid-column-menu"><div ui-grid-menu menu-items="menuItems"><!-- <div class="ui-grid-column-menu">\n    <div class="inner" ng-show="menuShown">\n      <ul>\n        <div ng-show="grid.options.enableSorting">\n          <li ng-click="sortColumn($event, asc)" ng-class="{ \'selected\' : col.sort.direction == asc }"><i class="ui-grid-icon-sort-alt-up"></i> Sort Ascending</li>\n          <li ng-click="sortColumn($event, desc)" ng-class="{ \'selected\' : col.sort.direction == desc }"><i class="ui-grid-icon-sort-alt-down"></i> Sort Descending</li>\n          <li ng-show="col.sort.direction" ng-click="unsortColumn()"><i class="ui-grid-icon-cancel"></i> Remove Sort</li>\n        </div>\n      </ul>\n    </div>\n  </div> --></div></div>'),a.put("ui-grid/uiGridFooterCell",'<div class="ui-grid-cell-contents" col-index="renderIndex"><div>{{ col.getAggregationText() + ( col.getAggregationValue() CUSTOM_FILTERS ) }}</div></div>'),a.put("ui-grid/uiGridHeaderCell",'<div role="columnheader" ng-class="{ \'sortable\': sortable }" ui-grid-one-bind-aria-labelledby-grid="col.uid + \'-header-text \' + col.uid + \'-sortdir-text\'" aria-sort="{{col.sort.direction == asc ? \'ascending\' : ( col.sort.direction == desc ? \'descending\' : (!col.sort.direction ? \'none\' : \'other\'))}}"><div role="button" tabindex="0" class="ui-grid-cell-contents ui-grid-header-cell-primary-focus" col-index="renderIndex" title="TOOLTIP"><span class="ui-grid-header-cell-label" ui-grid-one-bind-id-grid="col.uid + \'-header-text\'">{{ col.displayName CUSTOM_FILTERS }}</span> <span ui-grid-one-bind-id-grid="col.uid + \'-sortdir-text\'" ui-grid-visible="col.sort.direction" aria-label="{{getSortDirectionAriaLabel()}}"><i ng-class="{ \'ui-grid-icon-up-dir\': col.sort.direction == asc, \'ui-grid-icon-down-dir\': col.sort.direction == desc, \'ui-grid-icon-blank\': !col.sort.direction }" title="{{isSortPriorityVisible() ? i18n.headerCell.priority + \' \' + ( col.sort.priority + 1 )  : null}}" aria-hidden="true"></i> <sub ui-grid-visible="isSortPriorityVisible()" class="ui-grid-sort-priority-number">{{col.sort.priority + 1}}</sub></span></div><div role="button" tabindex="0" ui-grid-one-bind-id-grid="col.uid + \'-menu-button\'" class="ui-grid-column-menu-button" ng-if="grid.options.enableColumnMenus && !col.isRowHeader  && col.colDef.enableColumnMenu !== false" ng-click="toggleMenu($event)" ng-class="{\'ui-grid-column-menu-button-last-col\': isLastCol}" ui-grid-one-bind-aria-label="i18n.headerCell.aria.columnMenuButtonLabel" aria-haspopup="true"><i class="ui-grid-icon-angle-down" aria-hidden="true">&nbsp;</i></div><div ui-grid-filter></div></div>'),a.put("ui-grid/uiGridMenu",'<div class="ui-grid-menu" ng-if="shown"><style ui-grid-style>{{dynamicStyles}}</style><div class="ui-grid-menu-mid" ng-show="shownMid"><div class="ui-grid-menu-inner"><ul role="menu" class="ui-grid-menu-items"><li ng-repeat="item in menuItems" role="menuitem" ui-grid-menu-item ui-grid-one-bind-id="\'menuitem-\'+$index" action="item.action" name="item.title" active="item.active" icon="item.icon" shown="item.shown" context="item.context" template-url="item.templateUrl" leave-open="item.leaveOpen" screen-reader-only="item.screenReaderOnly"></li></ul></div></div></div>'),a.put("ui-grid/uiGridMenuItem",'<button type="button" class="ui-grid-menu-item" ng-click="itemAction($event, title)" ng-show="itemShown()" ng-class="{ \'ui-grid-menu-item-active\': active(), \'ui-grid-sr-only\': (!focus && screenReaderOnly) }" aria-pressed="{{active()}}" tabindex="0" ng-focus="focus=true" ng-blur="focus=false"><i ng-class="icon" aria-hidden="true">&nbsp;</i> {{ label() }}</button>'),a.put("ui-grid/uiGridRenderContainer","<div role=\"grid\" ui-grid-one-bind-id-grid=\"'grid-container'\" class=\"ui-grid-render-container\" ng-style=\"{ 'margin-left': colContainer.getMargin('left') + 'px', 'margin-right': colContainer.getMargin('right') + 'px' }\"><!-- All of these dom elements are replaced in place --><div ui-grid-header></div><div ui-grid-viewport></div><div ng-if=\"colContainer.needsHScrollbarPlaceholder()\" class=\"ui-grid-scrollbar-placeholder\" ng-style=\"{height:colContainer.grid.scrollbarHeight + 'px'}\"></div><ui-grid-footer ng-if=\"grid.options.showColumnFooter\"></ui-grid-footer></div>"),a.put("ui-grid/uiGridViewport",'<div role="rowgroup" class="ui-grid-viewport" ng-style="colContainer.getViewportStyle()"><!-- tbody --><div class="ui-grid-canvas"><div ng-repeat="(rowRenderIndex, row) in rowContainer.renderedRows track by $index" class="ui-grid-row" ng-style="Viewport.rowStyle(rowRenderIndex)"><div role="row" ui-grid-row="row" row-render-index="rowRenderIndex"></div></div></div></div>'),a.put("ui-grid/cellEditor",'<div><form name="inputForm"><input type="INPUT_TYPE" ng-class="\'colt\' + col.uid" ui-grid-editor ng-model="MODEL_COL_FIELD"></form></div>'),a.put("ui-grid/dropdownEditor",'<div><form name="inputForm"><select ng-class="\'colt\' + col.uid" ui-grid-edit-dropdown ng-model="MODEL_COL_FIELD" ng-options="field[editDropdownIdLabel] as field[editDropdownValueLabel] CUSTOM_FILTERS for field in editDropdownOptionsArray"></select></form></div>'),a.put("ui-grid/fileChooserEditor",'<div><form name="inputForm"><input ng-class="\'colt\' + col.uid" ui-grid-edit-file-chooser type="file" id="files" name="files[]" ng-model="MODEL_COL_FIELD"></form></div>'),a.put("ui-grid/emptyBaseLayerContainer",'<div class="ui-grid-empty-base-layer-container ui-grid-canvas"><div class="ui-grid-row" ng-repeat="(rowRenderIndex, row) in grid.baseLayer.emptyRows track by $index" ng-style="Viewport.rowStyle(rowRenderIndex)"><div><div><div ng-repeat="(colRenderIndex, col) in colContainer.renderedColumns track by col.colDef.name" class="ui-grid-cell {{ col.getColClass(false) }}"></div></div></div></div></div>'),a.put("ui-grid/expandableRow",'<div ui-grid-expandable-row ng-if="expandableRow.shouldRenderExpand()" class="expandableRow" style="float:left; margin-top: 1px; margin-bottom: 1px" ng-style="{width: (grid.renderContainers.body.getCanvasWidth()) + \'px\', height: row.expandedRowHeight + \'px\'}"></div>'),a.put("ui-grid/expandableRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i ng-if="!(row.groupHeader==true || row.entity.subGridOptions.disableRowExpandable)" ng-class="{ \'ui-grid-icon-plus-squared\' : !row.isExpanded, \'ui-grid-icon-minus-squared\' : row.isExpanded }" ng-click="grid.api.expandable.toggleRowExpansion(row.entity)"></i></div></div>'),a.put("ui-grid/expandableScrollFiller","<div ng-if=\"expandableRow.shouldRenderFiller()\" ng-class=\"{scrollFiller:true, scrollFillerClass:(colContainer.name === 'body')}\" ng-style=\"{ width: (grid.getViewportWidth()) + 'px', height: row.expandedRowHeight + 2 + 'px', 'margin-left': grid.options.rowHeader.rowHeaderWidth + 'px' }\"><i class=\"ui-grid-icon-spin5 ui-grid-animate-spin\" ng-style=\"{'margin-top': ( row.expandedRowHeight/2 - 5) + 'px', 'margin-left' : ((grid.getViewportWidth() - grid.options.rowHeader.rowHeaderWidth)/2 - 5) + 'px'}\"></i></div>"),a.put("ui-grid/expandableTopRowHeader",'<div class="ui-grid-row-header-cell ui-grid-expandable-buttons-cell"><div class="ui-grid-cell-contents"><i ng-class="{ \'ui-grid-icon-plus-squared\' : !grid.expandable.expandedAll, \'ui-grid-icon-minus-squared\' : grid.expandable.expandedAll }" ng-click="grid.api.expandable.toggleAllRows()"></i></div></div>'),a.put("ui-grid/csvLink",'<span class="ui-grid-exporter-csv-link-span"><a href="data:text/csv;charset=UTF-8,CSV_CONTENT" download="FILE_NAME">LINK_LABEL</a></span>'),a.put("ui-grid/importerMenuItem",'<li class="ui-grid-menu-item"><form><input class="ui-grid-importer-file-chooser" type="file" id="files" name="files[]"></form></li>'),a.put("ui-grid/importerMenuItemContainer","<div ui-grid-importer-menu-item></div>"),a.put("ui-grid/pagination",'<div role="contentinfo" class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls"><div role="navigation" class="ui-grid-pager-container"><div role="menubar" class="ui-grid-pager-control"><button type="button" role="menuitem" class="ui-grid-pager-first" ui-grid-one-bind-title="aria.pageToFirst" ui-grid-one-bind-aria-label="aria.pageToFirst" ng-click="pageFirstPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle\' : \'first-triangle\'"><div ng-class="grid.isRTL() ? \'last-bar-rtl\' : \'first-bar\'"></div></div></button> <button type="button" role="menuitem" class="ui-grid-pager-previous" ui-grid-one-bind-title="aria.pageBack" ui-grid-one-bind-aria-label="aria.pageBack" ng-click="pagePreviousPageClick()" ng-disabled="cantPageBackward()"><div ng-class="grid.isRTL() ? \'last-triangle prev-triangle\' : \'first-triangle prev-triangle\'"></div></button> <input type="number" ui-grid-one-bind-title="aria.pageSelected" ui-grid-one-bind-aria-label="aria.pageSelected" class="ui-grid-pager-control-input" ng-model="grid.options.paginationCurrentPage" min="1" max="{{ paginationApi.getTotalPages() }}" required> <span class="ui-grid-pager-max-pages-number" ng-show="paginationApi.getTotalPages() > 0"><abbr ui-grid-one-bind-title="paginationOf">/</abbr> {{ paginationApi.getTotalPages() }}</span> <button type="button" role="menuitem" class="ui-grid-pager-next" ui-grid-one-bind-title="aria.pageForward" ui-grid-one-bind-aria-label="aria.pageForward" ng-click="pageNextPageClick()" ng-disabled="cantPageForward()"><div ng-class="grid.isRTL() ? \'first-triangle next-triangle\' : \'last-triangle next-triangle\'"></div></button> <button type="button" role="menuitem" class="ui-grid-pager-last" ui-grid-one-bind-title="aria.pageToLast" ui-grid-one-bind-aria-label="aria.pageToLast" ng-click="pageLastPageClick()" ng-disabled="cantPageToLast()"><div ng-class="grid.isRTL() ? \'first-triangle\' : \'last-triangle\'"><div ng-class="grid.isRTL() ? \'first-bar-rtl\' : \'last-bar\'"></div></div></button></div><div class="ui-grid-pager-row-count-picker" ng-if="grid.options.paginationPageSizes.length > 1 && !grid.options.useCustomPagination"><select ui-grid-one-bind-aria-labelledby-grid="\'items-per-page-label\'" ng-model="grid.options.paginationPageSize" ng-options="o as o for o in grid.options.paginationPageSizes"></select><span ui-grid-one-bind-id-grid="\'items-per-page-label\'" class="ui-grid-pager-row-count-label">&nbsp;{{sizesLabel}}</span></div><span ng-if="grid.options.paginationPageSizes.length <= 1" class="ui-grid-pager-row-count-label">{{grid.options.paginationPageSize}}&nbsp;{{sizesLabel}}</span></div><div class="ui-grid-pager-count-container"><div class="ui-grid-pager-count"><span ng-show="grid.options.totalItems > 0">{{ 1 + paginationApi.getFirstRowIndex() }} <abbr ui-grid-one-bind-title="paginationThrough">-</abbr> {{ 1 + paginationApi.getLastRowIndex() }} {{paginationOf}} {{grid.options.totalItems}} {{totalItemsLabel}}</span></div></div></div>'),a.put("ui-grid/columnResizer",'<div ui-grid-column-resizer ng-if="grid.options.enableColumnResizing" class="ui-grid-column-resizer" col="col" position="right" render-index="renderIndex" unselectable="on"></div>'),a.put("ui-grid/gridFooterSelectedItems",'<span ng-if="grid.selection.selectedCount !== 0 && grid.options.enableFooterTotalSelected">({{"search.selectedItems" | t}} {{grid.selection.selectedCount}})</span>'),a.put("ui-grid/selectionHeaderCell",'<div><!-- <div class="ui-grid-vertical-bar">&nbsp;</div> --><div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-selection-select-all-buttons ng-if="grid.options.enableSelectAll"></ui-grid-selection-select-all-buttons></div></div>'),a.put("ui-grid/selectionRowHeader",'<div class="ui-grid-disable-selection"><div class="ui-grid-cell-contents"><ui-grid-selection-row-header-buttons></ui-grid-selection-row-header-buttons></div></div>'),a.put("ui-grid/selectionRowHeaderButtons",'<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\'ui-grid-row-selected\': row.isSelected}" ng-click="selectButtonClick(row, $event)">&nbsp;</div>'),a.put("ui-grid/selectionSelectAllButtons",'<div class="ui-grid-selection-row-header-buttons ui-grid-icon-ok" ng-class="{\'ui-grid-all-selected\': grid.selection.selectAll}" ng-click="headerButtonClick($event)"></div>'),a.put("ui-grid/treeBaseExpandAllButtons",'<div class="ui-grid-tree-base-row-header-buttons" ng-class="{\'ui-grid-icon-minus-squared\': grid.treeBase.numberLevels > 0 && grid.treeBase.expandAll, \'ui-grid-icon-plus-squared\': grid.treeBase.numberLevels > 0 && !grid.treeBase.expandAll}" ng-click="headerButtonClick($event)"></div>'),a.put("ui-grid/treeBaseHeaderCell",'<div><div class="ui-grid-cell-contents" col-index="renderIndex"><ui-grid-tree-base-expand-all-buttons ng-if="grid.options.enableExpandAll"></ui-grid-tree-base-expand-all-buttons></div></div>'),a.put("ui-grid/treeBaseRowHeader",'<div class="ui-grid-cell-contents"><ui-grid-tree-base-row-header-buttons></ui-grid-tree-base-row-header-buttons></div>'),a.put("ui-grid/treeBaseRowHeaderButtons","<div class=\"ui-grid-tree-base-row-header-buttons\" ng-class=\"{'ui-grid-tree-base-header': row.treeLevel > -1 }\" ng-click=\"treeButtonClick(row, $event)\"><i ng-class=\"{'ui-grid-icon-minus-squared': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'expanded', 'ui-grid-icon-plus-squared': ( ( grid.options.showTreeExpandNoChildren && row.treeLevel > -1 ) || ( row.treeNode.children && row.treeNode.children.length > 0 ) ) && row.treeNode.state === 'collapsed'}\" ng-style=\"{'padding-left': grid.options.treeIndent * row.treeLevel + 'px'}\"></i> &nbsp;</div>"),a.put("ui-grid/cellTitleValidator",'<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" title="{{grid.validate.getTitleFormattedErrors(row.entity,col.colDef)}}">{{COL_FIELD CUSTOM_FILTERS}}</div>'),a.put("ui-grid/cellTooltipValidator",'<div class="ui-grid-cell-contents" ng-class="{invalid:grid.validate.isInvalid(row.entity,col.colDef)}" tooltip-html-unsafe="{{grid.validate.getFormattedErrors(row.entity,col.colDef)}}" tooltip-enable="grid.validate.isInvalid(row.entity,col.colDef)" tooltip-append-to-body="true" tooltip-placement="top" title="TOOLTIP">{{COL_FIELD CUSTOM_FILTERS}}</div>')}]);
(function() {


}).call(this);
// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//




;
