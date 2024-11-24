import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

// Arrglo de objetos para almacenar los distintos generos del ButtonGroup
const genres = [
  { name: "Rock", variant: "outline-danger" },
  { name: "Salsa", variant: "outline-dark" },
  { name: "Pop", variant: "outline-info" },
  { name: "Latin", variant: "outline-warning" },
  { name: "Blues", variant: "outline-success" },
  { name: "Classical", variant: "outline-secondary" },
];

// Componente
const GenreSelector = ({ genre, setGenre }) => (
  <div className="row ms-3 mt-0 pb-3 align-items-center">
    <div className="col-2">
      <h2 className="fs-5 text-muted">Buscar por género:</h2>
    </div>
    <ButtonGroup className="col-5">
      {genres.map((g) => (
        <Button
          key={g.name}
          variant={g.variant}
          active={genre.toLowerCase() === g.name.toLowerCase()}
          onClick={() => setGenre(g.name.toLowerCase())}
        >
          {g.name}
        </Button>
      ))}
    </ButtonGroup>
  </div>
);

export default GenreSelector;
