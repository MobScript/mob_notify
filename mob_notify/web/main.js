var sound = true

function notifyDisplay(id) {
    $("#notification" + id).css('display', 'flex');
    setTimeout(function() {
        $("#notification" + id).addClass('pop');
    }, 200);
}

function notificationPop(icon, msg, ms, id) {
    $("#notification-container").append(`
        <div class="notify-item" id="notification` + id + `">
            <div class="notify-icon">
                <div class="this ` + icon + `"></div>
            </div>
            <div calss="notify-text">
            <span>` + msg + `</span>
            </div>
        </div>
    `).show('slow')
    notifyDisplay(id)
    setTimeout(function() {
        $("#notification" + id).removeClass('pop');
        setTimeout(()=>{
            $("#notification" + id).remove()
        }, 1000)
    }, ms);
}

function alertDisplay(id) {
    $("#alert" + id).css('display', 'block')
    setTimeout(function() {
        $("#alert" + id).addClass('apop')
    }, 200);
}

function guidGenerator() {
    var S4 = function() {
       return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
    };
    return (S4()+S4()+"-"+S4()+"-"+S4()+"-"+S4()+"-"+S4()+S4()+S4());
}

window.addEventListener('message', function(event) {
    var item = event.data;
    switch(item.action) {
        case 'send-notification':
            notificationPop(item.icon, item.msg, item.ms, guidGenerator())
            return;
        case 'updateSound':
            sound = item.sound
            return;
        default: 
        return;
    }
});