(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
  var bell_target = document.getElementById('handBell__sound');
  // let button = document.getElementById('btn');
  var soundData = document.getElementById('sound-file');
  var soundAble = true;

  //音がなるように切り替える
  var switchable = function switchable() {
    soundAble = true;
  };

  //audioで音を鳴らすのに使ってた
  /*
  function sound() {
  	soundData.play();
  	soundData.currentTime = 0 ;
  	// スマホに対応するために[currentTime]を認識した場合のみ、処理をする
  if( typeof( sound.currentTime ) != 'undefined' ){
     soundData.currentTime = 0;
  }
  }
  */

  //色と音を変える時に使っていたやつ
  /*
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
  
    // 発動する
    // bell_target.addEventListener('click', sound, false);
    // btn.addEventListener('click', change_color_sound, false);
  */

  // Web Audio APIの部分を書いていく
  // webkit をつけてクロスブラウザ対応する
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  var context = new AudioContext();
  // 音声用のbufferを読み込む
  var getAudioBuffer = function getAudioBuffer(url, fn) {
    var req = new XMLHttpRequest();
    // arraybufferを指定する
    req.responseType = 'arraybuffer';

    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 0 || req.status === 200) {
          // array buffer を audio buffer に変換
          context.decodeAudioData(req.response, function (buffer) {
            // コールバックを実行
            fn(buffer);
          });
        }
      }
    };

    req.open('GET', url, true);
    req.send('');
  };

  // 音を再生
  var playSound = function playSound(buffer) {
    // sourceを作成
    var source = context.createBufferSource();
    // bufferをセット
    source.buffer = buffer;
    // contextにconnect
    source.connect(context.destination);
    // 2回鳴っちゃうのとかのロック時間を設定
    // playing = true;
    // window.setTimeout(function(){ playing = false; }, locktime);
    source.loop = false;
    // 再生
    source.start(0);
  };

  // 関数を発動
  window.onload = function () {
    // 音を読み込む
    getAudioBuffer('../se/bell.mp3', function (buffer) {
      // 読み込み完了後にボタンにクリックイベントを登録
      bell_target.onclick = function () {
        // 音を再生
        if (soundAble) {
          playSound(buffer);
          soundAble = false;
          setTimeout(switchable, 1000);
        }
      };
    });
  };

  //加速度で音を鳴らす部分
  window.addEventListener("devicemotion", function (event) {
    var x = parseFloat(event.acceleration.x);
    var y = parseFloat(event.acceleration.y);
    var z = parseFloat(event.acceleration.z);
    document.getElementById('acc-x').textContent = x;
    document.getElementById('acc-y').textContent = y;

    // 横に振ったらベルが鳴る
    if (x > 14) {
      if (soundAble) {
        getAudioBuffer('../se/bell.mp3', function (buffer) {
          playSound(buffer);
          soundAble = false;
          setTimeout(switchable, 1000);
        });
      }
    }
    // アイフォンの向きをアンドロイドに揃える
    if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
      x *= 1;
      y *= 1;
      z *= 1;
    }
  });
});

},{}]},{},[1]);
