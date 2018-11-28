(function () {
  'use strict';

  angular.module('BlurAdmin.pages.versao')
    .controller('VersaoCtrl', VersaoCtrl);

  function VersaoCtrl($scope, toastr) {

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
      if ($scope.machine.new.caminho == undefined || $scope.machine.new.descricao == undefined) {
        warning("Caminho e Descrição requeridos!", toastr);
        return;
      } else {
        var obj = { caminho: $scope.machine.new.caminho, descricao: $scope.machine.new.descricao };
        $.post(_globalBaseUrl + "versao/maintain", obj)
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
      if ($scope.machine.edit.caminho == undefined || $scope.machine.edit.descricao == undefined) {
        warning("Caminho e Descrição requeridos!", toastr);
        return;
      } else {
        var obj = { _id: $scope.machine.edit._id, caminho: $scope.machine.edit.caminho, descricao: $scope.machine.edit.descricao };
        $.post(_globalBaseUrl + "versao/maintain", obj)
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
      $.post(_globalBaseUrl + "versao/list", {})
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