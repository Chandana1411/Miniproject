import { setBackend, tensor2d, sequential, layers, train } from '@tensorflow/tfjs';
var range = (val) =>{
    if(val < 500)
        return [1,0,0,0,0,0,0,0]
    if(val >= 500 && val < 600)
        return [0,1,0,0,0,0,0,0]
    if(val >= 600 && val < 700)
        return [0,0,1,0,0,0,0,0]
    if(val >= 700 && val < 800)
        return [0,0,0,1,0,0,0,0]
    if(val >= 800 && val < 900)
        return [0,0,0,0,1,0,0,0]
    if(val >= 900 && val < 1000)
        return [0,0,0,0,0,1,0,0]
    if(val >= 1000 && val < 1100)
        return [0,0,0,0,0,0,1,0]
    if(val >= 1100 && val < 1200)
        return [0,0,0,0,0,0,0,1]
}

var modal = null;

fetch("https://us-central1-miniproject-ef989.cloudfunctions.net/getAll")
    .then(res => {
        if(res.ok)
            return res.json()
        else   
            console.log("[worker]",res)
    })
    .then(data => {

        setBackend('cpu')

        var trainingdata = tensor2d(data.map(el =>
            [ el.language*0.1, el.english*0.1, el.maths*0.1, el.physics*0.1, el.chemistry*0.1, el.other*0.1 ] 
        ))
        
        var outputdata = tensor2d(data.map(el => range(el.total)))
        
        modal = sequential();
        
        modal.add(layers.dense({
            inputShape : [6],
            activation : "sigmoid",
            units : 16
        }))
        
        modal.add(layers.dense({
            inputShape : [16],
            activation : "sigmoid",
            units : 8
        }))
        
        modal.add(layers.dense({
            activation : "sigmoid",
            units : 8
        }))
        
        modal.compile({
            loss : "meanSquaredError",
            optimizer : train.adam(0.6)
        })
        
        modal.fit(trainingdata, outputdata, {epochs : 100})
            .then(history => {
                console.log("[worker]",history)
                modal.predict(tensor2d([ 0.5, 0.4, 0.1, 0.6, 0.3, 0.2 ], [1,6])).print()
            })
        // await modal.save('indexeddb://my-model');
            .then(() => {
                return postMessage( JSON.stringify({
                    ok : true,
                }))
            })
        
    })
    .catch(err => {
        console.log(err);
        postMessage(JSON.stringify({
            ok : false,
        }))
    })

onmessage = (e) => {
    console.log(e.data)
    const tensor = modal.predict(tensor2d(e.data, [1,6]))
    const arr = Array.from(tensor.dataSync())
    console.log(arr)
    var index = arr.indexOf(Math.max(...arr))
    postMessage(index === -1 ? null : index)
}


