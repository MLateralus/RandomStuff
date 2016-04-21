import java.io.BufferedReader;
import java.io.FileReader;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.List;
import javax.swing.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;

class Download {
	
	WebDriver driver = new ChromeDriver();	
	
	void account_log (String clogin, String cpassword) throws InterruptedException {
		driver.get("https://www.packtpub.com/");
		//Thread.sleep(1000);
		
		/* Recognize viewport */
		List<WebElement> menu_icon = driver.findElements(By.id("menuIcon"));
		if (menu_icon.size() > 0  && menu_icon.get(0).isDisplayed()){
			Thread.sleep(1000);
			menu_icon.get(0).click();
			Thread.sleep(1000);
			List<WebElement> login = driver.findElements(By.className("respoLogin"));
			WebElement log_button = login.get(0);
			log_button.click();
		}
		/* Need to get this work for a wider vieport */
		else if (menu_icon.size() > 0  && !menu_icon.get(0).isDisplayed()){
			Thread.sleep(1000);
			List<WebElement> log_wide = driver.findElements(By.className("float-left"));
			if(log_wide.size() > 0){
				Thread.sleep(1000);
				log_wide.get(2).click();
			}
			else{
				throw new InterruptedException("Viewport not recognized");
			}
		}
		WebElement email = driver.findElement(By.id("email"));
		WebElement pswd = driver.findElement(By.id("password"));
		
		email.sendKeys(clogin);
		pswd.sendKeys(cpassword);
		
		//Thread.sleep(1000);
		WebElement login_button = driver.findElement(By.id("edit-submit-1"));
		login_button.click();
	}
	
	void download_free_book () throws InterruptedException {

		//Thread.sleep(1000);
		
		/* Now we are logged in */
		driver.get("https://www.packtpub.com/packt/offers/free-learning");
			//Thread.sleep(1000);
			List<WebElement> download_book = driver.findElements(By.className("book-claim-token-inner"));
			List<WebElement> title_div = driver.findElements(By.className("dotd-title"));
			WebElement title = title_div.get(0);
			String book_title = title.getAttribute("innerHTML");
			book_title = "Todays book is " + book_title.substring((book_title.indexOf("<h2>") + "<h2>".length()), book_title.indexOf("</h2>"));
			System.out.println(download_book);
			download_book.get(0).click();
			
			driver.close();
		    JOptionPane.showMessageDialog(new JFrame(), book_title, "Dialog",
		            JOptionPane.INFORMATION_MESSAGE);
	}
}


public class Book {
	
	public static void main(String[] args) throws InterruptedException, IOException {
		
		String credentials = new String(Files.readAllBytes(Paths.get(System.getProperty("user.dir") + "\\" + "Credentials.txt")));
		
		String clogin = credentials.substring(credentials.indexOf("login:") + "login:".length(),credentials.indexOf("password"));
		String cpassword = credentials.substring(credentials.indexOf("password:") + "password:".length(),credentials.indexOf("location"));
		String clocation = credentials.substring(credentials.indexOf("location:") + "location:".length(),credentials.length());
		System.out.println(clogin);
		System.out.println(cpassword);
		System.out.println(clocation);
		
		System.setProperty("webdriver.chrome.driver", clocation);

		Download obj = new Download();
		obj.account_log(clogin,cpassword);
		obj.download_free_book();	


	}
}
