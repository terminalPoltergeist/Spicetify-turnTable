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
    document.documentElement.style.setProperty("--rotated", "0deg");
    elem.style.setProperty("border-radius", "100%");
    // let art = document.querySelector(".cover-art.shadow");
    // art.style.setProperty("box-shadow", "0 0 10pxrgba(var(--spice-rgb-shadow),.3)");
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
        if (Spicetify.Player.isPlaying()){
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
    // let cover-art-back = document.querySelector(".cover-art.shadow");
    // cover-art-back.style.setProperty("-webkit-box-shadow", "none !important");
    // cover-art-back.style.setProperty("box-shadow", "none !important");
    const art = document.querySelector(".main-coverSlotExpanded-container .cover-art img");
    art.style.setProperty("border-radius", "100%");
    if (Spicetify.Player.isPlaying()){
        rotateElem(art);
    }else{
        Spicetify.Player.addEventListener("songchange", function(){
            rotateElem(art);
        });
    }
    
}

