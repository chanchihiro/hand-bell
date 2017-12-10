(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

document.addEventListener('DOMContentLoaded', function () {
		var bell_target = document.getElementById('handBell__sound');
		var button = document.getElementById('btn');
		var soundData = document.getElementById('sound-file');

		function sound() {
				soundData.play();
				soundData.currentTime = 0;
				// スマホに対応するために[currentTime]を認識した場合のみ、処理をする
				if (typeof sound.currentTime != 'undefined') {
						soundData.currentTime = 0;
				}
		}

		function change_color_sound() {
				if (bell_target.classList.contains('handBell__sectionRed')) {
						bell_target.classList.add('handBell__sectionBlue');
						bell_target.classList.remove('handBell__sectionRed');
						soundData = document.getElementById('sound-file2');
				} else if (bell_target.classList.contains('handBell__sectionBlue')) {
						bell_target.classList.add('handBell__sectionYellow');
						bell_target.classList.remove('handBell__sectionBlue');
						soundData = document.getElementById('sound-file');
				} else if (bell_target.classList.contains('handBell__sectionYellow')) {
						bell_target.classList.add('handBell__sectionBlack');
						bell_target.classList.remove('handBell__sectionYellow');
						soundData = document.getElementById('sound-file2');
				} else if (bell_target.classList.contains('handBell__sectionBlack')) {
						bell_target.classList.add('handBell__sectionWhite');
						bell_target.classList.remove('handBell__sectionBlack');
						soundData = document.getElementById('sound-file');
				} else if (bell_target.classList.contains('handBell__sectionWhite')) {
						bell_target.classList.add('handBell__sectionPurple');
						bell_target.classList.remove('handBell__sectionWhite');
						soundData = document.getElementById('sound-file2');
				} else if (bell_target.classList.contains('handBell__sectionPurple')) {
						bell_target.classList.add('handBell__sectionGreen');
						bell_target.classList.remove('handBell__sectionPurple');
						soundData = document.getElementById('sound-file');
				} else if (bell_target.classList.contains('handBell__sectionGreen')) {
						bell_target.classList.add('handBell__sectionAzure');
						bell_target.classList.remove('handBell__sectionGreen');
						soundData = document.getElementById('sound-file2');
				} else if (bell_target.classList.contains('handBell__sectionAzure')) {
						bell_target.classList.add('handBell__sectionRed');
						bell_target.classList.remove('handBell__sectionAzure');
						soundData = document.getElementById('sound-file');
				}
		}

		bell_target.addEventListener('click', sound, false);
		btn.addEventListener('click', change_color_sound, false);

		//加速度の部分
		window.addEventListener("devicemotion", function (event) {
				var x = parseFloat(event.acceleration.x);
				var y = parseFloat(event.acceleration.y);
				var z = parseFloat(event.acceleration.z);
				document.getElementById('acc-x').textContent = x;
				document.getElementById('acc-y').textContent = y;

				// 横に振ったらベルが鳴る
				if (x > 4) {
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

},{}]},{},[1]);
