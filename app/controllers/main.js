var usersList = new UsersList(); // cai nay la sao a
var validation = new Validation();
//Lấy DS từ mockAPI
function layUsersList() {
    usersList.layDS()
        .then(function (response) {
            //thành công
            console.log(response.data);
            hienThiTable(response.data);
        })
        .catch(function (error) {
            //thất bại
            console.log(error)
        });
}
layUsersList();

function hienThiTable(mangList) {
    var content = "";
    mangList.map(function (item, index) {
        content += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.ngonNgu}</td>
                <td>${item.loaiND}</td>
                <td>
                    <button class="btn btn-danger" onclick = "xoa(${item.id});" >Xóa</button>
                    <button class="btn btn-info" onclick = "xemChiTiet(${item.id});"
                    data-toggle="modal"
                    data-target="#myModal">Xem
                    </button>
                </td>
            </tr>
        `;
    });
    document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
}

function themUsers() {
    //Lấy info từ form
    var tk = document.getElementById("TaiKhoan").value;
    var mk = document.getElementById("MatKhau").value;
    var ten = document.getElementById("HoTen").value;
    var email = document.getElementById("Email").value;
    var tieng = document.getElementById("loaiNgonNgu").value;
    var loai = document.getElementById("loaiNguoiDung").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var moTa = document.getElementById("MoTa").value;
    // console.log(tk,ten,mk,email,hinhAnh,loai,tieng,moTa);

    
    usersList.layDS()
    .then(function (response){
        //validation
        var isValid = true;
        isValid &= validation.checkEmpty(tk, "spanTaiKhoan", "Vui lòng không để trống")
        && validation.checkTaiKhoan(tk, "spanTaiKhoan", "Tài khoản bị trùng", response.data);

        isValid &= validation.checkEmpty(ten, "spanHoTen", "Vui lòng không để trống")
        && validation.checkName(ten, "spanHoTen", "Tên không có kí tự đặc biệt");

        isValid &= validation.checkEmpty(mk, "spanMatKhau", "Vui lòng không để trống")
        && validation.checkPass(mk, "spanMatKhau", "Nhập đúng format có 6-8 kí tự và có kí tự đặc biệt");

        isValid &= validation.checkEmpty(email, "spanEmail", "Vui lòng không để trống")
        && validation.checkEmail(email, "spanEmail", "Nhập đúng format email");

        isValid &= validation.checkEmpty(hinhAnh, "spanHinhAnh", "Vui lòng không để trống");

        isValid &= validation.checkDropDown("loaiNguoiDung", "spanNguoiDung", "Vui lòng phải chọn loại");

        isValid &= validation.checkDropDown("loaiNgonNgu", "spanNgonNgu", "Vui lòng phải chọn loại");

        isValid &= validation.checkEmpty(moTa, "spanMoTa", "Vui lòng không để trống")
        && validation.checkMoTa(moTa, "spanMoTa", "Nhập không quá 60 kí tự");
        if (isValid) {
            var user = new User(tk, mk, ten, email, tieng, loai, hinhAnh, moTa);
            // console.table(user);
            usersList.them(user)
                .then(function (response) {
                    console.log(response.data);
                    layUsersList();
                    document.querySelector("#myModal .close").click();
                })
                .catch(function (error) {
                    console.log(error)
                });
        }
    })
    .catch(function (error) {
        //thất bại
        console.log(error)
    });
}

document.getElementById("btnThemNguoiDung").addEventListener("click", function () {
    document.querySelector(".modal-footer").innerHTML = `
    <button class="btn btn-success" onclick="themUsers();">Thêm</button>`;
});

function xemChiTiet(id) {
    usersList.layUser(id)
        .then(function (response) {
            //thành công
            console.log(response.data);
            document.getElementById("TaiKhoan").value = response.data.taiKhoan;
            document.getElementById("MatKhau").value = response.data.matKhau;
            document.getElementById("HoTen").value = response.data.hoTen;
            document.getElementById("Email").value = response.data.email;
            document.getElementById("loaiNgonNgu").value = response.data.ngonNgu;
            document.getElementById("loaiNguoiDung").value = response.data.loaiND;
            document.getElementById("HinhAnh").value = response.data.hinhAnh;
            document.getElementById("MoTa").value = response.data.moTa;
            document.querySelector(".modal-footer").innerHTML = `
        <button class="btn btn-success" onclick="capNhat('${response.data.id}');">Cập nhật</button>`;
        })
        .catch(function (error) {
            //thất bại
            console.log(error)
        });
}

function capNhat(id) {
    var tk = document.getElementById("TaiKhoan").value;
    var mk = document.getElementById("MatKhau").value;
    var ten = document.getElementById("HoTen").value;
    var email = document.getElementById("Email").value;
    var tieng = document.getElementById("loaiNgonNgu").value;
    var loai = document.getElementById("loaiNguoiDung").value;
    var hinhAnh = document.getElementById("HinhAnh").value;
    var moTa = document.getElementById("MoTa").value;
    // console.log(tk,ten,mk,email,hinhAnh,loai,tieng,moTa);
    var user = new User(tk, mk, ten, email, tieng, loai, hinhAnh, moTa);
    // console.table(user);
    usersList.capNhatUser(user, id)
        .then(function (response) {
            console.log(response.data);
            layUsersList();
            document.querySelector("#myModal .close").click();
        })
        .catch(function (error) {
            console.log(error)
        });
}

function xoa(id) {
    usersList.xoaUser(id)
        .then(function (response) {
            console.log(response.data);
            layUsersList();
        })
        .catch(function (error) {
            console.log(error)
        });
}