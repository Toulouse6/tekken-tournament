import { bootstrapApplication } from '@angular/platform-browser';
import { ParentComponent } from './app/components/parent/parent.component';

bootstrapApplication(ParentComponent).catch((err) => console.error(err));
