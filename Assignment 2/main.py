import tkinter as tk
import pandas as pd
import numpy as np

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


data = pd.read_csv('data1.csv', header=None)

x_values = data.get(0)
y_values = data.get(1)
type_values = data.get(2)

output_x = np.array(np.interp(x_values, [min(x_values), max(x_values)], [0, 400]))
print(output_x.astype(int))

output_y = np.array(np.interp(y_values, [min(y_values), max(y_values)], [0, 400]))
print(output_y.astype(int))

window = tk.Tk()
window.geometry("500x500")

canvas = tk.Canvas()
canvas.configure(width=400, height=400, background="grey")
canvas.create_line(0, 200, 400, 200)
canvas.create_line(200, 0, 200, 400)

for i in range(len(output_x) - 1):
    canvas.create_oval(output_x[i] - 2, output_y[i] - 2, output_x[i] + 2, output_y[i] + 2, fill=get_color(type_values[i]))
    
    

# canvas.create_text(150, 280, text="X-Axis")

canvas.place(relx=0.5, rely=0.5, anchor="center")
window.mainloop()


