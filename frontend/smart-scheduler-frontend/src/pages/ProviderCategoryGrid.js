
import { getProfessions } from "../services/Utils";
import "../pageStyles/CategoryGrid.css"

import { FaStethoscope, FaChalkboardTeacher, FaPaintBrush, FaTools, FaBriefcase, FaSpa } from "react-icons/fa";

const categories = [

  { id: 1, name: "Healthcare", icon: <FaStethoscope color="#273A4C" />, description: "Doctors, Dentists, Specialists" },
  { id: 2, name: "Education", icon: <FaChalkboardTeacher  color="#273A4C"/>, description: "Tutors, Trainers, Mentors" },
  { id: 3, name: "Beauty & Wellness", icon: <FaSpa  color="#273A4C"/>, description: "Salons, Spas, Therapists" },
  { id: 4, name: "Home & Repair", icon: <FaTools color="#273A4C" />, description: "Plumbers, Electricians, Carpenters" },
  { id: 5, name: "Professional Services", icon: <FaBriefcase  color="#273A4C"/>, description: "Consultants, Accountants, Lawyers" },
  { id: 6, name: "Creative & Events", icon: <FaPaintBrush  color="#273A4C"/>, description: "Artists, Photographers, Event Planners" },
];

const categoryGrid = ({onCategorySelect}) =>{


  return (
    <div className="category-grid">
      <div className="category-grid">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="category-card"
            onClick={() => onCategorySelect(cat.name)}
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