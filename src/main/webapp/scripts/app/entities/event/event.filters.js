/**
 * Created by llaine on 24/01/15.
 */



/**
 * Format the d params in order to get a yy/mm/dd + time string.
 * isTime params return the time with the date.
 *
 * @param d : {Date}
 * @param isTime : {Boolean}
 * @returns {string}
 */
function formatDate(d, isTime) {
    var dd = d.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = d.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = d.getFullYear();

    var hh = d.getHours();
    if (hh < 10) hh = '0' + hh;

    var MM = d.getMinutes();
    if (MM < 10) MM = '0' + MM;

    var ss = d.getSeconds();
    if (ss < 10) ss = '0' + ss;


    return !isTime ? yy + '/' + mm + '/' + dd : mm + '/' + dd + ' ' + hh + ':' + MM + ':' + ss;
}


angular.module('miageBdxAppFilters', [])
    .filter('formatDate', [function () {
        return function (date) {
            console.log(date);
        }
    }]);
