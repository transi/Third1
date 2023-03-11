import { LightningElement,track} from 'lwc';

export default class LdtHeaderAction extends LightningElement {

    rawData = [
        { Col1: '1', Col2: 'XXX' },
        { Col1: '2', Col2: 'XXX' },
        { Col1: '3', Col2: 'YYY' },
        { Col1: '4', Col2: 'YYY' },
        { Col1: '5', Col2: 'ZZZ' },
    ];

    @track columns = [
        {
            label: 'Col 1',
            fieldName: 'Col1',
            initialWidth: 100
        },
        {
            label: 'Col 2',
            fieldName: 'Col2',
            actions: [
                { label: 'All', checked: true, name:'all' },
                { label: 'XXX', checked: false, name:'filter_xxx' },
                { label: 'YYY', checked: false, name:'filter_yyy' },
                { label: 'ZZZ', checked: false, name:'filter_zzz' },
            ]
        },
    ];


    @track data = this.rawData;
    @track filter ='all';

    handleHeaderAction(event) {
        const actionName = event.detail.action.name;
        const cols = this.columns;
        const filter = this.filter;

        if (actionName !== filter) {
            this.filter = actionName;
            this.filterCol2();

            //set col action as checked 
            let actions = cols[1].actions;
            actions.forEach((action) => {
                action.checked = action.name === actionName;
            });
            //force header check change
            // this.columns = cols;
            this.columns = JSON.parse(JSON.stringify(cols));
            // eslint-disable-next-line no-console
            console.log(JSON.stringify(this.columns, null, '\t'));
        }
    }

    filterCol2 () {
        const rows = this.rawData;
        const filter = this.filter;
        let filteredRows = rows;
        if (filter !== 'all') {
            filteredRows = rows.filter(function (row) {
                let test = 'filter_'+row.Col2.toLowerCase() === filter;
                return test;
            });
        }
        this.data = filteredRows;
    }

}