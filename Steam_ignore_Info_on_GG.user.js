// ==UserScript==
// @name         Steam ignore Info on GG Deals
// @version      1.0
// @description  Show if the game is ignored on Steam on GG Deals game page
// @author       JulLeBarge
// @match        https://gg.deals/game/*
// @match        http://gg.deals/game/*
// @grant        GM_xmlhttpRequest
// @namespace    https://github.com/jullebarge/Steam-ignore-Info-on-GG-Deals
// @downloadURL  https://github.com/jullebarge/Steam-ignore-Info-on-GG-Deals/raw/master/Steam_ignore_Info_on_GG.user.js
// @updateURL    https://github.com/jullebarge/Steam-ignore-Info-on-GG-Deals/raw/master/Steam_ignore_Info_on_GG.user.js
// ==/UserScript==

if(window.location.href.indexOf("gg.deals/game/") > 0)
{
	console.log("GG Deals Game Page detected");
    var SteamLink = document.getElementsByClassName("game-link-widget")[0];
    console.log("SteamLink=" + SteamLink.href);
    console.log("SteamLink=" + SteamLink.textContent);

    if (SteamLink.textContent=="View on SteamView on Steam")
    {
        var Entete = document.getElementsByClassName("col-left")[0];

        (function (link_inside, entete_inside) {
            GM_xmlhttpRequest({
                method: "GET",
                url: link_inside.href,
                onload: function(xhr) {
                    //console.log(xhr.responseText);
                    if(xhr.responseText.indexOf('<div class="btnv6_blue_hoverfade  btn_medium queue_btn_active" data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" style="" data-tooltip-text="Les titres ignorés ne vous seront pas recommandés et n\'apparaitront pas dans les espaces d\'affichage.">') > 0)
                        //<div class="btnv6_blue_hoverfade  btn_medium queue_btn_active" data-panel="{&quot;focusable&quot;:true,&quot;clickOnActivate&quot;:true}" style="" data-tooltip-text="Les titres ignorés ne vous seront pas recommandés et n'apparaitront pas dans les espaces d'affichage.">
                    {
                        entete_inside.style.background="red";

                    }
                    else if ((xhr.responseText.indexOf("adult_content_age_gate") > 0) || (xhr.responseText.indexOf("agecheck") > 0) || (xhr.responseText.indexOf("package_header_container") > 0))
                    {
                        entete_inside.style.background="orange";
                    }
                    else if (xhr.responseText.indexOf("<title>Bienvenue sur Steam</title>") > 0)
                    {
                        entete_inside.style.background="blue";
                    }
                    else
                    {
                        entete_inside.style.background="green";
                    }
                }
            });
        })(SteamLink, Entete);
    }
}
else
{
    console.log("Page non trouvee");
}
