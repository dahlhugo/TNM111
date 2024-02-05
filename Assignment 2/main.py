import tkinter as tk
import pandas as pd
import numpy as np

canvas_width = canvas_height = 500
canvas_padding = 20

x_axis_start = (0, canvas_height/2)
x_axis_end = (canvas_width, canvas_height/2)

y_axis_start = (canvas_width/2, 0)
y_axis_end = (canvas_width/2, canvas_height)

data = pd.read_csv('./Assignment 2/data2.csv', header=None)

x_values = data.get(0)
y_values = data.get(1)
type_values = data.get(2)

output_x = np.array(
    np.interp(x_values, [min(x_values), max(x_values)], [0, canvas_width]))
print(output_x.astype(int))

output_y = np.array(
    np.interp(y_values, [min(y_values), max(y_values)], [canvas_height, 0]))
print(output_y.astype(int))


def draw(x_values, y_values):
    # Create circles for every point and sets color according to type 'a', 'b' or 'c'
    for i in range(len(output_x) - 1):
        create_shape(canvas, output_x[i], output_y[i], 3, type_values[i])

    for i in range(len(x_values)):
        if i % 10 == 0:
            canvas.create_line(round(np.interp(i, [min(x_values), max(x_values)], [0, canvas_width])) + canvas_padding, canvas_height/2 - 2, round(
                np.interp(i, [min(x_values), max(x_values)], [0, canvas_width])) + canvas_padding, canvas_height/2 + 3)
            canvas.create_text(round(np.interp(i, [min(x_values), max(x_values)], [
                            0, canvas_width])) + canvas_padding, canvas_height/2 + 10, text=str(i))

    for i in range(len(y_values)):
        if i % 10 == 0:
            canvas.create_line(canvas_width/2 - 2, round(np.interp(i, [min(y_values), max(y_values)], [0, canvas_height])) + canvas_padding,
                            canvas_width/2 + 3, round(np.interp(i, [min(y_values), max(y_values)], [0, canvas_height])) + canvas_padding)
            canvas.create_text(canvas_width/2 + 10, round(np.interp(
                i, [min(y_values), max(y_values)], [canvas_height, 0])) + 3, text=str(i))

    canvas.place(relx=0.5, rely=0.5, anchor="center")

def redraw(x_values, y_values):
    canvas.delete('all')
    draw(x_values, y_values)
    canvas.pack()


def onItemClick(event, center_x, center_y):
    new_x_values = []
    new_y_values = []

    for x in x_values: 
       for y in y_values:
           if x > center_x and y > center_y:
               new_x_values.append(x + center_x)
               new_y_values.append(y + center_y)
           elif x < center_x and y > center_y:
               new_x_values.append(x - center_x)
               new_y_values.append(y + center_y)
           elif x < center_x and y < center_y:
               new_x_values.append(x - center_x)
               new_y_values.append(y - center_y)
           else:
               new_x_values.append(x + center_x)
               new_y_values.append(y - center_y)
    redraw(new_x_values, new_y_values)
                  
               

 

def create_shape(canvas: tk.Canvas, x: int, y: int, r: float, type_value: str):
    x = canvas_padding + x
    y = canvas_padding + y
    match type_value:
        case 'a':
            object = canvas.create_oval(
                x - r, y - r, x + r, y + r, fill="black", outline=None)
            canvas.tag_bind(object, '<Button-1>', lambda e: onItemClick(e, x, y), tags="obj1Tag")

        case 'b':
            cbject = canvas.create_rectangle(
                x - r, y - r, x + r, y + r, fill="black", outline=None)
            #object.tag_bind(object, '<Button-1>', onItemClick)

        case 'c':
            object = canvas.create_polygon(
                [x, y + r + 0.5, x - r - 0.5, y - r - 0.5, x + r + 0.5, y - r - 0.5], fill="black", outline=None)
            #object.tag_bind(object, '<Button-1>', onItemClick)

        case 'foo':
            object = canvas.create_oval(
                x - r, y - r, x + r, y + r, fill="black", outline=None)
            canvas.tag_bind(object, '<Button-1>', lambda e: onItemClick(e, x, y))

        case 'bar':
            object = canvas.create_rectangle(
                x - r, y - r, x + r, y + r, fill="black", outline=None)
            #object.tag_bind(object, '<Button-1>', onItemClick)

        case 'baz':
            object = canvas.create_polygon(
                [x, y + r + 0.5, x - r - 0.5, y - r - 0.5, x + r + 0.5, y - r - 0.5], fill="black", outline=None)
            #object.tag_bind(object, '<Button-1>', onItemClick)


# Create window
window = tk.Tk()
window.geometry("500x500")

canvas = tk.Canvas()
canvas.configure(width=canvas_width, height=canvas_height, background="grey")
canvas.create_line(0, canvas_height/2, canvas_width, canvas_height/2)
canvas.create_line(canvas_width/2, 0, canvas_width/2, canvas_height)



# create ticks on the x-axis

# for i in range(canvas_width):
#     if i == 0:
#         continue

#     if i % 40 == 0:
#         canvas.create_text(i, canvas_height/2 + 10, text=str(round(np.interp(i, [0, canvas_width], [min(x_values), max(x_values)]))))


#     if i % 20 == 0:
#         canvas.create_line(i, canvas_height/2 - 4, i, canvas_height/2 + 4)

# # create ticks on the y-axis
# for i in range(canvas_height):
#     if i == 0:
#         continue

#     if i % 40 == 0:
#         canvas.create_text(canvas_width/2 + 12, i, text=str(round(np.interp(i, [0, canvas_height], [max(y_values), min(y_values)]))))

#     if i % 20 == 0:
#         canvas.create_line(canvas_width/2 - 4, i, canvas_width/2 + 4, i)


draw(x_values, y_values)
# start mainloop
window.mainloop()
