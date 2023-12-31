!(function (t, s, n) {
  var o = function (t, n) {
    'use strict'
    var o = function (s, n) {
      return (
        (this.CLASS && 'ColVis' == this.CLASS) ||
          alert("Warning: ColVis must be initialised with the keyword 'new'"),
        void 0 === n && (n = {}),
        t.fn.dataTable.camelToHungarian && t.fn.dataTable.camelToHungarian(o.defaults, n),
        (this.s = { dt: null, oInit: n, hidden: !0, abOriginal: [] }),
        (this.dom = {
          wrapper: null,
          button: null,
          collection: null,
          background: null,
          catcher: null,
          buttons: [],
          groupButtons: [],
          restore: null
        }),
        o.aInstances.push(this),
        (this.s.dt = t.fn.dataTable.Api ? new t.fn.dataTable.Api(s).settings()[0] : s),
        this._fnConstruct(n),
        this
      )
    }
    return (
      (o.prototype = {
        button: function () {
          return this.dom.wrapper
        },
        fnRebuild: function () {
          this.rebuild()
        },
        rebuild: function () {
          for (var t = this.dom.buttons.length - 1; t >= 0; t--)
            this.dom.collection.removeChild(this.dom.buttons[t])
          this.dom.buttons.splice(0, this.dom.buttons.length),
            this.dom.restore && this.dom.restore.parentNode(this.dom.restore),
            this._fnAddGroups(),
            this._fnAddButtons(),
            this._fnDrawCallback()
        },
        _fnConstruct: function (n) {
          this._fnApplyCustomisation(n)
          var o,
            i,
            e = this
          for (
            this.dom.wrapper = s.createElement('div'),
              this.dom.wrapper.className = 'ColVis',
              this.dom.button = t('<button />', {
                class: this.s.dt.bJUI
                  ? 'ColVis_Button ColVis_MasterButton ui-button ui-state-default'
                  : 'ColVis_Button ColVis_MasterButton'
              })
                .append('<span>' + this.s.buttonText + '</span>')
                .bind('mouseover' == this.s.activate ? 'mouseover' : 'click', function (t) {
                  t.preventDefault(), e._fnCollectionShow()
                })
                .appendTo(this.dom.wrapper)[0],
              this.dom.catcher = this._fnDomCatcher(),
              this.dom.collection = this._fnDomCollection(),
              this.dom.background = this._fnDomBackground(),
              this._fnAddGroups(),
              this._fnAddButtons(),
              o = 0,
              i = this.s.dt.aoColumns.length;
            o < i;
            o++
          )
            this.s.abOriginal.push(this.s.dt.aoColumns[o].bVisible)
          this.s.dt.aoDrawCallback.push({
            fn: function () {
              e._fnDrawCallback.call(e)
            },
            sName: 'ColVis'
          }),
            t(this.s.dt.oInstance).bind('column-reorder', function (t, s, n) {
              for (o = 0, i = e.s.aiExclude.length; o < i; o++)
                e.s.aiExclude[o] = n.aiInvertMapping[e.s.aiExclude[o]]
              var l = e.s.abOriginal.splice(n.iFrom, 1)[0]
              e.s.abOriginal.splice(n.iTo, 0, l), e.fnRebuild()
            }),
            this._fnDrawCallback()
        },
        _fnApplyCustomisation: function (s) {
          t.extend(!0, this.s, o.defaults, s),
            !this.s.showAll && this.s.bShowAll && (this.s.showAll = this.s.sShowAll),
            !this.s.restore && this.s.bRestore && (this.s.restore = this.s.sRestore)
          var n = this.s.groups,
            i = this.s.aoGroups
          if (n)
            for (var e = 0, l = n.length; e < l; e++)
              n[e].title && (i[e].sTitle = n[e].title),
                n[e].columns && (i[e].aiColumns = n[e].columns)
        },
        _fnDrawCallback: function () {
          for (
            var s,
              n = this.s.dt.aoColumns,
              o = this.dom.buttons,
              i = this.s.aoGroups,
              e = 0,
              l = o.length;
            e < l;
            e++
          )
            void 0 !== (s = o[e]).__columnIdx &&
              t('input', s).prop('checked', n[s.__columnIdx].bVisible)
          for (
            var a = function (t) {
                for (var s = 0, o = t.length; s < o; s++) if (!1 === n[t[s]].bVisible) return !1
                return !0
              },
              u = function (t) {
                for (var s = 0, o = t.length; s < o; s++) if (!0 === n[t[s]].bVisible) return !1
                return !0
              },
              r = 0,
              d = i.length;
            r < d;
            r++
          )
            a(i[r].aiColumns)
              ? (t('input', this.dom.groupButtons[r]).prop('checked', !0),
                t('input', this.dom.groupButtons[r]).prop('indeterminate', !1))
              : u(i[r].aiColumns)
              ? (t('input', this.dom.groupButtons[r]).prop('checked', !1),
                t('input', this.dom.groupButtons[r]).prop('indeterminate', !1))
              : t('input', this.dom.groupButtons[r]).prop('indeterminate', !0)
        },
        _fnAddGroups: function () {
          var t
          if (void 0 !== this.s.aoGroups)
            for (var s = 0, n = this.s.aoGroups.length; s < n; s++)
              (t = this._fnDomGroupButton(s)),
                this.dom.groupButtons.push(t),
                this.dom.buttons.push(t),
                this.dom.collection.appendChild(t)
        },
        _fnAddButtons: function () {
          var s,
            n = this.s.dt.aoColumns
          if (-1 === t.inArray('all', this.s.aiExclude))
            for (var o = 0, i = n.length; o < i; o++)
              -1 === t.inArray(o, this.s.aiExclude) &&
                (((s = this._fnDomColumnButton(o)).__columnIdx = o), this.dom.buttons.push(s))
          'alpha' === this.s.order &&
            this.dom.buttons.sort(function (t, s) {
              var o = n[t.__columnIdx].sTitle,
                i = n[s.__columnIdx].sTitle
              return o === i ? 0 : o < i ? -1 : 1
            }),
            this.s.restore &&
              (((s = this._fnDomRestoreButton()).className += ' ColVis_Restore'),
              this.dom.buttons.push(s)),
            this.s.showAll &&
              (((s = this._fnDomShowXButton(this.s.showAll, !0)).className += ' ColVis_ShowAll'),
              this.dom.buttons.push(s)),
            this.s.showNone &&
              (((s = this._fnDomShowXButton(this.s.showNone, !1)).className += ' ColVis_ShowNone'),
              this.dom.buttons.push(s)),
            t(this.dom.collection).append(this.dom.buttons)
        },
        _fnDomRestoreButton: function () {
          var s = this,
            n = this.s.dt
          return t(
            '<li class="ColVis_Special ' +
              (n.bJUI ? 'ui-button ui-state-default' : '') +
              '">' +
              this.s.restore +
              '</li>'
          ).click(function (t) {
            for (var n = 0, o = s.s.abOriginal.length; n < o; n++)
              s.s.dt.oInstance.fnSetColumnVis(n, s.s.abOriginal[n], !1)
            s._fnAdjustOpenRows(),
              s.s.dt.oInstance.fnAdjustColumnSizing(!1),
              s.s.dt.oInstance.fnDraw(!1)
          })[0]
        },
        _fnDomShowXButton: function (s, n) {
          var o = this,
            i = this.s.dt
          return t(
            '<li class="ColVis_Special ' +
              (i.bJUI ? 'ui-button ui-state-default' : '') +
              '">' +
              s +
              '</li>'
          ).click(function (t) {
            for (var s = 0, i = o.s.abOriginal.length; s < i; s++)
              -1 === o.s.aiExclude.indexOf(s) && o.s.dt.oInstance.fnSetColumnVis(s, n, !1)
            o._fnAdjustOpenRows(),
              o.s.dt.oInstance.fnAdjustColumnSizing(!1),
              o.s.dt.oInstance.fnDraw(!1)
          })[0]
        },
        _fnDomGroupButton: function (s) {
          var n = this,
            o = this.s.dt,
            i = this.s.aoGroups[s]
          return t(
            '<li class="ColVis_Special ' +
              (o.bJUI ? 'ui-button ui-state-default' : '') +
              '"><label><input type="checkbox" /><span>' +
              i.sTitle +
              '</span></label></li>'
          ).click(function (s) {
            var o = !t('input', this).is(':checked')
            'li' !== s.target.nodeName.toLowerCase() && (o = !o)
            for (var e = 0; e < i.aiColumns.length; e++)
              n.s.dt.oInstance.fnSetColumnVis(i.aiColumns[e], o)
          })[0]
        },
        _fnDomColumnButton: function (s) {
          var n = this,
            o = this.s.dt.aoColumns[s],
            i = this.s.dt,
            e = null === this.s.fnLabel ? o.sTitle : this.s.fnLabel(s, o.sTitle, o.nTh)
          return t(
            '<li ' +
              (i.bJUI ? 'class="ui-button ui-state-default"' : '') +
              '><label><input type="checkbox" /><span>' +
              e +
              '</span></label></li>'
          ).click(function (o) {
            var e = !t('input', this).is(':checked')
            'li' !== o.target.nodeName.toLowerCase() && (e = !e)
            var l = t.fn.dataTableExt.iApiIndex
            ;(t.fn.dataTableExt.iApiIndex = n._fnDataTablesApiIndex.call(n)),
              i.oFeatures.bServerSide
                ? (n.s.dt.oInstance.fnSetColumnVis(s, e, !1),
                  n.s.dt.oInstance.fnAdjustColumnSizing(!1),
                  ('' === i.oScroll.sX && '' === i.oScroll.sY) ||
                    n.s.dt.oInstance.oApi._fnScrollDraw(n.s.dt),
                  n._fnDrawCallback())
                : n.s.dt.oInstance.fnSetColumnVis(s, e),
              (t.fn.dataTableExt.iApiIndex = l),
              'input' === o.target.nodeName.toLowerCase() &&
                null !== n.s.fnStateChange &&
                n.s.fnStateChange.call(n, s, e)
          })[0]
        },
        _fnDataTablesApiIndex: function () {
          for (var t = 0, s = this.s.dt.oInstance.length; t < s; t++)
            if (this.s.dt.oInstance[t] == this.s.dt.nTable) return t
          return 0
        },
        _fnDomCollection: function () {
          return t('<ul />', {
            class: this.s.dt.bJUI
              ? 'ColVis_collection ui-buttonset ui-buttonset-multi'
              : 'ColVis_collection'
          }).css({
            display: 'none',
            opacity: 0,
            position: this.s.bCssPosition ? '' : 'absolute'
          })[0]
        },
        _fnDomCatcher: function () {
          var n = this,
            o = s.createElement('div')
          return (
            (o.className = 'ColVis_catcher'),
            t(o).click(function () {
              n._fnCollectionHide.call(n, null, null)
            }),
            o
          )
        },
        _fnDomBackground: function () {
          var s = this,
            n = t('<div></div>')
              .addClass('ColVis_collectionBackground')
              .css('opacity', 0)
              .click(function () {
                s._fnCollectionHide.call(s, null, null)
              })
          return (
            'mouseover' == this.s.activate &&
              n.mouseover(function () {
                ;(s.s.overcollection = !1), s._fnCollectionHide.call(s, null, null)
              }),
            n[0]
          )
        },
        _fnCollectionShow: function () {
          var n,
            o = this,
            i = t(this.dom.button).offset(),
            e = this.dom.collection,
            l = this.dom.background,
            a = parseInt(i.left, 10),
            u = parseInt(i.top + t(this.dom.button).outerHeight(), 10)
          this.s.bCssPosition || ((e.style.top = u + 'px'), (e.style.left = a + 'px')),
            t(e).css({ display: 'block', opacity: 0 }),
            (l.style.bottom = '0px'),
            (l.style.right = '0px')
          var r = this.dom.catcher.style
          if (
            ((r.height = t(this.dom.button).outerHeight() + 'px'),
            (r.width = t(this.dom.button).outerWidth() + 'px'),
            (r.top = i.top + 'px'),
            (r.left = a + 'px'),
            s.body.appendChild(l),
            s.body.appendChild(e),
            s.body.appendChild(this.dom.catcher),
            t(e).animate({ opacity: 1 }, o.s.iOverlayFade),
            t(l).animate({ opacity: 0.1 }, o.s.iOverlayFade, 'linear', function () {
              t.browser && t.browser.msie && '6.0' == t.browser.version && o._fnDrawCallback()
            }),
            !this.s.bCssPosition)
          ) {
            ;(n =
              'left' == this.s.sAlign
                ? a
                : a - t(e).outerWidth() + t(this.dom.button).outerWidth()),
              (e.style.left = n + 'px')
            var d = t(e).outerWidth(),
              h = (t(e).outerHeight(), t(s).width())
            n + d > h && (e.style.left = h - d + 'px')
          }
          this.s.hidden = !1
        },
        _fnCollectionHide: function () {
          var n = this
          this.s.hidden ||
            null === this.dom.collection ||
            ((this.s.hidden = !0),
            t(this.dom.collection).animate({ opacity: 0 }, n.s.iOverlayFade, function (t) {
              this.style.display = 'none'
            }),
            t(this.dom.background).animate({ opacity: 0 }, n.s.iOverlayFade, function (t) {
              s.body.removeChild(n.dom.background), s.body.removeChild(n.dom.catcher)
            }))
        },
        _fnAdjustOpenRows: function () {
          for (
            var t = this.s.dt.aoOpenRows,
              s = this.s.dt.oApi._fnVisbleColumns(this.s.dt),
              n = 0,
              o = t.length;
            n < o;
            n++
          )
            t[n].nTr.getElementsByTagName('td')[0].colSpan = s
        }
      }),
      (o.fnRebuild = function (t) {
        var s = null
        void 0 !== t && (s = t.fnSettings().nTable)
        for (var n = 0, i = o.aInstances.length; n < i; n++)
          (void 0 !== t && s != o.aInstances[n].s.dt.nTable) || o.aInstances[n].fnRebuild()
      }),
      (o.defaults = {
        active: 'click',
        buttonText: 'Show / hide columns',
        aiExclude: [],
        bRestore: !1,
        sRestore: 'Restore original',
        bShowAll: !1,
        sShowAll: 'Show All',
        sAlign: 'left',
        fnStateChange: null,
        iOverlayFade: 500,
        fnLabel: null,
        bCssPosition: !1,
        aoGroups: [],
        order: 'column'
      }),
      (o.aInstances = []),
      (o.prototype.CLASS = 'ColVis'),
      (o.VERSION = '1.1.1'),
      (o.prototype.VERSION = o.VERSION),
      'function' == typeof t.fn.dataTable &&
      'function' == typeof t.fn.dataTableExt.fnVersionCheck &&
      t.fn.dataTableExt.fnVersionCheck('1.7.0')
        ? t.fn.dataTableExt.aoFeatures.push({
            fnInit: function (t) {
              var s = t.oInit
              return new o(t, s.colVis || s.oColVis || {}).button()
            },
            cFeature: 'C',
            sFeature: 'ColVis'
          })
        : alert('Warning: ColVis requires DataTables 1.7 or greater - www.datatables.net/download'),
      (t.fn.dataTable.ColVis = o),
      (t.fn.DataTable.ColVis = o),
      o
    )
  }
  'function' == typeof define && define.amd
    ? define(['jquery', 'datatables'], o)
    : 'object' == typeof exports
    ? o(require('jquery'), require('datatables'))
    : jQuery && !jQuery.fn.dataTable.ColVis && o(jQuery, jQuery.fn.dataTable)
})(window, document)
