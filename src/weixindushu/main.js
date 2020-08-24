auto()

let funs = require("./functions.js")
let WentiController = require("./wxds/WentiController.js")
let QuestionCollection = require("./wxds/wentiBase/QuestionCollection.js")

function main ()
{
    let questionCollection = new QuestionCollection("wentiji.json")
    let wentiController = new WentiController()
    console.log("微信读书自动化开始运行");
    wentiController.on("problemShow", function ()
    {
        console.log(wentiController.currentWenti)
        wentiController.clickAns(0)
        sleep(300)
        let question = wentiController.ansTypeidentify()
        questionCollection.addQuestion(question)
        console.log(question.toString())
        questionCollection.saveFile()
    })
    wentiController.watchStart()
    wentiController.watchThreadJoin()
}

funs.runAfterPrepare(main)