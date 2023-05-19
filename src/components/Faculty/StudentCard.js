export default function StudentCard(props) {
  const attendanceStatus = props.Present ? "present" : "absent";
  return (
    <div className={`cardd ${attendanceStatus}`} onClick={props.toggle} style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div className="cardd__image" style={{alignItems: "left"}}>
        <img src={props.img} alt="StudentImage" />
      </div>
      <div className="cardd__content">
        <h2 className="cardd__name">{props.Name}</h2>
        <p className="cardd__usn">{props.USN}</p>
        <p className="cardd__last-5-att">
          Attended <b>{props.last5att}</b> of the last 5 classes
        </p>
        <p className="cardd__total-att">
          Attended <b>{props.total}</b> out of 15 classes
        </p>
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
