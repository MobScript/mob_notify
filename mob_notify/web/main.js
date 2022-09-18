var sound = true

function createAnnounce(text, ms) {
    $("#announce-center").html('');
    $("#announce-center").show();
    $("#announce-center").append(`
        <div class="">
            <span><strong>SERVER ANNOUNCE</strong></span>
            <p>` + text + `</p>
        </div>
    `);
    let audio = new Audio('assets/drip.ogg');
    audio.volume = 0.2;
    audio.play();
    setTimeout(function() {
        $("#announce-center").hide('');
        $("#announce-center").html('');
    }, ms);
}

function createFloatingText(text) {
    $("#floating-text").html('');
    $("#floating-text").show();
    $("#floating-text").append(`
        <a class="circle">
            <i class="fa-solid fa-location-dot"></i>
        </a>
        <p>` + text + `</p>
    `);
    if (sound) {
        let audio = new Audio('assets/notification.ogg');
        audio.volume = 0.2;
        audio.play();  
    } 
}

function clearFloatingText() {
    $("#floating-text").html('');
    $("#floating-text").hide();
}

function notifyDisplay(id) {
    $("#notification" + id).css('display', 'block');
    setTimeout(function() {
        $("#notification" + id).addClass('pop');
    }, 200);
}

function notificationPop(icon, msg, ms, id) {
    $("#notification-container").append(`
        <div class="notification" id="notification` + id + `">
            <div class="notify-circle ` + icon + `"></div>
            <span>` + msg + `</span>
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

function alertPop(type, msg, ms, id) {
    if (type == 'success') {
        $(".alert-container").append(`
            <div class="alert border-success" id="alert` + id + `">
                <div class="alert-circle-success fa-solid fa-check"></div>
                <span>` + msg + `</span>
            </div>
        `).show('slow')
        alertDisplay(id)
        setTimeout(function() {
            $("#alert" + id).removeClass('apop');
            setTimeout(()=>{
                $("#alert" + id).remove()
            }, 1000)
        }, ms);
    } else if (type == 'error') {
        $(".alert-container").append(`
            <div class="alert border-error" id="alert` + id + `">
                <div class="alert-circle-error fa-solid fa-xmark"></div>
                <span>` + msg + `</span>
            </div>
        `).show('slow')
        alertDisplay(id)
        setTimeout(function() {
            $("#alert" + id).removeClass('apop');
            setTimeout(()=>{
                $("#alert" + id).remove()
            }, 1000)
        }, ms);
    } else if (type == 'warning') {
        $(".alert-container").append(`
            <div class="alert border-warning" id="alert` + id + `">
                <div class="alert-circle-warning fa-solid fa-exclamation"></div>
                <span>` + msg + `</span>
            </div>
        `).show('slow')
        alertDisplay(id)
        setTimeout(function() {
            $("#alert" + id).removeClass('apop');
            setTimeout(()=>{
                $("#alert" + id).remove()
            }, 1000)
        }, ms);
    }
}

function createBar(text, ms) {
    $("#bar").html('')
    $("#bar").show()
    $("#bar").append(`
        <span class="progress-bar-txt">`+ text +`</span>
        <div class="percentage progress-circle" id="percent">
            <span class="percent-txt">0%</span>
            <svg class="polygon" xmlns="http://www.w3.org/2000/svg" width="8" height="6" viewBox="0 0 8 6">
                <path id="Polygon_1" data-name="Polygon 1" d="M4,0,8,6H0Z" transform="translate(8 6) rotate(180)" fill="#5466dd"/>
            </svg>  
        </div>
        <div class="load" id="load-bar"></div>
    `)
    let audio = new Audio('assets/notification.ogg');
    audio.volume = 0.1;
    audio.play(); 
    var start = new Date();
    var timeoutVal = Math.floor(ms / 100)
    animate();

    function animate() {
        var now = new Date();
        var timeDiff = now.getTime() - start.getTime();
        var perc = Math.round( (timeDiff / ms) * 100 )
        if (perc <= 100) {
            document.getElementById('load-bar').style.width = perc + '%'
            document.getElementById('percent').style.left = perc + '%'
            $(".percent-txt").html(perc + "%")
            setTimeout(animate, timeoutVal);
        } else $("#bar").hide();
    }
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
        case 'sendAnnounce':
            createAnnounce(item.text, item.ms)
            return;
        case 'showFloatingText':
            createFloatingText(item.text)
            return;
        case 'hideFloatingText':
            clearFloatingText()
            return;
        case 'send-notification':
            notificationPop(item.icon, item.msg, item.ms, guidGenerator())
            return;
        case 'send-alert':
            alertPop(item.type, item.msg, item.ms, guidGenerator())
            return;
        case 'createProgressBar':
            createBar(item.text, item.ms)
            return;
        case 'updateSound':
            sound = item.sound
            return;
        default: 
        return;
    }
});