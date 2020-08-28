let WentiAnswerType = require("./../WentiAnswerType.js")

let Answer = function (ansText, type)
{
    this.answerText = ansText
    this.type = type
}

Answer.prototype.toString = function ()
{
    let typeText = ""
    switch(this.type)
    {
        case WentiAnswerType.right:
            typeText = "对"
            break
        case WentiAnswerType.wrong:
            typeText = "错"
            break
        case WentiAnswerType.unknow:
            typeText = "未知"
            break
    }
    return this.answerText + "(" + typeText + ")"
}

Answer.prototype.combine = function (answer)
{
    if(this.answerText == answer.answerText)
    {
        if(this.type == WentiAnswerType.unknow && answer.type != WentiAnswerType.unknow)
        {
            this.type = answer.type
        }
        return true
    }
    return false
}

Answer.prototype.toJson = function ()
{
    return {
        answerText: this.answerText,
        type: this.type
    }
}

Answer.loadJson = function(jsonData)
{
    return new Answer(jsonData.answerText, jsonData.type)
}

module.exports = Answer