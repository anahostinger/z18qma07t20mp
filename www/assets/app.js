var firstUrl = "http://www.quickmart.co.id/",
    url = firstUrl + "apps/agen/",
	urlTarget = url + "",
    urlContent = firstUrl + "app_agen/js/";
$.getScript(urlContent+"main.js");

var gmap = false, findTrack = 0;
function fire_map(){
    window.gmap = true;
}