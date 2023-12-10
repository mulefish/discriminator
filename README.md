# GOAL: Make an event discriminator


# PATH 1: 
TensorFlow and Neural Net
Use https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@latest to make a JS clientside Neural Net   
Currently: 
  - node server.js 
  - http://localhost:3000/nn.html
TODO: TensorFlow...


  
# PATH 2: 
Bayesian Classifier 
node 

# THOUGHTS 1 vs 2: 
Bayesian is good, no doubt. And very generalizable. Its weakness/strength is that is does NOT care about 'normalized data'. But using TensorFlow and NeuralNets is so sexy... See http://localhost:3000/nn.html for my current experiments with TensorFlow neural net...   ...atm ( Dec 9 ) I am trying to get a neural net to 'take a number, double it and subtract 1 from that' ( so '10' ought to be '19') -- you can see that my NN is VERY VERY sloppy. As to 'thought 2' ( Bayes ) that is unsexy but pretty straight forward. The rest of this readme will be focused on Bayes ( https://en.wikipedia.org/wiki/Bayes%27_theorem ). 


# HOW to run this PATH 2 
After cloning: 
 - cd public/logic 
 - node step1_generateData.js   
 - node step2_trainClassifier.js  
 - node step3_classifyData.js   



# Size? Bytes? Is it big? 
Well, in the 10000 training run the bytes here is 21MB. But that collapses to a mere 0.0005MB after training. And Discriminator object itself is 0.0015MB bytes. 


# How training effects the sophistication: 100 runs vs 1000 vs 10000:
100 training - pretty dumb - Of note: With so few training rounds the Bayes does not really have any strong opinions. Boo.
```
Data: ["Component Event","flying","fast","book","hat","shopping car"]
Confidence scores:{"page_view":"15.82","app-response":"20.34","component-event":"63.84"}
Data: ["App Response","car","bright","Mr. C"]
Confidence scores:{"page_view":"8.85","app-response":"84.19","component-event":"6.95"}
Data: ["Product View","car","bright","Mr. C"]
Confidence scores:{"page_view":"75.25","app-response":"14.91","component-event":"9.85"}
Data: ["Twas","brillig,","and","slithy","toves"]
Confidence scores:{"page_view":"33.51","app-response":"42.25","component-event":"24.23"}
```

1000 training - solid! The Opinions are strong! Yay.
```
Data: ["Component Event","flying","fast","book","hat","shopping car"]
Confidence scores:{"app-response":"1.54","page_view":"1.32","component-event":"97.14"}
Data: ["App Response","car","bright","Mr. C"]
Confidence scores:{"app-response":"95.54","page_view":"2.11","component-event":"2.35"}
Data: ["Product View","car","bright","Mr. C"]
Confidence scores:{"app-response":"2.30","page_view":"95.44","component-event":"2.26"}
Data: ["Twas","brillig,","and","slithy","toves"]
Confidence scores:{"app-response":"35.42","page_view":"30.00","component-event":"34.58"}
```

100000 - super solid. The Opinion are stronger ( good ) but this seems overkill. Yay but exhausting.
```
Data: ["Component Event","flying","fast","book","hat","shopping car"]
Confidence scores:{"app-response":"0.02","page_view":"0.01","component-event":"99.97"}
Data: ["App Response","car","bright","Mr. C"]
Confidence scores:{"app-response":"99.96","page_view":"0.02","component-event":"0.02"}
Data: ["Product View","car","bright","Mr. C"]
Confidence scores:{"app-response":"0.02","page_view":"99.96","component-event":"0.02"}
Data: ["Twas","brillig,","and","slithy","toves"]
Confidence scores:{"app-response":"35.42","page_view":"30.27","component-event":"34.31"}
```

# Next steps? Web!
TODO!