import '@testing-library/jest-dom';
import configureStore from 'redux-mock-store'; //ES6 modules
import thunk from 'redux-thunk';
import {
  startLoadingNotes,
  startNewNote,
  startSaveNote,
  startUploading,
} from '../../actions/notes';
import { db } from '../../firebase/firebase-config';
import { fileUpload } from '../../helpers/fileUpload';
import { types } from '../../types/types';

jest.mock('../../helpers/fileUpload', () => ({
  fileUpload: jest.fn(() => {
    return 'https://hola-mundo.com/cosa1.jpg';
  }),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
  auth: {
    uid: 'TESTING',
  },
  notes: {
    notes: [],
    active: {
      id: 'hMb2pvoIaAtkga078y0W',
      title: 'hola que tal',
      body: 'mundo',
    },
  },
};

let store = mockStore(initState);

describe('Pruebas con las acciones de note', () => {
  beforeEach(() => {
    store = mockStore(initState);
  });
  test('Debe de crear una nueva nota startNewNote', async () => {
    await store.dispatch(startNewNote());

    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: types.notesActive,
      payload: {
        id: expect.any(String),
        title: '',
        body: '',
        date: expect.any(Number),
      },
    });
    expect(actions[1]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Object),
    });
    const docId = actions[0].payload.id;
    await db.doc(`TESTING/journal/notes/${docId}`).delete();
  });

  test('startNewLoad debe de cargar todas las notas', async () => {
    await store.dispatch(startLoadingNotes('TESTING'));
    const actions = store.getActions();
    const expected = {
      id: expect.any(String),
      title: expect.any(String),
      body: expect.any(String),
      date: expect.any(Number),
    };
    expect(actions[0]).toEqual({
      type: types.notesLoad,
      payload: expect.any(Array),
    });
    expect(actions[0].payload[0]).toMatchObject(expected);
  });

  test('StartSaveNote debe actualizar la nota', async () => {
    const note = {
      id: 'hMb2pvoIaAtkga078y0W',
      title: 'titulo',
      body: 'body',
    };
    await store.dispatch(startSaveNote(note));

    const actions = store.getActions();
    expect(actions[0].type).toBe(types.notesUpdated);

    const docRef = await db.doc(`TESTING/journal/notes/${note.id}`).get();
    expect(docRef.data().title).toBe(note.title);
  });

  test('startUploading debe de actualizar el url de entry', async () => {
    const file = new File([], 'foto.png');
    await store.dispatch(startUploading(file));
    const docRef = await db
      .doc(`/TESTING/journal/notes/hMb2pvoIaAtkga078y0W`)
      .get();
    expect(docRef.data().url).toBe('https://hola-mundo.com/cosa1.jpg');
  });
});
