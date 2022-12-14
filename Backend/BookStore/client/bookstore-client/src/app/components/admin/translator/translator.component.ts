import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ITranslatorResponse } from 'src/app/interfaces/translator/TranslatorDtos';
import { TranslatorService } from 'src/app/services/translator.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.component.html',
  styleUrls: ['./translator.component.css'],
})
export class TranslatorComponent implements OnInit {
  formType = 'create';
  buttonLabel = 'انشاء';
  translatorFormGroup: FormGroup;
  translatorNameInput: FormControl;
  translatorId: number;
  translators: ITranslatorResponse[] = [];

  constructor(
    private _translatorService: TranslatorService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.translatorNameInput = new FormControl('', [Validators.required]);
    this.translatorFormGroup = new FormGroup({
      name: this.translatorNameInput,
    });

    this._translatorService.GetAllTranslators().subscribe((res) => {
      this.translators = res;
    });
  }

  HandleOnSubmit() {
    console.log(this.translatorFormGroup.value);
    if (this.formType == 'create') {
      this.CreateTranslator();
    } else {
      this.UpdateTranslator();
    }

    this.ResetForm();
  }

  HandleOnEdit(translatorId: number) {
    this._translatorService.GetTranslatorById(translatorId).subscribe((res) => {
      this.formType = 'update';
      this.buttonLabel = 'تحديث';
      this.translatorNameInput.setValue(res.name);
      this.translatorId = res.id;
    });
  }

  private UpdateTranslator() {
    this._translatorService
      .UpdateTranslator(this.translatorFormGroup.value, this.translatorId)
      .subscribe((res) => {
        let translator = this.translators.find((c) => c.id == res.id)!;
        translator.name = res.name;
        this._toastr.success(
          `تم تحديث المترجم : ${translator.name}, بنجاح`,
          'تمت العملية'
        );
      });
  }

  private CreateTranslator() {
    this._translatorService
      .CreateTranslator(this.translatorFormGroup.value)
      .subscribe((res) => {
        this.translators.push(res);
        this._toastr.success(
          `تم اضافة المترجم : ${res.name}, بنجاح`,
          'تمت العملية'
        );
      });
  }

  HandleOnDelete(translatorId: number) {
    this._translatorService.DeleteTranslator(translatorId).subscribe({
      next: () => {
        this._toastr.success('تم حذف المترجم بنجاح', 'تمت العملية');
        this.translators = this.translators.filter((c) => c.id != translatorId);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  private ResetForm() {
    this.formType = 'create';
    this.buttonLabel = 'انشاء';

    this.translatorFormGroup.reset();
  }
}
