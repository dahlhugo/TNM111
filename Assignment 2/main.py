import tkinter as tk
import pandas as pd
import numpy as np



data = pd.read_csv('./Assignment 2/data1.csv', header=None)



class Scatterplot:
    def __init__(self, canvas) -> None:
        self.canvas_width = self.canvas_height = 500

        self.x_axis_start = (0, self.canvas_height/2)
        self.x_axis_end = (self.canvas_width, self.canvas_height/2)

        self.y_axis_start = (self.canvas_width/2, 0)
        self.y_axis_end = (self.canvas_width/2, self.canvas_height)

        self.x_values = data.get(0)
        self.y_values = data.get(1)
        self.type_values = data.get(2)

        self.selected_point = None
        self.r_selected_point = None

        self.origin_x = self.canvas_width / 2
        self.origin_y = self.canvas_height / 2
        self.offset_x = 0
        self.offset_y = 0


        self.output_x = np.array(
            np.interp(self.x_values, [min(self.x_values), max(self.x_values)], [0, self.canvas_width]))
        
        self.output_y = np.array(
            np.interp(self.y_values, [min(self.y_values), max(self.y_values)], [self.canvas_height, 0]))
        
        self.canvas: tk.Canvas = canvas
        canvas.configure(width=self.canvas_width, height=self.canvas_height, background="grey")

    def create_shape(self, x: int, y: int, r: float, type_value: str, tag: str, color: str):
        
        match type_value:
            case 'a':
                object = self.canvas.create_oval(
                    x - r, y - r, x + r, y + r, fill=color, outline="black", tags=tag)
                self.canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                self.canvas.tag_bind(object, '<Button-3>', lambda d: self.onItemRClick(d, x, y, object, tag))

            case 'b':
                object = self.canvas.create_rectangle(
                    x - r, y - r, x + r, y + r, fill=color, outline="black", tags=tag)
                self.canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                self.canvas.tag_bind(object, '<Button-3>', lambda d: self.onItemRClick(d, x, y, object, tag))

            case 'c':
                object = self.canvas.create_polygon(
                    [x, y + r + 0.5, x - r - 0.5, y - r - 0.5, x + r + 0.5, y - r - 0.5], fill=color, outline="black", tags=tag)
                self.canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                self.canvas.tag_bind(object, '<Button-3>', lambda d: self.onItemRClick(d, x, y, object, tag))

            case 'foo':
                object = self.canvas.create_oval(
                    x - r, y - r, x + r, y + r, fill=color, outline="black", tags=tag)
                self.canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                self.canvas.tag_bind(object, '<Button-3>', lambda d: self.onItemRClick(d, x, y, object, tag))
                
            

            case 'bar':
                object = canvas.create_rectangle(
                    x - r, y - r, x + r, y + r, fill=color, outline="black", tags=tag)
                self.canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                self.canvas.tag_bind(object, '<Button-3>', lambda d: self.onItemRClick(d, x, y, object, tag))

            case 'baz':
                object = canvas.create_polygon(
                    [x, y + r + 0.5, x - r - 0.5, y - r - 0.5, x + r + 0.5, y - r - 0.5], fill=color, outline="black", tags=tag)
                self.canvas.tag_bind(object, '<Button-1>', lambda e: self.onItemClick(e, x, y, object, tag))
                self.canvas.tag_bind(object, '<Button-3>', lambda d: self.onItemRClick(d, x, y, object, tag))
                
    def draw(self) -> None:
        self.canvas.delete('all')

        

        #Axises
        self.canvas.create_line(0, self.canvas_height/2, self.canvas_width, self.canvas_height/2)
        self.canvas.create_line(self.canvas_width/2, 0, self.canvas_width/2, self.canvas_height)

        
            
        # X-axis ticks
        for i in range(round(min(self.x_values)) , round(max(self.x_values))):
            if i % 10 == 0:
                x_position = round(np.interp(i, [min(self.x_values), max(self.x_values)], [0, self.canvas_width]))
                self.canvas.create_line(x_position, self.canvas_height/2 - 2, x_position, self.canvas_height/2 + 3)
                self.canvas.create_text(x_position, self.canvas_height/2 + 10, text=str(i))

        #Y-axis ticks
        for i in range(round(min(self.y_values)), round(max(self.y_values))):
            if i %  10 ==  0:
                y_position = round(np.interp(i, [min(self.y_values), max(self.y_values)], [self.canvas_height,  0]))
                self.canvas.create_line(self.canvas_width/2 -  2, y_position, self.canvas_width/2 +  3, y_position)
                self.canvas.create_text(self.canvas_width/2 +  10, y_position, text=str(i))

        #Points
        color = ""
        for i in range(len(self.output_x) - 1):
            if(self.selected_point == None):
                color = "black"
            else:
                color = self.get_color(self.output_x[i], self.output_y[i])

            point = self.create_shape( self.output_x[i], self.output_y[i], 3, self.type_values[i], "point-"+str(i), color)
            self.canvas.move("point-"+str(i), self.offset_x, self.offset_y)

        self.canvas.place(relx=0.5, rely=0.5, anchor="center")
        
        
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
            return 'black'
      

    def onItemClick(self, event, center_x, center_y, object_id, tag):
        # if self.selected_point == None:
        #     self.selected_point = tag

        if self.selected_point != None and self.selected_point[0] == tag:
            self.selected_point = None
            self.offset_x = 0
            self.offset_y = 0
        else:
            self.selected_point = (tag, center_x, center_y)
            #get offsetx and y
            self.offset_x = self.origin_x - center_x
            self.offset_y = self.origin_y - center_y
            



            item = self.canvas.find_withtag(self.selected_point[0])
            self.canvas.itemconfigure(item, fill="black")
        self.draw()

            
    
    def onItemRClick(self, event, center_x, center_y, object_id, tag):
            
            dis = []


            
            
            for x, y, i in zip(self.output_x, self.output_y, range(len(self.output_x)-1)):
                dis.append(((( (x - center_x)** 2 + (y - center_y)**2 ) ** 0.5), "point-"+str(i)))
            
            dis.sort()
            
            dis = dis[1:6]

            if self.r_selected_point != None and self.r_selected_point[0] == tag:
                self.canvas.itemconfig(self.r_selected_point[0], outline="black")
                for z in dis:
                    object_id = self.canvas.find_withtag(z[1])
                    self.canvas.itemconfig(object_id, outline="black")
                    self.r_selected_point = None
            else:
                self.r_selected_point = (tag, center_x, center_y)
                self.canvas.itemconfig(self.r_selected_point[0], outline="magenta")
                for z in dis:
                    object_id = self.canvas.find_withtag(z[1])
                    self.canvas.itemconfig(object_id, outline="orange")
                
                
            self.canvas.place(relx=0.5, rely=0.5, anchor="center")
        


    


# Create window
window = tk.Tk()
window.geometry("500x500")

canvas = tk.Canvas()
scatterplot = Scatterplot(canvas)

scatterplot.draw()

# start mainloop
window.mainloop()
