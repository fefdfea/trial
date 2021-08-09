(() => {
  const main = document.querySelector('#main');
  const input = document.querySelectorAll('.input');
  const pw = document.querySelector('#pw');
  const email = document.querySelector('#email');
  const name = document.querySelector('#name');
  const blank_patten = /[\s]/g;

  function formCheck(e) {
    e.preventDefault();
    for (let i = 0; i < input.length; i++) {
      if (input[i].value === "") {
        alert('정보에 공백이 존재합니다.')
        e.preventDefault();
        return;
      }
    }
    //email
    emailCheck();
    //pw
    pwChek();
    //name
    nameCheck();
    sendInfo();

  }

  function sendInfo() {

    fetch("/sign_up/signUp_info", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: email.value,
        pw: pw.value,
        name: name.value,
      }),
    })
    .then((response) => response.json())
    .then((data) => {
      if( data.status === false ){
        alert( data.message );
      }else{
        location.href = '/';
      }

     })
  }

  function emailCheck() {
    if (blank_patten.test(email.value)) {
      alert('이메일에 공백칸이 존재합니다');
      return;
    }
  }

  function pwChek() {
    const pwRegular = /(?=.*\d{1,50})(?=.*[~`!@#$%\^&*()-+=]{1,50})(?=.*[a-zA-Z]{2,50}).{8,50}$/;

    if (blank_patten.test(pw.value)) {
      alert('비밀번호에 공백칸이 존재합니다');
      return;
    } else if (!pwRegular.test(pw.value)) {
      alert('숫자, 특문 각 1회 이상, 영문은 2개 이상 사용하여 8자리 이상 입력');
      return;
    }
  }


  function nameCheck() {
    if (blank_patten.test(name.value)) {
      alert('이름칸에 공백칸이 존재합니다');
      return;
    }
  }

  window.addEventListener('submit', function (e) {
    formCheck(e);
  });

  //메인으로 이동
  main.addEventListener('click', function () {
    window.location.href = '/';
  });

})()