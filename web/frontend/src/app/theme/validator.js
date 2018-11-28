
/* Function to cpf*/

function CPF() { "user_strict"; function r(r) { for (var t = null, n = 0; 9 > n; ++n)t += r.toString().charAt(n) * (10 - n); var i = t % 11; return i = 2 > i ? 0 : 11 - i } function t(r) { for (var t = null, n = 0; 10 > n; ++n)t += r.toString().charAt(n) * (11 - n); var i = t % 11; return i = 2 > i ? 0 : 11 - i } var n = "false", i = "true"; this.gera = function () { for (var n = "", i = 0; 9 > i; ++i)n += Math.floor(9 * Math.random()) + ""; var o = r(n), a = n + "-" + o + t(n + "" + o); return a }, this.valida = function (o) { for (var a = o.replace(/\D/g, ""), u = a.substring(0, 9), f = a.substring(9, 11), v = 0; 10 > v; v++)if ("" + u + f == "" + v + v + v + v + v + v + v + v + v + v + v) return n; var c = r(u), e = t(u + "" + c); return f.toString() === c.toString() + e.toString() ? i : n } }

var CPF = new CPF();

var validateCPF = function (inCpf) {
    if (CPF.valida(inCpf) == "true") {
        return true;
    } else {
        return false;
    }
}

var validateCNPJ = function (cnpj) {
    cnpj = cnpj.replace(/[^\d]+/g, '');
    if (cnpj == '') return false;
    if (cnpj.length != 14)
        return false;

    // Elimina CNPJs invalidos conhecidos
    if (cnpj == "00000000000000" ||
        cnpj == "11111111111111" ||
        cnpj == "22222222222222" ||
        cnpj == "33333333333333" ||
        cnpj == "44444444444444" ||
        cnpj == "55555555555555" ||
        cnpj == "66666666666666" ||
        cnpj == "77777777777777" ||
        cnpj == "88888888888888" ||
        cnpj == "99999999999999")
        return false;

    // Valida DVs
    tamanho = cnpj.length - 2
    numeros = cnpj.substring(0, tamanho);
    digitos = cnpj.substring(tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(0))
        return false;

    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--;
        if (pos < 2)
            pos = 9;
    }
    resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
    if (resultado != digitos.charAt(1))
        return false;

    return true;
}

function validateCPFCNPJ(inDocument) {
    if (inDocument == undefined || inDocument == "")
        return false

    var doc = inDocument.replace(/\./g, '').replace('/', '').replace('-', '');
    if (doc.length > 11) {
        return validateCNPJ(doc);
    } else {
        return validateCPF(doc);
    }
}

function validateDate(date) {
    if (date == undefined || date == "")
        return false
    try {
        var day = date.substring(0, 2)
        var month = date.substring(3, 5)
        var year = date.substring(6, 10)
        var newDate = new Date(year, (month - 1), day);
        var equalDay = parseInt(day, 10) == parseInt(newDate.getDate());
        var equalMonth = parseInt(month, 10) == parseInt(newDate.getMonth()) + 1;
        var equalYear = parseInt(year) == parseInt(newDate.getFullYear());

        if (!((equalDay) && (equalMonth) && (equalYear))) {
            return false;
        }
        return true;
    } catch (e) {
        console.log(e);
        return false;
    }
}

function formatedDate(data) {
    var dd = data.getDate();
    var mm = data.getMonth() + 1; //January is 0!
    var yyyy = data.getFullYear();

    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    return data = dd + '/' + mm + '/' + yyyy;
}

function validateBirthDate(date) {
    if (date == undefined || date == "")
        return false

    if (validateDate(date)) {
        var day = date.substring(0, 2)
        var month = date.substring(3, 5)
        var year = date.substring(6, 10)
        var birthDate = new Date(year, (month - 1), day);
        if (birthDate >= new Date()) {
            return false;
        } else {
            return true;
        }
    } else {
        return false;
    }
}

function validateNameSurname(name) {
    if (name == undefined || name == "")
        return false

    var names = name.split(" ");
    var validateName = 0;
    for (var i = 0; i < names.length; i++) {
        if (names[i].length > 1) {
            validateName++;
        }
    }
    if (validateName > 1)
        return true;
    else
        return false;
}