/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.feedback', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('feedback', {
          url: '/feedback',
          templateUrl: 'app/pages/feedback/feedback.html',
         // abstract: true,
          title: 'Feedback',
          controller: 'FeedbackCtrl',
          sidebarMeta: {
            icon: 'ion-ios-heart',
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
