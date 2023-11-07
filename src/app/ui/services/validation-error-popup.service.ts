import { Injectable } from '@angular/core';
import {createPopper, Instance} from "@popperjs/core";

@Injectable({
  providedIn: 'root'
})
export class ValidationErrorPopupService {

  popupErrorMsg : popupErrorMsg = { errorString : "You shouldn't be seeing this."};

  constructor() { }

  initErrorPopup(obj : HTMLElement, popup : HTMLElement, errorMsg : String) {
    console.log(obj.id);
    let popperInstance : Instance;
    const showEvents = ['mouseenter'];
    const hideEvents = ['mouseleave'];

    popperInstance = createPopper(obj, popup, {
      placement: 'right'
    });


    showEvents.forEach((event) => {
      obj.addEventListener(event, () => {
        this.popupErrorMsg.errorString = errorMsg;
        showErrorPopup();
      });
    });
    hideEvents.forEach((event) => {
      obj.addEventListener(event, () => {
        hide();
      });
    });

    function showErrorPopup() {
      popup.setAttribute('data-show', '');

      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          {
            name: 'offset',
            options: {
              offset: [0, 7],
            },
          },
          { name: 'eventListeners', enabled: true },
          { name: 'flip', options: {fallbackPlacements: ['top-end']} }
        ],
      }));

      popperInstance.update();
    }

    function hide() {
      popup.removeAttribute('data-show');

      popperInstance.setOptions((options) => ({
        ...options,
        modifiers: [
          { name: 'eventListeners', enabled: false }
        ],
      }));
    }
  }


}

export interface popupErrorMsg {
  errorString: String;
}
