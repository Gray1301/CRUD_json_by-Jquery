$(document).ready(function () {
    console.log(call_class - 1);
    //bỏ tr đang click lên popup
    for (var k in json) {
        if (json[k].Ma == call_class) {
            //chuyển date thành dạng yyyy/mm/dd mới set value cho input được
            var NgaySinh = json[k].NgaySinh;
            const words = NgaySinh.split('-');
            var AddNgaySinh = words[2] + "-" + words[1] + "-" + words[0];
            $('#date').val(AddNgaySinh);
            $('#HoTen').val(json[k].HoTen);
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
            $(".content").html(json[k].Lop);
            $('#khoa').val(json[k].Khoa);          
        }
    }
   
    $('#edit_sv').click(function () {
        if ($("#HoTen").val() == "" || $("#Ma").val() == "" || $("#Khoa").val() == "") {
            alert("Vui lòng nhập đủ thông tin !!!");
        }
        else {
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
            var NgaySinh = $("#date").val();
            const words = NgaySinh.split('-');
            var EditNgaySinh = words[2] + "-" + words[1] + "-" + words[0];
            for (var k in json) {
                if (json[k].Ma == call_class) {
                    //Không update mã dù người dùng sửa mã:Mã ko cho sửa
                    json[k].HoTen = $("#HoTen").val();
                    json[k].NgaySinh = EditNgaySinh;
                    json[k].GioiTinh = GioiTinh;
                    json[k].DaLayBang = DaLayBang;
                    json[k].DiaChi = $('#form-select').val();
                    json[k].Lop = $(".content").html();
                    json[k].Khoa = $("#khoa").val();
                }
            }
            $("tbody tr").remove();
            Load();
            alert("Đã sửa");
            call_class = 0;
        }
    });
});
$("#reset").click(function () {
    $('#date').val("");
    $('#HoTen').val("");
    $('#Ma').val("");
    $(".content").html("");
    $('#khoa').val("");
    alert("Đã đặt lại !");
});