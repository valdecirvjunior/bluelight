(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
    .controller('DashboardCtrl', DashboardCtrl);

  function DashboardCtrl($scope, toastr) {

    $scope.feedback = function(){
      window.location.href = '/#/feedback';
    }

    $scope.downloadApp = function(){
      window.open('https://drive.google.com/file/d/1OtOaOiutPoap1WSXbKED3iooc_akNtQF/view?usp=sharing', '_blank');
    }

  }
})();