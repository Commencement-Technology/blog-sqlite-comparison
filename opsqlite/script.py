import numpy as np
import matplotlib.pyplot as plt 
import matplotlib.pylab as pylab
  
# creating the dataset

params = {'legend.fontsize': 'x-large',
          'figure.figsize': (15, 5),
         'axes.labelsize': 'small',
         'axes.titlesize':'small',
         'xtick.labelsize':'small',
         'ytick.labelsize':'small'}
pylab.rcParams.update(params)

data = {'SQLite Storage':20, 'Quick Sqlite':15, 'OP Sqlite':30}
courses = list(data.keys())
values = list(data.values())
  
fig = plt.figure(figsize = (3, 3))
 
# creating the bar plot
plt.bar(courses, values, color ='green', 
        width = 0.4)
 
plt.title("Update 10000 rows (iPhone 11)")
plt.show()