(function(/* BrowserSync-Brunch */) {
  var url = "//" + location.hostname + ":3000/browser-sync/browser-sync-client.2.1.6.js";
  var bs = document.createElement("script");
  bs.type = "text/javascript"; bs.async = true; bs.src = url;
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(bs, s);
})();;"use strict";

(function (f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }g.jade = f();
  }
})(function () {
  var define, module, exports;return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;if (!u && a) return a(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
          var n = t[o][1][e];return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }return n[o].exports;
    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
  })({ 1: [function (require, module, exports) {
      'use strict';

      /**
       * Merge two attribute objects giving precedence
       * to values in object `b`. Classes are special-cased
       * allowing for arrays and merging/joining appropriately
       * resulting in a string.
       *
       * @param {Object} a
       * @param {Object} b
       * @return {Object} a
       * @api private
       */

      exports.merge = function merge(a, b) {
        if (arguments.length === 1) {
          var attrs = a[0];
          for (var i = 1; i < a.length; i++) {
            attrs = merge(attrs, a[i]);
          }
          return attrs;
        }
        var ac = a['class'];
        var bc = b['class'];

        if (ac || bc) {
          ac = ac || [];
          bc = bc || [];
          if (!Array.isArray(ac)) ac = [ac];
          if (!Array.isArray(bc)) bc = [bc];
          a['class'] = ac.concat(bc).filter(nulls);
        }

        for (var key in b) {
          if (key != 'class') {
            a[key] = b[key];
          }
        }

        return a;
      };

      /**
       * Filter null `val`s.
       *
       * @param {*} val
       * @return {Boolean}
       * @api private
       */

      function nulls(val) {
        return val != null && val !== '';
      }

      /**
       * join array as classes.
       *
       * @param {*} val
       * @return {String}
       */
      exports.joinClasses = joinClasses;
      function joinClasses(val) {
        return (Array.isArray(val) ? val.map(joinClasses) : val && typeof val === 'object' ? Object.keys(val).filter(function (key) {
          return val[key];
        }) : [val]).filter(nulls).join(' ');
      }

      /**
       * Render the given classes.
       *
       * @param {Array} classes
       * @param {Array.<Boolean>} escaped
       * @return {String}
       */
      exports.cls = function cls(classes, escaped) {
        var buf = [];
        for (var i = 0; i < classes.length; i++) {
          if (escaped && escaped[i]) {
            buf.push(exports.escape(joinClasses([classes[i]])));
          } else {
            buf.push(joinClasses(classes[i]));
          }
        }
        var text = joinClasses(buf);
        if (text.length) {
          return ' class="' + text + '"';
        } else {
          return '';
        }
      };

      exports.style = function (val) {
        if (val && typeof val === 'object') {
          return Object.keys(val).map(function (style) {
            return style + ':' + val[style];
          }).join(';');
        } else {
          return val;
        }
      };
      /**
       * Render the given attribute.
       *
       * @param {String} key
       * @param {String} val
       * @param {Boolean} escaped
       * @param {Boolean} terse
       * @return {String}
       */
      exports.attr = function attr(key, val, escaped, terse) {
        if (key === 'style') {
          val = exports.style(val);
        }
        if ('boolean' == typeof val || null == val) {
          if (val) {
            return ' ' + (terse ? key : key + '="' + key + '"');
          } else {
            return '';
          }
        } else if (0 == key.indexOf('data') && 'string' != typeof val) {
          if (JSON.stringify(val).indexOf('&') !== -1) {
            console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' + 'will be escaped to `&amp;`');
          };
          if (val && typeof val.toISOString === 'function') {
            console.warn('Jade will eliminate the double quotes around dates in ' + 'ISO form after 2.0.0');
          }
          return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
        } else if (escaped) {
          if (val && typeof val.toISOString === 'function') {
            console.warn('Jade will stringify dates in ISO form after 2.0.0');
          }
          return ' ' + key + '="' + exports.escape(val) + '"';
        } else {
          if (val && typeof val.toISOString === 'function') {
            console.warn('Jade will stringify dates in ISO form after 2.0.0');
          }
          return ' ' + key + '="' + val + '"';
        }
      };

      /**
       * Render the given attributes object.
       *
       * @param {Object} obj
       * @param {Object} escaped
       * @return {String}
       */
      exports.attrs = function attrs(obj, terse) {
        var buf = [];

        var keys = Object.keys(obj);

        if (keys.length) {
          for (var i = 0; i < keys.length; ++i) {
            var key = keys[i],
                val = obj[key];

            if ('class' == key) {
              if (val = joinClasses(val)) {
                buf.push(' ' + key + '="' + val + '"');
              }
            } else {
              buf.push(exports.attr(key, val, false, terse));
            }
          }
        }

        return buf.join('');
      };

      /**
       * Escape the given string of `html`.
       *
       * @param {String} html
       * @return {String}
       * @api private
       */

      var jade_encode_html_rules = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;'
      };
      var jade_match_html = /[&<>"]/g;

      function jade_encode_char(c) {
        return jade_encode_html_rules[c] || c;
      }

      exports.escape = jade_escape;
      function jade_escape(html) {
        var result = String(html).replace(jade_match_html, jade_encode_char);
        if (result === '' + html) return html;else return result;
      };

      /**
       * Re-throw the given `err` in context to the
       * the jade in `filename` at the given `lineno`.
       *
       * @param {Error} err
       * @param {String} filename
       * @param {String} lineno
       * @api private
       */

      exports.rethrow = function rethrow(err, filename, lineno, str) {
        if (!(err instanceof Error)) throw err;
        if ((typeof window != 'undefined' || !filename) && !str) {
          err.message += ' on line ' + lineno;
          throw err;
        }
        try {
          str = str || require('fs').readFileSync(filename, 'utf8');
        } catch (ex) {
          rethrow(err, null, lineno);
        }
        var context = 3,
            lines = str.split('\n'),
            start = Math.max(lineno - context, 0),
            end = Math.min(lines.length, lineno + context);

        // Error context
        var context = lines.slice(start, end).map(function (line, i) {
          var curr = i + start + 1;
          return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
        }).join('\n');

        // Alter exception message
        err.path = filename;
        err.message = (filename || 'Jade') + ':' + lineno + '\n' + context + '\n\n' + err.message;
        throw err;
      };

      exports.DebugItem = function DebugItem(lineno, filename) {
        this.lineno = lineno;
        this.filename = filename;
      };
    }, { "fs": 2 }], 2: [function (require, module, exports) {}, {}] }, {}, [1])(1);
});
"use strict";

