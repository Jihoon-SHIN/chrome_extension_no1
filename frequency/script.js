function matching(user){
  chrome.tabs.executeScript({
    code:'document.querySelector("body").innerText'
  }, function(result){
      //위의 코드가 실행된 후에 이 함수를 호출해주세요
      var bodyText = result[0];
      var bodyNum = bodyText.split(' ').length;
      var myNum = bodyText.match(new RegExp('\\b('+user+')\\b', 'gi')).length;
      var per = myNum /bodyNum *100;
      per= per.toFixed(2);
      document.querySelector("#result").innerText = myNum +'/' + bodyNum + '(' +per+'%)';
  });
}


//소토리지에서 저장된 값 가져오기
chrome.storage.sync.get(function(data){
  document.querySelector('#user').value = data.userWords;
  matching(data.userWords);
});


document.querySelector('#user').addEventListener('change', function(){
  var user = document.querySelector('#user').value;
  //Store in the chrome storage.
  chrome.storage.sync.set({
    userWords:user
  });
  matching(user);
});
