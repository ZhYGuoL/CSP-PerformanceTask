import sys

def rightTurn(p1, p2, p3):
	return ((p2[0] - p1[0])*(p3[1] - p1[1])) - ((p2[1] - p1[1])*(p3[0] - p1[0])) <= 0

def slope(p1, p2):
	if p1[0] == p2[0]:
		return float('inf')
	else:
		return (p1[1]-p2[1])/(p1[0]-p2[0])


print('input number of coordinates and also the coordinates themselves (minimum 3)')
print('Ex:', '\n')
print('4')
print('1 2')
print('0 2')
print('-1 0')
print('0 3', '\n')


coords = [[int(x) for x in sys.stdin.readline().strip().split()] for _ in range(int(sys.stdin.readline().strip()))]

coords.sort(key=lambda x:[x[0],x[1]])

hull = [coords.pop(0)]

coords.sort(key=lambda p: (slope(p, hull[0]), -p[1], p[0]))

for point in coords:
	hull.append(point)
	while len(hull) > 2 and rightTurn(hull[-3], hull[-2], hull[-1]):
		hull.pop(-2)

print(hull)