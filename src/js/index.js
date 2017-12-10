
document.addEventListener('DOMContentLoaded', function() {
  let bell_target = document.getElementById('handBell__sound');
  function sound() {
  	let sound = document.getElementById('sound-file');
  	sound.play();
  	sound.currentTime = 0 ;
  	// スマホに対応するために[currentTime]を認識した場合のみ、処理をする
	if( typeof( sound.currentTime ) != 'undefined' ){
	    sound.currentTime = 0;
	}
  }

  bell_target.addEventListener('click', sound, false);

  //加速度の部分
  window.addEventListener("devicemotion", function(event) {
    let x  = parseFloat(event.acceleration.x);
    let y  = parseFloat(event.acceleration.y);
    let z  = parseFloat(event.acceleration.z);

    // 横に振ったらベルが鳴る
    if(x > 4) {
    	sound();
    }
    // 奥に振ったら色が変わる
    if(y > 10) {
    	if(target.classList.contains('handBell__sectionRed')) {
    		bell_target.classList.add('handBell__sectionBlue');
    		bell_target.classList.remove('handBell__sectionRed');
    	} else if(target.classList.contains('handBell__sectionBlue')){
    		bell_target.classList.add('handBell__sectionRed');
    		bell_target.classList.remove('handBell__sectionBlue');
    	}
    }
    // アイフォンの向きをアンドロイドに揃える
    if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
      x *= -1;
      y *= -1;
      z *= -1;
    }
  });
});