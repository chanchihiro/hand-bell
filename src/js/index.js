
document.addEventListener('DOMContentLoaded', function() {
  let bell_target = document.getElementById('handBell__sound');
  let button = document.getElementById('btn');

  function sound() {
  	let sound = document.getElementById('sound-file');
  	sound.play();
  	sound.currentTime = 0 ;
  	// スマホに対応するために[currentTime]を認識した場合のみ、処理をする
	if( typeof( sound.currentTime ) != 'undefined' ){
	    sound.currentTime = 0;
	}
  }

  function change_color() {
	console.log("反応があります");
	if(bell_target.classList.contains('handBell__sectionRed')) {
	  bell_target.classList.add('handBell__sectionBlue');
	  bell_target.classList.remove('handBell__sectionRed');
	} else if(bell_target.classList.contains('handBell__sectionBlue')){
	  bell_target.classList.add('handBell__sectionRed');
	  bell_target.classList.remove('handBell__sectionBlue');
	}
  }

  bell_target.addEventListener('click', sound, false);
  btn.addEventListener('click', change_color, false);

  //加速度の部分
  window.addEventListener("devicemotion", function(event) {
    let x  = parseFloat(event.acceleration.x);
    let y  = parseFloat(event.acceleration.y);
    let z  = parseFloat(event.acceleration.z);
    document.getElementById('acc-x').textContent = x;
    document.getElementById('acc-y').textContent = y;

    // 横に振ったらベルが鳴る
    if(x > 4) {
    	sound();
    }
    // 奥に振ったら色が変わる
    if(y > 10) {
    	change_color();
    }
    // アイフォンの向きをアンドロイドに揃える
    if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
      x *= -1;
      y *= -1;
      z *= -1;
    }
  });
});