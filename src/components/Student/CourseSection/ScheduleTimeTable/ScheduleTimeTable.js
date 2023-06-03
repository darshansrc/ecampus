import "./ScheduleTimeTable.css";
import StudentTimedata from "./StudentTimedata";



const Week = StudentTimedata.map((day) => (
  <>
    {day.TT && (
      <tr className="dayType1">
        <td>{day.Day}</td>
        {day.Period1 === day.Period2 ? (
          <td colSpan={"2"}>{day.Period1}</td>
        ) : (
          <>
            <td>{day.Period1}</td>
            <td>{day.Period2}</td>
          </>
        )}
        <td>Tea Break</td>
        {day.Period3 === day.Period4 ? (
          <td colSpan={"2"}>{day.Period3}</td>
        ) : (
          <>
            <td>{day.Period3}</td>
            <td>{day.Period4}</td>
          </>
        )}
        <td>Lunch Break</td>
        {(day.Period5 === day.Period6) === day.Period7 ? (
          <td colSpan={"3"}>{day.Period5}</td>
        ) : (
          <>
            {day.Period5 === day.Period6 ? (
              <>
                <td colSpan={"2"}>{day.Period5}</td>
                <td>{day.Period7}</td>
              </>
            ) : (
              <>
                <td>{day.Period5}</td>
                {day.Period6 === day.Period7 ? (
                  <td colSpan={"2"}>{day.Period6}</td>
                ) : (
                  <>
                    <td>{day.Period6}</td>
                    <td>{day.Period7}</td>
                  </>
                )}
              </>
            )}
          </>
        )}
      </tr>
    )}
    {!day.TT && (
      <tr className="dayType2">
        <td>{day.Day}</td>
        {day.Period1 === day.Period2 ? (
          <td colSpan={"2"}>{day.Period1}</td>
        ) : (
          <>
            <td>{day.Period1}</td>
            <td>{day.Period2}</td>
          </>
        )}
        <td>Tea Break</td>
        {day.Period3 === day.Period4 ? (
          <td colSpan={"2"}>{day.Period3}</td>
        ) : (
          <>
            <td>{day.Period3}</td>
            <td>{day.Period4}</td>
          </>
        )}
        <td>Lunch Break</td>
        {day.Period5 === day.Period6 ? (
          <td colSpan={"3"}>{day.Period5}</td>
        ) : (
          <>
            <td>{day.Period5}</td>
            <td colSpan={"2"}>{day.Period6}</td>
          </>
        )}
      </tr>
    )}
  </>
));

export default function ScheduleTimeTable() {
  return (
    <>
      <h5 style={{ textAlign: "center", margin: '20px'}}>
        Class Schedule
      </h5>
      <div className="tt-container">
       <div className="ScheduleTimeTable">
        <table className="mtable" >
          <tr >
            <th>Date & Time</th>
            <th>9:00 - 10:00</th>
            <th>10:00 - 11:00</th>
            <th>11:00 - 11:20</th>
            <th>11:20 - 12:20</th>
            <th>12:20 - 1:20</th>
            <th>1:20 - 2:00</th>
            <th>2:00 - 3:00</th>
            <th>3:00 - 4:00</th>
            <th>4:00 - 4:45</th>
          </tr>
          <tbody>{Week}</tbody>
        </table>
      </div>
      </div>
    </>
  );
}