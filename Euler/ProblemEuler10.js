function erato(range) {
    var A = [];
    var sum = 0;
    for (var x = 0; x < range; x++) {
        A.push("true");
    }
    for (var y = 2; y < Math.sqrt(range); y++) {
        if (A[y] == 'true') {
            for (var i = y * y; i < range; i += y) {
                A[i] = 'false';
            }
        }
    }
    for (var t = 2; t < A.length; t++) {
        if (A[t] == 'true') {
            sum += t;
        }
    }
return sum;
}

erato(2000000)
