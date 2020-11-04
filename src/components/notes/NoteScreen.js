import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { activeNote, startDeleting } from '../../actions/notes';
import { useForm } from '../../hooks/useForm';
import { NoteAppbar } from './NoteAppbar';

const NoteScreen = () => {
  const dispatch = useDispatch();
  const { active: note } = useSelector((state) => state.notes);
  const [formValues, handleInputChange, reset] = useForm(note);
  const { body, title, url } = formValues;

  const activeId = useRef(note.id);

  useEffect(() => {
    if (note.id !== activeId.current) {
      reset(note);
      activeId.current = note.id;
    }
  }, [note, reset]);

  useEffect(() => {
    dispatch(activeNote(note.id, { ...formValues }));
  }, [formValues, dispatch]);

  const handleDelete = () => {
    dispatch(startDeleting(note.id));
  };
  return (
    <div className="notes__main-content">
      <NoteAppbar />
      <div className="notes__content">
        <form>
          <input
            type="text"
            placeholder="Some awesome title"
            className="notes__title-input"
            value={title}
            name="title"
            onChange={handleInputChange}
          />
          <textarea
            placeholder="What happen today"
            className="notes__text-area"
            value={body}
            name="body"
            onChange={handleInputChange}></textarea>
          <div className="notes__image">
            {note.url && <img src={note.url} alt="img" />}
          </div>
        </form>
      </div>

      <button className="btn btn-danger" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};
export default NoteScreen;
