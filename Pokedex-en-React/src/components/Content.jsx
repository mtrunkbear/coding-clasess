function Content({ second, first, evolution, canEvolve, name,image }) {
  return (
    <>
      <span className="imageName">
        <img src={image}></img>
        <h2 className="pkName">Nombre: {name}</h2>
      </span>
      <div className="tContainer">
        <p>
          Tipos:{" "}
          <img className="type" src={"./src/assets/" + first + ".webp"} />
          {second ? (
            <img className="type" src={"./src/assets/" + second + ".webp"} />
          ) : (
            ""
          )}
        </p>
      </div>
      <div className="evolutionDiv">
        {canEvolve ? (
          <p>Este pokemon evoluciona en: {evolution}</p>
        ) : (
          <p>Este pokemon no evoluciona</p>
        )}
        {canEvolve && (
          <img
            className="evolution"
            src={"./src/assets/" + evolution + ".png"}
          />
        )}
      </div>
    </>
  );
}

export default Content;