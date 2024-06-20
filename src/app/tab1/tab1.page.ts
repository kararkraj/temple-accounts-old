import { Component } from '@angular/core';
import { Directory, Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { Platform } from '@ionic/angular';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataService } from '../services/data.service';
import { Entry } from '../interfaces/entry.interface';
import { NgForm } from '@angular/forms';
import { Storage } from '@ionic/storage-angular';
import { CharietyType, charietyTypes } from './charietyType.interface';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  name: string;
  title: string;
  sevaId: number | undefined;
  sevas: CharietyType[] = charietyTypes;

  constructor(
    public platform: Platform,
    private dataService: DataService,
    private storage: Storage
  ) {
    this.name = "";
    this.title = "";
    this.sevaId = undefined;
  }

  async onSubmit(form: NgForm) {
    if (!this.name || !this.sevaId) {
      return;
    }
    const id = await this.storage.get('lastStoredId') + 1;
    const { payment, name } = this.sevas.find(seva => seva.id === this.sevaId) as CharietyType;
    const entry: Entry = {
      id,
      name: this.name,
      payment,
      sevaName: name
    }
    this.dataService.addEntry(entry).subscribe(res => {
      this.downloadPDFReceipt().then(res => form.reset());
    });
  }

  downloadPDFReceipt() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('desktop') || this.platform.is('mobileweb')) {
        pdfMake.createPdf(this.getDocDefinition()).download(`${this.name}`);
        resolve(true);
      } else {
        pdfMake.createPdf(this.getDocDefinition()).getDataUrl((res: string) => {
          Filesystem.writeFile({
            path: `${this.name}.pdf`,
            data: res,
            directory: Directory.Documents
          }).then((res: WriteFileResult) => {
            const fileOpenerOptions: FileOpenerOptions = {
              filePath: res.uri,
              contentType: 'application/pdf',
              openWithDefault: true,
            };
            FileOpener.open(fileOpenerOptions)
              .then(res => resolve(true))
              .catch(e => {
                console.log('Error opening file', e);
                reject(e);
              });
          });
        });
      }
    });
  }

  getDocDefinition(): TDocumentDefinitions {
    const { name: sevaName, payment, paymentInWords } = this.sevas.find(seva => seva.id === this.sevaId) as CharietyType;
    return {
      header: {
        columns: [
          {
            text: 'Receipt No: 1',
            margin: [10, 10, 0, 0],
          },
          {
            text: `Date: ${getCurrentDate()}`,
            margin: [0, 10, 10, 0],
            alignment: 'right'
          }
        ]
      },
      content: [
        {
          text: ['Sri Chamundeshwari temple\n', 'Chamundi Hill, Mysuru, Karnataka 570010'],
          margin: [0, 0, 0, 0],
          alignment: 'center',
          style: 'header'
        },
        {
          text: `Received from Sri. ${this.name} a sum of Rs. ${payment} (Rs. ${paymentInWords}) towards ${sevaName}.`,
          style: 'subheader',
          margin: [0, 20, 0, 0]
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true
        },
        subheader: {
          fontSize: 14
        }
      },
      footer: {
        columns: [
          {
            text: 'For committee',
            margin: [20, -75, 0, 0],
            alignment: 'left'
          }
        ]
      }
    }
  }

}

function getCurrentDate() {
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm: number | string = today.getMonth() + 1; // Months start at 0!
  let dd: number | string = today.getDate();

  if (dd < 10) dd = '0' + dd;
  if (mm < 10) mm = '0' + mm;

  return dd + '-' + mm + '-' + yyyy;
}