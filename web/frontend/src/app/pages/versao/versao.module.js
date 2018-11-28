/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.versao', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('versao', {
          url: '/versao',
          templateUrl: 'app/pages/versao/versao.html',
         // abstract: true,
          title: 'Versão',
          controller: 'VersaoCtrl',
          sidebarMeta: {
            icon: 'ion-help-buoy',
            order: 500,
          },
        });
        // .state('versao.cadastro', {
        //   url: '/versao',
        //   templateUrl: 'app/pages/versao/versao.html',
        //   controller: 'VersaoCtrl',
        //   title: 'Cadastro',
        //   sidebarMeta: {
        //     order: 0,
        //   },
        // });
  }

})();
