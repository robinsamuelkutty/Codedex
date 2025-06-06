import platform

import interchangearray

print(platform.processor)
interchangearray.inter()

a = int(input("enter 2 numbers"))
b = int(input())
print('first value='+str( a) +  "\nsecond value="+ str(b))
sum= a+b
print("sum="+str(sum));
c= int(input("enter another value"))
avg= (a+b+c)/3
print("average= "+str(avg))
print(type(avg))
 
temp= sum
sum= avg
avg= temp


print("first number "+ str(sum)+ "\nsecond number "+ str(avg))
