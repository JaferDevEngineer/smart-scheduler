
import { getProfessions } from "../services/Utils";
import "../pageStyles/CategoryGrid.css"

import { FaStethoscope, FaChalkboardTeacher, FaPaintBrush, FaTools, FaBriefcase, FaSpa } from "react-icons/fa";

const categories = [

  { id: 1, name: "Healthcare", icon: <FaStethoscope />, description: "Doctors, Dentists, Specialists" },
  { id: 2, name: "Education", icon: <FaChalkboardTeacher />, description: "Tutors, Trainers, Mentors" },
  { id: 3, name: "Beauty & Wellness", icon: <FaSpa />, description: "Salons, Spas, Therapists" },
  { id: 4, name: "Home & Repair", icon: <FaTools />, description: "Plumbers, Electricians, Carpenters" },
  { id: 5, name: "Professional Services", icon: <FaBriefcase />, description: "Consultants, Accountants, Lawyers" },
  { id: 6, name: "Creative & Events", icon: <FaPaintBrush />, description: "Artists, Photographers, Event Planners" },
];

const categoryGrid = ({selectCategory}) =>{


  return (
    <div className="category-grid">
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => selectCategory(cat.name)}
          >
            <div className="icon">{cat.icon}</div>
            <h3>{cat.name}</h3>
            <p>{cat.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default categoryGrid;