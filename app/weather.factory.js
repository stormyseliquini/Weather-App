(function() {
    'use strict';

    angular
        .module('myApp')
        .factory('WeatherFactory', WeatherFactory);

    WeatherFactory.$inject = ['$http', '$q'];

    /* @ngInject */
    function WeatherFactory($http, $q) {
        var service = {
            getWeather: getWeather
        };
        return service;

        ////////////////

        function getWeather(city) {

            var defer = $q.defer();

            $http({
                method: 'GET',
                url: 'http://api.openweathermap.org/data/2.5/weather',
                params: {
                    appid: '111d10af8ebaf71c2457d00940cee937',
                    q: "'" + city + "'",
                    units: "metric"


                }

            }).then(function(response) {
                if (typeof response.data === 'object') {
                    defer.resolve(response);
                } else {
                    defer.reject('no data found :(')
                }

            }, function(error) {
                console.log(error);
                defer.reject(error);
            });

            return defer.promise;
        }
    }
})();
