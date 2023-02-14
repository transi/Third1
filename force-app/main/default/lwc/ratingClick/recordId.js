import { LightningElement, api } from 'lwc';

import { loadStyle } from 'lightning/platformResourceLoader';
export default class BlocxRatings extends LightningElement {
    @api size = "large";
    @api variant ;
    @api value;
    ratingLength = [1, 2, 3, 4, 5];
    ratingValue = 5;
    renderedCallback() {
        // if(this.variant !== 'readonly'){
         this.onClick();
        // }
    //     else{
        //  this.readOnlyRating(this.value);
    //     }
        // this.ratingClicked();
     }
    onClick() {
        const ul = this.template.querySelector('ul');
        const stars = this.template.querySelectorAll('lightning-icon')
        for (let i = 0; i <= stars.length - 1; i++) {
            stars[i].addEventListener('click', () => {
                this.ratingClicked(ul, i);
            })
        }
    }
    ratingClicked(element, value) {
        this.ratingValue = value + 1;
        for (let j = 0; j < element.children.length; j++) {
            element.children[j].classList.remove('blocx-ratings_star_active');
        }
        for (let j = 0; j <= value; j++) {
            element.children[j].classList.add('blocx-ratings_star_active');
        }
        this.dispatchEvent(new CustomEvent('ratingclick', { detail: { ratingValue: this.ratingValue } }))
    }
    readOnlyRating(value){
        value--;
        const ul = this.template.querySelector('ul');
        for (let j = 0; j <= value; j++) {
            ul.children[j].classList.add('blocx-ratings_star_active');
        }
    }
}