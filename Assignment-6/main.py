import numpy as np
import matplotlib.pyplot as plt
from matplotlib.patches import Polygon
from math import cos, sin, pi

class Quadrilateral:
    def __init__(self, blX, blY, brX, brY, tlX, tlY, trX, trY):
        self.points = ((blX,blY),(brX,brY),(trX,trY),(tlX,tlY))
    def parents(self):
        return [parent.__name__ for parent in type(self).__bases__]
    def ancestors(self):
        return [base.__name__ for base in type(self).__mro__[1:]]
    def show(self):
        pts = np.array(self.points)
        max_value=max(max(self.points))
        p = Polygon(pts, closed=False)
        # Get (or create) the current axes
        ax = plt.gca()
        # Create a patch (filled in shape) using our Polygon
        ax.add_patch(p)
        # Define maximum x and y on the graph to be a bit bigger than needed
        ax.set_xlim(0,(max_value+2))
        ax.set_ylim(0,(max_value+2))
        # Get the current figure (the actual window)
        fig = plt.gcf()
        # Set the size of the figure in inchest (to make sure we have square ratio)
        fig.set_size_inches(4,4)
        # Set the title of the plot
        plt.title(type(self).__name__)
        # Show the plot
        plt.show()

class Kite(Quadrilateral):
    # Center X, Center Y, Horizontal Length (from center),
    # Top Vertical Length (from center),
    # Bottom Vertical Length (from center)
    def __init__(self, cx, cy, hl, tvl, bvl):
        # I really don't like this one...
        Quadrilateral.__init__(self, cx-hl, cy, cx, cy-bvl, cx, cy+tvl, cx+hl, cy)

class Trapezoid(Quadrilateral):
    def __init__(self, blX, brX, bY, tlX, trX, tY):
        Quadrilateral.__init__(self, blX, bY, brX, bY, tlX, tY, trX, tY)

class Parallelogram(Trapezoid):
    # angle should be given in degrees (because radians are lame)
    def __init__(self, length1, length2, angle):
        # Convert angle to radians for math operations
        angle = angle * (pi/180)
        # x component of angled lines
        length2_x = length2 * cos(angle)
        # y component of angled lines
        length2_y = length2 * sin(angle)
        # Create the parallelogram based on the trapezoid constructor
        Trapezoid.__init__(self, 0, length1, 0, length2_x, length2_x+length1, length2_y)

class IsoscelesTrapezoid(Trapezoid):
    # Lengths of each side and the distance between them (change in y)
    def __init__(self, bottom_length, top_length, dy):
        # The larger side
        big = max(bottom_length, top_length)
        # The smaller side
        small = min(bottom_length, top_length)
        # The middle of the bigger side, where the sides align
        middle = big / 2
        # Half the length of the smaller side, for positioning it
        half = small / 2
        # If the bottom is bigger
        if big == bottom_length:
            Trapezoid.__init__(self, 0, big, 0, middle-half, middle+half, dy)
        # If the top is bigger
        else:
            Trapezoid.__init__(self, middle-half, middle+half, 0, 0, big, dy)

class Rhombus(Kite, Parallelogram):
    # Horizontal Length (from center),
    # Vertical Length (from center)
    def __init__(self, hl, vl):
        Kite.__init__(self, hl, vl, hl, vl, vl)

class Rectangle(IsoscelesTrapezoid, Parallelogram):
    def __init__(self, length1, length2):
        Parallelogram.__init__(self, length1, length2, 90)

class Square(Rhombus, Rectangle):
    def __init__(self, length):
        Rectangle.__init__(self, length, length)

shapes = [
    Quadrilateral(1,0,4,1,0,6,6,5), # 8 Params
    Trapezoid(0,6,0,1,3,2), # 6 Params
    Kite(2,2,2,3,2), # 5 Params
    Parallelogram(5,3,75), # 3 Params
    IsoscelesTrapezoid(6,4,2), # 3 Params
    Rhombus(6,4), # 2 Params
    Rectangle(6,4), # 2 Params
    Square(4) # 1 Param
]

for shape in shapes:
    print(f"Shape: {type(shape).__name__}")
    print("Parents:", shape.parents())
    print("Ancestors:", shape.ancestors())
    shape.show()