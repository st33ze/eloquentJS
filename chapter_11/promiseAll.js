function Promise_all(promises){
    return new Promise((resolve, reject) => {
        let results = Array(promises.length);
        
        if (results == 0) resolve(results);
        
        let resolveCounter = 0;

        promises.forEach((promise, index) => {
            promise.then(result => {
                results[index] = result;
                resolveCounter++;
                if (resolveCounter == promises.length) resolve(results);
            }).catch(err => reject(err));
        });

    });
}

// Test code.

Promise_all([]).then(array => {
    console.log("This should be []:", array);
});

function soon(val) {
    return new Promise(resolve => {
        setTimeout(() => resolve(val), Math.random() * 500);
    });
}

Promise_all([soon(1), soon(2), soon(3)]).then(array => {
    console.log("This should be [1, 2, 3]:", array);
})

Promise_all([soon(1), Promise.reject("X"), soon(3)])
    .then(array => {
        console.log("We should not get here");
    }).catch(error => {
        if (error != "X")  {
            console.log("Unexpected failure:", error);
        }
    })