import React, { useState } from 'react'
import DatePicker, { registerLocale } from 'react-datepicker';
import ko from 'date-fns/locale/ko';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('ko', ko);

function Calendar() {
  //@ts-ignore
  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => (
    <div className="my-calender-header">
      <button onClick={decreaseMonth} className="btn-prev" type="button"><i className="xi-angle-left"></i></button>
      <p>{date.getFullYear()}년 {date.getMonth() + 1}월</p>
      <button onClick={increaseMonth} className="btn-next" type="button"><i className="xi-angle-right"></i></button>
    </div>
  )

  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

  // const [startDate, setStartDate] = useState(new Date());
  // const [endDate, setEndDate] = useState(
  //   new Date(new Date().getTime() + 3 * 24 * 60 * 60 * 1000)
  // );

  return (
    <>
      <DatePicker inline locale="ko"
        dateFormat="yyyy/MM/dd"
        calendarClassName="my-calender"
        renderCustomHeader={renderCustomHeader}
        onChange={(date) => setSelectedDate(date)}
        selected={selectedDate} 
      />
    </>
  );
}

export default Calendar