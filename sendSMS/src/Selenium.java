import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import javax.swing.*;

public class Selenium {

	public static void textMessage (String content) throws InterruptedException {
		WebDriver driver = new ChromeDriver();
		driver.get("https://sms.orange.pl/");

		WebElement reciever = driver.findElement(By.name("RECIPIENT"));
		WebElement sender = driver.findElement(By.name("SENDER"));
		WebElement message = driver.findElement(By.name("SHORT_MESSAGE"));
		WebElement submit = driver.findElement(By.id("Send"));
		
		reciever.sendKeys("xxxxx");
		sender.sendKeys("xxxxx");
		message.sendKeys(content);
		Thread.sleep(5000);	
		submit.submit();
		driver.close();
	}
	
	
	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.chrome.driver", "C:/Program Files/xxxxxxx/xxxxxx/chromedriver.exe");

		
		// Window frame 
		JFrame frame = new JFrame("Wiadomoœæ");
	    String text = JOptionPane.showInputDialog(frame,"Text");

	    
	    if ( !text.equals("")){
	    	textMessage(text);
	    }
	}
}
