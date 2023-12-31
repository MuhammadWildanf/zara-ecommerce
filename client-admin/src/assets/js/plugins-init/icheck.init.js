function icheckfirstinit() {
  $().iCheck &&
    ($('.check').each(function () {
      var i = $(this).attr('data-checkbox')
          ? $(this).attr('data-checkbox')
          : 'icheckbox_minimal-red',
        a = $(this).attr('data-radio') ? $(this).attr('data-radio') : 'iradio_minimal-red'
      i.indexOf('_line') > -1 || a.indexOf('_line') > -1
        ? $(this).iCheck({
            checkboxClass: i,
            radioClass: a,
            insert: '<div class="icheck_line-icon"></div>' + $(this).attr('data-label')
          })
        : $(this).iCheck({ checkboxClass: i, radioClass: a })
    }),
    $('.skin-polaris input').iCheck({
      checkboxClass: 'icheckbox_polaris',
      radioClass: 'iradio_polaris'
    }),
    $('.skin-futurico input').iCheck({
      checkboxClass: 'icheckbox_futurico',
      radioClass: 'iradio_futurico'
    }))
}
var iCheckcontrol = {
  init: function () {
    $('.icolors li').click(function () {
      var i = $(this)
      if (!i.hasClass('active')) {
        i.siblings().removeClass('active')
        var a = i.closest('.skin'),
          c = i.attr('class') ? '-' + i.attr('class') : '',
          e = '-black' == (e = a.data('color') ? '-' + a.data('color') : '-red') ? '' : e
        ;(checkbox_default = 'icheckbox_minimal'),
          (radio_default = 'iradio_minimal'),
          (checkbox = 'icheckbox_minimal' + e),
          (radio = 'iradio_minimal' + e),
          a.hasClass('skin-square') &&
            ((checkbox_default = 'icheckbox_square'),
            (radio_default = 'iradio_square'),
            (checkbox = 'icheckbox_square' + e),
            (radio = 'iradio_square' + e)),
          a.hasClass('skin-flat') &&
            ((checkbox_default = 'icheckbox_flat'),
            (radio_default = 'iradio_flat'),
            (checkbox = 'icheckbox_flat' + e),
            (radio = 'iradio_flat' + e)),
          a.hasClass('skin-line') &&
            ((checkbox_default = 'icheckbox_line'),
            (radio_default = 'iradio_line'),
            (checkbox = 'icheckbox_line' + e),
            (radio = 'iradio_line' + e)),
          a.find('.check').each(function () {
            var i = $(this).hasClass('state') ? $(this) : $(this).parent(),
              a = i
                .attr('class')
                .replace(checkbox, checkbox_default + c)
                .replace(radio, radio_default + c)
            i.attr('class', a)
          }),
          a.data('color', i.attr('class') ? i.attr('class') : 'black'),
          i.addClass('active')
      }
    })
  }
}
$(document).ready(function () {
  icheckfirstinit(), iCheckcontrol.init()
})
