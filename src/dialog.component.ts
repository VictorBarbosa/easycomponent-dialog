import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import {
  trigger,
  transition,
  animate,
  style,
  keyframes
} from '@angular/animations';

interface DialogMessage {
  DialogMessageClass: string;
  DialogMessage: string;
  Guid: string;
}

@Component({
  selector: 'easy-dialog',
  templateUrl: './dialog.component.html',
   animations: [
    trigger('hidding', [
      transition(
        '*=> void',
        animate(
          '300ms',
          keyframes([
            style({ position: 'relative', left: '-30px', opacity: '1' }),
            style({ position: 'relative', left: '0px', opacity: '0.7' }),
            style({ position: 'relative', left: '10px', opacity: '0.5' }),
            style({ position: 'relative', left: '50px', opacity: '0.3' }),
            style({ position: 'relative', left: '100px', opacity: '0' })
          ])
        )
      ),
      transition(
        'void=> *',
        animate(
          '300ms',
          keyframes([
            style({ position: 'relative', left: '100px', opacity: '1'  }),
            style({ position: 'relative', left: '50px', opacity:  '0.7' }),
            style({ position: 'relative', left: '10px', opacity:  '0.5' }),
            style({ position: 'relative', left: '0px', opacity:   '0.3'  }),
            style({ position: 'relative', left: '-30px', opacity: '0' }),
          ])
        )
      )
    ])
  ]
})
export class DialogComponent {
  DialogMessageList: DialogMessage[] = [];
  hidding = '';
  private SetTimeOut(node: any, timeToClose: number): void {
    setTimeout(
      (ev: any) => {
        this.fadeOutEffect(document.getElementById(ev), ev);
      },
      timeToClose,
      node
    );
  }
  /**
   *
   * @param message
   * @param type success ,error ,attention ,neutral
   * @param time time in seconds,for default is 1000
   */
  public Dialog(message: string, type: string, time: number = 1000): void {
    var guid = this.Guid();
    var messageColor = '';
    switch (type.toLocaleLowerCase()) {
      case 'attention':
        messageColor = 'Alert-Amarelo ';
        break;
      case 'error':
        messageColor = 'Alert-Vermelho';
        break;
      case 'success':
        messageColor = 'Alert-Verde';
        break;
      case 'neutral':
        messageColor = 'Alert-Azul';
        break;

      default:
        console.error(
          'select the message type : success ,error ,attention ,neutral'
        );
        return;
        break;
    }

    new Observable(x =>
      x.next({
        DialogMessageClass: messageColor,
        DialogMessage: message,
        Guid: guid
      })
    ).subscribe((d: DialogMessage) => {
      this.DialogMessageList.push(d);
      this.SetTimeOut(d.Guid, time);
    });
  }

  private Guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }
  Close(dialogMessage: DialogMessage) {
    this.DialogMessageList = this.DialogMessageList.filter(
      x => x.Guid != dialogMessage.Guid
    );
  }
  private fadeOutEffect(fadeTarget, id): void {
    new Observable(obs => {
      obs.next(id);
    }).subscribe((x: string) => {
        this.DialogMessageList = this.DialogMessageList.filter((x:DialogMessage) => {
        return x.Guid != id;
      });
    });
  }
}
