import {Component} from 'angular2/core';

@Component({
    selector: 'contact-detail',
    template: `
        <p>{{ classified.contact.name }}</p>
        <p>{{ classified.contact.phone }}</p>
        <p>{{ classified.contact.email }}</p>
    `,
    inputs: ['classified']
})

export class ContactDetail {}