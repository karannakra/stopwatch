$(function () {
    var mode = 0;
    var timeCounter = 0;
    var lapCounter = 0;
    var action;
    var lapNumber = 0;
    var timeminutes, timeSeconds, timecentiseconds, lapminutes=0,
        lapseconds, lapcentiseconds;
    hideshowbutton("#start-button","#lap-button");
    $("#start-button").click(function () {
    mode=1;
    hideshowbutton("#stop-button","#lap-button")
    startActions();
    });

    $("#stop-button").click(function () {
    hideshowbutton("#resume-button","#reset-button")
    clearInterval(action);

    });
    $("#resume-button").click(function () {
        hideshowbutton("#stop-button","#lap-button")
        startActions();

    });
    $("#reset-button").click(function () {
        location.reload();
    });
    $("#lap-button").click(function () {
        if (mode===1){
            clearInterval(action);
            lapCounter=0;
            addlap();
            startActions();
        }

    });
    function hideshowbutton(x,y) {
    $(".custom-control").hide();
    $(x).show();
    $(y).show();
    }
    function startActions() {
    action=setInterval(function () {
        timeCounter++;
        if (timeCounter===100*60*100){
            timeCounter=0;
        }
        lapCounter++;
        if (lapCounter===100*60*100) {
        lapCounter=0;
        }
        updatetime();
    },10)
    }
    
    //update time going to convert to min,sec,centisec
     function updatetime() {
     timeminutes=Math.floor(timeCounter/6000);
     timeSeconds=Math.floor((timeCounter%6000)/100);
     timecentiseconds=(timeCounter%6000)%100;
     $("#timemin").text(format(timeminutes));
     $("#timesec").text(format(timeSeconds));
     $("#timecentisecond").text(format(timecentiseconds));

     lapminutesminutes=Math.floor(lapCounter/6000);
     lapseconds=Math.floor((lapCounter%6000)/100);
     lapcentiseconds=(lapCounter%6000)%100;
     $("#lapmin").text(format(lapminutes));
     $("#lapsec").text(format(lapseconds));
     $("#lapcentisecond").text(format(lapcentiseconds));
    }
    function format(number) {
        if (number<10){
            return '0'+number;
        }else
        {
            return number;
        }
    }

function addlap() {
            lapNumber++;
            var mylapdetails="<div class='lap'>" +
                "<div class='laptimetitle'>"+"lap"+lapNumber+"</div>"+
                "<div class='laptime'>" +"<span>"+format(lapminutes)+"</span>"+
":<span>"+format(lapseconds)+"</span>"+
":<span>"+format(lapcentiseconds)+":</span>"+"</div>"+"</div>";

            $(mylapdetails).prependTo("#lapse");
}

});