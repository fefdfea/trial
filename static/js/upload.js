(() => {
  const title = document.querySelector('#title');
  const TextArea = document.querySelector('#desc');
  const editInfo = document.querySelector('.editInfo');
  const editInfo2 = document.querySelector('.editInfo2');


  //editInfo value체크
  title.onkeyup = function(e){

    switch(e.keyCode){
      case 48:
        title.value = title.value =title.value.replace(/\)/g,"&#41");
      case 55:
        title.value = title.value.replace(/&/g,"&amp;");
      case 57:
        title.value = title.value.replace(/\(/g,"&#40;");
      case 188:
        title.value = title.value.replace(/</g,"&lt;");
      case 190:
        title.value = title.value.replace(/>/g,"&gt;");
      case 191:
        title.value = title.value.replace(/\//g,"&#x2F;");
      case 222:
        title.value = title.value.replace(/"|'/g,"&quot;");
    }
  }
// editInfo2 value체크
  TextArea.onkeyup = function(e){

    switch(e.keyCode){
      case 48:
        TextArea.value = TextArea.value.replace(/\)/g,"&#41");
      case 55:
        TextArea.value = TextArea.value.replace(/&/g,"&amp;");
      case 57:
        TextArea.value = TextArea.value.replace(/\(/g,"&#40;");
      case 188:
        TextArea.value = TextArea.value.replace(/</g,"&lt;");
      case 190:
        TextArea.value = TextArea.value.replace(/>/g,"&gt;");
      case 191:
        TextArea.value = TextArea.value.replace(/\//g,"&#x2F;");
      case 222:
        TextArea.value = TextArea.value.replace(/"|'/g,"&quot;");
    }
  }
  //submit시 form태그 전체 검사
  window.addEventListener('submit',function(e){
    const video = document.querySelector('.imgContainer video');
    if( title.value === "" || TextArea.value === "" ) {
      e.preventDefault();
      alert('정보가 입력되지 않았습니다');
    }

    if( video === null ){
      e.preventDefault();
      alert('비디오를 업로드 해주십시오');
      return
    }

    if( !regex.test(title.value) ){
      e.preventDefault();
      editInfo.style.display = 'block';
      editInfo.classList.add('opacityUp');
      return
    }else{
      editInfo.style.display = 'none';
      editInfo.classList.remove('opacityUp');
    }

    if( !regex.test(TextArea.value) ){
      e.preventDefault();
      editInfo2.style.display = 'block';
      editInfo2.classList.add('opacityUp');
      return
    }else{
      editInfo2.style.display = 'none';
      editInfo2.classList.remove('opacityUp');
    }
  });

})()