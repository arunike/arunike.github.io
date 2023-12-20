const Student = (props) => {
    return <div>
        <h2>{props.name.first} {props.name.last}</h2>
        {/* TODO Student data goes here! */}
        <p><strong>Major:</strong> {props.major}</p>
            <p>{props.name.first} is taking <strong>{props.numCredits} Credits</strong> and <strong>{props.fromWisconsin ? "is" : "is Not"} from Wisconsin</strong></p>
            <p>They have {props.interests.length} <strong>Interest(s)</strong> of:</p>
            <ul>
                {props.interests.map((interest, index) => (
                    <li key={index}>{interest}</li>
                ))}
            </ul>
    </div>
}

export default Student;