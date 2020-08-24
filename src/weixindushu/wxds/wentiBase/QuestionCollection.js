let Question = require("./Question.js")

let QuestionCollection = function (filePath)
{
    this.filePath = filePath
    this.questions = []
    this.loadFile()
}

QuestionCollection.prototype.addQuestion = function(question)
{
    this.questions.push(question)
}

QuestionCollection.prototype.loadFile = function ()
{
    if(!files.exists(this.filePath))
    {
        files.write(this.filePath, "")
    }
    else
    {
        let jsonText = files.read(this.filePath)
        let data = JSON.parse(jsonText)
        let self = this
        data.forEach(function (v)
        {
            self.addQuestion(Question.loadJson(v))
        })
    }
}

QuestionCollection.prototype.saveFile = function ()
{
    let questionsData = []
    this.questions.forEach(function (v)
    {
        questionsData.push(v.toJson())
    })
    let jsonText = JSON.stringify(questionsData)
    files.write(this.filePath, jsonText)
}

module.exports = QuestionCollection