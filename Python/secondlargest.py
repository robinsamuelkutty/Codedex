n=int(input("enter the limit of the arrays:"))
val=[];

print("enter the elements for the array");
for i in range(0,n):
    val.append(int(input()))

for i in range(n-1):
    for j in range(i+1, n):
        if val[i] > val[j]:
            temp = val[i]
            val[i] = val[j]
            val[j] = temp


print(val[-2]) 
