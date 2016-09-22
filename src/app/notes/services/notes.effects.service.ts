import {Injectable} from '@angular/core';
import {NotesDataService} from './notes.data.service';
import {Note, AppState} from '../../app.model';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/withLatestFrom';
import {Actions, Effect} from '@ngrx/effects'
import {Store} from '@ngrx/store'

@Injectable()
export class NotesEffectsService {
  constructor(private notesDataService: NotesDataService, private actions$: Actions, private _store: Store<AppState>) {
  }

  @Effect()
  update$ = this.actions$
    .ofType('UPDATE_NOTE_TEXT', 'UPDATE_NOTE_POSITION', 'ADD_NOTE')
    .withLatestFrom(this._store.select('notes'))
    .mergeMap(([ action, notes ]) => {
      return Observable.from(notes)
    })
    .filter(note => {
      return note.dirty === true;
    })
    .switchMap((nodeToUpdate) => {
        return this.notesDataService.addOrUpdateNote(nodeToUpdate)
          .map((responseNote: Note) => {
            return ({type: "UPDATE_NOTE_FROM_SERVER", payload: {note: responseNote}})
          })
          .catch(() => Observable.of({type: "UPDATE_FAILED"}))
      }
    );

  @Effect()
  init$ = this.actions$
    .ofType('INIT_NOTES')
    .switchMap(() => {
        return this.notesDataService.getNotes()
          .mergeMap(notes => Observable.from(notes))
          .map(res => {
            return ({type: "ADD_NOTE_FROM_SERVER", payload: res})
          })
          .catch(() => Observable.of({type: "FETCH_FAILED"}))
      }
    )
}
