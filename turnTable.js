// @ts-check

// NAME: turnTable
// AUTHOR: terminalPoltergeist
// DESCRIPTION: makes the currently playing album art round and spin like a record

/// <reference path="../globals.d.ts" />


(async function turnTable() {
    if (!(Spicetify.Platform && Spicetify.React)){
        setTimeout(turnTable, 300);
        return;
    }
    await initTurnTable();
})();

function rotateElem(elem){
    let intID = 0; // persistant variable for holding interval id 
    elem.style.setProperty("border-radius", "100% !important");
    document.documentElement.style.setProperty("--rotated", "0deg");
    let art = document.querySelector(".cover-art.shadow");
    art.style.setProperty("box-shadow", "0 0 10pxrgba(var(--spice-rgb-shadow),.3)");
    Spicetify.Player.addEventListener("onplaypause", function(){
        // computing rotation angle
        let tr = window.getComputedStyle(elem, null).getPropertyValue("transform");
        if( tr !== "none") {
            var values = tr.split('(')[1];
            values = values.split(')')[0];
            values = values.split(',');
            var a = values[0];
            var b = values[1];
            var c = values[2];
            var d = values[3];

            var scale = Math.sqrt(a*a + b*b);

            // First option, don't check for negative result
            // Second, check for the negative result
            /**/
            var radians = Math.atan2(b, a);
            var angle = Math.round( radians * (180/Math.PI));
            /*/
            var radians = Math.atan2(b, a);
            if ( radians < 0 ) {
              radians += (2 * Math.PI);
            }
            var angle = Math.round( radians * (180/Math.PI));
            /**/
            
        } else {
            var angle = 0;
        }
        if (!Spicetify.Player.isPlaying()){
            // if playing, set rotation to calculated angle
            document.documentElement.style.setProperty("--rotated", angle + "deg");
            // rotation animation
            intID = setInterval(() =>{
                elem.style.setProperty("transform", "rotate(" + angle + "deg)"); 
                angle = angle + 0.1;
            }, 1);
        }else{
            // stop interval
            clearInterval(intID);
            // set static rotation to where it stoped
            elem.style.setProperty("transform", "rotate(" + angle + "deg)");
        }
    });
}

function initTurnTable(){
    if (!Spicetify.Player.isPlaying()){
        const art = document.querySelector("#main > div > div.Root__top-container > nav > div.main-navBar-navBar > div.Foyk_HJx16yh22JYmQ56 > div > div > a > div > div");
        rotateElem(art);
    }
    Spicetify.Player.addEventListener("songchange", function(){
        const art = document.querySelector("#main > div > div.Root__top-container > nav > div.main-navBar-navBar > div.Foyk_HJx16yh22JYmQ56 > div > div > a > div > div");
        rotateElem(art);
    });
}

