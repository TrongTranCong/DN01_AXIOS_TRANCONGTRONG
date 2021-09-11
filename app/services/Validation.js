function Validation(){
    //Kiểm tra ô trống
    this.checkEmpty = function(inputval,spanID,message){
        if(inputval.trim() == ""){
            document.getElementById(spanID).innerHTML = message;
            // document.getElementById(spanID).style.display = "block"
            return false;
        }else{
            document.getElementById(spanID).innerHTML = "";

            return true;
        } 
    }
    //Kiểm tra tài khoản trùng
    this.checkTaiKhoan = function(inputval,spanID,message,mang){
        
        var isExist = false;
        isExist = mang.some(function(item,index){
            return item.taiKhoan === inputval.trim();
        });
        if(isExist){
            document.getElementById(spanID).innerHTML = message;
            return false;
        }else{
            document.getElementById(spanID).innerHTML = "";
            return true;
        } 
    }
    //Kiểm tra tên
    this.checkName = function(inputval,spanID,message){
        var pattern = new RegExp("^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶ" + "ẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợ" + "ụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹý\\s]+$");
        if (pattern.test(inputval)){
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        } 
    }
    //Kiểm tra mật khẩu
    this.checkPass = function(inputval,spanID,message){
        var pattern = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/);
        if(pattern.test(inputval)){
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            // không hợp lệ
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    } 
    //Kiểm tra email
    this.checkEmail = function(inputval,spanID,message){
        var pattern = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if(pattern.test(inputval)){
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    //Kiểm tra loạiND
    this.checkDropDown = function(selID,spanID,message){
        var optIndex = document.getElementById(selID).selectedIndex;
        if(optIndex !=0){
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
    //Kiểm tra mô tả
    this.checkMoTa = function(inputval,spanID,message){
        if(inputval.length <=60){
            document.getElementById(spanID).innerHTML = "";
            return true;
        }else{
            document.getElementById(spanID).innerHTML = message;
            return false;
        }
    }
}
