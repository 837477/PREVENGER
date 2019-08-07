function A_JAX(url, type, data_) {
    var ajax_;

    ajax_ = $.ajax({
        type: type,
        url: url,
        data: data_,
        dataType: "json",
        success: function (res) {
        },
        error: function (res) {
        }
    });

    return ajax_;
}
///////////////////////////////////////////////////////////////////////
function change_reason(num)
{
    if(num == -1) return "일반"
    else if(num == 0) return "범죄 발생"
    else if(num == 1) return "기능 오작동"
    else if(num == 2) return "경보 오작동"
    else if(num == 3) return "출입 금지 구역 침입"
    else if(num == 4) return "장시간 움직임 없음"
    else if(num == 5) return "비정삭적인 움직임"
    else if(num == 6) return "기타"
}
//////////////////////////////////////////////////////////////////////////////////////
var report_problem_json;
var report_problem_count;

function show_report_list(leng)
{
    for (i = 0 ; i < leng; i++) {
        var temp = $('#report_problem_').clone().prop('id', 'R'+i);

        temp[0]['children'][0]['children'][1]['children'][0].id = 'report_problem_location_' + i;
        temp[0]['children'][0]['children'][1]['children'][1].id = 'report_problem_comment_' + i;

        temp.css('display', 'block');
        temp.appendTo('#report_');
    }
}

//REPORT 현재 문제 갯수 파악. 후 초기 출력.
var a_jax_main = A_JAX('http://172.16.19.243:8000/api/v1/report/', "GET");
$.when(a_jax_main).done(function () {

        report_problem_json = a_jax_main.responseJSON;
        report_problem_count = a_jax_main.responseJSON.length;
        show_report_list(a_jax_main.responseJSON.length);
    
})

//REPORT 1초 갱신
setInterval(function () {
    var a_jax = A_JAX('http://172.16.19.243:8000/api/v1/report/', "GET");
    $.when(a_jax).done(function () {

        //기존의 개수보다 현재 더 많아졌을 때!
       // if (report_problem_count < a_jax.responseJSON.length) 
        //{
                $('#report_').empty()
                //새롭게 받아오고 카운트 바꿔준다.
                report_problem_json = a_jax.responseJSON;
                report_problem_count = a_jax.responseJSON.length;
                show_report_list(a_jax.responseJSON.length);
        //}

        for (i = 0; i < report_problem_count; i++) {
            temp_location = '#report_problem_location_' + i;
            temp_comment = '#report_problem_comment_' + i;

            $(temp_location).text(a_jax.responseJSON[i]['location']['location']);
            $(temp_comment).text(change_reason(a_jax.responseJSON[i]['reason']));
        }
    })
}, 1500);

///////////////////////////////////////////////////////////////////////////////////////////////
var suspicion_problem_json;
var suspicion_problem_count;

function show_suspicion_list(leng)
{
    for (i = 0 ; i < leng; i++) {
        var temp = $('#suspicion_problem_').clone().prop('id', 'S'+i);

        temp[0]['children'][0]['children'][1]['children'][0].id = 'suspicion_problem_location_' + i;
        temp[0]['children'][0]['children'][1]['children'][1].id = 'suspicion_problem_comment_' + i;

        temp.css('display', 'block');
        temp.appendTo('#suspicion_');
    }
}

//suspicion 현재 문제 갯수 파악. 후 초기 출력.
var a_jax_main = A_JAX('http://172.16.19.243:8000/api/v1/suspicion/', "GET");
$.when(a_jax_main).done(function () {

        suspicion_problem_json = a_jax_main.responseJSON;
        suspicion_problem_count = a_jax_main.responseJSON.length;
        show_suspicion_list(a_jax_main.responseJSON.length);
    
})

//suspicion 1초 갱신
setInterval(function () {
    var a_jax = A_JAX('http://172.16.19.243:8000/api/v1/suspicion/', "GET");
    $.when(a_jax).done(function () {

        //기존의 개수보다 현재 더 많아졌을 때!
       // if (report_problem_count < a_jax.responseJSON.length) 
        //{
                $('#suspicion_').empty()
                //새롭게 받아오고 카운트 바꿔준다.
                suspicion_problem_json = a_jax.responseJSON;
                suspicion_problem_count = a_jax.responseJSON.length;
                show_suspicion_list(a_jax.responseJSON.length);
        //}

        for (i = 0; i < suspicion_problem_count; i++) {
            temp_location2 = '#suspicion_problem_location_' + i;
            temp_comment2 = '#suspicion_problem_comment_' + i;

            $(temp_location2).text(a_jax.responseJSON[i]['location']['location']);
            $(temp_comment2).text(change_reason(a_jax.responseJSON[i]['reason']));
        }
    })
}, 1500);
//////////////////////////////////////////////////////////////////////////////////////
