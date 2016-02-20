'use strict';

/**
 * @ngdoc function
 * @name plutoniumApp.controller:P2Ctrl
 * @description
 * # P2Ctrl
 * Controller of the plutoniumApp
 */
angular.module('plutoniumApp')
  .controller('P2Ctrl', function ($scope) {
    $scope.project = { 
        "name" : "vidserver",
        "documentation": {
            "versions": {
                "1": {
                    "/watch": {
                        "GET": {
                            "usage": "Watch an example movie, streamed directly to you from pinkhelium",
                            "examples": [
                            "http://vidserver.localtunnel.me/v1/watch"
                            ],
                            "outputs": {
                                "format": "mp4 formatted video",
                                "content_type": "video/mp4"
                            }
                        }
                    }
                },
                "2": {
                    "/watch2": {
                        "GET": {
                            "usage": "Watch an example movie, streamed directly to you from pinkhelium",
                            "examples": [
                            "http://vidserver.localtunnel.me/v2/watch2"
                            ],
                            "outputs": {
                                "format": "mp4 formatted video",
                                "content_type": "video/mp4"
                            }
                        }
                    }
                }
            }
        }
    };
  });
