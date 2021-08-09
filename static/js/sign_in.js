(() => {
    const idInput = document.querySelector('#id');
    const pwInput = document.querySelector('#pw');
    const goMainBtn = document.querySelector('#mainBtn');
    const blank_patten = /[\s]/g;

    function idCheck() {

      if (pwInput.value === "") {
        alert('정보를 입력해 주십시오');
        return;
      } else if (blank_patten.test(idInput.value) == true) {
        alert('아이디에 공백이 입력되었습니다.');
        return;
      }
    }

    function pwCheck() {
      const pwRegular = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

      if ( pwInput.value === "" ) {
        alert('정보를 입력해 주십시오');
        return;
      } else if (blank_patten.test(pwInput.value) == true) {
        alert('비밀번호에 공백이 입력되었습니다.');
        return;
      } else if ( !pwRegular.test(pw.value) ) {
        alert('숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력');
        return;
      }
    }

    function sendInfo() {

      fetch("/sign_in/send_info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: idInput.value,
          pw: pwInput.value,
        }),
      })
      .then((response) => response.json())
      .then((data) => {
        location.href = '/login';
       })
       .catch((err) => {
        alert(err.message);
        console.log(err);
       })
    }
          


    window.addEventListener('submit', function (e) {
      e.preventDefault();
      idCheck();
      pwCheck();
      sendInfo();
    });
    //메인으로 이동
    goMainBtn.addEventListener('click', function () {
      window.location.href = '/';
    });

  })()