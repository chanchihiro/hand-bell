

document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM読み込んだよ');
  let target = document.getElementById('handBell__sound');
  console.log(target);
  target.addEventListener('click', sound, false);
  function sound() {
  	let sound = document.getElementById('sound-file');
  	sound.play();
  	sound.currentTime = 0 ;
  	// スマホに対応するために[currentTime]を認識した場合のみ、処理をする
	if( typeof( sound.currentTime ) != 'undefined' )
	  {
	    sound.currentTime = 0;
	  }
	}
});

