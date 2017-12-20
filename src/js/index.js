document.addEventListener('DOMContentLoaded', function() {
  let bell_target = document.getElementById('handBell__sound');
  // let button = document.getElementById('btn');
  let soundData = document.getElementById('sound-file');
  let soundAble = true;

  //音がなるように切り替える
  let switchable = function() {
  	soundAble = true;
  }

  // Web Audio APIの部分を書いていく
  // webkit をつけてクロスブラウザ対応する
  window.AudioContext = window.AudioContext || window.webkitAudioContext;  
  var context = new AudioContext();
  // 音声用のbufferを読み込む
  let getAudioBuffer = function(url, fn) {
  	let req = new XMLHttpRequest();
  	// arraybufferを指定する
  	req.responseType = 'arraybuffer';

  	req.onreadystatechange = function() {
  	  if (req.readyState === 4) {
  	  	if  (req.status === 0 || req.status === 200) {
  	  		// array buffer を audio buffer に変換
  	  		context.decodeAudioData(req.response, function(buffer) {
  	  		  // コールバックを実行
  	  		  fn(buffer);
  	  		})
  	  	}
  	  } 
  	};

  	req.open('GET', url, true);
  	req.send('');
  };

  // 音を再生
  let playSound = function(buffer) {
  	// sourceを作成
  	let source = context.createBufferSource();
  	// bufferをセット
  	source.buffer = buffer;
  	// contextにconnect
  	source.connect(context.destination);
    // 2回鳴っちゃうのとかのロック時間を設定
    // playing = true;
    // window.setTimeout(function(){ playing = false; }, locktime);
  	soundAble = false;
  	setTimeout(switchable, 2000);

    source.loop = false;
  	// 再生
  	source.start();
  }

  // 関数を発動
  window.onload = function() {
  	// 音を読み込む
  	getAudioBuffer(sound, function(buffer) {
  	  // 読み込み完了後にボタンにクリックイベントを登録
  	  bell_target.onclick = function() {
  	  	// 音を再生
  	  	if(soundAble) {
  	  		playSound(buffer);
  	  	}
  	  }

	  //加速度で音を鳴らす部分
	  window.addEventListener("devicemotion", function(event) {
	    let x  = parseFloat(event.acceleration.x);
	    let y  = parseFloat(event.acceleration.y);
	    let z  = parseFloat(event.acceleration.z);

	    // 横に振ったらベルが鳴る
	    if(x > 8 && soundAble) {
	    	playSound(buffer);
	    }
	    // アイフォンの向きをアンドロイドに揃える
	    if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
	      x *= -1;
	      y *= -1;
	      z *= -1;
	    }
	  });
  	});
  }
});