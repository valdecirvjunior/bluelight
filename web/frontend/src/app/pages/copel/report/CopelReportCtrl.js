(function () {
  'use strict';

  angular.module('BlurAdmin.pages.copel')
    .controller('CopelReportCtrl', CopelReportCtrl)
    .config(['$compileProvider', function ($compileProvider) {
      $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|blob|chrome-extension):/);
    }]);

  function CopelReportCtrl($scope, toastr, $filter, $uibModal, $window) {
    $scope.date = new Date().toISOString().split('T')[0];
    $scope.resume = {};
    $scope.calOptsInicio = {};
    $scope.calOptsInicio.opened = false;
    $scope.calOptsFim = {};
    $scope.calOptsFim.opened = false;
    $scope.obj = {};
    $scope.obj.dataInicio = "";
    $scope.obj.dataFim = "";
    $scope.pageSize = 5;
    $scope.filtro = {};
    $scope.deviceType = clientMachine.deviceType;
    $scope.alertTable = {
      msg: "",
      type: ""
    };
    $scope.electrician = [];

    $scope.openCalendarInicio = function () {
      if ($scope.calOptsInicio.opened) {
        $scope.calOptsInicio.opened = false;
      } else {
        $scope.calOptsInicio.opened = true;
      }
    }

    $scope.openCalendarFim = function () {
      if ($scope.calOptsFim.opened) {
        $scope.calOptsFim.opened = false;
      } else {
        $scope.calOptsFim.opened = true;
      }
    }

    $scope.dateOptions = {
      showWeeks: false
    };

    $scope.pesquisar = function () {
      if (($scope.obj.dataInicio == "") || ($scope.obj.dataFim == "")) {
        warning("Período requerido!", toastr);
        return;
      }
      var sender = {
        date: {
          $gte: formatDateToYYYYMMDD(formatedDate($scope.obj.dataInicio)) + 'T00:00:00.000Z',
          $lt: formatDateToYYYYMMDD(formatedDate($scope.obj.dataFim)) + 'T23:59:59.000Z'
        }
      };
      if (($scope.filtro.doc != "") && ($scope.filtro.doc != undefined)) {
        if (isNaN($scope.filtro.doc)) {
          var doc = [];
          doc = $scope.getElectricianDoc($scope.filtro.doc);
          //console.log(doc);
          sender.doc = doc;
        } else {
          sender.doc = $scope.filtro.doc;
        }
        //console.log(sender.doc);
        sender.user = sender.doc;
        // sender.user = {
        //   "$or": [
        //     { "user": { $regex: ".*" + sender.doc + ".*", $option: "i" } }
        //   ]
        // };
      }
      delete sender.doc;
      sender.limit = 1000;
      $scope.getResume(sender);
      $scope.alertTable.msg = "Carregando...";
      $scope.alertTable.type = "";
      loading("Carregando...", toastr);
      $.post(_globalBaseUrl + "copel/listTransaction", sender)
        .done(function (transactions) {
          $scope.alertTable.msg = "";
          if (transactions.length > 0) {
            $scope.transactions = {};
            $scope.transactions = transactions;
            $scope.transaction = transactions;
            $scope.getResume(sender);
          } else {
            $scope.alertTable.msg = "Não transações a serem exibidas.";
          }
          $scope.alertTable.type = "";
          $scope.$apply();
        })
        .fail(function (err) {
          if (err.status == 403) {
            //error(err.responseJSON.error, toastr);
            window.location.href = '/403.html';
          } else {
            $scope.alertTable.msg = "Falha na comunicação!";
            $scope.alertTable.type = "danger";
            error("Falha na comunicação!", toastr);
            $scope.$apply();
          }
        });
    };

    $scope.getElectrician = function () {
      $.post(_globalBaseUrl + "copel/listElectrician", { limit: 1000 })
        .done(function (electrician) {
          if (electrician != undefined) {
            $scope.electrician = electrician;
          }
        }).fail(function (err) {
          if (err.status == 403) {
            //error(err.responseJSON.error, toastr);
            window.location.href = '/403.html';
          } else {
            $scope.alertTable.msg = "Falha na comunicação!";
            $scope.alertTable.type = "danger";
            error("Falha na comunicação!", toastr);
            $scope.$apply();
          }
        });
    }

    $scope.getElectricianName = function (userDoc) {
      try {
        var electricianName = undefined;
        electricianName = $filter('filter')($scope.electrician, { doc: userDoc });
        if (electricianName[0] != undefined) {
          return electricianName[0].name;
        } else {
          return "";
        }
      } catch (e) { console.log(e) };
    }

    $scope.getElectricianDoc = function (userName) {
      try {
        var electrician = [];
        electrician = $filter('filter')($scope.electrician, { name: userName });//{ $regex: ".*" + userName + ".*", $option: "i" }
        if (electrician[0] != undefined) {
          //console.log(electrician[0].doc);
          return electrician[0].doc;
        } else {
          return "";
        }
      } catch (e) { console.log(e) };
    }

    $scope.getResume = function (sender) {
      // loading("Carregando gráficos...", toastr);
      $.post(_globalBaseUrl + "copel/resumeTransaction", sender)
        .done(function (resume) {
          $scope.resume = resume;
          var countTotal = $scope.resume.countSuccess + $scope.resume.countFail;
          var sumTotal = $scope.resume.sumCredito + $scope.resume.sumDebito;
          $scope.resume.percentCredito = parseInt(((100 * parseInt($scope.resume.sumCredito)) / parseInt(sumTotal)));
          $scope.resume.percentDebito = parseInt(((100 * parseInt($scope.resume.sumDebito)) / parseInt(sumTotal)));
          $scope.resume.percentSuccess = parseInt(((100 * parseInt($scope.resume.countSuccess)) / parseInt(countTotal)));

          if (isNaN($scope.resume.percentCredito)) {
            $scope.resume.percentCredito = 0;
            $scope.resume.percentDebito = 0;
            $scope.resume.percentSuccess = 0;
          }
        }).fail(function (err) {
          if (err.status == 403) {
            //error(err.responseJSON.error, toastr);
            window.location.href = '/403.html';
          } else {
            error("Falha na comunicação!", toastr);
            $scope.$apply();
          }
        });
    };

    $scope.formatValue = function (centsValue) {
      if ((centsValue != "") && (centsValue != undefined)) {
        var floatvalue = parseFloat(centsValue / 100).toFixed(2);
        return "R$ " + floatvalue.toString().replace('.', ',');
      } else {
        return "";
      }
    };

    $scope.formatValueCsv = function (centsValue) {
      if ((centsValue != "") && (centsValue != undefined)) {
        var floatvalue = parseFloat(centsValue / 100).toFixed(2);
        return "R$ " + floatvalue.toString().replace('.', ',');
      } else {
        return "";
      }
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

    $scope.formatDate = function (usTime) {
      var time = new Date(usTime).toISOString();
      var format = time.substr(time, 19, 22);
      var date = new Date(format + "+03:00").toISOString();
      var formatedDate =
        date.substring(8, 10)
        + "/" +
        date.substring(5, 7)
        + "/" +
        date.substring(0, 4)
        + " " +
        date.substring(11, 13)
        + ":" +
        date.substring(14, 16)
        + ":" +
        date.substring(17, 19);

      return formatedDate;
    }

    $scope.formatForm = function (tipo, parcela) {
      if (parcela.toString() == "0") {
        parcela = ""
      } else {
        parcela = " " + parcela.toString() + "X";
      }

      if (tipo.toString() == "Debito") {
        parcela = "";
      }

      return tipo + " " + parcela;
    }

    $scope.getFullDateNow = function () {
      $scope.obj.dataInicio = new Date();
      $scope.obj.dataFim = new Date();
    }

    $scope.open = function (page, size) {
      $uibModal.open({
        animation: true,
        templateUrl: page,
        size: size,
        controller: 'CopelReportCtrl',
        scope: $scope
      });
    };

    $scope.getError = function (error) {
      if (error != undefined) {
        $scope.error = error;
      } else {
        $scope.error = "Erro não definido!";
      }
      $scope.open('app/pages/copel/report/report.error.modal.html', 'md');
    }

    $scope.downloadCsv = function () {
      $scope.csv = 'Data;Valor débito;Valor total;Eletricista;Pagamento;Status;Erro';
      if ($scope.transactions != undefined) {
        for (var i = 0; i < $scope.transactions.length; i++) {
          $scope.csv += "\n";
          $scope.csv += ($scope.formatDate($scope.transactions[i].date)).toString() + ";";
          $scope.csv += ($scope.formatValueCsv($scope.transactions[i].valueDebt)).toString() + ";";
          $scope.csv += ($scope.formatValueCsv($scope.transactions[i].value)).toString() + ";";
          $scope.csv += ($scope.getElectricianName($scope.transactions[i].user)).toString() + ";";
          $scope.csv += ($scope.formatForm($scope.transactions[i].type, $scope.transactions[i].instalments)).toString() + ";";
          $scope.csv += ($scope.transactions[i].status ? 'Concluído' : 'Falha').toString() + ";";
          $scope.csv += $scope.transactions[i].error != undefined ? $scope.transactions[i].error : "";
        }
      }

      var data = $scope.csv;
       var blob = new Blob([data], { type: 'text/plain' });
        var url = $window.URL || $window.webkitURL;
        $scope.fileUrl = url.createObjectURL(blob);
    }

    $scope.getElectrician();
    $scope.getFullDateNow();
    $scope.pesquisar();

  }
})();