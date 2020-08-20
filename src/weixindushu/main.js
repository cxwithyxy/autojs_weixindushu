auto()

let funs = require("./functions.js")
let WentiController = require("./wxds/WentiController.js")


function main ()
{
    let allbox = funs.findInUIObjectWithTextMatches(depth(0).find()[0], /[\u4e00-\u9fa5]{1,}/)
    for(let i = 0; i != allbox.length; i++)
    {
        console.log(allbox[i].text());
    }
}

funs.runAfterPrepare(main)