var firstUrl = "http://www.quickmart.co.id/",
    url = firstUrl + "apps/agen/",
	urlTarget = url + "";

function run(onSuccess){
    getVersionCode(function(res){
        if(getLS("versionCode") != res){
            clearLS();
            setLS("versionCode", res);
        }
        onSuccess();
    });
}
function set_content(contentName){
    getHtml(contentName);
}
function getVersionCode(onSuccess){
	$.ajax({
		url: firstUrl + "app_agen/js/versionCode.php",
		type: "get",
		dataType: "text",
        success: onSuccess
	});
}
function getX(link, sendData, onSuccess, dtType = "json"){
	return $.ajax({
		url: urlTarget + link,
		traditional: true,
		type: "post",
		dataType: dtType,
		data: sendData,
        error: ajaxErr,
		success: onSuccess
	}); 
}
function getXForm(link, sendData, onSuccess, dtType = "json"){
	return $.ajax({
		url: urlTarget + link,
		method: "POST",
		contentType: false,
        cache: false,
        processData: false,
		data: sendData,
		dataType: dtType,
        error: ajaxErr,
		success: onSuccess
	}); 
}
function getHtml(fileName, onSuccess=null){
    if(onSuccess==null)
        onSuccess = function(res){
            $("#content-app").html(res);
        }
    if(existLS("content-" + fileName)){
        var res = getLS("content-" + fileName);
        onSuccess(res);
        return;
    }
    var thisSuccess = function(res){
        setLS("content-" + fileName, res)
        onSuccess(res);
    };
	return $.ajax({
		url: firstUrl + "app_agen/js/" + fileName + ".php",
		type: "get",
		dataType: "text",
        success: thisSuccess
	}); 
}
function ajaxErr(jqXHR, exception){
	if(jqXHR.status === 0){
		alert("Tidak ada koneksi\nUlangi percobaan setelah koneksi aktif");
	}else if(jqXHR.status == 404){
		alert("Halaman server tidak ditemukan [404]\nHubungi developer apps"); 
	}else if(jqXHR.status == 500){ 
		alert("Internal Server Error [500]\nHubungi developer apps"); 
	}else if(exception == "parsererror"){ 
		alert("Data server tidak valid\nHubungi developer apps"); 
	}else if(exception == "timeout"){ 
		alert("Koneksi terlalu lama\nSilahkan ulangi setelah tunggu beberapa menit"); 
	}else if(exception == "abort"){ 
		alert("Koneksi ditolak\nHubungi developer apps"); 
	}else{ 
		alert("Error :\n" + jqXHR.responseText); 
	}
}
function evalDirect(val, msgError, tag, isNumber){
    if(isNumber)
        var evaluasi = (val === undefined || val === null || val == "" || val == 0);
    else
        var evaluasi = (val === undefined || val === null || val == "");
	if(evaluasi){ 
        alert(msgError);
        tag.focus();
        return 0; 
	}
	return 1;
}
function evalDirectEmail(val, msgError, tag){
	if(!validateEmail(val)){ 
        alert(msgError);
        tag.focus();
        return 0; 
	}
	return 1;
}
function evalLength(tag, msgError, min){
	if(!min) min = 6;
	if(tag.value.length < min){ 
		window.setTimeout(function(){ 
			alert(msgError);
			tag.focus(); 
		} , 500); 
		return 0; 
	}
	return 1;
}
function evalEmail(tag, msgError){
	if(!validateEmail(tag.value.trim())){
		window.setTimeout(function(){ 
			alert(msgError);
			tag.focus(); 
		} ,500); 
		return 0;
	}
	return 1;
}
function validateEmail( m ){ 
	var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; 
	return re.test( m ); 
}
function activeSlideEvent(){	
	(function(d){
		var ce=function(e,n){ var a=document.createEvent("CustomEvent");a.initCustomEvent(n,true,true,e.target);
			e.target.dispatchEvent(a);a=null;return false},
		nm=true,sp={x:0,y:0},ep={x:0,y:0}, touch={ touchstart:function(e){sp={x:e.touches[0].pageX,y:e.touches[0].pageY}},
		touchmove:function(e){nm=false;ep={x:e.touches[0].pageX,y:e.touches[0].pageY}},
		touchend:function(e){if(nm){ce(e,"fc")}else{var x=ep.x-sp.x,xr=Math.abs(x),y=ep.y-sp.y,yr=Math.abs(y);
		if(Math.max(xr,yr)>20){ce(e,(xr>yr?(x<0?"swl":"swr"):(y<0?"swu":"swd")))}};nm=true},
		touchcancel:function(e){nm=false} }; for(var a in touch){d.addEventListener(a,touch[a],false);}})
	(document);
}
Element.prototype.remove = function(){
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function(){
    var i = this.length, ths, pThs;
    while(i--){
        ths = this[i]; 
        pThs = ths.parentElement;
        if(ths && pThs)
            pThs.removeChild(ths);
    }
}
function removeRippleSpan(){    
    if(window.newCountDown){
        window.setTimeout(function(){
            window.newCountDown = false;
            removeRippleSpan();
        }, 390);
    }else{
        document.getElementsByClassName("ripple").remove();
        document.getElementsByClassName("ripple-dark").remove();
        window.removingRipple = false;
    }
}
var removingRipple = false, newCountDown = false; addRippleEffect = function(e){
    window.newCountDown = true;
    var target = e.target, rClass = "ripple";
    if(!target.classList.contains( "rips" )) target = target.parentElement;
	if(target === null || !target.classList.contains("rips")){
        rClass = "ripple-dark";
        target = e.target;
        if(!target.classList.contains("rips-dark"))target = target.parentElement;
        if(target === null || !target.classList.contains("rips-dark"))return false;
    }
    var rect = target.getBoundingClientRect();
    var ripple = target.querySelector("." + rClass);
    if(!ripple){
        ripple = document.createElement("span");
        ripple.className = rClass;
        ripple.style.height = ripple.style.width = Math.max(rect.width, rect.height) + "px";
        target.appendChild(ripple);
    }
    ripple.classList.remove("show");
    var top = e.pageY - rect.top - ripple.offsetHeight / 2 - document.body.scrollTop;
    var left = e.pageX - rect.left - ripple.offsetWidth / 2 - document.body.scrollLeft;
    ripple.style.top = top + "px";
    ripple.style.left = left + "px";
    ripple.classList.add("show");
    if(!window.removingRipple){
        window.newCountDown = false;
        window.removingRipple = true;
        window.setTimeout(removeRippleSpan, 490);
    }
    return false;
}
function setRippleEffect(){
	setTimeout(function(){
		document.addEventListener("click", addRippleEffect, false);
	}, 50);
}
function TblBack_Clicked(){
	document.addEventListener("backbutton", function(){
        if(confirm("Yakin keluar aplikasi ?"))
            navigator.app.exitApp();
    }, false); 
}
function setLS(name, val){
    localStorage.setItem(name, val);
}
function getLS(name){
	return localStorage.getItem(name);
}
function delLS(name){
	localStorage.removeItem(name);
}
function hasLogin(){
	return existLS("id_user");
}
function existLS(name){
	return (getLS(name) != undefined);
}
function clearLS(){
	localStorage.clear();
}
function evalImgType(tag, msgError){
    var re = /\.(jpg|jpeg|png)$/i;
    if(!re.exec(tag.value)){ 
        alert( msgError );
        tag.focus();
        return 0; 
	}
	return 1;
}
function getDayNames(no){
    var dayNames = [ "Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jum'at", "Sabtu" ];
    if( no === undefined ) return dayNames; else return dayNames[no];
}
function getMonthNames(no, shrt = false){
    if(shrt == true)
        var monthNames = [ "Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des" ];
    else
        var monthNames = [ "Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember" ];
    if( no === undefined ) return monthNames; else return monthNames[no];
}
function simple_date(date){
    date = date.split("-");
    return date[2] + "/" + date[1] + "/" + date[0].substr(2, 2);
}
function inRp(d) {
    var min = "", a = ""; d = parseInt(d); if(isNaN(d)) return 0;
    if(d < 0){ min = "-"; d = d * -1;}
    d = d.toString().split("").reverse().join("");
    for (var c = 0; c < d.length; c++) { if (c % 3 == 0) { a += d.substr(c, 3) + "." } }
    return min + a.split("", a.length - 1).reverse().join("");
}
function inHp(d) {
    var a = "";
    for (var c = 0; c < d.length; c++) { if (c % 4 == 0) { a += d.substr(c, 4) + " " } }
    return a;
}
function stringScript(text){
	text = text.replace("'", "\\\'");
	text = text.replace("\"", "\\x22");
	return text;
}