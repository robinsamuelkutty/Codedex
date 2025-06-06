n = int(input("enter a number upto 1 to 150"));
    
def print_num(n):
    if n>=1 and n<=150:
     
        numbers = [str(i) for i in range(1, n + 1)]
        result = ''.join(numbers)
        print(result)

    
print_num(n)

