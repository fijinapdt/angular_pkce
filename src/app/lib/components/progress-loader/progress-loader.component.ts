import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import {
  ProgressLoaderService,
  LoaderState,
} from '../../service/progress-loader.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-progress-loader',
  templateUrl: 'progress-loader.component.html',
  styleUrls: ['progress-loader.component.scss'],
})
export class ProgressLoaderComponent implements OnInit, OnDestroy {
  show = false;
  private subscription!: Subscription;

  constructor(
    private progressLoader: ProgressLoaderService,
    private _cdRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.subscription = this.progressLoader.loaderState.subscribe(
      (state: LoaderState) => {
        this.show = state.show;
        this._cdRef.markForCheck();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
