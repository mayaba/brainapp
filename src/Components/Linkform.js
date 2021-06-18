

export default function Linkform({user, boxes, onSubmit, inputChange, imageURL}) {

    return (
        <>
            <div className="has-text-centered is-size-1 mt-6 has-text-black">
                <p >{user.name}, your current score is ...</p>
                <p id='score' >#{user.score}</p>
            </div>
            <label className="label has-text-centered mt-6 mb-5 has-text-black">Submit an image link</label>
            <div className="control columns is-centered mx-5">
                <input className="input column is-5" type="text" placeholder="Image URL" 
                onChange={inputChange} />
                <button className="button is-primary column mx-3 is-1 has-text-centered" onClick={onSubmit}>
                    <strong className="pb-6">Submit</strong>
                </button>
            </div>
        </>

    );
}