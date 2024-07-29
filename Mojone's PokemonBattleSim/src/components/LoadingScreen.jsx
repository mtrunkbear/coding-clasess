import pokeball from '../assets/pokeball.png'
function LoadingScreen({loaded}){    
    return(
        <> 
            {!loaded && <div className="centered">
                <h1>Loading...</h1>
                <img className="pokeball" src={pokeball}/>
            </div>}
        </>
    )
}
export default LoadingScreen;