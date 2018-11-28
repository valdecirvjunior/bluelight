//script execute on start
$(document).ready(function () {
  //loadMenu("divmenu");
});

//
//utils functions
//

//loading page on interaction
function loadingShow() {
  $("#divLoading").html(
    '<div class="loadingPage">' +
    '<img src="/static/images/loader.gif" class="loadingImage"/>' +
    '</div>'
  );
}
function loadingHidden() {
  $("#divLoading").html("");
}

function utilFormatDate(inDate) {
  var day = inDate.getDate();
  var month = (inDate.getMonth() + 1);
  var year = inDate.getFullYear();
  var outDate = (year) + '-' + month + '-' + day;
  return outDate;
}

function convertDate(date){
  var d = new Date(date),
      mes = '' + (d.getMonth() + 1),
      dia = '' + d.getDate(),
      ano = d.getFullYear(),
      
      hora = d.getHours(),
      minutos = d.getMinutes();

  if (mes.length < 2) mes = '0' + mes;
  if (dia.length < 2) dia = '0' + dia;
  if (minutos < 10) minutos = '0' + minutos;
  if (hora < 10) hora = '0' + hora;
  
  var dataf = [dia, mes,ano].join('/');
  var horaf = [hora, minutos].join(':');

  return dataf+" as "+horaf;
};

function utilymdDate(inDate) {
  var ymd = {};
  ymd.year = inDate.getFullYear();
  ymd.month = inDate.getMonth();
  ymd.day = inDate.getDate();
  ymd.date = inDate;
  return ymd;
}

function utilPeriodWeek(inDate) {
  var dayWeek = inDate.getDay();
  var period = {};
  period.start = new Date(inDate.getTime());
  period.start.setDate(period.start.getDate() - dayWeek);
  period.end = new Date(period.start.getTime());
  period.end.setDate(period.end.getDate() + 6);
  return period;
}

function dashPeriodNextDay(ymd) {
  var period = {};
  period.start = ymd.date;
  period.start.setDate(period.start.getDate() + 1);
  period.end = period.start;
  return period;
}

function dashPeriodPreviousDay(ymd) {
  var period = {};
  period.start = ymd.date;
  period.start.setDate(period.start.getDate() - 1);
  period.end = period.start;
  return period;
}

function dashPeriodPreviousWeek(ymd) {
  ymd.date.setDate(ymd.date.getDate() - 7);
  var period = utilPeriodWeek(ymd.date);
  return period;
}

function dashPeriodNextWeek(ymd) {
  ymd.date.setDate(ymd.date.getDate() + 7);
  var period = utilPeriodWeek(ymd.date);
  return period;
}

function dashPeriodPreviousMonth(ymd) {
  var period = {};
  if (ymd.month == 0) {
    period.start = new Date((ymd.year - 1), 11, 1);
    var auxDate = new Date(ymd.year, 0, 1);
    auxDate.setDate(auxDate.getDate() - 1);
    period.end = auxDate;
  } else {
    var m = ymd.month - 1;
    period.start = new Date(ymd.year, m, 1);
    var auxDate;
    auxDate = new Date(ymd.year, (m + 1), 1);
    auxDate.setDate(auxDate.getDate() - 1);
    period.end = auxDate;
  }
  return period;
}

function dashPeriodNextMonth(ymd) {
  var period = {};
  if (ymd.month == 11) {
    period.start = new Date((ymd.year + 1), 0, 1);
    var auxDate = new Date((ymd.year + 1), 1, 1);
    auxDate.setDate(auxDate.getDate() - 1);
    period.end = auxDate;
  } else {
    var m = ymd.month + 1;
    period.start = new Date(ymd.year, m, 1);
    var auxDate;
    if (m == 11) {
      auxDate = new Date((ymd.year + 1), 0, 1);
    } else {
      auxDate = new Date(ymd.year, (m + 1), 1);
    }
    auxDate.setDate(auxDate.getDate() - 1);
    period.end = auxDate;
  }
  return period;
}

function dashPeriodPreviousYear(ymd) {
  var period = {};
  period.start = new Date((ymd.year - 1), 0, 1);
  var auxDate = new Date(ymd.year, 0, 1);
  auxDate.setDate(auxDate.getDate() - 1);
  period.end = auxDate;
  return period;
}

function dashPeriodNextYear(ymd) {
  var period = {};
  period.start = new Date((ymd.year + 1), 0, 1);
  var auxDate = new Date((ymd.year + 2), 0, 1);
  auxDate.setDate(auxDate.getDate() - 1);
  period.end = auxDate;
  return period;
}

