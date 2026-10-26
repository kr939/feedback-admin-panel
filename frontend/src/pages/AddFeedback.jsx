
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Star } from "lucide-react";

const API = "http://localhost:5000/api/feedback";

export default function AddFeedback() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");

  const [form, setForm] = useState({
    courseId: "",
    courseName: "",
    courseDuration: "",
    comments: "",
    rating: 5,
  });

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!editId) return;

    axios
      .get(API)
      .then((response) => {
        const item = response.data.find((entry) => entry._id === editId);

        if (item) {
          setForm({
            courseId: item.courseId,
            courseName: item.courseName,
            courseDuration: item.courseDuration,
            comments: item.comments,
            rating: item.rating,
          });
        } else {
          alert("Feedback not found.");
          navigate("/");
        }
      })
      .catch(() => alert("Could not load feedback."));
  }, [editId, navigate]);

  function handleChange(event) {
    setForm({ ...form, [event.target.name]: event.target.value });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setSaving(true);

    try {
      const payload = {
        ...form,
        rating: Number(form.rating),
      };

      if (editId) {
        await axios.put(`${API}/${editId}`, payload);
        alert("Feedback updated successfully!");
      } else {
        await axios.post(API, payload);
        alert("Feedback added successfully!");
      }

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message || "Could not save feedback.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <section className="form-page">
      <button className="back-btn" onClick={() => navigate("/")}>
        <ArrowLeft size={18} /> Back to Dashboard
      </button>

      <div className="form-card">
        <p className="eyebrow">COURSE MANAGEMENT</p>
        <h1>{editId ? "Update Feedback" : "Add Feedback"}</h1>
        <p className="subtitle">
          {editId
            ? "Edit the submitted course feedback."
            : "Share your thoughts about the course."}
        </p>

        <form onSubmit={handleSubmit}>
          <label htmlFor="courseId">Course ID</label>
          <input
            id="courseId"
            name="courseId"
            placeholder="e.g. C101"
            value={form.courseId}
            onChange={handleChange}
            required
          />

          <label htmlFor="courseName">Course Name</label>
          <input
            id="courseName"
            name="courseName"
            placeholder="e.g. Full Stack Development"
            value={form.courseName}
            onChange={handleChange}
            required
          />

          <label htmlFor="courseDuration">Course Duration</label>
          <input
            id="courseDuration"
            name="courseDuration"
            placeholder="e.g. 3 Months"
            value={form.courseDuration}
            onChange={handleChange}
            required
          />

          <label htmlFor="comments">Feedback Comments</label>
          <textarea
            id="comments"
            name="comments"
            placeholder="Write your feedback here..."
            value={form.comments}
            onChange={handleChange}
            rows="4"
            required
          />

          <label>Feedback Rating</label>
          <div className="rating-options">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                type="button"
                key={value}
                className={
                  Number(form.rating) >= value
                    ? "star-btn selected"
                    : "star-btn"
                }
                onClick={() => setForm({ ...form, rating: value })}
                aria-label={`Rate ${value} out of 5`}
              >
                <Star
                  size={29}
                  fill={Number(form.rating) >= value ? "currentColor" : "none"}
                />
              </button>
            ))}
            <span>{form.rating}/5</span>
          </div>

          <button className="primary-btn submit-btn" disabled={saving}>
            {saving
              ? "Saving..."
              : editId
                ? "Update Feedback"
                : "Submit Feedback"}
          </button>
        </form>
      </div>
    </section>
  );
}