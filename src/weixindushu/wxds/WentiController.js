let WentiController = function ()
{
    this.event_c = events.emitter()
    this.loopThread = null
}

WentiController.prototype.on = function ()
{
    this.event_c.on.apply(this, arguments)
    return this
}

WentiController.prototype.emit = function ()
{
    this.event_c.emit.apply(this, arguments)
    return this
}

WentiController.prototype.watchingHandler = function ()
{
    let allbox = funs.findInUIObjectWithTextMatches(depth(0).find()[0], /[\u4e00-\u9fa5]{1,}/)
    let wentiBox = allbox[0]
    let wentiStr = wentiBox.text()
    if(wentiStr.test(/题/))
    {
        this.currentWenti = wentiStr
    }
    for(let i = 0; i != allbox.length; i++)
    {
        console.log(allbox[i].text());
    }
}

WentiController.prototype.watchStart = function ()
{
    if(!this.loopThread)
    {
        this.loopThread = threads.start(function ()
        {
            
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


module.exports = WentiController