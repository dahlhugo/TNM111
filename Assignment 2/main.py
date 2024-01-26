import tkinter as tk
import pandas as pd
import numpy as np

canvas_width = canvas_height = 400


x_axis_start = (0, canvas_height/2)
x_axis_end = (canvas_width, canvas_height/2)

y_axis_start = (canvas_width/2, 0)
y_axis_end = (canvas_width/2, canvas_height)

data = pd.read_csv('data1.csv', header=None)

x_values = data.get(0)
y_values = data.get(1)
type_values = data.get(2)

output_x = np.array(np.interp(x_values, [min(x_values), max(x_values)], [0, canvas_width]))
print(output_x.astype(int))

output_y = np.array(np.interp(y_values, [min(y_values), max(y_values)], [canvas_height, 0]))
print(output_y.astype(int))


def get_color(value):
    match value:
        case "a":
            return "#ff0000"
        case "b":
            return "#00ff00"
        case "c":
            return "#0000ff"
        case _:
            return "fff"

def create_shape(canvas: tk.Canvas, x: int, y: int, r: float, type_value: str):
    match type_value:
        case 'a':
            canvas.create_oval(x - r, y - r, x + r, y + r, fill="black", outline=None)
            
        case 'b':
            canvas.create_rectangle(x - r, y - r, x + r, y + r, fill="black", outline=None)

        case 'c':
            canvas.create_polygon([x, y + r + 0.5, x - r - 0.5, y - r - 0.5, x + r + 0.5, y - r - 0.5], fill="black", outline=None)



window = tk.Tk()
window.geometry("500x500")

canvas = tk.Canvas()
canvas.configure(width=canvas_width, height=canvas_height, background="grey")
canvas.create_line(0, 200, 400, 200)
canvas.create_line(200, 0, 200, 400)

# Create circles for every point and sets color according to type 'a', 'b' or 'c'
for i in range(len(output_x) - 1):
    create_shape(canvas, output_x[i], output_y[i], 3, type_values[i])
    
# create ticks on the x-axis

for i in range(canvas_width):
    if i == 0:
        continue

    if i % 40 == 0:
        canvas.create_text(i, canvas_height/2 + 10, text=str(round(np.interp(i, [0, canvas_width], [min(x_values), max(x_values)]))))

    if i % 20 == 0:        
        canvas.create_line(i, canvas_height/2 - 4, i, canvas_height/2 + 4)

# create ticks on the y-axis
for i in range(canvas_height):
    if i == 0:
        continue

    if i % 40 == 0:
        canvas.create_text(canvas_width/2 + 12, i, text=str(round(np.interp(i, [0, canvas_height], [max(y_values), min(y_values)]))))
   
    if i % 20 == 0:
        canvas.create_line(canvas_width/2 - 4, i, canvas_width/2 + 4, i)




canvas.place(relx=0.5, rely=0.5, anchor="center")
window.mainloop()


