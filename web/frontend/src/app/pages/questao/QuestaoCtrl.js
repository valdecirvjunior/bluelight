(function () {
  'use strict';

  angular.module('BlurAdmin.pages.questao')
    .controller('QuestaoCtrl', QuestaoCtrl);

  function QuestaoCtrl($scope, toastr) {

    $scope.pageSize = 5;
    $scope.machine = {};
    $scope.wizardProcess = false;
    $scope.filtro = {};
    $scope.filtro.numero = "";
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
      if ($scope.machine.new.pergunta == undefined || $scope.machine.new.resposta == undefined) {
        warning("pergunta e Descrição requeridos!", toastr);
        return;
      } else {
        var obj = { pergunta: $scope.machine.new.pergunta, resposta: $scope.machine.new.resposta };
        $.post(_globalBaseUrl + "questao/maintain", obj)
          .done(function (machine) {
            console.log(machine)
            if (machine._id != undefined && parseInt(machine._id) > 0) {
              if ($scope.machine._id == undefined || parseInt($scope.machine._id) < 1) {
                success("Inserido com sucesso!", toastr);
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
      }
    };
    $scope.editSave = function () {
      if ($scope.machine.edit.pergunta == undefined || $scope.machine.edit.resposta == undefined) {
        warning("pergunta e Descrição requeridos!", toastr);
        return;
      } else {
        var obj = { _id: $scope.machine.edit._id, pergunta: $scope.machine.edit.pergunta, resposta: $scope.machine.edit.resposta };
        $.post(_globalBaseUrl + "questao/maintain", obj)
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
      }
    };

    $scope.draw = function () {
      $.post(_globalBaseUrl + "questao/list", {})
        .done(function (machines) {
          console.log("teste");
          console.log(machines);
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