function tsTodate(ts) {
    var date = new Date(parseInt(ts)*1000);

    //var str = date.getFullYear().toString()+"-"+((date.getMonth()+1).toString().length==2?(date.getMonth()+1).toString():"0"+(date.getMonth()+1).toString())+"-"+(date.getDate().toString().length==2?date.getDate().toString():"0"+date.getDate().toString())+" "+(date.getHours().toString().length==2?date.getHours().toString():"0"+date.getHours().toString())+":"+((parseInt(date.getMinutes()/5)*5).toString().length==2?(parseInt(date.getMinutes()/5)*5).toString():"0"+(parseInt(date.getMinutes()/5)*5).toString())+":00";
    var str = date
    return str
}

function timeLeft(ts) {
    //console.log(ts)
    var date1 = new Date();
    var date2 = new Date(parseInt(ts)*1000);
    //console.log(ts, ts*1000)
    //console.log(date1, date2)
    if (date2.getTime() > date1.getTime()) {
        var diff = new Date(date2.getTime() - date1.getTime());
        //console.log(date2.getTime(), date1.getTime(), diff)
        boolPassed = '<span style="color:blue;">left</span>'
    }  else {
        var diff = new Date(date1.getTime() - date2.getTime());
        //console.log(date2.getTime(), date1.getTime(), diff)        
        boolPassed = '<span style="color:red;">over</span>'
    }

    var years = diff.getUTCFullYear() - 1970; // Gives difference as year
    var months = diff.getUTCMonth(); // Gives month count of difference
    var days = diff.getUTCDate(); // Gives day count of difference

    var hours = diff.getUTCHours(); // Gives day count of difference
    var minutes = diff.getUTCMinutes(); // Gives day count of difference
    var seconds = diff.getUTCSeconds(); // Gives day count of difference

    //console.log(years, months, days, hours, minutes, seconds)

    var left = ""

    if (years > 0) 
        left =  years + "Y " 
    if (months > 0)    
        left += months + "M " 
    if (days > 0)
        left += days + "D ";

    if (hours > 0) 
        left +=  hours + "h " 
    if (minutes > 0)    
        left += minutes + "m " 
    if (seconds > 0)
        left += seconds + "s ";
    left += boolPassed

    return left
}

function showTimeLeft(id, ts){
    //console.log(ts)
    var tl = timeLeft(ts)
    //console.log(tl)
    $("#" + id+"_timeLeft").html(tl)

    if(tl.includes("over")) {
        $("#spanState").html('(<span style="color: red;">time over</span>)')
        //$("#spanState").css("color, red")
    } else {
        $("#spanState").html('successfully')
    }
} 

function abbrAddress(un) {
    var strName = un.substring(0, 6) + "..." + un.slice(-4, un.length)
    return strName
}

function create_ani_button(id, fn, btnText, btnImage){
    let imgsrc = "/static/ipfs/img/connected.png"
    if (btnImage)
        imgsrc = "/static/ipfs/img/" + btnImage
    let b = ''
        b += '<button type="button" class="box_button button-block" id="' + id + '" onClick="javascript:' + fn + ';">'
        b += '   <div class="buttonContent">'
        b += '      <div>' + btnText + ' <img src="'+imgsrc+'" /></div>'
        b += '      <div class="min-loading min-loading-hidden">'
        b += '      <div></div>'
        b += '      <div></div>'
        b += '      <div></div>'
        b += '      <div></div>'
        b += '      </div>'
        b += '   </div>'
        b += '</button>'
    
        b += '<div class="min-loading blue loading-hidden">'
        b += '  <div></div>'
        b += '  <div></div>'
        b += '  <div></div>'
        b += '  <div></div>'
        b += '</div>'

    return b
}

// https://zetawiki.com/wiki/JavaScript_%ED%81%B4%EB%A6%BD%EB%B3%B4%EB%93%9C%EB%A1%9C_%EB%B3%B5%EC%82%AC%ED%95%98%EA%B8%B0
function copy_to_clipboard(srcElement) {    
    var s = document.getElementById(srcElement);
    var val = s.innerHTML
    
    const t = document.createElement("textarea");
    document.body.appendChild(t);
    t.value = val;
    t.select();
    document.execCommand('copy');
    document.body.removeChild(t);

    alert('Address Copied to Clipboard');
}

// sweetalert2 사용법 //https://inpa.tistory.com/entry/SweetAlert2-%F0%9F%93%9A-%EC%84%A4%EC%B9%98-%EC%82%AC%EC%9A%A9 
function toastAlert(icon, title, text){
    const Toast = Swal.mixin({
        toast: true,
        //target: body,
        //position: 'center-center',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: icon,  // 여기다가 아이콘 종류를 쓰면 됩니다.                     
        title: title,
        text: text
    })
}


// https://engineeringcode.tistory.com/89
async function imgToBase64ByFileReader(url, kind) {
    return new Promise((resolve, reject) => {
        let xhr = new XMLHttpRequest();
        xhr.onload = () => {
        let reader = new FileReader();
        reader.onloadend = function () {
            resolve(reader.result);
            // console.log(reader.result);
            // document.getElementById('logo').setAttribute('src', reader.result);
        }
        
        if(kind == "")
            reader.readAsDataURL(xhr.response);
        else if(kind == "DataURL") 
            reader.readAsDataURL(xhr.response);
        else if(kind == "Text")
            reader.readAsText(xhr.response);
        else if(kind == "BufferArray")
            reader.readAsArrayBuffer(xhr.response);                
        }

        xhr.open('GET', url);
        xhr.responseType = 'blob';
        xhr.send();
    });
}