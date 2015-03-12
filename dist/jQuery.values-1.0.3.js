/*!
 * jQuery.values
 * jQuery plugin to retrieve form input values
 *
 * @version v1.0.3
 * @link https://github.com/orianda/jQuery.values
 * @author Orianda <orianda@paan.de>
 * @license MIT
 */
(function ($) {
    "use strict";

    /**
     * Check property of input element
     * @param {jQuery} input
     * @param {string} property
     * @returns {boolean}
     */
    function prop(input, property) {
        var check = input.prop(property);
        return typeof check === 'undefined' ? $.trim(input.attr(property)).toLowerCase() === property : !!check;
    }

    /**
     * Filter select value
     * @param {Array|string|null} value
     * @returns {Array|string}
     */
    function normalizeSelectValue(value) {
        var i, l;
        if (value instanceof Array) {
            for (i = 0, l = value.length; i < l; i++) {
                if (value[i].length === 0) {
                    value.splice(i, 1);
                }
            }
            return value;
        }
        return value;
    }

    /**
     * Is the current element disabled?
     * @param {number} index
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    function isDisabled(index, element) {
        var input = $(element);
        return input.is(':disabled') || input.closest('fieldset').is(':disabled');
    }

    /**
     * Get values of all input fields in this collection and the children.
     * @return {Object}
     */
    $.fn.values = function () {
        var result = {};

        this.find(':input')
            .add(this.filter(':input'))
            .filter([
                'input:not([type])',
                'input[type=hidden]',
                'input[type=text]',
                'input[type=search]',
                'input[type=tel]',
                'input[type=url]',
                'input[type=email]',
                'input[type=password]',
                'input[type=datetime]',
                'input[type=datetime-local]',
                'input[type=date]',
                'input[type=time]',
                'input[type=week]',
                'input[type=month]',
                'input[type=number]',
                'input[type=range]',
                'input[type=color]',
                'input[type=checkbox]',
                'input[type=radio]',
                'input[type=file]',
                'select',
                'textarea'
            ].join(','))
            .not(isDisabled)
            .each(function () {
                var input = $(this),
                    name = input.attr('name') || '',
                    type = $.trim(input.is('select') ? 'select' : input.is('textarea') ? 'textarea' : input.attr('type') || 'text').toLowerCase(),
                    value;

                if ($.inArray(type, ['checkbox', 'radio']) >= 0) {
                    if (name.length) {
                        value = [];
                        $('input[type="' + type + '"][name="' + name + '"]:checked', this.form)
                            .not(isDisabled)
                            .each(function () {
                                value.push($(this).val());
                            });
                        if (type === 'radio') {
                            value = value.shift() || '';
                        }
                    } else {
                        value = input.is(':checked') ? input.val() : '';
                    }
                } else if (type === 'select') {
                    value = normalizeSelectValue(input.val());
                } else if (type === 'file') {
                    value = prop(input, 'multiple') ? this.files : this.files[0];
                } else {
                    value = input.val();
                    if (type === 'email' && prop(input, 'multiple')) {
                        value = value.length ? value.split(',') : [];
                    }
                }

                result[name] = value;
            });

        return result;
    };

}(jQuery));