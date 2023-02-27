import { LightningElement, track } from 'lwc';

export default class Widgets extends LightningElement {
  @track widgets = [
    {
      name: 'Widget 1',
      clicked: false
    },
    {
      name: 'Widget 2',
      clicked: false
    }
  ];

  clickedWidget(event) {
    const widget = event.target.dataset.widget;
    const clickedWidget = this.widgets.find(el => el.name === widget);
    clickedWidget.clicked = true;
  }

}