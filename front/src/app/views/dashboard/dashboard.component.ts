import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { DashboardChartsData, IChartProps } from './dashboard-charts-data';
import {ProductosService} from '../../Service/productos.service';
import {ProveedoresService} from '../../Service/proveedores.service';
import {StocksService} from '../../Service/stocks.service';
import { IProductos } from 'src/app/Interface/iproductos';
import {IProveedor} from 'src/app/Interface/iproveedor';
import {IStock} from 'src/app/Interface/istock';

interface IUser {
  name: string;
  state: string;
  registered: string;
  country: string;
  usage: number;
  period: string;
  payment: string;
  activity: string;
  avatar: string;
  status: string;
  color: string;
}

@Component({
  templateUrl: 'dashboard.component.html',
  styleUrls: ['dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  productos:IProductos[];
  proveedor:IProveedor[];
  stock:IStock[];
  constructor(private chartsData: DashboardChartsData, private productosServicio:ProductosService, private proveedoresServicio:ProveedoresService, private stocksServicio:StocksService) {
  }

  public users: IUser[] = [
  ];

  public mainChart: IChartProps = {};
  public chart: Array<IChartProps> = [];
  public trafficRadioGroup = new UntypedFormGroup({
    trafficRadio: new UntypedFormControl('Month')
  });

  ngOnInit(): void {
    this.cargalista();
    this.initCharts();
  }

  private cargalista(){
    this.productosServicio.todos().subscribe(
      (data:any)=>{
        this.productos=data;
      }
    );
    this.proveedoresServicio.todos().subscribe(
      (data:any)=>{
        this.proveedor=data;
      }
    );
    this.stocksServicio.todos().subscribe(
      (data:any)=>{
        this.stock=data;
      }
    )
  }

  initCharts(): void {
    this.mainChart = this.chartsData.mainChart;
  }

  setTrafficPeriod(value: string): void {
    this.trafficRadioGroup.setValue({ trafficRadio: value });
    this.chartsData.initMainChart(value);
    this.initCharts();
  }
}
