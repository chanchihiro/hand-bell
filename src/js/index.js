
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM読み込んだよ');
  let target = document.getElementById('handBell__sound');
  target.addEventListener('click', sound, false);
  function sound() {
  	let sound = document.getElementById('sound-file');
  	sound.play();
  	sound.currentTime = 0 ;
  	// スマホに対応するために[currentTime]を認識した場合のみ、処理をする
	if( typeof( sound.currentTime ) != 'undefined' ){
	    sound.currentTime = 0;
	}
  }

  //加速度の部分
  window.addEventListener("devicemotion", function(event) {
    let x  = parseFloat(event.acceleration.x);
    let y  = parseFloat(event.acceleration.y);
    let z  = parseFloat(event.acceleration.z);
    let moji = document.getElementById('acc-x');
    moji.textContent = x;

    if(x > 1) {
    	sound();
    }

    // アイフォンの向きをアンドロイドに揃える
    if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
      x *= -1;
      y *= -1;
      z *= -1;
    }
  });
});