var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var feedbackSchema = new Schema({
    nome: { type: String },
    idade:  { type: String },
    naturalidade: { type: String },
    sexo:  { type: String }, //1M 2F
    telefone: { type: String },
    email: { type: String },
    resposta1: { type: String },
    resposta2: { type: String },
    resposta3: { type: String },
    idVersao: { type: String, required: false },
    idQuestionario: { type: String, required: false }
});

var versaoSchema = new Schema({
    caminho: { type: String, required: true },
    descricao: { type: String, required: true }
});

var questionarioSchema = new Schema({
    questoes: []
});

var questaoSchema = new Schema({
    pergunta: { type: String, required: true },
    resposta: { type: String, required: true }
});

var Feedback = mongoose.model('Feedback', feedbackSchema);
var Versao = mongoose.model('Versao', versaoSchema);
var Questionario = mongoose.model('Questionario', questionarioSchema);
var Questao = mongoose.model('Questao', questaoSchema);

module.exports = {
    Feedback: Feedback,
    Versao: Versao,
    Questionario: Questionario,
    Questao: Questao
};