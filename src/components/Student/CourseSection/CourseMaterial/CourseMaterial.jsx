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
      <h4 style={{ textAlign: "center", fontWeight: "700", marginTop: "8svh" }}>
        Course Material
      </h4>
      <div className="tt-container" style={{marginBottom: '80px'}}>
      <div className="CourseMaterial">
        <table className="mtable">
          <tr>
            <th>Course & Course Code</th>
            <th>Google Site</th>
            <th>Faculty</th>
          </tr>
          <tbody>{Material}</tbody>
        </table>
      </div>
      </div>
    </>
  );
}