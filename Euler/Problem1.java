/* Maybe not best efficient, but short */
package workplace;
public class Workplace {

    public static void main(String[] args) {
       int Sum = 0;
        for (int x=0; x<1000; x++){
            if (x%3 == 0 || x%5 == 0){
            Sum = Sum + x;
            }
       }
        System.out.println(Sum);
    }
    
}
