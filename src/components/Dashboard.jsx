import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [editedId, setEditedId] = useState(null);
  const [editedNote, setEditedNote] = useState("");
  const [newNote, setNewNote] = useState("");
  const navigate = useNavigate();

  const edit = async (id, note) => {
    try {
      setEditedId(id);
      setEditedNote(note);
    } catch (error) {
      console.log(
        "Error editing note:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  const createNote = async () => {
    try {
      if (editedId) {
        const response = await axios.put(
          `https://notes-app-backend-tawny-two.vercel.app/api/data/notes/?id=${editedId}`,
          {
            note: editedNote,
          },
          {
            withCredentials: true,
          },
        );
        console.log("Note updated:", response.data);
        setEditedNote("");
        setEditedId(null);
        setEditedNote("");
        fetchNotes();
        setNotes("");
      } else {
        const response = await axios.post(
          "https://notes-app-backend-tawny-two.vercel.app/api/data/notes",
          { note: newNote },
          {
            withCredentials: true,
          },
        );
        console.log("Note created:", response.data);
        setNewNote("");
        fetchNotes();
      }
    } catch (error) {
      console.log(
        "Error editing note:",
        error.response ? error.response.data : error.message,
      );
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await axios.get(
        "https://notes-app-backend-tawny-two.vercel.app/api/data/notes",
        {
          withCredentials: true,
        },
      );
      // console.log("Fetched notes:", response.data.result);
      setNotes(response.data.result);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  const setFunc = (value) => {
    if (editedId) {
      setEditedNote(value);
    } else {
      setNewNote(value);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(
        "https://notes-app-backend-tawny-two.vercel.app/api/data/notes/?id=" +
          id,
        {
          withCredentials: true,
        },
      );
      console.log("Note deleted:", response.data);
      fetchNotes();
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <div className="containers">
      <div className="input">
        <textarea
          value={editedId ? editedNote : newNote}
          name="note"
          id="note"
          placeholder="Write yours note"
          onChange={(e) => setFunc(e.target.value)}
        />
        <button className="btn btn-primary" onClick={createNote}>
          {editedId ? "Update Note" : "Create Note"}
        </button>
      </div>

      {notes.length > 0 ? (
        notes.map((note) => {
          return (
            <div className="notes" key={note._id}>
              <div className="note">
                <p>{note.note}</p>
              </div>

              <div className="func">
                <button
                  onClick={() => edit(note._id, note.note)}
                  className="edit btn btn-primary"
                >
                  Edit
                </button>
                <button
                  className="delete btn btn-danger"
                  onClick={() => handleDelete(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })
      ) : (
        <p className="no-notes">No notes found. Please create a note.</p>
      )}
    </div>
  );
};

export default Dashboard;
