let funs = require("./../functions.js")

let WentiController = function ()
{
    this.event_c = events.emitter()
    this.loopThread = null
    this.currentWentiTitle = ""
    this.lastestWentiTitle = ""
    this.currentWenti = ""
    this.currentAns = []
    this.ansPicPathPreset = {
        normal: "images/normal.png",
        right: "images/right.png",
        wrong: "images/wrong.png"
    }
}

WentiController.prototype.on = function (event, callback)
{
    this.event_c.on(event, callback)
    return this
}

WentiController.prototype.emit = function (event)
{
    this.event_c.emit(event)
    return this
}

WentiController.prototype.clickAns = function (index)
{
    funs.clickAreaByUIObject(this.currentAns[index].ansBox)
}

WentiController.prototype.initAnsPostion = function ()
{
    let screenImage = captureScreen()
    screenImage = images.clip(screenImage, 0, funs.getDeviceHeight() / 2, funs.getDeviceWidth(), funs.getDeviceHeight() / 2)
    let ansPosition = {}
    let self = this
    let threadForNormalAns = threads.start(function ()
    {
        ansPosition["normal"] = self.getAnsPositionY(screenImage, self.ansPicPathPreset.normal)
    })
    let threadForRightAns = threads.start(function ()
    {
        ansPosition["right"] = self.getAnsPositionY(screenImage, self.ansPicPathPreset.right)
    })
    let threadForWrongAns = threads.start(function ()
    {
        ansPosition["wrong"] = self.getAnsPositionY(screenImage, self.ansPicPathPreset.wrong)
    })
    threadForNormalAns.join()
    threadForRightAns.join()
    threadForWrongAns.join()
    let ansPostionOneTensor = []
    ansPosition["normal"].forEach(function (v)
    {
        ansPostionOneTensor.push({y:v, type: "normal"})
    })
    ansPosition["right"].forEach(function (v)
    {
        ansPostionOneTensor.push({y:v, type: "right"})
    })
    ansPosition["wrong"].forEach(function (v)
    {
        ansPostionOneTensor.push({y:v, type: "wrong"})
    })
    return ansPostionOneTensor.sort(function (a, b)
    {
        return a.y - b.y
    })

}

WentiController.prototype.getAnsPositionY = function (screenImage, ansPicPath)
{
    let ansPositionYList = []
    let positions = images.matchTemplate(screenImage, images.read(ansPicPath))
    positions.matches.forEach(function (v)
    {
        ansPositionYList.push(v.point.y)
    })
    return ansPositionYList.sort(function (a, b)
    {
        return a - b
    })
}

WentiController.prototype.watchingHandler = function ()
{
    for(;;)
    {
        let allbox = []
        try
        {
            allbox = funs.findInUIObjectWithTextMatches(depth(0).find()[0], /[\u4e00-\u9fa5]{1,}/)
        }
        catch(e)
        {
            sleep(86)
            continue
        }
        if(allbox.length < 3 )
        {
            sleep(1e3)
            continue
        }
        let wentiTitleBox = allbox.shift()
        let wentiTitleStr = wentiTitleBox.text()
        if(/题/.test(wentiTitleStr))
        {
            this.currentWentiTitle = wentiTitleStr
            if(this.lastestWentiTitle != this.currentWentiTitle)
            {
                this.lastestWentiTitle = this.currentWentiTitle
                this.currentWenti = allbox.shift().text()
                this.currentAns = []
                for(let i = 0; i != allbox.length; i++ )
                {
                    let ansStr = allbox[i].text()
                    if(ansStr.match(/你题答的也忒好了不是/))
                    {
                        continue
                    }
                    this.currentAns.push({
                        ans: ansStr,
                        ansBox: allbox[i]
                    })
                }
                this.emit("problemShow")
            }
            sleep(86)
        }
        else
        {
            sleep(1e3)
        }
    }
}

WentiController.prototype.watchStart = function ()
{
    if(!this.loopThread)
    {
        let self = this
        this.loopThread = threads.start(function ()
        {
            self.watchingHandler()
        })
    }
}

WentiController.prototype.watchStop = function ()
{
    if(this.loopThread)
    {
        this.loopThread.interrupt()
        this.loopThread = null
    }
}
WentiController.prototype.watchThreadJoin = function ()
{
    if(this.loopThread)
    {
        this.loopThread.join()
    }
}


module.exports = WentiController