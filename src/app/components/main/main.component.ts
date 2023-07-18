import { Component, OnInit } from '@angular/core';
import { DiscogsService } from '../../services/discogs.service';
import { Router } from '@angular/router';
import { CounterService } from '../../services/counter.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  releaseData: any[] = [];
  isDataLoaded: boolean = false;
  hoveredReleaseIndex: number = -1;

  constructor(
    private discogsService: DiscogsService,
    private router: Router,
    private counterService: CounterService
  ) {}

  ngOnInit() {
    if (!this.isDataLoaded) {
      this.getReleaseData();
    }
  }

  getReleaseData() {
    this.discogsService.getLatestReleases().subscribe(
      (data: any) => {
        console.log(data);
        this.releaseData = data.results || [];
        this.isDataLoaded = true;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  goToAlbum(releaseId: string) {
    if (releaseId) {
      this.router.navigateByUrl(`/album/${releaseId}`);
    }
  }

  handleBuyNowClick(release: any) {
    this.counterService.incrementCollectionsCount(); // Incrementa el contador del servicio
    this.router.navigateByUrl(`/profile/collections/${release.id}`);
  }

  handleWishlistClick(release: any) {
    this.counterService.incrementWishlistCount(); // Incrementa el contador del servicio
    this.router.navigateByUrl(`/profile/wishlist/${release.id}`);
  }
}
