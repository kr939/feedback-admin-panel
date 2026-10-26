
import { useEffect, useState } from "react";
import axios from "axios";
import { Pencil, Trash2, Star, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api/feedback";

export default function Dashboard() {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function loadFeedback() {
    try {
      const response = await axios.get(API);
      setFeedback(response.data);
    } catch (error) {
      console.error(error);
      alert("Could not load feedback. Check your backend server.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadFeedback();
  }, []);

  async function deleteFeedback(id) {
    if (!window.confirm("Are you sure you want to delete this feedback?")) {
      return;
    }

    try {
      await axios.delete(`${API}/${id}`);
      setFeedback((items) => items.filter((item) => item._id !== id));
    } catch (error) {
      console.error(error);
      alert("Could not delete feedback.");
    }
  }

  return (
    <section>
      <div className="page-heading">
        <div>
          <p className="eyebrow">MANAGEMENT CENTER</p>
          <h1>Course Feedback</h1>
          <p className="subtitle">
            Review and manage feedback from your learners.
          </p>
        </div>

        <button className="primary-btn" onClick={() => navigate("/add")}>
          + Add Feedback
        </button>
      </div>

      <div className="stats-card">
        <div className="stats-icon">
          <BookOpen size={25} />
        </div>
        <div>
          <span>Total feedback entries</span>
          <h2>{feedback.length}</h2>
        </div>
      </div>

      <div className="table-card">
        <h2>Feedback Overview</h2>

        {loading ? (
          <p>Loading feedback...</p>
        ) : feedback.length === 0 ? (
          <div className="empty-state">
            <BookOpen size={42} />
            <h3>No feedback yet</h3>
            <p>Add your first course feedback to get started.</p>
            <button
              className="primary-btn"
              onClick={() => navigate("/add")}
            >
              Add First Feedback
            </button>
          </div>
        ) : (
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Course ID</th>
                  <th>Course Name</th>
                  <th>Duration</th>
                  <th>Rating</th>
                  <th>Comments</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {feedback.map((item) => (
                  <tr key={item._id}>
                    <td>{item.courseId}</td>
                    <td className="course-name">{item.courseName}</td>
                    <td>{item.courseDuration}</td>
                    <td>
                      <span className="rating">
                        <Star size={16} fill="currentColor" />
                        {item.rating}/5
                      </span>
                    </td>
                    <td className="comments">{item.comments}</td>
                    <td>
                      <div className="actions">
                        <button
                          className="icon-btn edit-btn"
                          title="Update feedback"
                          onClick={() => navigate(`/add?edit=${item._id}`)}
                        >
                          <Pencil size={17} />
                        </button>

                        <button
                          className="icon-btn delete-btn"
                          title="Delete feedback"
                          onClick={() => deleteFeedback(item._id)}
                        >
                          <Trash2 size={17} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}