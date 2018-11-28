/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.sobre', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('sobre', {
          url: '/sobre',
          templateUrl: 'app/pages/sobre/sobre.html',
         // abstract: true,
          title: 'Sobre',
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
