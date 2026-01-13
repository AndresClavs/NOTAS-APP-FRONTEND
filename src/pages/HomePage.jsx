import { useEffect, useState } from "react";
import CardNote from "../components/CardNote";
import axios from "axios";
import formatData from "../utils/formatDate";
import { toast } from "react-toastify";

const apiURL = import.meta.env.VITE_API_URL;

const HomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${apiURL}/api/notes`);
        console.log(response);
        setNotes(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  // ✅ FUNCIÓN PARA ELIMINAR NOTA
  const handleDelete = (id) => {
    toast.warning(
      ({ closeToast }) => (
        <div className="flex flex-col gap-3">
          <span className="font-semibold text-sm">
            ¿Estás seguro de que deseas eliminar esta nota?
          </span>

          <div className="flex justify-end gap-3">
            <button className="btn btn-sm btn-ghost" onClick={closeToast}>
              Cancelar
            </button>

            <button
              className="btn btn-sm btn-error text-white"
              onClick={async () => {
                try {
                  await axios.delete(`${apiURL}/api/notes/${id}`);
                  setNotes(notes.filter((note) => note._id !== id));

                  toast.success("Nota eliminada correctamente", {
                    position: "bottom-center",
                    autoClose: 3000,
                    theme: "colored",
                  });

                  closeToast();
                } catch (error) {
                  toast.error("Error al eliminar la nota", {
                    position: "bottom-center",
                    autoClose: 3000,
                    theme: "colored",
                  });
                  closeToast();
                }
              }}
            >
              Eliminar
            </button>
          </div>
        </div>
      ),
      {
        position: "bottom-center",
        autoClose: false,
        closeOnClick: false,
        closeButton: false,
        theme: "colored",
      }
    );
  };

  if (loading) return <span>Cargando...</span>;

  return (
    <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-4 xl:grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
      {notes.map((note) => (
        <CardNote
          key={note._id}
          title={note.title}
          description={note.description}
          id={note._id}
          date={formatData(note.createdAt)}
          onDelete={handleDelete} // 👈 conexión con CardNote
        />
      ))}
    </div>
  );
};

export default HomePage;