Accordion = function (e) {
  function n() {
    s.addEventListener("click", t), o(), a && c(a);
  }function t(e) {
    -1 !== e.target.className.indexOf(y) && (r && o(), l(e.target.nextElementSibling));
  }function o() {
    [].forEach.call(s.querySelectorAll("." + d), function (e) {
      e.style.display = "none";
    });
  }function l(e) {
    e.style.display = "none" !== e.style.display ? "none" : "";
  }function c(e) {
    r && o(), s.querySelectorAll("." + d)[e - 1].style.display = "";
  }function i(e) {
    s.querySelectorAll("." + d)[e - 1].style.display = "none";
  }var s = document.getElementById(e.elem),
      a = e.open || void 0,
      r = e.oneOpen || !1,
      y = "o-accordion__title",
      d = "o-accordion__content";n(), this.open = c, this.close = i;
};
'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var menu = document.getElementById('menu'),
        WINDOW_CHANGE_EVENT = 'onorientationchange' in window ? 'orientationchange' : 'resize';

    function toggleHorizontal() {
        [].forEach.call(document.getElementById('menu').querySelectorAll('.custom-can-transform'), function (el) {
            el.classList.toggle('o-menu--horizontal');
        });
    };

    // Toggle menu
    function toggleMenu() {
        // set timeout so that the panel has a chance to roll up
        // before the menu switches states
        if (menu.classList.contains('open')) {
            setTimeout(toggleHorizontal, 500);
        } else {
            toggleHorizontal();
        }
        menu.classList.toggle('open');
        document.getElementById('toggle').classList.toggle('x');
    };

    function closeMenu() {
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    document.getElementById('toggle').addEventListener('click', function (e) {
        toggleMenu();
    });

    window.addEventListener(WINDOW_CHANGE_EVENT, closeMenu);
});

//# sourceMappingURL=app.js.map