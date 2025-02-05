/*!
 * Simple-Jekyll-Search v1.6.0 (https://github.com/christian-fei/Simple-Jekyll-Search)
 * Copyright 2015-2017, Christian Fei
 * Licensed under the MIT License.
 */

function toggle() {
  var x = document.getElementById("mobile-menu");
  if (x.classList.contains("block")) {
    x.classList.remove("block");
    x.classList.add("hidden");
  } else {
    x.classList.remove("hidden");
    x.classList.add("block");
  }
}

function toggleSearch() {
  var x = document.getElementById("search-menu");
  if (x.classList.contains("block")) {
    x.classList.remove("block");
    x.classList.add("hidden");
  } else {
    x.classList.remove("hidden");
    x.classList.add("block");
  }
}

!(function () {
  "use strict";
  function e(e) {
    return (
      Boolean(e) && "[object Object]" === Object.prototype.toString.call(e)
    );
  }
  function t(e) {
    return a.push(e), a;
  }
  var n = {
      load: function (e, t) {
        var n = window.XMLHttpRequest
          ? new XMLHttpRequest()
          : new ActiveXObject("Microsoft.XMLHTTP");
        n.open("GET", e, !0),
          (n.onreadystatechange = (function (e, t) {
            return function () {
              if (4 === e.readyState && 200 === e.status)
                try {
                  t(null, JSON.parse(e.responseText));
                } catch (n) {
                  t(n, null);
                }
            };
          })(n, t)),
          n.send();
      },
    },
    r = function (e, t) {
      var n = t.length,
        r = e.length;
      if (r > n) return !1;
      if (r === n) return e === t;
      e: for (var i = 0, o = 0; i < r; i++) {
        for (var u = e.charCodeAt(i); o < n; )
          if (t.charCodeAt(o++) === u) continue e;
        return !1;
      }
      return !0;
    },
    i = new (function () {
      this.matches = function (e, t) {
        return r(t, e);
      };
    })(),
    o = new (function () {
      this.matches = function (e, t) {
        return (
          "string" == typeof e &&
          (e = e.trim()).toLowerCase().indexOf(t.toLowerCase()) >= 0
        );
      };
    })(),
    u = {
      put: function (n) {
        return e(n)
          ? t(n)
          : (function (e) {
              return (
                Boolean(e) &&
                "[object Array]" === Object.prototype.toString.call(e)
              );
            })(n)
          ? (function (n) {
              for (var r = [], i = 0, o = n.length; i < o; i++)
                e(n[i]) && r.push(t(n[i]));
              return r;
            })(n)
          : undefined;
      },
      clear: function () {
        return (a.length = 0), a;
      },
      search: function (e) {
        return e
          ? (function (e, t, n, r) {
              for (var i = [], o = 0; o < e.length && i.length < r.limit; o++) {
                var u = (function (e, t, n, r) {
                  for (var i in e)
                    if (
                      !(function (e, t) {
                        for (
                          var n = !1, r = 0, i = (t = t || []).length;
                          r < i;
                          r++
                        ) {
                          var o = t[r];
                          !n && new RegExp(e).test(o) && (n = !0);
                        }
                        return n;
                      })(e[i], r.exclude) &&
                      n.matches(e[i], t)
                    )
                      return e;
                })(e[o], t, n, r);
                u && i.push(u);
              }
              return i;
            })(a, e, l.searchStrategy, l)
          : [];
      },
      setOptions: function (e) {
        ((l = e || {}).fuzzy = e.fuzzy || !1),
          (l.limit = e.limit || 10),
          (l.searchStrategy = e.fuzzy ? i : o);
      },
    },
    a = [],
    l = {};
  (l.fuzzy = !1), (l.limit = 10), (l.searchStrategy = l.fuzzy ? i : o);
  var c = {
      compile: function (e) {
        return f.template.replace(f.pattern, function (t, n) {
          var r = f.middleware(n, e[n], f.template);
          return void 0 !== r ? r : e[n] || t;
        });
      },
      setOptions: function (e) {
        (f.pattern = e.pattern || f.pattern),
          (f.template = e.template || f.template),
          "function" == typeof e.middleware && (f.middleware = e.middleware);
      },
    },
    f = {};
  (f.pattern = /\{(.*?)\}/g),
    (f.template = ""),
    (f.middleware = function () {});
  var s = {
    merge: function (e, t) {
      var n = {};
      for (var r in e)
        Object.prototype.hasOwnProperty.call(e, r) &&
          ((n[r] = e[r]), "undefined" != typeof t[r] && (n[r] = t[r]));
      return n;
    },
    isJSON: function (e) {
      try {
        return !!(e instanceof Object && JSON.parse(JSON.stringify(e)));
      } catch (t) {
        return !1;
      }
    },
  };
  !(function (e) {
    function t(e) {
      u.put(e),
        a.searchInput.addEventListener("keyup", function (e) {
          (function (e) {
            return -1 === [13, 16, 20, 37, 38, 39, 40, 91].indexOf(e);
          })(e.which) &&
            ((a.resultsContainer.innerHTML = ""), i(e.target.value));
        });
    }
    function r(e) {
      a.resultsContainer.innerHTML += e;
    }
    function i(e) {
      (function (e) {
        return e && e.length > 0;
      })(e) &&
        (function (e) {
          var t = e.length;
          if (0 === t) return r(a.noResultsText);
          for (var n = 0; n < t; n++) r(c.compile(e[n]));
        })(u.search(e));
    }
    function o(e) {
      throw new Error("SimpleJekyllSearch --- " + e);
    }
    var a = {
        searchInput: null,
        resultsContainer: null,
        json: [],
        searchResultTemplate:
          '<li><a href="{url}" title="{desc}">{title}</a></li>',
        templateMiddleware: function () {},
        noResultsText: "No results found",
        limit: 10,
        fuzzy: !1,
        exclude: [],
      },
      l = ["searchInput", "resultsContainer", "json"],
      f = (function p(e) {
        if (
          !(function (e) {
            return (
              !!e &&
              "undefined" != typeof e.required &&
              e.required instanceof Array
            );
          })(e)
        )
          throw new Error("-- OptionsValidator: required options missing");
        if (!(this instanceof p)) return new p(e);
        var t = e.required;
        (this.getRequiredOptions = function () {
          return t;
        }),
          (this.validate = function (e) {
            var n = [];
            return (
              t.forEach(function (t) {
                "undefined" == typeof e[t] && n.push(t);
              }),
              n
            );
          });
      })({ required: l });
    (e.SimpleJekyllSearch = function (e) {
      return (
        f.validate(e).length > 0 &&
          o("You must specify the following required options: " + l),
        (a = s.merge(a, e)),
        c.setOptions({
          template: a.searchResultTemplate,
          middleware: a.templateMiddleware,
        }),
        u.setOptions({ fuzzy: a.fuzzy, limit: a.limit }),
        s.isJSON(a.json)
          ? t(a.json)
          : (function (e) {
              n.load(e, function (n, r) {
                n && o("failed to get JSON (" + e + ")"), t(r);
              });
            })(a.json),
        { search: i }
      );
    }),
      (e.SimpleJekyllSearch.init = e.SimpleJekyllSearch),
      "function" == typeof e.SimpleJekyllSearchInit &&
        e.SimpleJekyllSearchInit.call(this, e.SimpleJekyllSearch);
  })(window);
})();
