import { Component, ElementRef, ViewChild, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import JSONEditor from 'jsoneditor';
import 'jsoneditor/dist/jsoneditor.css';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { PathwayService } from '../pathway-service.service';
import path from 'path';

@Component({
  selector: 'app-jsoneditors',
  standalone: false,
  templateUrl: './jsoneditors.component.html',
  styleUrl: './jsoneditors.component.scss'
})
export class JsoneditorsComponent {
  
  @ViewChild('editorContainer', { static: false }) editorContainer!: ElementRef;
  constructor(@Inject(PLATFORM_ID) private platformId: Object,private pathwayService : PathwayService) {}

  items: string[] = [];
  selectedItem: string | null = null;
  editor: JSONEditor | undefined;
  pathwayVersion:number  = 0;
  ngOnInit(): void {
    this.pathwayService.selectedPathway$.subscribe(pathway => {
      if (pathway) {
        try {
          console.log("oninit",pathway.children);
          
          const parsed = this.parseJsonSafely(pathway.children[0].PathwayJson);
          this.editor?.set(parsed);
          this.selectedItem = pathway.name || 'Unnamed Pathway';
          this.pathwayVersion = pathway.children[0].Version;
          console.log('Loaded Pathway:', parsed);
        } catch (e) {
          console.error('Failed to load pathway into editor:', e);
        }
      } else {
        console.warn('Pathway or PathwayJson is undefined');
      }
    });
  }
  
  
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      import('jsoneditor').then(JSONEditorModule => {
        this.editor = new JSONEditorModule.default(this.editorContainer.nativeElement, {
          mode: 'tree',
          modes: ['code', 'form', 'text', 'tree', 'view', 'preview']
        });
  
        // Handle data if already emitted before editor initialized
        // this.pathwayService.selectedPathway$.subscribe(pathway => {
        //   if (pathway) {
        //     console.log("hii",pathway[0].PathwayJson);
            
        //     const jsonData = this.parseJsonSafely(pathway[0].PathwayJson);
        //     if (jsonData) {
        //       this.editor!.set(jsonData);
        //     }
        //   }
        // });
      });
    }
  }
  
  private parseJsonSafely(jsonString: string): any {
    try {
      console.log(jsonString);
      
      const firstParse = JSON.parse(jsonString);
      return typeof firstParse === 'string' ? JSON.parse(firstParse) : firstParse;
    } catch (e) {
      console.error('Error parsing double-encoded PathwayJson:', e);
      return {};
    }
  }
  
  
  
  

}
