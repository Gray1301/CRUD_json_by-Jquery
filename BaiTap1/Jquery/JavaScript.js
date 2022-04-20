﻿$(document).ready(function () {
    $('tr:even').css('background-color', 'white');
    //$("td:nth-child(3)").css('color', 'blue');
    $("td:nth-child(5)").css('text-align', 'center');
    function Load() {
        for (var k in json) {
            let check = (json[k].DaLayBang == "true") && "checked";
            $("#add").append(
                "<tr>" +
                "<td>" + json[k].Ma + "</td>" +
                "<td>" + json[k].NgaySinh + "</td>" +
                "<td>" + json[k].GioiTinh + "</td>" +
                "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + json[k].DaLayBang + "' />    </td>" +
                "<td>" + json[k].DiaChi + "</td>" +
                "<td>" + json[k].NguyenVong + "</td>" +
                "<td>" + json[k].Khoa + "</td>" +
                "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                + "</tr>"
            );
        }
        $('tr:even').css('background-color', '#CCE5FF');
    }
    // $("#id").Load(Load());
    Load();
    //set phân trang
    //let options = {
    //    numberPerPage: 4, //Cantidad de datos por pagina
    //    goBar: true, //Barra donde puedes digitar el numero de la pagina al que quiere ir
    //    pageCounter: true, //Contador de paginas, en cual estas, de cuantas paginas
    //};

    //let filterOptions = {
    //    el: '#searchBox' //Caja de texto para filtrar, puede ser una clase o un ID
    //};

    //paginate.init('.myTable', options, filterOptions);
    //Lọc theo giới tính   

    //Xóa
    $("td:nth-child(8)").click(function () {
        // lấy ra class của cái td đang click
        var this_class = $(this).attr('class');
        for (var i = 0; i < json.length; i++) {
            if (json[i].Ma == this_class) {
                json.splice(i, 1);
            }
        }
        console.log(json);
        $("#id").Load(Load());
    });

    //Gọi dialog lên để sửa
    $("td:last-child").click(function () {
        // lấy ra class của cái td đang click,class set theo ma nen nó là duy nhất
        var this_class = $(this).attr('class');
        $('#dialog').dialog();
        //bỏ thông tin của tr vừa click lên dialog
        for (var k in json) {
            if (json[k].Ma == this_class) {
                $('#date').val(json[k].NgaySinh);
                $('#Ma').val(json[k].Ma);

                if (json[k].GioiTinh == "Nam") {
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
                else {
                    $("#DaLayBang").prop("checked", false);
                }
                $(".content").html(json[k].NguyenVong);

                $('#khoa').val(json[k].Khoa);
            }
        }
        console.log($(".content").html());
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

            json.fill("ABC", this_class - 1, this_class);
            json[this_class - 1] = { "Ma": $("#Ma").val(), "NgaySinh": $("#date").val(), "GioiTinh": GioiTinh, "DaLayBang": DaLayBang, "DiaChi": $('#form-select').val(), "NguyenVong": $(".content").html(), "Khoa": $("#khoa").val() };
            console.log(json);
            Load();
        });
    });
    //Thêm
    $("#Add_sv").click(function () {
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
                json.push({ "Ma": $("#Ma").val(), "NgaySinh": $("#date").val(), "GioiTinh": GioiTinh, "DaLayBang": DaLayBang, "DiaChi": $('#form-select').val(), "NguyenVong": $(".content").html(), "Khoa": $("#khoa").val() });
                console.log(json);
                let check = ($("#DaLayBang") == true) && true;
                $("#add").append(
                    "<tr>" +
                    "<td>" + $("#Ma").val() + "</td>" +
                    "<td>" + $("#date").val() + "</td>" +
                    "<td>" + GioiTinh + "</td>" +
                    "<td>" + "<input " + check + " type='checkbox' name='checkbox' value= '" + DaLayBang + "' />    </td>" +
                    "<td>" + $('#form-select').val() + "</td>" +
                    "<td>" + $(".content").html() + "</td>" +
                    "<td>" + $("#khoa").val() + "</td>" +
                    "<td" + " class='" + $("#Ma").val() + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                    "<td" + " class='" + $("#Ma").val() + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                    + "</tr>"
                );
            }
        });
    });
    //Tìm theo địa chỉ
    $("#find_diachi").keypress(function () {
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
                    "<td>" + json[k].NguyenVong + "</td>" +
                    "<td>" + json[k].Khoa + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/dauX.PNG' width='10px' height='10px'/> " + "</td>" +
                    "<td" + " class='" + json[k].Ma + "'>" + "<img src = '../images/folder.PNG' width='10px' height='10px'/>" + "</td>"
                    + "</tr>"
                );
                console.log(json[k]);
            }
        }
    });
});
//lọc theo giới tính
function Gender() {
    if ($("#gender").val() == "Nam") {
        for (var k in json) {
            if (json[k].GioiTinh == "Nam") {
                console.log(json[k]);
            }
        }
    }
    else {
        for (var k in json) {
            if (json[k].GioiTinh == "Nữ") {
                console.log(json[k]);
            }
        }
    }

}