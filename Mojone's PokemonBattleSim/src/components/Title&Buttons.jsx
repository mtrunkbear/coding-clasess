function TitleNButtons({pokeList}){
    return (
    <>
        <h1 className="MenuTitle">Pokemon simulador batalla juego diversion!!1!!</h1>
        <div className='pokeListScroll'>
           {pokeList}
        </div>
    </>
    );
}
export default TitleNButtons