# GOAL: Make an event discriminator

# PATH 1: 
TensorFlow and Neural Net
Use https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest to make a JS clientside Neural Net   
Currently: 
  - node server.js 
  - http://localhost:3000/nn.html
  
# PATH 2: 
Bayesian Classifier 
node 


# Example run: 
```
base) pmontgomery@SSC-US-FVFH50XLQ6LW logic % node step1_generateData.js 
 /public/logic/step1_generateData.js  85  Created training data at data_pre_training.json
(base) pmontgomery@SSC-US-FVFH50XLQ6LW logic % node step2_trainClassifier.js 
 /public/logic/step2_trainClassifier.js  20  Read from data_pre_training.json
 /public/logic/step2_trainClassifier.js  21  Wrote to data_pre_training.json
(base) pmontgomery@SSC-US-FVFH50XLQ6LW logic % node step3_classifyData.js 
Data: ["ce3","flying","fast","book","hat","shopping car"]
Confidence scores: {
  'component-event': '97.43',
  page_view: '0.99',
  'app-response': '1.58'
}
Data: ["ar6","car","bright","Mr. C"]
Confidence scores: {
  'component-event': '2.32',
  page_view: '1.92',
  'app-response': '95.76'
}
Data: ["pv3","car","bright","Mr. C"]
Confidence scores: {
  'component-event': '2.39',
  page_view: '94.72',
  'app-response': '2.90'
}
Data: ["Twas","brillig,","and","slithy","toves"]
Confidence scores: {
  'component-event': '32.57',
  page_view: '25.26',
  'app-response': '42.17'
}
```