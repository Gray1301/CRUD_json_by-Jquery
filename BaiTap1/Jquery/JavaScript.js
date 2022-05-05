var call_class;
//lấy ra class của td đang click, call ra để dùng biến này bỏ tr lên popup khi sửa
$(document).ready(function () {
    $("td").css('color', 'red');
    $('tr:even').css('background-color', 'white');
    $("td:nth-child(5)").css('text-align', 'center');
    $("td:nth-child(1)").css('text-align', 'right');
    $("td:nth-child(2),td:nth-child(6),td:nth-child(7),td:nth-child(8)").css('text-align', 'left');
    $('.buttonThem').click(function () {
        $('.popup-content').load('Form.html');
        Add();
        $("tbody tr").remove();
    });
    Load();
    //set phân trang
    //function PhanTrang() {
    //    let options = {
    //        numberPerPage: 4, //Cantidad de datos por pagina
    //        goBar: true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
    //        pageCounter: true, //Contador de paginas, en cual estas, de cuantas paginas
    //    };

    //    let filterOptions = {
    //        el: '#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
    //    };

    //    paginate.init('.myTable', options, filterOptions);
    //}
    //PhanTrang();
    //sửa
    Edit();
    //Thêm
    Add();
    //Tìm theo địa chỉ
    $('#find_diachi').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            $("tbody tr").remove();
            for (var k in json) {
                if (json[k].DiaChi == $(this).val()) {
                    let check = (json[k].DaLayBang == "true") && "checked";
                    $("#add").append(
                        "<tr>" +
                        "<td>" + json[k].Ma + "</td>" +
                        "<td>" + json[k].HoTen + "</td>" +
                        "<td>" + json[k].NgaySinh + "</td>" +
                        "<td>" + json[k].GioiTinh + "</td>" +
                        "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                        "<td>" + json[k].DiaChi + "</td>" +
                        "<td>" + json[k].Lop + "</td>" +
                        "<td>" + json[k].Khoa + "</td>" +
                        "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='7px' height='7px'/> " + "</td>" +
                        "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/sua.PNG' width='7px' height='7px'/>" + "</td>"
                        + "</tr>"
                    );
                }
            }
            if ($(this).val() == "") {
                Load();
            }
            Delete();
            Edit();
            $("td:nth-child(1)").css('text-align', 'right');
            $("td:nth-child(2),td:nth-child(6),td:nth-child(7),td:nth-child(8)").css('text-align', 'left');
            $("td:nth-child(2)").css('color', 'blue');
            $('tr:even').css('background-color', '#CCE5FF');
        }
    });
});
function Load() {
   
    $("tbody tr").remove();
    for (var k in json) {
        let check = (json[k].DaLayBang == "true") && "checked";
        $("#add").append(
            "<tr>" +
            "<td>" + json[k].Ma + "</td>" +
            "<td>" + json[k].HoTen + "</td>" +
            "<td>" + json[k].NgaySinh + "</td>" +
            "<td>" + json[k].GioiTinh + "</td>" +
            "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
            "<td>" + json[k].DiaChi + "</td>" +
            "<td>" + json[k].Lop + "</td>" +
            "<td>" + json[k].Khoa + "</td>" +
            "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/>  " + "</td>" +
            "<td" + " class='" + json[k].Ma + "'>" + "<a href='#xmas-popup'>" + "<img src = '../images/sua.PNG' width='50px' height='50px'/>" + "</a>" + "</td>"
            + "</tr>"
        );
    }
    $('#IdCheckBox').attr('readonly', true);
    $("td:nth-child(1)").css('text-align', 'right');
    $("td:nth-child(2),td:nth-child(6),td:nth-child(7),td:nth-child(8)").css('text-align', 'left');
    $('tr:even').css('background-color', '#CCE5FF');
    $("td:nth-child(2)").css('color', 'blue');
    $("td:nth-child(1)").css('color', 'blue');
    //PhanTrang();
    //Add();
    Edit();
    Delete();

}
function Add() {
    $('#add_sv').click(function () {
        //check xem người dùng nhập mã có trùng vs mã cũ ko
        var checkMaLap = true;
        if ($("#Ma").val() == "" || $("#HoTen").val() == "") {
            alert("Vui lòng nhập đủ thông tin cần thiết ?")
        }
        for (var k in json) {
            if (json[k].Ma == $("#Ma").val() || $("#date").val() == "" || $("#khoa").val() == "") {
                checkMaLap = false;
                alert("Mã bị trùng lặp")
                break;
            }
        }
        var DaLayBang;
        var GioiTinh;
        if (checkMaLap) {
            if ($("#DaLayBang").prop("checked") == true) {
                DaLayBang = "true";
            }
            else {
                DaLayBang = "false";
            }
            GioiTinh = $("input[name='flexRadioDefault']:checked").val();
            if (GioiTinh == "Male") {
                GioiTinh = "Nam";
            }
            if (GioiTinh == "Female") {
                GioiTinh = "Nữ";
            }
            json.push({ "Ma": $("#Ma").val(), "HoTen": $("#HoTen").val(), "NgaySinh": $("#date").val(), "GioiTinh": GioiTinh, "DaLayBang": DaLayBang, "DiaChi": $('#form-select').val(), "Lop": $(".content").html(), "Khoa": $("#khoa").val() });
            // console.log(json);
            $('tr:even').css('background-color', '#CCE5FF');
        }
       
        $("tbody tr").remove();
        Load();
        //Delete();
        Edit();
        $("td:nth-child(1)").css('text-align', 'right');
        $("td:nth-child(2),td:nth-child(6),td:nth-child(7),td:nth-child(8)").css('text-align', 'left');
    });
}
function Edit() {
    $("td:last-child").click(function () {
        // lấy ra class của cái td đang click,class set theo mã nên nó là duy nhất
        let this_class = $(this).attr('class');
        call_class = this_class;
        $('.popup-content').load('Form.html');
        $("td:nth-child(1)").css('text-align', 'right');
        $("td:nth-child(2),td:nth-child(6),td:nth-child(7),td:nth-child(8)").css('text-align', 'left');
    });
}
function Delete() {
    $("td:nth-last-child(2)").click(function () {
        // lấy ra class của cái td đang click
        var this_class = $(this).attr('class');
        var result = confirm("Bạn có muốn xóa sinh viên có mã " + this_class + " ?");
        if (result) {
           for (var i = 0; i < json.length; i++) {
            if (json[i].Ma == this_class) {
                json.splice(i, 1);
            }
        }
        //console.log(json);
        $("tbody tr").remove();
        Load();
        $("td:nth-child(1)").css('text-align', 'right');
        $("td:nth-child(2),td:nth-child(6),td:nth-child(7),td:nth-child(8)").css('text-align', 'left');
        }
        
    });
}
//Lọc theo giới tính
function Gender() {
    $("tbody tr").remove();
    if ($("#gender").val() == "Nam") {
        for (var k in json) {
            if (json[k].GioiTinh == "Nam") {
                //console.log(json[k]);
                let check = (json[k].DaLayBang == "true") && "checked";
                $("#add").append(
                    "<tr>" +
                    "<td>" + json[k].Ma + "</td>" +
                    "<td>" + json[k].HoTen + "</td>" +
                    "<td>" + json[k].NgaySinh + "</td>" +
                    "<td>" + json[k].GioiTinh + "</td>" +
                    "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                    "<td>" + json[k].DiaChi + "</td>" +
                    "<td>" + json[k].Lop + "</td>" +
                    "<td>" + json[k].Khoa + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<a href='#xmas-popup'>" + "<img src = '../images/sua.PNG' width='10px' height='10px'/>" + "</a>" + "</td>"
                    + "</tr>"
                );
            }

        }
    }
    else if ($("#gender").val() == "Nu") {
        for (var k in json) {
            if (json[k].GioiTinh == "Nữ") {
                // console.log(json[k]);
                let check = (json[k].DaLayBang == "true") && "checked";
                $("#add").append(
                    "<tr>" +
                    "<td>" + json[k].Ma + "</td>" +
                    "<td>" + json[k].HoTen + "</td>" +
                    "<td>" + json[k].NgaySinh + "</td>" +
                    "<td>" + json[k].GioiTinh + "</td>" +
                    "<td>" + "<input  " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                    "<td>" + json[k].DiaChi + "</td>" +
                    "<td>" + json[k].Lop + "</td>" +
                    "<td>" + json[k].Khoa + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<a href='#xmas-popup'>" + "<img src = '../images/sua.PNG' width='10px' height='10px'/>" + "</a>" + "</td>"
                    + "</tr>"
                );

            }
        }
    }
    else {
        for (var k in json) {
            let check = (json[k].DaLayBang == "true") && "checked";
            $("#add").append(
                "<tr>" +
                "<td>" + json[k].Ma + "</td>" +
                "<td>" + json[k].HoTen + "</td>" +
                "<td>" + json[k].NgaySinh + "</td>" +
                "<td>" + json[k].GioiTinh + "</td>" +
                "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                "<td>" + json[k].DiaChi + "</td>" +
                "<td>" + json[k].Lop + "</td>" +
                "<td>" + json[k].Khoa + "</td>" +
                "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                "<td" + " class='" + json[k].Ma + "'>" + "<a href='#xmas-popup'>" + "<img src = '../images/sua.PNG' width='10px' height='10px'/>" + "</a>" + "</td>"
                + "</tr>"
            );
        }
    }
    Delete();
    Edit();
    $('tr:even').css('background-color', '#CCE5FF');
    $("td:nth-child(2)").css('color', 'blue');
    $("td:nth-child(1)").css('text-align', 'right');
    $("td:nth-child(2),td:nth-child(6),td:nth-child(7),td:nth-child(8)").css('text-align', 'left');

}