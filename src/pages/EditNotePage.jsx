import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import NoteForm from "../components/NoteForm";

const apiURL = import.meta.env.VITE_API_URL;

const EditNotePage = () => {
  const { id } = useParams(); // 👈 coincide con /editNote/:id
  const navigate = useNavigate();

  const [note, setNote] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔹 CARGAR NOTA
  useEffect(() => {
    const fetchNote = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/notes/${id}`);
        setNote(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("Error al cargar la nota", {
          position: "bottom-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    };

    fetchNote();
  }, [id]);

  // 🔹 ACTUALIZAR NOTA
  const handleUpdate = async (updatedNote) => {
    try {
      await axios.put(`${apiURL}/api/notes/${id}`, updatedNote);

      toast.success("Nota actualizada correctamente", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });

      navigate("/");
    } catch (error) {
      toast.error("Error al actualizar la nota", {
        position: "bottom-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div>
      <NoteForm
        onSubmit={handleUpdate}
        initialDate={{
          title: note.title,
          description: note.description,
        }}
      />
    </div>
  );
};

export default EditNotePage;

