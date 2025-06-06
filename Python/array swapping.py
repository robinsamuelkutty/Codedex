limit = int(input("Enter the array limit: "))
array1 = []
array2 = []
print("Enter the values of Array 1:")
for i in range(limit):
    array1.append(int(input()))
print("Enter the values of Array 2:")
for i in range(limit):
    array2.append(int(input()))
for i in range(limit):
    temp = array1[i]
    array1[i] = array2[i]
    array2[i] = temp
print("Array after swapping:")
print("Array 1:", end="")
for i in range(limit):
    print(" {}\t".format(array1[i]), end="")
print("\nArray 2:", end="")
for i in range(limit):
    print(" {}\t".format(array2[i]), end="")
