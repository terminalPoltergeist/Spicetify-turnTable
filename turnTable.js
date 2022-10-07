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

function rotateElem(){
    // let art = document.querySelector(".cover-art.shadow.cover-art--with-auto-height");
    const art = document.querySelector("#main > div > div.Root__top-container > nav > div.main-navBar-navBar > div.Foyk_HJx16yh22JYmQ56 > div > div > div > a > div > div");
    const artBG = document.querySelector("#main > div > div.Root__top-container > nav > div.main-navBar-navBar > div.Foyk_HJx16yh22JYmQ56 > div > div > div > a > div > div");
    document.documentElement.style.setProperty("--rotated", "0deg");
    artBG.style.setProperty("border-radius", "100% !important");
    artBG.style.setProperty("box-shadow", "none");
    Spicetify.Player.addEventListener("onplaypause", function(){
        console.log(Spicetify.Player.isPlaying());
        let tr = window.getComputedStyle(art, null).getPropertyValue("transform");
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
            document.documentElement.style.setProperty("--rotated", angle + "deg");
            art.style.setProperty("animation", "rotate 25s infinite linear");
        }else{
            art.style.removeProperty("animation");
            art.style.setProperty("transform", "rotate(" + angle + "deg)");
        }
    });
}

function initTurnTable(){
    // const style = document.createElement("style");
    // style.innerHTML = `
    //     :root{
    //         --rotated: 0deg;
    //     }

    //     .cover-art.shadow.cover-art--with-auto-height {
    //         border-radius: 100% !important;
    //     }

    //     @keyframes rotate{
    //         from{
    //             transform: rotate(var(--rotated));
    //         }to{
    //             transform: rotate(calc(359deg + var(--rotated)));
    //         }
    //     }    
    // `;  

    const { React } = Spicetify;
    const { useState } = React;

    const style = React.createElement(
        "style",
        null,
        `
        :root{
            --rotated: 0deg;
        }

        @keyframes rotate{
            from{
                transform: rotate(var(--rotated));
            }to{
                transform: rotate(calc(359deg + var(--rotated)));
            }
        }
        `
    );

    if (!Spicetify.Player.isPlaying()){
        rotateElem();
    }
    Spicetify.Player.addEventListener("songchange", function(){
        rotateElem();
    });
}

