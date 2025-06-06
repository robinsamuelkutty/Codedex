def scope():
    def local():
        
        test="local test"
    def non_local():
        nonlocal test
        test="non local test"
    def whole():
        global test
        test="global test"

    test="default test"

    local()
    print("test now="+test)
    non_local()
    print("test now="+test)
    whole()
    print("test now="+test)



scope()
print(test)

