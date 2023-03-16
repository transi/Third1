import {
    LightningElement,
    track
} from 'lwc';

const columns = [{
        label: 'Label',
        fieldName: 'name',
        cellAttributes: {
            class: {
                fieldName: `format`
            },
            alignment: `left`
        }
    },
    {
        label: 'Phone',
        fieldName: 'phone',
        type: 'phone'
    },
    {
        label: 'Balance',
        fieldName: 'amount',
        type: 'currency'
    }
];

const recordMetadata = {
    name: 'name',
    email: 'email',
    website: 'url',
    amount: 'currency',
    phone: 'phoneNumber',
    closeAt: 'dateInFuture',
};

let amountOfRecords = 10;

export default class FormatTable extends LightningElement {
    @track data = [];
    @track columns = columns;


    async connectedCallback() {
        const data = await this.fetchDataHelper({
            amountOfRecords
        });

        //Generate Dynamic Values
        data.forEach(ele => {
            ele.format = ele.amount > 200 ? 'slds-text-color_error' : 'slds-text-color_success';
        });
        this.data = data;
    }

    fetchDataHelper({ amountOfRecords }) {
      const recordMetadata = {
        name: "name",
        email: "email",
        website: "url",
        amount: "currency",
        phone: "phoneNumber",
        closeAt: "dateInFuture"
      };

      return fetch("https://data-faker.herokuapp.com/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        },
        body: JSON.stringify({
          amountOfRecords,
          recordMetadata
        })
      }).then(response => response.json());
    }
}