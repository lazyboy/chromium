// Prints backtrace from a line, useful for non-chromium code (e.g. WebCore)
// where you cannot call base::debug::StackTrace().PrintBacktrace();
// You need glibc I think (aka no-windoz).
// Stolen from the web.
#include <execinfo.h>

void foobar_deep_function() {
  printf("++++++++ onAnimationIteration...\n");
  void *array[128];
  size_t size;

  // get void*'s for all entries on the stack
  size = backtrace(array, 128);
  // print out all the frames to stderr
  backtrace_symbols_fd(array, size, 2);
}

