(function () {
  'use strict';

  angular.module('BlurAdmin.pages.feedback')
    .controller('FeedbackCtrl', FeedbackCtrl);

  function FeedbackCtrl($scope, toastr) {

    $scope.pageSize = 5;
    $scope.machine = {};
    $scope.wizardProcess = false;
    $scope.filtro = {};
    $scope.filtro.numero = "";
    $scope.machine.new = {};
    //$scope.deviceType = clientMachine.deviceType;
    $scope.alertTable = {
      msg: "",
      type: ""
    };

    $scope.inserir = function () {
      $scope.machine.new = {};
      $scope.action = 'new';
      _globalWizard.nextTab();
    };
    $scope.save = function () {
      // if ($scope.machine.new.pergunta == undefined || $scope.machine.new.resposta == undefined) {
      //   warning("pergunta e Descrição requeridos!", toastr);
      //   return;
      // } else {
        var obj = { 
          nome: $scope.machine.new.nome, 
          idade: $scope.machine.new.idade,
          naturalidade: $scope.machine.new.naturalidade,
          sexo: $scope.machine.new.sexo,
          telefone: $scope.machine.new.telefone,
          email: $scope.machine.new.email,
          resposta1: $scope.machine.new.resposta1,
          resposta2: $scope.machine.new.resposta2,
          resposta3: $scope.machine.new.resposta3
        
        };
        $.post(_globalBaseUrl + "feedback/maintain", obj)
          .done(function (machine) {
            if (machine._id != undefined && parseInt(machine._id) > 0) {
              if ($scope.machine._id == undefined || parseInt($scope.machine._id) < 1) {
                success("Obrigado pelo seu Feedback!", toastr);
                window.location.href = '/#/sobre';
                //$scope.draw();
                //_globalWizard.previousTab();
              }
            } else {
              error("Erro ao salvar registro!", toastr);
            }
            $scope.$apply();
          })
          .fail(function (err) {
            if (err.status == 403) {
              //error(err.responseJSON.error, toastr);
              window.location.href = '/403.html';
            } else {
              error("Falha na comunicação!", toastr);
              $scope.$apply();
            }
          });
      // }
    };
    $scope.editSave = function () {
      // if ($scope.machine.edit.pergunta == undefined || $scope.machine.edit.resposta == undefined) {
      //   warning("Pergunta e Descrição requeridos!", toastr);
      //   return;
      // } else {
        var obj = { 
          _id: $scope.machine.edit._id, 
          nome: $scope.machine.edit.nome, 
          idade: $scope.machine.edit.idade,
          naturalidade: $scope.machine.edit.naturalidade,
          sexo: $scope.machine.edit.sexo,
          telefone: $scope.machine.edit.telefone,
          email: $scope.machine.edit.email,
          resposta1: $scope.machine.edit.resposta1,
          resposta2: $scope.machine.edit.resposta2,
          resposta3: $scope.machine.edit.resposta3
        
        };
        $.post(_globalBaseUrl + "feedback/maintain", obj)
          .done(function (machine) {
            if (machine._id != undefined && parseInt(machine._id) > 0) {
              if ($scope.machine._id == undefined || parseInt($scope.machine._id) < 1) {
                success("Editado com sucesso!", toastr);
                $scope.draw();
                _globalWizard.previousTab();
              }
            } else {
              error("Erro ao salvar registro!", toastr);
            }
            $scope.$apply();
          })
          .fail(function (err) {
            if (err.status == 403) {
              //error(err.responseJSON.error, toastr);
              window.location.href = '/403.html';
            } else {
              error("Falha na comunicação!", toastr);
              $scope.$apply();
            }
          });
      //}
    };

    $scope.draw = function () {
      $.post(_globalBaseUrl + "feedback/list", {})
        .done(function (machines) {
          $scope.machines = {};
          $scope.machines = machines;
          $scope.machine = machines;
          $scope.$apply();
        })
        .fail(function (err) {
          if (err.status == 403) {
            window.location.href = '/403.html';
          } else {
            error("Falha na comunicação!", toastr);
            $scope.$apply();
          }
        });
    };

    $scope.selectMachine = function (id) {
      for (var i = 0; i < $scope.machines.length; i++) {
        if ($scope.machines[i]._id == id) {
          $scope.machine.edit = $scope.machines[i];
          break;
        }
      }
      $scope.action = 'edit';
      _globalWizard.nextTab();
    };

    $scope.draw();

  }
})();