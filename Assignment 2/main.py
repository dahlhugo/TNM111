import tkinter as tk
import pandas as pd
import numpy as np



data = pd.read_csv('./Assignment 2/data2.csv', header=None)



class Scatterplot:
    def __init__(self, canvas) -> None:
        self.canvas_width = self.canvas_height = 500
        self.canvas_padding = 20

        self.x_axis_start = (0, self.canvas_height/2)
        self.x_axis_end = (self.canvas_width, self.canvas_height/2)

        self.y_axis_start = (self.canvas_width/2, 0)
        self.y_axis_end = (self.canvas_width/2, self.canvas_height)

        self.x_values = data.get(0)
        self.y_values = data.get(1)
        self.type_values = data.get(2)

        self.selected_point = None

        self.output_x = np.array(
            np.interp(self.x_values, [min(self.x_values), max(self.x_values)], [0, self.canvas_width]))
        
        self.output_y = np.array(
            np.interp(self.y_values, [min(self.y_values), max(self.y_values)], [self.canvas_height, 0]))
        
        self.canvas: tk.Canvas = canvas
        canvas.configure(width=self.canvas_width, height=self.canvas_height, background="grey")

    def reset_points(self):
        self.output_x = np.array(
            np.interp(self.x_values, [min(self.x_values), max(self.x_values)], [0, self.canvas_width]))
        
        self.output_y = np.array(
            np.interp(self.y_values, [min(self.y_values), max(self.y_values)], [self.canvas_height, 0]))
        
        self.draw()   

    def create_shape(self, x: int, y: int, r: float, type_value: str, tag: str, color: str):
        x = self.canvas_padding + x
        y = self.canvas_padding + y
        match type_value:
            case 'a':
                object = self.canvas.create_oval(
                    x - r, y - r, x + r, y + r, fill=color, outline=None, tags=tag)
                canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))

            case 'b':
                object = self.canvas.create_rectangle(
                    x - r, y - r, x + r, y + r, fill=color, outline=None, tags=tag)
                canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))

            case 'c':
                object = self.canvas.create_polygon(
                    [x, y + r + 0.5, x - r - 0.5, y - r - 0.5, x + r + 0.5, y - r - 0.5], fill=color, outline=None, tags=tag)
                canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))

            case 'foo':
                object = self.canvas.create_oval(
                    x - r, y - r, x + r, y + r, fill=color, outline=None, tags=tag)
                self.canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                return object

            case 'bar':
                object = canvas.create_rectangle(
                    x - r, y - r, x + r, y + r, fill=color, outline=None, tags=tag)
                canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))

            case 'baz':
                object = canvas.create_polygon(
                    [x, y + r + 0.5, x - r - 0.5, y - r - 0.5, x + r + 0.5, y - r - 0.5], fill=color, outline=None, tags=tag)
                canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                
    def draw(self) -> None:
        self.canvas.delete('all')

        

        #Axises
        canvas.create_line(0, self.canvas_height/2, self.canvas_width, self.canvas_height/2)
        canvas.create_line(self.canvas_width/2, 0, self.canvas_width/2, self.canvas_height)

        
            
        # X-axis ticks
        for i in range(len(self.x_values)):
            if i % 10 == 0:
                canvas.create_line(round(np.interp(i, [min(self.x_values), max(self.x_values)], [0, self.canvas_width])) + self.canvas_padding, self.canvas_height/2 - 2, round(
                    np.interp(i, [min(self.x_values), max(self.x_values)], [0, self.canvas_width])) + self.canvas_padding, self.canvas_height/2 + 3)
                canvas.create_text(round(np.interp(i, [min(self.x_values), max(self.x_values)], [
                                0, self.canvas_width])) + self.canvas_padding, self.canvas_height/2 + 10, text=str(i))

        #Y-axis ticks
        for i in range(len(self.y_values)):
            if i % 10 == 0:
                canvas.create_line(self.canvas_width/2 - 2, round(np.interp(i, [min(self.y_values), max(self.y_values)], [0, self.canvas_height])) + self.canvas_padding,
                                self.canvas_width/2 + 3, round(np.interp(i, [min(self.y_values), max(self.y_values)], [0, self.canvas_height])) + self.canvas_padding)
                canvas.create_text(self.canvas_width/2 + 10, round(np.interp(
                    i, [min(self.y_values), max(self.y_values)], [self.canvas_height, 0])) + 3, text=str(i))

        #Points
        color = ""
        for i in range(len(self.output_x) - 1):
            if(self.selected_point == None):
                color = "black"
            else:
                color = self.get_color(self.output_x[i], self.output_y[i])

            object_id = self.create_shape( self.output_x[i], self.output_y[i], 3, self.type_values[i], str(i), color)

        canvas.place(relx=0.5, rely=0.5, anchor="center")
        
    def get_color(self, x, y) -> str:
        selected_x = self.selected_point[1] 
        selected_y = self.selected_point[2] 

        if x > selected_x and y > selected_y:
            return 'red'
        elif x < selected_x and y > selected_y:
            return 'blue'
        elif x > selected_x and y < selected_y:
            return 'green'
        elif x < selected_x and y < selected_y:
            return 'yellow'
        else:
            return 'pink'


    def onItemClick(self, event, center_x, center_y, object_id, tag):
        # if self.selected_point == None:
        #     self.selected_point = tag

        if self.selected_point != None and self.selected_point[0] == tag:
            self.selected_point = None
            self.reset_points()
        else:
            self.selected_point = (tag, center_x - self.canvas_padding, center_y - self.canvas_padding)
            new_x_values = []
            new_y_values = []
            
            for x, y in zip(self.output_x, self.output_y):
                new_x_values.append(x - center_x + self.canvas_width / 2)
                new_y_values.append(y - center_y + self.canvas_height / 2)

            self.output_x = new_x_values
            self.output_y = new_y_values
            
            self.draw()
            
        


    


# Create window
window = tk.Tk()
window.geometry("500x500")

canvas = tk.Canvas()
scatterplot = Scatterplot(canvas)

scatterplot.draw()

# start mainloop
window.mainloop()
