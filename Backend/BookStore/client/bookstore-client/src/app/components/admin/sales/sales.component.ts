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

  HandleUpdateStatus(saleId: number, status: number) {
    this._salesService.UpdateSaleStatus(saleId, status).subscribe({
      next: (res) => {
        let sale = this.sales.find((s) => s.id == saleId)!;
        sale.status = res.status;
        this._toastr.success('تم تحديث حالة الطلب بنجاح', 'تحديث حالة الطلب');
      },

      error: (err) => {
        console.log(err);
      },
    });
  }
}
