from flask import Flask,render_template,url_for,request
import pickle
import numpy as np
from sklearn.feature_extraction.text import CountVectorizer
import sys

model1=pickle.load(open('model.pkl','rb'))
cv=pickle.load(open('vec.pkl','rb'))

message = sys.argv[1]
data =[message]
vect=cv.transform(data).toarray()
my_prediction = model1.predict(vect)

print(my_prediction[0])