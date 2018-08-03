def ws_connect(message) :
    message.reply_channel.send({
        'accept' : True
    })

def ws_receive(message) :
    print message.content.get('text')

def ws_disconnect(message) :
    pass

