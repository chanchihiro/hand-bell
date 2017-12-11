
document.addEventListener('DOMContentLoaded', function() {
  let bell_target = document.getElementById('handBell__sound');
  // let button = document.getElementById('btn');
  let soundData = document.getElementById('sound-file');

  function sound() {
  	soundData.play();
  	soundData.currentTime = 0 ;
  	// スマホに対応するために[currentTime]を認識した場合のみ、処理をする
	if( typeof( sound.currentTime ) != 'undefined' ){
	    soundData.currentTime = 0;
	}
  }

  function change_color_sound() {
	if(bell_target.classList.contains('handBell__sectionRed')) {
	  bell_target.classList.add('handBell__sectionBlue');
	  bell_target.classList.remove('handBell__sectionRed');
	  soundData = document.getElementById('sound-file2');
	} else if(bell_target.classList.contains('handBell__sectionBlue')){
	  bell_target.classList.add('handBell__sectionYellow');
	  bell_target.classList.remove('handBell__sectionBlue');
	  soundData = document.getElementById('sound-file');
	} else if(bell_target.classList.contains('handBell__sectionYellow')){
	  bell_target.classList.add('handBell__sectionBlack');
	  bell_target.classList.remove('handBell__sectionYellow');
	  soundData = document.getElementById('sound-file2');
	} else if(bell_target.classList.contains('handBell__sectionBlack')){
	  bell_target.classList.add('handBell__sectionWhite');
	  bell_target.classList.remove('handBell__sectionBlack');
	  soundData = document.getElementById('sound-file');
	} else if(bell_target.classList.contains('handBell__sectionWhite')){
	  bell_target.classList.add('handBell__sectionPurple');
	  bell_target.classList.remove('handBell__sectionWhite');
	  soundData = document.getElementById('sound-file2');
	} else if(bell_target.classList.contains('handBell__sectionPurple')){
	  bell_target.classList.add('handBell__sectionGreen');
	  bell_target.classList.remove('handBell__sectionPurple');
	  soundData = document.getElementById('sound-file');
	} else if(bell_target.classList.contains('handBell__sectionGreen')){
	  bell_target.classList.add('handBell__sectionAzure');
	  bell_target.classList.remove('handBell__sectionGreen');
	  soundData = document.getElementById('sound-file2');
	} else if(bell_target.classList.contains('handBell__sectionAzure')){
	  bell_target.classList.add('handBell__sectionRed');
	  bell_target.classList.remove('handBell__sectionAzure');
	  soundData = document.getElementById('sound-file');
	}
  }

  bell_target.addEventListener('click', sound, false);
  // btn.addEventListener('click', change_color_sound, false);

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
    // アイフォンの向きをアンドロイドに揃える
    if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
      x *= -1;
      y *= -1;
      z *= -1;
    }
  });
});