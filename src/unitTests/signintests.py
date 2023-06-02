import unittest
from selenium import webdriver
from selenium.webdriver.common.keys import Keys

class SignInFormTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()

    def tearDown(self):
        self.driver.quit()

    def test_submit_form_with_valid_credentials(self):
        driver = self.driver
        driver.get("your_page_url")

        username_input = driver.find_element_by_name("username")
        password_input = driver.find_element_by_name("password")
        submit_button = driver.find_element_by_xpath("//input[@value='Login']")

        username_input.send_keys("valid_username")
        password_input.send_keys("valid_password")
        submit_button.click()

        # Add assertions
        self.assertEqual(submit_button.get_attribute("value"), "Login")
        # Add more assertions as needed

    def test_show_error_message_with_invalid_credentials(self):
        driver = self.driver
        driver.get("your_page_url")

        username_input = driver.find_element_by_name("username")
        password_input = driver.find_element_by_name("password")
        submit_button = driver.find_element_by_xpath("//input[@value='Login']")

        username_input.send_keys("invalid_username")
        password_input.send_keys("invalid_password")
        submit_button.click()

        # Add assertions
        self.assertEqual(submit_button.get_attribute("value"), "Login")
        # Add more assertions as needed

    def test_navigate_to_forgot_password_page(self):
        driver = self.driver
        driver.get("your_page_url")

        forgot_password_link = driver.find_element_by_xpath("//a[@href='forgotPassword.php']")
        forgot_password_link.click()

        # Add assertions
        self.assertIn("forgotPassword.php", driver.current_url)
        # Add more assertions as needed

class SignUpFormTests(unittest.TestCase):
    def setUp(self):
        self.driver = webdriver.Firefox()

    def tearDown(self):
        self.driver.quit()

    def test_submit_form_with_valid_data(self):
        driver = self.driver
        driver.get("shiftgamingz.000webhostapp.com/signin.html")

        username_input = driver.find_element_by_name("username")
        email_input = driver.find_element_by_name("email")
        password_input = driver.find_element_by_name("password")
        submit_button = driver.find_element_by_xpath("//input[@value='Sign Up']")

        username_input.send_keys("new_username")
        email_input.send_keys("test@example.com")
        password_input.send_keys("password123")
        submit_button.click()

        # Add assertions
        self.assertEqual(submit_button.get_attribute("value"), "Sign Up")
        # Add more assertions as needed

    def test_show_error_message_with_invalid_data(self):
        driver = self.driver
        driver.get("your_page_url")

        username_input = driver.find_element_by_name("username")
        email_input = driver.find_element_by_name("email")
        password_input = driver.find_element_by_name("password")
        submit_button = driver.find_element_by_xpath("//input[@value='Sign Up']")

        username_input.send_keys("existing_username")
        email_input.send_keys("invalid_email")
        password_input.send_keys("")
        submit_button.click()

        # Add assertions
        self.assertEqual(submit_button.get_attribute("value"), "Sign Up")
        # Add more assertions as needed

if __name__ == '__main__':
    unittest.main()
