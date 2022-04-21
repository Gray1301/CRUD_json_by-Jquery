$(document).ready(function () {
    $('tr:even').css('background-color', 'white');
    //$("td:nth-child(3)").css('color', 'blue');
    $("td:nth-child(5)").css('text-align', 'center');
   // $('td:even').css('color', 'blue');
    function Load() {
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
                "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                + "</tr>"
            );
        }
        $('tr:even').css('background-color', '#CCE5FF');
        $("td:nth-child(2)").css('color', 'blue');
       // $("td:nth-child(2),th:nth-child(2)").css('text-align', 'left');
        //PhanTrang();
        Add();
        Edit();
        Delete();

    }// console.log(json);
    // $("#id").Load(Load());
    Load();

    //set phân trang
    function PhanTrang() {
        let options = {
            numberPerPage: 4, //Cantidad de datos por pagina
            goBar: true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
            pageCounter: true, //Contador de paginas, en cual estas, de cuantas paginas
        };

        let filterOptions = {
            el: '#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
        };

        paginate.init('.myTable', options, filterOptions);
    }
    //PhanTrang();


    //Xóa
    function Delete() {
        $("td:nth-last-child(2)").click(function () {
            // lấy ra class của cái td đang click
            var this_class = $(this).attr('class');
            for (var i = 0; i < json.length; i++) {
                if (json[i].Ma == this_class) {
                    json.splice(i, 1);
                }
            }
            //console.log(json);
            $("tbody tr").remove();
            Load();
        });
    }
    Delete();
    //sửa
    function Edit() {
        $("td:last-child").click(function () {
            // lấy ra class của cái td đang click,class set theo mã nên nó là duy nhất
            let this_class = $(this).attr('class');
           // console.log((this_class));
            $('#dialog').dialog();
            //Không cho phép sửa mã
            $('#Ma').attr('readonly', true);
            //bỏ thông tin của tr vừa click lên dialog
            for (var k in json) {
                if (json[k].Ma == this_class) {
                    $('#date').val(json[k].NgaySinh);
                    $('#HoTen').val(json[k].HoTen);
                    $('#Ma').val(json[k].Ma);

                    if (json[k].GioiTinh == "Nam"){
                        var $radios = $('input:radio[name=flexRadioDefault]');
                        $radios.filter('[value=Male]').prop('checked', true);
                    }
                    else {
                        var $radios = $('input:radio[name=flexRadioDefault]');
                        $radios.filter('[value=Female]').prop('checked', true);
                    }
                    if (json[k].DaLayBang == "true") {
                        $("#DaLayBang").prop("checked", true);
                    }
                    else{
                        $("#DaLayBang").prop("checked", false);
                    }
                    $(".content").html(json[k].Lop);

                    $('#khoa').val(json[k].Khoa);
                }
            }
            //console.log($(".content").html());
            //sửa
            $('#edit_sv').click(function () {
              
                var DaLayBang;
                var GioiTinh;
                if ($("#DaLayBang").prop("checked") == true) {
                    DaLayBang = "true";
                }
                else if ($("#DaLayBang").prop("checked") == false) {
                    DaLayBang = "false";
                }
                GioiTinh = $("input[name='flexRadioDefault']:checked").val();
                if (GioiTinh == "Male") {
                    GioiTinh = "Nam";
                }
                if (GioiTinh == "Female") {
                    GioiTinh = "Nữ";

                }                
                for (var k in json) {                   
                    if (json[k].Ma == this_class) {
                        json[k].HoTen = $("#HoTen").val();
                        json[k].NgaySinh = $("#date").val();
                        json[k].GioiTinh = GioiTinh;
                        json[k].DaLayBang = DaLayBang;
                        json[k].DiaChi = $('#form-select').val();
                        json[k].Lop = $(".content").html();
                        json[k].Khoa = $("#khoa").val();
                        //set lại this_class vì nếu click sửa lần thứ 2 trở đi, nó vẫn lưu cái this_class cũ
                        //=> sửa xong set lại this_class == "", thì nó chỉ sửa this_class mới
                        console.log(this_class);
                        this_class = "";
                        console.log(this_class);
                        break;                     
                    }
                }
                $("tbody tr").remove();
                Load();
            });
        });
    }
    Edit();
    //Thêm
    function Add() {
        $("#Add_sv").click(function () {
            //Cho phép add mã, cần dòng này vì nếu gọi hàm sửa rồi thêm thì trường mã bị set readonly true
            $('#Ma').attr('readonly', false);
            $('#dialog').dialog();
            $('#add_sv').click(function () {

                //check xem người dùng nhập mã có trùng vs mã cũ ko
                var checkMaLap = true;
                for (var k in json) {
                    if (json[k].Ma == $("#Ma").val() || $("#date").val() == "" || $("#khoa").val() == "") {
                        checkMaLap = false;
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
                //Edit();
            });
        });
    }
    Add();
    //Tìm theo địa chỉ
    $("#find_diachi").keypress(function () {
        $("tbody tr").remove();
        for (var k in json) {
            if (json[k].DiaChi == $(this).val()) {
                let check = (json[k].DaLayBang == "true") && "checked";
                $("#add").append(
                    "<tr>" +
                    "<td>" + json[k].Ma + "</td>" +
                    "<td>" + json[k].NgaySinh + "</td>" +
                    "<td>" + json[k].GioiTinh + "</td>" +
                    "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                    "<td>" + json[k].DiaChi + "</td>" +
                    "<td>" + json[k].Lop + "</td>" +
                    "<td>" + json[k].Khoa + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                    + "</tr>"
                );
                //Load(json[k]);
            }
        }
        if ($(this).val() == "") {
            Load();
        }
    });
});
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
                    "<td>" + json[k].NgaySinh + "</td>" +
                    "<td>" + json[k].GioiTinh + "</td>" +
                    "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                    "<td>" + json[k].DiaChi + "</td>" +
                    "<td>" + json[k].Lop + "</td>" +
                    "<td>" + json[k].Khoa + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                    + "</tr>"
                );
            }
            $('tr:even').css('background-color', '#CCE5FF');
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
                    "<td>" + json[k].NgaySinh + "</td>" +
                    "<td>" + json[k].GioiTinh + "</td>" +
                    "<td>" + "<input  " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                    "<td>" + json[k].DiaChi + "</td>" +
                    "<td>" + json[k].Lop + "</td>" +
                    "<td>" + json[k].Khoa + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                    + "</tr>"
                );
                $('tr:even').css('background-color', '#CCE5FF');
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
                "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                + "</tr>"
            );
        }
        $('tr:even').css('background-color', '#CCE5FF');
    }
}