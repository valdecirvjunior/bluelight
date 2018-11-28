(function () {
  'use strict';

  angular.module('BlurAdmin.pages.copel')
    .controller('CopelMachineCtrl', CopelMachineCtrl);

  function CopelMachineCtrl($scope, toastr) {

    $scope.pageSize = 5;
    $scope.machine = {};
    $scope.wizardProcess = false;
    $scope.filtro = {};
    $scope.filtro.numero = "";
    $scope.deviceType = clientMachine.deviceType;
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
      if ($scope.machine.new.number == undefined || $scope.machine.new.label == undefined) {
        warning("Numero e Label requeridos!", toastr);
        return;
      } else {
        var obj = { number: $scope.machine.new.number, label: $scope.machine.new.label };
        $.post(_globalBaseUrl + "copel/maintainMachine", obj)
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
      if ($scope.machine.edit.number == undefined || $scope.machine.edit.label == undefined) {
        warning("Numero e Label requeridos!", toastr);
        return;
      } else {
        var obj = { number: $scope.machine.edit.number, label: $scope.machine.edit.label };
        $.post(_globalBaseUrl + "copel/maintainMachine", obj)
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
    }
    $scope.draw = function () {
      var sender = {};
      if (($scope.filtro.numero != "") || ($scope.filtro.numero != undefined)) {
        sender = {
          "$or": [
            { "number": { $regex: ".*" + $scope.filtro.numero + ".*" } }
          ]
        };
      }
      sender.limit = 1000;
      $.post(_globalBaseUrl + "copel/listMachine", sender)
        .done(function (machines) {
          $scope.machines = {};
          $scope.machines = machines;
          $scope.machine = machines;
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
    };

    $scope.selectMachine = function (id) {
      for (var i = 0; i < $scope.machines.length; i++) {
        if ($scope.machines[i].number == id) {
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