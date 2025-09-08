import { useState } from "react";
import Gmap from "./Map";

export default function SimpleCrudTable() {
  const [inputs, setInputs] = useState({ name: "", email: "", mobile: "", lat: "", long: "" });
  const [rows, setRows] = useState([]);
  const [editIdx, setEditIdx] = useState(-1);
  const [selectedLocation, setSelectedLocation] = useState(null); 
  const handleChange =(e) =>{
    setInputs({...inputs,[e.target.name ]: e.target.value});
  }

  const handleAddOrUpdate = (e) => {
    e.preventDefault();
    if (editIdx === -1) {
      setRows([...rows, inputs]);
      console.log("if hi")
    } else {
      setRows(rows.map((row, idx) => (idx === editIdx ? inputs : row)));
      setEditIdx(-1);
            console.log("else hi")
    }
    setInputs({ name: "", email: "", mobile: "", lat: "", long: "" });
  };

  const handleEdit = (idx) => {
    setEditIdx(idx);
    setInputs(rows[idx]);
  };

  const handleDelete = (idx) => {
    setRows(rows.filter((_, i) => i !== idx));
    if (editIdx === idx) {
      setInputs({ name: "", email: "", mobile: "", lat: "", long: "" });
      setEditIdx(-1);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <form onSubmit={handleAddOrUpdate} style={{ marginBottom: 16 }}>
        <input name="name" value={inputs.name} onChange={handleChange} placeholder="Name" required />
        <input name="email" value={inputs.email} onChange={handleChange} placeholder="Email" required />
        <input name="mobile" value={inputs.mobile} onChange={handleChange} placeholder="Mobile" required />
        <input name="lat" value={inputs.lat} onChange={handleChange} placeholder="Lat" required />
        <input name="long" value={inputs.long} onChange={handleChange} placeholder="Long" required />
        <button type="submit">{editIdx === -1 ? "Add" : "Update"}</button>
      </form>
      <table border="1" cellPadding={6} cellSpacing={0} style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Lat</th>
            <th>Long</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx}>
              <td>{row.name}</td>
              <td>{row.email}</td>
              <td>{row.mobile}</td>
              <td onClick={() => setSelectedLocation({ lat: parseFloat(row.lat), lng: parseFloat(row.long) })}
                  style={{ color: "blue", cursor: "pointer" }}>
                {row.lat}
              </td>
              <td onClick={() => setSelectedLocation({ lat: parseFloat(row.lat), lng: parseFloat(row.long) })}
                  style={{ color: "blue", cursor: "pointer" }}>
                {row.long}
              </td>
              <td>
                <button onClick={() => handleEdit(idx)}>Edit</button>
                <button onClick={() => handleDelete(idx)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedLocation && (
        <div style={{ marginTop: 20 }}>
          <h4>Selected Location</h4>
          <Gmap center={selectedLocation} />
        </div>
      )}
    </div>
  );
}