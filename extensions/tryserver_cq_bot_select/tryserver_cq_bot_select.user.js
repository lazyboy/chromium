// ==UserScript==
// @match https://chromiumcodereview.appspot.com/*
// ==/UserScript==
var LOG = function(var_args) {
  window.console.log.apply(window.console, arguments);
};

var BOTS_TO_CLICK = [];
var initBotsToClick = function() {
  if (BOTS_TO_CLICK.length) {
  LOG('Already initialized bots to click');
  return;
  }
  // unused.
  var ALL_CHROMIUM_BOTS = [
    'android_aosp',
    'android_chromium_gn_compile_dbg',
    'android_chromium_gn_compile_rel',
    'android_clang_dbg',
    'android_dbg',
    'android_fyi_dbg',
    'android_rel',
    'android_x86_dbg',
    'blink_android_compile_dbg',
    'blink_android_compile_rel',
    'blink_presubmit',
    'chromium_presubmit',
    'ios_dbg_simulator',
    'ios_rel_device',
    'ios_rel_device_ninja',
    'linux',
    'linux_arm_cross_compile',
    'linux_arm_tester',
    'linux_asan',
    'linux_browser_asan',
    'linux_chromeos',
    'linux_chromeos_asan',
    'linux_chromeos_browser_asan',
    'linux_chromeos_clang',
    'linux_chromeos_valgrind',
    'linux_chromium_chromeos_clang_dbg',
    'linux_chromium_chromeos_clang_rel',
    'linux_chromium_chromeos_dbg',
    'linux_chromium_chromeos_rel',
    'linux_chromium_clang_dbg',
    'linux_chromium_clang_rel',
    'linux_chromium_compile_dbg',
    'linux_chromium_compile_rel',
    'linux_chromium_dbg',
    'linux_chromium_gn_dbg',
    'linux_chromium_gn_rel',
    'linux_chromium_rel',
    'linux_chromium_trusty32_dbg',
    'linux_chromium_trusty32_rel',
    'linux_chromium_trusty_dbg',
    'linux_chromium_trusty_rel',
    'linux_clang',
    'linux_clang_tsan',
    'linux_ecs_ozone',
    'linux_futura',
    'linux_layout',
    'linux_layout_asan',
    'linux_layout_rel',
    'linux_layout_rel_32',
    'linux_nacl_sdk',
    'linux_nacl_sdk_build',
    'linux_redux',
    'linux_rel',
    'linux_rel_alt',
    'linux_rel_naclmore',
    'linux_rel_precise32',
    'linux_tsan',
    'linux_valgrind',
    'mac',
    'mac_asan',
    'mac_asan_64',
    'mac_chromium_compile_dbg',
    'mac_chromium_compile_rel',
    'mac_chromium_dbg',
    'mac_chromium_rel',
    'mac_nacl_sdk',
    'mac_nacl_sdk_alt',
    'mac_nacl_sdk_build',
    'mac_rel',
    'mac_rel_naclmore',
    'mac_valgrind',
    'mac_valgrind_alt',
    'mac_x64_rel',
    'mac_xcodebuild',
    'tools_build_presubmit',
    'win',
    'win8_aura',
    'win_chromium_compile_dbg',
    'win_chromium_compile_rel',
    'win_chromium_dbg',
    'win_chromium_rel',
    'win_chromium_x64_dbg',
    'win_chromium_x64_rel',
    'win_drmemory',
    'win_nacl_sdk',
    'win_nacl_sdk_build',
    'win_rel',
    'win_rel_naclmore',
    'win_tsan',
    'win_x64_rel'
  ];

  ////removed triggerred tests
  //gpu bots
  var ALL_CQ_CHROMIUM_BOTS = [
    'win_chromium_x64_rel',
    'mac_chromium_rel',
    'ios_rel_device',
    'win_chromium_rel',
    'android_chromium_gn_compile_rel',
    'mac_chromium_compile_dbg',
    ////'win_gpu_triggered_tests',
    'win_chromium_compile_dbg',
    ////'android_dbg_triggered_tests',
    'linux_chromium_chromeos_rel',
    'linux_chromium_rel',
    //'win_gpu',
    'android_aosp',
    'ios_dbg_simulator',
    ////'linux_gpu_triggered_tests',
    'linux_chromium_chromeos_clang_dbg',
    'linux_chromium_clang_dbg',
    'ios_rel_device_ninja',
    ////'mac_gpu_triggered_tests',
    ////'mac_gpu_retina_triggered_tests',
    'android_dbg',
    //'linux_gpu',
    //'mac_gpu',
    'android_clang_dbg',
    'linux_chromium_gn_rel',
    'chromium_presubmit'
  ];

  // cb_tryserver.chromium.gpu_linux_gpu
  var botDivIDs = [];
  for (var i = 0; i < ALL_CQ_CHROMIUM_BOTS.length; ++i) {
    botDivIDs.push('cb_tryserver.chromium_' + ALL_CQ_CHROMIUM_BOTS[i]);
  }
  botDivIDs.push('cb_tryserver.chromium.gpu_linux_gpu');
  botDivIDs.push('cb_tryserver.chromium.gpu_mac_gpu');
  botDivIDs.push('cb_tryserver.chromium.gpu_win_gpu');
  LOG('total bot checkboxes to click', botDivIDs.length);
  BOTS_TO_CLICK = botDivIDs;
};

var onSelectCQBots = function(e) {
  e.preventDefault();
  for (var i = 0; i < BOTS_TO_CLICK.length; ++i) {
    var checkBox = document.getElementById(BOTS_TO_CLICK[i]);
    if (!checkBox) {
      LOG('failed to find', BOTS_TO_CLICK[i]);
      continue;
    }
    checkBox.click();
  }
};

var init = function() {
  LOG('initialize CQ bot checkbox script');
  var trybotPopupDiv = document.getElementById('trybot-popup');
  if (!trybotPopupDiv) { LOG('trybot-popup div not found'); return; }
  
  var button = document.createElement('button');
  button.innerText = 'Select CQ bots';
  button.onclick = onSelectCQBots;
  
  var trybotPopupBuildersDivs =
      trybotPopupDiv.getElementsByClassName('trybot-popup-builders');
  
  var div = null;
  for (var i = 0; div = trybotPopupBuildersDivs[i]; ++i) {
    var candidateDiv = div.firstChild, j = 0;
    for (j = 0; j < 10; ++j, candidateDiv = candidateDiv.nextSibling) {
      if (candidateDiv.innerText == 'tryserver.chromium') {
        LOG('found tryserver.chromium div');
        break;
      }
    }
    if (j < 10) break;
  }
  if (!div) {
    LOG('trysever.chromium div not found');
    return;
  } 
  div.nextElementSibling.appendChild(button);

  // Generate bots to click.
  initBotsToClick();
};

//window.onload = init;
window.console.log('Loaded CQ bot checkbox script');
init();
