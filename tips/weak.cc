// Checking PostTask + WeakPtr.

class MyClass {
 public:
  MyClass() : ALLOW_THIS_IN_INITIALIZER_LIST(weak_ptr_factory_(this)) {
    printf("MyClass::MyClass\n");
  }
  ~MyClass() { printf("MyClass::~MyClass\n"); }

  void Foo(int value) { printf("Foo called, value: %d\n", value); }

  void TestMe() {
    // 1. This makes the delete run earlier than calling Foo().
    // Foo() not called.
    printf("Scheduling early delete\n");
    MessageLoop::current()->DeleteSoon(FROM_HERE, this);

    int param = 10;
    MessageLoop::current()->PostTask(
        FROM_HERE,
        base::Bind(&MyClass::Foo,
                   weak_ptr_factory_.GetWeakPtr(),
                   param));

    // 2. Delete immediately.
    // Foo() not called.
    //printf("Deleting self\n");
    //delete this;

    // 3. This makes the delete come later.
    // Foo() is called.
    //printf("Scheduling delete\n");
    //MessageLoop::current()->DeleteSoon(FROM_HERE, this);
  }

  base::WeakPtrFactory<MyClass> weak_ptr_factory_;
};
