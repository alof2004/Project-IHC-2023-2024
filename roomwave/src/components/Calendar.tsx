import { useState } from 'react';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import '../css/Calendar.css';

function Calendar({ onDateChange }: { onDateChange: (startDate: string, endDate: string) => void }) {
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: null as Date | null, // Specify the type explicitly
      key: 'selection',
    },
  ]);

  // Function to handle changes
  const handleDateChange = (item) => {
    setState([item.selection]);
    const startDate = format(item.selection.startDate, "yyyy-MM-dd");
    const endDate = item.selection.endDate ? format(item.selection.endDate, "yyyy-MM-dd") : "";
    onDateChange(startDate, endDate);
  };
  const resetDates = () => {
    setState([
      {
        startDate: new Date(),
        endDate: null,
        key: 'selection',
      },
    ]);
    onDateChange("", ""); // Notify parent component about the reset dates
  };
  
  
  // Destructuring with default values
  const { startDate, endDate } = state[0];

  return (
    <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      <DateRange
        editableDateInputs={true} // Allows editing dates in the input fields
        onChange={handleDateChange}
        moveRangeOnFirstSelection={false}
        ranges={state}
      />
      <p className='ola' style={{display: 'none'}}> {/* Add inline style to set display to none */}
        Start Date:
        <input
          type="date"
          id="start_date"
          name="start_date"
          value={format(startDate, "yyyy-MM-dd")} // Use date-fns format
          onChange={(e) => setState([{ ...state[0], startDate: new Date(e.target.value) }])} // Update the setState function to correctly update the startDate property
        />
      </p>
      <p className='ola-1' style={{display: 'none'}}> {/* Add inline style to set display to none */}
        End Date:
        <input
          type="date"
          id="end_date"
          name="end_date"
          value={endDate ? format(endDate, "yyyy-MM-dd") : ""} // Handle null endDate
          onChange={(e) => setState([{ ...state[0], endDate: e.target.value ? new Date(e.target.value) : null }])} // Update the setState function to correctly update the endDate property
        />
      </p>
      <button type = "button" className='button122' style={{marginTop:"10px", borderRadius:"10px", width:"100%"}} onClick={resetDates}>Reset Dates</button> {/* Button to reset dates */}
    </div>
  );
}

export default Calendar;
