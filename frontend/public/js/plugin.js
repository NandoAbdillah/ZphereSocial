/*! modernizr 3.5.0 (Custom Build) | MIT *
 * https://modernizr.com/download/?-cssanimations-csscolumns-customelements-flexbox-history-picture-pointerevents-postmessage-sizes-srcset-webgl-websockets-webworkers-addtest-domprefixes-hasevent-mq-prefixedcssvalue-prefixes-setclasses-testallprops-testprop-teststyles !*/
!(function (e, t, n) {
    function r(e, t) {
        return typeof e === t;
    }
    function o() {
        var e, t, n, o, i, s, a;
        for (var l in C)
            if (C.hasOwnProperty(l)) {
                if (
                    ((e = []),
                    (t = C[l]),
                    t.name &&
                        (e.push(t.name.toLowerCase()),
                        t.options &&
                            t.options.aliases &&
                            t.options.aliases.length))
                )
                    for (n = 0; n < t.options.aliases.length; n++)
                        e.push(t.options.aliases[n].toLowerCase());
                for (
                    o = r(t.fn, "function") ? t.fn() : t.fn, i = 0;
                    i < e.length;
                    i++
                )
                    (s = e[i]),
                        (a = s.split(".")),
                        1 === a.length
                            ? (Modernizr[a[0]] = o)
                            : (!Modernizr[a[0]] ||
                                  Modernizr[a[0]] instanceof Boolean ||
                                  (Modernizr[a[0]] = new Boolean(
                                      Modernizr[a[0]]
                                  )),
                              (Modernizr[a[0]][a[1]] = o)),
                        w.push((o ? "" : "no-") + a.join("-"));
            }
    }
    function i(e) {
        var t = S.className,
            n = Modernizr._config.classPrefix || "";
        if ((x && (t = t.baseVal), Modernizr._config.enableJSClass)) {
            var r = new RegExp("(^|\\s)" + n + "no-js(\\s|$)");
            t = t.replace(r, "$1" + n + "js$2");
        }
        Modernizr._config.enableClasses &&
            ((t += " " + n + e.join(" " + n)),
            x ? (S.className.baseVal = t) : (S.className = t));
    }
    function s(e, t) {
        if ("object" == typeof e) for (var n in e) P(e, n) && s(n, e[n]);
        else {
            e = e.toLowerCase();
            var r = e.split("."),
                o = Modernizr[r[0]];
            if ((2 == r.length && (o = o[r[1]]), "undefined" != typeof o))
                return Modernizr;
            (t = "function" == typeof t ? t() : t),
                1 == r.length
                    ? (Modernizr[r[0]] = t)
                    : (!Modernizr[r[0]] ||
                          Modernizr[r[0]] instanceof Boolean ||
                          (Modernizr[r[0]] = new Boolean(Modernizr[r[0]])),
                      (Modernizr[r[0]][r[1]] = t)),
                i([(t && 0 != t ? "" : "no-") + r.join("-")]),
                Modernizr._trigger(e, t);
        }
        return Modernizr;
    }
    function a() {
        return "function" != typeof t.createElement
            ? t.createElement(arguments[0])
            : x
            ? t.createElementNS.call(
                  t,
                  "http://www.w3.org/2000/svg",
                  arguments[0]
              )
            : t.createElement.apply(t, arguments);
    }
    function l() {
        var e = t.body;
        return e || ((e = a(x ? "svg" : "body")), (e.fake = !0)), e;
    }
    function u(e, n, r, o) {
        var i,
            s,
            u,
            f,
            d = "modernizr",
            c = a("div"),
            p = l();
        if (parseInt(r, 10))
            for (; r--; )
                (u = a("div")),
                    (u.id = o ? o[r] : d + (r + 1)),
                    c.appendChild(u);
        return (
            (i = a("style")),
            (i.type = "text/css"),
            (i.id = "s" + d),
            (p.fake ? p : c).appendChild(i),
            p.appendChild(c),
            i.styleSheet
                ? (i.styleSheet.cssText = e)
                : i.appendChild(t.createTextNode(e)),
            (c.id = d),
            p.fake &&
                ((p.style.background = ""),
                (p.style.overflow = "hidden"),
                (f = S.style.overflow),
                (S.style.overflow = "hidden"),
                S.appendChild(p)),
            (s = n(c, e)),
            p.fake
                ? (p.parentNode.removeChild(p),
                  (S.style.overflow = f),
                  S.offsetHeight)
                : c.parentNode.removeChild(c),
            !!s
        );
    }
    function f(e, t) {
        return !!~("" + e).indexOf(t);
    }
    function d(e) {
        return e
            .replace(/([A-Z])/g, function (e, t) {
                return "-" + t.toLowerCase();
            })
            .replace(/^ms-/, "-ms-");
    }
    function c(t, n, r) {
        var o;
        if ("getComputedStyle" in e) {
            o = getComputedStyle.call(e, t, n);
            var i = e.console;
            if (null !== o) r && (o = o.getPropertyValue(r));
            else if (i) {
                var s = i.error ? "error" : "log";
                i[s].call(
                    i,
                    "getComputedStyle returning null, its possible modernizr test results are inaccurate"
                );
            }
        } else o = !n && t.currentStyle && t.currentStyle[r];
        return o;
    }
    function p(t, r) {
        var o = t.length;
        if ("CSS" in e && "supports" in e.CSS) {
            for (; o--; ) if (e.CSS.supports(d(t[o]), r)) return !0;
            return !1;
        }
        if ("CSSSupportsRule" in e) {
            for (var i = []; o--; ) i.push("(" + d(t[o]) + ":" + r + ")");
            return (
                (i = i.join(" or ")),
                u(
                    "@supports (" +
                        i +
                        ") { #modernizr { position: absolute; } }",
                    function (e) {
                        return "absolute" == c(e, null, "position");
                    }
                )
            );
        }
        return n;
    }
    function m(e) {
        return e
            .replace(/([a-z])-([a-z])/g, function (e, t, n) {
                return t + n.toUpperCase();
            })
            .replace(/^-/, "");
    }
    function h(e, t, o, i) {
        function s() {
            u && (delete N.style, delete N.modElem);
        }
        if (((i = r(i, "undefined") ? !1 : i), !r(o, "undefined"))) {
            var l = p(e, o);
            if (!r(l, "undefined")) return l;
        }
        for (
            var u, d, c, h, v, A = ["modernizr", "tspan", "samp"];
            !N.style && A.length;

        )
            (u = !0), (N.modElem = a(A.shift())), (N.style = N.modElem.style);
        for (c = e.length, d = 0; c > d; d++)
            if (
                ((h = e[d]),
                (v = N.style[h]),
                f(h, "-") && (h = m(h)),
                N.style[h] !== n)
            ) {
                if (i || r(o, "undefined")) return s(), "pfx" == t ? h : !0;
                try {
                    N.style[h] = o;
                } catch (g) {}
                if (N.style[h] != v) return s(), "pfx" == t ? h : !0;
            }
        return s(), !1;
    }
    function v(e, t) {
        return function () {
            return e.apply(t, arguments);
        };
    }
    function A(e, t, n) {
        var o;
        for (var i in e)
            if (e[i] in t)
                return n === !1
                    ? e[i]
                    : ((o = t[e[i]]), r(o, "function") ? v(o, n || t) : o);
        return !1;
    }
    function g(e, t, n, o, i) {
        var s = e.charAt(0).toUpperCase() + e.slice(1),
            a = (e + " " + O.join(s + " ") + s).split(" ");
        return r(t, "string") || r(t, "undefined")
            ? h(a, t, o, i)
            : ((a = (e + " " + T.join(s + " ") + s).split(" ")), A(a, t, n));
    }
    function y(e, t, r) {
        return g(e, n, n, t, r);
    }
    var C = [],
        b = {
            _version: "3.5.0",
            _config: {
                classPrefix: "",
                enableClasses: !0,
                enableJSClass: !0,
                usePrefixes: !0,
            },
            _q: [],
            on: function (e, t) {
                var n = this;
                setTimeout(function () {
                    t(n[e]);
                }, 0);
            },
            addTest: function (e, t, n) {
                C.push({ name: e, fn: t, options: n });
            },
            addAsyncTest: function (e) {
                C.push({ name: null, fn: e });
            },
        },
        Modernizr = function () {};
    (Modernizr.prototype = b), (Modernizr = new Modernizr());
    var w = [],
        S = t.documentElement,
        x = "svg" === S.nodeName.toLowerCase(),
        _ = "Moz O ms Webkit",
        T = b._config.usePrefixes ? _.toLowerCase().split(" ") : [];
    b._domPrefixes = T;
    var E = b._config.usePrefixes
        ? " -webkit- -moz- -o- -ms- ".split(" ")
        : ["", ""];
    b._prefixes = E;
    var P;
    !(function () {
        var e = {}.hasOwnProperty;
        P =
            r(e, "undefined") || r(e.call, "undefined")
                ? function (e, t) {
                      return (
                          t in e && r(e.constructor.prototype[t], "undefined")
                      );
                  }
                : function (t, n) {
                      return e.call(t, n);
                  };
    })(),
        (b._l = {}),
        (b.on = function (e, t) {
            this._l[e] || (this._l[e] = []),
                this._l[e].push(t),
                Modernizr.hasOwnProperty(e) &&
                    setTimeout(function () {
                        Modernizr._trigger(e, Modernizr[e]);
                    }, 0);
        }),
        (b._trigger = function (e, t) {
            if (this._l[e]) {
                var n = this._l[e];
                setTimeout(function () {
                    var e, r;
                    for (e = 0; e < n.length; e++) (r = n[e])(t);
                }, 0),
                    delete this._l[e];
            }
        }),
        Modernizr._q.push(function () {
            b.addTest = s;
        });
    var k = (function () {
        function e(e, t) {
            var o;
            return e
                ? ((t && "string" != typeof t) || (t = a(t || "div")),
                  (e = "on" + e),
                  (o = e in t),
                  !o &&
                      r &&
                      (t.setAttribute || (t = a("div")),
                      t.setAttribute(e, ""),
                      (o = "function" == typeof t[e]),
                      t[e] !== n && (t[e] = n),
                      t.removeAttribute(e)),
                  o)
                : !1;
        }
        var r = !("onblur" in t.documentElement);
        return e;
    })();
    b.hasEvent = k;
    var z = (function () {
        var t = e.matchMedia || e.msMatchMedia;
        return t
            ? function (e) {
                  var n = t(e);
                  return (n && n.matches) || !1;
              }
            : function (t) {
                  var n = !1;
                  return (
                      u(
                          "@media " +
                              t +
                              " { #modernizr { position: absolute; } }",
                          function (t) {
                              n =
                                  "absolute" ==
                                  (e.getComputedStyle
                                      ? e.getComputedStyle(t, null)
                                      : t.currentStyle
                                  ).position;
                          }
                      ),
                      n
                  );
              };
    })();
    b.mq = z;
    var B = function (e, t) {
        var n = !1,
            r = a("div"),
            o = r.style;
        if (e in o) {
            var i = T.length;
            for (o[e] = t, n = o[e]; i-- && !n; )
                (o[e] = "-" + T[i] + "-" + t), (n = o[e]);
        }
        return "" === n && (n = !1), n;
    };
    b.prefixedCSSValue = B;
    var O = b._config.usePrefixes ? _.split(" ") : [];
    b._cssomPrefixes = O;
    var L = { elem: a("modernizr") };
    Modernizr._q.push(function () {
        delete L.elem;
    });
    var N = { style: L.elem.style };
    Modernizr._q.unshift(function () {
        delete N.style;
    }),
        (b.testAllProps = g),
        (b.testAllProps = y);
    (b.testProp = function (e, t, r) {
        return h([e], n, t, r);
    }),
        (b.testStyles = u);
    Modernizr.addTest("customelements", "customElements" in e),
        Modernizr.addTest("history", function () {
            var t = navigator.userAgent;
            return (-1 === t.indexOf("Android 2.") &&
                -1 === t.indexOf("Android 4.0")) ||
                -1 === t.indexOf("Mobile Safari") ||
                -1 !== t.indexOf("Chrome") ||
                -1 !== t.indexOf("Windows Phone") ||
                "file:" === location.protocol
                ? e.history && "pushState" in e.history
                : !1;
        }),
        Modernizr.addTest("pointerevents", function () {
            var e = !1,
                t = T.length;
            for (e = Modernizr.hasEvent("pointerdown"); t-- && !e; )
                k(T[t] + "pointerdown") && (e = !0);
            return e;
        }),
        Modernizr.addTest("postmessage", "postMessage" in e),
        Modernizr.addTest("webgl", function () {
            var t = a("canvas"),
                n =
                    "probablySupportsContext" in t
                        ? "probablySupportsContext"
                        : "supportsContext";
            return n in t
                ? t[n]("webgl") || t[n]("experimental-webgl")
                : "WebGLRenderingContext" in e;
        });
    var R = !1;
    try {
        R = "WebSocket" in e && 2 === e.WebSocket.CLOSING;
    } catch (j) {}
    Modernizr.addTest("websockets", R),
        Modernizr.addTest("cssanimations", y("animationName", "a", !0)),
        (function () {
            Modernizr.addTest("csscolumns", function () {
                var e = !1,
                    t = y("columnCount");
                try {
                    (e = !!t), e && (e = new Boolean(e));
                } catch (n) {}
                return e;
            });
            for (
                var e,
                    t,
                    n = [
                        "Width",
                        "Span",
                        "Fill",
                        "Gap",
                        "Rule",
                        "RuleColor",
                        "RuleStyle",
                        "RuleWidth",
                        "BreakBefore",
                        "BreakAfter",
                        "BreakInside",
                    ],
                    r = 0;
                r < n.length;
                r++
            )
                (e = n[r].toLowerCase()),
                    (t = y("column" + n[r])),
                    ("breakbefore" === e ||
                        "breakafter" === e ||
                        "breakinside" == e) &&
                        (t = t || y(n[r])),
                    Modernizr.addTest("csscolumns." + e, t);
        })(),
        Modernizr.addTest("flexbox", y("flexBasis", "1px", !0)),
        Modernizr.addTest("picture", "HTMLPictureElement" in e),
        Modernizr.addAsyncTest(function () {
            var e,
                t,
                n,
                r = a("img"),
                o = "sizes" in r;
            !o && "srcset" in r
                ? ((t =
                      "data:image/gif;base64,R0lGODlhAgABAPAAAP///wAAACH5BAAAAAAALAAAAAACAAEAAAICBAoAOw=="),
                  (e =
                      "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw=="),
                  (n = function () {
                      s("sizes", 2 == r.width);
                  }),
                  (r.onload = n),
                  (r.onerror = n),
                  r.setAttribute("sizes", "9px"),
                  (r.srcset = e + " 1w," + t + " 8w"),
                  (r.src = e))
                : s("sizes", o);
        }),
        Modernizr.addTest("srcset", "srcset" in a("img")),
        Modernizr.addTest("webworkers", "Worker" in e),
        o(),
        i(w),
        delete b.addTest,
        delete b.addAsyncTest;
    for (var M = 0; M < Modernizr._q.length; M++) Modernizr._q[M]();
    e.Modernizr = Modernizr;
})(window, document);

/*! jQuery v1.12.4 | (c) jQuery Foundation | jquery.org/license */
!(function (a, b) {
    "object" == typeof module && "object" == typeof module.exports
        ? (module.exports = a.document
              ? b(a, !0)
              : function (a) {
                    if (!a.document)
                        throw new Error(
                            "jQuery requires a window with a document"
                        );
                    return b(a);
                })
        : b(a);
})("undefined" != typeof window ? window : this, function (a, b) {
    var c = [],
        d = a.document,
        e = c.slice,
        f = c.concat,
        g = c.push,
        h = c.indexOf,
        i = {},
        j = i.toString,
        k = i.hasOwnProperty,
        l = {},
        m = "1.12.4",
        n = function (a, b) {
            return new n.fn.init(a, b);
        },
        o = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        p = /^-ms-/,
        q = /-([\da-z])/gi,
        r = function (a, b) {
            return b.toUpperCase();
        };
    (n.fn = n.prototype =
        {
            jquery: m,
            constructor: n,
            selector: "",
            length: 0,
            toArray: function () {
                return e.call(this);
            },
            get: function (a) {
                return null != a
                    ? 0 > a
                        ? this[a + this.length]
                        : this[a]
                    : e.call(this);
            },
            pushStack: function (a) {
                var b = n.merge(this.constructor(), a);
                return (b.prevObject = this), (b.context = this.context), b;
            },
            each: function (a) {
                return n.each(this, a);
            },
            map: function (a) {
                return this.pushStack(
                    n.map(this, function (b, c) {
                        return a.call(b, c, b);
                    })
                );
            },
            slice: function () {
                return this.pushStack(e.apply(this, arguments));
            },
            first: function () {
                return this.eq(0);
            },
            last: function () {
                return this.eq(-1);
            },
            eq: function (a) {
                var b = this.length,
                    c = +a + (0 > a ? b : 0);
                return this.pushStack(c >= 0 && b > c ? [this[c]] : []);
            },
            end: function () {
                return this.prevObject || this.constructor();
            },
            push: g,
            sort: c.sort,
            splice: c.splice,
        }),
        (n.extend = n.fn.extend =
            function () {
                var a,
                    b,
                    c,
                    d,
                    e,
                    f,
                    g = arguments[0] || {},
                    h = 1,
                    i = arguments.length,
                    j = !1;
                for (
                    "boolean" == typeof g &&
                        ((j = g), (g = arguments[h] || {}), h++),
                        "object" == typeof g || n.isFunction(g) || (g = {}),
                        h === i && ((g = this), h--);
                    i > h;
                    h++
                )
                    if (null != (e = arguments[h]))
                        for (d in e)
                            (a = g[d]),
                                (c = e[d]),
                                g !== c &&
                                    (j &&
                                    c &&
                                    (n.isPlainObject(c) || (b = n.isArray(c)))
                                        ? (b
                                              ? ((b = !1),
                                                (f =
                                                    a && n.isArray(a) ? a : []))
                                              : (f =
                                                    a && n.isPlainObject(a)
                                                        ? a
                                                        : {}),
                                          (g[d] = n.extend(j, f, c)))
                                        : void 0 !== c && (g[d] = c));
                return g;
            }),
        n.extend({
            expando: "jQuery" + (m + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (a) {
                throw new Error(a);
            },
            noop: function () {},
            isFunction: function (a) {
                return "function" === n.type(a);
            },
            isArray:
                Array.isArray ||
                function (a) {
                    return "array" === n.type(a);
                },
            isWindow: function (a) {
                return null != a && a == a.window;
            },
            isNumeric: function (a) {
                var b = a && a.toString();
                return !n.isArray(a) && b - parseFloat(b) + 1 >= 0;
            },
            isEmptyObject: function (a) {
                var b;
                for (b in a) return !1;
                return !0;
            },
            isPlainObject: function (a) {
                var b;
                if (!a || "object" !== n.type(a) || a.nodeType || n.isWindow(a))
                    return !1;
                try {
                    if (
                        a.constructor &&
                        !k.call(a, "constructor") &&
                        !k.call(a.constructor.prototype, "isPrototypeOf")
                    )
                        return !1;
                } catch (c) {
                    return !1;
                }
                if (!l.ownFirst) for (b in a) return k.call(a, b);
                for (b in a);
                return void 0 === b || k.call(a, b);
            },
            type: function (a) {
                return null == a
                    ? a + ""
                    : "object" == typeof a || "function" == typeof a
                    ? i[j.call(a)] || "object"
                    : typeof a;
            },
            globalEval: function (b) {
                b &&
                    n.trim(b) &&
                    (
                        a.execScript ||
                        function (b) {
                            a.eval.call(a, b);
                        }
                    )(b);
            },
            camelCase: function (a) {
                return a.replace(p, "ms-").replace(q, r);
            },
            nodeName: function (a, b) {
                return (
                    a.nodeName && a.nodeName.toLowerCase() === b.toLowerCase()
                );
            },
            each: function (a, b) {
                var c,
                    d = 0;
                if (s(a)) {
                    for (c = a.length; c > d; d++)
                        if (b.call(a[d], d, a[d]) === !1) break;
                } else for (d in a) if (b.call(a[d], d, a[d]) === !1) break;
                return a;
            },
            trim: function (a) {
                return null == a ? "" : (a + "").replace(o, "");
            },
            makeArray: function (a, b) {
                var c = b || [];
                return (
                    null != a &&
                        (s(Object(a))
                            ? n.merge(c, "string" == typeof a ? [a] : a)
                            : g.call(c, a)),
                    c
                );
            },
            inArray: function (a, b, c) {
                var d;
                if (b) {
                    if (h) return h.call(b, a, c);
                    for (
                        d = b.length,
                            c = c ? (0 > c ? Math.max(0, d + c) : c) : 0;
                        d > c;
                        c++
                    )
                        if (c in b && b[c] === a) return c;
                }
                return -1;
            },
            merge: function (a, b) {
                var c = +b.length,
                    d = 0,
                    e = a.length;
                while (c > d) a[e++] = b[d++];
                if (c !== c) while (void 0 !== b[d]) a[e++] = b[d++];
                return (a.length = e), a;
            },
            grep: function (a, b, c) {
                for (var d, e = [], f = 0, g = a.length, h = !c; g > f; f++)
                    (d = !b(a[f], f)), d !== h && e.push(a[f]);
                return e;
            },
            map: function (a, b, c) {
                var d,
                    e,
                    g = 0,
                    h = [];
                if (s(a))
                    for (d = a.length; d > g; g++)
                        (e = b(a[g], g, c)), null != e && h.push(e);
                else for (g in a) (e = b(a[g], g, c)), null != e && h.push(e);
                return f.apply([], h);
            },
            guid: 1,
            proxy: function (a, b) {
                var c, d, f;
                return (
                    "string" == typeof b && ((f = a[b]), (b = a), (a = f)),
                    n.isFunction(a)
                        ? ((c = e.call(arguments, 2)),
                          (d = function () {
                              return a.apply(
                                  b || this,
                                  c.concat(e.call(arguments))
                              );
                          }),
                          (d.guid = a.guid = a.guid || n.guid++),
                          d)
                        : void 0
                );
            },
            now: function () {
                return +new Date();
            },
            support: l,
        }),
        "function" == typeof Symbol &&
            (n.fn[Symbol.iterator] = c[Symbol.iterator]),
        n.each(
            "Boolean Number String Function Array Date RegExp Object Error Symbol".split(
                " "
            ),
            function (a, b) {
                i["[object " + b + "]"] = b.toLowerCase();
            }
        );
    function s(a) {
        var b = !!a && "length" in a && a.length,
            c = n.type(a);
        return "function" === c || n.isWindow(a)
            ? !1
            : "array" === c ||
                  0 === b ||
                  ("number" == typeof b && b > 0 && b - 1 in a);
    }
    var t = (function (a) {
        var b,
            c,
            d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            l,
            m,
            n,
            o,
            p,
            q,
            r,
            s,
            t,
            u = "sizzle" + 1 * new Date(),
            v = a.document,
            w = 0,
            x = 0,
            y = ga(),
            z = ga(),
            A = ga(),
            B = function (a, b) {
                return a === b && (l = !0), 0;
            },
            C = 1 << 31,
            D = {}.hasOwnProperty,
            E = [],
            F = E.pop,
            G = E.push,
            H = E.push,
            I = E.slice,
            J = function (a, b) {
                for (var c = 0, d = a.length; d > c; c++)
                    if (a[c] === b) return c;
                return -1;
            },
            K =
                "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",
            L = "[\\x20\\t\\r\\n\\f]",
            M = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",
            N =
                "\\[" +
                L +
                "*(" +
                M +
                ")(?:" +
                L +
                "*([*^$|!~]?=)" +
                L +
                "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" +
                M +
                "))|)" +
                L +
                "*\\]",
            O =
                ":(" +
                M +
                ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" +
                N +
                ")*)|.*)\\)|)",
            P = new RegExp(L + "+", "g"),
            Q = new RegExp(
                "^" + L + "+|((?:^|[^\\\\])(?:\\\\.)*)" + L + "+$",
                "g"
            ),
            R = new RegExp("^" + L + "*," + L + "*"),
            S = new RegExp("^" + L + "*([>+~]|" + L + ")" + L + "*"),
            T = new RegExp("=" + L + "*([^\\]'\"]*?)" + L + "*\\]", "g"),
            U = new RegExp(O),
            V = new RegExp("^" + M + "$"),
            W = {
                ID: new RegExp("^#(" + M + ")"),
                CLASS: new RegExp("^\\.(" + M + ")"),
                TAG: new RegExp("^(" + M + "|[*])"),
                ATTR: new RegExp("^" + N),
                PSEUDO: new RegExp("^" + O),
                CHILD: new RegExp(
                    "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" +
                        L +
                        "*(even|odd|(([+-]|)(\\d*)n|)" +
                        L +
                        "*(?:([+-]|)" +
                        L +
                        "*(\\d+)|))" +
                        L +
                        "*\\)|)",
                    "i"
                ),
                bool: new RegExp("^(?:" + K + ")$", "i"),
                needsContext: new RegExp(
                    "^" +
                        L +
                        "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
                        L +
                        "*((?:-\\d)?\\d*)" +
                        L +
                        "*\\)|)(?=[^-]|$)",
                    "i"
                ),
            },
            X = /^(?:input|select|textarea|button)$/i,
            Y = /^h\d$/i,
            Z = /^[^{]+\{\s*\[native \w/,
            $ = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
            _ = /[+~]/,
            aa = /'|\\/g,
            ba = new RegExp(
                "\\\\([\\da-f]{1,6}" + L + "?|(" + L + ")|.)",
                "ig"
            ),
            ca = function (a, b, c) {
                var d = "0x" + b - 65536;
                return d !== d || c
                    ? b
                    : 0 > d
                    ? String.fromCharCode(d + 65536)
                    : String.fromCharCode(
                          (d >> 10) | 55296,
                          (1023 & d) | 56320
                      );
            },
            da = function () {
                m();
            };
        try {
            H.apply((E = I.call(v.childNodes)), v.childNodes),
                E[v.childNodes.length].nodeType;
        } catch (ea) {
            H = {
                apply: E.length
                    ? function (a, b) {
                          G.apply(a, I.call(b));
                      }
                    : function (a, b) {
                          var c = a.length,
                              d = 0;
                          while ((a[c++] = b[d++]));
                          a.length = c - 1;
                      },
            };
        }
        function fa(a, b, d, e) {
            var f,
                h,
                j,
                k,
                l,
                o,
                r,
                s,
                w = b && b.ownerDocument,
                x = b ? b.nodeType : 9;
            if (
                ((d = d || []),
                "string" != typeof a || !a || (1 !== x && 9 !== x && 11 !== x))
            )
                return d;
            if (
                !e &&
                ((b ? b.ownerDocument || b : v) !== n && m(b), (b = b || n), p)
            ) {
                if (11 !== x && (o = $.exec(a)))
                    if ((f = o[1])) {
                        if (9 === x) {
                            if (!(j = b.getElementById(f))) return d;
                            if (j.id === f) return d.push(j), d;
                        } else if (
                            w &&
                            (j = w.getElementById(f)) &&
                            t(b, j) &&
                            j.id === f
                        )
                            return d.push(j), d;
                    } else {
                        if (o[2])
                            return H.apply(d, b.getElementsByTagName(a)), d;
                        if (
                            (f = o[3]) &&
                            c.getElementsByClassName &&
                            b.getElementsByClassName
                        )
                            return H.apply(d, b.getElementsByClassName(f)), d;
                    }
                if (c.qsa && !A[a + " "] && (!q || !q.test(a))) {
                    if (1 !== x) (w = b), (s = a);
                    else if ("object" !== b.nodeName.toLowerCase()) {
                        (k = b.getAttribute("id"))
                            ? (k = k.replace(aa, "\\$&"))
                            : b.setAttribute("id", (k = u)),
                            (r = g(a)),
                            (h = r.length),
                            (l = V.test(k) ? "#" + k : "[id='" + k + "']");
                        while (h--) r[h] = l + " " + qa(r[h]);
                        (s = r.join(",")),
                            (w = (_.test(a) && oa(b.parentNode)) || b);
                    }
                    if (s)
                        try {
                            return H.apply(d, w.querySelectorAll(s)), d;
                        } catch (y) {
                        } finally {
                            k === u && b.removeAttribute("id");
                        }
                }
            }
            return i(a.replace(Q, "$1"), b, d, e);
        }
        function ga() {
            var a = [];
            function b(c, e) {
                return (
                    a.push(c + " ") > d.cacheLength && delete b[a.shift()],
                    (b[c + " "] = e)
                );
            }
            return b;
        }
        function ha(a) {
            return (a[u] = !0), a;
        }
        function ia(a) {
            var b = n.createElement("div");
            try {
                return !!a(b);
            } catch (c) {
                return !1;
            } finally {
                b.parentNode && b.parentNode.removeChild(b), (b = null);
            }
        }
        function ja(a, b) {
            var c = a.split("|"),
                e = c.length;
            while (e--) d.attrHandle[c[e]] = b;
        }
        function ka(a, b) {
            var c = b && a,
                d =
                    c &&
                    1 === a.nodeType &&
                    1 === b.nodeType &&
                    (~b.sourceIndex || C) - (~a.sourceIndex || C);
            if (d) return d;
            if (c) while ((c = c.nextSibling)) if (c === b) return -1;
            return a ? 1 : -1;
        }
        function la(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && b.type === a;
            };
        }
        function ma(a) {
            return function (b) {
                var c = b.nodeName.toLowerCase();
                return ("input" === c || "button" === c) && b.type === a;
            };
        }
        function na(a) {
            return ha(function (b) {
                return (
                    (b = +b),
                    ha(function (c, d) {
                        var e,
                            f = a([], c.length, b),
                            g = f.length;
                        while (g--) c[(e = f[g])] && (c[e] = !(d[e] = c[e]));
                    })
                );
            });
        }
        function oa(a) {
            return a && "undefined" != typeof a.getElementsByTagName && a;
        }
        (c = fa.support = {}),
            (f = fa.isXML =
                function (a) {
                    var b = a && (a.ownerDocument || a).documentElement;
                    return b ? "HTML" !== b.nodeName : !1;
                }),
            (m = fa.setDocument =
                function (a) {
                    var b,
                        e,
                        g = a ? a.ownerDocument || a : v;
                    return g !== n && 9 === g.nodeType && g.documentElement
                        ? ((n = g),
                          (o = n.documentElement),
                          (p = !f(n)),
                          (e = n.defaultView) &&
                              e.top !== e &&
                              (e.addEventListener
                                  ? e.addEventListener("unload", da, !1)
                                  : e.attachEvent &&
                                    e.attachEvent("onunload", da)),
                          (c.attributes = ia(function (a) {
                              return (
                                  (a.className = "i"),
                                  !a.getAttribute("className")
                              );
                          })),
                          (c.getElementsByTagName = ia(function (a) {
                              return (
                                  a.appendChild(n.createComment("")),
                                  !a.getElementsByTagName("*").length
                              );
                          })),
                          (c.getElementsByClassName = Z.test(
                              n.getElementsByClassName
                          )),
                          (c.getById = ia(function (a) {
                              return (
                                  (o.appendChild(a).id = u),
                                  !n.getElementsByName ||
                                      !n.getElementsByName(u).length
                              );
                          })),
                          c.getById
                              ? ((d.find.ID = function (a, b) {
                                    if (
                                        "undefined" !=
                                            typeof b.getElementById &&
                                        p
                                    ) {
                                        var c = b.getElementById(a);
                                        return c ? [c] : [];
                                    }
                                }),
                                (d.filter.ID = function (a) {
                                    var b = a.replace(ba, ca);
                                    return function (a) {
                                        return a.getAttribute("id") === b;
                                    };
                                }))
                              : (delete d.find.ID,
                                (d.filter.ID = function (a) {
                                    var b = a.replace(ba, ca);
                                    return function (a) {
                                        var c =
                                            "undefined" !=
                                                typeof a.getAttributeNode &&
                                            a.getAttributeNode("id");
                                        return c && c.value === b;
                                    };
                                })),
                          (d.find.TAG = c.getElementsByTagName
                              ? function (a, b) {
                                    return "undefined" !=
                                        typeof b.getElementsByTagName
                                        ? b.getElementsByTagName(a)
                                        : c.qsa
                                        ? b.querySelectorAll(a)
                                        : void 0;
                                }
                              : function (a, b) {
                                    var c,
                                        d = [],
                                        e = 0,
                                        f = b.getElementsByTagName(a);
                                    if ("*" === a) {
                                        while ((c = f[e++]))
                                            1 === c.nodeType && d.push(c);
                                        return d;
                                    }
                                    return f;
                                }),
                          (d.find.CLASS =
                              c.getElementsByClassName &&
                              function (a, b) {
                                  return "undefined" !=
                                      typeof b.getElementsByClassName && p
                                      ? b.getElementsByClassName(a)
                                      : void 0;
                              }),
                          (r = []),
                          (q = []),
                          (c.qsa = Z.test(n.querySelectorAll)) &&
                              (ia(function (a) {
                                  (o.appendChild(a).innerHTML =
                                      "<a id='" +
                                      u +
                                      "'></a><select id='" +
                                      u +
                                      "-\r\\' msallowcapture=''><option selected=''></option></select>"),
                                      a.querySelectorAll("[msallowcapture^='']")
                                          .length &&
                                          q.push("[*^$]=" + L + "*(?:''|\"\")"),
                                      a.querySelectorAll("[selected]").length ||
                                          q.push(
                                              "\\[" + L + "*(?:value|" + K + ")"
                                          ),
                                      a.querySelectorAll("[id~=" + u + "-]")
                                          .length || q.push("~="),
                                      a.querySelectorAll(":checked").length ||
                                          q.push(":checked"),
                                      a.querySelectorAll("a#" + u + "+*")
                                          .length || q.push(".#.+[+~]");
                              }),
                              ia(function (a) {
                                  var b = n.createElement("input");
                                  b.setAttribute("type", "hidden"),
                                      a
                                          .appendChild(b)
                                          .setAttribute("name", "D"),
                                      a.querySelectorAll("[name=d]").length &&
                                          q.push("name" + L + "*[*^$|!~]?="),
                                      a.querySelectorAll(":enabled").length ||
                                          q.push(":enabled", ":disabled"),
                                      a.querySelectorAll("*,:x"),
                                      q.push(",.*:");
                              })),
                          (c.matchesSelector = Z.test(
                              (s =
                                  o.matches ||
                                  o.webkitMatchesSelector ||
                                  o.mozMatchesSelector ||
                                  o.oMatchesSelector ||
                                  o.msMatchesSelector)
                          )) &&
                              ia(function (a) {
                                  (c.disconnectedMatch = s.call(a, "div")),
                                      s.call(a, "[s!='']:x"),
                                      r.push("!=", O);
                              }),
                          (q = q.length && new RegExp(q.join("|"))),
                          (r = r.length && new RegExp(r.join("|"))),
                          (b = Z.test(o.compareDocumentPosition)),
                          (t =
                              b || Z.test(o.contains)
                                  ? function (a, b) {
                                        var c =
                                                9 === a.nodeType
                                                    ? a.documentElement
                                                    : a,
                                            d = b && b.parentNode;
                                        return (
                                            a === d ||
                                            !(
                                                !d ||
                                                1 !== d.nodeType ||
                                                !(c.contains
                                                    ? c.contains(d)
                                                    : a.compareDocumentPosition &&
                                                      16 &
                                                          a.compareDocumentPosition(
                                                              d
                                                          ))
                                            )
                                        );
                                    }
                                  : function (a, b) {
                                        if (b)
                                            while ((b = b.parentNode))
                                                if (b === a) return !0;
                                        return !1;
                                    }),
                          (B = b
                              ? function (a, b) {
                                    if (a === b) return (l = !0), 0;
                                    var d =
                                        !a.compareDocumentPosition -
                                        !b.compareDocumentPosition;
                                    return d
                                        ? d
                                        : ((d =
                                              (a.ownerDocument || a) ===
                                              (b.ownerDocument || b)
                                                  ? a.compareDocumentPosition(b)
                                                  : 1),
                                          1 & d ||
                                          (!c.sortDetached &&
                                              b.compareDocumentPosition(a) ===
                                                  d)
                                              ? a === n ||
                                                (a.ownerDocument === v &&
                                                    t(v, a))
                                                  ? -1
                                                  : b === n ||
                                                    (b.ownerDocument === v &&
                                                        t(v, b))
                                                  ? 1
                                                  : k
                                                  ? J(k, a) - J(k, b)
                                                  : 0
                                              : 4 & d
                                              ? -1
                                              : 1);
                                }
                              : function (a, b) {
                                    if (a === b) return (l = !0), 0;
                                    var c,
                                        d = 0,
                                        e = a.parentNode,
                                        f = b.parentNode,
                                        g = [a],
                                        h = [b];
                                    if (!e || !f)
                                        return a === n
                                            ? -1
                                            : b === n
                                            ? 1
                                            : e
                                            ? -1
                                            : f
                                            ? 1
                                            : k
                                            ? J(k, a) - J(k, b)
                                            : 0;
                                    if (e === f) return ka(a, b);
                                    c = a;
                                    while ((c = c.parentNode)) g.unshift(c);
                                    c = b;
                                    while ((c = c.parentNode)) h.unshift(c);
                                    while (g[d] === h[d]) d++;
                                    return d
                                        ? ka(g[d], h[d])
                                        : g[d] === v
                                        ? -1
                                        : h[d] === v
                                        ? 1
                                        : 0;
                                }),
                          n)
                        : n;
                }),
            (fa.matches = function (a, b) {
                return fa(a, null, null, b);
            }),
            (fa.matchesSelector = function (a, b) {
                if (
                    ((a.ownerDocument || a) !== n && m(a),
                    (b = b.replace(T, "='$1']")),
                    c.matchesSelector &&
                        p &&
                        !A[b + " "] &&
                        (!r || !r.test(b)) &&
                        (!q || !q.test(b)))
                )
                    try {
                        var d = s.call(a, b);
                        if (
                            d ||
                            c.disconnectedMatch ||
                            (a.document && 11 !== a.document.nodeType)
                        )
                            return d;
                    } catch (e) {}
                return fa(b, n, null, [a]).length > 0;
            }),
            (fa.contains = function (a, b) {
                return (a.ownerDocument || a) !== n && m(a), t(a, b);
            }),
            (fa.attr = function (a, b) {
                (a.ownerDocument || a) !== n && m(a);
                var e = d.attrHandle[b.toLowerCase()],
                    f =
                        e && D.call(d.attrHandle, b.toLowerCase())
                            ? e(a, b, !p)
                            : void 0;
                return void 0 !== f
                    ? f
                    : c.attributes || !p
                    ? a.getAttribute(b)
                    : (f = a.getAttributeNode(b)) && f.specified
                    ? f.value
                    : null;
            }),
            (fa.error = function (a) {
                throw new Error("Syntax error, unrecognized expression: " + a);
            }),
            (fa.uniqueSort = function (a) {
                var b,
                    d = [],
                    e = 0,
                    f = 0;
                if (
                    ((l = !c.detectDuplicates),
                    (k = !c.sortStable && a.slice(0)),
                    a.sort(B),
                    l)
                ) {
                    while ((b = a[f++])) b === a[f] && (e = d.push(f));
                    while (e--) a.splice(d[e], 1);
                }
                return (k = null), a;
            }),
            (e = fa.getText =
                function (a) {
                    var b,
                        c = "",
                        d = 0,
                        f = a.nodeType;
                    if (f) {
                        if (1 === f || 9 === f || 11 === f) {
                            if ("string" == typeof a.textContent)
                                return a.textContent;
                            for (a = a.firstChild; a; a = a.nextSibling)
                                c += e(a);
                        } else if (3 === f || 4 === f) return a.nodeValue;
                    } else while ((b = a[d++])) c += e(b);
                    return c;
                }),
            (d = fa.selectors =
                {
                    cacheLength: 50,
                    createPseudo: ha,
                    match: W,
                    attrHandle: {},
                    find: {},
                    relative: {
                        ">": { dir: "parentNode", first: !0 },
                        " ": { dir: "parentNode" },
                        "+": { dir: "previousSibling", first: !0 },
                        "~": { dir: "previousSibling" },
                    },
                    preFilter: {
                        ATTR: function (a) {
                            return (
                                (a[1] = a[1].replace(ba, ca)),
                                (a[3] = (a[3] || a[4] || a[5] || "").replace(
                                    ba,
                                    ca
                                )),
                                "~=" === a[2] && (a[3] = " " + a[3] + " "),
                                a.slice(0, 4)
                            );
                        },
                        CHILD: function (a) {
                            return (
                                (a[1] = a[1].toLowerCase()),
                                "nth" === a[1].slice(0, 3)
                                    ? (a[3] || fa.error(a[0]),
                                      (a[4] = +(a[4]
                                          ? a[5] + (a[6] || 1)
                                          : 2 *
                                            ("even" === a[3] ||
                                                "odd" === a[3]))),
                                      (a[5] = +(a[7] + a[8] || "odd" === a[3])))
                                    : a[3] && fa.error(a[0]),
                                a
                            );
                        },
                        PSEUDO: function (a) {
                            var b,
                                c = !a[6] && a[2];
                            return W.CHILD.test(a[0])
                                ? null
                                : (a[3]
                                      ? (a[2] = a[4] || a[5] || "")
                                      : c &&
                                        U.test(c) &&
                                        (b = g(c, !0)) &&
                                        (b =
                                            c.indexOf(")", c.length - b) -
                                            c.length) &&
                                        ((a[0] = a[0].slice(0, b)),
                                        (a[2] = c.slice(0, b))),
                                  a.slice(0, 3));
                        },
                    },
                    filter: {
                        TAG: function (a) {
                            var b = a.replace(ba, ca).toLowerCase();
                            return "*" === a
                                ? function () {
                                      return !0;
                                  }
                                : function (a) {
                                      return (
                                          a.nodeName &&
                                          a.nodeName.toLowerCase() === b
                                      );
                                  };
                        },
                        CLASS: function (a) {
                            var b = y[a + " "];
                            return (
                                b ||
                                ((b = new RegExp(
                                    "(^|" + L + ")" + a + "(" + L + "|$)"
                                )) &&
                                    y(a, function (a) {
                                        return b.test(
                                            ("string" == typeof a.className &&
                                                a.className) ||
                                                ("undefined" !=
                                                    typeof a.getAttribute &&
                                                    a.getAttribute("class")) ||
                                                ""
                                        );
                                    }))
                            );
                        },
                        ATTR: function (a, b, c) {
                            return function (d) {
                                var e = fa.attr(d, a);
                                return null == e
                                    ? "!=" === b
                                    : b
                                    ? ((e += ""),
                                      "=" === b
                                          ? e === c
                                          : "!=" === b
                                          ? e !== c
                                          : "^=" === b
                                          ? c && 0 === e.indexOf(c)
                                          : "*=" === b
                                          ? c && e.indexOf(c) > -1
                                          : "$=" === b
                                          ? c && e.slice(-c.length) === c
                                          : "~=" === b
                                          ? (
                                                " " +
                                                e.replace(P, " ") +
                                                " "
                                            ).indexOf(c) > -1
                                          : "|=" === b
                                          ? e === c ||
                                            e.slice(0, c.length + 1) === c + "-"
                                          : !1)
                                    : !0;
                            };
                        },
                        CHILD: function (a, b, c, d, e) {
                            var f = "nth" !== a.slice(0, 3),
                                g = "last" !== a.slice(-4),
                                h = "of-type" === b;
                            return 1 === d && 0 === e
                                ? function (a) {
                                      return !!a.parentNode;
                                  }
                                : function (b, c, i) {
                                      var j,
                                          k,
                                          l,
                                          m,
                                          n,
                                          o,
                                          p =
                                              f !== g
                                                  ? "nextSibling"
                                                  : "previousSibling",
                                          q = b.parentNode,
                                          r = h && b.nodeName.toLowerCase(),
                                          s = !i && !h,
                                          t = !1;
                                      if (q) {
                                          if (f) {
                                              while (p) {
                                                  m = b;
                                                  while ((m = m[p]))
                                                      if (
                                                          h
                                                              ? m.nodeName.toLowerCase() ===
                                                                r
                                                              : 1 === m.nodeType
                                                      )
                                                          return !1;
                                                  o = p =
                                                      "only" === a &&
                                                      !o &&
                                                      "nextSibling";
                                              }
                                              return !0;
                                          }
                                          if (
                                              ((o = [
                                                  g
                                                      ? q.firstChild
                                                      : q.lastChild,
                                              ]),
                                              g && s)
                                          ) {
                                              (m = q),
                                                  (l = m[u] || (m[u] = {})),
                                                  (k =
                                                      l[m.uniqueID] ||
                                                      (l[m.uniqueID] = {})),
                                                  (j = k[a] || []),
                                                  (n = j[0] === w && j[1]),
                                                  (t = n && j[2]),
                                                  (m = n && q.childNodes[n]);
                                              while (
                                                  (m =
                                                      (++n && m && m[p]) ||
                                                      (t = n = 0) ||
                                                      o.pop())
                                              )
                                                  if (
                                                      1 === m.nodeType &&
                                                      ++t &&
                                                      m === b
                                                  ) {
                                                      k[a] = [w, n, t];
                                                      break;
                                                  }
                                          } else if (
                                              (s &&
                                                  ((m = b),
                                                  (l = m[u] || (m[u] = {})),
                                                  (k =
                                                      l[m.uniqueID] ||
                                                      (l[m.uniqueID] = {})),
                                                  (j = k[a] || []),
                                                  (n = j[0] === w && j[1]),
                                                  (t = n)),
                                              t === !1)
                                          )
                                              while (
                                                  (m =
                                                      (++n && m && m[p]) ||
                                                      (t = n = 0) ||
                                                      o.pop())
                                              )
                                                  if (
                                                      (h
                                                          ? m.nodeName.toLowerCase() ===
                                                            r
                                                          : 1 === m.nodeType) &&
                                                      ++t &&
                                                      (s &&
                                                          ((l =
                                                              m[u] ||
                                                              (m[u] = {})),
                                                          (k =
                                                              l[m.uniqueID] ||
                                                              (l[m.uniqueID] =
                                                                  {})),
                                                          (k[a] = [w, t])),
                                                      m === b)
                                                  )
                                                      break;
                                          return (
                                              (t -= e),
                                              t === d ||
                                                  (t % d === 0 && t / d >= 0)
                                          );
                                      }
                                  };
                        },
                        PSEUDO: function (a, b) {
                            var c,
                                e =
                                    d.pseudos[a] ||
                                    d.setFilters[a.toLowerCase()] ||
                                    fa.error("unsupported pseudo: " + a);
                            return e[u]
                                ? e(b)
                                : e.length > 1
                                ? ((c = [a, a, "", b]),
                                  d.setFilters.hasOwnProperty(a.toLowerCase())
                                      ? ha(function (a, c) {
                                            var d,
                                                f = e(a, b),
                                                g = f.length;
                                            while (g--)
                                                (d = J(a, f[g])),
                                                    (a[d] = !(c[d] = f[g]));
                                        })
                                      : function (a) {
                                            return e(a, 0, c);
                                        })
                                : e;
                        },
                    },
                    pseudos: {
                        not: ha(function (a) {
                            var b = [],
                                c = [],
                                d = h(a.replace(Q, "$1"));
                            return d[u]
                                ? ha(function (a, b, c, e) {
                                      var f,
                                          g = d(a, null, e, []),
                                          h = a.length;
                                      while (h--)
                                          (f = g[h]) && (a[h] = !(b[h] = f));
                                  })
                                : function (a, e, f) {
                                      return (
                                          (b[0] = a),
                                          d(b, null, f, c),
                                          (b[0] = null),
                                          !c.pop()
                                      );
                                  };
                        }),
                        has: ha(function (a) {
                            return function (b) {
                                return fa(a, b).length > 0;
                            };
                        }),
                        contains: ha(function (a) {
                            return (
                                (a = a.replace(ba, ca)),
                                function (b) {
                                    return (
                                        (
                                            b.textContent ||
                                            b.innerText ||
                                            e(b)
                                        ).indexOf(a) > -1
                                    );
                                }
                            );
                        }),
                        lang: ha(function (a) {
                            return (
                                V.test(a || "") ||
                                    fa.error("unsupported lang: " + a),
                                (a = a.replace(ba, ca).toLowerCase()),
                                function (b) {
                                    var c;
                                    do
                                        if (
                                            (c = p
                                                ? b.lang
                                                : b.getAttribute("xml:lang") ||
                                                  b.getAttribute("lang"))
                                        )
                                            return (
                                                (c = c.toLowerCase()),
                                                c === a ||
                                                    0 === c.indexOf(a + "-")
                                            );
                                    while (
                                        (b = b.parentNode) &&
                                        1 === b.nodeType
                                    );
                                    return !1;
                                }
                            );
                        }),
                        target: function (b) {
                            var c = a.location && a.location.hash;
                            return c && c.slice(1) === b.id;
                        },
                        root: function (a) {
                            return a === o;
                        },
                        focus: function (a) {
                            return (
                                a === n.activeElement &&
                                (!n.hasFocus || n.hasFocus()) &&
                                !!(a.type || a.href || ~a.tabIndex)
                            );
                        },
                        enabled: function (a) {
                            return a.disabled === !1;
                        },
                        disabled: function (a) {
                            return a.disabled === !0;
                        },
                        checked: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (
                                ("input" === b && !!a.checked) ||
                                ("option" === b && !!a.selected)
                            );
                        },
                        selected: function (a) {
                            return (
                                a.parentNode && a.parentNode.selectedIndex,
                                a.selected === !0
                            );
                        },
                        empty: function (a) {
                            for (a = a.firstChild; a; a = a.nextSibling)
                                if (a.nodeType < 6) return !1;
                            return !0;
                        },
                        parent: function (a) {
                            return !d.pseudos.empty(a);
                        },
                        header: function (a) {
                            return Y.test(a.nodeName);
                        },
                        input: function (a) {
                            return X.test(a.nodeName);
                        },
                        button: function (a) {
                            var b = a.nodeName.toLowerCase();
                            return (
                                ("input" === b && "button" === a.type) ||
                                "button" === b
                            );
                        },
                        text: function (a) {
                            var b;
                            return (
                                "input" === a.nodeName.toLowerCase() &&
                                "text" === a.type &&
                                (null == (b = a.getAttribute("type")) ||
                                    "text" === b.toLowerCase())
                            );
                        },
                        first: na(function () {
                            return [0];
                        }),
                        last: na(function (a, b) {
                            return [b - 1];
                        }),
                        eq: na(function (a, b, c) {
                            return [0 > c ? c + b : c];
                        }),
                        even: na(function (a, b) {
                            for (var c = 0; b > c; c += 2) a.push(c);
                            return a;
                        }),
                        odd: na(function (a, b) {
                            for (var c = 1; b > c; c += 2) a.push(c);
                            return a;
                        }),
                        lt: na(function (a, b, c) {
                            for (var d = 0 > c ? c + b : c; --d >= 0; )
                                a.push(d);
                            return a;
                        }),
                        gt: na(function (a, b, c) {
                            for (var d = 0 > c ? c + b : c; ++d < b; )
                                a.push(d);
                            return a;
                        }),
                    },
                }),
            (d.pseudos.nth = d.pseudos.eq);
        for (b in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0,
        })
            d.pseudos[b] = la(b);
        for (b in { submit: !0, reset: !0 }) d.pseudos[b] = ma(b);
        function pa() {}
        (pa.prototype = d.filters = d.pseudos),
            (d.setFilters = new pa()),
            (g = fa.tokenize =
                function (a, b) {
                    var c,
                        e,
                        f,
                        g,
                        h,
                        i,
                        j,
                        k = z[a + " "];
                    if (k) return b ? 0 : k.slice(0);
                    (h = a), (i = []), (j = d.preFilter);
                    while (h) {
                        (c && !(e = R.exec(h))) ||
                            (e && (h = h.slice(e[0].length) || h),
                            i.push((f = []))),
                            (c = !1),
                            (e = S.exec(h)) &&
                                ((c = e.shift()),
                                f.push({
                                    value: c,
                                    type: e[0].replace(Q, " "),
                                }),
                                (h = h.slice(c.length)));
                        for (g in d.filter)
                            !(e = W[g].exec(h)) ||
                                (j[g] && !(e = j[g](e))) ||
                                ((c = e.shift()),
                                f.push({ value: c, type: g, matches: e }),
                                (h = h.slice(c.length)));
                        if (!c) break;
                    }
                    return b ? h.length : h ? fa.error(a) : z(a, i).slice(0);
                });
        function qa(a) {
            for (var b = 0, c = a.length, d = ""; c > b; b++) d += a[b].value;
            return d;
        }
        function ra(a, b, c) {
            var d = b.dir,
                e = c && "parentNode" === d,
                f = x++;
            return b.first
                ? function (b, c, f) {
                      while ((b = b[d]))
                          if (1 === b.nodeType || e) return a(b, c, f);
                  }
                : function (b, c, g) {
                      var h,
                          i,
                          j,
                          k = [w, f];
                      if (g) {
                          while ((b = b[d]))
                              if ((1 === b.nodeType || e) && a(b, c, g))
                                  return !0;
                      } else
                          while ((b = b[d]))
                              if (1 === b.nodeType || e) {
                                  if (
                                      ((j = b[u] || (b[u] = {})),
                                      (i =
                                          j[b.uniqueID] ||
                                          (j[b.uniqueID] = {})),
                                      (h = i[d]) && h[0] === w && h[1] === f)
                                  )
                                      return (k[2] = h[2]);
                                  if (((i[d] = k), (k[2] = a(b, c, g))))
                                      return !0;
                              }
                  };
        }
        function sa(a) {
            return a.length > 1
                ? function (b, c, d) {
                      var e = a.length;
                      while (e--) if (!a[e](b, c, d)) return !1;
                      return !0;
                  }
                : a[0];
        }
        function ta(a, b, c) {
            for (var d = 0, e = b.length; e > d; d++) fa(a, b[d], c);
            return c;
        }
        function ua(a, b, c, d, e) {
            for (var f, g = [], h = 0, i = a.length, j = null != b; i > h; h++)
                (f = a[h]) &&
                    ((c && !c(f, d, e)) || (g.push(f), j && b.push(h)));
            return g;
        }
        function va(a, b, c, d, e, f) {
            return (
                d && !d[u] && (d = va(d)),
                e && !e[u] && (e = va(e, f)),
                ha(function (f, g, h, i) {
                    var j,
                        k,
                        l,
                        m = [],
                        n = [],
                        o = g.length,
                        p = f || ta(b || "*", h.nodeType ? [h] : h, []),
                        q = !a || (!f && b) ? p : ua(p, m, a, h, i),
                        r = c ? (e || (f ? a : o || d) ? [] : g) : q;
                    if ((c && c(q, r, h, i), d)) {
                        (j = ua(r, n)), d(j, [], h, i), (k = j.length);
                        while (k--) (l = j[k]) && (r[n[k]] = !(q[n[k]] = l));
                    }
                    if (f) {
                        if (e || a) {
                            if (e) {
                                (j = []), (k = r.length);
                                while (k--) (l = r[k]) && j.push((q[k] = l));
                                e(null, (r = []), j, i);
                            }
                            k = r.length;
                            while (k--)
                                (l = r[k]) &&
                                    (j = e ? J(f, l) : m[k]) > -1 &&
                                    (f[j] = !(g[j] = l));
                        }
                    } else (r = ua(r === g ? r.splice(o, r.length) : r)), e ? e(null, g, r, i) : H.apply(g, r);
                })
            );
        }
        function wa(a) {
            for (
                var b,
                    c,
                    e,
                    f = a.length,
                    g = d.relative[a[0].type],
                    h = g || d.relative[" "],
                    i = g ? 1 : 0,
                    k = ra(
                        function (a) {
                            return a === b;
                        },
                        h,
                        !0
                    ),
                    l = ra(
                        function (a) {
                            return J(b, a) > -1;
                        },
                        h,
                        !0
                    ),
                    m = [
                        function (a, c, d) {
                            var e =
                                (!g && (d || c !== j)) ||
                                ((b = c).nodeType ? k(a, c, d) : l(a, c, d));
                            return (b = null), e;
                        },
                    ];
                f > i;
                i++
            )
                if ((c = d.relative[a[i].type])) m = [ra(sa(m), c)];
                else {
                    if (
                        ((c = d.filter[a[i].type].apply(null, a[i].matches)),
                        c[u])
                    ) {
                        for (e = ++i; f > e; e++)
                            if (d.relative[a[e].type]) break;
                        return va(
                            i > 1 && sa(m),
                            i > 1 &&
                                qa(
                                    a
                                        .slice(0, i - 1)
                                        .concat({
                                            value:
                                                " " === a[i - 2].type
                                                    ? "*"
                                                    : "",
                                        })
                                ).replace(Q, "$1"),
                            c,
                            e > i && wa(a.slice(i, e)),
                            f > e && wa((a = a.slice(e))),
                            f > e && qa(a)
                        );
                    }
                    m.push(c);
                }
            return sa(m);
        }
        function xa(a, b) {
            var c = b.length > 0,
                e = a.length > 0,
                f = function (f, g, h, i, k) {
                    var l,
                        o,
                        q,
                        r = 0,
                        s = "0",
                        t = f && [],
                        u = [],
                        v = j,
                        x = f || (e && d.find.TAG("*", k)),
                        y = (w += null == v ? 1 : Math.random() || 0.1),
                        z = x.length;
                    for (
                        k && (j = g === n || g || k);
                        s !== z && null != (l = x[s]);
                        s++
                    ) {
                        if (e && l) {
                            (o = 0),
                                g || l.ownerDocument === n || (m(l), (h = !p));
                            while ((q = a[o++]))
                                if (q(l, g || n, h)) {
                                    i.push(l);
                                    break;
                                }
                            k && (w = y);
                        }
                        c && ((l = !q && l) && r--, f && t.push(l));
                    }
                    if (((r += s), c && s !== r)) {
                        o = 0;
                        while ((q = b[o++])) q(t, u, g, h);
                        if (f) {
                            if (r > 0)
                                while (s--) t[s] || u[s] || (u[s] = F.call(i));
                            u = ua(u);
                        }
                        H.apply(i, u),
                            k &&
                                !f &&
                                u.length > 0 &&
                                r + b.length > 1 &&
                                fa.uniqueSort(i);
                    }
                    return k && ((w = y), (j = v)), t;
                };
            return c ? ha(f) : f;
        }
        return (
            (h = fa.compile =
                function (a, b) {
                    var c,
                        d = [],
                        e = [],
                        f = A[a + " "];
                    if (!f) {
                        b || (b = g(a)), (c = b.length);
                        while (c--)
                            (f = wa(b[c])), f[u] ? d.push(f) : e.push(f);
                        (f = A(a, xa(e, d))), (f.selector = a);
                    }
                    return f;
                }),
            (i = fa.select =
                function (a, b, e, f) {
                    var i,
                        j,
                        k,
                        l,
                        m,
                        n = "function" == typeof a && a,
                        o = !f && g((a = n.selector || a));
                    if (((e = e || []), 1 === o.length)) {
                        if (
                            ((j = o[0] = o[0].slice(0)),
                            j.length > 2 &&
                                "ID" === (k = j[0]).type &&
                                c.getById &&
                                9 === b.nodeType &&
                                p &&
                                d.relative[j[1].type])
                        ) {
                            if (
                                ((b = (d.find.ID(
                                    k.matches[0].replace(ba, ca),
                                    b
                                ) || [])[0]),
                                !b)
                            )
                                return e;
                            n && (b = b.parentNode),
                                (a = a.slice(j.shift().value.length));
                        }
                        i = W.needsContext.test(a) ? 0 : j.length;
                        while (i--) {
                            if (((k = j[i]), d.relative[(l = k.type)])) break;
                            if (
                                (m = d.find[l]) &&
                                (f = m(
                                    k.matches[0].replace(ba, ca),
                                    (_.test(j[0].type) && oa(b.parentNode)) || b
                                ))
                            ) {
                                if (
                                    (j.splice(i, 1),
                                    (a = f.length && qa(j)),
                                    !a)
                                )
                                    return H.apply(e, f), e;
                                break;
                            }
                        }
                    }
                    return (
                        (n || h(a, o))(
                            f,
                            b,
                            !p,
                            e,
                            !b || (_.test(a) && oa(b.parentNode)) || b
                        ),
                        e
                    );
                }),
            (c.sortStable = u.split("").sort(B).join("") === u),
            (c.detectDuplicates = !!l),
            m(),
            (c.sortDetached = ia(function (a) {
                return 1 & a.compareDocumentPosition(n.createElement("div"));
            })),
            ia(function (a) {
                return (
                    (a.innerHTML = "<a href='#'></a>"),
                    "#" === a.firstChild.getAttribute("href")
                );
            }) ||
                ja("type|href|height|width", function (a, b, c) {
                    return c
                        ? void 0
                        : a.getAttribute(b, "type" === b.toLowerCase() ? 1 : 2);
                }),
            (c.attributes &&
                ia(function (a) {
                    return (
                        (a.innerHTML = "<input/>"),
                        a.firstChild.setAttribute("value", ""),
                        "" === a.firstChild.getAttribute("value")
                    );
                })) ||
                ja("value", function (a, b, c) {
                    return c || "input" !== a.nodeName.toLowerCase()
                        ? void 0
                        : a.defaultValue;
                }),
            ia(function (a) {
                return null == a.getAttribute("disabled");
            }) ||
                ja(K, function (a, b, c) {
                    var d;
                    return c
                        ? void 0
                        : a[b] === !0
                        ? b.toLowerCase()
                        : (d = a.getAttributeNode(b)) && d.specified
                        ? d.value
                        : null;
                }),
            fa
        );
    })(a);
    (n.find = t),
        (n.expr = t.selectors),
        (n.expr[":"] = n.expr.pseudos),
        (n.uniqueSort = n.unique = t.uniqueSort),
        (n.text = t.getText),
        (n.isXMLDoc = t.isXML),
        (n.contains = t.contains);
    var u = function (a, b, c) {
            var d = [],
                e = void 0 !== c;
            while ((a = a[b]) && 9 !== a.nodeType)
                if (1 === a.nodeType) {
                    if (e && n(a).is(c)) break;
                    d.push(a);
                }
            return d;
        },
        v = function (a, b) {
            for (var c = []; a; a = a.nextSibling)
                1 === a.nodeType && a !== b && c.push(a);
            return c;
        },
        w = n.expr.match.needsContext,
        x = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/,
        y = /^.[^:#\[\.,]*$/;
    function z(a, b, c) {
        if (n.isFunction(b))
            return n.grep(a, function (a, d) {
                return !!b.call(a, d, a) !== c;
            });
        if (b.nodeType)
            return n.grep(a, function (a) {
                return (a === b) !== c;
            });
        if ("string" == typeof b) {
            if (y.test(b)) return n.filter(b, a, c);
            b = n.filter(b, a);
        }
        return n.grep(a, function (a) {
            return n.inArray(a, b) > -1 !== c;
        });
    }
    (n.filter = function (a, b, c) {
        var d = b[0];
        return (
            c && (a = ":not(" + a + ")"),
            1 === b.length && 1 === d.nodeType
                ? n.find.matchesSelector(d, a)
                    ? [d]
                    : []
                : n.find.matches(
                      a,
                      n.grep(b, function (a) {
                          return 1 === a.nodeType;
                      })
                  )
        );
    }),
        n.fn.extend({
            find: function (a) {
                var b,
                    c = [],
                    d = this,
                    e = d.length;
                if ("string" != typeof a)
                    return this.pushStack(
                        n(a).filter(function () {
                            for (b = 0; e > b; b++)
                                if (n.contains(d[b], this)) return !0;
                        })
                    );
                for (b = 0; e > b; b++) n.find(a, d[b], c);
                return (
                    (c = this.pushStack(e > 1 ? n.unique(c) : c)),
                    (c.selector = this.selector ? this.selector + " " + a : a),
                    c
                );
            },
            filter: function (a) {
                return this.pushStack(z(this, a || [], !1));
            },
            not: function (a) {
                return this.pushStack(z(this, a || [], !0));
            },
            is: function (a) {
                return !!z(
                    this,
                    "string" == typeof a && w.test(a) ? n(a) : a || [],
                    !1
                ).length;
            },
        });
    var A,
        B = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,
        C = (n.fn.init = function (a, b, c) {
            var e, f;
            if (!a) return this;
            if (((c = c || A), "string" == typeof a)) {
                if (
                    ((e =
                        "<" === a.charAt(0) &&
                        ">" === a.charAt(a.length - 1) &&
                        a.length >= 3
                            ? [null, a, null]
                            : B.exec(a)),
                    !e || (!e[1] && b))
                )
                    return !b || b.jquery
                        ? (b || c).find(a)
                        : this.constructor(b).find(a);
                if (e[1]) {
                    if (
                        ((b = b instanceof n ? b[0] : b),
                        n.merge(
                            this,
                            n.parseHTML(
                                e[1],
                                b && b.nodeType ? b.ownerDocument || b : d,
                                !0
                            )
                        ),
                        x.test(e[1]) && n.isPlainObject(b))
                    )
                        for (e in b)
                            n.isFunction(this[e])
                                ? this[e](b[e])
                                : this.attr(e, b[e]);
                    return this;
                }
                if (((f = d.getElementById(e[2])), f && f.parentNode)) {
                    if (f.id !== e[2]) return A.find(a);
                    (this.length = 1), (this[0] = f);
                }
                return (this.context = d), (this.selector = a), this;
            }
            return a.nodeType
                ? ((this.context = this[0] = a), (this.length = 1), this)
                : n.isFunction(a)
                ? "undefined" != typeof c.ready
                    ? c.ready(a)
                    : a(n)
                : (void 0 !== a.selector &&
                      ((this.selector = a.selector),
                      (this.context = a.context)),
                  n.makeArray(a, this));
        });
    (C.prototype = n.fn), (A = n(d));
    var D = /^(?:parents|prev(?:Until|All))/,
        E = { children: !0, contents: !0, next: !0, prev: !0 };
    n.fn.extend({
        has: function (a) {
            var b,
                c = n(a, this),
                d = c.length;
            return this.filter(function () {
                for (b = 0; d > b; b++) if (n.contains(this, c[b])) return !0;
            });
        },
        closest: function (a, b) {
            for (
                var c,
                    d = 0,
                    e = this.length,
                    f = [],
                    g =
                        w.test(a) || "string" != typeof a
                            ? n(a, b || this.context)
                            : 0;
                e > d;
                d++
            )
                for (c = this[d]; c && c !== b; c = c.parentNode)
                    if (
                        c.nodeType < 11 &&
                        (g
                            ? g.index(c) > -1
                            : 1 === c.nodeType && n.find.matchesSelector(c, a))
                    ) {
                        f.push(c);
                        break;
                    }
            return this.pushStack(f.length > 1 ? n.uniqueSort(f) : f);
        },
        index: function (a) {
            return a
                ? "string" == typeof a
                    ? n.inArray(this[0], n(a))
                    : n.inArray(a.jquery ? a[0] : a, this)
                : this[0] && this[0].parentNode
                ? this.first().prevAll().length
                : -1;
        },
        add: function (a, b) {
            return this.pushStack(n.uniqueSort(n.merge(this.get(), n(a, b))));
        },
        addBack: function (a) {
            return this.add(
                null == a ? this.prevObject : this.prevObject.filter(a)
            );
        },
    });
    function F(a, b) {
        do a = a[b];
        while (a && 1 !== a.nodeType);
        return a;
    }
    n.each(
        {
            parent: function (a) {
                var b = a.parentNode;
                return b && 11 !== b.nodeType ? b : null;
            },
            parents: function (a) {
                return u(a, "parentNode");
            },
            parentsUntil: function (a, b, c) {
                return u(a, "parentNode", c);
            },
            next: function (a) {
                return F(a, "nextSibling");
            },
            prev: function (a) {
                return F(a, "previousSibling");
            },
            nextAll: function (a) {
                return u(a, "nextSibling");
            },
            prevAll: function (a) {
                return u(a, "previousSibling");
            },
            nextUntil: function (a, b, c) {
                return u(a, "nextSibling", c);
            },
            prevUntil: function (a, b, c) {
                return u(a, "previousSibling", c);
            },
            siblings: function (a) {
                return v((a.parentNode || {}).firstChild, a);
            },
            children: function (a) {
                return v(a.firstChild);
            },
            contents: function (a) {
                return n.nodeName(a, "iframe")
                    ? a.contentDocument || a.contentWindow.document
                    : n.merge([], a.childNodes);
            },
        },
        function (a, b) {
            n.fn[a] = function (c, d) {
                var e = n.map(this, b, c);
                return (
                    "Until" !== a.slice(-5) && (d = c),
                    d && "string" == typeof d && (e = n.filter(d, e)),
                    this.length > 1 &&
                        (E[a] || (e = n.uniqueSort(e)),
                        D.test(a) && (e = e.reverse())),
                    this.pushStack(e)
                );
            };
        }
    );
    var G = /\S+/g;
    function H(a) {
        var b = {};
        return (
            n.each(a.match(G) || [], function (a, c) {
                b[c] = !0;
            }),
            b
        );
    }
    (n.Callbacks = function (a) {
        a = "string" == typeof a ? H(a) : n.extend({}, a);
        var b,
            c,
            d,
            e,
            f = [],
            g = [],
            h = -1,
            i = function () {
                for (e = a.once, d = b = !0; g.length; h = -1) {
                    c = g.shift();
                    while (++h < f.length)
                        f[h].apply(c[0], c[1]) === !1 &&
                            a.stopOnFalse &&
                            ((h = f.length), (c = !1));
                }
                a.memory || (c = !1), (b = !1), e && (f = c ? [] : "");
            },
            j = {
                add: function () {
                    return (
                        f &&
                            (c && !b && ((h = f.length - 1), g.push(c)),
                            (function d(b) {
                                n.each(b, function (b, c) {
                                    n.isFunction(c)
                                        ? (a.unique && j.has(c)) || f.push(c)
                                        : c &&
                                          c.length &&
                                          "string" !== n.type(c) &&
                                          d(c);
                                });
                            })(arguments),
                            c && !b && i()),
                        this
                    );
                },
                remove: function () {
                    return (
                        n.each(arguments, function (a, b) {
                            var c;
                            while ((c = n.inArray(b, f, c)) > -1)
                                f.splice(c, 1), h >= c && h--;
                        }),
                        this
                    );
                },
                has: function (a) {
                    return a ? n.inArray(a, f) > -1 : f.length > 0;
                },
                empty: function () {
                    return f && (f = []), this;
                },
                disable: function () {
                    return (e = g = []), (f = c = ""), this;
                },
                disabled: function () {
                    return !f;
                },
                lock: function () {
                    return (e = !0), c || j.disable(), this;
                },
                locked: function () {
                    return !!e;
                },
                fireWith: function (a, c) {
                    return (
                        e ||
                            ((c = c || []),
                            (c = [a, c.slice ? c.slice() : c]),
                            g.push(c),
                            b || i()),
                        this
                    );
                },
                fire: function () {
                    return j.fireWith(this, arguments), this;
                },
                fired: function () {
                    return !!d;
                },
            };
        return j;
    }),
        n.extend({
            Deferred: function (a) {
                var b = [
                        [
                            "resolve",
                            "done",
                            n.Callbacks("once memory"),
                            "resolved",
                        ],
                        [
                            "reject",
                            "fail",
                            n.Callbacks("once memory"),
                            "rejected",
                        ],
                        ["notify", "progress", n.Callbacks("memory")],
                    ],
                    c = "pending",
                    d = {
                        state: function () {
                            return c;
                        },
                        always: function () {
                            return e.done(arguments).fail(arguments), this;
                        },
                        then: function () {
                            var a = arguments;
                            return n
                                .Deferred(function (c) {
                                    n.each(b, function (b, f) {
                                        var g = n.isFunction(a[b]) && a[b];
                                        e[f[1]](function () {
                                            var a =
                                                g && g.apply(this, arguments);
                                            a && n.isFunction(a.promise)
                                                ? a
                                                      .promise()
                                                      .progress(c.notify)
                                                      .done(c.resolve)
                                                      .fail(c.reject)
                                                : c[f[0] + "With"](
                                                      this === d
                                                          ? c.promise()
                                                          : this,
                                                      g ? [a] : arguments
                                                  );
                                        });
                                    }),
                                        (a = null);
                                })
                                .promise();
                        },
                        promise: function (a) {
                            return null != a ? n.extend(a, d) : d;
                        },
                    },
                    e = {};
                return (
                    (d.pipe = d.then),
                    n.each(b, function (a, f) {
                        var g = f[2],
                            h = f[3];
                        (d[f[1]] = g.add),
                            h &&
                                g.add(
                                    function () {
                                        c = h;
                                    },
                                    b[1 ^ a][2].disable,
                                    b[2][2].lock
                                ),
                            (e[f[0]] = function () {
                                return (
                                    e[f[0] + "With"](
                                        this === e ? d : this,
                                        arguments
                                    ),
                                    this
                                );
                            }),
                            (e[f[0] + "With"] = g.fireWith);
                    }),
                    d.promise(e),
                    a && a.call(e, e),
                    e
                );
            },
            when: function (a) {
                var b = 0,
                    c = e.call(arguments),
                    d = c.length,
                    f = 1 !== d || (a && n.isFunction(a.promise)) ? d : 0,
                    g = 1 === f ? a : n.Deferred(),
                    h = function (a, b, c) {
                        return function (d) {
                            (b[a] = this),
                                (c[a] =
                                    arguments.length > 1
                                        ? e.call(arguments)
                                        : d),
                                c === i
                                    ? g.notifyWith(b, c)
                                    : --f || g.resolveWith(b, c);
                        };
                    },
                    i,
                    j,
                    k;
                if (d > 1)
                    for (
                        i = new Array(d), j = new Array(d), k = new Array(d);
                        d > b;
                        b++
                    )
                        c[b] && n.isFunction(c[b].promise)
                            ? c[b]
                                  .promise()
                                  .progress(h(b, j, i))
                                  .done(h(b, k, c))
                                  .fail(g.reject)
                            : --f;
                return f || g.resolveWith(k, c), g.promise();
            },
        });
    var I;
    (n.fn.ready = function (a) {
        return n.ready.promise().done(a), this;
    }),
        n.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (a) {
                a ? n.readyWait++ : n.ready(!0);
            },
            ready: function (a) {
                (a === !0 ? --n.readyWait : n.isReady) ||
                    ((n.isReady = !0),
                    (a !== !0 && --n.readyWait > 0) ||
                        (I.resolveWith(d, [n]),
                        n.fn.triggerHandler &&
                            (n(d).triggerHandler("ready"), n(d).off("ready"))));
            },
        });
    function J() {
        d.addEventListener
            ? (d.removeEventListener("DOMContentLoaded", K),
              a.removeEventListener("load", K))
            : (d.detachEvent("onreadystatechange", K),
              a.detachEvent("onload", K));
    }
    function K() {
        (d.addEventListener ||
            "load" === a.event.type ||
            "complete" === d.readyState) &&
            (J(), n.ready());
    }
    (n.ready.promise = function (b) {
        if (!I)
            if (
                ((I = n.Deferred()),
                "complete" === d.readyState ||
                    ("loading" !== d.readyState && !d.documentElement.doScroll))
            )
                a.setTimeout(n.ready);
            else if (d.addEventListener)
                d.addEventListener("DOMContentLoaded", K),
                    a.addEventListener("load", K);
            else {
                d.attachEvent("onreadystatechange", K),
                    a.attachEvent("onload", K);
                var c = !1;
                try {
                    c = null == a.frameElement && d.documentElement;
                } catch (e) {}
                c &&
                    c.doScroll &&
                    !(function f() {
                        if (!n.isReady) {
                            try {
                                c.doScroll("left");
                            } catch (b) {
                                return a.setTimeout(f, 50);
                            }
                            J(), n.ready();
                        }
                    })();
            }
        return I.promise(b);
    }),
        n.ready.promise();
    var L;
    for (L in n(l)) break;
    (l.ownFirst = "0" === L),
        (l.inlineBlockNeedsLayout = !1),
        n(function () {
            var a, b, c, e;
            (c = d.getElementsByTagName("body")[0]),
                c &&
                    c.style &&
                    ((b = d.createElement("div")),
                    (e = d.createElement("div")),
                    (e.style.cssText =
                        "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                    c.appendChild(e).appendChild(b),
                    "undefined" != typeof b.style.zoom &&
                        ((b.style.cssText =
                            "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                        (l.inlineBlockNeedsLayout = a = 3 === b.offsetWidth),
                        a && (c.style.zoom = 1)),
                    c.removeChild(e));
        }),
        (function () {
            var a = d.createElement("div");
            l.deleteExpando = !0;
            try {
                delete a.test;
            } catch (b) {
                l.deleteExpando = !1;
            }
            a = null;
        })();
    var M = function (a) {
            var b = n.noData[(a.nodeName + " ").toLowerCase()],
                c = +a.nodeType || 1;
            return 1 !== c && 9 !== c
                ? !1
                : !b || (b !== !0 && a.getAttribute("classid") === b);
        },
        N = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        O = /([A-Z])/g;
    function P(a, b, c) {
        if (void 0 === c && 1 === a.nodeType) {
            var d = "data-" + b.replace(O, "-$1").toLowerCase();
            if (((c = a.getAttribute(d)), "string" == typeof c)) {
                try {
                    c =
                        "true" === c
                            ? !0
                            : "false" === c
                            ? !1
                            : "null" === c
                            ? null
                            : +c + "" === c
                            ? +c
                            : N.test(c)
                            ? n.parseJSON(c)
                            : c;
                } catch (e) {}
                n.data(a, b, c);
            } else c = void 0;
        }
        return c;
    }
    function Q(a) {
        var b;
        for (b in a)
            if (("data" !== b || !n.isEmptyObject(a[b])) && "toJSON" !== b)
                return !1;
        return !0;
    }
    function R(a, b, d, e) {
        if (M(a)) {
            var f,
                g,
                h = n.expando,
                i = a.nodeType,
                j = i ? n.cache : a,
                k = i ? a[h] : a[h] && h;
            if (
                (k && j[k] && (e || j[k].data)) ||
                void 0 !== d ||
                "string" != typeof b
            )
                return (
                    k || (k = i ? (a[h] = c.pop() || n.guid++) : h),
                    j[k] || (j[k] = i ? {} : { toJSON: n.noop }),
                    ("object" != typeof b && "function" != typeof b) ||
                        (e
                            ? (j[k] = n.extend(j[k], b))
                            : (j[k].data = n.extend(j[k].data, b))),
                    (g = j[k]),
                    e || (g.data || (g.data = {}), (g = g.data)),
                    void 0 !== d && (g[n.camelCase(b)] = d),
                    "string" == typeof b
                        ? ((f = g[b]), null == f && (f = g[n.camelCase(b)]))
                        : (f = g),
                    f
                );
        }
    }
    function S(a, b, c) {
        if (M(a)) {
            var d,
                e,
                f = a.nodeType,
                g = f ? n.cache : a,
                h = f ? a[n.expando] : n.expando;
            if (g[h]) {
                if (b && (d = c ? g[h] : g[h].data)) {
                    n.isArray(b)
                        ? (b = b.concat(n.map(b, n.camelCase)))
                        : b in d
                        ? (b = [b])
                        : ((b = n.camelCase(b)),
                          (b = b in d ? [b] : b.split(" "))),
                        (e = b.length);
                    while (e--) delete d[b[e]];
                    if (c ? !Q(d) : !n.isEmptyObject(d)) return;
                }
                (c || (delete g[h].data, Q(g[h]))) &&
                    (f
                        ? n.cleanData([a], !0)
                        : l.deleteExpando || g != g.window
                        ? delete g[h]
                        : (g[h] = void 0));
            }
        }
    }
    n.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
        },
        hasData: function (a) {
            return (
                (a = a.nodeType ? n.cache[a[n.expando]] : a[n.expando]),
                !!a && !Q(a)
            );
        },
        data: function (a, b, c) {
            return R(a, b, c);
        },
        removeData: function (a, b) {
            return S(a, b);
        },
        _data: function (a, b, c) {
            return R(a, b, c, !0);
        },
        _removeData: function (a, b) {
            return S(a, b, !0);
        },
    }),
        n.fn.extend({
            data: function (a, b) {
                var c,
                    d,
                    e,
                    f = this[0],
                    g = f && f.attributes;
                if (void 0 === a) {
                    if (
                        this.length &&
                        ((e = n.data(f)),
                        1 === f.nodeType && !n._data(f, "parsedAttrs"))
                    ) {
                        c = g.length;
                        while (c--)
                            g[c] &&
                                ((d = g[c].name),
                                0 === d.indexOf("data-") &&
                                    ((d = n.camelCase(d.slice(5))),
                                    P(f, d, e[d])));
                        n._data(f, "parsedAttrs", !0);
                    }
                    return e;
                }
                return "object" == typeof a
                    ? this.each(function () {
                          n.data(this, a);
                      })
                    : arguments.length > 1
                    ? this.each(function () {
                          n.data(this, a, b);
                      })
                    : f
                    ? P(f, a, n.data(f, a))
                    : void 0;
            },
            removeData: function (a) {
                return this.each(function () {
                    n.removeData(this, a);
                });
            },
        }),
        n.extend({
            queue: function (a, b, c) {
                var d;
                return a
                    ? ((b = (b || "fx") + "queue"),
                      (d = n._data(a, b)),
                      c &&
                          (!d || n.isArray(c)
                              ? (d = n._data(a, b, n.makeArray(c)))
                              : d.push(c)),
                      d || [])
                    : void 0;
            },
            dequeue: function (a, b) {
                b = b || "fx";
                var c = n.queue(a, b),
                    d = c.length,
                    e = c.shift(),
                    f = n._queueHooks(a, b),
                    g = function () {
                        n.dequeue(a, b);
                    };
                "inprogress" === e && ((e = c.shift()), d--),
                    e &&
                        ("fx" === b && c.unshift("inprogress"),
                        delete f.stop,
                        e.call(a, g, f)),
                    !d && f && f.empty.fire();
            },
            _queueHooks: function (a, b) {
                var c = b + "queueHooks";
                return (
                    n._data(a, c) ||
                    n._data(a, c, {
                        empty: n.Callbacks("once memory").add(function () {
                            n._removeData(a, b + "queue"), n._removeData(a, c);
                        }),
                    })
                );
            },
        }),
        n.fn.extend({
            queue: function (a, b) {
                var c = 2;
                return (
                    "string" != typeof a && ((b = a), (a = "fx"), c--),
                    arguments.length < c
                        ? n.queue(this[0], a)
                        : void 0 === b
                        ? this
                        : this.each(function () {
                              var c = n.queue(this, a, b);
                              n._queueHooks(this, a),
                                  "fx" === a &&
                                      "inprogress" !== c[0] &&
                                      n.dequeue(this, a);
                          })
                );
            },
            dequeue: function (a) {
                return this.each(function () {
                    n.dequeue(this, a);
                });
            },
            clearQueue: function (a) {
                return this.queue(a || "fx", []);
            },
            promise: function (a, b) {
                var c,
                    d = 1,
                    e = n.Deferred(),
                    f = this,
                    g = this.length,
                    h = function () {
                        --d || e.resolveWith(f, [f]);
                    };
                "string" != typeof a && ((b = a), (a = void 0)),
                    (a = a || "fx");
                while (g--)
                    (c = n._data(f[g], a + "queueHooks")),
                        c && c.empty && (d++, c.empty.add(h));
                return h(), e.promise(b);
            },
        }),
        (function () {
            var a;
            l.shrinkWrapBlocks = function () {
                if (null != a) return a;
                a = !1;
                var b, c, e;
                return (
                    (c = d.getElementsByTagName("body")[0]),
                    c && c.style
                        ? ((b = d.createElement("div")),
                          (e = d.createElement("div")),
                          (e.style.cssText =
                              "position:absolute;border:0;width:0;height:0;top:0;left:-9999px"),
                          c.appendChild(e).appendChild(b),
                          "undefined" != typeof b.style.zoom &&
                              ((b.style.cssText =
                                  "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1"),
                              (b.appendChild(
                                  d.createElement("div")
                              ).style.width = "5px"),
                              (a = 3 !== b.offsetWidth)),
                          c.removeChild(e),
                          a)
                        : void 0
                );
            };
        })();
    var T = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        U = new RegExp("^(?:([+-])=|)(" + T + ")([a-z%]*)$", "i"),
        V = ["Top", "Right", "Bottom", "Left"],
        W = function (a, b) {
            return (
                (a = b || a),
                "none" === n.css(a, "display") ||
                    !n.contains(a.ownerDocument, a)
            );
        };
    function X(a, b, c, d) {
        var e,
            f = 1,
            g = 20,
            h = d
                ? function () {
                      return d.cur();
                  }
                : function () {
                      return n.css(a, b, "");
                  },
            i = h(),
            j = (c && c[3]) || (n.cssNumber[b] ? "" : "px"),
            k = (n.cssNumber[b] || ("px" !== j && +i)) && U.exec(n.css(a, b));
        if (k && k[3] !== j) {
            (j = j || k[3]), (c = c || []), (k = +i || 1);
            do (f = f || ".5"), (k /= f), n.style(a, b, k + j);
            while (f !== (f = h() / i) && 1 !== f && --g);
        }
        return (
            c &&
                ((k = +k || +i || 0),
                (e = c[1] ? k + (c[1] + 1) * c[2] : +c[2]),
                d && ((d.unit = j), (d.start = k), (d.end = e))),
            e
        );
    }
    var Y = function (a, b, c, d, e, f, g) {
            var h = 0,
                i = a.length,
                j = null == c;
            if ("object" === n.type(c)) {
                e = !0;
                for (h in c) Y(a, b, h, c[h], !0, f, g);
            } else if (
                void 0 !== d &&
                ((e = !0),
                n.isFunction(d) || (g = !0),
                j &&
                    (g
                        ? (b.call(a, d), (b = null))
                        : ((j = b),
                          (b = function (a, b, c) {
                              return j.call(n(a), c);
                          }))),
                b)
            )
                for (; i > h; h++)
                    b(a[h], c, g ? d : d.call(a[h], h, b(a[h], c)));
            return e ? a : j ? b.call(a) : i ? b(a[0], c) : f;
        },
        Z = /^(?:checkbox|radio)$/i,
        $ = /<([\w:-]+)/,
        _ = /^$|\/(?:java|ecma)script/i,
        aa = /^\s+/,
        ba =
            "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    function ca(a) {
        var b = ba.split("|"),
            c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    !(function () {
        var a = d.createElement("div"),
            b = d.createDocumentFragment(),
            c = d.createElement("input");
        (a.innerHTML =
            "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
            (l.leadingWhitespace = 3 === a.firstChild.nodeType),
            (l.tbody = !a.getElementsByTagName("tbody").length),
            (l.htmlSerialize = !!a.getElementsByTagName("link").length),
            (l.html5Clone =
                "<:nav></:nav>" !==
                d.createElement("nav").cloneNode(!0).outerHTML),
            (c.type = "checkbox"),
            (c.checked = !0),
            b.appendChild(c),
            (l.appendChecked = c.checked),
            (a.innerHTML = "<textarea>x</textarea>"),
            (l.noCloneChecked = !!a.cloneNode(!0).lastChild.defaultValue),
            b.appendChild(a),
            (c = d.createElement("input")),
            c.setAttribute("type", "radio"),
            c.setAttribute("checked", "checked"),
            c.setAttribute("name", "t"),
            a.appendChild(c),
            (l.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked),
            (l.noCloneEvent = !!a.addEventListener),
            (a[n.expando] = 1),
            (l.attributes = !a.getAttribute(n.expando));
    })();
    var da = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: l.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"],
    };
    (da.optgroup = da.option),
        (da.tbody = da.tfoot = da.colgroup = da.caption = da.thead),
        (da.th = da.td);
    function ea(a, b) {
        var c,
            d,
            e = 0,
            f =
                "undefined" != typeof a.getElementsByTagName
                    ? a.getElementsByTagName(b || "*")
                    : "undefined" != typeof a.querySelectorAll
                    ? a.querySelectorAll(b || "*")
                    : void 0;
        if (!f)
            for (f = [], c = a.childNodes || a; null != (d = c[e]); e++)
                !b || n.nodeName(d, b) ? f.push(d) : n.merge(f, ea(d, b));
        return void 0 === b || (b && n.nodeName(a, b)) ? n.merge([a], f) : f;
    }
    function fa(a, b) {
        for (var c, d = 0; null != (c = a[d]); d++)
            n._data(c, "globalEval", !b || n._data(b[d], "globalEval"));
    }
    var ga = /<|&#?\w+;/,
        ha = /<tbody/i;
    function ia(a) {
        Z.test(a.type) && (a.defaultChecked = a.checked);
    }
    function ja(a, b, c, d, e) {
        for (
            var f, g, h, i, j, k, m, o = a.length, p = ca(b), q = [], r = 0;
            o > r;
            r++
        )
            if (((g = a[r]), g || 0 === g))
                if ("object" === n.type(g)) n.merge(q, g.nodeType ? [g] : g);
                else if (ga.test(g)) {
                    (i = i || p.appendChild(b.createElement("div"))),
                        (j = ($.exec(g) || ["", ""])[1].toLowerCase()),
                        (m = da[j] || da._default),
                        (i.innerHTML = m[1] + n.htmlPrefilter(g) + m[2]),
                        (f = m[0]);
                    while (f--) i = i.lastChild;
                    if (
                        (!l.leadingWhitespace &&
                            aa.test(g) &&
                            q.push(b.createTextNode(aa.exec(g)[0])),
                        !l.tbody)
                    ) {
                        (g =
                            "table" !== j || ha.test(g)
                                ? "<table>" !== m[1] || ha.test(g)
                                    ? 0
                                    : i
                                : i.firstChild),
                            (f = g && g.childNodes.length);
                        while (f--)
                            n.nodeName((k = g.childNodes[f]), "tbody") &&
                                !k.childNodes.length &&
                                g.removeChild(k);
                    }
                    n.merge(q, i.childNodes), (i.textContent = "");
                    while (i.firstChild) i.removeChild(i.firstChild);
                    i = p.lastChild;
                } else q.push(b.createTextNode(g));
        i && p.removeChild(i),
            l.appendChecked || n.grep(ea(q, "input"), ia),
            (r = 0);
        while ((g = q[r++]))
            if (d && n.inArray(g, d) > -1) e && e.push(g);
            else if (
                ((h = n.contains(g.ownerDocument, g)),
                (i = ea(p.appendChild(g), "script")),
                h && fa(i),
                c)
            ) {
                f = 0;
                while ((g = i[f++])) _.test(g.type || "") && c.push(g);
            }
        return (i = null), p;
    }
    !(function () {
        var b,
            c,
            e = d.createElement("div");
        for (b in { submit: !0, change: !0, focusin: !0 })
            (c = "on" + b),
                (l[b] = c in a) ||
                    (e.setAttribute(c, "t"),
                    (l[b] = e.attributes[c].expando === !1));
        e = null;
    })();
    var ka = /^(?:input|select|textarea)$/i,
        la = /^key/,
        ma = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        na = /^(?:focusinfocus|focusoutblur)$/,
        oa = /^([^.]*)(?:\.(.+)|)/;
    function pa() {
        return !0;
    }
    function qa() {
        return !1;
    }
    function ra() {
        try {
            return d.activeElement;
        } catch (a) {}
    }
    function sa(a, b, c, d, e, f) {
        var g, h;
        if ("object" == typeof b) {
            "string" != typeof c && ((d = d || c), (c = void 0));
            for (h in b) sa(a, h, c, d, b[h], f);
            return a;
        }
        if (
            (null == d && null == e
                ? ((e = c), (d = c = void 0))
                : null == e &&
                  ("string" == typeof c
                      ? ((e = d), (d = void 0))
                      : ((e = d), (d = c), (c = void 0))),
            e === !1)
        )
            e = qa;
        else if (!e) return a;
        return (
            1 === f &&
                ((g = e),
                (e = function (a) {
                    return n().off(a), g.apply(this, arguments);
                }),
                (e.guid = g.guid || (g.guid = n.guid++))),
            a.each(function () {
                n.event.add(this, b, e, d, c);
            })
        );
    }
    (n.event = {
        global: {},
        add: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                o,
                p,
                q,
                r = n._data(a);
            if (r) {
                c.handler && ((i = c), (c = i.handler), (e = i.selector)),
                    c.guid || (c.guid = n.guid++),
                    (g = r.events) || (g = r.events = {}),
                    (k = r.handle) ||
                        ((k = r.handle =
                            function (a) {
                                return "undefined" == typeof n ||
                                    (a && n.event.triggered === a.type)
                                    ? void 0
                                    : n.event.dispatch.apply(k.elem, arguments);
                            }),
                        (k.elem = a)),
                    (b = (b || "").match(G) || [""]),
                    (h = b.length);
                while (h--)
                    (f = oa.exec(b[h]) || []),
                        (o = q = f[1]),
                        (p = (f[2] || "").split(".").sort()),
                        o &&
                            ((j = n.event.special[o] || {}),
                            (o = (e ? j.delegateType : j.bindType) || o),
                            (j = n.event.special[o] || {}),
                            (l = n.extend(
                                {
                                    type: o,
                                    origType: q,
                                    data: d,
                                    handler: c,
                                    guid: c.guid,
                                    selector: e,
                                    needsContext:
                                        e && n.expr.match.needsContext.test(e),
                                    namespace: p.join("."),
                                },
                                i
                            )),
                            (m = g[o]) ||
                                ((m = g[o] = []),
                                (m.delegateCount = 0),
                                (j.setup && j.setup.call(a, d, p, k) !== !1) ||
                                    (a.addEventListener
                                        ? a.addEventListener(o, k, !1)
                                        : a.attachEvent &&
                                          a.attachEvent("on" + o, k))),
                            j.add &&
                                (j.add.call(a, l),
                                l.handler.guid || (l.handler.guid = c.guid)),
                            e ? m.splice(m.delegateCount++, 0, l) : m.push(l),
                            (n.event.global[o] = !0));
                a = null;
            }
        },
        remove: function (a, b, c, d, e) {
            var f,
                g,
                h,
                i,
                j,
                k,
                l,
                m,
                o,
                p,
                q,
                r = n.hasData(a) && n._data(a);
            if (r && (k = r.events)) {
                (b = (b || "").match(G) || [""]), (j = b.length);
                while (j--)
                    if (
                        ((h = oa.exec(b[j]) || []),
                        (o = q = h[1]),
                        (p = (h[2] || "").split(".").sort()),
                        o)
                    ) {
                        (l = n.event.special[o] || {}),
                            (o = (d ? l.delegateType : l.bindType) || o),
                            (m = k[o] || []),
                            (h =
                                h[2] &&
                                new RegExp(
                                    "(^|\\.)" +
                                        p.join("\\.(?:.*\\.|)") +
                                        "(\\.|$)"
                                )),
                            (i = f = m.length);
                        while (f--)
                            (g = m[f]),
                                (!e && q !== g.origType) ||
                                    (c && c.guid !== g.guid) ||
                                    (h && !h.test(g.namespace)) ||
                                    (d &&
                                        d !== g.selector &&
                                        ("**" !== d || !g.selector)) ||
                                    (m.splice(f, 1),
                                    g.selector && m.delegateCount--,
                                    l.remove && l.remove.call(a, g));
                        i &&
                            !m.length &&
                            ((l.teardown &&
                                l.teardown.call(a, p, r.handle) !== !1) ||
                                n.removeEvent(a, o, r.handle),
                            delete k[o]);
                    } else for (o in k) n.event.remove(a, o + b[j], c, d, !0);
                n.isEmptyObject(k) &&
                    (delete r.handle, n._removeData(a, "events"));
            }
        },
        trigger: function (b, c, e, f) {
            var g,
                h,
                i,
                j,
                l,
                m,
                o,
                p = [e || d],
                q = k.call(b, "type") ? b.type : b,
                r = k.call(b, "namespace") ? b.namespace.split(".") : [];
            if (
                ((i = m = e = e || d),
                3 !== e.nodeType &&
                    8 !== e.nodeType &&
                    !na.test(q + n.event.triggered) &&
                    (q.indexOf(".") > -1 &&
                        ((r = q.split(".")), (q = r.shift()), r.sort()),
                    (h = q.indexOf(":") < 0 && "on" + q),
                    (b = b[n.expando]
                        ? b
                        : new n.Event(q, "object" == typeof b && b)),
                    (b.isTrigger = f ? 2 : 3),
                    (b.namespace = r.join(".")),
                    (b.rnamespace = b.namespace
                        ? new RegExp(
                              "(^|\\.)" + r.join("\\.(?:.*\\.|)") + "(\\.|$)"
                          )
                        : null),
                    (b.result = void 0),
                    b.target || (b.target = e),
                    (c = null == c ? [b] : n.makeArray(c, [b])),
                    (l = n.event.special[q] || {}),
                    f || !l.trigger || l.trigger.apply(e, c) !== !1))
            ) {
                if (!f && !l.noBubble && !n.isWindow(e)) {
                    for (
                        j = l.delegateType || q,
                            na.test(j + q) || (i = i.parentNode);
                        i;
                        i = i.parentNode
                    )
                        p.push(i), (m = i);
                    m === (e.ownerDocument || d) &&
                        p.push(m.defaultView || m.parentWindow || a);
                }
                o = 0;
                while ((i = p[o++]) && !b.isPropagationStopped())
                    (b.type = o > 1 ? j : l.bindType || q),
                        (g =
                            (n._data(i, "events") || {})[b.type] &&
                            n._data(i, "handle")),
                        g && g.apply(i, c),
                        (g = h && i[h]),
                        g &&
                            g.apply &&
                            M(i) &&
                            ((b.result = g.apply(i, c)),
                            b.result === !1 && b.preventDefault());
                if (
                    ((b.type = q),
                    !f &&
                        !b.isDefaultPrevented() &&
                        (!l._default || l._default.apply(p.pop(), c) === !1) &&
                        M(e) &&
                        h &&
                        e[q] &&
                        !n.isWindow(e))
                ) {
                    (m = e[h]), m && (e[h] = null), (n.event.triggered = q);
                    try {
                        e[q]();
                    } catch (s) {}
                    (n.event.triggered = void 0), m && (e[h] = m);
                }
                return b.result;
            }
        },
        dispatch: function (a) {
            a = n.event.fix(a);
            var b,
                c,
                d,
                f,
                g,
                h = [],
                i = e.call(arguments),
                j = (n._data(this, "events") || {})[a.type] || [],
                k = n.event.special[a.type] || {};
            if (
                ((i[0] = a),
                (a.delegateTarget = this),
                !k.preDispatch || k.preDispatch.call(this, a) !== !1)
            ) {
                (h = n.event.handlers.call(this, a, j)), (b = 0);
                while ((f = h[b++]) && !a.isPropagationStopped()) {
                    (a.currentTarget = f.elem), (c = 0);
                    while (
                        (g = f.handlers[c++]) &&
                        !a.isImmediatePropagationStopped()
                    )
                        (a.rnamespace && !a.rnamespace.test(g.namespace)) ||
                            ((a.handleObj = g),
                            (a.data = g.data),
                            (d = (
                                (n.event.special[g.origType] || {}).handle ||
                                g.handler
                            ).apply(f.elem, i)),
                            void 0 !== d &&
                                (a.result = d) === !1 &&
                                (a.preventDefault(), a.stopPropagation()));
                }
                return k.postDispatch && k.postDispatch.call(this, a), a.result;
            }
        },
        handlers: function (a, b) {
            var c,
                d,
                e,
                f,
                g = [],
                h = b.delegateCount,
                i = a.target;
            if (
                h &&
                i.nodeType &&
                ("click" !== a.type || isNaN(a.button) || a.button < 1)
            )
                for (; i != this; i = i.parentNode || this)
                    if (
                        1 === i.nodeType &&
                        (i.disabled !== !0 || "click" !== a.type)
                    ) {
                        for (d = [], c = 0; h > c; c++)
                            (f = b[c]),
                                (e = f.selector + " "),
                                void 0 === d[e] &&
                                    (d[e] = f.needsContext
                                        ? n(e, this).index(i) > -1
                                        : n.find(e, this, null, [i]).length),
                                d[e] && d.push(f);
                        d.length && g.push({ elem: i, handlers: d });
                    }
            return (
                h < b.length && g.push({ elem: this, handlers: b.slice(h) }), g
            );
        },
        fix: function (a) {
            if (a[n.expando]) return a;
            var b,
                c,
                e,
                f = a.type,
                g = a,
                h = this.fixHooks[f];
            h ||
                (this.fixHooks[f] = h =
                    ma.test(f)
                        ? this.mouseHooks
                        : la.test(f)
                        ? this.keyHooks
                        : {}),
                (e = h.props ? this.props.concat(h.props) : this.props),
                (a = new n.Event(g)),
                (b = e.length);
            while (b--) (c = e[b]), (a[c] = g[c]);
            return (
                a.target || (a.target = g.srcElement || d),
                3 === a.target.nodeType && (a.target = a.target.parentNode),
                (a.metaKey = !!a.metaKey),
                h.filter ? h.filter(a, g) : a
            );
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(
            " "
        ),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (a, b) {
                return (
                    null == a.which &&
                        (a.which = null != b.charCode ? b.charCode : b.keyCode),
                    a
                );
            },
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(
                " "
            ),
            filter: function (a, b) {
                var c,
                    e,
                    f,
                    g = b.button,
                    h = b.fromElement;
                return (
                    null == a.pageX &&
                        null != b.clientX &&
                        ((e = a.target.ownerDocument || d),
                        (f = e.documentElement),
                        (c = e.body),
                        (a.pageX =
                            b.clientX +
                            ((f && f.scrollLeft) || (c && c.scrollLeft) || 0) -
                            ((f && f.clientLeft) || (c && c.clientLeft) || 0)),
                        (a.pageY =
                            b.clientY +
                            ((f && f.scrollTop) || (c && c.scrollTop) || 0) -
                            ((f && f.clientTop) || (c && c.clientTop) || 0))),
                    !a.relatedTarget &&
                        h &&
                        (a.relatedTarget = h === a.target ? b.toElement : h),
                    a.which ||
                        void 0 === g ||
                        (a.which = 1 & g ? 1 : 2 & g ? 3 : 4 & g ? 2 : 0),
                    a
                );
            },
        },
        special: {
            load: { noBubble: !0 },
            focus: {
                trigger: function () {
                    if (this !== ra() && this.focus)
                        try {
                            return this.focus(), !1;
                        } catch (a) {}
                },
                delegateType: "focusin",
            },
            blur: {
                trigger: function () {
                    return this === ra() && this.blur
                        ? (this.blur(), !1)
                        : void 0;
                },
                delegateType: "focusout",
            },
            click: {
                trigger: function () {
                    return n.nodeName(this, "input") &&
                        "checkbox" === this.type &&
                        this.click
                        ? (this.click(), !1)
                        : void 0;
                },
                _default: function (a) {
                    return n.nodeName(a.target, "a");
                },
            },
            beforeunload: {
                postDispatch: function (a) {
                    void 0 !== a.result &&
                        a.originalEvent &&
                        (a.originalEvent.returnValue = a.result);
                },
            },
        },
        simulate: function (a, b, c) {
            var d = n.extend(new n.Event(), c, { type: a, isSimulated: !0 });
            n.event.trigger(d, null, b),
                d.isDefaultPrevented() && c.preventDefault();
        },
    }),
        (n.removeEvent = d.removeEventListener
            ? function (a, b, c) {
                  a.removeEventListener && a.removeEventListener(b, c);
              }
            : function (a, b, c) {
                  var d = "on" + b;
                  a.detachEvent &&
                      ("undefined" == typeof a[d] && (a[d] = null),
                      a.detachEvent(d, c));
              }),
        (n.Event = function (a, b) {
            return this instanceof n.Event
                ? (a && a.type
                      ? ((this.originalEvent = a),
                        (this.type = a.type),
                        (this.isDefaultPrevented =
                            a.defaultPrevented ||
                            (void 0 === a.defaultPrevented &&
                                a.returnValue === !1)
                                ? pa
                                : qa))
                      : (this.type = a),
                  b && n.extend(this, b),
                  (this.timeStamp = (a && a.timeStamp) || n.now()),
                  void (this[n.expando] = !0))
                : new n.Event(a, b);
        }),
        (n.Event.prototype = {
            constructor: n.Event,
            isDefaultPrevented: qa,
            isPropagationStopped: qa,
            isImmediatePropagationStopped: qa,
            preventDefault: function () {
                var a = this.originalEvent;
                (this.isDefaultPrevented = pa),
                    a &&
                        (a.preventDefault
                            ? a.preventDefault()
                            : (a.returnValue = !1));
            },
            stopPropagation: function () {
                var a = this.originalEvent;
                (this.isPropagationStopped = pa),
                    a &&
                        !this.isSimulated &&
                        (a.stopPropagation && a.stopPropagation(),
                        (a.cancelBubble = !0));
            },
            stopImmediatePropagation: function () {
                var a = this.originalEvent;
                (this.isImmediatePropagationStopped = pa),
                    a &&
                        a.stopImmediatePropagation &&
                        a.stopImmediatePropagation(),
                    this.stopPropagation();
            },
        }),
        n.each(
            {
                mouseenter: "mouseover",
                mouseleave: "mouseout",
                pointerenter: "pointerover",
                pointerleave: "pointerout",
            },
            function (a, b) {
                n.event.special[a] = {
                    delegateType: b,
                    bindType: b,
                    handle: function (a) {
                        var c,
                            d = this,
                            e = a.relatedTarget,
                            f = a.handleObj;
                        return (
                            (e && (e === d || n.contains(d, e))) ||
                                ((a.type = f.origType),
                                (c = f.handler.apply(this, arguments)),
                                (a.type = b)),
                            c
                        );
                    },
                };
            }
        ),
        l.submit ||
            (n.event.special.submit = {
                setup: function () {
                    return n.nodeName(this, "form")
                        ? !1
                        : void n.event.add(
                              this,
                              "click._submit keypress._submit",
                              function (a) {
                                  var b = a.target,
                                      c =
                                          n.nodeName(b, "input") ||
                                          n.nodeName(b, "button")
                                              ? n.prop(b, "form")
                                              : void 0;
                                  c &&
                                      !n._data(c, "submit") &&
                                      (n.event.add(
                                          c,
                                          "submit._submit",
                                          function (a) {
                                              a._submitBubble = !0;
                                          }
                                      ),
                                      n._data(c, "submit", !0));
                              }
                          );
                },
                postDispatch: function (a) {
                    a._submitBubble &&
                        (delete a._submitBubble,
                        this.parentNode &&
                            !a.isTrigger &&
                            n.event.simulate("submit", this.parentNode, a));
                },
                teardown: function () {
                    return n.nodeName(this, "form")
                        ? !1
                        : void n.event.remove(this, "._submit");
                },
            }),
        l.change ||
            (n.event.special.change = {
                setup: function () {
                    return ka.test(this.nodeName)
                        ? (("checkbox" !== this.type &&
                              "radio" !== this.type) ||
                              (n.event.add(
                                  this,
                                  "propertychange._change",
                                  function (a) {
                                      "checked" ===
                                          a.originalEvent.propertyName &&
                                          (this._justChanged = !0);
                                  }
                              ),
                              n.event.add(this, "click._change", function (a) {
                                  this._justChanged &&
                                      !a.isTrigger &&
                                      (this._justChanged = !1),
                                      n.event.simulate("change", this, a);
                              })),
                          !1)
                        : void n.event.add(
                              this,
                              "beforeactivate._change",
                              function (a) {
                                  var b = a.target;
                                  ka.test(b.nodeName) &&
                                      !n._data(b, "change") &&
                                      (n.event.add(
                                          b,
                                          "change._change",
                                          function (a) {
                                              !this.parentNode ||
                                                  a.isSimulated ||
                                                  a.isTrigger ||
                                                  n.event.simulate(
                                                      "change",
                                                      this.parentNode,
                                                      a
                                                  );
                                          }
                                      ),
                                      n._data(b, "change", !0));
                              }
                          );
                },
                handle: function (a) {
                    var b = a.target;
                    return this !== b ||
                        a.isSimulated ||
                        a.isTrigger ||
                        ("radio" !== b.type && "checkbox" !== b.type)
                        ? a.handleObj.handler.apply(this, arguments)
                        : void 0;
                },
                teardown: function () {
                    return (
                        n.event.remove(this, "._change"),
                        !ka.test(this.nodeName)
                    );
                },
            }),
        l.focusin ||
            n.each({ focus: "focusin", blur: "focusout" }, function (a, b) {
                var c = function (a) {
                    n.event.simulate(b, a.target, n.event.fix(a));
                };
                n.event.special[b] = {
                    setup: function () {
                        var d = this.ownerDocument || this,
                            e = n._data(d, b);
                        e || d.addEventListener(a, c, !0),
                            n._data(d, b, (e || 0) + 1);
                    },
                    teardown: function () {
                        var d = this.ownerDocument || this,
                            e = n._data(d, b) - 1;
                        e
                            ? n._data(d, b, e)
                            : (d.removeEventListener(a, c, !0),
                              n._removeData(d, b));
                    },
                };
            }),
        n.fn.extend({
            on: function (a, b, c, d) {
                return sa(this, a, b, c, d);
            },
            one: function (a, b, c, d) {
                return sa(this, a, b, c, d, 1);
            },
            off: function (a, b, c) {
                var d, e;
                if (a && a.preventDefault && a.handleObj)
                    return (
                        (d = a.handleObj),
                        n(a.delegateTarget).off(
                            d.namespace
                                ? d.origType + "." + d.namespace
                                : d.origType,
                            d.selector,
                            d.handler
                        ),
                        this
                    );
                if ("object" == typeof a) {
                    for (e in a) this.off(e, b, a[e]);
                    return this;
                }
                return (
                    (b !== !1 && "function" != typeof b) ||
                        ((c = b), (b = void 0)),
                    c === !1 && (c = qa),
                    this.each(function () {
                        n.event.remove(this, a, c, b);
                    })
                );
            },
            trigger: function (a, b) {
                return this.each(function () {
                    n.event.trigger(a, b, this);
                });
            },
            triggerHandler: function (a, b) {
                var c = this[0];
                return c ? n.event.trigger(a, b, c, !0) : void 0;
            },
        });
    var ta = / jQuery\d+="(?:null|\d+)"/g,
        ua = new RegExp("<(?:" + ba + ")[\\s/>]", "i"),
        va =
            /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi,
        wa = /<script|<style|<link/i,
        xa = /checked\s*(?:[^=]|=\s*.checked.)/i,
        ya = /^true\/(.*)/,
        za = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,
        Aa = ca(d),
        Ba = Aa.appendChild(d.createElement("div"));
    function Ca(a, b) {
        return n.nodeName(a, "table") &&
            n.nodeName(11 !== b.nodeType ? b : b.firstChild, "tr")
            ? a.getElementsByTagName("tbody")[0] ||
                  a.appendChild(a.ownerDocument.createElement("tbody"))
            : a;
    }
    function Da(a) {
        return (a.type = (null !== n.find.attr(a, "type")) + "/" + a.type), a;
    }
    function Ea(a) {
        var b = ya.exec(a.type);
        return b ? (a.type = b[1]) : a.removeAttribute("type"), a;
    }
    function Fa(a, b) {
        if (1 === b.nodeType && n.hasData(a)) {
            var c,
                d,
                e,
                f = n._data(a),
                g = n._data(b, f),
                h = f.events;
            if (h) {
                delete g.handle, (g.events = {});
                for (c in h)
                    for (d = 0, e = h[c].length; e > d; d++)
                        n.event.add(b, c, h[c][d]);
            }
            g.data && (g.data = n.extend({}, g.data));
        }
    }
    function Ga(a, b) {
        var c, d, e;
        if (1 === b.nodeType) {
            if (
                ((c = b.nodeName.toLowerCase()),
                !l.noCloneEvent && b[n.expando])
            ) {
                e = n._data(b);
                for (d in e.events) n.removeEvent(b, d, e.handle);
                b.removeAttribute(n.expando);
            }
            "script" === c && b.text !== a.text
                ? ((Da(b).text = a.text), Ea(b))
                : "object" === c
                ? (b.parentNode && (b.outerHTML = a.outerHTML),
                  l.html5Clone &&
                      a.innerHTML &&
                      !n.trim(b.innerHTML) &&
                      (b.innerHTML = a.innerHTML))
                : "input" === c && Z.test(a.type)
                ? ((b.defaultChecked = b.checked = a.checked),
                  b.value !== a.value && (b.value = a.value))
                : "option" === c
                ? (b.defaultSelected = b.selected = a.defaultSelected)
                : ("input" !== c && "textarea" !== c) ||
                  (b.defaultValue = a.defaultValue);
        }
    }
    function Ha(a, b, c, d) {
        b = f.apply([], b);
        var e,
            g,
            h,
            i,
            j,
            k,
            m = 0,
            o = a.length,
            p = o - 1,
            q = b[0],
            r = n.isFunction(q);
        if (r || (o > 1 && "string" == typeof q && !l.checkClone && xa.test(q)))
            return a.each(function (e) {
                var f = a.eq(e);
                r && (b[0] = q.call(this, e, f.html())), Ha(f, b, c, d);
            });
        if (
            o &&
            ((k = ja(b, a[0].ownerDocument, !1, a, d)),
            (e = k.firstChild),
            1 === k.childNodes.length && (k = e),
            e || d)
        ) {
            for (i = n.map(ea(k, "script"), Da), h = i.length; o > m; m++)
                (g = k),
                    m !== p &&
                        ((g = n.clone(g, !0, !0)),
                        h && n.merge(i, ea(g, "script"))),
                    c.call(a[m], g, m);
            if (h)
                for (
                    j = i[i.length - 1].ownerDocument, n.map(i, Ea), m = 0;
                    h > m;
                    m++
                )
                    (g = i[m]),
                        _.test(g.type || "") &&
                            !n._data(g, "globalEval") &&
                            n.contains(j, g) &&
                            (g.src
                                ? n._evalUrl && n._evalUrl(g.src)
                                : n.globalEval(
                                      (
                                          g.text ||
                                          g.textContent ||
                                          g.innerHTML ||
                                          ""
                                      ).replace(za, "")
                                  ));
            k = e = null;
        }
        return a;
    }
    function Ia(a, b, c) {
        for (var d, e = b ? n.filter(b, a) : a, f = 0; null != (d = e[f]); f++)
            c || 1 !== d.nodeType || n.cleanData(ea(d)),
                d.parentNode &&
                    (c && n.contains(d.ownerDocument, d) && fa(ea(d, "script")),
                    d.parentNode.removeChild(d));
        return a;
    }
    n.extend({
        htmlPrefilter: function (a) {
            return a.replace(va, "<$1></$2>");
        },
        clone: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i = n.contains(a.ownerDocument, a);
            if (
                (l.html5Clone ||
                n.isXMLDoc(a) ||
                !ua.test("<" + a.nodeName + ">")
                    ? (f = a.cloneNode(!0))
                    : ((Ba.innerHTML = a.outerHTML),
                      Ba.removeChild((f = Ba.firstChild))),
                !(
                    (l.noCloneEvent && l.noCloneChecked) ||
                    (1 !== a.nodeType && 11 !== a.nodeType) ||
                    n.isXMLDoc(a)
                ))
            )
                for (d = ea(f), h = ea(a), g = 0; null != (e = h[g]); ++g)
                    d[g] && Ga(e, d[g]);
            if (b)
                if (c)
                    for (
                        h = h || ea(a), d = d || ea(f), g = 0;
                        null != (e = h[g]);
                        g++
                    )
                        Fa(e, d[g]);
                else Fa(a, f);
            return (
                (d = ea(f, "script")),
                d.length > 0 && fa(d, !i && ea(a, "script")),
                (d = h = e = null),
                f
            );
        },
        cleanData: function (a, b) {
            for (
                var d,
                    e,
                    f,
                    g,
                    h = 0,
                    i = n.expando,
                    j = n.cache,
                    k = l.attributes,
                    m = n.event.special;
                null != (d = a[h]);
                h++
            )
                if ((b || M(d)) && ((f = d[i]), (g = f && j[f]))) {
                    if (g.events)
                        for (e in g.events)
                            m[e]
                                ? n.event.remove(d, e)
                                : n.removeEvent(d, e, g.handle);
                    j[f] &&
                        (delete j[f],
                        k || "undefined" == typeof d.removeAttribute
                            ? (d[i] = void 0)
                            : d.removeAttribute(i),
                        c.push(f));
                }
        },
    }),
        n.fn.extend({
            domManip: Ha,
            detach: function (a) {
                return Ia(this, a, !0);
            },
            remove: function (a) {
                return Ia(this, a);
            },
            text: function (a) {
                return Y(
                    this,
                    function (a) {
                        return void 0 === a
                            ? n.text(this)
                            : this.empty().append(
                                  (
                                      (this[0] && this[0].ownerDocument) ||
                                      d
                                  ).createTextNode(a)
                              );
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            append: function () {
                return Ha(this, arguments, function (a) {
                    if (
                        1 === this.nodeType ||
                        11 === this.nodeType ||
                        9 === this.nodeType
                    ) {
                        var b = Ca(this, a);
                        b.appendChild(a);
                    }
                });
            },
            prepend: function () {
                return Ha(this, arguments, function (a) {
                    if (
                        1 === this.nodeType ||
                        11 === this.nodeType ||
                        9 === this.nodeType
                    ) {
                        var b = Ca(this, a);
                        b.insertBefore(a, b.firstChild);
                    }
                });
            },
            before: function () {
                return Ha(this, arguments, function (a) {
                    this.parentNode && this.parentNode.insertBefore(a, this);
                });
            },
            after: function () {
                return Ha(this, arguments, function (a) {
                    this.parentNode &&
                        this.parentNode.insertBefore(a, this.nextSibling);
                });
            },
            empty: function () {
                for (var a, b = 0; null != (a = this[b]); b++) {
                    1 === a.nodeType && n.cleanData(ea(a, !1));
                    while (a.firstChild) a.removeChild(a.firstChild);
                    a.options &&
                        n.nodeName(a, "select") &&
                        (a.options.length = 0);
                }
                return this;
            },
            clone: function (a, b) {
                return (
                    (a = null == a ? !1 : a),
                    (b = null == b ? a : b),
                    this.map(function () {
                        return n.clone(this, a, b);
                    })
                );
            },
            html: function (a) {
                return Y(
                    this,
                    function (a) {
                        var b = this[0] || {},
                            c = 0,
                            d = this.length;
                        if (void 0 === a)
                            return 1 === b.nodeType
                                ? b.innerHTML.replace(ta, "")
                                : void 0;
                        if (
                            "string" == typeof a &&
                            !wa.test(a) &&
                            (l.htmlSerialize || !ua.test(a)) &&
                            (l.leadingWhitespace || !aa.test(a)) &&
                            !da[($.exec(a) || ["", ""])[1].toLowerCase()]
                        ) {
                            a = n.htmlPrefilter(a);
                            try {
                                for (; d > c; c++)
                                    (b = this[c] || {}),
                                        1 === b.nodeType &&
                                            (n.cleanData(ea(b, !1)),
                                            (b.innerHTML = a));
                                b = 0;
                            } catch (e) {}
                        }
                        b && this.empty().append(a);
                    },
                    null,
                    a,
                    arguments.length
                );
            },
            replaceWith: function () {
                var a = [];
                return Ha(
                    this,
                    arguments,
                    function (b) {
                        var c = this.parentNode;
                        n.inArray(this, a) < 0 &&
                            (n.cleanData(ea(this)),
                            c && c.replaceChild(b, this));
                    },
                    a
                );
            },
        }),
        n.each(
            {
                appendTo: "append",
                prependTo: "prepend",
                insertBefore: "before",
                insertAfter: "after",
                replaceAll: "replaceWith",
            },
            function (a, b) {
                n.fn[a] = function (a) {
                    for (
                        var c, d = 0, e = [], f = n(a), h = f.length - 1;
                        h >= d;
                        d++
                    )
                        (c = d === h ? this : this.clone(!0)),
                            n(f[d])[b](c),
                            g.apply(e, c.get());
                    return this.pushStack(e);
                };
            }
        );
    var Ja,
        Ka = { HTML: "block", BODY: "block" };
    function La(a, b) {
        var c = n(b.createElement(a)).appendTo(b.body),
            d = n.css(c[0], "display");
        return c.detach(), d;
    }
    function Ma(a) {
        var b = d,
            c = Ka[a];
        return (
            c ||
                ((c = La(a, b)),
                ("none" !== c && c) ||
                    ((Ja = (
                        Ja ||
                        n("<iframe frameborder='0' width='0' height='0'/>")
                    ).appendTo(b.documentElement)),
                    (b = (Ja[0].contentWindow || Ja[0].contentDocument)
                        .document),
                    b.write(),
                    b.close(),
                    (c = La(a, b)),
                    Ja.detach()),
                (Ka[a] = c)),
            c
        );
    }
    var Na = /^margin/,
        Oa = new RegExp("^(" + T + ")(?!px)[a-z%]+$", "i"),
        Pa = function (a, b, c, d) {
            var e,
                f,
                g = {};
            for (f in b) (g[f] = a.style[f]), (a.style[f] = b[f]);
            e = c.apply(a, d || []);
            for (f in b) a.style[f] = g[f];
            return e;
        },
        Qa = d.documentElement;
    !(function () {
        var b,
            c,
            e,
            f,
            g,
            h,
            i = d.createElement("div"),
            j = d.createElement("div");
        if (j.style) {
            (j.style.cssText = "float:left;opacity:.5"),
                (l.opacity = "0.5" === j.style.opacity),
                (l.cssFloat = !!j.style.cssFloat),
                (j.style.backgroundClip = "content-box"),
                (j.cloneNode(!0).style.backgroundClip = ""),
                (l.clearCloneStyle = "content-box" === j.style.backgroundClip),
                (i = d.createElement("div")),
                (i.style.cssText =
                    "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute"),
                (j.innerHTML = ""),
                i.appendChild(j),
                (l.boxSizing =
                    "" === j.style.boxSizing ||
                    "" === j.style.MozBoxSizing ||
                    "" === j.style.WebkitBoxSizing),
                n.extend(l, {
                    reliableHiddenOffsets: function () {
                        return null == b && k(), f;
                    },
                    boxSizingReliable: function () {
                        return null == b && k(), e;
                    },
                    pixelMarginRight: function () {
                        return null == b && k(), c;
                    },
                    pixelPosition: function () {
                        return null == b && k(), b;
                    },
                    reliableMarginRight: function () {
                        return null == b && k(), g;
                    },
                    reliableMarginLeft: function () {
                        return null == b && k(), h;
                    },
                });
            function k() {
                var k,
                    l,
                    m = d.documentElement;
                m.appendChild(i),
                    (j.style.cssText =
                        "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%"),
                    (b = e = h = !1),
                    (c = g = !0),
                    a.getComputedStyle &&
                        ((l = a.getComputedStyle(j)),
                        (b = "1%" !== (l || {}).top),
                        (h = "2px" === (l || {}).marginLeft),
                        (e = "4px" === (l || { width: "4px" }).width),
                        (j.style.marginRight = "50%"),
                        (c =
                            "4px" ===
                            (l || { marginRight: "4px" }).marginRight),
                        (k = j.appendChild(d.createElement("div"))),
                        (k.style.cssText = j.style.cssText =
                            "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0"),
                        (k.style.marginRight = k.style.width = "0"),
                        (j.style.width = "1px"),
                        (g = !parseFloat(
                            (a.getComputedStyle(k) || {}).marginRight
                        )),
                        j.removeChild(k)),
                    (j.style.display = "none"),
                    (f = 0 === j.getClientRects().length),
                    f &&
                        ((j.style.display = ""),
                        (j.innerHTML =
                            "<table><tr><td></td><td>t</td></tr></table>"),
                        (j.childNodes[0].style.borderCollapse = "separate"),
                        (k = j.getElementsByTagName("td")),
                        (k[0].style.cssText =
                            "margin:0;border:0;padding:0;display:none"),
                        (f = 0 === k[0].offsetHeight),
                        f &&
                            ((k[0].style.display = ""),
                            (k[1].style.display = "none"),
                            (f = 0 === k[0].offsetHeight))),
                    m.removeChild(i);
            }
        }
    })();
    var Ra,
        Sa,
        Ta = /^(top|right|bottom|left)$/;
    a.getComputedStyle
        ? ((Ra = function (b) {
              var c = b.ownerDocument.defaultView;
              return (c && c.opener) || (c = a), c.getComputedStyle(b);
          }),
          (Sa = function (a, b, c) {
              var d,
                  e,
                  f,
                  g,
                  h = a.style;
              return (
                  (c = c || Ra(a)),
                  (g = c ? c.getPropertyValue(b) || c[b] : void 0),
                  ("" !== g && void 0 !== g) ||
                      n.contains(a.ownerDocument, a) ||
                      (g = n.style(a, b)),
                  c &&
                      !l.pixelMarginRight() &&
                      Oa.test(g) &&
                      Na.test(b) &&
                      ((d = h.width),
                      (e = h.minWidth),
                      (f = h.maxWidth),
                      (h.minWidth = h.maxWidth = h.width = g),
                      (g = c.width),
                      (h.width = d),
                      (h.minWidth = e),
                      (h.maxWidth = f)),
                  void 0 === g ? g : g + ""
              );
          }))
        : Qa.currentStyle &&
          ((Ra = function (a) {
              return a.currentStyle;
          }),
          (Sa = function (a, b, c) {
              var d,
                  e,
                  f,
                  g,
                  h = a.style;
              return (
                  (c = c || Ra(a)),
                  (g = c ? c[b] : void 0),
                  null == g && h && h[b] && (g = h[b]),
                  Oa.test(g) &&
                      !Ta.test(b) &&
                      ((d = h.left),
                      (e = a.runtimeStyle),
                      (f = e && e.left),
                      f && (e.left = a.currentStyle.left),
                      (h.left = "fontSize" === b ? "1em" : g),
                      (g = h.pixelLeft + "px"),
                      (h.left = d),
                      f && (e.left = f)),
                  void 0 === g ? g : g + "" || "auto"
              );
          }));
    function Ua(a, b) {
        return {
            get: function () {
                return a()
                    ? void delete this.get
                    : (this.get = b).apply(this, arguments);
            },
        };
    }
    var Va = /alpha\([^)]*\)/i,
        Wa = /opacity\s*=\s*([^)]*)/i,
        Xa = /^(none|table(?!-c[ea]).+)/,
        Ya = new RegExp("^(" + T + ")(.*)$", "i"),
        Za = { position: "absolute", visibility: "hidden", display: "block" },
        $a = { letterSpacing: "0", fontWeight: "400" },
        _a = ["Webkit", "O", "Moz", "ms"],
        ab = d.createElement("div").style;
    function bb(a) {
        if (a in ab) return a;
        var b = a.charAt(0).toUpperCase() + a.slice(1),
            c = _a.length;
        while (c--) if (((a = _a[c] + b), a in ab)) return a;
    }
    function cb(a, b) {
        for (var c, d, e, f = [], g = 0, h = a.length; h > g; g++)
            (d = a[g]),
                d.style &&
                    ((f[g] = n._data(d, "olddisplay")),
                    (c = d.style.display),
                    b
                        ? (f[g] || "none" !== c || (d.style.display = ""),
                          "" === d.style.display &&
                              W(d) &&
                              (f[g] = n._data(d, "olddisplay", Ma(d.nodeName))))
                        : ((e = W(d)),
                          ((c && "none" !== c) || !e) &&
                              n._data(
                                  d,
                                  "olddisplay",
                                  e ? c : n.css(d, "display")
                              )));
        for (g = 0; h > g; g++)
            (d = a[g]),
                d.style &&
                    ((b &&
                        "none" !== d.style.display &&
                        "" !== d.style.display) ||
                        (d.style.display = b ? f[g] || "" : "none"));
        return a;
    }
    function db(a, b, c) {
        var d = Ya.exec(b);
        return d ? Math.max(0, d[1] - (c || 0)) + (d[2] || "px") : b;
    }
    function eb(a, b, c, d, e) {
        for (
            var f =
                    c === (d ? "border" : "content")
                        ? 4
                        : "width" === b
                        ? 1
                        : 0,
                g = 0;
            4 > f;
            f += 2
        )
            "margin" === c && (g += n.css(a, c + V[f], !0, e)),
                d
                    ? ("content" === c &&
                          (g -= n.css(a, "padding" + V[f], !0, e)),
                      "margin" !== c &&
                          (g -= n.css(a, "border" + V[f] + "Width", !0, e)))
                    : ((g += n.css(a, "padding" + V[f], !0, e)),
                      "padding" !== c &&
                          (g += n.css(a, "border" + V[f] + "Width", !0, e)));
        return g;
    }
    function fb(a, b, c) {
        var d = !0,
            e = "width" === b ? a.offsetWidth : a.offsetHeight,
            f = Ra(a),
            g = l.boxSizing && "border-box" === n.css(a, "boxSizing", !1, f);
        if (0 >= e || null == e) {
            if (
                ((e = Sa(a, b, f)),
                (0 > e || null == e) && (e = a.style[b]),
                Oa.test(e))
            )
                return e;
            (d = g && (l.boxSizingReliable() || e === a.style[b])),
                (e = parseFloat(e) || 0);
        }
        return e + eb(a, b, c || (g ? "border" : "content"), d, f) + "px";
    }
    n.extend({
        cssHooks: {
            opacity: {
                get: function (a, b) {
                    if (b) {
                        var c = Sa(a, "opacity");
                        return "" === c ? "1" : c;
                    }
                },
            },
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0,
        },
        cssProps: { float: l.cssFloat ? "cssFloat" : "styleFloat" },
        style: function (a, b, c, d) {
            if (a && 3 !== a.nodeType && 8 !== a.nodeType && a.style) {
                var e,
                    f,
                    g,
                    h = n.camelCase(b),
                    i = a.style;
                if (
                    ((b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
                    (g = n.cssHooks[b] || n.cssHooks[h]),
                    void 0 === c)
                )
                    return g && "get" in g && void 0 !== (e = g.get(a, !1, d))
                        ? e
                        : i[b];
                if (
                    ((f = typeof c),
                    "string" === f &&
                        (e = U.exec(c)) &&
                        e[1] &&
                        ((c = X(a, b, e)), (f = "number")),
                    null != c &&
                        c === c &&
                        ("number" === f &&
                            (c += (e && e[3]) || (n.cssNumber[h] ? "" : "px")),
                        l.clearCloneStyle ||
                            "" !== c ||
                            0 !== b.indexOf("background") ||
                            (i[b] = "inherit"),
                        !(g && "set" in g && void 0 === (c = g.set(a, c, d)))))
                )
                    try {
                        i[b] = c;
                    } catch (j) {}
            }
        },
        css: function (a, b, c, d) {
            var e,
                f,
                g,
                h = n.camelCase(b);
            return (
                (b = n.cssProps[h] || (n.cssProps[h] = bb(h) || h)),
                (g = n.cssHooks[b] || n.cssHooks[h]),
                g && "get" in g && (f = g.get(a, !0, c)),
                void 0 === f && (f = Sa(a, b, d)),
                "normal" === f && b in $a && (f = $a[b]),
                "" === c || c
                    ? ((e = parseFloat(f)),
                      c === !0 || isFinite(e) ? e || 0 : f)
                    : f
            );
        },
    }),
        n.each(["height", "width"], function (a, b) {
            n.cssHooks[b] = {
                get: function (a, c, d) {
                    return c
                        ? Xa.test(n.css(a, "display")) && 0 === a.offsetWidth
                            ? Pa(a, Za, function () {
                                  return fb(a, b, d);
                              })
                            : fb(a, b, d)
                        : void 0;
                },
                set: function (a, c, d) {
                    var e = d && Ra(a);
                    return db(
                        a,
                        c,
                        d
                            ? eb(
                                  a,
                                  b,
                                  d,
                                  l.boxSizing &&
                                      "border-box" ===
                                          n.css(a, "boxSizing", !1, e),
                                  e
                              )
                            : 0
                    );
                },
            };
        }),
        l.opacity ||
            (n.cssHooks.opacity = {
                get: function (a, b) {
                    return Wa.test(
                        (b && a.currentStyle
                            ? a.currentStyle.filter
                            : a.style.filter) || ""
                    )
                        ? 0.01 * parseFloat(RegExp.$1) + ""
                        : b
                        ? "1"
                        : "";
                },
                set: function (a, b) {
                    var c = a.style,
                        d = a.currentStyle,
                        e = n.isNumeric(b)
                            ? "alpha(opacity=" + 100 * b + ")"
                            : "",
                        f = (d && d.filter) || c.filter || "";
                    (c.zoom = 1),
                        ((b >= 1 || "" === b) &&
                            "" === n.trim(f.replace(Va, "")) &&
                            c.removeAttribute &&
                            (c.removeAttribute("filter"),
                            "" === b || (d && !d.filter))) ||
                            (c.filter = Va.test(f)
                                ? f.replace(Va, e)
                                : f + " " + e);
                },
            }),
        (n.cssHooks.marginRight = Ua(l.reliableMarginRight, function (a, b) {
            return b
                ? Pa(a, { display: "inline-block" }, Sa, [a, "marginRight"])
                : void 0;
        })),
        (n.cssHooks.marginLeft = Ua(l.reliableMarginLeft, function (a, b) {
            return b
                ? (parseFloat(Sa(a, "marginLeft")) ||
                      (n.contains(a.ownerDocument, a)
                          ? a.getBoundingClientRect().left -
                            Pa(
                                a,
                                {
                                    marginLeft: 0,
                                },
                                function () {
                                    return a.getBoundingClientRect().left;
                                }
                            )
                          : 0)) + "px"
                : void 0;
        })),
        n.each({ margin: "", padding: "", border: "Width" }, function (a, b) {
            (n.cssHooks[a + b] = {
                expand: function (c) {
                    for (
                        var d = 0,
                            e = {},
                            f = "string" == typeof c ? c.split(" ") : [c];
                        4 > d;
                        d++
                    )
                        e[a + V[d] + b] = f[d] || f[d - 2] || f[0];
                    return e;
                },
            }),
                Na.test(a) || (n.cssHooks[a + b].set = db);
        }),
        n.fn.extend({
            css: function (a, b) {
                return Y(
                    this,
                    function (a, b, c) {
                        var d,
                            e,
                            f = {},
                            g = 0;
                        if (n.isArray(b)) {
                            for (d = Ra(a), e = b.length; e > g; g++)
                                f[b[g]] = n.css(a, b[g], !1, d);
                            return f;
                        }
                        return void 0 !== c ? n.style(a, b, c) : n.css(a, b);
                    },
                    a,
                    b,
                    arguments.length > 1
                );
            },
            show: function () {
                return cb(this, !0);
            },
            hide: function () {
                return cb(this);
            },
            toggle: function (a) {
                return "boolean" == typeof a
                    ? a
                        ? this.show()
                        : this.hide()
                    : this.each(function () {
                          W(this) ? n(this).show() : n(this).hide();
                      });
            },
        });
    function gb(a, b, c, d, e) {
        return new gb.prototype.init(a, b, c, d, e);
    }
    (n.Tween = gb),
        (gb.prototype = {
            constructor: gb,
            init: function (a, b, c, d, e, f) {
                (this.elem = a),
                    (this.prop = c),
                    (this.easing = e || n.easing._default),
                    (this.options = b),
                    (this.start = this.now = this.cur()),
                    (this.end = d),
                    (this.unit = f || (n.cssNumber[c] ? "" : "px"));
            },
            cur: function () {
                var a = gb.propHooks[this.prop];
                return a && a.get
                    ? a.get(this)
                    : gb.propHooks._default.get(this);
            },
            run: function (a) {
                var b,
                    c = gb.propHooks[this.prop];
                return (
                    this.options.duration
                        ? (this.pos = b =
                              n.easing[this.easing](
                                  a,
                                  this.options.duration * a,
                                  0,
                                  1,
                                  this.options.duration
                              ))
                        : (this.pos = b = a),
                    (this.now = (this.end - this.start) * b + this.start),
                    this.options.step &&
                        this.options.step.call(this.elem, this.now, this),
                    c && c.set ? c.set(this) : gb.propHooks._default.set(this),
                    this
                );
            },
        }),
        (gb.prototype.init.prototype = gb.prototype),
        (gb.propHooks = {
            _default: {
                get: function (a) {
                    var b;
                    return 1 !== a.elem.nodeType ||
                        (null != a.elem[a.prop] && null == a.elem.style[a.prop])
                        ? a.elem[a.prop]
                        : ((b = n.css(a.elem, a.prop, "")),
                          b && "auto" !== b ? b : 0);
                },
                set: function (a) {
                    n.fx.step[a.prop]
                        ? n.fx.step[a.prop](a)
                        : 1 !== a.elem.nodeType ||
                          (null == a.elem.style[n.cssProps[a.prop]] &&
                              !n.cssHooks[a.prop])
                        ? (a.elem[a.prop] = a.now)
                        : n.style(a.elem, a.prop, a.now + a.unit);
                },
            },
        }),
        (gb.propHooks.scrollTop = gb.propHooks.scrollLeft =
            {
                set: function (a) {
                    a.elem.nodeType &&
                        a.elem.parentNode &&
                        (a.elem[a.prop] = a.now);
                },
            }),
        (n.easing = {
            linear: function (a) {
                return a;
            },
            swing: function (a) {
                return 0.5 - Math.cos(a * Math.PI) / 2;
            },
            _default: "swing",
        }),
        (n.fx = gb.prototype.init),
        (n.fx.step = {});
    var hb,
        ib,
        jb = /^(?:toggle|show|hide)$/,
        kb = /queueHooks$/;
    function lb() {
        return (
            a.setTimeout(function () {
                hb = void 0;
            }),
            (hb = n.now())
        );
    }
    function mb(a, b) {
        var c,
            d = { height: a },
            e = 0;
        for (b = b ? 1 : 0; 4 > e; e += 2 - b)
            (c = V[e]), (d["margin" + c] = d["padding" + c] = a);
        return b && (d.opacity = d.width = a), d;
    }
    function nb(a, b, c) {
        for (
            var d,
                e = (qb.tweeners[b] || []).concat(qb.tweeners["*"]),
                f = 0,
                g = e.length;
            g > f;
            f++
        )
            if ((d = e[f].call(c, b, a))) return d;
    }
    function ob(a, b, c) {
        var d,
            e,
            f,
            g,
            h,
            i,
            j,
            k,
            m = this,
            o = {},
            p = a.style,
            q = a.nodeType && W(a),
            r = n._data(a, "fxshow");
        c.queue ||
            ((h = n._queueHooks(a, "fx")),
            null == h.unqueued &&
                ((h.unqueued = 0),
                (i = h.empty.fire),
                (h.empty.fire = function () {
                    h.unqueued || i();
                })),
            h.unqueued++,
            m.always(function () {
                m.always(function () {
                    h.unqueued--, n.queue(a, "fx").length || h.empty.fire();
                });
            })),
            1 === a.nodeType &&
                ("height" in b || "width" in b) &&
                ((c.overflow = [p.overflow, p.overflowX, p.overflowY]),
                (j = n.css(a, "display")),
                (k =
                    "none" === j
                        ? n._data(a, "olddisplay") || Ma(a.nodeName)
                        : j),
                "inline" === k &&
                    "none" === n.css(a, "float") &&
                    (l.inlineBlockNeedsLayout && "inline" !== Ma(a.nodeName)
                        ? (p.zoom = 1)
                        : (p.display = "inline-block"))),
            c.overflow &&
                ((p.overflow = "hidden"),
                l.shrinkWrapBlocks() ||
                    m.always(function () {
                        (p.overflow = c.overflow[0]),
                            (p.overflowX = c.overflow[1]),
                            (p.overflowY = c.overflow[2]);
                    }));
        for (d in b)
            if (((e = b[d]), jb.exec(e))) {
                if (
                    (delete b[d],
                    (f = f || "toggle" === e),
                    e === (q ? "hide" : "show"))
                ) {
                    if ("show" !== e || !r || void 0 === r[d]) continue;
                    q = !0;
                }
                o[d] = (r && r[d]) || n.style(a, d);
            } else j = void 0;
        if (n.isEmptyObject(o))
            "inline" === ("none" === j ? Ma(a.nodeName) : j) && (p.display = j);
        else {
            r
                ? "hidden" in r && (q = r.hidden)
                : (r = n._data(a, "fxshow", {})),
                f && (r.hidden = !q),
                q
                    ? n(a).show()
                    : m.done(function () {
                          n(a).hide();
                      }),
                m.done(function () {
                    var b;
                    n._removeData(a, "fxshow");
                    for (b in o) n.style(a, b, o[b]);
                });
            for (d in o)
                (g = nb(q ? r[d] : 0, d, m)),
                    d in r ||
                        ((r[d] = g.start),
                        q &&
                            ((g.end = g.start),
                            (g.start =
                                "width" === d || "height" === d ? 1 : 0)));
        }
    }
    function pb(a, b) {
        var c, d, e, f, g;
        for (c in a)
            if (
                ((d = n.camelCase(c)),
                (e = b[d]),
                (f = a[c]),
                n.isArray(f) && ((e = f[1]), (f = a[c] = f[0])),
                c !== d && ((a[d] = f), delete a[c]),
                (g = n.cssHooks[d]),
                g && "expand" in g)
            ) {
                (f = g.expand(f)), delete a[d];
                for (c in f) c in a || ((a[c] = f[c]), (b[c] = e));
            } else b[d] = e;
    }
    function qb(a, b, c) {
        var d,
            e,
            f = 0,
            g = qb.prefilters.length,
            h = n.Deferred().always(function () {
                delete i.elem;
            }),
            i = function () {
                if (e) return !1;
                for (
                    var b = hb || lb(),
                        c = Math.max(0, j.startTime + j.duration - b),
                        d = c / j.duration || 0,
                        f = 1 - d,
                        g = 0,
                        i = j.tweens.length;
                    i > g;
                    g++
                )
                    j.tweens[g].run(f);
                return (
                    h.notifyWith(a, [j, f, c]),
                    1 > f && i ? c : (h.resolveWith(a, [j]), !1)
                );
            },
            j = h.promise({
                elem: a,
                props: n.extend({}, b),
                opts: n.extend(
                    !0,
                    { specialEasing: {}, easing: n.easing._default },
                    c
                ),
                originalProperties: b,
                originalOptions: c,
                startTime: hb || lb(),
                duration: c.duration,
                tweens: [],
                createTween: function (b, c) {
                    var d = n.Tween(
                        a,
                        j.opts,
                        b,
                        c,
                        j.opts.specialEasing[b] || j.opts.easing
                    );
                    return j.tweens.push(d), d;
                },
                stop: function (b) {
                    var c = 0,
                        d = b ? j.tweens.length : 0;
                    if (e) return this;
                    for (e = !0; d > c; c++) j.tweens[c].run(1);
                    return (
                        b
                            ? (h.notifyWith(a, [j, 1, 0]),
                              h.resolveWith(a, [j, b]))
                            : h.rejectWith(a, [j, b]),
                        this
                    );
                },
            }),
            k = j.props;
        for (pb(k, j.opts.specialEasing); g > f; f++)
            if ((d = qb.prefilters[f].call(j, a, k, j.opts)))
                return (
                    n.isFunction(d.stop) &&
                        (n._queueHooks(j.elem, j.opts.queue).stop = n.proxy(
                            d.stop,
                            d
                        )),
                    d
                );
        return (
            n.map(k, nb, j),
            n.isFunction(j.opts.start) && j.opts.start.call(a, j),
            n.fx.timer(n.extend(i, { elem: a, anim: j, queue: j.opts.queue })),
            j
                .progress(j.opts.progress)
                .done(j.opts.done, j.opts.complete)
                .fail(j.opts.fail)
                .always(j.opts.always)
        );
    }
    (n.Animation = n.extend(qb, {
        tweeners: {
            "*": [
                function (a, b) {
                    var c = this.createTween(a, b);
                    return X(c.elem, a, U.exec(b), c), c;
                },
            ],
        },
        tweener: function (a, b) {
            n.isFunction(a) ? ((b = a), (a = ["*"])) : (a = a.match(G));
            for (var c, d = 0, e = a.length; e > d; d++)
                (c = a[d]),
                    (qb.tweeners[c] = qb.tweeners[c] || []),
                    qb.tweeners[c].unshift(b);
        },
        prefilters: [ob],
        prefilter: function (a, b) {
            b ? qb.prefilters.unshift(a) : qb.prefilters.push(a);
        },
    })),
        (n.speed = function (a, b, c) {
            var d =
                a && "object" == typeof a
                    ? n.extend({}, a)
                    : {
                          complete: c || (!c && b) || (n.isFunction(a) && a),
                          duration: a,
                          easing: (c && b) || (b && !n.isFunction(b) && b),
                      };
            return (
                (d.duration = n.fx.off
                    ? 0
                    : "number" == typeof d.duration
                    ? d.duration
                    : d.duration in n.fx.speeds
                    ? n.fx.speeds[d.duration]
                    : n.fx.speeds._default),
                (null != d.queue && d.queue !== !0) || (d.queue = "fx"),
                (d.old = d.complete),
                (d.complete = function () {
                    n.isFunction(d.old) && d.old.call(this),
                        d.queue && n.dequeue(this, d.queue);
                }),
                d
            );
        }),
        n.fn.extend({
            fadeTo: function (a, b, c, d) {
                return this.filter(W)
                    .css("opacity", 0)
                    .show()
                    .end()
                    .animate({ opacity: b }, a, c, d);
            },
            animate: function (a, b, c, d) {
                var e = n.isEmptyObject(a),
                    f = n.speed(b, c, d),
                    g = function () {
                        var b = qb(this, n.extend({}, a), f);
                        (e || n._data(this, "finish")) && b.stop(!0);
                    };
                return (
                    (g.finish = g),
                    e || f.queue === !1 ? this.each(g) : this.queue(f.queue, g)
                );
            },
            stop: function (a, b, c) {
                var d = function (a) {
                    var b = a.stop;
                    delete a.stop, b(c);
                };
                return (
                    "string" != typeof a && ((c = b), (b = a), (a = void 0)),
                    b && a !== !1 && this.queue(a || "fx", []),
                    this.each(function () {
                        var b = !0,
                            e = null != a && a + "queueHooks",
                            f = n.timers,
                            g = n._data(this);
                        if (e) g[e] && g[e].stop && d(g[e]);
                        else
                            for (e in g)
                                g[e] && g[e].stop && kb.test(e) && d(g[e]);
                        for (e = f.length; e--; )
                            f[e].elem !== this ||
                                (null != a && f[e].queue !== a) ||
                                (f[e].anim.stop(c), (b = !1), f.splice(e, 1));
                        (!b && c) || n.dequeue(this, a);
                    })
                );
            },
            finish: function (a) {
                return (
                    a !== !1 && (a = a || "fx"),
                    this.each(function () {
                        var b,
                            c = n._data(this),
                            d = c[a + "queue"],
                            e = c[a + "queueHooks"],
                            f = n.timers,
                            g = d ? d.length : 0;
                        for (
                            c.finish = !0,
                                n.queue(this, a, []),
                                e && e.stop && e.stop.call(this, !0),
                                b = f.length;
                            b--;

                        )
                            f[b].elem === this &&
                                f[b].queue === a &&
                                (f[b].anim.stop(!0), f.splice(b, 1));
                        for (b = 0; g > b; b++)
                            d[b] && d[b].finish && d[b].finish.call(this);
                        delete c.finish;
                    })
                );
            },
        }),
        n.each(["toggle", "show", "hide"], function (a, b) {
            var c = n.fn[b];
            n.fn[b] = function (a, d, e) {
                return null == a || "boolean" == typeof a
                    ? c.apply(this, arguments)
                    : this.animate(mb(b, !0), a, d, e);
            };
        }),
        n.each(
            {
                slideDown: mb("show"),
                slideUp: mb("hide"),
                slideToggle: mb("toggle"),
                fadeIn: { opacity: "show" },
                fadeOut: { opacity: "hide" },
                fadeToggle: { opacity: "toggle" },
            },
            function (a, b) {
                n.fn[a] = function (a, c, d) {
                    return this.animate(b, a, c, d);
                };
            }
        ),
        (n.timers = []),
        (n.fx.tick = function () {
            var a,
                b = n.timers,
                c = 0;
            for (hb = n.now(); c < b.length; c++)
                (a = b[c]), a() || b[c] !== a || b.splice(c--, 1);
            b.length || n.fx.stop(), (hb = void 0);
        }),
        (n.fx.timer = function (a) {
            n.timers.push(a), a() ? n.fx.start() : n.timers.pop();
        }),
        (n.fx.interval = 13),
        (n.fx.start = function () {
            ib || (ib = a.setInterval(n.fx.tick, n.fx.interval));
        }),
        (n.fx.stop = function () {
            a.clearInterval(ib), (ib = null);
        }),
        (n.fx.speeds = { slow: 600, fast: 200, _default: 400 }),
        (n.fn.delay = function (b, c) {
            return (
                (b = n.fx ? n.fx.speeds[b] || b : b),
                (c = c || "fx"),
                this.queue(c, function (c, d) {
                    var e = a.setTimeout(c, b);
                    d.stop = function () {
                        a.clearTimeout(e);
                    };
                })
            );
        }),
        (function () {
            var a,
                b = d.createElement("input"),
                c = d.createElement("div"),
                e = d.createElement("select"),
                f = e.appendChild(d.createElement("option"));
            (c = d.createElement("div")),
                c.setAttribute("className", "t"),
                (c.innerHTML =
                    "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>"),
                (a = c.getElementsByTagName("a")[0]),
                b.setAttribute("type", "checkbox"),
                c.appendChild(b),
                (a = c.getElementsByTagName("a")[0]),
                (a.style.cssText = "top:1px"),
                (l.getSetAttribute = "t" !== c.className),
                (l.style = /top/.test(a.getAttribute("style"))),
                (l.hrefNormalized = "/a" === a.getAttribute("href")),
                (l.checkOn = !!b.value),
                (l.optSelected = f.selected),
                (l.enctype = !!d.createElement("form").enctype),
                (e.disabled = !0),
                (l.optDisabled = !f.disabled),
                (b = d.createElement("input")),
                b.setAttribute("value", ""),
                (l.input = "" === b.getAttribute("value")),
                (b.value = "t"),
                b.setAttribute("type", "radio"),
                (l.radioValue = "t" === b.value);
        })();
    var rb = /\r/g,
        sb = /[\x20\t\r\n\f]+/g;
    n.fn.extend({
        val: function (a) {
            var b,
                c,
                d,
                e = this[0];
            {
                if (arguments.length)
                    return (
                        (d = n.isFunction(a)),
                        this.each(function (c) {
                            var e;
                            1 === this.nodeType &&
                                ((e = d ? a.call(this, c, n(this).val()) : a),
                                null == e
                                    ? (e = "")
                                    : "number" == typeof e
                                    ? (e += "")
                                    : n.isArray(e) &&
                                      (e = n.map(e, function (a) {
                                          return null == a ? "" : a + "";
                                      })),
                                (b =
                                    n.valHooks[this.type] ||
                                    n.valHooks[this.nodeName.toLowerCase()]),
                                (b &&
                                    "set" in b &&
                                    void 0 !== b.set(this, e, "value")) ||
                                    (this.value = e));
                        })
                    );
                if (e)
                    return (
                        (b =
                            n.valHooks[e.type] ||
                            n.valHooks[e.nodeName.toLowerCase()]),
                        b && "get" in b && void 0 !== (c = b.get(e, "value"))
                            ? c
                            : ((c = e.value),
                              "string" == typeof c
                                  ? c.replace(rb, "")
                                  : null == c
                                  ? ""
                                  : c)
                    );
            }
        },
    }),
        n.extend({
            valHooks: {
                option: {
                    get: function (a) {
                        var b = n.find.attr(a, "value");
                        return null != b
                            ? b
                            : n.trim(n.text(a)).replace(sb, " ");
                    },
                },
                select: {
                    get: function (a) {
                        for (
                            var b,
                                c,
                                d = a.options,
                                e = a.selectedIndex,
                                f = "select-one" === a.type || 0 > e,
                                g = f ? null : [],
                                h = f ? e + 1 : d.length,
                                i = 0 > e ? h : f ? e : 0;
                            h > i;
                            i++
                        )
                            if (
                                ((c = d[i]),
                                (c.selected || i === e) &&
                                    (l.optDisabled
                                        ? !c.disabled
                                        : null ===
                                          c.getAttribute("disabled")) &&
                                    (!c.parentNode.disabled ||
                                        !n.nodeName(c.parentNode, "optgroup")))
                            ) {
                                if (((b = n(c).val()), f)) return b;
                                g.push(b);
                            }
                        return g;
                    },
                    set: function (a, b) {
                        var c,
                            d,
                            e = a.options,
                            f = n.makeArray(b),
                            g = e.length;
                        while (g--)
                            if (
                                ((d = e[g]),
                                n.inArray(n.valHooks.option.get(d), f) > -1)
                            )
                                try {
                                    d.selected = c = !0;
                                } catch (h) {
                                    d.scrollHeight;
                                }
                            else d.selected = !1;
                        return c || (a.selectedIndex = -1), e;
                    },
                },
            },
        }),
        n.each(["radio", "checkbox"], function () {
            (n.valHooks[this] = {
                set: function (a, b) {
                    return n.isArray(b)
                        ? (a.checked = n.inArray(n(a).val(), b) > -1)
                        : void 0;
                },
            }),
                l.checkOn ||
                    (n.valHooks[this].get = function (a) {
                        return null === a.getAttribute("value")
                            ? "on"
                            : a.value;
                    });
        });
    var tb,
        ub,
        vb = n.expr.attrHandle,
        wb = /^(?:checked|selected)$/i,
        xb = l.getSetAttribute,
        yb = l.input;
    n.fn.extend({
        attr: function (a, b) {
            return Y(this, n.attr, a, b, arguments.length > 1);
        },
        removeAttr: function (a) {
            return this.each(function () {
                n.removeAttr(this, a);
            });
        },
    }),
        n.extend({
            attr: function (a, b, c) {
                var d,
                    e,
                    f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f)
                    return "undefined" == typeof a.getAttribute
                        ? n.prop(a, b, c)
                        : ((1 === f && n.isXMLDoc(a)) ||
                              ((b = b.toLowerCase()),
                              (e =
                                  n.attrHooks[b] ||
                                  (n.expr.match.bool.test(b) ? ub : tb))),
                          void 0 !== c
                              ? null === c
                                  ? void n.removeAttr(a, b)
                                  : e &&
                                    "set" in e &&
                                    void 0 !== (d = e.set(a, c, b))
                                  ? d
                                  : (a.setAttribute(b, c + ""), c)
                              : e && "get" in e && null !== (d = e.get(a, b))
                              ? d
                              : ((d = n.find.attr(a, b)),
                                null == d ? void 0 : d));
            },
            attrHooks: {
                type: {
                    set: function (a, b) {
                        if (
                            !l.radioValue &&
                            "radio" === b &&
                            n.nodeName(a, "input")
                        ) {
                            var c = a.value;
                            return (
                                a.setAttribute("type", b), c && (a.value = c), b
                            );
                        }
                    },
                },
            },
            removeAttr: function (a, b) {
                var c,
                    d,
                    e = 0,
                    f = b && b.match(G);
                if (f && 1 === a.nodeType)
                    while ((c = f[e++]))
                        (d = n.propFix[c] || c),
                            n.expr.match.bool.test(c)
                                ? (yb && xb) || !wb.test(c)
                                    ? (a[d] = !1)
                                    : (a[n.camelCase("default-" + c)] = a[d] =
                                          !1)
                                : n.attr(a, c, ""),
                            a.removeAttribute(xb ? c : d);
            },
        }),
        (ub = {
            set: function (a, b, c) {
                return (
                    b === !1
                        ? n.removeAttr(a, c)
                        : (yb && xb) || !wb.test(c)
                        ? a.setAttribute((!xb && n.propFix[c]) || c, c)
                        : (a[n.camelCase("default-" + c)] = a[c] = !0),
                    c
                );
            },
        }),
        n.each(n.expr.match.bool.source.match(/\w+/g), function (a, b) {
            var c = vb[b] || n.find.attr;
            (yb && xb) || !wb.test(b)
                ? (vb[b] = function (a, b, d) {
                      var e, f;
                      return (
                          d ||
                              ((f = vb[b]),
                              (vb[b] = e),
                              (e = null != c(a, b, d) ? b.toLowerCase() : null),
                              (vb[b] = f)),
                          e
                      );
                  })
                : (vb[b] = function (a, b, c) {
                      return c
                          ? void 0
                          : a[n.camelCase("default-" + b)]
                          ? b.toLowerCase()
                          : null;
                  });
        }),
        (yb && xb) ||
            (n.attrHooks.value = {
                set: function (a, b, c) {
                    return n.nodeName(a, "input")
                        ? void (a.defaultValue = b)
                        : tb && tb.set(a, b, c);
                },
            }),
        xb ||
            ((tb = {
                set: function (a, b, c) {
                    var d = a.getAttributeNode(c);
                    return (
                        d ||
                            a.setAttributeNode(
                                (d = a.ownerDocument.createAttribute(c))
                            ),
                        (d.value = b += ""),
                        "value" === c || b === a.getAttribute(c) ? b : void 0
                    );
                },
            }),
            (vb.id =
                vb.name =
                vb.coords =
                    function (a, b, c) {
                        var d;
                        return c
                            ? void 0
                            : (d = a.getAttributeNode(b)) && "" !== d.value
                            ? d.value
                            : null;
                    }),
            (n.valHooks.button = {
                get: function (a, b) {
                    var c = a.getAttributeNode(b);
                    return c && c.specified ? c.value : void 0;
                },
                set: tb.set,
            }),
            (n.attrHooks.contenteditable = {
                set: function (a, b, c) {
                    tb.set(a, "" === b ? !1 : b, c);
                },
            }),
            n.each(["width", "height"], function (a, b) {
                n.attrHooks[b] = {
                    set: function (a, c) {
                        return "" === c
                            ? (a.setAttribute(b, "auto"), c)
                            : void 0;
                    },
                };
            })),
        l.style ||
            (n.attrHooks.style = {
                get: function (a) {
                    return a.style.cssText || void 0;
                },
                set: function (a, b) {
                    return (a.style.cssText = b + "");
                },
            });
    var zb = /^(?:input|select|textarea|button|object)$/i,
        Ab = /^(?:a|area)$/i;
    n.fn.extend({
        prop: function (a, b) {
            return Y(this, n.prop, a, b, arguments.length > 1);
        },
        removeProp: function (a) {
            return (
                (a = n.propFix[a] || a),
                this.each(function () {
                    try {
                        (this[a] = void 0), delete this[a];
                    } catch (b) {}
                })
            );
        },
    }),
        n.extend({
            prop: function (a, b, c) {
                var d,
                    e,
                    f = a.nodeType;
                if (3 !== f && 8 !== f && 2 !== f)
                    return (
                        (1 === f && n.isXMLDoc(a)) ||
                            ((b = n.propFix[b] || b), (e = n.propHooks[b])),
                        void 0 !== c
                            ? e && "set" in e && void 0 !== (d = e.set(a, c, b))
                                ? d
                                : (a[b] = c)
                            : e && "get" in e && null !== (d = e.get(a, b))
                            ? d
                            : a[b]
                    );
            },
            propHooks: {
                tabIndex: {
                    get: function (a) {
                        var b = n.find.attr(a, "tabindex");
                        return b
                            ? parseInt(b, 10)
                            : zb.test(a.nodeName) ||
                              (Ab.test(a.nodeName) && a.href)
                            ? 0
                            : -1;
                    },
                },
            },
            propFix: { for: "htmlFor", class: "className" },
        }),
        l.hrefNormalized ||
            n.each(["href", "src"], function (a, b) {
                n.propHooks[b] = {
                    get: function (a) {
                        return a.getAttribute(b, 4);
                    },
                };
            }),
        l.optSelected ||
            (n.propHooks.selected = {
                get: function (a) {
                    var b = a.parentNode;
                    return (
                        b &&
                            (b.selectedIndex,
                            b.parentNode && b.parentNode.selectedIndex),
                        null
                    );
                },
                set: function (a) {
                    var b = a.parentNode;
                    b &&
                        (b.selectedIndex,
                        b.parentNode && b.parentNode.selectedIndex);
                },
            }),
        n.each(
            [
                "tabIndex",
                "readOnly",
                "maxLength",
                "cellSpacing",
                "cellPadding",
                "rowSpan",
                "colSpan",
                "useMap",
                "frameBorder",
                "contentEditable",
            ],
            function () {
                n.propFix[this.toLowerCase()] = this;
            }
        ),
        l.enctype || (n.propFix.enctype = "encoding");
    var Bb = /[\t\r\n\f]/g;
    function Cb(a) {
        return n.attr(a, "class") || "";
    }
    n.fn.extend({
        addClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i = 0;
            if (n.isFunction(a))
                return this.each(function (b) {
                    n(this).addClass(a.call(this, b, Cb(this)));
                });
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while ((c = this[i++]))
                    if (
                        ((e = Cb(c)),
                        (d =
                            1 === c.nodeType &&
                            (" " + e + " ").replace(Bb, " ")))
                    ) {
                        g = 0;
                        while ((f = b[g++]))
                            d.indexOf(" " + f + " ") < 0 && (d += f + " ");
                        (h = n.trim(d)), e !== h && n.attr(c, "class", h);
                    }
            }
            return this;
        },
        removeClass: function (a) {
            var b,
                c,
                d,
                e,
                f,
                g,
                h,
                i = 0;
            if (n.isFunction(a))
                return this.each(function (b) {
                    n(this).removeClass(a.call(this, b, Cb(this)));
                });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof a && a) {
                b = a.match(G) || [];
                while ((c = this[i++]))
                    if (
                        ((e = Cb(c)),
                        (d =
                            1 === c.nodeType &&
                            (" " + e + " ").replace(Bb, " ")))
                    ) {
                        g = 0;
                        while ((f = b[g++]))
                            while (d.indexOf(" " + f + " ") > -1)
                                d = d.replace(" " + f + " ", " ");
                        (h = n.trim(d)), e !== h && n.attr(c, "class", h);
                    }
            }
            return this;
        },
        toggleClass: function (a, b) {
            var c = typeof a;
            return "boolean" == typeof b && "string" === c
                ? b
                    ? this.addClass(a)
                    : this.removeClass(a)
                : n.isFunction(a)
                ? this.each(function (c) {
                      n(this).toggleClass(a.call(this, c, Cb(this), b), b);
                  })
                : this.each(function () {
                      var b, d, e, f;
                      if ("string" === c) {
                          (d = 0), (e = n(this)), (f = a.match(G) || []);
                          while ((b = f[d++]))
                              e.hasClass(b) ? e.removeClass(b) : e.addClass(b);
                      } else (void 0 !== a && "boolean" !== c) || ((b = Cb(this)), b && n._data(this, "__className__", b), n.attr(this, "class", b || a === !1 ? "" : n._data(this, "__className__") || ""));
                  });
        },
        hasClass: function (a) {
            var b,
                c,
                d = 0;
            b = " " + a + " ";
            while ((c = this[d++]))
                if (
                    1 === c.nodeType &&
                    (" " + Cb(c) + " ").replace(Bb, " ").indexOf(b) > -1
                )
                    return !0;
            return !1;
        },
    }),
        n.each(
            "blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(
                " "
            ),
            function (a, b) {
                n.fn[b] = function (a, c) {
                    return arguments.length > 0
                        ? this.on(b, null, a, c)
                        : this.trigger(b);
                };
            }
        ),
        n.fn.extend({
            hover: function (a, b) {
                return this.mouseenter(a).mouseleave(b || a);
            },
        });
    var Db = a.location,
        Eb = n.now(),
        Fb = /\?/,
        Gb =
            /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    (n.parseJSON = function (b) {
        if (a.JSON && a.JSON.parse) return a.JSON.parse(b + "");
        var c,
            d = null,
            e = n.trim(b + "");
        return e &&
            !n.trim(
                e.replace(Gb, function (a, b, e, f) {
                    return (
                        c && b && (d = 0),
                        0 === d ? a : ((c = e || b), (d += !f - !e), "")
                    );
                })
            )
            ? Function("return " + e)()
            : n.error("Invalid JSON: " + b);
    }),
        (n.parseXML = function (b) {
            var c, d;
            if (!b || "string" != typeof b) return null;
            try {
                a.DOMParser
                    ? ((d = new a.DOMParser()),
                      (c = d.parseFromString(b, "text/xml")))
                    : ((c = new a.ActiveXObject("Microsoft.XMLDOM")),
                      (c.async = "false"),
                      c.loadXML(b));
            } catch (e) {
                c = void 0;
            }
            return (
                (c &&
                    c.documentElement &&
                    !c.getElementsByTagName("parsererror").length) ||
                    n.error("Invalid XML: " + b),
                c
            );
        });
    var Hb = /#.*$/,
        Ib = /([?&])_=[^&]*/,
        Jb = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm,
        Kb = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
        Lb = /^(?:GET|HEAD)$/,
        Mb = /^\/\//,
        Nb = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,
        Ob = {},
        Pb = {},
        Qb = "*/".concat("*"),
        Rb = Db.href,
        Sb = Nb.exec(Rb.toLowerCase()) || [];
    function Tb(a) {
        return function (b, c) {
            "string" != typeof b && ((c = b), (b = "*"));
            var d,
                e = 0,
                f = b.toLowerCase().match(G) || [];
            if (n.isFunction(c))
                while ((d = f[e++]))
                    "+" === d.charAt(0)
                        ? ((d = d.slice(1) || "*"),
                          (a[d] = a[d] || []).unshift(c))
                        : (a[d] = a[d] || []).push(c);
        };
    }
    function Ub(a, b, c, d) {
        var e = {},
            f = a === Pb;
        function g(h) {
            var i;
            return (
                (e[h] = !0),
                n.each(a[h] || [], function (a, h) {
                    var j = h(b, c, d);
                    return "string" != typeof j || f || e[j]
                        ? f
                            ? !(i = j)
                            : void 0
                        : (b.dataTypes.unshift(j), g(j), !1);
                }),
                i
            );
        }
        return g(b.dataTypes[0]) || (!e["*"] && g("*"));
    }
    function Vb(a, b) {
        var c,
            d,
            e = n.ajaxSettings.flatOptions || {};
        for (d in b) void 0 !== b[d] && ((e[d] ? a : c || (c = {}))[d] = b[d]);
        return c && n.extend(!0, a, c), a;
    }
    function Wb(a, b, c) {
        var d,
            e,
            f,
            g,
            h = a.contents,
            i = a.dataTypes;
        while ("*" === i[0])
            i.shift(),
                void 0 === e &&
                    (e = a.mimeType || b.getResponseHeader("Content-Type"));
        if (e)
            for (g in h)
                if (h[g] && h[g].test(e)) {
                    i.unshift(g);
                    break;
                }
        if (i[0] in c) f = i[0];
        else {
            for (g in c) {
                if (!i[0] || a.converters[g + " " + i[0]]) {
                    f = g;
                    break;
                }
                d || (d = g);
            }
            f = f || d;
        }
        return f ? (f !== i[0] && i.unshift(f), c[f]) : void 0;
    }
    function Xb(a, b, c, d) {
        var e,
            f,
            g,
            h,
            i,
            j = {},
            k = a.dataTypes.slice();
        if (k[1]) for (g in a.converters) j[g.toLowerCase()] = a.converters[g];
        f = k.shift();
        while (f)
            if (
                (a.responseFields[f] && (c[a.responseFields[f]] = b),
                !i && d && a.dataFilter && (b = a.dataFilter(b, a.dataType)),
                (i = f),
                (f = k.shift()))
            )
                if ("*" === f) f = i;
                else if ("*" !== i && i !== f) {
                    if (((g = j[i + " " + f] || j["* " + f]), !g))
                        for (e in j)
                            if (
                                ((h = e.split(" ")),
                                h[1] === f &&
                                    (g = j[i + " " + h[0]] || j["* " + h[0]]))
                            ) {
                                g === !0
                                    ? (g = j[e])
                                    : j[e] !== !0 &&
                                      ((f = h[0]), k.unshift(h[1]));
                                break;
                            }
                    if (g !== !0)
                        if (g && a["throws"]) b = g(b);
                        else
                            try {
                                b = g(b);
                            } catch (l) {
                                return {
                                    state: "parsererror",
                                    error: g
                                        ? l
                                        : "No conversion from " +
                                          i +
                                          " to " +
                                          f,
                                };
                            }
                }
        return { state: "success", data: b };
    }
    n.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Rb,
            type: "GET",
            isLocal: Kb.test(Sb[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": Qb,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript",
            },
            contents: { xml: /\bxml\b/, html: /\bhtml/, json: /\bjson\b/ },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON",
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": n.parseJSON,
                "text xml": n.parseXML,
            },
            flatOptions: { url: !0, context: !0 },
        },
        ajaxSetup: function (a, b) {
            return b ? Vb(Vb(a, n.ajaxSettings), b) : Vb(n.ajaxSettings, a);
        },
        ajaxPrefilter: Tb(Ob),
        ajaxTransport: Tb(Pb),
        ajax: function (b, c) {
            "object" == typeof b && ((c = b), (b = void 0)), (c = c || {});
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k,
                l = n.ajaxSetup({}, c),
                m = l.context || l,
                o = l.context && (m.nodeType || m.jquery) ? n(m) : n.event,
                p = n.Deferred(),
                q = n.Callbacks("once memory"),
                r = l.statusCode || {},
                s = {},
                t = {},
                u = 0,
                v = "canceled",
                w = {
                    readyState: 0,
                    getResponseHeader: function (a) {
                        var b;
                        if (2 === u) {
                            if (!k) {
                                k = {};
                                while ((b = Jb.exec(g)))
                                    k[b[1].toLowerCase()] = b[2];
                            }
                            b = k[a.toLowerCase()];
                        }
                        return null == b ? null : b;
                    },
                    getAllResponseHeaders: function () {
                        return 2 === u ? g : null;
                    },
                    setRequestHeader: function (a, b) {
                        var c = a.toLowerCase();
                        return u || ((a = t[c] = t[c] || a), (s[a] = b)), this;
                    },
                    overrideMimeType: function (a) {
                        return u || (l.mimeType = a), this;
                    },
                    statusCode: function (a) {
                        var b;
                        if (a)
                            if (2 > u) for (b in a) r[b] = [r[b], a[b]];
                            else w.always(a[w.status]);
                        return this;
                    },
                    abort: function (a) {
                        var b = a || v;
                        return j && j.abort(b), y(0, b), this;
                    },
                };
            if (
                ((p.promise(w).complete = q.add),
                (w.success = w.done),
                (w.error = w.fail),
                (l.url = ((b || l.url || Rb) + "")
                    .replace(Hb, "")
                    .replace(Mb, Sb[1] + "//")),
                (l.type = c.method || c.type || l.method || l.type),
                (l.dataTypes = n
                    .trim(l.dataType || "*")
                    .toLowerCase()
                    .match(G) || [""]),
                null == l.crossDomain &&
                    ((d = Nb.exec(l.url.toLowerCase())),
                    (l.crossDomain = !(
                        !d ||
                        (d[1] === Sb[1] &&
                            d[2] === Sb[2] &&
                            (d[3] || ("http:" === d[1] ? "80" : "443")) ===
                                (Sb[3] || ("http:" === Sb[1] ? "80" : "443")))
                    ))),
                l.data &&
                    l.processData &&
                    "string" != typeof l.data &&
                    (l.data = n.param(l.data, l.traditional)),
                Ub(Ob, l, c, w),
                2 === u)
            )
                return w;
            (i = n.event && l.global),
                i && 0 === n.active++ && n.event.trigger("ajaxStart"),
                (l.type = l.type.toUpperCase()),
                (l.hasContent = !Lb.test(l.type)),
                (f = l.url),
                l.hasContent ||
                    (l.data &&
                        ((f = l.url += (Fb.test(f) ? "&" : "?") + l.data),
                        delete l.data),
                    l.cache === !1 &&
                        (l.url = Ib.test(f)
                            ? f.replace(Ib, "$1_=" + Eb++)
                            : f + (Fb.test(f) ? "&" : "?") + "_=" + Eb++)),
                l.ifModified &&
                    (n.lastModified[f] &&
                        w.setRequestHeader(
                            "If-Modified-Since",
                            n.lastModified[f]
                        ),
                    n.etag[f] &&
                        w.setRequestHeader("If-None-Match", n.etag[f])),
                ((l.data && l.hasContent && l.contentType !== !1) ||
                    c.contentType) &&
                    w.setRequestHeader("Content-Type", l.contentType),
                w.setRequestHeader(
                    "Accept",
                    l.dataTypes[0] && l.accepts[l.dataTypes[0]]
                        ? l.accepts[l.dataTypes[0]] +
                              ("*" !== l.dataTypes[0]
                                  ? ", " + Qb + "; q=0.01"
                                  : "")
                        : l.accepts["*"]
                );
            for (e in l.headers) w.setRequestHeader(e, l.headers[e]);
            if (l.beforeSend && (l.beforeSend.call(m, w, l) === !1 || 2 === u))
                return w.abort();
            v = "abort";
            for (e in { success: 1, error: 1, complete: 1 }) w[e](l[e]);
            if ((j = Ub(Pb, l, c, w))) {
                if (
                    ((w.readyState = 1),
                    i && o.trigger("ajaxSend", [w, l]),
                    2 === u)
                )
                    return w;
                l.async &&
                    l.timeout > 0 &&
                    (h = a.setTimeout(function () {
                        w.abort("timeout");
                    }, l.timeout));
                try {
                    (u = 1), j.send(s, y);
                } catch (x) {
                    if (!(2 > u)) throw x;
                    y(-1, x);
                }
            } else y(-1, "No Transport");
            function y(b, c, d, e) {
                var k,
                    s,
                    t,
                    v,
                    x,
                    y = c;
                2 !== u &&
                    ((u = 2),
                    h && a.clearTimeout(h),
                    (j = void 0),
                    (g = e || ""),
                    (w.readyState = b > 0 ? 4 : 0),
                    (k = (b >= 200 && 300 > b) || 304 === b),
                    d && (v = Wb(l, w, d)),
                    (v = Xb(l, v, w, k)),
                    k
                        ? (l.ifModified &&
                              ((x = w.getResponseHeader("Last-Modified")),
                              x && (n.lastModified[f] = x),
                              (x = w.getResponseHeader("etag")),
                              x && (n.etag[f] = x)),
                          204 === b || "HEAD" === l.type
                              ? (y = "nocontent")
                              : 304 === b
                              ? (y = "notmodified")
                              : ((y = v.state),
                                (s = v.data),
                                (t = v.error),
                                (k = !t)))
                        : ((t = y),
                          (!b && y) || ((y = "error"), 0 > b && (b = 0))),
                    (w.status = b),
                    (w.statusText = (c || y) + ""),
                    k
                        ? p.resolveWith(m, [s, y, w])
                        : p.rejectWith(m, [w, y, t]),
                    w.statusCode(r),
                    (r = void 0),
                    i &&
                        o.trigger(k ? "ajaxSuccess" : "ajaxError", [
                            w,
                            l,
                            k ? s : t,
                        ]),
                    q.fireWith(m, [w, y]),
                    i &&
                        (o.trigger("ajaxComplete", [w, l]),
                        --n.active || n.event.trigger("ajaxStop")));
            }
            return w;
        },
        getJSON: function (a, b, c) {
            return n.get(a, b, c, "json");
        },
        getScript: function (a, b) {
            return n.get(a, void 0, b, "script");
        },
    }),
        n.each(["get", "post"], function (a, b) {
            n[b] = function (a, c, d, e) {
                return (
                    n.isFunction(c) && ((e = e || d), (d = c), (c = void 0)),
                    n.ajax(
                        n.extend(
                            {
                                url: a,
                                type: b,
                                dataType: e,
                                data: c,
                                success: d,
                            },
                            n.isPlainObject(a) && a
                        )
                    )
                );
            };
        }),
        (n._evalUrl = function (a) {
            return n.ajax({
                url: a,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0,
            });
        }),
        n.fn.extend({
            wrapAll: function (a) {
                if (n.isFunction(a))
                    return this.each(function (b) {
                        n(this).wrapAll(a.call(this, b));
                    });
                if (this[0]) {
                    var b = n(a, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && b.insertBefore(this[0]),
                        b
                            .map(function () {
                                var a = this;
                                while (
                                    a.firstChild &&
                                    1 === a.firstChild.nodeType
                                )
                                    a = a.firstChild;
                                return a;
                            })
                            .append(this);
                }
                return this;
            },
            wrapInner: function (a) {
                return n.isFunction(a)
                    ? this.each(function (b) {
                          n(this).wrapInner(a.call(this, b));
                      })
                    : this.each(function () {
                          var b = n(this),
                              c = b.contents();
                          c.length ? c.wrapAll(a) : b.append(a);
                      });
            },
            wrap: function (a) {
                var b = n.isFunction(a);
                return this.each(function (c) {
                    n(this).wrapAll(b ? a.call(this, c) : a);
                });
            },
            unwrap: function () {
                return this.parent()
                    .each(function () {
                        n.nodeName(this, "body") ||
                            n(this).replaceWith(this.childNodes);
                    })
                    .end();
            },
        });
    function Yb(a) {
        return (a.style && a.style.display) || n.css(a, "display");
    }
    function Zb(a) {
        if (!n.contains(a.ownerDocument || d, a)) return !0;
        while (a && 1 === a.nodeType) {
            if ("none" === Yb(a) || "hidden" === a.type) return !0;
            a = a.parentNode;
        }
        return !1;
    }
    (n.expr.filters.hidden = function (a) {
        return l.reliableHiddenOffsets()
            ? a.offsetWidth <= 0 &&
                  a.offsetHeight <= 0 &&
                  !a.getClientRects().length
            : Zb(a);
    }),
        (n.expr.filters.visible = function (a) {
            return !n.expr.filters.hidden(a);
        });
    var $b = /%20/g,
        _b = /\[\]$/,
        ac = /\r?\n/g,
        bc = /^(?:submit|button|image|reset|file)$/i,
        cc = /^(?:input|select|textarea|keygen)/i;
    function dc(a, b, c, d) {
        var e;
        if (n.isArray(b))
            n.each(b, function (b, e) {
                c || _b.test(a)
                    ? d(a, e)
                    : dc(
                          a +
                              "[" +
                              ("object" == typeof e && null != e ? b : "") +
                              "]",
                          e,
                          c,
                          d
                      );
            });
        else if (c || "object" !== n.type(b)) d(a, b);
        else for (e in b) dc(a + "[" + e + "]", b[e], c, d);
    }
    (n.param = function (a, b) {
        var c,
            d = [],
            e = function (a, b) {
                (b = n.isFunction(b) ? b() : null == b ? "" : b),
                    (d[d.length] =
                        encodeURIComponent(a) + "=" + encodeURIComponent(b));
            };
        if (
            (void 0 === b && (b = n.ajaxSettings && n.ajaxSettings.traditional),
            n.isArray(a) || (a.jquery && !n.isPlainObject(a)))
        )
            n.each(a, function () {
                e(this.name, this.value);
            });
        else for (c in a) dc(c, a[c], b, e);
        return d.join("&").replace($b, "+");
    }),
        n.fn.extend({
            serialize: function () {
                return n.param(this.serializeArray());
            },
            serializeArray: function () {
                return this.map(function () {
                    var a = n.prop(this, "elements");
                    return a ? n.makeArray(a) : this;
                })
                    .filter(function () {
                        var a = this.type;
                        return (
                            this.name &&
                            !n(this).is(":disabled") &&
                            cc.test(this.nodeName) &&
                            !bc.test(a) &&
                            (this.checked || !Z.test(a))
                        );
                    })
                    .map(function (a, b) {
                        var c = n(this).val();
                        return null == c
                            ? null
                            : n.isArray(c)
                            ? n.map(c, function (a) {
                                  return {
                                      name: b.name,
                                      value: a.replace(ac, "\r\n"),
                                  };
                              })
                            : { name: b.name, value: c.replace(ac, "\r\n") };
                    })
                    .get();
            },
        }),
        (n.ajaxSettings.xhr =
            void 0 !== a.ActiveXObject
                ? function () {
                      return this.isLocal
                          ? ic()
                          : d.documentMode > 8
                          ? hc()
                          : (/^(get|post|head|put|delete|options)$/i.test(
                                this.type
                            ) &&
                                hc()) ||
                            ic();
                  }
                : hc);
    var ec = 0,
        fc = {},
        gc = n.ajaxSettings.xhr();
    a.attachEvent &&
        a.attachEvent("onunload", function () {
            for (var a in fc) fc[a](void 0, !0);
        }),
        (l.cors = !!gc && "withCredentials" in gc),
        (gc = l.ajax = !!gc),
        gc &&
            n.ajaxTransport(function (b) {
                if (!b.crossDomain || l.cors) {
                    var c;
                    return {
                        send: function (d, e) {
                            var f,
                                g = b.xhr(),
                                h = ++ec;
                            if (
                                (g.open(
                                    b.type,
                                    b.url,
                                    b.async,
                                    b.username,
                                    b.password
                                ),
                                b.xhrFields)
                            )
                                for (f in b.xhrFields) g[f] = b.xhrFields[f];
                            b.mimeType &&
                                g.overrideMimeType &&
                                g.overrideMimeType(b.mimeType),
                                b.crossDomain ||
                                    d["X-Requested-With"] ||
                                    (d["X-Requested-With"] = "XMLHttpRequest");
                            for (f in d)
                                void 0 !== d[f] &&
                                    g.setRequestHeader(f, d[f] + "");
                            g.send((b.hasContent && b.data) || null),
                                (c = function (a, d) {
                                    var f, i, j;
                                    if (c && (d || 4 === g.readyState))
                                        if (
                                            (delete fc[h],
                                            (c = void 0),
                                            (g.onreadystatechange = n.noop),
                                            d)
                                        )
                                            4 !== g.readyState && g.abort();
                                        else {
                                            (j = {}),
                                                (f = g.status),
                                                "string" ==
                                                    typeof g.responseText &&
                                                    (j.text = g.responseText);
                                            try {
                                                i = g.statusText;
                                            } catch (k) {
                                                i = "";
                                            }
                                            f || !b.isLocal || b.crossDomain
                                                ? 1223 === f && (f = 204)
                                                : (f = j.text ? 200 : 404);
                                        }
                                    j && e(f, i, j, g.getAllResponseHeaders());
                                }),
                                b.async
                                    ? 4 === g.readyState
                                        ? a.setTimeout(c)
                                        : (g.onreadystatechange = fc[h] = c)
                                    : c();
                        },
                        abort: function () {
                            c && c(void 0, !0);
                        },
                    };
                }
            });
    function hc() {
        try {
            return new a.XMLHttpRequest();
        } catch (b) {}
    }
    function ic() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    n.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript",
        },
        contents: { script: /\b(?:java|ecma)script\b/ },
        converters: {
            "text script": function (a) {
                return n.globalEval(a), a;
            },
        },
    }),
        n.ajaxPrefilter("script", function (a) {
            void 0 === a.cache && (a.cache = !1),
                a.crossDomain && ((a.type = "GET"), (a.global = !1));
        }),
        n.ajaxTransport("script", function (a) {
            if (a.crossDomain) {
                var b,
                    c = d.head || n("head")[0] || d.documentElement;
                return {
                    send: function (e, f) {
                        (b = d.createElement("script")),
                            (b.async = !0),
                            a.scriptCharset && (b.charset = a.scriptCharset),
                            (b.src = a.url),
                            (b.onload = b.onreadystatechange =
                                function (a, c) {
                                    (c ||
                                        !b.readyState ||
                                        /loaded|complete/.test(b.readyState)) &&
                                        ((b.onload = b.onreadystatechange =
                                            null),
                                        b.parentNode &&
                                            b.parentNode.removeChild(b),
                                        (b = null),
                                        c || f(200, "success"));
                                }),
                            c.insertBefore(b, c.firstChild);
                    },
                    abort: function () {
                        b && b.onload(void 0, !0);
                    },
                };
            }
        });
    var jc = [],
        kc = /(=)\?(?=&|$)|\?\?/;
    n.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var a = jc.pop() || n.expando + "_" + Eb++;
            return (this[a] = !0), a;
        },
    }),
        n.ajaxPrefilter("json jsonp", function (b, c, d) {
            var e,
                f,
                g,
                h =
                    b.jsonp !== !1 &&
                    (kc.test(b.url)
                        ? "url"
                        : "string" == typeof b.data &&
                          0 ===
                              (b.contentType || "").indexOf(
                                  "application/x-www-form-urlencoded"
                              ) &&
                          kc.test(b.data) &&
                          "data");
            return h || "jsonp" === b.dataTypes[0]
                ? ((e = b.jsonpCallback =
                      n.isFunction(b.jsonpCallback)
                          ? b.jsonpCallback()
                          : b.jsonpCallback),
                  h
                      ? (b[h] = b[h].replace(kc, "$1" + e))
                      : b.jsonp !== !1 &&
                        (b.url +=
                            (Fb.test(b.url) ? "&" : "?") + b.jsonp + "=" + e),
                  (b.converters["script json"] = function () {
                      return g || n.error(e + " was not called"), g[0];
                  }),
                  (b.dataTypes[0] = "json"),
                  (f = a[e]),
                  (a[e] = function () {
                      g = arguments;
                  }),
                  d.always(function () {
                      void 0 === f ? n(a).removeProp(e) : (a[e] = f),
                          b[e] &&
                              ((b.jsonpCallback = c.jsonpCallback), jc.push(e)),
                          g && n.isFunction(f) && f(g[0]),
                          (g = f = void 0);
                  }),
                  "script")
                : void 0;
        }),
        (n.parseHTML = function (a, b, c) {
            if (!a || "string" != typeof a) return null;
            "boolean" == typeof b && ((c = b), (b = !1)), (b = b || d);
            var e = x.exec(a),
                f = !c && [];
            return e
                ? [b.createElement(e[1])]
                : ((e = ja([a], b, f)),
                  f && f.length && n(f).remove(),
                  n.merge([], e.childNodes));
        });
    var lc = n.fn.load;
    (n.fn.load = function (a, b, c) {
        if ("string" != typeof a && lc) return lc.apply(this, arguments);
        var d,
            e,
            f,
            g = this,
            h = a.indexOf(" ");
        return (
            h > -1 && ((d = n.trim(a.slice(h, a.length))), (a = a.slice(0, h))),
            n.isFunction(b)
                ? ((c = b), (b = void 0))
                : b && "object" == typeof b && (e = "POST"),
            g.length > 0 &&
                n
                    .ajax({
                        url: a,
                        type: e || "GET",
                        dataType: "html",
                        data: b,
                    })
                    .done(function (a) {
                        (f = arguments),
                            g.html(
                                d
                                    ? n("<div>").append(n.parseHTML(a)).find(d)
                                    : a
                            );
                    })
                    .always(
                        c &&
                            function (a, b) {
                                g.each(function () {
                                    c.apply(this, f || [a.responseText, b, a]);
                                });
                            }
                    ),
            this
        );
    }),
        n.each(
            [
                "ajaxStart",
                "ajaxStop",
                "ajaxComplete",
                "ajaxError",
                "ajaxSuccess",
                "ajaxSend",
            ],
            function (a, b) {
                n.fn[b] = function (a) {
                    return this.on(b, a);
                };
            }
        ),
        (n.expr.filters.animated = function (a) {
            return n.grep(n.timers, function (b) {
                return a === b.elem;
            }).length;
        });
    function mc(a) {
        return n.isWindow(a)
            ? a
            : 9 === a.nodeType
            ? a.defaultView || a.parentWindow
            : !1;
    }
    (n.offset = {
        setOffset: function (a, b, c) {
            var d,
                e,
                f,
                g,
                h,
                i,
                j,
                k = n.css(a, "position"),
                l = n(a),
                m = {};
            "static" === k && (a.style.position = "relative"),
                (h = l.offset()),
                (f = n.css(a, "top")),
                (i = n.css(a, "left")),
                (j =
                    ("absolute" === k || "fixed" === k) &&
                    n.inArray("auto", [f, i]) > -1),
                j
                    ? ((d = l.position()), (g = d.top), (e = d.left))
                    : ((g = parseFloat(f) || 0), (e = parseFloat(i) || 0)),
                n.isFunction(b) && (b = b.call(a, c, n.extend({}, h))),
                null != b.top && (m.top = b.top - h.top + g),
                null != b.left && (m.left = b.left - h.left + e),
                "using" in b ? b.using.call(a, m) : l.css(m);
        },
    }),
        n.fn.extend({
            offset: function (a) {
                if (arguments.length)
                    return void 0 === a
                        ? this
                        : this.each(function (b) {
                              n.offset.setOffset(this, a, b);
                          });
                var b,
                    c,
                    d = { top: 0, left: 0 },
                    e = this[0],
                    f = e && e.ownerDocument;
                if (f)
                    return (
                        (b = f.documentElement),
                        n.contains(b, e)
                            ? ("undefined" != typeof e.getBoundingClientRect &&
                                  (d = e.getBoundingClientRect()),
                              (c = mc(f)),
                              {
                                  top:
                                      d.top +
                                      (c.pageYOffset || b.scrollTop) -
                                      (b.clientTop || 0),
                                  left:
                                      d.left +
                                      (c.pageXOffset || b.scrollLeft) -
                                      (b.clientLeft || 0),
                              })
                            : d
                    );
            },
            position: function () {
                if (this[0]) {
                    var a,
                        b,
                        c = { top: 0, left: 0 },
                        d = this[0];
                    return (
                        "fixed" === n.css(d, "position")
                            ? (b = d.getBoundingClientRect())
                            : ((a = this.offsetParent()),
                              (b = this.offset()),
                              n.nodeName(a[0], "html") || (c = a.offset()),
                              (c.top += n.css(a[0], "borderTopWidth", !0)),
                              (c.left += n.css(a[0], "borderLeftWidth", !0))),
                        {
                            top: b.top - c.top - n.css(d, "marginTop", !0),
                            left: b.left - c.left - n.css(d, "marginLeft", !0),
                        }
                    );
                }
            },
            offsetParent: function () {
                return this.map(function () {
                    var a = this.offsetParent;
                    while (
                        a &&
                        !n.nodeName(a, "html") &&
                        "static" === n.css(a, "position")
                    )
                        a = a.offsetParent;
                    return a || Qa;
                });
            },
        }),
        n.each(
            { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" },
            function (a, b) {
                var c = /Y/.test(b);
                n.fn[a] = function (d) {
                    return Y(
                        this,
                        function (a, d, e) {
                            var f = mc(a);
                            return void 0 === e
                                ? f
                                    ? b in f
                                        ? f[b]
                                        : f.document.documentElement[d]
                                    : a[d]
                                : void (f
                                      ? f.scrollTo(
                                            c ? n(f).scrollLeft() : e,
                                            c ? e : n(f).scrollTop()
                                        )
                                      : (a[d] = e));
                        },
                        a,
                        d,
                        arguments.length,
                        null
                    );
                };
            }
        ),
        n.each(["top", "left"], function (a, b) {
            n.cssHooks[b] = Ua(l.pixelPosition, function (a, c) {
                return c
                    ? ((c = Sa(a, b)),
                      Oa.test(c) ? n(a).position()[b] + "px" : c)
                    : void 0;
            });
        }),
        n.each({ Height: "height", Width: "width" }, function (a, b) {
            n.each(
                {
                    padding: "inner" + a,
                    content: b,
                    "": "outer" + a,
                },
                function (c, d) {
                    n.fn[d] = function (d, e) {
                        var f =
                                arguments.length &&
                                (c || "boolean" != typeof d),
                            g =
                                c ||
                                (d === !0 || e === !0 ? "margin" : "border");
                        return Y(
                            this,
                            function (b, c, d) {
                                var e;
                                return n.isWindow(b)
                                    ? b.document.documentElement["client" + a]
                                    : 9 === b.nodeType
                                    ? ((e = b.documentElement),
                                      Math.max(
                                          b.body["scroll" + a],
                                          e["scroll" + a],
                                          b.body["offset" + a],
                                          e["offset" + a],
                                          e["client" + a]
                                      ))
                                    : void 0 === d
                                    ? n.css(b, c, g)
                                    : n.style(b, c, d, g);
                            },
                            b,
                            f ? d : void 0,
                            f,
                            null
                        );
                    };
                }
            );
        }),
        n.fn.extend({
            bind: function (a, b, c) {
                return this.on(a, null, b, c);
            },
            unbind: function (a, b) {
                return this.off(a, null, b);
            },
            delegate: function (a, b, c, d) {
                return this.on(b, a, c, d);
            },
            undelegate: function (a, b, c) {
                return 1 === arguments.length
                    ? this.off(a, "**")
                    : this.off(b, a || "**", c);
            },
        }),
        (n.fn.size = function () {
            return this.length;
        }),
        (n.fn.andSelf = n.fn.addBack),
        "function" == typeof define &&
            define.amd &&
            define("jquery", [], function () {
                return n;
            });
    var nc = a.jQuery,
        oc = a.$;
    return (
        (n.noConflict = function (b) {
            return (
                a.$ === n && (a.$ = oc),
                b && a.jQuery === n && (a.jQuery = nc),
                n
            );
        }),
        b || (a.jQuery = a.$ = n),
        n
    );
});

/*
 Copyright (C) Federico Zivolo 2018
 Distributed under the MIT License (license terms are at http://opensource.org/licenses/MIT).
 */ (function (e, t) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = t())
        : "function" == typeof define && define.amd
        ? define(t)
        : (e.Popper = t());
})
(this, function () {
    "use strict";
    function e(e) {
        return e && "[object Function]" === {}.toString.call(e);
    }
    function t(e, t) {
        if (1 !== e.nodeType) return [];
        var o = getComputedStyle(e, null);
        return t ? o[t] : o;
    }
    function o(e) {
        return "HTML" === e.nodeName ? e : e.parentNode || e.host;
    }
    function n(e) {
        if (!e) return document.body;
        switch (e.nodeName) {
            case "HTML":
            case "BODY":
                return e.ownerDocument.body;
            case "#document":
                return e.body;
        }
        var i = t(e),
            r = i.overflow,
            p = i.overflowX,
            s = i.overflowY;
        return /(auto|scroll|overlay)/.test(r + s + p) ? e : n(o(e));
    }
    function r(e) {
        return 11 === e ? re : 10 === e ? pe : re || pe;
    }
    function p(e) {
        if (!e) return document.documentElement;
        for (
            var o = r(10) ? document.body : null, n = e.offsetParent;
            n === o && e.nextElementSibling;

        )
            n = (e = e.nextElementSibling).offsetParent;
        var i = n && n.nodeName;
        return i && "BODY" !== i && "HTML" !== i
            ? -1 !== ["TD", "TABLE"].indexOf(n.nodeName) &&
              "static" === t(n, "position")
                ? p(n)
                : n
            : e
            ? e.ownerDocument.documentElement
            : document.documentElement;
    }
    function s(e) {
        var t = e.nodeName;
        return "BODY" !== t && ("HTML" === t || p(e.firstElementChild) === e);
    }
    function d(e) {
        return null === e.parentNode ? e : d(e.parentNode);
    }
    function a(e, t) {
        if (!e || !e.nodeType || !t || !t.nodeType)
            return document.documentElement;
        var o = e.compareDocumentPosition(t) & Node.DOCUMENT_POSITION_FOLLOWING,
            n = o ? e : t,
            i = o ? t : e,
            r = document.createRange();
        r.setStart(n, 0), r.setEnd(i, 0);
        var l = r.commonAncestorContainer;
        if ((e !== l && t !== l) || n.contains(i)) return s(l) ? l : p(l);
        var f = d(e);
        return f.host ? a(f.host, t) : a(e, d(t).host);
    }
    function l(e) {
        var t =
                1 < arguments.length && void 0 !== arguments[1]
                    ? arguments[1]
                    : "top",
            o = "top" === t ? "scrollTop" : "scrollLeft",
            n = e.nodeName;
        if ("BODY" === n || "HTML" === n) {
            var i = e.ownerDocument.documentElement,
                r = e.ownerDocument.scrollingElement || i;
            return r[o];
        }
        return e[o];
    }
    function f(e, t) {
        var o = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            n = l(t, "top"),
            i = l(t, "left"),
            r = o ? -1 : 1;
        return (
            (e.top += n * r),
            (e.bottom += n * r),
            (e.left += i * r),
            (e.right += i * r),
            e
        );
    }
    function m(e, t) {
        var o = "x" === t ? "Left" : "Top",
            n = "Left" == o ? "Right" : "Bottom";
        return (
            parseFloat(e["border" + o + "Width"], 10) +
            parseFloat(e["border" + n + "Width"], 10)
        );
    }
    function h(e, t, o, n) {
        return $(
            t["offset" + e],
            t["scroll" + e],
            o["client" + e],
            o["offset" + e],
            o["scroll" + e],
            r(10)
                ? o["offset" + e] +
                      n["margin" + ("Height" === e ? "Top" : "Left")] +
                      n["margin" + ("Height" === e ? "Bottom" : "Right")]
                : 0
        );
    }
    function c() {
        var e = document.body,
            t = document.documentElement,
            o = r(10) && getComputedStyle(t);
        return { height: h("Height", e, t, o), width: h("Width", e, t, o) };
    }
    function g(e) {
        return le({}, e, { right: e.left + e.width, bottom: e.top + e.height });
    }
    function u(e) {
        var o = {};
        try {
            if (r(10)) {
                o = e.getBoundingClientRect();
                var n = l(e, "top"),
                    i = l(e, "left");
                (o.top += n), (o.left += i), (o.bottom += n), (o.right += i);
            } else o = e.getBoundingClientRect();
        } catch (t) {}
        var p = {
                left: o.left,
                top: o.top,
                width: o.right - o.left,
                height: o.bottom - o.top,
            },
            s = "HTML" === e.nodeName ? c() : {},
            d = s.width || e.clientWidth || p.right - p.left,
            a = s.height || e.clientHeight || p.bottom - p.top,
            f = e.offsetWidth - d,
            h = e.offsetHeight - a;
        if (f || h) {
            var u = t(e);
            (f -= m(u, "x")), (h -= m(u, "y")), (p.width -= f), (p.height -= h);
        }
        return g(p);
    }
    function b(e, o) {
        var i = 2 < arguments.length && void 0 !== arguments[2] && arguments[2],
            p = r(10),
            s = "HTML" === o.nodeName,
            d = u(e),
            a = u(o),
            l = n(e),
            m = t(o),
            h = parseFloat(m.borderTopWidth, 10),
            c = parseFloat(m.borderLeftWidth, 10);
        i &&
            "HTML" === o.nodeName &&
            ((a.top = $(a.top, 0)), (a.left = $(a.left, 0)));
        var b = g({
            top: d.top - a.top - h,
            left: d.left - a.left - c,
            width: d.width,
            height: d.height,
        });
        if (((b.marginTop = 0), (b.marginLeft = 0), !p && s)) {
            var y = parseFloat(m.marginTop, 10),
                w = parseFloat(m.marginLeft, 10);
            (b.top -= h - y),
                (b.bottom -= h - y),
                (b.left -= c - w),
                (b.right -= c - w),
                (b.marginTop = y),
                (b.marginLeft = w);
        }
        return (
            (p && !i ? o.contains(l) : o === l && "BODY" !== l.nodeName) &&
                (b = f(b, o)),
            b
        );
    }
    function y(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = e.ownerDocument.documentElement,
            n = b(e, o),
            i = $(o.clientWidth, window.innerWidth || 0),
            r = $(o.clientHeight, window.innerHeight || 0),
            p = t ? 0 : l(o),
            s = t ? 0 : l(o, "left"),
            d = {
                top: p - n.top + n.marginTop,
                left: s - n.left + n.marginLeft,
                width: i,
                height: r,
            };
        return g(d);
    }
    function w(e) {
        var n = e.nodeName;
        return "BODY" === n || "HTML" === n
            ? !1
            : "fixed" === t(e, "position") || w(o(e));
    }
    function E(e) {
        if (!e || !e.parentElement || r()) return document.documentElement;
        for (var o = e.parentElement; o && "none" === t(o, "transform"); )
            o = o.parentElement;
        return o || document.documentElement;
    }
    function v(e, t, i, r) {
        var p = 4 < arguments.length && void 0 !== arguments[4] && arguments[4],
            s = { top: 0, left: 0 },
            d = p ? E(e) : a(e, t);
        if ("viewport" === r) s = y(d, p);
        else {
            var l;
            "scrollParent" === r
                ? ((l = n(o(t))),
                  "BODY" === l.nodeName &&
                      (l = e.ownerDocument.documentElement))
                : "window" === r
                ? (l = e.ownerDocument.documentElement)
                : (l = r);
            var f = b(l, d, p);
            if ("HTML" === l.nodeName && !w(d)) {
                var m = c(),
                    h = m.height,
                    g = m.width;
                (s.top += f.top - f.marginTop),
                    (s.bottom = h + f.top),
                    (s.left += f.left - f.marginLeft),
                    (s.right = g + f.left);
            } else s = f;
        }
        return (s.left += i), (s.top += i), (s.right -= i), (s.bottom -= i), s;
    }
    function x(e) {
        var t = e.width,
            o = e.height;
        return t * o;
    }
    function O(e, t, o, n, i) {
        var r =
            5 < arguments.length && void 0 !== arguments[5] ? arguments[5] : 0;
        if (-1 === e.indexOf("auto")) return e;
        var p = v(o, n, r, i),
            s = {
                top: { width: p.width, height: t.top - p.top },
                right: { width: p.right - t.right, height: p.height },
                bottom: { width: p.width, height: p.bottom - t.bottom },
                left: { width: t.left - p.left, height: p.height },
            },
            d = Object.keys(s)
                .map(function (e) {
                    return le({ key: e }, s[e], { area: x(s[e]) });
                })
                .sort(function (e, t) {
                    return t.area - e.area;
                }),
            a = d.filter(function (e) {
                var t = e.width,
                    n = e.height;
                return t >= o.clientWidth && n >= o.clientHeight;
            }),
            l = 0 < a.length ? a[0].key : d[0].key,
            f = e.split("-")[1];
        return l + (f ? "-" + f : "");
    }
    function L(e, t, o) {
        var n =
                3 < arguments.length && void 0 !== arguments[3]
                    ? arguments[3]
                    : null,
            i = n ? E(t) : a(t, o);
        return b(o, i, n);
    }
    function S(e) {
        var t = getComputedStyle(e),
            o = parseFloat(t.marginTop) + parseFloat(t.marginBottom),
            n = parseFloat(t.marginLeft) + parseFloat(t.marginRight),
            i = { width: e.offsetWidth + n, height: e.offsetHeight + o };
        return i;
    }
    function T(e) {
        var t = { left: "right", right: "left", bottom: "top", top: "bottom" };
        return e.replace(/left|right|bottom|top/g, function (e) {
            return t[e];
        });
    }
    function C(e, t, o) {
        o = o.split("-")[0];
        var n = S(e),
            i = { width: n.width, height: n.height },
            r = -1 !== ["right", "left"].indexOf(o),
            p = r ? "top" : "left",
            s = r ? "left" : "top",
            d = r ? "height" : "width",
            a = r ? "width" : "height";
        return (
            (i[p] = t[p] + t[d] / 2 - n[d] / 2),
            (i[s] = o === s ? t[s] - n[a] : t[T(s)]),
            i
        );
    }
    function D(e, t) {
        return Array.prototype.find ? e.find(t) : e.filter(t)[0];
    }
    function N(e, t, o) {
        if (Array.prototype.findIndex)
            return e.findIndex(function (e) {
                return e[t] === o;
            });
        var n = D(e, function (e) {
            return e[t] === o;
        });
        return e.indexOf(n);
    }
    function P(t, o, n) {
        var i = void 0 === n ? t : t.slice(0, N(t, "name", n));
        return (
            i.forEach(function (t) {
                t["function"] &&
                    console.warn(
                        "`modifier.function` is deprecated, use `modifier.fn`!"
                    );
                var n = t["function"] || t.fn;
                t.enabled &&
                    e(n) &&
                    ((o.offsets.popper = g(o.offsets.popper)),
                    (o.offsets.reference = g(o.offsets.reference)),
                    (o = n(o, t)));
            }),
            o
        );
    }
    function k() {
        if (!this.state.isDestroyed) {
            var e = {
                instance: this,
                styles: {},
                arrowStyles: {},
                attributes: {},
                flipped: !1,
                offsets: {},
            };
            (e.offsets.reference = L(
                this.state,
                this.popper,
                this.reference,
                this.options.positionFixed
            )),
                (e.placement = O(
                    this.options.placement,
                    e.offsets.reference,
                    this.popper,
                    this.reference,
                    this.options.modifiers.flip.boundariesElement,
                    this.options.modifiers.flip.padding
                )),
                (e.originalPlacement = e.placement),
                (e.positionFixed = this.options.positionFixed),
                (e.offsets.popper = C(
                    this.popper,
                    e.offsets.reference,
                    e.placement
                )),
                (e.offsets.popper.position = this.options.positionFixed
                    ? "fixed"
                    : "absolute"),
                (e = P(this.modifiers, e)),
                this.state.isCreated
                    ? this.options.onUpdate(e)
                    : ((this.state.isCreated = !0), this.options.onCreate(e));
        }
    }
    function W(e, t) {
        return e.some(function (e) {
            var o = e.name,
                n = e.enabled;
            return n && o === t;
        });
    }
    function B(e) {
        for (
            var t = [!1, "ms", "Webkit", "Moz", "O"],
                o = e.charAt(0).toUpperCase() + e.slice(1),
                n = 0;
            n < t.length;
            n++
        ) {
            var i = t[n],
                r = i ? "" + i + o : e;
            if ("undefined" != typeof document.body.style[r]) return r;
        }
        return null;
    }
    function H() {
        return (
            (this.state.isDestroyed = !0),
            W(this.modifiers, "applyStyle") &&
                (this.popper.removeAttribute("x-placement"),
                (this.popper.style.position = ""),
                (this.popper.style.top = ""),
                (this.popper.style.left = ""),
                (this.popper.style.right = ""),
                (this.popper.style.bottom = ""),
                (this.popper.style.willChange = ""),
                (this.popper.style[B("transform")] = "")),
            this.disableEventListeners(),
            this.options.removeOnDestroy &&
                this.popper.parentNode.removeChild(this.popper),
            this
        );
    }
    function A(e) {
        var t = e.ownerDocument;
        return t ? t.defaultView : window;
    }
    function M(e, t, o, i) {
        var r = "BODY" === e.nodeName,
            p = r ? e.ownerDocument.defaultView : e;
        p.addEventListener(t, o, { passive: !0 }),
            r || M(n(p.parentNode), t, o, i),
            i.push(p);
    }
    function I(e, t, o, i) {
        (o.updateBound = i),
            A(e).addEventListener("resize", o.updateBound, { passive: !0 });
        var r = n(e);
        return (
            M(r, "scroll", o.updateBound, o.scrollParents),
            (o.scrollElement = r),
            (o.eventsEnabled = !0),
            o
        );
    }
    function F() {
        this.state.eventsEnabled ||
            (this.state = I(
                this.reference,
                this.options,
                this.state,
                this.scheduleUpdate
            ));
    }
    function R(e, t) {
        return (
            A(e).removeEventListener("resize", t.updateBound),
            t.scrollParents.forEach(function (e) {
                e.removeEventListener("scroll", t.updateBound);
            }),
            (t.updateBound = null),
            (t.scrollParents = []),
            (t.scrollElement = null),
            (t.eventsEnabled = !1),
            t
        );
    }
    function U() {
        this.state.eventsEnabled &&
            (cancelAnimationFrame(this.scheduleUpdate),
            (this.state = R(this.reference, this.state)));
    }
    function Y(e) {
        return "" !== e && !isNaN(parseFloat(e)) && isFinite(e);
    }
    function j(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = "";
            -1 !==
                ["width", "height", "top", "right", "bottom", "left"].indexOf(
                    o
                ) &&
                Y(t[o]) &&
                (n = "px"),
                (e.style[o] = t[o] + n);
        });
    }
    function K(e, t) {
        Object.keys(t).forEach(function (o) {
            var n = t[o];
            !1 === n ? e.removeAttribute(o) : e.setAttribute(o, t[o]);
        });
    }
    function q(e, t, o) {
        var n = D(e, function (e) {
                var o = e.name;
                return o === t;
            }),
            i =
                !!n &&
                e.some(function (e) {
                    return e.name === o && e.enabled && e.order < n.order;
                });
        if (!i) {
            var r = "`" + t + "`";
            console.warn(
                "`" +
                    o +
                    "`" +
                    " modifier is required by " +
                    r +
                    " modifier in order to work, be sure to include it before " +
                    r +
                    "!"
            );
        }
        return i;
    }
    function G(e) {
        return "end" === e ? "start" : "start" === e ? "end" : e;
    }
    function z(e) {
        var t = 1 < arguments.length && void 0 !== arguments[1] && arguments[1],
            o = me.indexOf(e),
            n = me.slice(o + 1).concat(me.slice(0, o));
        return t ? n.reverse() : n;
    }
    function V(e, t, o, n) {
        var i = e.match(/((?:\-|\+)?\d*\.?\d*)(.*)/),
            r = +i[1],
            p = i[2];
        if (!r) return e;
        if (0 === p.indexOf("%")) {
            var s;
            switch (p) {
                case "%p":
                    s = o;
                    break;
                case "%":
                case "%r":
                default:
                    s = n;
            }
            var d = g(s);
            return (d[t] / 100) * r;
        }
        if ("vh" === p || "vw" === p) {
            var a;
            return (
                (a =
                    "vh" === p
                        ? $(
                              document.documentElement.clientHeight,
                              window.innerHeight || 0
                          )
                        : $(
                              document.documentElement.clientWidth,
                              window.innerWidth || 0
                          )),
                (a / 100) * r
            );
        }
        return r;
    }
    function _(e, t, o, n) {
        var i = [0, 0],
            r = -1 !== ["right", "left"].indexOf(n),
            p = e.split(/(\+|\-)/).map(function (e) {
                return e.trim();
            }),
            s = p.indexOf(
                D(p, function (e) {
                    return -1 !== e.search(/,|\s/);
                })
            );
        p[s] &&
            -1 === p[s].indexOf(",") &&
            console.warn(
                "Offsets separated by white space(s) are deprecated, use a comma (,) instead."
            );
        var d = /\s*,\s*|\s+/,
            a =
                -1 === s
                    ? [p]
                    : [
                          p.slice(0, s).concat([p[s].split(d)[0]]),
                          [p[s].split(d)[1]].concat(p.slice(s + 1)),
                      ];
        return (
            (a = a.map(function (e, n) {
                var i = (1 === n ? !r : r) ? "height" : "width",
                    p = !1;
                return e
                    .reduce(function (e, t) {
                        return "" === e[e.length - 1] &&
                            -1 !== ["+", "-"].indexOf(t)
                            ? ((e[e.length - 1] = t), (p = !0), e)
                            : p
                            ? ((e[e.length - 1] += t), (p = !1), e)
                            : e.concat(t);
                    }, [])
                    .map(function (e) {
                        return V(e, i, t, o);
                    });
            })),
            a.forEach(function (e, t) {
                e.forEach(function (o, n) {
                    Y(o) && (i[t] += o * ("-" === e[n - 1] ? -1 : 1));
                });
            }),
            i
        );
    }
    function X(e, t) {
        var o,
            n = t.offset,
            i = e.placement,
            r = e.offsets,
            p = r.popper,
            s = r.reference,
            d = i.split("-")[0];
        return (
            (o = Y(+n) ? [+n, 0] : _(n, p, s, d)),
            "left" === d
                ? ((p.top += o[0]), (p.left -= o[1]))
                : "right" === d
                ? ((p.top += o[0]), (p.left += o[1]))
                : "top" === d
                ? ((p.left += o[0]), (p.top -= o[1]))
                : "bottom" === d && ((p.left += o[0]), (p.top += o[1])),
            (e.popper = p),
            e
        );
    }
    for (
        var J = Math.min,
            Q = Math.round,
            Z = Math.floor,
            $ = Math.max,
            ee = "undefined" != typeof window && "undefined" != typeof document,
            te = ["Edge", "Trident", "Firefox"],
            oe = 0,
            ne = 0;
        ne < te.length;
        ne += 1
    )
        if (ee && 0 <= navigator.userAgent.indexOf(te[ne])) {
            oe = 1;
            break;
        }
    var i = ee && window.Promise,
        ie = i
            ? function (e) {
                  var t = !1;
                  return function () {
                      t ||
                          ((t = !0),
                          window.Promise.resolve().then(function () {
                              (t = !1), e();
                          }));
                  };
              }
            : function (e) {
                  var t = !1;
                  return function () {
                      t ||
                          ((t = !0),
                          setTimeout(function () {
                              (t = !1), e();
                          }, oe));
                  };
              },
        re = ee && !!(window.MSInputMethodContext && document.documentMode),
        pe = ee && /MSIE 10/.test(navigator.userAgent),
        se = function (e, t) {
            if (!(e instanceof t))
                throw new TypeError("Cannot call a class as a function");
        },
        de = (function () {
            function e(e, t) {
                for (var o, n = 0; n < t.length; n++)
                    (o = t[n]),
                        (o.enumerable = o.enumerable || !1),
                        (o.configurable = !0),
                        "value" in o && (o.writable = !0),
                        Object.defineProperty(e, o.key, o);
            }
            return function (t, o, n) {
                return o && e(t.prototype, o), n && e(t, n), t;
            };
        })(),
        ae = function (e, t, o) {
            return (
                t in e
                    ? Object.defineProperty(e, t, {
                          value: o,
                          enumerable: !0,
                          configurable: !0,
                          writable: !0,
                      })
                    : (e[t] = o),
                e
            );
        },
        le =
            Object.assign ||
            function (e) {
                for (var t, o = 1; o < arguments.length; o++)
                    for (var n in ((t = arguments[o]), t))
                        Object.prototype.hasOwnProperty.call(t, n) &&
                            (e[n] = t[n]);
                return e;
            },
        fe = [
            "auto-start",
            "auto",
            "auto-end",
            "top-start",
            "top",
            "top-end",
            "right-start",
            "right",
            "right-end",
            "bottom-end",
            "bottom",
            "bottom-start",
            "left-end",
            "left",
            "left-start",
        ],
        me = fe.slice(3),
        he = {
            FLIP: "flip",
            CLOCKWISE: "clockwise",
            COUNTERCLOCKWISE: "counterclockwise",
        },
        ce = (function () {
            function t(o, n) {
                var i = this,
                    r =
                        2 < arguments.length && void 0 !== arguments[2]
                            ? arguments[2]
                            : {};
                se(this, t),
                    (this.scheduleUpdate = function () {
                        return requestAnimationFrame(i.update);
                    }),
                    (this.update = ie(this.update.bind(this))),
                    (this.options = le({}, t.Defaults, r)),
                    (this.state = {
                        isDestroyed: !1,
                        isCreated: !1,
                        scrollParents: [],
                    }),
                    (this.reference = o && o.jquery ? o[0] : o),
                    (this.popper = n && n.jquery ? n[0] : n),
                    (this.options.modifiers = {}),
                    Object.keys(
                        le({}, t.Defaults.modifiers, r.modifiers)
                    ).forEach(function (e) {
                        i.options.modifiers[e] = le(
                            {},
                            t.Defaults.modifiers[e] || {},
                            r.modifiers ? r.modifiers[e] : {}
                        );
                    }),
                    (this.modifiers = Object.keys(this.options.modifiers)
                        .map(function (e) {
                            return le({ name: e }, i.options.modifiers[e]);
                        })
                        .sort(function (e, t) {
                            return e.order - t.order;
                        })),
                    this.modifiers.forEach(function (t) {
                        t.enabled &&
                            e(t.onLoad) &&
                            t.onLoad(
                                i.reference,
                                i.popper,
                                i.options,
                                t,
                                i.state
                            );
                    }),
                    this.update();
                var p = this.options.eventsEnabled;
                p && this.enableEventListeners(),
                    (this.state.eventsEnabled = p);
            }
            return (
                de(t, [
                    {
                        key: "update",
                        value: function () {
                            return k.call(this);
                        },
                    },
                    {
                        key: "destroy",
                        value: function () {
                            return H.call(this);
                        },
                    },
                    {
                        key: "enableEventListeners",
                        value: function () {
                            return F.call(this);
                        },
                    },
                    {
                        key: "disableEventListeners",
                        value: function () {
                            return U.call(this);
                        },
                    },
                ]),
                t
            );
        })();
    return (
        (ce.Utils = (
            "undefined" == typeof window ? global : window
        ).PopperUtils),
        (ce.placements = fe),
        (ce.Defaults = {
            placement: "bottom",
            positionFixed: !1,
            eventsEnabled: !0,
            removeOnDestroy: !1,
            onCreate: function () {},
            onUpdate: function () {},
            modifiers: {
                shift: {
                    order: 100,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.placement,
                            o = t.split("-")[0],
                            n = t.split("-")[1];
                        if (n) {
                            var i = e.offsets,
                                r = i.reference,
                                p = i.popper,
                                s = -1 !== ["bottom", "top"].indexOf(o),
                                d = s ? "left" : "top",
                                a = s ? "width" : "height",
                                l = {
                                    start: ae({}, d, r[d]),
                                    end: ae({}, d, r[d] + r[a] - p[a]),
                                };
                            e.offsets.popper = le({}, p, l[n]);
                        }
                        return e;
                    },
                },
                offset: { order: 200, enabled: !0, fn: X, offset: 0 },
                preventOverflow: {
                    order: 300,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.boundariesElement || p(e.instance.popper);
                        e.instance.reference === o && (o = p(o));
                        var n = B("transform"),
                            i = e.instance.popper.style,
                            r = i.top,
                            s = i.left,
                            d = i[n];
                        (i.top = ""), (i.left = ""), (i[n] = "");
                        var a = v(
                            e.instance.popper,
                            e.instance.reference,
                            t.padding,
                            o,
                            e.positionFixed
                        );
                        (i.top = r),
                            (i.left = s),
                            (i[n] = d),
                            (t.boundaries = a);
                        var l = t.priority,
                            f = e.offsets.popper,
                            m = {
                                primary: function (e) {
                                    var o = f[e];
                                    return (
                                        f[e] < a[e] &&
                                            !t.escapeWithReference &&
                                            (o = $(f[e], a[e])),
                                        ae({}, e, o)
                                    );
                                },
                                secondary: function (e) {
                                    var o = "right" === e ? "left" : "top",
                                        n = f[o];
                                    return (
                                        f[e] > a[e] &&
                                            !t.escapeWithReference &&
                                            (n = J(
                                                f[o],
                                                a[e] -
                                                    ("right" === e
                                                        ? f.width
                                                        : f.height)
                                            )),
                                        ae({}, o, n)
                                    );
                                },
                            };
                        return (
                            l.forEach(function (e) {
                                var t =
                                    -1 === ["left", "top"].indexOf(e)
                                        ? "secondary"
                                        : "primary";
                                f = le({}, f, m[t](e));
                            }),
                            (e.offsets.popper = f),
                            e
                        );
                    },
                    priority: ["left", "right", "top", "bottom"],
                    padding: 5,
                    boundariesElement: "scrollParent",
                },
                keepTogether: {
                    order: 400,
                    enabled: !0,
                    fn: function (e) {
                        var t = e.offsets,
                            o = t.popper,
                            n = t.reference,
                            i = e.placement.split("-")[0],
                            r = Z,
                            p = -1 !== ["top", "bottom"].indexOf(i),
                            s = p ? "right" : "bottom",
                            d = p ? "left" : "top",
                            a = p ? "width" : "height";
                        return (
                            o[s] < r(n[d]) &&
                                (e.offsets.popper[d] = r(n[d]) - o[a]),
                            o[d] > r(n[s]) && (e.offsets.popper[d] = r(n[s])),
                            e
                        );
                    },
                },
                arrow: {
                    order: 500,
                    enabled: !0,
                    fn: function (e, o) {
                        var n;
                        if (!q(e.instance.modifiers, "arrow", "keepTogether"))
                            return e;
                        var i = o.element;
                        if ("string" == typeof i) {
                            if (((i = e.instance.popper.querySelector(i)), !i))
                                return e;
                        } else if (!e.instance.popper.contains(i))
                            return (
                                console.warn(
                                    "WARNING: `arrow.element` must be child of its popper element!"
                                ),
                                e
                            );
                        var r = e.placement.split("-")[0],
                            p = e.offsets,
                            s = p.popper,
                            d = p.reference,
                            a = -1 !== ["left", "right"].indexOf(r),
                            l = a ? "height" : "width",
                            f = a ? "Top" : "Left",
                            m = f.toLowerCase(),
                            h = a ? "left" : "top",
                            c = a ? "bottom" : "right",
                            u = S(i)[l];
                        d[c] - u < s[m] &&
                            (e.offsets.popper[m] -= s[m] - (d[c] - u)),
                            d[m] + u > s[c] &&
                                (e.offsets.popper[m] += d[m] + u - s[c]),
                            (e.offsets.popper = g(e.offsets.popper));
                        var b = d[m] + d[l] / 2 - u / 2,
                            y = t(e.instance.popper),
                            w = parseFloat(y["margin" + f], 10),
                            E = parseFloat(y["border" + f + "Width"], 10),
                            v = b - e.offsets.popper[m] - w - E;
                        return (
                            (v = $(J(s[l] - u, v), 0)),
                            (e.arrowElement = i),
                            (e.offsets.arrow =
                                ((n = {}), ae(n, m, Q(v)), ae(n, h, ""), n)),
                            e
                        );
                    },
                    element: "[x-arrow]",
                },
                flip: {
                    order: 600,
                    enabled: !0,
                    fn: function (e, t) {
                        if (W(e.instance.modifiers, "inner")) return e;
                        if (e.flipped && e.placement === e.originalPlacement)
                            return e;
                        var o = v(
                                e.instance.popper,
                                e.instance.reference,
                                t.padding,
                                t.boundariesElement,
                                e.positionFixed
                            ),
                            n = e.placement.split("-")[0],
                            i = T(n),
                            r = e.placement.split("-")[1] || "",
                            p = [];
                        switch (t.behavior) {
                            case he.FLIP:
                                p = [n, i];
                                break;
                            case he.CLOCKWISE:
                                p = z(n);
                                break;
                            case he.COUNTERCLOCKWISE:
                                p = z(n, !0);
                                break;
                            default:
                                p = t.behavior;
                        }
                        return (
                            p.forEach(function (s, d) {
                                if (n !== s || p.length === d + 1) return e;
                                (n = e.placement.split("-")[0]), (i = T(n));
                                var a = e.offsets.popper,
                                    l = e.offsets.reference,
                                    f = Z,
                                    m =
                                        ("left" === n &&
                                            f(a.right) > f(l.left)) ||
                                        ("right" === n &&
                                            f(a.left) < f(l.right)) ||
                                        ("top" === n &&
                                            f(a.bottom) > f(l.top)) ||
                                        ("bottom" === n &&
                                            f(a.top) < f(l.bottom)),
                                    h = f(a.left) < f(o.left),
                                    c = f(a.right) > f(o.right),
                                    g = f(a.top) < f(o.top),
                                    u = f(a.bottom) > f(o.bottom),
                                    b =
                                        ("left" === n && h) ||
                                        ("right" === n && c) ||
                                        ("top" === n && g) ||
                                        ("bottom" === n && u),
                                    y = -1 !== ["top", "bottom"].indexOf(n),
                                    w =
                                        !!t.flipVariations &&
                                        ((y && "start" === r && h) ||
                                            (y && "end" === r && c) ||
                                            (!y && "start" === r && g) ||
                                            (!y && "end" === r && u));
                                (m || b || w) &&
                                    ((e.flipped = !0),
                                    (m || b) && (n = p[d + 1]),
                                    w && (r = G(r)),
                                    (e.placement = n + (r ? "-" + r : "")),
                                    (e.offsets.popper = le(
                                        {},
                                        e.offsets.popper,
                                        C(
                                            e.instance.popper,
                                            e.offsets.reference,
                                            e.placement
                                        )
                                    )),
                                    (e = P(e.instance.modifiers, e, "flip")));
                            }),
                            e
                        );
                    },
                    behavior: "flip",
                    padding: 5,
                    boundariesElement: "viewport",
                },
                inner: {
                    order: 700,
                    enabled: !1,
                    fn: function (e) {
                        var t = e.placement,
                            o = t.split("-")[0],
                            n = e.offsets,
                            i = n.popper,
                            r = n.reference,
                            p = -1 !== ["left", "right"].indexOf(o),
                            s = -1 === ["top", "left"].indexOf(o);
                        return (
                            (i[p ? "left" : "top"] =
                                r[o] - (s ? i[p ? "width" : "height"] : 0)),
                            (e.placement = T(t)),
                            (e.offsets.popper = g(i)),
                            e
                        );
                    },
                },
                hide: {
                    order: 800,
                    enabled: !0,
                    fn: function (e) {
                        if (!q(e.instance.modifiers, "hide", "preventOverflow"))
                            return e;
                        var t = e.offsets.reference,
                            o = D(e.instance.modifiers, function (e) {
                                return "preventOverflow" === e.name;
                            }).boundaries;
                        if (
                            t.bottom < o.top ||
                            t.left > o.right ||
                            t.top > o.bottom ||
                            t.right < o.left
                        ) {
                            if (!0 === e.hide) return e;
                            (e.hide = !0),
                                (e.attributes["x-out-of-boundaries"] = "");
                        } else {
                            if (!1 === e.hide) return e;
                            (e.hide = !1),
                                (e.attributes["x-out-of-boundaries"] = !1);
                        }
                        return e;
                    },
                },
                computeStyle: {
                    order: 850,
                    enabled: !0,
                    fn: function (e, t) {
                        var o = t.x,
                            n = t.y,
                            i = e.offsets.popper,
                            r = D(e.instance.modifiers, function (e) {
                                return "applyStyle" === e.name;
                            }).gpuAcceleration;
                        void 0 !== r &&
                            console.warn(
                                "WARNING: `gpuAcceleration` option moved to `computeStyle` modifier and will not be supported in future versions of Popper.js!"
                            );
                        var s,
                            d,
                            a = void 0 === r ? t.gpuAcceleration : r,
                            l = p(e.instance.popper),
                            f = u(l),
                            m = { position: i.position },
                            h = {
                                left: Z(i.left),
                                top: Q(i.top),
                                bottom: Q(i.bottom),
                                right: Z(i.right),
                            },
                            c = "bottom" === o ? "top" : "bottom",
                            g = "right" === n ? "left" : "right",
                            b = B("transform");
                        if (
                            ((d = "bottom" == c ? -f.height + h.bottom : h.top),
                            (s = "right" == g ? -f.width + h.right : h.left),
                            a && b)
                        )
                            (m[b] = "translate3d(" + s + "px, " + d + "px, 0)"),
                                (m[c] = 0),
                                (m[g] = 0),
                                (m.willChange = "transform");
                        else {
                            var y = "bottom" == c ? -1 : 1,
                                w = "right" == g ? -1 : 1;
                            (m[c] = d * y),
                                (m[g] = s * w),
                                (m.willChange = c + ", " + g);
                        }
                        var E = { "x-placement": e.placement };
                        return (
                            (e.attributes = le({}, E, e.attributes)),
                            (e.styles = le({}, m, e.styles)),
                            (e.arrowStyles = le(
                                {},
                                e.offsets.arrow,
                                e.arrowStyles
                            )),
                            e
                        );
                    },
                    gpuAcceleration: !0,
                    x: "bottom",
                    y: "right",
                },
                applyStyle: {
                    order: 900,
                    enabled: !0,
                    fn: function (e) {
                        return (
                            j(e.instance.popper, e.styles),
                            K(e.instance.popper, e.attributes),
                            e.arrowElement &&
                                Object.keys(e.arrowStyles).length &&
                                j(e.arrowElement, e.arrowStyles),
                            e
                        );
                    },
                    onLoad: function (e, t, o, n, i) {
                        var r = L(i, t, e, o.positionFixed),
                            p = O(
                                o.placement,
                                r,
                                t,
                                e,
                                o.modifiers.flip.boundariesElement,
                                o.modifiers.flip.padding
                            );
                        return (
                            t.setAttribute("x-placement", p),
                            j(t, {
                                position: o.positionFixed
                                    ? "fixed"
                                    : "absolute",
                            }),
                            o
                        );
                    },
                    gpuAcceleration: void 0,
                },
            },
        }),
        ce
    );
});
//# sourceMappingURL=popper.min.js.map

/*!
 * Bootstrap v5.0.0-beta2 (https://getbootstrap.com/)
 * Copyright 2011-2021 The Bootstrap Authors (https://github.com/twbs/bootstrap/graphs/contributors)
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/main/LICENSE)
 */
!(function (t, e) {
    "object" == typeof exports && "undefined" != typeof module
        ? (module.exports = e())
        : "function" == typeof define && define.amd
        ? define(e)
        : ((t =
              "undefined" != typeof globalThis
                  ? globalThis
                  : t || self).bootstrap = e());
})(this, function () {
    "use strict";
    function t(t, e) {
        for (var n = 0; n < e.length; n++) {
            var i = e[n];
            (i.enumerable = i.enumerable || !1),
                (i.configurable = !0),
                "value" in i && (i.writable = !0),
                Object.defineProperty(t, i.key, i);
        }
    }
    function e(e, n, i) {
        return n && t(e.prototype, n), i && t(e, i), e;
    }
    function n() {
        return (n =
            Object.assign ||
            function (t) {
                for (var e = 1; e < arguments.length; e++) {
                    var n = arguments[e];
                    for (var i in n)
                        Object.prototype.hasOwnProperty.call(n, i) &&
                            (t[i] = n[i]);
                }
                return t;
            }).apply(this, arguments);
    }
    function i(t, e) {
        var n, i;
        (t.prototype = Object.create(e.prototype)),
            (t.prototype.constructor = t),
            (n = t),
            (i = e),
            (
                Object.setPrototypeOf ||
                function (t, e) {
                    return (t.__proto__ = e), t;
                }
            )(n, i);
    }
    var o,
        r,
        s = function (t) {
            do {
                t += Math.floor(1e6 * Math.random());
            } while (document.getElementById(t));
            return t;
        },
        a = function (t) {
            var e = t.getAttribute("data-bs-target");
            if (!e || "#" === e) {
                var n = t.getAttribute("href");
                if (!n || (!n.includes("#") && !n.startsWith("."))) return null;
                n.includes("#") &&
                    !n.startsWith("#") &&
                    (n = "#" + n.split("#")[1]),
                    (e = n && "#" !== n ? n.trim() : null);
            }
            return e;
        },
        l = function (t) {
            var e = a(t);
            return e && document.querySelector(e) ? e : null;
        },
        c = function (t) {
            var e = a(t);
            return e ? document.querySelector(e) : null;
        },
        u = function (t) {
            if (!t) return 0;
            var e = window.getComputedStyle(t),
                n = e.transitionDuration,
                i = e.transitionDelay,
                o = Number.parseFloat(n),
                r = Number.parseFloat(i);
            return o || r
                ? ((n = n.split(",")[0]),
                  (i = i.split(",")[0]),
                  1e3 * (Number.parseFloat(n) + Number.parseFloat(i)))
                : 0;
        },
        f = function (t) {
            t.dispatchEvent(new Event("transitionend"));
        },
        d = function (t) {
            return (t[0] || t).nodeType;
        },
        h = function (t, e) {
            var n = !1,
                i = e + 5;
            t.addEventListener("transitionend", function e() {
                (n = !0), t.removeEventListener("transitionend", e);
            }),
                setTimeout(function () {
                    n || f(t);
                }, i);
        },
        p = function (t, e, n) {
            Object.keys(n).forEach(function (i) {
                var o,
                    r = n[i],
                    s = e[i],
                    a =
                        s && d(s)
                            ? "element"
                            : null == (o = s)
                            ? "" + o
                            : {}.toString
                                  .call(o)
                                  .match(/\s([a-z]+)/i)[1]
                                  .toLowerCase();
                if (!new RegExp(r).test(a))
                    throw new TypeError(
                        t.toUpperCase() +
                            ': Option "' +
                            i +
                            '" provided type "' +
                            a +
                            '" but expected type "' +
                            r +
                            '".'
                    );
            });
        },
        g = function (t) {
            if (!t) return !1;
            if (t.style && t.parentNode && t.parentNode.style) {
                var e = getComputedStyle(t),
                    n = getComputedStyle(t.parentNode);
                return (
                    "none" !== e.display &&
                    "none" !== n.display &&
                    "hidden" !== e.visibility
                );
            }
            return !1;
        },
        m = function () {
            return function () {};
        },
        v = function (t) {
            return t.offsetHeight;
        },
        _ = function () {
            var t = window.jQuery;
            return t && !document.body.hasAttribute("data-bs-no-jquery")
                ? t
                : null;
        },
        b = "rtl" === document.documentElement.dir,
        y = function (t, e) {
            var n;
            (n = function () {
                var n = _();
                if (n) {
                    var i = n.fn[t];
                    (n.fn[t] = e.jQueryInterface),
                        (n.fn[t].Constructor = e),
                        (n.fn[t].noConflict = function () {
                            return (n.fn[t] = i), e.jQueryInterface;
                        });
                }
            }),
                "loading" === document.readyState
                    ? document.addEventListener("DOMContentLoaded", n)
                    : n();
        },
        w =
            ((o = {}),
            (r = 1),
            {
                set: function (t, e, n) {
                    void 0 === t.bsKey && ((t.bsKey = { key: e, id: r }), r++),
                        (o[t.bsKey.id] = n);
                },
                get: function (t, e) {
                    if (!t || void 0 === t.bsKey) return null;
                    var n = t.bsKey;
                    return n.key === e ? o[n.id] : null;
                },
                delete: function (t, e) {
                    if (void 0 !== t.bsKey) {
                        var n = t.bsKey;
                        n.key === e && (delete o[n.id], delete t.bsKey);
                    }
                },
            }),
        E = function (t, e, n) {
            w.set(t, e, n);
        },
        T = function (t, e) {
            return w.get(t, e);
        },
        k = /[^.]*(?=\..*)\.|.*/,
        A = /\..*/,
        L = /::\d+$/,
        O = {},
        D = 1,
        x = { mouseenter: "mouseover", mouseleave: "mouseout" },
        C = new Set([
            "click",
            "dblclick",
            "mouseup",
            "mousedown",
            "contextmenu",
            "mousewheel",
            "DOMMouseScroll",
            "mouseover",
            "mouseout",
            "mousemove",
            "selectstart",
            "selectend",
            "keydown",
            "keypress",
            "keyup",
            "orientationchange",
            "touchstart",
            "touchmove",
            "touchend",
            "touchcancel",
            "pointerdown",
            "pointermove",
            "pointerup",
            "pointerleave",
            "pointercancel",
            "gesturestart",
            "gesturechange",
            "gestureend",
            "focus",
            "blur",
            "change",
            "reset",
            "select",
            "submit",
            "focusin",
            "focusout",
            "load",
            "unload",
            "beforeunload",
            "resize",
            "move",
            "DOMContentLoaded",
            "readystatechange",
            "error",
            "abort",
            "scroll",
        ]);
    function S(t, e) {
        return (e && e + "::" + D++) || t.uidEvent || D++;
    }
    function j(t) {
        var e = S(t);
        return (t.uidEvent = e), (O[e] = O[e] || {}), O[e];
    }
    function N(t, e, n) {
        void 0 === n && (n = null);
        for (var i = Object.keys(t), o = 0, r = i.length; o < r; o++) {
            var s = t[i[o]];
            if (s.originalHandler === e && s.delegationSelector === n) return s;
        }
        return null;
    }
    function P(t, e, n) {
        var i = "string" == typeof e,
            o = i ? n : e,
            r = t.replace(A, ""),
            s = x[r];
        return s && (r = s), C.has(r) || (r = t), [i, o, r];
    }
    function I(t, e, n, i, o) {
        if ("string" == typeof e && t) {
            n || ((n = i), (i = null));
            var r = P(e, n, i),
                s = r[0],
                a = r[1],
                l = r[2],
                c = j(t),
                u = c[l] || (c[l] = {}),
                f = N(u, a, s ? n : null);
            if (f) f.oneOff = f.oneOff && o;
            else {
                var d = S(a, e.replace(k, "")),
                    h = s
                        ? (function (t, e, n) {
                              return function i(o) {
                                  for (
                                      var r = t.querySelectorAll(e),
                                          s = o.target;
                                      s && s !== this;
                                      s = s.parentNode
                                  )
                                      for (var a = r.length; a--; )
                                          if (r[a] === s)
                                              return (
                                                  (o.delegateTarget = s),
                                                  i.oneOff &&
                                                      B.off(t, o.type, n),
                                                  n.apply(s, [o])
                                              );
                                  return null;
                              };
                          })(t, n, i)
                        : (function (t, e) {
                              return function n(i) {
                                  return (
                                      (i.delegateTarget = t),
                                      n.oneOff && B.off(t, i.type, e),
                                      e.apply(t, [i])
                                  );
                              };
                          })(t, n);
                (h.delegationSelector = s ? n : null),
                    (h.originalHandler = a),
                    (h.oneOff = o),
                    (h.uidEvent = d),
                    (u[d] = h),
                    t.addEventListener(l, h, s);
            }
        }
    }
    function M(t, e, n, i, o) {
        var r = N(e[n], i, o);
        r && (t.removeEventListener(n, r, Boolean(o)), delete e[n][r.uidEvent]);
    }
    var B = {
            on: function (t, e, n, i) {
                I(t, e, n, i, !1);
            },
            one: function (t, e, n, i) {
                I(t, e, n, i, !0);
            },
            off: function (t, e, n, i) {
                if ("string" == typeof e && t) {
                    var o = P(e, n, i),
                        r = o[0],
                        s = o[1],
                        a = o[2],
                        l = a !== e,
                        c = j(t),
                        u = e.startsWith(".");
                    if (void 0 === s) {
                        u &&
                            Object.keys(c).forEach(function (n) {
                                !(function (t, e, n, i) {
                                    var o = e[n] || {};
                                    Object.keys(o).forEach(function (r) {
                                        if (r.includes(i)) {
                                            var s = o[r];
                                            M(
                                                t,
                                                e,
                                                n,
                                                s.originalHandler,
                                                s.delegationSelector
                                            );
                                        }
                                    });
                                })(t, c, n, e.slice(1));
                            });
                        var f = c[a] || {};
                        Object.keys(f).forEach(function (n) {
                            var i = n.replace(L, "");
                            if (!l || e.includes(i)) {
                                var o = f[n];
                                M(
                                    t,
                                    c,
                                    a,
                                    o.originalHandler,
                                    o.delegationSelector
                                );
                            }
                        });
                    } else {
                        if (!c || !c[a]) return;
                        M(t, c, a, s, r ? n : null);
                    }
                }
            },
            trigger: function (t, e, n) {
                if ("string" != typeof e || !t) return null;
                var i,
                    o = _(),
                    r = e.replace(A, ""),
                    s = e !== r,
                    a = C.has(r),
                    l = !0,
                    c = !0,
                    u = !1,
                    f = null;
                return (
                    s &&
                        o &&
                        ((i = o.Event(e, n)),
                        o(t).trigger(i),
                        (l = !i.isPropagationStopped()),
                        (c = !i.isImmediatePropagationStopped()),
                        (u = i.isDefaultPrevented())),
                    a
                        ? (f = document.createEvent("HTMLEvents")).initEvent(
                              r,
                              l,
                              !0
                          )
                        : (f = new CustomEvent(e, {
                              bubbles: l,
                              cancelable: !0,
                          })),
                    void 0 !== n &&
                        Object.keys(n).forEach(function (t) {
                            Object.defineProperty(f, t, {
                                get: function () {
                                    return n[t];
                                },
                            });
                        }),
                    u && f.preventDefault(),
                    c && t.dispatchEvent(f),
                    f.defaultPrevented && void 0 !== i && i.preventDefault(),
                    f
                );
            },
        },
        H = (function () {
            function t(t) {
                t &&
                    ((this._element = t),
                    E(t, this.constructor.DATA_KEY, this));
            }
            return (
                (t.prototype.dispose = function () {
                    var t, e;
                    (t = this._element),
                        (e = this.constructor.DATA_KEY),
                        w.delete(t, e),
                        (this._element = null);
                }),
                (t.getInstance = function (t) {
                    return T(t, this.DATA_KEY);
                }),
                e(t, null, [
                    {
                        key: "VERSION",
                        get: function () {
                            return "5.0.0-beta2";
                        },
                    },
                ]),
                t
            );
        })(),
        R = (function (t) {
            function n() {
                return t.apply(this, arguments) || this;
            }
            i(n, t);
            var o = n.prototype;
            return (
                (o.close = function (t) {
                    var e = t ? this._getRootElement(t) : this._element,
                        n = this._triggerCloseEvent(e);
                    null === n || n.defaultPrevented || this._removeElement(e);
                }),
                (o._getRootElement = function (t) {
                    return c(t) || t.closest(".alert");
                }),
                (o._triggerCloseEvent = function (t) {
                    return B.trigger(t, "close.bs.alert");
                }),
                (o._removeElement = function (t) {
                    var e = this;
                    if (
                        (t.classList.remove("show"),
                        t.classList.contains("fade"))
                    ) {
                        var n = u(t);
                        B.one(t, "transitionend", function () {
                            return e._destroyElement(t);
                        }),
                            h(t, n);
                    } else this._destroyElement(t);
                }),
                (o._destroyElement = function (t) {
                    t.parentNode && t.parentNode.removeChild(t),
                        B.trigger(t, "closed.bs.alert");
                }),
                (n.jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = T(this, "bs.alert");
                        e || (e = new n(this)), "close" === t && e[t](this);
                    });
                }),
                (n.handleDismiss = function (t) {
                    return function (e) {
                        e && e.preventDefault(), t.close(this);
                    };
                }),
                e(n, null, [
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.alert";
                        },
                    },
                ]),
                n
            );
        })(H);
    B.on(
        document,
        "click.bs.alert.data-api",
        '[data-bs-dismiss="alert"]',
        R.handleDismiss(new R())
    ),
        y("alert", R);
    var W = (function (t) {
        function n() {
            return t.apply(this, arguments) || this;
        }
        return (
            i(n, t),
            (n.prototype.toggle = function () {
                this._element.setAttribute(
                    "aria-pressed",
                    this._element.classList.toggle("active")
                );
            }),
            (n.jQueryInterface = function (t) {
                return this.each(function () {
                    var e = T(this, "bs.button");
                    e || (e = new n(this)), "toggle" === t && e[t]();
                });
            }),
            e(n, null, [
                {
                    key: "DATA_KEY",
                    get: function () {
                        return "bs.button";
                    },
                },
            ]),
            n
        );
    })(H);
    function K(t) {
        return (
            "true" === t ||
            ("false" !== t &&
                (t === Number(t).toString()
                    ? Number(t)
                    : "" === t || "null" === t
                    ? null
                    : t))
        );
    }
    function U(t) {
        return t.replace(/[A-Z]/g, function (t) {
            return "-" + t.toLowerCase();
        });
    }
    B.on(
        document,
        "click.bs.button.data-api",
        '[data-bs-toggle="button"]',
        function (t) {
            t.preventDefault();
            var e = t.target.closest('[data-bs-toggle="button"]'),
                n = T(e, "bs.button");
            n || (n = new W(e)), n.toggle();
        }
    ),
        y("button", W);
    var z = {
            setDataAttribute: function (t, e, n) {
                t.setAttribute("data-bs-" + U(e), n);
            },
            removeDataAttribute: function (t, e) {
                t.removeAttribute("data-bs-" + U(e));
            },
            getDataAttributes: function (t) {
                if (!t) return {};
                var e = {};
                return (
                    Object.keys(t.dataset)
                        .filter(function (t) {
                            return t.startsWith("bs");
                        })
                        .forEach(function (n) {
                            var i = n.replace(/^bs/, "");
                            (i =
                                i.charAt(0).toLowerCase() +
                                i.slice(1, i.length)),
                                (e[i] = K(t.dataset[n]));
                        }),
                    e
                );
            },
            getDataAttribute: function (t, e) {
                return K(t.getAttribute("data-bs-" + U(e)));
            },
            offset: function (t) {
                var e = t.getBoundingClientRect();
                return {
                    top: e.top + document.body.scrollTop,
                    left: e.left + document.body.scrollLeft,
                };
            },
            position: function (t) {
                return { top: t.offsetTop, left: t.offsetLeft };
            },
        },
        F = function (t, e) {
            var n;
            return (
                void 0 === e && (e = document.documentElement),
                (n = []).concat.apply(
                    n,
                    Element.prototype.querySelectorAll.call(e, t)
                )
            );
        },
        Y = function (t, e) {
            return (
                void 0 === e && (e = document.documentElement),
                Element.prototype.querySelector.call(e, t)
            );
        },
        q = function (t, e) {
            var n;
            return (n = []).concat.apply(n, t.children).filter(function (t) {
                return t.matches(e);
            });
        },
        V = function (t, e) {
            for (var n = t.previousElementSibling; n; ) {
                if (n.matches(e)) return [n];
                n = n.previousElementSibling;
            }
            return [];
        },
        X = {
            interval: 5e3,
            keyboard: !0,
            slide: !1,
            pause: "hover",
            wrap: !0,
            touch: !0,
        },
        Q = {
            interval: "(number|boolean)",
            keyboard: "boolean",
            slide: "(boolean|string)",
            pause: "(string|boolean)",
            wrap: "boolean",
            touch: "boolean",
        },
        $ = (function (t) {
            function o(e, n) {
                var i;
                return (
                    ((i = t.call(this, e) || this)._items = null),
                    (i._interval = null),
                    (i._activeElement = null),
                    (i._isPaused = !1),
                    (i._isSliding = !1),
                    (i.touchTimeout = null),
                    (i.touchStartX = 0),
                    (i.touchDeltaX = 0),
                    (i._config = i._getConfig(n)),
                    (i._indicatorsElement = Y(
                        ".carousel-indicators",
                        i._element
                    )),
                    (i._touchSupported =
                        "ontouchstart" in document.documentElement ||
                        navigator.maxTouchPoints > 0),
                    (i._pointerEvent = Boolean(window.PointerEvent)),
                    i._addEventListeners(),
                    i
                );
            }
            i(o, t);
            var r = o.prototype;
            return (
                (r.next = function () {
                    this._isSliding || this._slide("next");
                }),
                (r.nextWhenVisible = function () {
                    !document.hidden && g(this._element) && this.next();
                }),
                (r.prev = function () {
                    this._isSliding || this._slide("prev");
                }),
                (r.pause = function (t) {
                    t || (this._isPaused = !0),
                        Y(
                            ".carousel-item-next, .carousel-item-prev",
                            this._element
                        ) && (f(this._element), this.cycle(!0)),
                        clearInterval(this._interval),
                        (this._interval = null);
                }),
                (r.cycle = function (t) {
                    t || (this._isPaused = !1),
                        this._interval &&
                            (clearInterval(this._interval),
                            (this._interval = null)),
                        this._config &&
                            this._config.interval &&
                            !this._isPaused &&
                            (this._updateInterval(),
                            (this._interval = setInterval(
                                (document.visibilityState
                                    ? this.nextWhenVisible
                                    : this.next
                                ).bind(this),
                                this._config.interval
                            )));
                }),
                (r.to = function (t) {
                    var e = this;
                    this._activeElement = Y(
                        ".active.carousel-item",
                        this._element
                    );
                    var n = this._getItemIndex(this._activeElement);
                    if (!(t > this._items.length - 1 || t < 0))
                        if (this._isSliding)
                            B.one(
                                this._element,
                                "slid.bs.carousel",
                                function () {
                                    return e.to(t);
                                }
                            );
                        else {
                            if (n === t) return this.pause(), void this.cycle();
                            var i = t > n ? "next" : "prev";
                            this._slide(i, this._items[t]);
                        }
                }),
                (r.dispose = function () {
                    t.prototype.dispose.call(this),
                        B.off(this._element, ".bs.carousel"),
                        (this._items = null),
                        (this._config = null),
                        (this._interval = null),
                        (this._isPaused = null),
                        (this._isSliding = null),
                        (this._activeElement = null),
                        (this._indicatorsElement = null);
                }),
                (r._getConfig = function (t) {
                    return (t = n({}, X, t)), p("carousel", t, Q), t;
                }),
                (r._handleSwipe = function () {
                    var t = Math.abs(this.touchDeltaX);
                    if (!(t <= 40)) {
                        var e = t / this.touchDeltaX;
                        (this.touchDeltaX = 0),
                            e > 0 && (b ? this.next() : this.prev()),
                            e < 0 && (b ? this.prev() : this.next());
                    }
                }),
                (r._addEventListeners = function () {
                    var t = this;
                    this._config.keyboard &&
                        B.on(
                            this._element,
                            "keydown.bs.carousel",
                            function (e) {
                                return t._keydown(e);
                            }
                        ),
                        "hover" === this._config.pause &&
                            (B.on(
                                this._element,
                                "mouseenter.bs.carousel",
                                function (e) {
                                    return t.pause(e);
                                }
                            ),
                            B.on(
                                this._element,
                                "mouseleave.bs.carousel",
                                function (e) {
                                    return t.cycle(e);
                                }
                            )),
                        this._config.touch &&
                            this._touchSupported &&
                            this._addTouchEventListeners();
                }),
                (r._addTouchEventListeners = function () {
                    var t = this,
                        e = function (e) {
                            !t._pointerEvent ||
                            ("pen" !== e.pointerType &&
                                "touch" !== e.pointerType)
                                ? t._pointerEvent ||
                                  (t.touchStartX = e.touches[0].clientX)
                                : (t.touchStartX = e.clientX);
                        },
                        n = function (e) {
                            !t._pointerEvent ||
                                ("pen" !== e.pointerType &&
                                    "touch" !== e.pointerType) ||
                                (t.touchDeltaX = e.clientX - t.touchStartX),
                                t._handleSwipe(),
                                "hover" === t._config.pause &&
                                    (t.pause(),
                                    t.touchTimeout &&
                                        clearTimeout(t.touchTimeout),
                                    (t.touchTimeout = setTimeout(function (e) {
                                        return t.cycle(e);
                                    }, 500 + t._config.interval)));
                        };
                    F(".carousel-item img", this._element).forEach(function (
                        t
                    ) {
                        B.on(t, "dragstart.bs.carousel", function (t) {
                            return t.preventDefault();
                        });
                    }),
                        this._pointerEvent
                            ? (B.on(
                                  this._element,
                                  "pointerdown.bs.carousel",
                                  function (t) {
                                      return e(t);
                                  }
                              ),
                              B.on(
                                  this._element,
                                  "pointerup.bs.carousel",
                                  function (t) {
                                      return n(t);
                                  }
                              ),
                              this._element.classList.add("pointer-event"))
                            : (B.on(
                                  this._element,
                                  "touchstart.bs.carousel",
                                  function (t) {
                                      return e(t);
                                  }
                              ),
                              B.on(
                                  this._element,
                                  "touchmove.bs.carousel",
                                  function (e) {
                                      return (function (e) {
                                          e.touches && e.touches.length > 1
                                              ? (t.touchDeltaX = 0)
                                              : (t.touchDeltaX =
                                                    e.touches[0].clientX -
                                                    t.touchStartX);
                                      })(e);
                                  }
                              ),
                              B.on(
                                  this._element,
                                  "touchend.bs.carousel",
                                  function (t) {
                                      return n(t);
                                  }
                              ));
                }),
                (r._keydown = function (t) {
                    /input|textarea/i.test(t.target.tagName) ||
                        ("ArrowLeft" === t.key
                            ? (t.preventDefault(),
                              b ? this.next() : this.prev())
                            : "ArrowRight" === t.key &&
                              (t.preventDefault(),
                              b ? this.prev() : this.next()));
                }),
                (r._getItemIndex = function (t) {
                    return (
                        (this._items =
                            t && t.parentNode
                                ? F(".carousel-item", t.parentNode)
                                : []),
                        this._items.indexOf(t)
                    );
                }),
                (r._getItemByDirection = function (t, e) {
                    var n = "next" === t,
                        i = "prev" === t,
                        o = this._getItemIndex(e),
                        r = this._items.length - 1;
                    if (
                        ((i && 0 === o) || (n && o === r)) &&
                        !this._config.wrap
                    )
                        return e;
                    var s = (o + ("prev" === t ? -1 : 1)) % this._items.length;
                    return -1 === s
                        ? this._items[this._items.length - 1]
                        : this._items[s];
                }),
                (r._triggerSlideEvent = function (t, e) {
                    var n = this._getItemIndex(t),
                        i = this._getItemIndex(
                            Y(".active.carousel-item", this._element)
                        );
                    return B.trigger(this._element, "slide.bs.carousel", {
                        relatedTarget: t,
                        direction: e,
                        from: i,
                        to: n,
                    });
                }),
                (r._setActiveIndicatorElement = function (t) {
                    if (this._indicatorsElement) {
                        var e = Y(".active", this._indicatorsElement);
                        e.classList.remove("active"),
                            e.removeAttribute("aria-current");
                        for (
                            var n = F(
                                    "[data-bs-target]",
                                    this._indicatorsElement
                                ),
                                i = 0;
                            i < n.length;
                            i++
                        )
                            if (
                                Number.parseInt(
                                    n[i].getAttribute("data-bs-slide-to"),
                                    10
                                ) === this._getItemIndex(t)
                            ) {
                                n[i].classList.add("active"),
                                    n[i].setAttribute("aria-current", "true");
                                break;
                            }
                    }
                }),
                (r._updateInterval = function () {
                    var t =
                        this._activeElement ||
                        Y(".active.carousel-item", this._element);
                    if (t) {
                        var e = Number.parseInt(
                            t.getAttribute("data-bs-interval"),
                            10
                        );
                        e
                            ? ((this._config.defaultInterval =
                                  this._config.defaultInterval ||
                                  this._config.interval),
                              (this._config.interval = e))
                            : (this._config.interval =
                                  this._config.defaultInterval ||
                                  this._config.interval);
                    }
                }),
                (r._slide = function (t, e) {
                    var n = this,
                        i = Y(".active.carousel-item", this._element),
                        o = this._getItemIndex(i),
                        r = e || (i && this._getItemByDirection(t, i)),
                        s = this._getItemIndex(r),
                        a = Boolean(this._interval),
                        l =
                            "next" === t
                                ? "carousel-item-start"
                                : "carousel-item-end",
                        c =
                            "next" === t
                                ? "carousel-item-next"
                                : "carousel-item-prev",
                        f = "next" === t ? "left" : "right";
                    if (r && r.classList.contains("active"))
                        this._isSliding = !1;
                    else if (
                        !this._triggerSlideEvent(r, f).defaultPrevented &&
                        i &&
                        r
                    ) {
                        if (
                            ((this._isSliding = !0),
                            a && this.pause(),
                            this._setActiveIndicatorElement(r),
                            (this._activeElement = r),
                            this._element.classList.contains("slide"))
                        ) {
                            r.classList.add(c),
                                v(r),
                                i.classList.add(l),
                                r.classList.add(l);
                            var d = u(i);
                            B.one(i, "transitionend", function () {
                                r.classList.remove(l, c),
                                    r.classList.add("active"),
                                    i.classList.remove("active", c, l),
                                    (n._isSliding = !1),
                                    setTimeout(function () {
                                        B.trigger(
                                            n._element,
                                            "slid.bs.carousel",
                                            {
                                                relatedTarget: r,
                                                direction: f,
                                                from: o,
                                                to: s,
                                            }
                                        );
                                    }, 0);
                            }),
                                h(i, d);
                        } else
                            i.classList.remove("active"),
                                r.classList.add("active"),
                                (this._isSliding = !1),
                                B.trigger(this._element, "slid.bs.carousel", {
                                    relatedTarget: r,
                                    direction: f,
                                    from: o,
                                    to: s,
                                });
                        a && this.cycle();
                    }
                }),
                (o.carouselInterface = function (t, e) {
                    var i = T(t, "bs.carousel"),
                        r = n({}, X, z.getDataAttributes(t));
                    "object" == typeof e && (r = n({}, r, e));
                    var s = "string" == typeof e ? e : r.slide;
                    if ((i || (i = new o(t, r)), "number" == typeof e)) i.to(e);
                    else if ("string" == typeof s) {
                        if (void 0 === i[s])
                            throw new TypeError('No method named "' + s + '"');
                        i[s]();
                    } else r.interval && r.ride && (i.pause(), i.cycle());
                }),
                (o.jQueryInterface = function (t) {
                    return this.each(function () {
                        o.carouselInterface(this, t);
                    });
                }),
                (o.dataApiClickHandler = function (t) {
                    var e = c(this);
                    if (e && e.classList.contains("carousel")) {
                        var i = n(
                                {},
                                z.getDataAttributes(e),
                                z.getDataAttributes(this)
                            ),
                            r = this.getAttribute("data-bs-slide-to");
                        r && (i.interval = !1),
                            o.carouselInterface(e, i),
                            r && T(e, "bs.carousel").to(r),
                            t.preventDefault();
                    }
                }),
                e(o, null, [
                    {
                        key: "Default",
                        get: function () {
                            return X;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.carousel";
                        },
                    },
                ]),
                o
            );
        })(H);
    B.on(
        document,
        "click.bs.carousel.data-api",
        "[data-bs-slide], [data-bs-slide-to]",
        $.dataApiClickHandler
    ),
        B.on(window, "load.bs.carousel.data-api", function () {
            for (
                var t = F('[data-bs-ride="carousel"]'), e = 0, n = t.length;
                e < n;
                e++
            )
                $.carouselInterface(t[e], T(t[e], "bs.carousel"));
        }),
        y("carousel", $);
    var G = { toggle: !0, parent: "" },
        Z = { toggle: "boolean", parent: "(string|element)" },
        J = (function (t) {
            function o(e, n) {
                var i;
                ((i = t.call(this, e) || this)._isTransitioning = !1),
                    (i._config = i._getConfig(n)),
                    (i._triggerArray = F(
                        '[data-bs-toggle="collapse"][href="#' +
                            e.id +
                            '"],[data-bs-toggle="collapse"][data-bs-target="#' +
                            e.id +
                            '"]'
                    ));
                for (
                    var o = F('[data-bs-toggle="collapse"]'),
                        r = 0,
                        s = o.length;
                    r < s;
                    r++
                ) {
                    var a = o[r],
                        c = l(a),
                        u = F(c).filter(function (t) {
                            return t === e;
                        });
                    null !== c &&
                        u.length &&
                        ((i._selector = c), i._triggerArray.push(a));
                }
                return (
                    (i._parent = i._config.parent ? i._getParent() : null),
                    i._config.parent ||
                        i._addAriaAndCollapsedClass(
                            i._element,
                            i._triggerArray
                        ),
                    i._config.toggle && i.toggle(),
                    i
                );
            }
            i(o, t);
            var r = o.prototype;
            return (
                (r.toggle = function () {
                    this._element.classList.contains("show")
                        ? this.hide()
                        : this.show();
                }),
                (r.show = function () {
                    var t = this;
                    if (
                        !this._isTransitioning &&
                        !this._element.classList.contains("show")
                    ) {
                        var e, n;
                        this._parent &&
                            0 ===
                                (e = F(
                                    ".show, .collapsing",
                                    this._parent
                                ).filter(function (e) {
                                    return "string" == typeof t._config.parent
                                        ? e.getAttribute("data-bs-parent") ===
                                              t._config.parent
                                        : e.classList.contains("collapse");
                                })).length &&
                            (e = null);
                        var i = Y(this._selector);
                        if (e) {
                            var r = e.find(function (t) {
                                return i !== t;
                            });
                            if (
                                (n = r ? T(r, "bs.collapse") : null) &&
                                n._isTransitioning
                            )
                                return;
                        }
                        if (
                            !B.trigger(this._element, "show.bs.collapse")
                                .defaultPrevented
                        ) {
                            e &&
                                e.forEach(function (t) {
                                    i !== t && o.collapseInterface(t, "hide"),
                                        n || E(t, "bs.collapse", null);
                                });
                            var s = this._getDimension();
                            this._element.classList.remove("collapse"),
                                this._element.classList.add("collapsing"),
                                (this._element.style[s] = 0),
                                this._triggerArray.length &&
                                    this._triggerArray.forEach(function (t) {
                                        t.classList.remove("collapsed"),
                                            t.setAttribute("aria-expanded", !0);
                                    }),
                                this.setTransitioning(!0);
                            var a =
                                    "scroll" +
                                    (s[0].toUpperCase() + s.slice(1)),
                                l = u(this._element);
                            B.one(this._element, "transitionend", function () {
                                t._element.classList.remove("collapsing"),
                                    t._element.classList.add(
                                        "collapse",
                                        "show"
                                    ),
                                    (t._element.style[s] = ""),
                                    t.setTransitioning(!1),
                                    B.trigger(t._element, "shown.bs.collapse");
                            }),
                                h(this._element, l),
                                (this._element.style[s] =
                                    this._element[a] + "px");
                        }
                    }
                }),
                (r.hide = function () {
                    var t = this;
                    if (
                        !this._isTransitioning &&
                        this._element.classList.contains("show") &&
                        !B.trigger(this._element, "hide.bs.collapse")
                            .defaultPrevented
                    ) {
                        var e = this._getDimension();
                        (this._element.style[e] =
                            this._element.getBoundingClientRect()[e] + "px"),
                            v(this._element),
                            this._element.classList.add("collapsing"),
                            this._element.classList.remove("collapse", "show");
                        var n = this._triggerArray.length;
                        if (n > 0)
                            for (var i = 0; i < n; i++) {
                                var o = this._triggerArray[i],
                                    r = c(o);
                                r &&
                                    !r.classList.contains("show") &&
                                    (o.classList.add("collapsed"),
                                    o.setAttribute("aria-expanded", !1));
                            }
                        this.setTransitioning(!0),
                            (this._element.style[e] = "");
                        var s = u(this._element);
                        B.one(this._element, "transitionend", function () {
                            t.setTransitioning(!1),
                                t._element.classList.remove("collapsing"),
                                t._element.classList.add("collapse"),
                                B.trigger(t._element, "hidden.bs.collapse");
                        }),
                            h(this._element, s);
                    }
                }),
                (r.setTransitioning = function (t) {
                    this._isTransitioning = t;
                }),
                (r.dispose = function () {
                    t.prototype.dispose.call(this),
                        (this._config = null),
                        (this._parent = null),
                        (this._triggerArray = null),
                        (this._isTransitioning = null);
                }),
                (r._getConfig = function (t) {
                    return (
                        ((t = n({}, G, t)).toggle = Boolean(t.toggle)),
                        p("collapse", t, Z),
                        t
                    );
                }),
                (r._getDimension = function () {
                    return this._element.classList.contains("width")
                        ? "width"
                        : "height";
                }),
                (r._getParent = function () {
                    var t = this,
                        e = this._config.parent;
                    return (
                        d(e)
                            ? (void 0 === e.jquery && void 0 === e[0]) ||
                              (e = e[0])
                            : (e = Y(e)),
                        F(
                            '[data-bs-toggle="collapse"][data-bs-parent="' +
                                e +
                                '"]',
                            e
                        ).forEach(function (e) {
                            var n = c(e);
                            t._addAriaAndCollapsedClass(n, [e]);
                        }),
                        e
                    );
                }),
                (r._addAriaAndCollapsedClass = function (t, e) {
                    if (t && e.length) {
                        var n = t.classList.contains("show");
                        e.forEach(function (t) {
                            n
                                ? t.classList.remove("collapsed")
                                : t.classList.add("collapsed"),
                                t.setAttribute("aria-expanded", n);
                        });
                    }
                }),
                (o.collapseInterface = function (t, e) {
                    var i = T(t, "bs.collapse"),
                        r = n(
                            {},
                            G,
                            z.getDataAttributes(t),
                            "object" == typeof e && e ? e : {}
                        );
                    if (
                        (!i &&
                            r.toggle &&
                            "string" == typeof e &&
                            /show|hide/.test(e) &&
                            (r.toggle = !1),
                        i || (i = new o(t, r)),
                        "string" == typeof e)
                    ) {
                        if (void 0 === i[e])
                            throw new TypeError('No method named "' + e + '"');
                        i[e]();
                    }
                }),
                (o.jQueryInterface = function (t) {
                    return this.each(function () {
                        o.collapseInterface(this, t);
                    });
                }),
                e(o, null, [
                    {
                        key: "Default",
                        get: function () {
                            return G;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.collapse";
                        },
                    },
                ]),
                o
            );
        })(H);
    B.on(
        document,
        "click.bs.collapse.data-api",
        '[data-bs-toggle="collapse"]',
        function (t) {
            ("A" === t.target.tagName ||
                (t.delegateTarget && "A" === t.delegateTarget.tagName)) &&
                t.preventDefault();
            var e = z.getDataAttributes(this),
                n = l(this);
            F(n).forEach(function (t) {
                var n,
                    i = T(t, "bs.collapse");
                i
                    ? (null === i._parent &&
                          "string" == typeof e.parent &&
                          ((i._config.parent = e.parent),
                          (i._parent = i._getParent())),
                      (n = "toggle"))
                    : (n = e),
                    J.collapseInterface(t, n);
            });
        }
    ),
        y("collapse", J);
    var tt = "top",
        et = "bottom",
        nt = "right",
        it = "left",
        ot = [tt, et, nt, it],
        rt = ot.reduce(function (t, e) {
            return t.concat([e + "-start", e + "-end"]);
        }, []),
        st = [].concat(ot, ["auto"]).reduce(function (t, e) {
            return t.concat([e, e + "-start", e + "-end"]);
        }, []),
        at = [
            "beforeRead",
            "read",
            "afterRead",
            "beforeMain",
            "main",
            "afterMain",
            "beforeWrite",
            "write",
            "afterWrite",
        ];
    function lt(t) {
        return t ? (t.nodeName || "").toLowerCase() : null;
    }
    function ct(t) {
        if ("[object Window]" !== t.toString()) {
            var e = t.ownerDocument;
            return (e && e.defaultView) || window;
        }
        return t;
    }
    function ut(t) {
        return t instanceof ct(t).Element || t instanceof Element;
    }
    function ft(t) {
        return t instanceof ct(t).HTMLElement || t instanceof HTMLElement;
    }
    var dt = {
        name: "applyStyles",
        enabled: !0,
        phase: "write",
        fn: function (t) {
            var e = t.state;
            Object.keys(e.elements).forEach(function (t) {
                var n = e.styles[t] || {},
                    i = e.attributes[t] || {},
                    o = e.elements[t];
                ft(o) &&
                    lt(o) &&
                    (Object.assign(o.style, n),
                    Object.keys(i).forEach(function (t) {
                        var e = i[t];
                        !1 === e
                            ? o.removeAttribute(t)
                            : o.setAttribute(t, !0 === e ? "" : e);
                    }));
            });
        },
        effect: function (t) {
            var e = t.state,
                n = {
                    popper: {
                        position: e.options.strategy,
                        left: "0",
                        top: "0",
                        margin: "0",
                    },
                    arrow: { position: "absolute" },
                    reference: {},
                };
            return (
                Object.assign(e.elements.popper.style, n.popper),
                e.elements.arrow &&
                    Object.assign(e.elements.arrow.style, n.arrow),
                function () {
                    Object.keys(e.elements).forEach(function (t) {
                        var i = e.elements[t],
                            o = e.attributes[t] || {},
                            r = Object.keys(
                                e.styles.hasOwnProperty(t) ? e.styles[t] : n[t]
                            ).reduce(function (t, e) {
                                return (t[e] = ""), t;
                            }, {});
                        ft(i) &&
                            lt(i) &&
                            (Object.assign(i.style, r),
                            Object.keys(o).forEach(function (t) {
                                i.removeAttribute(t);
                            }));
                    });
                }
            );
        },
        requires: ["computeStyles"],
    };
    function ht(t) {
        return t.split("-")[0];
    }
    function pt(t) {
        return {
            x: t.offsetLeft,
            y: t.offsetTop,
            width: t.offsetWidth,
            height: t.offsetHeight,
        };
    }
    function gt(t, e) {
        var n,
            i = e.getRootNode && e.getRootNode();
        if (t.contains(e)) return !0;
        if (
            i &&
            ((n = i) instanceof ct(n).ShadowRoot || n instanceof ShadowRoot)
        ) {
            var o = e;
            do {
                if (o && t.isSameNode(o)) return !0;
                o = o.parentNode || o.host;
            } while (o);
        }
        return !1;
    }
    function mt(t) {
        return ct(t).getComputedStyle(t);
    }
    function vt(t) {
        return ["table", "td", "th"].indexOf(lt(t)) >= 0;
    }
    function _t(t) {
        return (
            (ut(t) ? t.ownerDocument : t.document) || window.document
        ).documentElement;
    }
    function bt(t) {
        return "html" === lt(t)
            ? t
            : t.assignedSlot || t.parentNode || t.host || _t(t);
    }
    function yt(t) {
        if (!ft(t) || "fixed" === mt(t).position) return null;
        var e = t.offsetParent;
        if (e) {
            var n = _t(e);
            if (
                "body" === lt(e) &&
                "static" === mt(e).position &&
                "static" !== mt(n).position
            )
                return n;
        }
        return e;
    }
    function wt(t) {
        for (
            var e = ct(t), n = yt(t);
            n && vt(n) && "static" === mt(n).position;

        )
            n = yt(n);
        return n && "body" === lt(n) && "static" === mt(n).position
            ? e
            : n ||
                  (function (t) {
                      for (
                          var e = bt(t);
                          ft(e) && ["html", "body"].indexOf(lt(e)) < 0;

                      ) {
                          var n = mt(e);
                          if (
                              "none" !== n.transform ||
                              "none" !== n.perspective ||
                              (n.willChange && "auto" !== n.willChange)
                          )
                              return e;
                          e = e.parentNode;
                      }
                      return null;
                  })(t) ||
                  e;
    }
    function Et(t) {
        return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
    }
    function Tt(t, e, n) {
        return Math.max(t, Math.min(e, n));
    }
    function kt(t) {
        return Object.assign(
            Object.assign({}, { top: 0, right: 0, bottom: 0, left: 0 }),
            t
        );
    }
    function At(t, e) {
        return e.reduce(function (e, n) {
            return (e[n] = t), e;
        }, {});
    }
    var Lt = {
            name: "arrow",
            enabled: !0,
            phase: "main",
            fn: function (t) {
                var e,
                    n = t.state,
                    i = t.name,
                    o = n.elements.arrow,
                    r = n.modifiersData.popperOffsets,
                    s = ht(n.placement),
                    a = Et(s),
                    l = [it, nt].indexOf(s) >= 0 ? "height" : "width";
                if (o && r) {
                    var c = n.modifiersData[i + "#persistent"].padding,
                        u = pt(o),
                        f = "y" === a ? tt : it,
                        d = "y" === a ? et : nt,
                        h =
                            n.rects.reference[l] +
                            n.rects.reference[a] -
                            r[a] -
                            n.rects.popper[l],
                        p = r[a] - n.rects.reference[a],
                        g = wt(o),
                        m = g
                            ? "y" === a
                                ? g.clientHeight || 0
                                : g.clientWidth || 0
                            : 0,
                        v = h / 2 - p / 2,
                        _ = c[f],
                        b = m - u[l] - c[d],
                        y = m / 2 - u[l] / 2 + v,
                        w = Tt(_, y, b),
                        E = a;
                    n.modifiersData[i] =
                        (((e = {})[E] = w), (e.centerOffset = w - y), e);
                }
            },
            effect: function (t) {
                var e = t.state,
                    n = t.options,
                    i = t.name,
                    o = n.element,
                    r = void 0 === o ? "[data-popper-arrow]" : o,
                    s = n.padding,
                    a = void 0 === s ? 0 : s;
                null != r &&
                    ("string" != typeof r ||
                        (r = e.elements.popper.querySelector(r))) &&
                    gt(e.elements.popper, r) &&
                    ((e.elements.arrow = r),
                    (e.modifiersData[i + "#persistent"] = {
                        padding: kt("number" != typeof a ? a : At(a, ot)),
                    }));
            },
            requires: ["popperOffsets"],
            requiresIfExists: ["preventOverflow"],
        },
        Ot = { top: "auto", right: "auto", bottom: "auto", left: "auto" };
    function Dt(t) {
        var e,
            n = t.popper,
            i = t.popperRect,
            o = t.placement,
            r = t.offsets,
            s = t.position,
            a = t.gpuAcceleration,
            l = t.adaptive,
            c = t.roundOffsets
                ? (function (t) {
                      var e = t.x,
                          n = t.y,
                          i = window.devicePixelRatio || 1;
                      return {
                          x: Math.round(e * i) / i || 0,
                          y: Math.round(n * i) / i || 0,
                      };
                  })(r)
                : r,
            u = c.x,
            f = void 0 === u ? 0 : u,
            d = c.y,
            h = void 0 === d ? 0 : d,
            p = r.hasOwnProperty("x"),
            g = r.hasOwnProperty("y"),
            m = it,
            v = tt,
            _ = window;
        if (l) {
            var b = wt(n);
            b === ct(n) && (b = _t(n)),
                o === tt &&
                    ((v = et),
                    (h -= b.clientHeight - i.height),
                    (h *= a ? 1 : -1)),
                o === it &&
                    ((m = nt),
                    (f -= b.clientWidth - i.width),
                    (f *= a ? 1 : -1));
        }
        var y,
            w = Object.assign({ position: s }, l && Ot);
        return a
            ? Object.assign(
                  Object.assign({}, w),
                  {},
                  (((y = {})[v] = g ? "0" : ""),
                  (y[m] = p ? "0" : ""),
                  (y.transform =
                      (_.devicePixelRatio || 1) < 2
                          ? "translate(" + f + "px, " + h + "px)"
                          : "translate3d(" + f + "px, " + h + "px, 0)"),
                  y)
              )
            : Object.assign(
                  Object.assign({}, w),
                  {},
                  (((e = {})[v] = g ? h + "px" : ""),
                  (e[m] = p ? f + "px" : ""),
                  (e.transform = ""),
                  e)
              );
    }
    var xt = {
            name: "computeStyles",
            enabled: !0,
            phase: "beforeWrite",
            fn: function (t) {
                var e = t.state,
                    n = t.options,
                    i = n.gpuAcceleration,
                    o = void 0 === i || i,
                    r = n.adaptive,
                    s = void 0 === r || r,
                    a = n.roundOffsets,
                    l = void 0 === a || a,
                    c = {
                        placement: ht(e.placement),
                        popper: e.elements.popper,
                        popperRect: e.rects.popper,
                        gpuAcceleration: o,
                    };
                null != e.modifiersData.popperOffsets &&
                    (e.styles.popper = Object.assign(
                        Object.assign({}, e.styles.popper),
                        Dt(
                            Object.assign(
                                Object.assign({}, c),
                                {},
                                {
                                    offsets: e.modifiersData.popperOffsets,
                                    position: e.options.strategy,
                                    adaptive: s,
                                    roundOffsets: l,
                                }
                            )
                        )
                    )),
                    null != e.modifiersData.arrow &&
                        (e.styles.arrow = Object.assign(
                            Object.assign({}, e.styles.arrow),
                            Dt(
                                Object.assign(
                                    Object.assign({}, c),
                                    {},
                                    {
                                        offsets: e.modifiersData.arrow,
                                        position: "absolute",
                                        adaptive: !1,
                                        roundOffsets: l,
                                    }
                                )
                            )
                        )),
                    (e.attributes.popper = Object.assign(
                        Object.assign({}, e.attributes.popper),
                        {},
                        { "data-popper-placement": e.placement }
                    ));
            },
            data: {},
        },
        Ct = { passive: !0 },
        St = {
            name: "eventListeners",
            enabled: !0,
            phase: "write",
            fn: function () {},
            effect: function (t) {
                var e = t.state,
                    n = t.instance,
                    i = t.options,
                    o = i.scroll,
                    r = void 0 === o || o,
                    s = i.resize,
                    a = void 0 === s || s,
                    l = ct(e.elements.popper),
                    c = [].concat(
                        e.scrollParents.reference,
                        e.scrollParents.popper
                    );
                return (
                    r &&
                        c.forEach(function (t) {
                            t.addEventListener("scroll", n.update, Ct);
                        }),
                    a && l.addEventListener("resize", n.update, Ct),
                    function () {
                        r &&
                            c.forEach(function (t) {
                                t.removeEventListener("scroll", n.update, Ct);
                            }),
                            a && l.removeEventListener("resize", n.update, Ct);
                    }
                );
            },
            data: {},
        },
        jt = { left: "right", right: "left", bottom: "top", top: "bottom" };
    function Nt(t) {
        return t.replace(/left|right|bottom|top/g, function (t) {
            return jt[t];
        });
    }
    var Pt = { start: "end", end: "start" };
    function It(t) {
        return t.replace(/start|end/g, function (t) {
            return Pt[t];
        });
    }
    function Mt(t) {
        var e = t.getBoundingClientRect();
        return {
            width: e.width,
            height: e.height,
            top: e.top,
            right: e.right,
            bottom: e.bottom,
            left: e.left,
            x: e.left,
            y: e.top,
        };
    }
    function Bt(t) {
        var e = ct(t);
        return { scrollLeft: e.pageXOffset, scrollTop: e.pageYOffset };
    }
    function Ht(t) {
        return Mt(_t(t)).left + Bt(t).scrollLeft;
    }
    function Rt(t) {
        var e = mt(t),
            n = e.overflow,
            i = e.overflowX,
            o = e.overflowY;
        return /auto|scroll|overlay|hidden/.test(n + o + i);
    }
    function Wt(t, e) {
        void 0 === e && (e = []);
        var n = (function t(e) {
                return ["html", "body", "#document"].indexOf(lt(e)) >= 0
                    ? e.ownerDocument.body
                    : ft(e) && Rt(e)
                    ? e
                    : t(bt(e));
            })(t),
            i = "body" === lt(n),
            o = ct(n),
            r = i ? [o].concat(o.visualViewport || [], Rt(n) ? n : []) : n,
            s = e.concat(r);
        return i ? s : s.concat(Wt(bt(r)));
    }
    function Kt(t) {
        return Object.assign(
            Object.assign({}, t),
            {},
            {
                left: t.x,
                top: t.y,
                right: t.x + t.width,
                bottom: t.y + t.height,
            }
        );
    }
    function Ut(t, e) {
        return "viewport" === e
            ? Kt(
                  (function (t) {
                      var e = ct(t),
                          n = _t(t),
                          i = e.visualViewport,
                          o = n.clientWidth,
                          r = n.clientHeight,
                          s = 0,
                          a = 0;
                      return (
                          i &&
                              ((o = i.width),
                              (r = i.height),
                              /^((?!chrome|android).)*safari/i.test(
                                  navigator.userAgent
                              ) || ((s = i.offsetLeft), (a = i.offsetTop))),
                          { width: o, height: r, x: s + Ht(t), y: a }
                      );
                  })(t)
              )
            : ft(e)
            ? (function (t) {
                  var e = Mt(t);
                  return (
                      (e.top = e.top + t.clientTop),
                      (e.left = e.left + t.clientLeft),
                      (e.bottom = e.top + t.clientHeight),
                      (e.right = e.left + t.clientWidth),
                      (e.width = t.clientWidth),
                      (e.height = t.clientHeight),
                      (e.x = e.left),
                      (e.y = e.top),
                      e
                  );
              })(e)
            : Kt(
                  (function (t) {
                      var e = _t(t),
                          n = Bt(t),
                          i = t.ownerDocument.body,
                          o = Math.max(
                              e.scrollWidth,
                              e.clientWidth,
                              i ? i.scrollWidth : 0,
                              i ? i.clientWidth : 0
                          ),
                          r = Math.max(
                              e.scrollHeight,
                              e.clientHeight,
                              i ? i.scrollHeight : 0,
                              i ? i.clientHeight : 0
                          ),
                          s = -n.scrollLeft + Ht(t),
                          a = -n.scrollTop;
                      return (
                          "rtl" === mt(i || e).direction &&
                              (s +=
                                  Math.max(
                                      e.clientWidth,
                                      i ? i.clientWidth : 0
                                  ) - o),
                          { width: o, height: r, x: s, y: a }
                      );
                  })(_t(t))
              );
    }
    function zt(t) {
        return t.split("-")[1];
    }
    function Ft(t) {
        var e,
            n = t.reference,
            i = t.element,
            o = t.placement,
            r = o ? ht(o) : null,
            s = o ? zt(o) : null,
            a = n.x + n.width / 2 - i.width / 2,
            l = n.y + n.height / 2 - i.height / 2;
        switch (r) {
            case tt:
                e = { x: a, y: n.y - i.height };
                break;
            case et:
                e = { x: a, y: n.y + n.height };
                break;
            case nt:
                e = { x: n.x + n.width, y: l };
                break;
            case it:
                e = { x: n.x - i.width, y: l };
                break;
            default:
                e = { x: n.x, y: n.y };
        }
        var c = r ? Et(r) : null;
        if (null != c) {
            var u = "y" === c ? "height" : "width";
            switch (s) {
                case "start":
                    e[c] = e[c] - (n[u] / 2 - i[u] / 2);
                    break;
                case "end":
                    e[c] = e[c] + (n[u] / 2 - i[u] / 2);
            }
        }
        return e;
    }
    function Yt(t, e) {
        void 0 === e && (e = {});
        var n = e,
            i = n.placement,
            o = void 0 === i ? t.placement : i,
            r = n.boundary,
            s = void 0 === r ? "clippingParents" : r,
            a = n.rootBoundary,
            l = void 0 === a ? "viewport" : a,
            c = n.elementContext,
            u = void 0 === c ? "popper" : c,
            f = n.altBoundary,
            d = void 0 !== f && f,
            h = n.padding,
            p = void 0 === h ? 0 : h,
            g = kt("number" != typeof p ? p : At(p, ot)),
            m = "popper" === u ? "reference" : "popper",
            v = t.elements.reference,
            _ = t.rects.popper,
            b = t.elements[d ? m : u],
            y = (function (t, e, n) {
                var i =
                        "clippingParents" === e
                            ? (function (t) {
                                  var e = Wt(bt(t)),
                                      n =
                                          ["absolute", "fixed"].indexOf(
                                              mt(t).position
                                          ) >= 0 && ft(t)
                                              ? wt(t)
                                              : t;
                                  return ut(n)
                                      ? e.filter(function (t) {
                                            return (
                                                ut(t) &&
                                                gt(t, n) &&
                                                "body" !== lt(t)
                                            );
                                        })
                                      : [];
                              })(t)
                            : [].concat(e),
                    o = [].concat(i, [n]),
                    r = o[0],
                    s = o.reduce(function (e, n) {
                        var i = Ut(t, n);
                        return (
                            (e.top = Math.max(i.top, e.top)),
                            (e.right = Math.min(i.right, e.right)),
                            (e.bottom = Math.min(i.bottom, e.bottom)),
                            (e.left = Math.max(i.left, e.left)),
                            e
                        );
                    }, Ut(t, r));
                return (
                    (s.width = s.right - s.left),
                    (s.height = s.bottom - s.top),
                    (s.x = s.left),
                    (s.y = s.top),
                    s
                );
            })(ut(b) ? b : b.contextElement || _t(t.elements.popper), s, l),
            w = Mt(v),
            E = Ft({
                reference: w,
                element: _,
                strategy: "absolute",
                placement: o,
            }),
            T = Kt(Object.assign(Object.assign({}, _), E)),
            k = "popper" === u ? T : w,
            A = {
                top: y.top - k.top + g.top,
                bottom: k.bottom - y.bottom + g.bottom,
                left: y.left - k.left + g.left,
                right: k.right - y.right + g.right,
            },
            L = t.modifiersData.offset;
        if ("popper" === u && L) {
            var O = L[o];
            Object.keys(A).forEach(function (t) {
                var e = [nt, et].indexOf(t) >= 0 ? 1 : -1,
                    n = [tt, et].indexOf(t) >= 0 ? "y" : "x";
                A[t] += O[n] * e;
            });
        }
        return A;
    }
    function qt(t, e) {
        void 0 === e && (e = {});
        var n = e,
            i = n.placement,
            o = n.boundary,
            r = n.rootBoundary,
            s = n.padding,
            a = n.flipVariations,
            l = n.allowedAutoPlacements,
            c = void 0 === l ? st : l,
            u = zt(i),
            f = u
                ? a
                    ? rt
                    : rt.filter(function (t) {
                          return zt(t) === u;
                      })
                : ot,
            d = f.filter(function (t) {
                return c.indexOf(t) >= 0;
            });
        0 === d.length && (d = f);
        var h = d.reduce(function (e, n) {
            return (
                (e[n] = Yt(t, {
                    placement: n,
                    boundary: o,
                    rootBoundary: r,
                    padding: s,
                })[ht(n)]),
                e
            );
        }, {});
        return Object.keys(h).sort(function (t, e) {
            return h[t] - h[e];
        });
    }
    var Vt = {
        name: "flip",
        enabled: !0,
        phase: "main",
        fn: function (t) {
            var e = t.state,
                n = t.options,
                i = t.name;
            if (!e.modifiersData[i]._skip) {
                for (
                    var o = n.mainAxis,
                        r = void 0 === o || o,
                        s = n.altAxis,
                        a = void 0 === s || s,
                        l = n.fallbackPlacements,
                        c = n.padding,
                        u = n.boundary,
                        f = n.rootBoundary,
                        d = n.altBoundary,
                        h = n.flipVariations,
                        p = void 0 === h || h,
                        g = n.allowedAutoPlacements,
                        m = e.options.placement,
                        v = ht(m),
                        _ =
                            l ||
                            (v !== m && p
                                ? (function (t) {
                                      if ("auto" === ht(t)) return [];
                                      var e = Nt(t);
                                      return [It(t), e, It(e)];
                                  })(m)
                                : [Nt(m)]),
                        b = [m].concat(_).reduce(function (t, n) {
                            return t.concat(
                                "auto" === ht(n)
                                    ? qt(e, {
                                          placement: n,
                                          boundary: u,
                                          rootBoundary: f,
                                          padding: c,
                                          flipVariations: p,
                                          allowedAutoPlacements: g,
                                      })
                                    : n
                            );
                        }, []),
                        y = e.rects.reference,
                        w = e.rects.popper,
                        E = new Map(),
                        T = !0,
                        k = b[0],
                        A = 0;
                    A < b.length;
                    A++
                ) {
                    var L = b[A],
                        O = ht(L),
                        D = "start" === zt(L),
                        x = [tt, et].indexOf(O) >= 0,
                        C = x ? "width" : "height",
                        S = Yt(e, {
                            placement: L,
                            boundary: u,
                            rootBoundary: f,
                            altBoundary: d,
                            padding: c,
                        }),
                        j = x ? (D ? nt : it) : D ? et : tt;
                    y[C] > w[C] && (j = Nt(j));
                    var N = Nt(j),
                        P = [];
                    if (
                        (r && P.push(S[O] <= 0),
                        a && P.push(S[j] <= 0, S[N] <= 0),
                        P.every(function (t) {
                            return t;
                        }))
                    ) {
                        (k = L), (T = !1);
                        break;
                    }
                    E.set(L, P);
                }
                if (T)
                    for (
                        var I = function (t) {
                                var e = b.find(function (e) {
                                    var n = E.get(e);
                                    if (n)
                                        return n
                                            .slice(0, t)
                                            .every(function (t) {
                                                return t;
                                            });
                                });
                                if (e) return (k = e), "break";
                            },
                            M = p ? 3 : 1;
                        M > 0 && "break" !== I(M);
                        M--
                    );
                e.placement !== k &&
                    ((e.modifiersData[i]._skip = !0),
                    (e.placement = k),
                    (e.reset = !0));
            }
        },
        requiresIfExists: ["offset"],
        data: { _skip: !1 },
    };
    function Xt(t, e, n) {
        return (
            void 0 === n && (n = { x: 0, y: 0 }),
            {
                top: t.top - e.height - n.y,
                right: t.right - e.width + n.x,
                bottom: t.bottom - e.height + n.y,
                left: t.left - e.width - n.x,
            }
        );
    }
    function Qt(t) {
        return [tt, nt, et, it].some(function (e) {
            return t[e] >= 0;
        });
    }
    var $t = {
            name: "hide",
            enabled: !0,
            phase: "main",
            requiresIfExists: ["preventOverflow"],
            fn: function (t) {
                var e = t.state,
                    n = t.name,
                    i = e.rects.reference,
                    o = e.rects.popper,
                    r = e.modifiersData.preventOverflow,
                    s = Yt(e, { elementContext: "reference" }),
                    a = Yt(e, { altBoundary: !0 }),
                    l = Xt(s, i),
                    c = Xt(a, o, r),
                    u = Qt(l),
                    f = Qt(c);
                (e.modifiersData[n] = {
                    referenceClippingOffsets: l,
                    popperEscapeOffsets: c,
                    isReferenceHidden: u,
                    hasPopperEscaped: f,
                }),
                    (e.attributes.popper = Object.assign(
                        Object.assign({}, e.attributes.popper),
                        {},
                        {
                            "data-popper-reference-hidden": u,
                            "data-popper-escaped": f,
                        }
                    ));
            },
        },
        Gt = {
            name: "offset",
            enabled: !0,
            phase: "main",
            requires: ["popperOffsets"],
            fn: function (t) {
                var e = t.state,
                    n = t.options,
                    i = t.name,
                    o = n.offset,
                    r = void 0 === o ? [0, 0] : o,
                    s = st.reduce(function (t, n) {
                        return (
                            (t[n] = (function (t, e, n) {
                                var i = ht(t),
                                    o = [it, tt].indexOf(i) >= 0 ? -1 : 1,
                                    r =
                                        "function" == typeof n
                                            ? n(
                                                  Object.assign(
                                                      Object.assign({}, e),
                                                      {},
                                                      { placement: t }
                                                  )
                                              )
                                            : n,
                                    s = r[0],
                                    a = r[1];
                                return (
                                    (s = s || 0),
                                    (a = (a || 0) * o),
                                    [it, nt].indexOf(i) >= 0
                                        ? { x: a, y: s }
                                        : { x: s, y: a }
                                );
                            })(n, e.rects, r)),
                            t
                        );
                    }, {}),
                    a = s[e.placement],
                    l = a.x,
                    c = a.y;
                null != e.modifiersData.popperOffsets &&
                    ((e.modifiersData.popperOffsets.x += l),
                    (e.modifiersData.popperOffsets.y += c)),
                    (e.modifiersData[i] = s);
            },
        },
        Zt = {
            name: "popperOffsets",
            enabled: !0,
            phase: "read",
            fn: function (t) {
                var e = t.state,
                    n = t.name;
                e.modifiersData[n] = Ft({
                    reference: e.rects.reference,
                    element: e.rects.popper,
                    strategy: "absolute",
                    placement: e.placement,
                });
            },
            data: {},
        },
        Jt = {
            name: "preventOverflow",
            enabled: !0,
            phase: "main",
            fn: function (t) {
                var e = t.state,
                    n = t.options,
                    i = t.name,
                    o = n.mainAxis,
                    r = void 0 === o || o,
                    s = n.altAxis,
                    a = void 0 !== s && s,
                    l = n.boundary,
                    c = n.rootBoundary,
                    u = n.altBoundary,
                    f = n.padding,
                    d = n.tether,
                    h = void 0 === d || d,
                    p = n.tetherOffset,
                    g = void 0 === p ? 0 : p,
                    m = Yt(e, {
                        boundary: l,
                        rootBoundary: c,
                        padding: f,
                        altBoundary: u,
                    }),
                    v = ht(e.placement),
                    _ = zt(e.placement),
                    b = !_,
                    y = Et(v),
                    w = "x" === y ? "y" : "x",
                    E = e.modifiersData.popperOffsets,
                    T = e.rects.reference,
                    k = e.rects.popper,
                    A =
                        "function" == typeof g
                            ? g(
                                  Object.assign(
                                      Object.assign({}, e.rects),
                                      {},
                                      { placement: e.placement }
                                  )
                              )
                            : g,
                    L = { x: 0, y: 0 };
                if (E) {
                    if (r) {
                        var O = "y" === y ? tt : it,
                            D = "y" === y ? et : nt,
                            x = "y" === y ? "height" : "width",
                            C = E[y],
                            S = E[y] + m[O],
                            j = E[y] - m[D],
                            N = h ? -k[x] / 2 : 0,
                            P = "start" === _ ? T[x] : k[x],
                            I = "start" === _ ? -k[x] : -T[x],
                            M = e.elements.arrow,
                            B = h && M ? pt(M) : { width: 0, height: 0 },
                            H = e.modifiersData["arrow#persistent"]
                                ? e.modifiersData["arrow#persistent"].padding
                                : { top: 0, right: 0, bottom: 0, left: 0 },
                            R = H[O],
                            W = H[D],
                            K = Tt(0, T[x], B[x]),
                            U = b ? T[x] / 2 - N - K - R - A : P - K - R - A,
                            z = b ? -T[x] / 2 + N + K + W + A : I + K + W + A,
                            F = e.elements.arrow && wt(e.elements.arrow),
                            Y = F
                                ? "y" === y
                                    ? F.clientTop || 0
                                    : F.clientLeft || 0
                                : 0,
                            q = e.modifiersData.offset
                                ? e.modifiersData.offset[e.placement][y]
                                : 0,
                            V = E[y] + U - q - Y,
                            X = E[y] + z - q,
                            Q = Tt(
                                h ? Math.min(S, V) : S,
                                C,
                                h ? Math.max(j, X) : j
                            );
                        (E[y] = Q), (L[y] = Q - C);
                    }
                    if (a) {
                        var $ = "x" === y ? tt : it,
                            G = "x" === y ? et : nt,
                            Z = E[w],
                            J = Tt(Z + m[$], Z, Z - m[G]);
                        (E[w] = J), (L[w] = J - Z);
                    }
                    e.modifiersData[i] = L;
                }
            },
            requiresIfExists: ["offset"],
        };
    function te(t, e, n) {
        void 0 === n && (n = !1);
        var i,
            o,
            r = _t(e),
            s = Mt(t),
            a = ft(e),
            l = { scrollLeft: 0, scrollTop: 0 },
            c = { x: 0, y: 0 };
        return (
            (a || (!a && !n)) &&
                (("body" !== lt(e) || Rt(r)) &&
                    (l =
                        (i = e) !== ct(i) && ft(i)
                            ? {
                                  scrollLeft: (o = i).scrollLeft,
                                  scrollTop: o.scrollTop,
                              }
                            : Bt(i)),
                ft(e)
                    ? (((c = Mt(e)).x += e.clientLeft), (c.y += e.clientTop))
                    : r && (c.x = Ht(r))),
            {
                x: s.left + l.scrollLeft - c.x,
                y: s.top + l.scrollTop - c.y,
                width: s.width,
                height: s.height,
            }
        );
    }
    var ee = { placement: "bottom", modifiers: [], strategy: "absolute" };
    function ne() {
        for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
            e[n] = arguments[n];
        return !e.some(function (t) {
            return !(t && "function" == typeof t.getBoundingClientRect);
        });
    }
    function ie(t) {
        void 0 === t && (t = {});
        var e = t,
            n = e.defaultModifiers,
            i = void 0 === n ? [] : n,
            o = e.defaultOptions,
            r = void 0 === o ? ee : o;
        return function (t, e, n) {
            void 0 === n && (n = r);
            var o,
                s,
                a = {
                    placement: "bottom",
                    orderedModifiers: [],
                    options: Object.assign(Object.assign({}, ee), r),
                    modifiersData: {},
                    elements: { reference: t, popper: e },
                    attributes: {},
                    styles: {},
                },
                l = [],
                c = !1,
                u = {
                    state: a,
                    setOptions: function (n) {
                        f(),
                            (a.options = Object.assign(
                                Object.assign(Object.assign({}, r), a.options),
                                n
                            )),
                            (a.scrollParents = {
                                reference: ut(t)
                                    ? Wt(t)
                                    : t.contextElement
                                    ? Wt(t.contextElement)
                                    : [],
                                popper: Wt(e),
                            });
                        var o,
                            s,
                            c = (function (t) {
                                var e = (function (t) {
                                    var e = new Map(),
                                        n = new Set(),
                                        i = [];
                                    return (
                                        t.forEach(function (t) {
                                            e.set(t.name, t);
                                        }),
                                        t.forEach(function (t) {
                                            n.has(t.name) ||
                                                (function t(o) {
                                                    n.add(o.name),
                                                        []
                                                            .concat(
                                                                o.requires ||
                                                                    [],
                                                                o.requiresIfExists ||
                                                                    []
                                                            )
                                                            .forEach(function (
                                                                i
                                                            ) {
                                                                if (!n.has(i)) {
                                                                    var o =
                                                                        e.get(
                                                                            i
                                                                        );
                                                                    o && t(o);
                                                                }
                                                            }),
                                                        i.push(o);
                                                })(t);
                                        }),
                                        i
                                    );
                                })(t);
                                return at.reduce(function (t, n) {
                                    return t.concat(
                                        e.filter(function (t) {
                                            return t.phase === n;
                                        })
                                    );
                                }, []);
                            })(
                                ((o = [].concat(i, a.options.modifiers)),
                                (s = o.reduce(function (t, e) {
                                    var n = t[e.name];
                                    return (
                                        (t[e.name] = n
                                            ? Object.assign(
                                                  Object.assign(
                                                      Object.assign({}, n),
                                                      e
                                                  ),
                                                  {},
                                                  {
                                                      options: Object.assign(
                                                          Object.assign(
                                                              {},
                                                              n.options
                                                          ),
                                                          e.options
                                                      ),
                                                      data: Object.assign(
                                                          Object.assign(
                                                              {},
                                                              n.data
                                                          ),
                                                          e.data
                                                      ),
                                                  }
                                              )
                                            : e),
                                        t
                                    );
                                }, {})),
                                Object.keys(s).map(function (t) {
                                    return s[t];
                                }))
                            );
                        return (
                            (a.orderedModifiers = c.filter(function (t) {
                                return t.enabled;
                            })),
                            a.orderedModifiers.forEach(function (t) {
                                var e = t.name,
                                    n = t.options,
                                    i = void 0 === n ? {} : n,
                                    o = t.effect;
                                if ("function" == typeof o) {
                                    var r = o({
                                        state: a,
                                        name: e,
                                        instance: u,
                                        options: i,
                                    });
                                    l.push(r || function () {});
                                }
                            }),
                            u.update()
                        );
                    },
                    forceUpdate: function () {
                        if (!c) {
                            var t = a.elements,
                                e = t.reference,
                                n = t.popper;
                            if (ne(e, n)) {
                                (a.rects = {
                                    reference: te(
                                        e,
                                        wt(n),
                                        "fixed" === a.options.strategy
                                    ),
                                    popper: pt(n),
                                }),
                                    (a.reset = !1),
                                    (a.placement = a.options.placement),
                                    a.orderedModifiers.forEach(function (t) {
                                        return (a.modifiersData[t.name] =
                                            Object.assign({}, t.data));
                                    });
                                for (
                                    var i = 0;
                                    i < a.orderedModifiers.length;
                                    i++
                                )
                                    if (!0 !== a.reset) {
                                        var o = a.orderedModifiers[i],
                                            r = o.fn,
                                            s = o.options,
                                            l = void 0 === s ? {} : s,
                                            f = o.name;
                                        "function" == typeof r &&
                                            (a =
                                                r({
                                                    state: a,
                                                    options: l,
                                                    name: f,
                                                    instance: u,
                                                }) || a);
                                    } else (a.reset = !1), (i = -1);
                            }
                        }
                    },
                    update:
                        ((o = function () {
                            return new Promise(function (t) {
                                u.forceUpdate(), t(a);
                            });
                        }),
                        function () {
                            return (
                                s ||
                                    (s = new Promise(function (t) {
                                        Promise.resolve().then(function () {
                                            (s = void 0), t(o());
                                        });
                                    })),
                                s
                            );
                        }),
                    destroy: function () {
                        f(), (c = !0);
                    },
                };
            if (!ne(t, e)) return u;
            function f() {
                l.forEach(function (t) {
                    return t();
                }),
                    (l = []);
            }
            return (
                u.setOptions(n).then(function (t) {
                    !c && n.onFirstUpdate && n.onFirstUpdate(t);
                }),
                u
            );
        };
    }
    var oe = ie(),
        re = ie({ defaultModifiers: [St, Zt, xt, dt] }),
        se = ie({ defaultModifiers: [St, Zt, xt, dt, Gt, Vt, Jt, Lt, $t] }),
        ae = Object.freeze({
            __proto__: null,
            popperGenerator: ie,
            detectOverflow: Yt,
            createPopperBase: oe,
            createPopper: se,
            createPopperLite: re,
            top: tt,
            bottom: et,
            right: nt,
            left: it,
            auto: "auto",
            basePlacements: ot,
            start: "start",
            end: "end",
            clippingParents: "clippingParents",
            viewport: "viewport",
            popper: "popper",
            reference: "reference",
            variationPlacements: rt,
            placements: st,
            beforeRead: "beforeRead",
            read: "read",
            afterRead: "afterRead",
            beforeMain: "beforeMain",
            main: "main",
            afterMain: "afterMain",
            beforeWrite: "beforeWrite",
            write: "write",
            afterWrite: "afterWrite",
            modifierPhases: at,
            applyStyles: dt,
            arrow: Lt,
            computeStyles: xt,
            eventListeners: St,
            flip: Vt,
            hide: $t,
            offset: Gt,
            popperOffsets: Zt,
            preventOverflow: Jt,
        }),
        le = new RegExp("ArrowUp|ArrowDown|Escape"),
        ce = b ? "top-end" : "top-start",
        ue = b ? "top-start" : "top-end",
        fe = b ? "bottom-end" : "bottom-start",
        de = b ? "bottom-start" : "bottom-end",
        he = b ? "left-start" : "right-start",
        pe = b ? "right-start" : "left-start",
        ge = {
            offset: [0, 2],
            flip: !0,
            boundary: "clippingParents",
            reference: "toggle",
            display: "dynamic",
            popperConfig: null,
        },
        me = {
            offset: "(array|string|function)",
            flip: "boolean",
            boundary: "(string|element)",
            reference: "(string|element|object)",
            display: "string",
            popperConfig: "(null|object|function)",
        },
        ve = (function (t) {
            function o(e, n) {
                var i;
                return (
                    ((i = t.call(this, e) || this)._popper = null),
                    (i._config = i._getConfig(n)),
                    (i._menu = i._getMenuElement()),
                    (i._inNavbar = i._detectNavbar()),
                    i._addEventListeners(),
                    i
                );
            }
            i(o, t);
            var r = o.prototype;
            return (
                (r.toggle = function () {
                    if (
                        !this._element.disabled &&
                        !this._element.classList.contains("disabled")
                    ) {
                        var t = this._element.classList.contains("show");
                        o.clearMenus(), t || this.show();
                    }
                }),
                (r.show = function () {
                    if (
                        !(
                            this._element.disabled ||
                            this._element.classList.contains("disabled") ||
                            this._menu.classList.contains("show")
                        )
                    ) {
                        var t = o.getParentFromElement(this._element),
                            e = { relatedTarget: this._element };
                        if (
                            !B.trigger(this._element, "show.bs.dropdown", e)
                                .defaultPrevented
                        ) {
                            if (this._inNavbar)
                                z.setDataAttribute(
                                    this._menu,
                                    "popper",
                                    "none"
                                );
                            else {
                                if (void 0 === ae)
                                    throw new TypeError(
                                        "Bootstrap's dropdowns require Popper (https://popper.js.org)"
                                    );
                                var n = this._element;
                                "parent" === this._config.reference
                                    ? (n = t)
                                    : d(this._config.reference)
                                    ? ((n = this._config.reference),
                                      void 0 !==
                                          this._config.reference.jquery &&
                                          (n = this._config.reference[0]))
                                    : "object" ==
                                          typeof this._config.reference &&
                                      (n = this._config.reference);
                                var i = this._getPopperConfig(),
                                    r = i.modifiers.find(function (t) {
                                        return (
                                            "applyStyles" === t.name &&
                                            !1 === t.enabled
                                        );
                                    });
                                (this._popper = se(n, this._menu, i)),
                                    r &&
                                        z.setDataAttribute(
                                            this._menu,
                                            "popper",
                                            "static"
                                        );
                            }
                            var s;
                            "ontouchstart" in document.documentElement &&
                                !t.closest(".navbar-nav") &&
                                (s = []).concat
                                    .apply(s, document.body.children)
                                    .forEach(function (t) {
                                        return B.on(
                                            t,
                                            "mouseover",
                                            null,
                                            function () {}
                                        );
                                    }),
                                this._element.focus(),
                                this._element.setAttribute("aria-expanded", !0),
                                this._menu.classList.toggle("show"),
                                this._element.classList.toggle("show"),
                                B.trigger(
                                    this._element,
                                    "shown.bs.dropdown",
                                    e
                                );
                        }
                    }
                }),
                (r.hide = function () {
                    if (
                        !this._element.disabled &&
                        !this._element.classList.contains("disabled") &&
                        this._menu.classList.contains("show")
                    ) {
                        var t = { relatedTarget: this._element };
                        B.trigger(this._element, "hide.bs.dropdown", t)
                            .defaultPrevented ||
                            (this._popper && this._popper.destroy(),
                            this._menu.classList.toggle("show"),
                            this._element.classList.toggle("show"),
                            z.removeDataAttribute(this._menu, "popper"),
                            B.trigger(this._element, "hidden.bs.dropdown", t));
                    }
                }),
                (r.dispose = function () {
                    t.prototype.dispose.call(this),
                        B.off(this._element, ".bs.dropdown"),
                        (this._menu = null),
                        this._popper &&
                            (this._popper.destroy(), (this._popper = null));
                }),
                (r.update = function () {
                    (this._inNavbar = this._detectNavbar()),
                        this._popper && this._popper.update();
                }),
                (r._addEventListeners = function () {
                    var t = this;
                    B.on(this._element, "click.bs.dropdown", function (e) {
                        e.preventDefault(), e.stopPropagation(), t.toggle();
                    });
                }),
                (r._getConfig = function (t) {
                    if (
                        ((t = n(
                            {},
                            this.constructor.Default,
                            z.getDataAttributes(this._element),
                            t
                        )),
                        p("dropdown", t, this.constructor.DefaultType),
                        "object" == typeof t.reference &&
                            !d(t.reference) &&
                            "function" !=
                                typeof t.reference.getBoundingClientRect)
                    )
                        throw new TypeError(
                            "dropdown".toUpperCase() +
                                ': Option "reference" provided type "object" without a required "getBoundingClientRect" method.'
                        );
                    return t;
                }),
                (r._getMenuElement = function () {
                    return (function (t, e) {
                        for (var n = t.nextElementSibling; n; ) {
                            if (n.matches(e)) return [n];
                            n = n.nextElementSibling;
                        }
                        return [];
                    })(this._element, ".dropdown-menu")[0];
                }),
                (r._getPlacement = function () {
                    var t = this._element.parentNode;
                    if (t.classList.contains("dropend")) return he;
                    if (t.classList.contains("dropstart")) return pe;
                    var e =
                        "end" ===
                        getComputedStyle(this._menu)
                            .getPropertyValue("--bs-position")
                            .trim();
                    return t.classList.contains("dropup")
                        ? e
                            ? ue
                            : ce
                        : e
                        ? de
                        : fe;
                }),
                (r._detectNavbar = function () {
                    return null !== this._element.closest(".navbar");
                }),
                (r._getOffset = function () {
                    var t = this,
                        e = this._config.offset;
                    return "string" == typeof e
                        ? e.split(",").map(function (t) {
                              return Number.parseInt(t, 10);
                          })
                        : "function" == typeof e
                        ? function (n) {
                              return e(n, t._element);
                          }
                        : e;
                }),
                (r._getPopperConfig = function () {
                    var t = {
                        placement: this._getPlacement(),
                        modifiers: [
                            {
                                name: "preventOverflow",
                                options: {
                                    altBoundary: this._config.flip,
                                    boundary: this._config.boundary,
                                },
                            },
                            {
                                name: "offset",
                                options: { offset: this._getOffset() },
                            },
                        ],
                    };
                    return (
                        "static" === this._config.display &&
                            (t.modifiers = [
                                { name: "applyStyles", enabled: !1 },
                            ]),
                        n(
                            {},
                            t,
                            "function" == typeof this._config.popperConfig
                                ? this._config.popperConfig(t)
                                : this._config.popperConfig
                        )
                    );
                }),
                (o.dropdownInterface = function (t, e) {
                    var n = T(t, "bs.dropdown");
                    if (
                        (n || (n = new o(t, "object" == typeof e ? e : null)),
                        "string" == typeof e)
                    ) {
                        if (void 0 === n[e])
                            throw new TypeError('No method named "' + e + '"');
                        n[e]();
                    }
                }),
                (o.jQueryInterface = function (t) {
                    return this.each(function () {
                        o.dropdownInterface(this, t);
                    });
                }),
                (o.clearMenus = function (t) {
                    if (
                        !t ||
                        (2 !== t.button &&
                            ("keyup" !== t.type || "Tab" === t.key))
                    )
                        for (
                            var e = F('[data-bs-toggle="dropdown"]'),
                                n = 0,
                                i = e.length;
                            n < i;
                            n++
                        ) {
                            var o = T(e[n], "bs.dropdown"),
                                r = { relatedTarget: e[n] };
                            if (
                                (t && "click" === t.type && (r.clickEvent = t),
                                o)
                            ) {
                                var s,
                                    a = o._menu;
                                if (
                                    e[n].classList.contains("show") &&
                                    !(
                                        (t &&
                                            (("click" === t.type &&
                                                /input|textarea/i.test(
                                                    t.target.tagName
                                                )) ||
                                                ("keyup" === t.type &&
                                                    "Tab" === t.key)) &&
                                            a.contains(t.target)) ||
                                        B.trigger(e[n], "hide.bs.dropdown", r)
                                            .defaultPrevented
                                    )
                                )
                                    "ontouchstart" in
                                        document.documentElement &&
                                        (s = []).concat
                                            .apply(s, document.body.children)
                                            .forEach(function (t) {
                                                return B.off(
                                                    t,
                                                    "mouseover",
                                                    null,
                                                    function () {}
                                                );
                                            }),
                                        e[n].setAttribute(
                                            "aria-expanded",
                                            "false"
                                        ),
                                        o._popper && o._popper.destroy(),
                                        a.classList.remove("show"),
                                        e[n].classList.remove("show"),
                                        z.removeDataAttribute(a, "popper"),
                                        B.trigger(
                                            e[n],
                                            "hidden.bs.dropdown",
                                            r
                                        );
                            }
                        }
                }),
                (o.getParentFromElement = function (t) {
                    return c(t) || t.parentNode;
                }),
                (o.dataApiKeydownHandler = function (t) {
                    if (
                        !(/input|textarea/i.test(t.target.tagName)
                            ? "Space" === t.key ||
                              ("Escape" !== t.key &&
                                  (("ArrowDown" !== t.key &&
                                      "ArrowUp" !== t.key) ||
                                      t.target.closest(".dropdown-menu")))
                            : !le.test(t.key)) &&
                        (t.preventDefault(),
                        t.stopPropagation(),
                        !this.disabled && !this.classList.contains("disabled"))
                    ) {
                        var e = o.getParentFromElement(this),
                            n = this.classList.contains("show");
                        if ("Escape" === t.key)
                            return (
                                (this.matches('[data-bs-toggle="dropdown"]')
                                    ? this
                                    : V(this, '[data-bs-toggle="dropdown"]')[0]
                                ).focus(),
                                void o.clearMenus()
                            );
                        if (n || ("ArrowUp" !== t.key && "ArrowDown" !== t.key))
                            if (n && "Space" !== t.key) {
                                var i = F(
                                    ".dropdown-menu .dropdown-item:not(.disabled):not(:disabled)",
                                    e
                                ).filter(g);
                                if (i.length) {
                                    var r = i.indexOf(t.target);
                                    "ArrowUp" === t.key && r > 0 && r--,
                                        "ArrowDown" === t.key &&
                                            r < i.length - 1 &&
                                            r++,
                                        i[(r = -1 === r ? 0 : r)].focus();
                                }
                            } else o.clearMenus();
                        else
                            (this.matches('[data-bs-toggle="dropdown"]')
                                ? this
                                : V(this, '[data-bs-toggle="dropdown"]')[0]
                            ).click();
                    }
                }),
                e(o, null, [
                    {
                        key: "Default",
                        get: function () {
                            return ge;
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return me;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.dropdown";
                        },
                    },
                ]),
                o
            );
        })(H);
    B.on(
        document,
        "keydown.bs.dropdown.data-api",
        '[data-bs-toggle="dropdown"]',
        ve.dataApiKeydownHandler
    ),
        B.on(
            document,
            "keydown.bs.dropdown.data-api",
            ".dropdown-menu",
            ve.dataApiKeydownHandler
        ),
        B.on(document, "click.bs.dropdown.data-api", ve.clearMenus),
        B.on(document, "keyup.bs.dropdown.data-api", ve.clearMenus),
        B.on(
            document,
            "click.bs.dropdown.data-api",
            '[data-bs-toggle="dropdown"]',
            function (t) {
                t.preventDefault(),
                    t.stopPropagation(),
                    ve.dropdownInterface(this, "toggle");
            }
        ),
        B.on(
            document,
            "click.bs.dropdown.data-api",
            ".dropdown form",
            function (t) {
                return t.stopPropagation();
            }
        ),
        y("dropdown", ve);
    var _e = { backdrop: !0, keyboard: !0, focus: !0 },
        be = {
            backdrop: "(boolean|string)",
            keyboard: "boolean",
            focus: "boolean",
        },
        ye = (function (t) {
            function o(e, n) {
                var i;
                return (
                    ((i = t.call(this, e) || this)._config = i._getConfig(n)),
                    (i._dialog = Y(".modal-dialog", e)),
                    (i._backdrop = null),
                    (i._isShown = !1),
                    (i._isBodyOverflowing = !1),
                    (i._ignoreBackdropClick = !1),
                    (i._isTransitioning = !1),
                    (i._scrollbarWidth = 0),
                    i
                );
            }
            i(o, t);
            var r = o.prototype;
            return (
                (r.toggle = function (t) {
                    return this._isShown ? this.hide() : this.show(t);
                }),
                (r.show = function (t) {
                    var e = this;
                    if (!this._isShown && !this._isTransitioning) {
                        this._element.classList.contains("fade") &&
                            (this._isTransitioning = !0);
                        var n = B.trigger(this._element, "show.bs.modal", {
                            relatedTarget: t,
                        });
                        this._isShown ||
                            n.defaultPrevented ||
                            ((this._isShown = !0),
                            this._checkScrollbar(),
                            this._setScrollbar(),
                            this._adjustDialog(),
                            this._setEscapeEvent(),
                            this._setResizeEvent(),
                            B.on(
                                this._element,
                                "click.dismiss.bs.modal",
                                '[data-bs-dismiss="modal"]',
                                function (t) {
                                    return e.hide(t);
                                }
                            ),
                            B.on(
                                this._dialog,
                                "mousedown.dismiss.bs.modal",
                                function () {
                                    B.one(
                                        e._element,
                                        "mouseup.dismiss.bs.modal",
                                        function (t) {
                                            t.target === e._element &&
                                                (e._ignoreBackdropClick = !0);
                                        }
                                    );
                                }
                            ),
                            this._showBackdrop(function () {
                                return e._showElement(t);
                            }));
                    }
                }),
                (r.hide = function (t) {
                    var e = this;
                    if (
                        (t && t.preventDefault(),
                        this._isShown &&
                            !this._isTransitioning &&
                            !B.trigger(this._element, "hide.bs.modal")
                                .defaultPrevented)
                    ) {
                        this._isShown = !1;
                        var n = this._element.classList.contains("fade");
                        if (
                            (n && (this._isTransitioning = !0),
                            this._setEscapeEvent(),
                            this._setResizeEvent(),
                            B.off(document, "focusin.bs.modal"),
                            this._element.classList.remove("show"),
                            B.off(this._element, "click.dismiss.bs.modal"),
                            B.off(this._dialog, "mousedown.dismiss.bs.modal"),
                            n)
                        ) {
                            var i = u(this._element);
                            B.one(this._element, "transitionend", function (t) {
                                return e._hideModal(t);
                            }),
                                h(this._element, i);
                        } else this._hideModal();
                    }
                }),
                (r.dispose = function () {
                    [window, this._element, this._dialog].forEach(function (t) {
                        return B.off(t, ".bs.modal");
                    }),
                        t.prototype.dispose.call(this),
                        B.off(document, "focusin.bs.modal"),
                        (this._config = null),
                        (this._dialog = null),
                        (this._backdrop = null),
                        (this._isShown = null),
                        (this._isBodyOverflowing = null),
                        (this._ignoreBackdropClick = null),
                        (this._isTransitioning = null),
                        (this._scrollbarWidth = null);
                }),
                (r.handleUpdate = function () {
                    this._adjustDialog();
                }),
                (r._getConfig = function (t) {
                    return (t = n({}, _e, t)), p("modal", t, be), t;
                }),
                (r._showElement = function (t) {
                    var e = this,
                        n = this._element.classList.contains("fade"),
                        i = Y(".modal-body", this._dialog);
                    (this._element.parentNode &&
                        this._element.parentNode.nodeType ===
                            Node.ELEMENT_NODE) ||
                        document.body.appendChild(this._element),
                        (this._element.style.display = "block"),
                        this._element.removeAttribute("aria-hidden"),
                        this._element.setAttribute("aria-modal", !0),
                        this._element.setAttribute("role", "dialog"),
                        (this._element.scrollTop = 0),
                        i && (i.scrollTop = 0),
                        n && v(this._element),
                        this._element.classList.add("show"),
                        this._config.focus && this._enforceFocus();
                    var o = function () {
                        e._config.focus && e._element.focus(),
                            (e._isTransitioning = !1),
                            B.trigger(e._element, "shown.bs.modal", {
                                relatedTarget: t,
                            });
                    };
                    if (n) {
                        var r = u(this._dialog);
                        B.one(this._dialog, "transitionend", o),
                            h(this._dialog, r);
                    } else o();
                }),
                (r._enforceFocus = function () {
                    var t = this;
                    B.off(document, "focusin.bs.modal"),
                        B.on(document, "focusin.bs.modal", function (e) {
                            document === e.target ||
                                t._element === e.target ||
                                t._element.contains(e.target) ||
                                t._element.focus();
                        });
                }),
                (r._setEscapeEvent = function () {
                    var t = this;
                    this._isShown
                        ? B.on(
                              this._element,
                              "keydown.dismiss.bs.modal",
                              function (e) {
                                  t._config.keyboard && "Escape" === e.key
                                      ? (e.preventDefault(), t.hide())
                                      : t._config.keyboard ||
                                        "Escape" !== e.key ||
                                        t._triggerBackdropTransition();
                              }
                          )
                        : B.off(this._element, "keydown.dismiss.bs.modal");
                }),
                (r._setResizeEvent = function () {
                    var t = this;
                    this._isShown
                        ? B.on(window, "resize.bs.modal", function () {
                              return t._adjustDialog();
                          })
                        : B.off(window, "resize.bs.modal");
                }),
                (r._hideModal = function () {
                    var t = this;
                    (this._element.style.display = "none"),
                        this._element.setAttribute("aria-hidden", !0),
                        this._element.removeAttribute("aria-modal"),
                        this._element.removeAttribute("role"),
                        (this._isTransitioning = !1),
                        this._showBackdrop(function () {
                            document.body.classList.remove("modal-open"),
                                t._resetAdjustments(),
                                t._resetScrollbar(),
                                B.trigger(t._element, "hidden.bs.modal");
                        });
                }),
                (r._removeBackdrop = function () {
                    this._backdrop.parentNode.removeChild(this._backdrop),
                        (this._backdrop = null);
                }),
                (r._showBackdrop = function (t) {
                    var e = this,
                        n = this._element.classList.contains("fade")
                            ? "fade"
                            : "";
                    if (this._isShown && this._config.backdrop) {
                        if (
                            ((this._backdrop = document.createElement("div")),
                            (this._backdrop.className = "modal-backdrop"),
                            n && this._backdrop.classList.add(n),
                            document.body.appendChild(this._backdrop),
                            B.on(
                                this._element,
                                "click.dismiss.bs.modal",
                                function (t) {
                                    e._ignoreBackdropClick
                                        ? (e._ignoreBackdropClick = !1)
                                        : t.target === t.currentTarget &&
                                          ("static" === e._config.backdrop
                                              ? e._triggerBackdropTransition()
                                              : e.hide());
                                }
                            ),
                            n && v(this._backdrop),
                            this._backdrop.classList.add("show"),
                            !n)
                        )
                            return void t();
                        var i = u(this._backdrop);
                        B.one(this._backdrop, "transitionend", t),
                            h(this._backdrop, i);
                    } else if (!this._isShown && this._backdrop) {
                        this._backdrop.classList.remove("show");
                        var o = function () {
                            e._removeBackdrop(), t();
                        };
                        if (this._element.classList.contains("fade")) {
                            var r = u(this._backdrop);
                            B.one(this._backdrop, "transitionend", o),
                                h(this._backdrop, r);
                        } else o();
                    } else t();
                }),
                (r._triggerBackdropTransition = function () {
                    var t = this;
                    if (
                        !B.trigger(this._element, "hidePrevented.bs.modal")
                            .defaultPrevented
                    ) {
                        var e =
                            this._element.scrollHeight >
                            document.documentElement.clientHeight;
                        e || (this._element.style.overflowY = "hidden"),
                            this._element.classList.add("modal-static");
                        var n = u(this._dialog);
                        B.off(this._element, "transitionend"),
                            B.one(this._element, "transitionend", function () {
                                t._element.classList.remove("modal-static"),
                                    e ||
                                        (B.one(
                                            t._element,
                                            "transitionend",
                                            function () {
                                                t._element.style.overflowY = "";
                                            }
                                        ),
                                        h(t._element, n));
                            }),
                            h(this._element, n),
                            this._element.focus();
                    }
                }),
                (r._adjustDialog = function () {
                    var t =
                        this._element.scrollHeight >
                        document.documentElement.clientHeight;
                    ((!this._isBodyOverflowing && t && !b) ||
                        (this._isBodyOverflowing && !t && b)) &&
                        (this._element.style.paddingLeft =
                            this._scrollbarWidth + "px"),
                        ((this._isBodyOverflowing && !t && !b) ||
                            (!this._isBodyOverflowing && t && b)) &&
                            (this._element.style.paddingRight =
                                this._scrollbarWidth + "px");
                }),
                (r._resetAdjustments = function () {
                    (this._element.style.paddingLeft = ""),
                        (this._element.style.paddingRight = "");
                }),
                (r._checkScrollbar = function () {
                    var t = document.body.getBoundingClientRect();
                    (this._isBodyOverflowing =
                        Math.round(t.left + t.right) < window.innerWidth),
                        (this._scrollbarWidth = this._getScrollbarWidth());
                }),
                (r._setScrollbar = function () {
                    var t = this;
                    this._isBodyOverflowing &&
                        (this._setElementAttributes(
                            ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                            "paddingRight",
                            function (e) {
                                return e + t._scrollbarWidth;
                            }
                        ),
                        this._setElementAttributes(
                            ".sticky-top",
                            "marginRight",
                            function (e) {
                                return e - t._scrollbarWidth;
                            }
                        ),
                        this._setElementAttributes(
                            "body",
                            "paddingRight",
                            function (e) {
                                return e + t._scrollbarWidth;
                            }
                        )),
                        document.body.classList.add("modal-open");
                }),
                (r._setElementAttributes = function (t, e, n) {
                    F(t).forEach(function (t) {
                        var i = t.style[e],
                            o = window.getComputedStyle(t)[e];
                        z.setDataAttribute(t, e, i),
                            (t.style[e] = n(Number.parseFloat(o)) + "px");
                    });
                }),
                (r._resetScrollbar = function () {
                    this._resetElementAttributes(
                        ".fixed-top, .fixed-bottom, .is-fixed, .sticky-top",
                        "paddingRight"
                    ),
                        this._resetElementAttributes(
                            ".sticky-top",
                            "marginRight"
                        ),
                        this._resetElementAttributes("body", "paddingRight");
                }),
                (r._resetElementAttributes = function (t, e) {
                    F(t).forEach(function (t) {
                        var n = z.getDataAttribute(t, e);
                        void 0 === n && t === document.body
                            ? (t.style[e] = "")
                            : (z.removeDataAttribute(t, e), (t.style[e] = n));
                    });
                }),
                (r._getScrollbarWidth = function () {
                    var t = document.createElement("div");
                    (t.className = "modal-scrollbar-measure"),
                        document.body.appendChild(t);
                    var e = t.getBoundingClientRect().width - t.clientWidth;
                    return document.body.removeChild(t), e;
                }),
                (o.jQueryInterface = function (t, e) {
                    return this.each(function () {
                        var i = T(this, "bs.modal"),
                            r = n(
                                {},
                                _e,
                                z.getDataAttributes(this),
                                "object" == typeof t && t ? t : {}
                            );
                        if ((i || (i = new o(this, r)), "string" == typeof t)) {
                            if (void 0 === i[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                );
                            i[t](e);
                        }
                    });
                }),
                e(o, null, [
                    {
                        key: "Default",
                        get: function () {
                            return _e;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.modal";
                        },
                    },
                ]),
                o
            );
        })(H);
    B.on(
        document,
        "click.bs.modal.data-api",
        '[data-bs-toggle="modal"]',
        function (t) {
            var e = this,
                i = c(this);
            ("A" !== this.tagName && "AREA" !== this.tagName) ||
                t.preventDefault(),
                B.one(i, "show.bs.modal", function (t) {
                    t.defaultPrevented ||
                        B.one(i, "hidden.bs.modal", function () {
                            g(e) && e.focus();
                        });
                });
            var o = T(i, "bs.modal");
            if (!o) {
                var r = n(
                    {},
                    z.getDataAttributes(i),
                    z.getDataAttributes(this)
                );
                o = new ye(i, r);
            }
            o.toggle(this);
        }
    ),
        y("modal", ye);
    var we = new Set([
            "background",
            "cite",
            "href",
            "itemtype",
            "longdesc",
            "poster",
            "src",
            "xlink:href",
        ]),
        Ee = /^(?:(?:https?|mailto|ftp|tel|file):|[^#&/:?]*(?:[#/?]|$))/gi,
        Te =
            /^data:(?:image\/(?:bmp|gif|jpeg|jpg|png|tiff|webp)|video\/(?:mpeg|mp4|ogg|webm)|audio\/(?:mp3|oga|ogg|opus));base64,[\d+/a-z]+=*$/i;
    function ke(t, e, n) {
        var i;
        if (!t.length) return t;
        if (n && "function" == typeof n) return n(t);
        for (
            var o = new window.DOMParser().parseFromString(t, "text/html"),
                r = Object.keys(e),
                s = (i = []).concat.apply(i, o.body.querySelectorAll("*")),
                a = function (t, n) {
                    var i,
                        o = s[t],
                        a = o.nodeName.toLowerCase();
                    if (!r.includes(a))
                        return o.parentNode.removeChild(o), "continue";
                    var l = (i = []).concat.apply(i, o.attributes),
                        c = [].concat(e["*"] || [], e[a] || []);
                    l.forEach(function (t) {
                        (function (t, e) {
                            var n = t.nodeName.toLowerCase();
                            if (e.includes(n))
                                return (
                                    !we.has(n) ||
                                    Boolean(
                                        Ee.test(t.nodeValue) ||
                                            Te.test(t.nodeValue)
                                    )
                                );
                            for (
                                var i = e.filter(function (t) {
                                        return t instanceof RegExp;
                                    }),
                                    o = 0,
                                    r = i.length;
                                o < r;
                                o++
                            )
                                if (i[o].test(n)) return !0;
                            return !1;
                        })(t, c) || o.removeAttribute(t.nodeName);
                    });
                },
                l = 0,
                c = s.length;
            l < c;
            l++
        )
            a(l);
        return o.body.innerHTML;
    }
    var Ae = new RegExp("(^|\\s)bs-tooltip\\S+", "g"),
        Le = new Set(["sanitize", "allowList", "sanitizeFn"]),
        Oe = {
            animation: "boolean",
            template: "string",
            title: "(string|element|function)",
            trigger: "string",
            delay: "(number|object)",
            html: "boolean",
            selector: "(string|boolean)",
            placement: "(string|function)",
            offset: "(array|string|function)",
            container: "(string|element|boolean)",
            fallbackPlacements: "array",
            boundary: "(string|element)",
            customClass: "(string|function)",
            sanitize: "boolean",
            sanitizeFn: "(null|function)",
            allowList: "object",
            popperConfig: "(null|object|function)",
        },
        De = {
            AUTO: "auto",
            TOP: "top",
            RIGHT: b ? "left" : "right",
            BOTTOM: "bottom",
            LEFT: b ? "right" : "left",
        },
        xe = {
            animation: !0,
            template:
                '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            trigger: "hover focus",
            title: "",
            delay: 0,
            html: !1,
            selector: !1,
            placement: "top",
            offset: [0, 0],
            container: !1,
            fallbackPlacements: ["top", "right", "bottom", "left"],
            boundary: "clippingParents",
            customClass: "",
            sanitize: !0,
            sanitizeFn: null,
            allowList: {
                "*": ["class", "dir", "id", "lang", "role", /^aria-[\w-]*$/i],
                a: ["target", "href", "title", "rel"],
                area: [],
                b: [],
                br: [],
                col: [],
                code: [],
                div: [],
                em: [],
                hr: [],
                h1: [],
                h2: [],
                h3: [],
                h4: [],
                h5: [],
                h6: [],
                i: [],
                img: ["src", "srcset", "alt", "title", "width", "height"],
                li: [],
                ol: [],
                p: [],
                pre: [],
                s: [],
                small: [],
                span: [],
                sub: [],
                sup: [],
                strong: [],
                u: [],
                ul: [],
            },
            popperConfig: null,
        },
        Ce = {
            HIDE: "hide.bs.tooltip",
            HIDDEN: "hidden.bs.tooltip",
            SHOW: "show.bs.tooltip",
            SHOWN: "shown.bs.tooltip",
            INSERTED: "inserted.bs.tooltip",
            CLICK: "click.bs.tooltip",
            FOCUSIN: "focusin.bs.tooltip",
            FOCUSOUT: "focusout.bs.tooltip",
            MOUSEENTER: "mouseenter.bs.tooltip",
            MOUSELEAVE: "mouseleave.bs.tooltip",
        },
        Se = (function (t) {
            function o(e, n) {
                var i;
                if (void 0 === ae)
                    throw new TypeError(
                        "Bootstrap's tooltips require Popper (https://popper.js.org)"
                    );
                return (
                    ((i = t.call(this, e) || this)._isEnabled = !0),
                    (i._timeout = 0),
                    (i._hoverState = ""),
                    (i._activeTrigger = {}),
                    (i._popper = null),
                    (i.config = i._getConfig(n)),
                    (i.tip = null),
                    i._setListeners(),
                    i
                );
            }
            i(o, t);
            var r = o.prototype;
            return (
                (r.enable = function () {
                    this._isEnabled = !0;
                }),
                (r.disable = function () {
                    this._isEnabled = !1;
                }),
                (r.toggleEnabled = function () {
                    this._isEnabled = !this._isEnabled;
                }),
                (r.toggle = function (t) {
                    if (this._isEnabled)
                        if (t) {
                            var e = this._initializeOnDelegatedTarget(t);
                            (e._activeTrigger.click = !e._activeTrigger.click),
                                e._isWithActiveTrigger()
                                    ? e._enter(null, e)
                                    : e._leave(null, e);
                        } else {
                            if (this.getTipElement().classList.contains("show"))
                                return void this._leave(null, this);
                            this._enter(null, this);
                        }
                }),
                (r.dispose = function () {
                    clearTimeout(this._timeout),
                        B.off(this._element, this.constructor.EVENT_KEY),
                        B.off(
                            this._element.closest(".modal"),
                            "hide.bs.modal",
                            this._hideModalHandler
                        ),
                        this.tip &&
                            this.tip.parentNode &&
                            this.tip.parentNode.removeChild(this.tip),
                        (this._isEnabled = null),
                        (this._timeout = null),
                        (this._hoverState = null),
                        (this._activeTrigger = null),
                        this._popper && this._popper.destroy(),
                        (this._popper = null),
                        (this.config = null),
                        (this.tip = null),
                        t.prototype.dispose.call(this);
                }),
                (r.show = function () {
                    var t = this;
                    if ("none" === this._element.style.display)
                        throw new Error("Please use show on visible elements");
                    if (this.isWithContent() && this._isEnabled) {
                        var e = B.trigger(
                                this._element,
                                this.constructor.Event.SHOW
                            ),
                            n = (function t(e) {
                                if (!document.documentElement.attachShadow)
                                    return null;
                                if ("function" == typeof e.getRootNode) {
                                    var n = e.getRootNode();
                                    return n instanceof ShadowRoot ? n : null;
                                }
                                return e instanceof ShadowRoot
                                    ? e
                                    : e.parentNode
                                    ? t(e.parentNode)
                                    : null;
                            })(this._element),
                            i =
                                null === n
                                    ? this._element.ownerDocument.documentElement.contains(
                                          this._element
                                      )
                                    : n.contains(this._element);
                        if (!e.defaultPrevented && i) {
                            var o = this.getTipElement(),
                                r = s(this.constructor.NAME);
                            o.setAttribute("id", r),
                                this._element.setAttribute(
                                    "aria-describedby",
                                    r
                                ),
                                this.setContent(),
                                this.config.animation &&
                                    o.classList.add("fade");
                            var a =
                                    "function" == typeof this.config.placement
                                        ? this.config.placement.call(
                                              this,
                                              o,
                                              this._element
                                          )
                                        : this.config.placement,
                                l = this._getAttachment(a);
                            this._addAttachmentClass(l);
                            var c = this._getContainer();
                            E(o, this.constructor.DATA_KEY, this),
                                this._element.ownerDocument.documentElement.contains(
                                    this.tip
                                ) || c.appendChild(o),
                                B.trigger(
                                    this._element,
                                    this.constructor.Event.INSERTED
                                ),
                                (this._popper = se(
                                    this._element,
                                    o,
                                    this._getPopperConfig(l)
                                )),
                                o.classList.add("show");
                            var f,
                                d,
                                p =
                                    "function" == typeof this.config.customClass
                                        ? this.config.customClass()
                                        : this.config.customClass;
                            p && (f = o.classList).add.apply(f, p.split(" ")),
                                "ontouchstart" in document.documentElement &&
                                    (d = []).concat
                                        .apply(d, document.body.children)
                                        .forEach(function (t) {
                                            B.on(
                                                t,
                                                "mouseover",
                                                function () {}
                                            );
                                        });
                            var g = function () {
                                var e = t._hoverState;
                                (t._hoverState = null),
                                    B.trigger(
                                        t._element,
                                        t.constructor.Event.SHOWN
                                    ),
                                    "out" === e && t._leave(null, t);
                            };
                            if (this.tip.classList.contains("fade")) {
                                var m = u(this.tip);
                                B.one(this.tip, "transitionend", g),
                                    h(this.tip, m);
                            } else g();
                        }
                    }
                }),
                (r.hide = function () {
                    var t = this;
                    if (this._popper) {
                        var e = this.getTipElement(),
                            n = function () {
                                "show" !== t._hoverState &&
                                    e.parentNode &&
                                    e.parentNode.removeChild(e),
                                    t._cleanTipClass(),
                                    t._element.removeAttribute(
                                        "aria-describedby"
                                    ),
                                    B.trigger(
                                        t._element,
                                        t.constructor.Event.HIDDEN
                                    ),
                                    t._popper &&
                                        (t._popper.destroy(),
                                        (t._popper = null));
                            };
                        if (
                            !B.trigger(
                                this._element,
                                this.constructor.Event.HIDE
                            ).defaultPrevented
                        ) {
                            var i;
                            if (
                                (e.classList.remove("show"),
                                "ontouchstart" in document.documentElement &&
                                    (i = []).concat
                                        .apply(i, document.body.children)
                                        .forEach(function (t) {
                                            return B.off(t, "mouseover", m);
                                        }),
                                (this._activeTrigger.click = !1),
                                (this._activeTrigger.focus = !1),
                                (this._activeTrigger.hover = !1),
                                this.tip.classList.contains("fade"))
                            ) {
                                var o = u(e);
                                B.one(e, "transitionend", n), h(e, o);
                            } else n();
                            this._hoverState = "";
                        }
                    }
                }),
                (r.update = function () {
                    null !== this._popper && this._popper.update();
                }),
                (r.isWithContent = function () {
                    return Boolean(this.getTitle());
                }),
                (r.getTipElement = function () {
                    if (this.tip) return this.tip;
                    var t = document.createElement("div");
                    return (
                        (t.innerHTML = this.config.template),
                        (this.tip = t.children[0]),
                        this.tip
                    );
                }),
                (r.setContent = function () {
                    var t = this.getTipElement();
                    this.setElementContent(
                        Y(".tooltip-inner", t),
                        this.getTitle()
                    ),
                        t.classList.remove("fade", "show");
                }),
                (r.setElementContent = function (t, e) {
                    if (null !== t)
                        return "object" == typeof e && d(e)
                            ? (e.jquery && (e = e[0]),
                              void (this.config.html
                                  ? e.parentNode !== t &&
                                    ((t.innerHTML = ""), t.appendChild(e))
                                  : (t.textContent = e.textContent)))
                            : void (this.config.html
                                  ? (this.config.sanitize &&
                                        (e = ke(
                                            e,
                                            this.config.allowList,
                                            this.config.sanitizeFn
                                        )),
                                    (t.innerHTML = e))
                                  : (t.textContent = e));
                }),
                (r.getTitle = function () {
                    var t = this._element.getAttribute(
                        "data-bs-original-title"
                    );
                    return (
                        t ||
                            (t =
                                "function" == typeof this.config.title
                                    ? this.config.title.call(this._element)
                                    : this.config.title),
                        t
                    );
                }),
                (r.updateAttachment = function (t) {
                    return "right" === t ? "end" : "left" === t ? "start" : t;
                }),
                (r._initializeOnDelegatedTarget = function (t, e) {
                    var n = this.constructor.DATA_KEY;
                    return (
                        (e = e || T(t.delegateTarget, n)) ||
                            ((e = new this.constructor(
                                t.delegateTarget,
                                this._getDelegateConfig()
                            )),
                            E(t.delegateTarget, n, e)),
                        e
                    );
                }),
                (r._getOffset = function () {
                    var t = this,
                        e = this.config.offset;
                    return "string" == typeof e
                        ? e.split(",").map(function (t) {
                              return Number.parseInt(t, 10);
                          })
                        : "function" == typeof e
                        ? function (n) {
                              return e(n, t._element);
                          }
                        : e;
                }),
                (r._getPopperConfig = function (t) {
                    var e = this,
                        i = {
                            placement: t,
                            modifiers: [
                                {
                                    name: "flip",
                                    options: {
                                        altBoundary: !0,
                                        fallbackPlacements:
                                            this.config.fallbackPlacements,
                                    },
                                },
                                {
                                    name: "offset",
                                    options: { offset: this._getOffset() },
                                },
                                {
                                    name: "preventOverflow",
                                    options: { boundary: this.config.boundary },
                                },
                                {
                                    name: "arrow",
                                    options: {
                                        element:
                                            "." +
                                            this.constructor.NAME +
                                            "-arrow",
                                    },
                                },
                                {
                                    name: "onChange",
                                    enabled: !0,
                                    phase: "afterWrite",
                                    fn: function (t) {
                                        return e._handlePopperPlacementChange(
                                            t
                                        );
                                    },
                                },
                            ],
                            onFirstUpdate: function (t) {
                                t.options.placement !== t.placement &&
                                    e._handlePopperPlacementChange(t);
                            },
                        };
                    return n(
                        {},
                        i,
                        "function" == typeof this.config.popperConfig
                            ? this.config.popperConfig(i)
                            : this.config.popperConfig
                    );
                }),
                (r._addAttachmentClass = function (t) {
                    this.getTipElement().classList.add(
                        "bs-tooltip-" + this.updateAttachment(t)
                    );
                }),
                (r._getContainer = function () {
                    return !1 === this.config.container
                        ? document.body
                        : d(this.config.container)
                        ? this.config.container
                        : Y(this.config.container);
                }),
                (r._getAttachment = function (t) {
                    return De[t.toUpperCase()];
                }),
                (r._setListeners = function () {
                    var t = this;
                    this.config.trigger.split(" ").forEach(function (e) {
                        if ("click" === e)
                            B.on(
                                t._element,
                                t.constructor.Event.CLICK,
                                t.config.selector,
                                function (e) {
                                    return t.toggle(e);
                                }
                            );
                        else if ("manual" !== e) {
                            var n =
                                    "hover" === e
                                        ? t.constructor.Event.MOUSEENTER
                                        : t.constructor.Event.FOCUSIN,
                                i =
                                    "hover" === e
                                        ? t.constructor.Event.MOUSELEAVE
                                        : t.constructor.Event.FOCUSOUT;
                            B.on(
                                t._element,
                                n,
                                t.config.selector,
                                function (e) {
                                    return t._enter(e);
                                }
                            ),
                                B.on(
                                    t._element,
                                    i,
                                    t.config.selector,
                                    function (e) {
                                        return t._leave(e);
                                    }
                                );
                        }
                    }),
                        (this._hideModalHandler = function () {
                            t._element && t.hide();
                        }),
                        B.on(
                            this._element.closest(".modal"),
                            "hide.bs.modal",
                            this._hideModalHandler
                        ),
                        this.config.selector
                            ? (this.config = n({}, this.config, {
                                  trigger: "manual",
                                  selector: "",
                              }))
                            : this._fixTitle();
                }),
                (r._fixTitle = function () {
                    var t = this._element.getAttribute("title"),
                        e = typeof this._element.getAttribute(
                            "data-bs-original-title"
                        );
                    (t || "string" !== e) &&
                        (this._element.setAttribute(
                            "data-bs-original-title",
                            t || ""
                        ),
                        !t ||
                            this._element.getAttribute("aria-label") ||
                            this._element.textContent ||
                            this._element.setAttribute("aria-label", t),
                        this._element.setAttribute("title", ""));
                }),
                (r._enter = function (t, e) {
                    (e = this._initializeOnDelegatedTarget(t, e)),
                        t &&
                            (e._activeTrigger[
                                "focusin" === t.type ? "focus" : "hover"
                            ] = !0),
                        e.getTipElement().classList.contains("show") ||
                        "show" === e._hoverState
                            ? (e._hoverState = "show")
                            : (clearTimeout(e._timeout),
                              (e._hoverState = "show"),
                              e.config.delay && e.config.delay.show
                                  ? (e._timeout = setTimeout(function () {
                                        "show" === e._hoverState && e.show();
                                    }, e.config.delay.show))
                                  : e.show());
                }),
                (r._leave = function (t, e) {
                    (e = this._initializeOnDelegatedTarget(t, e)),
                        t &&
                            (e._activeTrigger[
                                "focusout" === t.type ? "focus" : "hover"
                            ] = !1),
                        e._isWithActiveTrigger() ||
                            (clearTimeout(e._timeout),
                            (e._hoverState = "out"),
                            e.config.delay && e.config.delay.hide
                                ? (e._timeout = setTimeout(function () {
                                      "out" === e._hoverState && e.hide();
                                  }, e.config.delay.hide))
                                : e.hide());
                }),
                (r._isWithActiveTrigger = function () {
                    for (var t in this._activeTrigger)
                        if (this._activeTrigger[t]) return !0;
                    return !1;
                }),
                (r._getConfig = function (t) {
                    var e = z.getDataAttributes(this._element);
                    return (
                        Object.keys(e).forEach(function (t) {
                            Le.has(t) && delete e[t];
                        }),
                        t &&
                            "object" == typeof t.container &&
                            t.container.jquery &&
                            (t.container = t.container[0]),
                        "number" ==
                            typeof (t = n(
                                {},
                                this.constructor.Default,
                                e,
                                "object" == typeof t && t ? t : {}
                            )).delay &&
                            (t.delay = { show: t.delay, hide: t.delay }),
                        "number" == typeof t.title &&
                            (t.title = t.title.toString()),
                        "number" == typeof t.content &&
                            (t.content = t.content.toString()),
                        p("tooltip", t, this.constructor.DefaultType),
                        t.sanitize &&
                            (t.template = ke(
                                t.template,
                                t.allowList,
                                t.sanitizeFn
                            )),
                        t
                    );
                }),
                (r._getDelegateConfig = function () {
                    var t = {};
                    if (this.config)
                        for (var e in this.config)
                            this.constructor.Default[e] !== this.config[e] &&
                                (t[e] = this.config[e]);
                    return t;
                }),
                (r._cleanTipClass = function () {
                    var t = this.getTipElement(),
                        e = t.getAttribute("class").match(Ae);
                    null !== e &&
                        e.length > 0 &&
                        e
                            .map(function (t) {
                                return t.trim();
                            })
                            .forEach(function (e) {
                                return t.classList.remove(e);
                            });
                }),
                (r._handlePopperPlacementChange = function (t) {
                    var e = t.state;
                    e &&
                        ((this.tip = e.elements.popper),
                        this._cleanTipClass(),
                        this._addAttachmentClass(
                            this._getAttachment(e.placement)
                        ));
                }),
                (o.jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = T(this, "bs.tooltip"),
                            n = "object" == typeof t && t;
                        if (
                            (e || !/dispose|hide/.test(t)) &&
                            (e || (e = new o(this, n)), "string" == typeof t)
                        ) {
                            if (void 0 === e[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                );
                            e[t]();
                        }
                    });
                }),
                e(o, null, [
                    {
                        key: "Default",
                        get: function () {
                            return xe;
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return "tooltip";
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.tooltip";
                        },
                    },
                    {
                        key: "Event",
                        get: function () {
                            return Ce;
                        },
                    },
                    {
                        key: "EVENT_KEY",
                        get: function () {
                            return ".bs.tooltip";
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return Oe;
                        },
                    },
                ]),
                o
            );
        })(H);
    y("tooltip", Se);
    var je = new RegExp("(^|\\s)bs-popover\\S+", "g"),
        Ne = n({}, Se.Default, {
            placement: "right",
            offset: [0, 8],
            trigger: "click",
            content: "",
            template:
                '<div class="popover" role="tooltip"><div class="popover-arrow"></div><h3 class="popover-header"></h3><div class="popover-body"></div></div>',
        }),
        Pe = n({}, Se.DefaultType, { content: "(string|element|function)" }),
        Ie = {
            HIDE: "hide.bs.popover",
            HIDDEN: "hidden.bs.popover",
            SHOW: "show.bs.popover",
            SHOWN: "shown.bs.popover",
            INSERTED: "inserted.bs.popover",
            CLICK: "click.bs.popover",
            FOCUSIN: "focusin.bs.popover",
            FOCUSOUT: "focusout.bs.popover",
            MOUSEENTER: "mouseenter.bs.popover",
            MOUSELEAVE: "mouseleave.bs.popover",
        },
        Me = (function (t) {
            function n() {
                return t.apply(this, arguments) || this;
            }
            i(n, t);
            var o = n.prototype;
            return (
                (o.isWithContent = function () {
                    return this.getTitle() || this._getContent();
                }),
                (o.setContent = function () {
                    var t = this.getTipElement();
                    this.setElementContent(
                        Y(".popover-header", t),
                        this.getTitle()
                    );
                    var e = this._getContent();
                    "function" == typeof e && (e = e.call(this._element)),
                        this.setElementContent(Y(".popover-body", t), e),
                        t.classList.remove("fade", "show");
                }),
                (o._addAttachmentClass = function (t) {
                    this.getTipElement().classList.add(
                        "bs-popover-" + this.updateAttachment(t)
                    );
                }),
                (o._getContent = function () {
                    return (
                        this._element.getAttribute("data-bs-content") ||
                        this.config.content
                    );
                }),
                (o._cleanTipClass = function () {
                    var t = this.getTipElement(),
                        e = t.getAttribute("class").match(je);
                    null !== e &&
                        e.length > 0 &&
                        e
                            .map(function (t) {
                                return t.trim();
                            })
                            .forEach(function (e) {
                                return t.classList.remove(e);
                            });
                }),
                (n.jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = T(this, "bs.popover"),
                            i = "object" == typeof t ? t : null;
                        if (
                            (e || !/dispose|hide/.test(t)) &&
                            (e ||
                                ((e = new n(this, i)),
                                E(this, "bs.popover", e)),
                            "string" == typeof t)
                        ) {
                            if (void 0 === e[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                );
                            e[t]();
                        }
                    });
                }),
                e(n, null, [
                    {
                        key: "Default",
                        get: function () {
                            return Ne;
                        },
                    },
                    {
                        key: "NAME",
                        get: function () {
                            return "popover";
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.popover";
                        },
                    },
                    {
                        key: "Event",
                        get: function () {
                            return Ie;
                        },
                    },
                    {
                        key: "EVENT_KEY",
                        get: function () {
                            return ".bs.popover";
                        },
                    },
                    {
                        key: "DefaultType",
                        get: function () {
                            return Pe;
                        },
                    },
                ]),
                n
            );
        })(Se);
    y("popover", Me);
    var Be = { offset: 10, method: "auto", target: "" },
        He = { offset: "number", method: "string", target: "(string|element)" },
        Re = (function (t) {
            function o(e, n) {
                var i;
                return (
                    ((i = t.call(this, e) || this)._scrollElement =
                        "BODY" === e.tagName ? window : e),
                    (i._config = i._getConfig(n)),
                    (i._selector =
                        i._config.target +
                        " .nav-link, " +
                        i._config.target +
                        " .list-group-item, " +
                        i._config.target +
                        " .dropdown-item"),
                    (i._offsets = []),
                    (i._targets = []),
                    (i._activeTarget = null),
                    (i._scrollHeight = 0),
                    B.on(i._scrollElement, "scroll.bs.scrollspy", function () {
                        return i._process();
                    }),
                    i.refresh(),
                    i._process(),
                    i
                );
            }
            i(o, t);
            var r = o.prototype;
            return (
                (r.refresh = function () {
                    var t = this,
                        e =
                            this._scrollElement === this._scrollElement.window
                                ? "offset"
                                : "position",
                        n =
                            "auto" === this._config.method
                                ? e
                                : this._config.method,
                        i = "position" === n ? this._getScrollTop() : 0;
                    (this._offsets = []),
                        (this._targets = []),
                        (this._scrollHeight = this._getScrollHeight()),
                        F(this._selector)
                            .map(function (t) {
                                var e = l(t),
                                    o = e ? Y(e) : null;
                                if (o) {
                                    var r = o.getBoundingClientRect();
                                    if (r.width || r.height)
                                        return [z[n](o).top + i, e];
                                }
                                return null;
                            })
                            .filter(function (t) {
                                return t;
                            })
                            .sort(function (t, e) {
                                return t[0] - e[0];
                            })
                            .forEach(function (e) {
                                t._offsets.push(e[0]), t._targets.push(e[1]);
                            });
                }),
                (r.dispose = function () {
                    t.prototype.dispose.call(this),
                        B.off(this._scrollElement, ".bs.scrollspy"),
                        (this._scrollElement = null),
                        (this._config = null),
                        (this._selector = null),
                        (this._offsets = null),
                        (this._targets = null),
                        (this._activeTarget = null),
                        (this._scrollHeight = null);
                }),
                (r._getConfig = function (t) {
                    if (
                        "string" !=
                            typeof (t = n(
                                {},
                                Be,
                                "object" == typeof t && t ? t : {}
                            )).target &&
                        d(t.target)
                    ) {
                        var e = t.target.id;
                        e || ((e = s("scrollspy")), (t.target.id = e)),
                            (t.target = "#" + e);
                    }
                    return p("scrollspy", t, He), t;
                }),
                (r._getScrollTop = function () {
                    return this._scrollElement === window
                        ? this._scrollElement.pageYOffset
                        : this._scrollElement.scrollTop;
                }),
                (r._getScrollHeight = function () {
                    return (
                        this._scrollElement.scrollHeight ||
                        Math.max(
                            document.body.scrollHeight,
                            document.documentElement.scrollHeight
                        )
                    );
                }),
                (r._getOffsetHeight = function () {
                    return this._scrollElement === window
                        ? window.innerHeight
                        : this._scrollElement.getBoundingClientRect().height;
                }),
                (r._process = function () {
                    var t = this._getScrollTop() + this._config.offset,
                        e = this._getScrollHeight(),
                        n = this._config.offset + e - this._getOffsetHeight();
                    if ((this._scrollHeight !== e && this.refresh(), t >= n)) {
                        var i = this._targets[this._targets.length - 1];
                        this._activeTarget !== i && this._activate(i);
                    } else {
                        if (
                            this._activeTarget &&
                            t < this._offsets[0] &&
                            this._offsets[0] > 0
                        )
                            return (
                                (this._activeTarget = null), void this._clear()
                            );
                        for (var o = this._offsets.length; o--; )
                            this._activeTarget !== this._targets[o] &&
                                t >= this._offsets[o] &&
                                (void 0 === this._offsets[o + 1] ||
                                    t < this._offsets[o + 1]) &&
                                this._activate(this._targets[o]);
                    }
                }),
                (r._activate = function (t) {
                    (this._activeTarget = t), this._clear();
                    var e = this._selector.split(",").map(function (e) {
                            return (
                                e +
                                '[data-bs-target="' +
                                t +
                                '"],' +
                                e +
                                '[href="' +
                                t +
                                '"]'
                            );
                        }),
                        n = Y(e.join(","));
                    n.classList.contains("dropdown-item")
                        ? (Y(
                              ".dropdown-toggle",
                              n.closest(".dropdown")
                          ).classList.add("active"),
                          n.classList.add("active"))
                        : (n.classList.add("active"),
                          (function (t, e) {
                              for (
                                  var n = [], i = t.parentNode;
                                  i &&
                                  i.nodeType === Node.ELEMENT_NODE &&
                                  3 !== i.nodeType;

                              )
                                  i.matches(e) && n.push(i), (i = i.parentNode);
                              return n;
                          })(n, ".nav, .list-group").forEach(function (t) {
                              V(t, ".nav-link, .list-group-item").forEach(
                                  function (t) {
                                      return t.classList.add("active");
                                  }
                              ),
                                  V(t, ".nav-item").forEach(function (t) {
                                      q(t, ".nav-link").forEach(function (t) {
                                          return t.classList.add("active");
                                      });
                                  });
                          })),
                        B.trigger(
                            this._scrollElement,
                            "activate.bs.scrollspy",
                            { relatedTarget: t }
                        );
                }),
                (r._clear = function () {
                    F(this._selector)
                        .filter(function (t) {
                            return t.classList.contains("active");
                        })
                        .forEach(function (t) {
                            return t.classList.remove("active");
                        });
                }),
                (o.jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = T(this, "bs.scrollspy");
                        if (
                            (e || (e = new o(this, "object" == typeof t && t)),
                            "string" == typeof t)
                        ) {
                            if (void 0 === e[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                );
                            e[t]();
                        }
                    });
                }),
                e(o, null, [
                    {
                        key: "Default",
                        get: function () {
                            return Be;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.scrollspy";
                        },
                    },
                ]),
                o
            );
        })(H);
    B.on(window, "load.bs.scrollspy.data-api", function () {
        F('[data-bs-spy="scroll"]').forEach(function (t) {
            return new Re(t, z.getDataAttributes(t));
        });
    }),
        y("scrollspy", Re);
    var We = (function (t) {
        function n() {
            return t.apply(this, arguments) || this;
        }
        i(n, t);
        var o = n.prototype;
        return (
            (o.show = function () {
                var t = this;
                if (
                    !(
                        (this._element.parentNode &&
                            this._element.parentNode.nodeType ===
                                Node.ELEMENT_NODE &&
                            this._element.classList.contains("active")) ||
                        this._element.classList.contains("disabled")
                    )
                ) {
                    var e,
                        n = c(this._element),
                        i = this._element.closest(".nav, .list-group");
                    if (i) {
                        var o =
                            "UL" === i.nodeName || "OL" === i.nodeName
                                ? ":scope > li > .active"
                                : ".active";
                        e = (e = F(o, i))[e.length - 1];
                    }
                    var r = e
                        ? B.trigger(e, "hide.bs.tab", {
                              relatedTarget: this._element,
                          })
                        : null;
                    if (
                        !(
                            B.trigger(this._element, "show.bs.tab", {
                                relatedTarget: e,
                            }).defaultPrevented ||
                            (null !== r && r.defaultPrevented)
                        )
                    ) {
                        this._activate(this._element, i);
                        var s = function () {
                            B.trigger(e, "hidden.bs.tab", {
                                relatedTarget: t._element,
                            }),
                                B.trigger(t._element, "shown.bs.tab", {
                                    relatedTarget: e,
                                });
                        };
                        n ? this._activate(n, n.parentNode, s) : s();
                    }
                }
            }),
            (o._activate = function (t, e, n) {
                var i = this,
                    o = (
                        !e || ("UL" !== e.nodeName && "OL" !== e.nodeName)
                            ? q(e, ".active")
                            : F(":scope > li > .active", e)
                    )[0],
                    r = n && o && o.classList.contains("fade"),
                    s = function () {
                        return i._transitionComplete(t, o, n);
                    };
                if (o && r) {
                    var a = u(o);
                    o.classList.remove("show"),
                        B.one(o, "transitionend", s),
                        h(o, a);
                } else s();
            }),
            (o._transitionComplete = function (t, e, n) {
                if (e) {
                    e.classList.remove("active");
                    var i = Y(":scope > .dropdown-menu .active", e.parentNode);
                    i && i.classList.remove("active"),
                        "tab" === e.getAttribute("role") &&
                            e.setAttribute("aria-selected", !1);
                }
                t.classList.add("active"),
                    "tab" === t.getAttribute("role") &&
                        t.setAttribute("aria-selected", !0),
                    v(t),
                    t.classList.contains("fade") && t.classList.add("show"),
                    t.parentNode &&
                        t.parentNode.classList.contains("dropdown-menu") &&
                        (t.closest(".dropdown") &&
                            F(".dropdown-toggle").forEach(function (t) {
                                return t.classList.add("active");
                            }),
                        t.setAttribute("aria-expanded", !0)),
                    n && n();
            }),
            (n.jQueryInterface = function (t) {
                return this.each(function () {
                    var e = T(this, "bs.tab") || new n(this);
                    if ("string" == typeof t) {
                        if (void 0 === e[t])
                            throw new TypeError('No method named "' + t + '"');
                        e[t]();
                    }
                });
            }),
            e(n, null, [
                {
                    key: "DATA_KEY",
                    get: function () {
                        return "bs.tab";
                    },
                },
            ]),
            n
        );
    })(H);
    B.on(
        document,
        "click.bs.tab.data-api",
        '[data-bs-toggle="tab"], [data-bs-toggle="pill"], [data-bs-toggle="list"]',
        function (t) {
            t.preventDefault(), (T(this, "bs.tab") || new We(this)).show();
        }
    ),
        y("tab", We);
    var Ke = { animation: "boolean", autohide: "boolean", delay: "number" },
        Ue = { animation: !0, autohide: !0, delay: 5e3 },
        ze = (function (t) {
            function o(e, n) {
                var i;
                return (
                    ((i = t.call(this, e) || this)._config = i._getConfig(n)),
                    (i._timeout = null),
                    i._setListeners(),
                    i
                );
            }
            i(o, t);
            var r = o.prototype;
            return (
                (r.show = function () {
                    var t = this;
                    if (
                        !B.trigger(this._element, "show.bs.toast")
                            .defaultPrevented
                    ) {
                        this._clearTimeout(),
                            this._config.animation &&
                                this._element.classList.add("fade");
                        var e = function () {
                            t._element.classList.remove("showing"),
                                t._element.classList.add("show"),
                                B.trigger(t._element, "shown.bs.toast"),
                                t._config.autohide &&
                                    (t._timeout = setTimeout(function () {
                                        t.hide();
                                    }, t._config.delay));
                        };
                        if (
                            (this._element.classList.remove("hide"),
                            v(this._element),
                            this._element.classList.add("showing"),
                            this._config.animation)
                        ) {
                            var n = u(this._element);
                            B.one(this._element, "transitionend", e),
                                h(this._element, n);
                        } else e();
                    }
                }),
                (r.hide = function () {
                    var t = this;
                    if (
                        this._element.classList.contains("show") &&
                        !B.trigger(this._element, "hide.bs.toast")
                            .defaultPrevented
                    ) {
                        var e = function () {
                            t._element.classList.add("hide"),
                                B.trigger(t._element, "hidden.bs.toast");
                        };
                        if (
                            (this._element.classList.remove("show"),
                            this._config.animation)
                        ) {
                            var n = u(this._element);
                            B.one(this._element, "transitionend", e),
                                h(this._element, n);
                        } else e();
                    }
                }),
                (r.dispose = function () {
                    this._clearTimeout(),
                        this._element.classList.contains("show") &&
                            this._element.classList.remove("show"),
                        B.off(this._element, "click.dismiss.bs.toast"),
                        t.prototype.dispose.call(this),
                        (this._config = null);
                }),
                (r._getConfig = function (t) {
                    return (
                        (t = n(
                            {},
                            Ue,
                            z.getDataAttributes(this._element),
                            "object" == typeof t && t ? t : {}
                        )),
                        p("toast", t, this.constructor.DefaultType),
                        t
                    );
                }),
                (r._setListeners = function () {
                    var t = this;
                    B.on(
                        this._element,
                        "click.dismiss.bs.toast",
                        '[data-bs-dismiss="toast"]',
                        function () {
                            return t.hide();
                        }
                    );
                }),
                (r._clearTimeout = function () {
                    clearTimeout(this._timeout), (this._timeout = null);
                }),
                (o.jQueryInterface = function (t) {
                    return this.each(function () {
                        var e = T(this, "bs.toast");
                        if (
                            (e || (e = new o(this, "object" == typeof t && t)),
                            "string" == typeof t)
                        ) {
                            if (void 0 === e[t])
                                throw new TypeError(
                                    'No method named "' + t + '"'
                                );
                            e[t](this);
                        }
                    });
                }),
                e(o, null, [
                    {
                        key: "DefaultType",
                        get: function () {
                            return Ke;
                        },
                    },
                    {
                        key: "Default",
                        get: function () {
                            return Ue;
                        },
                    },
                    {
                        key: "DATA_KEY",
                        get: function () {
                            return "bs.toast";
                        },
                    },
                ]),
                o
            );
        })(H);
    return (
        y("toast", ze),
        {
            Alert: R,
            Button: W,
            Carousel: $,
            Collapse: J,
            Dropdown: ve,
            Modal: ye,
            Popover: Me,
            ScrollSpy: Re,
            Tab: We,
            Toast: ze,
            Tooltip: Se,
        }
    );
});
//# sourceMappingURL=bootstrap.bundle.min.js.map

/**
 * Owl Carousel v2.3.4
 * Copyright 2013-2018 David Deutsch
 * Licensed under MIT: SEE LICENSE IN https://github.com/OwlCarousel2/OwlCarousel2/blob/master/LICENSE
 */
!(function (a, b, c, d) {
    function e(b, c) {
        (this.settings = null),
            (this.options = a.extend({}, e.Defaults, c)),
            (this.$element = a(b)),
            (this._handlers = {}),
            (this._plugins = {}),
            (this._supress = {}),
            (this._current = null),
            (this._speed = null),
            (this._coordinates = []),
            (this._breakpoint = null),
            (this._width = null),
            (this._items = []),
            (this._clones = []),
            (this._mergers = []),
            (this._widths = []),
            (this._invalidated = {}),
            (this._pipe = []),
            (this._drag = {
                time: null,
                target: null,
                pointer: null,
                stage: { start: null, current: null },
                direction: null,
            }),
            (this._states = {
                current: {},
                tags: {
                    initializing: ["busy"],
                    animating: ["busy"],
                    dragging: ["interacting"],
                },
            }),
            a.each(
                ["onResize", "onThrottledResize"],
                a.proxy(function (b, c) {
                    this._handlers[c] = a.proxy(this[c], this);
                }, this)
            ),
            a.each(
                e.Plugins,
                a.proxy(function (a, b) {
                    this._plugins[a.charAt(0).toLowerCase() + a.slice(1)] =
                        new b(this);
                }, this)
            ),
            a.each(
                e.Workers,
                a.proxy(function (b, c) {
                    this._pipe.push({
                        filter: c.filter,
                        run: a.proxy(c.run, this),
                    });
                }, this)
            ),
            this.setup(),
            this.initialize();
    }
    (e.Defaults = {
        items: 3,
        loop: !1,
        center: !1,
        rewind: !1,
        checkVisibility: !0,
        mouseDrag: !0,
        touchDrag: !0,
        pullDrag: !0,
        freeDrag: !1,
        margin: 0,
        stagePadding: 0,
        merge: !1,
        mergeFit: !0,
        autoWidth: !1,
        startPosition: 0,
        rtl: !1,
        smartSpeed: 250,
        fluidSpeed: !1,
        dragEndSpeed: !1,
        responsive: {},
        responsiveRefreshRate: 200,
        responsiveBaseElement: b,
        fallbackEasing: "swing",
        slideTransition: "",
        info: !1,
        nestedItemSelector: !1,
        itemElement: "div",
        stageElement: "div",
        refreshClass: "owl-refresh",
        loadedClass: "owl-loaded",
        loadingClass: "owl-loading",
        rtlClass: "owl-rtl",
        responsiveClass: "owl-responsive",
        dragClass: "owl-drag",
        itemClass: "owl-item",
        stageClass: "owl-stage",
        stageOuterClass: "owl-stage-outer",
        grabClass: "owl-grab",
    }),
        (e.Width = { Default: "default", Inner: "inner", Outer: "outer" }),
        (e.Type = { Event: "event", State: "state" }),
        (e.Plugins = {}),
        (e.Workers = [
            {
                filter: ["width", "settings"],
                run: function () {
                    this._width = this.$element.width();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    a.current =
                        this._items &&
                        this._items[this.relative(this._current)];
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    this.$stage.children(".cloned").remove();
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    var b = this.settings.margin || "",
                        c = !this.settings.autoWidth,
                        d = this.settings.rtl,
                        e = {
                            width: "auto",
                            "margin-left": d ? b : "",
                            "margin-right": d ? "" : b,
                        };
                    !c && this.$stage.children().css(e), (a.css = e);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    var b =
                            (this.width() / this.settings.items).toFixed(3) -
                            this.settings.margin,
                        c = null,
                        d = this._items.length,
                        e = !this.settings.autoWidth,
                        f = [];
                    for (a.items = { merge: !1, width: b }; d--; )
                        (c = this._mergers[d]),
                            (c =
                                (this.settings.mergeFit &&
                                    Math.min(c, this.settings.items)) ||
                                c),
                            (a.items.merge = c > 1 || a.items.merge),
                            (f[d] = e ? b * c : this._items[d].width());
                    this._widths = f;
                },
            },
            {
                filter: ["items", "settings"],
                run: function () {
                    var b = [],
                        c = this._items,
                        d = this.settings,
                        e = Math.max(2 * d.items, 4),
                        f = 2 * Math.ceil(c.length / 2),
                        g =
                            d.loop && c.length
                                ? d.rewind
                                    ? e
                                    : Math.max(e, f)
                                : 0,
                        h = "",
                        i = "";
                    for (g /= 2; g > 0; )
                        b.push(this.normalize(b.length / 2, !0)),
                            (h += c[b[b.length - 1]][0].outerHTML),
                            b.push(
                                this.normalize(
                                    c.length - 1 - (b.length - 1) / 2,
                                    !0
                                )
                            ),
                            (i = c[b[b.length - 1]][0].outerHTML + i),
                            (g -= 1);
                    (this._clones = b),
                        a(h).addClass("cloned").appendTo(this.$stage),
                        a(i).addClass("cloned").prependTo(this.$stage);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    for (
                        var a = this.settings.rtl ? 1 : -1,
                            b = this._clones.length + this._items.length,
                            c = -1,
                            d = 0,
                            e = 0,
                            f = [];
                        ++c < b;

                    )
                        (d = f[c - 1] || 0),
                            (e =
                                this._widths[this.relative(c)] +
                                this.settings.margin),
                            f.push(d + e * a);
                    this._coordinates = f;
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function () {
                    var a = this.settings.stagePadding,
                        b = this._coordinates,
                        c = {
                            width: Math.ceil(Math.abs(b[b.length - 1])) + 2 * a,
                            "padding-left": a || "",
                            "padding-right": a || "",
                        };
                    this.$stage.css(c);
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    var b = this._coordinates.length,
                        c = !this.settings.autoWidth,
                        d = this.$stage.children();
                    if (c && a.items.merge)
                        for (; b--; )
                            (a.css.width = this._widths[this.relative(b)]),
                                d.eq(b).css(a.css);
                    else c && ((a.css.width = a.items.width), d.css(a.css));
                },
            },
            {
                filter: ["items"],
                run: function () {
                    this._coordinates.length < 1 &&
                        this.$stage.removeAttr("style");
                },
            },
            {
                filter: ["width", "items", "settings"],
                run: function (a) {
                    (a.current = a.current
                        ? this.$stage.children().index(a.current)
                        : 0),
                        (a.current = Math.max(
                            this.minimum(),
                            Math.min(this.maximum(), a.current)
                        )),
                        this.reset(a.current);
                },
            },
            {
                filter: ["position"],
                run: function () {
                    this.animate(this.coordinates(this._current));
                },
            },
            {
                filter: ["width", "position", "items", "settings"],
                run: function () {
                    var a,
                        b,
                        c,
                        d,
                        e = this.settings.rtl ? 1 : -1,
                        f = 2 * this.settings.stagePadding,
                        g = this.coordinates(this.current()) + f,
                        h = g + this.width() * e,
                        i = [];
                    for (c = 0, d = this._coordinates.length; c < d; c++)
                        (a = this._coordinates[c - 1] || 0),
                            (b = Math.abs(this._coordinates[c]) + f * e),
                            ((this.op(a, "<=", g) && this.op(a, ">", h)) ||
                                (this.op(b, "<", g) && this.op(b, ">", h))) &&
                                i.push(c);
                    this.$stage.children(".active").removeClass("active"),
                        this.$stage
                            .children(":eq(" + i.join("), :eq(") + ")")
                            .addClass("active"),
                        this.$stage.children(".center").removeClass("center"),
                        this.settings.center &&
                            this.$stage
                                .children()
                                .eq(this.current())
                                .addClass("center");
                },
            },
        ]),
        (e.prototype.initializeStage = function () {
            (this.$stage = this.$element.find("." + this.settings.stageClass)),
                this.$stage.length ||
                    (this.$element.addClass(this.options.loadingClass),
                    (this.$stage = a("<" + this.settings.stageElement + ">", {
                        class: this.settings.stageClass,
                    }).wrap(
                        a("<div/>", { class: this.settings.stageOuterClass })
                    )),
                    this.$element.append(this.$stage.parent()));
        }),
        (e.prototype.initializeItems = function () {
            var b = this.$element.find(".owl-item");
            if (b.length)
                return (
                    (this._items = b.get().map(function (b) {
                        return a(b);
                    })),
                    (this._mergers = this._items.map(function () {
                        return 1;
                    })),
                    void this.refresh()
                );
            this.replace(this.$element.children().not(this.$stage.parent())),
                this.isVisible() ? this.refresh() : this.invalidate("width"),
                this.$element
                    .removeClass(this.options.loadingClass)
                    .addClass(this.options.loadedClass);
        }),
        (e.prototype.initialize = function () {
            if (
                (this.enter("initializing"),
                this.trigger("initialize"),
                this.$element.toggleClass(
                    this.settings.rtlClass,
                    this.settings.rtl
                ),
                this.settings.autoWidth && !this.is("pre-loading"))
            ) {
                var a, b, c;
                (a = this.$element.find("img")),
                    (b = this.settings.nestedItemSelector
                        ? "." + this.settings.nestedItemSelector
                        : d),
                    (c = this.$element.children(b).width()),
                    a.length && c <= 0 && this.preloadAutoWidthImages(a);
            }
            this.initializeStage(),
                this.initializeItems(),
                this.registerEventHandlers(),
                this.leave("initializing"),
                this.trigger("initialized");
        }),
        (e.prototype.isVisible = function () {
            return (
                !this.settings.checkVisibility || this.$element.is(":visible")
            );
        }),
        (e.prototype.setup = function () {
            var b = this.viewport(),
                c = this.options.responsive,
                d = -1,
                e = null;
            c
                ? (a.each(c, function (a) {
                      a <= b && a > d && (d = Number(a));
                  }),
                  (e = a.extend({}, this.options, c[d])),
                  "function" == typeof e.stagePadding &&
                      (e.stagePadding = e.stagePadding()),
                  delete e.responsive,
                  e.responsiveClass &&
                      this.$element.attr(
                          "class",
                          this.$element
                              .attr("class")
                              .replace(
                                  new RegExp(
                                      "(" +
                                          this.options.responsiveClass +
                                          "-)\\S+\\s",
                                      "g"
                                  ),
                                  "$1" + d
                              )
                      ))
                : (e = a.extend({}, this.options)),
                this.trigger("change", {
                    property: { name: "settings", value: e },
                }),
                (this._breakpoint = d),
                (this.settings = e),
                this.invalidate("settings"),
                this.trigger("changed", {
                    property: { name: "settings", value: this.settings },
                });
        }),
        (e.prototype.optionsLogic = function () {
            this.settings.autoWidth &&
                ((this.settings.stagePadding = !1), (this.settings.merge = !1));
        }),
        (e.prototype.prepare = function (b) {
            var c = this.trigger("prepare", { content: b });
            return (
                c.data ||
                    (c.data = a("<" + this.settings.itemElement + "/>")
                        .addClass(this.options.itemClass)
                        .append(b)),
                this.trigger("prepared", { content: c.data }),
                c.data
            );
        }),
        (e.prototype.update = function () {
            for (
                var b = 0,
                    c = this._pipe.length,
                    d = a.proxy(function (a) {
                        return this[a];
                    }, this._invalidated),
                    e = {};
                b < c;

            )
                (this._invalidated.all ||
                    a.grep(this._pipe[b].filter, d).length > 0) &&
                    this._pipe[b].run(e),
                    b++;
            (this._invalidated = {}), !this.is("valid") && this.enter("valid");
        }),
        (e.prototype.width = function (a) {
            switch ((a = a || e.Width.Default)) {
                case e.Width.Inner:
                case e.Width.Outer:
                    return this._width;
                default:
                    return (
                        this._width -
                        2 * this.settings.stagePadding +
                        this.settings.margin
                    );
            }
        }),
        (e.prototype.refresh = function () {
            this.enter("refreshing"),
                this.trigger("refresh"),
                this.setup(),
                this.optionsLogic(),
                this.$element.addClass(this.options.refreshClass),
                this.update(),
                this.$element.removeClass(this.options.refreshClass),
                this.leave("refreshing"),
                this.trigger("refreshed");
        }),
        (e.prototype.onThrottledResize = function () {
            b.clearTimeout(this.resizeTimer),
                (this.resizeTimer = b.setTimeout(
                    this._handlers.onResize,
                    this.settings.responsiveRefreshRate
                ));
        }),
        (e.prototype.onResize = function () {
            return (
                !!this._items.length &&
                this._width !== this.$element.width() &&
                !!this.isVisible() &&
                (this.enter("resizing"),
                this.trigger("resize").isDefaultPrevented()
                    ? (this.leave("resizing"), !1)
                    : (this.invalidate("width"),
                      this.refresh(),
                      this.leave("resizing"),
                      void this.trigger("resized")))
            );
        }),
        (e.prototype.registerEventHandlers = function () {
            a.support.transition &&
                this.$stage.on(
                    a.support.transition.end + ".owl.core",
                    a.proxy(this.onTransitionEnd, this)
                ),
                !1 !== this.settings.responsive &&
                    this.on(b, "resize", this._handlers.onThrottledResize),
                this.settings.mouseDrag &&
                    (this.$element.addClass(this.options.dragClass),
                    this.$stage.on(
                        "mousedown.owl.core",
                        a.proxy(this.onDragStart, this)
                    ),
                    this.$stage.on(
                        "dragstart.owl.core selectstart.owl.core",
                        function () {
                            return !1;
                        }
                    )),
                this.settings.touchDrag &&
                    (this.$stage.on(
                        "touchstart.owl.core",
                        a.proxy(this.onDragStart, this)
                    ),
                    this.$stage.on(
                        "touchcancel.owl.core",
                        a.proxy(this.onDragEnd, this)
                    ));
        }),
        (e.prototype.onDragStart = function (b) {
            var d = null;
            3 !== b.which &&
                (a.support.transform
                    ? ((d = this.$stage
                          .css("transform")
                          .replace(/.*\(|\)| /g, "")
                          .split(",")),
                      (d = {
                          x: d[16 === d.length ? 12 : 4],
                          y: d[16 === d.length ? 13 : 5],
                      }))
                    : ((d = this.$stage.position()),
                      (d = {
                          x: this.settings.rtl
                              ? d.left +
                                this.$stage.width() -
                                this.width() +
                                this.settings.margin
                              : d.left,
                          y: d.top,
                      })),
                this.is("animating") &&
                    (a.support.transform
                        ? this.animate(d.x)
                        : this.$stage.stop(),
                    this.invalidate("position")),
                this.$element.toggleClass(
                    this.options.grabClass,
                    "mousedown" === b.type
                ),
                this.speed(0),
                (this._drag.time = new Date().getTime()),
                (this._drag.target = a(b.target)),
                (this._drag.stage.start = d),
                (this._drag.stage.current = d),
                (this._drag.pointer = this.pointer(b)),
                a(c).on(
                    "mouseup.owl.core touchend.owl.core",
                    a.proxy(this.onDragEnd, this)
                ),
                a(c).one(
                    "mousemove.owl.core touchmove.owl.core",
                    a.proxy(function (b) {
                        var d = this.difference(
                            this._drag.pointer,
                            this.pointer(b)
                        );
                        a(c).on(
                            "mousemove.owl.core touchmove.owl.core",
                            a.proxy(this.onDragMove, this)
                        ),
                            (Math.abs(d.x) < Math.abs(d.y) &&
                                this.is("valid")) ||
                                (b.preventDefault(),
                                this.enter("dragging"),
                                this.trigger("drag"));
                    }, this)
                ));
        }),
        (e.prototype.onDragMove = function (a) {
            var b = null,
                c = null,
                d = null,
                e = this.difference(this._drag.pointer, this.pointer(a)),
                f = this.difference(this._drag.stage.start, e);
            this.is("dragging") &&
                (a.preventDefault(),
                this.settings.loop
                    ? ((b = this.coordinates(this.minimum())),
                      (c = this.coordinates(this.maximum() + 1) - b),
                      (f.x = ((((f.x - b) % c) + c) % c) + b))
                    : ((b = this.settings.rtl
                          ? this.coordinates(this.maximum())
                          : this.coordinates(this.minimum())),
                      (c = this.settings.rtl
                          ? this.coordinates(this.minimum())
                          : this.coordinates(this.maximum())),
                      (d = this.settings.pullDrag ? (-1 * e.x) / 5 : 0),
                      (f.x = Math.max(Math.min(f.x, b + d), c + d))),
                (this._drag.stage.current = f),
                this.animate(f.x));
        }),
        (e.prototype.onDragEnd = function (b) {
            var d = this.difference(this._drag.pointer, this.pointer(b)),
                e = this._drag.stage.current,
                f = (d.x > 0) ^ this.settings.rtl ? "left" : "right";
            a(c).off(".owl.core"),
                this.$element.removeClass(this.options.grabClass),
                ((0 !== d.x && this.is("dragging")) || !this.is("valid")) &&
                    (this.speed(
                        this.settings.dragEndSpeed || this.settings.smartSpeed
                    ),
                    this.current(
                        this.closest(e.x, 0 !== d.x ? f : this._drag.direction)
                    ),
                    this.invalidate("position"),
                    this.update(),
                    (this._drag.direction = f),
                    (Math.abs(d.x) > 3 ||
                        new Date().getTime() - this._drag.time > 300) &&
                        this._drag.target.one("click.owl.core", function () {
                            return !1;
                        })),
                this.is("dragging") &&
                    (this.leave("dragging"), this.trigger("dragged"));
        }),
        (e.prototype.closest = function (b, c) {
            var e = -1,
                f = 30,
                g = this.width(),
                h = this.coordinates();
            return (
                this.settings.freeDrag ||
                    a.each(
                        h,
                        a.proxy(function (a, i) {
                            return (
                                "left" === c && b > i - f && b < i + f
                                    ? (e = a)
                                    : "right" === c &&
                                      b > i - g - f &&
                                      b < i - g + f
                                    ? (e = a + 1)
                                    : this.op(b, "<", i) &&
                                      this.op(
                                          b,
                                          ">",
                                          h[a + 1] !== d ? h[a + 1] : i - g
                                      ) &&
                                      (e = "left" === c ? a + 1 : a),
                                -1 === e
                            );
                        }, this)
                    ),
                this.settings.loop ||
                    (this.op(b, ">", h[this.minimum()])
                        ? (e = b = this.minimum())
                        : this.op(b, "<", h[this.maximum()]) &&
                          (e = b = this.maximum())),
                e
            );
        }),
        (e.prototype.animate = function (b) {
            var c = this.speed() > 0;
            this.is("animating") && this.onTransitionEnd(),
                c && (this.enter("animating"), this.trigger("translate")),
                a.support.transform3d && a.support.transition
                    ? this.$stage.css({
                          transform: "translate3d(" + b + "px,0px,0px)",
                          transition:
                              this.speed() / 1e3 +
                              "s" +
                              (this.settings.slideTransition
                                  ? " " + this.settings.slideTransition
                                  : ""),
                      })
                    : c
                    ? this.$stage.animate(
                          { left: b + "px" },
                          this.speed(),
                          this.settings.fallbackEasing,
                          a.proxy(this.onTransitionEnd, this)
                      )
                    : this.$stage.css({ left: b + "px" });
        }),
        (e.prototype.is = function (a) {
            return this._states.current[a] && this._states.current[a] > 0;
        }),
        (e.prototype.current = function (a) {
            if (a === d) return this._current;
            if (0 === this._items.length) return d;
            if (((a = this.normalize(a)), this._current !== a)) {
                var b = this.trigger("change", {
                    property: { name: "position", value: a },
                });
                b.data !== d && (a = this.normalize(b.data)),
                    (this._current = a),
                    this.invalidate("position"),
                    this.trigger("changed", {
                        property: { name: "position", value: this._current },
                    });
            }
            return this._current;
        }),
        (e.prototype.invalidate = function (b) {
            return (
                "string" === a.type(b) &&
                    ((this._invalidated[b] = !0),
                    this.is("valid") && this.leave("valid")),
                a.map(this._invalidated, function (a, b) {
                    return b;
                })
            );
        }),
        (e.prototype.reset = function (a) {
            (a = this.normalize(a)) !== d &&
                ((this._speed = 0),
                (this._current = a),
                this.suppress(["translate", "translated"]),
                this.animate(this.coordinates(a)),
                this.release(["translate", "translated"]));
        }),
        (e.prototype.normalize = function (a, b) {
            var c = this._items.length,
                e = b ? 0 : this._clones.length;
            return (
                !this.isNumeric(a) || c < 1
                    ? (a = d)
                    : (a < 0 || a >= c + e) &&
                      (a = ((((a - e / 2) % c) + c) % c) + e / 2),
                a
            );
        }),
        (e.prototype.relative = function (a) {
            return (a -= this._clones.length / 2), this.normalize(a, !0);
        }),
        (e.prototype.maximum = function (a) {
            var b,
                c,
                d,
                e = this.settings,
                f = this._coordinates.length;
            if (e.loop) f = this._clones.length / 2 + this._items.length - 1;
            else if (e.autoWidth || e.merge) {
                if ((b = this._items.length))
                    for (
                        c = this._items[--b].width(), d = this.$element.width();
                        b-- &&
                        !(
                            (c +=
                                this._items[b].width() + this.settings.margin) >
                            d
                        );

                    );
                f = b + 1;
            } else
                f = e.center
                    ? this._items.length - 1
                    : this._items.length - e.items;
            return a && (f -= this._clones.length / 2), Math.max(f, 0);
        }),
        (e.prototype.minimum = function (a) {
            return a ? 0 : this._clones.length / 2;
        }),
        (e.prototype.items = function (a) {
            return a === d
                ? this._items.slice()
                : ((a = this.normalize(a, !0)), this._items[a]);
        }),
        (e.prototype.mergers = function (a) {
            return a === d
                ? this._mergers.slice()
                : ((a = this.normalize(a, !0)), this._mergers[a]);
        }),
        (e.prototype.clones = function (b) {
            var c = this._clones.length / 2,
                e = c + this._items.length,
                f = function (a) {
                    return a % 2 == 0 ? e + a / 2 : c - (a + 1) / 2;
                };
            return b === d
                ? a.map(this._clones, function (a, b) {
                      return f(b);
                  })
                : a.map(this._clones, function (a, c) {
                      return a === b ? f(c) : null;
                  });
        }),
        (e.prototype.speed = function (a) {
            return a !== d && (this._speed = a), this._speed;
        }),
        (e.prototype.coordinates = function (b) {
            var c,
                e = 1,
                f = b - 1;
            return b === d
                ? a.map(
                      this._coordinates,
                      a.proxy(function (a, b) {
                          return this.coordinates(b);
                      }, this)
                  )
                : (this.settings.center
                      ? (this.settings.rtl && ((e = -1), (f = b + 1)),
                        (c = this._coordinates[b]),
                        (c +=
                            ((this.width() - c + (this._coordinates[f] || 0)) /
                                2) *
                            e))
                      : (c = this._coordinates[f] || 0),
                  (c = Math.ceil(c)));
        }),
        (e.prototype.duration = function (a, b, c) {
            return 0 === c
                ? 0
                : Math.min(Math.max(Math.abs(b - a), 1), 6) *
                      Math.abs(c || this.settings.smartSpeed);
        }),
        (e.prototype.to = function (a, b) {
            var c = this.current(),
                d = null,
                e = a - this.relative(c),
                f = (e > 0) - (e < 0),
                g = this._items.length,
                h = this.minimum(),
                i = this.maximum();
            this.settings.loop
                ? (!this.settings.rewind &&
                      Math.abs(e) > g / 2 &&
                      (e += -1 * f * g),
                  (a = c + e),
                  (d = ((((a - h) % g) + g) % g) + h) !== a &&
                      d - e <= i &&
                      d - e > 0 &&
                      ((c = d - e), (a = d), this.reset(c)))
                : this.settings.rewind
                ? ((i += 1), (a = ((a % i) + i) % i))
                : (a = Math.max(h, Math.min(i, a))),
                this.speed(this.duration(c, a, b)),
                this.current(a),
                this.isVisible() && this.update();
        }),
        (e.prototype.next = function (a) {
            (a = a || !1), this.to(this.relative(this.current()) + 1, a);
        }),
        (e.prototype.prev = function (a) {
            (a = a || !1), this.to(this.relative(this.current()) - 1, a);
        }),
        (e.prototype.onTransitionEnd = function (a) {
            if (
                a !== d &&
                (a.stopPropagation(),
                (a.target || a.srcElement || a.originalTarget) !==
                    this.$stage.get(0))
            )
                return !1;
            this.leave("animating"), this.trigger("translated");
        }),
        (e.prototype.viewport = function () {
            var d;
            return (
                this.options.responsiveBaseElement !== b
                    ? (d = a(this.options.responsiveBaseElement).width())
                    : b.innerWidth
                    ? (d = b.innerWidth)
                    : c.documentElement && c.documentElement.clientWidth
                    ? (d = c.documentElement.clientWidth)
                    : console.warn("Can not detect viewport width."),
                d
            );
        }),
        (e.prototype.replace = function (b) {
            this.$stage.empty(),
                (this._items = []),
                b && (b = b instanceof jQuery ? b : a(b)),
                this.settings.nestedItemSelector &&
                    (b = b.find("." + this.settings.nestedItemSelector)),
                b
                    .filter(function () {
                        return 1 === this.nodeType;
                    })
                    .each(
                        a.proxy(function (a, b) {
                            (b = this.prepare(b)),
                                this.$stage.append(b),
                                this._items.push(b),
                                this._mergers.push(
                                    1 *
                                        b
                                            .find("[data-merge]")
                                            .addBack("[data-merge]")
                                            .attr("data-merge") || 1
                                );
                        }, this)
                    ),
                this.reset(
                    this.isNumeric(this.settings.startPosition)
                        ? this.settings.startPosition
                        : 0
                ),
                this.invalidate("items");
        }),
        (e.prototype.add = function (b, c) {
            var e = this.relative(this._current);
            (c = c === d ? this._items.length : this.normalize(c, !0)),
                (b = b instanceof jQuery ? b : a(b)),
                this.trigger("add", { content: b, position: c }),
                (b = this.prepare(b)),
                0 === this._items.length || c === this._items.length
                    ? (0 === this._items.length && this.$stage.append(b),
                      0 !== this._items.length && this._items[c - 1].after(b),
                      this._items.push(b),
                      this._mergers.push(
                          1 *
                              b
                                  .find("[data-merge]")
                                  .addBack("[data-merge]")
                                  .attr("data-merge") || 1
                      ))
                    : (this._items[c].before(b),
                      this._items.splice(c, 0, b),
                      this._mergers.splice(
                          c,
                          0,
                          1 *
                              b
                                  .find("[data-merge]")
                                  .addBack("[data-merge]")
                                  .attr("data-merge") || 1
                      )),
                this._items[e] && this.reset(this._items[e].index()),
                this.invalidate("items"),
                this.trigger("added", { content: b, position: c });
        }),
        (e.prototype.remove = function (a) {
            (a = this.normalize(a, !0)) !== d &&
                (this.trigger("remove", {
                    content: this._items[a],
                    position: a,
                }),
                this._items[a].remove(),
                this._items.splice(a, 1),
                this._mergers.splice(a, 1),
                this.invalidate("items"),
                this.trigger("removed", { content: null, position: a }));
        }),
        (e.prototype.preloadAutoWidthImages = function (b) {
            b.each(
                a.proxy(function (b, c) {
                    this.enter("pre-loading"),
                        (c = a(c)),
                        a(new Image())
                            .one(
                                "load",
                                a.proxy(function (a) {
                                    c.attr("src", a.target.src),
                                        c.css("opacity", 1),
                                        this.leave("pre-loading"),
                                        !this.is("pre-loading") &&
                                            !this.is("initializing") &&
                                            this.refresh();
                                }, this)
                            )
                            .attr(
                                "src",
                                c.attr("src") ||
                                    c.attr("data-src") ||
                                    c.attr("data-src-retina")
                            );
                }, this)
            );
        }),
        (e.prototype.destroy = function () {
            this.$element.off(".owl.core"),
                this.$stage.off(".owl.core"),
                a(c).off(".owl.core"),
                !1 !== this.settings.responsive &&
                    (b.clearTimeout(this.resizeTimer),
                    this.off(b, "resize", this._handlers.onThrottledResize));
            for (var d in this._plugins) this._plugins[d].destroy();
            this.$stage.children(".cloned").remove(),
                this.$stage.unwrap(),
                this.$stage.children().contents().unwrap(),
                this.$stage.children().unwrap(),
                this.$stage.remove(),
                this.$element
                    .removeClass(this.options.refreshClass)
                    .removeClass(this.options.loadingClass)
                    .removeClass(this.options.loadedClass)
                    .removeClass(this.options.rtlClass)
                    .removeClass(this.options.dragClass)
                    .removeClass(this.options.grabClass)
                    .attr(
                        "class",
                        this.$element
                            .attr("class")
                            .replace(
                                new RegExp(
                                    this.options.responsiveClass + "-\\S+\\s",
                                    "g"
                                ),
                                ""
                            )
                    )
                    .removeData("owl.carousel");
        }),
        (e.prototype.op = function (a, b, c) {
            var d = this.settings.rtl;
            switch (b) {
                case "<":
                    return d ? a > c : a < c;
                case ">":
                    return d ? a < c : a > c;
                case ">=":
                    return d ? a <= c : a >= c;
                case "<=":
                    return d ? a >= c : a <= c;
            }
        }),
        (e.prototype.on = function (a, b, c, d) {
            a.addEventListener
                ? a.addEventListener(b, c, d)
                : a.attachEvent && a.attachEvent("on" + b, c);
        }),
        (e.prototype.off = function (a, b, c, d) {
            a.removeEventListener
                ? a.removeEventListener(b, c, d)
                : a.detachEvent && a.detachEvent("on" + b, c);
        }),
        (e.prototype.trigger = function (b, c, d, f, g) {
            var h = {
                    item: { count: this._items.length, index: this.current() },
                },
                i = a.camelCase(
                    a
                        .grep(["on", b, d], function (a) {
                            return a;
                        })
                        .join("-")
                        .toLowerCase()
                ),
                j = a.Event(
                    [b, "owl", d || "carousel"].join(".").toLowerCase(),
                    a.extend({ relatedTarget: this }, h, c)
                );
            return (
                this._supress[b] ||
                    (a.each(this._plugins, function (a, b) {
                        b.onTrigger && b.onTrigger(j);
                    }),
                    this.register({ type: e.Type.Event, name: b }),
                    this.$element.trigger(j),
                    this.settings &&
                        "function" == typeof this.settings[i] &&
                        this.settings[i].call(this, j)),
                j
            );
        }),
        (e.prototype.enter = function (b) {
            a.each(
                [b].concat(this._states.tags[b] || []),
                a.proxy(function (a, b) {
                    this._states.current[b] === d &&
                        (this._states.current[b] = 0),
                        this._states.current[b]++;
                }, this)
            );
        }),
        (e.prototype.leave = function (b) {
            a.each(
                [b].concat(this._states.tags[b] || []),
                a.proxy(function (a, b) {
                    this._states.current[b]--;
                }, this)
            );
        }),
        (e.prototype.register = function (b) {
            if (b.type === e.Type.Event) {
                if (
                    (a.event.special[b.name] || (a.event.special[b.name] = {}),
                    !a.event.special[b.name].owl)
                ) {
                    var c = a.event.special[b.name]._default;
                    (a.event.special[b.name]._default = function (a) {
                        return !c ||
                            !c.apply ||
                            (a.namespace && -1 !== a.namespace.indexOf("owl"))
                            ? a.namespace && a.namespace.indexOf("owl") > -1
                            : c.apply(this, arguments);
                    }),
                        (a.event.special[b.name].owl = !0);
                }
            } else
                b.type === e.Type.State &&
                    (this._states.tags[b.name]
                        ? (this._states.tags[b.name] = this._states.tags[
                              b.name
                          ].concat(b.tags))
                        : (this._states.tags[b.name] = b.tags),
                    (this._states.tags[b.name] = a.grep(
                        this._states.tags[b.name],
                        a.proxy(function (c, d) {
                            return (
                                a.inArray(c, this._states.tags[b.name]) === d
                            );
                        }, this)
                    )));
        }),
        (e.prototype.suppress = function (b) {
            a.each(
                b,
                a.proxy(function (a, b) {
                    this._supress[b] = !0;
                }, this)
            );
        }),
        (e.prototype.release = function (b) {
            a.each(
                b,
                a.proxy(function (a, b) {
                    delete this._supress[b];
                }, this)
            );
        }),
        (e.prototype.pointer = function (a) {
            var c = { x: null, y: null };
            return (
                (a = a.originalEvent || a || b.event),
                (a =
                    a.touches && a.touches.length
                        ? a.touches[0]
                        : a.changedTouches && a.changedTouches.length
                        ? a.changedTouches[0]
                        : a),
                a.pageX
                    ? ((c.x = a.pageX), (c.y = a.pageY))
                    : ((c.x = a.clientX), (c.y = a.clientY)),
                c
            );
        }),
        (e.prototype.isNumeric = function (a) {
            return !isNaN(parseFloat(a));
        }),
        (e.prototype.difference = function (a, b) {
            return { x: a.x - b.x, y: a.y - b.y };
        }),
        (a.fn.owlCarousel = function (b) {
            var c = Array.prototype.slice.call(arguments, 1);
            return this.each(function () {
                var d = a(this),
                    f = d.data("owl.carousel");
                f ||
                    ((f = new e(this, "object" == typeof b && b)),
                    d.data("owl.carousel", f),
                    a.each(
                        [
                            "next",
                            "prev",
                            "to",
                            "destroy",
                            "refresh",
                            "replace",
                            "add",
                            "remove",
                        ],
                        function (b, c) {
                            f.register({ type: e.Type.Event, name: c }),
                                f.$element.on(
                                    c + ".owl.carousel.core",
                                    a.proxy(function (a) {
                                        a.namespace &&
                                            a.relatedTarget !== this &&
                                            (this.suppress([c]),
                                            f[c].apply(
                                                this,
                                                [].slice.call(arguments, 1)
                                            ),
                                            this.release([c]));
                                    }, f)
                                );
                        }
                    )),
                    "string" == typeof b &&
                        "_" !== b.charAt(0) &&
                        f[b].apply(f, c);
            });
        }),
        (a.fn.owlCarousel.Constructor = e);
})(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._interval = null),
                (this._visible = null),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.settings.autoRefresh &&
                            this.watch();
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { autoRefresh: !0, autoRefreshInterval: 500 }),
            (e.prototype.watch = function () {
                this._interval ||
                    ((this._visible = this._core.isVisible()),
                    (this._interval = b.setInterval(
                        a.proxy(this.refresh, this),
                        this._core.settings.autoRefreshInterval
                    )));
            }),
            (e.prototype.refresh = function () {
                this._core.isVisible() !== this._visible &&
                    ((this._visible = !this._visible),
                    this._core.$element.toggleClass(
                        "owl-hidden",
                        !this._visible
                    ),
                    this._visible &&
                        this._core.invalidate("width") &&
                        this._core.refresh());
            }),
            (e.prototype.destroy = function () {
                var a, c;
                b.clearInterval(this._interval);
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.AutoRefresh = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._loaded = []),
                (this._handlers = {
                    "initialized.owl.carousel change.owl.carousel resized.owl.carousel":
                        a.proxy(function (b) {
                            if (
                                b.namespace &&
                                this._core.settings &&
                                this._core.settings.lazyLoad &&
                                ((b.property &&
                                    "position" == b.property.name) ||
                                    "initialized" == b.type)
                            ) {
                                var c = this._core.settings,
                                    e =
                                        (c.center && Math.ceil(c.items / 2)) ||
                                        c.items,
                                    f = (c.center && -1 * e) || 0,
                                    g =
                                        (b.property && b.property.value !== d
                                            ? b.property.value
                                            : this._core.current()) + f,
                                    h = this._core.clones().length,
                                    i = a.proxy(function (a, b) {
                                        this.load(b);
                                    }, this);
                                for (
                                    c.lazyLoadEager > 0 &&
                                    ((e += c.lazyLoadEager),
                                    c.loop && ((g -= c.lazyLoadEager), e++));
                                    f++ < e;

                                )
                                    this.load(h / 2 + this._core.relative(g)),
                                        h &&
                                            a.each(
                                                this._core.clones(
                                                    this._core.relative(g)
                                                ),
                                                i
                                            ),
                                        g++;
                            }
                        }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers);
        };
        (e.Defaults = { lazyLoad: !1, lazyLoadEager: 0 }),
            (e.prototype.load = function (c) {
                var d = this._core.$stage.children().eq(c),
                    e = d && d.find(".owl-lazy");
                !e ||
                    a.inArray(d.get(0), this._loaded) > -1 ||
                    (e.each(
                        a.proxy(function (c, d) {
                            var e,
                                f = a(d),
                                g =
                                    (b.devicePixelRatio > 1 &&
                                        f.attr("data-src-retina")) ||
                                    f.attr("data-src") ||
                                    f.attr("data-srcset");
                            this._core.trigger(
                                "load",
                                { element: f, url: g },
                                "lazy"
                            ),
                                f.is("img")
                                    ? f
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  f.css("opacity", 1),
                                                      this._core.trigger(
                                                          "loaded",
                                                          {
                                                              element: f,
                                                              url: g,
                                                          },
                                                          "lazy"
                                                      );
                                              }, this)
                                          )
                                          .attr("src", g)
                                    : f.is("source")
                                    ? f
                                          .one(
                                              "load.owl.lazy",
                                              a.proxy(function () {
                                                  this._core.trigger(
                                                      "loaded",
                                                      { element: f, url: g },
                                                      "lazy"
                                                  );
                                              }, this)
                                          )
                                          .attr("srcset", g)
                                    : ((e = new Image()),
                                      (e.onload = a.proxy(function () {
                                          f.css({
                                              "background-image":
                                                  'url("' + g + '")',
                                              opacity: "1",
                                          }),
                                              this._core.trigger(
                                                  "loaded",
                                                  { element: f, url: g },
                                                  "lazy"
                                              );
                                      }, this)),
                                      (e.src = g));
                        }, this)
                    ),
                    this._loaded.push(d.get(0)));
            }),
            (e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this._core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Lazy = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (c) {
            (this._core = c),
                (this._previousHeight = null),
                (this._handlers = {
                    "initialized.owl.carousel refreshed.owl.carousel": a.proxy(
                        function (a) {
                            a.namespace &&
                                this._core.settings.autoHeight &&
                                this.update();
                        },
                        this
                    ),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.settings.autoHeight &&
                            "position" === a.property.name &&
                            this.update();
                    }, this),
                    "loaded.owl.lazy": a.proxy(function (a) {
                        a.namespace &&
                            this._core.settings.autoHeight &&
                            a.element
                                .closest("." + this._core.settings.itemClass)
                                .index() === this._core.current() &&
                            this.update();
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers),
                (this._intervalId = null);
            var d = this;
            a(b).on("load", function () {
                d._core.settings.autoHeight && d.update();
            }),
                a(b).resize(function () {
                    d._core.settings.autoHeight &&
                        (null != d._intervalId && clearTimeout(d._intervalId),
                        (d._intervalId = setTimeout(function () {
                            d.update();
                        }, 250)));
                });
        };
        (e.Defaults = { autoHeight: !1, autoHeightClass: "owl-height" }),
            (e.prototype.update = function () {
                var b = this._core._current,
                    c = b + this._core.settings.items,
                    d = this._core.settings.lazyLoad,
                    e = this._core.$stage.children().toArray().slice(b, c),
                    f = [],
                    g = 0;
                a.each(e, function (b, c) {
                    f.push(a(c).height());
                }),
                    (g = Math.max.apply(null, f)),
                    g <= 1 &&
                        d &&
                        this._previousHeight &&
                        (g = this._previousHeight),
                    (this._previousHeight = g),
                    this._core.$stage
                        .parent()
                        .height(g)
                        .addClass(this._core.settings.autoHeightClass);
            }),
            (e.prototype.destroy = function () {
                var a, b;
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.AutoHeight = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._videos = {}),
                (this._playing = null),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.register({
                                type: "state",
                                name: "playing",
                                tags: ["interacting"],
                            });
                    }, this),
                    "resize.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.settings.video &&
                            this.isInFullScreen() &&
                            a.preventDefault();
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.is("resizing") &&
                            this._core.$stage
                                .find(".cloned .owl-video-frame")
                                .remove();
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            "position" === a.property.name &&
                            this._playing &&
                            this.stop();
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content).find(".owl-video");
                            c.length &&
                                (c.css("display", "none"),
                                this.fetch(c, a(b.content)));
                        }
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this._core.$element.on(this._handlers),
                this._core.$element.on(
                    "click.owl.video",
                    ".owl-video-play-icon",
                    a.proxy(function (a) {
                        this.play(a);
                    }, this)
                );
        };
        (e.Defaults = { video: !1, videoHeight: !1, videoWidth: !1 }),
            (e.prototype.fetch = function (a, b) {
                var c = (function () {
                        return a.attr("data-vimeo-id")
                            ? "vimeo"
                            : a.attr("data-vzaar-id")
                            ? "vzaar"
                            : "youtube";
                    })(),
                    d =
                        a.attr("data-vimeo-id") ||
                        a.attr("data-youtube-id") ||
                        a.attr("data-vzaar-id"),
                    e = a.attr("data-width") || this._core.settings.videoWidth,
                    f =
                        a.attr("data-height") ||
                        this._core.settings.videoHeight,
                    g = a.attr("href");
                if (!g) throw new Error("Missing video URL.");
                if (
                    ((d = g.match(
                        /(http:|https:|)\/\/(player.|www.|app.)?(vimeo\.com|youtu(be\.com|\.be|be\.googleapis\.com|be\-nocookie\.com)|vzaar\.com)\/(video\/|videos\/|embed\/|channels\/.+\/|groups\/.+\/|watch\?v=|v\/)?([A-Za-z0-9._%-]*)(\&\S+)?/
                    )),
                    d[3].indexOf("youtu") > -1)
                )
                    c = "youtube";
                else if (d[3].indexOf("vimeo") > -1) c = "vimeo";
                else {
                    if (!(d[3].indexOf("vzaar") > -1))
                        throw new Error("Video URL not supported.");
                    c = "vzaar";
                }
                (d = d[6]),
                    (this._videos[g] = { type: c, id: d, width: e, height: f }),
                    b.attr("data-video", g),
                    this.thumbnail(a, this._videos[g]);
            }),
            (e.prototype.thumbnail = function (b, c) {
                var d,
                    e,
                    f,
                    g =
                        c.width && c.height
                            ? "width:" +
                              c.width +
                              "px;height:" +
                              c.height +
                              "px;"
                            : "",
                    h = b.find("img"),
                    i = "src",
                    j = "",
                    k = this._core.settings,
                    l = function (c) {
                        (e = '<div class="owl-video-play-icon"></div>'),
                            (d = k.lazyLoad
                                ? a("<div/>", {
                                      class: "owl-video-tn " + j,
                                      srcType: c,
                                  })
                                : a("<div/>", {
                                      class: "owl-video-tn",
                                      style:
                                          "opacity:1;background-image:url(" +
                                          c +
                                          ")",
                                  })),
                            b.after(d),
                            b.after(e);
                    };
                if (
                    (b.wrap(
                        a("<div/>", { class: "owl-video-wrapper", style: g })
                    ),
                    this._core.settings.lazyLoad &&
                        ((i = "data-src"), (j = "owl-lazy")),
                    h.length)
                )
                    return l(h.attr(i)), h.remove(), !1;
                "youtube" === c.type
                    ? ((f = "//img.youtube.com/vi/" + c.id + "/hqdefault.jpg"),
                      l(f))
                    : "vimeo" === c.type
                    ? a.ajax({
                          type: "GET",
                          url: "//vimeo.com/api/v2/video/" + c.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (a) {
                              (f = a[0].thumbnail_large), l(f);
                          },
                      })
                    : "vzaar" === c.type &&
                      a.ajax({
                          type: "GET",
                          url: "//vzaar.com/api/videos/" + c.id + ".json",
                          jsonp: "callback",
                          dataType: "jsonp",
                          success: function (a) {
                              (f = a.framegrab_url), l(f);
                          },
                      });
            }),
            (e.prototype.stop = function () {
                this._core.trigger("stop", null, "video"),
                    this._playing.find(".owl-video-frame").remove(),
                    this._playing.removeClass("owl-video-playing"),
                    (this._playing = null),
                    this._core.leave("playing"),
                    this._core.trigger("stopped", null, "video");
            }),
            (e.prototype.play = function (b) {
                var c,
                    d = a(b.target),
                    e = d.closest("." + this._core.settings.itemClass),
                    f = this._videos[e.attr("data-video")],
                    g = f.width || "100%",
                    h = f.height || this._core.$stage.height();
                this._playing ||
                    (this._core.enter("playing"),
                    this._core.trigger("play", null, "video"),
                    (e = this._core.items(this._core.relative(e.index()))),
                    this._core.reset(e.index()),
                    (c = a(
                        '<iframe frameborder="0" allowfullscreen mozallowfullscreen webkitAllowFullScreen ></iframe>'
                    )),
                    c.attr("height", h),
                    c.attr("width", g),
                    "youtube" === f.type
                        ? c.attr(
                              "src",
                              "//www.youtube.com/embed/" +
                                  f.id +
                                  "?autoplay=1&rel=0&v=" +
                                  f.id
                          )
                        : "vimeo" === f.type
                        ? c.attr(
                              "src",
                              "//player.vimeo.com/video/" + f.id + "?autoplay=1"
                          )
                        : "vzaar" === f.type &&
                          c.attr(
                              "src",
                              "//view.vzaar.com/" +
                                  f.id +
                                  "/player?autoplay=true"
                          ),
                    a(c)
                        .wrap('<div class="owl-video-frame" />')
                        .insertAfter(e.find(".owl-video")),
                    (this._playing = e.addClass("owl-video-playing")));
            }),
            (e.prototype.isInFullScreen = function () {
                var b =
                    c.fullscreenElement ||
                    c.mozFullScreenElement ||
                    c.webkitFullscreenElement;
                return b && a(b).parent().hasClass("owl-video-frame");
            }),
            (e.prototype.destroy = function () {
                var a, b;
                this._core.$element.off("click.owl.video");
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Video = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this.core = b),
                (this.core.options = a.extend(
                    {},
                    e.Defaults,
                    this.core.options
                )),
                (this.swapping = !0),
                (this.previous = d),
                (this.next = d),
                (this.handlers = {
                    "change.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            "position" == a.property.name &&
                            ((this.previous = this.core.current()),
                            (this.next = a.property.value));
                    }, this),
                    "drag.owl.carousel dragged.owl.carousel translated.owl.carousel":
                        a.proxy(function (a) {
                            a.namespace &&
                                (this.swapping = "translated" == a.type);
                        }, this),
                    "translate.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this.swapping &&
                            (this.core.options.animateOut ||
                                this.core.options.animateIn) &&
                            this.swap();
                    }, this),
                }),
                this.core.$element.on(this.handlers);
        };
        (e.Defaults = { animateOut: !1, animateIn: !1 }),
            (e.prototype.swap = function () {
                if (
                    1 === this.core.settings.items &&
                    a.support.animation &&
                    a.support.transition
                ) {
                    this.core.speed(0);
                    var b,
                        c = a.proxy(this.clear, this),
                        d = this.core.$stage.children().eq(this.previous),
                        e = this.core.$stage.children().eq(this.next),
                        f = this.core.settings.animateIn,
                        g = this.core.settings.animateOut;
                    this.core.current() !== this.previous &&
                        (g &&
                            ((b =
                                this.core.coordinates(this.previous) -
                                this.core.coordinates(this.next)),
                            d
                                .one(a.support.animation.end, c)
                                .css({ left: b + "px" })
                                .addClass("animated owl-animated-out")
                                .addClass(g)),
                        f &&
                            e
                                .one(a.support.animation.end, c)
                                .addClass("animated owl-animated-in")
                                .addClass(f));
                }
            }),
            (e.prototype.clear = function (b) {
                a(b.target)
                    .css({ left: "" })
                    .removeClass("animated owl-animated-out owl-animated-in")
                    .removeClass(this.core.settings.animateIn)
                    .removeClass(this.core.settings.animateOut),
                    this.core.onTransitionEnd();
            }),
            (e.prototype.destroy = function () {
                var a, b;
                for (a in this.handlers)
                    this.core.$element.off(a, this.handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Animate = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        var e = function (b) {
            (this._core = b),
                (this._call = null),
                (this._time = 0),
                (this._timeout = 0),
                (this._paused = !0),
                (this._handlers = {
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace && "settings" === a.property.name
                            ? this._core.settings.autoplay
                                ? this.play()
                                : this.stop()
                            : a.namespace &&
                              "position" === a.property.name &&
                              this._paused &&
                              (this._time = 0);
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.settings.autoplay &&
                            this.play();
                    }, this),
                    "play.owl.autoplay": a.proxy(function (a, b, c) {
                        a.namespace && this.play(b, c);
                    }, this),
                    "stop.owl.autoplay": a.proxy(function (a) {
                        a.namespace && this.stop();
                    }, this),
                    "mouseover.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause &&
                            this._core.is("rotating") &&
                            this.pause();
                    }, this),
                    "mouseleave.owl.autoplay": a.proxy(function () {
                        this._core.settings.autoplayHoverPause &&
                            this._core.is("rotating") &&
                            this.play();
                    }, this),
                    "touchstart.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause &&
                            this._core.is("rotating") &&
                            this.pause();
                    }, this),
                    "touchend.owl.core": a.proxy(function () {
                        this._core.settings.autoplayHoverPause && this.play();
                    }, this),
                }),
                this._core.$element.on(this._handlers),
                (this._core.options = a.extend(
                    {},
                    e.Defaults,
                    this._core.options
                ));
        };
        (e.Defaults = {
            autoplay: !1,
            autoplayTimeout: 5e3,
            autoplayHoverPause: !1,
            autoplaySpeed: !1,
        }),
            (e.prototype._next = function (d) {
                (this._call = b.setTimeout(
                    a.proxy(this._next, this, d),
                    this._timeout *
                        (Math.round(this.read() / this._timeout) + 1) -
                        this.read()
                )),
                    this._core.is("interacting") ||
                        c.hidden ||
                        this._core.next(d || this._core.settings.autoplaySpeed);
            }),
            (e.prototype.read = function () {
                return new Date().getTime() - this._time;
            }),
            (e.prototype.play = function (c, d) {
                var e;
                this._core.is("rotating") || this._core.enter("rotating"),
                    (c = c || this._core.settings.autoplayTimeout),
                    (e = Math.min(this._time % (this._timeout || c), c)),
                    this._paused
                        ? ((this._time = this.read()), (this._paused = !1))
                        : b.clearTimeout(this._call),
                    (this._time += (this.read() % c) - e),
                    (this._timeout = c),
                    (this._call = b.setTimeout(
                        a.proxy(this._next, this, d),
                        c - e
                    ));
            }),
            (e.prototype.stop = function () {
                this._core.is("rotating") &&
                    ((this._time = 0),
                    (this._paused = !0),
                    b.clearTimeout(this._call),
                    this._core.leave("rotating"));
            }),
            (e.prototype.pause = function () {
                this._core.is("rotating") &&
                    !this._paused &&
                    ((this._time = this.read()),
                    (this._paused = !0),
                    b.clearTimeout(this._call));
            }),
            (e.prototype.destroy = function () {
                var a, b;
                this.stop();
                for (a in this._handlers)
                    this._core.$element.off(a, this._handlers[a]);
                for (b in Object.getOwnPropertyNames(this))
                    "function" != typeof this[b] && (this[b] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.autoplay = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        "use strict";
        var e = function (b) {
            (this._core = b),
                (this._initialized = !1),
                (this._pages = []),
                (this._controls = {}),
                (this._templates = []),
                (this.$element = this._core.$element),
                (this._overrides = {
                    next: this._core.next,
                    prev: this._core.prev,
                    to: this._core.to,
                }),
                (this._handlers = {
                    "prepared.owl.carousel": a.proxy(function (b) {
                        b.namespace &&
                            this._core.settings.dotsData &&
                            this._templates.push(
                                '<div class="' +
                                    this._core.settings.dotClass +
                                    '">' +
                                    a(b.content)
                                        .find("[data-dot]")
                                        .addBack("[data-dot]")
                                        .attr("data-dot") +
                                    "</div>"
                            );
                    }, this),
                    "added.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.settings.dotsData &&
                            this._templates.splice(
                                a.position,
                                0,
                                this._templates.pop()
                            );
                    }, this),
                    "remove.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._core.settings.dotsData &&
                            this._templates.splice(a.position, 1);
                    }, this),
                    "changed.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            "position" == a.property.name &&
                            this.draw();
                    }, this),
                    "initialized.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            !this._initialized &&
                            (this._core.trigger(
                                "initialize",
                                null,
                                "navigation"
                            ),
                            this.initialize(),
                            this.update(),
                            this.draw(),
                            (this._initialized = !0),
                            this._core.trigger(
                                "initialized",
                                null,
                                "navigation"
                            ));
                    }, this),
                    "refreshed.owl.carousel": a.proxy(function (a) {
                        a.namespace &&
                            this._initialized &&
                            (this._core.trigger("refresh", null, "navigation"),
                            this.update(),
                            this.draw(),
                            this._core.trigger(
                                "refreshed",
                                null,
                                "navigation"
                            ));
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this.$element.on(this._handlers);
        };
        (e.Defaults = {
            nav: !1,
            navText: [
                '<span aria-label="Previous">&#x2039;</span>',
                '<span aria-label="Next">&#x203a;</span>',
            ],
            navSpeed: !1,
            navElement: 'button type="button" role="presentation"',
            navContainer: !1,
            navContainerClass: "owl-nav",
            navClass: ["owl-prev", "owl-next"],
            slideBy: 1,
            dotClass: "owl-dot",
            dotsClass: "owl-dots",
            dots: !0,
            dotsEach: !1,
            dotsData: !1,
            dotsSpeed: !1,
            dotsContainer: !1,
        }),
            (e.prototype.initialize = function () {
                var b,
                    c = this._core.settings;
                (this._controls.$relative = (
                    c.navContainer
                        ? a(c.navContainer)
                        : a("<div>")
                              .addClass(c.navContainerClass)
                              .appendTo(this.$element)
                ).addClass("disabled")),
                    (this._controls.$previous = a("<" + c.navElement + ">")
                        .addClass(c.navClass[0])
                        .html(c.navText[0])
                        .prependTo(this._controls.$relative)
                        .on(
                            "click",
                            a.proxy(function (a) {
                                this.prev(c.navSpeed);
                            }, this)
                        )),
                    (this._controls.$next = a("<" + c.navElement + ">")
                        .addClass(c.navClass[1])
                        .html(c.navText[1])
                        .appendTo(this._controls.$relative)
                        .on(
                            "click",
                            a.proxy(function (a) {
                                this.next(c.navSpeed);
                            }, this)
                        )),
                    c.dotsData ||
                        (this._templates = [
                            a('<button role="button">')
                                .addClass(c.dotClass)
                                .append(a("<span>"))
                                .prop("outerHTML"),
                        ]),
                    (this._controls.$absolute = (
                        c.dotsContainer
                            ? a(c.dotsContainer)
                            : a("<div>")
                                  .addClass(c.dotsClass)
                                  .appendTo(this.$element)
                    ).addClass("disabled")),
                    this._controls.$absolute.on(
                        "click",
                        "button",
                        a.proxy(function (b) {
                            var d = a(b.target)
                                .parent()
                                .is(this._controls.$absolute)
                                ? a(b.target).index()
                                : a(b.target).parent().index();
                            b.preventDefault(), this.to(d, c.dotsSpeed);
                        }, this)
                    );
                for (b in this._overrides)
                    this._core[b] = a.proxy(this[b], this);
            }),
            (e.prototype.destroy = function () {
                var a, b, c, d, e;
                e = this._core.settings;
                for (a in this._handlers)
                    this.$element.off(a, this._handlers[a]);
                for (b in this._controls)
                    "$relative" === b && e.navContainer
                        ? this._controls[b].html("")
                        : this._controls[b].remove();
                for (d in this.overides) this._core[d] = this._overrides[d];
                for (c in Object.getOwnPropertyNames(this))
                    "function" != typeof this[c] && (this[c] = null);
            }),
            (e.prototype.update = function () {
                var a,
                    b,
                    c,
                    d = this._core.clones().length / 2,
                    e = d + this._core.items().length,
                    f = this._core.maximum(!0),
                    g = this._core.settings,
                    h =
                        g.center || g.autoWidth || g.dotsData
                            ? 1
                            : g.dotsEach || g.items;
                if (
                    ("page" !== g.slideBy &&
                        (g.slideBy = Math.min(g.slideBy, g.items)),
                    g.dots || "page" == g.slideBy)
                )
                    for (this._pages = [], a = d, b = 0, c = 0; a < e; a++) {
                        if (b >= h || 0 === b) {
                            if (
                                (this._pages.push({
                                    start: Math.min(f, a - d),
                                    end: a - d + h - 1,
                                }),
                                Math.min(f, a - d) === f)
                            )
                                break;
                            (b = 0), ++c;
                        }
                        b += this._core.mergers(this._core.relative(a));
                    }
            }),
            (e.prototype.draw = function () {
                var b,
                    c = this._core.settings,
                    d = this._core.items().length <= c.items,
                    e = this._core.relative(this._core.current()),
                    f = c.loop || c.rewind;
                this._controls.$relative.toggleClass("disabled", !c.nav || d),
                    c.nav &&
                        (this._controls.$previous.toggleClass(
                            "disabled",
                            !f && e <= this._core.minimum(!0)
                        ),
                        this._controls.$next.toggleClass(
                            "disabled",
                            !f && e >= this._core.maximum(!0)
                        )),
                    this._controls.$absolute.toggleClass(
                        "disabled",
                        !c.dots || d
                    ),
                    c.dots &&
                        ((b =
                            this._pages.length -
                            this._controls.$absolute.children().length),
                        c.dotsData && 0 !== b
                            ? this._controls.$absolute.html(
                                  this._templates.join("")
                              )
                            : b > 0
                            ? this._controls.$absolute.append(
                                  new Array(b + 1).join(this._templates[0])
                              )
                            : b < 0 &&
                              this._controls.$absolute
                                  .children()
                                  .slice(b)
                                  .remove(),
                        this._controls.$absolute
                            .find(".active")
                            .removeClass("active"),
                        this._controls.$absolute
                            .children()
                            .eq(a.inArray(this.current(), this._pages))
                            .addClass("active"));
            }),
            (e.prototype.onTrigger = function (b) {
                var c = this._core.settings;
                b.page = {
                    index: a.inArray(this.current(), this._pages),
                    count: this._pages.length,
                    size:
                        c &&
                        (c.center || c.autoWidth || c.dotsData
                            ? 1
                            : c.dotsEach || c.items),
                };
            }),
            (e.prototype.current = function () {
                var b = this._core.relative(this._core.current());
                return a
                    .grep(
                        this._pages,
                        a.proxy(function (a, c) {
                            return a.start <= b && a.end >= b;
                        }, this)
                    )
                    .pop();
            }),
            (e.prototype.getPosition = function (b) {
                var c,
                    d,
                    e = this._core.settings;
                return (
                    "page" == e.slideBy
                        ? ((c = a.inArray(this.current(), this._pages)),
                          (d = this._pages.length),
                          b ? ++c : --c,
                          (c = this._pages[((c % d) + d) % d].start))
                        : ((c = this._core.relative(this._core.current())),
                          (d = this._core.items().length),
                          b ? (c += e.slideBy) : (c -= e.slideBy)),
                    c
                );
            }),
            (e.prototype.next = function (b) {
                a.proxy(this._overrides.to, this._core)(
                    this.getPosition(!0),
                    b
                );
            }),
            (e.prototype.prev = function (b) {
                a.proxy(this._overrides.to, this._core)(
                    this.getPosition(!1),
                    b
                );
            }),
            (e.prototype.to = function (b, c, d) {
                var e;
                !d && this._pages.length
                    ? ((e = this._pages.length),
                      a.proxy(this._overrides.to, this._core)(
                          this._pages[((b % e) + e) % e].start,
                          c
                      ))
                    : a.proxy(this._overrides.to, this._core)(b, c);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Navigation = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        "use strict";
        var e = function (c) {
            (this._core = c),
                (this._hashes = {}),
                (this.$element = this._core.$element),
                (this._handlers = {
                    "initialized.owl.carousel": a.proxy(function (c) {
                        c.namespace &&
                            "URLHash" === this._core.settings.startPosition &&
                            a(b).trigger("hashchange.owl.navigation");
                    }, this),
                    "prepared.owl.carousel": a.proxy(function (b) {
                        if (b.namespace) {
                            var c = a(b.content)
                                .find("[data-hash]")
                                .addBack("[data-hash]")
                                .attr("data-hash");
                            if (!c) return;
                            this._hashes[c] = b.content;
                        }
                    }, this),
                    "changed.owl.carousel": a.proxy(function (c) {
                        if (c.namespace && "position" === c.property.name) {
                            var d = this._core.items(
                                    this._core.relative(this._core.current())
                                ),
                                e = a
                                    .map(this._hashes, function (a, b) {
                                        return a === d ? b : null;
                                    })
                                    .join();
                            if (!e || b.location.hash.slice(1) === e) return;
                            b.location.hash = e;
                        }
                    }, this),
                }),
                (this._core.options = a.extend(
                    {},
                    e.Defaults,
                    this._core.options
                )),
                this.$element.on(this._handlers),
                a(b).on(
                    "hashchange.owl.navigation",
                    a.proxy(function (a) {
                        var c = b.location.hash.substring(1),
                            e = this._core.$stage.children(),
                            f = this._hashes[c] && e.index(this._hashes[c]);
                        f !== d &&
                            f !== this._core.current() &&
                            this._core.to(this._core.relative(f), !1, !0);
                    }, this)
                );
        };
        (e.Defaults = { URLhashListener: !1 }),
            (e.prototype.destroy = function () {
                var c, d;
                a(b).off("hashchange.owl.navigation");
                for (c in this._handlers)
                    this._core.$element.off(c, this._handlers[c]);
                for (d in Object.getOwnPropertyNames(this))
                    "function" != typeof this[d] && (this[d] = null);
            }),
            (a.fn.owlCarousel.Constructor.Plugins.Hash = e);
    })(window.Zepto || window.jQuery, window, document),
    (function (a, b, c, d) {
        function e(b, c) {
            var e = !1,
                f = b.charAt(0).toUpperCase() + b.slice(1);
            return (
                a.each(
                    (b + " " + h.join(f + " ") + f).split(" "),
                    function (a, b) {
                        if (g[b] !== d) return (e = !c || b), !1;
                    }
                ),
                e
            );
        }
        function f(a) {
            return e(a, !0);
        }
        var g = a("<support>").get(0).style,
            h = "Webkit Moz O ms".split(" "),
            i = {
                transition: {
                    end: {
                        WebkitTransition: "webkitTransitionEnd",
                        MozTransition: "transitionend",
                        OTransition: "oTransitionEnd",
                        transition: "transitionend",
                    },
                },
                animation: {
                    end: {
                        WebkitAnimation: "webkitAnimationEnd",
                        MozAnimation: "animationend",
                        OAnimation: "oAnimationEnd",
                        animation: "animationend",
                    },
                },
            },
            j = {
                csstransforms: function () {
                    return !!e("transform");
                },
                csstransforms3d: function () {
                    return !!e("perspective");
                },
                csstransitions: function () {
                    return !!e("transition");
                },
                cssanimations: function () {
                    return !!e("animation");
                },
            };
        j.csstransitions() &&
            ((a.support.transition = new String(f("transition"))),
            (a.support.transition.end =
                i.transition.end[a.support.transition])),
            j.cssanimations() &&
                ((a.support.animation = new String(f("animation"))),
                (a.support.animation.end =
                    i.animation.end[a.support.animation])),
            j.csstransforms() &&
                ((a.support.transform = new String(f("transform"))),
                (a.support.transform3d = j.csstransforms3d()));
    })(window.Zepto || window.jQuery, window, document);
