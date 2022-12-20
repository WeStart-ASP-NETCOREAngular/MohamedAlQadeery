import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ISalesResponse } from 'src/app/interfaces/sales/ISalesDtos';
import { SalesService } from 'src/app/services/sales.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {
  constructor(private _salesService: SalesService) {}
  orders$: Observable<ISalesResponse[]>;
  imagesUrl = `${environment.baseURL}/images/thumbs/med`;

  ngOnInit(): void {
    this.orders$ = this._salesService.GetUserOrders();
  }
}
