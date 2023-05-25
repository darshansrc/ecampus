import "./CourseMaterial.css";
import MaterialLinks from "./MaterialLinks";

const Material = MaterialLinks.map((data) => (
  <>
    <tr>
      <td>{data.Subject}</td>
      <td>
        <a href={data.GoogleClassroom}>{data.abbriviation}</a>
      </td>
      <td>
        <a href={data.GoogleSite}>{data.StaffName}</a>
      </td>
    </tr>
  </>
));

export default function CourseMaterial() {
  return (
    <>
      <h1 style={{ textAlign: "center", fontWeight: "700", marginTop: "8svh" }}>
        Course Material
      </h1>
      <div className="CourseMaterial">
        <table>
          <tr>
            <th>Course & Course Code</th>
            <th>Google Classrooms</th>
            <th>Google Sites</th>
          </tr>
          <tbody>{Material}</tbody>
        </table>
      </div>
    </>
  );
}
