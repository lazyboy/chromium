window.addEventListener("message", function(e) {
  var img;

  console.log("Webview received " + e.data.size + " bytes");
  img = document.createElement("img");
  img.src = URL.createObjectURL(e.data);
  document.body.appendChild(img);
});
