@echo off
setlocal
set builddir_name=.\tmp-llvm
set GYP_PARALLEL=1
set PATH=.\third_party\llvm-build\Release+Asserts\bin;%PATH%
set BUILDTYPE=Debug
python build\gyp_chromium -D"use_aura=1" -D"component=shared_library" -D"clang=0" -D"remove_webcore_debug_symbols=1" -D"disable_nacl=1" -D"disable_pnacl=1" -D"enable_svg=0" -D"fastbuild=1" -Goutput_dir=out_win
endlocal
