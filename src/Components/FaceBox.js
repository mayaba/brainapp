import './Styles/FaceBox.css'


export default function FaceBox({ imageURL, boxes }) {

    return (
        <div className="columns is-centered">
            <div className="column is-half">
                <figure className="is-relative">
                    <img id="boximage" src={imageURL} alt="" />
                    { boxes.map((b, i) => <div key={i} className="detectionBox" style={{ top: b.top_row, right: b.right_col, bottom: b.bottom_row, left: b.left_col }}></div>) }
                </figure>
            </div>
        </div>
    )
}