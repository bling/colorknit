/*global $ */

var pattern = [
    'bbfbbfbbfbbfbbfbbfbbfbbfbbfbbf',
    'tyyytytyyytytyyytytyyytytyyyty',
    'ytytyyytytyyytytyyytytyyytytyy',
    'wwbwwbwwbwwbwwbwwbwwbwwbwwbwwb',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'wwwwwbwbwwwbwwwwwbwwwbwbwwwwwb',
    'cwwwcwcwwwwccwwwccwwwwcwcwwwcc',
    'wwwcwcwwwwwcccwcccwwwwwcwcwwwc',
    'wwcwcwwwwccwccwccwccwwwwcwcwww',
    'wgwgwwwwwggwwgwgwwggwwwwwgwgww',
    'gwgwwwgggwwgwwgwwgwwgggwwwgwgw',
    'wgwwwwwgggwwgwgwgwwgggwwwwwgwg',
    'tyyytyyytttyytttyytttyyytyyyty',
    'yyytttyyyyytttytttyyyyytttyyyt',
    'tyyytyyytttyytttyytttyyytyyyty',
    'wgwwwwwgggwwgwgwgwwgggwwwwwgwg',
    'gwgwwwgggwwgwwgwwgwwgggwwwgwgw',
    'wgwgwwwwwggwwgwgwwggwwwwwgwgww',
    'wwcwcwwwwccwccwccwccwwwwcwcwww',
    'wwwcwcwwwwwcccwcccwwwwwcwcwwwc',
    'cwwwcwcwwwwccwwwccwwwwcwcwwwcc',
    'wwwwwbwbwwwbwwwwwbwwwbwbwwwwwb',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'wwwwwwwwwwwwwwwwwwwwwwwwwwwwww',
    'wwbwwbwwbwwbwwbwwbwwbwwbwwbwwb',
    'ytytyyytytyyytytyyytytyyytytyy',
    'tyyytytyyytytyyytytyyytytyyyty',
    'bbfbbfbbfbbfbbfbbfbbfbbfbbfbbf'
];

var colorTable = buildColorMap(pattern);

function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }

    return color;
}

function buildColorMap(pattern) {
    'use strict';

    var map = {};
    pattern.forEach( function (row) {
        for (var i = 0; i < row.length; i++) {
            var cell = row[i];
            map[cell] = getRandomColor();
        }
    });

    return map;
}

function createPicker(key) {
    'use strict';

    var $picker = $('<input type="color">');
    $picker.width('50px');
    $picker.height('20px');
    $picker.val(colorTable[key]);
    $picker.change(function () {
        var newColor = $(this).val();
        $('.colorcode-' + key).css('background-color', newColor);
    });

    return $picker;
}

$(function () {
    'use strict';

    var $pattern = $('.pattern');
    var $colors = $('.colors');
    var $table = $('<table>');
    $table.css('margin-bottom', '10px');
    $table.css('border-collapse', 'collapse');

    pattern.forEach(function (row) {
        var $row = $('<tr>');
        for (var i = 0; i < row.length; i++) {
            var cell = row[i];
            var $cell = $('<td>');
            $cell.width('15px');
            $cell.height('10px');
            $cell.css('background-color', colorTable[cell]);
            $cell.addClass('colorcode-' + cell);
            $row.append($cell);
        }
        $table.append($row);
    });

    for (var key in colorTable) {
        var $picker = createPicker(key);
        $colors.append($picker);
    }

    $pattern.append($table);
});
