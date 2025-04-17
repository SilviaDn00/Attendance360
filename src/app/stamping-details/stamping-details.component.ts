import { Component, inject, Input, OnInit } from '@angular/core';
import { StampService } from '../employee-area/services/stamp.service';
import { IEnrichedStamp } from '../models/IEnrichedStamp';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-stamping-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './stamping-details.component.html',
  styleUrl: './stamping-details.component.scss'
})
export class StampingDetailsComponent implements OnInit {

  public id: string | null = null;
  public username: string | null = null;

  private _stampService = inject(StampService);
  private _route = inject(ActivatedRoute);

  public stamp!: IEnrichedStamp;

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.username = this._route.snapshot.queryParamMap.get('username');
      this.loadData();
    });
  }

  private loadData(): void {
    if (!this.id) return;

    console.log("username:", this.username);   

    this._stampService.GetStampById(this.id).subscribe(stamp => {
      this.stamp = stamp;
    });
  }
}
