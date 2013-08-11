
// Vose's Alias Implementation
// http://www.keithschwarz.com/darts-dice-coins/

// implementation created by seveibar

function getVose(plist){
    
    //Normalize
    var probSum = 0;
    for (var i = 0; i<plist.length; i++) {
        probSum += plist[i][1];
    }
    
    var n = plist.length;
    
    var small = [],
        large = [],
        P = [],
        A = [];
    
    for (var i = 0; i<plist.length; i++){
        plist[i][1] *= n / probSum;
        (plist[i][1] < 1 ? small : large).push(plist[i]);
    }
    
    while (small.length != 0 && large.length != 0){
        l = small.splice(0,1)[0];
        g = large.splice(0,1)[0];
        P.push(l[1]);
        A.push([l[0],g[0]]);
        g[1] -= (1 - l[1]);
        (g[1] >= .999 ? large : small).push(g);
    }
    while (large.length != 0){
        g = large.splice(0,1)[0];
        P.push(1);
        A.push([g[0],g[0]]);
        g[1] -= 1;
        (g[1] >= .999 ? large : small).push(g);        
    }
    
    return function () {
        var i = Math.floor(Math.random() * P.length);
        return (P[i] >= Math.random() ? A[i][0] : A[i][1]);
    };
}


var vose = getVose([
    ["a",10],["b",20],["c",70]
]);

var d = {a:0,b:0,c:0};
for (var i = 0; i<10000;i++){
    d[vose()] += 1/100;
}

console.log("Below are the percentage of times a letter was selected after 10000 cycles, this should roughly correspond to the probability of them being picked with their weights");
console.log("A",d.a);
console.log("B",d.b);
console.log("C",d.c);


// Underscore.js Implementation
/*function getVose(plist){
    
    //Normalize
    probSum = _.reduce(plist,function (memo, prob) {
        return memo + prob[1];
    },0);
    
    plist = _.map(plist,function (a) {
        return [a[0],a[1] / probSum];
    });
    
    var n = plist.length;
    
    var small = [];
    var large = [];
    
    var P = [];
    var A = [];
    
    
    _.each(plist, function (prob) {
        prob[1] *= n;
        (prob[1] < 1 ? small : large).push(prob);
    });
    
    while (small.length != 0 && large.length != 0){
        l = small.splice(0,1)[0];
        g = large.splice(0,1)[0];
        P.push(l[1]);
        A.push([l[0],g[0]]);
        g[1] -= (1 - l[1]);
        (g[1] >= .999 ? large : small).push(g);
    }
    while (large.length != 0){
        g = large.splice(0,1)[0];
        P.push(1);
        A.push([g[0],g[0]]);
        g[1] -= 1;
        (g[1] >= .999 ? large : small).push(g);        
    }
    
    return function () {
        var i = Math.floor(Math.random() * P.length);
        return (P[i] >= Math.random() ? A[i][0] : A[i][1]);
    };
}


var vose = getVose([
    ["a",10],["b",20],["c",70]
]);

var d = {a:0,b:0,c:0};
_.times(10000,function(){
    d[vose()] += 1/100;
});

console.log("Below are the percentage of times a letter was selected, this should roughly correspond to the probability of them being picked with their weights");
console.log("A",d.a);
console.log("B",d.b);
console.log("C",d.c);
*/