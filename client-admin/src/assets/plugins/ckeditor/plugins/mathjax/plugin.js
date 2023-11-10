/*
 Copyright (c) 2003-2018, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.md or https://ckeditor.com/legal/ckeditor-oss-license
*/
;(function () {
  CKEDITOR.plugins.add('mathjax', {
    lang: 'af,ar,az,bg,ca,cs,cy,da,de,de-ch,el,en,en-au,en-gb,eo,es,es-mx,et,eu,fa,fi,fr,gl,he,hr,hu,id,it,ja,km,ko,ku,lt,lv,nb,nl,no,oc,pl,pt,pt-br,ro,ru,sk,sl,sq,sv,tr,tt,ug,uk,vi,zh,zh-cn',
    requires: 'widget,dialog',
    icons: 'mathjax',
    hidpi: !0,
    init: function (b) {
      var c = b.config.mathJaxClass || 'math-tex'
      b.config.mathJaxLib || CKEDITOR.error('mathjax-no-config')
      b.widgets.add('mathjax', {
        inline: !0,
        dialog: 'mathjax',
        button: b.lang.mathjax.button,
        mask: !0,
        allowedContent: 'span(!' + c + ')',
        styleToAllowedContentRules: function (a) {
          a = a.getClassesArray()
          if (!a) return null
          a.push('!' + c)
          return 'span(' + a.join(',') + ')'
        },
        pathName: b.lang.mathjax.pathName,
        template:
          '\x3cspan class\x3d"' +
          c +
          '" style\x3d"display:inline-block" data-cke-survive\x3d1\x3e\x3c/span\x3e',
        parts: { span: 'span' },
        defaults: { math: '\\(x \x3d {-b \\pm \\sqrt{b^2-4ac} \\over 2a}\\)' },
        init: function () {
          var a = this.parts.span.getChild(0)
          ;(a && a.type == CKEDITOR.NODE_ELEMENT && a.is('iframe')) ||
            ((a = new CKEDITOR.dom.element('iframe')),
            a.setAttributes({
              style: 'border:0;width:0;height:0',
              scrolling: 'no',
              frameborder: 0,
              allowTransparency: !0,
              src: CKEDITOR.plugins.mathjax.fixSrc
            }),
            this.parts.span.append(a))
          this.once('ready', function () {
            CKEDITOR.env.ie && a.setAttribute('src', CKEDITOR.plugins.mathjax.fixSrc)
            this.frameWrapper = new CKEDITOR.plugins.mathjax.frameWrapper(a, b)
            this.frameWrapper.setValue(this.data.math)
          })
        },
        data: function () {
          this.frameWrapper && this.frameWrapper.setValue(this.data.math)
        },
        upcast: function (a, b) {
          if (
            'span' == a.name &&
            a.hasClass(c) &&
            !(1 < a.children.length || a.children[0].type != CKEDITOR.NODE_TEXT)
          ) {
            b.math = CKEDITOR.tools.htmlDecode(a.children[0].value)
            var d = a.attributes
            d.style = d.style ? d.style + ';display:inline-block' : 'display:inline-block'
            d['data-cke-survive'] = 1
            a.children[0].remove()
            return a
          }
        },
        downcast: function (a) {
          a.children[0].replaceWith(
            new CKEDITOR.htmlParser.text(CKEDITOR.tools.htmlEncode(this.data.math))
          )
          var b = a.attributes
          b.style = b.style.replace(/display:\s?inline-block;?\s?/, '')
          '' === b.style && delete b.style
          return a
        }
      })
      CKEDITOR.dialog.add('mathjax', this.path + 'dialogs/mathjax.js')
      b.on('contentPreview', function (a) {
        a.data.dataValue = a.data.dataValue.replace(
          /<\/head>/,
          '\x3cscript src\x3d"' +
            CKEDITOR.getUrl(b.config.mathJaxLib) +
            '"\x3e\x3c/script\x3e\x3c/head\x3e'
        )
      })
      b.on('paste', function (a) {
        a.data.dataValue = a.data.dataValue.replace(
          new RegExp('\x3cspan[^\x3e]*?' + c + '.*?\x3c/span\x3e', 'ig'),
          function (a) {
            return a.replace(/(<iframe.*?\/iframe>)/i, '')
          }
        )
      })
    }
  })
  CKEDITOR.plugins.mathjax = {}
  CKEDITOR.plugins.mathjax.fixSrc = CKEDITOR.env.gecko
    ? 'javascript:true'
    : CKEDITOR.env.ie
    ? 'javascript:void((function(){' +
      encodeURIComponent('document.open();(' + CKEDITOR.tools.fixDomain + ')();document.close();') +
      '})())'
    : 'javascript:void(0)'
  CKEDITOR.plugins.mathjax.loadingIcon = CKEDITOR.plugins.get('mathjax').path + 'images/loader.gif'
  CKEDITOR.plugins.mathjax.copyStyles = function (b, c) {
    for (
      var a = 'color font-family font-style font-weight font-variant font-size'.split(' '), e = 0;
      e < a.length;
      e++
    ) {
      var d = a[e],
        g = b.getComputedStyle(d)
      g && c.setStyle(d, g)
    }
  }
  CKEDITOR.plugins.mathjax.trim = function (b) {
    var c = b.indexOf('\\(') + 2,
      a = b.lastIndexOf('\\)')
    return b.substring(c, a)
  }
  CKEDITOR.plugins.mathjax.frameWrapper =
    CKEDITOR.env.ie && 8 == CKEDITOR.env.version
      ? function (b, c) {
          b.getFrameDocument().write(
            '\x3c!DOCTYPE html\x3e\x3chtml\x3e\x3chead\x3e\x3cmeta charset\x3d"utf-8"\x3e\x3c/head\x3e\x3cbody style\x3d"padding:0;margin:0;background:transparent;overflow:hidden"\x3e\x3cspan style\x3d"white-space:nowrap;" id\x3d"tex"\x3e\x3c/span\x3e\x3c/body\x3e\x3c/html\x3e'
          )
          return {
            setValue: function (a) {
              var e = b.getFrameDocument(),
                d = e.getById('tex')
              d.setHtml(CKEDITOR.plugins.mathjax.trim(CKEDITOR.tools.htmlEncode(a)))
              CKEDITOR.plugins.mathjax.copyStyles(b, d)
              c.fire('lockSnapshot')
              b.setStyles({
                width: Math.min(250, d.$.offsetWidth) + 'px',
                height: e.$.body.offsetHeight + 'px',
                display: 'inline',
                'vertical-align': 'middle'
              })
              c.fire('unlockSnapshot')
            }
          }
        }
      : function (b, c) {
          function a() {
            f = b.getFrameDocument()
            f.getById('preview') ||
              (CKEDITOR.env.ie && b.removeAttribute('src'),
              f.write(
                '\x3c!DOCTYPE html\x3e\x3chtml\x3e\x3chead\x3e\x3cmeta charset\x3d"utf-8"\x3e\x3cscript type\x3d"text/x-mathjax-config"\x3eMathJax.Hub.Config( {showMathMenu: false,messageStyle: "none"} );function getCKE() {if ( typeof window.parent.CKEDITOR \x3d\x3d \'object\' ) {return window.parent.CKEDITOR;} else {return window.parent.parent.CKEDITOR;}}function update() {MathJax.Hub.Queue([ \'Typeset\', MathJax.Hub, this.buffer ],function() {getCKE().tools.callFunction( ' +
                  n +
                  ' );});}MathJax.Hub.Queue( function() {getCKE().tools.callFunction(' +
                  p +
                  ');} );\x3c/script\x3e\x3cscript src\x3d"' +
                  c.config.mathJaxLib +
                  '"\x3e\x3c/script\x3e\x3c/head\x3e\x3cbody style\x3d"padding:0;margin:0;background:transparent;overflow:hidden"\x3e\x3cspan id\x3d"preview"\x3e\x3c/span\x3e\x3cspan id\x3d"buffer" style\x3d"display:none"\x3e\x3c/span\x3e\x3c/body\x3e\x3c/html\x3e'
              ))
          }
          function e() {
            m = !0
            h = k
            c.fire('lockSnapshot')
            d.setHtml(h)
            g.setHtml(
              '\x3cimg src\x3d' +
                CKEDITOR.plugins.mathjax.loadingIcon +
                ' alt\x3d' +
                c.lang.mathjax.loading +
                '\x3e'
            )
            b.setStyles({
              height: '16px',
              width: '16px',
              display: 'inline',
              'vertical-align': 'middle'
            })
            c.fire('unlockSnapshot')
            f.getWindow().$.update(h)
          }
          var d,
            g,
            h,
            k,
            f = b.getFrameDocument(),
            l = !1,
            m = !1,
            p = CKEDITOR.tools.addFunction(function () {
              g = f.getById('preview')
              d = f.getById('buffer')
              l = !0
              k && e()
              CKEDITOR.fire('mathJaxLoaded', b)
            }),
            n = CKEDITOR.tools.addFunction(function () {
              CKEDITOR.plugins.mathjax.copyStyles(b, g)
              g.setHtml(d.getHtml())
              c.fire('lockSnapshot')
              b.setStyles({ height: 0, width: 0 })
              var a = Math.max(f.$.body.offsetHeight, f.$.documentElement.offsetHeight),
                l = Math.max(g.$.offsetWidth, f.$.body.scrollWidth)
              b.setStyles({ height: a + 'px', width: l + 'px' })
              c.fire('unlockSnapshot')
              CKEDITOR.fire('mathJaxUpdateDone', b)
              h != k ? e() : (m = !1)
            })
          b.on('load', a)
          a()
          return {
            setValue: function (a) {
              k = CKEDITOR.tools.htmlEncode(a)
              l && !m && e()
            }
          }
        }
})()
