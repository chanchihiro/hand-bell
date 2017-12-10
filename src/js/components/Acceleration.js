window.addEventListener("devicemotion", function(event) {
  var x  = parseFloat(event.acceleration.x);
  var y  = parseFloat(event.acceleration.y);
  var z  = parseFloat(event.acceleration.z);

  // アイフォンの向きをアンドロイドに揃える
  if (userAgent.indexOf("iPhone") > 0 || userAgent.indexOf("iPad") > 0 || userAgent.indexOf("iPod") > 0) {
    x *= -1;
    y *= -1;
    z *= -1;
  }
}