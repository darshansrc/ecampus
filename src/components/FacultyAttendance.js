export default function FacultyAttendance(props) {
    const Styles = { backgroundColor: props.Present ? "green" : "transparent" }
    return (
  
      <div
        style={Styles}
        class="card"
        onClick={props.toggle}>
        <img src={props.img} alt="StudentImage" />
        <h2>{props.Name}</h2>
        <p>{props.USN}</p>
        <p>Attended <b>{props.last5att}</b> of the last 5 classes</p>
        <p>Attended <b>{props.total}</b> out of 15 classes</p>
      </div>
    );
  }