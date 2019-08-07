function check_(obj) {
    if (confirm("비상 대피 알람을 보내시겠습니까?")) {
        alert("전송완료");
    }
    else {
        if (confirm("해당 문제가 처리 되셨습니까?")) {            
            var temp = {'status': '1'};
            var this_id = (obj.id).substr(1);

            if(obj.id.substr(0,1) == 'R')
            {
                A_JAX('http://172.16.19.243:8000/api/v1/report/' + report_problem_json[this_id]['id'], "PATCH", temp);
            }
            else
            {
                A_JAX('http://172.16.19.243:8000/api/v1/suspicion/' + suspicion_problem_json[this_id]['id'], "PATCH", temp);
            }
            
            $(obj).remove();
        }
       
    }
}