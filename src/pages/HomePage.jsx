import { useEffect, useState } from "react";
import CardNote from "../components/CardNote";
import axios from "axios";
import formatData from "../utils/formatDate";

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
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("¿Seguro que deseas eliminar esta nota?");
        if (!confirmDelete) return;

        try {
            await axios.delete(`${apiURL}/api/notes/${id}`);
            setNotes(notes.filter(note => note._id !== id));
        } catch (error) {
            console.error("Error al eliminar la nota", error);
        }
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


