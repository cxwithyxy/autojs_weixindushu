let Answer = require("./Answer.js")

let Question = function (title)
{
    this.title = title,
    this.answers = []
}

Question.prototype.addAnswer = function (word, type)
{
    this.answers.push(new Answer(word, type))
}

Question.prototype.toString = function ()
{
    let txt = "[Q: "
    txt += this.title + " A: "
    this.answers.forEach(function (v, index)
    {
        txt += "" + (index + 1) + ":" + v.toString() + "; "
    })
    txt += "]"
    return txt
}

Question.prototype.toJson = function ()
{
    let questionJson = {}
    questionJson["title"] = this.title
    questionJson["answers"] = []
    this.answers.forEach(function (v)
    {
        questionJson["answers"].push(v.toJson())
    })
    return questionJson
}

Question.loadJson = function (jsonData)
{
    let question = new Question(jsonData.title)
    jsonData["answers"].forEach(function (v)
    {
        question.answers.push(Answer.loadJson(v))
    })
    return question
}

module.exports = Question