function showModalChangePassword(message) {
  if (message == undefined)
    message = "";
  $('#modalChangePassword').modal('show');
}

function hideModalChangePassword() {
  $("body").removeClass('modal-open');
  $('.modal-backdrop').remove();
  $('#modalChangePassword').modal('hide');
}

function showModalManualLiquidate(message) {
  if (message == undefined)
    message = "";
  $('#modalManualLiquidate').modal('show');
}

function hideModalManualLiquidate() {
  $("body").removeClass('modal-open');
  $('.modal-backdrop').remove();
  $('#modalManualLiquidate').modal('hide');
}

function showModalAnexoGuia(message) {
  if (message == undefined)
    message = "";
  $('#modalAnexoGuia').modal('show');
}

function hideModalAnexoGuia() {
  $("body").removeClass('modal-open');
  $('.modal-backdrop').remove();
  $('#modalAnexoGuia').modal('hide');
}

function showModalBilletLiquidate(message) {
  document.getElementById("btnSaveModal").style.visibility = "hidden";
  if (message == undefined)
    message = "";
  $('#modalBilletLiquidate').modal('show');
}

function hideModalBilletLiquidate() {
  $("body").removeClass('modal-open');
  $('.modal-backdrop').remove();
  $('#modalBilletLiquidate').modal('hide');
}

function showModalPermission(message) {
  if (message == undefined)
    message = "";
  $('#modalPermission').modal('show');
}

function hideModalPermission() {
  $("body").removeClass('modal-open');
  $('.modal-backdrop').remove();
  $('#modalPermission').modal('hide');
}

function showModalAlert(message) {
  if (message == undefined)
    message = "";
  $('#modalAlert').modal('show');
}

function hideModalAlert() {
  $("body").removeClass('modal-open');
  $('.modal-backdrop').remove();
  $('#modalAlert').modal('hide');
}

function milhar(n) {
  var res = n.toString().split(".");

  var n = '' + res[0], t = res[0].length - 1, novo = '';

  for (var i = t, a = 1; i >= 0; i-- , a++) {
    var ponto = a % 3 == 0 && i > 0 ? '.' : '';
    novo = ponto + n.charAt(i) + novo;
  }
  if (res[1] == undefined) {
    res[1] = "00"
  }
  return novo + "," + res[1];
}

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function treatValue(value) {
  var valueD = parseFloat(value / 100);
  var valueList = valueD.toString().split('.');
  var decimalValue = "00";
  if (valueList.length == 2) {
    decimalValue = pad(valueList[1], 2);
  }
  var outValue = valueList[0] + "," + decimalValue;
  return outValue;
}

function treatValueToCents(value) {
  if (value != undefined) {
    // var valstr = value.toString().replace(",", ".");
    // console.log(valstr);
    // var valnum =  Number.parseFloat(valstr)*100;
    // console.log(valnum);
    // var valfix = valnum.toFixed(2);
    // console.log(valfix);
    // console.log(((Number.parseFloat(value.toString().replace(",", "."))* 100).toFixed(2)));
    return ((Number.parseFloat(value.toString().replace(",", ".")) * 100).toFixed(2));
  }
}

function formatDate(date) {
  try {
  return date.substring(8, 10)
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
  } catch(e){
    console.log(e);
  }
}

function formatDateToYYYYMMDD(date) {
  try {
    return date.substring(6, 10)
      + "-" +
      date.substring(3, 5)
      + "-" +
      date.substring(0, 2);
  } catch (e) {
    console.log(e);
  }
}

function formatDateToYYYYMMDDBirth(date) {
  try {
    return date.substring(0, 10);
  } catch (e) {
    console.log(e);
  }
}

function formatDateToYYYYMMDDMais1(date) {
  var i = parseInt(date.substring(0, 2));
  console.log(i);
  if (i > 9) {
    i++;
  }
  if (i == 32) {
    i--;
  }
  return date.substring(6, 10)
    + "-" +
    date.substring(3, 5)
    + "-" +
    i.toString();
}

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

function warning(msg, toastr) {
  toastr.warning(msg, 'Ops', {
    "autoDismiss": false,
    "positionClass": "toast-top-right",
    "type": "warning",
    "timeOut": "5000",
    "extendedTimeOut": "2000",
    "allowHtml": false,
    "closeButton": false,
    "tapToDismiss": true,
    "progressBar": false,
    "newestOnTop": true,
    "maxOpened": 0,
    "preventDuplicates": false,
    "preventOpenDuplicates": false
  });
}

