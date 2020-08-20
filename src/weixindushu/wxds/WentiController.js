let WentiController = function ()
{
    this.event_c = events.emitter()
    this.loopThread = null
    this.currentWentiTitle = ""
    this.lastestWentiTitle = ""
    this.currentWenti = ""
    this.currentAns = []
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
        if(wentiTitleStr.match(/题/))
        {
            this.currentWentiTitle = wentiTitleStr
            if(this.lastestWentiTitle != this.currentWentiTitle)
            {
                this.lastestWentiTitle = this.currentWentiTitle
                this.currentWenti = allbox.shift().text()
                this.currentAns = []
                for(let i = 0; i != allbox.length; i++ )
                {
                    this.currentAns.push({
                        ans: allbox[i].text()
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