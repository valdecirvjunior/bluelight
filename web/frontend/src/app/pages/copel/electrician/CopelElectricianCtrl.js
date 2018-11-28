(function () {
  'use strict';

  angular.module('BlurAdmin.pages.copel')
    .controller('CopelElectricianCtrl', CopelElectricianCtrl);

  function CopelElectricianCtrl($scope, toastr) {

    $scope.pageSize = 5;
    $scope.electrician = {};
    $scope.wizardProcess = false;
    $scope.filtro = {};
    $scope.filtro.documento = "";

    $scope.inserir = function () {
      $scope.electrician.new = {};
      $scope.action = 'new';
      _globalWizard.nextTab();
    };
    $scope.save = function () {
      if ($scope.electrician.new.name == undefined || $scope.electrician.new.doc == undefined) {
        warning("Nome e Documento requeridos!", toastr);
        return;
      } else {
        if (!validateCPF($scope.electrician.new.doc)) {
          warning("CPF inválido", toastr);
          return;
        }
        var obj = { doc: $scope.electrician.new.doc, name: $scope.electrician.new.name, phone: $scope.electrician.new.phone };
        $.post(_globalBaseUrl + "copel/maintainElectrician", obj)
          .done(function (electrician) {
            if (electrician._id != undefined && parseInt(electrician._id) > 0) {
              if ($scope.electrician._id == undefined || parseInt($scope.electrician._id) < 1) {
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
      if ($scope.electrician.edit.name == undefined || $scope.electrician.edit.doc == undefined) {
        warning("Nome e Documento requeridos!", toastr);
        return;
      } else {
        if (!validateCPF($scope.electrician.edit.doc)) {
          warning("CPF inválido", toastr);
          return;
        }
        var obj = { doc: $scope.electrician.edit.doc, name: $scope.electrician.edit.name, phone: $scope.electrician.edit.phone };
        $.post(_globalBaseUrl + "copel/maintainElectrician", obj)
          .done(function (electrician) {
            if (electrician._id != undefined && parseInt(electrician._id) > 0) {
              if ($scope.electrician._id == undefined || parseInt($scope.electrician._id) < 1) {
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
      if (($scope.filtro.documento != "") || ($scope.filtro.documento != undefined)) {
        sender = {
          "$or": [
            { "doc": { $regex: ".*" + $scope.filtro.documento + ".*" } }
          ]
        };
      }
      sender.limit = 1000;
      $.post(_globalBaseUrl + "copel/listElectrician", sender)
        .done(function (electricians) {
          $scope.electricians = {};
          $scope.electricians = electricians;
          $scope.electrician = electricians;
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

    $scope.formatCpf = function (num) {
      if ((num != "") && (num != undefined)) {
        return num.slice(0, 3) + '.' +
          num.slice(3, 6) + '.' +
          num.slice(6, 9) + '-' +
          num.slice(9, 11);
      } else {
        return "";
      }
    }

    $scope.selectElectrician = function (doc) {
      for (var i = 0; i < $scope.electricians.length; i++) {
        if ($scope.electricians[i].doc == doc) {
          $scope.electrician.edit = $scope.electricians[i];
          $scope.electrician.edit.doc = $scope.formatCpf($scope.electricians[i].doc);
          break;
        }
      }
      $scope.action = 'edit';
      _globalWizard.nextTab();
    };
    $scope.draw();

  }
})();