/* Fibbonachi */
package workplace;
public class Workplace {

    public static float Fib(float elem){
       if (elem==0 || elem==1){
       return 1;
       } else {
          return Fib(elem-1) + Fib(elem-2); 
       }
    }
   
    public static void main(String[] args) {
        int Sum = 0;
        for (int i=0; Fib(i) < 4000000; i++){
            if (Fib(i) % 2 == 0){
                Sum += Fib(i);
            }
        }
        System.out.println(Sum);
    }
}
