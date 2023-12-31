!(function (t, e, o, r, i) {
  'use strict'
  function n() {
    var e = t.navigator.userAgent,
      o = ''
    return (
      /MSIE/g.test(e)
        ? (o = '-ms-')
        : /Firefox/g.test(e)
        ? (o = '-moz-')
        : /(WebKit)/i.test(e)
        ? (o = '-webkit-')
        : /Opera/g.test(e) && (o = '-o-'),
      o
    )
  }
  function s(t) {
    var e = {
      top: 'bottom',
      right: 'left',
      bottom: 'top',
      left: 'right',
      'right top': 'left bottom',
      'top right': 'bottom left',
      'bottom right': 'top left',
      'right bottom': 'left top',
      'left bottom': 'right top',
      'bottom left': 'top right',
      'top left': 'bottom right',
      'left top': 'right bottom'
    }
    return e.hasOwnProperty(t) ? e[t] : t
  }
  var a,
    p,
    u,
    l,
    h,
    f,
    g =
      ((a = /(?:rgba|rgb|hsla|hsl)\s*\([\s\d\.,%]+\)|#[a-z0-9]{3,6}|[a-z]+/i),
      (p = /\d{1,3}%/i),
      (u = /(?:to ){0,1}(?:(?:top|left|right|bottom)\s*){1,2}|\d+deg/i),
      (l = new RegExp('(' + a.source + ')\\s*(' + p.source + '){0,1}', 'i')),
      (h = new RegExp(l.source, 'gi')),
      (f = new RegExp('(?:(' + u.source + ')){0,1}\\s*,{0,1}\\s*(.*?)\\s*', 'i')),
      {
        FULL: new RegExp(
          '^(-webkit-|-moz-|-ms-|-o-){0,1}(linear|radial|repeating-linear)-gradient\\s*\\(\\s*(' +
            f.source +
            ')\\s*\\)$',
          'i'
        ),
        ANGLE: u,
        COLOR: a,
        POSITION: p,
        STOP: l,
        STOPS: h,
        PARAMETERS: new RegExp('^' + f.source + '$', 'i')
      }),
    c = {
      LINEAR: {
        parse: function (t) {
          return {
            r:
              '%' === t[1].substr(-1) ? parseInt(2.55 * t[1].slice(0, -1), 10) : parseInt(t[1], 10),
            g:
              '%' === t[2].substr(-1) ? parseInt(2.55 * t[2].slice(0, -1), 10) : parseInt(t[2], 10),
            b:
              '%' === t[3].substr(-1) ? parseInt(2.55 * t[3].slice(0, -1), 10) : parseInt(t[3], 10),
            a: 1
          }
        },
        to: function (t, e, r) {
          if (0 === t.stops.length) return e.options.emptyString
          if (1 === t.stops.length) return t.stops[0].color.to(e.options.degradationFormat)
          var i = e.options.forceStandard,
            n = e._prefix
          n || (i = !0), r && -1 !== o.inArray(r, e.options.prefixes) && ((i = !1), (n = r))
          var s =
            'linear-gradient(' +
            v.formatAngle(t.angle, i, e.options.angleUseKeyword) +
            ', ' +
            v.formatStops(t.stops, e.options.cleanPosition) +
            ')'
          return i ? s : n + s
        }
      }
    },
    v = (o.asGradient = function (t, e) {
      'object' == typeof t && void 0 === e && ((e = t), (t = i)),
        (this.value = { angle: 0, stops: [] }),
        (this.options = o.extend(!0, {}, v.defaults, e)),
        (this._type = 'LINEAR'),
        (this._prefix = null),
        (this.length = this.value.stops.length),
        (this.current = 0),
        (this._stop_id_count = 0),
        this.init(t)
    })
  ;(v.prototype = {
    constructor: v,
    init: function (t) {
      t && this.fromString(t)
    },
    val: function (t) {
      return void 0 === t ? this.toString() : (this.fromString(t), this)
    },
    angle: function (t) {
      if (void 0 === t) return this.value.angle
      this.value.angle = v.parseAngle(t)
    },
    append: function (t, e) {
      return this.insert(t, e, this.length)
    },
    reorder: function () {
      this.length < 2 ||
        (this.value.stops = this.value.stops.sort(function (t, e) {
          return t.position - e.position
        }))
    },
    insert: function (t, e, o) {
      var i
      void 0 === o && (o = this.current),
        this.options.forceColorFormat && (i = this.options.forceColorFormat)
      var n = this,
        s = function (t, e) {
          ;(this.color = new r(t, i, n.options.color)),
            (this.position = v.parsePosition(e)),
            (this.id = ++n._stop_id_count)
        }
      s.prototype = {
        constructor: s,
        setPosition: function (t) {
          var e = v.parsePosition(t)
          this.position !== e && ((this.position = e), n.reorder())
        },
        setColor: function (t) {
          this.color.fromString(t)
        },
        remove: function () {
          n.removeById(this.id)
        }
      }
      var a = new s(t, e)
      return (
        this.value.stops.splice(o, 0, a), (this.length = this.length + 1), (this.current = o), a
      )
    },
    getById: function (t) {
      if (this.length > 0)
        for (var e in this.value.stops) if (t === this.value.stops[e].id) return this.value.stops[e]
      return !1
    },
    removeById: function (t) {
      var e = this.getIndexById(t)
      e && this.remove(e)
    },
    getIndexById: function (t) {
      var e = 0
      for (var o in this.value.stops) {
        if (t === this.value.stops[o].id) return e
        e++
      }
      return !1
    },
    getCurrent: function () {
      return this.value.stops[this.current]
    },
    setCurrentById: function (t) {
      var e = 0
      for (var o in this.value.stops) this.value.stops[o].id !== t ? e++ : (this.current = e)
    },
    get: function (t) {
      return (
        void 0 === t && (t = this.current),
        t >= 0 && t < this.length && ((this.current = t), this.value.stops[t])
      )
    },
    remove: function (t) {
      void 0 === t && (t = this.current),
        t >= 0 &&
          t < this.length &&
          (this.value.stops.splice(t, 1), (this.length = this.length - 1), (this.current = t - 1))
    },
    empty: function () {
      ;(this.value.stops = []), (this.length = 0), (this.current = 0)
    },
    reset: function () {
      ;(this.value._angle = 0), this.empty(), (this._prefix = null), (this._type = 'LINEAR')
    },
    type: function (t) {
      if ('string' != typeof t || !(t = t.toUpperCase()) || void 0 === c[t]) return this._type
      this._type = t
    },
    fromString: function (t) {
      this.reset()
      var e = v.parseString(t)
      if (e && ((this._prefix = e.prefix), this.type(e.type), e.value)) {
        this.value.angle = v.parseAngle(e.value.angle, null !== this._prefix)
        var r = this
        o.each(e.value.stops, function (t, e) {
          r.append(e.color, e.position)
        })
      }
    },
    toString: function (t) {
      return !0 === t && (t = n()), c[this.type()].to(this.value, this, t)
    },
    matchString: function (t) {
      return v.matchString(t)
    },
    toStringWithAngle: function (t, e) {
      var r = o.extend(!0, {}, this.value)
      return (r.angle = v.parseAngle(t)), !0 === e && (e = n()), c[this.type()].to(r, this, e)
    },
    getPrefixedStrings: function () {
      var t = []
      for (var e in this.options.prefixes) t.push(this.toString(this.options.prefixes[e]))
      return t
    }
  }),
    (v.matchString = function (t) {
      var e = v.parseString(t)
      return !!(e && e.value && e.value.stops && e.value.stops.length > 1)
    }),
    (v.parseString = function (t) {
      var e
      return (
        (t = o.trim(t)),
        null != (e = g.FULL.exec(t)) && {
          prefix: void 0 === e[1] ? null : e[1],
          type: e[2],
          value: v.parseParameters(e[3])
        }
      )
    }),
    (v.parseParameters = function (t) {
      var e
      return (
        null != (e = g.PARAMETERS.exec(t)) && {
          angle: void 0 === e[1] ? 0 : e[1],
          stops: v.parseStops(e[2])
        }
      )
    }),
    (v.parseStops = function (t) {
      var e,
        r = []
      return (
        null != (e = t.match(g.STOPS)) &&
        (o.each(e, function (t, e) {
          var o = v.parseStop(e)
          o && r.push(o)
        }),
        r)
      )
    }),
    (v.formatStops = function (t, e) {
      for (var o, r, n = [], s = [], a = [], p = 0; p < t.length; p++)
        (r =
          void 0 === (o = t[p]).position ? (0 === p ? 0 : p === t.length - 1 ? 1 : i) : o.position),
          s.push(r),
          a.push(o.color.toString())
      s = (function (t) {
        for (var e, o = null, r = 0; r < t.length; r++)
          if (isNaN(t[r])) {
            if (null === o) {
              o = r
              continue
            }
          } else if (o) {
            e = (t[r] - t[o - 1]) / (r - o + 1)
            for (var i = o; i < r; i++) t[i] = t[o - 1] + (i - o + 1) * e
            o = null
          }
        return t
      })(s)
      for (var u = 0; u < t.length; u++)
        (r =
          e && ((0 === u && 0 === s[u]) || (u === t.length - 1 && 1 === s[u]))
            ? ''
            : ' ' + v.formatPosition(s[u])),
          n.push(a[u] + r)
      return n.join(', ')
    }),
    (v.parseStop = function (t) {
      var e
      return null != (e = g.STOP.exec(t)) && { color: e[1], position: v.parsePosition(e[2]) }
    }),
    (v.parsePosition = function (t) {
      return (
        'string' == typeof t && '%' === t.substr(-1) && (t = parseFloat(t.slice(0, -1) / 100)), t
      )
    }),
    (v.formatPosition = function (t) {
      return parseInt(100 * t, 10) + '%'
    }),
    (v.parseAngle = function (t, e) {
      if (
        ('string' == typeof t && -1 !== t.indexOf('deg') && (t = t.replace('deg', '')),
        isNaN(t) || (e && (t = v.fixOldAngle(t))),
        'string' == typeof t)
      ) {
        var o = t.split(' '),
          r = []
        for (var i in o)
          (a = o[i]), /^(top|left|right|bottom)$/i.test(a) && r.push(o[i].toLowerCase())
        var n = r.join(' ')
        ;-1 === t.indexOf('to ') && (n = s(n)),
          (n = 'to ' + n),
          v.keywordAngleMap.hasOwnProperty(n) && (t = v.keywordAngleMap[n])
      }
      var a,
        p = parseFloat(t, 10)
      return p > 360 ? (p %= 360) : p < 0 && 0 !== (p %= -360) && (p = 360 + p), p
    }),
    (v.fixOldAngle = function (t) {
      return (t = parseFloat(t)), (t = Math.abs(450 - t) % 360), (t = parseFloat(t.toFixed(3)))
    }),
    (v.formatAngle = function (t, e, o) {
      return (
        (t = parseInt(t, 10)),
        o && v.angleKeywordMap.hasOwnProperty(t)
          ? ((t = v.angleKeywordMap[t]), e || (t = s(t.substr(3))))
          : (e || (t = v.fixOldAngle(t)), (t += 'deg')),
        t
      )
    }),
    (v.defaults = {
      prefixes: ['-webkit-', '-moz-', '-ms-', '-o-'],
      forceStandard: !0,
      angleUseKeyword: !0,
      emptyString: '',
      degradationFormat: !1,
      cleanPosition: !0,
      forceColorFormat: !1,
      color: {
        hexUseName: !1,
        reduceAlpha: !0,
        shortenHex: !0,
        zeroAlphaAsTransparent: !1,
        invalidValue: { r: 0, g: 0, b: 0, a: 1 }
      }
    }),
    (v.keywordAngleMap = {
      'to top': 0,
      'to right': 90,
      'to bottom': 180,
      'to left': 270,
      'to right top': 45,
      'to top right': 45,
      'to bottom right': 135,
      'to right bottom': 135,
      'to left bottom': 225,
      'to bottom left': 225,
      'to top left': 315,
      'to left top': 315
    }),
    (v.angleKeywordMap = (function (t) {
      var e = {}
      for (var o in t) t.hasOwnProperty(o) && (e[t[o]] = o)
      return e
    })(v.keywordAngleMap))
})(
  window,
  document,
  jQuery,
  (function (t) {
    'use strict'
    return void 0 !== t.asColor && t.asColor
  })(jQuery)
)