function success(msg, toastr) {
  toastr.success(msg, 'Sucesso', {
    "autoDismiss": false,
    "positionClass": "toast-top-right",
    "type": "success",
    "timeOut": "5000",
    "extendedTimeOut": "4000",
    "allowHtml": false,
    "closeButton": false,
    "tapToDismiss": true,
    "progressBar": false,
    "newestOnTop": true,
    "maxOpened": 0,
    "preventDuplicates": false,
    "preventOpenDuplicates": false
  })
}

function error(msg, toastr) {
  toastr.error(msg, 'Erro', {
    "autoDismiss": false,
    "positionClass": "toast-top-right",
    "type": "error",
    "timeOut": "5000",
    "extendedTimeOut": "2000",
    "allowHtml": false,
    "closeButton": false,
    "tapToDismiss": true,
    "progressBar": false,
    "newestOnTop": true,
    "maxOpened": 0,
    "preventDuplicates": false,
    "preventOpenDuplicates": false
  })
}

function loading(msg, toastr) {
  toastr.info(msg, '', {
    "autoDismiss": false,
    "positionClass": "toast-top-right",
    "type": "info",
    "timeOut": "1500",
    "extendedTimeOut": "1500",
    "allowHtml": false,
    "closeButton": false,
    "tapToDismiss": false,
    "progressBar": true,
    "newestOnTop": true,
    "maxOpened": 0,
    "preventDuplicates": false,
    "preventOpenDuplicates": true
  })

}

function find_in_object(my_object, my_criteria) {

  return my_object.filter(function (obj) {
    return Object.keys(my_criteria).every(function (c) {
      return obj[c] == my_criteria[c];
    });
  });

}

function RetiraMascara(ObjCPF) {
  try {
    cpf = ObjCPF;
    if (cpf.length == 14) {
      cpf = cpf.charAt(0) + cpf.charAt(1) + cpf.charAt(2) +
        cpf.charAt(4) + cpf.charAt(5) + cpf.charAt(6) +
        cpf.charAt(8) + cpf.charAt(9) + cpf.charAt(10) +
        cpf.charAt(12) + cpf.charAt(13);
      return cpf;
    }
  } catch (e) {
    console.log(e);
  }
};

function gablGetObjSelect(){
  return {key: -1, description: "Selecione"};
}

function gablListYesNo(){
  var listYN = [];
  listYN.push(gablGetObjSelect());
  listYN.push({key: "true", description: "Sim"});
  listYN.push({key: "false", description: "Não"});
  return listYN;
}

function gablListTypeValue(){
  var listTypeValue = [];
  listTypeValue.push(gablGetObjSelect());
  listTypeValue.push({key: 1, description: "Percentual"});
  listTypeValue.push({key: 2, description: "Real"});
  return listTypeValue;
}

function gablListTypeMdr(){
  var listTypeMdr = [];
  listTypeMdr.push(gablGetObjSelect());
  listTypeMdr.push({key: 1, description: "Antes"});
  listTypeMdr.push({key: 2, description: "Pré-Antecipação"});
  listTypeMdr.push({key: 3, description: "Pós-Antecipação"});
  return listTypeMdr;
}

function gablListChannel(){
  var listChannel = [];
  listChannel.push({key: 1, description: "Débito baixa"});
  listChannel.push({key: 2, description: "Crédito baixa"});
  listChannel.push({key: 3, description: "ECommerce baixa"});
  listChannel.push({key: 4, description: "Débito"});
  listChannel.push({key: 5, description: "Crédito"});
  listChannel.push({key: 6, description: "ECommerce"});
  listChannel.push({key: 7, description: "Baixa"});
  listChannel.push({key: 8, description: "Boleto"});
  listChannel.push({key: 9, description: "Baixa Manual"});
  return listChannel;
};

function gablGetListSelected(key,list){
  var obj = {};
  for (var i = 0; i < list.length; i++) {
    if(list[i].key == key){
      return list[i];
    }
  }
  return {};
};

function returnWizard(){
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    try{
      _globalWizard.previousTab();
    }catch(e){
      this.console.log("");
    }
  });
};

var clientMachine = {
  window: {
    width: window.innerWidth,
    height: window.innerHeight
  },
  deviceType: window.innerWidth <= 600 ? "mobile" : "other"
};
