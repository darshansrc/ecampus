import "./CourseMaterial.css";
import MaterialLinks from "./MaterialLinks";

const Material = MaterialLinks.map((data) => (
  <>
    <tr>
      <td>{data.Subject}</td>
      <td>
        <a style={{textDecoration: 'none', color: 'black'}}>{data.StaffName}</a>
      </td>
      <td>
        <a href={data.GoogleSite} target="_blank" rel="noopener noreferrer">{data.abbriviation}</a>
      </td>
    </tr>
  </>
));

export default function CourseMaterial() {
  return (
    <>
      <h5 style={{ textAlign: "center",  margin: "20px" }}>
        Course Material
      </h5>
      <div className="tt-container" style={{marginBottom: '100px'}}>
      <div className="CourseMaterial">
        <table className="mtable">
          <tr>
            <th>Subject</th>
            <th>Faculty</th>
            <th style={{minWidth: '90px'}}>Google Site</th>
          </tr>
          <tbody>{Material}</tbody>
        </table>
      </div>
      </div>
    </>
  );
}