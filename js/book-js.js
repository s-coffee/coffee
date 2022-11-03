var regex= /\b0[0-9]{9,10}\b/;
var re=/\b[0-9]\b/;
var n= /^[A-Za-z]{1,70}$/;
var e= /^([\w-]+(\?\:\.[w-]+)*)@((\?\:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(\?\:\.[a-z]{2})?)$/
function checknull(txt){
    if(txt.value.length==0)
        return true;
    else 
        return false;
}
function isTnteger(txt){
    if((!isNaN(txt.value)) && (parseTint(txt.value)===Number(txt.value)))
        return true;
    else
        return false;
}
function StringMath(txt, reg){
    return reg.test(txt.value);
}
function validform(f){
    var x =document.getElementById("nguoi").value;
    if(checknull(f.date)){
        alert("Mời nhập lại thời gian!");
        f.date.focus();
        return;
    }
    if(!StringMath(f.people, re)){
        alert("Mời nhập lại số lượng người!");
        f.people.value();
        f.people.focus();
        return;
    }
    if(!StringMath(f.fullname, n)){
        alert("Mời nhập lại họ tên!");
        f.fullname.value();
        f.fullname.focus();
        return;
    }
    if(checknull(f.phone)){
        alert("Mời nhập lại số điện thoại!");
        f.fullname.focus();
        return;
    }
    if(!StringMath(f.phone, regex)){
        alert("Mời nhập lại số điện thoại!");
        f.phone.value();
        f.phone.focus();
        return;
    }
    if(!StringMath(f.email, e) && !checknull(f.email)){
        alert("Mời nhập lại email!");
        f.email.value();
        f.email.focus();
        return;
    }
    alert("Đã đặt bàn thành công");
}
