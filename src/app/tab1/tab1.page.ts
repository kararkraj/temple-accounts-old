import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Directory, Filesystem, WriteFileResult } from '@capacitor/filesystem';
import { FileOpener, FileOpenerOptions } from '@capacitor-community/file-opener';
import { Platform } from '@ionic/angular';

import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DataService } from '../services/data.service';
import { Entry } from '../interfaces/entry.interface';
import { NgForm } from '@angular/forms';
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
    ];

  constructor(
    private authService: AuthService,
    public platform: Platform,
    private dataService: DataService
  ) {
    this.name = "";
    this.seva = undefined;
  }

  onSubmit(form: NgForm) {
    if (!this.name || !this.seva) {
      return;
    }
    const entry: Entry = {
      name: this.name,
      payment: this.sevas.find(seva => seva.id === this.seva)?.payment as number,
      sevaName: this.sevas.find(seva => seva.id === this.seva)?.name as string
    }
    this.dataService.addEntry(entry).subscribe(res => {
      this.downloadPDFReceipt().then(res => form.reset());
    });
  }

  downloadPDFReceipt() {
    return new Promise((resolve, reject) => {
      if (this.platform.is('desktop')) {
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

  getDocDefinition() {
    return {
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
  }

  logout() {
    this.authService.openConfirmLogoutAlert();
  }

}
