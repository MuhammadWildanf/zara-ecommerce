/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
;(function () {
  function h(b, d) {
    for (var a = b.length, c = 0, e = 0; e < a; e += 1) {
      var g = b[e]
      if (d >= c && c + g.getText().length >= d) return { element: g, offset: d - c }
      c += g.getText().length
    }
    return null
  }
  function m(b, d) {
    for (var a = 0; a < b.length; a++) if (d(b[a])) return a
    return -1
  }
  CKEDITOR.plugins.add('textmatch', {})
  CKEDITOR.plugins.textMatch = {}
  CKEDITOR.plugins.textMatch.match = function (b, d) {
    var a = CKEDITOR.plugins.textMatch.getTextAndOffset(b),
      c = CKEDITOR.dom.selection.FILLING_CHAR_SEQUENCE,
      e = 0
    if (a)
      return (
        0 == a.text.indexOf(c) &&
          ((e = c.length), (a.text = a.text.replace(c, '')), (a.offset -= e)),
        (c = d(a.text, a.offset))
          ? {
              range: CKEDITOR.plugins.textMatch.getRangeInText(b, c.start, c.end + e),
              text: a.text.slice(c.start, c.end)
            }
          : null
      )
  }
  CKEDITOR.plugins.textMatch.getTextAndOffset = function (b) {
    if (!b.collapsed) return null
    var d = '',
      a = 0,
      c = CKEDITOR.plugins.textMatch.getAdjacentTextNodes(b),
      e = !1,
      g,
      h = b.startContainer.type != CKEDITOR.NODE_ELEMENT
    g = h
      ? m(c, function (a) {
          return b.startContainer.equals(a)
        })
      : b.startOffset - (c[0] ? c[0].getIndex() : 0)
    for (var k = c.length, f = 0; f < k; f += 1) {
      var l = c[f],
        d = d + l.getText()
      e ||
        (h
          ? f == g
            ? ((e = !0), (a += b.startOffset))
            : (a += l.getText().length)
          : (f == g && (e = !0),
            0 < f && (a += c[f - 1].getText().length),
            k == g && f + 1 == k && (a += l.getText().length)))
    }
    return { text: d, offset: a }
  }
  CKEDITOR.plugins.textMatch.getRangeInText = function (b, d, a) {
    var c = new CKEDITOR.dom.range(b.root)
    b = CKEDITOR.plugins.textMatch.getAdjacentTextNodes(b)
    d = h(b, d)
    a = h(b, a)
    c.setStart(d.element, d.offset)
    c.setEnd(a.element, a.offset)
    return c
  }
  CKEDITOR.plugins.textMatch.getAdjacentTextNodes = function (b) {
    if (!b.collapsed) return []
    var d = [],
      a,
      c,
      e
    b.startContainer.type != CKEDITOR.NODE_ELEMENT
      ? ((a = b.startContainer.getParent().getChildren()), (b = b.startContainer.getIndex()))
      : ((a = b.startContainer.getChildren()), (b = b.startOffset))
    for (e = b; (c = a.getItem(--e)); )
      if (c.type == CKEDITOR.NODE_TEXT) d.unshift(c)
      else break
    for (e = b; (c = a.getItem(e++)); )
      if (c.type == CKEDITOR.NODE_TEXT) d.push(c)
      else break
    return d
  }
})()
