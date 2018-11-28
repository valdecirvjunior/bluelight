/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.questao', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('questao', {
          url: '/questao',
          templateUrl: 'app/pages/questao/questao.html',
         // abstract: true,
          title: 'Questão',
          controller: 'QuestaoCtrl',
          sidebarMeta: {
            icon: 'ion-ios-location-outline',
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
