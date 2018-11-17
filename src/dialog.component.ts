import { Component } from '@angular/core';
import { Observable } from 'rxjs';

interface DialogMessage {
  DialogMessageClass: string;
  DialogMessage: string;
  Guid: string;
}

@Component({
  selector: 'easy-dialog',
  templateUrl: './dialog.component.html'
})
export class DialogComponent {
  DialogMessageList: DialogMessage[] = [];

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
   * AlertMethod
   */
  public AlertMethod(): void {}

  /**
   *
   * @param message
   * @param type success ,DialogMessage ,atention ,neutro
   * @param time time in seconds,for default is 1000
   */
  public Dialog(message: string, type: string, time: number = 1000): void {
    var guid = this.Guid();
    var messageColor = '';
    switch (type) {
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
    debugger;

    var index = this.DialogMessageList.findIndex(
      x => x.Guid == dialogMessage.Guid
    );
    this.DialogMessageList.splice(index, 1);
  }
  private fadeOutEffect(fadeTarget, id): void {
    new Observable(obs => {
      var fadeEffect = setInterval(function() {
        try {
          if (!fadeTarget.parentElement.style.opacity) {
            fadeTarget.parentElement.style.opacity = 1;
          }
          if (fadeTarget.parentElement.style.opacity > 0) {
            fadeTarget.parentElement.style.opacity -= 0.1;
          } else {
            clearInterval(fadeEffect);
            obs.next(id);
          }
        } catch {
          clearInterval(fadeEffect);
        }
      }, 200);
    }).subscribe((x: string) => {
      var index = this.DialogMessageList.findIndex(x => x.Guid == id);
      this.DialogMessageList.splice(index, 1);
    });
  }
}
