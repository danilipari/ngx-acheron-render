import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AcheronService } from './acheron.service';

@Component({
  selector: 'lib-acheron',
  templateUrl: './acheron.component.html',
  styleUrls: ['./acheron.component.scss']
})
export class AcheronComponent implements OnInit {

  form_load: boolean = false;
  error: any | null = null;
  testing: boolean = false;
  name_form: string = "";
  checkFormFields: boolean = false;
  forms: any[] = [];
  actions: any[] = [];

  public version : number = 1;
  @Output() public emitVersion = new EventEmitter<any>();
  @Input() public initWorkflow!: number;

  constructor(private acheronService: AcheronService) {}

  ngOnInit(): void {
    localStorage.getItem('-t-s-') ? this.testing = true : this.testing = false;
    this.emitVersion.emit(this.version);

    /* this.acheronService.getForm(27).subscribe((data: any) => { */
    this.acheronService.getAcheron(2).subscribe((data: any) => {
      console.log(data);
      this.form_load = true;
      this.forms = data.forms;
      this.actions = data.actions;
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * @author Dani Lipari
   * @description Check all values and validation of forms
   * @param forms Array of forms
   * @returns {Boolean} - Array of forms Mapped with all values and validations visible
   */
  dataExitPreview(forms: Array<any> = this.forms): Array<any> {
    const exitData = forms.map((item: any) => ({
      id: item.id,
      uuid: item.uuid,
      uuidRef: item.uuidRef,
      inputType: item.inputType,
      validation: item.validation,
      value: item.value,
      childrenRef: item.childrenRef,
      touched: item.touched,
      enabled: item.enabled,
      required: item.required,
      visible: item.visible,
    }));
    return exitData;
  }

  /**
   * @author Dani Lipari
   * @description Check if value is required and if it is empty
   * @param {Object} element - form element
   * @returns {Boolean} - true if required and empty, false otherwise
   */
  requiredCheck(element: any): boolean {
    return !!(element.required && element.value.length === 0);
  }

  /**
   * @author Dani Lipari
   * @description Checbox selected, need to found other Referred element
   * @param element CheckBox element
   * @returns {*} - function set on Referred element their "enabled" key
   */
  checkRefChange(element: any): void {
    const refsArray = element.childrenRef.map((cR: any) => cR.uuidRef);
    this.forms = this.forms.map((mF: any) => ({
      ...mF,
      enabled: refsArray.includes(mF.uuidRef) ? element.value : mF.enabled,
      required: refsArray.includes(mF.uuidRef) ? element.value : mF.required,
      value: refsArray.includes(mF.uuidRef) ? '' : mF.value,
    }));
    this.actions = this.actions.map((mA: any) => ({
      ...mA,
      enabled: refsArray.includes(mA.uuidRef) ? element.value : mA.enabled,
      required: refsArray.includes(mA.uuidRef) ? element.value : mA.required,
      value: refsArray.includes(mA.uuidRef) ? '' : mA.value,
    }));
    console.log(element, 'checkboxChange', this.forms, this.actions);
  }

  /**
   * @author Dani Lipari
   * @description Function responsible for redirecting to the specified url or some action
   * @param {Number} index - index of form element
   * @param {String} href - href to redirect
   * @returns {none} - without return
   */
  actionF(index: number): void {
    const href = this.actions[index]?.href;
    console.log(`action-${index}: ${href}`);

    this.acheronService.getForm(28).subscribe((data: any) => {
      console.log(data);
      this.form_load = true;
      this.forms = data.forms;
      this.actions = data.actions;
      this.checkFormFields = false;
    }, (error) => {
      console.log(error);
    });
  }

  /**
   * @author Dani Lipari
   * @description Same method as "cloneStructure()" in ES6, but without the need of a dependency
   * @param {any} element - elemento to 'clean'
   * @returns {any} - returns new array cleaned
   */
  cleanProxy(element: any): any {
    return JSON.parse(JSON.stringify(element));
  }

  /**
   * @author Dani Lipari
   * @description Convert string into pattern valid as Regex pattern
   * @param {String} s - String regex to convert
   * @param {String} g - value
   * @returns {Boolean} - true if valid, false otherwise
   */
  stringToRegex(s: any, m = 'g'): any {
    return (m = s.match(/^([\/~@;%#'])(.*?)\1([gimsuy]*)$/)) ? new RegExp(m[2], m[3].split('').filter((i, p, s) => s.indexOf(i) === p).join('')) : new RegExp(s);
  }

  /**
   * @author Dani Lipari
   * @description On click set that form field is touched
   * @param {Number} index - regex to match
   * @returns {none} - without return
   */
  setTouched(index: number): void {
    if (!Object.keys(this.forms[index]).includes('touched') && this.forms[index])
      this.forms[index].touched = true;
  }

  /**
   * @author Dani Lipari
   * @description Check if value is valid with regex
   * @param {String} regex - regex to check
   * @param {String} value - value to check
   * @returns {Boolean} - true if valid, false otherwise
   */
  checkRegex(regex: any, value: any): boolean {
    if (value?.length !== 0) {
      return new RegExp(this.stringToRegex(regex)).test(value);
    } else {
      return false;
    }
  }

  /**
   * @author Dani Lipari
   * @description Check if all form fields are valid
   * @param {Array} form - form to check
   * @returns {Boolean} - true if all valid, false otherwise
   */
  checkValidityForm(form = this.cleanProxy(this.forms)): void {
    const control = form.reduce((acc: any[], item: any, index: number) => {
      let counter = 0;
      if (item.validation !== '') {
        if (!this.checkRegex(item.validation, item.value)) {
          counter++;
        }
      }
      if (item.required) {
        if (item.value.length === 0) {
          counter++;
        }
      }
      acc = [...acc, counter];

      return acc;
    }, []).every((field: any) => field === 0);

    if (control === false) {
      form.map((upItem: any, index: number) => (this.setTouched(index)));
    }

    console.debug('checkValidityForm', control, form);

    this.checkFormFields = !control;
    return control;
  }

}
