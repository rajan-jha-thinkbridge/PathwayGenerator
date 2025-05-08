// shared/pathway.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PathwayService {
  private selectedPathwaySource = new BehaviorSubject<any>(null);
  selectedPathway$ = this.selectedPathwaySource.asObservable();

  sendSelectedPathway(pathway: any): void {
  if (pathway) {
    this.selectedPathwaySource.next(pathway);
  }
}

}
