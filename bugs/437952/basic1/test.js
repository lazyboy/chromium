/*
chrome.contextMenus.create ({"title": "Test", "onclick": test});
chrome.contextMenus.create ({"title": "Test2", "onclick": test});
function test (info, tab) { alert ("hello"); }
*/
    var id = chrome.contextMenus.create({
        type: 'normal',
        title: 'Foo',
        contexts: ['all'],
        onclick: function(){ console.log('foo!'); }
    }, function(){});
    window.console.log('create id(foo): ' + id);
