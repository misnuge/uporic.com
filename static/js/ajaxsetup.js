// https://realpython.com/django-and-ajax-form-submissions/
// https://stackoverflow.com/questions/8951810/how-to-parse-json-data-with-jquery-javascript
// This function takes in a cookie name as a parameter and returns the value of that cookie
function getCookie(name) {
    // Initialize the cookie value to null
    var cookieValue = null;
    // Check if there are any cookies and if they are not empty
    if (document.cookie && document.cookie !== '') {
        // Split the cookies into an array
        var cookies = document.cookie.split(';');
        // Loop through the cookies array
        for (var i = 0; i < cookies.length; i++) {
            // Trim any whitespace from the cookie string
            var cookie = cookies[i].trim();
            // Check if the cookie string begins with the name we want
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                // Decode the cookie value and assign it to the cookieValue variable
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                // Exit the loop
                break;
            }
        }
    }
    // Return the cookie value
    return cookieValue;
}

// 이 함수는 쿠키 이름을 매개변수로 받아 해당 쿠키의 값을 반환합니다.
// 쿠키 값을 초기화합니다.
// 쿠키가 있는지, 비어있지 않은지 확인합니다.
// 쿠키를 배열로 분할합니다.
// 쿠키 문자열에서 공백을 제거합니다.
// 쿠키 문자열이 원하는 이름으로 시작하는지 확인합니다.
// 쿠키 값을 디코딩하고 cookieValue 변수에 할당합니다.
// 루프를 종료합니다.
// 쿠키 값을 반환합니다.

var csrftoken = getCookie('csrftoken');

function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

$.ajaxSetup({
    beforeSend: function(xhr, settings) {
        if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
            xhr.setRequestHeader("X-CSRFToken", csrftoken);
        }
    }
});