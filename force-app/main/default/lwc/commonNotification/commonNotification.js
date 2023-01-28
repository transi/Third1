import { LightningElement,api } from 'lwc';
import LightningConfirm from 'lightning/confirm';
import LightningPrompt from 'lightning/prompt';
import LightningAlert from 'lightning/alert';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class CommonNotification extends LightningElement {    
    @api notificationType;
    @api message;
    @api variant;
    @api header;
    @api colorTheme;
    @api value;
    @api isCallerFlow=false;

    connectedCallback()
    {
        //If Flow then show modal when screen is shown
        if(this.isCallerFlow==true)
        {
            this.showNotification();
        }
    }
    showNotification()
    {
        if(this.notificationType=='Confirm')
        {
            this.handleConfirm();
        }
        else if(this.notificationType=='Prompt')
        {
            this.handlePrompt();
        }
        else
        {
            this.handleAlert();
        }
    }

    @api
    notify(type, message,variant,header,theme) {
        this.notificationType = type;
        this.message = message;
        this.variant=variant;
        this.header=header;
        this.colorTheme = theme;
        this.showNotification();
    }
    handleAlert(){
        LightningAlert.open({
            message: this.message,
            theme: this.colorTheme, 
            label: this.header, 
            variant: this.variant,
            }).then((result) => {
                var navigationEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(navigationEvent);
            });
    }
    handlePrompt(){
        LightningPrompt.open({ 
                message: this.message,
                theme: this.colorTheme, 
                label: this.header, 
                variant: this.variant,
                defaultValue: '', 
        }).then((result) => {
            this.value=result;
            const selectedEvent = new CustomEvent('selection', { detail: result });
            // Dispatches the event
            this.dispatchEvent(selectedEvent);
    
            const attributeChangeEvent = new FlowAttributeChangeEvent(
                'value',result);
            this.dispatchEvent(attributeChangeEvent);
            
            var navigationEvent = new FlowNavigationNextEvent();
            this.dispatchEvent(navigationEvent);
        });
    }

    handleConfirm(){
            LightningConfirm.open({
                message: this.message,
                theme: this.colorTheme, 
                label: this.header, 
                variant: this.variant,
            }).then((result) => {
                this.value=result;
                const selectedEvent = new CustomEvent('selection', { detail: result });
                // Dispatches the event
                this.dispatchEvent(selectedEvent);

                const attributeChangeEvent = new FlowAttributeChangeEvent(
                    'value',result);
                this.dispatchEvent(attributeChangeEvent);

                var navigationEvent = new FlowNavigationNextEvent();
                this.dispatchEvent(navigationEvent);
            });
    }
}