/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.copel', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.copel', {
        url: '/copel',
        template: '<ui-view autoscroll="true" autoscroll-body-top></ui-view>',
        abstract: true,
        title: 'Copel',
        sidebarMeta: {
          icon: 'ion-flash',
          order: 250,
        },
      }).state('main.copel.electrician', {
        url: '/electrician',
        templateUrl: 'app/pages/copel/electrician/electrician.html',
        controller: 'CopelElectricianCtrl',
        title: 'Eletricista',
        sidebarMeta: {
          order: 200,
        },
      }).state('main.copel.machine', {
        url: '/machine',
        templateUrl: 'app/pages/copel/machine/machine.html',
        controller: 'CopelMachineCtrl',
        title: 'Maquininha',
        sidebarMeta: {
          order: 200,
        },
      }).state('main.copel.report', {
        url: '/report',
        templateUrl: 'app/pages/copel/report/report.html',
        controller: 'CopelReportCtrl',
        title: 'Relatório',
        sidebarMeta: {
          order: 200,
        },
      });
  }
})();