/* Michał Czerwień
*  22/03/2017
*	
*	Euler method for 
*	x(t) = arctan(t + C)
*/

var approxEuler = [0];
var actual = [0];
var step = 0.2;
var endPoint = 40;
for (var i = 0; i < endPoint; i++) {
    var xnApprox = approxEuler[i] + Math.pow(Math.cos(approxEuler[i]), 2) * step;
    var xnActual = Math.atan(step * i)
    actual.push(xnActual)
    approxEuler.push(xnApprox);
}