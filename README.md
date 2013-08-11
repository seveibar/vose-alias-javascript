
Vose's Alias Javascript Implementation
=====================================

This script is intended to be used in javascript libraries to help find weighted random data, e.g. rolling a weighted die.

Note : This script is available for vanilla javascript (vose.js) or for projects using underscore.js (_vose.js)

### Usage

    var vose = getVose([["a",10],["b",20],["c",70]]); // Create vose function

    console.log(vose()); // Returns "a" 10% of the time, "b" 20% of the time etc.

To test the percentage of the time different values are coming out, you can run the following test.

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