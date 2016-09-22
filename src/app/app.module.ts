import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {NotesComponent, NoteComponent, AddButtonComponent} from './notes';
import {notes} from './notes/reducers/notes.reducer';
import {NotesEffectsService} from './notes/services/notes.effects.service';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {NotesDataService} from "./notes/services/notes.data.service";
import {Draggable} from './shared/draggable'

@NgModule({
    declarations: [
        AppComponent,
        NotesComponent,
        NoteComponent,
        AddButtonComponent,
        Draggable
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        EffectsModule.run(NotesEffectsService),
        StoreModule.provideStore({notes}, {notes:[]})
    ],
    providers: [NotesDataService],
    bootstrap: [AppComponent]
})

export class AppModule {}
