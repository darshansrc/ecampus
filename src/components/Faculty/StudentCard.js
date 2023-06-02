import pfp from "../Images/None.jpg";

export default function StudentCard(props) {
  const attendanceStatus = props.Present ? "present" : "absent";
  const slNo = Number(props.USN.toString().replace(/^0+/, '').slice(-3));
  return (
    <div className={`cardd ${attendanceStatus}`} onClick={props.toggle} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div >
          <h6 className="cardd__number">{slNo + '.'}</h6>
      </div>
      <div className="cardd__image" style={{alignItems: "left"}}>
        <img src={pfp} alt="StudentImage" />
      </div>
      <div className="cardd__content">
        <h2 className="cardd__name" style={{textTransform: 'capitalize'}}>{props.Name}</h2>
        <p className="cardd__usn">{props.USN.toString()}</p>
      </div>
      <div className="cardd__attendance">
        {props.Present ? (
          <span className="attendance-present">P</span>
        ) : (
          <span className="attendance-absent">A</span>
        )}
      </div>
    </div>
  );
} 
