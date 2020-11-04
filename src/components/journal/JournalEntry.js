import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

const JournalEntry = ({ id, title, date, body, url }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const handleEntryClick = () => {
    dispatch(activeNote(id, { title, date, body, url }));
  };

  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeIn animate__faster"
      onClick={handleEntryClick}>
      {url && (
        <div
          className="journal__entry-picture"
          style={{
            backgroundSize: 'cover',
            backgroundImage: `url(${url})`,
          }}></div>
      )}
      <div className="journal__entry-body">
        <p className="journal__entry-title">
          {title !== '' ? title : 'No tiene titulo'}
        </p>
        <p className="journal__entry-content">
          {body !== '' ? body : 'No tiene cuerpo'}
        </p>
      </div>
      <div className="journal__entry-date-box">
        <span>{noteDate.format('dddd')}</span>
        <h4>{noteDate.format('Do')}</h4>
      </div>
    </div>
  );
};
export default JournalEntry;
