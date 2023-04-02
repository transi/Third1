import { createElement } from 'lwc';
// import HelloWorldJestTest from 'c/helloWorldJestTest';
import HelloWorldJestTest from 'c/recordId';

// describe('c-hello-world-jest-test', () => {
describe('c-record-id-jest-test', () => {
    afterEach(() => {
        while (document.body.firstChild) {
            document.body.removeChild(document.body.firstChild);
        }
    });

    it('To Display message', () => {
        // const element = createElement('c-hello-world-jest-test', {
        const element = createElement('c-record-id-jest-test', {
            is: HelloWorldJestTest
        });

        document.body.appendChild(element);

        const div = element.shadowRoot.querySelector('div');
        expect(div.textContent).toBe('Hi, JEST Test!');
    });
});