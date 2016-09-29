function factorial(n) {
    while (n > 0) {
        return n * factorial(n - 1);
    }
    return 1;
}

var t = factorial(100);
t = '93326215443944152681699238856266700490715968264381621468592963895217599993229915608941463976156518286253697920827223758251185210916864000000000000000000000000';
t = t.split("");
t.reduce(function(a,b){return parseFloat(a)+parseFloat(b)})
t