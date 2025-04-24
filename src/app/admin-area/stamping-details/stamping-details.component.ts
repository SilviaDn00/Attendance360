import { Component, inject, OnInit } from '@angular/core';
import { IEnrichedStamp } from '../../shared/models/enrichedStamp.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { EnrichedStampService } from '../services/enriched-stamp.service';

@Component({
  selector: 'app-stamping-details',
  imports: [CommonModule, RouterLink],
  templateUrl: './stamping-details.component.html',
  styleUrl: './stamping-details.component.scss'
})
export class StampingDetailsComponent implements OnInit {

  public id: string | null = null;
  public username: string | null = null;

  private _enrichedStampService = inject(EnrichedStampService);


  private _route = inject(ActivatedRoute);

  public stamp!: IEnrichedStamp;

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.id = params.get('id');
      this.username = params.get('username');

      this.loadData();
    });
  }

  private loadData(): void {
    if (!this.id) return;
    this._enrichedStampService.getEnrichedStampById(this.id).subscribe(stamp => {
      this.stamp = stamp;
    });
  }

}
