import { Component } from '@angular/core';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name: string;
  seva: number | undefined;
  sevas: {
    id: number;
    name: string;
    payment: number;
  }[] = [
      {
        id: 1,
        name: "Seva 1 - 101",
        payment: 101
      },
      {
        id: 2,
        name: "Seva 2 - 501",
        payment: 501
      },
      {
        id: 3,
        name: "Seva 3 - 1001",
        payment: 1001
      }
    ]

  constructor() {
    this.name = "";
    this.seva = undefined;
  }

  onSubmit() {
    const docDefinition = {
      content: [
        {
          text: `Payment receipt - ${this.name}`,
          style: 'header'
        },
        {
          text: `Received an amount of INR ${this.sevas.find(seva => seva.id === this.seva)?.payment} with thanks from ${this.name}`,
          style: 'subheader'
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 15
        }
      }

    }

    pdfMake.createPdf(docDefinition).download();
  }

}
