let Answer = require("./Answer.js")

let Question = function (title)
{
    this.title = title,
    this.answers  = []
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
        txt += "" + (index + 1) + ":" + v.answerText + ":" + v.type + "; "
    })
    txt += "]"
    return txt
}

module.exports = Question