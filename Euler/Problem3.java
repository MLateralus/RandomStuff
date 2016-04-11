import java.time.Duration;
import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

/* A bit overkill for erato sieve, but handy for both functions */
public class Problem3 {

	static List<Integer> B = new ArrayList<Integer>();

void erato(int range){

	boolean[] A = new boolean[range];

	for (int i=0; i<range; i++){
		A[i] = true;
	}
	for(int i=2; i<Math.sqrt(range); i++){
		if(A[i] == true){
			for(int j=i*i; j<range; j += i){
				A[j] = false;
			}
		}
	}
	for (int i=0; i<range; i++){
		if(A[i] == true){
			B.add(i);
		}
	}
}	

void factors (long num){

	for (int i=2; i<B.size(); i++){
		while(num != 1){
			if (num % B.get(i) == 0){
				num = num / B.get(i);
				System.out.println(B.get(i));
			}
			else {
				i++;
			}
		}
	}
}


	public static void main(String[] args) throws InterruptedException {
		
	    Instant start = Instant.now();
	    
	    int erato_range = 8000; /* Possibly high number, maybe a math dependency on nmber, Idk? */
		Problem3 Obj = new Problem3 ();
		Obj.erato(erato_range);
		Obj.factors(600851475143L);
		
	    Instant end = Instant.now();
	    System.out.println("Execution time = " + Duration.between(start, end) + " miliseconds");


	}

}
