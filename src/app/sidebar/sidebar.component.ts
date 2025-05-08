import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PathwayService } from '../pathway-service.service';

// Interface to represent each Pathway response
interface PathwayDetails {
  BlandAIPathwayId: string;
  Version: number;
  PathwayName: string;
  PathwayJson: string;
}

@Component({
  selector: 'app-sidebar',
  standalone:false,
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  folderTree: any[] = [];  // Array to hold the final folder structure

  constructor(private http: HttpClient, private pathwayService: PathwayService) {}

  ngOnInit(): void {
    const apiUrl = 'https://localhost:7191/GetPathwayDetails'; 

    // Fetching pathway details from the API
    this.http.get<PathwayDetails[]>(apiUrl).subscribe({
      next: response => {
        const folderMap = new Map<string, any[]>();
        console.log(response);
        
        // Process each item to organize it into folders
        response.forEach(item => {
          const folder = item.PathwayName;  // Use PathwayName as the folder name
          const child = {
            BlandAIPathwayId: item.BlandAIPathwayId,
            Version: item.Version,
            PathwayJson: item.PathwayJson
          };

          if (!folderMap.has(folder)) {
            folderMap.set(folder, []);
          }

          folderMap.get(folder)!.push(child);
        });

        // Map folder structure
        this.folderTree = Array.from(folderMap.entries()).map(([folderName, children]) => ({
          name: folderName,
          expanded: false,
          children: children
        }));
      },
      error: err => {
        console.error('Failed to fetch pathway details', err);
      }
    });
  }

  toggle(folder: any): void {
    folder.expanded = !folder.expanded;
  }

  onFolderClick(pathwayDetail: any): void {
    console.log('Clicked on Pathway:', pathwayDetail);
    this.pathwayService.sendSelectedPathway(pathwayDetail);
  }
}
