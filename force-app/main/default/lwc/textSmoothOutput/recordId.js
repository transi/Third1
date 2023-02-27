import { LightningElement } from 'lwc';

export default class Typing extends LightningElement {
    renderedCallback() {
        this.displayTypingOutput();
      }
    
      displayTypingOutput() {

        const welcomeMsg = 'Welcome to SFDCLesson.com, your go-to resource for everything Salesforce-related. Whether you are a seasoned Salesforce professional or just starting out, we have something for everyone here. Our mission is to provide you with comprehensive, up-to-date information about the Salesforce platform and its various features and functionalities. '+
                           'Our team of experts has designed this website to help you learn and grow in your Salesforce career. With a wide range of articles, tutorials, and guides, we aim to make your learning experience engaging and easy. Our content covers everything from the basics of Salesforce to advanced topics like custom development, integrations, and more. '+
                           'We also understand the importance of community, which is why we have built a platform that allows you to connect with like-minded individuals and experts in the Salesforce community. We encourage you to participate in discussions, ask questions, and share your experiences with others. '+
                           'Thank you for choosing SFDCLesson.com as your learning partner. We are excited to help you achieve your goals and succeed in your Salesforce journey';
        const typingOutput = welcomeMsg;
        const typingSpeed = 35; // The speed of typing, in milliseconds
    
        let i = 0;
        const timer = setInterval(() => {
          if (i >= typingOutput.length) {
            clearInterval(timer);
            return;
          }
          const currentText = this.template.querySelector('.typing-output').textContent;
          this.template.querySelector('.typing-output').textContent = currentText + typingOutput[i];
          i++;
        }, typingSpeed);
      }
}