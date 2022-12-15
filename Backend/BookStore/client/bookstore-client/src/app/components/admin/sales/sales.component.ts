import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ISalesResponse } from 'src/app/interfaces/sales/ISalesDtos';
import { SalesService } from 'src/app/services/sales.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent implements OnInit {
  //#endregion

  sales: ISalesResponse[] = [];

  constructor(
    private _salesService: SalesService,
    private _toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this._salesService.GetAllSales().subscribe((res) => {
      this.sales = res;
    });
  }
}
