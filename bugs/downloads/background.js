chrome.downloads.onCreated.addListener(function(download) {
  console.log('onCreated');
  chrome.downloads.cancel(download.id);
});
chrome.downloads.onChanged.addListener(function(download) {
  console.log('onChanged');
  chrome.downloads.cancel(download.id);
});
chrome.downloads.onDeterminingFilename.addListener(function(download, suggest) {
  console.log('onDeterminingFilename');
  chrome.downloads.cancel(download.id);
});
console.log('Extension loaded');
