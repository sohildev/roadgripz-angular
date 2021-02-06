import {
  Directive, Optional, ViewContainerRef, ComponentFactoryResolver,
  ComponentRef, Input, Host, OnInit, OnDestroy
} from '@angular/core';
import { NgControl, AbstractControl } from '@angular/forms';
import { ControlErrorComponent } from '../control-error/control-error.component';
import { ControlErrorContainerDirective } from '../directive/control-error-container.directive';
import { FormSubmitDirective } from '../directive/form-submit.directive';
import { merge, EMPTY, Observable } from 'rxjs';
import { VALIDATION_MESSAGES } from '../form-errors';


@Directive({
  selector: '[formControl], [formControlName]'
})
export class ControlErrorsDirective implements OnInit, OnDestroy {

  ref: ComponentRef<ControlErrorComponent>;
  container: ViewContainerRef;
  submit$: Observable<Event>;
  @Input() customErrors = {};

  constructor(
    private vcr: ViewContainerRef,
    private resolver: ComponentFactoryResolver,
    @Optional() controlErrorContainer: ControlErrorContainerDirective,
    @Optional() @Host() private form: FormSubmitDirective,
    private controlDir: NgControl) {
    this.container = controlErrorContainer ? controlErrorContainer.vcr : vcr;
    this.submit$ = this.form ? this.form.submit$ : EMPTY;
  }

  ngOnInit() {
    if (this.control && this.control.valueChanges) {
      merge(
        this.control.valueChanges,
        this.submit$
      ).subscribe((v) => {
        const controlErrors = this.control.errors;
        if (controlErrors) {
          const control_name = this.getFormControlName(this.control);
          // console.log(control_name, controlErrors);
          const firstKey = Object.keys(controlErrors)[0];
          const messages = VALIDATION_MESSAGES[control_name];
          if (messages !== undefined && messages !== null && messages !== '') {
            this.setError(messages[firstKey]);
          }
        } else if (this.ref) {
          this.setError(null);
        }
      });
    }
  }

  getFormControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

  get control() {
    return this.controlDir.control;
  }

  setError(text: string) {
    if (!this.ref) {
      const factory = this.resolver.resolveComponentFactory(ControlErrorComponent);
      this.ref = this.container.createComponent(factory);
    }

    this.ref.instance.text = text;
  }

  ngOnDestroy() { }

}
