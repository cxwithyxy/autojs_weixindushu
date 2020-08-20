auto()

let funs = require("./functions.js")
let WentiController = require("./wxds/WentiController.js")

let wentiController = new WentiController()

function main ()
{
    console.log("微信读书自动化开始运行");
    wentiController.on("problemShow", function ()
    {
        console.log(wentiController.currentWenti)
        wentiController.clickAns(0)
    })
    wentiController.watchStart()
    wentiController.watchThreadJoin()
}

funs.runAfterPrepare(main)