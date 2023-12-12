import {useState}  from "react"
import {useEffect} from "react"
export default function Meme(){


    //creating a state which will store toptext bottom text and image then it will b shown on 
    //page on every click
    const [meme, setMeme] = useState({
        topText : "",
        bottomText : "",
        randomImage : "https://i.imgflip.com/30b1gx.jpg"
    })

    //creating an empty array named allmemes which will then save data comming from API
    const [allMemes, setAllMemes] = useState([])
    
    //using API call
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(res => res.json())
            //pushing data into allmemes array
            .then(data => setAllMemes(data.data.memes))
    }, [])

    function getimage(){
        //on every click only image will be changes other will be same in meme state
        const randomNUm = Math.floor(Math.random() * allMemes.length)
        const url = allMemes[randomNUm].url
        setMeme(prevMeme => ({
            ...prevMeme,
            randomImage : url
        }))
    }


    function handleChange(event){
        //on every click only image will be changes other will be same in meme state
        const {name , value} = event.target
        setMeme(prevMeme => ({
            ...prevMeme,
            [name] : value
        }))
    }

    return (
        <main>
            <div className="Form">

                <input 
                className="form-inputs" 
                type="text" 
                placeholder="Top text"
                name = "topText"
                value={meme.topText} 
                onChange={handleChange}
                />

                <input 
                className="form-inputs" 
                type="text" 
                placeholder="Bottom text"
                name = "bottomText"
                value={meme.bottomText}
                onChange={handleChange}
                />

                <button onClick={getimage} className="form-btn">Get a new meme image  🖼</button>

            </div>
            
            <div className='meme-image-container'>
            <img  src={meme.randomImage} className='meme-image' alt="memeImage load failed" />
            <h2 className='meme-text top'>{meme.topText}</h2>
            <h2 className='meme-text bottom'>{meme.bottomText}</h2>
            </div>
        </main>
    )
}